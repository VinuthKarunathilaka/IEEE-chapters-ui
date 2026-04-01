"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { Instagram, Facebook, Youtube } from "lucide-react"

interface SocialLinks {
  website?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  youtube?: string
}

interface Branch {
  id: string
  name: string
  shortName?: string
  logo: string
  social: SocialLinks
}

interface BentoGridProps {
  branches: Branch[]
}

// Scattered vertical offsets for staggered look
const scatterOffsets = [0, 20, 8, 28, 12, 24, 4, 16, 10, 32, 6, 22, 14, 26, 8, 18]

export function BentoGrid({ branches }: BentoGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
      {branches.map((branch, index) => (
        <VerticalPill
          key={branch.id}
          branch={branch}
          index={index}
          offset={scatterOffsets[index % scatterOffsets.length]}
        />
      ))}
    </div>
  )
}

interface VerticalPillProps {
  branch: Branch
  index: number
  offset: number
}

function VerticalPill({ branch, index, offset }: VerticalPillProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Staggered animation delay
  const revealDelay = index * 0.05

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.5, 
        delay: revealDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.25 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer"
      style={{ marginTop: `${offset}px` }}
    >
      {/* Vertical Stadium Pill - fixed width feel, tall, 25% border-radius */}
      <motion.div 
        className="relative flex flex-col items-center justify-center gap-4 w-full py-10 sm:py-12 lg:py-14 px-4 sm:px-5 overflow-hidden"
        style={{
          borderRadius: "25%",
          background: isHovered 
            ? "rgba(255, 255, 255, 0.12)" 
            : "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isHovered 
            ? "1px solid rgba(255, 255, 255, 0.3)" 
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Top shine */}
        <div 
          className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)"
          }}
        />

        {/* Inner glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 0.5 : 0.1 }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: "25%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 100%)"
          }}
        />

        {/* Logo - Large and clearly visible */}
        <motion.div 
          className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden z-10"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)"
          }}
        >
          <Image
            src={branch.logo}
            alt={`${branch.name} logo`}
            fill
            className="object-contain p-2 sm:p-3"
          />
        </motion.div>
        
        {/* Full Name - clearly visible */}
        <motion.h3 
          className="text-sm sm:text-base lg:text-lg font-semibold text-center leading-tight z-10 px-2"
          animate={{ 
            color: isHovered ? "rgb(255, 255, 255)" : "rgb(200, 200, 210)" 
          }}
          transition={{ duration: 0.25 }}
        >
          {branch.name}
        </motion.h3>
          
        {/* Social Icons */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3 z-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 8
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <SocialIcon href={branch.social.facebook || "#"}>
            <Facebook className="w-4 h-4" />
          </SocialIcon>
          <SocialIcon href={branch.social.instagram || "#"}>
            <Instagram className="w-4 h-4" />
          </SocialIcon>
          <SocialIcon href={branch.social.youtube || "#"}>
            <Youtube className="w-4 h-4" />
          </SocialIcon>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
      style={{
        background: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.15)"
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.a>
  )
}
