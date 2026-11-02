import { useState, type ReactNode } from 'react'
import { mixed } from '../game/mix'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * The Magic Book (A2-11, museo del transporte; usa el modo de tocar de WhereIsIt de A1).
 * El catálogo del museo está alterado por la luz morada. Cada página es de uno de dos tipos:
 *  - read: el libro dice dónde está un objeto y el jugador lo toca en la sala (comprensión).
 *  - fix: la página dice algo falso (las letras tiemblan); el jugador mira la sala y elige la frase correcta (producción).
 * La última página dice dónde está la carreta River: abre la sala 3. Los errores no quitan vida.
 * Al terminar, onClose(true, perfect): perfect = 0 o 1 errores en total (escudo).
 */
type ObjId = 'car' | 'poster' | 'bus' | 'bike' | 'ticket' | 'helmet' | 'map' | 'door'

const OBJ: Record<ObjId, { en: string; es: string; whereEs: string }> = {
  car: { en: 'flying car model', es: 'el modelo del carro volador', whereEs: 'en el estante, encima del afiche' },
  poster: { en: 'poster', es: 'el afiche', whereEs: 'debajo del estante' },
  bus: { en: 'old bus', es: 'el bus viejo', whereEs: 'a la izquierda de la sala' },
  bike: { en: 'old bicycle', es: 'la bicicleta vieja', whereEs: 'al lado del bus' },
  ticket: { en: 'tram ticket', es: 'el boleto de tranvía', whereEs: 'dentro de la caja de vidrio, sobre la mesa' },
  helmet: { en: 'helmet', es: 'el casco', whereEs: 'debajo de la mesa' },
  map: { en: 'old map', es: 'el mapa viejo', whereEs: 'en la pared, entre la ventana y el estante' },
  door: { en: 'door to Room 3', es: 'la puerta de la sala 3', whereEs: 'a la derecha de la sala' },
}

type Page =
  | { mode: 'read'; text: string; es: string; target: ObjId }
  | { mode: 'fix'; text: string; es: string; options: string[]; answer: number; tip: string; glow?: ObjId }

const PAGES: Page[] = [
  { mode: 'read', text: 'Page 1. The model of the first flying car is on the shelf, above the poster.', es: 'Página 1. El modelo del primer carro volador está en el estante, encima del afiche.', target: 'car' },
  {
    mode: 'fix',
    text: 'Page 2. The old bicycle is under the bus.',
    es: 'Página 2. La bicicleta vieja está debajo del bus. (Mira la sala: ¿es verdad?)',
    options: ['The old bicycle is next to the bus.', 'The old bicycle is in the bus.', 'The old bicycle is next of the bus.'],
    answer: 0,
    tip: 'En la sala, la bicicleta está al lado del bus: next to (con to).',
    glow: 'bike',
  },
  { mode: 'read', text: "Page 3. The tram driver's old helmet is under the table.", es: 'Página 3. El casco viejo del conductor del tranvía está debajo de la mesa.', target: 'helmet' },
  {
    mode: 'fix',
    text: 'Page 4. The first tram ticket is on the glass box.',
    es: 'Página 4. El primer boleto de tranvía está encima de la caja de vidrio. (Mira la sala: ¿es verdad?)',
    options: ['The first tram ticket is in the glass box.', 'The first tram ticket is at the glass box.', 'The first tram ticket is under of the glass box.'],
    answer: 0,
    tip: 'El boleto está dentro de la caja: in.',
    glow: 'ticket',
  },
  { mode: 'read', text: 'Page 5. The first map of the tram lines is on the wall, between the window and the shelf.', es: 'Página 5. El primer mapa de las líneas de tranvía está en la pared, entre la ventana y el estante.', target: 'map' },
  {
    mode: 'fix',
    text: 'Last page. The River cart is … the letters are moving! Help me write it.',
    es: 'Última página. La carreta River está… ¡las letras se mueven! Ayúdame a escribirlo. (La puerta de la derecha dice Room 3.)',
    options: ['The River cart is in Room 3, behind this door.', 'The River cart is on Room 3, behind of this door.', 'The River cart is at Room 3, between this door.'],
    answer: 0,
    tip: 'Dentro de una sala: in Room 3. Al otro lado de la puerta: behind this door (sin of).',
    glow: 'door',
  },
]

