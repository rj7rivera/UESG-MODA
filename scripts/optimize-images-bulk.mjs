// Optimización masiva IN-PLACE de los directorios de imágenes importados por
// `import.meta.glob` en la tienda y de la galería del blog.
//
// Estos directorios NO pueden cambiar de nombre ni de extensión: los globs
// filtran por extensión (`*.png`, `*.jpg`) y las listas de prioridad del
// catálogo referencian nombres de archivo concretos (p. ej. `22.png`).
// Por eso aquí se reescribe cada archivo conservando nombre y formato, lo que
// hace que la optimización sea invisible para el código de la aplicación.
//
// Antes de sobrescribir, cada original se copia a `.image-originals/` para que
// el proceso sea reversible.
//
// Uso: npm run optimize:images:bulk
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BACKUP = resolve(ROOT, '.image-originals')

const GROUPS = [
  {
    // Gráficos DTF con transparencia: se mantienen en PNG, pero paletizados.
    dir: 'src/assets/IMAGENES/img/dtf',
    match: /\.png$/i,
    encode: (pipeline) => pipeline.png({ palette: true, quality: 80, effort: 10 }),
  },
  {
    // Galería del blog: ya era WebP, pero a 1800-2000px de ancho.
    dir: 'src/assets/IMAGENES/img/blog/optimized',
    match: /\.webp$/i,
    maxWidth: 1600,
    encode: (pipeline) => pipeline.webp({ quality: 78, effort: 6 }),
  },
  {
    // Catálogo editorial Urban: JPEG re-codificado con mozjpeg.
    dir: 'src/assets/IMAGENES/img/tienda/editorial/urban',
    match: /\.jpe?g$/i,
    maxWidth: 1350,
    encode: (pipeline) => pipeline.jpeg({ quality: 80, mozjpeg: true }),
  },
]

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

async function optimizeFile(group, filePath) {
  const source = await readFile(filePath)

  let pipeline = sharp(source)
  if (group.maxWidth) {
    pipeline = pipeline.resize({ width: group.maxWidth, withoutEnlargement: true })
  }

  const buffer = await group.encode(pipeline).toBuffer()

  // Nunca empeoramos un archivo: si la reescritura pesa más, se conserva.
  if (buffer.length >= source.length) {
    return { from: source.length, to: source.length, skipped: true }
  }

  const backupPath = resolve(BACKUP, relative(ROOT, filePath))
  await mkdir(dirname(backupPath), { recursive: true })
  if (!existsSync(backupPath)) await copyFile(filePath, backupPath)

  await writeFile(filePath, buffer)

  return { from: source.length, to: buffer.length, skipped: false }
}

async function main() {
  let grandFrom = 0
  let grandTo = 0

  for (const group of GROUPS) {
    const dir = resolve(ROOT, group.dir)
    const entries = (await readdir(dir)).filter((name) => group.match.test(name))

    let from = 0
    let to = 0
    let skipped = 0

    for (const name of entries) {
      const filePath = join(dir, name)
      if (!(await stat(filePath)).isFile()) continue

      const result = await optimizeFile(group, filePath)
      from += result.from
      to += result.to
      if (result.skipped) skipped += 1
    }

    grandFrom += from
    grandTo += to

    const saved = from > 0 ? Math.round((1 - to / from) * 100) : 0
    console.log(
      `${group.dir.replace('src/assets/IMAGENES/img/', '').padEnd(24)} ${String(
        entries.length,
      ).padStart(3)} archivos  ${formatKb(from).padStart(9)} -> ${formatKb(to).padStart(
        9,
      )}  (-${saved}%)${skipped ? `  [${skipped} sin cambio]` : ''}`,
    )
  }

  const saved = Math.round((1 - grandTo / grandFrom) * 100)
  console.log(
    `\nTOTAL${' '.repeat(31)} ${formatKb(grandFrom).padStart(9)} -> ${formatKb(
      grandTo,
    ).padStart(9)}  (-${saved}%)`,
  )
  console.log(`Originales respaldados en ${relative(ROOT, BACKUP)}/`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
