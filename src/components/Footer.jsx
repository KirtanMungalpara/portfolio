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
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-display font-bold text-2xl">
              <span className="gradient-text">KM</span>
              <span className="text-gray-400">.</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Full Stack Developer passionate about building impactful products with clean code and thoughtful design.
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
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors font-mono"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{SOCIAL_LINKS.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gujarat, India</p>
              <p className="text-xs text-accent">Open to opportunities</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Designed & built with
            <Heart size={11} className="text-rose-400 fill-rose-400" />
            by{' '}
            <span className="text-accent font-medium">Kirtan Mungalpara</span>
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
        className="absolute bottom-8 right-6 w-10 h-10 rounded-full bg-accent text-gray-900 flex items-center justify-center shadow-lg shadow-accent/30"
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}
