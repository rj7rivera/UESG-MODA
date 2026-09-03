import useCart from '../../hooks/useCart.js'
import {
  describeProduct,
  getProductById,
  getProductByPosition,
} from '../../data/productCatalog.js'
import './EditorialProductCard.css'

function EditorialProductCard({
  collection,
  collectionId,
  image,
  index,
  isGraphic = false,
  productId = null,
  caption = null,
}) {
  const itemNumber = String(index + 1).padStart(2, '0')
  const { addItem, openCart } = useCart()
  const product = productId
    ? getProductById(productId)
    : collectionId
      ? getProductByPosition(collectionId, index)
      : null

  const handleAdd = () => {
    if (!product) return
    addItem({ productId: product.id, variantId: 'default', quantity: 1 })
    openCart()
  }

  return (
    <article className="editorial-product-card">
      <figure
        className={`editorial-product-card__media${image.fit === 'contain' ? ' editorial-product-card__media--contain' : ''}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={{
            objectFit: image.fit || 'cover',
            objectPosition: image.position,
          }}
        />
        <span aria-hidden="true">{itemNumber}</span>
      </figure>

      <div className="editorial-product-card__info">
        <p>{collection}</p>
        <p>
          {caption || (isGraphic ? 'Diseño gráfico' : 'Registro de colección')}
          <span>{itemNumber}</span>
        </p>
      </div>

      {product ? (
        <button
          className="editorial-product-card__add"
          type="button"
          onClick={handleAdd}
          aria-label={`Agregar ${describeProduct(product)} a la bolsa`}
        >
          Agregar a la bolsa
        </button>
      ) : null}
    </article>
  )
}

export default EditorialProductCard
