"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Sun,
  Moon,
  Phone,
  Mail,
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface NavbarProps {
  lang: "ar" | "en";
  setLang: (l: "ar" | "en") => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
}

export default function Navbar({ lang, setLang, isDark, setIsDark }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isRtl = lang === "ar";

  const navLinks = [
    { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "/about", labelAr: "من نحن", labelEn: "About" },
    { href: "/services", labelAr: "خدماتنا", labelEn: "Services" },
    { href: "/factory", labelAr: "المصنع والمنتجات", labelEn: "Factory" },
    { href: "/projects", labelAr: "سابقة الأعمال", labelEn: "Portfolio" },
    { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" }
  ];

  return (
    <>
      {/* Top Executive Contact & Notice Bar */}
      <div className="border-b border-border bg-muted text-xs text-foreground py-2.5 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 dark:text-[#f3e5ab] text-amber-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
              {isRtl
                ? "المملكة العربية السعودية · جمهورية مصر العربية"
                : "Kingdom of Saudi Arabia · Arab Republic of Egypt"}
            </span>
            <span className="hidden md:inline dark:text-slate-600 text-slate-300">|</span>
            <span className="hidden md:inline dark:text-slate-400 text-slate-600">
              {isRtl
                ? "حلول كهروميكانيكية متكاملة وتصنيع صناعي دقيق"
                : "Electromechanical & Industrial Solutions · Precision Manufacturing"}
            </span>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="mailto:info@aap-power.com"
              className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>info@aap-power.com</span>
            </a>
            <a
              href="tel:+966567693915"
              className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span dir="ltr">+966 56 769 3915</span>
            </a>
            <a
              href="tel:+201226003327"
              className="inline-flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span dir="ltr">+20 122 600 3327</span>
            </a>

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-2 border-s dark:border-slate-700 border-slate-300 ps-3">
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="px-2.5 py-1 rounded bg-[#d4af37]/15 hover:bg-[#d4af37]/25 dark:text-[#f3e5ab] text-amber-900 font-semibold border border-[#d4af37]/30 transition-all flex items-center gap-1"
                aria-label="Switch language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "English" : "عربي"}</span>
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-1 rounded dark:text-slate-300 text-slate-700 hover:text-[#d4af37] dark:hover:bg-slate-800 hover:bg-slate-200 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-[#d4af37]" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/95 border-b border-border shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Main Logo: Clearly visible & high-res in Gold */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-14 sm:h-16 w-36 sm:w-48 flex items-center justify-start">
              <img
                src="/assets/aap-logo-gold.png"
                alt="Advanced Alpha Power Logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 transition-colors relative ${
                    isActive
                      ? "dark:text-[#f3e5ab] text-amber-900 font-bold"
                      : "text-foreground hover:text-[#d4af37]"
                  }`}
                >
                  {isRtl ? link.labelAr : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 start-0 end-0 h-0.5 bg-[#d4af37] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Consultation Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-gold px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <span>{isRtl ? "طلب استشارة هندسية" : "Request Consultation"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md border dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700 hover:text-[#d4af37]"
            aria-label="Toggle mobile menu"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-2 text-sm shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b dark:border-slate-800 border-slate-100 ${
                  pathname === link.href ? "dark:text-[#f3e5ab] text-amber-900 font-bold" : "dark:text-slate-200 text-slate-700 hover:text-[#d4af37]"
                }`}
              >
                {isRtl ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
