import { useState } from 'react'
import { mixed } from '../game/mix'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * Enough for Everyone (A Dinner to Remember). La persona especial y el protagonista preparan la cena para 6 personas.
 * Tres tipos de ronda:
 *  - choose: elegir la frase correcta (How much / How many, enough, a little / a few).
 *  - count: mirar la despensa y calcular cuánto falta; al acertar se oye la frase completa.
 *  - sort: decidir si cada comida va con How much (no se cuenta) o How many (se cuenta).
 * Los errores no quitan vida: se explica qué falló. Con 0 o 1 errores, onClose(done, perfect=true) da un escudo.
 */
type Round =
  | { mode: 'choose'; line: string; es: string; note?: string; options: string[]; answer: number; tip: string }
  | { mode: 'count'; line: string; es: string; note: string; options: number[]; answer: number; say: string; tip: string }
  | { mode: 'sort'; line: string; es: string; words: { w: string; many: boolean }[] }

const GUESTS = 6

const ROUNDS: Round[] = [
  {
    mode: 'choose',
    line: "We're six people tonight. What's the first question?",
    es: 'Esta noche somos seis personas. ¿Cuál es la primera pregunta?',
    options: ['How many plates do we need?', 'How much plates do we need?', 'How many plate we need?'],
    answer: 0,
    tip: 'plates se cuentan → How many + plural, y la pregunta lleva do: do we need?',
  },
  {
    mode: 'count',
    line: 'Look in the cupboard. How many more plates do we need?',
    es: 'Mira en el armario. ¿Cuántos platos más necesitamos?',
    note: 'Armario: 4 platos · Invitados: 6',
    options: [4, 2, 6],
    answer: 1,
    say: "There aren't enough plates. We need two more.",
    tip: 'Somos 6 y hay 4 platos: 6 − 4 = 2.',
  },
  {
    mode: 'sort',
    line: "Now the shopping list. Is it How much or How many?",
    es: 'Ahora la lista de compras. ¿Va con How much o con How many?',
    words: [
      { w: 'rice', many: false },
      { w: 'eggs', many: true },
      { w: 'juice', many: false },
      { w: 'potatoes', many: true },
      { w: 'salt', many: false },
      { w: 'tomatoes', many: true },
    ],
  },
  {
    mode: 'choose',
    line: 'There are 1,500 grams of rice. Each person eats 200 grams. Is there enough?',
    es: 'Hay 1.500 gramos de arroz. Cada persona come 200 gramos. ¿Alcanza?',
    note: '6 × 200 g = 1.200 g',
    options: ["Yes, there's enough rice for everyone.", 'Yes, there are enough rices for everyone.', "Yes, there's rice enough for everyone."],
    answer: 0,
    tip: 'rice es incontable: there is (no are), sin -s, y enough va antes del sustantivo: enough rice.',
  },
  {
    mode: 'count',
    line: 'The cake needs 12 eggs. How many more eggs do we need?',
    es: 'El pastel necesita 12 huevos. ¿Cuántos huevos más necesitamos?',
    note: 'Nevera: 8 huevos · Receta: 12 huevos',
    options: [8, 12, 4],
    answer: 2,
    say: "There aren't enough eggs. We need four more.",
    tip: 'La receta pide 12 y hay 8: 12 − 8 = 4.',
  },
  {
    mode: 'choose',
    line: "We have two liters of juice, but everybody wants two glasses. That's three liters. What do you say?",
    es: 'Tenemos dos litros de jugo, pero todos quieren dos vasos. Eso son tres litros. ¿Qué dices?',
    note: 'Nevera: 2 litros de jugo · Se necesitan: 3 litros',
    options: ["There isn't enough juice. We need a little more.", "There aren't enough juice. We need a few more.", "There isn't much enough juice. We need many more."],
    answer: 0,
    tip: 'juice es incontable: there isn\'t enough juice · un poco más de algo incontable: a little more.',
  },
  {
    mode: 'choose',
    line: 'How much salt do I put in the soup?',
    es: '¿Cuánta sal le echo a la sopa?',
    options: ["Just a little. Grandpa Joe doesn't like too much salt.", "Just a few. Grandpa Joe doesn't like too many salt.", 'Just a little. Grandpa Joe not like too much salt.'],
    answer: 0,
    tip: 'salt es incontable: a little, too much (no a few ni many). Negativo: doesn\'t like.',
  },
]

