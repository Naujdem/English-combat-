import { useState, type ReactNode } from 'react'
import { SpriteBody } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { NPCS } from '../data/npcs'

/**
 * "¿Dónde está?": Ana ayuda a encontrar los útiles escolares del protagonista,
 * que el desconocido tiró por el aula. Practica preposiciones de lugar.
 * Unas rondas son de elegir la frase (Where is your pencil? → It's on the desk)
 * y otras de tocar el objeto que Ana describe (Your book is under the desk).
 */

type ItemId = 'pencil' | 'book' | 'notebook' | 'pen' | 'ruler' | 'scissors'

const ITEMS: Record<ItemId, { en: string; es: string; where: string; whereEs: string }> = {
  pencil: { en: 'pencil', es: 'lápiz', where: 'on the desk', whereEs: 'sobre el pupitre' },
  book: { en: 'book', es: 'libro', where: 'under the desk', whereEs: 'debajo del pupitre' },
  notebook: { en: 'notebook', es: 'cuaderno', where: 'between the chair and the box', whereEs: 'entre la silla y la caja' },
  pen: { en: 'pen', es: 'bolígrafo', where: 'in front of the box', whereEs: 'delante de la caja' },
  ruler: { en: 'ruler', es: 'regla', where: 'in the bag', whereEs: 'dentro de la mochila' },
  scissors: { en: 'scissors', es: 'tijeras', where: 'next to the bag', whereEs: 'al lado de la mochila' },
}

type Round =
  | { mode: 'choose'; item: ItemId; options: string[]; answer: number; tip: string }
  | { mode: 'tap'; item: ItemId }

const ROUNDS: Round[] = [
  { mode: 'choose', item: 'pencil', options: ["It's on the desk.", "It's under the desk.", "It's in the desk."], answer: 0, tip: 'El lápiz está encima del pupitre: on the desk.' },
  { mode: 'tap', item: 'book' },
  { mode: 'choose', item: 'notebook', options: ["It's next the chair.", "It's between the chair and the box.", "It's on the box."], answer: 1, tip: 'El cuaderno está entre la silla y la caja: between the chair and the box.' },
  { mode: 'tap', item: 'pen' },
  { mode: 'choose', item: 'ruler', options: ["It's under the bag.", "It's next to the bag.", "It's in the bag."], answer: 2, tip: 'La regla está dentro de la mochila: in the bag.' },
  { mode: 'tap', item: 'scissors' },
]

const INTRO = [
  { text: "Oh! You're the new student! Look, your school things are everywhere!", es: '¡Oh! ¡Eres el estudiante nuevo! ¡Mira, tus útiles están por todas partes!' },
  { text: 'A man in a dark coat threw them. Come on, I can help you!', es: 'Un hombre con abrigo oscuro los tiró. ¡Ven, te ayudo!' },
]

