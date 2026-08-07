export const SIGNS = [
  { id: 'aries', label: 'Aries', element: 'fire' },
  { id: 'taurus', label: 'Taurus', element: 'earth' },
  { id: 'gemini', label: 'Gemini', element: 'air' },
  { id: 'cancer', label: 'Cancer', element: 'water' },
  { id: 'leo', label: 'Leo', element: 'fire' },
  { id: 'virgo', label: 'Virgo', element: 'earth' },
  { id: 'libra', label: 'Libra', element: 'air' },
  { id: 'scorpio', label: 'Scorpio', element: 'water' },
  { id: 'sagittarius', label: 'Sagittarius', element: 'fire' },
  { id: 'capricorn', label: 'Capricorn', element: 'earth' },
  { id: 'aquarius', label: 'Aquarius', element: 'air' },
  { id: 'pisces', label: 'Pisces', element: 'water' },
]

const ELEMENT_LABEL = { fire: 'Fire', earth: 'Earth', air: 'Air', water: 'Water' }

const ELEMENT_TRAIT = {
  fire: 'direct, fast-moving, doesn’t wait around',
  earth: 'steady, practical, plans before it acts',
  air: 'curious, thinks out loud, needs the mental connection',
  water: 'feels first, reads the room before the words',
}

const PAIR_COPY = {
  'fire-fire': {
    tagline: 'two Fire signs',
    detail: 'Neither of you slows down first. Good for momentum, rough on who gets to lead.',
  },
  'air-fire': {
    tagline: 'a Fire and Air match',
    detail: 'Air feeds Fire — expect fast plans and faster follow-through, as long as Air keeps showing up.',
  },
  'earth-fire': {
    tagline: 'a Fire and Earth match',
    detail: 'Fire wants to move now, Earth wants a plan first. The friction is the point — it’s what keeps either of you from overcorrecting.',
  },
  'fire-water': {
    tagline: 'a Fire and Water match',
    detail: 'Water can put Fire out, or bring it to a boil. Which one happens depends on whether either of you learns to wait.',
  },
  'air-earth': {
    tagline: 'an Air and Earth match',
    detail: 'Air talks it through, Earth wants it done. You’ll misread each other’s pace before you misread each other’s intent.',
  },
  'earth-earth': {
    tagline: 'two Earth signs',
    detail: 'Steady, low-drama, occasionally stuck — you’ll build something real, slower than either of you would like.',
  },
  'earth-water': {
    tagline: 'an Earth and Water match',
    detail: 'Earth gives Water a bank to run through instead of flooding. One of the more naturally stable pairings.',
  },
  'air-water': {
    tagline: 'an Air and Water match',
    detail: 'Air processes out loud, Water processes by feeling it first. You’re not on different pages — you’re using different alphabets.',
  },
  'air-air': {
    tagline: 'two Air signs',
    detail: 'Endless conversation, occasional follow-through. You’ll never run out of things to say to each other.',
  },
  'water-water': {
    tagline: 'two Water signs',
    detail: 'Deep fast, no filter between you — the risk is losing track of where one of you ends and the other begins.',
  },
}

export function signById(id) {
  return SIGNS.find((s) => s.id === id) ?? null
}

export function buildCompat({ n: name, s: signId, fn: friendName, fs: friendSignId }) {
  const you = signById(signId)
  if (!you || !name || !friendName) return null
  const them = friendSignId ? signById(friendSignId) : null

  if (!them) {
    const isSelf = name === 'You'
    const subject = isSelf ? 'you’re' : `${name} is`
    return {
      headline: `${name} & ${friendName}`,
      tagline: `${ELEMENT_LABEL[you.element]} meets an unknown sign`,
      detail: `${friendName}’s sign wasn’t entered, so here’s the honest half: ${subject} ${you.label} — ${ELEMENT_TRAIT[you.element]}. The rest depends on ${friendName}.`,
      youLabel: you.label,
      themLabel: null,
    }
  }

  const key = [you.element, them.element].sort().join('-')
  const copy = PAIR_COPY[key]
  return {
    headline: `${name} & ${friendName}`,
    tagline: copy.tagline,
    detail: copy.detail,
    youLabel: you.label,
    themLabel: them.label,
  }
}

function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(b64url) {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeCompatToken(payload) {
  return toBase64Url(JSON.stringify(payload))
}

export function decodeCompatToken(token) {
  try {
    const payload = JSON.parse(fromBase64Url(token))
    return payload && typeof payload === 'object' ? payload : null
  } catch {
    return null
  }
}
