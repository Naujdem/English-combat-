import { useState, type ReactNode } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'
import { AnimalSprite } from './Animals'

/**
 * ¿Qué va a pasar? (granja, 2056), con Rosie adulta. Se mira un dibujo y se dice lo que va a pasar
 * con going to: cuando hay señales, se predice (Look at the clouds! It's going to rain).
 */
type Round = { es: string; scene: ReactNode; options: string[]; answer: number; tip: string }

const sky = (dark = false) => <rect width="200" height="110" fill={dark ? '#7a8794' : '#cfe9f5'} />
const grass = <rect y="110" width="200" height="40" fill="#9cc46e" />

const ROUNDS: Round[] = [
  {
    es: 'Hay nubes negras sobre el campo.',
    scene: (
      <g>
        {sky(true)}
        {grass}
        {[30, 80, 130].map((x) => <g key={x}><ellipse cx={x + 10} cy="40" rx="30" ry="16" fill="#4a4f57" /><ellipse cx={x + 30} cy="34" rx="22" ry="14" fill="#5a6068" /></g>)}
        <g transform="translate(84 92) scale(1.6)"><AnimalSprite kind="sheep" /></g>
      </g>
    ),
    options: ["It's going to rain.", 'It going to rain.', 'It rained tomorrow.'],
    answer: 0,
    tip: "Ves nubes negras: It + is ('s) going to + rain.",
  },
  {
    es: 'Una vaca está al lado del sombrero de Finn y abre la boca.',
    scene: (
      <g>
        {sky()}
        {grass}
        <g transform="translate(60 72) scale(2.4)"><AnimalSprite kind="cow" /></g>
        <ellipse cx="150" cy="128" rx="24" ry="6" fill="#c9a83a" />
        <path d="M134 128 q16 -22 32 0" fill="#e8c95a" />
      </g>
    ),
    options: ['The cow is going to eat the hat!', 'The cow are going to eat the hat!', 'The cow is go to eat the hat!'],
    answer: 0,
    tip: 'The cow (it): is going to + eat.',
  },
  {
    es: 'El tractor robot va derecho hacia el estanque.',
    scene: (
      <g>
        {sky()}
        {grass}
        <ellipse cx="150" cy="128" rx="44" ry="14" fill="#6fb6d9" />
        <g transform="translate(40 90)">
          <rect x="0" y="10" width="50" height="22" rx="6" fill="#e07b39" />
          <rect x="30" y="0" width="18" height="14" rx="3" fill="#cfe9f5" />
          <circle cx="10" cy="34" r="8" fill="#2b2b2b" />
          <circle cx="42" cy="34" r="8" fill="#2b2b2b" />
          <path d="M58 20 h20 m-6 -5 l6 5 l-6 5" stroke="#d64545" strokeWidth="3" fill="none" />
        </g>
      </g>
    ),
    options: ['The robot is going to fall in the pond!', 'The robot going to fall in the pond!', 'The robot falls in the pond yesterday!'],
    answer: 0,
    tip: 'The robot (it): is going to + fall.',
  },
  {
    es: 'Hay un huevo con una grieta y algo se mueve adentro.',
    scene: (
      <g>
        {sky()}
        {grass}
        <rect x="60" y="100" width="80" height="22" rx="6" fill="#c9a46a" />
        <ellipse cx="100" cy="96" rx="18" ry="22" fill="#f4efe4" stroke="#d9c9a0" strokeWidth="2" />
        <path d="M86 92 l6 6 l6 -8 l6 8 l6 -6" stroke="#8b5a2b" strokeWidth="2" fill="none" />
        <g transform="translate(140 96) scale(1.5)"><AnimalSprite kind="chicken" /></g>
      </g>
    ),
    options: ['The egg is going to open!', 'The egg are going to open!', 'The egg opens last week!'],
    answer: 0,
    tip: 'The egg (it): is going to + open.',
  },
  {
    es: 'Los niños patean un balón muy fuerte hacia la ventana de la casa.',
    scene: (
      <g>
        {sky()}
        {grass}
        <rect x="120" y="40" width="70" height="70" fill="#efd9b8" />
        <rect x="140" y="56" width="30" height="26" fill="#9fd3f0" stroke="#8b5a2b" strokeWidth="3" />
        <circle cx="90" cy="70" r="8" fill="#f4efe4" stroke="#2b2b2b" strokeWidth="1.5" />
        <path d="M40 120 q20 -40 44 -48" stroke="#2b2b2b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </g>
    ),
    options: ['They are going to break the window!', 'They is going to break the window!', 'They going to break the window!'],
    answer: 0,
    tip: 'They: are going to + break.',
  },
  {
    es: 'El sol está muy bajo y el cielo está naranja.',
    scene: (
      <g>
        <rect width="200" height="110" fill="#f2a65a" />
        <circle cx="100" cy="108" r="26" fill="#f6d36b" />
        <rect y="110" width="200" height="40" fill="#7a9a4e" />
        <g transform="translate(150 96) scale(1.5)"><AnimalSprite kind="dog" /></g>
      </g>
    ),
    options: ["It's going to be night soon.", "It's night yesterday.", 'It going to be night.'],
    answer: 0,
    tip: "El sol se está escondiendo: It's going to be night soon.",
  },
]

export function Predict({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">¿Qué va a pasar? · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">Rosie: "Look! What is going to happen?" Mira el dibujo y di lo que va a pasar.</p>
      <svg key={i} viewBox="0 0 200 150" className="anim-fade-in mt-2 w-full rounded-xl border-2 border-line" role="img" aria-label={r.es}>
        {r.scene}
      </svg>
      <p className="mt-1 text-sm text-paper/60">{r.es}</p>

      {!ok && (
        <div className="mt-2 grid gap-2">
          {mixed(r.options).map(([o, k]) => (
            <button
              key={k}
              className={`${btn} text-left text-base`}
              onClick={() => (k === r.answer ? (sfx('correct'), setOk(true), setTip(null)) : (sfx('wrong'), setTip(r.tip)))}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {ok && (
        <>
          <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
            <p className="flex-1 text-sm text-hp">¡Bien! "{r.options[r.answer]}"</p>
            <SpeakButton text={r.options[r.answer]} size="sm" voice="female" />
          </div>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setOk(false)
            }}
          >
            {last ? 'Listo' : 'Siguiente dibujo'}
          </button>
        </>
      )}
    </Panel>
  )
}
