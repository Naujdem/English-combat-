import { useEffect, useState } from 'react'
import { mixed } from '../game/mix'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { ALL_DIARY as DIARY, fillNames, LOCKED_HINT, lookup, normWord, pageSeen, TENSE_INFO, type DiaryChapter, type DiaryVersion, type Tense } from '../data/diary'
import { translate } from '../data/glossary'
import { newCard } from '../game/cards'
import { useTeacher } from '../game/teacher'
import { SpeakButton } from './SpeakButton'
import { StaticName } from './StaticText'
import { STATIC_NAME } from '../game/staticName'
import { btn, btnGhost, btnPrimary, Overlay, Panel } from './ui'

/**
 * Diario del capítulo: cada lugar en cuatro páginas (presente, 1996, 2056 y una mezcla de las tres épocas).
 * Se abre en la primera página nueva. Se puede tocar cualquier palabra para ver su traducción y guardarla en las fichas.
 */
export function Diary({ state, update, onClose }: { state: GameState; update: Update; onClose: () => void }) {
  const teacher = useTeacher().on
  const chapters = DIARY.filter((c) => state.opened.includes(c.unlock))
  // Solo se leen las páginas ya abiertas: el presente al terminar el lugar, y 1996 y 2056 al viajar (o en modo profesor)
  const visible = (c: DiaryChapter) => c.versions.filter((x) => !x.unlock || teacher || state.opened.includes(x.unlock))
  const isNew = (c: DiaryChapter, x: DiaryVersion) => (!x.unlock || state.opened.includes(x.unlock)) && !pageSeen(state.opened, c, x)
  // El diario se abre en la primera página nueva; si no hay, en el último capítulo
  const [start] = useState(() => {
    for (let k = 0; k < chapters.length; k++) {
      const j = visible(chapters[k]).findIndex((x) => isNew(chapters[k], x))
      if (j >= 0) return { ci: k, v: j }
    }
    return { ci: chapters.length - 1, v: 0 }
  })
  const [ci, setCi] = useState(start.ci)
  const chapter: DiaryChapter | undefined = chapters[ci]
  const [v, setV] = useState(start.v)
  const [showEs, setShowEs] = useState(false)
  const [verbs, setVerbs] = useState(false)
  const [word, setWord] = useState<{ raw: string; sentence: string } | null>(null)
  const [quiz, setQuiz] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [wordsView, setWordsView] = useState(false)
  const versions = chapter ? visible(chapter) : []
  const version: DiaryVersion | undefined = versions[Math.min(v, versions.length - 1)]

  // La página que se está leyendo deja de ser nueva
  const shownId = version?.id
  useEffect(() => {
    if (!shownId) return
    const id = `diary-seen-${shownId}`
    update((s) => (s.opened.includes(id) ? s : { ...s, opened: [...s.opened, id] }))
  }, [shownId, update])

  if (!chapter || !version) {
    return (
      <Overlay onClose={onClose}>
        <Panel>
          <p className="text-[16px]">Tu diario está vacío. Termina un capítulo para escribir en él.</p>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={onClose}>Cerrar</button>
        </Panel>
      </Overlay>
    )
  }

  const page: DiaryVersion = version
  const hidden = chapter.versions.filter((x) => !versions.includes(x))
  const name = state.hero.name
  const iname = state.interest.name
  const fill = (t: string) => fillNames(t, name, iname)
  const done = (id: string) => state.opened.includes(`diary-${id}`)
  const names = [name, iname]

  function pick(k: number) {
    if (quiz === null || solved) return
    const q = page.questions[quiz]
    if (k === q.answer) {
      setSolved(true)
      setTip(null)
    } else setTip(q.tip)
  }

  function nextQuestion() {
    setSolved(false)
    setTip(null)
    if (quiz! + 1 < page.questions.length) setQuiz(quiz! + 1)
    else {
      setQuiz(page.questions.length)
      update((s) => {
        const id = `diary-${page.id}`
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
                {c.versions.some((x) => isNew(c, x)) && <span className="ml-1 text-gold">•</span>}
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
              style={x.kind === 'L' ? { color: k === v ? L_INK : '#b9a6d6' } : x.tense !== 'mix' ? { color: k === v ? TENSE_INFO[x.tense].color : undefined } : undefined}
            >
              {done(x.id) ? '✓ ' : ''}{x.tab}
              {isNew(chapter, x) && <span className="block text-[10px] font-bold uppercase tracking-wide text-gold">Nueva</span>}
            </button>
          ))}
        </div>

        {chapter.words.length > 0 && (
          <button className={`${btn} py-2 text-sm`} onClick={() => setWordsView(true)}>
            Palabras del capítulo ({chapter.words.reduce((n, g) => n + g.words.length, 0)})
          </button>
        )}

        {hidden.length > 0 && (
          <p className="text-xs text-paper/55">
            Páginas que faltan en este capítulo: {hidden.map((x) => `${x.tab} (se abre ${LOCKED_HINT[x.tense]})`).join(' · ')}.
          </p>
        )}

        <p className="text-sm text-paper/70">{version.frame}</p>

        {version.kind === 'L' ? (
          <LPage title={fill(version.title)} lines={version.lines.map((l) => ({ en: fill(l.en), es: fill(l.es) }))} showEs={showEs} verbs={verbs} active={word?.raw} onWord={(raw, en) => setWord({ raw, sentence: plain(en) })} />
        ) : (
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
        )}

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

        {version.questions.length === 0 ? null : quiz === null ? (
          <button className={btnPrimary} onClick={() => setQuiz(0)}>Responder preguntas</button>
        ) : quiz < version.questions.length ? (
          <Panel>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Pregunta {quiz + 1} de {version.questions.length}</p>
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-[20px] leading-snug">{fill(version.questions[quiz].q)}</p>
              <SpeakButton text={fill(version.questions[quiz].q)} size="sm" />
            </div>
            <div className="mt-3 grid gap-2">
              {mixed(version.questions[quiz].options).map(([o, k]) => (
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
                ? `Sigue con la página ${versions[v + 1].tab}: mira cómo cambian los verbos y la historia de este lugar.`
                : hidden.length > 0
                ? 'Leíste todas las páginas abiertas de este capítulo. Las demás se abren cuando viajes en el tiempo.'
                : 'Leíste las cuatro páginas de este capítulo. ¡Muy bien!'}
            </p>
            <p className="mt-1 text-sm text-paper/65">La primera vez que completas cada página ganas un escudo de palabras (máximo 2).</p>
            {v < versions.length - 1 && (
              <button className={`${btnPrimary} mt-3 w-full`} onClick={() => switchVersion(v + 1)}>Leer la página {versions[v + 1].tab}</button>
            )}
          </Panel>
        )}
      </div>
    </div>
  )
}

/** Quita las marcas de verbos y de tachones: "[took]p" → "took", "~~x~~" → "" */
function plain(text: string) {
  return text.replace(/\[([^\]]+)\][pnf]/g, '$1').replace(/~~[^~]*~~/g, '')
}

/** Tinta del Diario de L */
const L_INK = '#3a2f5c'
const L_HAND = '"Segoe Print", "Bradley Hand", "Comic Sans MS", "Chalkboard SE", cursive'

/**
 * Página del Diario de L (B1): letra a mano, tachones decorativos y una firma que es solo una mancha de tinta.
 * Nunca aparece un nombre. ~~texto~~ se ve tachado (no se puede tocar).
 */
function LPage({ title, lines, showEs, verbs, active, onWord }: { title: string; lines: { en: string; es: string }[]; showEs: boolean; verbs: boolean; active?: string; onWord: (raw: string, en: string) => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-[#b9a98a] bg-[#efe6d2] px-5 py-4 shadow-inner" style={{ color: L_INK, fontFamily: L_HAND, backgroundImage: 'repeating-linear-gradient(transparent 0 30px, rgba(90,110,160,0.18) 30px 31px)' }}>
      {/* Tachones de adorno en el margen */}
      <svg className="pointer-events-none absolute right-3 top-3 h-10 w-16 opacity-60" viewBox="0 0 64 40" aria-hidden="true">
        <path d="M4 14 q6 -6 12 0 t12 0 t12 0 t12 0" fill="none" stroke={L_INK} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 24 L52 18 M8 30 L50 22" stroke={L_INK} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <p className="mb-2 pr-16 text-xl" style={{ transform: 'rotate(-1deg)' }}>{title}</p>
      {lines.map((l, k) => (
        <div key={k} className="py-1" style={{ transform: `rotate(${k % 2 ? 0.4 : -0.5}deg)` }}>
          <p className="text-[18px] leading-relaxed">
            {l.en.split(/(~~[^~]*~~)/).map((part, j) =>
              part.startsWith('~~') ? (
                <span key={j} className="mr-1 line-through decoration-2 opacity-70" style={{ textDecorationColor: L_INK }} aria-hidden="true">{part.slice(2, -2)}</span>
              ) : (
                <TapLine key={j} text={part} verbs={verbs} active={active} onWord={(raw) => onWord(raw, l.en)} />
              ),
            )}
          </p>
          {showEs && <p className="text-sm opacity-70" style={{ fontFamily: 'inherit' }}>{l.es}</p>}
        </div>
      ))}
      {/* Firma: una mancha de tinta, nunca un nombre */}
      <div className="mt-3 flex justify-end">
        <svg width="46" height="34" viewBox="0 0 46 34" role="img" aria-label="Firma: una mancha de tinta">
          <path d="M14 8 Q22 2 30 7 Q40 6 38 16 Q44 24 34 27 Q28 33 20 28 Q8 31 9 21 Q3 13 14 8 Z" fill={L_INK} opacity="0.85" />
          <circle cx="40" cy="8" r="2" fill={L_INK} opacity="0.7" />
          <circle cx="6" cy="27" r="1.4" fill={L_INK} opacity="0.6" />
        </svg>
      </div>
    </div>
  )
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
  // Solo el primer nombre con estática de la línea hace sonar la estática
  const firstStatic = parts.findIndex((p) => p.t.includes(STATIC_NAME))

  return (
    <>
      {parts.map((p, i) => {
        // El marcador [[?]] (nombre con estática) se separa como palabra aparte
        const tokens = p.t.split(/(\s+|\[\[\?\]\])/).filter((x) => x !== '')
        const style = verbs && p.tense ? { background: `${TENSE_INFO[p.tense].color}55`, boxShadow: `inset 0 -2px 0 ${TENSE_INFO[p.tense].color}` } : undefined
        return (
          <span key={i} style={style} className={style ? 'rounded px-0.5' : undefined}>
            {tokens.map((tok, j) =>
              tok === STATIC_NAME ? (
                <StaticName key={j} sound={i === firstStatic && j === tokens.indexOf(STATIC_NAME)} />
              ) : /\S/.test(tok) && /[A-Za-z]/.test(tok) ? (
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
