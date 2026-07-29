import { usePaths, useTranslation } from '../../i18n'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import styles from './Intro.module.css'

/** Text on the left, an offset pair of photos on the right. */
export default function Intro() {
  const { t } = useTranslation()
  const paths = usePaths()

  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.text}>
          <p className="eyebrow">{t('home.introEyebrow')}</p>
          <h2 className={styles.title}>{t('home.introTitle')}</h2>
          {t('home.introParagraphs').map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <Button to={paths.haus} variant="secondary" icon="arrowRight" className={styles.cta}>
            {t('nav.haus')}
          </Button>
        </Reveal>

        <Reveal delay={120} className={styles.media}>
          <img
            src="/img/living-4.jpg"
            alt={t('gallery.altLiving')}
            className={styles.photoBack}
            loading="lazy"
          />
          <img
            src="/img/terrace-3.jpg"
            alt={t('gallery.altTerrace')}
            className={styles.photoFront}
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  )
}
