// src/components/projects/ProjectCard.tsx
'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  github: string
}

export const ProjectCard = ({ project }: { project: Project }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target === document.activeElement && e.key === 'Enter') {
        window.open(project.github, '_blank')
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [project.github])

  return (
    <motion.div
      className="relative group h-96 w-96 cursor-pointer"
      style={{ transform: 'translateZ(0)' }}
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open(project.github, '_blank')}
      onKeyDown={(e) => e.key === 'Enter' && window.open(project.github, '_blank')}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl shadow-2xl transition-all group-hover:blur-xl" />
      
      <div className="relative h-full p-8 bg-gray-900/80 backdrop-blur-lg rounded-3xl border border-white/10">
        <div className="h-[60%] flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl mb-4">
          <div className="text-6xl">🚀</div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((tech, index) => (
              <span 
                key={`${tech}-${index}`}
                className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
