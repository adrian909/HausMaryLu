/**
 * Re-encodes the photos in public/img so none of them are larger than a browser
 * will ever display. Safe to re-run: a file is only replaced when the new
 * version is actually smaller.
 *
 *   node scripts/optimize-images.js
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const MAX_WIDTH = 2000
const QUALITY = 80

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'img')
const kb = (bytes) => Math.round(bytes / 1024)

let savedBytes = 0

for (const file of fs.readdirSync(dir).filter((name) => /\.jpe?g$/i.test(name))) {
  const filePath = path.join(dir, file)
  // Read into memory first: sharp keeps the source file open, which blocks
  // writing back to the same path on Windows.
  const source = fs.readFileSync(filePath)
  const before = source.length

  const { width } = await sharp(source).metadata()

  const output = await sharp(source)
    .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toBuffer()

  if (output.length >= before) {
    console.log(`${file.padEnd(16)} kept (${kb(before)} KB)`)
    continue
  }

  fs.writeFileSync(filePath, output)
  savedBytes += before - output.length
  console.log(`${file.padEnd(16)} ${kb(before)} KB → ${kb(output.length)} KB`)
}

console.log(`\nSaved ${kb(savedBytes)} KB in total.`)
