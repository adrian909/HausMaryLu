import Reveal from './Reveal'
import styles from './SectionHeading.module.css'

export default function SectionHeading({ eyebrow, title, lead, align = 'center', as = 'h2' }) {
  const Title = as

  return (
    <Reveal className={`${styles.heading} ${styles[align]}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Title className={styles.title}>{title}</Title>
      {lead && <p className={`lead ${styles.lead}`}>{lead}</p>}
    </Reveal>
  )
}
