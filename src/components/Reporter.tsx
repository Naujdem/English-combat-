import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { speak } from '../game/speech'

/**
 * Una ronda: la frase directa del recuerdo (quote) y quién la dijo (speaker), el inicio ya escrito de la frase indirecta (start),
 * las fichas de la respuesta en orden (answer), fichas que sobran (extra), la pista y la reacción de un amigo.
 */
export type ReporterRound = {
  speaker: { en: string; es: string }
  quote: string
  quoteEs: string
  start: string
  answer: string[]
  extra: string[]
  es: string
  tip: string
  reaction: { who: 'leo' | 'maya' | 'special'; en: string; es: string }
}
export type ReporterContent = {
  title: string
  intro: { en: string; es: string }
  rounds: ReporterRound[]
  finish: { en: string; es: string; banner: string }
}

export const reporterSentence = (r: ReporterRound) => `${r.start} ${r.answer.join(' ')}.`

/** Fichas de la ronda (respuesta + sobrantes) en desorden; nunca salen ya en el orden correcto */
function shuffled(r: ReporterRound): string[] {
  const all = [...r.answer, ...r.extra]
  for (let n = 0; n < 8; n++) {
    for (let k = all.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[all[k], all[j]] = [all[j], all[k]]
    }
    if (all.slice(0, r.answer.length).join(' ') !== r.answer.join(' ')) break
  }
  return all
}

/** Errores en una ronda a partir de los cuales la frase se arma sola (la ronda ya no cuenta como perfecta) */
const MAX_TRIES = 3

/**
 * Reporter (B1-14, bloque B): el protagonista les cuenta a sus amigos lo que se dijo en los recuerdos. Cada ronda muestra la
 * frase directa; el jugador arma la frase en estilo indirecto tocando las fichas (hay fichas que sobran) y toca Comprobar.
 * Acierto: se lee la frase y un amigo reacciona. Error: sale la pista; al tercer error la frase se arma sola.
 * Sin colores en las fichas ni temporizador. Al final: Seguir → onClose(true, perfect) (perfect = 0 o 1 errores).
 */
