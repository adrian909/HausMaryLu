import { useCallback, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LanguageContext } from './context'
import { DEFAULT_LANG, dictionaries, isSupported } from './dictionaries'
import { parsePath, pathFor } from './routes'

const STORAGE_KEY = 'hausmarylu.lang'

/** Reads a dot-separated path out of a nested object. */
function resolve(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source)
}

/**
 * The active language comes from the URL, not from component state — that is
 * what makes each translation separately indexable. Switching language is a
 * navigation, and the choice is remembered only to route visitors landing on
 * the bare domain.
 */
export function LanguageProvider({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { lang: langFromPath, page } = parsePath(pathname)
  const lang = langFromPath ?? DEFAULT_LANG

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].htmlLang
    if (langFromPath) localStorage.setItem(STORAGE_KEY, langFromPath)
  }, [lang, langFromPath])

  const setLang = useCallback(
    (next) => {
      if (!isSupported(next)) return
      localStorage.setItem(STORAGE_KEY, next)
      navigate(pathFor(next, page ?? 'home'))
    },
    [navigate, page],
  )

  const value = useMemo(() => {
    /**
     * Looks up a translation, falling back to the default language so a key
     * that is missing in one locale never renders as an empty string.
     * `vars` interpolates `{name}` placeholders.
     */
    const t = (path, vars) => {
      const hit = resolve(dictionaries[lang], path) ?? resolve(dictionaries[DEFAULT_LANG], path)
      if (typeof hit !== 'string' || !vars) return hit
      return hit.replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match)
    }

    return { lang, page, setLang, t }
  }, [lang, page, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
