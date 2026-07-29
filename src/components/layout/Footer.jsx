import { Link } from 'react-router-dom'
import { useTranslation } from '../../i18n'
import { site } from '../../data/site'
import Icon from '../ui/Icon'
import { useNavLinks } from './Header'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  const links = useNavLinks()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.name}>Haus MaryLu</p>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        <nav className={styles.column} aria-label="Footer">
          <h2 className={styles.columnTitle}>{t('footer.navTitle')}</h2>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={styles.link}>
              {label}
            </Link>
          ))}
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Booking.com
            <Icon name="external" size={13} />
          </a>
        </nav>

        <address className={styles.column}>
          <h2 className={styles.columnTitle}>{t('footer.contactTitle')}</h2>
          <a href={`mailto:${site.email}`} className={styles.link}>
            {site.email}
          </a>
          {site.phones.map(({ number, display }) => (
            <a key={number} href={`tel:${number}`} className={styles.link}>
              {display}
            </a>
          ))}
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {site.street}, {site.city}
          </a>
        </address>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          &copy; {new Date().getFullYear()} Haus MaryLu. {t('footer.rights')}
        </p>
        <p>
          {t('footer.credit')}{' '}
          <a
            href={site.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            {site.author.name}
          </a>
        </p>
      </div>
    </footer>
  )
}
