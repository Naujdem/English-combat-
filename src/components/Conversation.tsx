import { useState } from 'react'
import type { Conversation as Conv, FriendDef, GameState } from '../game/types'
import { SpriteIcon } from './Sprite'
import { heroLook } from '../game/helpers'
import { btn, btnPrimary, Panel } from './ui'

/** Muestra una charla línea por línea. Las preguntas deben responderse bien para avanzar. */
export function ConversationView({
  friend,
  conv,
  state,
  onDone,
}: {
  friend: FriendDef
  conv: Conv
  state: GameState
  onDone: () => void
}) {
  const [i, setI] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [solved, setSolved] = useState<number | null>(null)
  const line = conv.lines[i]
  const last = i === conv.lines.length - 1

  function next() {
    setShowEs(false)
    setTip(null)
    setSolved(null)
    if (last) onDone()
    else setI(i + 1)
  }

  function choose(k: number) {
    if (!line.choice) return
    if (k === line.choice.answer) {
      setSolved(k)
      setTip(null)
    } else {
      setTip(line.choice.tip)
    }
  }

  const speaker =
    line.who === 'friend' ? friend.name : line.who === 'hero' ? state.hero.name : ''
  const text =
    line.choice && solved !== null && line.text.includes('___')
      ? line.text.replace('___', line.choice.options[solved])
      : line.text

  return (
    <Panel className="shadow-2xl">
      <div className="mb-2 flex items-center gap-3">
        {line.who !== 'narrator' && (
          <div className="rounded-xl bg-panel-2 p-1">
            <SpriteIcon look={line.who === 'hero' ? heroLook(state) : { ...friend.look }} size={44} mood={line.who === 'hero' && !state.recovered.length ? 'mute' : 'normal'} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {speaker && <p className="font-display text-lg leading-tight text-gold">{speaker}</p>}
          <p className="text-xs text-paper/50">{conv.title} · {conv.level}</p>
        </div>
        {line.es && (
          <button className="rounded-lg border border-line px-2 py-1 text-xs font-semibold text-paper/80" onClick={() => setShowEs((v) => !v)}>
            {showEs ? 'Ocultar' : 'Traducir'}
          </button>
        )}
      </div>

      <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${line.who === 'narrator' ? 'italic text-paper/80' : ''}`}>
        {text}
      </p>
      {showEs && line.es && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {line.choice && solved === null && (
        <div className="mt-3 grid gap-2">
          {line.choice.options.map((o, k) => (
            <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(k)}>
              {o}
            </button>
          ))}
        </div>
      )}
      {tip && (
        <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">
          Casi. {tip}
        </p>
      )}

      {(!line.choice || solved !== null) && (
        <div className="mt-4 flex justify-end">
          <button className={btnPrimary} onClick={next} autoFocus>
            {last ? 'Terminar' : 'Siguiente'}
          </button>
        </div>
      )}
    </Panel>
  )
}
