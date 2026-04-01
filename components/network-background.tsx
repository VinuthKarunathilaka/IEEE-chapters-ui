"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    const initNodes = () => {
      // More nodes for denser web effect
      const nodeCount = Math.floor((canvas.width * canvas.height) / 8000)
      nodesRef.current = []
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.5 + 1.5,
        })
      }
    }

    const drawWeb = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const nodes = nodesRef.current
      const connectionDistance = 180
      
      // Draw web connections with gradient lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.35
            
            // Create gradient for each line
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            )
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.8})`)
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`)
            
            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.2
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
        
        // Connect to mouse - interactive web effect
        const dxMouse = nodes[i].x - mouseRef.current.x
        const dyMouse = nodes[i].y - mouseRef.current.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        
        if (distMouse < 250 && mouseRef.current.x > 0) {
          const opacity = (1 - distMouse / 250) * 0.5
          
          const gradient = ctx.createLinearGradient(
            nodes[i].x, nodes[i].y,
            mouseRef.current.x, mouseRef.current.y
          )
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
          gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`)
          
          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
        }
      }
      
      // Draw glowing nodes
      for (const node of nodes) {
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        )
        glowGradient.addColorStop(0, "rgba(59, 130, 246, 0.6)")
        glowGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.2)")
        glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)")
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
        
        // Core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(147, 197, 253, 0.8)"
        ctx.fill()
      }
    }

    const updateNodes = () => {
      const nodes = nodesRef.current
      
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        
        // Bounce off edges smoothly
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        
        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      }
    }

    const animate = () => {
      updateNodes()
      drawWeb()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
    }

    resizeCanvas()
    initNodes()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initNodes()
    })
    
    // Use window for mouse tracking since canvas has pointer-events: none
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  )
}
