import { useMemo, useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { dueCards, review, toCsv, waitLabel, type Grade } from '../game/cards'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: 'again', label: 'Otra vez', cls: 'border-danger/70 text-[#f3b0b0]' },
  { g: 'hard', label: 'Difícil', cls: 'border-[#c98b4a] text-[#f0c08a]' },
  { g: 'good', label: 'Bien', cls: 'border-hp text-hp' },
  { g: 'easy', label: 'Fácil', cls: 'border-[#5d8fd4] text-[#9cc0f5]' },
]

/** Fichas tipo Anki: repasar las palabras guardadas desde las lecturas */
export function Flashcards({ state, update, onClose }: { state: GameState; update: Update; onClose: () => void }) {
  const [mode, setMode] = useState<'home' | 'study' | 'list'>('home')
  const [flipped, setFlipped] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [filter, setFilter] = useState<'all' | 'word' | 'phrase'>('all')
  const shown = useMemo(() => state.cards.filter((c) => filter === 'all' || (c.type ?? 'word') === filter), [state.cards, filter])
  const due = useMemo(() => dueCards(shown, now), [shown, now])
  const phrases = state.cards.filter((c) => c.type === 'phrase').length
  const card = due[0]

  function grade(g: Grade) {
    const t = Date.now()
    update((s) => ({ ...s, cards: s.cards.map((c) => (c.id === card.id ? review(c, g, t) : c)) }))
    setFlipped(false)
    setNow(t)
  }

  function exportCsv() {
    const blob = new Blob([toCsv(state.cards)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'english-combat-fichas.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-3 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Mis fichas</p>
            <p className="font-display text-lg">{state.cards.length} ficha{state.cards.length === 1 ? '' : 's'} · {due.length} para repasar{filter === 'all' ? '' : filter === 'word' ? ' (palabras)' : ' (frases)'}</p>
          </div>
          <button className={btnGhost} onClick={mode === 'home' ? onClose : () => setMode('home')}>{mode === 'home' ? 'Cerrar' : 'Volver'}</button>
        </div>

        {mode === 'home' && state.cards.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5" role="tablist">
            {([['all', `Todas (${state.cards.length})`], ['word', `Palabras (${state.cards.length - phrases})`], ['phrase', `Frases (${phrases})`]] as const).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={filter === k}
                className={`rounded-xl border-2 px-2 py-1.5 text-sm font-semibold ${filter === k ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/70'}`}
                onClick={() => setFilter(k)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {mode === 'home' && (
          <Panel>
            {state.cards.length === 0 ? (
              <p className="text-[16px]">Aún no tienes fichas. En el diario, toca una palabra y elige "Guardar en fichas".</p>
            ) : (
              <>
                <p className="text-[16px]">
                  {due.length > 0
                    ? `Tienes ${due.length} ficha${due.length === 1 ? '' : 's'} para repasar ahora.`
                    : 'No tienes fichas pendientes. ¡Vuelve más tarde!'}
                </p>
                <p className="mt-1 text-sm text-paper/65">
                  Las fichas vuelven según lo bien que las recuerdes: las difíciles salen pronto y las fáciles tardan más días.
                </p>
                <p className="mt-1 text-sm text-paper/65">
                  Al terminar cada lugar se guardan sus palabras clave, y cada frase que corriges en combate vuelve aquí al día siguiente.
                </p>
                <div className="mt-4 grid gap-2">
                  <button className={btnPrimary} onClick={() => { setNow(Date.now()); setMode('study') }} disabled={due.length === 0}>Repasar</button>
                  <button className={btn} onClick={() => setMode('list')}>Ver todas</button>
                  <button className={btn} onClick={exportCsv}>Exportar CSV (SimulaPro / Anki)</button>
                </div>
              </>
            )}
          </Panel>
        )}

        {mode === 'study' && (
          card ? (
            <Panel key={card.id + card.due}>
              <div className="flex min-h-40 flex-col items-center justify-center gap-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">
                  {card.type === 'phrase' ? '¿Cómo se dice bien?' : 'Palabra'}{card.deck ? ` · ${card.deck}` : ''}
                </p>
                <div className="flex items-center gap-2">
                  <p className={`font-display ${card.type === 'phrase' ? 'text-xl text-[#f3b0b0] line-through decoration-danger/60' : 'text-3xl'}`}>{card.front}</p>
                  {card.type !== 'phrase' && <SpeakButton text={card.front} size="sm" />}
                </div>
                {flipped && (
                  <div className="anim-fade-in">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xl text-gold">{card.back}</p>
                      {card.type === 'phrase' && <SpeakButton text={card.back} size="sm" />}
                    </div>
                    {card.example && card.type === 'phrase' && <p className="mt-2 text-sm text-paper/70">{card.example}</p>}
                    {card.example && card.type !== 'phrase' && (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <p className="text-sm italic text-paper/70">"{card.example}"</p>
                        <SpeakButton text={card.example} size="sm" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!flipped ? (
                <button className={`${btnPrimary} mt-4 w-full`} onClick={() => setFlipped(true)} autoFocus>Voltear</button>
              ) : (
                <div className="mt-4 grid grid-cols-4 gap-1.5">
                  {GRADES.map(({ g, label, cls }) => (
                    <button key={g} className={`rounded-xl border-2 bg-panel-2 px-1 py-2 text-sm font-semibold ${cls}`} onClick={() => grade(g)}>
                      {label}
                      <span className="block text-[11px] font-normal text-paper/60">{waitLabel(card, g)}</span>
                    </button>
                  ))}
                </div>
              )}
            </Panel>
          ) : (
            <Panel className="anim-pop border-gold">
              <p className="font-display text-xl text-gold">¡Repaso terminado!</p>
              <p className="mt-1 text-[15px]">No quedan fichas para hoy.</p>
              <button className={`${btnPrimary} mt-3 w-full`} onClick={() => setMode('home')}>Volver</button>
            </Panel>
          )
        )}

        {mode === 'list' && (
          <Panel>
            <ul className="grid gap-2">
              {shown.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2 border-b border-line pb-2 last:border-0">
                  <div>
                    <p className="font-display text-lg">{c.front}</p>
                    <p className="text-sm text-paper/70">{c.back}{c.deck ? <span className="text-paper/45"> · {c.deck}</span> : null}</p>
                  </div>
                  <button
                    className={`${btnGhost} text-sm text-[#f3b0b0]`}
                    onClick={() => update((s) => ({ ...s, cards: s.cards.filter((x) => x.id !== c.id) }))}
                  >
                    Borrar
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </div>
    </div>
  )
}
