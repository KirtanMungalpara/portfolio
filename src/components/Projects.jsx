import { motion } from 'framer-motion'
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

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden transition-all duration-500 group glass-card rounded-3xl hover:glow-accent"
    >
      {/* Gradient overlay at top */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{project.icon}</span>
            <div>
              {project.featured && (
                <div className="flex items-center gap-1 mb-1">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="font-mono text-xs text-amber-400">Featured Project</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 font-display dark:text-white group-hover:text-accent">
                {project.title}
              </h3>
              <p className={`font-mono text-xs ${project.accentColor} mt-0.5`}>{project.tagline}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center flex-shrink-0 gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center text-gray-500 transition-colors rounded-full w-9 h-9 glass dark:text-gray-400 hover:text-accent"
              aria-label="GitHub"
            >
              <Github size={16} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center text-gray-500 transition-colors rounded-full w-9 h-9 glass dark:text-gray-400 hover:text-accent"
              aria-label="Live Demo"
            >
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-accent/30 via-gray-200 dark:via-gray-800 to-transparent" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {/* Features */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-gray-400">key_features:</p>
          <ul className="space-y-1.5">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <ArrowRight size={12} className="flex-shrink-0 mt-1 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-gray-400">tech_stack:</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 text-xs btn-primary"
          >
            <ExternalLink size={13} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-6xl px-6 mx-auto md:px-12">
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

        {/* Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex btn-outline"
          >
            <Github size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
