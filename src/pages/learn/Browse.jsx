import { useNavigate } from 'react-router-dom'
import { COURSES } from '../../data/mockData'
import LearnLayout from './LearnLayout'

export default function Browse() {
  const navigate = useNavigate()

  return (
    <LearnLayout>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Learn from working astrologers</h1>
      <p className="mt-2 max-w-xl text-learn-ink/60">
        Courses and apprenticeships taught by astrologers who practice on AstroLive today.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {COURSES.map((course) => (
          <button
            key={course.id}
            onClick={() =>
              course.id === 'c4' ? navigate('/learn/apprenticeship') : navigate(`/learn/course/${course.id}`)
            }
            className="flex flex-col rounded-2xl border border-learn-line bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-learn-teal/10 px-2.5 py-1 text-xs font-semibold text-learn-teal">
                {course.format}
              </span>
              <span className="text-xs font-medium text-learn-ink/50">{course.level}</span>
            </div>
            <h2 className="mt-3 text-lg font-bold leading-snug">{course.title}</h2>
            <p className="mt-1 text-sm text-learn-ink/60">by {course.instructor}</p>

            <div className="mt-4 flex items-center gap-3 text-sm text-learn-ink/70">
              <span className="flex items-center gap-1 font-semibold text-learn-ink">
                ★ {course.rating}
                <span className="font-normal text-learn-ink/50">({course.ratingCount})</span>
              </span>
              <span>·</span>
              <span>{course.learners} learners</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-learn-line pt-4">
              <div className="text-sm text-learn-ink/60">
                {course.duration}
                {course.batchStarts ? ` · Starts ${course.batchStarts}` : ''}
              </div>
              <div className="font-bold text-learn-blue">{course.price}</div>
            </div>
          </button>
        ))}
      </div>
    </LearnLayout>
  )
}
