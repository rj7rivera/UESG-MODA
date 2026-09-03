import SocialHero from '../../components/SocialHero/SocialHero.jsx'
import SocialManifesto from '../../components/SocialManifesto/SocialManifesto.jsx'
import ImpactSection from '../../components/ImpactSection/ImpactSection.jsx'
import ResponsibleLegacy from '../../components/ResponsibleLegacy/ResponsibleLegacy.jsx'
import razonSocialContent from './razonSocialContent.js'
import './RazonSocial.css'

function RazonSocial() {
  return (
    <div className="razon-social-page">
      <SocialHero content={razonSocialContent.hero} />
      <SocialManifesto content={razonSocialContent.manifesto} />

      <section className="social-impacts" aria-labelledby="social-impacts-title">
        <h2 className="visually-hidden" id="social-impacts-title">
          Compromisos de UESG con los Objetivos de Desarrollo Sostenible
        </h2>
        {razonSocialContent.impacts.map((impact) => (
          <ImpactSection content={impact} key={impact.number} />
        ))}
      </section>

      <ResponsibleLegacy content={razonSocialContent.legacy} />
    </div>
  )
}

export default RazonSocial