export function EnoughForEveryone({ friend, onClose }: { friend: string; onClose: (done: boolean, perfect?: boolean) => void }) {
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [errors, setErrors] = useState(0)
  const [showEs, setShowEs] = useState(false)
  // Ronda sort: palabra actual
  const [w, setW] = useState(0)
  const [sorted, setSorted] = useState<{ w: string; many: boolean }[]>([])
  const done = r >= ROUNDS.length
  const round = ROUNDS[Math.min(r, ROUNDS.length - 1)]

  function choose(k: number) {
    if (done || solved || round.mode === 'sort') return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else {
      setErrors((e) => e + 1)
      setTip(round.tip)
    }
  }

  function sort(many: boolean) {
    if (done || solved || round.mode !== 'sort') return
    const word = round.words[w]
    if (word.many === many) {
      setTip(null)
      setSorted((s) => [...s, word])
      if (w + 1 >= round.words.length) setSolved(true)
      else setW(w + 1)
    } else {
      setErrors((e) => e + 1)
      setTip(word.many ? `${word.w} se cuenta (one, two, three...) → How many ${word.w}?` : `${word.w} no se cuenta → How much ${word.w}?`)
    }
  }

  function next() {
    setSolved(false)
    setTip(null)
    setW(0)
    setSorted([])
    setR(r + 1)
  }

  const perfect = errors <= 1
  const okLine =
    round.mode === 'count'
      ? round.say
      : round.mode === 'choose'
      ? round.options[round.answer]
      : 'How much rice, juice and salt? How many eggs, potatoes and tomatoes?'

  return (
    <Panel className="max-h-[92vh] overflow-y-auto">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">A Dinner to Remember · Enough for Everyone</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-xl border-2 border-line px-3 py-2 text-sm">
        <span>
          Invitados: <b className="text-gold">{GUESTS}</b>
        </span>
        <span className="text-paper/60">
          Ronda {Math.min(r + 1, ROUNDS.length)} de {ROUNDS.length}
        </span>
      </div>

      {done ? (
        <div className="anim-fade-in">
          <p className="font-display text-lg text-gold">{friend}</p>
          <p className="text-[17px] leading-relaxed">Six plates, enough rice, a lot of juice and a little salt. Dinner is ready!</p>
          {showEs && <p className="mt-1 text-sm text-paper/60">Seis platos, suficiente arroz, mucho jugo y un poco de sal. ¡La cena está lista!</p>}
          <p className="mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
            {perfect ? `¡Cuentas perfectas! ${errors ? 'Solo un error' : 'Sin errores'}: ganaste un escudo de palabras.` : `Terminaste con ${errors} errores. Con 0 o 1 error habrías ganado un escudo.`}
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-gold">{friend}</p>
            <SpeakButton text={round.line} size="sm" auto />
          </div>
          <p key={r} className="anim-fade-in text-[17px] leading-relaxed">{round.line}</p>
          {showEs && <p className="mt-1 text-sm text-paper/60">{round.es}</p>}
          {round.mode !== 'sort' && round.note && (
            <p className="mt-2 rounded-lg border-2 border-gold/40 px-3 py-1.5 text-sm text-gold">{round.note}</p>
          )}

          {round.mode === 'choose' && !solved && (
            <div className="mt-3 grid gap-2">
              {mixed(round.options).map(([o, k]) => (
                <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
              ))}
            </div>
          )}

          {round.mode === 'count' && !solved && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {round.options.map((n, k) => (
                <button key={k} className={`${btn} text-xl font-semibold`} onClick={() => choose(k)}>{n}</button>
              ))}
            </div>
          )}

          {round.mode === 'sort' && (
            <>
              {!solved && (
                <div className="mt-3 rounded-xl border-2 border-line p-3 text-center">
                  <p className="text-sm text-paper/60">¿Cómo preguntas por…?</p>
                  <p key={w} className="anim-fade-in font-display text-2xl text-gold">{round.words[w].w}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button className={btn} onClick={() => sort(false)}>How much…?</button>
                    <button className={btn} onClick={() => sort(true)}>How many…?</button>
                  </div>
                </div>
              )}
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border-2 border-line p-2">
                  <p className="text-xs font-semibold text-paper/60">How much (no se cuenta)</p>
                  <p>{sorted.filter((x) => !x.many).map((x) => x.w).join(', ') || '—'}</p>
                </div>
                <div className="rounded-lg border-2 border-line p-2">
                  <p className="text-xs font-semibold text-paper/60">How many (se cuenta)</p>
                  <p>{sorted.filter((x) => x.many).map((x) => x.w).join(', ') || '—'}</p>
                </div>
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
          <button className={btnPrimary} onClick={() => onClose(true, perfect)} autoFocus>Servir la cena</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}
