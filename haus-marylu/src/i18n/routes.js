import { useMemo } from 'react'
import { DEFAULT_LANG, isSupported, LANGUAGES } from './dictionaries'
import { useTranslation } from './useTranslation'

export const PAGES = ['home', 'haus', 'contact']

/** URL segment for each page. The home page has none — it is the language root. */
const SEGMENTS = { home: '', haus: 'haus', contact: 'contact' }

/**
 * Every URL is language-prefixed and directory-style (`/ro/haus/`), which maps
 * one-to-one onto the prerendered `ro/haus/index.html` files.
 */
export function pathFor(lang, page = 'home') {
  const segment = SEGMENTS[page] ?? ''
  return segment ? `/${lang}/${segment}/` : `/${lang}/`
}

/** Splits a pathname back into language and page; nulls when it matches neither. */
export function parsePath(pathname) {
  const [langSegment = '', pageSegment = ''] = pathname.replace(/^\/+|\/+$/g, '').split('/')

  if (!isSupported(langSegment)) return { lang: null, page: null }

  const page = PAGES.find((key) => SEGMENTS[key] === pageSegment)
  return { lang: langSegment, page: page ?? null }
}

export const ALL_ROUTES = LANGUAGES.flatMap(({ code }) =>
  PAGES.map((page) => ({ lang: code, page, path: pathFor(code, page) })),
)

/** Picks a language from a stored preference, then the browser, then the default. */
export function detectLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANG

  const stored = window.localStorage.getItem('hausmarylu.lang')
  if (stored && isSupported(stored)) return stored

  const fromBrowser = (window.navigator.languages ?? [window.navigator.language ?? ''])
    .map((tag) => tag.slice(0, 2).toLowerCase())
    .find(isSupported)

  return fromBrowser ?? DEFAULT_LANG
}

/** Internal link targets for the language currently being viewed. */
export function usePaths() {
  const { lang } = useTranslation()
  return useMemo(
    () => Object.fromEntries(PAGES.map((page) => [page, pathFor(lang, page)])),
    [lang],
  )
}
