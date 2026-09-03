// Catálogo comercial derivado del contenido editorial de la tienda.
//
// IMPORTANTE: mientras UESG no entregue metadata oficial (nombre, tallas,
// colores, precio, stock), cada card se trata como UN producto solicitable.
//
// Urban conserva sus REFERENCIAS NEUTRALES históricas (UESG-UR-XX-###)
// porque ya existen bolsas persistidas en localStorage que dependen de ellas.
// NO deben cambiar.
//
// Sports, Recover y Cápsulas NO tienen referencia comercial confirmada:
// `referenceCode` es null y el código de fotografía permanece interno.
import tiendaContent from '../pages/Tienda/tiendaContent.js'

// Prefijos de referencia por colección Urban.
const COLLECTION_REFS = {
  'vitality-vogue': 'VV',
  raices: 'RA',
  'life-is-like-you-want': 'LI',
  dtf: 'DT',
}

function buildUrbanReference(collectionId, index) {
  const code = COLLECTION_REFS[collectionId] || 'XX'
  const position = String(index + 1).padStart(3, '0')
  return `UESG-UR-${code}-${position}`
}

function buildUrbanProducts() {
  const products = []

  for (const collection of tiendaContent.urban.collections) {
    collection.images.forEach((image, index) => {
      const referenceCode = buildUrbanReference(collection.id, index)

      products.push({
        // id histórico: se mantiene idéntico para no invalidar bolsas guardadas.
        id: referenceCode,
        referenceCode,
        universeId: 'urban',
        universeName: 'UESG Urban',
        collectionId: collection.id,
        collectionName: collection.title,
        // Nombre real pendiente de datos oficiales.
        productName: null,
        image: {
          src: image.src,
          alt: image.alt,
        },
        // Sin variantes reales todavía: una variante 'default'.
        variants: [{ variantId: 'default', label: null }],
        // Precio pendiente de datos oficiales.
        price: null,
        purchasable: true,
      })
    })
  }

  return products
}

export function makeEditorialProductId(universeId, collectionId, sourceKey) {
  return `${universeId}:${collectionId}:${sourceKey}`
}

function buildEditorialProducts() {
  const products = []
  const universes = [
    tiendaContent.sports,
    tiendaContent.recover,
    tiendaContent.capsulas,
  ]

  for (const universe of universes) {
    for (const collection of universe.collections) {
      for (const image of collection.images) {
        products.push({
          // El formato de Sports se conserva exactamente para no invalidar
          // bolsas existentes. Los nuevos universos adoptan la misma regla.
          id: makeEditorialProductId(universe.id, collection.id, image.sourceKey),
          referenceCode: null,
          internalCode: image.sourceKey,
          universeId: universe.id,
          universeName: universe.name,
          collectionId: collection.id,
          collectionName: collection.title,
          // Identificación visual neutra, no es un nombre comercial.
          productName: image.label,
          image: {
            src: image.src,
            alt: image.alt,
          },
          variants: [{ variantId: 'default', label: null }],
          price: null,
          purchasable: true,
        })
      }
    }
  }

  return products
}

function buildProducts() {
  const products = [...buildUrbanProducts(), ...buildEditorialProducts()]
  const seen = new Set()

  for (const product of products) {
    if (seen.has(product.id)) {
      throw new Error(`[productCatalog] id duplicado: ${product.id}`)
    }
    seen.add(product.id)
  }

  return products
}

export const productCatalog = buildProducts()

const productIndex = new Map(productCatalog.map((product) => [product.id, product]))

export function getProductById(productId) {
  return productIndex.get(productId) || null
}

// Permite a las cards Urban obtener su producto usando (collectionId, index),
// que es exactamente como se renderizan, sin depender de filenames.
export function getProductByPosition(collectionId, index) {
  return getProductById(buildUrbanReference(collectionId, index))
}

export function isValidProduct(productId, variantId = 'default') {
  const product = productIndex.get(productId)
  if (!product || !product.purchasable) return false
  return product.variants.some((variant) => variant.variantId === variantId)
}

// Título comercial visible de una línea: la colección cuando tiene nombre
// oficial (Urban) o el universo cuando todavía no lo tiene (Sports).
export function getProductHeading(product) {
  return product.collectionName || product.universeName
}

// Identificación corta y accesible del producto. Nunca inventa referencias:
// usa la etiqueta visual, la referencia neutral o el código interno.
export function describeProduct(product) {
  return (
    product.productName ||
    product.referenceCode ||
    product.internalCode ||
    getProductHeading(product)
  )
}
