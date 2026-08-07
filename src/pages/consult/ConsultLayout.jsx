import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'

export default function ConsultLayout({ children, onBack, step, totalSteps }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-svh bg-consult-paper font-grotesque text-consult-ink">
      <header className="flex items-center justify-between border-b border-consult-ink/15 px-5 py-5 sm:px-10 sm:py-7">
        <button
          onClick={() => (onBack ? onBack() : navigate(-1))}
          className="text-sm font-semibold uppercase tracking-wide text-consult-ink/70 underline-offset-4 transition-colors hover:text-consult-ink hover:underline"
        >
          ← Back
        </button>
        <Logo variant="consult" />
        {step && totalSteps ? (
          <span className="font-grotesque text-xs uppercase tracking-[0.2em] text-consult-ink/40">
            {step}/{totalSteps}
          </span>
        ) : (
          <span className="w-16" />
        )}
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-20">{children}</main>
    </div>
  )
}
