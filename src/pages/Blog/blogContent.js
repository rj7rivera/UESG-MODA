import mercaditoImage from '../../assets/IMAGENES/img/blog/optimized/mercadito.webp'
import mercaditoGalleryOne from '../../assets/IMAGENES/img/blog/optimized/mercadito-01.webp'
import mercaditoGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/mercadito-02.webp'
import mercaditoGalleryThree from '../../assets/IMAGENES/img/blog/optimized/mercadito-03.webp'
import mercaditoGalleryFour from '../../assets/IMAGENES/img/blog/optimized/mercadito-04.webp'
import tiendaImage from '../../assets/IMAGENES/img/blog/optimized/tienda-oficial.webp'
import tiendaGalleryOne from '../../assets/IMAGENES/img/blog/optimized/tienda-01.webp'
import tiendaGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/tienda-02.webp'
import octubreImage from '../../assets/IMAGENES/img/blog/optimized/9-octubre.webp'
import octubreGalleryOne from '../../assets/IMAGENES/img/blog/optimized/octubre-01.webp'
import octubreGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/octubre-02.webp'
import fiestaImage from '../../assets/IMAGENES/img/blog/optimized/fiesta-uesg.webp'
import fiestaGalleryOne from '../../assets/IMAGENES/img/blog/optimized/fiesta-01.webp'
import fiestaGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/fiesta-02.webp'
import fiestaGalleryThree from '../../assets/IMAGENES/img/blog/optimized/fiesta-03.webp'
import fiestaGalleryFour from '../../assets/IMAGENES/img/blog/optimized/fiesta-04.webp'
import streetArtImage from '../../assets/IMAGENES/img/blog/optimized/street-art.webp'
import streetArtGalleryOne from '../../assets/IMAGENES/img/blog/optimized/street-art-01.webp'
import streetArtGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/street-art-02.webp'
import streetArtGalleryThree from '../../assets/IMAGENES/img/blog/optimized/street-art-03.webp'
import fashionTruckImage from '../../assets/IMAGENES/img/blog/optimized/fashion-truck.webp'
import fashionTruckGalleryOne from '../../assets/IMAGENES/img/blog/optimized/fashion-truck-01.webp'
import fashionTruckGalleryTwo from '../../assets/IMAGENES/img/blog/optimized/fashion-truck-02.webp'

