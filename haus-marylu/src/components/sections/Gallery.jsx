import { useMemo, useState } from 'react'
import { useTranslation } from '../../i18n'
import { galleryCategories, photos as allPhotos } from '../../data/gallery'
import Lightbox from '../ui/Lightbox'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import styles from './Gallery.module.css'

const capitalise = (value) => value.charAt(0).toUpperCase() + value.slice(1)

export default function Gallery({
  eyebrow,
  title,
  lead,
  photos = allPhotos,
  filterable = true,
  columns = 4,
  footer,
}) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'all' ? photos : photos.filter((photo) => photo.category === filter)),
    [filter, photos],
  )

  const altFor = (photo) => t(`gallery.alt${capitalise(photo.category)}`)

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

        {filterable && (
          <Reveal className={styles.filters}>
            {['all', ...galleryCategories].map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.filter} ${filter === category ? styles.filterActive : ''}`}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {t(`gallery.${category}`)}
              </button>
            ))}
          </Reveal>
        )}

        <ul className={styles.grid} style={{ '--cols': columns }}>
          {visible.map((photo, i) => (
            <li key={photo.src} className={photo.wide ? styles.wide : undefined}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => setOpenIndex(i)}
                aria-label={t('common.openPhoto')}
              >
                <img src={photo.src} alt={altFor(photo)} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>

        {footer && <Reveal className={styles.footer}>{footer}</Reveal>}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={visible}
          index={openIndex}
          onIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          altFor={altFor}
        />
      )}
    </section>
  )
}
