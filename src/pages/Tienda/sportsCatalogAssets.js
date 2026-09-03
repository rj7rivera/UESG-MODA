// Assets canónicos de UESG Sports.
//
// DECISIONES DOCUMENTADAS (BUILD 3):
//
// 1. Fuente única: work-gallery/uesgsportscoleccion1.
//    La carpeta fancybox/uesgsportscoleccion1 es un espejo byte a byte
//    (14 archivos idénticos) y NO se importa para no duplicar el bundle.
//
// 2. Prendas patrocinadas fuera del catálogo comercial en esta fase.
//    DSC01440 (1), DSC01443, DSC01447, DSC01450, DSC01453 (OCT FC) y
//    DSC01494, DSC01496, DSC01500, DSC01501 ("Super 9") muestran marcas,
//    clubes y patrocinadores de terceros. Permanecen en el proyecto pero
//    no se venden hasta confirmación expresa de UESG.
//
// 3. imagen_redimensionada_464x474.jpg e imagen_redimensionada2_464x474.jpg
//    son recortes de 464x474 derivados de fotografías patrocinadas.
//    Descartados por resolución y por pertenecer al grupo excluido.
//
// 4. Las tres camisetas lisas comparten diseño y cambian de color, pero el
//    proyecto NO aporta evidencia de que sean variantes oficiales de un
//    mismo producto (sin tallas, colorways ni SKUs). Se representan de
//    forma conservadora como tres productos independientes con la variante
//    'default', igual que Urban.
//
// 5. `label` es una identificación VISUAL neutra, no una referencia
//    comercial. `sourceKey` es el identificador técnico estable usado para
//    construir el productId; no depende de la posición visual.
import sportsBlue from '../../assets/IMAGENES/img/work-gallery/uesgsportscoleccion1/DSC01524.webp'
import sportsDark from '../../assets/IMAGENES/img/work-gallery/uesgsportscoleccion1/DSC01530.webp'
import sportsLight from '../../assets/IMAGENES/img/work-gallery/uesgsportscoleccion1/DSC01537.webp'

const collectionOne = [
  {
    sourceKey: 'DSC01524',
    src: sportsBlue,
    alt: 'Modelo con camiseta deportiva UESG azul y pantalón deportivo',
    label: 'Camiseta deportiva azul',
    width: 1638,
    height: 2048,
    position: '50% 30%',
    fit: 'cover',
  },
  {
    sourceKey: 'DSC01530',
    src: sportsDark,
    alt: 'Modelo con camiseta deportiva UESG oscura y pantalón deportivo',
    label: 'Camiseta deportiva oscura',
    width: 1638,
    height: 2047,
    position: '50% 30%',
    fit: 'cover',
  },
  {
    sourceKey: 'DSC01537',
    src: sportsLight,
    alt: 'Modelo con camiseta deportiva UESG clara y pantalón deportivo',
    label: 'Camiseta deportiva clara',
    width: 1638,
    height: 2048,
    position: '50% 30%',
    fit: 'cover',
  },
]

export const sportsCatalogAssets = {
  collectionOne,
}

export default sportsCatalogAssets
