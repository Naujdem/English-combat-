import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * Una línea que hay que reconstruir: una pista confiable (clue) contra lo que dice la nota corrompida (claim).
 * options[answer] es la versión verdadera (dato correcto y pasado correcto); las otras fallan en el dato o en el verbo.
 */
export type ReconstructItem = {
  source: string
  clue: { en: string; es: string }
  claim: { en: string; es: string }
  options: string[]
  answer: number
  tip: string
}

/**
 * Reconstruct the Story (A2-05): contrastar el testimonio. Para cada línea de la nota corrompida se lee una pista
 * y se elige la frase verdadera. Un error no castiga: muestra la pista de gramática y se vuelve a intentar.
 * Al final se ve la historia reconstruida completa.
 */
export function Reconstruct({ title, intro, items, onClose }: { title: string; intro: { en: string; es: string }; items: ReconstructItem[]; onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState<number | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = i >= items.length
  const item = items[Math.min(i, items.length - 1)]
  const opts = useMemo(() => mixed(item.options, `${title}-${i}`), [item, title, i])

  function pick(k: number) {
    if (done) return
    if (k === item.answer) {
      sfx('correct')
      setWrong(null)
      setI(i + 1)
    } else {
      sfx('wrong')
      setWrong(k)
    }
  }

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Reconstruct the Story</p>
      <p className="font-display text-lg">{title}</p>
      <div className="mt-2 flex items-start gap-2">
        <p className="flex-1 text-[15px] leading-relaxed"><Tappable text={intro.en} /></p>
        <SpeakButton text={intro.en} size="sm" />
      </div>
      {showEs && <p className="mt-1 text-sm text-paper/60">{intro.es}</p>}

      {/* Lo ya reconstruido */}
      <ol className="mt-3 grid gap-1.5">
        {items.map((it, n) => (
          <li key={n} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] ${n < i ? 'anim-fade-in bg-hp/15 text-hp' : 'border border-dashed border-paper/20 text-paper/40'}`}>
            <span className="font-display">{n + 1}.</span>
            <span>{n < i ? it.options[it.answer] : '...'}</span>
          </li>
        ))}
      </ol>

      {!done && (
        <div key={i} className="anim-fade-in mt-3 grid gap-2">
          <div className="rounded-lg border border-gold/40 bg-gold/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Pista · {item.source}</p>
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[15px]"><Tappable text={item.clue.en} /></p>
              <SpeakButton text={item.clue.en} size="sm" />
            </div>
            {showEs && <p className="text-xs text-paper/60">{item.clue.es}</p>}
          </div>
          <div className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#f3b0b0]">La nota dice</p>
            <p className="text-[15px] line-through decoration-danger/60"><Tappable text={item.claim.en} /></p>
            {showEs && <p className="text-xs text-paper/60">{item.claim.es}</p>}
          </div>
          <p className="text-sm text-paper/75">¿Qué pasó de verdad? Elige la frase con el dato correcto y el pasado bien escrito.</p>
          {opts.map(([text, k]) => (
            <button key={k} className={`${btn} text-left text-base ${wrong === k ? 'anim-shake border-danger' : ''}`} onClick={() => pick(k)}>
              {text}
            </button>
          ))}
        </div>
      )}
      {wrong !== null && !done && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Esa no. Compara con la pista. {item.tip}</p>}
      {done && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Historia reconstruida! Ahora sabes qué pasó de verdad.</p>}

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
