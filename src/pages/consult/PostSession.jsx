import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import { Logo } from '../../components/Logo'
import { RangeCalendar } from '../../components/RangeCalendar'

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
      </div>
    </div>
  )
}
