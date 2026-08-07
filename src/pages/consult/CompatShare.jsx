import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { buildCompat, decodeCompatToken } from '../../data/compat'

function CompatMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true" className="mb-6">
      <circle cx="20" cy="20" r="12" fill="none" stroke="#111110" strokeWidth="1.25" />
      <circle cx="20" cy="20" r="3.5" fill="#111110" />
    </svg>
  )
}

export default function CompatShare() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const payload = useMemo(() => decodeCompatToken(token), [token])
  const result = useMemo(() => payload && buildCompat(payload), [payload])

  useEffect(() => {
    document.title = result ? `${result.headline} — AstroLive` : 'AstroLive'
    return () => {
      document.title = 'AstroLive'
    }
  }, [result])

  function copyLink() {
    const url = window.location.href
    const flash = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    navigator.clipboard?.writeText(url).then(flash, () => {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        flash()
      } catch {
        // clipboard unavailable — link is still visible in the address bar to copy manually
      }
      document.body.removeChild(textarea)
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const waHref = result
    ? `https://wa.me/?text=${encodeURIComponent(`${result.headline} — ${result.tagline}. See yours free on AstroLive: ${shareUrl}`)}`
    : ''

  return (
    <div className="flex min-h-svh flex-col items-center bg-consult-paper px-6 py-12 text-consult-ink">
      <Logo variant="consult" className="mb-10" />
      <div className="w-full max-w-md">
        {!result ? (
          <>
            <h1 className="font-display text-4xl leading-[1.05]">This link's broken.</h1>
            <p className="font-grotesque mt-3 text-consult-ink/60">
              We couldn't read a compatibility result from it — it may have been copied wrong.
            </p>
            <button
              onClick={() => navigate('/consult/intent')}
              className="font-display mt-10 w-full bg-consult-ink py-4 text-xl text-consult-paper"
            >
              Start your own free session
            </button>
          </>
        ) : (
          <>
            <CompatMark />
            <p className="font-grotesque text-xs uppercase tracking-[0.25em] text-consult-ink/50">
              Compatibility read
            </p>
            <h1 className="font-display mt-3 text-4xl leading-[1.08] sm:text-5xl">
              {result.headline}: {result.tagline}.
            </h1>
            <p className="font-grotesque mt-5 text-consult-ink/70">{result.detail}</p>

            <p className="font-grotesque mt-10 border-t border-consult-ink/15 pt-4 text-sm text-consult-ink/50">
              Based on {payload.n === 'You' ? 'your' : `${payload.n}'s`} free session on AstroLive.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={copyLink}
                className="font-grotesque flex-1 border border-consult-ink/25 py-3 text-sm font-semibold text-consult-ink/80 transition-colors hover:border-consult-ink hover:text-consult-ink"
              >
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesque flex-1 border border-consult-ink/25 py-3 text-center text-sm font-semibold text-consult-ink/80 transition-colors hover:border-consult-ink hover:text-consult-ink"
              >
                Share on WhatsApp
              </a>
            </div>

            <button
              onClick={() => navigate('/consult/intent')}
              className="font-display mt-4 w-full bg-consult-ink py-4 text-xl text-consult-paper"
            >
              Start your own free session
            </button>
          </>
        )}
      </div>
    </div>
  )
}
