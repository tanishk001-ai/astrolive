import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { CATEGORIES } from '../../data/mockData'
import { PortraitBlock } from '../../components/PortraitBlock'
import ConsultLayout from './ConsultLayout'

export default function Fallback() {
  const navigate = useNavigate()
  const { intent, match } = useAppState()

  useEffect(() => {
    if (!match) navigate('/consult/intent')
  }, [match, navigate])

  if (!match) return null

  const categoryLabel = CATEGORIES.find((c) => c.id === intent.category)?.label ?? 'that'

  return (
    <ConsultLayout onBack={() => navigate('/consult/intent')} step={3} totalSteps={4}>
      <h1 className="font-display text-5xl sm:text-6xl">
        <span className="text-consult-rare-accent">No</span> specialist free right now.
      </h1>
      <p className="font-grotesque mt-4 max-w-lg text-consult-ink/60">
        Every {categoryLabel.toLowerCase()} specialist is either offline or already in a session. {match.name} is
        available and can start immediately.
      </p>

      <div className="mt-10 flex flex-col gap-6 border-t border-consult-ink/15 pt-8 sm:flex-row sm:items-center">
        <PortraitBlock name={match.name} />
        <div className="flex-1">
          <h2 className="font-display text-2xl">{match.name}</h2>
          <p className="font-grotesque font-semibold text-consult-ink">{match.specialization}</p>
          <p className="font-grotesque mt-1 text-sm text-consult-ink/50">
            {match.experience} experience · {match.languages}
          </p>
          <p className="font-grotesque mt-4 text-sm text-consult-ink/70">{match.status} · can start now</p>
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
          onClick={() => navigate('/consult/intent')}
          className="font-grotesque border border-consult-ink/25 px-6 py-4 font-semibold uppercase tracking-wide text-consult-ink/70 transition-colors hover:border-consult-ink hover:text-consult-ink"
        >
          I'll wait, try again later
        </button>
      </div>
    </ConsultLayout>
  )
}
