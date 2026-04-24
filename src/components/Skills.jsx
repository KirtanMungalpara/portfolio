import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../data'
import { useMouseTilt } from '../hooks/useMouseTilt'

const TECH_STACK = [
  { name: 'HTML5',       emoji: '🌐', desc: 'Semantic markup',     level: 90, color: '#E34F26' },
  { name: 'CSS3',        emoji: '🎨', desc: 'Responsive styling',   level: 85, color: '#1572B6' },
  { name: 'JavaScript',  emoji: '⚡', desc: 'ES6+ / Async',         level: 85, color: '#F7DF1E' },
  { name: 'React.js',    emoji: '⚛️', desc: 'Hooks / Context',      level: 88, color: '#61DAFB' },
  { name: 'Node.js',     emoji: '🟩', desc: 'REST APIs',            level: 80, color: '#68A063' },
  { name: 'Express.js',  emoji: '🚀', desc: 'Backend framework',    level: 78, color: '#888888' },
  { name: 'MongoDB',     emoji: '🍃', desc: 'NoSQL database',       level: 75, color: '#4DB33D' },
  { name: 'Tailwind CSS',emoji: '💨', desc: 'Utility CSS',          level: 90, color: '#38BDF8' },
  { name: 'Git',         emoji: '🔀', desc: 'Version control',      level: 82, color: '#F05032' },
  { name: 'REST API',    emoji: '🔗', desc: 'API design',           level: 80, color: '#00D4AA' },
  { name: 'JWT',         emoji: '🔐', desc: 'Authentication',        level: 76, color: '#D0021B' },
  { name: 'Redux',       emoji: '🗂️', desc: 'State management',     level: 70, color: '#764ABC' },
]

function SkillBar({ name, level, icon, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <span className="font-display font-medium text-sm text-gray-800 dark:text-gray-200">{name}</span>
        </div>
        <span className="font-mono text-xs text-accent tabular-nums">{level}%</span>
      </div>

      {/* 3D depth progress bar */}
      <div className="relative h-2 rounded-full overflow-hidden"
        style={{
          background: 'rgba(0,0,0,0.08)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
        }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, #00D4AA, #0ea5e9)',
            boxShadow: '0 0 8px rgba(0,212,170,0.5), 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {/* Glowing tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent"
            style={{ boxShadow: '0 0 6px rgba(0,212,170,0.9), 0 0 12px rgba(0,212,170,0.4)' }}
          />
          {/* Shine sweep */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function FlipCard({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] }}
      className="flip-card h-28 cursor-pointer"
      style={{ perspective: '600px' }}
    >
      <div className="flip-card-inner w-full h-full rounded-2xl">
        {/* Front */}
        <div
          className="flip-card-front rounded-2xl flex flex-col items-center justify-center gap-2 p-3"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <span className="text-2xl">{tech.emoji}</span>
          <p className="font-display font-semibold text-xs text-gray-800 dark:text-gray-200 text-center leading-tight">
            {tech.name}
          </p>
          <p className="font-mono text-[10px] text-gray-400 text-center">{tech.desc}</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back rounded-2xl flex flex-col items-center justify-center gap-3 p-3"
          style={{
            background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}08)`,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${tech.color}40`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.25), 0 0 20px ${tech.color}20`,
          }}
        >
          <div className="text-center">
            <p className="font-mono text-[10px] text-gray-400 mb-1">Proficiency</p>
            <p className="font-display font-bold text-xl" style={{ color: tech.color }}>
              {tech.level}%
            </p>
          </div>
          {/* Mini bar on back */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${tech.level}%`,
                background: `linear-gradient(90deg, ${tech.color}, ${tech.color}80)`,
                boxShadow: `0 0 6px ${tech.color}60`,
              }}
            />
          </div>
          <p className="font-mono text-[10px]" style={{ color: tech.color }}>{tech.name}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* 3D depth layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,170,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.3), transparent)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.3), transparent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-accent mb-2">02. skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            What I Work With
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Skill Bars — with 3D card wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-3xl space-y-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" style={{ boxShadow: '0 0 6px rgba(0,212,170,0.8)' }} />
              Proficiency Levels
            </h3>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={0.08 * i} />
            ))}
          </motion.div>

          {/* Flip Card Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-8 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#0ea5e9', boxShadow: '0 0 6px rgba(14,165,233,0.8)' }} />
              Full Tech Stack
              <span className="font-mono text-xs text-gray-400 ml-2">( hover to reveal )</span>
            </motion.h3>

            <div className="grid grid-cols-3 gap-3">
              {TECH_STACK.map((tech, i) => (
                <FlipCard key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Currently learning — 3D floating banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden card-shine"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(14,165,233,0.06) 50%, rgba(124,58,237,0.06) 100%)',
            border: '1px solid rgba(0,212,170,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-3xl float-slow">📚</div>
          <div>
            <p className="font-mono text-xs text-accent mb-2">currently_learning[]</p>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Next.js', 'Docker', 'AWS', 'GraphQL'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3, scale: 1.08 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="skill-tag cursor-default"
                  style={{ boxShadow: '0 2px 8px rgba(0,212,170,0.15)' }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
