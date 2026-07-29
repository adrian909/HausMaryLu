/**
 * Turns the SPA into static HTML: one prerendered file per language and page,
 * each carrying its own head tags, plus a root redirect page and the sitemap.
 *
 * Run after `vite build` and the SSR build — see the `build` script.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')

// pathToFileURL: a bare Windows path is not a valid ESM specifier.
const { ALL_ROUTES, LANGUAGES, SITE_URL, buildHead, render, serializeHead } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function write(routePath, html) {
  const dir = path.join(dist, routePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

// --- Prerender every language/page pair ------------------------------------

for (const { lang, page, path: routePath } of ALL_ROUTES) {
  const head = buildHead(lang, page)
  const html = template
    .replace('<html lang="en"', `<html lang="${head.lang}"`)
    .replace('<!--app-head-->', serializeHead(head))
    .replace('<!--app-html-->', render(routePath))

  write(routePath, html)
  console.log(`prerendered ${routePath}`)
}

// --- Root: sends visitors to their language, tells crawlers about all three --

const defaultLang = 'en'
const alternates = LANGUAGES.map(
  ({ code }) => `    <link rel="alternate" hreflang="${code}" href="${SITE_URL}/${code}/">`,
).join('\n')

const rootHtml = `<!doctype html>
<html lang="${defaultLang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Haus MaryLu — Markersdorf-Haindorf, Austria</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="canonical" href="${SITE_URL}/${defaultLang}/">
${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/${defaultLang}/">
    <meta name="robots" content="noindex, follow">
    <script>
      (function () {
        var supported = ${JSON.stringify(LANGUAGES.map(({ code }) => code))}
        var stored = null
        try { stored = localStorage.getItem('hausmarylu.lang') } catch (e) {}
        var wanted = (navigator.languages || [navigator.language || '']).map(function (tag) {
          return String(tag).slice(0, 2).toLowerCase()
        })
        var pick = supported.indexOf(stored) > -1 ? stored : null
        for (var i = 0; !pick && i < wanted.length; i++) {
          if (supported.indexOf(wanted[i]) > -1) pick = wanted[i]
        }
        location.replace('/' + (pick || '${defaultLang}') + '/')
      })()
    </script>
  </head>
  <body>
    <p>Haus MaryLu</p>
    <ul>
${LANGUAGES.map(({ code, label }) => `      <li><a href="/${code}/">${label}</a></li>`).join('\n')}
    </ul>
  </body>
</html>
`

fs.writeFileSync(path.join(dist, 'index.html'), rootHtml)
console.log('wrote root redirect')

// --- 404 -------------------------------------------------------------------

fs.writeFileSync(
  path.join(dist, '404.html'),
  `<!doctype html>
<html lang="${defaultLang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page not found — Haus MaryLu</title>
    <meta name="robots" content="noindex, follow">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
      body{margin:0;min-height:100svh;display:grid;place-items:center;background:#fbf9f5;color:#4c463e;
        font:16px/1.7 Inter,system-ui,sans-serif;text-align:center;padding:2rem}
      h1{font:400 2.5rem/1.1 Fraunces,Georgia,serif;color:#1c1a17;margin:0 0 .5rem}
      ul{list-style:none;padding:0;margin:1.5rem 0 0;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
      a{color:#3d5a48}
    </style>
  </head>
  <body>
    <main>
      <h1>Haus MaryLu</h1>
      <p>This page does not exist.</p>
      <ul>
${LANGUAGES.map(({ code, label }) => `        <li><a href="/${code}/">${label}</a></li>`).join('\n')}
      </ul>
    </main>
  </body>
</html>
`,
)
console.log('wrote 404.html')

// --- Sitemap, with the hreflang cluster on every entry ----------------------

const urls = ALL_ROUTES.map(({ lang, page, path: routePath }) => {
  const links = LANGUAGES.map(({ code }) => {
    const href = SITE_URL + ALL_ROUTES.find((r) => r.lang === code && r.page === page).path
    return `    <xhtml:link rel="alternate" hreflang="${code}" href="${href}"/>`
  }).join('\n')

  const xDefault = SITE_URL + ALL_ROUTES.find((r) => r.lang === defaultLang && r.page === page).path

  return `  <url>
    <loc>${SITE_URL}${routePath}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>
    <changefreq>${page === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === 'home' ? '1.0' : '0.8'}</priority>
  </url>`
}).join('\n')

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
)
console.log('wrote sitemap.xml')
