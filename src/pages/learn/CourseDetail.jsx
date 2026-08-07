import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { COURSES } from '../../data/mockData'
import { useAppState } from '../../state/AppState'
import LearnLayout from './LearnLayout'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { enroll, enrollments } = useAppState()
  const course = COURSES.find((c) => c.id === id)
  const [justEnrolled, setJustEnrolled] = useState(false)

  if (!course) return null

  const isEnrolled = id in enrollments || justEnrolled

  function handleEnroll() {
    enroll(course.id)
    setJustEnrolled(true)
  }

  return (
    <LearnLayout>
      <button onClick={() => navigate('/learn')} className="text-sm font-medium text-learn-ink/50 hover:text-learn-ink">
        ← Back to browse
      </button>

      <div className="mt-4 flex flex-col gap-8 sm:flex-row">
        <div className="flex-1">
          <span className="rounded-full bg-learn-teal/10 px-2.5 py-1 text-xs font-semibold text-learn-teal">
            {course.format}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{course.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-learn-ink/70">
            <span className="flex items-center gap-1 font-semibold text-learn-ink">
              ★ {course.rating} <span className="font-normal text-learn-ink/50">({course.ratingCount} ratings)</span>
            </span>
            <span>·</span>
            <span>{course.learners} learners</span>
            <span>·</span>
            <span>{course.duration}</span>
            {course.batchStarts && (
              <>
                <span>·</span>
                <span className="font-medium text-learn-blue">Batch starts {course.batchStarts}</span>
              </>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-learn-line bg-white p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-learn-ink/50">Instructor</h2>
            <p className="mt-1 text-lg font-bold">{course.instructor}</p>
            <p className="mt-1 text-sm text-learn-ink/60">Verified practicing astrologer on AstroLive</p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-learn-ink/50">Syllabus</h2>
            <ol className="mt-3 space-y-2">
              {course.modules.map((m, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-learn-line bg-white p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-learn-blue/10 text-xs font-bold text-learn-blue">
                    {i + 1}
                  </span>
                  <span className="text-sm">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="h-fit w-full rounded-2xl border border-learn-line bg-white p-5 sm:w-72">
          <div className="text-2xl font-extrabold">{course.price}</div>
          {isEnrolled ? (
            <button
              onClick={() => navigate('/learn/dashboard')}
              className="mt-4 w-full rounded-full bg-learn-teal py-3 font-semibold text-white"
            >
              Go to my learning
            </button>
          ) : (
            <button onClick={handleEnroll} className="mt-4 w-full rounded-full bg-learn-blue py-3 font-semibold text-white">
              Enroll
            </button>
          )}
          <p className="mt-3 text-xs text-learn-ink/50">Certificate on completion · Lifetime access</p>
        </aside>
      </div>
    </LearnLayout>
  )
}
