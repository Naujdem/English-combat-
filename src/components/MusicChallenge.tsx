import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { speak } from '../game/speech'

/** Un verso de la canción: la línea con "___" en el hueco, su traducción, las opciones (en el orden dado) y la pista */
export type MusicVerse = { line: string; es: string; options: string[]; answer: number; tip: string }
export type MusicContent = {
  title: string
  intro: { en: string; es: string }
  /** BPM: solo visual (los puntos del ritmo laten a este tempo; no hay temporizador) */
  tempo: number
  verses: MusicVerse[]
  finish?: { en: string; es: string; banner: string }
}

const fillGap = (v: MusicVerse) => v.line.replace('___', v.options[v.answer])

/**
 * Music Challenge (B1-10, bloque C): una canción perdió su letra. Verso a verso, el jugador elige la palabra del hueco.
 * El ritmo es solo visual: no castiga la velocidad ni quita vida. Acierto: el hueco se llena, se lee el verso y pasa a la
 * hoja de la canción. Error: el botón se sacude y sale la pista (se puede intentar otra vez; cuenta para perfect).
 * Al final: la letra completa con su traducción y Seguir → onClose(true, perfect) (perfect = 0 o 1 errores).
 */
export function MusicChallenge({ title, intro, tempo, verses, finish, onClose }: MusicContent & { onClose: (done: boolean, perfect: boolean) => void }) {
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState<number[]>([])
  const [shake, setShake] = useState<number | null>(null)
  const [right, setRight] = useState(false)
  const [errors, setErrors] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [over, setOver] = useState(false)
  const v = verses[i]
  const beat = 60 / Math.max(tempo, 1)
  const end = finish ?? { en: 'The song is complete!', es: '¡La canción está completa!', banner: '¡Canción completa!' }

  function pick(k: number) {
    if (right) return
    if (k === v.answer) {
      sfx('correct')
      setRight(true)
      speak(fillGap(v))
    } else {
      sfx('wrong')
      setErrors((e) => e + 1)
      setWrong((w) => (w.includes(k) ? w : [...w, k]))
      setShake(k)
      window.setTimeout(() => setShake(null), 420)
    }
  }

  function next() {
    if (i === verses.length - 1) return setOver(true)
    setI(i + 1)
    setWrong([])
    setRight(false)
    setShowEs(false)
  }

  const sheet = verses.slice(0, over ? verses.length : right ? i + 1 : i)

  return (
    <Panel>
      <style>{'@keyframes music-beat { 0%,100% { transform: scale(0.7); opacity: .35 } 12% { transform: scale(1.15); opacity: 1 } 40% { transform: scale(0.8); opacity: .5 } }'}</style>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">{title}</p>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>
      <div className="mt-1 flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2, 3].map((d) => (
          <span
            key={d}
            className="inline-block h-2.5 w-2.5 rounded-full bg-gold"
            style={{ animation: `music-beat ${beat * 4}s ease-out infinite`, animationDelay: `${beat * d}s` }}
          />
        ))}
        <span className="text-xs text-paper/55">{tempo} BPM · sin prisa</span>
      </div>

      {over ? (
        <div className="anim-fade-in mt-3">
          <p className="font-display text-xl text-gold">{end.banner}</p>
          <ol className="mt-2 space-y-1.5 rounded-xl bg-panel-2 px-3 py-2">
            {verses.map((x, k) => (
              <li key={k}>
                <p className="text-[15px] text-paper">{fillGap(x)}</p>
                <p className="text-xs text-paper/60">{x.es}</p>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex items-start gap-2">
            <div className="flex-1">
              <p className="text-[15px] text-paper">{end.en}</p>
              <p className="text-xs text-paper/60">{end.es}</p>
            </div>
            <SpeakButton text={end.en} size="sm" auto />
          </div>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true, errors <= 1)} autoFocus>Seguir</button>
        </div>
      ) : (
        <>
          {i === 0 && !right && wrong.length === 0 && (
            <div className="mt-2">
              <p className="text-sm text-paper/85">{intro.en}</p>
              <p className="text-xs text-paper/55">{intro.es}</p>
            </div>
          )}
          <p className="mt-3 text-xs text-paper/55">Verso {i + 1} de {verses.length}</p>
          <div className="mt-1 flex items-start gap-2 rounded-xl bg-panel-2 px-3 py-3">
            <div className="flex-1">
              <p className="text-lg leading-snug text-paper">
                {v.line.split('___').map((part, k, arr) => (
                  <span key={k}>
                    {part}
                    {k < arr.length - 1 && (
                      <span className={`mx-0.5 rounded px-1.5 font-bold ${right ? 'bg-hp/20 text-hp' : 'bg-gold/20 text-gold'}`}>{right ? v.options[v.answer] : '___'}</span>
                    )}
                  </span>
                ))}
              </p>
              <button className="mt-1 text-xs text-paper/55 underline" onClick={() => setShowEs((s) => !s)}>
                {showEs ? 'Ocultar traducción' : 'Ver traducción'}
              </button>
              {showEs && <p className="text-xs text-paper/60">{v.es}</p>}
            </div>
            <SpeakButton key={i} text={right ? fillGap(v) : v.line.replace('___', '...')} size="sm" />
          </div>

          <div className="mt-3 grid gap-2">
            {v.options.map((o, k) => {
              const isRight = right && k === v.answer
              const isWrong = wrong.includes(k) && !isRight
              return (
                <button
                  key={k}
                  className={`rounded-xl border-2 px-3 py-3 text-left text-[16px] text-paper ${shake === k ? 'anim-shake' : ''} ${isRight ? 'border-hp bg-hp/15' : isWrong ? 'border-danger/60 bg-danger/10' : 'border-line'}`}
                  onClick={() => pick(k)}
                  disabled={right}
                >
                  {o}
                </button>
              )
            })}
          </div>

          {wrong.length > 0 && !right && (
            <p className="anim-fade-in mt-3 text-sm text-paper/80">
              Pista: <span className="text-paper/70">{v.tip}</span>
            </p>
          )}
          {right && (
            <button className={`${btnPrimary} anim-fade-in mt-3 w-full`} onClick={next} autoFocus>
              {i === verses.length - 1 ? 'Ver la canción' : 'Siguiente verso'}
            </button>
          )}

          {sheet.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-paper/55">Hoja de la canción</p>
              <ol className="mt-1 space-y-0.5 text-sm text-paper/80">
                {sheet.map((x, k) => (
                  <li key={k}>♪ {fillGap(x)}</li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </Panel>
  )
}
