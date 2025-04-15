// src/app/about/page.tsx
'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaCode, FaEnvelope, FaPhone } from 'react-icons/fa'
import Image from 'next/image'
import { Suspense } from 'react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 bg-grid-white/5 pt-20">
      <section className="px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div 
            className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/AkshatSinhaImage.jpg"
              alt="Akshat Sinha"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </motion.div>
          
          {/* Profile Info */}
          <div>
            <h1 className="text-6xl font-bold marvel-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Akshat Sinha
            </h1>
            <p className="text-2xl mt-2 text-neutral-300 marvel-regular">
              Frontend Developer & CS Student
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <SocialLink href="https://github.com/akshatsinha0" icon={<FaGithub />} label="GitHub" />
              <SocialLink href="https://leetcode.com/u/akshatsinha0/" icon={<FaCode />} label="LeetCode" />
              <SocialLink href="mailto:akshat.sinha2022@vitstudent.ac.in" icon={<FaEnvelope />} label="Email" />
              <SocialLink href="tel:+919142812513" icon={<FaPhone />} label="Call" />
              <SocialLink href="https://linkedin.com/in/akshatsinha0" icon={<FaLinkedin />} label="LinkedIn" />
            </div>
            
            <p className="mt-6 text-lg text-neutral-300 max-w-2xl fira-sans-light leading-relaxed">
              Enthusiast for coding in Java with strong knowledge of mathematics, DSA, software development & project management. 
              Skilled in speaking, crowd management, and group communication. Currently learning effective AI prompts.
            </p>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <EducationTimeline />
        
        {/* Technical Skills */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading skills...</div>}>
          <SkillsGrid />
        </Suspense>
        
        {/* Coursework Section */}
        <CourseworkSection />
      </section>
    </div>
  )
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-white/5 to-white/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg">{icon}</span>
    <span className="fira-sans-medium">{label}</span>
  </motion.a>
)

const EducationTimeline = () => (
  <motion.div 
    className="mt-24"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h2 className="text-3xl font-bold mb-12 marvel-bold text-white/90">Education</h2>
    <div className="space-y-12 relative pl-8 border-l-2 border-white/20">
      <TimelineItem 
        title="Vellore Institute of Technology, Vellore"
        subtitle="B.Tech in Computer Science Core"
        date="2022 - 2026 (Expected)"
        description="CGPA: 8.79/10"
        color="blue"
      />
      <TimelineItem 
        title="Delhi Public School, Ranchi"
        subtitle="Higher Secondary Education"
        date="2015 - 2022"
        description="Class XII: 89.6% | Class X: 95%"
        color="purple"
      />
      <TimelineItem 
        title="FIITJEE, Ranchi"
        subtitle="Specialized Training"
        date="2019 - 2022"
        description="Physics, Chemistry, Mathematics, SST, Mathematical Reasoning, & Quantitative Aptitude"
        color="emerald"
      />
    </div>
  </motion.div>
)

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  color: string;
}

const TimelineItem = ({ title, subtitle, date, description, color }: TimelineItemProps) => {
  // Define color mapping for dynamic classes
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500'
  }
  
  return (
    <motion.div 
      className="relative pl-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute w-4 h-4 ${colorMap[color]} rounded-full -left-[9px] top-2 shadow-lg shadow-${color}-500/40`} />
      <h3 className="text-xl font-semibold marvel-bold">{title}</h3>
      <p className="text-neutral-300 fira-sans-regular">{subtitle}</p>
      <p className="text-sm text-neutral-500 mt-1 fira-sans-light">{date}</p>
      <p className="mt-2 text-neutral-300 fira-sans-light">{description}</p>
    </motion.div>
  )
}

const SkillsGrid = () => (
  <motion.div 
    className="mt-24"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <h2 className="text-3xl font-bold mb-12 marvel-bold text-white/90">Technical & Design Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkillCategory 
        title="Programming Languages" 
        skills={["C", "C++", "Java", "Python"]} 
        delay={0.1}
      />
      <SkillCategory 
        title="Web Development" 
        skills={["HTML", "CSS", "JavaScript", "React", "Node.js"]} 
        delay={0.2}
      />
      <SkillCategory 
        title="Database" 
        skills={["MySQL"]} 
        delay={0.3}
      />
      <SkillCategory 
        title="Tools & Technologies" 
        skills={["Git", "GitHub", "AWS", "VS Code", "Jupyter Notebook"]} 
        delay={0.4}
      />
      <SkillCategory 
        title="Design" 
        skills={["Figma", "Canva"]} 
        delay={0.5}
      />
      <SkillCategory 
        title="Soft Skills" 
        skills={["Problem Solving", "Team Collaboration", "Leadership", "Time Management"]} 
        delay={0.6}
      />
    </div>
  </motion.div>
)

interface SkillCategoryProps {
  title: string;
  skills: string[];
  delay: number;
}

const SkillCategory = ({ title, skills, delay }: SkillCategoryProps) => (
  <motion.div 
    className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <h3 className="text-xl font-semibold mb-4 marvel-bold">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <motion.span 
          key={skill} 
          className="px-3 py-1 text-sm rounded-full bg-white/10 fira-sans-medium"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

const CourseworkSection = () => (
  <motion.div 
    className="mt-24 mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
  >
    <h2 className="text-3xl font-bold mb-12 marvel-bold text-white/90">Relevant Coursework</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[
        "Operating Systems (OS)",
        "Database Management Systems (DBMS)",
        "Data Structures and Algorithms (DSA)",
        "Design and Analysis of Algorithms (DAA)",
        "Computer Organization and Architecture (COA)",
        "Object-Oriented Programming (OOP)",
        "Computer Networks (CN)",
        "Web Programming",
        "Compiler Design"
      ].map((course, index) => (
        <motion.div
          key={course}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <span className="fira-sans-medium">{course}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
)
