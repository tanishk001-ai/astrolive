export function Logo({ variant = 'consult', className = '' }) {
  const color = variant === 'consult' ? 'text-consult-ink' : 'text-learn-ink'
  return (
    <span className={`font-display text-xl tracking-tight ${color} ${className}`}>
      ASTROLIVE
    </span>
  )
}
