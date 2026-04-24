import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { SOCIAL_LINKS } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden grid-pattern noise-bg">
      {/* Background orbs */}
      <div className="orb orb-1 dark:opacity-15 opacity-10" />
      <div className="orb orb-2 dark:opacity-10 opacity-5" />

      {/* Animated grid dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl px-6 pt-24 pb-16 mx-auto md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Text Content */}
          <div className="space-y-6">
            {/* Badge */}
            <motion.div {...fadeUp(0.2)} className="inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs border rounded-full glass text-accent border-accent/20">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.p {...fadeUp(0.3)} className="font-mono text-sm text-gray-500 dark:text-gray-400">
                Hi there, I'm
              </motion.p>
              <motion.h1
                {...fadeUp(0.4)}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Kirtan
                <br />
                <span className="gradient-text">Mungalpara</span>
              </motion.h1>
            </div>

            {/* Role */}
            <motion.div {...fadeUp(0.5)} className="flex items-center gap-3">
              <div className="w-8 h-px bg-accent" />
              <p className="text-lg font-medium text-gray-600 font-display md:text-xl dark:text-gray-300">
                Software Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.6)} className="max-w-lg leading-relaxed text-gray-600 dark:text-gray-400 text-balance">
              Crafting performant, user-centric web experiences with the MERN stack.
              Passionate about clean code, intuitive design, and building products that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.7)} className="flex flex-wrap gap-3 pt-2">
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <Sparkles size={15} />
                View My Work
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                <Mail size={15} />
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div {...fadeUp(0.8)} className="flex items-center gap-4 pt-2">
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all duration-300 rounded-full glass dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:border-accent/40"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
              <div className="w-12 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent" />
              <span className="font-mono text-xs text-gray-400">follow me</span>
            </motion.div>
          </div>

          {/* Right — Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative items-center justify-center hidden lg:flex"
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute border border-dashed rounded-full w-80 h-80 border-accent/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 border border-dashed rounded-full border-accent/10"
            />

            {/* Center Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center justify-center w-56 h-56 rounded-3xl glass-card glow-accent"
            >
              <div className="space-y-3 text-center">
                <div className="text-7xl">👨‍💻</div>
                <div>
                  <p className="text-sm font-bold font-display">Kirtan Mungalpara</p>
                  <p className="font-mono text-xs text-accent">Full Stack Dev</p>
                </div>
              </div>
            </motion.div>

            {/* Floating skill chips */}
            {[
              { label: 'React.js', pos: '-top-4 -left-8', delay: 0 },
              { label: 'Node.js', pos: '-top-4 -right-8', delay: 0.5 },
              { label: 'MongoDB', pos: '-bottom-4 -left-6', delay: 1 },
              { label: 'JavaScript', pos: '-bottom-4 -right-4', delay: 1.5 },
            ].map(({ label, pos, delay }) => (
              <motion.div
                key={label}
                className={`absolute ${pos} glass px-3 py-1.5 rounded-full`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
              >
                <span className="font-mono text-xs text-accent">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute flex flex-col items-center gap-2 text-gray-400 transition-colors -translate-x-1/2 bottom-8 left-1/2 hover:text-accent group"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="group-hover:text-accent" />
        </motion.div>
      </motion.button>
    </section>
  )
}
