import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../data'

const TECH_STACK = [
  { name: 'HTML5', emoji: '🌐', desc: 'Semantic markup' },
  { name: 'CSS3', emoji: '🎨', desc: 'Responsive styling' },
  { name: 'JavaScript', emoji: '⚡', desc: 'ES6+ / Async' },
  { name: 'React.js', emoji: '⚛️', desc: 'Hooks / Context' },
  { name: 'Node.js', emoji: '🟩', desc: 'REST APIs' },
  { name: 'Express.js', emoji: '🚀', desc: 'Backend framework' },
  { name: 'MongoDB', emoji: '🍃', desc: 'NoSQL database' },
  { name: 'Tailwind CSS', emoji: '💨', desc: 'Utility CSS' },
  { name: 'Git', emoji: '🔀', desc: 'Version control' },
  { name: 'REST API', emoji: '🔗', desc: 'API design' },
  { name: 'JWT', emoji: '🔐', desc: 'Authentication' },
  { name: 'Redux', emoji: '🗂️', desc: 'State management' },
]

function SkillBar({ name, level, icon, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-display font-medium text-sm text-gray-800 dark:text-gray-200">{name}</span>
        </div>
        <span className="font-mono text-xs text-accent">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-teal-400 relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50/80 dark:bg-gray-950/50 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
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
          {/* Skill Bars */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-8"
            >
              Proficiency Levels
            </motion.h3>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={0.1 * i} />
            ))}
          </div>

          {/* Tech Cards Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-8"
            >
              Full Tech Stack
            </motion.h3>
            <div className="grid grid-cols-3 gap-3">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-card rounded-2xl p-4 text-center cursor-default hover:glow-accent transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.emoji}
                  </div>
                  <p className="font-display font-semibold text-xs text-gray-800 dark:text-gray-200 leading-tight">
                    {tech.name}
                  </p>
                  <p className="font-mono text-xs text-gray-400 mt-0.5 leading-tight">
                    {tech.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <div className="text-3xl">📚</div>
          <div>
            <p className="font-mono text-xs text-accent mb-1">currently_learning[]</p>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Next.js', 'Docker', 'AWS', 'GraphQL'].map(item => (
                <span key={item} className="skill-tag">{item}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
