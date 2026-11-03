// Empaqueta scripts/test-command.ts con rolldown (ya viene con Vite) y lo ejecuta en Node.
// Uso: npm run test:command
import { build } from 'rolldown'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const out = resolve('node_modules/.cache/test-command/test-command.mjs')
await build({ input: 'scripts/test-command.ts', platform: 'node', logLevel: 'silent', output: { file: out, format: 'esm' } })
await import(pathToFileURL(out).href)
