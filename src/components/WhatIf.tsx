import { useEffect, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { speak } from '../game/speech'

/** Un intento: la frase con "___", su traducción, las opciones (en el orden dado), la pista, lo que pasó y dónde empezó el fuego */
export type WhatIfRound = {
  line: string
  es: string
  options: string[]
  answer: number
  tip: string
  result: { en: string; es: string }
  fireAt: 'basement' | 'kitchen' | 'roof' | 'stairs'
}
export type WhatIfContent = {
  title: string
  intro: { en: string; es: string }
  rounds: WhatIfRound[]
  finish?: { en: string; es: string; banner: string }
}

const fillGap = (r: WhatIfRound) => r.line.replace('___', r.options[r.answer])

/** Ventanas del edificio (coordenadas en el SVG de 120×130) */
const WINDOWS: Record<WhatIfRound['fireAt'], { x: number; y: number; label: string }> = {
  roof: { x: 52, y: 22, label: 'techo' },
  kitchen: { x: 30, y: 54, label: 'cocina' },
  stairs: { x: 74, y: 82, label: 'escalera' },
  basement: { x: 52, y: 112, label: 'sótano' },
}

/** El reloj: las manecillas giran hacia atrás al empezar cada intento (key = intento) */
function RewindClock({ attempt }: { attempt: number }) {
  return (
    <svg key={attempt} width="44" height="44" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#2a2a33" stroke="#e0b84a" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
        <line key={k} x1="20" y1="5" x2="20" y2="7.5" stroke="#e0b84a" strokeWidth="1" transform={`rotate(${k * 30} 20 20)`} />
      ))}
      <g style={{ transformOrigin: '20px 20px', animation: 'whatif-rewind 1.4s ease-out' }}>
        <line x1="20" y1="20" x2="20" y2="9" stroke="#f4efe4" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g style={{ transformOrigin: '20px 20px', animation: 'whatif-rewind-slow 1.4s ease-out' }}>
        <line x1="20" y1="20" x2="27" y2="20" stroke="#f4efe4" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle cx="20" cy="20" r="1.6" fill="#e0b84a" />
    </svg>
  )
}

