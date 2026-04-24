import { useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Star } from 'lucide-react'
import { PROJECTS, TECH_ICONS } from '../data'

function TechBadge({ tech }) {
  const style = TECH_ICONS[tech] || {
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    border: 'border-gray-500/20',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border ${style.bg} ${style.text} ${style.border}`}
    >
      {tech}
    </span>
  )
}

/* 3D tilt card using spring physics */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 120, damping: 18 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)
  const shadowX = useTransform(x, [-0.5, 0.5], ['-8px', '8px'])
  const shadowY = useTransform(y, [-0.5, 0.5], ['-8px', '8px'])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative overflow-hidden cursor-default rounded-3xl group"
      >
        {/* Card surface with 3D depth */}
        <div
          className="relative overflow-hidden rounded-3xl card-shine"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          />

          {/* 3D floating accent bar at top */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.8), rgba(14,165,233,0.6), transparent)',
              transform: 'translateZ(5px)',
            }}
          />

          <div className="relative p-8 space-y-5" style={{ transformStyle: 'preserve-3d' }}>

            {/* Header */}
            <div className="flex items-start justify-between gap-4" style={{ transform: 'translateZ(15px)' }}>
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-4xl"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                >
                  {project.icon}
                </motion.span>
                <div>
                  {project.featured && (
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="font-mono text-xs text-amber-400">Featured Project</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 font-display dark:text-white group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className={`font-mono text-xs ${project.accentColor} mt-0.5`}>{project.tagline}</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center flex-shrink-0 gap-2">
                {[
                  { href: project.github, icon: Github, label: 'GitHub' },
                  { href: project.live, icon: ExternalLink, label: 'Live' },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-accent transition-colors rounded-full w-9 h-9"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                    }}
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background: 'linear-gradient(90deg, rgba(0,212,170,0.4), rgba(255,255,255,0.1), transparent)',
                transform: 'translateZ(5px)',
              }}
            />

            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400" style={{ transform: 'translateZ(8px)' }}>
              {project.description}
            </p>

            {/* Features */}
            <div className="space-y-2" style={{ transform: 'translateZ(10px)' }}>
              <p className="font-mono text-xs text-gray-400">key_features:</p>
              <ul className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ArrowRight size={11} className="flex-shrink-0 mt-1 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2" style={{ transform: 'translateZ(12px)' }}>
              <p className="font-mono text-xs text-gray-400">tech_stack:</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2" style={{ transform: 'translateZ(20px)' }}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 text-xs btn-outline"
              >
                <Github size={13} />
                View Code
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 text-xs btn-primary"
                style={{ boxShadow: '0 4px 15px rgba(0,212,170,0.3)' }}
              >
                <ExternalLink size={13} />
                Live Demo
              </motion.a>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* 3D depth bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 0% 100%, rgba(0,212,170,0.04), transparent 60%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(14,165,233,0.04), transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-6xl px-6 mx-auto md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-2 font-mono text-sm text-accent">03. projects</p>
          <h2 className="text-4xl font-bold text-gray-900 font-display md:text-5xl dark:text-white">
            What I've Built
          </h2>
          <div className="w-24 h-px mt-4 bg-gradient-to-r from-accent to-transparent" />
          <p className="max-w-xl mt-4 text-gray-500 dark:text-gray-400">
            Here are some of the projects I've built that showcase my skills and passion for development.
          </p>
        </motion.div>

        {/* 3D Tilt Project Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA — 3D floating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-gray-500 dark:text-gray-400">Want to see more of my work?</p>
          <motion.a
            href="https://github.com/KirtanMungalpara?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex btn-outline"
            style={{ boxShadow: '0 8px 24px rgba(0,212,170,0.15)' }}
          >
            <Github size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
