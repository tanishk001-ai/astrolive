import { useEffect, useMemo, useState } from 'react'

/**
 * A single jaali (lattice) cell rendered as a circular perforation — a ring
 * with a small solid center, closer to Co-Star's moon-phase/celestial-dot
 * vocabulary than a literal architectural lattice, while still reading as
 * "screen with holes cut into it."
 */
function JaaliCell() {
  return (
    <g>
      <circle cx="20" cy="20" r="12" fill="none" />
      <circle cx="20" cy="20" r="3.5" />
    </g>
  )
}

/**
 * The astrologer-matching loading state: a grid of jaali cells that "unlock"
 * one at a time, visually demonstrating the filtering logic (specialization +
 * availability + queue length) rather than a generic spinner. This is the
 * jaali motif's only appearance — monochrome ink/paper, no ambient texture
 * elsewhere in the app.
 */
export function JaaliMatcher({ steps = [], onComplete, cols = 6, rows = 4 }) {
  const total = cols * rows
  const [unlocked, setUnlocked] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (unlocked >= total) {
      const t = setTimeout(() => onComplete?.(), 500)
      return () => clearTimeout(t)
    }
    const delay = 45 + Math.random() * 60
    const t = setTimeout(() => setUnlocked((n) => n + 1), delay)
    return () => clearTimeout(t)
  }, [unlocked, total, onComplete])

  useEffect(() => {
    if (steps.length === 0) return
    const stepDuration = (total * 75) / steps.length
    const t = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    }, Math.max(stepDuration, 350))
    return () => clearInterval(t)
  }, [steps.length, total])

  const tiles = useMemo(() => {
    const order = Array.from({ length: total }, (_, i) => i)
    for (let i = order.length - 1; i > 0; i--) {
      const seed = (i * 2654435761) % (i + 1)
      const j = seed % (i + 1)
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    return order
  }, [total])

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div
        className="grid gap-px border border-consult-paper/20 bg-consult-paper/10 p-px"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {tiles.map((tileId, idx) => {
          const isOpen = idx < unlocked
          return (
            <div
              key={tileId}
              className="flex h-9 w-9 items-center justify-center sm:h-11 sm:w-11"
              style={{
                background: isOpen ? '#EDE7DA' : 'transparent',
                transition: 'background 300ms ease',
              }}
            >
              <svg viewBox="0 0 40 40" className="h-full w-full">
                <g
                  fill={isOpen ? '#111110' : '#EDE7DA'}
                  stroke={isOpen ? '#111110' : '#EDE7DA'}
                  strokeWidth="1.25"
                  style={{ opacity: isOpen ? 1 : 0.2, transition: 'opacity 300ms ease' }}
                >
                  <JaaliCell />
                </g>
              </svg>
            </div>
          )
        })}
      </div>
      {steps.length > 0 && (
        <p className="font-grotesque text-sm uppercase tracking-wide text-consult-paper/80 sm:text-base">
          {steps[stepIndex]}
        </p>
      )}
    </div>
  )
}
