"use client"

import { motion } from "framer-motion"
import { BranchCard } from "./branch-card"

interface Branch {
  id: string
  name: string
  logo: string
  social: {
    website?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    facebook?: string
    youtube?: string
  }
}

interface LogoGridProps {
  branches: Branch[]
}

export function LogoGrid({ branches }: LogoGridProps) {
  // Calculate grid layout for centering last row
  const columns = 4 // lg:grid-cols-4
  const remainder = branches.length % columns
  const mainGridItems = remainder === 0 ? branches : branches.slice(0, -remainder)
  const lastRowItems = remainder === 0 ? [] : branches.slice(-remainder)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
          }
        }
      }}
    >
      {/* Main Grid with staggered offset */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {mainGridItems.map((branch, index) => {
          // Create staggered vertical offset for alternating columns
          const colPosition = index % 4
          const offsetClass = colPosition % 2 === 1 ? "lg:translate-y-6" : ""
          
          return (
            <motion.div
              key={branch.id}
              className={`${offsetClass} transition-transform`}
              variants={{
                hidden: { opacity: 0, y: 40 },
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
              <BranchCard
                name={branch.name}
                logo={branch.logo}
                social={branch.social}
                index={index}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Last Row - Centered */}
      {lastRowItems.length > 0 && (
        <motion.div 
          className="flex justify-center gap-5 sm:gap-6 lg:gap-8 mt-5 sm:mt-6 lg:mt-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { delay: 0.3 }
            }
          }}
        >
          {lastRowItems.map((branch, index) => (
            <motion.div 
              key={branch.id} 
              className="w-[calc(50%-10px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-24px)]"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
            >
              <BranchCard
                name={branch.name}
                logo={branch.logo}
                social={branch.social}
                index={mainGridItems.length + index}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
