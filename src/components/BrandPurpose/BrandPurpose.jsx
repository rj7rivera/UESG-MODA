import useReveal from '../../hooks/useReveal.js'
import './BrandPurpose.css'

function PurposeArticle({ content, variant }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <article
      className={`brand-purpose__article brand-purpose__article--${variant} nosotros-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby={`purpose-${variant}-title`}
    >
      <figure className="brand-purpose__media nosotros-image-reveal">
        <img
          src={content.image}
          alt={content.alt}
          width={content.width}
          height={content.height}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="brand-purpose__copy">
        <p className="brand-purpose__index">
          <span>{content.number}</span>
          {content.label}
        </p>
        <h2 id={`purpose-${variant}-title`}>{content.title}</h2>
        <p className="brand-purpose__text">{content.text}</p>
      </div>
    </article>
  )
}

function BrandPurpose({ content }) {
  return (
    <section className="brand-purpose" aria-labelledby="brand-purpose-heading">
      <h2 className="visually-hidden" id="brand-purpose-heading">
        Misión y visión de UESG
      </h2>
      <PurposeArticle content={content.mission} variant="mission" />
      <PurposeArticle content={content.vision} variant="vision" />
    </section>
  )
}

export default BrandPurpose
