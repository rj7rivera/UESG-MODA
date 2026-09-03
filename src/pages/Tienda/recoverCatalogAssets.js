import recoverDenim from '../../assets/IMAGENES/img/work-gallery/UESGRECOVER1COLECCION/1750443460546.webp'
import recoverBlueBlack from '../../assets/IMAGENES/img/work-gallery/UESGRECOVER1COLECCION/DSC01488.webp'
import recoverBlack from '../../assets/IMAGENES/img/work-gallery/UESGRECOVER1COLECCION/DSC01509.webp'

// Una imagen canónica por look. Las poses secundarias y el espejo de
// fancybox permanecen en el proyecto, pero no forman parte del catálogo.
export const recoverCatalogAssets = [
  {
    sourceKey: '1750443460546',
    src: recoverDenim,
    alt: 'Modelo con prendas de mezclilla reconstruidas frente a un local UESG',
    label: 'Look de mezclilla reconstruida',
    width: 1484,
    height: 2048,
    position: '50% 38%',
    fit: 'cover',
  },
  {
    sourceKey: 'DSC01488',
    src: recoverBlueBlack,
    alt: 'Modelo con prendas reconstruidas en tonos azul y negro',
    label: 'Look reconstruido azul y negro',
    width: 1638,
    height: 2048,
    position: '50% 32%',
    fit: 'cover',
  },
  {
    sourceKey: 'DSC01509',
    src: recoverBlack,
    alt: 'Modelo con prendas negras de construcción asimétrica',
    label: 'Look negro asimétrico',
    width: 1638,
    height: 2048,
    position: '50% 30%',
    fit: 'cover',
  },
]
