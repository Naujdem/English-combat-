import { useState } from 'react'
import { mixed } from '../game/mix'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * Route Challenge (A2-11, calles de 2056 hacia el museo; adaptado de Directions de A1).
 * La persona especial lleva el viejo mapa de la oficial Rosa, pero la ciudad cambió. Rondas de seguir indicaciones
 * tocando el lugar, de elegir el transporte o la indicación correcta, y de recalcular cuando una ruta se cierra sola
 * (barrera morada en el puente). Preposiciones de movimiento: across, through, along, past.
 * El jugador empieza en la estación, abajo, mirando hacia arriba (norte). Los errores no quitan vida.
 */
type PlaceId = 'park' | 'cafe' | 'library' | 'stop' | 'museum' | 'tower'

const PLACES: Record<PlaceId, { en: string; es: string; x: number; y: number; w: number; h: number; color: string; text?: string }> = {
  park: { en: 'park', es: 'el parque', x: 86, y: 20, w: 54, h: 76, color: '#7fb85a' },
  cafe: { en: 'café', es: 'el café', x: 98, y: 150, w: 42, h: 44, color: '#d4537e' },
  library: { en: 'library', es: 'la biblioteca', x: 18, y: 150, w: 60, h: 44, color: '#8a6ab0' },
  stop: { en: 'tram stop', es: 'la parada del tranvía', x: 180, y: 146, w: 42, h: 36, color: '#2f8f9d' },
  museum: { en: 'museum', es: 'el museo', x: 274, y: 28, w: 42, h: 64, color: '#c98b4a' },
  tower: { en: 'tower', es: 'la torre', x: 274, y: 150, w: 42, h: 64, color: '#1f3c58' },
}

type Line = { text: string; es: string }
type Round =
  | { mode: 'choose'; say: string; es: string; options: string[]; answer: number; tip: string; path?: string }
  | { mode: 'follow'; say: string; es: string; target: PlaceId; path: string }

const TO_MUSEUM = '160,232 160,206 262,206 262,60 274,60'

const ROUNDS: Round[] = [
  {
    mode: 'follow',
    say: 'We are at the station. Go straight along Sky Avenue and walk past the café. The tram stop is on your right. Touch it!',
    es: 'Estamos en la estación. Sigue derecho por Sky Avenue y pasa el café. La parada del tranvía está a tu derecha. ¡Tócala!',
    target: 'stop',
    path: '160,232 160,163 180,163',
  },
  {
    mode: 'choose',
    say: 'The museum is across the river. How can we get there?',
    es: 'El museo está al otro lado del río. ¿Cómo llegamos?',
    options: ['We can take the tram and get off at Museum Bridge.', 'We can take the tram and get out at Museum Bridge.', 'We can go by the tram and get off in Museum Bridge.'],
    answer: 0,
    tip: 'take the tram (sin by) · get off at + parada.',
    path: '201,146 201,120 262,120',
  },
  {
    mode: 'choose',
    say: 'Oh no! A purple light has closed the bridge. The route has changed by itself! What can we do?',
    es: '¡Oh, no! Una luz morada cerró el puente. ¡La ruta cambió sola! ¿Qué podemos hacer?',
    options: ["Let's go through the tunnel under the river.", "Let's go across the tunnel under the river.", "Let's go through the bridge."],
    answer: 0,
    tip: 'Por dentro de un túnel: through the tunnel. El puente está cerrado.',
    path: '160,232 160,206 262,206',
  },
  {
    mode: 'follow',
    say: 'Walk through the tunnel. Then turn left and walk along the river. The museum is on your right. Touch it!',
    es: 'Atraviesa el túnel. Luego gira a la izquierda y camina a lo largo del río. El museo está a tu derecha. ¡Tócalo!',
    target: 'museum',
    path: TO_MUSEUM,
  },
  {
    mode: 'choose',
    say: 'We made it! How did we get here? Tell Leo.',
    es: '¡Llegamos! ¿Cómo llegamos aquí? Cuéntale a Leo.',
    options: ['We walked through the tunnel and along the river.', 'We walked across the tunnel and through the river.', 'We walked along the tunnel and past of the river.'],
    answer: 0,
    tip: 'Túnel: through (por dentro). Río: along (a lo largo de la orilla).',
  },
  {
    mode: 'choose',
    say: 'A tourist asks you: "Excuse me, how can I get to the museum from the station?" What do you say?',
    es: 'Un turista te pregunta: "Disculpa, ¿cómo llego al museo desde la estación?" ¿Qué le dices?',
    options: [
      'Go straight, then go through the tunnel. Turn left and walk along the river. The museum is on your right.',
      'Go straight, then go through the tunnel. Turn right and walk along the river. The museum is on your right.',
      'Take the tram and walk across the bridge. The museum is on your left.',
    ],
    answer: 0,
    tip: 'Sigue la línea del mapa: túnel, a la izquierda a lo largo del río, y el museo a la derecha (el puente sigue cerrado).',
    path: TO_MUSEUM,
  },
]

