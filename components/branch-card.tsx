"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react"

interface SocialLinks {
  website?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  youtube?: string
}

interface BranchCardProps {
  logo: string
  name: string
  social: SocialLinks
  index?: number
}

export function BranchCard({ logo, name, social, index = 0 }: BranchCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Staggered animation delay based on index
  const staggerDelay = index * 0.05

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: staggerDelay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col items-center justify-between",
        "py-10 px-4",
        "w-[120px] h-[360px] shrink-0",
        "bg-card/60 backdrop-blur-md",
        "rounded-[25%]",
        "border border-border/40",
        "cursor-pointer",
        "overflow-hidden"
      )}
      style={{
        boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
        transition: "box-shadow 0.4s ease"
      }}
    >
      {/* Container */}
      <div className="relative flex flex-col items-center justify-between h-full z-10 w-full">
        {/* Logo with scale animation */}
        <motion.div 
          className="relative w-20 h-20 shrink-0 rounded-[25%] overflow-hidden mt-2"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain mix-blend-lighten brightness-110 contrast-110 rounded-[25%]"
          />
        </motion.div>

        {/* Name with fade effect */}
        <motion.h3 
          className="text-xs font-semibold text-center mt-2 mb-2 flex-grow uppercase tracking-widest whitespace-nowrap overflow-hidden"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          animate={{ 
            color: isHovered ? "rgb(255, 255, 255)" : "rgb(156, 163, 175)"
          }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h3>

        {/* Social Icons - Animated reveal */}
        <motion.div 
          className="flex flex-col items-center justify-end gap-2 mb-2 min-h-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {social.facebook && (
            <SocialIcon 
              href={social.facebook} 
              label={`${name} Facebook`}
              hoverColor="#1877F2"
              delay={0}
            >
              <Facebook className="w-[14px] h-[14px]" />
            </SocialIcon>
          )}
          {social.instagram && (
            <SocialIcon 
              href={social.instagram} 
              label={`${name} Instagram`}
              hoverColor="#E4405F"
              delay={0.05}
            >
              <Instagram className="w-[14px] h-[14px]" />
            </SocialIcon>
          )}
          {social.linkedin && (
            <SocialIcon 
              href={social.linkedin} 
              label={`${name} LinkedIn`}
              hoverColor="#0A66C2"
              delay={0.1}
            >
              <Linkedin className="w-[14px] h-[14px]" />
            </SocialIcon>
          )}
          {social.twitter && (
            <SocialIcon 
              href={social.twitter} 
              label={`${name} X`}
              hoverColor="#1DA1F2"
              delay={0.15}
            >
              <Twitter className="w-[14px] h-[14px]" />
            </SocialIcon>
          )}
          {social.youtube && (
            <SocialIcon 
              href={social.youtube} 
              label={`${name} YouTube`}
              hoverColor="#FF0000"
              delay={0.2}
            >
              <Youtube className="w-[14px] h-[14px]" />
            </SocialIcon>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Reusable Social Icon component
function SocialIcon({ 
  href, 
  label, 
  hoverColor, 
  delay, 
  children 
}: { 
  href: string
  label: string
  hoverColor: string
  delay: number
  children: React.ReactNode 
}) {
  const [isIconHovered, setIsIconHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-7 h-7 rounded-full",
        "bg-secondary/40 backdrop-blur-sm",
        "flex items-center justify-center",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-1 focus:ring-primary",
        isIconHovered ? "" : "text-muted-foreground"
      )}
      style={isIconHovered ? { color: hoverColor } : {}}
      onMouseEnter={() => setIsIconHovered(true)}
      onMouseLeave={() => setIsIconHovered(false)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.2 }}
      aria-label={label}
    >
      {children}
    </motion.a>
  )
}
