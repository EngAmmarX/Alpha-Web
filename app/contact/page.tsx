"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Building2,
  Factory,
  Compass,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#050d1a] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />

      {/* Header */}
      <section className="py-16 bg-maze-pattern border-b border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <MapPin className="w-4 h-4" />
              <span>{isRtl ? "المكاتب والفروع والتواصل" : "Offices & Official Contact"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              {isRtl ? (
                <>
                  تواصل مع شركة القوة المتقدمة <br />
                  <span className="text-gold-gradient">فريقنا الهندسي في خدمتكم</span>
                </>
              ) : (
                <>
                  Connect with Advanced Alpha Power <br />
                  <span className="text-gold-gradient">Our Engineering Team Is Ready to Assist</span>
                </>
              )}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "يسعدنا استقبال استفساراتكم ومناقشة متطلبات مشاريعكم الكهروميكانيكية وطلبات منتجات المصنع في السعودية ومصر."
                : "We welcome your inquiries and look forward to discussing your MEP contracting and factory fabrication needs."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-900/80 border border-[#d4af37]/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isRtl ? "إرسال طلب استشارة أو عرض أسعار" : "Submit Consultation or RFQ"}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {isRtl
                ? "املأ البيانات أدناه وسيقوم مهندس مختص بالتواصل معك في أقرب وقت."
                : "Fill in the details below and an engineer will connect with you promptly."}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#d4af37] mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  {isRtl ? "تم استلام رسالتكم بنجاح!" : "Message Received Successfully!"}
                </h3>
                <p className="text-xs text-slate-300">
                  {isRtl
                    ? "شكراً لتواصلكم مع شركة القوة المتقدمة. سيقوم فريقنا بالرد عليكم قريباً."
                    : "Thank you for connecting with AAP. Our team will review your inquiry shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isRtl ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={isRtl ? "م. فلان الفلاني" : "e.g. John Doe"}
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isRtl ? "اسم الشركة / الجهة" : "Company / Entity"}
                    </label>
                    <input
                      type="text"
                      placeholder={isRtl ? "اسم المؤسسة أو المشروع" : "Company name"}
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isRtl ? "رقم الهاتف / الجوال *" : "Phone / Mobile *"}
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+966 / +20..."
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isRtl ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@domain.com"
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isRtl ? "مجال الاستفسار *" : "Area of Interest *"}
                  </label>
                  <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]">
                    <option>{isRtl ? "مقاولات تكييف وتهوية (HVAC)" : "HVAC Contracting"}</option>
                    <option>{isRtl ? "شبكات وأعمال كهربائية" : "Electrical Works"}</option>
                    <option>{isRtl ? "شبكات مكافحة وإنذار الحريق" : "Fire Protection & Alarm"}</option>
                    <option>{isRtl ? "توريد حوامل وسلالم كابلات من المصنع" : "Factory Cable Trays"}</option>
                    <option>{isRtl ? "لوحات توزيع الجهد المنخفض (FT/FW/FF)" : "LV Switchboards"}</option>
                    <option>{isRtl ? "أبواب طوارئ مقاومة للحريق / كبائن" : "Fire Doors & Cabinets"}</option>
                    <option>{isRtl ? "أخرى / استشارة عامة" : "Other / General Inquiry"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isRtl ? "تفاصيل الرسالة أو متطلبات المشروع *" : "Message Details *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isRtl ? "اكتب تفاصيل طلبك والموقع والمواصفات المطلوبة..." : "Write your project specifications and requirements..."}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-[#d4af37]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-3.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRtl ? "إرسال الطلب الآن" : "Send Inquiry Now"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Branches Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* KSA */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-[#d4af37]">
                  {isRtl ? "المملكة العربية السعودية" : "Saudi Arabia"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{isRtl ? "مكتب الدمام" : "Dammam Office"}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                3554 King Fahad Ibn Abdulaziz Saud St., Al Adamah Dist., Dammam, KSA
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <a href="tel:+966567693915" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+966 56 769 3915</span>
                </a>
                <a href="tel:+966568621348" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+966 56 862 1348</span>
                </a>
              </div>
            </div>

            {/* Alex */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
                  <Compass className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-[#d4af37]">
                  {isRtl ? "الإسكندرية · مصر" : "Alexandria · Egypt"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {isRtl ? "مقر الإدارة والمقاولات" : "Management HQ"}
              </h3>
              <p className="text-xs text-[#f3e5ab] font-bold">
                {isRtl ? "إشراف م. عادل سعد محمد" : "Eng. Adel Saad Mohamed"}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                42 Masjed Elanser Street, Sidi Gaber, Alexandria, Egypt
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <a href="tel:+201226003327" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 122 600 3327</span>
                </a>
                <a href="tel:+201010634217" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 101 063 4217</span>
                </a>
                <a href="mailto:Alex.alpha.power@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Alex.alpha.power@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Factory */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
                  <Factory className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-[#d4af37]">
                  {isRtl ? "المصنع والإنتاج" : "Industrial Plant"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {isRtl ? "مصنع ألفا المتقدم" : "Advanced Alpha Factory"}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Part 15 block 33, 4th industrial zone, Borg El Arab, Alexandria, Egypt
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                <a href="tel:0201025262754" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 102 526 2754</span>
                </a>
                <a href="tel:0201150884433" className="flex items-center gap-2 text-slate-300 hover:text-[#d4af37]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 115 088 4433</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
