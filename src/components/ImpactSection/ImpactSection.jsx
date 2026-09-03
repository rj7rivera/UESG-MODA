import useReveal from '../../hooks/useReveal.js'
import './ImpactSection.css'

function ImpactSection({ content }) {
  const { elementRef, isVisible } = useReveal()
  const titleId = `impact-${content.number}-title`

  return (
    <article
      className={`impact-section impact-section--${content.layout} social-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby={titleId}
    >
      <p className="impact-section__number" aria-hidden="true">{content.number}</p>

      <div className="impact-section__copy">
        <p className="impact-section__label">ODS {content.number} / {content.label}</p>
        <h2 id={titleId}>{content.title}</h2>
        <p className="impact-section__statement">{content.statement}</p>
        <div className="impact-section__body">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.text}>
              {paragraph.lead ? <strong>{paragraph.lead}. </strong> : null}
              {paragraph.text}
            </p>
          ))}
        </div>
      </div>

      <figure className="impact-section__media social-image-reveal">
        <img
          src={content.image}
          alt={content.alt}
          width={content.width}
          height={content.height}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </article>
  )
}

export default ImpactSection
