import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Layout from './components/Layout'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Publications from './pages/Publications'
import Gallery from './pages/Gallery'
import Performers from './pages/Performers'
import Collaborations from './pages/Collaborations'
import Interns from './pages/Interns'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="projects" element={<Projects />} />
            <Route path="publications" element={<Publications />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="performers" element={<Performers />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="interns" element={<Interns />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
