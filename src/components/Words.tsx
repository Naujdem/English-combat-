import { createContext, useContext, useState, type ReactNode } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { normalizeWord, phrasalAt, translate } from '../data/glossary'
import { newCard } from '../game/cards'
import { SpeakButton } from './SpeakButton'
import { withStatic } from './StaticText'
import { STATIC_NAME, staticForSpeech } from '../game/staticName'
import { btn, btnGhost, btnPrimary } from './ui'

/**
 * Tocar una palabra en inglés en cualquier parte del juego (lecciones de Leo, diálogos,
 * lecturas) muestra su traducción y permite guardarla en las fichas.
 * Si la palabra es parte de un phrasal verb ("get" o "up" en "get up"), se muestra y se guarda el phrasal verb completo.
 */
type Open = (word: string, sentence: string, index?: number) => void
const WordCtx = createContext<Open | null>(null)

export function WordProvider({ state, update, children }: { state: GameState; update: Update; children: ReactNode }) {
  const [word, setWord] = useState<{ raw: string; sentence: string; index?: number } | null>(null)
  const names = [state.hero.name, state.interest.name].filter(Boolean).map((n) => n.toLowerCase())
  const single = word ? normalizeWord(word.raw) : ''
  const phrasal = word && word.index !== undefined ? phrasalAt(word.sentence.split(/\s+/).filter((t) => /[A-Za-z]/.test(t)), word.index) : null
  const isName = !phrasal && !!word && (names.includes(single) || /^[A-Z]/.test(word.raw.replace(/^[^A-Za-z]+/, '')) && !translate(word.raw))
  const w = phrasal ? phrasal.phrase : single
  const meaning = phrasal ? phrasal.meaning : word ? (isName ? 'Nombre propio' : translate(word.raw)) : null
  const singleMeaning = phrasal && word ? translate(word.raw) : null
  const saved = state.cards.some((c) => c.id === w)

  return (
    <WordCtx.Provider value={(raw, sentence, index) => setWord({ raw, sentence, index })}>
      {children}
      {word && (
        <div className="absolute inset-x-0 bottom-0 z-[60] flex justify-center p-3" onClick={() => setWord(null)}>
          <div className="anim-fade-in w-full max-w-md rounded-2xl border-2 border-gold/70 bg-panel p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-2xl">{w}</p>
              <SpeakButton text={w} size="sm" />
            </div>
            {phrasal && <p className="text-xs font-semibold uppercase tracking-wide text-gold">Phrasal verb</p>}
            <p className="text-[16px] text-paper/85">{meaning ?? 'Esta palabra todavía no está en el diccionario del juego.'}</p>
            {phrasal && singleMeaning && <p className="mt-1 text-sm text-paper/60">Sola, «{single}» significa: {singleMeaning}</p>}
            <div className="mt-3 flex items-center justify-between gap-2">
              <button className={btnGhost} onClick={() => setWord(null)}>Cerrar</button>
              {meaning && !isName && (
                <button
                  className={saved ? `${btn} text-hp` : btnPrimary}
                  disabled={saved}
                  onClick={() => update((s) => (s.cards.some((c) => c.id === w) ? s : { ...s, cards: [...s.cards, newCard(w, meaning, word.sentence)] }))}
                >
                  {saved ? '✓ En tus fichas' : 'Guardar en fichas'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </WordCtx.Provider>
  )
}

/** Texto en inglés con cada palabra tocable (subrayado punteado, como en las apps de idiomas) */
export function Tappable({ text }: { text: string }) {
  const open = useContext(WordCtx)
  // Nombres con estática ([[?]] → ▒▒▒): cada trozo de texto se sigue pudiendo tocar
  if (text.includes(STATIC_NAME)) return <>{withStatic(text, (part, k) => <TappableWords key={k} text={part} sentence={staticForSpeech(text)} open={open} />)}</>
  return <TappableWords text={text} sentence={text} open={open} />
}

function TappableWords({ text, sentence, open }: { text: string; sentence: string; open: Open | null }) {
  if (!open) return <>{text}</>
  const parts = text.split(/(\s+)/)
  // Posición de cada palabra entre las palabras de la frase (para encontrar phrasal verbs)
  let n = -1
  const index = parts.map((p) => (/[A-Za-z]/.test(p) ? ++n : -1))
  return (
    <>
      {parts.map((p, i) =>
        /[A-Za-z]/.test(p) ? (
          <span
            key={i}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              open(p, sentence, index[i])
            }}
            onKeyDown={(e) => e.key === 'Enter' && open(p, sentence, index[i])}
            className="cursor-pointer underline decoration-paper/30 decoration-dotted underline-offset-4 hover:decoration-gold"
          >
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}
