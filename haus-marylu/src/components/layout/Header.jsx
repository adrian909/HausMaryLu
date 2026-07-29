import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { usePaths, useTranslation } from '../../i18n'
import { site } from '../../data/site'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export function useNavLinks() {
  const { t } = useTranslation()
  const paths = usePaths()
  return [
    // `end` keeps the home link from matching every page under its language.
    { to: paths.home, label: t('nav.home'), end: true },
    { to: paths.haus, label: t('nav.haus') },
    { to: paths.contact, label: t('nav.contact') },
  ]
}

export default function Header({ transparent = false }) {
  const { t } = useTranslation()
  const links = useNavLinks()
  const paths = usePaths()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setDrawerOpen(false), [pathname])

  useEffect(() => {
    document.body.classList.toggle('is-locked', drawerOpen)
    return () => document.body.classList.remove('is-locked')
  }, [drawerOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  // Solid bar unless we're sitting over a hero image and haven't scrolled yet.
  const solid = scrolled || !transparent || drawerOpen

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
        <a href="#main" className={styles.skip}>
        {t('nav.skipToContent')}
      </a>

        <div className={`container ${styles.inner}`}>
          <Link to={paths.home} className={styles.logo}>
            <span className={styles.logoMark}>M</span>
            <span className={styles.logoText}>
              Haus MaryLu
              <small>{t('common.location')}</small>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher />
            <Button href={site.bookingUrl} className={styles.bookButton}>
              {t('common.book')}
            </Button>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setDrawerOpen((value) => !value)}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              <span className={`${styles.burgerLines} ${drawerOpen ? styles.burgerOpen : ''}`}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/*
        The drawer is a sibling of <header> on purpose: the header's
        backdrop-filter would otherwise become the containing block for this
        fixed-position element and collapse it to the header's height.
      */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`} inert={!drawerOpen}>
        <nav className={styles.drawerNav} aria-label="Mobile">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <a href={`mailto:${site.email}`} className={styles.drawerContact}>
            <Icon name="mail" size={18} />
            {site.email}
          </a>
          {site.phones.map(({ number, display }) => (
            <a key={number} href={`tel:${number}`} className={styles.drawerContact}>
              <Icon name="phone" size={18} />
              {display}
            </a>
          ))}
          <Button href={site.bookingUrl} size="large" className={styles.drawerBook}>
            {t('common.book')}
          </Button>
        </div>
      </div>
    </>
  )
}
