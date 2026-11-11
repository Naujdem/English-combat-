/**
 * Bot "Cadena" (parte del validador; no forma parte del juego ni abre un navegador).
 * Revisa por datos que cada escenario se pueda terminar "en papel":
 *  1. Escenas: puertas (links) que llevan a una escena que existe y a una casilla dentro del mapa; personajes y enemigos
 *     definidos, dentro del mapa, fuera de las paredes y sin compartir casilla.
 *  2. Tareas: su personaje existe y está en alguna escena; su lección, tema de práctica, temas que recupera y atuendo existen.
 *  3. Marcas: cada id que algo exige (requires de una tarea, `after` / `until` de un personaje, `after` de un enemigo) lo produce
 *     alguna tarea o enemigo, o aparece escrito en el código del juego (las marcas que pone el código, como los cierres de recuerdo).
 *  4. Simulación: se "juega" todo sin preguntas (cada tarea disponible se completa y cada enemigo visible se vence, con la
 *     misma regla taskOf del juego) hasta que nada cambie. Lo que nunca se completa está bloqueado para siempre.
 *  5. B1: los cierres de las 14 misiones y de los 3 Extras se alcanzan en la simulación.
 *     Una escena a la que solo se llega por una puerta cuenta cuando esa puerta se abre (su regla `locked`).
 * Límites: no comprueba que se pueda caminar hasta cada sitio dentro de una escena ni los minijuegos por dentro.
 */
import { SCENES } from '../src/game/helpers'
import { NPC_TASKS, taskOf } from '../src/data/tasks'
import { ENEMIES } from '../src/data/enemies'
import { NPCS } from '../src/data/npcs'
import { LESSONS } from '../src/data/lessons'
import { TOPICS } from '../src/data/questions'
import { OUTFITS } from '../src/data/school'
import type { GameState } from '../src/game/types'

export type ChainIssue = { where: string; msg: string }

/** Casillas donde no puede haber un enemigo ni llegar el jugador: pared, ventana, agua, cerca */
const SOLID = new Set(['#', 'W', 'w', 'f'])

/**
 * @param files  los archivos de src/ con su texto (para saber qué marcas pone el código y qué escenas abre el mapa)
 * @param prefix  si se da, solo se informan los problemas de escenas y tareas cuyo id empieza así (p. ej. 'b1-')
 */
