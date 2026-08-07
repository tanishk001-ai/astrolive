export const CATEGORIES = [
  { id: 'career', label: 'Career', sub: 'Job moves, business timing, promotions' },
  { id: 'relationships', label: 'Relationships', sub: 'Marriage, compatibility, family friction' },
  { id: 'money', label: 'Money', sub: 'Debt, investments, financial timing' },
  { id: 'health', label: 'Health', sub: 'Recovery timing, chronic worry' },
  { id: 'general', label: 'General', sub: "Not sure — just need to talk" },
]

export const ASTROLOGERS = [
  {
    id: 'a1',
    name: 'Radhika Iyer',
    specialization: 'Relationship specialist',
    categories: ['relationships', 'general'],
    experience: '11 yrs',
    languages: 'Hindi, English, Tamil',
    eta: '2 min',
    status: 'Online now',
    rating: '4.8',
    sessions: '9,200+',
  },
  {
    id: 'a2',
    name: 'Suresh Nambiar',
    specialization: 'Career & business specialist',
    categories: ['career', 'general'],
    experience: '18 yrs',
    languages: 'English, Malayalam',
    eta: '3 min',
    status: 'Online now',
    rating: '4.9',
    sessions: '14,500+',
  },
  {
    id: 'a3',
    name: 'Meenal Deshpande',
    specialization: 'Health & wellbeing specialist',
    categories: ['health', 'general'],
    experience: '9 yrs',
    languages: 'Hindi, Marathi, English',
    eta: '4 min',
    status: 'Online now',
    rating: '4.7',
    sessions: '6,100+',
  },
  {
    id: 'a4',
    name: 'Devika Rao',
    specialization: 'General practice — all life areas',
    categories: ['career', 'relationships', 'money', 'health', 'general'],
    experience: '6 yrs',
    languages: 'English, Telugu, Hindi',
    eta: '1 min',
    status: 'Online now',
    rating: '4.6',
    sessions: '3,400+',
  },
]

export function findAllMatches(category) {
  const generalist = ASTROLOGERS.find((a) => a.id === 'a4')
  if (category === 'general') return [generalist]
  const specialists = ASTROLOGERS.filter((a) => a.id !== 'a4' && a.categories.includes(category))
  return specialists.length > 0
    ? [...specialists].sort((a, b) => parseInt(a.eta) - parseInt(b.eta))
    : [generalist]
}

export function findMatch(category) {
  const generalist = ASTROLOGERS.find((a) => a.id === 'a4')
  if (category === 'general') {
    return { astrologer: generalist, isFallback: false }
  }
  const specialists = ASTROLOGERS.filter((a) => a.id !== 'a4' && a.categories.includes(category))
  if (specialists.length > 0) {
    const best = [...specialists].sort((a, b) => parseInt(a.eta) - parseInt(b.eta))[0]
    return { astrologer: best, isFallback: false }
  }
  return { astrologer: generalist, isFallback: true }
}

export const COURSES = [
  {
    id: 'c1',
    title: 'Vedic Astrology Fundamentals',
    instructor: 'Suresh Nambiar',
    rating: '4.9',
    ratingCount: '2,140',
    learners: '18,300',
    format: 'Self-paced',
    duration: '6 weeks',
    price: '₹2,499',
    level: 'Beginner',
    modules: [
      'The birth chart: houses, signs, planets',
      'Reading planetary strength (Shadbala basics)',
      'Dashas: timing events in a life',
      'Case studies: 5 real charts, worked through',
      'Ethics of prediction and client conversations',
    ],
  },
  {
    id: 'c2',
    title: 'Reading Your First Kundli',
    instructor: 'Devika Rao',
    rating: '4.7',
    ratingCount: '980',
    learners: '9,800',
    format: 'Live batch',
    duration: '4 weeks',
    price: '₹1,899',
    level: 'Beginner',
    batchStarts: '18 Aug 2026',
    modules: [
      'Setting up a chart correctly (time, place, ayanamsa)',
      'The 12 houses in plain language',
      'Reading your own kundli, step by step',
      'Live Q&A: bring your chart',
    ],
  },
  {
    id: 'c3',
    title: 'Relationship Compatibility (Kundli Matching)',
    instructor: 'Radhika Iyer',
    rating: '4.8',
    ratingCount: '1,510',
    learners: '11,200',
    format: 'Self-paced',
    duration: '3 weeks',
    price: '₹1,499',
    level: 'Intermediate',
    modules: [
      'Guna Milan: the 36-point system explained',
      'Mangal Dosha — what it actually means',
      'Reading two charts together',
      'When the numbers disagree with the people',
    ],
  },
  {
    id: 'c4',
    title: 'Apprentice Track: Practising Astrologer',
    instructor: 'Meenal Deshpande + panel',
    rating: '4.9',
    ratingCount: '410',
    learners: '1,200',
    format: 'Live batch + mentorship',
    duration: '16 weeks',
    price: 'Apprenticeship — apply to join',
    level: 'Advanced',
    batchStarts: '1 Sep 2026',
    modules: [
      'Advanced dasha and transit analysis',
      'Live client sessions, observed and reviewed',
      '1:1 mentorship with a senior astrologer',
      'Building a practice on AstroLive',
    ],
  },
]
