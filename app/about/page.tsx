"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Factory
} from "lucide-react";

export default function AboutPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDark, setIsDark] = useState<boolean>(true);
  const isRtl = lang === "ar";

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("alpha_theme");
      if (savedTheme) setIsDark(savedTheme === "dark");
      const savedLang = localStorage.getItem("alpha_lang");
      if (savedLang === "ar" || savedLang === "en") setLang(savedLang);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("alpha_theme", "dark"); } catch(e) {}
    } else {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("alpha_theme", "light"); } catch(e) {}
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    try { localStorage.setItem("alpha_lang", lang); } catch(e) {}
  }, [lang, isRtl]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />

      {/* Page Header */}
      <section className="py-16 bg-maze-pattern border-b border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Building2 className="w-4 h-4" />
              <span>{isRtl ? "الملف التعريفي للشركة" : "Company Profile"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground">
              {isRtl ? (
                <>
                  عن مصنع ألفا باور للصناعات الكهربائية <br />
                  <span className="text-gold-gradient">مسيرة هندسية وصناعية متكاملة</span>
                </>
              ) : (
                <>
                  About ALPHA POWER for Electrical Industries <br />
                  <span className="text-gold-gradient">Integrated Engineering & Manufacturing</span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "تاريخ حافل بالتميز الهندسي في إدارة وتنفيذ مشاريع المقاولات الكهروميكانيكية المتكاملة والتصنيع الدقيق بين المملكة العربية السعودية وجمهورية مصر العربية."
                : "A proven legacy of engineering excellence in managing and executing turnkey MEP solutions and precision manufacturing across Saudi Arabia and Egypt."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Leadership & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {isRtl ? "الإدارة والريادة التنفيذية" : "Executive Leadership & Heritage"}
            </h2>
            <div className="p-4 rounded-xl bg-card border border-[#d4af37]/30 shadow-md">
              <span className="text-xs text-[#d4af37] font-bold block mb-1">
                CEO
              </span>
              <strong className="text-lg text-foreground block">
                {isRtl ? "عادل سعد محمد" : "Adel Saad Mohamed"}
              </strong>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isRtl
                  ? "قيادة تنفيذية وهندسية بخبرات متراكمة في إدارة المشاريع الكهروميكانيكية الكبرى، مع الالتزام التام بالجداول الزمنية والمواصفات القياسية الدولية."
                  : "Executive and engineering leadership with deep expertise in executing complex MEP projects, adhering strictly to global standards and project timelines."}
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isRtl
                ? "تأسس مصنع ألفا باور للصناعات الكهربائية وشركة ألفا باور ليكون حلقة وصل بين التخطيط الهندسي المتقن والتنفيذ الميداني عالي الدقة. نحن نخدم قطاعات الرعاية الصحية، الأبراج الإدارية، المجمعات السكنية، والمصانع العملاقة."
                : "ALPHA POWER for Electrical Industries was established to bridge advanced engineering design with precision manufacturing and on-site turnkey installation, serving healthcare, commercial, residential, and heavy industrial facilities."}
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl aspect-[4/3]">
              <Image
                src="/assets/project-022.webp"
                alt="Alpha Power Engineering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-[#d4af37]/30 shadow-md space-y-3">
            <div className="p-3 w-fit rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {isRtl ? "رؤيتنا (Our Vision)" : "Our Vision"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isRtl
                ? "أن نكون الكيان الهندسي والصناعي الأكثر موثوقية وتميزاً في مجال الحلول الكهروميكانيكية المتكاملة وتصنيع لوحات الطاقة ومسارات الكابلات في المملكة العربية السعودية والشرق الأوسط."
                : "To be the most trusted and recognized electromechanical and industrial engineering powerhouse in Saudi Arabia and the Middle East, driven by quality and continuous innovation."}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-[#d4af37]/30 shadow-md space-y-3">
            <div className="p-3 w-fit rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {isRtl ? "رسالتنا (Our Mission)" : "Our Mission"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isRtl
                ? "تقديم خدمات هندسية وصناعية متطورة تتجاوز تطلعات عملائنا وشركائنا، مع الحفاظ على أعلى معايير السلامة المهنية الصارمة والنزاهة المهنية والهندسة القيمة."
                : "Delivering world-class engineering contracting and manufacturing services that exceed client expectations while maintaining paramount safety standards, integrity, and value engineering."}
            </p>
          </div>
        </div>

        {/* 6 Core Values */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground text-center">
            {isRtl ? "القيم المؤسسية الراسخة" : "Our Core Corporate Values"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "01", ar: "حلول ذات جدوى وتكلفة مدروسة", en: "Cost-Effective Solutions", descAr: "تحقيق أعلى كفاءة هندسية بأفضل التكاليف المدروسة للمشاريع.", descEn: "Optimizing engineering efficiency while respecting budgetary parameters." },
              { id: "02", ar: "ثقافة الجودة والسلامة المهنية (HSE)", en: "Quality & HSE Culture", descAr: "بيئة عمل آمنة خالية من الحوادث ومطابقة للأكواد الدولية.", descEn: "Zero-accident site policy aligned with rigorous HSE protocols." },
              { id: "03", ar: "الالتزام الدقيق بالجدول الزمني", en: "Timely Project Delivery", descAr: "تسليم الأعمال في مواعيدها المحددة وفق إدارة المسار الحرج.", descEn: "Strict adherence to critical path scheduling and milestone delivery." },
              { id: "04", ar: "شراكة متمحورة حول العميل", en: "Customer-Centric Focus", descAr: "بناء علاقات طويلة الأمد تقوم على الشفافية والتعاون المستمر.", descEn: "Long-term partnerships founded on technical transparency." },
              { id: "05", ar: "إدارة مشاريع احترافية", en: "Professional Project Management", descAr: "تنسيق متكامل بين التصاميم والتوريدات والتركيبات الميدانية.", descEn: "Seamless coordination across engineering, procurement, and site execution." },
              { id: "06", ar: "الهندسة القيمة (Value Engineering)", en: "Value Engineering", descAr: "إيجاد بدائل ذكية ترفع الأداء التشغيلي للمنشأة وتوفر النفقات.", descEn: "Innovative alternatives boosting building performance and lifecycle." }
            ].map((v) => (
              <div key={v.id} className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-2">
                <span className="text-sm font-bold text-[#d4af37] font-mono">{v.id}</span>
                <h4 className="text-base font-bold text-foreground">{isRtl ? v.ar : v.en}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{isRtl ? v.descAr : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
