import { useRef, useState } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import { canRecognize, hear, micErrorText } from '../game/mic'
import { commandText, maskedCommand, matchCommand, PRONOUN_HINT, type TextStep } from '../game/command'
import { objectNames, StoneSceneArt, STONE_OBJECTS, type StoneScene } from './StoneObjects'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/** Una sala de The Moving Stone escrito (lo que se declara en una tarea como command: { mode: 'text', … }) */
export type TextCommandRoom = {
  mode: 'text'
  title: string
  intro: { en: string; es: string }
  scene: StoneScene
  /** ids del registro de objetos (components/StoneObjects.tsx) que hay en la sala */
  objects: string[]
  steps: TextStep[]
  finish?: { en: string; es: string; banner: string }
}

type React_ = { en: string; es: string; ok: boolean; said: string; note?: boolean }

/**
 * The Moving Stone escrito (B1): el jugador ESCRIBE la orden ("Lift up the lid") y el objeto reacciona.
 * Ayudas sin quitar vida: 1.er error, solo la reacción · 2.º, la pista en español · 3.º, la orden con letras ocultas
 * y los objetos resaltados. "Did you mean…?" y las órdenes mal formadas no cuentan como error; una palabra
 * desconocida tampoco la primera vez en cada paso. Al terminar: onClose(true, perfect), perfect = 0 o 1 errores
 * en total (usar el botón Palabras cuenta como uno).
 */
