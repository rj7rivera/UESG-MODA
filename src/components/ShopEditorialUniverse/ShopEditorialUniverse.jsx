import { startTransition, useState } from 'react'
import { makeEditorialProductId } from '../../data/productCatalog.js'
import useReveal from '../../hooks/useReveal.js'
import EditorialProductCard from '../EditorialProductCard/EditorialProductCard.jsx'
import ShopUniverseOpening from '../ShopUniverseOpening/ShopUniverseOpening.jsx'
import './ShopEditorialUniverse.css'

const INITIAL_ITEMS = 8
const BATCH_SIZE = 8

function ShopEditorialUniverse({ content }) {
  const { elementRef, isVisible } = useReveal()
  const collection = content.collections[0]
  const items = collection.images
  const initialCount = Math.min(INITIAL_ITEMS, items.length)
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const allItemsVisible = visibleCount >= items.length
  const isExpanded = visibleCount > initialCount
  const titleId = `shop-${content.anchor}-title`
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
        Math.min(currentCount + BATCH_SIZE, items.length),
      )
    })
  }

  const actionLabel = !isExpanded
    ? `Ver colección completa · ${items.length}`
    : allItemsVisible
      ? 'Mostrar menos'
      : 'Mostrar más'

  return (
    <section
      className={`shop-editorial-universe shop-editorial-universe--${content.id}${isVisible ? ' is-visible' : ''}`}
      id={content.anchor}
      ref={elementRef}
      aria-labelledby={titleId}
    >
      <ShopUniverseOpening content={content} titleId={titleId} />

      <div className="shop-editorial-universe__catalog">
        <p className="shop-editorial-universe__catalog-label">
          Catálogo {content.name} / {String(items.length).padStart(2, '0')} prendas
        </p>

        <div className="shop-editorial-universe__grid" id={gridId}>
          {items.slice(0, visibleCount).map((image, index) => (
            <EditorialProductCard
              collection={content.name}
              image={image}
              index={index}
              key={image.sourceKey}
              productId={makeEditorialProductId(
                content.id,
                collection.id,
                image.sourceKey,
              )}
              caption={image.label}
            />
          ))}
        </div>

        {items.length > initialCount ? (
          <div className="shop-editorial-universe__actions">
            <p aria-live="polite">
              Mostrando {visibleCount} de {items.length}
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
    </section>
  )
}

export default ShopEditorialUniverse
