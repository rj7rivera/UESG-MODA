// Reducer puro de la bolsa. No accede a localStorage ni al DOM.
// Cada línea se identifica por productId + variantId.

export const MAX_QUANTITY_PER_LINE = 99

export function makeLineKey(productId, variantId = 'default') {
  return `${productId}::${variantId}`
}

function normalizeQuantity(value) {
  const quantity = Math.trunc(Number(value))
  if (!Number.isFinite(quantity) || quantity < 1) return 1
  return Math.min(quantity, MAX_QUANTITY_PER_LINE)
}

export const initialCartState = {
  items: [],
  isOpen: false,
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, variantId = 'default' } = action.payload
      if (!productId) return state

      const quantity = normalizeQuantity(action.payload.quantity ?? 1)
      const key = makeLineKey(productId, variantId)
      const existing = state.items.find((item) => item.key === key)

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.key === key
              ? {
                  ...item,
                  quantity: normalizeQuantity(item.quantity + quantity),
                }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          { key, productId, variantId, quantity },
        ],
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.key !== action.payload.key),
      }
    }

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === action.payload.key
            ? { ...item, quantity: normalizeQuantity(item.quantity + 1) }
            : item,
        ),
      }
    }

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.key === action.payload.key
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity >= 1),
      }
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] }
    }

    case 'OPEN_CART': {
      return { ...state, isOpen: true }
    }

    case 'CLOSE_CART': {
      return { ...state, isOpen: false }
    }

    case 'HYDRATE': {
      return { ...state, items: action.payload.items }
    }

    default:
      return state
  }
}
