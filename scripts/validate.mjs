// Empaqueta scripts/validate-questions.ts con rolldown (ya viene con Vite) y lo ejecuta en Node.
// Uso: npm run validate   ·   npm run validate -- --lt
import { build } from 'rolldown'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const out = resolve('node_modules/.cache/validate/validate-questions.mjs')
await build({
  input: 'scripts/validate-questions.ts',
  platform: 'node',
  logLevel: 'silent',
  output: { file: out, format: 'esm' },
})
await import(pathToFileURL(out).href)
