import { NavLink, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'

export default function LearnLayout({ children }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-svh bg-learn-base font-humanist text-learn-ink">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-learn-line bg-learn-base/95 px-5 py-4 backdrop-blur sm:px-10">
        <button onClick={() => navigate('/')} className="flex items-center gap-3">
          <Logo variant="learn" />
        </button>
        <nav className="flex items-center gap-1 rounded-full border border-learn-line bg-white p-1 text-sm font-medium">
          <NavLink
            to="/learn"
            end
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 transition-colors ${isActive ? 'bg-learn-blue text-white' : 'text-learn-ink/70 hover:text-learn-ink'}`
            }
          >
            Browse
          </NavLink>
          <NavLink
            to="/learn/dashboard"
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 transition-colors ${isActive ? 'bg-learn-blue text-white' : 'text-learn-ink/70 hover:text-learn-ink'}`
            }
          >
            My learning
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-10 sm:py-12">{children}</main>
    </div>
  )
}
