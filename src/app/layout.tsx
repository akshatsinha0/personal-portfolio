'use client'
import { useState, useEffect, useRef } from 'react'
import { Marvel, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Canvas } from '@react-three/fiber'
import { NeuralNetwork } from '@/components/canvas/NeuralNetwork'
import CursorCore from '@/components/cursor/CursorCore'
import Link from 'next/link'
import { gsap } from 'gsap'

// Font configurations
const marvel = Marvel({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marvel'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair'
})

// Watermark Component (Only for counting page)
const ProceduralWatermarks = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const createWatermarkLayer = (angle: number, speed: string) => {
      const div = document.createElement('div')
      div.className = `absolute inset-0 opacity-20 font-light animate-marquee-${speed}`
      div.style.transform = `rotate(${angle}deg)`
      div.innerHTML = Array(8).fill('AKSHAT SINHA PORTFOLIO • ').join('')
      return div
    }

    containerRef.current.appendChild(createWatermarkLayer(15, 'slow'))
    containerRef.current.appendChild(createWatermarkLayer(20, 'medium'))
    containerRef.current.appendChild(createWatermarkLayer(25, 'fast'))

  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{
        fontSize: 'calc(1.5vw + 1.5vh)'
      }}
    />
  )
}

// Counting Loader Component with Watermarks
const CountingLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const counter = { value: 0 }
    
    gsap.to(counter, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(counter.value)),
      onComplete: () => {
        setTimeout(() => onComplete(), 500)
      }
    })
  }, [onComplete])
  
  return (
    <div className="fixed inset-0 bg-[#111111] z-[9999] flex items-center justify-center">
      {/* Red top bar */}
      <div className="absolute top-0 left-0 w-full h-3 bg-red-600 z-[2]"></div>
      
      {/* Procedural Watermarks */}
      <ProceduralWatermarks />
      
      {/* Counter */}
      <div className={`${playfair.className} text-[15rem] text-white font-normal relative z-[3]`}>
        {count}
      </div>
    </div>
  )
}

// Main Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <html lang="en" className={`${marvel.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Marvel:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="marvel-regular bg-gray-900">
        {loading ? (
          <CountingLoader onComplete={() => setLoading(false)} />
        ) : (
          <div className="opacity-100 transition-opacity duration-500">
            <Canvas className="fixed top-0 left-0 w-full h-full pointer-events-none">
              <ambientLight intensity={0.5} />
              <NeuralNetwork />
            </Canvas>

            <nav className="fixed top-0 w-full z-50 p-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">AS</Link>
              <button 
                className="z-50 relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className={`w-8 h-1 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                <div className={`w-8 h-1 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-8 h-1 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </button>
              
              <div className={`fixed inset-0 glassmorphism z-40 flex items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="grid grid-cols-1 gap-8 text-center">
                  <NavLink href="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                  <NavLink href="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                  <NavLink href="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
                  <NavLink href="/terminal" onClick={() => setMenuOpen(false)}>Terminal</NavLink>
                </div>
              </div>
            </nav>

            <CursorCore />
            <main>{children}</main>
          </div>
        )}
      </body>
    </html>
  )
}

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void }> = ({ href, children, onClick }) => (
  <Link 
    href={href}
    className="text-4xl font-bold hover:text-blue-400 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
)
