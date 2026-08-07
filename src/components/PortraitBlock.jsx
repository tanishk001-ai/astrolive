export function PortraitBlock({ name, size = 'lg', className = '' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const dims = size === 'lg' ? 'h-28 w-28 text-4xl' : 'h-14 w-14 text-lg'
  return (
    <div
      className={`flex items-center justify-center border border-consult-ink bg-consult-ink font-display text-consult-paper ${dims} ${className}`}
    >
      {initials}
    </div>
  )
}
