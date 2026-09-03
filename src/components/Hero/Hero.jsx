import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroSlides from './heroSlides.js'
import './Hero.css'

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const galleryRef = useRef(null)

  function handleScroll(event) {
    const gallery = event.currentTarget
    const nextSlide = Math.round(gallery.scrollLeft / gallery.clientWidth)

    if (nextSlide !== activeSlide) setActiveSlide(nextSlide)
  }

  function showSlide(index) {
    const gallery = galleryRef.current
    if (!gallery) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gallery.scrollTo({
      left: gallery.clientWidth * index,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        className="hero__gallery"
        ref={galleryRef}
        onScroll={handleScroll}
        role="region"
        aria-label="Campaña nueva colección UESG"
        aria-roledescription="carrusel"
      >
        {heroSlides.map((slide, index) => (
          <article
            className={`hero__panel hero__panel--${index + 1}`}
            key={slide.id}
            aria-label={`${index + 1} de ${heroSlides.length}`}
          >
            <img
              className="hero__image"
              src={slide.image}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading="eager"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              style={{ objectPosition: slide.position }}
            />
          </article>
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Nueva colección / 2026</p>
        <h1 className="hero__title" id="hero-title">
          Own your
          <span>style.</span>
        </h1>
        <Link className="hero__cta" to="/tienda">
          <span>Descubrir</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        className="hero__mobile-controls"
        role="group"
        aria-label="Controles del carrusel"
      >
        <button
          type="button"
          aria-label="Fotografía anterior"
          disabled={activeSlide === 0}
          onClick={() => showSlide(activeSlide - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <p aria-live="polite" aria-atomic="true">
          <span>{String(activeSlide + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> / </span>
          <span>{String(heroSlides.length).padStart(2, '0')}</span>
        </p>
        <button
          type="button"
          aria-label="Fotografía siguiente"
          disabled={activeSlide === heroSlides.length - 1}
          onClick={() => showSlide(activeSlide + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default Hero
