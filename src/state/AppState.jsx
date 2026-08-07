import { createContext, useContext, useState } from 'react'
import { COURSES } from '../data/mockData'

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [intent, setIntent] = useState({ category: null, urgency: null })
  const [match, setMatch] = useState(null)
  const [isFallback, setIsFallback] = useState(false)
  const [timingFollowUp, setTimingFollowUp] = useState(null)
  const [enrollments, setEnrollments] = useState({
    // courseId: progressPercent
    c2: 40,
  })

  function enroll(courseId) {
    setEnrollments((prev) => (courseId in prev ? prev : { ...prev, [courseId]: 0 }))
  }

  const enrolledCourses = COURSES.filter((c) => c.id in enrollments).map((c) => ({
    ...c,
    progress: enrollments[c.id],
  }))

  const value = {
    intent,
    setIntent,
    match,
    setMatch,
    isFallback,
    setIsFallback,
    timingFollowUp,
    setTimingFollowUp,
    enrollments,
    enroll,
    enrolledCourses,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
