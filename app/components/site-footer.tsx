"use client";

import { motion } from "framer-motion";
import { StaggerFadeIn } from "./animations";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="bg-[#050403] text-[#F5EFE6] py-16 border-t border-[#211811]">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        
        <StaggerFadeIn>
          <motion.div
            className="flex flex-col items-center group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/ozees-logo.png"
              alt="Ozee's — Crafted With Love, Made Like Home"
              width={260}
              height={260}
              className="object-contain drop-shadow-[0_0_12px_rgba(230,198,101,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(230,198,101,0.55)] transition-all duration-300"
            />
          </motion.div>
        </StaggerFadeIn>

        <StaggerFadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8A7A6C]">
            <a href="/privacy-policy" className="hover:text-[#E6C665] transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-[#E6C665] transition-colors">Terms and Condition</a>
            <a href="/refund-return-cancellation" className="hover:text-[#E6C665] transition-colors">Refund, Return and Cancellation</a>
            <a href="/food-allergy" className="hover:text-[#E6C665] transition-colors">Food Alergy</a>
            <a href="/shipping-and-delivery" className="hover:text-[#E6C665] transition-colors">Shipping and Delivery</a>
          </div>
        </StaggerFadeIn>

        <StaggerFadeIn delay={0.2} yOffset={20}>
          <div className="pt-8 border-t border-[#211811] text-xs text-[#8A7A6C] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Ozee&apos;s Pâtisserie. All rights reserved.</p>
            <p>WhatsApp: +91 99009 51492 | www.ozees.in</p>
          </div>
        </StaggerFadeIn>

      </div>
    </footer>
  );
}
