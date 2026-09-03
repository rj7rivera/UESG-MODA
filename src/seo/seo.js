import defaultShareImage from '../assets/IMAGENES/img/optimized/shop-hero.webp'
import organizationLogo from '../assets/IMAGENES/img/optimized/logo-header.webp'
import {
  ROUTE_METADATA,
  SITE_NAME,
  truncateDescription,
} from './siteMetadata.js'

let latestSeoUpdate = 0

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, '')
}

function getBaseUrl() {
  const configuredUrl = import.meta.env.VITE_UESG_SITE_URL?.trim()
  return normalizeBaseUrl(configuredUrl || window.location.origin)
}

function absoluteUrl(value, baseUrl) {
  return new URL(value, `${baseUrl}/`).href
}

function buildBreadcrumb(pathname, label, baseUrl) {
  if (pathname === '/') return null

  const entries = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: `${baseUrl}/`,
    },
  ]

  if (pathname.startsWith('/blog/')) {
    entries.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${baseUrl}/blog`,
    })
  }

  entries.push({
    '@type': 'ListItem',
    position: entries.length + 1,
    name: label,
    item: `${baseUrl}${pathname}`,
  })

  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries,
  }
}

function buildStructuredData(metadata, baseUrl) {
  const organizationId = `${baseUrl}/#organization`
  const websiteId = `${baseUrl}/#website`
  const pageId = `${metadata.canonical}#webpage`
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: `${baseUrl}/`,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(organizationLogo, baseUrl),
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: `${baseUrl}/`,
      inLanguage: 'es-EC',
      publisher: { '@id': organizationId },
    },
    {
      '@type': metadata.schemaType,
      '@id': pageId,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'es-EC',
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: metadata.image,
      },
    },
  ]

  const breadcrumb = buildBreadcrumb(
    metadata.pathname,
    metadata.breadcrumb,
    baseUrl,
  )
  if (breadcrumb) graph.push(breadcrumb)

  if (metadata.post) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${metadata.canonical}#article`,
      headline: metadata.post.articleTitle,
      description: metadata.description,
      image: metadata.image,
      mainEntityOfPage: { '@id': pageId },
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      inLanguage: 'es-EC',
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export async function getSeoMetadata(pathname) {
  const baseUrl = getBaseUrl()
  let post = null

  if (pathname.startsWith('/blog/')) {
    const { getBlogPost } = await import('../pages/Blog/blogContent.js')
    post = getBlogPost(decodeURIComponent(pathname.slice('/blog/'.length)))
  }
  const route = post
    ? {
        title: `${post.title} | UESG`,
        description: truncateDescription(post.excerpt),
        schemaType: 'WebPage',
        breadcrumb: post.title,
        image: post.image.src,
        imageAlt: post.image.alt,
      }
    : ROUTE_METADATA[pathname] || ROUTE_METADATA['/']
  const canonical = `${baseUrl}${pathname === '/' ? '/' : pathname}`
  const metadata = {
    ...route,
    pathname,
    canonical,
    image: absoluteUrl(route.image || defaultShareImage, baseUrl),
    imageAlt: route.imageAlt || 'Universo de moda y comunidad UESG',
    ogType: post ? 'article' : 'website',
    post,
  }

  return {
    ...metadata,
    structuredData: buildStructuredData(metadata, baseUrl),
  }
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.append(element)
  }
  element.setAttribute('href', url)
}

function upsertStructuredData(data) {
  let element = document.getElementById('uesg-structured-data')
  if (!element) {
    element = document.createElement('script')
    element.id = 'uesg-structured-data'
    element.type = 'application/ld+json'
    document.head.append(element)
  }
  element.textContent = JSON.stringify(data).replaceAll('<', '\\u003c')
}

export async function applySeoMetadata(pathname) {
  const updateId = ++latestSeoUpdate
  const metadata = await getSeoMetadata(pathname)
  if (updateId !== latestSeoUpdate) return

  document.title = metadata.title
  upsertCanonical(metadata.canonical)
  upsertMeta('name', 'description', metadata.description)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')

  upsertMeta('property', 'og:locale', 'es_EC')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:type', metadata.ogType)
  upsertMeta('property', 'og:title', metadata.title)
  upsertMeta('property', 'og:description', metadata.description)
  upsertMeta('property', 'og:url', metadata.canonical)
  upsertMeta('property', 'og:image', metadata.image)
  upsertMeta('property', 'og:image:alt', metadata.imageAlt)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', metadata.title)
  upsertMeta('name', 'twitter:description', metadata.description)
  upsertMeta('name', 'twitter:image', metadata.image)
  upsertMeta('name', 'twitter:image:alt', metadata.imageAlt)

  upsertStructuredData(metadata.structuredData)
}
