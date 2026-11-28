// Bot Humo · B2: exporta lo que el bot necesita saber (banco, mapas, tareas, comandos y exámenes) y la partida de arranque
// de cada misión de B2 (los atajos del modo profesor, sobre la partida de la escuela). Lo usa run-b2.mjs.
import { readFileSync, writeFileSync } from 'node:fs'
import { QUESTIONS } from '../../src/data/questions'
import { NPC_TASKS } from '../../src/data/tasks'
import { NPCS } from '../../src/data/npcs'
import { SCENES } from '../../src/game/helpers'
import { PRESETS } from '../../src/game/teacher'
import { STONE_OBJECTS } from '../../src/components/StoneObjects'
import { B2_EXAM } from '../../src/data/b2Exam'
import { B1_EXAM_LISTENING, B1_EXAM_READING, B1_EXAM_SPEAKING, B1_EXAM_WRITING } from '../../src/data/b1Exam'
import * as ACT from '../../src/data/activities'
import { ENEMIES } from '../../src/data/enemies'
import type { GameState } from '../../src/game/types'

const vocab: [string, string][] = []
for (const v of Object.values(ACT)) if (Array.isArray(v)) for (const w of v as any[]) if (w && w.en && w.es) vocab.push([w.en, w.es])

/** Las órdenes de The Moving Stone escrito / Unheard: el problema y una respuesta aceptada */
const commands: { problem: string; answer: string }[] = []
for (const t of Object.values(NPC_TASKS) as any[]) {
  const room = t.command
  if (!room || room.mode !== 'text') continue
  for (const st of room.steps) {
    const a = st.accept[0]
    const obj = STONE_OBJECTS[a.object]?.names?.[0] ?? a.object
    commands.push({ problem: st.problem.en, answer: [a.verb, a.particle, `the ${obj}`, a.complement?.[0]].filter(Boolean).join(' ') })
  }
}

/** Respuestas de los exámenes (texto y habla) */
const exams = [
  { ask: B1_EXAM_WRITING.ask, answer: B1_EXAM_WRITING.model },
  ...B1_EXAM_SPEAKING.map((s) => ({ ask: s.ask, answer: s.model })),
  { ask: B2_EXAM.writing.ask, answer: B2_EXAM.writing.model },
  ...B2_EXAM.speaking.map((s) => ({ ask: s.ask, answer: s.model })),
]

const tasks = Object.entries(NPC_TASKS).map(([id, t]: [string, any]) => ({ id, npc: t.npc ?? id, done: t.done, requires: t.requires?.id ?? null }))
const npcs = Object.fromEntries(Object.entries(NPCS).map(([id, n]: [string, any]) => [id, { after: n.after ?? null, until: n.until ?? null }]))
const scenes = Object.fromEntries(
  Object.values(SCENES)
    .filter((s: any) => s.id.startsWith('b2-'))
    .map((s: any) => [s.id, { map: s.map, entities: s.entities }]),
)

/** Partida base: la de la escuela (nombres y aspecto ya elegidos) */
const school = JSON.parse(readFileSync('scripts/bot-humo/partida-escuela.json', 'utf8'))
const base: GameState = JSON.parse(school['english-combat-save-v1'])
const pad = (n: number) => String(n).padStart(2, '0')
const missions = [
  ...Array.from({ length: 14 }, (_, k) => ({ id: `b2-${pad(k + 1)}`, close: `b2-${pad(k + 1)}-close` })),
  ...[1, 2, 3].map((n) => ({ id: `b2-s${n}`, close: `b2-s${n}-close` })),
].map((m) => {
  const p = PRESETS.find((x) => x.id === m.id)
  return { ...m, name: p?.label ?? m.id, state: p ? p.apply(structuredClone(base)) : null }
})

/** Las despedidas de los jefes (opción múltiple que no está en el banco) */
const farewells = Object.values(ENEMIES).filter((e: any) => e.farewell).map((e: any) => ({ prompt: e.farewell.q, options: e.farewell.options, answer: e.farewell.answer, kind: 'fill' }))

/** Las preguntas de reading y listening de los exámenes de B1 y B2 */
const examChoices = [B1_EXAM_READING, B1_EXAM_LISTENING, B2_EXAM.reading, B2_EXAM.listening].flatMap((p) => p.questions.map((q) => ({ prompt: q.q, options: q.options, answer: q.answer, kind: 'fill' })))

const echoes = Object.values(ENEMIES).filter((e: any) => e.echo).map((e: any) => e.id)

writeFileSync(process.env.BOT_DATA!, JSON.stringify({ echoes, questions: [...QUESTIONS, ...farewells, ...examChoices], vocab, commands, exams, tasks, npcs, scenes, missions, school }))
console.log('preguntas', QUESTIONS.length, 'comandos', commands.length, 'misiones', missions.filter((m) => m.state).length)
