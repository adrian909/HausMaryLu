import { useEffect } from 'react'
import { useTranslation } from '../i18n'
import { buildHead } from './seo'

const MANAGED = 'data-seo'

function replaceManagedTags(head) {
  document.head.querySelectorAll(`[${MANAGED}]`).forEach((node) => node.remove())

  const fragment = document.createDocumentFragment()

  for (const tag of head.meta) {
    const element = document.createElement('meta')
    Object.entries(tag).forEach(([key, value]) => element.setAttribute(key, value))
    element.setAttribute(MANAGED, '')
    fragment.appendChild(element)
  }

  for (const tag of head.link) {
    const element = document.createElement('link')
    Object.entries(tag).forEach(([key, value]) => element.setAttribute(key, value))
    element.setAttribute(MANAGED, '')
    fragment.appendChild(element)
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(head.jsonLd)
  script.setAttribute(MANAGED, '')
  fragment.appendChild(script)

  document.head.appendChild(fragment)
}

/**
 * Keeps the document head correct as the visitor moves around the SPA. The
 * prerendered HTML already carries these tags, so this only matters after the
 * first client-side navigation — but crawlers that execute JS see the same
 * result either way.
 */
export function useHead(page) {
  const { lang } = useTranslation()

  useEffect(() => {
    const head = buildHead(lang, page)
    document.title = head.title
    replaceManagedTags(head)
  }, [lang, page])
}
