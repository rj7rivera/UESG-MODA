import useReveal from '../../hooks/useReveal.js'
import './ResponsibleLegacy.css'

function ResponsibleLegacy({ content }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <section
      className={`responsible-legacy social-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby="responsible-legacy-title"
    >
      <img
        className="responsible-legacy__image"
        src={content.image}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading="lazy"
        decoding="async"
      />
      <div className="responsible-legacy__overlay" aria-hidden="true" />

      <div className="responsible-legacy__content">
        <p className="responsible-legacy__eyebrow">{content.eyebrow}</p>
        <h2 id="responsible-legacy-title">
          {content.titleLines.map((line, index) => (
            <span
              className={index === content.titleLines.length - 1 ? 'responsible-legacy__accent' : ''}
              key={line}
            >
              {line}
            </span>
          ))}
        </h2>
        <p className="responsible-legacy__text">{content.text}</p>
      </div>
    </section>
  )
}

export default ResponsibleLegacy
