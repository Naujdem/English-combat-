import { useState } from 'react'
import { mixed } from '../game/mix'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * Fitting Room (Market Day; Shopping Challenge + Smart Inventory del catálogo).
 * La persona especial trae una lista y 100 dólares. Hay dos tipos de ronda:
 *  - choose: decir la frase correcta a Nadia o a la persona especial (try it on, too big, by card...).
 *  - pick: elegir del perchero la prenda que cumple la talla, el uso y el presupuesto, calculando el descuento.
 * Los errores no quitan vida: se explica qué falló. Con 0 o 1 errores, onClose(done, perfect=true) da un escudo.
 */
type Item = { name: string; size: string; price: number; off?: number; color: string; kind: 'jacket' | 'shoes' | 'jeans'; why?: string }

type Round =
  | { mode: 'choose'; who: string; line: string; es: string; options: string[]; answer: number; tip: string }
  | { mode: 'pick'; who: string; line: string; es: string; items: Item[]; answer: number }

const cost = (i: Item) => (i.off ? Math.round(i.price * (1 - i.off / 100)) : i.price)

const ROUNDS: Round[] = [
  {
    mode: 'choose',
    who: 'Nadia',
    line: 'Hi! Welcome to the sale. Can I help you?',
    es: '¡Hola! Te damos la bienvenida a las rebajas. ¿Puedo ayudarte?',
    options: ["Yes, please. I'm looking for a warm jacket.", "Yes, please. I look for a jacket warm.", "Yes, please. I'm looking a warm jacket."],
    answer: 0,
    tip: "Buscar: I'm looking FOR. El adjetivo va antes: a warm jacket.",
  },
  {
    mode: 'pick',
    who: 'friend',
    line: 'First, a warm jacket, size M. Don\'t spend more than $40!',
    es: 'Primero, una chaqueta abrigada, talla M. ¡No gastes más de 40 dólares!',
    items: [
      { name: 'Warm jacket', size: 'M', price: 50, off: 20, color: '#3b6fb6', kind: 'jacket' },
      { name: 'Warm jacket', size: 'S', price: 35, color: '#3b6fb6', kind: 'jacket', why: 'Es talla S (small), y necesitas M (medium).' },
      { name: 'Warm jacket', size: 'M', price: 60, color: '#2b2b3a', kind: 'jacket', why: 'Cuesta 60 dólares y no está en rebaja: es más de 40.' },
      { name: 'Light raincoat', size: 'M', price: 30, color: '#e0a526', kind: 'jacket', why: 'Es un impermeable ligero (light): no es una chaqueta abrigada (warm).' },
    ],
    answer: 0,
  },
  {
    mode: 'choose',
    who: 'Nadia',
    line: 'Good choice! It\'s 20% off, so it\'s only $40.',
    es: '¡Buena elección! Tiene 20% de descuento, así que cuesta solo 40 dólares.',
    options: ['Can I try it on, please?', 'Can I try on it, please?', 'Can I try them on, please?'],
    answer: 0,
    tip: 'Una cosa (the jacket) → it, y va en medio: try it on.',
  },
  {
    mode: 'choose',
    who: 'friend',
    line: 'How is it? Does it fit?',
    es: '¿Qué tal? ¿Te queda bien?',
    options: ["Yes, it fits perfectly. I'll take it!", 'Yes, it fit perfect. I take it!', "Yes, it's fitting perfectly. I'm take it!"],
    answer: 0,
    tip: "It fits (con -s) perfectly · me lo llevo: I'll take it.",
  },
  {
    mode: 'pick',
    who: 'friend',
    line: 'Now sneakers for running, size 8. You have $60, but don\'t spend more than $30.',
    es: 'Ahora tenis para correr, talla 8. Tienes 60 dólares, pero no gastes más de 30.',
    items: [
      { name: 'Running sneakers', size: '9', price: 25, color: '#3b9d5d', kind: 'shoes', why: 'Son talla 9, y necesitas talla 8.' },
      { name: 'Leather boots', size: '8', price: 28, color: '#8b5a2b', kind: 'shoes', why: 'Son botas de cuero (boots): no sirven para correr.' },
      { name: 'Running sneakers', size: '8', price: 60, off: 50, color: '#d64545', kind: 'shoes' },
      { name: 'Running sneakers', size: '8', price: 45, color: '#5d8fd4', kind: 'shoes', why: 'Cuestan 45 dólares sin descuento: es más de 30.' },
    ],
    answer: 2,
  },
  {
    mode: 'choose',
    who: 'friend',
    line: 'Hmm... those jeans look very big on you. Do they fit?',
    es: 'Mmm... esos jeans se te ven muy grandes. ¿Te quedan bien?',
    options: ["No, they're too big. Do you have a smaller size?", "No, it's too big. Do you have a more small size?", "No, they're big enough. Do you have smaller?"],
    answer: 0,
    tip: 'jeans es plural: they\'re. Demasiado grandes: too big. Más pequeña: smaller.',
  },
  {
    mode: 'pick',
    who: 'friend',
    line: 'OK, jeans in a smaller size: 30. You have $30 left. Spend it well!',
    es: 'Bueno, jeans de una talla más pequeña: 30. Te quedan 30 dólares. ¡Gástalos bien!',
    items: [
      { name: 'Blue jeans', size: '32', price: 20, color: '#3b6fb6', kind: 'jeans', why: 'Son talla 32: la misma talla grande. Necesitas la 30.' },
      { name: 'Blue shorts', size: '30', price: 15, color: '#5d8fd4', kind: 'jeans', why: 'Son pantalones cortos (shorts), no jeans.' },
      { name: 'Blue jeans', size: '30', price: 35, color: '#2f5c99', kind: 'jeans', why: 'Cuestan 35 dólares: solo te quedan 30.' },
      { name: 'Black jeans', size: '30', price: 40, off: 25, color: '#2b2b3a', kind: 'jeans' },
    ],
    answer: 3,
  },
  {
    mode: 'choose',
    who: 'Nadia',
    line: "That's $100 in total. How would you like to pay?",
    es: 'Son 100 dólares en total. ¿Cómo quieres pagar?',
    options: ['By card, please. Can I have the receipt?', 'With card, please. Can I have the recipe?', 'In card, please. Can I have the receive?'],
    answer: 0,
    tip: 'Con tarjeta: by card. El papel de la compra: the receipt (recipe es una receta de cocina).',
  },
]

