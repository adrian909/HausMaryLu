import { useTranslation } from '../../i18n'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonials = t('home.testimonials')

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow={t('home.testimonialsEyebrow')}
          title={t('home.testimonialsTitle')}
        />

        <ul className={styles.grid}>
          {testimonials.map(({ quote, author, origin }, i) => (
            <Reveal as="li" key={author} delay={i * 100} className={styles.card}>
              <div className={styles.stars} aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => (
                  <Icon key={star} name="star" size={15} strokeWidth={0} fill="currentColor" />
                ))}
              </div>

              <blockquote className={styles.quote}>{quote}</blockquote>

              <div className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {author.charAt(0)}
                </span>
                <span className={styles.authorText}>
                  <strong>{author}</strong>
                  <small>{origin}</small>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
