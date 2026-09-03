import { Link } from 'react-router-dom'
import './Footer.css'

const storeLinks = [
  { label: 'Nueva colección', to: '/tienda' },
  { label: 'Hombre', to: '/tienda' },
  { label: 'Mujer', to: '/tienda' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__community">
          <p className="site-footer__eyebrow">UESG / Ecuador</p>
          <h2>Únete a nuestra comunidad.</h2>
          <div className="site-footer__email">
            <label htmlFor="community-email">Tu correo</label>
            <input
              id="community-email"
              type="email"
              placeholder="nombre@correo.com"
              readOnly
              aria-describedby="community-note"
            />
            <span aria-hidden="true">→</span>
          </div>
          <p className="site-footer__note" id="community-note">
            Suscripción disponible próximamente.
          </p>
        </div>

        <div className="site-footer__links">
          <section aria-labelledby="footer-store">
            <h3 id="footer-store">Tienda</h3>
            <ul>
              {storeLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-help">
            <h3 id="footer-help">Ayuda</h3>
            <ul>
              <li><Link to="/contacto">Contacto</Link></li>
              <li>Envíos</li>
              <li>Cambios</li>
            </ul>
          </section>

          <section aria-labelledby="footer-social">
            <h3 id="footer-social">Síguenos</h3>
            <ul>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Facebook</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="site-footer__meta">
        <p>© 2026 UESG</p>
        <p>Ecuador</p>
      </div>

      <p className="site-footer__wordmark" aria-hidden="true">UESG</p>
    </footer>
  )
}

export default Footer
