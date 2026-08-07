import { useMemo, useState } from 'react'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_FMT = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function buildGrid(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leading = first.getDay()
  const cells = []
  for (let i = 0; i < leading; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}

/**
 * Two-click range picker: first click sets the start, second sets the end
 * (auto-swapped if earlier than start). Hovering after picking a start
 * previews the range so it's clear a range — not a single date — is forming.
 */
export function RangeCalendar({ start, end, onChange, minDate }) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const floor = minDate ? startOfDay(minDate) : today
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const anchor = start ?? floor
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  })
  const [hovered, setHovered] = useState(null)

  const cells = useMemo(() => buildGrid(visibleMonth), [visibleMonth])

  const previewEnd = !end && start && hovered && hovered > start ? hovered : null
  const rangeEnd = end ?? previewEnd

  function pickDay(day) {
    if (day < floor) return
    if (!start || (start && end)) {
      onChange({ start: day, end: null })
      return
    }
    if (day < start) {
      onChange({ start: day, end: start })
    } else {
      onChange({ start, end: day })
    }
  }

  function changeMonth(delta) {
    setVisibleMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))
  }

  return (
    <div className="border border-consult-ink/15 p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          className="font-grotesque px-1 text-sm text-consult-ink/50 hover:text-consult-ink"
        >
          ←
        </button>
        <span className="font-grotesque text-sm font-semibold uppercase tracking-wide">
          {MONTH_FMT.format(visibleMonth)}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="font-grotesque px-1 text-sm text-consult-ink/50 hover:text-consult-ink"
        >
          →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-1">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="font-grotesque text-center text-xs text-consult-ink/40">
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const disabled = day < floor
          const isStart = sameDay(day, start)
          const isEnd = sameDay(day, rangeEnd)
          const inRange = start && rangeEnd && day > start && day < rangeEnd
          const isToday = sameDay(day, today)
          const isEndpoint = isStart || isEnd
          const inPreview = previewEnd && day > start && day <= previewEnd

          let stateClasses
          if (disabled) {
            stateClasses = 'text-consult-ink/20'
          } else if (isEndpoint) {
            stateClasses = 'bg-consult-ink text-consult-paper'
          } else if (inRange || inPreview) {
            stateClasses = 'bg-consult-ink/10 text-consult-ink hover:bg-consult-ink/15'
          } else {
            stateClasses = 'text-consult-ink hover:bg-consult-ink/5'
          }

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => pickDay(day)}
              onMouseEnter={() => setHovered(day)}
              className={`font-grotesque relative h-9 text-sm transition-colors ${stateClasses}`}
            >
              <span className={isToday && !isEndpoint ? 'underline underline-offset-4' : ''}>{day.getDate()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
