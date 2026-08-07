import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { Logo } from '../../components/Logo'
import { RangeCalendar } from '../../components/RangeCalendar'
import { SIGNS, encodeCompatToken } from '../../data/compat'

const DAY_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const DAY_YEAR_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function formatRange(start, end) {
  if (!start) return ''
  if (!end || start.getTime() === end.getTime()) return DAY_YEAR_FMT.format(start)
  const sameYear = start.getFullYear() === end.getFullYear()
  return `${DAY_FMT.format(start)} – ${sameYear ? DAY_FMT.format(end) : DAY_YEAR_FMT.format(end)}, ${end.getFullYear()}`
}

export default function PostSession() {
  const navigate = useNavigate()
  const { match, setTimingFollowUp, timingFollowUp } = useAppState()
  const [confirmed, setConfirmed] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [range, setRange] = useState({ start: null, end: null })
  const [showCompat, setShowCompat] = useState(false)
  const [yourName, setYourName] = useState('You')
  const [yourSign, setYourSign] = useState('')
  const [friendName, setFriendName] = useState('')
  const [friendSign, setFriendSign] = useState('')

  function confirmSuggested() {
    setTimingFollowUp({ label: 'Mid October 2026', source: 'mentioned in session' })
    setConfirmed(true)
  }

  function confirmRange() {
    if (!range.start || !range.end) return
    setTimingFollowUp({ label: formatRange(range.start, range.end), source: 'set by you' })
    setConfirmed(true)
  }

  function skip() {
    navigate('/')
  }

  function generateCompat() {
    if (!yourSign || !friendName.trim()) return
    const token = encodeCompatToken({
      n: yourName.trim() || 'You',
      s: yourSign,
      fn: friendName.trim(),
      fs: friendSign || null,
    })
    navigate(`/compat/${token}`)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-consult-paper px-6 py-10 text-consult-ink">
      <Logo variant="consult" className="mb-10" />
      <div className="w-full max-w-md border-t border-consult-ink/15 pt-8">
        {!confirmed ? (
          <>
            <h1 className="font-display text-3xl">Session ended.</h1>
            <p className="font-grotesque mt-3 text-sm text-consult-ink/60">
              {match?.name ?? 'The astrologer'} mentioned things easing up around mid-October. Want us to check in
              with you then?
            </p>
            <button
              onClick={confirmSuggested}
              className="font-grotesque mt-6 w-full bg-consult-ink py-3 font-semibold text-consult-paper"
            >
              Yes, remind me mid-October
            </button>
            {!showCalendar ? (
              <button
                onClick={() => setShowCalendar(true)}
                className="font-grotesque mt-4 w-full border border-consult-ink/25 py-2.5 text-sm font-semibold text-consult-ink/70 hover:border-consult-ink hover:text-consult-ink"
              >
                Or pick a date range
              </button>
            ) : (
              <div className="mt-4">
                <RangeCalendar start={range.start} end={range.end} onChange={setRange} />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-grotesque text-sm text-consult-ink/60">
                    {range.start ? formatRange(range.start, range.end) : 'Pick a start and end date'}
                  </span>
                  <button
                    onClick={confirmRange}
                    disabled={!range.start || !range.end}
                    className="font-grotesque shrink-0 bg-consult-ink px-4 py-2 text-sm font-semibold text-consult-paper disabled:opacity-30"
                  >
                    Set range
                  </button>
                </div>
              </div>
            )}
            <button onClick={skip} className="font-grotesque mt-4 w-full text-sm text-consult-ink/40 underline">
              No thanks, skip
            </button>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl">Noted.</h1>
            <p className="font-grotesque mt-3 text-sm text-consult-ink/60">
              We'll send a check-in around <span className="font-semibold text-consult-ink">{timingFollowUp?.label}</span>.
              Nothing else changes — no extra emails, no upsell, just that one check-in.
            </p>
            <button
              onClick={() => navigate('/')}
              className="font-grotesque mt-6 w-full bg-consult-ink py-3 font-semibold text-consult-paper"
            >
              Done
            </button>
          </>
        )}

        <div className="mt-10 border-t border-consult-ink/15 pt-6">
          {!showCompat ? (
            <button
              onClick={() => setShowCompat(true)}
              className="font-grotesque w-full border border-consult-ink/25 py-2.5 text-sm font-semibold text-consult-ink/70 hover:border-consult-ink hover:text-consult-ink"
            >
              See your compatibility with someone
            </button>
          ) : (
            <div className="border border-consult-ink/15 p-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="font-grotesque text-xs text-consult-ink/50">
                  Your name
                  <input
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="font-grotesque mt-1 w-full border border-consult-ink/25 px-3 py-2 text-sm text-consult-ink outline-none focus:border-consult-ink"
                  />
                </label>
                <label className="font-grotesque text-xs text-consult-ink/50">
                  Your sign
                  <select
                    value={yourSign}
                    onChange={(e) => setYourSign(e.target.value)}
                    className="font-grotesque mt-1 w-full border border-consult-ink/25 bg-consult-paper px-3 py-2 text-sm text-consult-ink outline-none focus:border-consult-ink"
                  >
                    <option value="">Pick one</option>
                    {SIGNS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="font-grotesque text-xs text-consult-ink/50">
                  Their name
                  <input
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="e.g. Aryan"
                    className="font-grotesque mt-1 w-full border border-consult-ink/25 px-3 py-2 text-sm text-consult-ink outline-none focus:border-consult-ink"
                  />
                </label>
                <label className="font-grotesque text-xs text-consult-ink/50">
                  Their sign, if you know it
                  <select
                    value={friendSign}
                    onChange={(e) => setFriendSign(e.target.value)}
                    className="font-grotesque mt-1 w-full border border-consult-ink/25 bg-consult-paper px-3 py-2 text-sm text-consult-ink outline-none focus:border-consult-ink"
                  >
                    <option value="">Not sure</option>
                    {SIGNS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                onClick={generateCompat}
                disabled={!yourSign || !friendName.trim()}
                className="font-grotesque mt-4 w-full bg-consult-ink py-3 text-sm font-semibold text-consult-paper disabled:opacity-30"
              >
                See the match
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
