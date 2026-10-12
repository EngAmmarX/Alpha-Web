"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  ChevronDown,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search
} from "lucide-react";
import projectsRaw from "../data/projects.json";

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

export default function ProjectsPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const isRtl = lang === "ar";

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  const categories = useMemo(
    () => [
      { id: "all", ar: "جميع الأعمال (104)", en: "All Work (104)" },
      { id: "electrical", ar: "الكهرباء والطاقة", en: "Electrical Works" },
      { id: "mechanical", ar: "الأعمال الميكانيكية", en: "Mechanical" },
      { id: "construction", ar: "الإنشاءات والتجهيزات", en: "Construction" },
      { id: "roofing", ar: "عزل وتغطية الأسطح", en: "Roofing" },
      { id: "hvac", ar: "التكييف والتهوية", en: "HVAC Systems" },
      { id: "factory", ar: "المصنع والتصنيع", en: "Factory" }
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchCategory =
        activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        searchTerm === "" ||
        p.altAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.altEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryEn.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 16);
      setIsLoadingMore(false);
    }, 400);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredProjects.findIndex((p) => p.src === selectedPhoto.src);
    if (currentIndex < filteredProjects.length - 1) {
      setSelectedPhoto(filteredProjects[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredProjects[0]);
    }
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredProjects.findIndex((p) => p.src === selectedPhoto.src);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredProjects[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredProjects[filteredProjects.length - 1]);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#050d1a] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} />

      {/* Header */}
      <section className="py-16 bg-maze-pattern border-b border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? "سابقة الأعمال المنفذة" : "Projects & Executed Work"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">
              {isRtl ? (
                <>
                  معرض المشاريع والأعمال الميدانية <br />
                  <span className="text-gold-gradient">توثيق حي لأكثر من 100 موقع منجز</span>
                </>
              ) : (
                <>
                  Projects & On-Site Gallery <br />
                  <span className="text-gold-gradient">Visual Record of 100+ Completed Sites</span>
                </>
              )}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isRtl
                ? "سجل مصوّر يوضح مراحل تنفيذ الأعمال الكهروميكانيكية، التمديدات، محطات الطاقة، وتصنيع حوامل الكابلات ولوحات التوزيع."
                : "A visual archive documenting electromechanical execution, distribution switchboards, cable ladder networks, and on-site delivery."}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Controls & Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Search & Filter Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-800">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(16);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#d4af37] text-[#050d1a] shadow-lg font-bold"
                    : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60"
                }`}
              >
                {isRtl ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder={isRtl ? "بحث في المشاريع..." : "Search projects..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 ps-9 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4af37]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {isRtl
              ? `عرض ${displayedProjects.length} من إجمالي ${filteredProjects.length} مشروع`
              : `Showing ${displayedProjects.length} of ${filteredProjects.length} projects`}
          </span>
          <span className="text-[#d4af37]">
            {isRtl ? "اضغط على أي صورة للتكبير والمعاينة" : "Click any photo to zoom & inspect"}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProjects.map((item, index) => {
            const isLoaded = loadedImages[item.src];
            return (
              <div
                key={item.src}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-[#d4af37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 bg-slate-900 aspect-[4/3]"
              >
                {!isLoaded && <div className="absolute inset-0 skeleton-loading z-0" />}

                <Image
                  src={item.src}
                  alt={isRtl ? item.altAr : item.altEn}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() =>
                    setLoadedImages((prev) => ({
                      ...prev,
                      [item.src]: true
                    }))
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4af37] text-[#050d1a]">
                      {isRtl ? item.categoryAr : item.categoryEn}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs text-white font-medium line-clamp-2">
                      {isRtl ? item.altAr : item.altEn}
                    </p>
                    <span className="text-[10px] text-[#f3e5ab] mt-1 block">
                      #{String(index + 1).padStart(3, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center pt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="btn-gold px-8 py-3 rounded-md font-semibold text-sm inline-flex items-center gap-2"
            >
              {isLoadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#050d1a] border-t-transparent rounded-full animate-spin"></span>
                  <span>{isRtl ? "جارِ تحميل المزيد..." : "Loading more..."}</span>
                </>
              ) : (
                <>
                  <span>{isRtl ? "عرض المزيد من المشاريع" : "Load More Projects"}</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#071324] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#050d1a]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#d4af37] text-[#050d1a]">
                  {isRtl ? selectedPhoto.categoryAr : selectedPhoto.categoryEn}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPhoto.source}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
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

              <button
                onClick={handlePrevPhoto}
                className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#d4af37] hover:text-black transition-colors"
                aria-label="Previous photo"
              >
                {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#d4af37] hover:text-black transition-colors"
                aria-label="Next photo"
              >
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

            <div className="p-4 bg-[#050d1a] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-200 font-medium">
                {isRtl ? selectedPhoto.altAr : selectedPhoto.altEn}
              </span>
              <a
                href={selectedPhoto.src}
                target="_blank"
                rel="noreferrer"
                className="text-[#d4af37] hover:underline flex items-center gap-1"
              >
                <span>{isRtl ? "فتح الصورة بالحجم الكامل" : "Open Original"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}
