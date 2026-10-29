import { useEffect, useState, type ReactNode } from 'react'
import type { Question } from '../game/types'
import { TOPICS } from '../data/questions'
import { btnPrimary } from './ui'
import { SpeakButton } from './SpeakButton'
import { useTeacher } from '../game/teacher'
import { speak } from '../game/speech'
import { sameAnswer } from '../game/text'
import { sentenceRoles, tileStyle } from './Grammar'
import { Tappable } from './Words'
import { hear, micErrorText, speechScore } from '../game/mic'
import { sfx } from '../game/sfx'

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
  if (q.kind === 'write') return q.writeMode === 'blank' ? q.prompt.replace('___', q.options[0]) : q.options[0]
  if (q.kind === 'order') return q.options.join(' ')
  if (q.kind === 'speak') return q.options[0]
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
  colorTiles,
  onSkip,
  onAnswer,
}: {
  q: Question
  /** Quién dice la frase con error en las preguntas de corregir */
  speaker?: string
  /** Cuando pasa a true, se aplica la pista de Leo */
  hint?: boolean
  headerRight?: ReactNode
  /** Colorea las fichas al ordenar (sujeto, verbo, palabra clave): solo en práctica */
  colorTiles?: boolean
  /** Para las preguntas de hablar: cambiar de pregunta sin castigo si no se puede usar el micrófono */
  onSkip?: () => void
  onAnswer: (ok: boolean) => void
}) {
  const kind = q.kind ?? 'fill'
  const [order] = useState(() => shuffled(q.options.length))
  const [placed, setPlaced] = useState<number[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [answered, setAnswered] = useState<null | boolean>(null)
  const teacher = useTeacher()
  const [removed, setRemoved] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const [writeError, setWriteError] = useState('')
  const ask = answered === null
  // Hablar: intentos, lo que se escuchó y si el micrófono está activo
  const [listening, setListening] = useState(false)
  const [tries, setTries] = useState(0)
  const [heard, setHeard] = useState<string | null>(null)
  const [micError, setMicError] = useState<string | null>(null)

  // Las preguntas de escucha se leen solas al aparecer
  useEffect(() => {
    if (kind === 'listen') {
      const t = window.setTimeout(() => speak(q.audio ?? q.prompt, false, q.voice ?? 'neutral'), 350)
      return () => window.clearTimeout(t)
    }
  }, [kind, q.prompt, q.audio, q.voice])

  // Pista de Leo: quita una opción incorrecta, o coloca la primera palabra al ordenar
  useEffect(() => {
    if (!hint || !ask) return
    if (kind === 'write') {
      // Leo escribe la primera palabra (o la primera letra, si falta una sola palabra)
      const expected = q.options[0]
      setTyped(q.writeMode === 'blank' ? expected.slice(0, 1) : expected.split(' ')[0] + ' ')
      return
    }
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
    sfx(ok ? 'correct' : 'wrong')
    onAnswer(ok)
  }

  async function talk() {
    if (!ask || listening) return
    setMicError(null)
    setHeard(null)
    setListening(true)
    const res = await hear().promise
    setListening(false)
    if (!res.ok) return setMicError(micErrorText(res.error))
    const expected = q.options[0]
    const best = res.heard.reduce((b, t) => (speechScore(t, expected) > speechScore(b, expected) ? t : b), res.heard[0] ?? '')
    setHeard(best)
    if (speechScore(best, expected) >= 0.75) return finish(true)
    const n = tries + 1
    setTries(n)
    if (n >= 3) finish(false)
  }

  function choose(k: number) {
    if (!ask) return
    setPicked(k)
    finish(k === q.answer)
  }

  function checkWrite() {
    if (!ask) return
    if (!typed.trim()) return setWriteError('Escribe tu respuesta primero.')
    // En la palabra que falta también vale la forma negativa (is → is not / isn't)
    const expected = q.options[0]
    finish(sameAnswer(typed, expected) || (q.writeMode === 'blank' && sameAnswer(typed, `${expected} not`)))
  }

  function checkOrder() {
    if (!ask || placed.length !== q.options.length) return
    finish(placed.map((i) => q.options[i]).join(' ') === q.options.join(' '))
  }

  const label =
    kind === 'fix'
      ? '¡Corrige al enemigo!'
      : kind === 'order'
        ? 'Ordena la frase'
        : kind === 'listen'
          ? q.audio
            ? 'Escucha y responde'
            : 'Escucha y elige'
          : kind === 'speak'
            ? 'Dilo en voz alta'
          : kind === 'write'
            ? q.writeMode === 'blank'
              ? q.hint?.startsWith('verbo:')
                ? 'Escribe el verbo en pasado'
                : 'Escribe la palabra que falta'
              : 'Escribe la oración en inglés'
            : TOPICS[q.topic].name
  const filled = kind === 'fill' && answered ? q.prompt.replace('___', q.options[q.answer]) : q.prompt

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{label}</p>
        {headerRight}
      </div>

      {kind === 'fill' && (
        <div className="flex items-start gap-2">
          <p className="flex-1 font-display text-[22px] leading-relaxed" data-testid="prompt" aria-label={filled}>
            <BlankSentence prompt={q.prompt} answer={q.options[q.answer]} topic={q.topic} shown={answered !== null} ok={answered === true} picked={picked !== null ? q.options[picked] : null} />
          </p>
          <SpeakButton text={answered !== null ? filled : q.prompt.replace('___', '...')} size="sm" />
        </div>
      )}
      {kind === 'fill' && q.hint && <p className="mt-0.5 text-sm text-paper/60">Pista: {q.hint}</p>}

      {kind === 'fix' && (
        <>
          <p className="text-sm text-paper/60">{speaker ?? 'El enemigo'} dice:</p>
          <div className={`mt-1 flex items-start gap-2 rounded-xl border-2 px-3 py-2 ${ask ? 'border-danger/60 bg-danger/10' : 'border-line bg-panel-2'}`}>
            <span className="mt-1 text-lg font-bold text-danger" aria-hidden="true">✗</span>
            <p
              className={`flex-1 font-display text-[21px] leading-snug ${ask ? 'text-[#f3b0b0]' : 'text-paper/50 line-through decoration-danger'}`}
              data-testid="prompt"
            >
              "<Tappable text={q.prompt} />"
            </p>
          </div>
          {ask ? (
            <p className="mt-2 text-sm text-paper/70">¿Cuál es la forma correcta?</p>
          ) : (
            <div className="anim-fade-in mt-2 flex items-start gap-2 rounded-xl border-2 border-hp bg-hp/15 px-3 py-2">
              <span className="mt-1 text-lg font-bold text-hp" aria-hidden="true">✓</span>
              <p className="flex-1 font-display text-[21px] leading-snug text-paper">{q.options[q.answer]}</p>
              <SpeakButton text={q.options[q.answer]} size="sm" />
            </div>
          )}
        </>
      )}

      {kind === 'listen' && !q.audio && (
        <div className="flex items-center gap-3">
          <SpeakButton text={q.prompt} size="lg" label="Escuchar la frase" />
          <p className="text-sm text-paper/70">
            Toca la bocina para escuchar. Dos toques seguidos: más lento.
          </p>
        </div>
      )}
      {kind === 'listen' && q.audio && (
        <div>
          <div className="flex items-center gap-3">
            <SpeakButton text={q.audio} size="lg" label="Escuchar el mensaje" voice={q.voice} />
            <p className="text-sm text-paper/70">Escucha sin leer. Puedes repetir; con dos toques va más lento.</p>
          </div>
          <p className="mt-2 font-display text-[20px] leading-snug" data-testid="prompt">{q.prompt}</p>
          {!ask && (
            <p className="mt-1 rounded-lg bg-panel-2 px-3 py-1.5 text-sm text-paper/75">Se escuchaba: "{q.audio}"</p>
          )}
        </div>
      )}

      {kind === 'speak' && (
        <div>
          {q.prompt && <p className="text-sm text-paper/60">{q.prompt}</p>}
          <div className="flex items-start gap-2">
            <p className="flex-1 font-display text-[22px] leading-snug" data-testid="prompt">{q.options[0]}</p>
            <SpeakButton text={q.options[0]} size="sm" label="Escuchar cómo se dice" />
          </div>
          {ask && (
            <div className="mt-3 flex flex-col items-center gap-2">
              <button
                onClick={talk}
                disabled={listening}
                aria-label="Hablar"
                className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${listening ? 'anim-bob border-danger bg-danger/20' : 'border-gold bg-gold/15'} transition active:scale-95`}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="9" y="3" width="6" height="11" rx="3" fill="#f4efe4" />
                  <path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" fill="none" stroke="#f4efe4" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <p className="text-sm text-paper/70">{listening ? 'Te escucho... di la frase en inglés' : 'Toca el micrófono y di la frase'}</p>
            </div>
          )}
          {heard !== null && (
            <p className={`mt-2 rounded-lg px-3 py-2 text-sm ${answered ? 'bg-hp/15 text-hp' : 'bg-panel-2 text-paper/85'}`}>
              Te escuché: "{heard}"{ask && tries > 0 ? ` · Casi, inténtalo otra vez (${tries}/3).` : ''}
            </p>
          )}
          {micError && <p className="mt-2 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{micError}</p>}
          {ask && onSkip && (
            <button className="mt-2 w-full text-center text-sm font-semibold text-paper/60 underline underline-offset-4" onClick={onSkip}>
              No puedo hablar ahora (cambiar de pregunta)
            </button>
          )}
        </div>
      )}

      {kind === 'write' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            checkWrite()
          }}
        >
          {q.writeMode === 'blank' ? (
            <>
              <p className="font-display text-[22px] leading-snug" data-testid="prompt">
                {answered ? q.prompt.replace('___', q.options[0]) : q.prompt}
              </p>
              {q.hint && <p className="mt-0.5 text-sm text-gold/90">({q.hint})</p>}
            </>
          ) : (
            <>
              <p className="text-sm text-paper/60">Lee la frase y escríbela en inglés:</p>
              <p className="font-display text-[20px] leading-snug" data-testid="prompt">{q.prompt}</p>
            </>
          )}
          <input
            value={typed}
            onChange={(e) => {
              setTyped(e.target.value)
              setWriteError('')
            }}
            disabled={!ask}
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            placeholder={q.writeMode === 'blank' ? 'La palabra que falta' : 'Escribe aquí en inglés'}
            className={`mt-3 w-full rounded-xl border-2 bg-ink px-3 py-2.5 font-display text-[18px] outline-none ${
              ask ? 'border-line focus:border-gold' : answered ? 'border-hp' : 'border-danger'
            }`}
            data-testid="write-input"
          />
          {writeError && <p className="mt-2 text-sm text-[#f3b0b0]">{writeError}</p>}
          {ask ? (
            <button type="submit" className={`${btnPrimary} mt-3 w-full`}>Comprobar</button>
          ) : (
            <div className="mt-2 flex items-center gap-2 text-sm text-paper/70">
              <span>
                {answered ? 'Correcto:' : 'Correcta:'} <span className="font-semibold text-hp">{correctSentence(q)}</span>
              </span>
              <SpeakButton text={correctSentence(q)} size="sm" />
            </div>
          )}
          {ask && (
            <p className="mt-2 text-xs text-paper/45">No importan las mayúsculas ni los puntos. "I'm" y "I am" valen igual.</p>
          )}
        </form>
      ) : kind === 'order' ? (
        <>
          <p className="text-sm text-paper/60">Escribe en inglés:</p>
          <p className="font-display text-[20px] leading-snug" data-testid="prompt">{q.prompt}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-paper/55">
            <span>Tu frase · {placed.length} de {q.options.length} palabras</span>
            {ask && (
              <span className="flex gap-1">
                <button className="rounded-md border border-line px-2 py-0.5 font-semibold text-paper/75 disabled:opacity-30" onClick={() => setPlaced(placed.slice(0, -1))} disabled={!placed.length}>↶ Deshacer</button>
                <button className="rounded-md border border-line px-2 py-0.5 font-semibold text-paper/75 disabled:opacity-30" onClick={() => setPlaced([])} disabled={!placed.length}>Borrar</button>
              </span>
            )}
          </div>
          <div
            className={`mt-1 flex min-h-[56px] flex-wrap items-center gap-1.5 rounded-xl border-2 p-2 ${
              ask ? 'border-gold/50 bg-ink' : answered ? 'border-hp bg-hp/10' : 'border-danger bg-danger/10'
            }`}
            aria-label="Tu frase"
          >
            {placed.length === 0 && <span className="px-1 text-sm text-paper/40">Toca las palabras de abajo en orden</span>}
            {placed.map((i, k) => {
              // Al fallar: cada palabra en su sitio se marca en verde, y las que no, en rojo
              const right = q.options[i] === q.options[k]
              const mark = answered === false ? (right ? 'ring-2 ring-hp' : 'ring-2 ring-danger line-through decoration-2') : ''
              return (
                <button
                  key={`${i}-${k}`}
                  style={colorTiles ? tileStyle(q.options, i, q.topic) : undefined}
                  className={`rounded-lg bg-gold px-2.5 py-1.5 font-display text-[17px] font-medium text-ink ${mark}`}
                  onClick={() => ask && setPlaced(placed.filter((_, j) => j !== k))}
                  disabled={!ask}
                >
                  {q.options[i]}
                </button>
              )
            })}
          </div>
          {ask ? (
            <>
              <p className="mt-3 text-xs text-paper/55">Palabras</p>
              <div className="mt-1 flex flex-wrap gap-1.5 rounded-xl bg-panel-2/60 p-2" data-testid="word-bank">
                {order.map((i) =>
                  placed.includes(i) ? null : (
                    <button
                      key={i}
                      style={colorTiles ? tileStyle(q.options, i, q.topic) : undefined}
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
      ) : kind === 'speak' ? null : kind === 'fix' && !ask ? (
        picked !== null && picked !== q.answer ? (
          <p className="mt-2 text-sm text-paper/60">Elegiste: <span className="text-[#f3b0b0] line-through">{q.options[picked]}</span></p>
        ) : null
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
      {teacher.on && teacher.answers && answered === null && (
        <p className="mt-2 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm text-gold">Profe: {correctSentence(q)}</p>
      )}
    </div>
  )
}

/**
 * La frase de completar: el espacio vacío se ve como una casilla, y el sujeto va en azul.
 * Al responder, la casilla muestra la respuesta correcta (y la que elegiste, si fallaste).
 */
function BlankSentence({ prompt, answer, topic, shown, ok, picked }: { prompt: string; answer: string; topic: Question['topic']; shown: boolean; ok: boolean; picked: string | null }) {
  const tokens = prompt.split(' ')
  const filled = prompt.replace('___', answer).split(' ')
  const roles = sentenceRoles(filled, topic)
  const extra = answer.split(' ').length - 1
  let j = 0
  return (
    <>
      {tokens.map((tok, k) => {
        const at = j
        if (tok.includes('___')) {
          j += 1 + extra
          const [pre, post] = tok.split('___')
          return (
            <span key={k}>
              {pre}
              {shown ? (
                <span className={`rounded-md px-1.5 ${ok ? 'bg-hp/25 text-hp' : 'bg-hp/25 text-hp'}`}>
                  {!ok && picked && <span className="mr-1 text-danger line-through decoration-2">{picked}</span>}
                  {answer}
                </span>
              ) : (
                <span className="inline-block min-w-[3.2em] translate-y-[2px] rounded-md border-2 border-dashed border-gold bg-gold/10 text-center text-gold" aria-label="espacio en blanco">?</span>
              )}
              {post}{k < tokens.length - 1 ? ' ' : ''}
            </span>
          )
        }
        j += 1
        const subj = roles.at(at) === 'subj'
        return (
          <span key={k} className={subj ? 'text-[#8cc4f5] underline decoration-[#3b8bd6] decoration-2 underline-offset-4' : undefined}>
            <Tappable text={tok} />{k < tokens.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </>
  )
}
