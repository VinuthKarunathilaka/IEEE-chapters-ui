"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
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
  logo: string
  social: SocialLinks
}

interface ParallaxGridProps {
  branches: Branch[]
}

export function ParallaxGrid({ branches }: ParallaxGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Calculate grid layout for centering last row
  const columns = 4
  const remainder = branches.length % columns
  const mainGridItems = remainder === 0 ? branches : branches.slice(0, -remainder)
  const lastRowItems = remainder === 0 ? [] : branches.slice(-remainder)

  return (
    <div ref={containerRef} className="relative">
      {/* Main Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {mainGridItems.map((branch, index) => (
          <ParallaxCard 
            key={branch.id} 
            branch={branch} 
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
      
      {/* Last Row - Centered */}
      {lastRowItems.length > 0 && (
        <div className="flex justify-center gap-5 sm:gap-6 lg:gap-8 mt-5 sm:mt-6 lg:mt-8">
          {lastRowItems.map((branch, index) => (
            <div key={branch.id} className="w-[calc(50%-10px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-24px)]">
              <ParallaxCard 
                branch={branch} 
                index={mainGridItems.length + index}
                containerRef={containerRef}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface ParallaxCardProps {
  branch: Branch
  index: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

function ParallaxCard({ branch, index, containerRef }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Parallax effect - different speeds based on column position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  // Vary parallax intensity based on position (creates depth)
  const parallaxIntensity = (index % 4) * 8 + 10 // 10, 18, 26, 34
  const y = useTransform(scrollYProgress, [0, 1], [parallaxIntensity, -parallaxIntensity])
  
  // Staggered reveal delay
  const revealDelay = index * 0.08

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: revealDelay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer"
    >
      {/* High-end Glassmorphism card */}
      <div 
        className="relative flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 overflow-hidden transition-all duration-500"
        style={{
          borderRadius: "25%",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        
        {/* Top highlight line */}
        <div 
          className="absolute top-0 left-4 right-4 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
          }}
        />
        
        {/* Logo - Frosted glass container */}
        <motion.div 
          className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden z-10 mb-4"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)"
          }}
        >
          <Image
            src={branch.logo}
            alt={`${branch.name} logo`}
            fill
            className="object-contain p-2"
          />
        </motion.div>
        
        {/* Name */}
        <motion.h3 
          className="text-xs sm:text-sm font-semibold text-center mb-4 line-clamp-2 z-10 px-2"
          animate={{ color: isHovered ? "rgb(255, 255, 255)" : "rgb(156, 163, 175)" }}
          transition={{ duration: 0.3 }}
        >
          {branch.name}
        </motion.h3>
        
        {/* Social Icons - Facebook, Instagram, YouTube only */}
        <motion.div
          className="flex items-center gap-2 z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <SocialIcon href={branch.social.facebook || "#"} hoverBg="hover:bg-[#1877F2]">
            <Facebook className="w-3.5 h-3.5" />
          </SocialIcon>
          <SocialIcon href={branch.social.instagram || "#"} hoverBg="hover:bg-[#E1306C]">
            <Instagram className="w-3.5 h-3.5" />
          </SocialIcon>
          <SocialIcon href={branch.social.youtube || "#"} hoverBg="hover:bg-[#FF0000]">
            <Youtube className="w-3.5 h-3.5" />
          </SocialIcon>
        </motion.div>
      </div>
    </motion.div>
  )
}

function SocialIcon({ href, hoverBg, children }: { href: string; hoverBg: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all ${hoverBg}`}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}