export function MagicBook({ name, onClose }: { name: string; onClose: (done: boolean, perfect: boolean) => void }) {
  const [intro, setIntro] = useState(true)
  const [p, setP] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [misses, setMisses] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const done = p >= PAGES.length
  const page = PAGES[Math.min(p, PAGES.length - 1)]
  const perfect = misses <= 1

  const line = intro
    ? { text: 'Look, the museum book! It tells you where everything is… but the purple light has changed some pages. Read them with me.', es: '¡Mira, el libro del museo! Dice dónde está cada cosa… pero la luz morada cambió algunas páginas. Léelas conmigo.' }
    : done
      ? { text: 'The book is right again. The cart is in Room 3. Come on!', es: 'El libro está bien otra vez. La carreta está en la sala 3. ¡Vamos!' }
      : { text: page.text, es: page.es }

  function miss(t: string) {
    setTip(t)
    setMisses((m) => m + 1)
  }

  function choose(k: number) {
    if (page.mode !== 'fix' || solved) return
    if (k === page.answer) {
      setSolved(true)
      setTip(null)
    } else miss(page.tip)
  }

  function tap(id: ObjId) {
    if (intro || done || page.mode !== 'read' || solved) return
    if (id === page.target) {
      setSolved(true)
      setTip(null)
    } else miss(`Eso es ${OBJ[id].es} (${OBJ[id].en}): está ${OBJ[id].whereEs}. Vuelve a leer la página.`)
  }

  function next() {
    setSolved(false)
    setTip(null)
    setP(p + 1)
  }

  const canTap = !intro && !done && page.mode === 'read' && !solved
  const glow: ObjId | null = !done && solved ? (page.mode === 'read' ? page.target : page.glow ?? null) : done ? 'door' : null

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Museo del transporte · The Magic Book</p>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 200" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Sala del museo del transporte">
        <rect width="320" height="140" fill="#efe6d4" />
        <rect y="140" width="320" height="60" fill="#a8743f" />
        <line x1="0" y1="168" x2="320" y2="168" stroke="#93622f" />
        {/* Ventana */}
        <rect x="150" y="18" width="46" height="50" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <line x1="173" y1="18" x2="173" y2="68" stroke="#7a6a58" strokeWidth="2" />

        <Obj id="map" glow={glow} canTap={canTap} onTap={tap} hit={[200, 22, 32, 40]}>
          <rect x="204" y="26" width="26" height="32" fill="#efe3c2" stroke="#a88a4f" strokeWidth="1.5" />
          <path d="M207 50 L214 36 L220 46 L227 32" fill="none" stroke="#2f8f9d" strokeWidth="1.5" />
        </Obj>

        {/* Estante con el modelo y el afiche debajo */}
        <rect x="236" y="62" width="50" height="4" fill="#6e4524" />
        <Obj id="car" glow={glow} canTap={canTap} onTap={tap} hit={[238, 40, 46, 22]}>
          <ellipse cx="261" cy="54" rx="18" ry="6" fill="#9aa6b2" />
          <ellipse cx="261" cy="50" rx="9" ry="5" fill="#9fd3f0" />
          <rect x="245" y="58" width="6" height="3" fill="#e0a526" />
          <rect x="271" y="58" width="6" height="3" fill="#e0a526" />
        </Obj>
        <Obj id="poster" glow={glow} canTap={canTap} onTap={tap} hit={[240, 72, 42, 40]}>
          <rect x="242" y="74" width="38" height="36" fill="#2f8f9d" />
          <text x="261" y="95" textAnchor="middle" fontSize="7" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">2056</text>
        </Obj>

        {/* Bus viejo y bicicleta */}
        <Obj id="bus" glow={glow} canTap={canTap} onTap={tap} hit={[8, 82, 104, 80]}>
          <rect x="10" y="86" width="100" height="62" rx="8" fill="#c0392b" />
          {[18, 42, 66, 90].map((x) => <rect key={x} x={x} y="94" width="16" height="16" rx="2" fill="#9fd3f0" />)}
          <circle cx="30" cy="150" r="9" fill="#2d2d3a" />
          <circle cx="90" cy="150" r="9" fill="#2d2d3a" />
        </Obj>
        <Obj id="bike" glow={glow} canTap={canTap} onTap={tap} hit={[114, 124, 40, 38]}>
          <circle cx="122" cy="152" r="8" fill="none" stroke="#2d2d3a" strokeWidth="2" />
          <circle cx="146" cy="152" r="8" fill="none" stroke="#2d2d3a" strokeWidth="2" />
          <path d="M122 152 L132 138 L146 152 M132 138 L142 138 M128 134 L136 134" fill="none" stroke="#3b6fb6" strokeWidth="2.2" />
        </Obj>

        {/* Mesa con caja de vidrio, casco debajo */}
        <rect x="168" y="132" width="64" height="5" fill="#6e4524" />
        <rect x="172" y="137" width="4" height="36" fill="#5a3a1c" />
        <rect x="224" y="137" width="4" height="36" fill="#5a3a1c" />
        <Obj id="ticket" glow={glow} canTap={canTap} onTap={tap} hit={[182, 106, 32, 26]}>
          <rect x="184" y="108" width="28" height="24" fill="#cfeaf5" opacity="0.55" stroke="#7a8796" strokeWidth="1.5" />
          <rect x="190" y="117" width="16" height="8" fill="#e0a526" />
        </Obj>
        <Obj id="helmet" glow={glow} canTap={canTap} onTap={tap} hit={[184, 154, 32, 22]}>
          <path d="M188 172 a12 12 0 0 1 24 0 Z" fill="#1f3c58" />
          <rect x="186" y="170" width="28" height="3" fill="#16304a" />
        </Obj>

        {/* Puerta a la sala 3 */}
        <Obj id="door" glow={glow} canTap={canTap} onTap={tap} hit={[290, 80, 28, 94]}>
          <rect x="292" y="86" width="24" height="86" fill="#8b5a2b" stroke="#5a3a1c" strokeWidth="2" />
          <rect x="292" y="74" width="24" height="10" rx="2" fill="#1f3c58" />
          <text x="304" y="81.5" textAnchor="middle" fontSize="6" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Room 3</text>
          <circle cx="296" cy="130" r="2" fill="#e0a526" />
        </Obj>
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">{intro || done ? name : 'The Magic Book'}</p>
        <SpeakButton text={line.text} size="sm" auto />
      </div>
      <p
        key={`${intro}-${p}`}
        className={`anim-fade-in text-[17px] leading-relaxed ${!intro && !done ? 'rounded-lg bg-[#efe3c2] px-3 py-2 font-serif text-ink' : ''} ${!intro && !done && page.mode === 'fix' && !solved ? 'text-[#7b3fa3]' : ''}`}
        style={!intro && !done && page.mode === 'fix' && !solved ? { textShadow: '0 0 6px #b06ad4' } : undefined}
      >
        {line.text}
      </p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!intro && !done && page.mode === 'fix' && !solved && (
        <>
          <p className="mt-2 text-sm text-paper/70">Mira la sala y reescribe la página con la frase correcta.</p>
          <div className="mt-2 grid gap-2">
            {mixed(page.options).map(([o, k]) => (
              <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
            ))}
          </div>
        </>
      )}
      {canTap && <p className="mt-2 text-sm text-paper/70">Toca en la sala el objeto que describe la página.</p>}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && !done && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">{page.mode === 'fix' ? `Página corregida: "${page.options[page.answer]}"` : `¡Bien! Encontraste ${OBJ[page.target].es}.`}</p>
          {page.mode === 'fix' && <SpeakButton text={page.options[page.answer]} size="sm" />}
        </div>
      )}
      {done && (
        <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
          ¡Catálogo corregido!{perfect ? ' Casi sin errores: ganas un escudo.' : ''}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {intro ? (
          <button className={btnPrimary} onClick={() => setIntro(false)} autoFocus>Abrir el libro</button>
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true, perfect)} autoFocus>Ir a la sala 3</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>{p === PAGES.length - 1 ? 'Cerrar el libro' : 'Pasar la página'}</button>
        ) : null}
      </div>
    </Panel>
  )
}

function Obj({ id, glow, canTap, onTap, hit, children }: { id: ObjId; glow: ObjId | null; canTap: boolean; onTap: (id: ObjId) => void; hit: [number, number, number, number]; children: ReactNode }) {
  const lit = glow === id
  return (
    <g
      onClick={() => onTap(id)}
      className={`${canTap ? 'cursor-pointer' : ''} ${lit ? 'anim-pop' : ''}`}
      style={lit ? { filter: 'drop-shadow(0 0 5px #f6d36b)' } : undefined}
      role={canTap ? 'button' : undefined}
      aria-label={OBJ[id].en}
    >
      <rect x={hit[0]} y={hit[1]} width={hit[2]} height={hit[3]} fill="transparent" />
      {children}
    </g>
  )
}
