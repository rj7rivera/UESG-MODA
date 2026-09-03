import urbanImage from '../../assets/IMAGENES/img/optimized/urban-opening.webp'
import sportsImage from '../../assets/IMAGENES/img/work-gallery/uesgsportscoleccion1/DSC01530.webp'
import recoverImage from '../../assets/IMAGENES/img/work-gallery/UESGRECOVER1COLECCION/DSC01488.webp'
import capsulasImage from '../../assets/IMAGENES/img/work-gallery/uesgurbancapsula/coleccion1uesgurban/coleccion1Capsula-mujer.png'
import brandImage from '../../assets/IMAGENES/img/optimized/p.webp'
import purposeImage from '../../assets/IMAGENES/img/blog/optimized/street-art.webp'
import invitationImage from '../../assets/IMAGENES/img/optimized/shop-hero.webp'

// Contenido editorial de la portada.
//
// Todos los textos provienen de material ya publicado en Nosotros, Razón
// Social y Tienda: la portada resume, no inventa información nueva.
// Las dimensiones declaradas corresponden a los archivos reales para evitar
// desplazamientos de layout durante la carga.
const homeContent = {
  manifesto: {
    number: '01',
    eyebrow: 'UESG / Manifiesto',
    title: 'No vendemos ropa. Construimos identidad.',
    text: 'UESG nace para transformar la forma de vivir la moda. Diseñamos prendas con carácter y una visión propia, combinando exclusividad, estilo urbano y propósito. Cada colección expresa algo más que una tendencia: una forma auténtica de vestir y destacar.',
    signature: 'Life is like you want it',
  },
  universes: {
    number: '02',
    eyebrow: 'UESG / Universos',
    title: 'Cuatro universos. Una misma identidad.',
    text: 'Urban, Sports, Recover y Cápsulas: distintas formas de vestir una misma actitud.',
    linkLabel: 'Ver la tienda completa',
    items: [
      {
        id: 'urban',
        number: '01',
        name: 'UESG Urban',
        text: 'La calle también tiene lenguaje.',
        to: '/tienda#urban',
        image: urbanImage,
        alt: 'Modelos con prendas de la línea UESG Urban',
        width: 1400,
        height: 2100,
        position: '50% 35%',
      },
      {
        id: 'sports',
        number: '02',
        name: 'UESG Sports',
        text: 'El rendimiento también se viste.',
        to: '/tienda#sports',
        image: sportsImage,
        alt: 'Modelo con camiseta y pantalón deportivo UESG',
        width: 1638,
        height: 2047,
        position: '50% 30%',
      },
      {
        id: 'recover',
        number: '03',
        name: 'UESG Recover',
        text: 'Reconstruir también es crear.',
        to: '/tienda#recover',
        image: recoverImage,
        alt: 'Modelo con prendas reconstruidas en tonos azul y negro',
        width: 1638,
        height: 2048,
        position: '50% 32%',
      },
      {
        id: 'capsulas',
        number: '04',
        name: 'Cápsulas',
        text: 'Ediciones limitadas con lenguaje propio.',
        to: '/tienda#capsulas',
        image: capsulasImage,
        alt: 'Prenda de una cápsula UESG sobre fondo neutro',
        width: 464,
        height: 474,
        position: '50% 35%',
      },
    ],
  },
  brand: {
    number: '03',
    eyebrow: 'UESG / Nosotros',
    title: 'No seguimos tendencias. Creamos identidad.',
    text: 'Somos lo que queremos ser. Nuestra marca transmite lo que somos, individual y colectivamente, y nuestra esencia es el servicio a los demás y el valor que acogen las personas cuando eligen nuestras prendas.',
    to: '/nosotros',
    linkLabel: 'Conocer la marca',
    image: brandImage,
    alt: 'Comunidad UESG reunida con prendas de distintas colecciones',
    width: 1920,
    height: 1280,
    position: '50% 45%',
  },
  purpose: {
    number: '04',
    eyebrow: 'UESG / Razón Social',
    title: 'Una marca con propósito.',
    text: 'A través de la marca impulsamos un proyecto social orientado a generar oportunidades para la juventud mediante la educación, la cultura y el arte que transforma nuestra comunidad.',
    to: '/razon-social',
    linkLabel: 'Ver nuestro compromiso',
    image: purposeImage,
    alt: 'Mural participante del concurso UESG Street Art',
    width: 2000,
    height: 1333,
    position: '50% 48%',
  },
  journal: {
    number: '05',
    eyebrow: 'UESG / Blog',
    title: 'Lo que está pasando.',
    to: '/blog',
    linkLabel: 'Ver todas las publicaciones',
  },
  invitation: {
    number: '06',
    eyebrow: 'UESG / Contacto',
    title: 'Own your style.',
    text: 'Escríbenos y construyamos juntos tu próxima manera de vestir.',
    to: '/contacto',
    linkLabel: 'Hablemos',
    image: invitationImage,
    alt: 'Grupo de modelos vistiendo diferentes líneas de ropa UESG en unas gradas',
    width: 1920,
    height: 1279,
    position: '50% 48%',
  },
}

export default homeContent
