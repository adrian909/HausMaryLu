import { usePaths, useTranslation } from '../i18n'
import { useHead } from '../seo/useHead'
import { site } from '../data/site'
import { featuredPhotos } from '../data/gallery'
import Button from '../components/ui/Button'
import Hero from '../components/sections/Hero'
import Highlights from '../components/sections/Highlights'
import Intro from '../components/sections/Intro'
import Amenities from '../components/sections/Amenities'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import Nearby from '../components/sections/Nearby'
import BookingCta from '../components/sections/BookingCta'

export default function Home() {
  const { t } = useTranslation()
  const paths = usePaths()
  useHead('home')

  return (
    <>
      <Hero
        image="/img/exterior-1.jpg"
        imageAlt={t('gallery.altExterior')}
        eyebrow={t('common.location')}
        title={t('home.heroTitle')}
        lead={t('home.heroLead')}
        actions={
          <>
            <Button href={site.bookingUrl} size="large" icon="external">
              {t('common.book')}
            </Button>
            <Button to={paths.haus} variant="ghost" size="large">
              {t('common.viewGallery')}
            </Button>
          </>
        }
      />

      <Highlights />
      <Intro />
      <Amenities />

      <Gallery
        eyebrow={t('home.galleryEyebrow')}
        title={t('home.galleryTitle')}
        photos={featuredPhotos}
        filterable={false}
        columns={3}
        footer={
          <Button to={paths.haus} variant="secondary" icon="arrowRight">
            {t('common.viewGallery')}
          </Button>
        }
      />

      <Testimonials />
      <Nearby />
      <BookingCta title={t('home.ctaTitle')} text={t('home.ctaText')} />
    </>
  )
}
