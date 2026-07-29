import { useTranslation } from '../../i18n'
import { highlights } from '../../data/site'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import styles from './Highlights.module.css'

/** The four headline facts, sitting directly under the hero. */
export default function Highlights() {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {highlights.map(({ id, icon }, i) => (
          <Reveal key={id} delay={i * 70} className={styles.item}>
            <Icon name={icon} size={26} className={styles.icon} />
            <p>{t(`highlights.${id}`)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
