import './ShopHero.css'

function ShopHero({ content }) {
  return (
    <section className="shop-hero" aria-labelledby="shop-hero-title">
      <img
        className="shop-hero__image"
        src={content.image}
        alt={content.alt}
        width={content.width}
        height={content.height}
        loading="eager"
        fetchPriority="high"
        style={{
          '--shop-hero-position': content.position,
          '--shop-hero-mobile-position': content.mobilePosition,
        }}
      />
      <div className="shop-hero__overlay" aria-hidden="true" />

      <div className="shop-hero__content">
        <p className="shop-hero__eyebrow">{content.eyebrow}</p>
        <h1 id="shop-hero-title">{content.title}</h1>
        <p className="shop-hero__text">{content.text}</p>
      </div>

      <a className="shop-hero__jump" href="#shop-universes">
        Explorar universos
      </a>
    </section>
  )
}

export default ShopHero
