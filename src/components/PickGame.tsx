import { useState } from 'react'
import { mixed } from '../game/mix'
import { SpriteBody } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { NPCS } from '../data/npcs'

/**
 * Minijuego de elegir mirando un dibujo (escuela de A1). Sirve para dos juegos:
 *  · "Whose is it?" (Mr. Brown, biblioteca): el posesivo con 's (Leo's bag) y la trampa 's = is.
 *  · "One or Many?" (Ben, patio): this + is / these + are, y el plural con -s.
 * Primero el personaje explica la regla con una pizarra corta y después vienen las rondas.
 */

type Thing = 'bag' | 'book' | 'pencil' | 'ball' | 'window' | 'chair' | 'glasses'

type Line = { text: string; es: string; board?: string[] }

type Round = {
  thing?: Thing
  count?: number
  /** Etiqueta con el nombre del dueño, colgada del objeto */
  owner?: string
  /** Frase grande que se muestra en lugar del dibujo (rondas de "¿qué significa 's?") */
  card?: string
  ask: string
  askEs: string
  options: string[]
  answer: number
  tip: string
  /** Frase correcta completa, para oírla al acertar */
  say: string
}

export type PickGameId = 'whose' | 'many'

const GAMES: Record<PickGameId, { npc: string; voice: 'male' | 'female'; title: string; intro: Line[]; rounds: Round[]; outro: Line; finish: string }> = {
  whose: {
    npc: 'librarian',
    voice: 'male',
    title: 'Biblioteca · ¿De quién es?',
    intro: [
      { text: 'Look at this table! Bags, books, pencils... The students forget their things here.', es: '¡Mira esta mesa! Mochilas, libros, lápices... Los estudiantes olvidan sus cosas aquí.' },
      { text: "Every thing has a name on it. This bag is from Leo. In English we say: Leo's bag.", es: "Cada cosa tiene un nombre. Esta mochila es de Leo. En inglés se dice: Leo's bag.", board: ["dueño + 's + cosa", "Leo's bag = la mochila de Leo"] },
      { text: "First the person, then 's, then the thing. Maya's book. Ana's pencil.", es: "Primero la persona, luego 's, luego la cosa. En español es al revés: el libro de Maya.", board: ["Maya's book", "Ana's pencil", "(NO: the book of Maya)"] },
      { text: "Be careful! 's can also be IS. Leo's happy = Leo is happy. Look at the next word!", es: "¡Cuidado! 's también puede ser IS. Si después viene una cosa, es posesión. Si viene un adjetivo, es \"is\".", board: ["Leo's bag → de Leo (cosa)", "Leo's happy → Leo is (adjetivo)"] },
    ],
    rounds: [
      { thing: 'bag', owner: 'Leo', ask: 'Whose bag is this?', askEs: '¿De quién es esta mochila?', options: ["It's Leo's bag.", "It's Leo bag.", "It's bag Leo's."], answer: 0, tip: "Primero el dueño con 's y luego la cosa: Leo's bag.", say: "It's Leo's bag." },
      { thing: 'book', owner: 'Maya', ask: 'Whose book is this?', askEs: '¿De quién es este libro?', options: ["It's Mayas book.", "It's Maya's book.", "It's book of Maya."], answer: 1, tip: "Lleva apóstrofo: Maya's. Sin apóstrofo (Mayas) está mal escrito.", say: "It's Maya's book." },
      { thing: 'pencil', owner: 'Ana', ask: 'Whose pencil is this?', askEs: '¿De quién es este lápiz?', options: ["It's pencil Ana's.", "It's Ana pencil.", "It's Ana's pencil."], answer: 2, tip: "El orden es dueño + 's + cosa: Ana's pencil.", say: "It's Ana's pencil." },
      { card: "Leo's happy.", ask: "What is 's here?", askEs: "¿Qué significa 's en esta frase?", options: ['is (Leo is happy)', 'de Leo (posesión)'], answer: 0, tip: '"Happy" es un adjetivo, no una cosa. Aquí \'s es "is": Leo is happy.', say: 'Leo is happy.' },
      { card: "Maya's bag is pink.", ask: "What is 's here?", askEs: "¿Qué significa 's en esta frase?", options: ['is (Maya is bag)', 'de Maya (posesión)'], answer: 1, tip: '"Bag" es una cosa: es la mochila de Maya. El verbo "is" ya está después.', say: "Maya's bag is pink." },
      { thing: 'ball', owner: 'Ben', ask: 'Whose ball is this?', askEs: '¿De quién es esta pelota?', options: ["Its Ben ball.", "It Ben's ball.", "It's Ben's ball."], answer: 2, tip: "Aquí hay dos: It's = it is, y Ben's = de Ben.", say: "It's Ben's ball." },
      { thing: 'glasses', owner: 'Mr. Brown', ask: 'Whose glasses are these?', askEs: '¿De quién son estas gafas?', options: ["They're Mr. Brown's glasses.", "They're Mr. Brown glasses.", "They're glasses Mr. Brown's."], answer: 0, tip: "Con Mr. Brown es igual: Mr. Brown's glasses.", say: "They're Mr. Brown's glasses." },
    ],
    outro: { text: "Excellent! Those are my glasses, thank you! Now you know: Leo's bag, Maya's book, Ana's pencil.", es: "¡Excelente! Esas son mis gafas, ¡gracias! Ya lo sabes: Leo's bag, Maya's book, Ana's pencil." },
    finish: 'Devolver las cosas',
  },
  many: {
    npc: 'ben',
    voice: 'male',
    title: 'Patio · ¿Una o varias?',
    intro: [
      { text: "Hi! Let's play a game. Look at my things and tell me: one or many?", es: '¡Hola! Juguemos. Mira mis cosas y dime: ¿una o varias?' },
      { text: 'One thing: THIS ball IS white. The ball IS white.', es: 'Una sola cosa: this + cosa + is.', board: ['UNA → this ball is', 'The ball is white.'] },
      { text: 'Many things: THESE balls ARE white. The balls ARE white. Add -S to the thing!', es: 'Varias cosas: these + cosa con -s + are.', board: ['VARIAS → these balls are', 'The balls are white.'] },
      { text: 'Never mix them! "This balls is" is wrong. Everything changes together.', es: 'No se mezclan: si hay varias, cambian las tres partes (these, -s, are).', board: ['this ball is', 'these balls are', '(NO: this balls is)'] },
    ],
    rounds: [
      { thing: 'ball', count: 1, ask: 'Look! One or many?', askEs: '¡Mira! ¿Una o varias?', options: ['This ball is white.', 'These ball are white.', 'This balls is white.'], answer: 0, tip: 'Hay una sola pelota: this ball is.', say: 'This ball is white.' },
      { thing: 'ball', count: 3, ask: 'And now?', askEs: '¿Y ahora?', options: ['This balls is white.', 'These balls is white.', 'These balls are white.'], answer: 2, tip: 'Hay varias: these + balls (con -s) + are.', say: 'These balls are white.' },
      { thing: 'window', count: 1, ask: 'The window ___ big.', askEs: 'La ventana es grande.', options: ['are', 'is', 'am'], answer: 1, tip: '"The window" es una sola: va "is".', say: 'The window is big.' },
      { thing: 'window', count: 3, ask: 'The windows ___ big.', askEs: 'Las ventanas son grandes.', options: ['is', 'am', 'are'], answer: 2, tip: '"The windows" termina en -s, son varias: va "are".', say: 'The windows are big.' },
      { thing: 'chair', count: 2, ask: '___ chairs are blue.', askEs: 'Estas sillas son azules.', options: ['These', 'This', 'It'], answer: 0, tip: 'Hay dos sillas: these chairs.', say: 'These chairs are blue.' },
      { thing: 'book', count: 3, ask: 'Fix it: "This books is new!"', askEs: 'Corrígelo: hay varios libros.', options: ['This books are new.', 'These books are new.', 'These book is new.'], answer: 1, tip: 'Con varios cambia todo: these + books + are.', say: 'These books are new.' },
      { thing: 'bag', count: 1, ask: 'Fix it: "These bag are red!"', askEs: 'Corrígelo: hay una sola mochila.', options: ['This bag is red.', 'This bags is red.', 'These bag is red.'], answer: 0, tip: 'Con una sola: this + bag + is.', say: 'This bag is red.' },
    ],
    outro: { text: 'Great game! This ball is my ball. These balls are our balls. See you on the field!', es: '¡Buen juego! Esta pelota es mi pelota. Estas pelotas son nuestras pelotas. ¡Nos vemos en la cancha!' },
    finish: 'Terminar el juego',
  },
}

