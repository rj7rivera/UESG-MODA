import ShopHero from '../../components/ShopHero/ShopHero.jsx'
import ShopEditorialUniverse from '../../components/ShopEditorialUniverse/ShopEditorialUniverse.jsx'
import ShopUniverseOpening from '../../components/ShopUniverseOpening/ShopUniverseOpening.jsx'
import ShopUniverseNav from '../../components/ShopUniverseNav/ShopUniverseNav.jsx'
import UrbanCollections from '../../components/UrbanCollections/UrbanCollections.jsx'
import useReveal from '../../hooks/useReveal.js'
import tiendaContent from './tiendaContent.js'
import './Tienda.css'

const EDITORIAL_UNIVERSES = ['sports', 'recover', 'capsulas']

function Tienda() {
  const { elementRef, isVisible } = useReveal()

  return (
    <div className="tienda-page">
      <ShopHero content={tiendaContent.hero} />
      <ShopUniverseNav universes={tiendaContent.universes} />

      <section
        className={`shop-universe-chapter shop-universe-chapter--urban tienda-reveal${isVisible ? ' is-visible' : ''}`}
        id="urban"
        ref={elementRef}
        aria-labelledby="shop-urban-title"
      >
        <ShopUniverseOpening
          content={tiendaContent.urban}
          titleId="shop-urban-title"
        />
      </section>

      <UrbanCollections collections={tiendaContent.urban.collections} />

      {EDITORIAL_UNIVERSES.map((universeId) => (
        <ShopEditorialUniverse
          content={tiendaContent[universeId]}
          key={universeId}
        />
      ))}
    </div>
  )
}

export default Tienda
