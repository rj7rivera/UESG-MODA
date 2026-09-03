import './AboutHero.css'

function AboutHero({ content }) {
  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <img
        className="about-hero__image"
        src={content.image}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading="eager"
        fetchPriority="high"
      />
      <div className="about-hero__overlay" aria-hidden="true" />

      <div className="about-hero__content">
        <p className="about-hero__eyebrow">{content.eyebrow}</p>
        <h1 className="about-hero__title" id="about-hero-title">
          {content.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <span className="about-hero__signature" aria-hidden="true" />
      </div>

      <p className="about-hero__scroll" aria-hidden="true">
        Descubrir
        <span />
      </p>
    </section>
  )
}

export default AboutHero
