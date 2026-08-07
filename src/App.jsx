import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppStateProvider } from './state/AppState'
import Fork from './pages/Fork'
import Intent from './pages/consult/Intent'
import Matching from './pages/consult/Matching'
import MatchResult from './pages/consult/MatchResult'
import Fallback from './pages/consult/Fallback'
import Session from './pages/consult/Session'
import PostSession from './pages/consult/PostSession'
import CompatShare from './pages/consult/CompatShare'
import Browse from './pages/learn/Browse'
import CourseDetail from './pages/learn/CourseDetail'
import Dashboard from './pages/learn/Dashboard'
import Apprenticeship from './pages/learn/Apprenticeship'

export default function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes>
          <Route path="/" element={<Fork />} />

          <Route path="/consult" element={<Intent />} />
          <Route path="/consult/intent" element={<Intent />} />
          <Route path="/consult/matching" element={<Matching />} />
          <Route path="/consult/match" element={<MatchResult />} />
          <Route path="/consult/fallback" element={<Fallback />} />
          <Route path="/consult/session" element={<Session />} />
          <Route path="/consult/post-session" element={<PostSession />} />
          <Route path="/compat/:token" element={<CompatShare />} />

          <Route path="/learn" element={<Browse />} />
          <Route path="/learn/course/:id" element={<CourseDetail />} />
          <Route path="/learn/dashboard" element={<Dashboard />} />
          <Route path="/learn/apprenticeship" element={<Apprenticeship />} />
        </Routes>
      </AppStateProvider>
    </BrowserRouter>
  )
}
