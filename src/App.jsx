import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { SoundProvider } from './context/SoundContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import HireBadge from './components/HireBadge'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <ThemeProvider>
      <SoundProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" onComplete={() => setLoading(false)} />
          ) : (
            <div key="content" className="min-h-screen">
              <Navbar />
              <HireBadge />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </SoundProvider>
    </ThemeProvider>
  )
}
