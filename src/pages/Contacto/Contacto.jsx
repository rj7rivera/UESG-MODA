import ContactForm from '../../components/ContactForm/ContactForm.jsx'
import ContactHero from '../../components/ContactHero/ContactHero.jsx'
import { WHATSAPP_NUMBER } from '../../config/commerce.js'
import useReveal from '../../hooks/useReveal.js'
import { buildWhatsAppContactUrl } from '../../utils/whatsappContact.js'
import contactoContent from './contactoContent.js'
import './Contacto.css'

function Contacto() {
  const {
    elementRef: statementRef,
    isVisible: isStatementVisible,
  } = useReveal()
  const { elementRef: contactRef, isVisible: isContactVisible } = useReveal()
  const { elementRef: finaleRef, isVisible: isFinaleVisible } = useReveal()
  const directWhatsAppUrl = buildWhatsAppContactUrl()

  return (
    <div className="contacto-page">
      <ContactHero content={contactoContent.hero} />

      <section
        ref={statementRef}
        className={`contacto-statement contacto-reveal${isStatementVisible ? ' is-visible' : ''}`}
        aria-labelledby="contacto-statement-title"
      >
        <div className="contacto-statement__inner">
          <div className="contacto-section-mark">
            <span>{contactoContent.statement.number}</span>
            <p>{contactoContent.statement.eyebrow}</p>
          </div>
          <h2 id="contacto-statement-title">{contactoContent.statement.title}</h2>
        </div>
      </section>

      <section
        ref={contactRef}
        className={`contacto-main contacto-reveal${isContactVisible ? ' is-visible' : ''}`}
        aria-labelledby="contacto-direct-title"
      >
        <div className="contacto-main__inner">
          <div className="contacto-direct">
            <div className="contacto-section-mark contacto-section-mark--dark">
              <span>{contactoContent.contact.number}</span>
              <p>{contactoContent.contact.eyebrow}</p>
            </div>
            <h2 id="contacto-direct-title">{contactoContent.contact.title}</h2>

            <dl className="contacto-direct__list">
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  {directWhatsAppUrl ? (
                    <a href={directWhatsAppUrl} target="_blank" rel="noreferrer">
                      +{WHATSAPP_NUMBER}<span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span>No disponible</span>
                  )}
                </dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{contactoContent.contact.location}</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>

      <section
        ref={finaleRef}
        className={`contacto-finale contacto-reveal${isFinaleVisible ? ' is-visible' : ''}`}
        aria-labelledby="contacto-finale-title"
      >
        <div className="contacto-finale__inner">
          <div className="contacto-finale__copy">
            <div className="contacto-section-mark">
              <span>{contactoContent.finale.number}</span>
              <p>{contactoContent.finale.eyebrow}</p>
            </div>
            <h2 id="contacto-finale-title">{contactoContent.finale.title}</h2>
          </div>
          <figure className="contacto-finale__media">
            <img
              src={contactoContent.finale.image}
              alt={contactoContent.finale.alt}
              width={contactoContent.finale.width}
              height={contactoContent.finale.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>
    </div>
  )
}

export default Contacto
