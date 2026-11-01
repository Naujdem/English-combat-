import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/** Partes de la radio que se iluminan en el modo visual 'radio' */
export type RadioPart = 'switch' | 'back' | 'battery' | 'dial'

/** Un paso del plan, en el orden correcto. part: la parte de la radio que se repara con ese paso (solo visual 'radio') */
export type SequenceStep = { en: string; es: string; part?: RadioPart }

const GLOW = '#f2c230'

/** Radio en SVG: cada parte reparada se ilumina; la última (dial) la enciende con ondas de sonido */
function RadioArt({ lit, last }: { lit: RadioPart[]; last?: RadioPart }) {
  const on = (p: RadioPart) => lit.includes(p)
  const pop = (p: RadioPart) => (last === p ? 'anim-pop' : '')
  const playing = on('dial')
  return (
    <svg viewBox="0 0 320 170" className="mt-3 w-full rounded-xl border-2 border-line" role="img" aria-label={`Radio del taller: ${lit.length} partes reparadas`}>
      <rect width="320" height="170" fill="#e8dcc8" />
      <rect y="140" width="320" height="30" fill="#b98c5a" />
      <line x1="0" y1="140" x2="320" y2="140" stroke="#a37848" />
      {/* antena */}
      <line x1="206" y1="44" x2="250" y2="8" stroke={playing ? GLOW : '#7a6a58'} strokeWidth="3" strokeLinecap="round" />
      <circle cx="250" cy="8" r="4" fill={playing ? GLOW : '#7a6a58'} className={playing ? 'anim-bob' : ''} />
      {/* cuerpo */}
      <rect x="70" y="44" width="180" height="96" rx="12" fill="#8a5a32" stroke="#6e4524" strokeWidth="3" />
      <rect x="78" y="52" width="164" height="80" rx="8" fill="#a8703f" />
      {/* parlante */}
      <circle cx="120" cy="92" r="30" fill="#5a3a20" />
      {[-20, -10, 0, 10, 20].map((d) => <line key={d} x1={100} y1={92 + d} x2={140} y2={92 + d} stroke="#3b2414" strokeWidth="3" strokeLinecap="round" />)}
      {/* dial */}
      <g className={pop('dial')}>
        <rect x="162" y="62" width="70" height="24" rx="4" fill={playing ? '#fff3c4' : '#4a4038'} stroke={playing ? GLOW : '#2e2620'} strokeWidth="2" />
        {[172, 184, 196, 208, 220].map((x) => <line key={x} x1={x} y1={68} x2={x} y2={80} stroke={playing ? '#c08a1a' : '#6b6058'} strokeWidth="1.5" />)}
        <line x1="190" y1="64" x2="190" y2="84" stroke="#c0392b" strokeWidth="2" />
        <circle cx="210" cy="110" r="11" fill={playing ? GLOW : '#55606e'} stroke="#2e2620" strokeWidth="2" />
        <line x1="210" y1="110" x2="210" y2="101" stroke="#2e2620" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* interruptor (arriba): pasa a OFF y se ilumina */}
      <g className={pop('switch')}>
        <rect x="96" y="32" width="36" height="14" rx="4" fill={on('switch') ? GLOW : '#55606e'} stroke="#2e2620" strokeWidth="2" />
        <rect x={on('switch') && !playing ? 98 : 116} y="34" width="14" height="10" rx="2" fill="#f4efe4" />
        <text x="114" y="27" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a3a20">{on('switch') && !playing ? 'OFF' : 'ON'}</text>
      </g>
      {/* compartimento trasero (abajo a la derecha) con la batería */}
      <g className={pop('back')}>
        <rect x="258" y="96" width="44" height="40" rx="4" fill={on('back') ? '#2e2620' : '#6e4524'} stroke={on('back') ? GLOW : '#4a2e18'} strokeWidth={on('back') ? 3 : 2} />
        {!on('back') && <circle cx="280" cy="116" r="2.5" fill="#d8c6a8" />}
        {!on('back') && <text x="280" y="92" textAnchor="middle" fontSize="8" fill="#5a3a20">back</text>}
      </g>
      {on('back') && (
        <g className={pop('battery')}>
          <rect x="266" y="104" width="28" height="24" rx="3" fill={on('battery') ? '#3b9d5d' : '#8d8d8d'} stroke={on('battery') ? GLOW : '#5c5c5c'} strokeWidth="2" />
          <rect x="276" y="100" width="8" height="4" fill={on('battery') ? '#2e7a47' : '#5c5c5c'} />
          <text x="280" y="120" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f4efe4">{on('battery') ? '+' : '×'}</text>
        </g>
      )}
      {/* ondas de sonido al probarla */}
      {playing && (
        <g className="anim-fade-in" fill="none" stroke={GLOW} strokeWidth="3" strokeLinecap="round">
          <path d="M56 78 Q46 92 56 106" />
          <path d="M44 70 Q30 92 44 114" opacity="0.7" />
          <path d="M32 62 Q14 92 32 122" opacity="0.4" />
        </g>
      )}
    </svg>
  )
}

/**
 * Sequence Master (versión simple, A2-03): los pasos salen desordenados y el jugador
 * los toca en orden. Feedback inmediato en cada toque; al ordenarlos todos se puede cerrar.
 * visual 'radio' (A2-04): muestra una radio y cada paso bien colocado ilumina su parte (step.part).
 */
export function SequenceMaster({ title, intro, steps, hint, visual = 'none', onClose }: { title: string; intro: SequenceStep; steps: SequenceStep[]; hint?: string; visual?: 'radio' | 'none'; onClose: (done: boolean) => void }) {
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

      {visual === 'radio' && (
        <RadioArt
          lit={placed.map((k) => steps[k].part).filter((p): p is RadioPart => !!p)}
          last={placed.length ? steps[placed[placed.length - 1]].part : undefined}
        />
      )}

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
      {done && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">{visual === 'radio' ? '¡Radio reparada! Todo en orden.' : '¡Plan perfecto! Todo en orden.'}</p>}

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
