import useReveal from '../../hooks/useReveal.js'
import './AboutOverview.css'

function AboutOverview({ content }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <section
      className={`about-overview nosotros-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby="about-overview-title"
    >
      <header className="about-overview__header">
        <p>{content.number}</p>
        <span aria-hidden="true" />
        <p>{content.label}</p>
      </header>

      <div className="about-overview__grid">
        <div className="about-overview__copy">
          <h2 id="about-overview-title">{content.title}</h2>
          <p>{content.text}</p>
        </div>

        <figure className="about-overview__media nosotros-image-reveal">
          <img
            src={content.image}
            alt={content.alt}
            width={content.width}
            height={content.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}

export default AboutOverview
