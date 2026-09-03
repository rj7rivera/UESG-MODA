import './ShopUniverseOpening.css'

function ShopUniverseOpening({ content, titleId }) {
  const align = content.openingAlign || 'start'

  return (
    <div className={`shop-universe-opening shop-universe-opening--align-${align}`}>
      <div className="shop-universe-opening__content">
        <p className="shop-universe-opening__eyebrow">{content.eyebrow}</p>
        <h2 id={titleId}>{content.title}</h2>
        <div className="shop-universe-opening__description">
          <span aria-hidden="true" />
          <p>{content.text}</p>
        </div>
      </div>
    </div>
  )
}

export default ShopUniverseOpening
