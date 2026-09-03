import AboutHero from '../../components/AboutHero/AboutHero.jsx'
import AboutOverview from '../../components/AboutOverview/AboutOverview.jsx'
import BrandPurpose from '../../components/BrandPurpose/BrandPurpose.jsx'
import BrandEssence from '../../components/BrandEssence/BrandEssence.jsx'
import GrowthSection from '../../components/GrowthSection/GrowthSection.jsx'
import nosotrosContent from './nosotrosContent.js'
import './Nosotros.css'

function Nosotros() {
  return (
    <div className="nosotros-page">
      <AboutHero content={nosotrosContent.hero} />
      <AboutOverview content={nosotrosContent.overview} />
      <BrandPurpose content={nosotrosContent.purpose} />
      <BrandEssence content={nosotrosContent.essence} />
      <GrowthSection content={nosotrosContent.growth} />
    </div>
  )
}

export default Nosotros
