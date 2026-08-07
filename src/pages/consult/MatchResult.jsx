import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { findAllMatches, CATEGORIES } from '../../data/mockData'
import { PortraitBlock } from '../../components/PortraitBlock'
import ConsultLayout from './ConsultLayout'

export default function MatchResult() {
  const navigate = useNavigate()
  const { intent, match, setMatch } = useAppState()
  const [noMoreToast, setNoMoreToast] = useState(false)

  useEffect(() => {
    if (!match) navigate('/consult/intent')
  }, [match, navigate])

  if (!match) return null

  const categoryLabel = CATEGORIES.find((c) => c.id === intent.category)?.label ?? 'this'
  const pool = findAllMatches(intent.category)

  function seeNext() {
    const others = pool.filter((a) => a.id !== match.id)
    if (others.length === 0) {
      setNoMoreToast(true)
      setTimeout(() => setNoMoreToast(false), 2500)
      return
    }
    setMatch(others[0])
  }

  return (
    <ConsultLayout onBack={() => navigate('/consult/intent')} step={3} totalSteps={4}>
      <h1 className="font-display text-5xl sm:text-6xl">We found someone.</h1>
      <p className="font-grotesque mt-3 max-w-md text-consult-ink/60">
        Matched for {categoryLabel.toLowerCase()} — here's who's free.
      </p>

      <div className="mt-10 flex flex-col gap-6 border-t border-consult-ink/15 pt-8 sm:flex-row sm:items-center">
        <PortraitBlock name={match.name} />
        <div className="flex-1">
          <h2 className="font-display text-2xl">{match.name}</h2>
          <p className="font-grotesque font-semibold text-consult-ink">{match.specialization}</p>
          <p className="font-grotesque mt-1 text-sm text-consult-ink/50">
            {match.experience} experience · {match.languages}
          </p>
          <p className="font-grotesque mt-4 text-sm text-consult-ink/70">
            {match.status} · {match.specialization} · {match.eta} wait
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => navigate('/consult/session')}
          className="font-display flex-1 bg-consult-ink py-4 text-xl text-consult-paper"
        >
          Start free session
        </button>
        <button
          onClick={seeNext}
          className="font-grotesque border border-consult-ink/25 px-6 py-4 font-semibold uppercase tracking-wide text-consult-ink/70 transition-colors hover:border-consult-ink hover:text-consult-ink"
        >
          See next match
        </button>
      </div>

      {noMoreToast && (
        <p className="font-grotesque mt-4 border-t border-consult-ink/15 pt-4 text-sm text-consult-ink/60">
          No other {categoryLabel.toLowerCase()} specialist is free right now — this is your best match.
        </p>
      )}
    </ConsultLayout>
  )
}
