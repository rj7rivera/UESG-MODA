import { Link } from 'react-router-dom'
import './ContactHero.css'

function ContactHero({ content }) {
  return (
    <header className="contact-hero">
      <div className="contact-hero__inner">
        <nav className="contact-hero__breadcrumb" aria-label="Migas de pan">
          <ol>
            <li><Link to="/">Inicio</Link></li>
            <li aria-current="page">Contacto</li>
          </ol>
        </nav>

        <div className="contact-hero__copy">
          <p className="contact-hero__eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <div className="contact-hero__statement">
            <span aria-hidden="true" />
            <p>{content.text}</p>
          </div>
        </div>

        <figure className="contact-hero__media">
          <img
            src={content.image}
            alt={content.alt}
            width={content.width}
            height={content.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: content.position }}
          />
        </figure>
      </div>
    </header>
  )
}

export default ContactHero
