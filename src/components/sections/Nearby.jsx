import { useTranslation } from '../../i18n'
import { distances, sights } from '../../data/site'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import styles from './Nearby.module.css'

export default function Nearby() {
  const { t } = useTranslation()

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <p className="eyebrow">{t('home.nearbyEyebrow')}</p>
          <h2 className={styles.title}>{t('home.nearbyTitle')}</h2>
          <p className="lead">{t('home.nearbyLead')}</p>

          <h3 className={styles.subTitle}>{t('home.sightsTitle')}</h3>
          <ul className={styles.tags}>
            {sights.map((id) => (
              <li key={id} className={styles.tag}>
                <Icon name="pin" size={14} />
                {t(`places.${id}`)}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className={styles.panel}>
          <h3 className={styles.panelTitle}>{t('home.distancesTitle')}</h3>
          <ul>
            {distances.map(({ id, km }) => (
              <li key={id} className={styles.row}>
                <span>{t(`places.${id}`)}</span>
                <span className={styles.km}>{km} km</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
