import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Layers, Zap } from 'lucide-react'
import { SOCIAL_LINKS } from '../data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

/* 3D floating badge chips */
const CHIPS = [
  { label: 'React.js',    pos: { top: '-16px',   left: '-60px'  }, delay: 0,   color: '#61DAFB', icon: '⚛️' },
  { label: 'Node.js',     pos: { top: '-16px',   right: '-60px' }, delay: 0.5, color: '#68A063', icon: '🟩' },
  { label: 'MongoDB',     pos: { bottom: '-16px', left: '-48px' }, delay: 1,   color: '#4DB33D', icon: '🍃' },
  { label: 'TypeScript',  pos: { bottom: '-16px', right:'-44px' }, delay: 1.5, color: '#3178C6', icon: '📘' },
]

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${5 + i * 4.5}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            background: i % 3 === 0
              ? 'rgba(0,212,170,0.5)'
              : i % 3 === 1
              ? 'rgba(14,165,233,0.4)'
              : 'rgba(124,58,237,0.3)',
          }}
          animate={{
            y: [0, -(20 + (i % 4) * 10), 0],
            x: [0, (i % 2 === 0 ? 8 : -8), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating cubes */}
      {[
        { size: 50, top: '15%', left: '5%',   delay: 0,   duration: 25 },
        { size: 35, top: '70%', right: '8%',  delay: 3,   duration: 18 },
        { size: 25, top: '40%', left: '2%',   delay: 6,   duration: 22 },
        { size: 45, top: '80%', left: '15%',  delay: 1.5, duration: 30 },
        { size: 30, top: '20%', right: '5%',  delay: 4,   duration: 20 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border border-accent/20 rounded-lg"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: shape.delay,
          }}
        />
      ))}

      {/* Large rings */}
      {[
        { size: 200, top: '5%',  left: '-5%',  opacity: 0.06, duration: 12 },
        { size: 300, top: '60%', right: '-8%', opacity: 0.05, duration: 18 },
        { size: 150, top: '35%', left: '45%',  opacity: 0.08, duration: 10 },
      ].map((ring, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-accent"
          style={{
            width: ring.size,
            height: ring.size,
            top: ring.top,
            left: ring.left,
            right: ring.right,
            opacity: ring.opacity,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [ring.opacity, ring.opacity * 1.6, ring.opacity] }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* Interactive 3D card for the right side of hero */
function HeroCard3D() {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig)

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
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      {/* Outer glow rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{
          background: 'transparent',
          border: '1px dashed rgba(0,212,170,0.25)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          border: '1px dashed rgba(14,165,233,0.15)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[240px] h-[240px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)',
        }}
      />

      {/* The main 3D card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer"
      >
        {/* Card body */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-60 h-72 rounded-3xl card-shine"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(0,212,170,0.08) 60%, rgba(14,165,233,0.06) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 60px rgba(0,212,170,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Avatar area */}
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-6"
            style={{ transform: 'translateZ(30px)' }}>

            {/* Floating emoji with glow */}
            <motion.div
              animate={{ y: [0, -8, 0], rotateZ: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="text-6xl">👨‍💻</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.2), transparent)', filter: 'blur(8px)' }}
                />
              </div>
            </motion.div>

            {/* Name */}
            <div className="text-center" style={{ transform: 'translateZ(10px)' }}>
              <p className="font-display font-bold text-sm text-gray-900 dark:text-white">Kirtan Mungalpara</p>
              <p className="font-mono text-xs text-accent mt-0.5">Full Stack Dev</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.25)',
                transform: 'translateZ(15px)',
              }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent">Available</span>
            </div>

            {/* Mini stat row */}
            <div className="flex items-center gap-4 mt-1" style={{ transform: 'translateZ(8px)' }}>
              {[
                { icon: Code2, value: '10+', label: 'Projects' },
                { icon: Layers, value: 'MERN', label: 'Stack' },
                { icon: Zap, value: '100%', label: 'Passion' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display font-bold text-xs text-gray-900 dark:text-white">{value}</p>
                  <p className="font-mono text-[9px] text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent"
            style={{ boxShadow: '0 0 8px rgba(0,212,170,0.8)', transform: 'translateZ(20px)' }}
          />
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full"
            style={{ background: 'rgba(14,165,233,0.7)', boxShadow: '0 0 8px rgba(14,165,233,0.8)', transform: 'translateZ(20px)' }}
          />
        </motion.div>

        {/* Floating skill chips */}
        {CHIPS.map(({ label, pos, delay, color, icon }) => (
          <motion.div
            key={label}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              ...pos,
              background: 'rgba(15,15,25,0.8)',
              border: `1px solid ${color}40`,
              backdropFilter: 'blur(12px)',
              boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 8px ${color}30`,
              transform: 'translateZ(50px)',
              zIndex: 10,
            }}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
          >
            <span className="text-xs">{icon}</span>
            <span className="font-mono text-xs" style={{ color }}>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden noise-bg">
      {/* 3D perspective grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 grid-3d opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="orb orb-1 dark:opacity-20 opacity-12" />
      <div className="orb orb-2 dark:opacity-15 opacity-8" />
      <div className="orb orb-3" />

      {/* Geometric floating shapes */}
      <GeometricShapes />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="w-full max-w-6xl px-6 pt-24 pb-16 mx-auto md:px-12 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left — Text content */}
          <div className="space-y-6">

            {/* Badge */}
            <motion.div {...fadeUp(0.2)} className="inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs border rounded-full text-accent"
                style={{
                  background: 'rgba(0,212,170,0.08)',
                  border: '1px solid rgba(0,212,170,0.25)',
                  boxShadow: '0 2px 12px rgba(0,212,170,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}>
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
                <span className="gradient-text text-3d">Mungalpara</span>
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
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{
                  boxShadow: '0 8px 25px rgba(0,212,170,0.35), 0 0 0 0 rgba(0,212,170,0.4)',
                }}
              >
                <Sparkles size={15} />
                View My Work
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.07, y: -3 }}
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
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all duration-300 rounded-full dark:text-gray-400 hover:text-accent dark:hover:text-accent"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
              <div className="w-12 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent" />
              <span className="font-mono text-xs text-gray-400">follow me</span>
            </motion.div>
          </div>

          {/* Right — 3D Card */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroCard3D />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute flex flex-col items-center gap-2 text-gray-400 transition-colors -translate-x-1/2 bottom-8 left-1/2 hover:text-accent group z-10"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="group-hover:text-accent" />
        </motion.div>
      </motion.button>
    </section>
  )
}
