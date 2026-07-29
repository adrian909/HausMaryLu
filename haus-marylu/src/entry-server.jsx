import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LanguageProvider } from './i18n'
import App from './App'

export { ALL_ROUTES } from './i18n/routes'
export { buildHead, SITE_URL } from './seo/seo'
export { serializeHead } from './seo/serializeHead'
export { LANGUAGES } from './i18n/dictionaries'

/** Renders one route to static markup for the prerender step. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StaticRouter>,
  )
}
