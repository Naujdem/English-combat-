import { useEffect, useState, type ReactNode } from 'react'
import type { Question } from '../game/types'
import { TOPICS } from '../data/questions'
import { btnPrimary } from './ui'
import { SpeakButton } from './SpeakButton'
import { speak } from '../game/speech'

/** Desordena índices 0..n-1 asegurando que no queden en el orden correcto */
function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  if (n < 2) return a
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
  } while (a.every((v, i) => v === i))
  return a
}

/** La frase correcta completa de una pregunta, para mostrarla o leerla en voz alta */
export function correctSentence(q: Question): string {
  if (q.kind === 'order') return q.options.join(' ')
  if (q.kind === 'fix' || q.kind === 'listen') return q.options[q.answer]
  return q.prompt.replace('___', q.options[q.answer])
}

/**
 * Muestra una pregunta de cualquier tipo (completar, corregir, ordenar o escuchar)
 * y avisa con onAnswer si fue correcta. El padre decide qué pasa después.
 * Se debe montar con key={q.id} para que cada pregunta empiece de cero.
 */
export function QuestionCard({
  q,
  speaker,
  hint,
  headerRight,
  onAnswer,
}: {
  q: Question
  /** Quién dice la frase con error en las preguntas de corregir */
  speaker?: string
  /** Cuando pasa a true, se aplica la pista de Leo */
  hint?: boolean
  headerRight?: ReactNode
  onAnswer: (ok: boolean) => void
}) {
  const kind = q.kind ?? 'fill'
  const [order] = useState(() => shuffled(q.options.length))
  const [placed, setPlaced] = useState<number[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState<null | boolean>(null)
  const [removed, setRemoved] = useState<number | null>(null)
  const ask = answered === null

  // Las preguntas de escucha se leen solas al aparecer
  useEffect(() => {
    if (kind === 'listen') {
      const t = window.setTimeout(() => speak(q.prompt), 350)
      return () => window.clearTimeout(t)
    }
  }, [kind, q.prompt])

  // Pista de Leo: quita una opción incorrecta, o coloca la primera palabra al ordenar
  useEffect(() => {
    if (!hint || !ask) return
    if (kind === 'order') {
      const idx = order.find((i) => q.options[i] === q.options[0])!
      setPlaced([idx])
    } else {
      const wrong = q.options.map((_, i) => i).filter((i) => i !== q.answer)
      setRemoved(wrong[Math.floor(Math.random() * wrong.length)])
    }
  }, [hint])

  function finish(ok: boolean) {
    setAnswered(ok)
    onAnswer(ok)
  }

  function choose(k: number) {
    if (!ask) return
    setPicked(k)
    finish(k === q.answer)
  }

  function checkOrder() {
    if (!ask || placed.length !== q.options.length) return
    finish(placed.map((i) => q.options[i]).join(' ') === q.options.join(' '))
  }

  const label =
    kind === 'fix' ? '¡Corrige al enemigo!' : kind === 'order' ? 'Ordena la frase' : kind === 'listen' ? 'Escucha y elige' : TOPICS[q.topic].name
  const filled = kind === 'fill' && answered ? q.prompt.replace('___', q.options[q.answer]) : q.prompt

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{label}</p>
        {headerRight}
      </div>

      {kind === 'fill' && (
        <div className="flex items-start gap-2">
          <p className="flex-1 font-display text-[22px] leading-snug" data-testid="prompt">{filled}</p>
          {answered && <SpeakButton text={filled} size="sm" />}
        </div>
      )}

      {kind === 'fix' && (
        <>
          <p className="text-sm text-paper/60">{speaker ?? 'El enemigo'} dice:</p>
          <div className="flex items-start gap-2">
            <p
              className={`flex-1 font-display text-[22px] leading-snug ${ask ? 'text-[#f3b0b0]' : 'text-paper/50 line-through decoration-danger'}`}
              data-testid="prompt"
            >
              "{q.prompt}"
            </p>
          </div>
          <p className="mt-2 text-sm text-paper/70">¿Cuál es la forma correcta?</p>
        </>
      )}

      {kind === 'listen' && (
        <div className="flex items-center gap-3">
          <SpeakButton text={q.prompt} size="lg" label="Escuchar la frase" />
          <p className="text-sm text-paper/70">
            Toca la bocina para escuchar. Dos toques seguidos: más lento.
          </p>
        </div>
      )}

      {kind === 'order' ? (
        <>
          <p className="text-sm text-paper/60">Escribe en inglés:</p>
          <p className="font-display text-[20px] leading-snug" data-testid="prompt">{q.prompt}</p>
          <div
            className={`mt-3 flex min-h-[52px] flex-wrap items-center gap-1.5 rounded-xl border-2 border-dashed p-2 ${
              ask ? 'border-line' : answered ? 'border-hp bg-hp/10' : 'border-danger bg-danger/10'
            }`}
            aria-label="Tu frase"
          >
            {placed.length === 0 && <span className="px-1 text-sm text-paper/40">Toca las palabras en orden</span>}
            {placed.map((i, k) => (
              <button
                key={`${i}-${k}`}
                className="rounded-lg bg-gold px-2.5 py-1.5 font-display text-[17px] font-medium text-ink"
                onClick={() => ask && setPlaced(placed.filter((_, j) => j !== k))}
                disabled={!ask}
              >
                {q.options[i]}
              </button>
            ))}
          </div>
          {ask ? (
            <>
              <div className="mt-2 flex flex-wrap gap-1.5" data-testid="word-bank">
                {order.map((i) =>
                  placed.includes(i) ? null : (
                    <button
                      key={i}
                      className="rounded-lg border-2 border-line bg-panel-2 px-2.5 py-1.5 font-display text-[17px] font-medium transition active:scale-95"
                      onClick={() => setPlaced([...placed, i])}
                    >
                      {q.options[i]}
                    </button>
                  ),
                )}
              </div>
              <button className={`${btnPrimary} mt-3 w-full`} onClick={checkOrder} disabled={placed.length !== q.options.length}>
                Comprobar
              </button>
            </>
          ) : (
            <div className="mt-2 flex items-center gap-2 text-sm text-paper/70">
              <span>
                {answered ? 'Correcto:' : 'Correcta:'} <span className="font-semibold text-hp">{q.options.join(' ')}</span>
              </span>
              <SpeakButton text={q.options.join(' ')} size="sm" />
            </div>
          )}
        </>
      ) : (
        <div className={`mt-3 grid gap-2 ${kind === 'fill' ? 'grid-cols-3' : 'grid-cols-1'}`} data-testid="options">
          {q.options.map((o, k) => {
            const isAnswer = k === q.answer
            const look = ask
              ? 'border-line bg-panel-2 hover:border-gold/70 active:scale-[0.97]'
              : isAnswer
                ? 'border-hp bg-hp/25'
                : picked === k
                  ? 'border-danger bg-danger/25'
                  : 'border-line bg-panel-2 opacity-40'
            return (
              <div key={k} className={`flex items-center gap-2 ${removed === k ? 'invisible' : ''}`}>
                <button
                  className={`flex-1 rounded-xl border-2 py-2.5 font-display font-medium text-paper transition ${kind === 'fill' ? 'px-2 text-[18px]' : 'px-3 text-left text-[17px]'} ${look}`}
                  onClick={() => choose(k)}
                  disabled={!ask}
                >
                  {o}
                </button>
                {!ask && kind !== 'fill' && isAnswer && <SpeakButton text={o} size="sm" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
