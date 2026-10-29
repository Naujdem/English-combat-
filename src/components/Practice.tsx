import { useState } from 'react'
import type { GameState, Question, TopicId } from '../game/types'
import type { Update } from '../game/store'
import { pickQuestion, questionById, TOPICS } from '../data/questions'
import { recordAnswer } from '../game/helpers'
import { FRIENDS } from '../data/friends'
import { QuestionCard, correctSentence } from './QuestionCard'
import { GrammarPattern, RoleSentence } from './Grammar'
import { SpriteBody } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'

const SIZE = 6

/**
 * Práctica con Leo después de perder un combate: repasa lo que se falló,
 * con la estructura de la frase a la vista y las palabras coloreadas. No quita vida.
 */
export function Practice({
  state,
  update,
  failed = [],
  review,
  onClose,
}: {
  state: GameState
  update: Update
  /** Preguntas falladas en el combate */
  failed?: string[]
  /** Repaso fuera de la historia: el tema elegido */
  review?: TopicId
  onClose: () => void
}) {
  const [queue] = useState<Question[]>(() => {
    if (review) {
      // Como en las apps de idiomas: primero armar frases, luego completar, al final corregir
      const list: Question[] = []
      const plan: Question['kind'][] = ['order', 'order', 'fill', 'fill', 'fix', 'order', 'fill', 'fix']
      for (const k of plan) {
        const q = pickQuestion([review], [k ?? 'fill'], list.map((x) => x.id), state.mistakes)
        if (q && q.topic === review && !list.some((x) => x.id === q.id)) list.push(q)
      }
      return list
    }
    const fromFight = [...new Set(failed)].map((id) => questionById(id)).filter((q): q is Question => !!q && q.kind !== 'speak')
    const topics = [...new Set(fromFight.map((q) => q.topic))] as TopicId[]
    const list = fromFight.slice(0, 3)
    let guard = 0
    while (list.length < SIZE && topics.length && guard++ < 40) {
      const q = pickQuestion(topics, ['fill', 'fix', 'order'], list.map((x) => x.id), state.mistakes)
      if (!list.some((x) => x.id === q.id)) list.push(q)
    }
    return list
  })
  const topics = [...new Set(queue.map((q) => q.topic))] as TopicId[]
  const [i, setI] = useState(-1)
  const [result, setResult] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= queue.length
  const q = queue[i]

  function answer(ok: boolean) {
    setResult(ok)
    if (ok) {
      setScore((n) => n + 1)
      update((s) => ({ ...s, mistakes: s.mistakes.filter((id) => id !== q.id) }))
    }
    update((s) => recordAnswer(s, q, ok))
  }

  function next() {
    setResult(null)
    setI(i + 1)
  }

  const names = topics.map((t) => TOPICS[t].name.toLowerCase()).join(' y ')
  const ready = score >= Math.ceil(queue.length * 0.65)

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{review ? `Repaso · ${TOPICS[review].name}` : 'Práctica con Leo'}</p>
            <p className="font-display text-lg">{i < 0 ? (review ? 'La estructura' : 'Antes de volver a intentarlo') : done ? 'Resultado' : `Pregunta ${i + 1} de ${queue.length}`}</p>
          </div>
          <button className={btnGhost} onClick={onClose}>Salir</button>
        </div>

        {i < 0 && (
          <Panel>
            <div className="flex items-center gap-3">
              <svg width="56" height="56" viewBox="0 0 32 32" aria-hidden="true">
                <SpriteBody look={FRIENDS.leo.look} />
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg text-gold">Leo</p>
                  <SpeakButton text="Don't worry! Let's practice together." size="sm" />
                </div>
                <p className="text-[16px]">"Don't worry! Let's practice together."</p>
              </div>
            </div>
            <p className="mt-3 text-[15px] text-paper/85">
              {review ? (
                <>Repaso de <b>{names}</b>. Mira la estructura y practica {queue.length} frases: primero armar frases, luego completar y corregir. Las palabras tienen colores para ayudarte.</>
              ) : (
                <>Te costó: <b>{names}</b>. Mira la estructura y practica {queue.length} frases. Aquí no pierdes vida, y las palabras tienen colores para ayudarte.</>
              )}
            </p>
            <div className="mt-3 grid gap-2">
              {topics.map((t) => (
                <GrammarPattern key={t} topic={t} />
              ))}
            </div>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={() => setI(0)} autoFocus disabled={queue.length === 0}>
              Empezar
            </button>
          </Panel>
        )}

        {!done && q && (
          <>
            <GrammarPattern topic={q.topic} sentence={correctSentence(q)} compact />
            <Panel key={q.id}>
              <QuestionCard q={q} speaker="La frase" colorTiles onAnswer={answer} />
              {result !== null && (
                <div className={`anim-fade-in mt-3 rounded-xl p-3 ${result ? 'bg-hp/10' : 'bg-panel-2'}`}>
                  <p className={`text-sm font-semibold ${result ? 'text-hp' : 'text-gold'}`}>{result ? '¡Muy bien!' : 'Leo te explica'}</p>
                  {!result && <p className="mt-0.5 text-[15px] leading-snug">{q.tip}</p>}
                  <div className="mt-2 flex items-center gap-2">
                    <RoleSentence text={correctSentence(q)} topic={q.topic} size="sm" />
                    <SpeakButton text={correctSentence(q)} size="sm" />
                  </div>
                  <button className={`${btnPrimary} mt-3 w-full`} onClick={next} autoFocus>
                    {i + 1 < queue.length ? 'Siguiente' : 'Terminar'}
                  </button>
                </div>
              )}
            </Panel>
          </>
        )}

        {done && (
          <Panel className="anim-pop border-gold">
            <p className="font-display text-xl text-gold">
              {score} de {queue.length} correctas
            </p>
            <p className="mt-1 text-[16px]">
              {review
                ? ready
                  ? 'Leo: "Great job!" Dominas cada vez mejor este tema.'
                  : 'Leo: "Good try! Practice a little more." Puedes repetir el repaso cuando quieras.'
                : ready
                  ? 'Leo: "You\'re ready! Try again!" Ya puedes volver a retarlo.'
                  : 'Leo: "Good try! Practice a little more." Puedes repasar otra vez en tu cuaderno de errores.'}
            </p>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={onClose} autoFocus>
              Volver
            </button>
          </Panel>
        )}
      </div>
    </div>
  )
}
