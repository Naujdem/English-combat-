import { useState } from 'react'
import type { GameState, TopicId } from '../game/types'
import type { Update } from '../game/store'
import { TOPICS } from '../data/questions'
import { LESSONS } from '../data/lessons'
import { WORLD } from '../data/world'
import { ENEMIES } from '../data/enemies'
import { DIARY } from '../data/diary'
import { dueCards } from '../game/cards'
import { useTeacher } from '../game/teacher'
import { GrammarPattern } from './Grammar'
import { Lesson } from './Lesson'
import { Practice } from './Practice'
import { btn, btnGhost, Panel } from './ui'

/** Temas de A1 en el orden en que aparecen en el juego */
export const A1_ORDER: TopicId[] = ['greetings', 'to-be', 'possessives', 'prepositions', 'imperatives', 'there-is', 'demonstratives', 'ordering', 'present-simple', 'likes', 'can', 'present-continuous', 'have-got', 'do-does', 'plurals', 'time', 'object-pronouns', 'could-you']

export function mastery(s: GameState, t: TopicId) {
  const st = s.stats[t] ?? { ok: 0, fail: 0 }
  const total = st.ok + st.fail
  const pct = total ? st.ok / total : 0
  const label = total === 0 ? 'Sin practicar' : total < 5 ? 'Empezando' : pct >= 0.85 && total >= 10 ? 'Dominado' : pct >= 0.6 ? 'Bien' : 'Practicando'
  const color = label === 'Dominado' ? '#3aa864' : label === 'Bien' ? '#5d8fd4' : label === 'Practicando' ? '#e0a526' : '#6b6359'
  return { ...st, total, pct, label, color }
}

