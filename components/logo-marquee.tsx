"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react"

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

interface LogoMarqueeProps {
  branches: Branch[]
}

export function LogoMarquee({ branches }: LogoMarqueeProps) {
  // Split branches into 3 rows for parallax effect
  const row1 = branches.slice(0, 6)
  const row2 = branches.slice(6, 12)
  const row3 = branches.slice(12)

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Row 1 - Fast */}
      <MarqueeRow items={row1} duration={35} direction="left" />
      
      {/* Row 2 - Medium, opposite direction */}
      <MarqueeRow items={row2} duration={45} direction="right" className="mt-6" />
      
      {/* Row 3 - Slow */}
      <MarqueeRow items={row3} duration={40} direction="left" className="mt-6" />
    </div>
  )
}

interface MarqueeRowProps {
  items: Branch[]
  duration: number
  direction: "left" | "right"
  className?: string
}

function MarqueeRow({ items, duration, direction, className = "" }: MarqueeRowProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items]
  
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {duplicatedItems.map((branch, index) => (
          <MarqueeCard key={`${branch.id}-${index}`} branch={branch} />
        ))}
      </motion.div>
    </div>
  )
}

function MarqueeCard({ branch }: { branch: Branch }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative flex-shrink-0 group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="relative flex flex-col items-center justify-center p-6 bg-card/60 backdrop-blur-sm border border-border/40 w-[180px] h-[200px] overflow-hidden transition-shadow duration-300"
        style={{ borderRadius: "25%" }}
      >
        {/* Logo */}
        <div className="relative w-16 h-16 mb-3 rounded-xl overflow-hidden">
          <Image
            src={branch.logo}
            alt={`${branch.name} logo`}
            fill
            className="object-contain mix-blend-lighten brightness-110 contrast-110 rounded-xl"
          />
        </div>
        
        {/* Name */}
        <p className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 mb-3">
          {branch.name}
        </p>
        
        {/* Social Icons - appear on hover */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {branch.social.facebook && (
            <a href={branch.social.facebook} target="_blank" rel="noopener noreferrer" 
               className="w-7 h-7 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-[#1877F2] hover:text-white transition-all hover:scale-110">
              <Facebook className="w-3 h-3" />
            </a>
          )}
          {branch.social.instagram && (
            <a href={branch.social.instagram} target="_blank" rel="noopener noreferrer"
               className="w-7 h-7 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-[#E1306C] hover:text-white transition-all hover:scale-110">
              <Instagram className="w-3 h-3" />
            </a>
          )}
          {branch.social.linkedin && (
            <a href={branch.social.linkedin} target="_blank" rel="noopener noreferrer"
               className="w-7 h-7 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-all hover:scale-110">
              <Linkedin className="w-3 h-3" />
            </a>
          )}
          {branch.social.twitter && (
            <a href={branch.social.twitter} target="_blank" rel="noopener noreferrer"
               className="w-7 h-7 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all hover:scale-110">
              <Twitter className="w-3 h-3" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
