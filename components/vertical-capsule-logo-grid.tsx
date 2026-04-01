"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Branch {
  id: string;
  name: string;
  logoUrl: string;
}

interface VerticalCapsuleLogoGridProps {
  branches: Branch[];
}

export function VerticalCapsuleLogoGrid({ branches }: VerticalCapsuleLogoGridProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-[24px] p-8">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className={cn(
            // Geometry (Crucial)
            "w-[100px] h-[240px] rounded-[9999px]",
            "aspect-[1/2.5]",
            // Layout
            "flex flex-col justify-between items-center",
            "pt-[40px] pb-[40px] px-[10px]",
            // Modern Styling: Glassmorphism & Gradient
            "bg-white/[0.05] backdrop-blur-[15px] border border-white/10",
            "bg-gradient-to-b from-white/5 to-transparent",
            "shadow-xl",
            // Prevent horizontal stretch
            "shrink-0"
          )}
        >
          {/* Logo at the very top */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={branch.logoUrl}
              alt={branch.name}
              fill
              className="object-contain filter brightness-0 invert opacity-90"
            />
          </div>

          {/* Branch name at the very bottom (Typography) */}
          <div className="flex-1 flex items-end justify-center pb-2">
            <span
              className="text-xs font-medium tracking-widest text-white/90 uppercase whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {branch.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
