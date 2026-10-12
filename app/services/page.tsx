"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Wind,
  Zap,
  Flame,
  Wrench,
  Cable,
  ShieldCheck,
  Building2,
  Factory,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
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

  const serviceList = [
    {
      icon: Wind,
      titleAr: "أنظمة التكييف والتهوية المتقدمة (HVAC)",
      titleEn: "HVAC & Ventilation Systems",
      descAr: "تصميم وتوريد وتركيب أنظمة المياه المثلجة (Chilled Water Plants)، أنظمة تدفق مائع التبريد المتغير (VRF)، وحدات البكج المدمجة، وشبكات مجاري الهواء وتوزيع التبريد للمستشفيات والأبراج والمصانع.",
      descEn: "Turnkey design, supply, and installation of chilled-water central plants, Variable Refrigerant Flow (VRF), package rooftop units, and engineered air distribution ductworks.",
      pointsAr: ["محطات الشيلر والمضخات المتطورة", "أنظمة VRF الموفرة للطاقة", "تهوية المستودعات والمصانع وعوادم الدخان", "أنظمة غرف العمليات النظيفة (Clean Rooms)"],
      pointsEn: ["Central chiller plants & pump skids", "High-efficiency VRF networks", "Industrial ventilation & smoke extraction", "Clean-room HVAC for healthcare"]
    },
    {
      icon: Zap,
      titleAr: "الأعمال والشبكات الكهربائية المتكاملة",
      titleEn: "Electrical Power & Distribution",
      descAr: "تنفيذ محطات وشبكات الجهد المتوسط والمنخفض، لوحات التوزيع الرئيسية والفرعية، المولدات الاحتياطية، أنظمة الإنارة المعمارية والصناعية، وشبكات التأريض ومانعات الصواعق المعتمدة.",
      descEn: "Medium & low-voltage power networks, main distribution switchboards, emergency backup generators, architectural illumination, and certified earthing & lightning protection.",
      pointsAr: ["محطات التوزيع ولوحات MDB / SMDB", "شبكات الكابلات والمحولات الكهربائية", "أنظمة UPS ومحطات الطاقة الاحتياطية", "شبكات التأريض المتوافقة مع الكود السعودي"],
      pointsEn: ["MDB / SMDB distribution panels", "Transformer yards & cabling networks", "UPS systems & standby power", "Saudi Building Code compliant earthing"]
    },
    {
      icon: Flame,
      titleAr: "مكافحة الحريق والإنذار المبكر المعتمد",
      titleEn: "Fire Fighting & Fire Alarm Systems",
      descAr: "توريد وتنفيذ شبكات رشاشات المياه الآلية (Sprinkler Systems)، شبكات الإطفاء بالغازات النظيفة (FM200 / Novec / CO2)، محطات مضخات الحريق المعتمدة UL/FM، وأنظمة الإنذار الذكية المعنونة.",
      descEn: "Automatic sprinkler networks, clean agent gaseous suppression (FM200/Novec/CO2), UL/FM listed fire pump packages, and addressable intelligent fire alarm installations.",
      pointsAr: ["شبكات الإطفاء الرطبة والجافة", "مضخات الحريق المعتمدة من الدفاع المدني", "إطفاء غرف السيرفرات والمحولات بالغاز", "أنظمة كشف وإنذار الدخان الذكية المعنونة"],
      pointsEn: ["Wet and dry pipe sprinkler systems", "Civil Defense certified fire pumps", "Server room clean agent protection", "Addressable fire alarm detectors"]
    },
    {
      icon: Wrench,
      titleAr: "أنظمة السباكة وشبكات المياه والصرف",
      titleEn: "Plumbing & Sanitary Systems",
      descAr: "تصميم وتنفيذ شبكات تغذية المياه النقية، محطات الرفع والمضخات المعززة، أنظمة تصريف مياه الأمطار والصرف الصحي المعالج، وشبكات المياه للمنشآت الطبية والصناعية.",
      descEn: "Potable water supply booster stations, commercial sanitary drainage, rainwater harvesting systems, and specialized piping infrastructure for industrial facilities.",
      pointsAr: ["محطات ضخ وتوزيع المياه النقية", "شبكات الصرف الصحي والمصائد الصناعية", "تصريف مياه الأمطار والسيول", "شبكات السباكة للمستشفيات والمختبرات"],
      pointsEn: ["Domestic water booster systems", "Sanitary drainage & grease interceptors", "Rainwater drainage & storm lines", "Healthcare specialized piping"]
    },
    {
      icon: Cable,
      titleAr: "أنظمة التيار الخفيف والأنظمة الذكية",
      titleEn: "Low-Current & Smart Building Systems",
      descAr: "كاميرات المراقبة التلفزيونية عالية الدقة (CCTV)، أنظمة التحكم في الدخول (Access Control)، أنظمة الإذاعة الداخلية والنداء العام، وشبكات البيانات والألياف البصرية.",
      descEn: "High-definition CCTV surveillance, biometric access control, public address & background music, IP intercom, and structured fiber optic/data networking.",
      pointsAr: ["كاميرات المراقبة والتحكم الأمني", "أنظمة البوابات والتحكم في الدخول", "أنظمة النداء العام والإخلاء الصوتي", "تمديدات الداتا والسنترالات المتطورة"],
      pointsEn: ["Enterprise CCTV & security controls", "Biometric access gates & readers", "Public address & voice evacuation", "Structured cabling & IP telephony"]
    },
    {
      icon: ShieldCheck,
      titleAr: "إدارة الكابلات والحماية الكهربائية",
      titleEn: "Cable Management & Systems Protection",
      descAr: "توريد وتركيب مسارات وحوامل الكابلات المعدنية من إنتاج مصنع الشركة، القنوات الأرضية والمعلقة، وحلول حماية الشبكات من التداخلات الكهرومغناطيسية والعوامل البيئية.",
      descEn: "Supply and precision installation of cable ladder trays, perforated channels, floor raceways, and EMI shielding solutions from our specialized factory.",
      pointsAr: ["سلالم الكابلات المجلفنة على الساخن", "قنوات حوامل الكابلات المثقبة والمسدودة", "حوامل الكابلات العلوية وتحت الأرضية", "ملحقات التثبيت والتعليق المقاومة للاهتزاز"],
      pointsEn: ["Hot-dip galvanized cable ladders", "Perforated & duct cable trays", "Overhead & underfloor raceways", "Seismic-resistant suspension fittings"]
    },
    {
      icon: Factory,
      titleAr: "منتجات مصنع ألفا المتقدم ببرج العرب",
      titleEn: "Advanced Alpha Factory Manufacturing",
      descAr: "تشكيل وتصنيع صاج عالي الدقة، لوحات التوزيع FT/FW/FF حتى 4,000 أمبير، أرفف التخزين المستودعي الثقيلة، أبواب الطوارئ المقاومة للحريق لمدة 120 دقيقة، وكبائن الإطفاء.",
      descEn: "Precision sheet-metal manufacturing, certified LV panels up to 4,000A, heavy industrial warehouse pallet racks, 120-minute fire-rated emergency exit doors, and fire hose cabinets.",
      pointsAr: ["لوحات التوزيع المعتمدة IP54", "سلالم الكابلات المطابقة لـ IEC 61537", "أرفف التخزين المستودعي المصممة للأحمال الثقيلة", "أبواب الطوارئ المصفحة المقاومة للحريق"],
      pointsEn: ["IP54 rated switchboard enclosures", "IEC 61537 certified cable trays", "Heavy-duty industrial pallet racks", "Fire-rated emergency exit steel doors"]
    },
    {
      icon: Building2,
      titleAr: "إدارة وتسليم المشاريع المتكاملة (Turnkey)",
      titleEn: "Turnkey Project Delivery & Management",
      descAr: "إدارة هندسية شاملة للمشاريع تبدأ من الدراسات الأولية، اعتماد المخططات التنفيذية (Shop Drawings)، التوريد والتركيب، وحتى الاختبار والتشغيل التجريبي والتسليم النهائي للمالك.",
      descEn: "End-to-end engineering project management spanning shop-drawing submittals, procurement, on-site installation, technical testing, commissioning, and final handover.",
      pointsAr: ["إعداد المخططات التنفيذية المنسقة (MEP Coordination)", "إدارة الجودة والسلامة الميدانية الصارمة", "الاختبارات التشغيلية الشاملة (Testing & Commissioning)", "عقود الصيانة الوقائية والتشغيل الممتدة"],
      pointsEn: ["Coordinated MEP shop drawings", "Rigorous on-site QA/QC & HSE management", "Comprehensive Testing & Commissioning", "Preventive maintenance contracts"]
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
              <Wrench className="w-4 h-4" />
              <span>{isRtl ? "الخدمات الهندسية الشاملة" : "Turnkey Engineering Capabilities"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              {isRtl ? (
                <>
                  خدماتنا الكهروميكانيكية <br />
                  <span className="text-gold-gradient">منظومات حيوية تنبض بالثقة والدقة</span>
                </>
              ) : (
                <>
                  Our Engineering Services <br />
                  <span className="text-gold-gradient">Mission-Critical Electromechanical Solutions</span>
                </>
              )}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "نقدم حزمة متكاملة من الخدمات المتخصصة التي تغطي كافة متطلبات المنشآت العصرية وفق أعلى معايير الجودة والسلامة العالمية."
                : "Comprehensive MEP disciplines covering design, supply, execution, and commissioning for modern infrastructure projects."}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#d4af37]/60 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {isRtl ? srv.titleAr : srv.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isRtl ? srv.descAr : srv.descEn}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-bold text-[#f3e5ab] block">
                      {isRtl ? "أبرز مميزات الخدمة:" : "Key Deliverables:"}
                    </span>
                    {(isRtl ? srv.pointsAr : srv.pointsEn).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    href="/contact"
                    className="btn-gold px-4 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-2"
                  >
                    <span>{isRtl ? "طلب دراسة هذا البند" : "Inquire About This Service"}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
