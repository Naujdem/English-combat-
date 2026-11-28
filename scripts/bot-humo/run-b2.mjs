// Bot "Humo" · B2: juega solo cada misión de B2 desde su atajo del modo profesor y lista los fallos. Sin IA ni internet.
// Busca en el mapa el siguiente personaje con una tarea pendiente (o el siguiente enemigo), camina hasta él y responde
// con el banco de preguntas; lo que no está en el banco (charlas sin castigo, sellos, perros…) lo prueba hasta acertar.
// Uso: npm run build && npm run bot:b2
//   BOT_PARTE=1..4 (1: misiones 1-4 + Fusion Night · 2: 5-8 + Paws Debate · 3: 9-12 + A Year Abroad · 4: 13-14)
//   BOT_MISION=b2-13 (solo una) · CHROME_PATH=/ruta/a/chrome si no hay Chromium de Playwright
import { chromium } from 'playwright'
import { readFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'rolldown'
import { preview } from 'vite'

const cache = resolve('node_modules/.cache/bot-humo')
mkdirSync(cache, { recursive: true })
process.env.BOT_DATA = resolve(cache, 'data-b2.json')
await build({ input: 'scripts/bot-humo/export-b2.ts', platform: 'node', logLevel: 'silent', output: { file: resolve(cache, 'export-b2.mjs'), format: 'esm' } })
await import(pathToFileURL(resolve(cache, 'export-b2.mjs')).href)
const server = await preview({ preview: { port: 4180, strictPort: true } })
const URL0 = 'http://localhost:4180/'

const D = JSON.parse(readFileSync(process.env.BOT_DATA, 'utf8'))
const norm = (s) => s.replace(/_{2,}/g, '?').replace(/\s+/g, ' ').trim()
const loose = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim()
const BANK = D.questions
const en2es = new Map(D.vocab.map(([a, b]) => [a.toLowerCase(), b.toLowerCase()]))
const es2en = new Map(D.vocab.map(([a, b]) => [b.toLowerCase(), a.toLowerCase()]))

const PARTS = { 1: ['b2-01', 'b2-02', 'b2-03', 'b2-04', 'b2-s1'], 2: ['b2-05', 'b2-06', 'b2-07', 'b2-08', 'b2-s2'], 3: ['b2-09', 'b2-10', 'b2-11', 'b2-12', 'b2-s3'], 4: ['b2-13', 'b2-14'] }
const only = process.env.BOT_MISION ? [process.env.BOT_MISION] : process.env.BOT_PARTE ? PARTS[process.env.BOT_PARTE] : Object.values(PARTS).flat()
const MISSIONS = D.missions.filter((m) => only.includes(m.id))

const log = []
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
const page = await ctx.newPage()
let mission = ''
page.on('pageerror', (e) => L(`!! [${mission}] ERROR DE PÁGINA:`, e.message))
page.on('console', (m) => { if (m.type() === 'error' && !/ERR_TUNNEL|Failed to load resource/.test(m.text())) L(`!! [${mission}] consola:`, m.text().slice(0, 200)) })

const BASE = /^(Mapa|Amigos|Mochila.*|Usar joystick|Usar flechas|Arriba|Izquierda|Abajo|Derecha)$/
const IGN = /^(Salir|Saltar guía|Atrás|Traducir|Ocultar.*|Escuchar.*|↶ Deshacer|Borrar|Pista de Leo|Menú|Cerrar|Después|🎤.*|Usar el micrófono|Decir la orden.*)$/

async function ui() {
  return await page.evaluate(() => {
    document.querySelectorAll('[data-bot]').forEach((e) => e.removeAttribute('data-bot'))
    const els = [...document.querySelectorAll('button, svg [role="button"]')].filter((b) => b.getClientRects().length > 0 && !b.closest('[aria-label="Partes de la lección"]'))
    const buttons = els.map((b, i) => {
      b.setAttribute('data-bot', String(i))
      const label = ((b.innerText || '').trim() || b.getAttribute('aria-label') || '?').replace(/\s+/g, ' ').trim()
      const cls = typeof b.className === 'string' ? b.className : ''
      return { i, label, disabled: !!b.disabled, primary: cls.includes('bg-gold') && cls.includes('border-gold') }
    })
    let s = null
    try { s = JSON.parse(localStorage.getItem('english-combat-save-v1')) } catch {}
    const field = [...document.querySelectorAll('input, textarea')].find((x) => x.getClientRects().length > 0)
    return { text: document.querySelector('main')?.innerText ?? document.body.innerText, buttons, s, field: field ? { tag: field.tagName.toLowerCase(), value: field.value } : null, utt: window.__utt }
  })
}
async function click(b, w = 280) {
  try { await page.locator(`[data-bot="${b.i}"]`).click({ force: true, timeout: 3000 }) } catch (e) { L(`  [${mission}] (clic falló en ${b.label}) ${e.message.split('\n')[0].slice(0, 120)}`) }
  await page.waitForTimeout(w)
}
const cands = (u) => u.buttons.filter((b) => !b.disabled && !BASE.test(b.label) && !IGN.test(b.label))

function findQ(text, pred) {
  const t = norm(text)
  let best = null
  for (const q of BANK) {
    if (!pred(q) || !q.prompt) continue
    if (t.includes(norm(q.prompt)) && (!best || q.prompt.length > best.prompt.length)) best = q
  }
  return best
}

/** Escribe en el campo visible y lo envía (Enter o el botón principal) */
async function typeAndSend(answer) {
  const f = page.locator('input:visible, textarea:visible').first()
  await f.fill(answer)
  await page.waitForTimeout(120)
  const u = await ui()
  const send = u.buttons.find((b) => !b.disabled && /^(Comprobar|Escribir|Enviar|Responder|Revisar)$/.test(b.label))
  if (send) await click(send, 800)
  else { await f.press('Enter'); await page.waitForTimeout(800) }
}

const tried = new Map()
let primRep = 0, lastSig = '', stuck = 0, fieldFails = 0

/** Un paso sobre cualquier pantalla con algo que responder */
async function step() {
  let u = await ui()
  const cs = cands(u)
  const labels = cs.map((b) => b.label)
  // Preguntas de hablar: el bot no tiene micrófono
  const nospeak = cs.find((b) => /^No puedo hablar/.test(b.label))
  if (nospeak) { await click(nospeak, 500); return 'hablar-saltada' }
  // Campos de texto: examen, órdenes de Unheard / Moving Stone, escribir una respuesta del banco
  if (u.field && !u.field.value) {
    const t = norm(u.text)
    const ex = D.exams.find((e) => t.includes(norm(e.ask)))
    if (ex && /^(Revisar|Responder)/.test(u.buttons.filter((b) => b.primary).map((b) => b.label).join('|') + '|Revisar')) { await typeAndSend(ex.answer); return 'exam' }
    const cm = D.commands.filter((c) => t.includes(norm(c.problem))).sort((a, b) => b.problem.length - a.problem.length)[0]
    if (cm) { await typeAndSend(cm.answer); return 'command' }
    const q = findQ(u.text, (q) => (q.kind ?? 'fill') === 'fill' || q.kind === 'order' || q.kind === 'fix')
    if (q) { await typeAndSend(q.kind === 'order' ? q.options.join(' ') : q.options[q.answer]); return 'write' }
    if (++fieldFails === 3) L(`  [${mission}] CAMPO DE TEXTO SIN RESPUESTA: ${t.slice(-220)}`)
    if (fieldFails >= 3) { await typeAndSend('I think so.'); return 'write?' }
  } else fieldFails = 0
  // El último botón principal (el de avanzar suele ir abajo; el índice de las lecciones resalta su parte actual arriba)
  const prim = cs.filter((b) => b.primary && !/^(Comprobar|Escribir|Enviar|Responder|Revisar)$/.test(b.label)).pop()
  if (prim && !(primRep >= 3 && lastSig === prim.label + '|' + norm(u.text).slice(-300))) {
    const sig = prim.label + '|' + norm(u.text).slice(-300)
    primRep = sig === lastSig ? primRep + 1 : 0
    lastSig = sig
    await click(prim, prim.label.includes('pelear') ? 800 : 300)
    stuck = 0
    return 'prim'
  }
  // ordenar
  if (u.buttons.some((b) => b.label === 'Comprobar') && /Palabras/.test(u.text)) {
    const q = findQ(u.text, (q) => q.kind === 'order')
    if (q) {
      for (const w of q.options) {
        u = await ui()
        const bs = u.buttons.filter((b) => !b.disabled && b.label === w)
        if (!bs.length) { L(`  [${mission}] ordenar: no encuentro la palabra "${w}" para: ${q.prompt}`); break }
        await click(bs[bs.length - 1], 110)
      }
      u = await ui()
      const c = u.buttons.find((b) => b.label === 'Comprobar' && !b.disabled)
      if (c) { await click(c, 800); return 'order' }
    } else L(`  [${mission}] ordenar SIN RESPUESTA EN BANCO: ${norm(u.text).slice(-160)}`)
  }
  // escucha
  if (/ESCUCHA/.test(u.text)) {
    const q = findQ(u.text, (q) => !!q.audio)
    if (q) { const b = cs.find((b) => b.label === q.options[q.answer]); if (b) { await click(b, 800); return 'listen' } }
    const play = u.buttons.find((b) => /^Escuchar/.test(b.label))
    if (play) { await click(play, 300); u = await ui() }
    const b = cs.find((b) => loose(b.label) === loose(u.utt))
    if (b) { await click(b, 800); return 'listen' }
  }
  // opción múltiple del banco
  {
    const t = norm(u.text)
    const qs = BANK.filter((q) => (q.kind ?? 'fill') !== 'order' && q.prompt && t.includes(norm(q.prompt)) && q.options.every((o) => labels.includes(o)))
    if (qs.length) {
      qs.sort((a, b) => b.prompt.length - a.prompt.length)
      const b = cs.find((b) => b.label === qs[0].options[qs[0].answer])
      await click(b, 800)
      return 'choice'
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
  if (!pick) { stuck++; set.clear(); pick = cs[0]; if (stuck > 3) L(`  [${mission}] ATASCADO en: ${norm(u.text).slice(-200)} · botones: ${labels.join(' | ')}`) }
  set.add(pick.label)
  if (u.s?.screen === 'battle') L(`  [${mission}] combate SIN RESPUESTA EN BANCO, pruebo "${pick.label}": ${norm(u.text).slice(-160)}`)
  await click(pick, 500)
  return 'brute'
}

// ---------- caminar hasta el siguiente objetivo ----------
const walkable = (c, x, y, map) => c === '.' || c === ',' || c === '_' || c === 'z' || c === 'r' || (c === 'd' && x > 0 && y > 0 && y < map.length - 1 && x < map[0].length - 1)
const has = (s, id) => s.opened.includes(id) || s.defeated.includes(id)
function visible(s, e) {
  if (e.type === 'npc') {
    const n = D.npcs[e.id] ?? {}
    if (n.after && !has(s, n.after)) return false
    if (n.until && has(s, n.until)) return false
    return true
  }
  // Como Explore: los enemigos vencidos se quedan en su casilla (menos los ecos, que vuelven a su tiempo)
  if (e.type === 'enemy') return !(e.after && !has(s, e.after)) && !(D.echoes.includes(e.id) && s.defeated.includes(e.id))
  if (e.type === 'interest') return !(e.after && !s.opened.includes(e.after))
  return false
}
function pendingTask(s, npcId) {
  for (const t of D.tasks) {
    // Como Explore: lo hecho y lo vencido cuentan igual (taskOf con opened + defeated)
    if (t.npc !== npcId || has(s, t.done)) continue
    return { ...t, blocked: !!t.requires && !has(s, t.requires) }
  }
  return null
}
function targets(s) {
  const sc = D.scenes[s.sceneId]
  if (!sc) return []
  const vis = sc.entities.filter((e) => visible(s, e))
  const out = []
  for (const e of vis) {
    if (e.type === 'npc') { const t = pendingTask(s, e.id); if (t && !t.blocked) out.push({ e, label: `${e.id} → ${t.id}` }) }
    else if (e.type === 'enemy' && !s.defeated.includes(e.id)) out.push({ e, label: `enemigo ${e.id}` })
  }
  // primero las tareas, después los enemigos
  return out.sort((a, b) => (a.e.type === 'enemy') - (b.e.type === 'enemy'))
}
function path(s, tx, ty) {
  const sc = D.scenes[s.sceneId]
  const map = sc.map
  const block = new Set(sc.entities.filter((e) => visible(s, e)).map((e) => `${e.x},${e.y}`))
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
      if (prev.has(id) || block.has(id) || !map[ny] || !walkable(map[ny][nx], nx, ny, map)) continue
      prev.set(id, [`${x},${y}`, k])
      q.push([nx, ny])
    }
  }
  return null
}

const school = D.school
const EXTRA = { 'b2-s1': 'Fusion Night', 'b2-s2': 'Paws Debate', 'b2-s3': 'A Year Abroad' }
async function play(m) {
  mission = m.id
  if (!m.state) return `sin atajo en el modo profesor`
  await page.goto(URL0)
  await page.evaluate(({ ls, save }) => {
    localStorage.clear()
    for (const [k, v] of Object.entries(ls)) if (k !== 'english-combat-save-v1') localStorage.setItem(k, v)
    localStorage.setItem('english-combat-save-v1', save)
  }, { ls: school, save: JSON.stringify(m.state) })
  await page.reload()
  await page.waitForTimeout(800)
  tried.clear(); primRep = 0; lastSig = ''; stuck = 0
  const tries = new Map()
  let enterTries = 0
  let waits = 0
  let idleSig = ''
  const idle = new Set()
  const t0 = Date.now()
  for (let n = 0; n < 4000; n++) {
    if (Date.now() - t0 > 8 * 60_000) return 'DEMASIADO TIEMPO (8 min)'
    const u = await ui()
    const s = u.s
    if (!s) return 'sin partida'
    if (process.env.BOT_DEBUG && n % 40 === 0) L(`  · ${n} ${s.screen} ${s.sceneId} ${s.pos.x},${s.pos.y} · ${s.opened.filter((o) => o.startsWith(m.id)).join(',')} · ${norm(u.text).slice(-140)} · [${cands(u).map((b) => b.label).join('|').slice(0, 160)}]`)
    if (s.opened.includes(m.close)) {
      // deja terminar lo que se ve (fundido de salida, avisos) antes de pasar a la siguiente
      for (let k = 0; k < 30 && cands(await ui()).length; k++) await step()
      return 'ok'
    }
    if (s.screen === 'title' || /Continuar con/.test(u.text)) {
      const b = u.buttons.find((b) => /^Continuar/.test(b.label))
      if (b && n < 20) { await click(b, 900); continue }
    }
    // En el mapa (al cargar la partida): cerrar el diario si se abrió solo, ir a B2 y tocar el lugar de la misión
    if (s.screen === 'world' && !s.opened.includes(m.close) && (enterTries++) < 8) {
      const close = u.buttons.find((b) => b.label === 'Cerrar')
      if (close) { await click(close, 400); continue }
      const lv = u.buttons.find((b) => b.label === 'Nivel B2')
      if (lv) await click(lv, 300)
      const num = /^b2-(\d\d)$/.exec(m.id)?.[1]
      const part = num ? (+num <= 4 ? '1 · Questions' : +num <= 8 ? '2 · Traces' : '3 · Use Your Voice') : 'Extras'
      const v = await ui()
      const tab = v.buttons.find((b) => b.label === part)
      if (tab) await click(tab, 300)
      const w = await ui()
      const node = w.buttons.find((b) => (num ? b.label.startsWith(`${+num}. `) : b.label.startsWith(`★. ${EXTRA[m.id]}`)))
      if (node) await click(node, 1200)
      else L(`  [${m.id}] no encuentro el lugar en el mapa: ${w.buttons.map((b) => b.label).join(' | ').slice(0, 300)}`)
      continue
    }
    if (s.screen === 'world' || s.screen === 'title') return `salió a "${s.screen}" sin cerrar la misión`
    // Una ventana abierta sin nada que tocar todavía (alguien está escribiendo, una animación): esperar
    if (s.screen !== 'battle' && !cands(u).length && u.buttons.some((b) => /^(Salir|Saltar guía|Después)$/.test(b.label))) {
      if (++waits > 60) return `ESPERANDO SIN FIN: ${norm(u.text).slice(-200)}`
      await page.waitForTimeout(500)
      continue
    }
    waits = 0
    if (s.screen === 'battle' || cands(u).length || (u.field && !u.field.value)) {
      try { await step() } catch { return `ATASCADO: ${norm(u.text).slice(-200)}` }
      if (stuck > 8) return `ATASCADO en una pantalla: ${norm(u.text).slice(-200)}`
      continue
    }
    stuck = 0
    let ts = targets(s).filter((t) => (tries.get(t.label) ?? 0) < 4)
    // Sin tarea a la vista: hay charlas que el juego abre al hablarle a alguien (amistad, misiones especiales).
    // Se le habla una vez a cada personaje visible; si nada cambia, la misión no se puede seguir
    if (!ts.length) {
      const sig = `${s.opened.length}|${s.defeated.length}`
      if (sig !== idleSig) { idleSig = sig; idle.clear() }
      const sc = D.scenes[s.sceneId]
      const npc = sc?.entities.find((e) => (e.type === 'npc' || e.type === 'interest') && visible(s, e) && !idle.has(e.id) && path(s, e.x, e.y))
      if (npc) { idle.add(npc.id); ts = [{ e: npc, label: `charla con ${npc.id}` }] }
    }
    if (!ts.length) return `SIN OBJETIVO (nada pendiente en ${s.sceneId}) · abierto: ${s.opened.filter((o) => o.startsWith(m.id)).join(', ')}`
    const t = ts[0]
    tries.set(t.label, (tries.get(t.label) ?? 0) + 1)
    if (tries.get(t.label) === 4) L(`  [${m.id}] ${t.label}: 4 intentos sin avanzar · ${norm(u.text).slice(-160)}`)
    const p = path(s, t.e.x, t.e.y)
    if (!p) { L(`  [${m.id}] SIN CAMINO a ${t.label} desde ${s.pos.x},${s.pos.y}`); tries.set(t.label, 4); continue }
    for (const k of p) { await page.keyboard.press(k); await page.waitForTimeout(140) }
    await page.waitForTimeout(700)
  }
  return 'DEMASIADOS PASOS'
}

const results = []
for (const m of MISSIONS) {
  const t0 = Date.now()
  let r
  try { r = await play(m) } catch (e) { r = `ERROR: ${e.message.slice(0, 200)}` }
  const sec = Math.round((Date.now() - t0) / 1000)
  results.push([m.id, r])
  L(`${r === 'ok' ? '✔' : '✘'} ${m.id} · ${m.name}: ${r} (${sec} s)`)
}
await browser.close()
await new Promise((r) => server.httpServer.close(r))
const fallos = log.filter((l) => l.startsWith('✘') || l.startsWith('!!'))
console.log(fallos.length ? `\nBOT HUMO · B2: ${fallos.length} fallo(s)\n${fallos.join('\n')}` : '\nBOT HUMO · B2: sin fallos')
process.exit(fallos.length ? 1 : 0)
