import { useState, type ReactNode } from 'react'
import { mixed } from '../game/mix'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * Lost Luggage (A2-11, estación de 2056; adaptado de WhereIsIt y LostAsk de A1).
 * El robot de objetos perdidos ayuda a recuperar la mochila: reportar la pérdida, describirla, decir dónde se dejó
 * y tocar en los estantes lo que el robot describe con preposiciones. Los errores no quitan vida: el robot no entiende
 * ("Sorry? I don't understand.") o explica qué tocaste.
 */
export type ThingId = 'green' | 'backpack' | 'box' | 'suitcase' | 'red' | 'small' | 'map'

const THINGS: Record<ThingId, { en: string; es: string; whereEs: string }> = {
  green: { en: 'green suitcase', es: 'la maleta verde', whereEs: 'en el estante de arriba, a la izquierda' },
  backpack: { en: 'blue backpack with a red badge', es: 'la mochila azul con un parche rojo', whereEs: 'en el estante de arriba, entre la maleta verde y la caja' },
  box: { en: 'box', es: 'la caja', whereEs: 'en el estante de arriba' },
  suitcase: { en: 'blue suitcase', es: 'la maleta azul', whereEs: 'en el estante de arriba, a la derecha' },
  red: { en: 'red bag', es: 'el bolso rojo', whereEs: 'en el estante de abajo' },
  small: { en: 'small blue backpack', es: 'la mochila azul pequeña (sin parche)', whereEs: 'en el estante de abajo, al lado del bolso rojo' },
  map: { en: 'old map', es: 'el mapa viejo', whereEs: 'debajo de la banca, cerca de la puerta' },
}

export type LuggageRound =
  | { mode: 'choose'; bot: string; es: string; options: string[]; answer: number; tip: string; ok: { text: string; es: string } }
  | { mode: 'tap'; bot: string; es: string; target: ThingId; ok: { text: string; es: string } }

const A2_ROUNDS: LuggageRound[] = [
  {
    mode: 'choose',
    bot: 'Good morning. This is Lost and Found. How can I help you?',
    es: 'Buenos días. Esto es Objetos Perdidos. ¿En qué puedo ayudarte?',
    options: ["Excuse me, I've lost my bag.", "Excuse me, I've lose my bag.", 'Excuse me, I have losing my bag.'],
    answer: 0,
    tip: 'Present Perfect: have + participio. lose → lost: I\'ve lost my bag.',
    ok: { text: 'I am sorry to hear that. I can help you.', es: 'Siento oír eso. Puedo ayudarte.' },
  },
  {
    mode: 'choose',
    bot: 'What does your bag look like?',
    es: '¿Cómo es tu mochila?',
    options: ["It's a big blue backpack with a red badge.", "It's a backpack blue big with a red badge.", 'It looks a big blue backpack of a red badge.'],
    answer: 0,
    tip: 'Los adjetivos van antes del nombre: a big blue backpack. Con algo encima: with a red badge.',
    ok: { text: 'A big blue backpack with a red badge. Noted.', es: 'Una mochila azul grande con un parche rojo. Anotado.' },
  },
  {
    mode: 'choose',
    bot: 'Where did you leave it?',
    es: '¿Dónde la dejaste?',
    options: ['I left it on the train.', 'I left it in the train on.', 'I left it at train.'],
    answer: 0,
    tip: 'Dentro de un tren, bus o tranvía decimos on: on the train.',
    ok: { text: 'Bags from the trains are on these shelves. Let me check.', es: 'Las maletas de los trenes están en estos estantes. Déjame revisar.' },
  },
  {
    mode: 'tap',
    bot: 'I can see a blue backpack with a red badge. It is on the top shelf, between the green suitcase and the box. Touch it!',
    es: 'Veo una mochila azul con un parche rojo. Está en el estante de arriba, entre la maleta verde y la caja. ¡Tócala!',
    target: 'backpack',
    ok: { text: 'Here you are. Is this your bag? Yes! It has your name on it.', es: 'Aquí tienes. ¿Es tu mochila? ¡Sí! Tiene tu nombre.' },
  },
  {
    mode: 'tap',
    bot: 'Wait! Something fell out of your bag. It is under the bench, near the door. Touch it!',
    es: '¡Espera! Algo se cayó de tu mochila. Está debajo de la banca, cerca de la puerta. ¡Tócalo!',
    target: 'map',
    ok: { text: 'An old paper map of the city. Nobody uses paper maps in 2056!', es: 'Un mapa de papel viejo de la ciudad. ¡En 2056 nadie usa mapas de papel!' },
  },
]

