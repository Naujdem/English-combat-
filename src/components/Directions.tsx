import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * La oficial Rosa enseña a ubicarse en la ciudad con un mapa:
 * there is / there are y direcciones (go straight, turn left/right, on your left/right).
 * Rondas de elegir la respuesta, de seguir indicaciones tocando el lugar y de dar indicaciones.
 * El jugador empieza abajo, mirando hacia arriba (norte).
 */
type PlaceId = 'cafe' | 'market' | 'bank' | 'park' | 'shop' | 'tourist' | 'hospital' | 'bus'

const PLACES: Record<PlaceId, { en: string; es: string; x: number; y: number; w: number; h: number; color: string; path: string }> = {
  cafe: { en: 'café', es: 'el café', x: 98, y: 150, w: 42, h: 44, color: '#c98b4a', path: '160,232 160,172 140,172' },
  market: { en: 'supermarket', es: 'el supermercado', x: 180, y: 150, w: 56, h: 44, color: '#3b9d5d', path: '160,232 160,172 180,172' },
  bank: { en: 'bank', es: 'el banco', x: 180, y: 42, w: 50, h: 56, color: '#5d8fd4', path: '160,232 160,70 180,70' },
  park: { en: 'park', es: 'el parque', x: 86, y: 32, w: 54, h: 66, color: '#7fb85a', path: '160,232 160,70 140,70' },
  shop: { en: 'clothes shop', es: 'la tienda de ropa', x: 10, y: 56, w: 54, h: 44, color: '#d4537e', path: '160,232 160,120 38,120 38,100' },
  tourist: { en: 'tourist office', es: 'la oficina de turismo', x: 254, y: 56, w: 56, h: 44, color: '#2f5d50', path: '160,232 160,120 282,120 282,100' },
  hospital: { en: 'hospital', es: 'el hospital', x: 254, y: 142, w: 56, h: 52, color: '#e8e8e8', path: '160,232 160,120 282,120 282,142' },
  bus: { en: 'bus stop', es: 'la parada de autobús', x: 10, y: 142, w: 54, h: 52, color: '#9aa3ad', path: '160,232 160,120 38,120 38,142' },
}

type Round =
  | { mode: 'choose'; rosa: string; es: string; options: string[]; answer: number; tip: string }
  | { mode: 'follow'; rosa: string; es: string; target: PlaceId }

const ROUNDS: Round[] = [
  { mode: 'choose', rosa: 'Look at the map. Is there a bank in the city?', es: 'Mira el mapa. ¿Hay un banco en la ciudad?', options: ['Yes, there is.', 'Yes, there are.', "No, there isn't."], answer: 0, tip: 'En el mapa hay un banco. Para una cosa: Yes, there is.' },
  { mode: 'follow', rosa: 'You are here. Go straight. The café is on your left. Touch it!', es: 'Estás aquí. Sigue derecho. El café está a tu izquierda. ¡Tócalo!', target: 'cafe' },
  { mode: 'choose', rosa: 'How many trees are there in the park?', es: '¿Cuántos árboles hay en el parque?', options: ['There is three trees.', 'There are three trees.', 'There have three trees.'], answer: 1, tip: 'Tres árboles son varios: There are three trees.' },
  { mode: 'follow', rosa: 'Go straight and cross Main Street. The bank is on your right.', es: 'Sigue derecho y cruza Main Street. El banco está a tu derecha.', target: 'bank' },
  { mode: 'choose', rosa: 'A tourist asks: "Where is the hospital?" What do you say?', es: 'Un turista pregunta: "¿Dónde está el hospital?" ¿Qué le dices?', options: ["Go straight to Main Street. Turn right. It's on your right.", "Turn left. It's next to the park.", "Go straight. It's on your left."], answer: 0, tip: 'Sigue la línea en el mapa: derecho hasta Main Street, gira a la derecha, y el hospital queda a la derecha.' },
  { mode: 'follow', rosa: "Go straight to Main Street and turn left. The clothes shop is on your right.", es: 'Sigue derecho hasta Main Street y gira a la izquierda. La tienda de ropa está a tu derecha.', target: 'shop' },
  { mode: 'choose', rosa: 'Is there a school on this map?', es: '¿Hay una escuela en este mapa?', options: ['Yes, there is.', "No, there isn't.", "No, there aren't."], answer: 1, tip: 'En el mapa no hay escuela. Para una cosa: No, there isn\'t.' },
  { mode: 'follow', rosa: "Last one! Go straight to Main Street and turn right. The tourist office is on your left.", es: '¡La última! Sigue derecho hasta Main Street y gira a la derecha. La oficina de turismo está a tu izquierda.', target: 'tourist' },
]

