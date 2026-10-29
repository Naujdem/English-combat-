import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * La fiesta de los 60 años de Green Street (2056), con Emma, la hermana de Leo.
 * A cada vecino se le pregunta con What / Where / When / Who + are you going to...?,
 * se escucha su respuesta y se anota en la lista de la fiesta.
 */
type Choice = { options: string[]; answer: number; tip: string }
type Round = { who: string; voice: 'male' | 'female'; task: string; ask: Choice; reply: { text: string; es: string }; note: Choice & { q: string } }

const ROUNDS: Round[] = [
  {
    who: 'Kevin',
    voice: 'male',
    task: 'Pregúntale a Kevin qué va a traer.',
    ask: { options: ['What are you going to bring?', 'What you are going to bring?', 'What are you going bring?'], answer: 0, tip: 'Palabra de pregunta + are + you + going to + verbo: What are you going to bring?' },
    reply: { text: "I'm going to bring a basketball! We're going to play a big match in the park.", es: '¡Voy a traer un balón de baloncesto! Vamos a jugar un gran partido en el parque.' },
    note: { q: 'What is Kevin going to bring?', options: ['A basketball.', 'A cake.', 'Some music.'], answer: 0, tip: 'Kevin dijo: "I\'m going to bring a basketball".' },
  },
  {
    who: 'Olivia',
    voice: 'female',
    task: 'Pregúntale a Olivia cuándo va a llegar.',
    ask: { options: ['When are you going to arrive?', 'When you going to arrive?', 'When are you going to arrived?'], answer: 0, tip: 'When + are + you + going to + arrive (verbo simple).' },
    reply: { text: "At four o'clock. I'm going to take photos for the news. Green Street is sixty years old!", es: 'A las cuatro. Voy a tomar fotos para las noticias. ¡Green Street cumple sesenta años!' },
    note: { q: 'When is Olivia going to arrive?', options: ["At four o'clock.", "At six o'clock.", 'Tomorrow morning.'], answer: 0, tip: 'Olivia dijo: "At four o\'clock".' },
  },
  {
    who: 'Mr. Rojas',
    voice: 'male',
    task: 'Pregúntale al señor Rojas a quién va a traer.',
    ask: { options: ['Who are you going to bring?', 'Who you are going to bring?', 'Who is you going to bring?'], answer: 0, tip: 'Who + are + you + going to...?' },
    reply: { text: "I'm going to bring my grandson Theo. He wants to be an astronaut!", es: 'Voy a traer a mi nieto Theo. ¡Quiere ser astronauta!' },
    note: { q: 'Who is Mr. Rojas going to bring?', options: ['His grandson Theo.', 'His dog.', 'His wife.'], answer: 0, tip: 'Mr. Rojas dijo: "my grandson Theo".' },
  },
  {
    who: 'Lucy',
    voice: 'female',
    task: 'Pregúntale a Lucy dónde se va a sentar.',
    ask: { options: ['Where are you going to sit?', 'Where you are going to sit?', 'Where are you go to sit?'], answer: 0, tip: 'Where + are + you + going to + sit?' },
    reply: { text: "I'm going to sit under the big tree, with my dogs and my robot dog. Ha ha!", es: 'Me voy a sentar debajo del árbol grande, con mis perros y mi perro robot. ¡Ja, ja!' },
    note: { q: 'Where is Lucy going to sit?', options: ['Under the big tree.', 'In her house.', 'On the bus.'], answer: 0, tip: 'Lucy dijo: "under the big tree".' },
  },
  {
    who: 'Emma',
    voice: 'female',
    task: 'Por último, pregúntale a Emma a qué hora va a empezar la fiesta.',
    ask: { options: ['What time is the party going to start?', 'What time the party is going to start?', 'What time is the party going start?'], answer: 0, tip: 'What time + is + the party + going to + start?' },
    reply: { text: "It's going to start at five. My brother Leo is going to make a speech... and he's going to say 'Hi, hi!' Ha ha!", es: 'Va a empezar a las cinco. Mi hermano Leo va a dar un discurso... ¡y va a decir "Hi, hi!"! ¡Ja, ja!' },
    note: { q: 'What time is the party going to start?', options: ['At five.', 'At four.', 'At nine.'], answer: 0, tip: 'Emma dijo: "It\'s going to start at five".' },
  },
]

export function PartyPlan({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [stage, setStage] = useState<'ask' | 'note' | 'done'>('ask')
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const [notes, setNotes] = useState<string[]>([])
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1
  const choice = stage === 'note' ? r.note : r.ask

  function pick(k: number) {
    if (k === choice.answer) {
      sfx('correct')
      setTip(null)
      if (stage === 'note') setNotes((n) => [...n, `${r.who}: ${r.note.options[r.note.answer]}`])
      setStage(stage === 'ask' ? 'note' : 'done')
    } else {
      sfx('wrong')
      setTip(choice.tip)
    }
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">La fiesta de los 60 años · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">Emma: "Green Street is going to be sixty years old! Can you ask the neighbors?" {r.task}</p>

      {notes.length > 0 && (
        <ul className="mt-2 rounded-xl border-2 border-[#8b5a2b] bg-[#f4efe4] px-3 py-1.5 text-[14px] text-ink">
          <li className="font-display text-[13px] text-[#8b5a2b]">PARTY LIST · SATURDAY</li>
          {notes.map((n) => <li key={n}>✓ {n}</li>)}
        </ul>
      )}

      <p className="mt-3 font-display text-[17px] text-paper">{r.who}</p>
      {stage === 'ask' && <p className="text-sm text-paper/60">¿Qué le preguntas?</p>}
      {stage !== 'ask' && (
        <div className="anim-fade-in mt-1 rounded-xl bg-panel-2 px-3 py-2">
          <p className="text-sm text-paper/60">Tú: "{r.ask.options[r.ask.answer]}"</p>
          <div className="mt-1 flex items-start gap-2">
            <p className="flex-1 text-[17px]"><Tappable text={r.reply.text} /></p>
            <SpeakButton text={r.reply.text} size="sm" auto voice={r.voice} />
          </div>
          {es && <p className="text-sm text-paper/60">{r.reply.es}</p>}
          <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setEs((v) => !v)}>
            {es ? 'Ocultar traducción' : 'Traducir'}
          </button>
        </div>
      )}
      {stage === 'note' && <p className="anim-fade-in mt-3 font-semibold text-gold">Emma: <span className="text-paper">{r.note.q}</span></p>}

      {stage !== 'done' && (
        <div className="mt-2 grid gap-2">
          {mixed(choice.options).map(([o, k]) => (
            <button key={`${stage}-${k}`} className={`${btn} text-left text-base`} onClick={() => pick(k)}>
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {stage === 'done' && (
        <>
          <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">{last ? '¡La lista de la fiesta está completa!' : '¡Anotado en la lista!'}</p>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setStage('ask')
              setEs(false)
            }}
          >
            {last ? 'Darle la lista a Emma' : 'Siguiente vecino'}
          </button>
        </>
      )}
    </Panel>
  )
}
