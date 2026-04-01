"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Branch {
  id: string;
  name: string;
  logoUrl: string;
  status: "active" | "inactive" | "upcoming";
  span?: boolean; 
}

interface VerticalPillLogoGridProps {
  branches: Branch[];
}

export function VerticalPillLogoGrid({ branches }: VerticalPillLogoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-center items-center p-8 auto-rows-[120px]">
      {branches.map((branch, index) => (
        <motion.div
          key={branch.id}
          whileHover={{ scale: 1.05 }}
          className={cn(
            "relative flex flex-col items-center justify-between rounded-[25%]",
            "bg-white/[0.03] backdrop-blur-[16px] border border-white/[0.08]",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
            "hover:border-white/20",
            "transition-all duration-300 ease-in-out cursor-pointer",
            "overflow-hidden px-4 py-8",
            "h-full w-full",
            // Responsive pill width and span
            "w-[90px] mx-auto",
            branch.span ? "row-span-2 h-[320px]" : "row-span-1 h-[200px]"
          )}
        >
          {/* Logo Container */}
          <div className="flex-1 flex items-center justify-center pt-2 group">
            <div className="relative w-12 h-12 transition-all duration-300">
              <Image
                src={branch.logoUrl}
                alt={branch.name}
                fill
                className={cn(
                  "object-contain transition-all duration-300",
                  "filter brightness-0 invert opacity-80",
                  "group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
                )}
              />
            </div>
          </div>

          {/* Typography */}
          <div className="flex-1 flex flex-col items-center justify-end pb-4 space-y-3 gap-2">
            <span 
              className="text-xs font-semibold tracking-widest text-white/90 uppercase"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {branch.name}
            </span>

            {/* Status Indicator */}
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                branch.status === "active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : 
                branch.status === "upcoming" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" : 
                "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              )}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
