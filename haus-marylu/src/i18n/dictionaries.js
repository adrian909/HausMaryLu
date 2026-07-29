import ro from './locales/ro.json'
import en from './locales/en.json'
import de from './locales/de.json'

export const dictionaries = { ro, en, de }

export const DEFAULT_LANG = 'en'

export const LANGUAGES = Object.entries(dictionaries).map(([code, dict]) => ({
  code,
  label: dict.label,
}))

export const isSupported = (code) => Object.hasOwn(dictionaries, code)
