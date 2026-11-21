import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/**
 * Fact Check (B2, ficha 0.6): la mesa de redacción del Herald. Llega una declaración (texto y audio) y un borrador que la reporta.
 * 1) ¿El borrador es fiel? 2) Si no lo es, se elige la versión correcta (verbo declarativo + patrón).
 * Se gana con FACT_CHECK_PASS rondas acertadas al primer intento. Sin pérdida de vida; al 2.º error de una ronda sale la pista.
 * Se construye sobre la idea de Reporter (B1), que ya pasa frases a estilo indirecto.
 */
export type FactCheckRound = {
  speaker: { en: string; es: string }
  quote: string
  quoteEs: string
  draft: string
  faithful: boolean
  /** Solo si no es fiel: versiones para elegir y la correcta (índice) */
  options?: string[]
  answer?: number
  tip: string
}
export type FactCheckContent = { title: string; intro: { en: string; es: string }; rounds: FactCheckRound[] }

export const FACT_CHECK_PASS = 5

export function FactCheck({ title, intro, rounds, onClose }: FactCheckContent & { onClose: (done: boolean, perfect: boolean) => void }) {
  const [started, setStarted] = useState(false)
  const [i, setI] = useState(0)
  const [step, setStep] = useState<'judge' | 'fix' | 'ok'>('judge')
  const [misses, setMisses] = useState(0)
  const [good, setGood] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const [finished, setFinished] = useState(false)
  const r = rounds[i]

  function miss(text: string) {
    sfx('wrong')
    setMisses((m) => m + 1)
    setFeedback(text)
  }
  function solved() {
    sfx('correct')
    if (misses === 0) setGood((g) => g + 1)
    setStep('ok')
    setFeedback(null)
  }
  function judge(faithful: boolean) {
    if (faithful !== r.faithful) return miss(r.faithful ? 'Mira otra vez: el borrador sí dice lo mismo que la declaración.' : 'Mira otra vez el verbo: no dice lo mismo que la declaración.')
    if (r.faithful) return solved()
    sfx('correct')
    setStep('fix')
    setFeedback(null)
  }
  function fix(k: number) {
    if (k !== r.answer) return miss('Ese verbo o ese patrón no corresponde a lo que se dijo.')
    solved()
  }
  function next() {
    if (i === rounds.length - 1) return setFinished(true)
    setI(i + 1)
    setStep('judge')
    setMisses(0)
    setFeedback(null)
    setShowEs(false)
  }
  function retry() {
    setI(0)
    setStep('judge')
    setMisses(0)
    setGood(0)
    setFeedback(null)
    setFinished(false)
  }

  if (!started)
    return (
      <Panel>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>
        <p className="mt-2 text-[17px] leading-relaxed"><Tappable text={intro.en} /></p>
        <p className="mt-1 text-sm text-paper/60">{intro.es}</p>
        <div className="mt-4 flex justify-between gap-2">
          <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
          <button className={btnPrimary} onClick={() => setStarted(true)} autoFocus>Empezar</button>
        </div>
      </Panel>
    )

  if (finished) {
    const pass = good >= FACT_CHECK_PASS
    return (
      <Panel>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>
        <p className="mt-2 font-display text-2xl">{good} de {rounds.length}</p>
        <p className="mt-1 text-sm text-paper/70">{pass ? '¡Noticias verificadas! El Herald puede publicar.' : `Necesitas ${FACT_CHECK_PASS} de ${rounds.length} al primer intento. Inténtalo otra vez.`}</p>
        <div className="mt-4 flex justify-between gap-2">
          {pass ? <span /> : <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>}
          <button className={btnPrimary} onClick={() => (pass ? onClose(true, good === rounds.length) : retry())} autoFocus>{pass ? 'Continuar' : 'Otra vez'}</button>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>
        <p className="text-xs text-paper/55">Ronda {i + 1} de {rounds.length} · aciertos: {good}</p>
      </div>
      <div className="mt-3 rounded-xl border border-line bg-black/20 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-paper/60">{r.speaker.en} dijo:</p>
          <SpeakButton text={r.quote} size="sm" />
        </div>
        <p className="mt-1 text-[17px]">“<Tappable text={r.quote} />”</p>
        {showEs && <p className="mt-1 text-sm text-paper/60">{r.quoteEs}</p>}
      </div>
      <div className="mt-2 rounded-xl border border-gold/40 bg-gold/5 p-3">
        <p className="text-xs font-semibold text-gold">Borrador de la noticia</p>
        <p className="mt-1 text-[17px]"><Tappable text={r.draft} /></p>
      </div>

      {step === 'judge' && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className={btnPrimary} onClick={() => judge(true)}>Es fiel</button>
          <button className={btnPrimary} onClick={() => judge(false)}>No es fiel</button>
        </div>
      )}
      {step === 'fix' && r.options && (
        <div className="mt-3 grid gap-2">
          <p className="text-sm text-paper/70">Elige la versión correcta:</p>
          {r.options.map((o, k) => (
            <button key={k} className={`${btnGhost} text-left`} onClick={() => fix(k)}>{o}</button>
          ))}
        </div>
      )}
      {feedback && <p className="anim-fade-in mt-2 text-sm text-[#ff9b8a]">{feedback}</p>}
      {misses >= 2 && step !== 'ok' && <p className="anim-fade-in mt-2 rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold">Pista: {r.tip}</p>}
      {step === 'ok' && (
        <div className="anim-fade-in mt-3">
          <p className="text-sm text-[#9be59b]">✓ {r.faithful ? r.draft : r.options![r.answer!]}</p>
          <button className={`${btnPrimary} mt-3 w-full`} onClick={next} autoFocus>{i === rounds.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>
        </div>
      )}
      <div className="mt-3 flex justify-between">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>
    </Panel>
  )
}
