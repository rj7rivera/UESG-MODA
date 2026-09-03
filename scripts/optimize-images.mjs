// Optimización de los activos de imagen que realmente se envían al bundle.
//
// Cada entrada declara el activo ORIGINAL, el tamaño máximo real al que se
// renderiza en la interfaz (a 2x para pantallas retina) y el archivo de salida.
// Los originales NUNCA se modifican: la salida se escribe en `img/optimized/`
// para que el cambio sea reversible y auditable.
//
// Uso: npm run optimize:images
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const IMG = resolve(ROOT, 'src/assets/IMAGENES/img')
const OUT = resolve(IMG, 'optimized')

// `width` = ancho máximo de salida (ya calculado a 2x del render real).
// `alpha` = true cuando la transparencia es necesaria para el diseño.
const TARGETS = [
  // --- Logos: renderizados muy pequeños, servidos a 1024x1024 ---
  {
    input: 'logo blanco.png',
    output: 'logo-blanco.webp',
    width: 512, // render máx. 13rem (208px) en PageLoader -> 2x = 416px
    alpha: true,
    quality: 90,
  },
  {
    input: 'blanco fondo negro.png',
    output: 'logo-header.webp',
    width: 256, // render máx. 3.65rem (58px) en Header -> 2x = 116px
    alpha: false,
    quality: 90,
  },

  // --- Fotografía servida como PNG ---
  {
    input: 'work-gallery/FTR10.png',
    output: 'ftr10.webp',
    width: 963, // se conserva el ancho original: ya es moderado
    alpha: false,
    quality: 82,
  },

  // --- Imágenes editoriales grandes ---
  {
    input: 'slider/P.jpg',
    output: 'p.webp',
    width: 1920,
    alpha: false,
    quality: 80,
  },
  {
    input: 'slider/U-optimized.jpg',
    output: 'u.webp',
    width: 1920,
    alpha: false,
    quality: 80,
  },
  {
    input: 'tienda/editorial/shop-hero.jpg',
    output: 'shop-hero.webp',
    width: 1920,
    alpha: false,
    quality: 80,
  },
  {
    input: 'tienda/editorial/urban-opening.jpg',
    output: 'urban-opening.webp',
    width: 1400, // retrato: 1600x2400 es más alto que ancho
    alpha: false,
    quality: 80,
  },
  {
    input: 'razonsocial/editorial/social-hero.jpg',
    output: 'social-hero.webp',
    width: 1400,
    alpha: false,
    quality: 80,
  },
  {
    input: 'razonsocial/editorial/social-manifesto.jpg',
    output: 'social-manifesto.webp',
    width: 1920,
    alpha: false,
    quality: 80,
  },
  {
    input: 'razonsocial/editorial/social-legacy.jpg',
    output: 'social-legacy.webp',
    width: 1920,
    alpha: false,
    quality: 80,
  },
]

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

async function optimize(target) {
  const inputPath = resolve(IMG, target.input)
  const outputPath = resolve(OUT, target.output)

  const source = await readFile(inputPath)
  const metadata = await sharp(source).metadata()

  // Nunca escalamos hacia arriba: `withoutEnlargement` conserva el original
  // si ya es más pequeño que el ancho objetivo.
  const pipeline = sharp(source)
    .resize({ width: target.width, withoutEnlargement: true })
    .webp({ quality: target.quality, effort: 6, alphaQuality: 100 })

  if (!target.alpha) pipeline.flatten({ background: '#000000' })

  const buffer = await pipeline.toBuffer()
  const output = await sharp(buffer).metadata()

  await writeFile(outputPath, buffer)

  return {
    name: target.output,
    from: source.length,
    to: buffer.length,
    dims: `${metadata.width}x${metadata.height} -> ${output.width}x${output.height}`,
  }
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const results = []
  for (const target of TARGETS) {
    results.push(await optimize(target))
  }

  let totalFrom = 0
  let totalTo = 0

  for (const result of results) {
    totalFrom += result.from
    totalTo += result.to
    const saved = Math.round((1 - result.to / result.from) * 100)
    console.log(
      `${result.name.padEnd(24)} ${formatKb(result.from).padStart(8)} -> ${formatKb(
        result.to,
      ).padStart(8)}  (-${saved}%)  ${result.dims}`,
    )
  }

  const savedTotal = Math.round((1 - totalTo / totalFrom) * 100)
  console.log(
    `\nTOTAL${' '.repeat(19)} ${formatKb(totalFrom).padStart(8)} -> ${formatKb(
      totalTo,
    ).padStart(8)}  (-${savedTotal}%)`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
