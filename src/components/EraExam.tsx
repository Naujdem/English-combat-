import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Overlay, Panel } from './ui'
import { sfx } from '../game/sfx'
import { normalizeAnswer } from '../game/text'
import { IRREGULAR_VERBS, MORE_IRREGULAR_PASTS } from '../data/irregular'

/**
 * Examen libre al final de cada época: el jugador escribe 4 frases propias sobre lo que pasó.
 * No hay una sola respuesta: se revisa que use la estructura pedida y se avisan los errores típicos.
 * Al final ve sus frases junto a un ejemplo de Leo y se guardan en su diario de escritura.
 */
export type EraId = 'presente' | 'pasado' | 'futuro'
type Task = { ask: string; help: string; need: RegExp; needMsg: string; model: string }

const IRR = IRREGULAR_VERBS.map((v) => v.past).concat(MORE_IRREGULAR_PASTS)

export const EXAMS: Record<EraId, { title: string; unlock: string; intro: string; tasks: Task[] }> = {
  presente: {
    title: 'Examen del presente',
    unlock: 'office-epilogue',
    intro: 'Escribe 4 frases tuyas sobre los cinco lugares del presente. No hay una sola respuesta correcta: usa lo que aprendiste.',
    tasks: [
      { ask: '¿Quién es Leo? Descríbelo con to be.', help: 'Leo is... · He is...', need: /\b(is|are|am)\b|'s\b|'re\b|'m\b/i, needMsg: 'Usa el verbo to be: is / are / am.', model: 'Leo is my best friend. He is very kind.' },
      { ask: '¿Qué hace alguien del barrio todos los días? (presente con -s)', help: 'Mrs. Garcia gets up... · Emma plays...', need: /\b(he|she|it|[a-z]+)\s+(always\s+|usually\s+|never\s+|often\s+)?(?!is\b|was\b|this\b|his\b|us\b)[a-z]+s\b/i, needMsg: 'Habla de otra persona (he / she / un nombre) y ponle -s al verbo: she plays, he works.', model: 'Mrs. Garcia gets up at six. She makes breakfast for everybody.' },
      { ask: '¿Qué puedes hacer tú ahora? (can)', help: 'I can...', need: /\bcan\b/i, needMsg: 'Usa can + verbo: I can speak...', model: 'I can speak English now!' },
      { ask: '¿A qué hora haces algo? (at + la hora)', help: 'I go to school at half past seven.', need: /\bat\s+(\w+\s)?(o'?clock|half|quarter|\d|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)/i, needMsg: 'Di la hora con at: at half past seven, at nine o\'clock...', model: 'I go to school at half past seven.' },
    ],
  },
  pasado: {
    title: 'Examen del pasado',
    unlock: 'office-past-epilogue',
    intro: 'Escribe 4 frases tuyas sobre lo que pasó en 1996. Cuenta la historia con tus palabras.',
    tasks: [
      { ask: '¿Cómo era la escuela en 1996? (was / were)', help: 'The school was... · The students were...', need: /\b(was|were)\b/i, needMsg: 'Usa was o were.', model: 'The school was small, and the walls were red.' },
      { ask: '¿Qué hizo Tony o Betty en la ciudad? (pasado con -ed)', help: 'Tony delivered... · Betty posted...', need: /\b\w+ed\b/i, needMsg: 'Usa un verbo regular en pasado, con -ed: walked, delivered, stopped...', model: 'Tony delivered bread, and he walked everywhere.' },
      { ask: 'Algo que pasó en Green Street (un verbo irregular)', help: 'Joe built... · Sam bought... · We saw...', need: new RegExp(`\\b(${IRR.join('|')})\\b`, 'i'), needMsg: 'Usa un verbo irregular en pasado: went, built, bought, saw, met...', model: 'Joe built the first house on Green Street.' },
      { ask: 'Hazle una pregunta a alguien de la granja (Did...?)', help: 'Did you see...?', need: /^\s*did\b.*\?\s*$/i, needMsg: 'Empieza con Did y termina con signo de pregunta: Did you see the windmill?', model: 'Did you see the stranger near the windmill?' },
    ],
  },
  futuro: {
    title: 'Examen del futuro',
    unlock: 'office-future-epilogue',
    intro: 'Escribe 4 frases tuyas sobre 2056 y sobre lo que viene. ¡Ya terminaste A1!',
    tasks: [
      { ask: '¿Qué va a hacer Leo? (going to)', help: 'Leo is going to...', need: /(\b(am|is|are)|'m|'s|'re)\s+(not\s+)?going to\s+\w+/i, needMsg: 'Usa am / is / are + going to + verbo.', model: 'Leo is going to be a great teacher.' },
      { ask: 'Ves nubes negras sobre la granja. ¿Qué va a pasar?', help: "It's going to...", need: /going to\s+\w+/i, needMsg: 'Haz una predicción con going to: It\'s going to...', model: "Look at the clouds! It's going to rain." },
      { ask: 'Algo que tú quieres hacer (want to / would like to)', help: 'I want to... · I would like to...', need: /(\b(want|wants|would like)|'d like)\s+to\s+\w+/i, needMsg: 'Usa want to o would like to + verbo.', model: 'I want to find the stranger, and I would like to visit 2056 again.' },
      { ask: '¿Qué le preguntarías al desconocido? (pregunta con going to)', help: 'Why are you going to...? · What are you going to...?', need: /\b(am|is|are)\b.*going to.*\?\s*$/i, needMsg: 'Haz una pregunta: (What / Why / Where) + are you going to...?', model: 'Why are you going to take my voice?' },
    ],
  },
}

const WRONG_PAST = new Map(IRREGULAR_VERBS.map((v) => [v.wrong, v.past]))

/** Errores típicos que se avisan con una pista corta (no se corrigen solos) */
export function commonErrors(raw: string): string[] {
  const t = ` ${normalizeAnswer(raw)} `
  const out: string[] = []
  for (const w of t.split(/\s+/)) if (WRONG_PAST.has(w)) out.push(`"${w}" no existe: el pasado es "${WRONG_PAST.get(w)}".`)
  if (/\bdid (not )?\w+ (\w+ed|went|saw|ate|came|bought|built|made|took|gave|told|had|got)\b/.test(t) || /\bdid (not )?(went|saw|ate|came|bought|built|made|took|gave|told|had|got)\b/.test(t))
    out.push('Con did / didn\'t, el verbo va simple: Did you see...? (no "saw").')
  if (/\b(he|she|it) (are|were)\b/.test(t)) out.push('Con he / she / it: is (presente) o was (pasado).')
  if (/\bi (is|are|were)\b/.test(t)) out.push('Con I: am (presente) o was (pasado).')
  const plural = /^(children|people|sheep|mice|geese|men|women|feet|teeth|police)$/
  const one = /^(bus|class|glass|boss|address|news)$/
  for (const m of t.matchAll(/\bthe (\w+) (were|was|are|is)\b/g)) {
    const [, noun, verb] = m
    const many = (noun.endsWith('s') && !one.test(noun)) || plural.test(noun)
    if (many && (verb === 'was' || verb === 'is')) out.push(`"The ${noun}" son varios: ${verb === 'was' ? 'were' : 'are'}.`)
    if (!many && (verb === 'were' || verb === 'are')) out.push(`"The ${noun}" es uno solo: ${verb === 'were' ? 'was' : 'is'}.`)
  }
  if (/\b(you|we|they) (is|was)\b/.test(t)) out.push('Con you / we / they: are (presente) o were (pasado).')
  if (/\b(am|is|are) go to\b/.test(t)) out.push('Es "going to": I am going to...')
  if (/\bgoing (be|go|visit|play|eat|see|find|take|make|have|study|help|buy|rain|fall|fly)\b/.test(t)) out.push('Falta "to": going to + verbo.')
  if (/\b(want|wants) (be|go|see|find|play|eat|have|help|visit|ask|say|fly|study)\b/.test(t)) out.push('Falta "to": want to + verbo.')
  if (/\bwould like (be|go|see|find|play|eat|have|help|visit|ask|say|fly|study)\b/.test(t)) out.push('Falta "to": would like to + verbo.')
  if (/\bcan to\b/.test(t) || /\bcans\b/.test(t)) out.push('Can va sin "to" y sin -s: I can swim, she can swim.')
  if (/\bgoing to \w+(ed|s)\b/.test(t) && !/\bgoing to (be|bus|has)\b/.test(t)) out.push('Después de going to, el verbo va simple: going to play (no "played" ni "plays").')
  return out
}

export function EraExam({ era, saved, onClose, onSave }: { era: EraId; saved?: string[]; onClose: () => void; onSave: (lines: string[]) => void }) {
  const exam = EXAMS[era]
  const [i, setI] = useState(saved?.length ?? 0)
  const [text, setText] = useState('')
  const [lines, setLines] = useState<string[]>(saved ?? [])
  const [notes, setNotes] = useState<string[] | null>(null)
  const [tries, setTries] = useState(0)
  const task = exam.tasks[i]
  const done = lines.length === exam.tasks.length

  function check() {
    const t = text.trim()
    if (t.split(/\s+/).length < 3) return setNotes(['Escribe una frase completa (por lo menos 3 palabras).'])
    const found = commonErrors(t)
    if (!task.need.test(t)) found.unshift(task.needMsg)
    if (found.length === 0) {
      sfx('correct')
      setLines([...lines, t])
      setText('')
      setNotes(null)
      setTries(0)
      setI(i + 1)
      return
    }
    sfx('wrong')
    setTries(tries + 1)
    setNotes(found)
  }

  function keep() {
    setLines([...lines, text.trim()])
    setText('')
    setNotes(null)
    setTries(0)
    setI(i + 1)
  }

  return (
    <Overlay>
      <Panel className="max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="font-display text-xl text-gold">{exam.title}</p>
          <button className={btnGhost} onClick={onClose}>{done ? 'Cerrar' : 'Después'}</button>
        </div>

        {!done && (
          <>
            <p className="mt-1 text-sm text-paper/70">{exam.intro}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-paper/55">Frase {i + 1} de {exam.tasks.length}</p>
            <p className="font-display text-[18px] leading-snug">{task.ask}</p>
            <p className="text-sm text-paper/55">Por ejemplo: {task.help}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                check()
              }}
            >
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  setNotes(null)
                }}
                rows={2}
                autoFocus
                autoCapitalize="sentences"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Escribe tu frase en inglés"
                className="mt-2 w-full resize-none rounded-xl border-2 border-line bg-ink px-3 py-2.5 font-display text-[18px] outline-none focus:border-gold"
                data-testid="exam-input"
              />
              {notes && (
                <ul className="anim-fade-in mt-2 grid gap-1 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">
                  {notes.map((n) => <li key={n}>• {n}</li>)}
                </ul>
              )}
              <button type="submit" className={`${btnPrimary} mt-3 w-full`}>Revisar</button>
              {tries >= 2 && notes && (
                <button type="button" className={`${btn} mt-2 w-full text-[15px]`} onClick={keep}>Dejarla así y seguir</button>
              )}
            </form>
            {lines.length > 0 && (
              <ul className="mt-3 grid gap-1 border-t border-line pt-2 text-sm text-paper/75">
                {lines.map((l, k) => <li key={k}>✓ {l}</li>)}
              </ul>
            )}
          </>
        )}

        {done && (
          <>
            <p className="mt-1 text-[15px] text-paper/85">¡Lo escribiste tú! Compara tus frases con las de Leo: no tienen que ser iguales.</p>
            <ul className="mt-3 grid gap-2">
              {exam.tasks.map((t, k) => (
                <li key={k} className="rounded-xl border-2 border-line px-3 py-2">
                  <p className="text-xs text-paper/55">{t.ask}</p>
                  <p className="font-display text-[17px] text-paper">Tú: {lines[k]}</p>
                  <div className="flex items-center gap-2">
                    <p className="flex-1 text-sm text-gold">Leo: {t.model}</p>
                    <SpeakButton text={t.model} size="sm" />
                  </div>
                </li>
              ))}
            </ul>
            {saved ? (
              <button className={`${btnPrimary} mt-3 w-full`} onClick={onClose} autoFocus>Cerrar</button>
            ) : (
              <button className={`${btnPrimary} mt-3 w-full`} onClick={() => onSave(lines)} autoFocus>Guardar mis frases</button>
            )}
          </>
        )}
      </Panel>
    </Overlay>
  )
}