export function Reporter({ title, intro, rounds, finish, names, onClose }: ReporterContent & { names: Record<'leo' | 'maya' | 'special', string>; onClose: (done: boolean, perfect: boolean) => void }) {
  const [i, setI] = useState(0)
  const r = rounds[i]
  const tiles = useMemo(() => shuffled(r), [r])
  /** Índices (en tiles) de las fichas puestas, en orden */
  const [built, setBuilt] = useState<number[]>([])
  const [tries, setTries] = useState(0)
  const [errors, setErrors] = useState(0)
  const [shake, setShake] = useState(false)
  const [right, setRight] = useState(false)
  const [showEs, setShowEs] = useState(false)
  const [over, setOver] = useState(false)

  function solve() {
    sfx('correct')
    setRight(true)
    speak(reporterSentence(r))
  }

  function check() {
    if (built.map((k) => tiles[k]).join(' ') === r.answer.join(' ')) return solve()
    sfx('wrong')
    setErrors((e) => e + 1)
    setShake(true)
    window.setTimeout(() => setShake(false), 420)
    if (tries + 1 >= MAX_TRIES) {
      // Se arma sola: se toman las fichas correctas en orden (cada índice una sola vez)
      const used: number[] = []
      for (const w of r.answer) used.push(tiles.findIndex((t, k) => t === w && !used.includes(k)))
      setBuilt(used)
      window.setTimeout(solve, 500)
    }
    setTries(tries + 1)
  }

  function next() {
    if (i === rounds.length - 1) return setOver(true)
    setI(i + 1)
    setBuilt([])
    setTries(0)
    setRight(false)
    setShowEs(false)
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">{title}</p>
        <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
      </div>

      {over ? (
        <div className="anim-fade-in mt-3">
          <p className="font-display text-xl text-gold">{finish.banner}</p>
          <ol className="mt-2 space-y-1.5 rounded-xl bg-panel-2 px-3 py-2">
            {rounds.map((x, k) => (
              <li key={k}>
                <p className="text-[15px] text-paper">{reporterSentence(x)}</p>
                <p className="text-xs text-paper/60">{x.es}</p>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex items-start gap-2">
            <div className="flex-1">
              <p className="text-[15px] text-paper">{finish.en}</p>
              <p className="text-xs text-paper/60">{finish.es}</p>
            </div>
            <SpeakButton text={finish.en} size="sm" auto />
          </div>
          <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true, errors <= 1)} autoFocus>Seguir</button>
        </div>
      ) : (
        <>
          <p className="mt-1 text-sm text-paper/75">Frase {i + 1} de {rounds.length}</p>
          {i === 0 && !right && tries === 0 && (
            <div className="mt-2">
              <p className="text-sm text-paper/85">{intro.en}</p>
              <p className="text-xs text-paper/55">{intro.es}</p>
            </div>
          )}

          {/* La frase del recuerdo (tono morado, como los recuerdos) */}
          <div className="mt-2 flex items-start gap-2 rounded-xl border border-[#9b6ad6]/50 bg-[#2a2040] px-3 py-3">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-[#c9a9f0]">En el recuerdo · {r.speaker.es}</p>
              <p className="mt-0.5 text-lg leading-snug text-paper">
                {r.speaker.en}: “{r.quote}”
              </p>
              <button className="mt-1 text-xs text-paper/55 underline" onClick={() => setShowEs((s) => !s)}>
                {showEs ? 'Ocultar traducción' : 'Ver traducción'}
              </button>
              {showEs && <p className="text-xs text-paper/60">“{r.quoteEs}”</p>}
            </div>
            <SpeakButton key={i} text={r.quote} size="sm" />
          </div>

          {/* Lo que el jugador les cuenta a sus amigos */}
          <p className="mt-3 text-sm text-paper/75">Cuéntaselo a tus amigos:</p>
          <div className={`mt-1 min-h-[64px] rounded-xl bg-panel-2 px-3 py-3 ${shake ? 'anim-shake' : ''} ${right ? 'border-2 border-hp/60' : ''}`}>
            <p className="flex flex-wrap items-center gap-1.5 text-lg leading-snug text-paper">
              <span>{r.start}</span>
              {built.map((k, pos) => (
                <button key={`${k}-${pos}`} className={`rounded-lg border-2 px-2 py-1 text-[16px] ${right ? 'border-hp/50 text-hp' : 'border-gold/60 text-paper'}`} disabled={right} onClick={() => setBuilt(built.filter((b) => b !== k))} aria-label={`Quitar ${tiles[k]}`}>
                  {tiles[k]}
                </button>
              ))}
              {!right && built.length === 0 && <span className="text-paper/40">…</span>}
              {right && <span>.</span>}
            </p>
          </div>

          {!right && (
            <>
              <div className="mt-3 flex flex-wrap gap-2">
                {tiles.map((t, k) => (
                  <button key={k} className={`rounded-lg border-2 border-line px-3 py-2 text-[16px] text-paper ${built.includes(k) ? 'invisible' : ''}`} onClick={() => setBuilt([...built, k])}>
                    {t}
                  </button>
                ))}
              </div>
              {tries > 0 && (
                <p className="anim-fade-in mt-3 text-sm text-paper/80">
                  Pista: <span className="text-paper/70">{r.tip}</span>
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <button className={btnGhost} onClick={() => setBuilt([])} disabled={built.length === 0}>Borrar</button>
                <button className={`${btnPrimary} flex-1`} onClick={check} disabled={built.length === 0}>Comprobar</button>
              </div>
            </>
          )}

          {right && (
            <div className="anim-fade-in mt-3">
              <p className="text-xs text-paper/60">{r.es}</p>
              <div className="mt-2 flex items-start gap-2 rounded-xl border border-line px-3 py-2">
                <div className="flex-1">
                  <p className="text-[15px] text-paper">
                    <span className="font-bold text-gold">{names[r.reaction.who]}:</span> {r.reaction.en}
                  </p>
                  <p className="text-xs text-paper/60">{r.reaction.es}</p>
                </div>
                <SpeakButton key={`r${i}`} text={r.reaction.en} size="sm" />
              </div>
              <button className={`${btnPrimary} mt-3 w-full`} onClick={next} autoFocus>
                {i === rounds.length - 1 ? 'Terminar' : 'Siguiente frase'}
              </button>
            </div>
          )}
        </>
      )}
    </Panel>
  )
}
