import { useState } from 'react'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/** Una charla corta con un personaje: frases y elecciones con una sola respuesta correcta */
export type MiniStep = { text: string; es: string; choice?: { ask: string; options: string[]; answer: number; tip: string } }

export function MiniTalk({ name, look, steps, onClose }: { name: string; look: SpriteLook; steps: MiniStep[]; onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onClose(true)
    else setI(i + 1)
  }

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <p className="flex-1 font-display text-lg text-gold">{name}</p>
        <SpeakButton text={s.text} size="sm" auto />
      </div>
      <p key={i} className="anim-fade-in mt-2 text-[17px] leading-relaxed">
        <Tappable text={s.text} />
      </p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
      {s.choice && !solved && <p className="mt-3 text-sm text-paper/75">{s.choice.ask}</p>}
      {waiting && (
        <div className="mt-2 grid gap-2">
          {s.choice!.options.map((o, k) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tip))}>
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {s.choice && solved && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! "{s.choice.options[s.choice.answer]}"</p>
          <SpeakButton text={s.choice.options[s.choice.answer]} size="sm" />
        </div>
      )}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {!waiting && (
          <button className={btnPrimary} onClick={next} autoFocus>
            {last ? 'Listo' : 'Siguiente'}
          </button>
        )}
      </div>
    </Panel>
  )
}
