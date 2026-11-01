import { useEffect, useState } from 'react'
import { mixed } from '../game/mix'
import { voiceOf } from '../game/speech'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/** Una charla corta con un personaje: frases y elecciones con una sola respuesta correcta */
export type MiniStep = { text: string; es: string; choice?: { ask: string; options: string[]; answer: number; tip: string; /** Reacción propia de cada opción equivocada (si no, se usa tip) */ tips?: string[] } }

/**
 * pressure (opcional, Dialogue Under Pressure): segundos para cada elección. Si se acaba el tiempo
 * no se pierde vida: el personaje se impacienta y el tiempo vuelve a empezar.
 */
export function MiniTalk({ name, look, steps, onClose, pressure }: { name: string; look: SpriteLook; steps: MiniStep[]; onClose: (done: boolean) => void; pressure?: number }) {
  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved
  const [left, setLeft] = useState(pressure ?? 0)
  const [late, setLate] = useState(false)

  useEffect(() => {
    if (!pressure || !waiting) return
    setLeft(pressure)
    const id = setInterval(() => {
      setLeft((n) => {
        if (n > 1) return n - 1
        setLate(true)
        return pressure
      })
    }, 1000)
    return () => clearInterval(id)
  }, [pressure, waiting, i])

  function next() {
    setSolved(false)
    setTip(null)
    setLate(false)
    if (last) onClose(true)
    else setI(i + 1)
  }

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <p className="flex-1 font-display text-lg text-gold">{name}</p>
        <SpeakButton text={s.text} size="sm" auto voice={voiceOf(look)} />
      </div>
      <p key={i} className="anim-fade-in mt-2 text-[17px] leading-relaxed">
        <Tappable text={s.text} />
      </p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
      {s.choice && !solved && <p className="mt-3 text-sm text-paper/75">{s.choice.ask}</p>}
      {waiting && !!pressure && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper/10">
          <div className={`h-full transition-all duration-1000 ease-linear ${left <= 3 ? 'bg-danger' : 'bg-gold'}`} style={{ width: `${(left / pressure) * 100}%` }} />
        </div>
      )}
      {waiting && late && <p className="anim-fade-in mt-2 text-sm text-gold">¡Rápido! {name} está esperando tu respuesta...</p>}
      {waiting && (
        <div className="mt-2 grid gap-2">
          {mixed(s.choice!.options).map(([o, k]) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tips?.[k] || s.choice!.tip))}>
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
