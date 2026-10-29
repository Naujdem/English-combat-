import { useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { DIARY, fillNames, lookup, normWord, TENSE_INFO, type DiaryChapter, type Tense } from '../data/diary'
import { translate } from '../data/glossary'
import { newCard } from '../game/cards'
import { useTeacher } from '../game/teacher'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Overlay, Panel } from './ui'

/**
 * Diario del capítulo. La misma historia en pasado, presente y futuro, y una mezcla.
 * Se puede tocar cualquier palabra para ver su traducción y guardarla en las fichas.
 */
export function Diary({ state, update, onClose }: { state: GameState; update: Update; onClose: () => void }) {
  const chapters = DIARY.filter((c) => state.opened.includes(c.unlock))
  const [ci, setCi] = useState(chapters.length - 1)
  const chapter: DiaryChapter | undefined = chapters[ci]
  const [v, setV] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [verbs, setVerbs] = useState(false)
  const [word, setWord] = useState<{ raw: string; sentence: string } | null>(null)
  const [quiz, setQuiz] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [wordsView, setWordsView] = useState(false)
  const teacher = useTeacher().on

  if (!chapter) {
    return (
      <Overlay onClose={onClose}>
        <Panel>
          <p className="text-[16px]">Tu diario está vacío. Termina un capítulo para escribir en él.</p>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={onClose}>Cerrar</button>
        </Panel>
      </Overlay>
    )
  }

  // Solo se leen los tiempos que ya se estudiaron: en A1 primero el presente;
  // pasado y futuro se abren al viajar en el tiempo (o en modo profesor)
  const versions = chapter.versions.filter((x) => !x.unlock || teacher || state.opened.includes(x.unlock))
  const hidden = chapter.versions.length - versions.length
  const version = versions[Math.min(v, versions.length - 1)]
  const name = state.hero.name
  const iname = state.interest.name
  const fill = (t: string) => fillNames(t, name, iname)
  const done = (id: string) => state.opened.includes(`diary-${id}`)
  const names = [name, iname]

  function pick(k: number) {
    if (quiz === null || solved) return
    const q = version.questions[quiz]
    if (k === q.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(q.tip)
  }

  function nextQuestion() {
    setSolved(false)
    setTip(null)
    if (quiz! + 1 < version.questions.length) setQuiz(quiz! + 1)
    else {
      setQuiz(version.questions.length)
      update((s) => {
        const id = `diary-${version.id}`
        if (s.opened.includes(id)) return s
        // La primera vez que se completa cada versión, un escudo de palabras
        return { ...s, opened: [...s.opened, id], items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }
      })
    }
  }

  function switchVersion(k: number) {
    setV(k)
    setQuiz(null)
    setSolved(false)
    setTip(null)
    setWord(null)
    if (versions[k].tense === 'mix') setVerbs(true)
  }

  const meaning = word ? lookup(word.raw, names) ?? translate(word.raw) : null
  const isName = word ? names.some((n) => n.toLowerCase() === normWord(word.raw)) || /\(nombre\)$/.test(meaning ?? '') : false
  const saved = word ? state.cards.some((c) => c.id === normWord(word.raw)) : false

  function save() {
    if (!word || !meaning) return
    const front = normWord(word.raw)
    update((s) => (s.cards.some((c) => c.id === front) ? s : { ...s, cards: [...s.cards, newCard(front, meaning, word.sentence)] }))
  }

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      {wordsView && (
        <div className="absolute inset-0 z-10 overflow-y-auto bg-ink">
          <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">Palabras del capítulo</p>
                <p className="font-display text-lg">{chapter.title}</p>
              </div>
              <button className={btnGhost} onClick={() => setWordsView(false)}>Volver</button>
            </div>
            <p className="text-sm text-paper/65">Todo el vocabulario que viste en este lugar. Escúchalo y guarda en tus fichas las palabras que quieras repasar.</p>
            <button
              className={btn}
              onClick={() =>
                update((s) => {
                  const have = new Set(s.cards.map((c) => c.id))
                  const add = chapter.words.flatMap((g) => g.words).filter(([en]) => !have.has(en.toLowerCase())).map(([en, es]) => newCard(en, es))
                  return { ...s, cards: [...s.cards, ...add] }
                })
              }
            >
              Guardar todas en fichas
            </button>
            {chapter.words.map((g) => (
              <Panel key={g.title}>
                <p className="font-display text-lg text-gold">{g.title}</p>
                <ul className="mt-1 grid gap-1">
                  {g.words.map(([en, es]) => {
                    const saved = state.cards.some((c) => c.id === en.toLowerCase())
                    return (
                      <li key={en} className="flex items-center gap-2 border-b border-line/50 py-1 last:border-0">
                        <SpeakButton text={en} size="sm" />
                        <span className="flex-1">
                          <span className="font-display text-[17px]">{en}</span>
                          <span className="text-sm text-paper/60"> · {es}</span>
                        </span>
                        <button
                          className={`rounded-lg border px-2 py-1 text-xs font-semibold ${saved ? 'border-hp/50 text-hp' : 'border-line text-paper/80'}`}
                          disabled={saved}
                          onClick={() => update((s) => (s.cards.some((c) => c.id === en.toLowerCase()) ? s : { ...s, cards: [...s.cards, newCard(en, es)] }))}
                        >
                          {saved ? '✓ Guardada' : 'Guardar'}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Panel>
            ))}
          </div>
        </div>
      )}
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Mi diario</p>
            <p className="font-display text-lg">{chapter.title}</p>
          </div>
          <button className={btnGhost} onClick={onClose}>Cerrar</button>
        </div>

        {chapters.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {chapters.map((c, k) => (
              <button
                key={c.id}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${k === ci ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/70'}`}
                onClick={() => {
                  setCi(k)
                  setV(0)
                  setQuiz(null)
                  setSolved(false)
                  setTip(null)
                  setWord(null)
                }}
              >
                {c.title.split(':')[0]}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${versions.length}, minmax(0, 1fr))` }} role="tablist">
          {versions.map((x, k) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={k === v}
              onClick={() => switchVersion(k)}
              className={`rounded-xl border-2 px-1 py-2 text-sm font-semibold ${k === v ? 'border-gold bg-gold/10 text-gold' : 'border-line text-paper/75'}`}
              style={x.tense !== 'mix' ? { color: k === v ? TENSE_INFO[x.tense].color : undefined } : undefined}
            >
              {done(x.id) ? '✓ ' : ''}{x.tab}
            </button>
          ))}
        </div>

        <button className={`${btn} py-2 text-sm`} onClick={() => setWordsView(true)}>
          Palabras del capítulo ({chapter.words.reduce((n, g) => n + g.words.length, 0)})
        </button>

        {hidden > 0 && <p className="text-xs text-paper/55">Esta historia también se puede leer en pasado y en futuro. Esas versiones se abrirán cuando viajes en el tiempo con el reloj.</p>}

        <p className="text-sm text-paper/70">{version.frame}</p>

        <div className="rounded-2xl border-2 border-[#c9b48f] bg-[#f6efdf] px-4 py-3 text-[#2b241c] shadow-inner">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display text-xl italic">{fill(version.title)}</p>
            <SpeakButton text={version.lines.map((l) => plain(fill(l.en))).join(' ')} size="sm" label="Escuchar todo" />
          </div>
          {version.lines.map((l, k) => {
            const en = fill(l.en)
            return (
              <div key={`${version.id}-${k}`} className="border-b border-[#d9cbb0] py-1.5 last:border-0">
                <p className="text-[17px] leading-relaxed">
                  <TapLine text={en} verbs={verbs} onWord={(raw) => setWord({ raw, sentence: plain(en) })} active={word?.raw} />
                </p>
                {showEs && <p className="text-sm text-[#6b5d48]">{fill(l.es)}</p>}
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className={`${btn} px-3 py-2 text-sm`} onClick={() => setShowEs((x) => !x)}>{showEs ? 'Ocultar traducción' : 'Traducir'}</button>
          <button className={`${btn} px-3 py-2 text-sm ${verbs ? 'border-gold' : ''}`} onClick={() => setVerbs((x) => !x)}>
            {verbs ? 'Ocultar verbos' : 'Ver verbos'}
          </button>
        </div>
        {verbs && (
          <div className="flex flex-wrap gap-3 text-xs">
            {(Object.keys(TENSE_INFO) as Tense[]).map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="h-2.5 w-5 rounded" style={{ background: TENSE_INFO[t].color }} />
                {TENSE_INFO[t].name}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-paper/55">Toca cualquier palabra para ver qué significa y guardarla en tus fichas.</p>

        {word && (
          <Panel className="anim-fade-in border-gold/60">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-2xl">{normWord(word.raw)}</p>
              <SpeakButton text={normWord(word.raw)} size="sm" />
            </div>
            <p className="text-[16px] text-paper/85">{meaning ?? 'Esta palabra no está en el diccionario del juego.'}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button className={btnGhost} onClick={() => setWord(null)}>Cerrar</button>
              {meaning && !isName && (
                <button className={saved ? `${btn} text-hp` : btnPrimary} onClick={save} disabled={saved}>
                  {saved ? '✓ En tus fichas' : 'Guardar en fichas'}
                </button>
              )}
            </div>
          </Panel>
        )}

        {quiz === null ? (
          <button className={btnPrimary} onClick={() => setQuiz(0)}>Responder preguntas</button>
        ) : quiz < version.questions.length ? (
          <Panel>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Pregunta {quiz + 1} de {version.questions.length}</p>
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-[20px] leading-snug">{fill(version.questions[quiz].q)}</p>
              <SpeakButton text={fill(version.questions[quiz].q)} size="sm" />
            </div>
            <div className="mt-3 grid gap-2">
              {version.questions[quiz].options.map((o, k) => (
                <button
                  key={k}
                  className={`${btn} text-left text-base ${solved && k === version.questions[quiz].answer ? 'border-hp bg-hp/15' : ''}`}
                  onClick={() => pick(k)}
                  disabled={solved}
                >
                  {fill(o)}
                </button>
              ))}
            </div>
            {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
            {solved && (
              <button className={`${btnPrimary} mt-3 w-full`} onClick={nextQuestion} autoFocus>
                {quiz + 1 < version.questions.length ? 'Siguiente' : 'Terminar'}
              </button>
            )}
          </Panel>
        ) : (
          <Panel className="anim-pop border-gold">
            <p className="font-display text-xl text-gold">¡Lectura completa!</p>
            <p className="mt-1 text-[15px]">
              {v < versions.length - 1
                ? `Ahora lee la misma historia en ${versions[v + 1].tab.toLowerCase()} y compara cómo cambian los verbos.`
                : 'Leíste la historia en todos los tiempos. ¡Muy bien!'}
            </p>
            <p className="mt-1 text-sm text-paper/65">La primera vez que completas cada versión ganas un escudo de palabras (máximo 2).</p>
            {v < versions.length - 1 && (
              <button className={`${btnPrimary} mt-3 w-full`} onClick={() => switchVersion(v + 1)}>Leer en {versions[v + 1].tab.toLowerCase()}</button>
            )}
          </Panel>
        )}
      </div>
    </div>
  )
}

/** Quita las marcas de verbos: "[took]p" → "took" */
function plain(text: string) {
  return text.replace(/\[([^\]]+)\][pnf]/g, '$1')
}

/** Una línea con palabras que se pueden tocar y verbos coloreados por tiempo */
function TapLine({ text, verbs, onWord, active }: { text: string; verbs: boolean; onWord: (raw: string) => void; active?: string }) {
  const parts: { t: string; tense?: Tense }[] = []
  let last = 0
  for (const m of text.matchAll(/\[([^\]]+)\]([pnf])/g)) {
    if (m.index! > last) parts.push({ t: text.slice(last, m.index) })
    parts.push({ t: m[1], tense: m[2] as Tense })
    last = m.index! + m[0].length
  }
  if (last < text.length) parts.push({ t: text.slice(last) })

  return (
    <>
      {parts.map((p, i) => {
        const tokens = p.t.split(/(\s+)/)
        const style = verbs && p.tense ? { background: `${TENSE_INFO[p.tense].color}55`, boxShadow: `inset 0 -2px 0 ${TENSE_INFO[p.tense].color}` } : undefined
        return (
          <span key={i} style={style} className={style ? 'rounded px-0.5' : undefined}>
            {tokens.map((tok, j) =>
              /\S/.test(tok) && /[A-Za-z]/.test(tok) ? (
                <span
                  key={j}
                  role="button"
                  tabIndex={0}
                  onClick={() => onWord(tok)}
                  onKeyDown={(e) => e.key === 'Enter' && onWord(tok)}
                  className={`cursor-pointer rounded hover:bg-[#e8d9b8] ${active === tok ? 'outline outline-2 outline-[#2b241c]/70' : ''}`}
                >
                  {tok}
                </span>
              ) : (
                <span key={j}>{tok}</span>
              ),
            )}
          </span>
        )
      })}
    </>
  )
}
