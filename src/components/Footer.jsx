import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { SOCIAL_LINKS, NAV_LINKS } from '../data'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gray-100 border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-6xl px-6 py-12 mx-auto md:px-12">
        <div className="grid gap-8 mb-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-display">
              <span className="gradient-text">KM</span>
              <span className="text-gray-400">.</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Software Developer passionate about building impactful products with clean code and thoughtful design.
            </p>
            <div className="flex gap-3">
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center text-gray-500 transition-colors rounded-full w-9 h-9 glass dark:text-gray-400 hover:text-accent"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 font-display dark:text-white">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="font-mono text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 font-display dark:text-white">Get In Touch</h4>
            <div className="space-y-2">
              <p className="font-mono text-sm text-gray-500 dark:text-gray-400">{SOCIAL_LINKS.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gujarat, India</p>
              <p className="text-xs text-accent">Open to opportunities</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-800 md:flex-row">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Designed & built with
            <Heart size={11} className="text-rose-400 fill-rose-400" />
            by{' '}
            <span className="font-medium text-accent">Kirtan Mungalpara</span>
            &nbsp;· © {new Date().getFullYear()}
          </p>

          <p className="font-mono text-xs text-gray-400">
            Built with React.js + Tailwind CSS
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute flex items-center justify-center w-10 h-10 text-gray-900 rounded-full shadow-lg bottom-8 right-6 bg-accent shadow-accent/30"
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
