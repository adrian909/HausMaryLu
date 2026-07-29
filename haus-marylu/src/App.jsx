import { Navigate, Route, Routes } from 'react-router-dom'
import { LANGUAGES } from './i18n/dictionaries'
import { detectLanguage, pathFor } from './i18n/routes'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Haus from './pages/Haus'
import Contact from './pages/Contact'

/**
 * One branch per language, so every translation lives at its own indexable URL.
 * The bare domain and anything unrecognised bounce to the visitor's language.
 */
export default function App() {
  const fallback = <Navigate to={pathFor(detectLanguage())} replace />

  return (
    <Routes>
      <Route path="/" element={fallback} />

      {LANGUAGES.map(({ code }) => (
        <Route key={code} path={`/${code}`} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="haus" element={<Haus />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      ))}

      <Route path="*" element={fallback} />
    </Routes>
  )
}
