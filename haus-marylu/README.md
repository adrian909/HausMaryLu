# Haus MaryLu

Site-ul pensiunii Haus MaryLu (Markersdorf-Haindorf, Austria) — **React + Vite**, design propriu,
fără framework de CSS, **prerandat static** pentru SEO.
Înlocuiește vechiul template din [`../villa-master/`](../villa-master/).

## Comenzi

```bash
npm install
npm run dev                      # server de dezvoltare, http://localhost:5173
npm run build                    # build complet: client + SSR + prerender + sitemap
npm run preview                  # servește dist/ local
node scripts/optimize-images.js  # recomprimă pozele din public/img (rulabil oricând)
```

`npm run build` face trei lucruri, în ordine:

1. `vite build` — bundle-ul de browser
2. `vite build --ssr` — o versiune server-side a aplicației, în `dist-ssr/`
3. `node prerender.js` — randează fiecare rută în HTML static, scrie sitemap-ul,
   pagina rădăcină și `404.html`

## URL-uri

Fiecare limbă are propriile adrese, ca să poată fi indexate separat:

```
/                 pagină de redirect: trimite vizitatorul la limba lui
/ro/  /ro/haus/  /ro/contact/
/en/  /en/haus/  /en/contact/
/de/  /de/haus/  /de/contact/
```

Limba **vine din URL**, nu din state — de asta funcționează indexarea. `localStorage`
reține doar preferința, ca să știm unde să trimitem pe cineva care intră pe `/`.

## Structură

```
prerender.js              generează cele 9 pagini statice, sitemap, 404, rădăcina
scripts/optimize-images.js

src/
  entry-client.jsx        hidratează HTML-ul prerandat
  entry-server.jsx        randare pentru prerender
  App.jsx                 câte o ramură de rute pentru fiecare limbă

  seo/
    seo.js                sursa unică pentru title, meta, canonical, hreflang,
                          Open Graph și datele structurate
    serializeHead.js      le scrie ca HTML la build
    useHead.js            le aplică la navigarea în browser

  styles/                 tokens.css (culori, tipografie) + base.css
  components/
    layout/               Header, Footer, LanguageSwitcher, Layout
    ui/                   Button, Icon, Reveal, SectionHeading, Lightbox
    sections/             Hero, Highlights, Intro, Amenities, Gallery,
                          Testimonials, Nearby, BookingCta, ContactCards
  pages/                  Home, Haus, Contact
  i18n/
    dictionaries.js       încarcă locale-urile
    routes.js             pathFor / parsePath / usePaths
    LanguageProvider.jsx  limba derivată din URL
    locales/              ro.json, en.json, de.json
  data/
    site.js               contact, link Booking, facilități, distanțe
    gallery.js            pozele pe categorii

public/img/               28 de poze, denumite după cameră
public/og-image.jpg       imaginea pentru share pe social (1200×630)
```

## Cum se editează conținutul

- **Texte, titluri și meta descriptions** → `src/i18n/locales/*.json`
- **Telefon, email, adresă, link Booking** → `src/data/site.js`
- **Poze** → pui fișierul în `public/img/`, apoi îl adaugi în `src/data/gallery.js`
  cu categoria potrivită (`wide: true` îi dă o celulă dublă)
- **Domeniul canonic** → `SITE_URL` din `src/seo/seo.js`

Titlurile trebuie să rămână sub ~60 de caractere și descrierile între 70 și 165,
altfel Google le taie.

## Ce s-a făcut pentru SEO

- **Prerender static** — conținutul e în sursa HTML (~3.300 caractere pe prima
  pagină), nu doar după ce rulează JavaScript. Site-ul e lizibil și cu JS dezactivat.
- **hreflang reciproc** pe toate cele 9 pagini, plus `x-default`, și `canonical`
  auto-referențiat.
- **Date structurate** (JSON-LD): `LodgingBusiness` cu adresă, telefoane, email,
  cele 9 facilități și fotografii; `WebSite`, `WebPage`, `BreadcrumbList` pe
  paginile interioare, `Review` pe prima pagină.
- **Open Graph + Twitter Cards** cu imagine dedicată 1200×630.
- **Sitemap** generat la build, cu clusterul de hreflang pe fiecare intrare.
- **Redirect-uri 301** de la vechile URL-uri (`haus-en.html` etc.).
- **404 real**, nu soft-404: rutele inexistente primesc status 404.
- **Imagini** — toate recomprimate (folderul a scăzut de la 2,8 MB la 1,8 MB;
  poza din hero de la 1248 KB la 280 KB), fiecare cu `alt` descriptiv, iar
  imaginea LCP e preîncărcată per pagină.

### Ce nu am pus, intenționat

- **`aggregateRating`** — nu știu media reală a recenziilor de pe Booking. Un
  agregat inventat e exact genul de markup pentru care Google penalizează. Dacă
  îmi dai nota și numărul de recenzii, se adaugă în `src/seo/seo.js`.
- **`geo` (coordonate)** — nu am latitudinea și longitudinea exacte ale clădirii.
  Merită adăugate în `lodgingSchema`, ajută la căutările locale.

## Contact

Fără formular. Emailul e link `mailto:` cu subiect precompletat și tradus,
telefoanele sunt `tel:`. Un site static nu poate trimite mail singur.

## Deploy

`npm run build` → `dist/`. Sunt incluse `public/_redirects` (Netlify) și
`vercel.json` (Vercel), amândouă cu redirect-urile 301 de la URL-urile vechi.

**Atenție:** nu pune un rewrite de tip `/* → /index.html 200`. Fiecare rută are
deja fișierul ei prerandat, iar un catch-all le-ar acoperi pe toate cu pagina de
redirect. Pentru nginx: `try_files $uri $uri/index.html =404;`

## De verificat înainte de publicare

- **Domeniul** — `SITE_URL` din `src/seo/seo.js` e `https://hausmarylu.at`. Dacă
  se schimbă, se schimbă și în `public/robots.txt`.
- **Favicon** — `public/favicon.svg` e un monogram provizoriu.
- **Google Search Console** — trimite `sitemap.xml` și verifică raportul
  „Pagini alternative internaționale" după prima indexare.
