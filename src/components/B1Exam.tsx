import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { commonErrors } from './EraExam'
import { sfx } from '../game/sfx'
import { canRecognize, hear } from '../game/mic'
import { B1_EXAM_LISTENING, B1_EXAM_PASS, B1_EXAM_READING, B1_EXAM_SPEAKING, B1_EXAM_WRITING, writingChecks, wordCount, type ExamChoice } from '../data/b1Exam'

/** Lo que se guarda del examen: el texto, las tres respuestas habladas (o escritas) y las notas de reading y listening */
export type B1ExamResult = { writing: string; speaking: string[]; reading: number; listening: number }

type Part = 'intro' | 'reading' | 'listening' | 'writing' | 'speaking' | 'done'
const PARTS: Part[] = ['reading', 'listening', 'writing', 'speaking']
const PART_NAME: Record<Part, string> = { intro: '', reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking', done: '' }

/** Preguntas de opción múltiple de una parte (una por una). Al terminar: onDone(aciertos) */
function Choices({ questions, onDone }: { questions: ExamChoice[]; onDone: (score: number) => void }) {
  const [k, setK] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const q = questions[k]
  function pick(o: number) {
    if (picked !== null) return
    setPicked(o)
    if (o === q.answer) {
      sfx('correct')
      setScore(score + 1)
    } else sfx('wrong')
  }
  function next() {
    if (k === questions.length - 1) return onDone(score)
    setK(k + 1)
    setPicked(null)
  }
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-paper/55">Pregunta {k + 1} de {questions.length}</p>
      <p className="font-display text-[18px] leading-snug text-paper">{q.q}</p>
      <div className="mt-2 grid gap-2">
        {q.options.map((o, i) => {
          const show = picked !== null && (i === q.answer || i === picked)
          return (
            <button key={i} disabled={picked !== null} className={`rounded-xl border-2 px-3 py-2.5 text-left text-[16px] text-paper ${show ? (i === q.answer ? 'border-hp/70 bg-hp/10' : 'border-danger/60 bg-danger/10') : 'border-line'}`} onClick={() => pick(i)}>
              {o}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="anim-fade-in mt-2">
          {picked !== q.answer && <p className="text-sm text-paper/75">{q.tip}</p>}
          <button className={`${btnPrimary} mt-2 w-full`} onClick={next} autoFocus>{k === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>
        </div>
      )}
    </div>
  )
}

/**
 * Examen final de B1 (misión 14). Cuatro partes seguidas: reading, listening, writing y speaking (data/b1Exam.ts).
 * Reading y listening: 4 de 5 para pasar; si no, se repite la parte. Writing: lista de requisitos (no se revisa la calidad);
 * tras dos intentos se puede dejar así. Speaking: reconocimiento de voz con palabras clave; siempre se puede escribir.
 * Al final se ven el texto modelo y las respuestas modelo, y Guardar → onSave(resultado). Salir antes reinicia el examen.
 */
export function B1Exam({ onClose, onSave }: { onClose: () => void; onSave: (r: B1ExamResult) => void }) {
  const [part, setPart] = useState<Part>('intro')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState<number | null>(null)
  const [reading, setReading] = useState(0)
  const [listening, setListening] = useState(0)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [tries, setTries] = useState(0)
  const [spoken, setSpoken] = useState<string[]>([])
  const [answer, setAnswer] = useState('')
  const [typing, setTyping] = useState(!canRecognize)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  const go = (p: Part) => {
    setPart(p)
    setScore(null)
    setRound((r) => r + 1)
  }

  // ── Writing ──
  const checks = writingChecks(text)
  const advice = checked ? commonErrors(text) : []
  function checkWriting() {
    setChecked(true)
    if (checks.every((c) => c.ok)) {
      sfx('correct')
      return go('speaking')
    }
    sfx('wrong')
    setTries(tries + 1)
  }

  // ── Speaking ──
  const sp = B1_EXAM_SPEAKING[spoken.length]
  function acceptSpeak(said: string) {
    const t = said.trim()
    if (t.split(/\s+/).length < 4) return setNote('Responde con una frase completa (por lo menos 4 palabras).')
    if (!sp.need.test(t)) {
      sfx('wrong')
      return setNote(sp.needMsg)
    }
    sfx('correct')
    setNote(null)
    setAnswer('')
    const all = [...spoken, t]
    setSpoken(all)
    if (all.length === B1_EXAM_SPEAKING.length) setPart('done')
  }
  async function listen() {
    setNote(null)
    setBusy(true)
    const res = await hear().promise
    setBusy(false)
    if (!res.ok) {
      setTyping(true)
      return setNote('No se pudo usar el micrófono. Puedes escribir tu respuesta.')
    }
    const best = res.heard.find((h) => sp.need.test(h)) ?? res.heard[0] ?? ''
    setAnswer(best)
    acceptSpeak(best)
  }

  const step = PARTS.indexOf(part)
  return (
    <Panel className="max-h-[88vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <p className="font-display text-xl text-gold">Examen de B1{step >= 0 ? ` · ${step + 1} de 4: ${PART_NAME[part]}` : ''}</p>
        {part !== 'done' && <button className={btnGhost} onClick={onClose}>Después</button>}
      </div>

      {part === 'intro' && (
        <>
          <p className="mt-2 text-[15px] text-paper/85">El examen final de B1 tiene cuatro partes: leer una noticia, escuchar un boletín, escribir un texto corto y responder tres preguntas en voz alta.</p>
          <p className="mt-2 text-sm text-paper/60">Si sales antes de terminar, el examen empieza de nuevo.</p>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => go('reading')} autoFocus>Empezar</button>
        </>
      )}

      {part === 'reading' && (
        <>
          <div className="mt-2 rounded-xl bg-panel-2 px-3 py-3">
            <p className="font-display text-lg text-paper">{B1_EXAM_READING.title}</p>
            <p className="text-xs text-paper/55">{B1_EXAM_READING.by}</p>
            {B1_EXAM_READING.paragraphs.map((p, i) => (
              <p key={i} className="mt-2 text-[15px] leading-relaxed text-paper/90">{p}</p>
            ))}
          </div>
          {score === null ? (
            <Choices key={round} questions={B1_EXAM_READING.questions} onDone={setScore} />
          ) : (
            <Result
              score={score}
              total={B1_EXAM_READING.questions.length}
              onRetry={() => go('reading')}
              onNext={() => {
                setReading(score)
                go('listening')
              }}
            />
          )}
        </>
      )}

      {part === 'listening' && (
        <>
          <div className="mt-2 flex items-center gap-3 rounded-xl bg-panel-2 px-3 py-3">
            <SpeakButton text={B1_EXAM_LISTENING.audio} size="lg" label="Escuchar el boletín" />
            <div>
              <p className="font-display text-lg text-paper">{B1_EXAM_LISTENING.title}</p>
              <p className="text-sm text-paper/60">Toca el altavoz para escuchar. Puedes oírlo las veces que quieras.</p>
            </div>
          </div>
          {score === null ? (
            <Choices key={round} questions={B1_EXAM_LISTENING.questions} onDone={setScore} />
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">{B1_EXAM_LISTENING.audio}</p>
              <Result
                score={score}
                total={B1_EXAM_LISTENING.questions.length}
                onRetry={() => go('listening')}
                onNext={() => {
                  setListening(score)
                  go('writing')
                }}
              />
            </>
          )}
        </>
      )}

      {part === 'writing' && (
        <>
          <p className="mt-2 font-display text-[18px] leading-snug text-paper">{B1_EXAM_WRITING.ask}</p>
          <p className="text-sm text-paper/60">{B1_EXAM_WRITING.es}</p>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setChecked(false)
            }}
            rows={7}
            autoCapitalize="sentences"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Escribe tu texto en inglés"
            className="mt-2 w-full resize-none rounded-xl border-2 border-line bg-ink px-3 py-2.5 text-[16px] leading-relaxed outline-none focus:border-gold"
            data-testid="b1-exam-writing"
          />
          <p className="text-right text-xs text-paper/55">{wordCount(text)} palabras</p>
          <ul className="mt-1 grid gap-1 text-sm">
            {checks.map((c) => (
              <li key={c.label} className={!checked ? 'text-paper/60' : c.ok ? 'text-hp' : 'text-[#f3b0b0]'}>
                {!checked ? '•' : c.ok ? '✓' : '✗'} {c.label}
              </li>
            ))}
          </ul>
          {advice.length > 0 && (
            <ul className="anim-fade-in mt-2 grid gap-1 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">
              {advice.map((n) => <li key={n}>• {n}</li>)}
            </ul>
          )}
          <p className="mt-2 text-xs text-paper/50">La revisión comprueba los requisitos, no la calidad del texto.</p>
          <button className={`${btnPrimary} mt-3 w-full`} onClick={checkWriting} disabled={wordCount(text) === 0}>Revisar</button>
          {tries >= 2 && checked && wordCount(text) >= 30 && (
            <button className={`${btn} mt-2 w-full text-[15px]`} onClick={() => go('speaking')}>Dejarlo así y seguir</button>
          )}
        </>
      )}

      {part === 'speaking' && sp && (
        <>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-paper/55">Pregunta {spoken.length + 1} de {B1_EXAM_SPEAKING.length}</p>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="font-display text-[18px] leading-snug text-paper">{sp.ask}</p>
              <p className="text-sm text-paper/60">{sp.es}</p>
              <p className="text-sm text-paper/55">Por ejemplo: {sp.help}</p>
            </div>
            <SpeakButton key={spoken.length} text={sp.ask} size="sm" auto />
          </div>
          {typing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                acceptSpeak(answer)
              }}
            >
              <textarea
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value)
                  setNote(null)
                }}
                rows={2}
                autoCapitalize="sentences"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Escribe tu respuesta en inglés"
                className="mt-2 w-full resize-none rounded-xl border-2 border-line bg-ink px-3 py-2.5 text-[17px] outline-none focus:border-gold"
                data-testid="b1-exam-speaking"
              />
              <button type="submit" className={`${btnPrimary} mt-2 w-full`} disabled={!answer.trim()}>Responder</button>
              {canRecognize && <button type="button" className={`${btnGhost} mt-1 w-full`} onClick={() => setTyping(false)}>Usar el micrófono</button>}
            </form>
          ) : (
            <>
              <button className={`${btnPrimary} mt-3 w-full`} onClick={listen} disabled={busy}>{busy ? 'Te escucho…' : '🎤 Hablar'}</button>
              {answer && <p className="mt-2 text-sm text-paper/70">Se entendió: “{answer}”</p>}
              <button className={`${btnGhost} mt-1 w-full`} onClick={() => setTyping(true)}>Escribir en vez de hablar</button>
            </>
          )}
          {note && <p className="anim-fade-in mt-2 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{note}</p>}
          {spoken.length > 0 && (
            <ul className="mt-3 grid gap-1 border-t border-line pt-2 text-sm text-paper/75">
              {spoken.map((l, k) => <li key={k}>✓ {l}</li>)}
            </ul>
          )}
        </>
      )}

      {part === 'done' && (
        <>
          <p className="mt-2 text-[15px] text-paper/85">¡Terminaste el examen de B1! Reading: {reading} de 5 · Listening: {listening} de 5.</p>
          <div className="mt-3 rounded-xl border-2 border-line px-3 py-2">
            <p className="text-xs text-paper/55">Tu texto</p>
            <p className="text-[15px] leading-relaxed text-paper">{text}</p>
            <div className="mt-2 flex items-start gap-2">
              <p className="flex-1 text-sm leading-relaxed text-gold">Texto modelo de Leo: {B1_EXAM_WRITING.model}</p>
              <SpeakButton text={B1_EXAM_WRITING.model} size="sm" />
            </div>
          </div>
          <ul className="mt-2 grid gap-2">
            {B1_EXAM_SPEAKING.map((s, k) => (
              <li key={k} className="rounded-xl border-2 border-line px-3 py-2">
                <p className="text-xs text-paper/55">{s.ask}</p>
                <p className="text-[15px] text-paper">Tú: {spoken[k]}</p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-sm text-gold">Leo: {s.model}</p>
                  <SpeakButton text={s.model} size="sm" />
                </div>
              </li>
            ))}
          </ul>
          <button className={`${btnPrimary} mt-3 w-full`} onClick={() => onSave({ writing: text.trim(), speaking: spoken, reading, listening })} autoFocus>Guardar mi examen</button>
        </>
      )}
    </Panel>
  )
}

function Result({ score, total, onRetry, onNext }: { score: number; total: number; onRetry: () => void; onNext: () => void }) {
  const pass = score >= B1_EXAM_PASS
  return (
    <div className="anim-fade-in mt-3">
      <p className={`font-display text-lg ${pass ? 'text-hp' : 'text-[#f3b0b0]'}`}>{score} de {total}</p>
      {pass ? (
        <button className={`${btnPrimary} mt-2 w-full`} onClick={onNext} autoFocus>Seguir</button>
      ) : (
        <>
          <p className="text-sm text-paper/70">Necesitas {B1_EXAM_PASS} de {total}. Inténtalo otra vez con calma.</p>
          <button className={`${btnPrimary} mt-2 w-full`} onClick={onRetry} autoFocus>Repetir esta parte</button>
        </>
      )}
    </div>
  )
}
