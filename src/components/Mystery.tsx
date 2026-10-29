import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * El misterio del molino (granja, 1996): el molino se paró anoche. Hay que preguntar a cada
 * sospechoso con Did...? (verbo simple después de did), entender su respuesta (Yes, I did / No, I didn't)
 * y al final descubrir quién fue.
 */
type Choice = { options: string[]; answer: number; tip: string }
type Round = { who: string; voice: 'male' | 'female'; intro: string; ask: Choice; reply: { text: string; es: string }; check: Choice & { q: string } }

const ROUNDS: Round[] = [
  {
    who: 'Hank, el trabajador',
    voice: 'male',
    intro: 'Hank arregla las cercas. Pregúntale si fue al molino ayer.',
    ask: {
      options: ['Did you go to the windmill yesterday?', 'Did you went to the windmill yesterday?', 'Do you went to the windmill yesterday?'],
      answer: 0,
      tip: 'Después de did, el verbo va simple: Did you go...? (no "went").',
    },
    reply: { text: "Yes, I did. But I didn't touch it! I only fixed the fence next to it.", es: 'Sí, fui. ¡Pero no lo toqué! Solo arreglé la cerca de al lado.' },
    check: { q: 'Did Hank touch the windmill?', options: ["No, he didn't.", 'Yes, he did.', "No, he doesn't."], answer: 0, tip: 'Hank dijo: "I didn\'t touch it". Respuesta corta en pasado: No, he didn\'t.' },
  },
  {
    who: 'Lucy, la lechera',
    voice: 'female',
    intro: 'Lucy trae la leche todas las mañanas. Pregúntale si vio el molino.',
    ask: {
      options: ['Did you see the windmill this morning?', 'Did you saw the windmill this morning?', 'You did see the windmill this morning?'],
      answer: 0,
      tip: 'Pregunta: Did + sujeto + verbo simple: Did you see...?',
    },
    reply: { text: "Yes, I did. It worked yesterday morning. But at night it stopped. I didn't hear a sound!", es: 'Sí, lo vi. Ayer en la mañana funcionaba. Pero en la noche se paró. ¡No oí ningún ruido!' },
    check: { q: 'Did the windmill work yesterday morning?', options: ['Yes, it did.', "No, it didn't.", 'Yes, it worked did.'], answer: 0, tip: 'Lucy dijo: "It worked yesterday morning". Yes, it did.' },
  },
  {
    who: 'Tom, el niño',
    voice: 'male',
    intro: 'Tom es el hijo de Hank. Pregúntale si jugó cerca del molino.',
    ask: {
      options: ['Did you play near the windmill?', 'Did you played near the windmill?', 'Do you play near the windmill yesterday?'],
      answer: 0,
      tip: 'Después de did, sin -ed: Did you play...? (no "played").',
    },
    reply: { text: "No, I didn't! I played in the barn. And I saw a lot of mice there. They ate my sandwich!", es: '¡No! Jugué en el granero. Y vi muchos ratones ahí. ¡Se comieron mi sándwich!' },
    check: { q: 'Where did Tom play?', options: ['In the barn.', 'Near the windmill.', 'In the house.'], answer: 0, tip: 'Tom dijo: "I played in the barn".' },
  },
  {
    who: 'Bill',
    voice: 'male',
    intro: 'Bill revisa la cuerda del molino. Pregúntale qué encontró.',
    ask: {
      options: ['Did you find something on the rope?', 'Did you found something on the rope?', 'Did you finded something on the rope?'],
      answer: 0,
      tip: 'Did + find (verbo simple). "Found" va sin did: I found it.',
    },
    reply: { text: 'Yes, I did! Look: the rope is broken... and there are little teeth marks on it!', es: '¡Sí! Mira: la cuerda está rota... ¡y tiene marcas de dientes pequeñitos!' },
    check: {
      q: 'So... who stopped the windmill?',
      options: ['The mice! They ate the rope.', "Hank. He didn't fix the fence.", 'Lucy. She saw the windmill.'],
      answer: 0,
      tip: 'Tom vio muchos ratones que comen cosas, y la cuerda tiene marcas de dientes pequeñitos...',
    },
  },
]

export function Mystery({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [stage, setStage] = useState<'ask' | 'check' | 'done'>('ask')
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const r = ROUNDS[i]
  const last = i === ROUNDS.length - 1
  const choice = stage === 'check' ? r.check : r.ask

  function pick(k: number) {
    if (k === choice.answer) {
      sfx('correct')
      setTip(null)
      setStage(stage === 'ask' ? 'check' : 'done')
    } else {
      sfx('wrong')
      setTip(choice.tip)
    }
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">El misterio del molino · {i + 1} de {ROUNDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">Anoche el molino se paró. ¿Quién fue? {r.intro}</p>

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
      {stage === 'check' && <p className="anim-fade-in mt-3 font-semibold text-gold">Bill: <span className="text-paper">{r.check.q}</span></p>}

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
          <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
            {last ? '¡Resuelto! Los ratones se comieron la cuerda del molino.' : `¡Bien! "${r.check.options[r.check.answer]}"`}
          </p>
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
            {last ? 'Contarle a Bill' : 'Siguiente sospechoso'}
          </button>
        </>
      )}
    </Panel>
  )
}
