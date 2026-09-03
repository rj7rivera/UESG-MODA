import './ShopUniverseNav.css'

function ShopUniverseNav({ universes }) {
  return (
    <nav
      className="shop-universe-nav"
      id="shop-universes"
      aria-label="Universos de Tienda"
    >
      <p className="shop-universe-nav__intro">Explora las líneas UESG</p>
      <div className="shop-universe-nav__track">
        {universes.map((universe) => (
          <a
            className="shop-universe-nav__link"
            href={`#${universe.anchor}`}
            key={universe.anchor}
          >
            <span className="shop-universe-nav__number">{universe.number}</span>
            <span className="shop-universe-nav__name">{universe.name}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default ShopUniverseNav
