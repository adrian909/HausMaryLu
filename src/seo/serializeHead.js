const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const attrs = (object) =>
  Object.entries(object)
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(' ')

/**
 * Renders a head description from `buildHead` into HTML for the static files.
 *
 * Everything page-specific carries `data-seo` so that `useHead` can swap the
 * whole set on client-side navigation instead of appending a second canonical
 * and a duplicate set of hreflang links.
 */
export function serializeHead(head) {
  const lines = [
    `<title>${escapeAttr(head.title)}</title>`,
    ...head.meta.map((tag) => `<meta ${attrs(tag)} data-seo>`),
    ...head.link.map((tag) => `<link ${attrs(tag)} data-seo>`),
    `<link rel="preload" as="image" href="${escapeAttr(head.preload)}" fetchpriority="high">`,
    // `</` inside JSON would close the script element early.
    `<script type="application/ld+json" data-seo>${JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]

  return lines.map((line) => `    ${line}`).join('\n')
}
