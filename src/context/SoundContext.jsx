import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

const SoundContext = createContext()

export const useSound = () => useContext(SoundContext)

export function SoundProvider({ children }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false) // Default off, users can turn it on
  const audioCtxRef = useRef(null)

  // Initialize audio context lazily
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtxRef.current = new AudioContext()
    }
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  // Helper to resume AudioContext (browsers suspend it until user interaction)
  const ensureAudioContext = async () => {
    if (!audioCtxRef.current) return false
    if (audioCtxRef.current.state === 'suspended') {
      try {
        await audioCtxRef.current.resume()
      } catch (e) {
        return false
      }
    }
    return true
  }

  // A soft, premium "pop" for hovering over cards
  const playHover = useCallback(async () => {
    if (!isSoundEnabled || !(await ensureAudioContext())) return

    const ctx = audioCtxRef.current
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Very soft volume
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)

    // Quick pitch drop frequency
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1)

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }, [isSoundEnabled])

  // A snappy "click" or "tick" for toggles and buttons
  const playClick = useCallback(async () => {
    if (!isSoundEnabled || !(await ensureAudioContext())) return

    const ctx = audioCtxRef.current
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Slightly louder click
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

    // Higher frequency ping
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15)

    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  }, [isSoundEnabled])

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev)
    // Try to ensure context right when they turn it on
    if (!isSoundEnabled) ensureAudioContext()
  }, [isSoundEnabled])

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  )
}
