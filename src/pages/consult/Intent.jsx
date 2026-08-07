import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { CATEGORIES } from '../../data/mockData'
import ConsultLayout from './ConsultLayout'

export default function Intent() {
  const navigate = useNavigate()
  const { intent, setIntent } = useAppState()

  function pickCategory(id) {
    setIntent((prev) => ({ ...prev, category: id }))
  }

  function pickUrgency(u) {
    setIntent((prev) => ({ ...prev, urgency: u }))
  }

  function proceed() {
    if (!intent.category || !intent.urgency) return
    navigate('/consult/matching')
  }

  return (
    <ConsultLayout onBack={() => navigate('/')} step={1} totalSteps={4}>
      <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl">What's on your mind?</h1>
      <p className="font-grotesque mt-4 max-w-md text-consult-ink/60">
        Pick the closest fit. We match you with someone who actually specializes in it.
      </p>

      <div className="mt-12 flex flex-col border-t border-consult-ink/15">
        {CATEGORIES.map((cat) => {
          const selected = intent.category === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => pickCategory(cat.id)}
              className="group flex items-center justify-between gap-4 border-b border-consult-ink/15 py-5 text-left transition-colors"
            >
              <span>
                <span className="font-display block text-2xl sm:text-3xl">{cat.label}</span>
                <span className="font-grotesque mt-1 block text-sm text-consult-ink/50">{cat.sub}</span>
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  selected ? 'border-consult-ink bg-consult-ink' : 'border-consult-ink/30 group-hover:border-consult-ink/60'
                }`}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-consult-paper" />}
              </span>
            </button>
          )
        })}
      </div>

      <h2 className="font-display mt-12 text-2xl">How soon?</h2>
      <div className="mt-4 flex gap-3">
        {[
          { id: 'now', label: 'Now', sub: 'Match me with whoever is free' },
          { id: 'wait', label: 'Can wait', sub: "I'll wait for the best specialist" },
        ].map((opt) => {
          const selected = intent.urgency === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => pickUrgency(opt.id)}
              className={`flex-1 border p-4 text-left transition-colors ${
                selected
                  ? 'border-consult-ink bg-consult-ink text-consult-paper'
                  : 'border-consult-ink/25 bg-transparent text-consult-ink hover:border-consult-ink/60'
              }`}
            >
              <div className="font-display text-lg">{opt.label}</div>
              <div className={`text-xs ${selected ? 'text-consult-paper/80' : 'text-consult-ink/50'}`}>
                {opt.sub}
              </div>
            </button>
          )
        })}
      </div>

      <button
        onClick={proceed}
        disabled={!intent.category || !intent.urgency}
        className="font-display mt-12 w-full bg-consult-ink py-4 text-xl text-consult-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-10"
      >
        Find someone to talk to
      </button>
    </ConsultLayout>
  )
}
