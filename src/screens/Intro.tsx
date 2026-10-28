import { useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { btn, btnGhost, btnPrimary, Panel } from '../components/ui'
import { heroLook } from '../game/helpers'
import { FRIENDS } from '../data/friends'

type Choice = { options: string[]; answer: number; tip: string }

type Step = {
  who: 'narrator' | 'stranger' | 'leo' | 'board'
  text: string
  es?: string
  stranger?: boolean
  leo?: boolean
  steal?: boolean
  mute?: boolean
  /** Lo que aparece escrito en la pizarra de la escena */
  board?: [string, string?]
  choice?: Choice
}

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

function story(name: string): Step[] {
  return [
    { who: 'narrator', text: `Un día cualquiera, ${name} llega temprano a la escuela.` },
    { who: 'stranger', text: 'Hello there... What a nice voice you have.', es: 'Hola... Qué linda voz tienes.', stranger: true },
    { who: 'stranger', text: 'Your words are MINE now!', es: '¡Tus palabras ahora son MÍAS!', stranger: true, steal: true },
    { who: 'narrator', text: `${name} intenta gritar, pero no sale ningún sonido.`, stranger: true, mute: true },
    { who: 'stranger', text: 'I hid your words across time. Find them... if you can! Ha ha ha!', es: 'Escondí tus palabras a través del tiempo. Encuéntralas... ¡si puedes! ¡Ja, ja, ja!', stranger: true, mute: true },
    { who: 'narrator', text: 'El desconocido desaparece en una nube oscura.', mute: true },
  ]
}

/** Leo aparece y enseña el verbo to be paso a paso. Como no puedes hablar, respondes escribiendo en la pizarra. */
function tutorial(): Step[] {
  const L = { leo: true, mute: true }
  return [
    { who: 'narrator', text: 'Alguien entra corriendo al salón.', ...L },
    {
      who: 'leo', text: 'Hey! Are you OK?', es: '¡Oye! ¿Estás bien?', ...L,
      choice: { options: ['(Asentir lentamente)', '(Salir corriendo)', '(Ignorarlo)'], answer: 0, tip: '"Are you OK?" significa "¿Estás bien?". Asentir es decir que sí.' },
    },
    { who: 'leo', text: 'I am Leo. I saw everything! That stranger took your words.', es: 'Soy Leo. ¡Lo vi todo! Ese desconocido se llevó tus palabras.', ...L },
    { who: 'leo', text: "You can't talk, but you can write. Let's use the board!", es: 'No puedes hablar, pero puedes escribir. ¡Usemos la pizarra!', ...L },
    { who: 'leo', text: 'The most important verb is TO BE.', es: 'El verbo más importante es TO BE. Significa "ser" o "estar".', ...L, board: ['TO BE', '= ser / estar'] },

    { who: 'leo', text: 'With I, use AM. Look: I am Leo. I am a student.', es: 'Con "I" (yo) se usa "am". Mira: Soy Leo. Soy estudiante.', ...L, board: ['I → am', 'I am Leo.'] },
    { who: 'board', text: 'I ___ a student.', ...L, board: ['I → am', 'I am Leo.'], choice: { options: ['am', 'is', 'are'], answer: 0, tip: 'Con "I" siempre va "am".' } },

    { who: 'leo', text: 'With YOU, use ARE. You are my new friend!', es: 'Con "you" (tú) se usa "are". ¡Eres mi nuevo amigo!', ...L, board: ['You → are', 'You are my friend.'] },
    { who: 'board', text: 'You ___ very smart.', ...L, board: ['You → are', 'You are my friend.'], choice: { options: ['is', 'am', 'are'], answer: 2, tip: 'Con "you" siempre va "are".' } },

    { who: 'leo', text: 'With HE, SHE and IT, use IS. She is a teacher. It is a book.', es: 'Con "he" (él), "she" (ella) e "it" (cosa o animal) se usa "is".', ...L, board: ['He / She / It → is', 'She is a teacher.'] },
    { who: 'board', text: 'He ___ my brother.', ...L, board: ['He / She / It → is', 'She is a teacher.'], choice: { options: ['are', 'is', 'am'], answer: 1, tip: 'Con "he" va "is".' } },
    { who: 'board', text: 'It ___ a big school.', ...L, board: ['He / She / It → is', 'It is a book.'], choice: { options: ['is', 'are', 'am'], answer: 0, tip: '"It" es para cosas, y con "it" va "is".' } },

    { who: 'leo', text: 'With WE and THEY, use ARE. We are friends. They are students.', es: 'Con "we" (nosotros) y "they" (ellos) se usa "are".', ...L, board: ['We / They → are', 'They are students.'] },
    { who: 'board', text: 'We ___ in the classroom.', ...L, board: ['We / They → are', 'We are friends.'], choice: { options: ['am', 'are', 'is'], answer: 1, tip: '"We" es plural, así que va "are".' } },

    { who: 'leo', text: "To say no, add NOT. I am not sad. He isn't here. They aren't late.", es: 'Para negar, agrega "not". Se puede contraer: is not = isn\'t, are not = aren\'t.', ...L, board: ['+ not', "isn't · aren't"] },
    { who: 'board', text: 'They ___ at home.', ...L, board: ['+ not', "isn't · aren't"], choice: { options: ["isn't", "aren't", 'am not'], answer: 1, tip: '"They" va con "are", y su negación es "aren\'t".' } },

    { who: 'leo', text: 'To ask, put the verb first. Are you OK? Is she here?', es: 'Para preguntar, el verbo va primero: You are OK → Are you OK?', ...L, board: ['¿Pregunta?', 'Are you OK?'] },
    { who: 'board', text: '___ he your teacher?', ...L, board: ['¿Pregunta?', 'Is she here?'], choice: { options: ['Are', 'Am', 'Is'], answer: 2, tip: 'Con "he" la pregunta empieza con "Is".' } },

    { who: 'leo', text: 'Great! You are ready. The students here have your words. Win them back, and I will help you!', es: '¡Genial! Estás listo. Los estudiantes de aquí tienen tus palabras. ¡Recupéralas, yo te ayudo!', ...L, board: ['I am · You are', 'He / She / It is'] },
    { who: 'narrator', text: 'Leo ahora es tu amigo. Si fallas en un combate, te dará una pista.', ...L, board: ['I am · You are', 'He / She / It is'] },
  ]
}

export function Intro({ state, onDone }: { state: GameState; onDone: (tutorialDone: boolean) => void }) {
  const storySteps = story(state.hero.name)
  const list = [...storySteps, ...tutorial()]
  const [i, setI] = useState(0)
  const [es, setEs] = useState(false)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const s = list[i]
  const last = i === list.length - 1
  const inStory = i < storySteps.length
  const waiting = !!s.choice && !solved
  // En la guía de Leo la traducción se muestra por defecto; en la historia se pide con el botón
  const showEs = inStory ? es : !es

  function next() {
    setEs(false)
    setSolved(false)
    setTip(null)
    if (last) onDone(true)
    else setI(i + 1)
  }

  function choose(k: number) {
    if (!s.choice) return
    if (k === s.choice.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(s.choice.tip)
  }

  const text = s.choice && solved && s.text.includes('___') ? s.text.replace('___', s.choice.options[s.choice.answer]) : s.text
  const leo = FRIENDS.leo.look

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 px-4 py-6">
      <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label="Escena de la introducción">
        <rect width="320" height="140" fill="#e8dcc8" />
        <rect y="140" width="320" height="60" fill="#b98c5a" />
        <line x1="0" y1="160" x2="320" y2="160" stroke="#a37848" />
        <line x1="0" y1="182" x2="320" y2="182" stroke="#a37848" />
        <rect x="90" y="14" width="140" height="66" rx="3" fill="#7a5230" />
        <rect x="95" y="19" width="130" height="56" fill="#2f5d50" />
        {s.board && (
          <g key={s.board.join()} className="anim-fade-in">
            <text x="160" y="42" textAnchor="middle" fill="#f4efe4" fontSize="14" fontFamily={FONT} fontWeight="600">{s.board[0]}</text>
            {s.board[1] && <text x="160" y="63" textAnchor="middle" fill="#e0a526" fontSize="12" fontFamily={FONT}>{s.board[1]}</text>}
          </g>
        )}
        <rect x="14" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <rect x="262" y="20" width="44" height="60" fill="#9fd3f0" stroke="#7a6a58" strokeWidth="4" />
        <g transform="translate(40 92) scale(3)">
          <SpriteBody look={heroLook(state)} mood={s.mute ? 'mute' : 'normal'} />
        </g>
        {s.stranger && (
          <g key="stranger" className="anim-appear">
            <ellipse cx="248" cy="188" rx="26" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M222 188 L230 112 Q248 88 266 112 L274 188 Z" fill="#2d2440" />
            <ellipse cx="248" cy="122" rx="14" ry="15" fill="#15111f" />
            <circle cx="242" cy="122" r="2.4" fill="#e0a526" />
            <circle cx="254" cy="122" r="2.4" fill="#e0a526" />
          </g>
        )}
        {s.leo && (
          <g key="leo" className="anim-appear">
            <g transform="translate(280 92) scale(-3 3)">
              <SpriteBody look={leo} />
            </g>
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
              fontFamily={FONT}
              fontWeight="600"
            >
              {w}
            </text>
          ))}
      </svg>

      <Panel>
        {s.who === 'stranger' && <p className="font-display text-lg text-[#b9a3e8]">???</p>}
        {s.who === 'leo' && <p className="font-display text-lg text-gold">Leo</p>}
        {s.who === 'board' && <p className="text-xs font-semibold uppercase tracking-wide text-hp">Escribe en la pizarra</p>}
        <p
          key={i}
          className={`anim-fade-in leading-relaxed ${s.who === 'narrator' ? 'text-[17px] italic text-paper/85' : s.who === 'board' ? 'font-display text-[22px]' : 'text-[17px]'}`}
        >
          {text}
        </p>
        {showEs && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}

        {waiting && (
          <div className={`mt-3 grid gap-2 ${s.who === 'board' ? 'grid-cols-3' : ''}`}>
            {s.choice!.options.map((o, k) => (
              <button key={k} className={`${btn} ${s.who === 'board' ? 'px-2 text-[18px]' : 'text-left text-base'}`} onClick={() => choose(k)}>
                {o}
              </button>
            ))}
          </div>
        )}
        {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Leo: casi. {tip}</p>}
        {s.choice && solved && <p className="anim-fade-in mt-2 text-sm font-semibold text-hp">¡Bien hecho!</p>}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {s.es && (
              <button className={btnGhost} onClick={() => setEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
            )}
            {inStory ? (
              <button className={btnGhost} onClick={() => { setI(storySteps.length); setEs(false) }}>Saltar</button>
            ) : (
              <button className={btnGhost} onClick={() => onDone(false)}>Saltar guía</button>
            )}
          </div>
          {!waiting && (
            <button className={btnPrimary} onClick={next} autoFocus>
              {last ? 'Empezar' : 'Siguiente'}
            </button>
          )}
        </div>
        {!inStory && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/35" aria-hidden="true">
            <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${((i - storySteps.length + 1) / (list.length - storySteps.length)) * 100}%` }} />
          </div>
        )}
      </Panel>
    </div>
  )
}
