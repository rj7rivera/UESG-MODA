import capsulePolo from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino7.png'
import capsuleGraphicBack from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino6.webp'
import capsuleGreyTee from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino4.webp'
import capsuleVarsity from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino3.webp'
import capsuleEmblem from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino2.webp'
import capsuleSkull from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-nino.webp'
import capsuleHoodedDress from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-mujer2.webp'
import capsuleRedDress from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-mujer.png'
import capsuleYellowHoodie from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-hombre4_2.webp'
import capsuleBlueJacket from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/capsula1Capsula-hombre5.webp'

const CAPSULE_WIDTH = 464
const CAPSULE_HEIGHT = 474

function capsule(sourceKey, src, alt, label, position = '50% 35%') {
  return {
    sourceKey,
    src,
    alt,
    label,
    width: CAPSULE_WIDTH,
    height: CAPSULE_HEIGHT,
    position,
    fit: 'cover',
  }
}

// Curación conservadora: una representación por prenda visual dominante.
// No se importa la carpeta fancybox ni la fotografía grupal.
export const capsulasCatalogAssets = [
  capsule(
    'coleccion1Capsula-nino7',
    capsulePolo,
    'Modelo con polo azul oscuro y ribetes verde claro',
    'Polo azul oscuro con ribetes verde claro',
  ),
  capsule(
    'coleccion1Capsula-nino6',
    capsuleGraphicBack,
    'Vista posterior de camiseta blanca con gráfico rojo y gris',
    'Camiseta blanca con gráfico posterior',
  ),
  capsule(
    'coleccion1Capsula-nino4',
    capsuleGreyTee,
    'Modelo con camiseta gris de texto gráfico repetido',
    'Camiseta gris con texto gráfico',
  ),
  capsule(
    'coleccion1Capsula-nino3',
    capsuleVarsity,
    'Modelo con chaqueta universitaria negra, roja y blanca',
    'Chaqueta universitaria negra, roja y blanca',
  ),
  capsule(
    'coleccion1Capsula-nino2',
    capsuleEmblem,
    'Modelo con camiseta blanca de emblema multicolor',
    'Camiseta blanca con emblema multicolor',
  ),
  capsule(
    'coleccion1Capsula-nino',
    capsuleSkull,
    'Modelo con camiseta negra sin mangas y gráfico de calavera',
    'Camiseta negra sin mangas con gráfico',
  ),
  capsule(
    'coleccion1Capsula-mujer2',
    capsuleHoodedDress,
    'Modelo con vestido negro con capucha y número frontal',
    'Vestido negro con capucha',
  ),
  capsule(
    'coleccion1Capsula-mujer',
    capsuleRedDress,
    'Modelo con vestido rojo y detalles blancos',
    'Vestido rojo con detalles blancos',
  ),
  capsule(
    'coleccion1Capsula-hombre4-2',
    capsuleYellowHoodie,
    'Modelo con sudadera amarilla y negra con capucha',
    'Sudadera amarilla y negra con capucha',
  ),
  capsule(
    'capsula1Capsula-hombre5',
    capsuleBlueJacket,
    'Modelo con chaqueta de capucha blanca y azul oscuro',
    'Chaqueta con capucha blanca y azul oscuro',
  ),
]
