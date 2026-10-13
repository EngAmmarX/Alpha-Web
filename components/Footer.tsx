"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  lang: "ar" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const isRtl = lang === "ar";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t dark:border-[#d4af37]/20 border-slate-200 dark:bg-[#030812] bg-slate-50 dark:text-slate-400 text-slate-600 pt-16 pb-12 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b dark:border-slate-800 border-slate-200">
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="h-14 sm:h-16 flex items-center justify-start">
              <img
                src="/assets/aap-logo-gold.png"
                alt="ALPHA POWER for Electrical Industries"
                className="h-full w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
              />
            </div>
            <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed">
              {isRtl
                ? "مصنع ألفا باور للصناعات الكهربائية — حلول كهروميكانيكية وصناعية متكاملة وتصنيع اللوحات ومسارات الكابلات بالمملكة العربية السعودية ومصر."
                : "ALPHA POWER for Electrical Industries delivers turnkey electromechanical, switchgear, and cable management solutions across Saudi Arabia and Egypt."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold dark:text-white text-slate-900 uppercase tracking-wider">
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "الصفحة الرئيسية" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "من نحن (الملف التعريفي)" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "الخدمات الكهروميكانيكية" : "Engineering Services"}
                </Link>
              </li>
              <li>
                <Link href="/factory" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "مصنع ألفا باور للصناعات الكهربائية" : "ALPHA POWER Factory & Products"}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "سابقة الأعمال (المشاريع)" : "Projects Portfolio"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4af37] transition-colors">
                  {isRtl ? "تواصل معنا" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Branches */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold dark:text-white text-slate-900 uppercase tracking-wider">
              {isRtl ? "الفروع الرئيسية" : "Main Branches"}
            </h4>
            <div className="space-y-2.5 text-xs dark:text-slate-300 text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span>
                  {isRtl ? "الدمام، السعودية: 3554 شارع الملك فهد، حي العدامة" : "Dammam, KSA: 3554 King Fahad St."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span>
                  {isRtl ? "الإسكندرية، مصر: 42 شارع مسجد الأنصار، سيدي جابر" : "Alexandria, Egypt: 42 Masjed Elanser St."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span>
                  {isRtl ? "المصنع: المنطقة الصناعية الرابعة، برج العرب الجديدة" : "Factory: 4th Industrial Zone, Borg El Arab"}
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Phones & Direct Inquiries */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold dark:text-white text-slate-900 uppercase tracking-wider">
              {isRtl ? "الاتصال المباشر" : "Direct Inquiries"}
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+966567693915" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span dir="ltr">+966 56 769 3915 (KSA)</span>
              </a>
              <a href="tel:+201226003327" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span dir="ltr">+20 122 600 3327 (Alex)</span>
              </a>
              <a href="mailto:info@aap-power.com" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>info@aap-power.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="dark:text-slate-400 text-slate-600">
            © 2026 ALPHA POWER for Electrical Industries. {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          {/* Exactly requested credit */}
          <div className="p-2 px-4 rounded-full dark:bg-slate-900 bg-white border dark:border-[#d4af37]/30 border-amber-300 dark:text-[#f3e5ab] text-amber-900 font-medium tracking-wide shadow-sm">
            Website created by Engineer Ammar
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border dark:border-slate-800 border-slate-300 dark:bg-slate-900 bg-white dark:text-slate-300 text-slate-700 hover:text-[#d4af37] hover:border-[#d4af37] transition-all flex items-center gap-1.5 shadow-sm"
            aria-label="Back to top"
          >
            <span>{isRtl ? "للأعلى" : "Top"}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
