import { createContext, useEffect, useMemo, useReducer } from 'react'
import { cartReducer, initialCartState } from '../cart/cartReducer.js'
import { loadCartItems, saveCartItems } from '../cart/cartStorage.js'

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null)

function init(state) {
  return { ...state, items: loadCartItems() }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, init)

  useEffect(() => {
    saveCartItems(state.items)
  }, [state.items])

  // El catálogo completo se descarga solo cuando la bolsa se usa. Las bolsas
  // persistidas se validan entonces sin arrastrar Tienda al bundle inicial.
  useEffect(() => {
    if (!state.isOpen || state.items.length === 0) return undefined

    let ignore = false

    import('../data/productCatalog.js').then(({ isValidProduct }) => {
      if (ignore) return
      const items = state.items.filter((item) =>
        isValidProduct(item.productId, item.variantId),
      )
      if (items.length !== state.items.length) {
        dispatch({ type: 'HYDRATE', payload: { items } })
      }
    })

    return () => {
      ignore = true
    }
  }, [state.isOpen, state.items])

  // Bloquea el scroll del body mientras la bolsa está abierta.
  useEffect(() => {
    if (!state.isOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [state.isOpen])

  const value = useMemo(() => {
    const cartCount = state.items.reduce((total, item) => total + item.quantity, 0)

    return {
      items: state.items,
      isOpen: state.isOpen,
      cartCount,
      addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
      removeItem: (key) => dispatch({ type: 'REMOVE_ITEM', payload: { key } }),
      increaseQuantity: (key) => dispatch({ type: 'INCREASE_QUANTITY', payload: { key } }),
      decreaseQuantity: (key) => dispatch({ type: 'DECREASE_QUANTITY', payload: { key } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    }
  }, [state.items, state.isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
