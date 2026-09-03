export const SITE_NAME = 'UESG'

export const DEFAULT_DESCRIPTION =
  'UESG es moda ecuatoriana con identidad propia: Urban, Sports, Recover y cápsulas que conectan estilo, cultura y propósito.'

export const ROUTE_METADATA = {
  '/': {
    title: 'UESG | Moda ecuatoriana con identidad propia',
    description: DEFAULT_DESCRIPTION,
    schemaType: 'WebPage',
  },
  '/nosotros': {
    title: 'Nosotros | Identidad y propósito UESG',
    description:
      'Conoce la visión, esencia y comunidad detrás de UESG, una marca ecuatoriana que crea moda con identidad, servicio y propósito.',
    schemaType: 'AboutPage',
    breadcrumb: 'Nosotros',
  },
  '/razon-social': {
    title: 'Razón Social | Compromiso y comunidad UESG',
    description:
      'Descubre las iniciativas sociales, culturales y educativas con las que UESG impulsa oportunidades y transforma su comunidad.',
    schemaType: 'AboutPage',
    breadcrumb: 'Razón Social',
  },
  '/tienda': {
    title: 'Tienda | Urban, Sports, Recover y Cápsulas UESG',
    description:
      'Explora los universos UESG Urban, Sports, Recover y Cápsulas. Moda ecuatoriana con diseño, actitud e identidad propia.',
    schemaType: 'CollectionPage',
    breadcrumb: 'Tienda',
  },
  '/blog': {
    title: 'Blog | Cultura, moda y comunidad UESG',
    description:
      'Historias de moda, arte, deporte, emprendimiento y comunidad que construyen el universo y la identidad de UESG.',
    schemaType: 'CollectionPage',
    breadcrumb: 'Blog',
  },
  '/contacto': {
    title: 'Contacto | Hablemos con UESG',
    description:
      'Contacta al equipo UESG para conocer colecciones, disponibilidad, colaboraciones y proyectos de la marca.',
    schemaType: 'ContactPage',
    breadcrumb: 'Contacto',
  },
}

export function truncateDescription(value, maxLength = 158) {
  if (value.length <= maxLength) return value
  const shortened = value.slice(0, maxLength - 1)
  const lastSpace = shortened.lastIndexOf(' ')
  return `${shortened.slice(0, lastSpace > 110 ? lastSpace : maxLength - 1)}…`
}
