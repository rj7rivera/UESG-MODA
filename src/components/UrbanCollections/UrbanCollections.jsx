import { startTransition, useState } from 'react'
import useReveal from '../../hooks/useReveal.js'
import EditorialProductCard from '../EditorialProductCard/EditorialProductCard.jsx'
import './UrbanCollections.css'

const INITIAL_ITEMS = 8
const BATCH_SIZE = 8

function UrbanCollection({ collection }) {
  const { elementRef, isVisible } = useReveal()
  const totalItems = collection.images.length
  const initialCount = Math.min(INITIAL_ITEMS, totalItems)
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const allItemsVisible = visibleCount >= totalItems
  const isExpanded = visibleCount > initialCount
  const gridId = `${collection.id}-grid`

  const handleCatalogAction = () => {
    if (allItemsVisible) {
      startTransition(() => setVisibleCount(initialCount))

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          elementRef.current?.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth',
            block: 'start',
          })
        })
      })
      return
    }

    startTransition(() => {
      setVisibleCount((currentCount) =>
        Math.min(currentCount + BATCH_SIZE, totalItems),
      )
    })
  }

  const actionLabel = !isExpanded
    ? `Ver colección completa · ${totalItems}`
    : allItemsVisible
      ? 'Mostrar menos'
      : 'Mostrar más'

  return (
    <article
      className={`urban-collection urban-collection--${collection.variant} urban-collection-reveal${isVisible ? ' is-visible' : ''}`}
      id={collection.id}
      ref={elementRef}
      aria-labelledby={`${collection.id}-title`}
    >
      <div className="urban-collection__inner">
        <header className="urban-collection__header">
          <div>
          <p className="urban-collection__eyebrow">{collection.eyebrow}</p>
          <h3 id={`${collection.id}-title`}>{collection.title}</h3>
          </div>
          <p className="urban-collection__text">{collection.text}</p>
        </header>

        <div className="urban-collection__grid" id={gridId}>
          {collection.images.slice(0, visibleCount).map((image, index) => (
            <EditorialProductCard
              collection={collection.title}
              collectionId={collection.id}
              image={image}
              index={index}
              isGraphic={collection.variant === 'dtf'}
              key={image.src}
            />
          ))}
        </div>

        {totalItems > initialCount ? (
          <div className="urban-collection__actions">
            <p aria-live="polite">
              Mostrando {visibleCount} de {totalItems}
            </p>
            <button
              type="button"
              aria-controls={gridId}
              aria-expanded={isExpanded}
              onClick={handleCatalogAction}
            >
              {actionLabel}
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function UrbanCollections({ collections }) {
  return (
    <section className="urban-collections" aria-label="Colecciones UESG Urban">
      <nav className="urban-collections__index" aria-label="Colecciones Urban">
        <p>Catálogo Urban / 04 colecciones</p>
        <div className="urban-collections__index-track">
          {collections.map((collection) => (
            <a href={`#${collection.id}`} key={collection.id}>
              <span>{collection.number}</span>
              {collection.title}
            </a>
          ))}
        </div>
      </nav>

      {collections.map((collection) => (
        <UrbanCollection collection={collection} key={collection.id} />
      ))}
    </section>
  )
}

export default UrbanCollections
