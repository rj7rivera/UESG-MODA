import { useCallback, useEffect, useRef } from 'react'
import useCart from '../../hooks/useCart.js'
import { describeProduct, getProductById, getProductHeading } from '../../data/productCatalog.js'
import { buildWhatsAppOrderUrl } from '../../utils/whatsappOrder.js'
import { WHATSAPP_IS_CONFIGURED } from '../../config/commerce.js'
import './CartDrawer.css'

function CartLine({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart()
  const product = getProductById(item.productId)
  if (!product) return null

  const variant = product.variants.find((entry) => entry.variantId === item.variantId)
  const label = describeProduct(product)
  const reference = product.referenceCode

  return (
    <li className="cart-drawer__line">
      <div className="cart-drawer__line-media">
        <img src={product.image.src} alt={product.image.alt} loading="lazy" decoding="async" />
      </div>

      <div className="cart-drawer__line-body">
        <p className="cart-drawer__line-collection">{getProductHeading(product)}</p>
        {reference ? <p className="cart-drawer__line-ref">{reference}</p> : null}
        {product.productName ? (
          <p className="cart-drawer__line-name">{product.productName}</p>
        ) : null}
        {variant?.label ? (
          <p className="cart-drawer__line-variant">{variant.label}</p>
        ) : null}

        <div className="cart-drawer__qty" role="group" aria-label="Cantidad">
          <button
            type="button"
            aria-label={`Disminuir cantidad de ${label}`}
            onClick={() => decreaseQuantity(item.key)}
          >
            −
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            aria-label={`Aumentar cantidad de ${label}`}
            onClick={() => increaseQuantity(item.key)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="cart-drawer__line-remove"
        type="button"
        aria-label={`Quitar ${label} de la bolsa`}
        onClick={() => removeItem(item.key)}
      >
        Quitar
      </button>
    </li>
  )
}

function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, cartCount } = useCart()
  const dialogRef = useRef(null)

  const handleClose = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close()
    closeCart()
  }, [closeCart])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const handleCancel = (event) => {
      event.preventDefault()
      handleClose()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [handleClose])

  const orderUrl = buildWhatsAppOrderUrl(items)
  const hasItems = items.length > 0

  return (
    <dialog
      className="cart-drawer"
      ref={dialogRef}
      aria-label="Tu bolsa"
      onClick={(event) => {
        if (event.target === dialogRef.current) handleClose()
      }}
    >
      <div className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">UESG / Bolsa</p>
            <h2>Tu selección</h2>
          </div>
          <button
            className="cart-drawer__close"
            type="button"
            aria-label="Cerrar bolsa"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </header>

        {hasItems ? (
          <ul className="cart-drawer__list">
            {items.map((item) => (
              <CartLine item={item} key={item.key} />
            ))}
          </ul>
        ) : (
          <div className="cart-drawer__empty">
            <p>Tu bolsa está vacía.</p>
            <p>Explora las colecciones y añade tus prendas favoritas.</p>
          </div>
        )}

        <footer className="cart-drawer__footer">
          <p className="cart-drawer__note">
            El pedido se envía por WhatsApp. Disponibilidad, precio, pago y entrega
            se confirman con el equipo UESG.
          </p>

          <p className="cart-drawer__count" aria-live="polite">
            {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'} en la bolsa
          </p>

          {hasItems && !WHATSAPP_IS_CONFIGURED ? (
            <p className="cart-drawer__status" id="cart-order-status" role="status">
              Los pedidos por WhatsApp no están disponibles en este momento.
            </p>
          ) : null}

          {hasItems && WHATSAPP_IS_CONFIGURED && orderUrl ? (
            <a
              className="cart-drawer__whatsapp"
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar por WhatsApp
            </a>
          ) : (
            <button
              className="cart-drawer__whatsapp"
              type="button"
              disabled
              aria-describedby={hasItems ? 'cart-order-status' : undefined}
            >
              Solicitar por WhatsApp
            </button>
          )}

          {hasItems ? (
            <button className="cart-drawer__clear" type="button" onClick={clearCart}>
              Vaciar bolsa
            </button>
          ) : null}
        </footer>
      </div>
    </dialog>
  )
}

export default CartDrawer
