import { useEffect, useMemo, useState } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import { mixed } from '../game/mix'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/**
 * Una pareja: a y b son las dos cartas que se emparejan (p. ej. go ↔ gone).
 * example: frase que se muestra y se oye al encontrarla, para usar la pareja en contexto.
 */
export type MemoryPair = { a: string; b: string; example: { en: string; es: string } }

type Card = { pair: number; text: string; side: 'a' | 'b' }

/**
 * The Memory Chest (Monster's Memory, A2-10; reutilizable con otras parejas: comida, opuestos…).
 * Las cartas están boca abajo. Se voltean dos: si son pareja se quedan abiertas y se oye la frase de ejemplo;
 * si no, se vuelven a cerrar. No hay vidas ni tiempo: se gana al encontrar todas las parejas.
 */
export function MemoryChest({
  name,
  look,
  title,
  intro,
  pairs,
  onClose,
}: {
  name: string
  look: SpriteLook
  title: string
  intro: { en: string; es: string }
  pairs: MemoryPair[]
  onClose: (done: boolean) => void
}) {
  const cards = useMemo<Card[]>(
    () => mixed(pairs.flatMap((p, i) => [{ pair: i, text: p.a, side: 'a' as const }, { pair: i, text: p.b, side: 'b' as const }]), title).map(([c]) => c),
    [pairs, title],
  )
  const [open, setOpen] = useState<number[]>([])
  const [found, setFound] = useState<number[]>([])
  const [last, setLast] = useState<number | null>(null)
  const [tries, setTries] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const done = found.length === pairs.length

  // Dos cartas abiertas que no son pareja se cierran solas
  useEffect(() => {
    if (open.length < 2) return
    const t = setTimeout(() => setOpen([]), 900)
    return () => clearTimeout(t)
  }, [open])

  function flip(k: number) {
    if (done || open.includes(k) || found.includes(cards[k].pair) || open.length >= 2) return
    const next = [...open, k]
    if (next.length < 2) {
      setOpen(next)
      return
    }
    setTries((t) => t + 1)
    const [x, y] = next.map((n) => cards[n])
    if (x.pair === y.pair && x.side !== y.side) {
      sfx('correct')
      setFound((f) => [...f, x.pair])
      setLast(x.pair)
      setOpen([])
    } else {
      sfx('wrong')
      setOpen(next)
    }
  }

  const line = done ? { en: 'The chest is open!', es: '¡El baúl está abierto!' } : intro
  const ex = last !== null ? pairs[last].example : null

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">The Memory Chest · {title}</p>
        </div>
        <SpeakButton text={line.en} size="sm" auto voice={voiceOf(look)} />
      </div>
      <p key={line.en} className="anim-fade-in mt-2 text-[17px] leading-relaxed"><Tappable text={line.en} /></p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      <div className="mt-3 rounded-xl border-2 border-line bg-[#5a3a20]/40 p-2">
        <div className="mb-2 flex items-center justify-between text-xs text-paper/60">
          <span>Candados abiertos: {found.length}/{pairs.length}</span>
          <span>Intentos: {tries}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-label="Cartas del baúl">
          {cards.map((c, k) => {
            const up = open.includes(k) || found.includes(c.pair)
            const ok = found.includes(c.pair)
            const bad = open.length === 2 && open.includes(k) && !ok
            return (
              <button
                key={k}
                onClick={() => flip(k)}
                disabled={ok || done}
                aria-label={up ? c.text : 'Carta boca abajo'}
                className={`flex h-16 items-center justify-center rounded-lg border-2 text-base font-bold transition-colors ${
                  ok ? 'border-hp bg-hp/20 text-hp' : bad ? 'anim-shake border-danger bg-danger/20 text-paper' : up ? 'border-gold bg-gold/15 text-paper' : 'border-[#8a5a32] bg-[#8a5a32] text-[#f4efe4]/70'
                } ${last === c.pair ? 'anim-pop' : ''}`}
              >
                {up ? c.text : '?'}
              </button>
            )
          })}
        </div>
      </div>

      {ex && (
        <div key={last} className="anim-fade-in mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
          <p className="flex items-center gap-2 font-semibold">
            {pairs[last!].a} → {pairs[last!].b}
            <SpeakButton text={ex.en} size="sm" auto />
          </p>
          <p className="mt-1 text-paper"><Tappable text={ex.en} /></p>
          {showEs && <p className="mt-0.5 text-paper/60">{ex.es}</p>}
        </div>
      )}
      {!done && <p className="mt-2 text-sm text-paper/75">Voltea dos cartas: un verbo y su participio (go → gone).</p>}
      {done && <p className="anim-fade-in mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Abriste todos los candados en {tries} intentos!</p>}

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
