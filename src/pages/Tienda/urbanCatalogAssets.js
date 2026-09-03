import urbanOpeningImage from '../../assets/IMAGENES/img/optimized/urban-opening.webp'
import raicesPairImage from '../../assets/IMAGENES/img/work-gallery/uesgurbanraices/uesgurbanraicescoleccion2/coleccion2-hombre17.jpg'

const vitalityModules = import.meta.glob(
  '../../assets/IMAGENES/img/tienda/editorial/urban/vitality-*.jpg',
  { eager: true, query: '?url', import: 'default' },
)

const raicesModules = import.meta.glob(
  '../../assets/IMAGENES/img/tienda/editorial/urban/raices-*.jpg',
  { eager: true, query: '?url', import: 'default' },
)

const lifeModules = import.meta.glob(
  '../../assets/IMAGENES/img/tienda/editorial/urban/life-*.jpg',
  { eager: true, query: '?url', import: 'default' },
)

const dtfModules = import.meta.glob(
  '../../assets/IMAGENES/img/dtf/*.png',
  { eager: true, query: '?url', import: 'default' },
)

function getFileName(path) {
  return path.split('/').at(-1)
}

function orderedRecords(modules, priority, options = {}) {
  const priorityIndex = new Map(priority.map((name, index) => [name, index]))

  return Object.entries(modules)
    .sort(([pathA], [pathB]) => {
      const nameA = getFileName(pathA)
      const nameB = getFileName(pathB)
      const rankA = priorityIndex.get(nameA) ?? priority.length
      const rankB = priorityIndex.get(nameB) ?? priority.length

      return rankA - rankB || nameA.localeCompare(nameB, 'es', { numeric: true })
    })
    .map(([path, src]) => {
      const name = getFileName(path)

      return {
        src,
        alt: options.altOverrides?.[name] || null,
        width: 4,
        height: 5,
        position: options.positionOverrides?.[name] || '50% 50%',
        fit: typeof options.fit === 'function'
          ? options.fit(name)
          : options.fit || 'cover',
      }
    })
}

function withNeutralAlts(images, label) {
  return images.map((image, index) => ({
    ...image,
    alt: image.alt || `${label} ${String(index + 1).padStart(2, '0')}`,
  }))
}

const vitalityRecords = orderedRecords(
  vitalityModules,
  ['vitality-wings.jpg', 'vitality-motion.jpg', 'vitality-pair.jpg', 'vitality-mural.jpg'],
  {
    altOverrides: {
      'vitality-wings.jpg': 'Joven con camiseta y shorts UESG frente a un mural de alas rojas y blancas',
      'vitality-motion.jpg': 'Mujer con camiseta negra y pantalón UESG en movimiento junto a un mural urbano',
      'vitality-pair.jpg': 'Dos modelos con conjuntos turquesa y blanco UESG en una plaza',
      'vitality-mural.jpg': 'Modelo con camiseta negra y shorts blancos UESG frente a un mural',
    },
  },
)

vitalityRecords.splice(4, 0, {
  src: urbanOpeningImage,
  alt: 'Modelo UESG con camiseta y pantalón negro en un entorno urbano',
  width: 4,
  height: 5,
  position: '64% 38%',
  fit: 'cover',
})

const raicesRecords = orderedRecords(
  raicesModules,
  ['raices-motorcycle.jpg', 'raices-track.jpg', 'raices-hoodie.jpg'],
  {
    altOverrides: {
      'raices-motorcycle.jpg': 'Modelo con camiseta negra UESG sentado sobre una motocicleta',
      'raices-track.jpg': 'Joven con conjunto negro UESG posando con capucha en una pista',
      'raices-hoodie.jpg': 'Mujer con sudadera verde claro UESG posando junto a una escalera exterior',
    },
  },
)

raicesRecords.unshift({
  src: raicesPairImage,
  alt: 'Mujer y hombre con chaquetas universitarias granate y blanco frente a una malla',
  width: 4,
  height: 5,
  position: '50% 50%',
  fit: 'cover',
})

const EXCLUDED_LIFE_ASSETS = new Set(['life-editorial.jpg'])

const lifeModulesFiltered = Object.fromEntries(
  Object.entries(lifeModules).filter(
    ([path]) => !EXCLUDED_LIFE_ASSETS.has(getFileName(path)),
  ),
)

const lifeRecords = orderedRecords(
  lifeModulesFiltered,
  ['life-burgundy.jpg', 'life-hoodie.jpg', 'life-pants.jpg'],
  {
    altOverrides: {
      'life-burgundy.jpg': 'Presentación frontal y posterior de una camiseta granate con gráficos UESG',
      'life-hoodie.jpg': 'Presentación frontal y posterior de una sudadera gris con mangas azules y gráfico verde',
      'life-pants.jpg': 'Presentación de un pantalón azul convertible en shorts',
    },
    fit: 'contain',
  },
)

const dtfRecords = orderedRecords(
  dtfModules,
  ['2.png', '14.png', '21.png', '3.png'],
  {
    altOverrides: {
      '2.png': 'Diseño gráfico de un jugador de baloncesto formado por llamas naranjas',
      '14.png': 'Diseño gráfico de un busto clásico con ojos magenta y detalles verdes',
      '21.png': 'Diseño gráfico floral con flores de varios colores',
      '3.png': 'Diseño gráfico de un personaje con audífonos sobre una patineta',
    },
    fit: 'contain',
  },
)

export const urbanCatalogAssets = {
  vitality: withNeutralAlts(vitalityRecords, 'Registro visual de Vitality Vogue'),
  raices: withNeutralAlts(raicesRecords, 'Registro visual de Raíces'),
  life: withNeutralAlts(lifeRecords, 'Recurso visual seleccionado para Life Is Like You Want'),
  dtf: withNeutralAlts(dtfRecords, 'Diseño gráfico del archivo DTF'),
}