const BUDGET = 100

export function FittingRoom({ friend, onClose }: { friend: string; onClose: (done: boolean, perfect?: boolean) => void }) {
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [errors, setErrors] = useState(0)
  const [spent, setSpent] = useState(0)
  const [bag, setBag] = useState<Item[]>([])
  const [showEs, setShowEs] = useState(false)
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]
  const who = round.who === 'friend' ? friend : round.who

  function choose(k: number) {
    if (done || round.mode !== 'choose' || solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else {
      setErrors((e) => e + 1)
      setTip(round.tip)
    }
  }

  function pick(k: number) {
    if (done || round.mode !== 'pick' || solved) return
    const it = round.items[k]
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
      setSpent((s) => s + cost(it))
      setBag((b) => [...b, it])
    } else {
      setErrors((e) => e + 1)
      setTip(it.why ?? 'Esa no es. Vuelve a leer la lista.')
    }
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  const perfect = errors <= 1
  const okLine =
    round.mode === 'pick'
      ? `${round.items[round.answer].name}, size ${round.items[round.answer].size}: $${cost(round.items[round.answer])}.`
      : round.options[round.answer]

  return (
    <Panel className="max-h-[92vh] overflow-y-auto">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">Market Day · Fitting Room</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      {/* Monedero y bolsa */}
      <div className="mb-3 flex items-center justify-between rounded-xl border-2 border-line px-3 py-2 text-sm">
        <span>
          Dinero: <b className="text-gold">${BUDGET - spent}</b> <span className="text-paper/50">de ${BUDGET}</span>
        </span>
        <span className="flex items-center gap-1" aria-label={`En la bolsa: ${bag.map((b) => b.name).join(', ') || 'nada'}`}>
          {bag.length ? bag.map((b, k) => <ItemIcon key={k} item={b} size={22} />) : <span className="text-paper/50">Bolsa vacía</span>}
        </span>
      </div>

      {done ? (
        <div className="anim-fade-in">
          <p className="font-display text-lg text-gold">{friend}</p>
          <p className="text-[17px] leading-relaxed">A jacket, sneakers and jeans... and exactly $100. You're a shopping expert!</p>
          {showEs && <p className="mt-1 text-sm text-paper/60">Una chaqueta, tenis y jeans... y exactamente 100 dólares. ¡Qué bien compras!</p>}
          <p className="mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
            {perfect ? `¡Compra perfecta! ${errors ? 'Solo un error' : 'Sin errores'}: ganaste un escudo de palabras.` : `Terminaste las compras con ${errors} errores. Con 0 o 1 error habrías ganado un escudo.`}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-gold">{who}</p>
            <SpeakButton text={round.line} size="sm" auto />
          </div>
          <p key={r} className="anim-fade-in text-[17px] leading-relaxed">{round.line}</p>
          {showEs && <p className="mt-1 text-sm text-paper/60">{round.es}</p>}

          {round.mode === 'choose' && !solved && (
            <div className="mt-3 grid gap-2">
              {mixed(round.options).map(([o, k]) => (
                <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
              ))}
            </div>
          )}

          {round.mode === 'pick' && (
            <>
              {!solved && <p className="mt-2 text-sm text-paper/70">Elige del perchero la prenda que cumple la lista. Calcula el descuento.</p>}
              <div className="mt-2 grid grid-cols-2 gap-2">
                {round.items.map((it, k) => {
                  const right = solved && k === round.answer
                  return (
                    <button
                      key={k}
                      disabled={solved}
                      onClick={() => pick(k)}
                      className={`flex flex-col items-center rounded-xl border-2 p-2 text-center ${right ? 'border-hp bg-hp/10' : 'border-line'} ${solved && !right ? 'opacity-40' : ''}`}
                    >
                      <ItemIcon item={it} size={48} />
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className="text-xs text-paper/70">Size {it.size}</span>
                      <span className="mt-0.5 text-sm">
                        {it.off ? (
                          <>
                            <s className="text-paper/50">${it.price}</s> <b className="text-danger">{it.off}% OFF</b>
                          </>
                        ) : (
                          <b>${it.price}</b>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          {solved && (
            <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
              <p className="flex-1 text-sm text-hp">¡Bien! "{okLine}"</p>
              <SpeakButton text={okLine} size="sm" />
            </div>
          )}
        </>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true, perfect)} autoFocus>Pagar y salir</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}

/** Dibujo simple de cada prenda (chaqueta, calzado o pantalón) */
function ItemIcon({ item, size }: { item: Item; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {item.kind === 'jacket' && (
        <>
          <path d="M10 6 L16 9 L22 6 L28 11 L25 15 L23 13 V27 H9 V13 L7 15 L4 11 Z" fill={item.color} stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1" />
          <line x1="16" y1="9" x2="16" y2="27" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1" />
        </>
      )}
      {item.kind === 'shoes' && (
        <>
          <path d="M4 20 V13 H12 L15 17 L26 19 Q29 20 28 24 H4 Z" fill={item.color} stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1" />
          <rect x="4" y="24" width="24" height="3" rx="1" fill="#f4efe4" />
        </>
      )}
      {item.kind === 'jeans' && (
        item.name.includes('shorts') ? (
          <path d="M9 6 H23 L25 19 H18 L16 11 L14 19 H7 Z" fill={item.color} stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1" />
        ) : (
          <path d="M9 4 H23 L25 28 H19 L16 11 L13 28 H7 Z" fill={item.color} stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1" />
        )
      )}
    </svg>
  )
}
