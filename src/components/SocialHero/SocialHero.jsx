import './SocialHero.css'

function SocialHero({ content }) {
  return (
    <section className="social-hero" aria-labelledby="social-hero-title">
      <img
        className="social-hero__image"
        src={content.image}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading="eager"
        fetchPriority="high"
        style={{
          objectPosition: content.position || 'center center',
        }}
      />
      <div className="social-hero__overlay" aria-hidden="true" />

      <div className="social-hero__content">
        <p className="social-hero__eyebrow">{content.eyebrow}</p>
        <h1 id="social-hero-title">{content.title}</h1>
        <p className="social-hero__text">{content.text}</p>
      </div>

      <p className="social-hero__index" aria-hidden="true">01</p>
    </section>
  )
}

export default SocialHero
