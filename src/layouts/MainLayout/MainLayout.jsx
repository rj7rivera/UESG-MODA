import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import PageLoader from '../../components/PageLoader/PageLoader.jsx'
import useCart from '../../hooks/useCart.js'
import { loadCartDrawer } from '../../routes/routeLoaders.js'
import { applySeoMetadata } from '../../seo/seo.js'
import './MainLayout.css'

const CartDrawer = lazy(loadCartDrawer)

function RouteFallback() {
  return (
    <div className="site-shell__route-fallback" role="status" aria-live="polite">
      Cargando página…
    </div>
  )
}

function MainLayout() {
  const location = useLocation()
  const { isOpen: isCartOpen } = useCart()
  const mainRef = useRef(null)
  const [loadedLocationKey, setLoadedLocationKey] = useState(null)
  const hasOverlayHeader =
    location.pathname === '/' ||
    location.pathname === '/nosotros' ||
    location.pathname === '/razon-social' ||
    location.pathname === '/tienda'
  const isLoading = loadedLocationKey !== location.key

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    void applySeoMetadata(location.pathname)
  }, [location.hash, location.pathname])

  function handleLoaderComplete() {
    setLoadedLocationKey(location.key)
    window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true })

      if (location.hash) {
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    })
  }

  return (
    <div className="site-shell">
      <PageLoader key={location.key} onComplete={handleLoaderComplete} />
      <div
        className="site-shell__content"
        inert={isLoading ? '' : undefined}
        aria-hidden={isLoading ? 'true' : undefined}
      >
        <a className="site-shell__skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <Header key={location.pathname} transparentAtTop={hasOverlayHeader} />
        <main
          className="site-shell__main"
          id="main-content"
          ref={mainRef}
          tabIndex="-1"
        >
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
      {isCartOpen ? (
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      ) : null}
    </div>
  )
}

export default MainLayout
