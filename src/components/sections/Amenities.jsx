import { useTranslation } from '../../i18n'
import { amenities } from '../../data/site'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import styles from './Amenities.module.css'

export default function Amenities() {
  const { t } = useTranslation()

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeading
          eyebrow={t('home.amenitiesEyebrow')}
          title={t('home.amenitiesTitle')}
          lead={t('home.amenitiesLead')}
        />

        <ul className={styles.grid}>
          {amenities.map(({ id, icon }, i) => (
            <Reveal as="li" key={id} delay={(i % 3) * 80} className={styles.item}>
              <span className={styles.iconWrap}>
                <Icon name={icon} size={22} />
              </span>
              {t(`amenities.${id}`)}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
