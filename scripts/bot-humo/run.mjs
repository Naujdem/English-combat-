// Bot "Humo": juega solo la escuela de A1 (desde después de Tom) y lista los fallos.
// Uso: npm run build && npm run bot:escuela      (CHROME_PATH=/ruta/a/chrome si no hay Chromium de Playwright)
import { chromium } from 'playwright'
import { readFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'rolldown'
import { preview } from 'vite'

const cache = resolve('node_modules/.cache/bot-humo')
mkdirSync(cache, { recursive: true })
process.env.BOT_DATA = resolve(cache, 'data.json')
await build({ input: 'scripts/bot-humo/export.ts', platform: 'node', logLevel: 'silent', output: { file: resolve(cache, 'export.mjs'), format: 'esm' } })
await import(pathToFileURL(resolve(cache, 'export.mjs')).href)
const server = await preview({ preview: { port: 4179, strictPort: true } })
const URL0 = 'http://localhost:4179/'

const D = JSON.parse(readFileSync(process.env.BOT_DATA, 'utf8'))
const LS = JSON.parse(readFileSync('scripts/bot-humo/partida-escuela.json', 'utf8'))
const norm = (s) => s.replace(/\s+/g, ' ').trim()
const loose = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim()
const BANK = [...D.questions, ...D.extra]
const en2es = new Map(D.vocab.map(([a, b]) => [a.toLowerCase(), b.toLowerCase()]))
const es2en = new Map(D.vocab.map(([a, b]) => [b.toLowerCase(), a.toLowerCase()]))

const log = []
const ep = []
const L = (...a) => { const s = a.join(' '); log.push(s); console.log(s) }

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true })
await ctx.addInitScript(() => {
  window.__utt = ''
  try {
    const orig = window.speechSynthesis.speak.bind(window.speechSynthesis)
    window.speechSynthesis.speak = (u) => { window.__utt = u.text; try { orig(u) } catch {} }
  } catch {}
})
const page = await ctx.newPage(); page.on('crash', () => L('!! PAGE CRASH'))
page.on('pageerror', (e) => L('!! ERROR DE PÁGINA:', e.message))
page.on('console', (m) => { if (m.type() === 'error' && !/ERR_TUNNEL|Failed to load resource/.test(m.text())) L('!! consola:', m.text().slice(0, 200)) })
await page.goto(URL0)
await page.evaluate((ls) => { for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v) }, LS)
await page.reload()
await page.waitForTimeout(500)

const BASE = /^(Mapa|Amigos|Mochila.*|Usar joystick|Usar flechas|Arriba|Izquierda|Abajo|Derecha)$/
const IGN = /^(Salir|Saltar guía|Atrás|Traducir|Ocultar.*|Escuchar.*|↶ Deshacer|Borrar|Pista de Leo|Menú|Cerrar)$/

async function ui() {
  return await page.evaluate(() => {
    document.querySelectorAll("[data-bot]").forEach((e) => e.removeAttribute("data-bot")); const els = [...document.querySelectorAll('button, svg [role="button"]')].filter((b) => b.getClientRects().length > 0)
    const buttons = els.map((b, i) => {
      b.setAttribute('data-bot', String(i))
      const label = ((b.innerText || '').trim() || b.getAttribute('aria-label') || '?').replace(/\s+/g, ' ').trim()
      const cls = typeof b.className === 'string' ? b.className : ''
      return { i, label, disabled: !!b.disabled, primary: cls.includes('bg-gold') && cls.includes('border-gold') }
    })
    let s = null
    try { s = JSON.parse(localStorage.getItem('english-combat-save-v1')) } catch {}
    const input = [...document.querySelectorAll('input')].some((x) => x.getClientRects().length > 0)
    return { text: document.querySelector('main').innerText, buttons, s, input, utt: window.__utt }
  })
}
async function click(b, w = 280) {
  try { await page.locator(`[data-bot="${b.i}"]`).click({ force: true, timeout: 3000 }) } catch (e) { L('  (clic falló en', b.label + ') ' + e.message.split('\n')[0].slice(0,120)) }
  await page.waitForTimeout(w)
}
const cands = (u) => u.buttons.filter((b) => !b.disabled && !BASE.test(b.label) && !IGN.test(b.label))

