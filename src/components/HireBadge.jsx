import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useSound } from '../context/SoundContext'
import { useState } from 'react'

export default function HireBadge() {
  const { playHover, playClick } = useSound()
  const [isHovered, setIsHovered] = useState(false)

  const handleScrollToContact = () => {
    playClick()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // The text to wrap around the circle. The bullet acts as a separator.
  const text = "AVAILABLE FOR HIRE • AVAILABLE FOR HIRE • "

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[60] hidden md:flex"
      initial={{ opacity: 0, x: -20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={handleScrollToContact}
        onMouseEnter={() => {
          setIsHovered(true)
          playHover()
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="w-24 h-24 rounded-full flex items-center justify-center relative text-gray-800 dark:text-gray-200"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,212,170,0.3)',
          boxShadow: isHovered 
            ? '0 0 25px rgba(0,212,170,0.3), inset 0 0 15px rgba(0,212,170,0.1)' 
            : '0 8px 32px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease-out'
        }}
        whileHover={{ scale: 1.1, translateY: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Continuously Spinning Circular Text */}
        <motion.div
          animate={{ rotate: isHovered ? 0 : 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-80" style={{ overflow: 'visible' }}>
            <path id="textCircle" fill="none" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            <text fontSize="8.5" className="fill-current font-mono font-bold tracking-[0.18em]">
              <textPath href="#textCircle" startOffset="0%">
                {text}
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Sparkle Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center text-accent shadow-accent"
          animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={20} />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
