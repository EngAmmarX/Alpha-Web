"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Factory,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function FactoryPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDark, setIsDark] = useState<boolean>(true);
  const isRtl = lang === "ar";

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  const products = [
    {
      titleAr: "حوامل وسلالم الكابلات (Cable Tray Systems)",
      titleEn: "Cable Tray & Ladder Systems",
      descAr: "إنتاج متكامل لحوامل الكابلات بنظام السلالم (Ladder)، المثقبة (Perforated)، والمسدودة (Duct) بمقاسات تبدأ من 100 مم إلى 900 مم وبعمق حتى 150 مم وسماكة صاج من 1.0 إلى 2.0 مم مع الجلفنة على الساخن ومطابقة المواصفة IEC 61537.",
      descEn: "Engineered ladder, perforated and duct cable trays with standard lengths from 2,000 to 3,000 mm, widths from 100 to 900 mm, depths up to 150 mm, pre- or hot-dip galvanized to IEC 61537 standard."
    },
    {
      titleAr: "لوحات الجهد المنخفض (FT / FW / FF Switchboards)",
      titleEn: "Low-Voltage Enclosures & Switchgear",
      descAr: "تصنيع كبائن لوحات التوزيع القائمة على الأرض FT بتيار مقنن حتى 4,000 أمبير ودرجة حماية IP54 وقصر دارة 70kA، ولوحات FW المعلقة على الحائط حتى 630A، واللوحات الغاطسة FF حتى 200A.",
      descEn: "Fabrication of FT floor-standing switchboards rated up to 4,000A IP54 (70kA short circuit), FW wall-mounted panels up to 630A, and FF flush-mounted enclosures up to 200A."
    },
    {
      titleAr: "أرفف التخزين المستودعي الثقيلة (Warehouse Pallet Racks)",
      titleEn: "Heavy-Duty Warehouse Pallet Racks",
      descAr: "أنظمة التخزين الصناعي المصنعة من الصلب المتين 2.5 مم بارتفاعات قوائم من 2 إلى 6 أمتار وجسور مغلقة RB/CRB بأطوال تصل إلى 275 سم قادرة على تحمل أوزان البالتات الثقيلة بأمان.",
      descEn: "Heavy industrial racking systems engineered from 2.5 mm steel with upright heights from 2 to 6 meters and closed box beams up to 275 cm, maximizing warehouse capacity safely."
    },
    {
      titleAr: "أبواب الطوارئ المقاومة للحريق (Fire-Rated Steel Doors)",
      titleEn: "Fire-Rated Steel Emergency Exit Doors",
      descAr: "أبواب مصفحة لمخارج الطوارئ وعزل الحريق بسماكة ضلفة 1.5 مم وحلق 2.0 مم مع عزل الصوف الصخري ومقاومة حريق تصل حتى 120 دقيقة، معتمدة ومطلية بالبوليستر الإلكتروستاتيكي 80 ميكرون.",
      descEn: "Architectural fire doors with 1.5 mm steel leaf, 2.0 mm frame, mineral rock-wool core providing up to 120 minutes of certified fire separation, finished with electrostatic powder coating."
    },
    {
      titleAr: "كبائن خراطيم الحريق (Fire Hose Cabinets)",
      titleEn: "Fire Hose Cabinets (Mild Steel & SS316)",
      descAr: "خزائن إطفاء متينة من الصاج 1.2 مم أو الإستانلس ستيل 316 بتركيب سطحي أو غاطس، مع دوران مفصلات 180 درجة ومقاومة عالية للتآكل والعوامل الجوية.",
      descEn: "1.2 mm cold-rolled steel or marine-grade 316 stainless steel fire hose enclosures, surface or recessed mounted with 180° swing doors and weather resistance."
    },
    {
      titleAr: "أربطة الكابلات الفولاذية والبلاستيكية (TSL Series)",
      titleEn: "Cable Ties TSL Series",
      descAr: "أربطة تثبيت الكابلات عالية التحمل موديلات TSL باللونين الأبيض والأسود بمقاسات متنوعة لضمان التثبيت المحكم والآمن للشبكات الكهربائية.",
      descEn: "Industrial-grade cable ties in black and white variants across various dimensional ratings for secure electrical bundling."
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#050d1a] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />

      {/* Header */}
      <section className="py-16 bg-maze-pattern border-b border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Factory className="w-4 h-4" />
              <span>{isRtl ? "مصنع ألفا المتقدم · برج العرب" : "Advanced Alpha Factory · Borg El Arab"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              {isRtl ? (
                <>
                  التصنيع الصناعي الدقيق <br />
                  <span className="text-gold-gradient">منتجات معتمدة بمعايير عالمية</span>
                </>
              ) : (
                <>
                  Precision Manufacturing <br />
                  <span className="text-gold-gradient">Certified Products & Specifications</span>
                </>
              )}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "يمتلك المصنع في المنطقة الصناعية الرابعة ببرج العرب خطوط إنتاج متقدمة لتشكيل المعادن والدهان وتجميع اللوحات الكهربائية وسلالم الكابلات المعتمدة."
                : "Advanced Alpha Factory in the 4th Industrial Zone of Borg El Arab operates certified production lines for cable trays, switchboards, and heavy industrial storage."}
            </p>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl aspect-[16/9] max-w-4xl mx-auto">
          <Image
            src="/assets/project-006.webp"
            alt="Advanced Alpha Factory Borg El Arab"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 start-4 end-4 p-4 rounded-xl bg-[#050d1a]/85 backdrop-blur-sm border border-slate-700 flex items-center justify-between text-xs text-slate-200">
            <span className="font-bold text-[#f3e5ab]">
              {isRtl ? "مصنع ألفا المتقدم — الإسكندرية، مصر" : "Advanced Alpha Factory — Alexandria, Egypt"}
            </span>
            <span className="text-[#d4af37]">IEC 61537 Certified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#d4af37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#d4af37] block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRtl ? prod.titleAr : prod.titleEn}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isRtl ? prod.descAr : prod.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#f3e5ab] hover:text-[#d4af37] flex items-center gap-1.5"
                >
                  <span>{isRtl ? "طلب تسعير ومواصفات الكتالوج" : "Request Specifications & Quote"}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
