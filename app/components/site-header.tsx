"use client";

import Link from "next/link";
import Image from "next/image";

const phone = "919900951492";
const wa = (item?: string) => {
  const text = item
    ? encodeURIComponent(`Hi Ozee's! I would like to place an order for "${item}".`)
    : encodeURIComponent("Hi Ozee's! I would like to place an order from your menu.");
  return `https://wa.me/${phone}?text=${text}`;
};

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0806]/90 backdrop-blur-xl border-b border-[#261D16] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between pt-4">
        {/* Brand Logo (Vibrant Metallic Golden) */}
        <Link href="/" className="flex items-center group transition-transform hover:scale-105">
          <Image
            src="/ozees-logo.png"
            alt="Ozee's — Crafted With Love, Made Like Home"
            width={200}
            height={200}
            className="object-contain drop-shadow-[0_0_8px_rgba(230,198,101,0.25)] group-hover:drop-shadow-[0_0_16px_rgba(230,198,101,0.45)] transition-all duration-300"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.15em] uppercase text-[#D6C7B8]">
          <Link href="/#about" className="hover:text-[#E6C665] transition-colors relative py-1 group">
            Our Story
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C665] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/#menu" className="hover:text-[#E6C665] transition-colors relative py-1 group">
            The Oz&apos;s Universe
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C665] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link href="/#ordering" className="hover:text-[#E6C665] transition-colors relative py-1 group">
            Ordering Process
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C665] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>WhatsApp Order</span>
          </a>
        </div>

      </div>
    </header>
  );
}