export function Directions({ onClose }: { onClose: (done: boolean) => void }) {
  const [intro, setIntro] = useState(true)
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]

  const line = intro
    ? { text: "Hello! I'm Officer Rosa. You're new in the city, right? Let's look at the map together.", es: '¡Hola! Soy la oficial Rosa. Eres nuevo en la ciudad, ¿verdad? Miremos el mapa juntos.' }
    : done
      ? { text: 'Great job! Take this city map. Now you can find everything. Be careful on the street!', es: '¡Buen trabajo! Toma este mapa de la ciudad. Ahora puedes encontrar todo. ¡Ten cuidado en la calle!' }
      : { text: round.rosa, es: round.es }

  function choose(k: number) {
    if (round.mode !== 'choose' || solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(round.tip)
  }

  function tap(id: PlaceId) {
    if (intro || done || round.mode !== 'follow' || solved) return
    if (id === round.target) {
      setSolved(true)
      setTip(null)
    } else {
      setTip(`Ese es ${PLACES[id].es} (${PLACES[id].en}). Vuelve a leer: ${round.es}`)
    }
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const path = !done && solved && round.mode === 'follow' ? PLACES[round.target].path : !done && solved && r === 4 ? PLACES.hospital.path : null

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Calle · Officer Rosa</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 240" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Mapa de la ciudad">
        <rect width="320" height="240" fill="#e9e3d6" />
        {/* Calles */}
        <rect x="146" y="0" width="28" height="240" fill="#6b6b73" />
        <rect x="0" y="106" width="320" height="28" fill="#6b6b73" />
        <text x="292" y="124" textAnchor="middle" fontSize="8" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Main St.</text>
        {Array.from({ length: 9 }).map((_, k) => <rect key={`v${k}`} x="159" y={4 + k * 26} width="2" height="12" fill="#f2d16b" />)}
        {Array.from({ length: 12 }).map((_, k) => <rect key={`h${k}`} x={4 + k * 27} y="119" width="12" height="2" fill="#f2d16b" />)}

        {(Object.keys(PLACES) as PlaceId[]).map((id) => {
          const p = PLACES[id]
          const tappable = !intro && !done && round.mode === 'follow' && !solved
          const hit = solved && round.mode === 'follow' && round.target === id
          return (
            <g key={id} onClick={() => tap(id)} className={tappable ? 'cursor-pointer' : undefined} role={tappable ? 'button' : undefined} aria-label={p.en} data-place={id}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="4" fill={p.color} stroke={hit ? '#e0a526' : '#5a4a3a'} strokeWidth={hit ? 4 : 1.5} />
              {id === 'park' &&
                [[100, 52], [122, 60], [108, 80]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="8" fill="#2f7a33" />)}
              {id === 'hospital' && <path d={`M${p.x + 28} ${p.y + 10} v20 M${p.x + 18} ${p.y + 20} h20`} stroke="#d64545" strokeWidth="5" />}
              <text
                x={p.x + p.w / 2}
                y={id === 'park' ? p.y + p.h - 6 : id === 'hospital' ? p.y + p.h - 8 : p.y + p.h / 2 + 4}
                textAnchor="middle"
                fontSize={p.en.length > 10 ? 7.5 : 9}
                fontWeight="600"
                fill={id === 'hospital' ? '#2b241c' : '#fff'}
                fontFamily="Fredoka, Nunito, system-ui, sans-serif"
              >
                {p.en}
              </text>
            </g>
          )
        })}

        {path && <polyline points={path} fill="none" stroke="#e0a526" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" className="anim-fade-in" />}

        {/* Tú estás aquí, mirando hacia arriba */}
        <g transform="translate(160 228)">
          <circle r="9" fill="#d64545" stroke="#fff" strokeWidth="2" />
          <path d="M0 -5 L4 2 L-4 2 Z" fill="#fff" />
        </g>
        <text x="200" y="232" fontSize="8" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">You are here</text>
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">Officer Rosa</p>
        <SpeakButton text={line.text} size="sm" />
      </div>
      <p key={`${intro}-${r}`} className="anim-fade-in text-[17px] leading-relaxed">{line.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!intro && !done && round.mode === 'choose' && !solved && (
        <div className="mt-3 grid gap-2">
          {round.options.map((o, k) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
          ))}
        </div>
      )}
      {!intro && !done && round.mode === 'follow' && !solved && <p className="mt-2 text-sm text-paper/70">Sigue las indicaciones y toca el lugar en el mapa. Empiezas en el punto rojo, mirando hacia arriba.</p>}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Muy bien!</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {intro ? (
          <button className={btnPrimary} onClick={() => setIntro(false)} autoFocus>Siguiente</button>
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Tomar el mapa</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}
