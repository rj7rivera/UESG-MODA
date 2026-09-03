import useReveal from '../../hooks/useReveal.js'
import './GrowthSection.css'

function GrowthSection({ content }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <section
      className={`growth-section nosotros-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby="growth-section-title"
    >
      <img
        className="growth-section__image"
        src={content.image}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading="lazy"
        decoding="async"
      />
      <div className="growth-section__overlay" aria-hidden="true" />

      <div className="growth-section__content">
        <p className="growth-section__index">
          <span>{content.number}</span>
          {content.label}
        </p>
        <h2 id="growth-section-title">{content.title}</h2>
        <p className="growth-section__text">{content.text}</p>
      </div>
    </section>
  )
}

export default GrowthSection
