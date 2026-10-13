"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Globe, Maximize2, RotateCw } from "lucide-react";

interface ClientItem {
  nameAr: string;
  nameEn: string;
  category: "client" | "consultant";
}

const partners: ClientItem[] = [
  { nameAr: "شركة ويبكو للبترول (WEPCO)", nameEn: "WEPCO Petroleum", category: "client" },
  { nameAr: "باركفيل للأدوية (Parkville)", nameEn: "Parkville Pharma", category: "client" },
  { nameAr: "تكنو للأدوية (Techno Pharma)", nameEn: "Techno Pharma", category: "client" },
  { nameAr: "شركة تيتكو (TETCO)", nameEn: "TETCO Group", category: "client" },
  { nameAr: "أماكن العقارية (Amaken)", nameEn: "Amaken Real Estate", category: "client" },
  { nameAr: "الكأس لتجارة الحديد", nameEn: "El Kass Steel", category: "client" },
  { nameAr: "العبد للاستثمار والتجارة", nameEn: "AL-ABD Industrial", category: "client" },
  { nameAr: "الغنيمي لتجارة الحديد والأسمنت", nameEn: "El Ghonemy Trading", category: "client" },
  { nameAr: "فيوتشر هاوس (Future House)", nameEn: "Future House", category: "client" },
  { nameAr: "عائلة للاستثمارات (أبو دنقل)", nameEn: "Abu Dengel Real Estate", category: "client" },
  { nameAr: "فارما إيجيبت (Pharma Egypt)", nameEn: "Pharma Egypt", category: "client" },
  { nameAr: "توتال إير للمقاولات (TOTAL AIR)", nameEn: "TOTAL AIR MEP", category: "client" },
  { nameAr: "المجال العربي للخدمات المائية", nameEn: "Almajal Alarabi", category: "client" },
  { nameAr: "مان كرو للمباني الفولاذية", nameEn: "MAN CREW Steel Buildings", category: "client" },
  { nameAr: "شركة برج تريد للتصدير", nameEn: "Borg Trade Export", category: "client" },
  { nameAr: "الطارق للاستثمار العقاري", nameEn: "ALTAREK Investments", category: "client" },
  { nameAr: "المهندس للمقاولات الإنشائية", nameEn: "Al Mohandes Contracting", category: "client" },
  { nameAr: "كير إير للتجارة (Cair Air)", nameEn: "Cair Air Trading", category: "client" },
  { nameAr: "شركة مباني مصر الدولية", nameEn: "Mabany Misr International", category: "client" },
  { nameAr: "يوني تك للمقاولات (UNI-TECH)", nameEn: "UNI-TECH MEP", category: "client" },
  { nameAr: "إي إم سي للخدمات الصناعية", nameEn: "EMC Industrial Services", category: "client" },
  { nameAr: "شركة الصرف الصحي بالإسكندرية", nameEn: "Alexandria Sanitary Co.", category: "client" },
  { nameAr: "جماعة المهندسين الاستشاريين (ECG)", nameEn: "ECG Engineering", category: "consultant" },
  { nameAr: "صبور للاستشارات الهندسية", nameEn: "Sabbour Consulting", category: "consultant" },
  { nameAr: "دار الهندسة (Dar Al-Handasah)", nameEn: "Dar Al-Handasah", category: "consultant" },
  { nameAr: "محرم باخوم للاستشارات (ACE)", nameEn: "ACE Moharram Bakhoum", category: "consultant" },
  { nameAr: "شاكر للاستشارات الهندسية", nameEn: "Shaker Consultancy", category: "consultant" }
];

interface ClientGlobeProps {
  lang: "ar" | "en";
  isDark: boolean;
}