export function RouteChallenge({ name, onClose }: { name: string; onClose: (done: boolean) => void }) {
  const [intro, setIntro] = useState(true)
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]
  // La barrera morada aparece desde la ronda del puente cerrado
  const bridgeClosed = r >= 2

  const line: Line = intro
    ? { text: "I've got Officer Rosa's old map! But look… the city has changed so much. Let's find the museum together.", es: '¡Tengo el viejo mapa de la oficial Rosa! Pero mira… la ciudad ha cambiado mucho. Busquemos el museo juntos.' }
    : done
      ? { text: 'Perfect directions! Look, Leo is already inside the museum.', es: '¡Indicaciones perfectas! Mira, Leo ya está dentro del museo.' }
      : { text: round.say, es: round.es }

  function ok() {
    setSolved(true)
    setTip(null)
  }

  function choose(k: number) {
    if (round.mode !== 'choose' || solved) return
    if (k === round.answer) ok()
    else setTip(round.tip)
  }

  function tap(id: PlaceId) {
    if (intro || done || round.mode !== 'follow' || solved) return
    if (id === round.target) ok()
    else setTip(`Ese es ${PLACES[id].es} (${PLACES[id].en}). Vuelve a leer: ${round.es}`)
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const path = !done && solved ? round.path : null
  const tappable = !intro && !done && round.mode === 'follow' && !solved

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">2056 · Route Challenge</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 240" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Mapa de la ciudad de 2056">
        <rect width="320" height="240" fill="#e4eef5" />
        {/* Calles */}
        <rect x="146" y="0" width="28" height="240" fill="#9aa6b2" />
        <rect x="0" y="106" width="228" height="28" fill="#9aa6b2" />
        <rect x="254" y="0" width="16" height="240" fill="#c9d6e2" />
        <text x="160" y="14" textAnchor="middle" fontSize="7" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Sky Ave.</text>
        <text x="40" y="123" textAnchor="middle" fontSize="7" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Tram Line</text>
        {[...Array(10)].map((_, k) => <rect key={`t${k}`} x={4 + k * 22} y="119" width="12" height="2" fill="#2f8f9d" />)}
        {/* Río y puente */}
        <rect x="228" y="0" width="26" height="240" fill="#5d8fd4" />
        <text x="241" y="44" textAnchor="middle" fontSize="7" fill="#f4efe4" transform="rotate(90 241 44)" fontFamily="Fredoka, Nunito, system-ui, sans-serif">river</text>
        <rect x="224" y="104" width="34" height="32" fill="#7a8796" />
        <text x="241" y="100" textAnchor="middle" fontSize="6.5" fill="#1f3c58" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Museum Bridge</text>
        {bridgeClosed && (
          <g className="anim-fade-in">
            <rect x="224" y="104" width="34" height="32" fill="#9b4dca" opacity="0.75" />
            <path d="M230 110 L252 130 M252 110 L230 130" stroke="#f4efe4" strokeWidth="3" />
          </g>
        )}
        {/* Túnel bajo el río */}
        <line x1="222" y1="206" x2="258" y2="206" stroke="#2d2d3a" strokeWidth="3" strokeDasharray="4 3" />
        <path d="M204 216 V204 a10 10 0 0 1 20 0 V216 Z" fill="#2d2d3a" />
        <path d="M256 216 V204 a8 8 0 0 1 16 0 V216 Z" fill="#2d2d3a" />
        <text x="214" y="228" textAnchor="middle" fontSize="7" fill="#2d2d3a" fontFamily="Fredoka, Nunito, system-ui, sans-serif">tunnel</text>
        <line x1="160" y1="206" x2="204" y2="206" stroke="#c9d6e2" strokeWidth="8" />

        {(Object.keys(PLACES) as PlaceId[]).map((id) => {
          const p = PLACES[id]
          const hit = solved && round.mode === 'follow' && round.target === id
          return (
            <g key={id} onClick={() => tap(id)} className={tappable ? 'cursor-pointer' : undefined} role={tappable ? 'button' : undefined} aria-label={p.en}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="4" fill={p.color} stroke={hit ? '#e0a526' : '#3a4a5a'} strokeWidth={hit ? 4 : 1.5} />
              {id === 'park' && [[100, 40], [124, 52], [106, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="8" fill="#2f7a33" />)}
              <text x={p.x + p.w / 2} y={id === 'park' ? p.y + p.h - 6 : p.y + p.h / 2 + 3} textAnchor="middle" fontSize={p.en.length > 7 ? 7 : 8.5} fontWeight="600" fill="#fff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">
                {p.en}
              </text>
            </g>
          )
        })}

        {path && <polyline points={path} fill="none" stroke="#e0a526" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" strokeLinejoin="round" className="anim-fade-in" />}

        {/* Tú estás aquí (la estación), mirando hacia arriba */}
        <g transform="translate(160 228)">
          <circle r="9" fill="#d64545" stroke="#fff" strokeWidth="2" />
          <path d="M0 -5 L4 2 L-4 2 Z" fill="#fff" />
        </g>
        <text x="122" y="232" textAnchor="end" fontSize="7.5" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Station · You are here</text>
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">{name}</p>
        <SpeakButton text={line.text} size="sm" auto />
      </div>
      <p key={`${intro}-${r}`} className="anim-fade-in text-[17px] leading-relaxed">{line.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!intro && !done && round.mode === 'choose' && !solved && (
        <div className="mt-3 grid gap-2">
          {mixed(round.options).map(([o, k]) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
          ))}
        </div>
      )}
      {tappable && <p className="mt-2 text-sm text-paper/70">Sigue las indicaciones y toca el lugar. Empiezas en el punto rojo, mirando hacia arriba.</p>}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && !done && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Muy bien!{round.mode === 'choose' ? ` "${round.options[round.answer]}"` : ''}</p>
          {round.mode === 'choose' && <SpeakButton text={round.options[round.answer]} size="sm" />}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {intro ? (
          <button className={btnPrimary} onClick={() => setIntro(false)} autoFocus>Siguiente</button>
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Entrar al museo</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}
