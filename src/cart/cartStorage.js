// Persistencia versionada de la bolsa en localStorage.
// Solo se guardan referencias mínimas (productId, variantId, quantity),
// nunca imágenes, precios ni datos personales.
import { makeLineKey, MAX_QUANTITY_PER_LINE } from './cartReducer.js'

const STORAGE_KEY = 'uesg:cart:v1'
const STORAGE_VERSION = 1

export function loadCartItems(isValidProduct) {
  if (typeof window === 'undefined') return []

  let raw
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return []
  }
  if (!raw) return []

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }

  if (!parsed || parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.items)) {
    return []
  }

  const seen = new Set()
  const items = []

  for (const entry of parsed.items) {
    if (!entry || typeof entry.productId !== 'string') continue

    const variantId =
      typeof entry.variantId === 'string' && entry.variantId ? entry.variantId : 'default'

    if (typeof isValidProduct === 'function' && !isValidProduct(entry.productId, variantId)) {
      continue
    }

    const quantity = Math.trunc(Number(entry.quantity))
    if (!Number.isFinite(quantity) || quantity < 1) continue

    const key = makeLineKey(entry.productId, variantId)
    if (seen.has(key)) continue
    seen.add(key)

    items.push({
      key,
      productId: entry.productId,
      variantId,
      quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE),
    })
  }

  return items
}

export function saveCartItems(items) {
  if (typeof window === 'undefined') return

  const payload = {
    version: STORAGE_VERSION,
    items: items.map(({ productId, variantId, quantity }) => ({
      productId,
      variantId,
      quantity,
    })),
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Almacenamiento no disponible: la bolsa sigue funcionando en memoria.
  }
}
