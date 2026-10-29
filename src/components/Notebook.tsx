import { useMemo, useState } from 'react'
import type { GameState, Question } from '../game/types'
import type { Update } from '../game/store'
import { questionById, TOPICS } from '../data/questions'
import { QuestionCard } from './QuestionCard'
import { recordAnswer } from '../game/helpers'
import { btnGhost, btnPrimary, Overlay, Panel } from './ui'
import { VerbTable } from './VerbBook'

const SESSION = 6

/**
 * Cuaderno de errores de Leo: guarda las preguntas falladas en combate.
 * Al repasarlas y acertarlas se borran. Si borras 3 o más en un repaso, ganas un escudo.
 */
export function Notebook({ state, update, onClose }: { state: GameState; update: Update; onClose: () => void }) {
  const pending = useMemo(
    () => state.mistakes.map((id) => questionById(id)).filter((q): q is Question => !!q),
    // Solo al abrir: la lista no cambia mientras se repasa
    [],
  )
  const session = useMemo(() => pending.slice(0, SESSION), [pending])
  const [started, setStarted] = useState(false)
  const [i, setI] = useState(0)
  const [result, setResult] = useState<boolean | null>(null)
  const [cleared, setCleared] = useState(0)
  const done = started && i >= session.length
  const q = session[i]

  const byTopic = pending.reduce<Record<string, number>>((acc, x) => {
    acc[x.topic] = (acc[x.topic] ?? 0) + 1
    return acc
  }, {})

  function answer(ok: boolean) {
    setResult(ok)
    if (ok) {
      setCleared((c) => c + 1)
      update((s) => ({ ...s, mistakes: s.mistakes.filter((id) => id !== q.id) }))
    }
    update((s) => recordAnswer(s, q, ok))
  }

  function finish() {
    if (cleared >= 3) update((s) => ({ ...s, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
    onClose()
  }

  return (
    <Overlay onClose={started && !done ? undefined : onClose}>
      <Panel className="max-h-[85vh] overflow-y-auto">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Cuaderno de Leo</p>
            <h2 className="font-display text-xl">Cuaderno de errores</h2>
          </div>
          <button className={btnGhost} onClick={done ? finish : onClose}>Cerrar</button>
        </div>

        {!started && pending.length === 0 && (
          <p className="text-[15px] text-paper/80">
            Tu cuaderno está vacío. Cuando falles una pregunta en combate, Leo la anotará aquí para que la repases.
          </p>
        )}

        {!started && pending.length > 0 && (
          <>
            <p className="text-[15px] text-paper/80">
              Tienes <b>{pending.length}</b> {pending.length === 1 ? 'pregunta pendiente' : 'preguntas pendientes'}. Mientras estén aquí, los enemigos te las volverán a hacer.
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {Object.entries(byTopic).map(([t, n]) => (
                <li key={t} className="rounded-full bg-panel-2 px-2.5 py-1 text-xs text-paper/80">
                  {TOPICS[t as keyof typeof TOPICS].name}: {n}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-paper/55">Si en un repaso aciertas 3 o más, ganas un escudo de palabras.</p>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={() => setStarted(true)} autoFocus>
              Repasar {Math.min(SESSION, pending.length)}
            </button>
          </>
        )}

        {!started && state.opened.includes('past-verbbook') && (
          <details className="mt-4 rounded-xl border-2 border-line px-3 py-2">
            <summary className="cursor-pointer font-display text-lg">Libro de verbos irregulares</summary>
            <p className="mb-2 mt-1 text-sm text-paper/70">El libro de Joe (1996): el pasado irregular va en morado. Toca el parlante para escucharlos.</p>
            <VerbTable />
          </details>
        )}

        {started && !done && q && (
          <div className="anim-fade-in">
            <p className="mb-2 text-xs text-paper/50">{i + 1} de {session.length}</p>
            <QuestionCard key={q.id} q={q} speaker="El enemigo" onAnswer={answer} />
            {result !== null && (
              <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 p-3">
                {result ? (
                  <p className="text-sm font-semibold text-hp">¡Bien! Se borró del cuaderno.</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gold">Leo</p>
                    <p className="text-[15px] leading-snug">{q.tip}</p>
                    <p className="mt-1 text-xs text-paper/50">Sigue en el cuaderno.</p>
                  </>
                )}
                <div className="mt-3 flex justify-end">
                  <button className={btnPrimary} onClick={() => { setResult(null); setI(i + 1) }} autoFocus>Siguiente</button>
                </div>
              </div>
            )}
          </div>
        )}

        {done && (
          <div className="anim-fade-in">
            <p className="font-display text-2xl">Borraste {cleared} de {session.length}</p>
            <p className="mt-1 text-[15px] text-paper/80">
              {cleared >= 3
                ? state.items.shield >= 2
                  ? '¡Excelente repaso! Ya tienes el máximo de escudos.'
                  : '¡Excelente repaso! Leo te da un escudo de palabras.'
                : 'Sigue repasando: lo que falla hoy, se aprende mañana.'}
            </p>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={finish} autoFocus>Continuar</button>
          </div>
        )}
      </Panel>
    </Overlay>
  )
}
