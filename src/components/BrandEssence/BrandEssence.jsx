import useReveal from '../../hooks/useReveal.js'
import './BrandEssence.css'

function BrandEssence({ content }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <section
      className={`brand-essence nosotros-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby="brand-essence-title"
    >
      <div className="brand-essence__heading">
        <p>
          <span>{content.number}</span>
          {content.label}
        </p>
        <h2 id="brand-essence-title">{content.title}</h2>
      </div>

      <div className="brand-essence__body">
        <figure className="brand-essence__media nosotros-image-reveal">
          <img
            src={content.image}
            alt={content.alt}
            width={content.width}
            height={content.height}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="brand-essence__copy">
          <span aria-hidden="true">UESG</span>
          <p>{content.text}</p>
        </div>
      </div>
    </section>
  )
}

export default BrandEssence
