import { dictionaries, DEFAULT_LANG, LANGUAGES } from '../i18n/dictionaries'
import { pathFor } from '../i18n/routes'
import { site, amenities, distances } from '../data/site'

export const SITE_URL = 'https://hausmarylu.at'

export const absolute = (path) => new URL(path, SITE_URL).href

/** Locale codes in the form Open Graph expects. */
const OG_LOCALES = { ro: 'ro_RO', en: 'en_GB', de: 'de_AT' }

const OG_IMAGE = '/og-image.jpg'

/** The image each page leads with — also the LCP element, so it gets preloaded. */
export const HERO_IMAGES = {
  home: '/img/exterior-1.jpg',
  haus: '/img/exterior-4.jpg',
  contact: '/img/terrace-1.jpg',
}

/** Photos handed to search engines as representative of the property. */
const SHOWCASE_IMAGES = [
  '/img/exterior-1.jpg',
  '/img/living-1.jpg',
  '/img/kitchen-2.jpg',
  '/img/bedroom-1.jpg',
  '/img/terrace-1.jpg',
]

const translator = (lang) => (path) =>
  path.split('.').reduce((value, key) => value?.[key], dictionaries[lang]) ??
  path.split('.').reduce((value, key) => value?.[key], dictionaries[DEFAULT_LANG])

/**
 * Describes the property itself. Emitted on every page so any of them can be
 * the entry point a crawler sees first.
 */
function lodgingSchema(lang, t) {
  return {
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#lodging`,
    name: site.name,
    description: t('meta.home.description'),
    url: absolute(pathFor(lang, 'home')),
    image: SHOWCASE_IMAGES.map(absolute),
    telephone: site.phones.map(({ number }) => number),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: '3384',
      addressLocality: 'Markersdorf-Haindorf',
      addressRegion: 'Niederösterreich',
      addressCountry: 'AT',
    },
    hasMap: site.mapsUrl,
    sameAs: [site.bookingUrl],
    amenityFeature: amenities.map(({ id }) => ({
      '@type': 'LocationFeatureSpecification',
      name: t(`amenities.${id}`),
      value: true,
    })),
    availableLanguage: LANGUAGES.map(({ code }) => dictionaries[code].htmlLang),
  }
}

/**
 * Guest reviews, marked up individually. There is deliberately no
 * aggregateRating: the real average across all stays is not known here, and an
 * invented one is exactly the kind of markup that gets a site penalised.
 */
function reviewSchemas(t) {
  return t('home.testimonials').map(({ quote, author, origin }) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    author: { '@type': 'Person', name: author, address: origin },
    reviewBody: quote,
    itemReviewed: { '@id': `${SITE_URL}/#lodging` },
  }))
}

function breadcrumbSchema(lang, page, t) {
  if (page === 'home') return null

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav.home'),
        item: absolute(pathFor(lang, 'home')),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t(`nav.${page}`),
        item: absolute(pathFor(lang, page)),
      },
    ],
  }
}

function placeSchema(lang, t) {
  return {
    '@type': 'ItemList',
    name: t('home.distancesTitle'),
    itemListElement: distances.map(({ id, km }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristAttraction',
        name: t(`places.${id}`),
      },
      description: `${km} km`,
    })),
  }
}

/**
 * Everything that belongs in <head> for one language/page pair, as plain data
 * so it can be serialised at build time and applied to the DOM at runtime.
 */
export function buildHead(lang, page) {
  const t = translator(lang)
  const path = pathFor(lang, page)
  const canonical = absolute(path)
  const title = t(`meta.${page}.title`)
  const description = t(`meta.${page}.description`)

  const meta = [
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: OG_LOCALES[lang] },
    ...LANGUAGES.filter(({ code }) => code !== lang).map(({ code }) => ({
      property: 'og:locale:alternate',
      content: OG_LOCALES[code],
    })),
    { property: 'og:image', content: absolute(OG_IMAGE) },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${site.name} — ${t('common.location')}` },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: absolute(OG_IMAGE) },
  ]

  const link = [
    { rel: 'canonical', href: canonical },
    ...LANGUAGES.map(({ code }) => ({
      rel: 'alternate',
      hreflang: dictionaries[code].htmlLang,
      href: absolute(pathFor(code, page)),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: absolute(pathFor(DEFAULT_LANG, page)) },
  ]

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      inLanguage: dictionaries[lang].htmlLang,
      publisher: { '@id': `${SITE_URL}/#lodging` },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: dictionaries[lang].htmlLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#lodging` },
      primaryImageOfPage: absolute(HERO_IMAGES[page]),
    },
    lodgingSchema(lang, t),
    breadcrumbSchema(lang, page, t),
    ...(page === 'home' ? [...reviewSchemas(t), placeSchema(lang, t)] : []),
  ].filter(Boolean)

  return {
    lang: dictionaries[lang].htmlLang,
    title,
    meta,
    link,
    preload: HERO_IMAGES[page],
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  }
}
