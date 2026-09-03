import useReveal from '../../hooks/useReveal.js'
import './SocialManifesto.css'

function SocialManifesto({ content }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <section
      className={`social-manifesto social-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      aria-labelledby="social-manifesto-title"
    >
      <div className="social-manifesto__heading">
        <p>{content.eyebrow}</p>
        <h2 id="social-manifesto-title">{content.title}</h2>
      </div>

      <div className="social-manifesto__story">
        <p>{content.text}</p>
        <figure className="social-manifesto__media social-image-reveal">
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

export default SocialManifesto