export default function ClientGlobe({ lang, isDark }: ClientGlobeProps) {
  const isRtl = lang === "ar";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showBoard, setShowBoard] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 3D Spherical physics points
  const points = useMemo(() => {
    const total = partners.length;
    return partners.map((partner, i) => {
      // Golden Spiral distribution on sphere surface
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        ...partner,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let radius = 175;
    let angleX = 0.002;
    let angleY = 0.0035;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const width = 500;
    const height = 440;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Current rotating coords
    const currentPoints = points.map((p) => ({ ...p }));

    // Rotation matrices
    const rotateX = (ang: number) => {
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      for (const p of currentPoints) {
        const y = p.y * cos - p.z * sin;
        const z = p.y * sin + p.z * cos;
        p.y = y;
        p.z = z;
      }
    };

    const rotateY = (ang: number) => {
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      for (const p of currentPoints) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        p.x = x;
        p.z = z;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle orbital rings
      ctx.save();
      ctx.strokeStyle = isDark ? "rgba(212, 175, 55, 0.12)" : "rgba(212, 175, 55, 0.20)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Latitudinal circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.95, 0, Math.PI * 2);
      ctx.stroke();

      // Tilted ellipse
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 0.95, radius * 0.35, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Continuous rotation if not dragging
      if (!isDragging) {
        rotateX(angleX);
        rotateY(angleY);
      }

      // Sort by Z for proper 3D depth rendering
      const sorted = [...currentPoints].sort((a, b) => a.z - b.z);

      for (const p of sorted) {
        // Perspective calculation
        const k = 350;
        const depth = k / (k - p.z * radius);
        const screenX = cx + p.x * radius * depth;
        const screenY = cy + p.y * radius * depth;
        const alpha = Math.max(0.18, Math.min(1, (p.z + 1.1) / 2.2));
        const scale = Math.max(0.7, depth);

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(scale, scale);

        // Display text in current language
        const text = isRtl ? p.nameAr : p.nameEn;
        const isConsultant = p.category === "consultant";

        ctx.font = isRtl
          ? "bold 12px 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
          : "600 11px system-ui, -apple-system, sans-serif";
        const metrics = ctx.measureText(text);
        const paddingX = 10;
        const paddingY = 5;
        const boxW = Math.max( metrics.width + paddingX * 2, 70 );
        const boxH = 22;

        // Card background badge
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 6);
        } else {
          ctx.rect(-boxW / 2, -boxH / 2, boxW, boxH);
        }

        if (isConsultant) {
          ctx.fillStyle = isDark
            ? `rgba(16, 28, 50, ${Math.max(0.7, alpha)})`
            : `rgba(240, 245, 255, ${Math.max(0.85, alpha)})`;
          ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0.6, alpha)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(10, 18, 30, ${Math.max(0.75, alpha)})`
            : `rgba(255, 255, 255, ${Math.max(0.92, alpha)})`;
          ctx.strokeStyle = `rgba(212, 175, 55, ${Math.max(0.5, alpha)})`;
        }
        ctx.lineWidth = 1.2;
        ctx.fill();
        ctx.stroke();

        // Text with high contrast
        ctx.fillStyle = isDark
          ? isConsultant
            ? "#fce881"
            : "#ffffff"
          : isConsultant
          ? "#855800"
          : "#0f172a";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 0, 0);

        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotateY(dx * 0.005);
      rotateX(-dy * 0.005);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotateY(dx * 0.007);
      rotateX(-dy * 0.007);
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const cElem = canvas;
    cElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    cElem.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      cElem.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cElem.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [points, isDark, isRtl]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Sphere Interactive Canvas */}
      <div className="relative w-full max-w-[500px] aspect-[500/440] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          className="touch-none"
        />

        {/* Orbit indicator hint */}
        <div className="absolute bottom-2 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-slate-900/60 border border-[#d4af37]/30 text-[#f3e5ab] backdrop-blur-sm pointer-events-none">
          <RotateCw className="w-3 h-3 text-[#d4af37] animate-spin" style={{ animationDuration: "10s" }} />
          <span>
            {isRtl ? "كرة تفاعلية ثلاثية الأبعاد (حرّك بالماوس أو اللمس)" : "Interactive 3D Sphere (Drag to spin)"}
          </span>
        </div>
      </div>

      {/* Control row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setShowBoard(!showBoard)}
          className="btn-gold px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>
            {showBoard
              ? isRtl ? "إخفاء اللوحة الشاملة" : "Hide Full Board"
              : isRtl ? "عرض لوحة الشعارات المفرغة الكاملة" : "View Transparent Logos Board"}
          </span>
        </button>
      </div>

      {/* Transparent Board Modal / Expansion */}
      {showBoard && (
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-card border border-[#d4af37]/40 shadow-2xl max-w-4xl w-full transition-all">
          <div className="text-center mb-4">
            <h4 className="text-sm font-bold text-foreground">
              {isRtl ? "لوحة شركاء النجاح والاستشاريين المفرغة" : "Clients & Engineering Consultants Board"}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isRtl ? "تمت إزالة الخلفية البيضاء لعرض أنيق ونقي" : "Transparent presentation without white background"}
            </p>
          </div>

          <div className="relative aspect-[1012/1156] sm:aspect-[16/10] w-full max-w-3xl mx-auto rounded-xl overflow-hidden p-4 bg-slate-950/20">
            <Image
              src="/assets/clients-consultants-transparent.png"
              alt="Alpha Power Clients & Consultants Transparent"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
