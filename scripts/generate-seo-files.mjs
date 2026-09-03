import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ROUTE_METADATA,
  SITE_NAME,
  truncateDescription,
} from '../src/seo/siteMetadata.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local']

const ROUTE_SETTINGS = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/nosotros': { changefreq: 'monthly', priority: '0.8' },
  '/razon-social': { changefreq: 'monthly', priority: '0.8' },
  '/tienda': { changefreq: 'weekly', priority: '0.9' },
  '/blog': { changefreq: 'weekly', priority: '0.8' },
  '/contacto': { changefreq: 'monthly', priority: '0.7' },
}

const STATIC_ROUTES = Object.entries(ROUTE_METADATA).map(([path, metadata]) => ({
  path,
  ...metadata,
  ...ROUTE_SETTINGS[path],
}))

const GENERATED_BLOCK_PATTERN = /\n?\s*<!-- uesg-build-seo:start -->[\s\S]*?<!-- uesg-build-seo:end -->\n?/g

function parseEnv(content) {
  const values = {}

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (!match) continue
    values[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2')
  }

  return values
}

async function loadSiteUrl() {
  const values = {}

  for (const file of ENV_FILES) {
    const filePath = resolve(ROOT, file)
    if (existsSync(filePath)) Object.assign(values, parseEnv(await readFile(filePath, 'utf8')))
  }

  const value = process.env.VITE_UESG_SITE_URL || values.VITE_UESG_SITE_URL
  if (!value) return null

  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_UESG_SITE_URL debe usar http:// o https://')
  }

  return url.href.replace(/\/+$/, '')
}

async function getBlogRoutes() {
  const source = await readFile(resolve(ROOT, 'src/pages/Blog/blogContent.js'), 'utf8')
  const posts = [...source.matchAll(
    /\bslug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*excerpt:\s*'([^']+)'/g,
  )]

  return posts.map(([, slug, title, excerpt]) => ({
    path: `/blog/${slug}`,
    title: `${title} | UESG`,
    description: truncateDescription(excerpt),
    schemaType: 'WebPage',
    breadcrumb: title,
    articleTitle: title,
    isArticle: true,
    changefreq: 'monthly',
    priority: '0.7',
  }))
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta(?=[^>]*\\b${attribute}="${key}")[^>]*>`, 'i')
  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  )
}

function resetDocumentMetadata(html) {
  const home = ROUTE_METADATA['/']
  let output = html.replace(GENERATED_BLOCK_PATTERN, '\n')
  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(home.title)}</title>`)
  output = replaceMeta(output, 'name', 'description', home.description)
  output = replaceMeta(output, 'property', 'og:type', 'website')
  output = replaceMeta(output, 'property', 'og:title', home.title)
  output = replaceMeta(output, 'property', 'og:description', home.description)
  output = replaceMeta(output, 'name', 'twitter:title', home.title)
  output = replaceMeta(output, 'name', 'twitter:description', home.description)
  return output
}