export function TextCommand({ name, look, room, onClose }: { name: string; look?: SpriteLook; room: TextCommandRoom; onClose: (done: boolean, perfect: boolean) => void }) {
  const { title, intro, scene, objects, steps } = room
  const names = objectNames(objects)
  const [i, setI] = useState(0)
  const [input, setInput] = useState('')
  const [misses, setMisses] = useState(0)
  const [total, setTotal] = useState(0)
  const [unknownUsed, setUnknownUsed] = useState(false)
  // Después de un "Did you mean…?", el intento siguiente se revisa sin volver a avisar
  const [typoShown, setTypoShown] = useState(false)
  const [react, setReact] = useState<React_ | null>(null)
  const [wrong, setWrong] = useState<{ id: string; n: number } | null>(null)
  const [solved, setSolved] = useState<string[]>([])
  const [showEs, setShowEs] = useState(false)
  const [words, setWords] = useState(false)
  const [wordsUsed, setWordsUsed] = useState(false)
  const [listening, setListening] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)
  const field = useRef<HTMLInputElement>(null)
  const done = i >= steps.length
  const step = steps[Math.min(i, steps.length - 1)]
  const end = room.finish ?? { en: 'Everything works now!', es: '¡Ya funciona todo!', banner: '¡Sala resuelta!' }
  const line = done ? end : i === 0 && !react ? { en: `${intro.en} ${step.problem.en}`, es: `${intro.es} ${step.problem.es}` } : step.problem

  function miss(reaction: { en: string; es: string }, said: string, obj?: string) {
    sfx('wrong')
    setMisses((m) => m + 1)
    setTotal((t) => t + 1)
    setReact({ ...reaction, ok: false, said })
    if (obj) setWrong({ id: obj, n: Date.now() })
  }

  function send() {
    if (done) return
    const said = commandText(input)
    if (!said) return field.current?.focus()
    const r = matchCommand(input, step, names, { allowTypo: !typoShown })
    setTypoShown(false)
    setWrong(null)
    if (r.ok) {
      sfx('correct')
      setSolved((s) => [...s, step.target])
      setReact({ ...step.done, ok: true, said })
      setMisses(0)
      setUnknownUsed(false)
      setInput('')
      setI(i + 1)
      return
    }
    switch (r.kind) {
      case 'typo':
        // No cuenta como error: avisa una vez y el siguiente intento se revisa normal
        setTypoShown(true)
        setReact({ en: `Did you mean "${r.suggestion}"?`, es: `¿Quisiste decir "${r.suggestion}"? Corrígelo y envía otra vez.`, ok: false, said, note: true })
        return
      case 'malformed':
        setReact({ en: 'That is not an order. Start with a verb.', es: 'Eso no es una orden. Empieza con un verbo: Push…, Open…, Turn on…', ok: false, said, note: true })
        return
      case 'unknown':
        if (!unknownUsed) {
          setUnknownUsed(true)
          setReact({ en: "I don't know that word here.", es: 'Esa palabra no sirve aquí. Prueba con otro verbo.', ok: false, said, note: true })
          return
        }
        return miss({ en: "I don't know that word here.", es: 'Esa palabra no sirve aquí. Prueba con otro verbo.' }, said, step.target)
      case 'pronoun':
        return miss({ en: `Almost! ${r.verb[0].toUpperCase() + r.verb.slice(1)} it ${r.particle}.`, es: PRONOUN_HINT }, said, step.target)
      case 'wrongVerb':
        return miss(step.fails?.[r.verb] ?? { en: 'Nothing happens.', es: 'No pasa nada.' }, said, step.target)
      case 'wrongObject':
        return miss({ en: 'Nothing happens. Look again.', es: 'No pasa nada. Mira otra vez el problema.' }, said, r.object)
      case 'incomplete':
        return miss({ en: 'Almost… something is missing.', es: 'Casi… falta o sobra algo (la partícula, el complemento…).' }, said, step.target)
    }
  }

  async function talk() {
    if (listening) return
    setMicError(null)
    setListening(true)
    const res = await hear().promise
    setListening(false)
    if (!res.ok) return setMicError(micErrorText(res.error))
    // Rellena el campo con lo reconocido; no lo envía solo
    setInput(res.heard[0] ?? '')
    field.current?.focus()
  }

  const third = !done && misses >= 3
  const verbsInRoom = [...new Set(steps.flatMap((s) => [...s.accept.map((a) => (a.particle ? `${a.verb} ${a.particle}` : a.verb)), ...(s.verbPool ?? [])]))].sort()

  return (
    <Panel className="max-h-[90vh] overflow-y-auto">
      <div className="flex items-center gap-3">
        {look && <SpriteIcon look={look} size={48} />}
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">The Moving Stone · {title}</p>
        </div>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-sm text-paper/80">{Math.min(i, steps.length)} / {steps.length}</span>
        <SpeakButton text={line.en} size="sm" auto voice={look ? voiceOf(look) : 'neutral'} />
      </div>
      <p key={line.en} className="anim-fade-in mt-2 text-[17px] leading-relaxed"><Tappable text={line.en} /></p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      <StoneSceneArt scene={scene} objects={objects} solved={solved} wrong={wrong} highlight={third} />

      {react && (
        <div key={`${i}-${total}-${react.en}`} className={`anim-fade-in mt-2 rounded-lg px-3 py-2 text-sm ${react.ok ? 'bg-hp/15 text-hp' : react.note ? 'bg-gold/10 text-gold' : 'bg-danger/15 text-[#f3b0b0]'}`}>
          <p className="flex items-center gap-2 font-semibold">
            <span>Tu orden: “{react.said}”</span>
            {react.ok && <SpeakButton text={react.said} size="sm" auto />}
          </p>
          <p className="mt-1"><Tappable text={react.en} /></p>
          {(showEs || react.note || !react.ok) && <p className="mt-0.5 text-paper/65">{react.es}</p>}
        </div>
      )}
      {!done && misses >= 2 && <p className="anim-fade-in mt-2 rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold">Pista: {step.tip}</p>}
      {third && (
        <p className="anim-fade-in mt-2 rounded-lg bg-[#2a3140] px-3 py-2 text-sm text-paper/85">
          La orden es así: <span className="font-display text-[16px] tracking-wide text-[#f6e7b4]">{maskedCommand(step.accept[0], names)}</span>
        </p>
      )}

      {!done && (
        <>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="send"
              placeholder="Escribe la orden en inglés…"
              aria-label="Tu orden en inglés"
              className="min-w-0 flex-1 rounded-xl border-2 border-line bg-ink px-3 py-3 text-[18px] text-paper outline-none focus:border-gold"
            />
            {canRecognize && (
              <button type="button" className={`${btn} px-3 ${listening ? 'border-gold text-gold' : ''}`} onClick={talk} aria-label="Decir la orden con el micrófono">
                🎤
              </button>
            )}
            <button type="submit" className={btnPrimary} disabled={!input.trim()}>Enviar</button>
          </form>
          {micError && <p className="mt-1 text-xs text-[#f3b0b0]">{micError}</p>}
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-xs text-paper/50">Verbo + objeto: Push the stone · Turn on the light · Open the door with the key</p>
            <button
              type="button"
              className="shrink-0 rounded-md border border-line px-2 py-0.5 text-xs font-semibold text-paper/75"
              onClick={() => {
                setWords((v) => !v)
                setWordsUsed(true)
              }}
            >
              {words ? 'Ocultar palabras' : 'Palabras'}
            </button>
          </div>
          {words && (
            <div className="anim-fade-in mt-2 grid grid-cols-2 gap-2 rounded-lg border border-line p-2 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-paper/50">Verbos</p>
                <ul className="mt-0.5 flex flex-wrap gap-1">
                  {verbsInRoom.map((v) => <li key={v} className="rounded bg-paper/10 px-1.5">{v}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-paper/50">Objetos</p>
                <ul className="mt-0.5 grid gap-0.5">
                  {objects.map((o) => (
                    <li key={o}>{STONE_OBJECTS[o]?.names[0] ?? o} <span className="text-paper/45">· {STONE_OBJECTS[o]?.es}</span></li>
                  ))}
                </ul>
              </div>
              <p className="col-span-2 text-[11px] text-paper/45">Usar la lista cuenta como una ayuda.</p>
            </div>
          )}
        </>
      )}
      {done && (
        <p className="anim-fade-in mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
          {end.banner} Escribiste todas las órdenes{total + (wordsUsed ? 1 : 0) <= 1 ? ' casi sin errores: ganas un escudo.' : '.'}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true, total + (wordsUsed ? 1 : 0) <= 1)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}