const blogPosts = [
  {
    id: 'blog-mercadito',
    number: '01',
    slug: 'el-mercadito',
    title: 'El Mercadito: creatividad, esfuerzo y alegría en cada stand',
    excerpt: 'El Mercadito brilló por la creatividad y el esfuerzo de emprendedores con ganas de progresar.',
    image: {
      src: mercaditoImage,
      alt: 'Reconocimiento al mejor stand de El Mercadito sobre una mesa verde',
      width: 2000,
      height: 1125,
      position: '50% 52%',
    },
    articleTitle: 'El Mercadito brilló por la creatividad y el esfuerzo de emprendedores con ganas de progresar',
    body: [
      'La Troncal, 24 de octubre de 2025. Con un ambiente lleno de entusiasmo, color y música, El Mercadito se consolidó como una vitrina de talento, esfuerzo y creatividad local. Emprendedores de diferentes sectores —gastronómico, artesanal, textil y tecnológico— se dieron cita para mostrar que en La Troncal hay pasión, innovación y una enorme capacidad para progresar.',
      'El evento se desarrolló en un entorno familiar y festivo, donde los visitantes pudieron disfrutar de presentaciones musicales en vivo, degustaciones gastronómicas, exhibiciones de productos hechos a mano y demostraciones de emprendimientos sostenibles. Cada stand fue una muestra de identidad, trabajo en equipo y amor por lo que se hace.',
      'Más allá de los premios, El Mercadito dejó una huella profunda en cada participante. Representa una oportunidad para fortalecer redes, generar alianzas y promover el consumo local. Eventos como este son una prueba viva de que cuando se combinan pasión, organización y visión, los resultados superan toda expectativa.',
    ],
    quote: null,
    gallery: [
      { src: mercaditoGalleryOne, alt: 'Fotografía del evento El Mercadito', width: 1800, height: 1350 },
      { src: mercaditoGalleryTwo, alt: 'Participantes durante El Mercadito', width: 1800, height: 1350 },
      { src: mercaditoGalleryThree, alt: 'Stand participante de El Mercadito', width: 1600, height: 1200 },
      { src: mercaditoGalleryFour, alt: 'Ambiente de El Mercadito en La Troncal', width: 1800, height: 1350 },
    ],
  },
  {
    id: 'blog-tienda-oficial',
    number: '02',
    slug: 'tienda-oficial-uesg',
    title: 'Tienda Oficial: UESG',
    excerpt: 'La tienda UESG transmite identidad, confianza y estilo en cada prenda. Cada diseño busca inspirar actitud, autenticidad y orgullo por lo que somos.',
    image: {
      src: tiendaImage,
      alt: 'Fachada de la tienda oficial UESG',
      width: 2000,
      height: 1125,
      position: '50% 48%',
    },
    articleTitle: 'UESG: Más que una tienda, una experiencia de estilo y autenticidad',
    body: [
      'La Troncal, 2025 — En pleno corazón de la ciudad se encuentra UESG, un espacio donde la moda, la creatividad y la identidad se fusionan en un ambiente que refleja elegancia, energía y pertenencia. Desde el primer paso dentro de la tienda, cada detalle está pensado para transmitir el concepto de la marca: “Life is like you want it”.',
      'El lugar proyecta una atmósfera moderna, urbana y limpia, donde el diseño de interiores se convierte en parte de la experiencia. Los tonos neutros y el característico color naranja UESG se combinan con una iluminación cálida que realza cada prenda, invitando al visitante a descubrir la esencia detrás de cada colección.',
      'Más allá del entorno, lo que realmente distingue a UESG es su equipo. El trato cercano, amable y profesional hace que cada cliente se sienta parte de la comunidad UESG. La atención personalizada y la disposición para orientar en cada detalle reflejan el compromiso de la marca con su filosofía de servicio.',
    ],
    quote: null,
    gallery: [
      { src: tiendaGalleryOne, alt: 'Interior de la tienda oficial UESG', width: 1013, height: 1800 },
      { src: tiendaGalleryTwo, alt: 'Espacio de exhibición de la tienda oficial UESG', width: 1013, height: 1800 },
    ],
  },
  {
    id: 'blog-nueve-octubre',
    number: '03',
    slug: 'equipo-oficial-9-de-octubre',
    title: 'Equipo oficial patrocinado por UESG — 9 de Octubre',
    excerpt: 'UESG se enorgullece de impulsar al equipo oficial con actitud, estilo y determinación. Este patrocinio refleja nuestra visión de superar límites y dejar huella dentro y fuera del campo.',
    image: {
      src: octubreImage,
      alt: 'Stand UESG con indumentaria del equipo 9 de Octubre',
      width: 1200,
      height: 1600,
      position: '50% 48%',
    },
    articleTitle: 'UESG: Orgullo, estilo y pasión que impulsa al 9 de Octubre',
    body: [
      'La Troncal, Ecuador — 2025. La marca UESG continúa marcando tendencia dentro y fuera del campo. En una nueva alianza estratégica, UESG se convierte en patrocinador oficial del equipo 9 de Octubre, reafirmando su compromiso con el deporte, la disciplina y la identidad local.',
      'Este patrocinio no solo representa un acuerdo comercial, sino la unión de dos visiones que comparten valores esenciales: la determinación, el esfuerzo y la búsqueda constante de la excelencia. Bajo el lema “Life is like you want it”, UESG promueve un mensaje claro: los sueños se construyen con trabajo y actitud, tanto en la cancha como en la vida.',
      'La colaboración con el 9 de Octubre fortalece la presencia de UESG como marca que impulsa el talento ecuatoriano, fomentando la cultura del deporte y el orgullo local. Cada prenda, cada detalle del diseño refleja la esencia del equipo: pasión, esfuerzo y orgullo por los colores que se defienden en la cancha.',
      'Con esta alianza, UESG demuestra que la moda puede ser una extensión del espíritu deportivo, y que vestir con estilo también es una forma de competir. El patrocinio simboliza una nueva etapa para la marca —una donde el diseño, la autenticidad y la energía del fútbol se encuentran para inspirar a toda una generación.',
      'Mantente conectado a nuestras redes oficiales para conocer los próximos lanzamientos de la línea deportiva, sesiones de fotos con los jugadores y las nuevas prendas que vestirán la pasión de los fanáticos.',
      '⚽ UESG x 9 de Octubre — Unidos por la pasión, impulsados por el estilo.',
    ],
    quote: null,
    gallery: [
      { src: octubreGalleryOne, alt: 'Indumentaria deportiva UESG para el equipo 9 de Octubre', width: 1440, height: 1800 },
      { src: octubreGalleryTwo, alt: 'Presentación de prendas UESG del equipo 9 de Octubre', width: 1440, height: 1800 },
    ],
  },
  {
    id: 'blog-fiesta-uesg',
    number: '04',
    slug: 'la-fiesta-uesg',
    title: 'La Fiesta UESG',
    excerpt: 'Es una noche de música, energía y visión. Cada presentación, sonido y detalle reflejó el crecimiento y la fuerza de una marca que no deja de avanzar. Un evento que unió estilo, pasión y propósito para seguir elevando el nombre de UESG.',
    image: {
      src: fiestaImage,
      alt: 'Asistentes reunidos durante la Fiesta UESG',
      width: 2000,
      height: 1125,
      position: '50% 50%',
    },
    articleTitle: 'Fiesta UESG: Donde la elegancia se encuentra con la actitud',
    body: [
      'La Troncal, Ecuador — 2025. No todos los días se celebra el estilo, la autenticidad y la pasión de una marca que redefine lo que significa ser diferente. La Fiesta UESG no es un evento cualquiera —es una experiencia reservada para quienes entienden que la elegancia no se viste, se proyecta.',
      'Bajo un ambiente cuidadosamente diseñado, con luces suaves, detalles en negro y dorado, y un público selecto que respira moda y confianza, la noche de la UESG se convierte en un manifiesto de identidad. Cada asistente representa el espíritu de la marca: personas que crean su propio camino, que destacan sin necesidad de decirlo, y que saben disfrutar con clase.',
      'La velada estuvo acompañada por la presentación en vivo de Total Black, una banda ecuatoriana con un talento desbordante, cuya música fusionó ritmos urbanos y elegancia sonora. Su actuación encendió el ambiente y dejó claro que el arte, la moda y la música comparten una misma esencia: la autenticidad.',
      'Además, se realizaron concursos exclusivos donde los invitados demostraron su estilo y creatividad, participando por prendas y accesorios de las líneas UESG Urban y Recover. Cada detalle —desde la decoración hasta la atención personalizada— reflejó el estándar de calidad que distingue a la marca.',
      'La gastronomía fue otro punto alto de la noche: platos preparados con dedicación y amor, que combinaron sabores tradicionales con un toque moderno. Porque en UESG, incluso la comida se convierte en una forma de arte.',
      'Entre risas, música, luces y moda, la Fiesta UESG dejó una huella imborrable en todos los presentes. Cada edición de este evento refuerza el propósito de la marca: crear experiencias que trascienden lo visual y conectan con el alma.',
    ],
    quote: null,
    gallery: [
      { src: fiestaGalleryOne, alt: 'Presentación durante la Fiesta UESG', width: 1800, height: 1013 },
      { src: fiestaGalleryTwo, alt: 'Ambiente musical de la Fiesta UESG', width: 1800, height: 1013 },
      { src: fiestaGalleryThree, alt: 'Invitados de la Fiesta UESG', width: 1800, height: 1013 },
      { src: fiestaGalleryFour, alt: 'Escenario de la Fiesta UESG', width: 1800, height: 1013 },
    ],
  },
  {
    id: 'blog-street-art',
    number: '05',
    slug: 'concurso-uesg-street-art',
    title: '1ra edición concurso UESG Street Art',
    excerpt: 'Este concurso busca transformar espacios urbanos a través de la expresión artística, promoviendo la participación ciudadana, el amor por lo nuestro y embelleciendo la ciudad. Combinándolo con los valores de nuestra marca UESG: ALMA, CIENCIA, PASIÓN, GENEROSIDAD, FE, SUPERACIÓN, TRABAJO, RESILIENCA Y FUERZA.',
    image: {
      src: streetArtImage,
      alt: 'Mural participante del concurso UESG Street Art',
      width: 2000,
      height: 1333,
      position: '50% 48%',
    },
    articleTitle: '1ra Edición Concurso UESG Street Art: el arte que transforma la ciudad',
    body: [
      'La Troncal, Ecuador — 2025. Las calles de la ciudad se llenaron de color, talento y emoción durante la primera edición del Concurso UESG Street Art, una iniciativa que unió a artistas, muralistas y soñadores con un mismo propósito: transformar espacios urbanos a través del arte.',
      'Organizado por la marca UESG, este evento se consolidó como un movimiento cultural que celebró la expresión artística local y la participación ciudadana. Decenas de artistas de distintas edades y estilos se dieron cita en La Troncal para dejar su huella en los muros, reinterpretando los valores que definen a UESG: alma, pasión, ciencia, fe, trabajo, superación y fuerza.',
      'Los murales finalistas fueron verdaderas obras de arte: retratos llenos de vida, paisajes urbanos reinventados y mensajes que conectaron el arte con la comunidad. Cada trazo, cada color, reflejó la identidad ecuatoriana y el poder del arte como motor de cambio social.',
      'La 1ra Edición del UESG Street Art no solo embelleció la ciudad; también reforzó la visión de la marca: apoyar el talento emergente, promover la cultura y dar vida a espacios donde la gente pueda sentirse parte de algo más grande.',
      'Los ganadores recibieron reconocimientos, obsequios de la marca y la oportunidad de exhibir sus obras en futuros eventos UESG. Pero más allá de los premios, lo que quedó fue una muestra colectiva de amor por el arte, la ciudad y la identidad ecuatoriana.',
      '💛 UESG Street Art — El arte urbano que da vida, color y propósito a nuestra comunidad.',
      '#UESGStreetArt #ArteUrbano #LaTroncal #CulturaUESG #LifeIsLikeYouWantIt',
    ],
    quote: {
      text: 'Este concurso demostró que el arte puede inspirar, unir y transformar. La creatividad de nuestros artistas locales es un orgullo que debemos seguir impulsando.',
      attribution: 'Dirección de Proyectos Culturales UESG',
    },
    gallery: [
      { src: streetArtGalleryOne, alt: 'Obra participante de UESG Street Art', width: 1800, height: 1200 },
      { src: streetArtGalleryTwo, alt: 'Mural realizado para UESG Street Art', width: 1800, height: 1200 },
      { src: streetArtGalleryThree, alt: 'Mural finalista de UESG Street Art', width: 1800, height: 1200 },
    ],
  },
  {
    id: 'blog-fashion-truck',
    number: '06',
    slug: 'fashion-truck',
    title: 'Fashion Truck: el viaje donde la moda nunca se detiene',
    excerpt: 'Fashion Truck representa el poder de soñar en grande y moverse con propósito. Creado para llevar la moda a todos los rincones, es símbolo de coraje, innovación y visión. Cada ruta, cada parada, refleja el espíritu de una marca que no se detiene hasta llegar a todos.',
    image: {
      src: fashionTruckImage,
      alt: 'Fashion Truck negro de UESG en un evento al aire libre',
      width: 960,
      height: 1280,
      position: '50% 54%',
    },
    articleTitle: 'Fashion Truck: el viaje donde la moda nunca se detiene',
    body: [
      'La Troncal, Ecuador — 2025. El Fashion Truck UESG no es solo un vehículo: es una visión sobre ruedas. Nació del deseo de llevar la moda a todos los rincones, transformando las calles en pasarelas móviles y cada parada en una experiencia de marca. Representa el poder de soñar en grande, moverse con propósito y demostrar que el estilo no tiene fronteras.',
      'Este innovador proyecto combina la estética moderna de UESG con un espíritu libre y audaz. En cada ruta, el Fashion Truck se convierte en un espacio vivo donde la moda, la música y la energía se mezclan para crear momentos inolvidables. Cada parada es una historia, cada visitante un protagonista en el viaje donde la elegancia y la autenticidad se encuentran.',
      'Fashion Truck es símbolo de coraje, innovación y visión. Es la manera en que UESG lleva su esencia a nuevas comunidades, conectando con personas que comparten la pasión por el diseño, el arte y la actitud. Más que vender ropa, este proyecto lleva inspiración, creatividad y la fuerza de una marca que nunca se detiene.',
      'En su interior, el camión fusiona diseño minimalista y tecnología: exhibidores adaptables, iluminación cálida y una atmósfera que refleja el ADN de la marca —urbana, sofisticada y atrevida. Aquí, las colecciones UESG Urban, UESG Sports y Recover cobran vida mientras el público descubre lo que significa vestir con propósito.',
      'Cada ruta del Fashion Truck tiene una misión: acercar la moda ecuatoriana al corazón de la gente. Desde ferias y eventos culturales hasta barrios y universidades, este proyecto demuestra que el estilo puede ser inclusivo, móvil y transformador. UESG sigue reafirmando así su liderazgo como una marca que se mueve con el futuro, inspirando a las nuevas generaciones a vestir con identidad.',
      '💛 UESG Fashion Truck — el viaje donde la moda nunca se detiene.',
      '#UESGFashionTruck #ModaEnMovimiento #LifeIsLikeYouWantIt #UESGStyle',
    ],
    quote: {
      text: 'El Fashion Truck no busca destinos, los crea. Es la representación física de un sueño que se mueve, avanza y transforma cada lugar que toca.',
      attribution: 'Dirección de Innovación UESG',
    },
    gallery: [
      { src: fashionTruckGalleryOne, alt: 'Vista exterior del Fashion Truck UESG', width: 960, height: 1280 },
      { src: fashionTruckGalleryTwo, alt: 'Fashion Truck UESG durante una parada', width: 960, height: 1280 },
    ],
  },
]

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export default blogPosts