function buildBreadcrumb(route, siteUrl) {
  if (route.path === '/') return null
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
  ]

  if (route.isArticle) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${siteUrl}/blog`,
    })
  }

  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: route.breadcrumb,
    item: `${siteUrl}${route.path}`,
  })

  return { '@type': 'BreadcrumbList', itemListElement: items }
}

function buildStructuredData(route, siteUrl, imageUrl, logoUrl) {
  const organizationId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`
  const canonical = `${siteUrl}${route.path}`
  const pageId = `${canonical}#webpage`
  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: `${siteUrl}/`,
      logo: { '@type': 'ImageObject', url: logoUrl },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: `${siteUrl}/`,
      inLanguage: 'es-EC',
      publisher: { '@id': organizationId },
    },
    {
      '@type': route.schemaType,
      '@id': pageId,
      url: canonical,
      name: route.title,
      description: route.description,
      inLanguage: 'es-EC',
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
    },
  ]
  const breadcrumb = buildBreadcrumb(route, siteUrl)
  if (breadcrumb) graph.push(breadcrumb)

  if (route.isArticle) {
    graph.push({
      '@type': 'BlogPosting',
      headline: route.articleTitle,
      description: route.description,
      image: imageUrl,
      mainEntityOfPage: { '@id': pageId },
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      inLanguage: 'es-EC',
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function buildRouteHtml(template, route, siteUrl, imageUrl, logoUrl) {
  const canonical = `${siteUrl}${route.path}`
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  html = replaceMeta(html, 'name', 'description', route.description)
  html = replaceMeta(html, 'property', 'og:type', route.isArticle ? 'article' : 'website')
  html = replaceMeta(html, 'property', 'og:title', route.title)
  html = replaceMeta(html, 'property', 'og:description', route.description)
  html = replaceMeta(html, 'name', 'twitter:title', route.title)
  html = replaceMeta(html, 'name', 'twitter:description', route.description)

  const data = JSON.stringify(buildStructuredData(route, siteUrl, imageUrl, logoUrl))
    .replaceAll('<', '\\u003c')
  const block = `    <!-- uesg-build-seo:start -->
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="Universo de moda y comunidad UESG" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image:alt" content="Universo de moda y comunidad UESG" />
    <script id="uesg-structured-data" type="application/ld+json">${data}</script>
    <!-- uesg-build-seo:end -->
`

  return html.replace('  </head>', `${block}  </head>`)
}

async function findAssetUrl(siteUrl, prefix) {
  const files = await readdir(resolve(DIST, 'assets'))
  const file = files.find((name) => name.startsWith(`${prefix}-`) && name.endsWith('.webp'))
  if (!file) throw new Error(`No se encontró el asset compilado ${prefix}-*.webp`)
  return `${siteUrl}/assets/${encodeURIComponent(file)}`
}

async function writeRouteDocuments(routes, siteUrl) {
  const indexPath = resolve(DIST, 'index.html')
  const template = resetDocumentMetadata(await readFile(indexPath, 'utf8'))
  const imageUrl = await findAssetUrl(siteUrl, 'shop-hero')
  const logoUrl = await findAssetUrl(siteUrl, 'logo-header')

  for (const route of routes) {
    const outputPath = route.path === '/'
      ? indexPath
      : resolve(DIST, route.path.slice(1), 'index.html')
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, buildRouteHtml(template, route, siteUrl, imageUrl, logoUrl), 'utf8')
  }
}

async function removeRouteDocuments(routes) {
  const indexPath = resolve(DIST, 'index.html')
  const index = resetDocumentMetadata(await readFile(indexPath, 'utf8'))
  await writeFile(indexPath, index, 'utf8')

  for (const route of routes) {
    if (route.path !== '/') await rm(resolve(DIST, route.path.slice(1)), { recursive: true, force: true })
  }
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildSitemap(siteUrl, routes) {
  const entries = routes
    .map(
      (route) => `  <url>
    <loc>${escapeXml(`${siteUrl}${route.path}`)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

async function main() {
  if (!existsSync(DIST)) throw new Error('No existe dist/. Ejecuta Vite antes de generar SEO.')

  const siteUrl = await loadSiteUrl()
  const sitemapPath = resolve(DIST, 'sitemap.xml')
  const routes = [...STATIC_ROUTES, ...(await getBlogRoutes())]
  let robots = 'User-agent: *\nAllow: /\n'

  if (siteUrl) {
    await writeFile(sitemapPath, buildSitemap(siteUrl, routes), 'utf8')
    await writeRouteDocuments(routes, siteUrl)
    robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`
    console.log(`SEO: sitemap y metadatos estáticos generados para ${routes.length} URLs en ${siteUrl}`)
  } else {
    await rm(sitemapPath, { force: true })
    await removeRouteDocuments(routes)
    console.warn('SEO: sitemap omitido; configura VITE_UESG_SITE_URL para producción.')
  }

  await writeFile(resolve(DIST, 'robots.txt'), robots, 'utf8')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
