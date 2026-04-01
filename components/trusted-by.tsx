"use client";

import React from "react";
import { motion } from "framer-motion";
import { branches } from "@/lib/branches-data";
import Image from "next/image";

// We have 16 branches. Let's arrange them in a honeycomb flex layout.
// A honeycomb can be built with alternating rows of flex elements.
// Row 1: 3 items
// Row 2: 4 items
// Row 3: 5 items
// Row 4: 4 items

const Hexagon = ({ branch, index }: { branch: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="relative flex items-center justify-center bg-white shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all cursor-pointer group"
      style={{
        width: "110px",
        height: "127px", // 110 * 1.1547 (pointy top hexagon ratio)
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        margin: "0 6px", // Side margin for spacing
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,102,204,0.1) 0%, transparent 70%)"
        }}
      />
      
      {/* Container for logo to ensure it scales nicely */}
      <div className="relative w-[70px] h-[70px] flex items-center justify-center p-2 rounded-full">
        <img
          src={branch.logo}
          alt={branch.name}
          className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all"
        />
      </div>
    </motion.div>
  );
};

export function TrustedBy() {
  // Let's split 16 branches into rows: [3, 4, 5, 4]
  const rows = [
    branches.slice(0, 3),
    branches.slice(3, 7),
    branches.slice(7, 12),
    branches.slice(12, 16),
  ];

  let currentIndex = 0;

  return (
    <section className="relative py-32 overflow-hidden bg-[#0a0a0c] text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-[#e2e8f0] uppercase">
            OUR TECHNICAL SOCIETIES
          </h2>
        </div>

        {/* Honeycomb Grid Container */}
        <div className="flex flex-col items-center justify-center scale-90 sm:scale-100 md:scale-110 lg:scale-125 transition-transform origin-center">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex justify-center" 
              style={{
                // Vertical interlocking: the next row needs to move up by 1/4th of the height
                // Height is 127px. 127 / 4 = ~32px.
                // We'll use negative top margin on all subsequent rows.
                marginTop: rowIndex > 0 ? "-32px" : "0",
              }}
            >
              {row.map((branch) => {
                const index = currentIndex++;
                return <Hexagon key={branch.id} branch={branch} index={index} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
