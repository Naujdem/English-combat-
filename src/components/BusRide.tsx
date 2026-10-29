import { useState } from 'react'
import { SpriteBody, type SpriteLook } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnPrimary, Panel } from './ui'
import { FRIENDS } from '../data/friends'
import { NPCS } from '../data/npcs'

/**
 * Viaje en autobús entre lugares del mapa: comprar el boleto con el conductor.
 * Repasa saludos, números, "Here you are" y una orden sencilla.
 */
type Step = { who: 'narrator' | 'leo' | 'driver'; text: string; es: string; choice?: { options: string[]; answer: number; tip: string } }

export type BusTrip = { place: string; placeEs: string; price: string; priceNum: string; wrongPrices: [string, string]; arrival: { text: string; es: string } }

export const BUS_TO_CITY: BusTrip = {
  place: 'the city',
  placeEs: 'la ciudad',
  price: 'two dollars',
  priceNum: '$2',
  wrongPrices: ['$12', '$20'],
  arrival: { text: 'Look! There is a big fountain, and there are a lot of shops!', es: '¡Mira! ¡Hay una fuente grande y hay muchas tiendas!' },
}

function steps(t: BusTrip): Step[] {
  return [
    { who: 'narrator', text: `Al día siguiente, Leo y tú van a la parada de autobús. Van a ${t.placeEs}.`, es: '' },
    { who: 'leo', text: "Here is the bus! Let's buy our tickets.", es: '¡Aquí está el autobús! Compremos los boletos.' },
    {
      who: 'driver',
      text: 'Good morning! Where are you going?',
      es: '¡Buenos días! ¿A dónde van?',
      choice: { options: [`To ${t.place}, please.`, `In ${t.place}, please.`, `${t.place[0].toUpperCase()}${t.place.slice(1)} is me.`], answer: 0, tip: 'Para decir a dónde vas: To + lugar. "To the city, please."' },
    },
    {
      who: 'driver',
      text: 'OK! How many tickets?',
      es: '¡Bien! ¿Cuántos boletos?',
      choice: { options: ['Two tickets, please.', 'Two ticket, please.', 'Two tickets, thank.'], answer: 0, tip: 'Leo y tú son dos: two tickets (plural con -s), please.' },
    },
    {
      who: 'driver',
      text: `That's ${t.price} each.`,
      es: 'Cada uno cuesta eso.',
      choice: { options: [t.wrongPrices[0], t.priceNum, t.wrongPrices[1]], answer: 1, tip: `Escucha otra vez: "${t.price}" = ${t.priceNum}.` },
    },
    {
      who: 'driver',
      text: 'Can I have the money, please?',
      es: '¿Me da el dinero, por favor?',
      choice: { options: ['Here are you.', 'You are here.', 'Here you are.'], answer: 2, tip: 'Al entregar algo se dice: Here you are.' },
    },
    { who: 'driver', text: 'Thank you! Sit down, please. Next stop: the city!', es: '¡Gracias! Siéntense, por favor. Próxima parada: ¡la ciudad!' },
    { who: 'leo', text: t.arrival.text, es: t.arrival.es },
  ]
}

export function BusRide({ trip, hero, onDone }: { trip: BusTrip; hero: SpriteLook; onDone: () => void }) {
  const list = steps(trip)
  const [i, setI] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const s = list[i]
  const last = i === list.length - 1
  const waiting = !!s.choice && !solved
  const moving = i >= 6

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onDone()
    else setI(i + 1)
  }

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">En el autobús</p>
        <svg viewBox="0 0 320 170" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Autobús de la ciudad">
          <rect width="320" height="170" fill="#bfe3f5" />
          <rect y="128" width="320" height="42" fill="#6b6b73" />
          {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={k * 60 + 8} y="148" width="30" height="4" fill="#f2d16b" />)}
          <g className={moving ? 'anim-bob' : undefined}>
            <rect x="20" y="40" width="280" height="92" rx="12" fill="#e0a526" />
            <rect x="20" y="104" width="280" height="10" fill="#c98b1a" />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={36 + k * 52} y="52" width="44" height="40" rx="4" fill="#d9eef8" />)}
            <rect x="248" y="52" width="40" height="70" rx="4" fill="#d9eef8" stroke="#c98b1a" strokeWidth="2" />
            <g transform="translate(44 58) scale(1.05)"><SpriteBody look={hero} /></g>
            <g transform="translate(96 58) scale(1.05)"><SpriteBody look={FRIENDS.leo.look} /></g>
            <g transform="translate(252 66) scale(1.05)"><SpriteBody look={NPCS.driver.look} /></g>
            <circle cx="70" cy="132" r="12" fill="#2b2b2b" />
            <circle cx="250" cy="132" r="12" fill="#2b2b2b" />
            <text x="150" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">CITY BUS</text>
          </g>
        </svg>

        <Panel>
          {s.who !== 'narrator' && (
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-gold">{s.who === 'leo' ? 'Leo' : NPCS.driver.name}</p>
              <SpeakButton text={s.text} size="sm" auto />
            </div>
          )}
          <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>{s.text}</p>
          {s.es && s.who !== 'narrator' && showEs && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
          {s.es && s.who !== 'narrator' && (
            <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setShowEs((v) => !v)}>
              {showEs ? 'Ocultar traducción' : 'Traducir'}
            </button>
          )}

          {waiting && (
            <div className="mt-3 grid gap-2">
              {s.choice!.options.map((o, k) => (
                <button
                  key={k}
                  className={`${btn} text-left text-base`}
                  onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tip))}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          {s.choice && solved && (
            <div className="anim-fade-in mt-2 flex items-center gap-2">
              <p className="text-sm font-semibold text-hp">¡Bien! "{s.choice.options[s.choice.answer]}"</p>
              <SpeakButton text={s.choice.options[s.choice.answer]} size="sm" />
            </div>
          )}
          {!waiting && (
            <button className={`${btnPrimary} mt-4 w-full`} onClick={next} autoFocus>
              {last ? 'Bajar del autobús' : 'Siguiente'}
            </button>
          )}
        </Panel>
      </div>
    </div>
  )
}
