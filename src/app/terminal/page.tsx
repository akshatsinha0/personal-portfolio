'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function TerminalPage() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(['Welcome to Akshat\'s Terminal. Type "help" to see available commands.'])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    // Scroll to bottom when history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const commands: { 
    [key: string]: (args?: any) => string | null 
  } = {
    help: () => {
      return `Available commands:
- about: Learn about Akshat
- skills: See technical skills
- projects: View projects
- contact: Get contact information
- clear: Clear terminal
- matrix: Enter the matrix
- secret: Find an easter egg`
    },
    about: () => {
      return `Akshat Sinha is a Computer Science student at VIT Vellore with a passion for frontend development and creating exceptional user experiences.`
    },
    skills: () => {
      return `Technical Skills:
- Programming: C, C++, Java, Python
- Web: React, JavaScript, HTML/CSS, Node.js
- Tools: Git, GitHub, AWS, VS Code
- Design: Figma, Canva`
    },
    projects: () => {
      return `Major Projects:
1. CrowdInsight - ML Crowd Analysis
2. And? - CHATBOX
3. TAKES TAKES TAKES
4. Movie-Vault
5. Arcs-Frontend

Type "open <project-number>" to view details`
    },
    open: (args) => {
      const projectNum = parseInt(args[0])
      const projects = [
        {id: 1, name: "CrowdInsight", url: "https://github.com/akshatsinha0/CrowdInsight.git"},
        {id: 2, name: "And?", url: "https://github.com/akshatsinha0/And-.git"},
        {id: 3, name: "TAKES TAKES TAKES", url: "https://github.com/akshatsinha0/takestakestakes-chessified.git"},
        {id: 4, name: "Movie-Vault", url: "https://github.com/akshatsinha0/Movie-Vault.git"},
        {id: 5, name: "Arcs-Frontend", url: "https://github.com/akshatsinha0/arcs24-frontend.git"}
      ]
      
      if (isNaN(projectNum) || projectNum < 1 || projectNum > 5) {
        return `Invalid project number. Use "projects" to see available projects.`
      }
      
      const project = projects.find(p => p.id === projectNum)
      if (project) {
        window.open(project.url, '_blank')
        return `Opening ${project.name}...`
      }
      return `Invalid project number. Use "projects" to see available projects.`
    },
    contact: () => {
      return `Email: akshat.sinha2022@vitstudent.ac.in
Phone: +91 9142812513
GitHub: github.com/akshatsinha0
LeetCode: leetcode.com/u/akshatsinha0/`
    },
    clear: () => {
      setHistory([])
      return null
    },
    matrix: () => {
      document.body.classList.add('matrix-effect')
      setTimeout(() => {
        document.body.classList.remove('matrix-effect')
      }, 5000)
      return `Entering the Matrix... Hold tight!`
    },
    secret: () => {
      return `You found it! Here's a special link: https://secret-portfolio-section.com`
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!input.trim()) return
    const args = input.trim().split(' ')
    const cmd = args[0].toLowerCase() as keyof typeof commands
    const cmdArgs = args.slice(1)
    
    let response
    if (commands[cmd]) {
      response = commands[cmd](cmdArgs)
    } else {
      response = `Command not found: ${cmd}. Type "help" to see available commands.`
    }
    
    setHistory(prev => [...prev, `> ${input}`, response].filter((line): line is string => line !== null))
    setInput('')
  }

  return (
    <div className="min-h-screen bg-black/90 p-4 font-mono flex items-center justify-center">
      <motion.div 
        className="w-full max-w-3xl bg-black border border-green-500/50 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-b border-green-500/50 p-2 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mx-1"></div>
          <div className="ml-4 text-green-500">akshat@portfolio:~</div>
        </div>
        
        <div 
          ref={terminalRef}
          className="p-4 h-[60vh] overflow-y-auto text-green-500 font-mono"
        >
          {history.map((line, i) => (
            <div key={i} className="mb-2 whitespace-pre-wrap">
              {line}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="mr-2">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-green-500"
              autoComplete="off"
            />
          </form>
        </div>
      </motion.div>
    </div>
  )
}
