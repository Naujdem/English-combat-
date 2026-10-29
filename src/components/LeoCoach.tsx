import { useMemo, useState } from 'react'
import type { Question } from '../game/types'
import { questionsFor, pickQuestion } from '../data/questions'
import { QuestionCard, correctSentence } from './QuestionCard'
import { GrammarPattern, RoleSentence } from './Grammar'
import { SpeakButton } from './SpeakButton'

/**
 * Después de un error en combate, Leo enseña con ejemplos: la regla corta, dos frases de ejemplo
 * del mismo tema y, si quieres, una pregunta parecida para probar sin perder vida.
 */
export function LeoCoach({ q, metLeo, tags }: { q: Question; metLeo: boolean; tags?: string[] }) {
  const examples = useMemo(() => {
    const pool = questionsFor([q.topic], ['fill']).filter((x) => x.id !== q.id && !x.id.startsWith('L-') && !x.audio)
    const out: string[] = []
    const seen = new Set([correctSentence(q)])
    for (const x of pool.sort(() => Math.random() - 0.5)) {
      const s = correctSentence(x)
      if (seen.has(s) || s.length > 60) continue
      seen.add(s)
      out.push(s)
      if (out.length === 2) break
    }
    return out
  }, [q])
  const [tryQ, setTryQ] = useState<Question | null>(null)
  const [more, setMore] = useState(false)
  const [tried, setTried] = useState<boolean | null>(null)

  return (
    <div>
      <p className="text-sm font-semibold text-gold">{metLeo ? 'Leo te explica' : 'Pista'}</p>
      <p className="mt-0.5 text-[15px] leading-snug">{q.tip}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs text-paper/60">Así es:</span>
        <RoleSentence text={correctSentence(q)} topic={q.topic} size="sm" />
      </div>
      {!more && (
        <button className="mt-2 text-sm font-semibold text-hp underline underline-offset-4" onClick={() => setMore(true)}>
          Ver la regla, más ejemplos y probar una parecida
        </button>
      )}
      {more && (
        <div className="mt-2">
          <GrammarPattern topic={q.topic} sentence={correctSentence(q)} compact />
        </div>
      )}
      {more && examples.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-paper/60">Otros ejemplos:</p>
          <ul className="mt-1 grid gap-1">
            {examples.map((e) => (
              <li key={e} className="flex items-center gap-2">
                <RoleSentence text={e} topic={q.topic} size="sm" />
                <SpeakButton text={e} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      )}
      {!more ? null : !tryQ ? (
        <button
          className="mt-3 w-full rounded-xl border-2 border-hp/60 px-3 py-2 text-sm font-semibold text-hp"
          onClick={() => setTryQ(pickQuestion([q.topic], ['fill', 'fix'], [q.id], [], tags ?? []))}
        >
          Probar una parecida (sin perder vida)
        </button>
      ) : (
        <div className="anim-fade-in mt-3 rounded-xl border-2 border-hp/50 bg-ink p-3">
          <QuestionCard key={tryQ.id} q={tryQ} onAnswer={(ok) => setTried(ok)} />
          {tried !== null && (
            <p className={`mt-2 text-sm font-semibold ${tried ? 'text-hp' : 'text-[#f3b0b0]'}`}>
              {tried ? '¡Ahora sí! Ya lo tienes.' : `Casi. ${tryQ.tip}`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
