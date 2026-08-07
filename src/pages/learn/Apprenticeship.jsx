import { useNavigate } from 'react-router-dom'
import LearnLayout from './LearnLayout'

const STEPS = [
  { label: 'Complete core coursework', detail: 'Finish Vedic Astrology Fundamentals and one specialization track.' },
  { label: 'Pass the practice review', detail: 'A panel of senior astrologers reviews three of your worked charts.' },
  { label: '16-week mentored apprenticeship', detail: 'Take supervised live sessions alongside a senior mentor.' },
  { label: 'Go live as a practitioner', detail: 'Get listed on AstroLive and start taking your own consultations.' },
]

export default function Apprenticeship() {
  const navigate = useNavigate()

  return (
    <LearnLayout>
      <button onClick={() => navigate('/learn')} className="text-sm font-medium text-learn-ink/50 hover:text-learn-ink">
        ← Back to browse
      </button>

      <span className="mt-4 inline-block rounded-full bg-learn-teal/10 px-2.5 py-1 text-xs font-semibold text-learn-teal">
        Apprenticeship track
      </span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        From learner to paid practitioner
      </h1>
      <p className="mt-3 max-w-xl text-learn-ink/60">
        The apprenticeship track is how top learners move from studying astrology to earning as astrologers on
        AstroLive — the same platform, a different seat at the table.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-learn-blue text-sm font-bold text-white">
                {i + 1}
              </span>
              {i < STEPS.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-learn-line" />}
            </div>
            <div className="pb-6">
              <h2 className="font-bold">{step.label}</h2>
              <p className="mt-1 text-sm text-learn-ink/60">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-2xl border border-learn-line bg-white p-6">
        <h2 className="font-bold">Applications open 1 Sep 2026</h2>
        <p className="mt-1 text-sm text-learn-ink/60">
          Prototype note: this track is a framing screen for the pitch — enrollment and mentor-matching are not
          built out in this build.
        </p>
        <button
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-full bg-learn-ink/20 py-3 font-semibold text-learn-ink/50"
        >
          Notify me when applications open
        </button>
      </div>
    </LearnLayout>
  )
}
