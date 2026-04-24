import { useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { Mail, Linkedin, Github, Send, CheckCircle, Loader, MapPin, Clock } from 'lucide-react'
import { SOCIAL_LINKS } from '../data'

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: SOCIAL_LINKS.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`,
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.3)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kirtanmungalpara',
    href: SOCIAL_LINKS.linkedin,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/kirtanmungalpara',
    href: SOCIAL_LINKS.github,
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.25)',
  },
]

const inputBase =
  'w-full rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none transition-all duration-300 font-body'

function Input({ label, type = 'text', name, placeholder, value, onChange, required, component = 'input', rows }) {
  const [focused, setFocused] = useState(false)
  const Tag = component

  return (
    <div className="space-y-1.5">
      <label className="font-mono text-xs text-gray-500 dark:text-gray-400">{label}</label>
      <div
        className="relative rounded-xl transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: focused ? '1px solid rgba(0,212,170,0.6)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: focused
            ? '0 0 0 3px rgba(0,212,170,0.1), 0 4px 16px rgba(0,212,170,0.1)'
            : '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Tag
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputBase} bg-transparent resize-none`}
          style={{ outline: 'none' }}
        />
        {/* Focus glow line */}
        <div
          className="absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.8), transparent)',
            opacity: focused ? 1 : 0,
            transform: focused ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
      </div>
    </div>
  )
}

/* 3D tilt contact method card */
function ContactCard({ method, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 140, damping: 20 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig)

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
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      style={{ perspective: '600px' }}
    >
      <motion.a
        ref={ref}
        href={method.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="flex items-center gap-4 p-4 rounded-2xl group cursor-pointer block"
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="rounded-2xl p-4 w-full flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${method.color}30`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 16px ${method.glow.replace('0.3', '0.1')}`,
            transformStyle: 'preserve-3d',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.2), 0 0 24px ${method.glow}`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.15), 0 0 16px ${method.glow.replace('0.3', '0.1')}`
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${method.color}15`,
              border: `1px solid ${method.color}35`,
              boxShadow: `0 4px 12px ${method.glow}`,
              transform: 'translateZ(15px)',
            }}
          >
            <method.icon size={18} style={{ color: method.color }} />
          </div>
          <div className="min-w-0" style={{ transform: 'translateZ(8px)' }}>
            <p className="font-mono text-xs text-gray-400">{method.label}</p>
            <p className="text-sm font-medium text-gray-800 truncate transition-colors font-display dark:text-gray-200 group-hover:text-accent">
              {method.value}
            </p>
          </div>
          {/* Arrow indicator */}
          <div
            className="ml-auto w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
            style={{
              background: `${method.color}20`,
              transform: 'translateZ(20px)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke={method.color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'cfed7995-880e-47b8-b0ce-17f67ddfc3e8',
          ...form,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        alert('Failed to send message. Please try again.')
        setStatus('idle')
      }
    } catch {
      alert('An error occurred. Please try again later.')
      setStatus('idle')
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* 3D layered bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,170,0.04), transparent 70%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px section-divider-3d" />
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
          <p className="mb-2 font-mono text-sm text-accent">04. contact</p>
          <h2 className="text-4xl font-bold text-gray-900 font-display md:text-5xl dark:text-white">
            Let's Connect
          </h2>
          <div className="w-24 h-px mt-4 bg-gradient-to-r from-accent to-transparent" />
          <p className="max-w-xl mt-4 text-gray-500 dark:text-gray-400">
            Have an opportunity, project, or just want to say hello? My inbox is always open.
            I'll get back to you as soon as possible!
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Left — Contact cards + availability */}
          <div className="space-y-4 lg:col-span-2">
            {CONTACT_METHODS.map((method, i) => (
              <ContactCard key={method.label} method={method} index={i} />
            ))}

            {/* Availability card — 3D depth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 space-y-3 rounded-2xl ml-4 mr-4"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(0,212,170,0.03) 100%)',
                border: '1px solid rgba(0,212,170,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 0 20px rgba(0,212,170,0.06)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-accent" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                </div>
                <p className="font-mono text-xs text-accent">Available for opportunities</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={12} />
                <span>Gujarat, India · Open to work</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock size={12} />
                <span>Typically replies within 24 hours</span>
              </div>
            </motion.div>
          </div>

          {/* Right — 3D form card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
            style={{ perspective: '1200px' }}
          >
            <div
              className="p-8 rounded-3xl relative overflow-hidden card-shine"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              {/* 3D corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0,212,170,0.3), transparent 60%)' }}
              />

              <h3 className="mb-6 text-xl font-bold text-gray-900 font-display dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-accent inline-block"
                  style={{ boxShadow: '0 0 8px rgba(0,212,170,0.8)' }}
                />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Your Name *" name="name" required placeholder="John Doe"
                    value={form.name} onChange={handleChange} />
                  <Input label="Email Address *" type="email" name="email" required placeholder="john@example.com"
                    value={form.email} onChange={handleChange} />
                </div>
                <Input label="Subject *" name="subject" required placeholder="Let's work together..."
                  value={form.subject} onChange={handleChange} />
                <Input label="Message *" name="message" required placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange} component="textarea" rows={5} />

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: status === 'idle' ? 1.03 : 1, y: status === 'idle' ? -2 : 0 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  style={
                    status === 'success'
                      ? { background: '#22c55e', color: 'white', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }
                      : { background: 'linear-gradient(135deg, #00D4AA, #0ea5e9)', color: '#0d1117', boxShadow: '0 8px 24px rgba(0,212,170,0.35)' }
                  }
                >
                  {/* Shine sweep on button */}
                  <div className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'skewX(-20deg) translateX(-100%)', animation: 'shimmer 3s ease-in-out infinite' }}
                  />
                  {status === 'loading' && <><Loader size={15} className="animate-spin" />Sending...</>}
                  {status === 'success' && <><CheckCircle size={15} />Message Sent!</>}
                  {status === 'idle'   && <><Send size={15} />Send Message</>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
