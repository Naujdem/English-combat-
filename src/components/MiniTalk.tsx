import { useEffect, useRef, useState, type ReactNode } from 'react'
import { mixed } from '../game/mix'
import { voiceOf } from '../game/speech'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { withStatic } from './StaticText'
import { staticPlain } from '../game/staticName'

/** Una charla corta con un personaje: frases y elecciones con una sola respuesta correcta */
export type MiniStep = { text: string; es: string; choice?: { ask: string; options: string[]; answer: number; tip: string; /** Reacción propia de cada opción equivocada (si no, se usa tip) */ tips?: string[] } }

/**
 * pressure (opcional, Dialogue Under Pressure): segundos para cada elección. Si se acaba el tiempo
 * no se pierde vida: el personaje se impacienta y el tiempo vuelve a empezar.
 */
export function MiniTalk({
  name,
  look,
  steps,
  onClose,
  pressure,
  icon,
  skin,
  contact,
}: {
  name: string
  look: SpriteLook
  steps: MiniStep[]
  onClose: (done: boolean) => void
  pressure?: number
  /** Retrato propio (B1: cara borrosa o L) en vez del sprite normal */
  icon?: ReactNode
  /** B1 (Text Only): la charla se ve como un chat en el teléfono; L responde con mensajes (sin voz) */
  skin?: 'phone'
  /** Con skin 'phone': el nombre del contacto (admite el marcador [[?]]) */
  contact?: string
}) {
  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved
  const [left, setLeft] = useState(pressure ?? 0)
  const [late, setLate] = useState(false)
  // Chat (skin 'phone'): "typing…" antes de cada mensaje del contacto y el historial baja solo
  const [typing, setTyping] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (skin !== 'phone') return
    setTyping(true)
    const t = window.setTimeout(() => setTyping(false), 700)
    return () => window.clearTimeout(t)
  }, [skin, i])
  useEffect(() => {
    if (skin === 'phone') bottom.current?.scrollIntoView?.({ block: 'nearest' })
  }, [skin, i, typing, solved, tip, showEs])

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

  if (skin === 'phone') {
    const who = contact ?? name
    const bubble = (text: string, k: number, es?: string) => (
      <div key={`c${k}`} className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[16px] leading-snug text-[#1c1a17] shadow-sm">
        {withStatic(text, (p, j) => <Tappable key={j} text={p} />)}
        {showEs && es && <p className="mt-1 text-xs text-[#5b6470]">{es}</p>}
      </div>
    )
    const mine = (text: string, k: number) => (
      <div key={`l${k}`} className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-[#2f6f73] px-3 py-2 text-[16px] leading-snug text-[#f4efe4] shadow-sm">
        <Tappable text={text} />
      </div>
    )
    return (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border-4 border-[#2d2d3a] bg-[#e8eef3] shadow-lg">
        {/* Barra superior: hora, señal y el contacto */}
        <div className="bg-[#2f6f73] px-4 pb-2 pt-1.5 text-[#f4efe4]">
          <div className="flex items-center justify-between text-[11px] opacity-85">
            <span>21:04</span>
            <svg width="22" height="10" viewBox="0 0 22 10" aria-label="Señal" role="img">
              <rect x="0" y="7" width="3" height="3" fill="currentColor" />
              <rect x="5" y="5" width="3" height="5" fill="currentColor" />
              <rect x="10" y="3" width="3" height="7" fill="currentColor" />
              <rect x="15" y="0" width="3" height="10" fill="currentColor" />
            </svg>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4743a] text-xs font-bold" aria-hidden="true">
              {staticPlain(who).replace(/[^A-Za-z▒]/g, '').charAt(0) || '?'}
            </span>
            <p className="flex-1 font-display text-lg">{withStatic(who)}</p>
          </div>
        </div>
        {/* Historial */}
        <div className="flex max-h-[46vh] min-h-[180px] flex-col gap-2 overflow-y-auto px-3 py-3">
          {steps.slice(0, i).flatMap((st, k) => [bubble(st.text, k, st.es), ...(st.choice ? [mine(st.choice.options[st.choice.answer], k)] : [])])}
          {typing ? (
            <div className="self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm italic text-[#5b6470] motion-safe:animate-pulse" aria-live="polite">
              typing…
            </div>
          ) : (
            <>
              {bubble(s.text, i, s.es)}
              {s.choice && solved && mine(s.choice.options[s.choice.answer], i)}
            </>
          )}
          <div ref={bottom} />
        </div>
        {/* Respuesta de L */}
        <div className="border-t border-[#c9d3dc] bg-[#f4f6f8] px-3 py-3 text-[#1c1a17]">
          {!typing && (
            <div className="mb-2 flex items-center gap-2">
              <SpeakButton key={i} text={s.text} size="sm" auto voice="neutral" />
              {s.choice && !solved && <p className="flex-1 text-sm text-[#3b4450]">{s.choice.ask}</p>}
            </div>
          )}
          {waiting && !typing && (
            <div className="grid gap-2">
              {mixed(s.choice!.options).map(([o, k]) => (
                <button key={k} className="rounded-xl border border-[#c9d3dc] bg-white px-3 py-2 text-left text-[15px] transition active:scale-[0.98]" onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tips?.[k] || s.choice!.tip))}>
                  {o}
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#a33a3a]">Casi. {tip}</p>}
          <div className="mt-3 flex items-center justify-between gap-2">
            <button className="rounded-lg px-2 py-1 text-sm font-semibold text-[#2f6f73]" onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
            {!waiting && !typing && (
              <button className={btnPrimary} onClick={next} autoFocus>
                {last ? 'Listo' : 'Siguiente'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Panel>
      <div className="flex items-center gap-3">
        {icon ?? <SpriteIcon look={look} size={48} />}
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
