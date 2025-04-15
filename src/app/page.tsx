// src/app/page.tsx
'use client'
import TypewriterName from '@/components/TypewriterName/TypewriterName'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero section with 3D typewriter animation */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <TypewriterName />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-light text-gray-400 marvel-regular">
              Frontend Developer & Computer Science Student
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/projects"
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Explore My Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional sections can be added below */}
    </main>
  )
}