export function chainIssues(files: { path: string; text: string }[], prefix = ''): ChainIssue[] {
  const out: ChainIssue[] = []
  const code = files.map((f) => f.text).join('\n')
  // Escenas que abre el mapa: su id (o la constante que lo guarda) aparece en screens/World.tsx
  const world = files.find((f) => f.path.endsWith('World.tsx'))?.text ?? ''
  const fromMap = new Set<string>()
  for (const m of code.matchAll(/export const (\w+) = '([^']+)'/g)) if (new RegExp(`\\b${m[1]}\\b`).test(world)) fromMap.add(m[2])
  for (const id of Object.keys(SCENES)) if (world.includes(`'${id}'`)) fromMap.add(id)
  // …o el mapa usa el objeto de la escena (B1_05_FLAT.id): se busca qué id tiene ese objeto
  const consts = new Map([...code.matchAll(/export const (\w+) = '([^']+)'/g)].map((m) => [m[1], m[2]]))
  for (const m of code.matchAll(/export const (\w+): SceneDef = \{\s*id: (?:'([^']+)'|(\w+))/g)) {
    const id = m[2] ?? consts.get(m[3])
    if (id && new RegExp(`\\b${m[1]}\\b`).test(world)) fromMap.add(id)
  }
  const mine = (id: string) => id.startsWith(prefix)
  const scenes = Object.values(SCENES)
  const tasks = Object.entries(NPC_TASKS)

  // ── 1. Escenas ──
  const placed = new Map<string, string>()
  for (const sc of scenes) {
    const inMap = (x: number, y: number) => y >= 0 && y < sc.map.length && x >= 0 && x < sc.map[y].length
    for (const [key, to] of Object.entries(sc.links ?? {})) {
      const dest = SCENES[to.sceneId]
      if (!dest) {
        if (mine(sc.id)) out.push({ where: `escena ${sc.id}`, msg: `la puerta ${key} lleva a "${to.sceneId}", que no existe` })
        continue
      }
      const row = dest.map[to.pos.y]
      if (mine(sc.id) && (!row || to.pos.x < 0 || to.pos.x >= row.length || SOLID.has(row[to.pos.x]))) out.push({ where: `escena ${sc.id}`, msg: `la puerta ${key} deja al jugador en (${to.pos.x},${to.pos.y}) de ${dest.id}, que está fuera del mapa o es una pared` })
    }
    const spots = new Map<string, string>()
    for (const e of sc.entities) {
      const id = 'id' in e ? e.id : e.type
      if (e.type === 'npc') {
        placed.set(e.id, sc.id)
        if (!NPCS[e.id] && mine(sc.id)) out.push({ where: `escena ${sc.id}`, msg: `el personaje ${e.id} no está definido en npcs.ts` })
      }
      if ((e.type === 'enemy' || e.type === 'boss') && !ENEMIES[e.id] && mine(sc.id)) out.push({ where: `escena ${sc.id}`, msg: `el enemigo ${e.id} no está definido` })
      if (!mine(sc.id)) continue
      if (!inMap(e.x, e.y)) out.push({ where: `escena ${sc.id}`, msg: `${id} está fuera del mapa (${e.x},${e.y})` })
      // Un personaje sí puede ir sobre una pared (objetos que se tocan: una ventana, una tele); un enemigo no
      else if ((e.type === 'enemy' || e.type === 'boss') && SOLID.has(sc.map[e.y][e.x])) out.push({ where: `escena ${sc.id}`, msg: `${id} está sobre una pared o agua (${e.x},${e.y})` })
      const k = `${e.x},${e.y}`
      // Dos en la misma casilla solo es un problema si pueden verse a la vez; se avisa cuando ninguno depende de una marca
      const gated = ('after' in e && !!e.after) || (e.type === 'npc' && !!(NPCS[e.id]?.after || NPCS[e.id]?.until))
      if (spots.has(k) && !gated && spots.get(k) !== 'gated') out.push({ where: `escena ${sc.id}`, msg: `${id} comparte la casilla (${k}) con ${spots.get(k)}` })
      spots.set(k, gated ? 'gated' : id)
    }
  }

  // ── 2. Tareas ──
  for (const [id, t] of tasks) {
    if (!mine(id)) continue
    const npc = t.npc ?? id
    if (NPCS[npc] && !placed.has(npc)) out.push({ where: `tarea ${id}`, msg: `su personaje (${npc}) no está en ninguna escena` })
    if (t.lesson && !LESSONS[t.lesson]) out.push({ where: `tarea ${id}`, msg: `la lección ${t.lesson} no existe` })
    if (t.practice && !TOPICS[t.practice]) out.push({ where: `tarea ${id}`, msg: `el tema de práctica ${t.practice} no existe` })
    for (const r of t.recover ?? []) if (!TOPICS[r]) out.push({ where: `tarea ${id}`, msg: `recupera el tema ${r}, que no existe` })
    if (t.outfit && !OUTFITS[t.outfit]) out.push({ where: `tarea ${id}`, msg: `da el atuendo ${t.outfit}, que no existe` })
  }
  for (const e of Object.values(ENEMIES)) if (mine(e.id) && e.reward && !OUTFITS[e.reward]) out.push({ where: `enemigo ${e.id}`, msg: `da el atuendo ${e.reward}, que no existe` })

  // ── 3. Marcas que algo exige ──
  const produced = new Set<string>([...tasks.map(([, t]) => t.done), ...Object.keys(ENEMIES)])
  const needs: { id: string; by: string }[] = []
  for (const [id, t] of tasks) if (t.requires) needs.push({ id: t.requires.id, by: `tarea ${id}` })
  for (const sc of scenes) for (const e of sc.entities) if ('after' in e && e.after) needs.push({ id: e.after, by: `escena ${sc.id}` })
  for (const [id, n] of Object.entries(NPCS)) {
    if (n.after) needs.push({ id: n.after, by: `personaje ${id}` })
    if (n.until) needs.push({ id: n.until, by: `personaje ${id}` })
  }
  /** Marcas que no salen de una tarea ni de un enemigo: las pone el código (se dan por buenas si el id sale de ahí) */
  const seeded = new Set<string>()
  for (const n of needs) {
    if (produced.has(n.id)) continue
    // El id aparece en el código más veces que las que lo exigen, o se arma con una función (closeId, memoryFlag): lo pone el código
    const literal = code.split(`'${n.id}'`).length - 1
    const built = /^b1-\d\d-(close|memory)$/.test(n.id)
    if (literal >= 2 || built) seeded.add(n.id)
    else if (mine(n.by.split(' ')[1] ?? '')) out.push({ where: n.by, msg: `exige la marca "${n.id}", que ninguna tarea, enemigo ni parte del código produce` })
  }

  // ── 4. Simulación ──
  const got = new Set<string>(seeded)
  const visibleNpc = (id: string) => {
    const n = NPCS[id]
    return !n?.after || got.has(n.after)
  }
  // Escenas alcanzables: las que abre el mapa (fromMap) y las que no son destino de ninguna puerta; las demás,
  // cuando una escena alcanzable tiene una puerta hacia ellas que ya no está cerrada (locked con el estado simulado)
  const targets = new Set(scenes.flatMap((sc) => Object.values(sc.links ?? {}).map((l) => l.sceneId)))
  const reach = new Set(scenes.filter((sc) => !targets.has(sc.id) || fromMap.has(sc.id) || !mine(sc.id)).map((sc) => sc.id))
  const fake = (): GameState => ({ opened: [...got], defeated: [...got], recovered: Object.keys(TOPICS), seenLesson: Object.keys(TOPICS), cards: [], relics: 99, keys: 99, coins: 0 }) as unknown as GameState
  const open = (sc: (typeof scenes)[number], key: string) => {
    const [x, y] = key.split(',').map(Number)
    try {
      return !sc.locked?.(x, y, fake())
    } catch {
      return true
    }
  }
  for (let changed = true; changed; ) {
    changed = false
    for (const sc of scenes) {
      if (!reach.has(sc.id)) continue
      for (const [key, to] of Object.entries(sc.links ?? {})) {
        if (SCENES[to.sceneId] && !reach.has(to.sceneId) && open(sc, key)) {
          reach.add(to.sceneId)
          changed = true
        }
      }
      // Puertas con destino variable (linkAt): se prueba cada casilla del mapa con el estado simulado
      if (sc.linkAt) {
        for (let y = 0; y < sc.map.length; y++)
          for (let x = 0; x < sc.map[y].length; x++) {
            let to: ReturnType<NonNullable<typeof sc.linkAt>> = null
            try {
              to = sc.linkAt(x, y, fake())
            } catch {
              to = null
            }
            if (to && SCENES[to.sceneId] && !reach.has(to.sceneId) && open(sc, `${x},${y}`)) {
              reach.add(to.sceneId)
              changed = true
            }
          }
      }
      for (const e of sc.entities) {
        if ((e.type === 'enemy' || e.type === 'boss') && !got.has(e.id) && !('after' in e && e.after && !got.has(e.after))) {
          got.add(e.id)
          changed = true
        }
        if (e.type !== 'npc' || !visibleNpc(e.id)) continue
        const t = taskOf(e.id, [...got])
        if (t && !t.blocked) {
          got.add(t.task.done)
          changed = true
        }
      }
    }
    // Tareas cuyo personaje no es un NPC del mapa (amigos, la persona especial): se completan cuando su requisito está
    for (const [id, t] of tasks) {
      if (got.has(t.done) || placed.has(t.npc ?? id)) continue
      if (!t.requires || got.has(t.requires.id)) {
        got.add(t.done)
        changed = true
      }
    }
  }
  for (const sc of scenes) if (mine(sc.id) && !reach.has(sc.id)) out.push({ where: `escena ${sc.id}`, msg: 'no se puede entrar: la puerta que lleva a ella nunca se abre' })
  const stuck = new Set(tasks.filter(([, t]) => !got.has(t.done)).map(([, t]) => t.done))
  for (const [id, t] of tasks) {
    if (!mine(id) || got.has(t.done)) continue
    const npc = t.npc ?? id
    // Solo la raíz del bloqueo: si espera a otra tarea bloqueada, o su escena no se alcanza, ya se informó arriba
    if (t.requires && stuck.has(t.requires.id)) continue
    if (placed.has(npc) && !reach.has(placed.get(npc)!)) continue
    const why = !visibleNpc(npc) ? `su personaje (${npc}) nunca aparece: espera la marca "${NPCS[npc]?.after}"` : t.requires && !got.has(t.requires.id) ? `exige "${t.requires.id}", que nunca se consigue` : `antes hay otra tarea de ${npc} que nunca se completa`
    out.push({ where: `tarea ${id}`, msg: `no se puede completar: ${why}` })
  }
  for (const sc of scenes) for (const e of sc.entities) if (mine(sc.id) && reach.has(sc.id) && e.type === 'enemy' && !got.has(e.id) && !(e.after && (stuck.has(e.after) || (ENEMIES[e.after] && !got.has(e.after))))) out.push({ where: `escena ${sc.id}`, msg: `el enemigo ${e.id} nunca aparece: espera la marca "${e.after}"` })

  // ── 5. Cierres de B1 ──
  if ('b1-'.startsWith(prefix) || prefix.startsWith('b1-')) {
    const closes = [...Array.from({ length: 14 }, (_, k) => `b1-${String(k + 1).padStart(2, '0')}-close`), 'b1-s1-close', 'b1-s2-close', 'b1-s3-close']
    for (const c of closes) {
      if (!produced.has(c)) out.push({ where: `cierre ${c}`, msg: 'ninguna tarea guarda este cierre' })
      else if (!got.has(c)) out.push({ where: `cierre ${c}`, msg: 'el cierre existe pero no se alcanza en la simulación' })
    }
  }
  return out
}
