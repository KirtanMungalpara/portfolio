import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
    value: "B.Tech in Computer Engineering",
    sub: 'Graduating 2026',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Gujarat, India',
    sub: 'Open to Work',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Calendar,
    title: 'Experience',
    value: 'Fresher',
    sub: 'Eager to Learn & Grow',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Rocket,
    title: 'Focus',
    value: 'Full Stack Development',
    sub: 'MERN Stack',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
]

const VALUES = [
  { icon: Code2, title: 'Clean Code', desc: 'I believe in writing readable, maintainable code that scales.' },
  { icon: Rocket, title: 'Fast Learner', desc: 'Rapidly adapting to new technologies and frameworks.' },
  { icon: Heart, title: 'User First', desc: 'Building experiences that users love and find intuitive.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl px-6 mx-auto md:px-12">
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
              I'm <span className="font-medium text-accent">Kirtan Mungalpara</span>, a passionate full-stack developer
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

            {/* Values */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-1 gap-4 pt-4">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 transition-all duration-300 glass-card rounded-2xl hover:glow-accent"
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-0.5">{title}</h4>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Info Cards Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {INFO_CARDS.map(({ icon: Icon, title, value, sub, color, bg }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  whileHover={{ y: -4 }}
                  className="p-5 transition-all duration-300 glass-card rounded-2xl hover:glow-accent"
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                    <Icon size={18} className={color} />
                  </div>
                  <p className="mb-1 font-mono text-xs text-gray-400">{title}</p>
                  <p className="text-sm font-semibold leading-snug text-gray-900 font-display dark:text-white">{value}</p>
                  <p className="font-mono text-xs text-gray-500 mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Fun fact card */}
            <motion.div
              {...fadeUp(0.6)}
              className="p-6 border-l-2 glass-card rounded-2xl border-accent"
            >
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
