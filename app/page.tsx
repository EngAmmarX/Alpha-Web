"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientGlobe from "@/components/ClientGlobe";
import {
  Wind,
  Zap,
  Flame,
  Wrench,
  Cable,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Factory,
  Compass,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
  Target,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  HardHat,
  Cpu,
  Boxes,
  DoorClosed,
  FileText
} from "lucide-react";
import projectsRaw from "./data/projects.json";

interface ProjectItem {
  src: string;
  category: string;
  categoryEn: string;
  categoryAr: string;
  altEn: string;
  altAr: string;
  source: string;
  width?: number;
  height?: number;
}

const projectsList: ProjectItem[] = projectsRaw as ProjectItem[];

// Curated showcase projects with rich descriptions ("يكون فيها كلام")
const richProjects = [
  {
    id: 1,
    image: "/assets/project-080.webp",
    titleAr: "محطة التبريد المركزي وأنظمة الشيلرات الكبرى",
    titleEn: "Central Chilled Water Plant & Mega HVAC",
    categoryAr: "أنظمة التكييف والتهوية",
    categoryEn: "HVAC & Cooling",
    scopeAr: "توريد وتركيب واختبار وتشغيل محطات شيلر مركزية بقدرات تبريد فائقة، مع مد شبكات أنابيب المياه المعزولة ووحدات مناولة الهواء الذكية.",
    scopeEn: "Complete engineering, supply, installation and commissioning of industrial chilled-water plants, insulated distribution piping and AHUs.",
    specsAr: "قدرة 1,200 طن تبريد · كفاءة طاقة متقدمة",
    specsEn: "1,200 TR Capacity · High Energy Efficiency",
    locationAr: "المملكة العربية السعودية",
    locationEn: "Saudi Arabia",
    filter: "hvac"
  },
  {
    id: 2,
    image: "/assets/project-022.webp",
    titleAr: "محطة توزيع الطاقة والجهد المتوسط والمنخفض",
    titleEn: "MV/LV Power Distribution & Main Switchgear",
    categoryAr: "الأعمال والشبكات الكهربائية",
    categoryEn: "Electrical Systems",
    scopeAr: "تنفيذ البنية التحتية الكهربائية المتكاملة، لوحات التوزيع الرئيسية FT/FF حتى 4000 أمبير، شبكات الكابلات الأرضية ومحولات الجهد.",
    scopeEn: "Turnkey electrical infrastructure, certified main distribution boards (FT/FF) up to 4000A, underground cabling and transformer stations.",
    specsAr: "لوحات مصنعة ومعتمدة حتى 4,000A · IP54",
    specsEn: "Certified Panels up to 4,000A · IP54",
    locationAr: "المملكة العربية السعودية",
    locationEn: "Saudi Arabia",
    filter: "electrical"
  },
  {
    id: 3,
    image: "/assets/project-029.webp",
    titleAr: "شبكة مكافحة وإنذار الحريق للمجمعات والمستودعات",
    titleEn: "Firefighting & Early Detection Safety Systems",
    categoryAr: "مكافحة وإنذار الحريق",
    categoryEn: "Fire & Life Safety",
    scopeAr: "تركيب شبكات الرشاشات المائية التلقائية، منظومة مضخات الحريق المعتمدة UL/FM، وأنظمة الإنذار المبكر والتحكم بسحب الدخان.",
    scopeEn: "Installation of automatic wet/dry sprinkler networks, UL/FM certified fire pumps, intelligent addressable smoke detection and control.",
    specsAr: "مطابق لاشتراطات الدفاع المدني وكود NFPA",
    specsEn: "NFPA Standards & Civil Defense Approved",
    locationAr: "المملكة العربية السعودية",
    locationEn: "Saudi Arabia",
    filter: "fire"
  },
  {
    id: 4,
    image: "/assets/project-006.webp",
    titleAr: "تصنيع سلالم وحوامل الكابلات بمصنع ألفا",
    titleEn: "Cable Tray Systems Fabrication — Borg El Arab",
    categoryAr: "منتجات مصنع ألفا",
    categoryEn: "Factory Production",
    scopeAr: "إنتاج حوامل الكابلات من النوع السلمي والمثقب والمجرى، بأعلى معايير الجلفنة على الساخن لضمان مقاومة التآكل في البيئات القاسية.",
    scopeEn: "In-house precision fabrication of ladder, perforated and duct cable trays with hot-dip galvanizing for harsh environment durability.",
    specsAr: "معتمد IEC 61537 · جلفنة على الساخن BS EN ISO 1461",
    specsEn: "IEC 61537 Certified · Hot-Dip Galvanized",
    locationAr: "مصنع ألفا — برج العرب، مصر",
    locationEn: "Alpha Factory — Borg El Arab",
    filter: "factory"
  },
  {
    id: 5,
    image: "/assets/project-116.webp",
    titleAr: "التنفيذ الكهروميكانيكي المتكامل للمشاريع الكبرى",
    titleEn: "Turnkey Integrated MEP Execution & Delivery",
    categoryAr: "الإدارة الإنشائية والميدانية",
    categoryEn: "Project Delivery",
    scopeAr: "إدارة وتنسيق كافة الأنظمة الميكانيكية والكهربائية والصحية والتيار الخفيف للمنشآت الحيوية والمستشفيات مع هندسة القيمة.",
    scopeEn: "End-to-end coordination and execution of mechanical, electrical, plumbing and ELV systems for hospitals, towers and critical facilities.",
    specsAr: "هندسة القيمة والتسليم وفق الجدول الزمني",
    specsEn: "Value Engineering & On-Time Commissioning",
    locationAr: "المملكة العربية السعودية",
    locationEn: "Saudi Arabia",
    filter: "delivery"
  },
  {
    id: 6,
    image: "/assets/project-014.webp",
    titleAr: "لوحات التحكم والتوزيع الكهربائي FT / FW / FF",
    titleEn: "LV Switchboards & Modular Power Panels",
    categoryAr: "منتجات مصنع ألفا",
    categoryEn: "Factory Production",
    scopeAr: "تصنيع وتجميع لوحات التوزيع الفرعية والرئيسية ولوحات الإنارة وتحسين معامل القدرة، مفحوصة ومعايرة وفق المعايير الدولية.",
    scopeEn: "Manufacturing and assembly of Form 2b/4b distribution boards, power factor correction panels, factory-tested to international codes.",
    specsAr: "درجات حماية IP43 إلى IP65 · اختبارات مصنعية شاملة",
    specsEn: "Ingress Protection IP43 to IP65 · Factory Tested",
    locationAr: "مصنع ألفا — برج العرب، مصر",
    locationEn: "Alpha Factory — Borg El Arab",
    filter: "factory"
  }
];

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectItem | null>(null);
  const [activeCatalogTab, setActiveCatalogTab] = useState<number>(0);

  const isRtl = lang === "ar";

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  // Featured flagship items for Carousel
  const carouselItems = useMemo(
    () => [
      {
        id: 1,
        titleAr: "أنظمة التكييف والتهوية المتقدمة (HVAC)",
        titleEn: "Advanced HVAC & Industrial Ventilation",
        descAr: "حلول تكييف متكاملة تشمل محطات الشيلر (Chilled Water) وأنظمة VRF ووحدات البكج والتهوية الصناعية للمجمعات الكبرى.",
        descEn: "Integrated HVAC solutions including chilled-water plants, VRF systems, packaged units and industrial ventilation for mega complexes.",
        image: "/assets/project-080.webp",
        categoryAr: "التكييف والتبريد",
        categoryEn: "HVAC & Cooling",
        statsAr: "كفاءة طاقة قصوى · صيانة شاملة",
        statsEn: "High Energy Efficiency · Turnkey MEP"
      },
      {
        id: 2,
        titleAr: "محطات وشبكات الجهد المتوسط والمنخفض",
        titleEn: "Medium & Low Voltage Power Distribution",
        descAr: "تنفيذ وتوريد خطوط ومحطات التوزيع، لوحات التحكم الرئيسية، وأنظمة الإنارة وكابلات الطاقة بأعلى درجات الأمان.",
        descEn: "Turnkey MV/LV distribution networks, master switchgear, industrial lighting and earthing protection built to strict standards.",
        image: "/assets/project-022.webp",
        categoryAr: "الأعمال الكهربائية",
        categoryEn: "Electrical Works",
        statsAr: "تصنيف حتى 4,000 أمبير",
        statsEn: "Rated up to 4,000 A"
      },
      {
        id: 3,
        titleAr: "مصنع ألفا المتقدم — برج العرب",
        titleEn: "Advanced Alpha Factory — Borg El Arab",
        descAr: "تصنيع دقيق لحوامل وسلالم الكابلات (Cable Trays)، لوحات التوزيع FT/FW/FF، وأنظمة التخزين المعدنية الثقيلة وأبواب الطوارئ.",
        descEn: "Precision in-house fabrication of cable management systems, certified LV enclosures, heavy industrial racks and fire doors.",
        image: "/assets/project-006.webp",
        categoryAr: "التصنيع الصناعي",
        categoryEn: "Precision Manufacturing",
        statsAr: "معتمد IEC 61537",
        statsEn: "IEC 61537 Certified"
      },
      {
        id: 4,
        titleAr: "أنظمة مكافحة وإنذار الحريق والسلامة",
        titleEn: "Firefighting & Fire Alarm Systems",
        descAr: "شبكات الإطفاء الرطبة والجافة، مضخات الحريق المعتمدة، وأنظمة الإنذار المبكر والتحكم الذكي بالمباني والمستودعات.",
        descEn: "Wet and dry sprinkler networks, certified fire pumps, intelligent early warning fire alarm and smoke management.",
        image: "/assets/project-029.webp",
        categoryAr: "الحماية والسلامة",
        categoryEn: "Fire & Safety",
        statsAr: "مطابقة لاشتراطات الدفاع المدني",
        statsEn: "Civil Defense Compliant"
      }
    ],
    []
  );

  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return richProjects;
    return richProjects.filter((p) => p.filter === activeFilter);
  }, [activeFilter]);

  // Factory catalog data
  const catalogCategories = useMemo(
    () => [
      {
        id: 0,
        nameAr: "حوامل وسلالم الكابلات (Cable Trays)",
        nameEn: "Cable Tray Systems",
        materialsAr: "الصلب المجلفن على الساخن (HDG)، المجلفن كهربائياً، الألومنيوم، والصلب غير القابل للصدأ (Stainless Steel).",
        materialsEn: "Hot-dip galvanized steel (HDG), pre-galvanized, aluminum, and stainless steel (304/316).",
        specsAr: "الارتفاعات: 25 - 150 مم | العرض: 50 - 1000 مم | السماكات: 1.0 - 3.0 مم | معيار IEC 61537 / BS EN 61537.",
        specsEn: "Heights: 25 - 150 mm | Widths: 50 - 1000 mm | Thickness: 1.0 - 3.0 mm | Standard: IEC 61537 / BS EN 61537.",
        usageAr: "المصانع، محطات الطاقة، المنشآت الطبية، والمجمعات التجارية لحماية وتمديد كابلات الطاقة والتحكم.",
        usageEn: "Factories, power plants, hospitals and commercial hubs for heavy cable containment and routing."
      },
      {
        id: 1,
        nameAr: "لوحات الجهد المنخفض (LV Panels FT/FW/FF)",
        nameEn: "Low-Voltage Panels (FT / FW / FF)",
        materialsAr: "ألواح صاج مسحوبة على البارد مع معالجة كيميائية ودهان إلكتروستاتيكي بودرة مقاوم للعوامل الجوية.",
        materialsEn: "Cold-rolled sheet steel with chemical pre-treatment and UV-resistant electrostatic powder coating.",
        specsAr: "التيار المقنن حتى 4000A | درجات الحماية: IP43, IP54, IP55, IP65 | Form 2b حتى Form 4b.",
        specsEn: "Rated current up to 4000A | Protection ratings: IP43, IP54, IP55, IP65 | Form 2b to Form 4b segregation.",
        usageAr: "لوحات التوزيع الرئيسية والفرعية (MDB / SMDB / DB)، لوحات التحكم في المحركات (MCC)، ولوحات ATS.",
        usageEn: "Main & sub distribution boards (MDB/SMDB), motor control centers (MCC) and automatic transfer switches (ATS)."
      },
      {
        id: 2,
        nameAr: "أنظمة التخزين والرفوف المعدنية (Storage Racks)",
        nameEn: "Heavy-Duty Storage Racks",
        materialsAr: "قطاعات فولاذية إنشائية عالية المقاومة، أرفف مجلفنة ومطلية بالبودرة للاستخدامات الصناعية الشاقة.",
        materialsEn: "High-yield structural steel profiles, galvanized decking and heavy industrial powder coating.",
        specsAr: "حمولات حتى 4000 كجم لكل مستوى طبلية | أنظمة Selective و Drive-in و Cantilever متوافقة مع أنظمة الرافعات.",
        specsEn: "Load capacities up to 4000 kg per pallet level | Selective, Drive-in & Cantilever systems engineered for forklifts.",
        usageAr: "المستودعات اللوجستية، المصانع، مراكز التوزيع، ومخازن التبريد والتجميد.",
        usageEn: "Logistics warehouses, manufacturing plants, distribution hubs and cold storage facilities."
      },
      {
        id: 3,
        nameAr: "أبواب الطوارئ ومقاومة الحريق (Fire Doors)",
        nameEn: "Fire-Rated Emergency Doors",
        materialsAr: "صلب مجلفن مدعم بحشوات صوف صخري عالي الكثافة (Rockwool) ومواد عازلة للحرارة والدخان.",
        materialsEn: "Galvanized steel filled with high-density rockwool core and fire-stopping intumescent sealants.",
        specsAr: "مقاومة حريق معتمدة: 60 دقيقة، 90 دقيقة، 120 دقيقة، 180 دقيقة | مجهزة بقضبان ذعر (Panic Bar) مطابقة لـ UL.",
        specsEn: "Fire ratings: 60, 90, 120 and 180 minutes | Equipped with UL-listed panic hardware and hydraulic door closers.",
        usageAr: "مخارج الطوارئ بالمباني العامة، المستشفيات، الفنادق، محطات المترو والمرافق الصناعية.",
        usageEn: "Emergency egress in commercial towers, hospitals, hotels, metro stations and industrial facilities."
      },
      {
        id: 4,
        nameAr: "صناديق خراطيم الحريق (Fire Hose Cabinets)",
        nameEn: "Fire-Hose Cabinets",
        materialsAr: "صاج صلب مجلفن أو ستانلس ستيل مع زجاج أمان مقاوم للكسر ودهان أحمر بودرة مقاوم للتآكل.",
        materialsEn: "Galvanized sheet or brushed stainless steel with safety tempered glass and durable red powder coat.",
        specsAr: "تركيب غاطس أو ظاهري | بكرات خراطيم 1 بوصة أو 1.5 بوصة بطول 30 متراً | صمامات هبوط معتمدة.",
        specsEn: "Recessed or surface mounted | 1\" or 1.5\" synthetic hose reels (30m) | Certified landing valves.",
        usageAr: "شبكات إطفاء الحريق في الممرات والمستودعات والمجمعات السكنية والتجارية.",
        usageEn: "Interior firefighting riser connections in corridors, warehouses and multi-story complexes."
      },
      {
        id: 5,
        nameAr: "أربطة الكابلات والملحقات (Cable Ties)",
        nameEn: "Stainless Steel & Nylon Cable Ties",
        materialsAr: "ستانلس ستيل 316 و 304 المقاوم للمواد الكيميائية والأملاح، ونايلون 66 المقاوم للأشعة فوق البنفسجية UV.",
        materialsEn: "Chemical and marine grade stainless steel 316/304, plus UV-stabilized heavy nylon 66.",
        specsAr: "قوة شد حتى 120 كجم | نطاق حراري من -80°C إلى +538°C للمعدن | قفل كروي ذاتي الإغلاق (Ball-Lock).",
        specsEn: "Tensile strength up to 120 kg | Temperature range: -80°C to +538°C for steel | Self-locking ball design.",
        usageAr: "تثبيت الكابلات في المشاريع البحرية، البتروكيماويات، المحطات الشمسية والبيئات القاسية.",
        usageEn: "Securing cables in offshore, petrochemical, solar photovoltaic and harsh environmental installations."
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Shared Navbar */}
      <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />

      {/* 
        ============================================================
        HERO SECTION: REFINED ARCHITECTURAL COMPOSITION
        (NO RIGID CARD FOR THE IMAGE — FLOATING & DYNAMIC DEPTH)
        ============================================================
      */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-tech-pattern">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/4 -start-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -end-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-xs sm:text-sm font-medium dark:text-[#f3e5ab] text-amber-900">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>
                  {isRtl
                    ? "المملكة العربية السعودية · حلول كهروميكانيكية وصناعية"
                    : "Kingdom of Saudi Arabia · Electromechanical & Industrial Solutions"}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest font-bold text-[#d4af37]">
                  {isRtl ? "الهندسة • التصنيع • التنفيذ والتسليم" : "Engineering • Manufacturing • Delivery"}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight dark:text-white text-slate-900 leading-[1.15]">
                  {isRtl ? (
                    <>
                      القوة الهندسية <br />
                      <span className="text-gold-gradient">لبناء الغد المتطور.</span>
                    </>
                  ) : (
                    <>
                      Powering <br />
                      <span className="text-gold-gradient">what comes next.</span>
                    </>
                  )}
                </h1>
              </div>

              <p className="text-base sm:text-lg dark:text-slate-300 text-slate-600 leading-relaxed max-w-2xl">
                {isRtl
                  ? "حلول كهروميكانيكية وصناعية متكاملة — تبدأ من التصميم الدقيق والتوريد والتصنيع، وحتى التركيب الميداني والاختبار والتشغيل، وصولاً إلى عقود التشغيل والصيانة للمباني والمنشآت الكبرى بالمملكة العربية السعودية ومصر."
                  : "Integrated electromechanical and industrial solutions—from design and supply through installation, testing, commissioning, operation and maintenance across Saudi Arabia and Egypt."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/services"
                  className="btn-gold px-7 py-3 rounded-md font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg"
                >
                  <span>{isRtl ? "استكشف قدراتنا التخصصية" : "Explore our capabilities"}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-md font-semibold text-sm sm:text-base border border-[#d4af37]/40 dark:text-slate-200 text-slate-800 hover:text-[#d4af37] hover:border-[#d4af37] dark:bg-slate-900/60 bg-white/80 backdrop-blur-sm transition-all shadow-sm"
                >
                  <span>{isRtl ? "سابقة الأعمال (104 مشروع)" : "Projects (104 Works)"}</span>
                </Link>
              </div>

              {/* Company Identity Ticker / Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t dark:border-slate-800 border-slate-200">
                <div className="p-3 rounded-xl dark:bg-slate-900/50 bg-slate-100/70 border dark:border-slate-800 border-slate-200">
                  <div className="text-2xl font-bold text-[#d4af37]">2020</div>
                  <div className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">
                    {isRtl ? "تأسيس مصنع برج العرب" : "Factory Established"}
                  </div>
                </div>
                <div className="p-3 rounded-xl dark:bg-slate-900/50 bg-slate-100/70 border dark:border-slate-800 border-slate-200">
                  <div className="text-2xl font-bold text-[#d4af37]">+100</div>
                  <div className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">
                    {isRtl ? "موقع ومرفق منجز" : "Projects in the Field"}
                  </div>
                </div>
                <div className="p-3 rounded-xl dark:bg-slate-900/50 bg-slate-100/70 border dark:border-slate-800 border-slate-200">
                  <div className="text-2xl font-bold text-[#d4af37]">4,000A</div>
                  <div className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">
                    {isRtl ? "لوحات توزيع معتمدة" : "Rated Switchboards"}
                  </div>
                </div>
                <div className="p-3 rounded-xl dark:bg-slate-900/50 bg-slate-100/70 border dark:border-slate-800 border-slate-200">
                  <div className="text-2xl font-bold text-[#d4af37]">100%</div>
                  <div className="text-[11px] dark:text-slate-400 text-slate-600 mt-0.5">
                    {isRtl ? "معايير سلامة وجودة HSE" : "HSE Quality Culture"}
                  </div>
                </div>
              </div>
            </div>

            {/* 
              ============================================================
              HERO VISUAL: NOT IN A CARD — FLOATING ARCHITECTURAL COMPOSITION
              WITH GLOWING DEPTH, FLOATING SPECS BADGES & WATERMARK LOGO
              ============================================================
            */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Concentric subtle radar & tech coordinate rings */}
              <div className="absolute -inset-6 rounded-full border border-[#d4af37]/15 pointer-events-none animate-pulse" style={{ animationDuration: "8s" }}></div>
              <div className="absolute -inset-14 rounded-full border border-blue-500/10 pointer-events-none"></div>

              {/* Floating Architectural Stage without card border */}
              <div className="relative w-full max-w-lg">
                {/* Visual Backdrop Ambient Halo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/25 via-blue-600/15 to-transparent rounded-3xl blur-2xl -z-10 transform -rotate-2 scale-105"></div>

                {/* Free-floating high-res architectural photograph */}
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/assets/project-080.webp"
                    alt="Advanced Alpha Power Field Engineering"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Subtle cinematic gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Corner blueprint crosshairs (+) */}
                  <div className="absolute top-4 start-4 text-[#d4af37] font-mono text-xs opacity-70">+ [AAP-ENG-01]</div>
                  <div className="absolute top-4 end-4 text-[#d4af37] font-mono text-xs opacity-70">LAT 26.42° N +</div>

                  {/* Integrated Watermark Stamp in bottom-end corner */}
                  <div className="absolute bottom-3 end-4 h-12 w-24 opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pointer-events-none">
                    <img
                      src="/assets/aap-logo-gold.png"
                      alt="AAP Gold Watermark"
                      className="h-full w-auto object-contain"
                    />
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-3 start-4 max-w-[260px] text-white">
                    <div className="text-xs font-bold text-[#f3e5ab] drop-shadow-md">
                      {isRtl ? "الهندسة الميدانية المعتمدة" : "Engineering in the field"}
                    </div>
                    <p className="text-[11px] text-slate-200 drop-shadow-md">
                      {isRtl
                        ? "المملكة العربية السعودية · مصر"
                        : "Saudi Arabia · Egypt"}
                    </p>
                  </div>
                </div>

                {/* Floating Metric Pill 1 (Top-Start) */}
                <div className="absolute -top-4 -start-4 sm:-start-6 px-3.5 py-2 rounded-2xl dark:bg-[#071324]/90 bg-white/95 backdrop-blur-md border border-[#d4af37]/40 shadow-xl flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold dark:text-white text-slate-900">
                      {isRtl ? "لوحات 4,000A معتمدة" : "4,000A LV Panels"}
                    </div>
                    <div className="text-[9px] text-[#d4af37] font-semibold">
                      IEC 61537 / Form 4b
                    </div>
                  </div>
                </div>

                {/* Floating Metric Pill 2 (Bottom-Start) */}
                <div className="absolute -bottom-5 -end-2 sm:-end-4 px-4 py-2 rounded-2xl dark:bg-[#071324]/90 bg-white/95 backdrop-blur-md border border-[#d4af37]/40 shadow-xl flex items-center gap-2.5 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <div>
                    <div className="text-[11px] font-bold dark:text-white text-slate-900">
                      {isRtl ? "+100 مشروع ميداني" : "+100 Projects in Field"}
                    </div>
                    <div className="text-[9px] dark:text-slate-400 text-slate-500">
                      {isRtl ? "تنفيذ واختبار وتشغيل" : "Commissioned & Live"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        FLAGSHIP CAROUSEL: DISCIPLINE HIGHLIGHTS
        ============================================================
      */}
      <section className="py-16 bg-muted border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{isRtl ? "أبرز مجالات التميز الهندسي" : "Flagship Engineering Disciplines"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {isRtl ? "كارت عرض المشاريع والقدرات التخصصية" : "Capabilities & Project Showcase"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselItems.length - 1))
                }
                className="p-2.5 rounded-full border dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700 hover:text-[#d4af37] hover:border-[#d4af37] transition-all shadow-sm"
                aria-label="Previous slide"
              >
                {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev + 1) % carouselItems.length)}
                className="p-2.5 rounded-full border dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700 hover:text-[#d4af37] hover:border-[#d4af37] transition-all shadow-sm"
                aria-label="Next slide"
              >
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(${isRtl ? carouselIndex * 100 : -carouselIndex * 100}%)`
              }}
            >
              {carouselItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-card">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#d4af37]/15 dark:text-[#f3e5ab] text-amber-900 border border-[#d4af37]/30 mb-4">
                        <span>{isRtl ? item.categoryAr : item.categoryEn}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-3">
                        {isRtl ? item.titleAr : item.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {isRtl ? item.descAr : item.descEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t dark:border-slate-800 border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold dark:text-[#f3e5ab] text-amber-900">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                        <span>{isRtl ? item.statsAr : item.statsEn}</span>
                      </div>

                      <Link
                        href="/contact"
                        className="btn-gold px-5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5"
                      >
                        <span>{isRtl ? "طلب دراسة المشروع" : "Project Inquiry"}</span>
                        {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                    <Image
                      src={item.image}
                      alt={isRtl ? item.titleAr : item.titleEn}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r dark:from-slate-900 from-white via-transparent to-transparent opacity-80"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    carouselIndex === i ? "w-8 bg-[#d4af37]" : "w-2 bg-slate-400 dark:bg-slate-600"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        COMPANY PROFILE & TWO DISCIPLINES (من نحن)
        ============================================================
      */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl aspect-[4/3] bg-card">
              <Image
                src="/assets/project-022.webp"
                alt="Alpha Power Field Engineering"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 end-4 p-4 rounded-2xl bg-popover/95 border border-[#d4af37]/40 text-center shadow-lg">
                <span className="block text-2xl font-extrabold text-[#d4af37]">2020</span>
                <span className="text-[10px] tracking-wider text-muted-foreground font-semibold uppercase">
                  {isRtl ? "تأسيس مصنع برج العرب" : "Factory Established"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isRtl ? "الملف التعريفي للشركة" : "Company Profile"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {isRtl ? (
                <>
                  شريك واحد. <span className="text-gold-gradient">تخصصان متكاملان.</span>
                </>
              ) : (
                <>
                  One partner. <span className="text-gold-gradient">Two disciplines.</span>
                </>
              )}
            </h2>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {isRtl
                ? "شركة القوة المتقدمة (AAP) هي مزود رائد للحلول الكهروميكانيكية والصناعية في المملكة العربية السعودية. تخدم AAP المشاريع التجارية، السكنية، الرعاية الصحية، الضيافة، والمشاريع الصناعية من خلال أنظمة التكييف HVAC، الأعمال الكهربائية، مكافحة وإنذار الحريق، السباكة، وأنظمة التيار الخفيف. وتمتد خدماتها من التصميم والتوريد والتركيب إلى الاختبار والتشغيل والصيانة. ويقوم مصنع ألفا المتقدم في برج العرب بمصر بإنتاج وتصنيع حوامل الكابلات المعدنية ولوحات التوزيع الكهربائية."
                : "Advanced Alpha Power (AAP) is a leading provider of electromechanical and industrial solutions in the Kingdom of Saudi Arabia. AAP serves commercial, residential, healthcare, hospitality and industrial projects with HVAC, electrical, fire-fighting, plumbing and low-current systems. Its services span design, supply, installation, testing, commissioning, operation and maintenance. Advanced Alpha Factory in Borg El Arab, Egypt, produces sheet-metal and electrical products."}
            </p>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-accent border border-border">
                <div className="flex items-center gap-2 text-[#d4af37] font-bold text-sm mb-1.5">
                  <Compass className="w-4 h-4" />
                  <span>{isRtl ? "الرؤية (Vision)" : "Our Vision"}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isRtl
                    ? "أن نكون الكيان الكهروميكانيكي والصناعي الأكثر موثوقية وتميزاً بالمملكة العربية السعودية والشرق الأوسط عبر الابتكار والجودة ورضا العملاء."
                    : "To be recognized as a leading electromechanical and industrial solutions provider in Saudi Arabia and the Middle East, delivering excellence through innovation, quality and customer satisfaction."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-accent border border-border">
                <div className="flex items-center gap-2 text-[#d4af37] font-bold text-sm mb-1.5">
                  <Target className="w-4 h-4" />
                  <span>{isRtl ? "الرسالة (Mission)" : "Our Mission"}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isRtl
                    ? "تقديم خدمات هندسية وإنشائية فائقة الجودة تتجاوز تطلعات العملاء مع الالتزام بأعلى معايير السلامة المهنية والنزاهة الهندسية."
                    : "Provide high-quality engineering and construction services that exceed customer expectations while maintaining the highest standards of safety, quality and professional integrity."}
                </p>
              </div>
            </div>

            {/* 6 Core Strategic Pillars */}
            <div className="pt-2">
              <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-3">
                {isRtl ? "ركائز العمل الست الأساسية:" : "Six Core Pillars:"}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "01", ar: "حلول فعالة من حيث التكلفة", en: "Cost-effective solutions" },
                  { id: "02", ar: "ثقافة الجودة والسلامة HSE", en: "Quality & HSE culture" },
                  { id: "03", ar: "التسليم في الموعد المحدد", en: "Timely project delivery" },
                  { id: "04", ar: "نهج يركز على العميل", en: "Customer-oriented approach" },
                  { id: "05", ar: "إدارة مشاريع احترافية", en: "Professional management" },
                  { id: "06", ar: "هندسة القيمة المضافة", en: "Value engineering" }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-accent border border-border text-xs"
                  >
                    <span className="font-mono text-[10px] font-bold text-[#d4af37]">{item.id}</span>
                    <span className="dark:text-slate-300 text-slate-700 font-medium">{isRtl ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        WHAT WE DO: 8 CORE SYSTEMS & SECTORS SERVED
        ============================================================
      */}
      <section className="py-20 bg-muted border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Wrench className="w-3.5 h-3.5" />
              <span>{isRtl ? "ما نقوم به — منظومات تعمل ككيان واحد" : "What We Do — Systems That Work As One"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900">
              {isRtl ? "الأنظمة والحلول الكهروميكانيكية المتكاملة" : "Integrated Systems & Engineering Services"}
            </h2>
            <p className="dark:text-slate-300 text-slate-600 text-sm">
              {isRtl
                ? "تقوم AAP بتصميم وتوريد وتركيب واختبار وتشغيل وصيانة الأنظمة الداعمة للمباني والمرافق الصناعية."
                : "AAP designs, supplies, installs, tests, commissions, operates and maintains the systems that support buildings and industrial facilities."}
            </p>
          </div>

          {/* 8 Systems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: Wind,
                titleAr: "أنظمة التكييف والتهوية (HVAC)",
                titleEn: "HVAC systems",
                descAr: "محطات المياه المثلجة (Chilled-water)، أنظمة VRF، وحدات البكج والتهوية الصناعية وسحب الدخان.",
                descEn: "Chilled-water, VRF, package-unit and industrial ventilation systems."
              },
              {
                num: "02",
                icon: Zap,
                titleAr: "الأنظمة والأعمال الكهربائية",
                titleEn: "Electrical systems",
                descAr: "أنظمة الجهد المتوسط والمنخفض، شبكات الإنارة، كابلات الطاقة ومحطات التوزيع الرئيسية.",
                descEn: "Medium- and low-voltage systems, lighting and power distribution."
              },
              {
                num: "03",
                icon: Flame,
                titleAr: "مكافحة وإنذار الحريق",
                titleEn: "Fire fighting & fire alarm",
                descAr: "شبكات الرشاشات المائية، محطات مضخات الحريق المعتمدة، وأنظمة الإنذار المبكر الذكية.",
                descEn: "Sprinkler systems, certified fire pumps and early fire-alarm systems."
              },
              {
                num: "04",
                icon: Boxes,
                titleAr: "الأنظمة الصحية والسباكة",
                titleEn: "Plumbing systems",
                descAr: "شبكات تغذية المياه، شبكات الصرف الصحي، محطات الرفع، وتصريف مياه الأمطار.",
                descEn: "Water-supply, drainage and sewage systems."
              },
              {
                num: "05",
                icon: Cpu,
                titleAr: "أنظمة التيار الخفيف (Low-Current)",
                titleEn: "Low-current systems",
                descAr: "كاميرات المراقبة CCTV، الإذاعة الداخلية PA، الكابلات الهيكلية، الهاتف، الإنتركم، والتحكم بالدخول.",
                descEn: "CCTV, public address, structured cabling, telephone, intercom and access control."
              },
              {
                num: "06",
                icon: Cable,
                titleAr: "إدارة الكابلات والحماية",
                titleEn: "Cable management & protection",
                descAr: "حوامل وسلالم الكابلات، شبكات التأريض الكهربائي وأنظمة مانعات الصواعق وحماية المنشآت.",
                descEn: "Cable-management systems, earthing and lightning protection."
              },
              {
                num: "07",
                icon: HardHat,
                titleAr: "إدارة وتسليم المشاريع",
                titleEn: "Project delivery",
                descAr: "تنفيذ هندسي وإنشائي متناسق بإشراف هندسي صارم يضمن الجودة والجداول الزمنية.",
                descEn: "Coordinated engineering and construction project execution."
              },
              {
                num: "08",
                icon: Factory,
                titleAr: "منتجات المصنع المعتمدة",
                titleEn: "Factory products",
                descAr: "حوامل الكابلات، لوحات الجهد المنخفض، أرفف التخزين، أبواب الطوارئ، وصناديق الحريق.",
                descEn: "Cable trays, LV panels, storage racks, emergency doors, hose cabinets and cable ties."
              }
            ].map((sys) => {
              const IconComp = sys.icon;
              return (
                <div
                  key={sys.num}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-[#d4af37]/60 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#d4af37]">{sys.num}</span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {isRtl ? sys.titleAr : sys.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isRtl ? sys.descAr : sys.descEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-[#d4af37] font-semibold">
                    <Link href="/services" className="hover:underline flex items-center gap-1">
                      <span>{isRtl ? "تفاصيل التخصص" : "Explore details"}</span>
                      {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sectors Served Chips */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-card border border-[#d4af37]/30 shadow-md">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                {isRtl ? "القطاعات التي نخدمها" : "Sectors Served"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {isRtl ? "خبرات متراكمة في مختلف القطاعات الحيوية" : "Proven Capabilities Across Core Sectors"}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { ar: "المباني التجارية والأبراج", en: "Commercial buildings" },
                { ar: "المجمعات السكنية", en: "Residential" },
                { ar: "المستشفيات ومرافق الرعاية الصحية", en: "Hospitals & healthcare" },
                { ar: "الفنادق ومشاريع الضيافة", en: "Hotels & hospitality" },
                { ar: "المؤسسات التعليمية والجامعات", en: "Educational facilities" },
                { ar: "المشاريع الصناعية الكبرى", en: "Industrial projects" },
                { ar: "المستودعات والمراكز اللوجستية", en: "Warehouses" },
                { ar: "المصانع وخطوط الإنتاج", en: "Factories" }
              ].map((sector, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-background text-foreground border border-border flex items-center gap-2 hover:border-[#d4af37] transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{isRtl ? sector.ar : sector.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        ADVANCED ALPHA FACTORY & CATALOGUE (مصنع ألفا المتقدم)
        ============================================================
      */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Factory className="w-3.5 h-3.5" />
              <span>{isRtl ? "مصنع ألفا المتقدم · برج العرب، مصر" : "Advanced Alpha Factory · Borg El Arab, Egypt"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {isRtl ? (
                <>
                  صُنع بدقة هندسية. <br />
                  <span className="text-gold-gradient">Made with precision.</span>
                </>
              ) : (
                <>
                  Made with precision. <br />
                  <span className="text-gold-gradient">Engineered to endure.</span>
                </>
              )}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "عملياتنا التصنيعية المباشرة تحول المتطلبات الهندسية العملية إلى منتجات موثوقة ذات جودة وثبات فائقين. نوفر حوامل وسلالم الكابلات بجميع الأنواع، لوحات الجهد المنخفض FT/FW/FF، أرفف التخزين، وأبواب الطوارئ وصناديق الحريق."
                : "Our in-house manufacturing operation turns practical engineering requirements into dependable products, produced with care and consistency. Ladder cable trays, perforated cable trays, duct cable trays, LV panels: FT / FW / FF, storage racks, emergency doors, fire-hose cabinets and cable ties."}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-gold px-6 py-3 rounded-md text-sm font-semibold flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{isRtl ? "طلب تسعير منتج من المصنع" : "Discuss a product requirement"}</span>
            </Link>
            <Link
              href="/factory"
              className="px-6 py-3 rounded-md text-sm font-semibold border border-[#d4af37]/40 text-foreground hover:text-[#d4af37] bg-card"
            >
              <span>{isRtl ? "صفحة الكتالوج التفصيلية" : "Full Factory Catalogue"}</span>
            </Link>
          </div>
        </div>

        {/* Interactive Factory Catalogue Viewer */}
        <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Catalog tabs */}
          <div className="flex overflow-x-auto border-b border-border p-2 gap-2 bg-muted">
            {catalogCategories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCatalogTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCatalogTab === idx
                    ? "btn-gold shadow-md"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {isRtl ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Active Tab Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-muted border border-border">
                <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                  {isRtl ? "المواد والطلاء" : "Materials & Finish"}
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                  {isRtl ? catalogCategories[activeCatalogTab].materialsAr : catalogCategories[activeCatalogTab].materialsEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted border border-border">
                <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                  {isRtl ? "المقاسات والمعايير" : "Sizes & Standards"}
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                  {isRtl ? catalogCategories[activeCatalogTab].specsAr : catalogCategories[activeCatalogTab].specsEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted border border-border">
                <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                  {isRtl ? "نطاق الاستخدام الميداني" : "Applications"}
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                  {isRtl ? catalogCategories[activeCatalogTab].usageAr : catalogCategories[activeCatalogTab].usageEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        PORTFOLIO / PREVIOUS WORK WITH TEXT & DETAILS
        ("ف سابقه الاعامال انا عاوز طريقة عرض المشاريع افضل من كدا ويكون فيها كلام")
        ============================================================
      */}
      <section className="py-20 bg-muted border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isRtl ? "سابقة الأعمال المتميزة" : "Selected Work On Site"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
                {isRtl ? "مشاريع الميدان وسجل الإنجاز الهندسي" : "On Site. In Progress. Delivered."}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
                {isRtl
                  ? "توثيق شامل للأعمال المنجزة عبر التخصصات الكهربائية والميكانيكية والإنشائية وعمليات المصنع مع التفاصيل الفنية لكل مشروع."
                  : "A visual and technical record of work across electrical, mechanical, construction, HVAC and factory operations."}
              </p>
            </div>

            <Link
              href="/projects"
              className="btn-gold px-6 py-3 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md flex-shrink-0"
            >
              <span>{isRtl ? "المعرض الكامل (104 صورة وموقع)" : "All 104 Project Photographs"}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "all", ar: "جميع الأعمال", en: "All work" },
              { id: "hvac", ar: "التكييف والتبريد", en: "HVAC" },
              { id: "electrical", ar: "الأعمال الكهربائية", en: "Electrical" },
              { id: "fire", ar: "مكافحة الحريق", en: "Fire Safety" },
              { id: "factory", ar: "منتجات المصنع", en: "Factory" },
              { id: "delivery", ar: "إدارة المشاريع", en: "Construction" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f.id
                    ? "bg-[#d4af37] text-slate-950 font-bold shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:border-[#d4af37]"
                }`}
              >
                {isRtl ? f.ar : f.en}
              </button>
            ))}
          </div>

          {/* Rich Project Cards ("ويكون فيها كلام") */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-[#d4af37]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={isRtl ? project.titleAr : project.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 start-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d4af37] text-slate-950 shadow-md">
                        {isRtl ? project.categoryAr : project.categoryEn}
                      </span>
                    </div>
                  </div>

                  {/* Project Copy & Specs ("فيها كلام") */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-[#d4af37] transition-colors">
                      {isRtl ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isRtl ? project.scopeAr : project.scopeEn}
                    </p>

                    <div className="pt-3 border-t border-border space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{isRtl ? project.specsAr : project.specsEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{isRtl ? project.locationAr : project.locationEn}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      setSelectedPhoto({
                        src: project.image,
                        category: project.filter,
                        categoryAr: project.categoryAr,
                        categoryEn: project.categoryEn,
                        altAr: project.titleAr,
                        altEn: project.titleEn,
                        source: `Project Item #${project.id}`
                      })
                    }
                    className="w-full py-2.5 rounded-xl border border-border hover:border-[#d4af37] text-xs font-semibold text-muted-foreground hover:text-[#d4af37] flex items-center justify-center gap-2 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{isRtl ? "تكبير الصورة وفحص التفاصيل" : "Enlarge & View Details"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        HOW WE WORK: QUALITY, SAFETY & DELIVERY (6 PILLARS)
        ============================================================
      */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>{isRtl ? "معايير التنفيذ والنزاهة" : "How we work"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {isRtl ? "الجودة، السلامة، والالتزام بالتسليم." : "Quality, safety & delivery."}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isRtl
              ? "تلتزم شركة AAP بالمعايير الدولية وأعلى درجات توكيد الجودة وثقافة الصحة والسلامة والبيئة (HSE). السلامة والجودة والنزاهة المهنية تمثل جوهر رسالتنا."
              : "AAP is committed to international standards, strong quality assurance and a health, safety and environment (HSE) culture. Safety, quality and professional integrity are central to the mission."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "01",
              titleAr: "كوادر هندسية مؤهلة",
              titleEn: "Qualified people",
              descAr: "مهندسون وفنيون ذوو كفاءة عالية يمتلكون خبرات عميقة لدعم إنجاز المشاريع باحترافية.",
              descEn: "Highly qualified engineers and technicians support project delivery."
            },
            {
              id: "02",
              titleAr: "المعايير الهندسية الدولية",
              titleEn: "International standards",
              descAr: "التزام تام بالمواصفات القياسية العالمية (IEC, NFPA, ASHRAE, SASO) في كل مرحلة.",
              descEn: "Committed to international standards across project delivery."
            },
            {
              id: "03",
              titleAr: "الجودة وثقافة السلامة HSE",
              titleEn: "Quality & HSE",
              descAr: "توكيد الجودة الشامل وثقافة الصحة والسلامة والبيئة تمثل الأولوية القصوى في مواقعنا.",
              descEn: "Quality assurance and a health, safety and environment culture are priorities."
            },
            {
              id: "04",
              titleAr: "الالتزام التام بالجداول الزمنية",
              titleEn: "Timely delivery",
              descAr: "تخطيط دقيق وإدارة احترافية للموارد تضمن إنهاء الأعمال وتسليمها في الموعد المحدد.",
              descEn: "Project delivery is guided by planning and professional management."
            },
            {
              id: "05",
              titleAr: "التركيز على رضا العميل",
              titleEn: "Customer focus",
              descAr: "تصميم الحلول وتكييفها وفق متطلبات كل عميل وطبيعة مشروعه لضمان أقصى درجات الرضا.",
              descEn: "Solutions are shaped around customer requirements and satisfaction."
            },
            {
              id: "06",
              titleAr: "هندسة القيمة المضافة",
              titleEn: "Value engineering",
              descAr: "ابتكار حلول مجدية اقتصادياً تحافظ على أعلى معايير الجودة وتقلل الهدر والتكاليف التشغيلية.",
              descEn: "Cost-effective solutions and value engineering inform project work."
            }
          ].map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 rounded-2xl bg-card border border-border hover:border-[#d4af37]/60 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                  {pillar.id}
                </span>
                <h3 className="text-base font-bold text-foreground">
                  {isRtl ? pillar.titleAr : pillar.titleEn}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isRtl ? pillar.descAr : pillar.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ============================================================
        CLIENTS & CONSULTANTS 3D ROTATING GLOBE
        ("الصورة اللى بعتهالك اللى فيها شركاء العمل عاوزها تكون عامله زي الكرة الارضيه اللى بتتحرك وبتلف وفيها عرض للعملاء اللى كانو معانا وفرغ الخلفية")
        ============================================================
      */}
      <section className="py-20 bg-muted border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? "ثقة كبرى الكيانات والمكاتب الاستشارية" : "Selected Clients & Consultants"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
              {isRtl ? "كرة شركاء النجاح التفاعلية ثلاثية الأبعاد" : "Interactive 3D Client & Partner Globe"}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {isRtl
                ? "عرض تفاعلي يدور في فضاء ثلاثي الأبعاد لكبرى الشركات والمصانع والمكاتب الاستشارية التي شرفنا بالعمل معها، مع إمكانية عرض اللوحة الكاملة المفرغة من الخلفية."
                : "Interactive 3D sphere rotating through key clients, pharmaceutical hubs, industrial entities, and top engineering consultancies."}
            </p>
          </div>

          {/* Interactive 3D Canvas Globe Component */}
          <ClientGlobe lang={lang} isDark={isDark} />
        </div>
      </section>

      {/* 
        ============================================================
        LET'S CONNECT / REGIONAL OFFICES & CONTACT DETAILS
        ============================================================
      */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <Phone className="w-3.5 h-3.5" />
              <span>{isRtl ? "تواصل معنا" : "Let's connect"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {isRtl ? (
                <>
                  المشروع القادم <br />
                  <span className="text-gold-gradient">يبدأ من هنا.</span>
                </>
              ) : (
                <>
                  The next project <br />
                  <span className="text-gold-gradient">starts here.</span>
                </>
              )}
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {isRtl
                ? "أخبرنا عن موقعك، أو متطلباتك الهندسية أو احتياجات المصنع. فريقنا الهندسي جاهز للتواصل ودراسة كافة المتطلبات."
                : "Tell us about your site, system or product requirement. Our engineering team is ready to talk."}
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <a
                href="mailto:info@aap-power.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-[#d4af37] transition-all"
              >
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <div>
                  <div className="text-[11px] text-muted-foreground">{isRtl ? "البريد الإلكتروني الرسمي" : "Official Email"}</div>
                  <div className="font-semibold text-foreground">info@aap-power.com</div>
                </div>
              </a>

              <a
                href="mailto:Alex.alpha.power@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-[#d4af37] transition-all"
              >
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <div>
                  <div className="text-[11px] text-muted-foreground">{isRtl ? "مكتب الإسكندرية والمصنع" : "Alexandria & Factory Email"}</div>
                  <div className="font-semibold text-foreground">Alex.alpha.power@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Branch 1: KSA Office */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {isRtl ? "المملكة العربية السعودية · المكتب الإقليمي" : "Saudi Arabia · Office"}
              </div>
              <h3 className="text-base font-bold text-foreground">
                {isRtl ? "مكتب الدمام" : "Dammam Office"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                3554 King Fahad Ibn Abdulaziz Saud St., Al Adamah Dist., Dammam, KSA
              </p>
              <div className="pt-2 border-t border-border space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">0567693915</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+966 56 862 1348</span>
                </div>
              </div>
            </div>

            {/* Branch 2: Egypt Office */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {isRtl ? "جمهورية مصر العربية · إدارة الإسكندرية" : "Alexandria · Contact"}
              </div>
              <h3 className="text-base font-bold text-foreground">
                {isRtl ? "م. عادل سعد محمد · المدير العام" : "Eng. Adel Saad Mohamed · General Manager"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                42 Masjed Elanser Street, Sidi Gaber, Alexandria, Egypt
              </p>
              <div className="pt-2 border-t border-border space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 122 600 3327</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span dir="ltr">+20 101 063 4217</span>
                </div>
              </div>
            </div>

            {/* Branch 3: Factory Location */}
            <div className="sm:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  {isRtl ? "جمهورية مصر العربية · المصنع" : "Egypt · Factory"}
                </div>
                <h4 className="text-base font-bold text-foreground">
                  {isRtl ? "مصنع ألفا المتقدم لتشغيل المعادن" : "Advanced Alpha Factory for Sheet Metal"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Part 15 block 33, fourth industrial zone, Borg El Arab, Alexandria, Egypt
                </p>
              </div>

              <div className="flex-shrink-0 text-xs text-muted-foreground space-y-1">
                <div className="font-semibold text-[#d4af37]">{isRtl ? "أرقام إضافية:" : "Additional contacts:"}</div>
                <div dir="ltr">02-01025262754</div>
                <div dir="ltr">02-01150884433</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full dark:bg-[#071324] bg-white border dark:border-[#d4af37]/40 border-slate-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between dark:bg-[#050d1a] bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#d4af37] text-slate-950">
                  {isRtl ? selectedPhoto.categoryAr : selectedPhoto.categoryEn}
                </span>
                <span className="text-xs dark:text-slate-400 text-slate-500 font-mono">{selectedPhoto.source}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg dark:bg-slate-800 bg-slate-200 dark:text-slate-400 text-slate-600 hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <Image
                src={selectedPhoto.src}
                alt={isRtl ? selectedPhoto.altAr : selectedPhoto.altEn}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-4 dark:bg-[#050d1a] bg-slate-50 border-t dark:border-slate-800 border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="dark:text-slate-200 text-slate-800 font-medium">
                {isRtl ? selectedPhoto.altAr : selectedPhoto.altEn}
              </span>
              <a
                href={selectedPhoto.src}
                target="_blank"
                rel="noreferrer"
                className="text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>{isRtl ? "فتح الصورة الأصلية" : "Open Original"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Shared Footer with exact required credit */}
      <Footer lang={lang} />
    </div>
  );
}
