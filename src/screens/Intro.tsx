import { useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { btnGhost, btnPrimary, Panel } from '../components/ui'
import { heroLook } from '../game/helpers'

type Step = { who: 'narrator' | 'stranger'; text: string; es?: string; stranger?: boolean; steal?: boolean; mute?: boolean }

function steps(name: string): Step[] {
  return [
    { who: 'narrator', text: `Un día cualquiera, ${name} llega temprano a la escuela.` },
    { who: 'stranger', text: 'Hello there... What a nice voice you have.', es: 'Hola... Qué linda voz tienes.', stranger: true },
    { who: 'stranger', text: 'Your words are MINE now!', es: '¡Tus palabras ahora son MÍAS!', stranger: true, steal: true },
    { who: 'narrator', text: `${name} intenta gritar, pero no sale ningún sonido.`, stranger: true, mute: true },
    { who: 'stranger', text: 'I hid your words across time. Find them... if you can! Ha ha ha!', es: 'Escondí tus palabras a través del tiempo. Encuéntralas... ¡si puedes! ¡Ja, ja, ja!', stranger: true, mute: true },
    { who: 'narrator', text: 'El desconocido desaparece. Tus palabras quedaron en manos de quienes viven en cada época.', mute: true },
    { who: 'narrator', text: 'Derrota a quienes guardan tus palabras y recupera tu voz. Tu viaje empieza aquí, en la escuela.', mute: true },
  ]
}

export function Intro({ state, onDone }: { state: GameState; onDone: () => void }) {
  const [i, setI] = useState(0)
  const [es, setEs] = useState(false)
  const list = steps(state.hero.name)
  const s = list[i]
  const last = i === list.length - 1

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 px-4 py-6">
      <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Escena de la introducción">
        <rect width="320" height="140" fill="#e8dcc8" />
        <rect y="140" width="320" height="60" fill="#b98c5a" />
        <line x1="0" y1="160" x2="320" y2="160" stroke="#a37848" />
        <line x1="0" y1="182" x2="320" y2="182" stroke="#a37848" />
        <rect x="100" y="18" width="120" height="58" rx="3" fill="#7a5230" />
        <rect x="105" y="23" width="110" height="48" fill="#2f5d50" />
        <rect x="18" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <rect x="258" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <g transform="translate(40 92) scale(3)">
          <SpriteBody look={heroLook(state)} mood={s.mute ? 'mute' : 'normal'} />
        </g>
        {s.stranger && (
          <g key={`str-${i > 0}`} className="anim-appear">
            <ellipse cx="248" cy="188" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M222 188 L230 112 Q248 88 266 112 L274 188 Z" fill="#2d2440" />
            <ellipse cx="248" cy="122" rx="14" ry="15" fill="#15111f" />
            <circle cx="242" cy="122" r="2.4" fill="#e0a526" />
            <circle cx="254" cy="122" r="2.4" fill="#e0a526" />
          </g>
        )}
        {s.steal &&
          ['Hi', 'I', 'am', 'is', 'are', 'you'].map((w, k) => (
            <text
              key={`${i}-${w}`}
              x={88}
              y={130 - k * 7}
              className="anim-fly"
              style={{ animationDelay: `${k * 0.18}s` }}
              fill="#3b6fb6"
              fontSize="13"
              fontFamily="Fredoka, Nunito, system-ui, sans-serif"
              fontWeight="600"
            >
              {w}
            </text>
          ))}
      </svg>

      <Panel>
        {s.who === 'stranger' && <p className="font-display text-lg text-[#b9a3e8]">???</p>}
        <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>
          {s.text}
        </p>
        {es && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
        <div className="mt-4 flex items-center justify-between gap-2">
          {s.es ? (
            <button className={btnGhost} onClick={() => setEs((v) => !v)}>{es ? 'Ocultar traducción' : 'Traducir'}</button>
          ) : (
            <button className={btnGhost} onClick={onDone}>Saltar</button>
          )}
          <button className={btnPrimary} onClick={() => (last ? onDone() : (setI(i + 1), setEs(false)))} autoFocus>
            {last ? 'Empezar' : 'Siguiente'}
          </button>
        </div>
      </Panel>
    </div>
  )
}
