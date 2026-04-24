import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress over 2.5 seconds
    const duration = 2500
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(onComplete, 500) // Brief pause at 100% before exit transition
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080D14]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Cosmic background glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,170,0.1) 0%, transparent 60%)',
        }} 
      />

      {/* 3D Rotating Logo Container */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <motion.div
           className="text-6xl md:text-7xl font-bold font-display cursor-default flex items-center justify-center w-32 h-32"
           initial={{ scale: 0.5, opacity: 0, translateZ: 0 }}
           animate={{ scale: 1, opacity: 1, translateZ: 50 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           style={{ transformStyle: "preserve-3d" }}
        >
          <span className="gradient-text text-3d tracking-tighter line-height-none">KM</span>
          <span className="text-gray-400">.</span>
        </motion.div>
        
        {/* Orbiting geometric rings */}
        <motion.div 
          className="absolute rounded-full border border-accent/30 w-40 h-40"
          animate={{ rotateX: 360, rotateZ: 180 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div 
          className="absolute rounded-full border border-sky-500/20 w-48 h-48"
          animate={{ rotateY: 360, rotateZ: -180 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>

      {/* Progress Bar Container */}
      <motion.div 
        className="mt-20 w-56 h-1 rounded-full overflow-hidden relative"
        style={{ background: 'rgba(255,255,255,0.05)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Progress Fill */}
        <motion.div 
          className="h-full rounded-full"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00D4AA, #0ea5e9, #00D4AA)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 10px rgba(0,212,170,0.6)'
          }}
          animate={{ backgroundPosition: ['100% 0%', '-100% 0%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </motion.div>
      
      {/* Loading Stats Text */}
      <motion.div 
        className="mt-6 font-mono text-xs text-gray-500 flex items-center gap-3 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <span>Initializing</span>
        <div className="w-8 flex justify-end text-accent font-semibold text-sm">
          {Math.round(progress)}%
        </div>
      </motion.div>
    </motion.div>
  )
}
