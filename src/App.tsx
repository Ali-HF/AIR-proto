import { ThemeProvider } from "./components/ThemeProvider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { CustomCursor } from "./components/CustomCursor"

// Lazy load or import pages
import Home from "./pages/Home"
import About from "./pages/About"
import Team from "./pages/Team"
import Projects from "./pages/Projects"
import Publications from "./pages/Publications"
import Gallery from "./pages/Gallery"
import Performers from "./pages/Performers"
import Interns from "./pages/Interns"
import Collaborations from "./pages/Collaborations"

function App() {
  return (
    <ThemeProvider defaultTheme="default">
      <Router basename="/AIR-proto/">
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
            <Route path="interns" element={<Interns />} />
            <Route path="collaborations" element={<Collaborations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
