import { useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Code2, Rocket, Heart, GraduationCap, MapPin, Calendar } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

const INFO_CARDS = [
  {
    icon: GraduationCap,
    title: 'Education',
    value: 'B.Tech — CS Engineering',
    sub: 'Graduating 2026',
    color: 'text-violet-400',
    glow: 'rgba(167,139,250,0.3)',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Gujarat, India',
    sub: 'Open to Work',
    color: 'text-rose-400',
    glow: 'rgba(251,113,133,0.3)',
    bg: 'rgba(251,113,133,0.08)',
    border: 'rgba(251,113,133,0.2)',
  },
  {
    icon: Calendar,
    title: 'Experience',
    value: 'Fresher',
    sub: 'Eager to Learn & Grow',
    color: 'text-accent',
    glow: 'rgba(0,212,170,0.3)',
    bg: 'rgba(0,212,170,0.08)',
    border: 'rgba(0,212,170,0.2)',
  },
  {
    icon: Rocket,
    title: 'Focus',
    value: 'Full Stack Dev',
    sub: 'MERN Stack',
    color: 'text-amber-400',
    glow: 'rgba(251,191,36,0.3)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.2)',
  },
]

const VALUES = [
  { icon: Code2, title: 'Clean Code', desc: 'I believe in writing readable, maintainable code that scales.', color: '#00D4AA' },
  { icon: Rocket, title: 'Fast Learner', desc: 'Rapidly adapting to new technologies and frameworks.', color: '#0ea5e9' },
  { icon: Heart, title: 'User First', desc: 'Building experiences that users love and find intuitive.', color: '#f43f5e' },
]

/* 3D tilt info card */
function InfoCard3D({ card, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 130, damping: 20 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig)

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
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
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '800px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="p-5 rounded-2xl cursor-default"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Card face */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: card.bg,
            border: `1px solid ${card.border}`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.15), 0 0 20px ${card.glow}20, inset 0 1px 0 rgba(255,255,255,0.12)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Icon floating above */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: card.bg,
              border: `1px solid ${card.border}`,
              boxShadow: `0 4px 12px ${card.glow}`,
              transform: 'translateZ(15px)',
            }}
          >
            <card.icon size={18} className={card.color} />
          </div>

          <p className="mb-1 font-mono text-xs text-gray-400" style={{ transform: 'translateZ(8px)' }}>
            {card.title}
          </p>
          <p className="text-sm font-semibold leading-snug text-gray-900 font-display dark:text-white"
            style={{ transform: 'translateZ(12px)' }}>
            {card.value}
          </p>
          <p className="font-mono text-xs text-gray-500 mt-0.5" style={{ transform: 'translateZ(6px)' }}>
            {card.sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Layered 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,58,237,0.04), transparent 70%)',
          }}
        />
        {/* Floating geometric decorations */}
        {[
          { size: 180, top: '10%', right: '-5%', opacity: 0.05 },
          { size: 120, bottom: '15%', left: '-3%', opacity: 0.06 },
        ].map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              top: ring.top,
              bottom: ring.bottom,
              left: ring.left,
              right: ring.right,
              border: '1px solid rgba(0,212,170,1)',
              opacity: ring.opacity,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="max-w-6xl px-6 mx-auto md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="mb-2 font-mono text-sm text-accent">01. about me</p>
          <h2 className="text-4xl font-bold text-gray-900 font-display md:text-5xl dark:text-white">
            Who I Am
          </h2>
          <div className="w-24 h-px mt-4 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-2">

          {/* Left — Bio */}
          <div className="space-y-6">
            <motion.p {...fadeUp(0.1)} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              I'm <span className="font-medium text-accent">Kirtan Mungalpara</span>, a passionate Software developer
              from Gujarat, India. As a fresher, I bring fresh perspectives and strong foundational
              knowledge in modern web technologies.
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="leading-relaxed text-gray-600 dark:text-gray-400">
              My journey into development started with curiosity — I wanted to understand how
              the products I used every day were built. That curiosity became a passion, and now
              I spend my time building full-stack applications that solve real problems.
            </motion.p>

            <motion.p {...fadeUp(0.3)} className="leading-relaxed text-gray-600 dark:text-gray-400">
              I specialize in the <span className="text-accent">MERN stack</span> and have built projects
              ranging from AI-powered platforms to e-commerce marketplaces. I'm constantly learning
              and pushing myself to write better, cleaner, more efficient code.
            </motion.p>

            {/* Values — 3D hover cards */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-1 gap-4 pt-4">
              {VALUES.map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.1), 0 0 0 0 ${color}00`,
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.15), 0 0 20px ${color}20`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      boxShadow: `0 4px 12px ${color}25`,
                    }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-0.5">{title}</h4>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Info Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-0">
              {INFO_CARDS.map((card, i) => (
                <InfoCard3D key={card.title} card={card} index={i} />
              ))}
            </div>

            {/* Fun fact — 3D depth card */}
            <motion.div
              {...fadeUp(0.6)}
              className="p-6 rounded-2xl relative overflow-hidden card-shine"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(14,165,233,0.06) 100%)',
                borderLeft: '2px solid #00D4AA',
                border: '1px solid rgba(0,212,170,0.2)',
                borderLeftWidth: '2px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 30px rgba(0,212,170,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* 3D accent corner */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-20"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(0,212,170,0.6), transparent)',
                }}
              />
              <p className="mb-2 font-mono text-xs text-accent">// fun_fact.js</p>
              <p className="text-sm leading-relaxed text-gray-700 font-display dark:text-gray-300">
                When I'm not coding, I'm exploring new technologies, contributing to open source,
                or thinking about the next big project idea. I believe every line of code is an
                opportunity to learn something new. ✨
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
