import heroImage from '../../assets/IMAGENES/img/optimized/shop-hero.webp'
import { capsulasCatalogAssets } from './capsulasCatalogAssets.js'
import { recoverCatalogAssets } from './recoverCatalogAssets.js'
import { urbanCatalogAssets } from './urbanCatalogAssets.js'
import { sportsCatalogAssets } from './sportsCatalogAssets.js'

const tiendaContent = {
  hero: {
    eyebrow: 'UESG / Tienda',
    title: 'Cuatro universos. Una misma identidad.',
    text: 'Urban. Sports. Recover. Cápsulas. Distintas formas de vestir una misma actitud.',
    image: heroImage,
    alt: 'Grupo de modelos vistiendo diferentes líneas de ropa UESG en unas gradas',
    width: 1920,
    height: 1279,
    position: '50% 48%',
    mobilePosition: '50% 50%',
  },
  universes: [
    {
      number: '01',
      name: 'UESG Urban',
      anchor: 'urban',
    },
    {
      number: '02',
      name: 'UESG Sports',
      anchor: 'sports',
    },
    {
      number: '03',
      name: 'UESG Recover',
      anchor: 'recover',
    },
    {
      number: '04',
      name: 'Cápsulas',
      anchor: 'capsulas',
    },
  ],
  urban: {
    openingAlign: 'start',
    eyebrow: '01 / UESG Urban',
    title: 'La calle también tiene lenguaje.',
    text: 'UESG Urban reúne colecciones construidas desde la identidad, la actitud y una mirada contemporánea de la moda urbana.',
    collections: [
      {
        id: 'vitality-vogue',
        number: '01',
        eyebrow: '01 / Colección',
        title: 'Vitality Vogue',
        text: 'Energía, movimiento y una actitud urbana que convierte cada look en una declaración.',
        variant: 'vitality',
        images: urbanCatalogAssets.vitality,
      },
      {
        id: 'raices',
        number: '02',
        eyebrow: '02 / Colección',
        title: 'Raíces',
        text: 'Identidad y esencia cultural llevadas a una propuesta urbana que conecta origen, actitud y expresión.',
        variant: 'raices',
        images: urbanCatalogAssets.raices,
      },
      {
        id: 'life-is-like-you-want',
        number: '03',
        eyebrow: '03 / Colección',
        title: 'Life Is Like You Want',
        text: 'Una declaración visual construida desde la libertad de vestir, combinar y llevar la identidad UESG a tu manera.',
        variant: 'life',
        images: urbanCatalogAssets.life,
      },
      {
        id: 'dtf',
        number: '04',
        eyebrow: '04 / Lenguaje gráfico',
        title: 'DTF',
        text: 'Gráfica, color y expresión convertidos en parte de la prenda.',
        variant: 'dtf',
        images: urbanCatalogAssets.dtf,
      },
    ],
  },
  // UESG Sports.
  // No existe nombre comercial oficial para la colección: el universo se
  // presenta como "UESG Sports" y la colección conserva sólo un id técnico.
  // Al haber una única colección confirmada no se muestra índice interno.
  sports: {
    id: 'sports',
    number: '02',
    name: 'UESG Sports',
    anchor: 'sports',
    openingAlign: 'end',
    eyebrow: '02 / UESG Sports',
    title: 'El rendimiento también se viste.',
    text: 'UESG Sports traduce el movimiento en prendas pensadas para entrenar, competir y sostener el ritmo sin renunciar a la identidad de la marca.',
    collections: [
      {
        id: 'sports-coleccion-1',
        title: null,
        images: sportsCatalogAssets.collectionOne,
      },
    ],
  },
  recover: {
    id: 'recover',
    number: '03',
    name: 'UESG Recover',
    anchor: 'recover',
    openingAlign: 'start',
    eyebrow: '03 / UESG Recover',
    title: 'Reconstruir también es crear.',
    text: 'UESG Recover presenta una mirada de reconstrucción donde cortes, combinaciones y nuevas formas transforman la manera de vestir.',
    collections: [
      {
        id: 'recover-coleccion-1',
        title: null,
        images: recoverCatalogAssets,
      },
    ],
  },
  capsulas: {
    id: 'capsulas',
    number: '04',
    name: 'Cápsulas',
    anchor: 'capsulas',
    openingAlign: 'end',
    eyebrow: '04 / Cápsulas',
    title: 'Ideas fuera de serie.',
    text: 'Cápsulas reúne expresiones puntuales de UESG: siluetas, gráficos y contrastes que amplían el lenguaje visual de la marca.',
    collections: [
      {
        id: 'capsulas-coleccion-1',
        title: null,
        images: capsulasCatalogAssets,
      },
    ],
  },
}

export default tiendaContent