function findQ(text, pred) {
  const t = norm(text)
  let best = null
  for (const q of BANK) {
    if (!pred(q)) continue
    if (t.includes(norm(q.prompt)) && (!best || q.prompt.length > best.prompt.length)) best = q
  }
  return best
}

const tried = new Map()
let primRep = 0, lastSig = ''
let stuck = 0
/** Un paso sobre cualquier pantalla con algo que responder. Devuelve una descripción corta. */
async function step(ctxName) {
  let u = await ui()
  const cs = cands(u)
  const labels = cs.map((b) => b.label)
  const nospeak = cs.find((b) => /^No puedo hablar/.test(b.label))
  if (nospeak) { await click(nospeak, 500); return 'hablar-saltada' }
  const prim = cs.find((b) => b.primary && b.label !== 'Comprobar' && b.label !== 'Escribir')
  if (prim) { const sig = prim.label + '|' + norm(u.text).slice(-300); primRep = sig === lastSig ? primRep + 1 : 0; lastSig = sig; if (primRep === 8) L(`  [${ctxName}] EL BOTÓN "${prim.label}" NO AVANZA: ${norm(u.text).slice(-400)} · botones: ${u.buttons.map((b) => b.label + (b.disabled ? '(dis)' : '')).join(' | ')}`); if (primRep > 8) { throw new Error('atascado') } await click(prim, prim.label.includes('pelear') ? 800 : 300); stuck = 0; return 'prim' }
  const hasCheck = u.buttons.some((b) => b.label === 'Comprobar')
  // ordenar
  if (hasCheck && /Palabras/.test(u.text) && !u.input) {
    const q = findQ(u.text, (q) => q.kind === 'order')
    if (q) {
      for (const w of q.options) {
        u = await ui()
        const bs = u.buttons.filter((b) => !b.disabled && b.label === w)
        if (!bs.length) { L(`  [${ctxName}] ordenar: no encuentro la palabra "${w}" para: ${q.prompt}`); break }
        await click(bs[bs.length - 1], 110)
      }
      u = await ui()
      const c = u.buttons.find((b) => b.label === 'Comprobar' && !b.disabled)
      if (c) { await click(c, 800); return 'order' }
    } else L(`  [${ctxName}] ordenar SIN RESPUESTA EN BANCO: ${norm(u.text).slice(-160)}`)
  }
  // escribir
  if (u.input) {
    const q = findQ(u.text, (q) => (q.kind ?? 'fill') === 'fill' || q.kind === 'order')
    if (q) {
      const ans = q.kind === 'order' ? q.options.join(' ') : q.options[q.answer]
      await page.locator('input').first().fill(ans)
      u = await ui()
      const c = u.buttons.find((b) => (b.label === 'Comprobar' || b.label === 'Escribir') && !b.disabled)
      if (c) { await click(c, 800); return 'write' }
    } else L(`  [${ctxName}] escribir SIN RESPUESTA EN BANCO: ${norm(u.text).slice(-160)}`)
  }
  // escucha
  if (/ESCUCHA/.test(u.text)) {
    const q = findQ(u.text, (q) => !!q.audio)
    if (q) { const b = cs.find((b) => b.label === q.options[q.answer]); if (b) { await click(b, 800); return 'listen' } }
    const play = u.buttons.find((b) => /^Escuchar/.test(b.label))
    if (play) { await click(play, 300); u = await ui() }
    const b = cs.find((b) => loose(b.label) === loose(u.utt))
    if (b) { await click(b, 800); return 'listen' }
    L(`  [${ctxName}] escucha: no pude saber qué se oyó (utt="${u.utt}") opciones: ${labels.join(' | ')}`)
  }
  // opción múltiple del banco
  {
    const t = norm(u.text)
    const qs = BANK.filter((q) => (q.kind ?? 'fill') !== 'order' && t.includes(norm(q.prompt)) && q.options.every((o) => labels.includes(o)))
    if (qs.length) {
      qs.sort((a, b) => b.prompt.length - a.prompt.length)
      const b = cs.find((b) => b.label === qs[0].options[qs[0].answer])
      await click(b, 800); return 'choice'
    }
  }
  // vocabulario
  for (const b of cs) {
    const lb = b.label.toLowerCase()
    const lines = u.text.toLowerCase().split('\n').map((x) => x.trim().replace(/[¿?"“”]/g, ''))
    if (lines.some((ln) => en2es.get(ln) === lb || es2en.get(ln) === lb)) { await click(b, 400); return 'vocab' }
  }
  if (!cs.length) { stuck++; await page.waitForTimeout(400); return 'nada' }
  // fuerza bruta (actividades sin castigo)
  const key = [...labels].sort().join('|')
  const set = tried.get(key) ?? new Set()
  tried.set(key, set)
  let pick = cs.find((b) => !set.has(b.label))
  if (!pick) { stuck++; set.clear(); pick = cs[0]; if (stuck > 3) L(`  [${ctxName}] ATASCADO en: ${norm(u.text).slice(-200)} · botones: ${labels.join(' | ')}`) }
  set.add(pick.label)
  if (u.s?.screen === 'battle') L(`  [${ctxName}] combate SIN RESPUESTA EN BANCO, pruebo "${pick.label}": ${norm(u.text).slice(-200)}`)
  await click(pick, 500)
  return 'brute'
}

// ---------- exploración ----------
const MAP = D.map
function walk(c, door) { return c === '.' || c === ',' || c === 'd' || (c === 'X' && door) }
function path(s, tx, ty) {
  const door = (s.keys.school ?? 0) >= 4
  const block = new Set(D.entities.filter((e) => !(e.type === 'chest' && s.opened.includes(e.id))).map((e) => `${e.x},${e.y}`))
  const start = `${s.pos.x},${s.pos.y}`
  const prev = new Map([[start, null]])
  const q = [[s.pos.x, s.pos.y]]
  const dirs = [[0, -1, 'ArrowUp'], [0, 1, 'ArrowDown'], [-1, 0, 'ArrowLeft'], [1, 0, 'ArrowRight']]
  while (q.length) {
    const [x, y] = q.shift()
    for (const [dx, dy, k] of dirs) {
      const nx = x + dx, ny = y + dy
      if (nx === tx && ny === ty) {
        const keys = [k]
        let cur = `${x},${y}`
        while (prev.get(cur)) { keys.unshift(prev.get(cur)[1]); cur = prev.get(cur)[0] }
        return keys
      }
      const id = `${nx},${ny}`
      if (prev.has(id) || block.has(id) || !MAP[ny] || !walk(MAP[ny][nx], door)) continue
      prev.set(id, [`${x},${y}`, k])
      q.push([nx, ny])
    }
  }
  return null
}

const op = (id) => (s) => s.opened.includes(id)
const def = (id) => (s) => s.defeated.includes(id)
const GOALS = [
  ['Ana (útiles)', 1, 9, op('school-supplies'), 4],
  ['Pizarra sesión 2', 3, 0, op('board-2'), 3],
  ['Rick', 8, 2, def('school-m2'), 4],
  ['Pizarra sesión 3', 3, 0, op('board-3'), 3],
  ['Bella', 9, 6, def('school-m3'), 4],
  ['Pizarra sesión 4', 3, 0, op('board-4'), 3],
  ['Entrenador (silbato)', 11, 11, op('school-whistle'), 6],
  ['Max', 13, 12, def('school-patio'), 4],
  ['Secretaría (uniforme)', 13, 6, op('school-registration'), 4],
  ['Cofre', 7, 11, op('school-chest'), 2],
  ['Charla con Leo', 1, 3, null, 1],
  ['Charla con Maya', 7, 7, null, 1],
  ['Charla con persona especial', 9, 11, null, 1],
  ['Mr. Brown (cosas olvidadas)', 8, 11, op('school-whose'), 6],
  ['Ben (una o varias)', 12, 14, op('school-many'), 6],
  ['Estantería (vocabulario)', 8, 9, null, 1],
  ['Grimm sin requisitos (prueba de puerta)', 4, 12, null, 0],
  ['Profesor Grimm', 7, 14, def('school-boss'), 6],
]

async function enterSchool() {
  for (let i = 0; i < 12; i++) {
    const u = await ui()
    if (u.s?.screen === 'explore' && !/Continuar con/.test(u.text)) return
    const b = u.buttons.find((b) => /^Continuar con|^Entrar a Escuela/.test(b.label))
    if (b) await click(b, 900); else await page.waitForTimeout(400)
  }
}
await enterSchool()

for (const [name, tx, ty, done, maxTry] of GOALS) {
  let tries = 0, steps = 0, hp0 = null, battles = 0, lostHp = 0, kinds = {}
  let inBattle = false
  let result = '??'
  for (;;) {
    if (++steps > 500) { result = 'DEMASIADOS PASOS'; break }
    const u = await ui()
    const s = u.s
    if (!s) { result = 'sin partida'; break }
    if (s.screen === 'epilogue' || s.screen === 'world') { result = done && done(s) ? 'ok' : `salió a ${s.screen}`; break }
    if (s.screen === 'battle') {
      if (!inBattle) { inBattle = true; battles++; hp0 = s.hp }
      if (hp0 !== null && s.hp < hp0) { lostHp += hp0 - s.hp; L(`  [${name}] perdí vida aquí: ${norm(u.text).slice(-220)}`) }
      hp0 = s.hp
      const k = await step(name); kinds[k] = (kinds[k] ?? 0) + 1
      continue
    }
    inBattle = false
    if (cands(u).length) { const k = await step(name); kinds[k] = (kinds[k] ?? 0) + 1; if (stuck > 6) { const ex = u.buttons.find((b) => /^(Salir|Saltar guía|Saltar)$/.test(b.label)); L(`  [${name}] salgo de la pantalla atascada con "${ex?.label}"`); if (ex) await click(ex); stuck = 0 } continue }
    stuck = 0
    if (done ? done(s) : tries >= maxTry) { result = 'ok'; break }
    if (tries >= maxTry) { result = `NO SE CUMPLIÓ tras ${tries} intentos · último mensaje: ${norm(u.text).slice(-220)}`; break }
    const p = path(s, tx, ty)
    if (!p) { result = `SIN CAMINO desde ${s.pos.x},${s.pos.y}`; break }
    for (const k of p) { await page.keyboard.press(k); await page.waitForTimeout(95) }
    await page.waitForTimeout(700)
    tries++
    if (!done) { const v = await ui(); L(`  [${name}] dice: ${norm(v.text).replace(/^.*Patio( ! )*/, '').slice(0, 260)}`) }
  }
  const s = (await ui()).s
  L(`${result === 'ok' ? '✔' : '✘'} ${name}: ${result} · pasos=${steps} combates=${battles} vidaPerdida=${lostHp} ${JSON.stringify(kinds)} · hp=${s?.hp} llaves=${s?.keys?.school ?? 0} escudos=${s?.items?.shield}`)
  if (s?.screen === 'epilogue' || s?.screen === 'world') break
}

// ---------- final del capítulo ----------
for (let i = 0; i < 400; i++) {
  const u = await ui()
  if (u.s?.screen === 'world') break
  if (u.s?.screen === 'epilogue' && i % 1 === 0) { const t = norm(u.text).slice(0, 110); if (ep[ep.length - 1] !== t) ep.push(t) }
  await step('Final')
}
const u = await ui()
const s = u.s
L(`FINAL: pantalla=${s.screen} · vistos ${ep.length} textos del epílogo`)
L(`ESTADO: recuperado=${s.recovered} reliquias=${s.relics} llaves=${JSON.stringify(s.keys)} atuendos=${s.outfits} fichas=${s.cards.length} errores=${s.mistakes.length} amistad=${JSON.stringify(s.friendship)}`)
L(`ABIERTO: ${s.opened.join(',')}`)
L(`MAPA: ${norm(u.text).slice(0, 300)}`)
await browser.close()
await new Promise((r) => server.httpServer.close(r))
const fallos = log.filter((l) => l.startsWith('✘') || l.startsWith('!!') || /ATASCADO|NO AVANZA/.test(l))
if (s.screen !== 'world') fallos.push('El capítulo no llegó al mapa')
console.log(fallos.length ? `\nBOT HUMO · ESCUELA: ${fallos.length} fallo(s)` : '\nBOT HUMO · ESCUELA: sin fallos')
process.exit(fallos.length ? 1 : 0)
