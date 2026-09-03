import heroImage from '../../assets/IMAGENES/img/optimized/social-hero.webp'
import manifestoImage from '../../assets/IMAGENES/img/optimized/social-manifesto.webp'
import legacyImage from '../../assets/IMAGENES/img/optimized/social-legacy.webp'
import workImage from '../../assets/IMAGENES/img/work-gallery/blog/FASHION TRUCK/Imagen de WhatsApp 2025-10-27 a las 15.22.52_af765a98.jpg'
import innovationImage from '../../assets/IMAGENES/img/blog/blog9nueva.jpeg'
import responsibilityImage from '../../assets/IMAGENES/img/work-gallery/UESGRECOVER1COLECCION/1750445787755.webp'
import alliancesImage from '../../assets/IMAGENES/img/work-gallery/blog/blog16nueva.jpg'

const razonSocialContent = {
  hero: {
    eyebrow: 'Razón Social — 01',
    title: 'Moda con propósito.',
    text: 'La moda también deja huella. Nosotros decidimos cuál.',
    image: heroImage,
    alt: 'Modelo UESG en un corredor de arquitectura urbana',
    width: 1400,
    height: 2240,
    position: '50% 10%',
  },
  manifesto: {
    eyebrow: 'Nuestro compromiso',
    title: 'Responsabilidad no es una tendencia.',
    text: 'En un mundo donde la industria de la moda a menudo enfrenta críticas por su impacto ambiental y social, la marca ecuatoriana de ropa urbana UESG se destaca como un faro de cambio. Con base en La Troncal, UESG no solo redefine el estilo urbano con un toque local, sino que también teje la sostenibilidad en su núcleo de identidad, abordando activamente los ODS 8, 9, 12, 13 y 17.',
    image: manifestoImage,
    alt: 'Mural UESG inspirado en naturaleza, territorio e identidad local',
    width: 1920,
    height: 1280,
  },
  impacts: [
    {
      number: '08',
      label: 'Trabajo decente y crecimiento económico',
      title: 'Trabajo decente y crecimiento local.',
      statement: 'El pilar de UESG es su gente.',
      paragraphs: [
        {
          text: 'Al centrarse en el ODS 8, Trabajo Decente y Crecimiento Económico, la marca garantiza que cada prenda sea el resultado de condiciones laborales justas y seguras. En La Troncal, esto se traduce en la dignificación del trabajo local, proporcionando salarios justos y fomentando un entorno de respeto. Este enfoque no solo empodera a los artesanos y trabajadores, sino que también inyecta vida a la economía de la comunidad, demostrando que la moda y la ética laboral pueden coexistir.',
        },
      ],
      image: workImage,
      alt: 'Dos personas instalando la gráfica exterior del Fashion Truck UESG',
      width: 900,
      height: 1600,
      layout: 'image-left',
    },
    {
      number: '09',
      label: 'Industria, innovación e infraestructura',
      title: 'Innovación en la infraestructura textil.',
      statement: 'La sostenibilidad requiere innovación.',
      paragraphs: [
        {
          text: 'UESG abraza el ODS 9, Industria, Innovación e Infraestructura, mediante la inversión en procesos de producción más eficientes y conscientes. Esto puede incluir desde la optimización del uso de recursos en sus talleres hasta la exploración de tecnologías que minimicen el desperdicio. La marca busca constantemente nuevas formas de producir moda urbana de alta calidad con la menor huella posible, sentando un precedente para la industria textil ecuatoriana.',
        },
      ],
      image: innovationImage,
      alt: 'Fashion Truck UESG abierto durante una feria con prendas en exhibición',
      width: 1280,
      height: 960,
      layout: 'image-right',
    },
    {
      number: '12',
      label: 'Producción y consumo responsables',
      title: 'Producir mejor también es diseñar mejor.',
      statement: 'El corazón de la sostenibilidad en la moda.',
      paragraphs: [
        {
          lead: 'Impacto social',
          text: 'Al priorizar materiales locales y procesos que involucran a la comunidad, la marca fortalece la cadena de valor interna y reduce la dependencia de cadenas de suministro globales complejas y menos transparentes.',
        },
        {
          lead: 'Impacto ambiental',
          text: 'UESG se compromete a minimizar el desperdicio. Esto implica el uso cuidadoso de insumos, la preferencia por materiales sostenibles como el algodón orgánico o telas recicladas, y la consideración de programas de moda circular que extienden la vida útil de sus productos.',
        },
      ],
      image: responsibilityImage,
      alt: 'Modelo UESG con un conjunto elaborado a partir de retazos textiles',
      width: 1416,
      height: 2048,
      layout: 'panorama',
    },
    {
      number: '17',
      label: 'Alianzas para lograr los objetivos',
      title: 'Las grandes ideas no se construyen solas.',
      statement: 'Los desafíos globales requieren soluciones colectivas.',
      paragraphs: [
        {
          text: 'El ODS 17, Alianzas para lograr los objetivos, es fundamental para la estrategia de UESG. La marca colabora activamente con proveedores locales, otras empresas con mentalidad sostenible y organizaciones comunitarias. Estas alianzas estratégicas amplifican su impacto, fomentando un ecosistema de sostenibilidad en Ecuador que va más allá de su propia marca.',
        },
      ],
      image: alliancesImage,
      alt: 'Mujer adulta mayor y joven juntas frente a una muestra de artesanías',
      width: 1200,
      height: 1600,
      layout: 'community',
    },
  ],
  legacy: {
    eyebrow: '07 / Legado',
    titleLines: ['Tejiendo', 'un legado', 'responsable.'],
    text: 'UESG no es solo una marca de ropa urbana, es un estilo de vida. A través de su compromiso tangible con los ODS 8, 9, 12, 13 y 17, la marca demuestra cómo la moda puede ser una fuerza para el bien. Impacta positivamente en la sociedad al empoderar a la comunidad local y hace un aporte significativo al cuidado del medio ambiente a través de la producción responsable y la innovación. UESG nos recuerda que cada decisión de compra es un voto por el mundo que queremos, y el futuro que teje es uno donde el estilo y la sostenibilidad caminan de la mano.',
    image: legacyImage,
    alt: 'Mural UESG que integra naturaleza, identidad territorial y el símbolo de la marca',
    width: 1920,
    height: 1280,
  },
}

export default razonSocialContent
