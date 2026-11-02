import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/** Un objeto que se puede tocar. id = el que dibuja la escena; en / es = su nombre */
export type CommandObject = { id: string; en: string; es: string }

/**
 * Un paso: el problema que se ve y la orden que lo resuelve (verbo + objeto; negative = "Don't …").
 * done = reacción al acertar · tip = ayuda en español al 2.º error · fails = reacciones propias a verbos equivocados.
 */
export type CommandStep = {
  problem: { en: string; es: string }
  verb: string
  object: string
  negative?: boolean
  done: { en: string; es: string }
  tip: string
  fails?: Record<string, { en: string; es: string }>
}

const GLOW = '#f2c230'
const WATER = '#5d8fd4'

/**
 * Command Puzzle (A2-09 · Wake the Mill; reutilizable con otra escena): el jugador PRODUCE la orden.
 * Ve un problema, elige un verbo (y DON'T si hace falta) y toca el objeto: se forma la frase y el objeto reacciona.
 * Un error no quita vida: el objeto reacciona sin resolver nada. 2.º error del paso → pista; 3.º → se ilumina el verbo.
 * Al terminar, onClose(true, perfect): perfect = 0 o 1 errores en total.
 */
export function CommandPuzzle({
  name,
  look,
  title,
  intro,
  verbs,
  objects,
  steps,
  onClose,
}: {
  name: string
  look: SpriteLook
  title: string
  intro: { en: string; es: string }
  verbs: string[]
  objects: CommandObject[]
  steps: CommandStep[]
  onClose: (done: boolean, perfect: boolean) => void
}) {
  const [i, setI] = useState(0)
  const [verb, setVerb] = useState<string | null>(null)
  const [neg, setNeg] = useState(false)
  const [misses, setMisses] = useState(0)
  const [total, setTotal] = useState(0)
  const [react, setReact] = useState<{ en: string; es: string; ok: boolean; said: string } | null>(null)
  const [wrongObj, setWrongObj] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = i >= steps.length
  const step = steps[Math.min(i, steps.length - 1)]
  const solved = (k: number) => i > k
  const nameOf = (id: string) => objects.find((o) => o.id === id)?.en ?? id
  const cap = (t: string) => t[0].toUpperCase() + t.slice(1)
  const sentence = (v: string, obj: string, n: boolean) => `${n ? "Don't " : ''}${n ? v : cap(v)} the ${nameOf(obj)}${n ? '!' : '.'}`

  function act(obj: string) {
    if (done) return
    if (!verb) {
      setReact({ en: 'First, choose a verb.', es: 'Primero, elige un verbo.', ok: false, said: '' })
      return
    }
    const said = sentence(verb, obj, neg)
    if (verb === step.verb && obj === step.object && neg === !!step.negative) {
      sfx('correct')
      setReact({ ...step.done, ok: true, said })
      setWrongObj(null)
      setVerb(null)
      setNeg(false)
      setMisses(0)
      setI(i + 1)
      return
    }
    sfx('wrong')
    setWrongObj(obj)
    setMisses((m) => m + 1)
    setTotal((t) => t + 1)
    const own = obj === step.object && !neg ? step.fails?.[verb] : undefined
    const n = nameOf(obj)
    const reaction =
      own ??
      (obj !== step.object
        ? { en: `Nothing happens. Look at the problem again.`, es: 'No pasa nada. Mira otra vez el problema.' }
        : neg !== !!step.negative
          ? neg
            ? { en: `You don't ${verb} the ${n}… and nothing changes.`, es: 'No lo haces… y nada cambia.' }
            : { en: `You ${verb} the ${n}, but it doesn't help.`, es: 'Lo haces, pero no ayuda.' }
          : { en: `You ${verb} the ${n}, but it doesn't work. Try another verb.`, es: 'Lo intentas, pero no funciona. Prueba otro verbo.' })
    setReact({ ...reaction, ok: false, said })
  }

  const line = done
    ? { en: 'The mill is awake! Thank you!', es: '¡El molino despertó! ¡Gracias!' }
    : i === 0 && !react
      ? { en: `${intro.en} ${step.problem.en}`, es: `${intro.es} ${step.problem.es}` }
      : step.problem
  const hit = (id: string) => ({
    role: 'button' as const,
    tabIndex: done ? -1 : 0,
    'aria-label': objects.find((o) => o.id === id)?.en,
    onClick: () => act(id),
    onKeyDown: (e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && act(id),
    className: `${done ? '' : 'cursor-pointer'} ${wrongObj === id ? 'anim-shake' : ''}`,
  })
  const hintVerb = !done && misses >= 3 ? step.verb : null
  const hintNeg = !done && misses >= 3 && !!step.negative

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">Command Puzzle · {title}</p>
        </div>
        <SpeakButton text={line.en} size="sm" auto voice={voiceOf(look)} />
      </div>
      <p key={line.en} className="anim-fade-in mt-2 text-[17px] leading-relaxed"><Tappable text={line.en} /></p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {millArt(i)}

      {react && react.said && (
        <div key={`${i}-${total}`} className={`anim-fade-in mt-2 rounded-lg px-3 py-2 text-sm ${react.ok ? 'bg-hp/15 text-hp' : 'bg-danger/15 text-[#f3b0b0]'}`}>
          <p className="flex items-center gap-2 font-semibold"><span>“{react.said}”</span><SpeakButton text={react.said} size="sm" auto /></p>
          <p className="mt-1"><Tappable text={react.en} /></p>
          {showEs && <p className="mt-0.5 text-paper/60">{react.es}</p>}
        </div>
      )}
      {react && !react.said && <p className="anim-fade-in mt-2 text-sm text-paper/75">{react.es}</p>}
      {!done && misses >= 2 && <p className="anim-fade-in mt-2 rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold">{name}: {step.tip}</p>}

      {!done && (
        <>
          <p className="mt-3 text-xs uppercase tracking-wide text-paper/50">1 · Elige el verbo · 2 · Toca la cosa</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              className={`rounded-lg border-2 px-3 py-1.5 text-sm font-bold ${neg ? 'border-danger bg-danger/25 text-paper' : 'border-line text-paper/80'} ${hintNeg && !neg ? 'ring-2 ring-gold' : ''}`}
              aria-pressed={neg}
              onClick={() => setNeg((v) => !v)}
            >
              DON'T
            </button>
            {verbs.map((v) => (
              <button
                key={v}
                className={`rounded-lg border-2 px-3 py-1.5 text-sm font-bold uppercase ${verb === v ? 'border-gold bg-gold/20 text-paper' : 'border-line text-paper/80'} ${hintVerb === v && verb !== v ? 'ring-2 ring-gold' : ''}`}
                aria-pressed={verb === v}
                onClick={() => setVerb(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-paper/70">
            {verb ? <>Tu orden: <span className="font-semibold text-paper">{neg ? "Don't " : ''}{neg ? verb : cap(verb)} the …</span> → toca la cosa en el dibujo.</> : 'Si es una advertencia, activa DON\'T antes del verbo.'}
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-paper/55">
            {objects.map((o) => (
              <button key={o.id} className="rounded border border-line px-2 py-0.5 hover:text-paper" onClick={() => act(o.id)}>
                {o.en} <span className="text-paper/40">· {o.es}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {done && <p className="anim-fade-in mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Molino despierto! Diste todas las órdenes{total <= 1 ? ' casi sin errores: ganas un escudo.' : '.'}</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true, total <= 1)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
        )}
      </div>
    </Panel>
  )

  /** Dibujo del molino: cambia según los pasos resueltos (0 piedra · 1 compuerta · 2 rueda · 3 advertencia · 4 campana) */
  function millArt(k: number) {
    const stoneOut = solved(0)
    const gateOpen = solved(1)
    const turning = solved(2)
    const handAway = solved(3)
    const ringing = solved(4)
    return (
      <svg viewBox="0 0 320 220" className="mt-3 w-full rounded-xl border-2 border-line" role="group" aria-label={`El molino: ${Math.min(k, steps.length)} de ${steps.length} órdenes`}>
        <rect width="320" height="130" fill="#dbe8ef" />
        <rect y="130" width="320" height="90" fill="#9cc46e" />

        {/* río y canal hacia la rueda */}
        <rect x="0" y="160" width="175" height="30" fill={WATER} />
        {gateOpen && (
          <g stroke="#cfe3ea" strokeWidth="2" strokeLinecap="round" opacity="0.9">
            {[95, 120, 145].map((x) => (
              <line key={x} x1={x} y1={175} x2={x + 10} y2={175}>
                <animateTransform attributeName="transform" type="translate" from="-12 0" to="12 0" dur="0.8s" repeatCount="indefinite" />
              </line>
            ))}
          </g>
        )}

        {/* molino */}
        <rect x="185" y="55" width="100" height="105" fill="#c9a46a" stroke="#8a6a3a" strokeWidth="2" />
        <path d="M178 58 L235 22 L292 58 Z" fill="#8a5a32" />
        {/* abertura con las piedras de moler */}
        <g {...hit('millstones')}>
          <rect x="205" y="92" width="62" height="48" rx="3" fill="#4a3a2a" />
          <ellipse cx="236" cy="128" rx="24" ry="7" fill="#9aa5b1" stroke="#55606e" strokeWidth="1.5" />
          <g>
            <ellipse cx="236" cy="118" rx="24" ry="7" fill="#b8c1ca" stroke="#55606e" strokeWidth="1.5" />
            <line x1="226" y1="118" x2="246" y2="118" stroke="#55606e" strokeWidth="1.5">
              {turning && <animateTransform attributeName="transform" type="rotate" from="0 236 118" to="360 236 118" dur="1.6s" repeatCount="indefinite" />}
            </line>
          </g>
          {turning && <text x="236" y="106" textAnchor="middle" fontSize="9" fill={GLOW}>~ ~ ~</text>}
        </g>
        {/* mano del señor Bell (paso 4) */}
        {k === 3 && !handAway && (
          <g className="anim-bob">
            <rect x="262" y="112" width="26" height="9" rx="4" fill="#e0ac69" stroke="#a0703a" />
            <circle cx="262" cy="116" r="6" fill="#e0ac69" stroke="#a0703a" />
          </g>
        )}

        {/* rueda del molino */}
        <g {...hit('wheel')}>
          <circle cx="168" cy="140" r="40" fill="transparent" />
          <g>
            <circle cx="168" cy="140" r="36" fill="none" stroke="#6e4524" strokeWidth="6" />
            {[0, 45, 90, 135].map((a) => (
              <line key={a} x1="132" y1="140" x2="204" y2="140" stroke="#8a5a32" strokeWidth="4" transform={`rotate(${a} 168 140)`} />
            ))}
            <circle cx="168" cy="140" r="6" fill="#4a3a2a" />
            {turning && <animateTransform attributeName="transform" type="rotate" from="0 168 140" to="360 168 140" dur="4s" repeatCount="indefinite" />}
          </g>
        </g>

        {/* compuerta */}
        <g {...hit('gate')}>
          <rect x="60" y="140" width="22" height="60" fill="transparent" />
          <rect x="62" y="132" width="4" height="66" fill="#5a3a20" />
          <rect x="78" y="132" width="4" height="66" fill="#5a3a20" />
          <rect x="65" y={gateOpen ? 128 : 156} width="14" height="36" fill="#8a5a32" stroke="#5a3a20" className={k === 2 ? 'anim-pop' : ''} />
        </g>

        {/* piedra atascada: en la compuerta o ya fuera, en la orilla */}
        <g {...hit('stone')}>
          <ellipse cx={stoneOut ? 30 : 72} cy={stoneOut ? 148 : 182} rx="13" ry="9" fill="#8a8f96" stroke="#55606e" strokeWidth="2" className={k === 1 ? 'anim-pop' : ''} />
          <ellipse cx={stoneOut ? 30 : 72} cy={stoneOut ? 148 : 182} rx="18" ry="14" fill="transparent" />
        </g>

        {/* campana con su cuerda */}
        <g {...hit('rope')}>
          <line x1="304" y1="30" x2="304" y2="160" stroke="#6e4524" strokeWidth="4" />
          <line x1="296" y1="30" x2="312" y2="30" stroke="#6e4524" strokeWidth="4" />
          <g className={ringing ? 'anim-wobble' : ''} style={{ transformOrigin: '304px 34px' }}>
            <path d="M296 50 Q296 36 304 36 Q312 36 312 50 Z" fill={ringing ? GLOW : '#c9a14a'} stroke="#8a6a1a" />
          </g>
          <line x1="304" y1="50" x2="304" y2={ringing ? 128 : 118} stroke="#d8c6a8" strokeWidth="2.5" />
          <rect x="294" y="40" width="20" height="95" fill="transparent" />
          {ringing && <text x="282" y="44" textAnchor="end" fontSize="11" fontWeight="700" fill="#8a6a1a" className="anim-pop">DING!</text>}
        </g>

        <text x="10" y="214" fontSize="9" fill="#2e4a1e">{Math.min(k, steps.length)}/{steps.length}</text>
      </svg>
    )
  }
}
