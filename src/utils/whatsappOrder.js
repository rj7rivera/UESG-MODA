// Composición y codificación del mensaje de pedido para WhatsApp.
// No incluye precios ni totales monetarios mientras no existan datos oficiales.
import {
  ORDER_DISCLAIMER,
  WHATSAPP_IS_CONFIGURED,
  WHATSAPP_NUMBER,
} from '../config/commerce.js'
import { getProductById } from '../data/productCatalog.js'

function describeVariant(product, variantId) {
  const variant = product.variants.find((entry) => entry.variantId === variantId)
  if (!variant || !variant.label) return null
  return variant.label
}

export function buildWhatsAppOrderMessage(items) {
  const lines = [
    'Hola UESG, quiero solicitar los siguientes artículos:',
    '',
  ]

  let position = 0

  items.forEach((item) => {
    const product = getProductById(item.productId)
    if (!product) return

    position += 1

    const parts = [`${position}. ${product.universeName}`]

    if (product.collectionName) parts.push(product.collectionName)
    if (product.productName) parts.push(product.productName)

    // Urban conserva su referencia neutral histórica. Los demás universos
    // omiten este campo porque no tienen una referencia comercial oficial.
    if (product.referenceCode) {
      parts.push(`Ref: ${product.referenceCode}`)
    }

    const variantLabel = describeVariant(product, item.variantId)
    if (variantLabel) parts.push(variantLabel)

    parts.push(`Cantidad: ${item.quantity}`)
    lines.push(parts.join(' · '))
  })

  lines.push('', ORDER_DISCLAIMER)

  return lines.join('\n')
}

export function buildWhatsAppOrderUrl(items) {
  if (!WHATSAPP_IS_CONFIGURED) return null

  const message = buildWhatsAppOrderMessage(items)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
