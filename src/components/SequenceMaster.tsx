import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/** Un paso del plan, en el orden correcto */
export type SequenceStep = { en: string; es: string }

/**
 * Sequence Master (versión simple, A2-03): los pasos salen desordenados y el jugador
 * los toca en orden. Feedback inmediato en cada toque; al ordenarlos todos se puede cerrar.
 */
export function SequenceMaster({ title, intro, steps, hint, onClose }: { title: string; intro: SequenceStep; steps: SequenceStep[]; hint?: string; onClose: (done: boolean) => void }) {
  const shuffled = useMemo(() => mixed(steps, title), [steps, title])
  const [placed, setPlaced] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = placed.length === steps.length

  function tap(k: number) {
    if (done || placed.includes(k)) return
    if (k === placed.length) {
      sfx('correct')
      setPlaced([...placed, k])
      setWrong(null)
    } else {
      sfx('wrong')
      setWrong(k)
    }
  }

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Sequence Master</p>
      <p className="font-display text-lg">{title}</p>
      <div className="mt-2 flex items-start gap-2">
        <p className="flex-1 text-[15px] leading-relaxed"><Tappable text={intro.en} /></p>
        <SpeakButton text={intro.en} size="sm" />
      </div>
      {showEs && <p className="mt-1 text-sm text-paper/60">{intro.es}</p>}

      <ol className="mt-3 grid gap-1.5">
        {steps.map((_, n) => (
          <li key={n} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] ${placed[n] !== undefined ? 'anim-fade-in bg-hp/15 text-hp' : 'border border-dashed border-paper/20 text-paper/40'}`}>
            <span className="font-display">{n + 1}.</span>
            <span>{placed[n] !== undefined ? steps[placed[n]].en : '...'}</span>
          </li>
        ))}
      </ol>

      {!done && (
        <>
          <p className="mt-3 text-sm text-paper/75">Toca los pasos en orden: ¿qué va {placed.length === 0 ? 'primero' : 'después'}?</p>
          <div className="mt-2 grid gap-2">
            {shuffled
              .filter(([, k]) => !placed.includes(k))
              .map(([s, k]) => (
                <button key={k} className={`${btn} text-left text-base ${wrong === k ? 'anim-shake border-danger' : ''}`} onClick={() => tap(k)}>
                  {s.en}
                  {showEs && <span className="block text-xs text-paper/50">{s.es}</span>}
                </button>
              ))}
          </div>
        </>
      )}
      {wrong !== null && !done && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Ese no va ahí. {hint ?? 'Mira las horas del plan.'}</p>}
      {done && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Plan perfecto! Todo en orden.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}
