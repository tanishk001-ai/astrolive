import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

/*
 * Copy options considered (outcome-first, blunt, one line each):
 *
 * Consult side:
 *   1. "Talk to someone now"                — chosen: shortest, most honest, zero jargon
 *   2. "Get an answer, not homework"
 *   3. "Someone's free to talk right now"
 *   4. "I want answers"
 *
 * Learn side:
 *   1. "Learn to read a chart"               — chosen: implies ownership/capability, not a class
 *   2. "Learn astrology properly"
 *   3. "Study it, don't just ask it"
 *   4. "I want to learn"
 *
 * Only one divergence exists in this app: picking Learn. Fork and the entire
 * Consult path share the same stark ink/paper language, so this screen carries
 * no color-coding, no boxed halves, no jaali — it's the calm cover page both
 * paths start from.
 */

export default function Fork() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('idle') // idle | expanding
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' })
  const inkRef = useRef(null)
  const baseRef = useRef(null)

  function goConsult() {
    navigate('/consult')
  }

  function goLearn(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setOrigin({ x: `${rect.left + rect.width / 2}px`, y: `${rect.top + rect.height / 2}px` })
    setPhase('expanding')
  }

  useEffect(() => {
    if (phase !== 'expanding') return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (inkRef.current) inkRef.current.style.clipPath = 'circle(150% at var(--ox) var(--oy))'
        if (baseRef.current) baseRef.current.style.clipPath = 'circle(150% at var(--ox) var(--oy))'
      })
    })
    const t = setTimeout(() => navigate('/learn'), 780)
    return () => clearTimeout(t)
  }, [phase, navigate])

  return (
    <div
      className="flex min-h-svh flex-col bg-consult-paper text-consult-ink"
      style={{ '--ox': origin.x, '--oy': origin.y }}
    >
      <header className="px-6 pt-10 sm:px-16 sm:pt-14">
        <Logo variant="consult" />
      </header>

      <main className="flex flex-1 flex-col justify-center px-6 sm:px-16">
        <p className="font-grotesque mb-8 text-xs uppercase tracking-[0.25em] text-consult-ink/50 sm:mb-10">
          What are you here for?
        </p>
        <nav className="flex flex-col gap-1">
          <button onClick={goConsult} className="group w-fit text-left">
            <span className="font-display inline-block text-[11vw] leading-[1.08] sm:text-6xl md:text-7xl">
              <span className="border-b border-transparent transition-colors group-hover:border-consult-ink group-focus-visible:border-consult-ink">
                Talk to someone now
              </span>
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
          <button onClick={goLearn} className="group w-fit text-left">
            <span className="font-display inline-block text-[11vw] leading-[1.08] sm:text-6xl md:text-7xl">
              <span className="border-b border-transparent transition-colors group-hover:border-consult-ink group-focus-visible:border-consult-ink">
                Learn to read a chart
              </span>
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
        </nav>
      </main>

      <footer className="px-6 pb-10 sm:px-16 sm:pb-14">
        <p className="font-grotesque text-xs text-consult-ink/40">Free to start, either way.</p>
      </footer>

      {phase === 'expanding' && (
        <>
          <div
            ref={inkRef}
            className="pointer-events-none fixed inset-0 z-40 bg-consult-ink transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ clipPath: 'circle(0% at var(--ox) var(--oy))' }}
          />
          <div
            ref={baseRef}
            className="pointer-events-none fixed inset-0 z-50 bg-learn-base transition-[clip-path] delay-150 duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              clipPath: 'circle(0% at var(--ox) var(--oy))',
              backgroundImage: 'radial-gradient(circle at var(--ox) var(--oy), rgba(29,78,216,0.18), transparent 60%)',
            }}
          />
        </>
      )}
    </div>
  )
}
