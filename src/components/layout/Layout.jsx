import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // `instant` so the smooth-scroll default doesn't animate between pages.
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header transparent />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
