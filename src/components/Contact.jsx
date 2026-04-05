import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Send, CheckCircle, Loader, MapPin, Clock } from 'lucide-react'
import { SOCIAL_LINKS } from '../data'

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: SOCIAL_LINKS.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kirtanmungalpara',
    href: SOCIAL_LINKS.linkedin,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/kirtanmungalpara',
    href: SOCIAL_LINKS.github,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
  },
]

const inputClass =
  'w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 font-body'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'cfed7995-880e-47b8-b0ce-17f67ddfc3e8', // TODO: user needs to insert their Web3Forms access key
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        console.error('Submission error:', result)
        alert('Failed to send message. Please try again.')
        setStatus('idle')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('An error occurred. Please try again later.')
      setStatus('idle')
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-gray-50/80 dark:bg-gray-950/50">
      <div className="max-w-6xl px-6 mx-auto md:px-12">
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
          {/* Left info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact cards */}
            {CONTACT_METHODS.map(({ icon: Icon, label, value, href, color, bg }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 glass-card rounded-2xl group"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-gray-400">{label}</p>
                  <p className="text-sm font-medium text-gray-800 truncate transition-colors font-display dark:text-gray-200 group-hover:text-accent">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 space-y-3 glass-card rounded-2xl"
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

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 glass-card rounded-3xl">
              <h3 className="mb-6 text-xl font-bold text-gray-900 font-display dark:text-white">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-500 dark:text-gray-400">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-500 dark:text-gray-400">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-gray-500 dark:text-gray-400">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Let's work together..."
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-gray-500 dark:text-gray-400">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                  className={`w-full py-3.5 rounded-xl font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    status === 'success'
                      ? 'bg-green-500 text-white'
                      : 'btn-primary'
                  }`}
                >
                  {status === 'loading' && (
                    <>
                      <Loader size={15} className="animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle size={15} />
                      Message Sent!
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