/**
 * Contenido de otra oficina de objetos perdidos (B1-02, aeropuerto de Lumen Bay: data/b1Luggage.ts).
 * Los estantes y los objetos (THINGS) son los mismos; cambian las rondas, el título, la despedida y quién atiende.
 * Sin `content`, el juego es el de A2-11 (estación 2056, robot).
 */
export type LuggageContent = {
  title: string
  rounds: LuggageRound[]
  finish: { text: string; es: string }
  clerk: 'robot' | 'human'
}

const A2_FINISH = { text: 'Have a nice trip, and take care of your bag!', es: '¡Buen viaje, y cuida tu mochila!' }

export function LostLuggage({ onClose, content }: { onClose: (done: boolean) => void; content?: LuggageContent }) {
  const ROUNDS = content?.rounds ?? A2_ROUNDS
  const human = content?.clerk === 'human'
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [found, setFound] = useState<ThingId[]>([])
  const [showEs, setShowEs] = useState(false)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]

  const line = done
    ? (content?.finish ?? A2_FINISH)
    : solved
      ? round.ok
      : { text: round.bot, es: round.es }

  function choose(k: number) {
    if (round.mode !== 'choose' || solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(`"Sorry? I don't understand." ${round.tip}`)
  }

  function tap(id: ThingId) {
    if (done || round.mode !== 'tap' || solved || found.includes(id)) return
    if (id === round.target) {
      setSolved(true)
      setTip(null)
      setFound((f) => [...f, id])
    } else {
      const t = THINGS[id]
      setTip(`Eso es ${t.es} (${t.en}): está ${t.whereEs}. Vuelve a leer: ${round.es}`)
    }
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const canTap = !done && round.mode === 'tap' && !solved

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{content?.title ?? 'Estación 2056 · Lost Luggage'}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 200" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Oficina de objetos perdidos con estantes de maletas">
        <rect width="320" height="150" fill="#dce9f4" />
        <rect y="150" width="320" height="50" fill="#b8c8d6" />
        <text x="58" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1f3c58" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{human ? 'LOST PROPERTY' : 'LOST & FOUND'}</text>

        {human ? (
          <>
            {/* Empleado detrás del mostrador (B1): cabeza circular y cuerpo con chaleco, con los colores del mostrador */}
            <circle cx="58" cy="46" r="13" fill="#e0ac69" stroke="#4a77b5" strokeWidth="2" />
            <circle cx="53" cy="45" r="1.8" fill="#1f3c58" />
            <circle cx="63" cy="45" r="1.8" fill="#1f3c58" />
            <rect x="42" y="60" width="32" height="36" rx="6" fill="#f4efe4" stroke="#4a77b5" strokeWidth="2" />
            <path d="M42 66 h11 l5 30 h-16 z" fill="#5d8fd4" />
            <path d="M74 66 h-11 l-5 30 h16 z" fill="#5d8fd4" />
          </>
        ) : (
          <>
            {/* Robot detrás del mostrador */}
            <rect x="40" y="34" width="36" height="28" rx="8" fill="#9aa6b2" stroke="#5a6672" strokeWidth="2" />
            <rect x="46" y="42" width="24" height="9" rx="4" fill="#2f8f9d" />
            <circle cx="53" cy="46.5" r="2" fill="#cff6ff" />
            <circle cx="63" cy="46.5" r="2" fill="#cff6ff" />
            <line x1="58" y1="34" x2="58" y2="26" stroke="#5a6672" strokeWidth="2" />
            <circle cx="58" cy="25" r="3" fill="#e0a526" />
            <rect x="44" y="62" width="28" height="34" rx="5" fill="#b8c4d0" stroke="#5a6672" strokeWidth="2" />
          </>
        )}
        {/* Mostrador */}
        <rect x="10" y="96" width="96" height="54" rx="3" fill="#5d8fd4" />
        <rect x="10" y="96" width="96" height="6" fill="#4a77b5" />

        {/* Estantes */}
        <rect x="118" y="30" width="6" height="120" fill="#7a8796" />
        <rect x="270" y="30" width="6" height="120" fill="#7a8796" />
        <rect x="118" y="82" width="158" height="5" fill="#7a8796" />
        <rect x="118" y="132" width="158" height="5" fill="#7a8796" />

        <Thing id="green" hit={[126, 50, 34, 32]} found={found} canTap={canTap} onTap={tap}>
          <rect x="128" y="54" width="30" height="28" rx="3" fill="#3b9d5d" />
          <rect x="138" y="49" width="10" height="5" rx="2" fill="none" stroke="#2b7444" strokeWidth="2" />
        </Thing>
        <Thing id="backpack" hit={[164, 44, 30, 38]} found={found} canTap={canTap} onTap={tap}>
          <rect x="166" y="48" width="24" height="34" rx="8" fill="#3b6fb6" />
          <rect x="170" y="64" width="16" height="11" rx="3" fill="#2f5c99" />
          <circle cx="178" cy="56" r="4" fill="#d64545" />
        </Thing>
        <Thing id="box" hit={[196, 56, 32, 26]} found={found} canTap={canTap} onTap={tap}>
          <rect x="198" y="58" width="28" height="24" fill="#c9965a" stroke="#9c6f3c" strokeWidth="2" />
          <line x1="198" y1="68" x2="226" y2="68" stroke="#9c6f3c" strokeWidth="1.5" />
        </Thing>
        <Thing id="suitcase" hit={[232, 52, 36, 30]} found={found} canTap={canTap} onTap={tap}>
          <rect x="234" y="56" width="32" height="26" rx="3" fill="#5d8fd4" />
          <rect x="245" y="51" width="10" height="5" rx="2" fill="none" stroke="#3b6fb6" strokeWidth="2" />
        </Thing>
        <Thing id="red" hit={[128, 104, 36, 28]} found={found} canTap={canTap} onTap={tap}>
          <rect x="130" y="110" width="32" height="22" rx="6" fill="#c0392b" />
          <path d="M138 110 q8 -10 16 0" fill="none" stroke="#8e2a1f" strokeWidth="2.5" />
        </Thing>
        <Thing id="small" hit={[170, 106, 26, 26]} found={found} canTap={canTap} onTap={tap}>
          <rect x="172" y="108" width="20" height="24" rx="6" fill="#3b6fb6" />
          <rect x="175" y="119" width="14" height="8" rx="2" fill="#2f5c99" />
        </Thing>

        {/* Banca y puerta */}
        <rect x="130" y="164" width="80" height="7" rx="2" fill="#6b7785" />
        <rect x="136" y="171" width="5" height="20" fill="#55606e" />
        <rect x="199" y="171" width="5" height="20" fill="#55606e" />
        <rect x="284" y="72" width="30" height="104" rx="2" fill="#e4eef5" stroke="#7a8796" strokeWidth="3" />
        <circle cx="290" cy="126" r="2.5" fill="#7a8796" />
        <Thing id="map" hit={[150, 176, 40, 18]} found={found} canTap={canTap} onTap={tap}>
          <rect x="156" y="182" width="26" height="9" fill="#efe3c2" stroke="#a88a4f" strokeWidth="1" transform="rotate(-6 169 186)" />
          <line x1="164" y1="181" x2="164" y2="191" stroke="#a88a4f" strokeWidth="0.8" />
          <line x1="173" y1="181" x2="173" y2="191" stroke="#a88a4f" strokeWidth="0.8" />
        </Thing>
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">{human ? 'The clerk' : 'Lost & Found Bot'}</p>
        <SpeakButton text={line.text} size="sm" auto />
      </div>
      <p key={`${r}-${solved}`} className="anim-fade-in text-[17px] leading-relaxed">{line.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!done && round.mode === 'choose' && !solved && (
        <div className="mt-3 grid gap-2">
          {mixed(round.options).map(([o, k]) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
          ))}
        </div>
      )}
      {canTap && <p className="mt-2 text-sm text-paper/70">Toca en el dibujo lo que describe {human ? 'el empleado' : 'el robot'}.</p>}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && round.mode === 'choose' && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! "{round.options[round.answer]}"</p>
          <SpeakButton text={round.options[round.answer]} size="sm" />
        </div>
      )}
      {done && !content && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">Recuperaste tu mochila… y el viejo mapa de papel de la oficial Rosa.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>{content ? 'Terminar' : 'Tomar mi mochila'}</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}

function Thing({ id, hit, found, canTap, onTap, children }: { id: ThingId; hit: [number, number, number, number]; found: ThingId[]; canTap: boolean; onTap: (id: ThingId) => void; children: ReactNode }) {
  const got = found.includes(id)
  return (
    <g
      onClick={() => onTap(id)}
      className={`${canTap && !got ? 'cursor-pointer' : ''} ${got ? 'anim-pop' : ''}`}
      style={got ? { filter: 'drop-shadow(0 0 4px #f6d36b)' } : undefined}
      role={canTap ? 'button' : undefined}
      aria-label={THINGS[id].en}
    >
      <rect x={hit[0]} y={hit[1]} width={hit[2]} height={hit[3]} fill="transparent" />
      {children}
    </g>
  )
}