export function WhereIsIt({ onClose }: { onClose: (done: boolean) => void }) {
  const [intro, setIntro] = useState(0)
  const [r, setR] = useState(0)
  const [found, setFound] = useState<ItemId[]>([])
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(true)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]
  const item = ITEMS[round.item]
  const ana = NPCS.ana

  const anaLine = intro < INTRO.length
    ? INTRO[intro]
    : done
      ? { text: 'You have all your things! Put them in your bag. Now you are ready for class!', es: '¡Tienes todas tus cosas! Guárdalas en tu mochila. ¡Ya estás listo para clase!' }
      : round.mode === 'choose'
        ? { text: `Where is your ${item.en}?`, es: `¿Dónde está tu ${item.es}?` }
        : { text: `Your ${item.en} ${item.en === 'scissors' ? 'are' : 'is'} ${item.where}. Touch ${item.en === 'scissors' ? 'them' : 'it'}!`, es: `Tu${item.en === 'scissors' ? 's' : ''} ${item.es} está${item.en === 'scissors' ? 'n' : ''} ${item.whereEs}. ¡Tócalo${item.en === 'scissors' ? 's' : ''}!` }

  function correct() {
    setSolved(true)
    setTip(null)
    setFound((f) => [...f, round.item])
  }

  function choose(k: number) {
    if (round.mode !== 'choose' || solved) return
    if (k === round.answer) correct()
    else setTip(round.tip)
  }

  function tap(id: ItemId) {
    if (intro < INTRO.length || done || round.mode !== 'tap' || solved || found.includes(id)) return
    if (id === round.item) correct()
    else {
      const other = ITEMS[id]
      setTip(`Eso es tu ${other.es} (${other.en}): está ${other.whereEs}. Busca lo que está ${item.whereEs}.`)
    }
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const say = round.mode === 'choose' && solved ? `My ${item.en} ${item.en === 'scissors' ? 'are' : 'is'} ${item.where}.` : null
  const canTap = intro >= INTRO.length && !done && round.mode === 'tap' && !solved

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Aula · ¿Dónde están tus útiles?</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 200" className="w-full rounded-xl border-2 border-line" role="img" aria-label="Rincón del aula con tus útiles escolares">
        <rect width="320" height="120" fill="#e8dcc8" />
        <rect y="120" width="320" height="80" fill="#b98c5a" />
        <line x1="0" y1="150" x2="320" y2="150" stroke="#a37848" />
        <rect x="200" y="14" width="60" height="50" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <g transform="translate(14 56) scale(1.6)">
          <SpriteBody look={ana.look} />
        </g>

        {/* Pupitre */}
        <rect x="62" y="106" width="104" height="9" rx="2" fill="#8a5a32" />
        <rect x="68" y="115" width="6" height="58" fill="#6e4524" />
        <rect x="154" y="115" width="6" height="58" fill="#6e4524" />
        {/* Silla */}
        <rect x="178" y="98" width="5" height="38" fill="#55606e" />
        <rect x="178" y="132" width="34" height="6" rx="2" fill="#6b7785" />
        <rect x="180" y="138" width="4" height="34" fill="#55606e" />
        <rect x="206" y="138" width="4" height="34" fill="#55606e" />
        {/* Caja */}
        <rect x="236" y="138" width="32" height="34" fill="#c9965a" stroke="#9c6f3c" strokeWidth="2" />
        <line x1="236" y1="152" x2="268" y2="152" stroke="#9c6f3c" strokeWidth="1.5" />
        {/* Mochila */}
        <rect x="274" y="128" width="26" height="44" rx="8" fill="#3b6fb6" />
        <rect x="278" y="146" width="18" height="12" rx="3" fill="#2f5c99" />

        {/* Útiles */}
        <Thing id="pencil" hit={[90, 90, 52, 22]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'pencil' && solved}>
          <g transform="translate(96 99) rotate(-8)">
            <rect width="30" height="6" rx="1" fill="#f2c230" />
            <polygon points="30,0 37,3 30,6" fill="#f1d3a3" />
            <rect x="-4" width="4" height="6" fill="#e58aa6" />
          </g>
        </Thing>
        <Thing id="book" hit={[88, 152, 46, 24]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'book' && solved}>
          <rect x="94" y="160" width="34" height="11" rx="1.5" fill="#2f6fd0" />
          <rect x="96" y="162" width="30" height="3" fill="#f4efe4" />
        </Thing>
        <Thing id="notebook" hit={[212, 154, 24, 22]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'notebook' && solved}>
          <rect x="214" y="162" width="20" height="10" rx="1" fill="#3b9d5d" />
          {[217, 221, 225, 229].map((x) => <circle key={x} cx={x} cy="162" r="1" fill="#f4efe4" />)}
        </Thing>
        <Thing id="pen" hit={[232, 177, 40, 18]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'pen' && solved}>
          <rect x="238" y="184" width="28" height="4" rx="2" fill="#1f3c88" />
          <rect x="238" y="184" width="6" height="4" rx="1" fill="#c0392b" />
        </Thing>
        <Thing id="ruler" hit={[280, 98, 20, 34]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'ruler' && solved}>
          <rect x="287" y="104" width="7" height="30" fill="#e7c98f" stroke="#a88a4f" strokeWidth="0.8" />
          {[108, 113, 118, 123].map((y) => <line key={y} x1="287" y1={y} x2="291" y2={y} stroke="#7a6a58" strokeWidth="0.8" />)}
        </Thing>
        <Thing id="scissors" hit={[300, 156, 20, 22]} found={found} canTap={canTap} onTap={tap} glow={round.item === 'scissors' && solved}>
          <g transform="translate(304 160)">
            <circle cx="0" cy="0" r="3" fill="none" stroke="#c0392b" strokeWidth="1.8" />
            <circle cx="0" cy="8" r="3" fill="none" stroke="#c0392b" strokeWidth="1.8" />
            <line x1="2" y1="1.5" x2="12" y2="7" stroke="#8d8d8d" strokeWidth="2" />
            <line x1="2" y1="6.5" x2="12" y2="1" stroke="#8d8d8d" strokeWidth="2" />
          </g>
        </Thing>
      </svg>

      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
        {(Object.keys(ITEMS) as ItemId[]).map((id) => (
          <span key={id} className={`rounded-full px-2 py-0.5 ${found.includes(id) ? 'bg-hp/20 text-hp' : 'bg-panel-2 text-paper/60'}`}>
            {found.includes(id) ? '✓ ' : ''}{ITEMS[id].en}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">Ana</p>
        <SpeakButton text={anaLine.text} size="sm" />
      </div>
      <p key={`${intro}-${r}`} className="anim-fade-in text-[17px] leading-relaxed">{anaLine.text}</p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{anaLine.es}</p>}

      {intro >= INTRO.length && !done && round.mode === 'choose' && !solved && (
        <div className="mt-3 grid gap-2">
          {round.options.map((o, k) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
          ))}
        </div>
      )}
      {canTap && <p className="mt-2 text-sm text-paper/70">Toca el objeto en el dibujo.</p>}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">
            ¡Bien! {say ? `"${say}"` : `Encontraste tu ${item.es}: está ${item.whereEs}.`}
          </p>
          {say && <SpeakButton text={say} size="sm" />}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {intro < INTRO.length ? (
          <button className={btnPrimary} onClick={() => setIntro(intro + 1)} autoFocus>Siguiente</button>
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Guardar mis útiles</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}

function Thing({
  id,
  found,
  canTap,
  onTap,
  glow,
  hit,
  children,
}: {
  id: ItemId
  hit: [number, number, number, number]
  found: ItemId[]
  canTap: boolean
  onTap: (id: ItemId) => void
  glow: boolean
  children: ReactNode
}) {
  const got = found.includes(id)
  if (got && !glow) return null
  return (
    <g
      onClick={() => onTap(id)}
      className={`${canTap && !got ? 'cursor-pointer' : ''} ${glow ? 'anim-pop' : ''}`}
      style={glow ? { filter: 'drop-shadow(0 0 4px #f6d36b)' } : undefined}
      role={canTap ? 'button' : undefined}
      aria-label={ITEMS[id].en}
      data-item={id}
    >
      <rect x={hit[0]} y={hit[1]} width={hit[2]} height={hit[3]} fill="transparent" />
      {children}
    </g>
  )
}