export function PickGame({ game, onClose }: { game: PickGameId; onClose: (done: boolean) => void }) {
  const g = GAMES[game]
  const npc = NPCS[g.npc]
  const [intro, setIntro] = useState(0)
  const [r, setR] = useState(0)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const inIntro = intro < g.intro.length
  const done = r >= g.rounds.length
  const round = g.rounds[Math.min(r, g.rounds.length - 1)]
  const line: Line = inIntro ? g.intro[intro] : done ? g.outro : { text: round.ask, es: round.askEs }

  function choose(k: number) {
    if (solved) return
    if (k === round.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(round.tip)
  }

  function next() {
    setSolved(false)
    setTip(null)
    setR(r + 1)
  }

  return (
    <Panel>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">{g.title}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <svg viewBox="0 0 320 130" className="w-full rounded-xl border-2 border-line" role="img" aria-label={g.title}>
        <rect width="320" height="92" fill="#e8dcc8" />
        <rect y="92" width="320" height="38" fill="#b98c5a" />
        <g transform="translate(10 22) scale(1.5)">
          <SpriteBody look={npc.look} />
        </g>
        {inIntro || done ? (
          <Board lines={line.board ?? (done ? ['Good job!'] : ['Listen...'])} />
        ) : round.card ? (
          <Board lines={[round.card]} big />
        ) : (
          <g key={r} className="anim-fade-in">
            {Array.from({ length: round.count ?? 1 }, (_, i) => {
              const n = round.count ?? 1
              const x = 190 + (i - (n - 1) / 2) * 62
              return (
                <g key={i} transform={`translate(${x} 62)`}>
                  <Icon thing={round.thing!} />
                </g>
              )
            })}
            {round.owner && (
              <g transform="translate(232 30)">
                <line x1="-14" y1="14" x2="0" y2="8" stroke="#7a6a58" strokeWidth="1.2" />
                <rect width={Math.max(40, round.owner.length * 7.5 + 14)} height="20" rx="4" fill="#fffaf0" stroke="#c9965a" strokeWidth="1.5" />
                <text x="7" y="14" fontSize="12" fontWeight="700" fill="#3a2f25" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{round.owner}</text>
              </g>
            )}
          </g>
        )}
      </svg>

      {!inIntro && !done && (
        <p className="mt-2 text-[11px] text-paper/60">Ronda {r + 1} de {g.rounds.length}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-lg text-gold">{npc.name}</p>
        {(inIntro || done || !round.ask.includes('___')) && <SpeakButton text={line.text} size="sm" auto voice={g.voice} />}
      </div>
      <p key={`${intro}-${r}`} className="anim-fade-in text-[17px] leading-relaxed">{line.text}</p>
      {(showEs || (inIntro && !!line.board)) && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {!inIntro && !done && !solved && (
        <div className="mt-3 grid gap-2">
          {mixed(round.options).map(([o, k]) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>{o}</button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {solved && !done && (
        <div className="anim-fade-in mt-3 flex items-center gap-2 rounded-lg bg-hp/15 px-3 py-2">
          <p className="flex-1 text-sm text-hp">¡Bien! "{round.say}" {round.tip}</p>
          <SpeakButton text={round.say} size="sm" />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {inIntro ? (
          <button className={btnPrimary} onClick={() => setIntro(intro + 1)} autoFocus>Siguiente</button>
        ) : done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>{g.finish}</button>
        ) : solved ? (
          <button className={btnPrimary} onClick={next} autoFocus>Siguiente</button>
        ) : null}
      </div>
    </Panel>
  )
}

/** Pizarra pequeña con la regla (o con la frase de la ronda) */
function Board({ lines, big }: { lines: string[]; big?: boolean }) {
  const h = 22
  const top = 50 - (lines.length * h) / 2
  return (
    <g>
      <rect x="92" y="10" width="218" height="80" rx="6" fill="#2f5d50" stroke="#8a5a32" strokeWidth="4" />
      {lines.map((t, i) => (
        <text key={i} x="201" y={top + i * h + 16} textAnchor="middle" fontSize={big ? 17 : 13} fontWeight="600" fill={t.startsWith('(') ? '#f3b0b0' : '#fdf8ec'} fontFamily="Fredoka, Nunito, system-ui, sans-serif">{t}</text>
      ))}
    </g>
  )
}

/** Dibujos sencillos, centrados en (0, 0) y de unos 50 de ancho */
function Icon({ thing }: { thing: Thing }) {
  switch (thing) {
    case 'bag':
      return (
        <g>
          <path d="M-10 -18 q10 -14 20 0" fill="none" stroke="#a3342b" strokeWidth="3" />
          <rect x="-18" y="-18" width="36" height="42" rx="9" fill="#d64545" />
          <rect x="-11" y="2" width="22" height="14" rx="3" fill="#a3342b" />
        </g>
      )
    case 'book':
      return (
        <g>
          <rect x="-19" y="-22" width="38" height="46" rx="3" fill="#2f6fd0" />
          <rect x="-19" y="-22" width="7" height="46" rx="2" fill="#1f4f9c" />
          <rect x="-6" y="-12" width="19" height="6" fill="#f4efe4" />
        </g>
      )
    case 'pencil':
      return (
        <g transform="rotate(-20)">
          <rect x="-24" y="-5" width="40" height="10" rx="1" fill="#f2c230" />
          <polygon points="16,-5 28,0 16,5" fill="#f1d3a3" />
          <polygon points="24,-1.6 28,0 24,1.6" fill="#3a2f25" />
          <rect x="-30" y="-5" width="6" height="10" fill="#e58aa6" />
        </g>
      )
    case 'ball':
      return (
        <g>
          <circle r="20" fill="#fdfdfd" stroke="#3a2f25" strokeWidth="2" />
          <polygon points="0,-8 8,-2 5,7 -5,7 -8,-2" fill="#3a2f25" />
        </g>
      )
    case 'window':
      return (
        <g>
          <rect x="-22" y="-26" width="44" height="50" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
          <line x1="0" y1="-26" x2="0" y2="24" stroke="#7a6a58" strokeWidth="3" />
          <line x1="-22" y1="-1" x2="22" y2="-1" stroke="#7a6a58" strokeWidth="3" />
        </g>
      )
    case 'chair':
      return (
        <g>
          <rect x="-16" y="-28" width="6" height="52" fill="#1f4f9c" />
          <rect x="-16" y="-28" width="30" height="16" rx="3" fill="#2f6fd0" />
          <rect x="-16" y="-2" width="34" height="7" rx="2" fill="#2f6fd0" />
          <rect x="12" y="5" width="6" height="19" fill="#1f4f9c" />
        </g>
      )
    case 'glasses':
      return (
        <g fill="none" stroke="#3a2f25" strokeWidth="3">
          <circle cx="-13" cy="0" r="10" fill="#d8eef8" />
          <circle cx="13" cy="0" r="10" fill="#d8eef8" />
          <line x1="-3" y1="0" x2="3" y2="0" />
          <line x1="-23" y1="-2" x2="-30" y2="-8" />
          <line x1="23" y1="-2" x2="30" y2="-8" />
        </g>
      )
  }
}