/** El edificio de 3 pisos y un sótano; la llama aparece en la ventana de `fireAt` */
function Building({ fireAt, ok }: { fireAt: WhatIfRound['fireAt'] | null; ok: boolean }) {
  return (
    <svg width="150" height="162" viewBox="0 0 120 130" aria-hidden="true">
      {/* techo */}
      <path d="M14 38 L60 6 L106 38 Z" fill="#5a3a2e" stroke="#2a1c14" strokeWidth="1.5" />
      {/* pisos */}
      <rect x="18" y="38" width="84" height="64" fill="#7a6a5a" stroke="#2a1c14" strokeWidth="1.5" />
      <line x1="18" y1="70" x2="102" y2="70" stroke="#2a1c14" strokeWidth="1" />
      {/* suelo y sótano */}
      <rect x="0" y="102" width="120" height="3" fill="#3a4a2a" />
      <rect x="18" y="105" width="84" height="22" fill="#4a3f36" stroke="#2a1c14" strokeWidth="1.5" />
      {/* puerta */}
      <rect x="44" y="82" width="14" height="20" fill="#3a2a1e" />
      {(Object.keys(WINDOWS) as WhatIfRound['fireAt'][]).map((k) => {
        const w = WINDOWS[k]
        const burning = fireAt === k
        return (
          <g key={k}>
            <rect x={w.x} y={w.y} width="16" height="12" fill={burning ? '#3a1410' : '#f2d77a'} stroke="#2a1c14" strokeWidth="1" />
            {burning && (
              <g style={{ animation: 'whatif-flame 0.9s ease-in-out infinite', transformOrigin: `${w.x + 8}px ${w.y + 12}px` }}>
                <circle cx={w.x + 8} cy={w.y + 6} r="11" fill="#d23c2a" opacity="0.25" style={{ animation: 'whatif-pulse 1.2s ease-out infinite', transformOrigin: `${w.x + 8}px ${w.y + 6}px` }} />
                <path d={`M${w.x + 3} ${w.y + 12} Q${w.x + 2} ${w.y + 4} ${w.x + 8} ${w.y - 4} Q${w.x + 14} ${w.y + 4} ${w.x + 13} ${w.y + 12} Z`} fill="#e8622a" />
                <path d={`M${w.x + 6} ${w.y + 12} Q${w.x + 5} ${w.y + 7} ${w.x + 8} ${w.y + 2} Q${w.x + 11} ${w.y + 7} ${w.x + 10} ${w.y + 12} Z`} fill="#f2c94a" />
              </g>
            )}
          </g>
        )
      })}
      {ok && (
        <g className="anim-fade-in">
          <circle cx="104" cy="16" r="10" fill="#3fa36b" />
          <path d="M99 16 l3.5 3.5 l6.5 -7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  )
}

/**
 * What If… (B1-11, bloque B): L vuelve a la noche del incendio e intenta cambiarla. Cada intento: el jugador arma la frase
 * del tercer condicional (elige la palabra del hueco). Acierto: el hueco se llena, se lee la frase, se "juega" el intento
 * (✓ verde) y después aparece una llama en otra ventana del edificio, con lo que pasó. Error: el botón se sacude y sale la
 * pista (se puede intentar otra vez; cuenta para perfect). Sin temporizador. Al final: Seguir → onClose(true, perfect)
 * (perfect = 0 o 1 errores).
 */
export function WhatIf({ title, intro, rounds, finish, onClose }: WhatIfContent & { onClose: (done: boolean, perfect: boolean) => void }) {
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState<number[]>([])
  const [shake, setShake] = useState<number | null>(null)
  const [right, setRight] = useState(false)
  const [burning, setBurning] = useState(false)
  const [errors, setErrors] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [over, setOver] = useState(false)
  const r = rounds[i]
  const end = finish ?? { en: 'Every try ends the same.', es: 'Cada intento termina igual.', banner: 'Cada intento termina igual' }

  useEffect(() => {
    if (!right) return
    const t = window.setTimeout(() => {
      setBurning(true)
      sfx('wrong')
    }, 1200)
    return () => window.clearTimeout(t)
  }, [right])

  function pick(k: number) {
    if (right) return
    if (k === r.answer) {
      sfx('correct')
      setRight(true)
      speak(fillGap(r))
    } else {
      sfx('wrong')
      setErrors((e) => e + 1)
      setWrong((w) => (w.includes(k) ? w : [...w, k]))
      setShake(k)
      window.setTimeout(() => setShake(null), 420)
    }
  }

  function next() {
    if (i === rounds.length - 1) return setOver(true)
    setI(i + 1)
    setWrong([])
    setRight(false)
    setBurning(false)
    setShowEs(false)
  }

  return (
    <Panel>
      <style>
        {'@keyframes whatif-rewind { from { transform: rotate(720deg) } to { transform: rotate(0deg) } }' +
          '@keyframes whatif-rewind-slow { from { transform: rotate(180deg) } to { transform: rotate(0deg) } }' +
          '@keyframes whatif-flame { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.15) } }' +
          '@keyframes whatif-pulse { 0% { transform: scale(0.6); opacity: .5 } 100% { transform: scale(1.6); opacity: 0 } }'}
      </style>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">{title}</p>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>

      {over ? (
        <div className="anim-fade-in mt-3">
          <p className="font-display text-xl text-gold">{end.banner}</p>
          <ol className="mt-2 space-y-1.5 rounded-xl bg-panel-2 px-3 py-2">
            {rounds.map((x, k) => (
              <li key={k}>
                <p className="text-[15px] text-paper">{fillGap(x)}</p>
                <p className="text-xs text-paper/60">{x.result.es}</p>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex items-start gap-2">
            <div className="flex-1">
              <p className="text-[15px] text-paper">{end.en}</p>
              <p className="text-xs text-paper/60">{end.es}</p>
            </div>
            <SpeakButton text={end.en} size="sm" auto />
          </div>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true, errors <= 1)} autoFocus>Seguir</button>
        </div>
      ) : (
        <>
          <div className="mt-1 flex items-center gap-3">
            <RewindClock attempt={i} />
            <p className="text-sm text-paper/75">Intento {i + 1} de {rounds.length}</p>
          </div>
          {i === 0 && !right && wrong.length === 0 && (
            <div className="mt-2">
              <p className="text-sm text-paper/85">{intro.en}</p>
              <p className="text-xs text-paper/55">{intro.es}</p>
            </div>
          )}
          <div className="mt-2 flex justify-center">
            <Building fireAt={burning ? r.fireAt : null} ok={right} />
          </div>

          <div className="mt-2 flex items-start gap-2 rounded-xl bg-panel-2 px-3 py-3">
            <div className="flex-1">
              <p className="text-lg leading-snug text-paper">
                {r.line.split('___').map((part, k, arr) => (
                  <span key={k}>
                    {part}
                    {k < arr.length - 1 && (
                      <span className={`mx-0.5 rounded px-1.5 font-bold ${right ? 'bg-hp/20 text-hp' : 'bg-gold/20 text-gold'}`}>{right ? r.options[r.answer] : '___'}</span>
                    )}
                  </span>
                ))}
              </p>
              <button className="mt-1 text-xs text-paper/55 underline" onClick={() => setShowEs((s) => !s)}>
                {showEs ? 'Ocultar traducción' : 'Ver traducción'}
              </button>
              {showEs && <p className="text-xs text-paper/60">{r.es}</p>}
            </div>
            <SpeakButton key={i} text={right ? fillGap(r) : r.line.replace('___', '...')} size="sm" />
          </div>

          {!right && (
            <div className="mt-3 grid gap-2">
              {r.options.map((o, k) => {
                const isWrong = wrong.includes(k)
                return (
                  <button
                    key={k}
                    className={`rounded-xl border-2 px-3 py-3 text-left text-[16px] text-paper ${shake === k ? 'anim-shake' : ''} ${isWrong ? 'border-danger/60 bg-danger/10' : 'border-line'}`}
                    onClick={() => pick(k)}
                  >
                    {o}
                  </button>
                )
              })}
            </div>
          )}

          {wrong.length > 0 && !right && (
            <p className="anim-fade-in mt-3 text-sm text-paper/80">
              Pista: <span className="text-paper/70">{r.tip}</span>
            </p>
          )}
          {burning && (
            <div className="anim-fade-in mt-3">
              <div className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 px-3 py-2">
                <div className="flex-1">
                  <p className="text-[15px] text-paper">{r.result.en}</p>
                  <p className="text-xs text-paper/60">{r.result.es}</p>
                </div>
                <SpeakButton key={`r${i}`} text={r.result.en} size="sm" />
              </div>
              <button className={`${btnPrimary} mt-3 w-full`} onClick={next} autoFocus>
                {i === rounds.length - 1 ? 'Terminar' : 'Siguiente intento'}
              </button>
            </div>
          )}
        </>
      )}
    </Panel>
  )
}
