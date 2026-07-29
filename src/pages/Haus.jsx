import { useTranslation } from '../i18n'
import { useHead } from '../seo/useHead'
import Hero from '../components/sections/Hero'
import Amenities from '../components/sections/Amenities'
import Gallery from '../components/sections/Gallery'
import BookingCta from '../components/sections/BookingCta'
import Reveal from '../components/ui/Reveal'
import styles from './Haus.module.css'

const blockImages = ['/img/exterior-2.jpg', '/img/living-1.jpg']

export default function Haus() {
  const { t } = useTranslation()
  useHead('haus')

  return (
    <>
      <Hero
        variant="page"
        image="/img/exterior-4.jpg"
        imageAlt={t('gallery.altExterior')}
        eyebrow={t('common.location')}
        title={t('haus.heroTitle')}
        lead={t('haus.heroLead')}
      />

      <section className="section">
        <div className="container">
          {t('haus.blocks').map((block, i) => (
            <div key={block.title} className={`${styles.block} ${i % 2 ? styles.reversed : ''}`}>
              <Reveal className={styles.media}>
                <img
                  src={blockImages[i]}
                  alt={i === 0 ? t('gallery.altExterior') : t('gallery.altLiving')}
                  loading="lazy"
                />
              </Reveal>

              <Reveal delay={120} className={styles.text}>
                <p className="eyebrow">{block.eyebrow}</p>
                <h2 className={styles.title}>{block.title}</h2>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <Amenities />

      <Gallery
        eyebrow={t('haus.galleryEyebrow')}
        title={t('haus.galleryTitle')}
        lead={t('haus.galleryLead')}
      />

      <BookingCta title={t('home.ctaTitle')} text={t('home.ctaText')} />
    </>
  )
}
