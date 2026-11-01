import { useMemo, useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'

/**
 * Una línea que hay que reconstruir: una pista confiable (clue) contra lo que dice la nota corrompida (claim).
 * options[answer] es la versión verdadera (dato correcto y pasado correcto); las otras fallan en el dato o en el verbo.
 * mode 'tap' (opcional): en vez de elegir entre botones, se toca en la página la palabra equivocada (wrongWord) de la nota.
 * La frase verdadera que aparece en la página reconstruida sigue siendo options[answer].
 */
export type ReconstructItem = {
  source: string
  clue: { en: string; es: string }
  claim: { en: string; es: string }
  options: string[]
  answer: number
  tip: string
  mode?: 'choose' | 'tap'
  /** Para mode 'tap': la palabra de claim.en que hay que tocar (sin signos de puntuación) */
  wrongWord?: string
}

const clean = (w: string) => w.replace(/[^A-Za-z']/g, '').toLowerCase()
const isTap = (it: ReconstructItem) => it.mode === 'tap' && !!it.wrongWord && it.claim.en.split(' ').some((w) => clean(w) === clean(it.wrongWord!))

/** Fondo de libro abierto en SVG: dos páginas (nota corrompida | nota reconstruida), lomo y una mancha de tinta */
function BookArt() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect x="2" y="4" width="316" height="214" rx="8" fill="#6e4524" />
      <rect x="8" y="8" width="150" height="204" rx="4" fill="#e8dcc8" />
      <rect x="162" y="8" width="150" height="204" rx="4" fill="#f4efe4" />
      <rect x="156" y="8" width="8" height="204" fill="#b98c5a" opacity="0.55" />
      <line x1="160" y1="8" x2="160" y2="212" stroke="#7a6a58" strokeWidth="1.2" />
      {/* manchas de tinta morada en la página corrompida */}
      <ellipse cx="136" cy="196" rx="13" ry="8" fill="#6b3fa0" opacity="0.28" />
      <circle cx="120" cy="204" r="3" fill="#6b3fa0" opacity="0.3" />
      <circle cx="24" cy="20" r="4" fill="#6b3fa0" opacity="0.22" />
      {/* marcapáginas en la página buena */}
      <rect x="290" y="0" width="9" height="30" fill="#c0392b" />
      <polygon points="290,30 294.5,25 299,30" fill="#f4efe4" />
    </svg>
  )
}

/**
 * Reconstruct the Story (A2-05): contrastar el testimonio. Para cada línea de la nota corrompida se lee una pista
 * y se elige la frase verdadera (o, en los ítems 'tap', se toca la palabra equivocada en la página).
 * Un error no castiga: muestra la pista de gramática y se vuelve a intentar.
 * La página izquierda tacha cada línea corregida; la derecha va escribiendo la historia reconstruida.
 */
export function Reconstruct({ title, intro, items, onClose }: { title: string; intro: { en: string; es: string }; items: ReconstructItem[]; onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState<number | null>(null)
  const [wrongTap, setWrongTap] = useState<number | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = i >= items.length
  const item = items[Math.min(i, items.length - 1)]
  const tap = !done && isTap(item)
  const opts = useMemo(() => mixed(item.options, `${title}-${i}`), [item, title, i])

  function advance() {
    sfx('correct')
    setWrong(null)
    setWrongTap(null)
    setI(i + 1)
  }

  function pick(k: number) {
    if (done) return
    if (k === item.answer) advance()
    else {
      sfx('wrong')
      setWrong(k)
    }
  }

  function tapWord(w: string, n: number) {
    if (!tap) return
    if (clean(w) === clean(item.wrongWord!)) advance()
    else {
      sfx('wrong')
      setWrong(-1)
      setWrongTap(n)
    }
  }

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Reconstruct the Story</p>
      <p className="font-display text-lg">{title}</p>
      <div className="mt-2 flex items-start gap-2">
        <p className="flex-1 text-[15px] leading-relaxed"><Tappable text={intro.en} /></p>
        <SpeakButton text={intro.en} size="sm" />
      </div>
      {showEs && <p className="mt-1 text-sm text-paper/60">{intro.es}</p>}

      {/* El libro: izquierda la nota corrompida, derecha la nota que se va reconstruyendo */}
      <div className="relative mt-3 overflow-hidden rounded-xl" role="group" aria-label="Libro con la nota corrompida y la nota reconstruida">
        <BookArt />
        <div className="relative grid grid-cols-2 gap-3 px-3 py-3 text-ink sm:gap-4 sm:px-4">
          <div className="min-w-0">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#7a3b3b]">La nota dice</p>
            <ol className="grid gap-1.5">
              {items.map((it, n) => {
                const current = n === i && !done
                const fixed = n < i
                return (
                  <li
                    key={n}
                    className={`rounded px-1 text-[12.5px] leading-snug sm:text-[13.5px] ${
                      fixed ? 'text-ink/35 line-through decoration-[#c0392b]/70' : current ? 'anim-fade-in bg-[#c0392b]/10 font-semibold ring-1 ring-[#c0392b]/50' : 'text-ink/55'
                    }`}
                  >
                    {current && tap ? (
                      <span className="inline-flex flex-wrap gap-x-1 gap-y-0.5">
                        {it.claim.en.split(' ').map((w, k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => tapWord(w, k)}
                            className={`rounded px-0.5 underline decoration-dotted decoration-[#6b3fa0] underline-offset-2 transition hover:bg-[#6b3fa0]/15 active:scale-95 ${wrongTap === k ? 'anim-shake bg-[#c0392b]/20' : ''}`}
                          >
                            {w}
                          </button>
                        ))}
                      </span>
                    ) : (
                      it.claim.en
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="min-w-0">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#2e6b45]">Lo que pasó</p>
            <ol className="grid gap-1.5">
              {items.map((it, n) => (
                <li key={n} className={`rounded px-1 text-[12.5px] leading-snug sm:text-[13.5px] ${n < i ? 'anim-pop font-semibold text-[#2e6b45]' : 'text-ink/30'}`}>
                  {n < i ? it.options[it.answer] : '· · ·'}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <p className="mt-1 text-right text-[11px] text-paper/50">Línea {Math.min(i + 1, items.length)} de {items.length}</p>

      {!done && (
        <div key={i} className="anim-fade-in mt-2 grid gap-2">
          <div className="rounded-lg border border-gold/40 bg-gold/10 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Pista · {item.source}</p>
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[15px]"><Tappable text={item.clue.en} /></p>
              <SpeakButton text={item.clue.en} size="sm" />
            </div>
            {showEs && <p className="text-xs text-paper/60">{item.clue.es}</p>}
          </div>
          {showEs && <p className="text-xs text-paper/60">La nota: {item.claim.es}</p>}
          {tap ? (
            <p className="text-sm text-paper/75">Toca en la página la palabra de la nota que está mal.</p>
          ) : (
            <>
              <p className="text-sm text-paper/75">¿Qué pasó de verdad? Elige la frase con el dato correcto y el pasado bien escrito.</p>
              {opts.map(([text, k]) => (
                <button key={k} className={`${btn} text-left text-base ${wrong === k ? 'anim-shake border-danger' : ''}`} onClick={() => pick(k)}>
                  {text}
                </button>
              ))}
            </>
          )}
        </div>
      )}
      {wrong !== null && !done && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Esa no. Compara con la pista. {item.tip}</p>}
      {done && <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Historia reconstruida! Ahora sabes qué pasó de verdad.</p>}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}
