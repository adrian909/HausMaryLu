import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, useTranslation } from '../../i18n'
import Icon from '../ui/Icon'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {lang.toUpperCase()}
        <Icon name="chevronDown" size={13} strokeWidth={1.8} className={open ? styles.flip : ''} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === lang}
                className={`${styles.option} ${code === lang ? styles.active : ''}`}
                onClick={() => {
                  setLang(code)
                  setOpen(false)
                }}
              >
                <span className={styles.code}>{code.toUpperCase()}</span>
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
