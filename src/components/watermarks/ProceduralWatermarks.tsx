// src/components/ProceduralWatermarks.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function ProceduralWatermarks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create multiple watermark layers at different angles and speeds
    const createWatermarkLayers = () => {
      // Clear existing layers
      if (containerRef.current) containerRef.current.innerHTML = ''
      
      // Create multiple layers at different angles
      const angles = [0, 15, 30, 45, 60, 75, 90, -15, -30, -45]
      const opacities = ['30', '35', '40']
      const speeds = ['fast', 'faster', 'fastest']
      
      angles.forEach((angle, i) => {
        const div = document.createElement('div')
        div.className = `absolute inset-0 opacity-${opacities[i % opacities.length]} font-light animate-marquee-${speeds[i % speeds.length]}`
        div.style.transform = `rotate(${angle}deg)`
        
        // Create more repeats for better coverage
        div.innerHTML = Array(20).fill('AKSHAT SINHA PORTFOLIO • ').join('')
        
        containerRef.current?.appendChild(div)
      })
    }

    createWatermarkLayers()
    
    // Resize handler to ensure coverage on window size change
    const handleResize = () => createWatermarkLayers()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{
        fontSize: 'calc(3vw + 0.5vh)', // Larger font size for better coverage
        letterSpacing: '0.1em'
      }}
    />
  )
}
