import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useCart from '../../hooks/useCart.js'
import logo from '../../assets/IMAGENES/img/optimized/logo-header.webp'
import {
  loadBlog,
  loadContacto,
  loadHome,
  loadNosotros,
  loadRazonSocial,
  loadTienda,
  loadCartDrawer,
} from '../../routes/routeLoaders.js'
import './Header.css'

const navigation = [
  { label: 'Inicio', to: '/', preload: loadHome },
  { label: 'Nosotros', to: '/nosotros', preload: loadNosotros },
  { label: 'Razón Social', to: '/razon-social', preload: loadRazonSocial },
  { label: 'Tienda', to: '/tienda', preload: loadTienda },
  { label: 'Blog', to: '/blog', preload: loadBlog },
  { label: 'Contacto', to: '/contacto', preload: loadContacto },
]

function Header({ transparentAtTop = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 24)
  const { cartCount, openCart } = useCart()
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const isOverlay = transparentAtTop && !isScrolled && !isMenuOpen

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const navLinks = [...headerRef.current.querySelectorAll('.site-header__nav-link')]
    const focusableElements = [menuButtonRef.current, ...navLinks]
    navLinks[0]?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const currentIndex = focusableElements.indexOf(document.activeElement)
      const nextIndex = event.shiftKey
        ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
        : (currentIndex + 1) % focusableElements.length

      event.preventDefault()
      focusableElements[nextIndex].focus()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header
      className={`site-header${isOverlay ? ' site-header--overlay' : ''}`}
      ref={headerRef}
    >
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="UESG, ir al inicio">
          <img src={logo} alt="" width="256" height="256" />
        </Link>

        <nav
          className={`site-header__nav${isMenuOpen ? ' site-header__nav--open' : ''}`}
          id="main-navigation"
          aria-label="Navegación principal"
        >
          <ul className="site-header__nav-list">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `site-header__nav-link${isActive ? ' site-header__nav-link--active' : ''}`
                  }
                  end={item.to === '/'}
                  to={item.to}
                  onPointerEnter={item.preload}
                  onFocus={item.preload}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            className="site-header__bag"
            type="button"
            aria-label={`Abrir bolsa, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}`}
            onPointerEnter={loadCartDrawer}
            onFocus={loadCartDrawer}
            onClick={() => {
              setIsMenuOpen(false)
              openCart()
            }}
          >
            <span>Bolsa</span>
            <span aria-hidden="true">({cartCount})</span>
          </button>
          <button
            className="site-header__menu-button"
            ref={menuButtonRef}
            type="button"
            aria-controls="main-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <button
          className="site-header__scrim"
          type="button"
          tabIndex="-1"
          aria-label="Cerrar menú"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}
    </header>
  )
}

export default Header