/** Un tema se puede repasar cuando ya apareció en la historia */
function unlocked(s: GameState, t: TopicId, teacher: boolean) {
  // Solo después de que Leo dio la lección del tema en la historia
  return teacher || s.seenLesson.includes(t)
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/35">
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.round(value * 100)}%`, background: color }} />
    </div>
  )
}

/** Repaso fuera de la historia: cada tema con su estructura, la explicación de Leo y práctica */
export function Review({ state, update, onClose }: { state: GameState; update: Update; onClose: () => void }) {
  const teacher = useTeacher().on
  const [lesson, setLesson] = useState<TopicId | null>(null)
  const [practice, setPractice] = useState<TopicId | null>(null)

  if (lesson)
    return (
      <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
        <Lesson state={state} steps={(LESSONS[lesson] ?? []).map((st) => ({ ...st, topic: lesson }))} title={`Repaso · ${TOPICS[lesson].name}`} onDone={() => setLesson(null)} />
      </div>
    )
  if (practice) return <Practice state={state} update={update} review={practice} onClose={() => setPractice(null)} />

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Repasar</p>
            <p className="font-display text-lg">Gramática A1, tema por tema</p>
          </div>
          <button className={btnGhost} onClick={onClose}>Cerrar</button>
        </div>
        <p className="text-sm text-paper/65">Fuera de la historia: mira la estructura, vuelve a ver la explicación de Leo o practica sin perder vida.</p>

        {A1_ORDER.filter((t) => unlocked(state, t, teacher)).map((t, k) => {
          const open = true
          const m = mastery(state, t)
          return (
            <Panel key={t} className={open ? '' : 'opacity-60'}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg">
                  <span className="text-paper/45">{k + 1}. </span>
                  {TOPICS[t].name}
                </p>
                <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: `${m.color}33`, color: m.color === '#6b6359' ? '#b9b0a3' : m.color }}>
                  {open ? m.label : 'Bloqueado'}
                </span>
              </div>
              {open ? (
                <>
                  <div className="mt-2">
                    <GrammarPattern topic={t} compact />
                  </div>
                  <div className={`mt-3 grid gap-2 ${LESSONS[t] ? 'grid-cols-2' : ''}`}>
                    {LESSONS[t] && <button className={`${btn} text-sm`} onClick={() => setLesson(t)}>Explicación de Leo</button>}
                    <button className={`${btn} border-gold text-sm`} onClick={() => setPractice(t)}>Practicar</button>
                  </div>
                </>
              ) : (
                <p className="mt-1 text-sm text-paper/60">Se desbloquea al llegar a este tema en la historia.</p>
              )}
            </Panel>
          )
        })}
        {A1_ORDER.some((t) => !unlocked(state, t, teacher)) && (
          <p className="px-1 text-center text-sm text-paper/55">Aparecerán más temas cuando Leo te los enseñe en la historia.</p>
        )}
      </div>
    </div>
  )
}

/** Mi progreso: lugares, piezas, temas y repaso */
export function ProgressView({ state, onClose, onReview }: { state: GameState; onClose: () => void; onReview: () => void }) {
  const teacher = useTeacher().on
  const shown = A1_ORDER.filter((t) => unlocked(state, t, teacher))
  const bosses = WORLD.filter((n) => n.sceneId)
  const places = WORLD.filter((n) => Object.values(ENEMIES).some((e) => e.kind === 'boss' && e.id.startsWith(n.id) && state.defeated.includes(e.id))).length
  const minions = Object.values(ENEMIES).filter((e) => e.kind === 'minion' && state.defeated.includes(e.id)).length
  const diaries = DIARY.flatMap((c) => c.versions).filter((v) => state.opened.includes(`diary-${v.id}`)).length
  const all = A1_ORDER.map((t) => mastery(state, t))
  const answered = all.reduce((n, m) => n + m.total, 0)
  const right = all.reduce((n, m) => n + m.ok, 0)

  const facts: [string, string][] = [
    ['Lugares completados', `${places} de ${WORLD.length}`],
    ['Piezas del reloj', `${Math.min(state.relics, WORLD.length)} de ${WORLD.length}`],
    ['Personas liberadas', `${minions + places}`],
    ['Respuestas correctas', answered ? `${right} de ${answered} (${Math.round((right / answered) * 100)}%)` : 'Aún no hay'],
    ['Fichas', `${state.cards.length} (${dueCards(state.cards).length} para hoy)`],
    ['Diario', `${diaries} lecturas completas`],
    ['En el cuaderno de errores', `${state.mistakes.length}`],
  ]

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Mi progreso</p>
            <p className="font-display text-lg">{state.hero.name || 'Tu personaje'} · Nivel A1</p>
          </div>
          <button className={btnGhost} onClick={onClose}>Cerrar</button>
        </div>

        <Panel>
          <dl className="grid gap-1.5 text-[15px]">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-line/60 pb-1.5 last:border-0">
                <dt className="text-paper/70">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-paper/50">{bosses.length} de {WORLD.length} lugares de A1 ya se pueden jugar.</p>
        </Panel>

        <Panel>
          <p className="font-display text-lg">Temas</p>
          <p className="text-sm text-paper/60">Según tus respuestas en combates, prácticas y el cuaderno.</p>
          <div className="mt-3 grid gap-3">
            {shown.map((t) => {
              const m = mastery(state, t)
              return (
                <div key={t}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                    <span>{TOPICS[t].name}</span>
                    <span className="text-paper/65">
                      {m.total ? `${Math.round(m.pct * 100)}% · ` : ''}
                      <span style={{ color: m.color === '#6b6359' ? undefined : m.color }}>{m.label}</span>
                    </span>
                  </div>
                  <Bar value={m.total ? m.pct : 0} color={m.color} />
                </div>
              )
            })}
          </div>
          {shown.length < A1_ORDER.length && (
            <p className="mt-3 text-sm text-paper/55">Y {A1_ORDER.length - shown.length} temas más por descubrir en la historia.</p>
          )}
          <button className={`${btn} mt-4 w-full border-gold`} onClick={onReview}>Repasar un tema</button>
        </Panel>
      </div>
    </div>
  )
}
