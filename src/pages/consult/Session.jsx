import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { PortraitBlock } from '../../components/PortraitBlock'

const SCRIPTED_MESSAGES = [
  { from: 'astrologer', text: "Namaste. Tell me a little about what's been on your mind." },
  { from: 'user', text: "Things have felt stuck. I wanted to know if this is temporary." },
  {
    from: 'astrologer',
    text: 'Looking at your current dasha, this phase eases from around mid-October. Things should start moving again then.',
  },
]

export default function Session() {
  const navigate = useNavigate()
  const { match } = useAppState()
  const [visible, setVisible] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!match) {
      navigate('/consult/intent')
      return
    }
    if (visible < SCRIPTED_MESSAGES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 1100)
      return () => clearTimeout(t)
    }
  }, [visible, match, navigate])

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  if (!match) return null

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <PortraitBlock name={match.name} size="sm" />
          <div>
            <div className="font-semibold text-gray-900">{match.name}</div>
            <div className="text-xs text-gray-500">{match.specialization}</div>
          </div>
        </div>
        <div className="font-mono text-sm text-gray-500">{mm}:{ss}</div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-6">
        {SCRIPTED_MESSAGES.slice(0, visible).map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.from === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => navigate('/consult/post-session')}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white"
        >
          End session
        </button>
      </div>
    </div>
  )
}
