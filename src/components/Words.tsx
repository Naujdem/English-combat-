import { createContext, useContext, useState, type ReactNode } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { normalizeWord, translate } from '../data/glossary'
import { newCard } from '../game/cards'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary } from './ui'

/**
 * Tocar una palabra en inglés en cualquier parte del juego (lecciones de Leo, diálogos,
 * lecturas) muestra su traducción y permite guardarla en las fichas.
 */
type Open = (word: string, sentence: string) => void
const WordCtx = createContext<Open | null>(null)

export function WordProvider({ state, update, children }: { state: GameState; update: Update; children: ReactNode }) {
  const [word, setWord] = useState<{ raw: string; sentence: string } | null>(null)
  const names = [state.hero.name, state.interest.name].filter(Boolean).map((n) => n.toLowerCase())
  const w = word ? normalizeWord(word.raw) : ''
  const isName = !!word && (names.includes(w) || /^[A-Z]/.test(word.raw.replace(/^[^A-Za-z]+/, '')) && !translate(word.raw))
  const meaning = word ? (isName ? 'Nombre propio' : translate(word.raw)) : null
  const saved = state.cards.some((c) => c.id === w)

  return (
    <WordCtx.Provider value={(raw, sentence) => setWord({ raw, sentence })}>
      {children}
      {word && (
        <div className="absolute inset-x-0 bottom-0 z-[60] flex justify-center p-3" onClick={() => setWord(null)}>
          <div className="anim-fade-in w-full max-w-md rounded-2xl border-2 border-gold/70 bg-panel p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-2xl">{w}</p>
              <SpeakButton text={w} size="sm" />
            </div>
            <p className="text-[16px] text-paper/85">{meaning ?? 'Esta palabra todavía no está en el diccionario del juego.'}</p>
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
  if (!open) return <>{text}</>
  const parts = text.split(/(\s+)/)
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
              open(p, text)
            }}
            onKeyDown={(e) => e.key === 'Enter' && open(p, text)}
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
