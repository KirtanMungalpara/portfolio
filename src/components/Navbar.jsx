import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { Moon, Sun, Menu, X, Download, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useSound } from '../context/SoundContext'
import { NAV_LINKS } from '../data'

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { isSoundEnabled, toggleSound, playClick, playHover } = useSound()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollY > 40)
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)

      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    playClick()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar - 3D glowing line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollProgress / 100,
            background: 'linear-gradient(90deg, #00D4AA, #0ea5e9, #7c3aed)',
            boxShadow: '0 0 8px rgba(0,212,170,0.8), 0 0 16px rgba(0,212,170,0.4)',
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={
          scrolled
            ? {
                background: isDark
                  ? 'rgba(13,17,23,0.85)'
                  : 'rgba(240,244,248,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.06)',
              }
            : {}
        }
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — 3D depth on hover */}
          <motion.a
            href="#"
            onClick={e => handleNavClick(e, '#')}
            onMouseEnter={playHover}
            className="font-display font-bold text-xl relative"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ perspective: '400px' }}
          >
            <span className="gradient-text">KM</span>
            <span className="text-gray-400 dark:text-gray-600">.</span>
            {/* Glow under logo */}
            <div
              className="absolute -bottom-1 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #00D4AA, #0ea5e9)' }}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }, i) => {
              const isActive = activeSection === href.replace('#', '')
              return (
                <motion.a
                  key={href}
                  href={href}
                  onClick={e => handleNavClick(e, href)}
                  onMouseEnter={playHover}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.3 }}
                  className="nav-link relative"
                  style={{ color: isActive ? '#00D4AA' : '' }}
                >
                  <span className="text-accent/50 mr-1 text-xs">0{i + 1}.</span>
                  {label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{
                        background: '#00D4AA',
                        boxShadow: '0 0 6px rgba(0,212,170,0.9)',
                      }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">

            {/* Sound Toggle — 3D rotation */}
            <motion.button
              onClick={() => {
                toggleSound()
                if (!isSoundEnabled) playClick()
              }}
              whileHover={{ scale: 1.12, rotateY: 20 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              aria-label="Toggle sound"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSoundEnabled ? 'on' : 'off'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: 'backOut' }}
                >
                  {isSoundEnabled ? <Volume2 size={16} className="text-accent" /> : <VolumeX size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Theme Toggle — 3D rotation */}
            <motion.button
              onClick={() => {
                toggle()
                playClick()
              }}
              whileHover={{ scale: 1.12, rotateY: 20 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: 'backOut' }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Resume Button — 3D depth */}
            <motion.a
              href="/resume.pdf"
              download="Kirtan_Mungalpara_Resume.pdf"
              onClick={playClick}
              onMouseEnter={e => {
                playHover()
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,212,170,0.3)'
                e.currentTarget.style.background = 'rgba(0,212,170,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,212,170,0.15)'
                e.currentTarget.style.background = 'rgba(0,212,170,0.06)'
              }}
            >
              <Download size={13} />
              Resume
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onClick={() => {
                setMenuOpen(v => !v)
                playClick()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — 3D slide-in */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -16, rotateX: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[64px] left-4 right-4 z-40 rounded-2xl p-6 md:hidden"
            style={{
              background: isDark
                ? 'rgba(13,17,23,0.92)'
                : 'rgba(240,244,248,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,212,170,0.1)',
              transformOrigin: 'top center',
            }}
          >
            {/* Top shimmer accent */}
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.5), transparent)' }}
            />

            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = activeSection === href.replace('#', '')
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="font-display text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors flex items-center gap-3 group"
                    style={{ color: isActive ? '#00D4AA' : '' }}
                  >
                    <span
                      className="text-xs font-mono transition-colors"
                      style={{ color: isActive ? '#00D4AA' : 'rgba(0,212,170,0.4)' }}
                    >
                      0{i + 1}.
                    </span>
                    {label}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full ml-auto"
                        style={{ background: '#00D4AA', boxShadow: '0 0 6px rgba(0,212,170,0.8)' }}
                      />
                    )}
                  </motion.a>
                )
              })}

              <div className="pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a
                  href="/resume.pdf"
                  download="Kirtan_Mungalpara_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-semibold text-sm text-gray-900"
                  style={{
                    background: 'linear-gradient(135deg, #00D4AA, #0ea5e9)',
                    boxShadow: '0 6px 20px rgba(0,212,170,0.35)',
                  }}
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
