import { useTranslation } from '../../i18n'
import { site } from '../../data/site'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import styles from './ContactCards.module.css'

export default function ContactCards() {
  const { t } = useTranslation()
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(t('contact.emailSubject'))}`

  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <Reveal className={`${styles.card} ${styles.primary}`}>
          <span className={styles.iconWrap}>
            <Icon name="mail" size={22} />
          </span>
          <h2 className={styles.title}>{t('contact.emailTitle')}</h2>
          <p className={styles.text}>{t('contact.emailText')}</p>
          <a href={mailto} className={`${styles.value} ${styles.valueBottom}`}>
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={90} className={styles.card}>
          <span className={styles.iconWrap}>
            <Icon name="phone" size={22} />
          </span>
          <h2 className={styles.title}>{t('contact.phoneTitle')}</h2>
          <p className={styles.text}>{t('contact.phoneText')}</p>
          <ul className={styles.phones}>
            {site.phones.map(({ number, display, languages }) => (
              <li key={number}>
                <a href={`tel:${number}`} className={styles.value}>
                  {display}
                </a>
                <span className={styles.langs}>{languages}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180} className={styles.card}>
          <span className={styles.iconWrap}>
            <Icon name="pin" size={22} />
          </span>
          <h2 className={styles.title}>{t('contact.addressTitle')}</h2>
          <p className={styles.text}>{t('contact.addressText')}</p>
          <p className={styles.address}>
            {site.street}
            <br />
            {site.city}
            <br />
            {site.country}
          </p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            {t('contact.openMap')}
            <Icon name="external" size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
