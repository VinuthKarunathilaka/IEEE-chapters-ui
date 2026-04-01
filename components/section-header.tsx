"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  badge: string
  title: string
  description: string
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <motion.div 
      className="text-center mb-16 relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      }}
    >
      {/* Badge */}
      <motion.span 
        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.9 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
      >
        {badge}
      </motion.span>
      
      {/* Title */}
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
      >
        {title}
      </motion.h2>
      
      {/* Description */}
      <motion.p 
        className="text-muted-foreground max-w-2xl mx-auto text-lg"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
