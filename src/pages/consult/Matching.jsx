import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { findMatch, CATEGORIES } from '../../data/mockData'
import { JaaliMatcher } from '../../components/Jaali'

export default function Matching() {
  const navigate = useNavigate()
  const { intent, setMatch, setIsFallback } = useAppState()

  useEffect(() => {
    if (!intent.category) {
      navigate('/consult/intent')
    }
  }, [intent.category, navigate])

  const categoryLabel = CATEGORIES.find((c) => c.id === intent.category)?.label ?? 'your topic'

  const steps = [
    `Filtering by ${categoryLabel.toLowerCase()} specialists`,
    'Checking who is free right now',
    'Ranking by shortest queue',
    'Confirming availability',
  ]

  function handleComplete() {
    const result = findMatch(intent.category)
    setMatch(result.astrologer)
    setIsFallback(result.isFallback)
    navigate(result.isFallback ? '/consult/fallback' : '/consult/match')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 bg-consult-ink px-6 text-center">
      <div>
        <h1 className="font-display text-3xl text-consult-paper sm:text-4xl">Finding your match</h1>
        <p className="font-grotesque mt-2 text-consult-paper/60">
          Every open tile is one filter cleared.
        </p>
      </div>
      <JaaliMatcher steps={steps} onComplete={handleComplete} />
    </div>
  )
}
