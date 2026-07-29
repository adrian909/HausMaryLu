import { useTranslation } from '../../i18n'
import Icon from '../ui/Icon'
import styles from './Hero.module.css'

/**
 * `full` is the tall home-page hero; `page` is the shorter variant used at the
 * top of the inner pages.
 */
export default function Hero({ image, imageAlt = '', eyebrow, title, lead, actions, variant = 'full' }) {
  const { t } = useTranslation()

  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <img src={image} alt={imageAlt} className={styles.image} fetchPriority="high" />
      <div className={styles.scrim} />

      <div className={`container ${styles.content}`}>
        {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {variant === 'full' && (
        <div className={styles.scrollCue} aria-hidden="true">
          <span>{t('common.scroll')}</span>
          <Icon name="chevronDown" size={16} />
        </div>
      )}
    </section>
  )
}
