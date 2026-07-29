import { useTranslation } from '../i18n'
import { useHead } from '../seo/useHead'
import { site } from '../data/site'
import Hero from '../components/sections/Hero'
import ContactCards from '../components/sections/ContactCards'
import BookingCta from '../components/sections/BookingCta'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useTranslation()
  useHead('contact')

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(t('contact.emailSubject'))}`

  return (
    <>
      <Hero
        variant="page"
        image="/img/terrace-1.jpg"
        imageAlt={t('gallery.altTerrace')}
        eyebrow={t('common.location')}
        title={t('contact.heroTitle')}
        lead={t('contact.heroLead')}
      />

      <ContactCards />

      <section className={`section ${styles.mailSection}`}>
        <Reveal className={`container container-narrow ${styles.mailInner}`}>
          <h2 className={styles.title}>{t('contact.ctaTitle')}</h2>
          <p className="lead">{t('contact.ctaText')}</p>
          <Button href={mailto} size="large" icon="mail" className={styles.button}>
            {t('common.writeEmail')}
          </Button>
        </Reveal>
      </section>

      <BookingCta title={t('contact.bookingTitle')} text={t('contact.bookingText')} />
    </>
  )
}
