import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Code } from 'lucide-react'
import { SOCIAL_LINKS, NAV_LINKS } from '../data'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden">
      {/* 3D depth top border with shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider-3d" />

      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.04))',
        }}
      />

      {/* Deep bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,170,0.04), transparent 70%)',
        }}
      />

      <div className="max-w-6xl px-6 py-14 mx-auto md:px-12 relative z-10">

        {/* Main grid */}
        <div className="grid gap-10 mb-12 md:grid-cols-3">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* 3D Logo */}
            <motion.div
              className="text-3xl font-bold font-display cursor-default"
              whileHover={{ scale: 1.05 }}
              style={{ perspective: '400px' }}
            >
              <span className="gradient-text text-3d">KM</span>
              <span className="text-gray-400">.</span>
            </motion.div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Software Developer passionate about building impactful products with clean code and thoughtful design.
            </p>

            {/* Social icons — 3D hover */}
            <div className="flex gap-3">
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', color: '#94a3b8' },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', color: '#3b82f6' },
                { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`, icon: Mail, label: 'Email', color: '#f43f5e' },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all duration-300 rounded-full w-9 h-9 hover:text-accent"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 6px 20px ${color}40`
                    e.currentTarget.style.borderColor = `${color}50`
                    e.currentTarget.style.color = color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = ''
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-gray-900 font-display dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-accent inline-block" style={{ boxShadow: '0 0 5px rgba(0,212,170,0.6)' }} />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li key={href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="font-mono text-sm text-gray-500 transition-all duration-200 dark:text-gray-400 hover:text-accent flex items-center gap-2 group"
                  >
                    <span className="text-accent/40 text-xs group-hover:text-accent transition-colors">0{i + 1}.</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info — 3D card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-gray-900 font-display dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full inline-block" style={{ background: '#0ea5e9', boxShadow: '0 0 5px rgba(14,165,233,0.6)' }} />
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                <p className="font-mono text-xs text-gray-500 mb-0.5">email</p>
                <p className="font-mono text-sm text-gray-400">{SOCIAL_LINKS.email}</p>
              </div>
              <div className="p-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                <p className="font-mono text-xs text-gray-500 mb-0.5">location</p>
                <p className="text-sm text-gray-400">Gujarat, India</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </div>
                <p className="text-xs text-accent font-mono">Open to opportunities</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Designed &amp; built with
            <Heart size={11} className="text-rose-400 fill-rose-400" />
            by{' '}
            <span className="font-medium text-accent">Kirtan Mungalpara</span>
            &nbsp;· © {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-1.5">
            <Code size={11} className="text-gray-500" />
            <p className="font-mono text-xs text-gray-500">
              React.js + Tailwind CSS + Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top — 3D floating button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-6 flex items-center justify-center w-11 h-11 rounded-full text-gray-900"
        style={{
          background: 'linear-gradient(135deg, #00D4AA, #0ea5e9)',
          boxShadow: '0 8px 24px rgba(0,212,170,0.4), 0 0 0 2px rgba(0,212,170,0.2)',
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
