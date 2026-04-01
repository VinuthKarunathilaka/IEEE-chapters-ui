"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { branches, Branch } from "@/lib/branches-data";
import { Facebook, Instagram, Youtube, Globe } from "lucide-react";

/*
  Full-page hexagonal honeycomb showcase.
  16 branches arranged in rows: 3 → 4 → 5 → 4
  Pointy-topped hexagons with CSS clip-path, interlocking vertically.
*/

const HEX_W = 160;
const HEX_H = Math.round(HEX_W * 1.1547); // ≈ 185
const HEX_GAP_X = 40;    // wide horizontal gap
const HEX_OVERLAP_Y = -20; // negative = positive gap between rows

const socialColorMap: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  youtube: "#FF0000",
  website: "#3B82F6",
};

const socialIcons: Record<string, React.FC<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
};

const Hexagon = ({ branch, index }: { branch: Branch; index: number }) => {
  const [hovered, setHovered] = useState(false);

  const socialEntries = Object.entries(branch.social).filter(([, v]) => v);

  return (
    <div
      className="relative"
      style={{ margin: `0 ${HEX_GAP_X / 2}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The hexagon itself */}
      <motion.div
        className="relative cursor-pointer"
        style={{
          width: HEX_W,
          height: HEX_H,
        }}
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      >
        {/* Outer glow border on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, rgba(59,130,246,0.6), rgba(168,85,247,0.6))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main hex body */}
        <div
          className="absolute inset-[2px] flex flex-col items-center justify-center transition-colors duration-300"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: hovered
              ? "linear-gradient(160deg, #1a1d2e 0%, #0f1117 100%)"
              : "linear-gradient(160deg, #f8f9fc 0%, #eef0f5 100%)",
          }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center"
            style={{ width: HEX_W * 0.55, height: HEX_W * 0.55 }}
            animate={{ scale: hovered ? 0.78 : 1, y: hovered ? -8 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img
              src={branch.logo}
              alt={branch.name}
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Short name visible on hover inside the hex */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="text-[10px] font-bold text-white/80 tracking-wider uppercase mt-1"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                {branch.shortName}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Social icons row BELOW the hexagon (outside clip-path) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
            style={{ top: HEX_H + 4 }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            {socialEntries.map(([key, url]) => {
              const Icon = socialIcons[key];
              if (!Icon) return null;
              const brandColor = socialColorMap[key] || "#fff";
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ ["--brand" as any]: brandColor }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = brandColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon className="w-3.5 h-3.5 text-white/80" />
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function TrustedBy() {
  // 16 branches → rows: [3, 4, 5, 4]
  const rows = [
    branches.slice(0, 3),
    branches.slice(3, 7),
    branches.slice(7, 12),
    branches.slice(12, 16),
  ];

  let idx = 0;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060609] text-white pt-20 pb-16">
      
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_60%)]" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle_at_30%_70%,rgba(45,212,191,0.08),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-white/50 tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            16 Technical Societies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-tight mb-4">
            IEEE Technical<br />Societies & Branches
          </h1>
          <p className="text-sm sm:text-base text-white/35 max-w-lg mx-auto leading-relaxed">
            Explore the diverse communities driving innovation in engineering, 
            technology, and science.
          </p>
        </motion.div>

        {/* ── Honeycomb Grid ── */}
        <div className="flex flex-col items-center pb-8">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center"
              style={{ marginTop: rowIndex > 0 ? -HEX_OVERLAP_Y : 0 }}
            >
              {row.map((branch) => {
                const i = idx++;
                return <Hexagon key={branch.id} branch={branch} index={i} />;
              })}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="mt-10 text-xs text-white/25 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Advancing Technology for Humanity
        </motion.p>
      </div>
    </section>
  );
}
