import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from '../../i18n'
import Icon from './Icon'
import styles from './Lightbox.module.css'

/**
 * Full-screen photo viewer. Closes on Escape or backdrop click, steps with the
 * arrow keys, and returns focus to whatever opened it.
 */
export default function Lightbox({ photos, index, onClose, onIndex, altFor }) {
  const closeRef = useRef(null)
  const openerRef = useRef(null)

  const goPrev = useCallback(
    () => onIndex((index - 1 + photos.length) % photos.length),
    [index, onIndex, photos.length],
  )
  const goNext = useCallback(() => onIndex((index + 1) % photos.length), [index, onIndex, photos.length])

  useEffect(() => {
    openerRef.current = document.activeElement
    closeRef.current?.focus()
    document.body.classList.add('is-locked')

    return () => {
      document.body.classList.remove('is-locked')
      openerRef.current?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, goPrev, goNext])

  const { t } = useTranslation()
  const photo = photos[index]

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.toolbar}>
        <span className={styles.counter}>
          {t('gallery.counter', { current: index + 1, total: photos.length })}
        </span>
        <button ref={closeRef} type="button" className={styles.iconButton} onClick={onClose} aria-label={t('common.close')}>
          <Icon name="close" size={22} />
        </button>
      </div>

      <button
        type="button"
        className={`${styles.iconButton} ${styles.prev}`}
        onClick={(event) => {
          event.stopPropagation()
          goPrev()
        }}
        aria-label={t('common.previous')}
      >
        <Icon name="arrowLeft" size={22} />
      </button>

      <img
        key={photo.src}
        src={photo.src}
        alt={altFor(photo)}
        className={styles.image}
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        className={`${styles.iconButton} ${styles.next}`}
        onClick={(event) => {
          event.stopPropagation()
          goNext()
        }}
        aria-label={t('common.next')}
      >
        <Icon name="arrowRight" size={22} />
      </button>
    </div>,
    document.body,
  )
}
