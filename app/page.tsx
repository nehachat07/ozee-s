"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FloatingParticles,
  GoldShimmer,
  AnimatedCounter,
  StaggerFadeIn,
} from "./components/animations";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import ProductJsonLd from "./components/product-json-ld";


function DietaryBadge({ type }: { type: "veg" | "egg" | "both" }) {
  if (type === "both") {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-full text-[10px] text-amber-200 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        <span>Egg & Eggless</span>
      </span>
    );
  }
  if (type === "veg") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[10px] text-emerald-300 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>100% Eggless</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/40 px-2.5 py-1 rounded-full text-[10px] text-rose-300 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
      <span>Contains Egg</span>
    </span>
  );
}

interface Product {
  id: string;
  name: string;
  desc: string;
  diet: "veg" | "egg" | "both";
  img: string;
  images?: string[];
  category: string;
  flavors?: string[];
  tag?: string;
  imgFit?: "cover" | "contain";
}

function ProductCard({ item, wa, index = 0 }: { item: Product; wa: (name?: string) => string; index?: number }) {
  const [currentImg, setCurrentImg] = useState(item.img);
  const allImages = item.images && item.images.length > 0 ? item.images : [item.img];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-[#140F0C] rounded-3xl overflow-hidden border border-[#2B2119] shadow-lg hover:shadow-2xl hover:shadow-[#E6C665]/15 hover:border-[#E6C665]/60 flex flex-col justify-between group cursor-default"
    >
      {/* 1. HEADING ABOVE PICS */}
      <div className="p-6 pb-4 border-b border-[#241A13] bg-[#1A140F] relative overflow-hidden">
        <GoldShimmer />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#F5EFE6] leading-snug group-hover:text-[#E6C665] transition-colors duration-300">{item.name}</h3>
            <span className="text-[10px] text-[#E6C665] font-semibold uppercase tracking-wider block mt-0.5">{item.category}</span>
          </div>
          <DietaryBadge type={item.diet} />
        </div>
      </div>

      {/* 2. PICS BELOW HEADING */}
      <div className="relative aspect-[4/3] bg-[#0A0705] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentImg}
              alt={`${item.name} - ${item.category} from Ozee's Bakery Bangalore`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`${item.imgFit === "contain" ? "object-contain" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {item.tag && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-[#F7DC8D] to-[#D4AF37] text-[#0B0806] text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-full shadow-lg z-10"
          >
            {item.tag}
          </motion.span>
        )}
      </div>

      {/* Multiple Image Gallery Selector */}
      {allImages.length > 1 && (
        <div className="flex gap-2 px-4 py-2.5 bg-[#18110D] border-b border-[#291F17] items-center">
          <span className="text-[9px] uppercase tracking-wider text-[#E6C665] font-bold mr-1">Views:</span>
          {allImages.map((imgUrl, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentImg(imgUrl)}
              className={`relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                currentImg === imgUrl ? "border-[#E6C665] shadow-md ring-2 ring-[#E6C665]/30" : "border-[#33261C] opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={imgUrl} alt={`${item.name} - ${item.category} view ${idx + 1}`} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      )}

      {/* 3. DETAILS & ORDER BUTTON */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <p className="text-xs text-[#D6C7B8] font-light leading-relaxed">{item.desc}</p>
          {item.flavors && item.flavors.length > 0 && (
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E6C665] block mb-1.5">
                Flavors / Varieties:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.flavors.map((flv, fi) => (
                  <motion.span
                    key={flv}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: fi * 0.04 }}
                    className="bg-[#241B14] text-[#E5D6C5] border border-[#3D2F23] text-[10px] px-2.5 py-1 rounded-full font-medium"
                  >
                    {flv}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-[#241A13] mt-2">
          <span className="text-[10px] text-[#E6C665] font-semibold uppercase tracking-wider">
            {item.diet === "both" ? "Egg & Eggless Options" : item.diet === "veg" ? "100% Eggless" : "Contains Egg"}
          </span>
          <motion.a
            href={wa(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs bg-gradient-to-r from-[#F7DC8D] via-[#E6C665] to-[#D4AF37] text-[#0B0806] font-black px-6 py-2.5 rounded-full uppercase tracking-wider transition-all shadow-lg shadow-[#E6C665]/25"
          >
            Order
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const phone = "919900951492";
  const wa = (item?: string) => {
    const text = item
      ? encodeURIComponent(`Hi Ozee's! I would like to place an order for "${item}".`)
      : encodeURIComponent("Hi Ozee's! I would like to place an order from your menu.");
    return `https://wa.me/${phone}?text=${text}`;
  };

  const catalog: Product[] = [
    // 1. CUPCAKES
    {
      id: "cup-1",
      name: "Berry Crown Cupcakes",
      desc: "Fluffy sponge cupcakes topped with rich whipped icing, fresh berries, and seasonal fruits.",
      diet: "both",
      img: "/Berry Crown Cupcakes 1.jpeg",
      images: [
        "/Berry Crown Cupcakes 1.jpeg",
        "/Berry Crown Cupcakes 2.jpeg"
      ],
      category: "Cupcakes",
      flavors: ["Strawberry", "Blueberry", "Seasonal Fruits"],
      tag: "Bestseller"
    },
    {
      id: "cup-2",
      name: "Swirl Collection",
      desc: "Our signature trio of luxury piped cupcakes in rich dark chocolate, vanilla snowdrop, and red velvet.",
      diet: "both",
      img: "/Swirl Collection 1.jpeg",
      images: [
        "/Swirl Collection 1.jpeg",
        "/Swirl Collection 3.jpeg",
        "/Swirl Collection 4.jpeg"
      ],
      category: "Cupcakes",
      flavors: ["Midnight Swirl (Rich Chocolate)", "Sweet Snowdrop (Vanilla)", "Vibrant Ruby (Red Velvet)"]
    },

    // 2. TEACAKES
    {
      id: "tea-1",
      name: "Midnight Loaf",
      desc: "Decadent dark chocolate loaf cake decorated with candied citrus peel.",
      diet: "egg",
      img: "/Midnight Loaf 1.jpeg",
      images: [
        "/Midnight Loaf 1.jpeg",
        "/Midnight loaf 2.jpeg"
      ],
      category: "Teacakes"
    },
    {
      id: "tea-2",
      name: "Hazelnut Heaven",
      desc: "Rich cocoa loaf bar coated in a silky milk chocolate glaze and topped with roasted crunchy hazelnuts.",
      diet: "both",
      img: "/Hazelnut Heaven 1.jpeg",
      images: [
        "/Hazelnut Heaven 1.jpeg",
        "/Hazelnut Heaven 2.jpeg"
      ],
      category: "Teacakes"
    },
    {
      id: "tea-3",
      name: "Midnight Drip",
      desc: "Moist chocolate tea loaf cake finished with a glossy chocolate drip glaze and dried berry bits.",
      diet: "both",
      img: "/Midnight Drip.jpeg",
      category: "Teacakes"
    },
    {
      id: "tea-4",
      name: "Golden Crumble (Choco Banana)",
      desc: "Warm banana bread studded with dark chocolate chunks and topped with golden butter crumble.",
      diet: "veg",
      img: "/Golden Crumble 1.jpeg",
      images: [
        "/Golden Crumble 1.jpeg",
        "/Golden Crumble 2.jpeg"
      ],
      category: "Teacakes"
    },
    {
      id: "tea-5",
      name: "Marble Loaf",
      desc: "Classic swirled vanilla bean and rich dark chocolate marble cake baked into a golden loaf.",
      diet: "both",
      img: "/Marble Loaf 1.png",
      images: [
        "/Marble Loaf 1.png",
        "/Marble Loaf 2.png"
      ],
      category: "Teacakes"
    },
    {
      id: "tea-6",
      name: "Cloud Roll (Swiss Roll)",
      desc: "Ultra-soft, pillowy sponge cake roll swirled with light cream filling in five signature flavors.",
      diet: "egg",
      img: "/Cloud Roll (Swiss Roll).jpeg",
      category: "Teacakes",
      flavors: ["Cloud Roll", "Midnight Roll", "Fruity Roll", "Citrus Roll", "Mocha Roll"]
    },

    // 3. COOKIES
    {
      id: "cook-1",
      name: "Choco Chip Bliss",
      desc: "Golden baked French-style butter cookies packed with rich dark chocolate chips.",
      diet: "veg",
      img: "/Chocochip Bliss.jpg",
      category: "Cookies",
      tag: "Popular"
    },
    {
      id: "cook-2",
      name: "Checker Charm",
      desc: "Handcrafted duo-tone cocoa and vanilla checkerboard butter cookies.",
      diet: "veg",
      img: "/Checker Charm.png",
      category: "Cookies"
    },
    {
      id: "cook-3",
      name: "Jammy Drops",
      desc: "Delicate thumbprint butter cookies filled with sweet fruit jam centers.",
      diet: "veg",
      img: "/Jammy Drops.png",
      category: "Cookies"
    },
    {
      id: "cook-4",
      name: "Golden Butter Bliss",
      desc: "Melt-in-your-mouth classic golden French butter cookies baked to perfection.",
      diet: "veg",
      img: "/Golden Butter Bliss.jpeg",
      category: "Cookies"
    },

    // 4. ARTISAN CHEESECAKES & DESSERT JARS
    {
      id: "ch-1",
      name: "Biscoff Bliss Cheesecake",
      desc: "Creamy cheesecake on a Lotus Biscoff biscuit crust, topped with Biscoff spread and crushed cookie crumble to give a heavenly taste.",
      diet: "veg",
      img: "/Biscoff Bliss Cheesecake.jpg",
      category: "Artisan Cheesecakes & Dessert Jars",
      tag: "Signature"
    },
    {
      id: "ch-2",
      name: "Oreo Obsession",
      desc: "Decadent cookie cheesecake bar layered with rich dark chocolate glaze and Oreo biscuit halves.",
      diet: "veg",
      img: "/Oreo Obsession.jpeg",
      category: "Artisan Cheesecakes & Dessert Jars"
    },
    {
      id: "ch-3",
      name: "Mango Majesty",
      desc: "Tropical cheesecake slab with smooth Alphonso mango glaze and fresh mint-garnished mango slice fans.",
      diet: "veg",
      img: "/Mango Majesty.jpeg",
      category: "Artisan Cheesecakes & Dessert Jars",
      tag: "Seasonal"
    },
    {
      id: "ch-4",
      name: "Berry Bliss Dessert Jar",
      desc: "Indulgent layered glass jar with butter biscuit crust, vanilla cheesecake cream, and fresh wild berry compote.",
      diet: "veg",
      img: "/Berry Bliss Dessert Jar.png",
      category: "Artisan Cheesecakes & Dessert Jars"
    },

    // 5. DONUTS
    {
      id: "don-1",
      name: "Frosted Midnight",
      desc: "Soft yeast donut dipped in rich dark chocolate icing and decorated with golden sprinkles.",
      diet: "egg",
      img: "/Frosted Midnight.jpeg",
      category: "Donuts"
    },
    {
      id: "don-2",
      name: "Cinnamon Sugar",
      desc: "Soft brioche donut tossed in fragrant cinnamon sugar for a warm, comforting finish.",
      diet: "egg",
      img: "/Cinnamon Sugar 1.jpeg",
      images: [
        "/Cinnamon Sugar 1.jpeg",
        "/Cinnamon Sugar 2.jpeg"
      ],
      category: "Donuts"
    },
    {
      id: "don-3",
      name: "Classic Glazed Donut",
      desc: "Timeless ring donut with a light, glossy vanilla bean glaze.",
      diet: "egg",
      img: "/Classic Glazed Donut.png",
      category: "Donuts"
    },
    {
      id: "don-4",
      name: "Caramel Crumble",
      desc: "Golden donut drizzled with warm salted caramel glaze and topped with crunchy crumble.",
      diet: "egg",
      img: "/Caramel Crumble.png",
      category: "Donuts"
    },
    {
      id: "don-5",
      name: "Midnight Oreo",
      desc: "Dark chocolate glazed donut topped generously with crushed Oreo cookies.",
      diet: "egg",
      img: "/Midnight Oreo.png",
      category: "Donuts"
    },

    // 6. CREAMY YOGURTS
    {
      id: "yog-1",
      name: "Blue Velvet",
      desc: "Silky cultured yogurt layered with sweet blueberry compote.",
      diet: "veg",
      img: "/Blue Velvet.jpeg",
      category: "Creamy Yogurts",
      tag: "Fresh & Healthy"
    },
    {
      id: "yog-2",
      name: "Berry Blossom",
      desc: "Rich cultured yogurt blended with fresh strawberry puree, served with whole ripe strawberries.",
      diet: "veg",
      img: "/Berry Blossom.jpeg",
      category: "Creamy Yogurts"
    },

    // 7. CELEBRATION CAKES
    {
      id: "cake-0",
      name: "Custom Celebration & Theme Cakes",
      desc: "Bespoke handcrafted cakes tailored for birthdays and anniversaries with custom theme sculpting and artistic buttercream.",
      diet: "both",
      img: "/WhatsApp Image 2026-07-31 at 4.55.09 PM (18).jpeg",
      images: [
        "/WhatsApp Image 2026-07-31 at 4.55.09 PM (18).jpeg",
        "/WhatsApp Image 2026-07-31 at 5.04.43 PM (2).jpeg"
      ],
      category: "Celebration Cakes",
      flavors: [
        "Plain Sweet Vanilla",
        "Chocolate",
        "Pineapple",
        "Mixed Fruits",
        "Customised Cream / Buttercream",
        "Fondant Celebration",
        "Ferrero Rocher",
        "Chocolate Truffle",
        "Black Forest"
      ],
      tag: "Custom Bespoke"
    },
    {
      id: "cake-cricket",
      name: "Sporty Cricket Cake",
      desc: "Customised cricket-themed cake, crafted to make the special moments unforgettable!",
      diet: "both",
      img: "/Cricket Theme.jpeg",
      images: [
        "/Cricket Theme.jpeg",
        "/Cricket Theme 1.jpeg"
      ],
      category: "Celebration Cakes"
    },
    {
      id: "cake-2",
      name: "3D Racing Red Car Cake",
      desc: "Sculpted 3D car cake finished with detailed fondant bodywork, edible wheels and personalized plate.",
      diet: "both",
      img: "/3D Racing Red Car Cake.jpeg",
      images: [
        "/3D Racing Red Car Cake.jpeg",
        "/3D Racing Red Car Cake 2.jpeg"
      ],
      category: "Celebration Cakes"
    },
    {
      id: "cake-3",
      name: "Butterfly Garden Cake",
      desc: "Artistic butterfly-shaped cake piped with pastel buttercreams and edible sugar pearls.",
      diet: "both",
      img: "/Butterfly Garden Cake 1.jpeg",
      images: [
        "/Butterfly Garden Cake 1.jpeg",
        "/Butterfly Garden Cake 2.jpeg"
      ],
      category: "Celebration Cakes"
    },
    {
      id: "cake-4",
      name: "Cricket Player Cake",
      desc: "Personalized sports birthday cake featuring handcrafted edible player figurine and cricket match detailing.",
      diet: "both",
      img: "/Cricket Player Cake.jpeg",
      images: [
        "/Cricket Player Cake.jpeg",
        "/Cricket Player Cake 2.jpeg"
      ],
      category: "Celebration Cakes",
      imgFit: "contain"
    },
    {
      id: "cake-5",
      name: "Ferrero Rocher & Chocolate Truffle Gateau",
      desc: "Layered Belgian chocolate cake decorated with hazelnut crunch, chocolate drip, and cocoa dust.",
      diet: "both",
      img: "/Ferrero Rocher & Chocolate Truffle.jpeg",
      category: "Celebration Cakes"
    },
    {
      id: "cake-golden",
      name: "Golden Elegance",
      desc: "Luxuriously smooth cream, elegant golden accents, and delicate detailing come together in this stunning cake, crafted to celebrate 50 beautiful years.",
      diet: "both",
      img: "/Golden Jubilee.jpeg",
      category: "Celebration Cakes"
    },
    {
      id: "cake-icecream",
      name: "Ice Cream Cone Delight",
      desc: "A Playful Cake with Smooth Cream, Colorful Swirls & Sweet Cone Charm",
      diet: "both",
      img: "/Icecream Cone Delight 2.jpeg",
      images: [
        "/Icecream Cone Delight 2.jpeg",
        "/Icecream Cone Delights.jpeg"
      ],
      category: "Celebration Cakes"
    },
    {
      id: "cake-ruby",
      name: "Ruby Heart Cake",
      desc: "A glossy red heart-shaped cake finished with silver pearls sits elegantly on a white plate, creating a romantic celebration centre-piece.",
      diet: "both",
      img: "/Ruby Heart.jpeg",
      category: "Celebration Cakes"
    }
  ];

  const categories = [
    "All",
    "Cupcakes",
    "Teacakes",
    "Cookies",
    "Artisan Cheesecakes & Dessert Jars",
    "Donuts",
    "Creamy Yogurts",
    "Celebration Cakes"
  ];

  const filteredProducts = activeCategory === "All"
    ? catalog
    : catalog.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0B0806] text-[#F5EFE6] font-sans selection:bg-[#E6C665]/30">

      {/* Top Banner — Marquee */}
      <div className="bg-[#050403] text-[#E6C665] text-[11px] uppercase tracking-[0.25em] font-medium py-2.5 border-b border-[#211811] overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <span key={i} className="flex gap-12 shrink-0">
              <span>✦ Handcrafted Small-Batch Bakery</span>
              <span>✦ Made Fresh Like Home</span>
              <span>✦ Egg & Eggless Options Available</span>
              <span>✦ Custom Celebration Cakes</span>
              <span>✦ WhatsApp: +91 99009 51492</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Luxury Sticky Header (Dark Obsidian Glass) */}
      <SiteHeader />

      {/* Hero Showcase Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-[#261D16] bg-gradient-to-b from-[#090705] via-[#0F0B08] to-[#15100B]">
        {/* Floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticles count={6} color="#E6C665" />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E6C665]/3 blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">


            <div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5EFE6] leading-[1.08] tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Handcrafted with intention.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="italic font-normal text-[#E6C665]"
                >
                  Baked for moments worth savouring.
                </motion.span>
              </h1>
            </div>

            <StaggerFadeIn delay={0.5}>
              <p className="text-base sm:text-lg text-[#C7B7A7] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Welcome to <span className="font-semibold text-[#F5EFE6]">Ozee&apos;s</span>! Where home-baked goodness meets handcrafted indulgence, made in small batches with premium ingredients and love.
              </p>
            </StaggerFadeIn>

            <StaggerFadeIn delay={0.65}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.a
                  href="#menu"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-gradient-to-r from-[#F7DC8D] via-[#E6C665] to-[#D4AF37] text-[#0B0806] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-black transition-all shadow-xl shadow-[#E6C665]/25"
                >
                  Explore Menu Collection
                </motion.a>
                <motion.a
                  href={wa("Custom Celebration Cake")}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  className="border border-[#E6C665]/70 text-[#F5EFE6] hover:bg-[#E6C665] hover:text-[#0B0806] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  Custom Cake Enquiry
                </motion.a>
              </div>
            </StaggerFadeIn>

            <StaggerFadeIn delay={0.8}>
              <div className="pt-8 border-t border-[#261D16] flex items-center justify-center lg:justify-start gap-8 text-xs text-[#A89889]">
                <div className="text-center">
                  <span className="block font-bold text-[#F5EFE6] text-lg"><AnimatedCounter end={100} suffix="%" /></span>
                  <span>Small Batch</span>
                </div>
                <div className="h-8 w-px bg-[#261D16]"></div>
                <div className="text-center">
                  <span className="block font-bold text-[#F5EFE6] text-lg"><AnimatedCounter end={7} suffix="+" /></span>
                  <span>Bake Categories</span>
                </div>
                <div className="h-8 w-px bg-[#261D16]"></div>
                <div className="text-center">
                  <span className="block font-bold text-[#F5EFE6] text-lg"><AnimatedCounter end={500} suffix="+" /></span>
                  <span>Happy Customers</span>
                </div>
              </div>
            </StaggerFadeIn>
          </div>

          {/* Hero Image Showcase Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#241A13] group"
              >
                <Image
                  src="/WhatsApp Image 2026-07-31 at 4.55.09 PM (23).jpeg"
                  alt="Berry Crown Cupcakes Showcase - Ozee's Bakery Bangalore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 flex items-end">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase">Berry Crown Cupcakes</span>
                </div>
                <div className="absolute inset-0 ring-inset ring-2 ring-[#E6C665]/0 group-hover:ring-[#E6C665]/30 rounded-3xl transition-all duration-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-[#241A13] group"
              >
                <Image
                  src="/WhatsApp Image 2026-07-31 at 4.55.09 PM (14).jpeg"
                  alt="Hazelnut Heaven Teacake - Ozee's Bakery Bangalore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </div>

            <div className="pt-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 80, rotate: 1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-[#241A13] group"
              >
                <Image
                  src="/images (7).jpg"
                  alt="Biscoff Bliss Cheesecake Showcase - Ozee's Bakery Bangalore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 80, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#241A13] group"
              >
                <Image
                  src="/WhatsApp Image 2026-07-31 at 4.55.09 PM (22).jpeg"
                  alt="Blue Velvet Creamy Yogurt Showcase - Ozee's Bakery Bangalore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Story / About Us Section */}
      <section id="about" className="py-24 bg-[#110D09] border-b border-[#261D16] relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E6C665]/4 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E6C665]/4 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          
          <StaggerFadeIn delay={0}>
            <div className="inline-flex items-center gap-3">
              <motion.span
                className="h-px bg-[#E6C665]/50"
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-[#E6C665] text-xs uppercase tracking-[0.3em] font-semibold">The Heart Behind Ozee&apos;s</span>
              <motion.span
                className="h-px bg-[#E6C665]/50"
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </StaggerFadeIn>

          <StaggerFadeIn delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EFE6]">
              Our Story & Passion
            </h2>
          </StaggerFadeIn>

          <div className="space-y-6 text-[#C7B7A7] text-base sm:text-lg font-light leading-relaxed">
            <StaggerFadeIn delay={0}>
              <p>
                It all began with our little boy, lovingly called <span className="font-serif italic text-[#E6C665] font-semibold">&quot;Ozee.&quot;</span> His laughter, curiosity, and the simple joy he found in homemade treats became the spark behind a dream that slowly grew into <span className="font-semibold text-[#F5EFE6]">Ozee&apos;s</span>.
              </p>
            </StaggerFadeIn>
            <StaggerFadeIn delay={0.1}>
              <p>
                As a mother, I discovered that the happiest moments in life are often the simplest - watching a cake rise in the oven, decorating cupcakes together, or sharing sweet treats around the table with family and friends. Those moments taught me that baking is more than recipes; it is a way of expressing love, creating memories, and bringing people together.
              </p>
            </StaggerFadeIn>
            <StaggerFadeIn delay={0.2}>
              <div className="py-4">
                <p className="font-serif text-2xl text-[#E6C665] italic font-semibold">
                  &ldquo;Then Ozee&apos;s came into being from that simple and true belief!!&rdquo;
                </p>
              </div>
            </StaggerFadeIn>
            <StaggerFadeIn delay={0.3}>
              <p>
                Two circles, one beautiful connection - between the warmth of home and the joy of handcrafted indulgence. Every Ozee&apos;s creation begins with that connection: thoughtfully made, lovingly baked, and meant to bring a little happiness to your table.
              </p>
            </StaggerFadeIn>
          </div>

          <StaggerFadeIn delay={0.2} scale={true}>
            <div className="pt-6">
              <div className="relative aspect-[16/8] max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B2119] group">
                <Image
                  src="/WhatsApp Image 2026-07-31 at 5.04.43 PM (2).jpeg"
                  alt="Ozee's Custom Cake Portfolio Showcase - Bangalore Bakery"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <GoldShimmer />
              </div>
            </div>
          </StaggerFadeIn>

        </div>
      </section>

      {/* Main Interactive Catalog Section */}
      <section id="menu" className="py-24 bg-[#0B0806] border-b border-[#261D16] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingParticles count={3} color="#E6C665" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <StaggerFadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[#E6C665] text-xs uppercase tracking-[0.3em] font-semibold">Handcrafted Catalogue</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EFE6]">
              Discover Your Ozee&apos;s Favourite
            </h2>
            <p className="text-[#C7B7A7] font-light text-base sm:text-lg">
              Explore Ozee&apos;s world of handcrafted indulgence - from freshly baked cupcakes and delicate teacakes to decadent cheesecakes, irresistible donuts, creamy yogurts, and celebration cakes made just for your special moments.
            </p>
          </StaggerFadeIn>

          {/* Interactive Category Filter Bar */}
          <StaggerFadeIn delay={0.1} className="flex items-center justify-center flex-wrap gap-2 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                layout
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 relative overflow-hidden ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#F7DC8D] via-[#E6C665] to-[#D4AF37] text-[#0B0806] font-black shadow-lg shadow-[#E6C665]/30"
                    : "bg-[#18110D] border border-[#2B2018] text-[#C7B7A7] hover:border-[#E6C665]/60 hover:text-[#E6C665]"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-[#F7DC8D] via-[#E6C665] to-[#D4AF37] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </StaggerFadeIn>

          {/* Catalog Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((item, i) => (
                <ProductCard key={item.id} item={item} wa={wa} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
          <ProductJsonLd products={catalog.map(p => ({
            name: p.name,
            description: p.desc,
            category: p.category,
            diet: p.diet,
            image: p.img,
          }))} />

        </div>
      </section>

      {/* Custom Cake Showcase Banner */}
      <section className="py-20 bg-[#16100B] text-[#F5EFE6] border-b border-[#261D16] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-[#E6C665]/30 to-transparent" />
          <FloatingParticles count={2} color="#E6C665" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          
          <StaggerFadeIn>
            <span className="text-[#E6C665] text-xs uppercase tracking-[0.3em] font-semibold">Bespoke Celebrations</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-2">Have a Custom Theme in Mind?</h2>
          </StaggerFadeIn>
          <StaggerFadeIn delay={0.15}>
            <p className="text-[#D6C7B8] font-light text-base sm:text-lg max-w-2xl mx-auto">
              From cricket pitch cakes to 3D cars, butterfly gardens, and elegant anniversary cakes — we turn your celebration ideas into edible art.
            </p>
          </StaggerFadeIn>

          <StaggerFadeIn delay={0.3}>
            <div className="pt-4">
              <motion.a
                href={wa("Custom Celebration Cake")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-9 py-4 rounded-full font-bold shadow-xl shadow-[#25D366]/25 text-xs uppercase tracking-widest"
              >
                <span>Discuss Custom Cake on WhatsApp (+91 99009 51492)</span>
              </motion.a>
            </div>
          </StaggerFadeIn>

        </div>
      </section>

      {/* Ordering Process & Timelines */}
      <section id="ordering" className="py-24 bg-[#110D09] border-b border-[#261D16] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-40 left-0 w-72 h-72 rounded-full bg-[#E6C665]/4 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            
            <StaggerFadeIn delay={0} className="lg:col-span-7">
              <div className="bg-[#18110D] p-8 sm:p-12 rounded-3xl border border-[#2B2018] shadow-sm flex flex-col justify-between space-y-6 h-full">
                <div>
                  <span className="text-[#E6C665] text-xs uppercase tracking-[0.3em] font-semibold">Simple & Direct</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFE6] mt-2 mb-6">How to Order from Ozee&apos;s</h2>

                  <div className="space-y-4 text-sm text-[#C7B7A7]">
                    {[
                      { n: 1, title: "Browse & Select:", desc: "Choose your favorite treats from our menu categories." },
                      { n: 2, title: "Share Requirements:", desc: "Send us product name, desired flavor, quantity, egg/eggless preference, and pickup date via WhatsApp." },
                      { n: 3, title: "Order Confirmation:", desc: "We confirm availability and share payment details." },
                      { n: 4, title: "Fresh Small-Batch Baking:", desc: "Your order is handcrafted fresh for your celebration day." },
                    ].map((step, idx) => (
                      <StaggerFadeIn key={step.n} delay={idx * 0.1}>
                        <div className="flex gap-4 items-start">
                          <motion.span
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F7DC8D] to-[#D4AF37] text-[#0B0806] text-xs flex items-center justify-center shrink-0 font-black shadow-md"
                          >
                            {step.n}
                          </motion.span>
                          <p><strong className="text-[#F5EFE6]">{step.title}</strong> {step.desc}</p>
                        </div>
                      </StaggerFadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerFadeIn>

            <StaggerFadeIn delay={0.15} className="lg:col-span-5">
              <div className="bg-[#080604] text-[#F5EFE6] p-8 sm:p-12 rounded-3xl border border-[#2B2018] flex flex-col justify-between space-y-6 h-full">
                <div>
                  <span className="text-[#E6C665] text-xs uppercase tracking-[0.3em] font-semibold">Advance Notice</span>
                  <h3 className="font-serif text-3xl font-bold text-[#F5EFE6] mt-2 mb-6">Order Timelines</h3>
                  <div className="space-y-4 text-sm text-[#C7B7A7]">
                    {[
                      { label: "Cupcakes, Cookies & Donuts:", time: "24 – 36 hours notice" },
                      { label: "Teacakes & Creamy Yogurts:", time: "24 – 48 hours notice" },
                      { label: "Cheesecakes & Dessert Jars:", time: "48 – 72 hours notice" },
                      { label: "Custom Theme & Celebration Cakes:", time: "Contact in advance" },
                    ].map((item, idx) => (
                      <StaggerFadeIn key={item.label} delay={idx * 0.1}>
                        <p>• <strong className="text-[#E6C665]">{item.label}</strong> {item.time}</p>
                      </StaggerFadeIn>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#261D16] text-center">
                  <motion.a
                    href={wa()}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="block w-full bg-[#25D366] text-white py-4 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg"
                  >
                    Order via WhatsApp (+91 99009 51492)
                  </motion.a>
                </div>
              </div>
            </StaggerFadeIn>

          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

    </div>
  );
}

