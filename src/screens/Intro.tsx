import { useState } from 'react'
import type { GameState, Hero, Interest, LessonStep } from '../game/types'
import { Presentation } from './Presentation'
import { SpriteBody } from '../components/Sprite'
import { btnGhost, btnPrimary, Panel } from '../components/ui'
import { ClassroomStage, FONT, Lesson } from '../components/Lesson'
import { heroLook } from '../game/helpers'
import { LESSONS } from '../data/lessons'
import { SpeakButton } from '../components/SpeakButton'

type StoryStep = { who: 'narrator' | 'stranger'; text: string; es?: string; stranger?: boolean; steal?: boolean; mute?: boolean }

function story(): StoryStep[] {
  return [
    { who: 'narrator', text: 'Un día cualquiera, llegas temprano a tu nueva escuela.' },
    { who: 'stranger', text: 'Hello there... What a nice voice you have.', es: 'Hola... Qué linda voz tienes. (Su voz es ronca, como si casi no pudiera hablar.)', stranger: true },
    { who: 'stranger', text: 'Your words are MINE now!', es: '¡Tus palabras ahora son MÍAS!', stranger: true, steal: true },
    { who: 'narrator', text: 'Intentas gritar, pero no sale ningún sonido.', stranger: true, mute: true },
    { who: 'stranger', text: 'Now... back to my time!', es: 'Ahora... ¡de vuelta a mi tiempo!', stranger: true, mute: true },
    { who: 'narrator', text: 'El desconocido levanta un reloj extraño. Brilla cada vez más fuerte... y explota. Pedazos brillantes salen volando por todas partes.', stranger: true, mute: true },
    { who: 'stranger', text: 'No... NO! My clock!', es: 'No... ¡NO! ¡Mi reloj!', stranger: true, mute: true },
    { who: 'narrator', text: 'El desconocido desaparece en una nube oscura. En el piso queda un brillo... y luego nada.', mute: true },
  ]
}

/** Leo llega, te pregunta cómo estás y empieza la guía del verbo to be */
const LEO_ARRIVES: LessonStep[] = [
  { who: 'narrator', text: 'Alguien entra corriendo al salón.' },
  {
    who: 'leo',
    text: 'Hey! Are you OK?',
    es: '¡Oye! ¿Estás bien?',
    choice: { options: ['(Asentir lentamente)', '(Salir corriendo)', '(Ignorarlo)'], answer: 0, tip: '"Are you OK?" significa "¿Estás bien?". Asentir es decir que sí.' },
  },
  { who: 'leo', text: 'I am Leo. I saw a big light from the hall! A stranger took your words?', es: 'Soy Leo. ¡Vi una luz enorme desde el pasillo! ¿Un desconocido se llevó tus palabras?' },
  { who: 'leo', text: "You can't talk, but you can write. Let's use the board!", es: 'No puedes hablar, pero puedes escribir. ¡Usemos la pizarra!' },
]


/**
 * Inicio del juego: el desconocido roba la voz, llega Leo, enseña el verbo to be
 * y luego el jugador se presenta (nombre, edad, país, persona especial).
 */
export function Intro({
  state,
  onDone,
}: {
  state: GameState
  onDone: (r: { lessonDone: boolean; hero: Hero; interest: Interest }) => void
}) {
  const steps = story()
  const [i, setI] = useState(0)
  const [es, setEs] = useState(false)
  const [lessonDone, setLessonDone] = useState<boolean | null>(null)

  if (i >= steps.length && lessonDone === null) {
    return <Lesson state={state} steps={[...LEO_ARRIVES, ...(LESSONS['to-be'] ?? []).map((st) => ({ ...st, topic: 'to-be' as const }))]} onDone={(done) => setLessonDone(done)} />
  }
  if (lessonDone !== null) {
    return <Presentation onDone={(hero, interest) => onDone({ lessonDone, hero, interest })} />
  }

  const s = steps[i]
  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 px-4 py-6">
      <ClassroomStage>
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
      </ClassroomStage>

      <Panel>
        {s.who === 'stranger' && (
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-[#b9a3e8]">???</p>
            <SpeakButton text={s.text} size="sm" auto />
          </div>
        )}
        <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>
          {s.text}
        </p>
        {es && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {s.es && <button className={btnGhost} onClick={() => setEs((v) => !v)}>{es ? 'Ocultar' : 'Traducir'}</button>}
            <button className={btnGhost} onClick={() => setI(steps.length)}>Saltar</button>
          </div>
          <button className={btnPrimary} onClick={() => { setI(i + 1); setEs(false) }} autoFocus>
            Siguiente
          </button>
        </div>
      </Panel>
    </div>
  )
}
