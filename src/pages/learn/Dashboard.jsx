import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../state/AppState'
import LearnLayout from './LearnLayout'

export default function Dashboard() {
  const navigate = useNavigate()
  const { enrolledCourses } = useAppState()

  return (
    <LearnLayout>
      <h1 className="text-3xl font-extrabold tracking-tight">My learning</h1>

      {enrolledCourses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-learn-line bg-white p-10 text-center">
          <p className="text-learn-ink/60">You haven't enrolled in anything yet.</p>
          <button
            onClick={() => navigate('/learn')}
            className="mt-4 rounded-full bg-learn-blue px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse courses
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="rounded-2xl border border-learn-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">{course.title}</h2>
                  <p className="text-sm text-learn-ink/60">by {course.instructor}</p>
                </div>
                <span className="shrink-0 rounded-full bg-learn-blue/10 px-3 py-1 text-xs font-semibold text-learn-blue">
                  {course.progress}% complete
                </span>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-learn-line">
                <div
                  className="h-full rounded-full bg-learn-blue transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-learn-ink/50">
                  Module {Math.max(1, Math.round((course.progress / 100) * course.modules.length))} of{' '}
                  {course.modules.length}
                </span>
                <button
                  onClick={() => navigate(`/learn/course/${course.id}`)}
                  className="rounded-full bg-learn-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </LearnLayout>
  )
}
