import { usePaths, useTranslation } from '../../i18n'
import { site } from '../../data/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import styles from './BookingCta.module.css'

export default function BookingCta({ title, text }) {
  const { t } = useTranslation()
  const paths = usePaths()

  return (
    <section className={styles.section}>
      <img src="/img/terrace-2.jpg" alt="" className={styles.image} loading="lazy" />
      <div className={styles.scrim} />

      <Reveal className={`container ${styles.content}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>
          <Button href={site.bookingUrl} size="large" icon="external">
            {t('common.book')}
          </Button>
          <Button to={paths.contact} variant="ghost" size="large">
            {t('common.contact')}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
