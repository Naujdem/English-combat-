import { useState } from 'react'
import { voiceOf } from '../game/speech'
import type { ChatOption, DialogLine, FriendDef, GameState } from '../game/types'
import { SpriteIcon } from './Sprite'
import { heroLook } from '../game/helpers'
import { btn, btnPrimary, Panel } from './ui'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'

function EffectChip({ effect }: { effect: ChatOption['effect'] }) {
  if (effect > 0)
    return <span className="rounded-full bg-hp/20 px-2 py-0.5 text-xs font-semibold text-hp">Amistad +{effect}</span>
  if (effect < 0)
    return <span className="rounded-full bg-danger/20 px-2 py-0.5 text-xs font-semibold text-[#f3b0b0]">Amistad −1</span>
  return <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-paper/70">Sin cambio</span>
}

/**
 * Charla con un amigo, línea por línea. Las líneas con opciones no tienen respuesta
 * incorrecta: cada opción tiene su reacción y suma o resta amistad.
 */
export function ConversationView({
  friend,
  lines,
  title,
  level,
  state,
  onDone,
}: {
  friend: FriendDef
  lines: DialogLine[]
  title: string
  level?: string
  state: GameState
  onDone: (delta: number) => void
}) {
  const [i, setI] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [picked, setPicked] = useState<ChatOption | null>(null)
  const [delta, setDelta] = useState(0)
  const line = lines[i]
  const last = i === lines.length - 1

  function next() {
    setShowEs(false)
    setPicked(null)
    if (last) onDone(delta)
    else setI(i + 1)
  }

  function choose(o: ChatOption) {
    setPicked(o)
    setDelta((d) => d + o.effect)
    setShowEs(false)
  }

  const speaker = line.who === 'friend' ? friend.name : line.who === 'hero' ? state.hero.name : ''
  const mute = !state.recovered.length

  return (
    <Panel className="shadow-2xl">
      <div className="mb-2 flex items-center gap-3">
        {line.who !== 'narrator' && (
          <div className="rounded-xl bg-panel-2 p-1">
            <SpriteIcon look={line.who === 'hero' ? heroLook(state) : { ...friend.look }} size={44} mood={line.who === 'hero' && mute ? 'mute' : 'normal'} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {speaker && <p className="font-display text-lg leading-tight text-gold">{speaker}</p>}
          <p className="text-xs text-paper/50">{title}{level ? ` · ${level}` : ''}</p>
        </div>
        {(picked ? picked.es : line.es) && (
          <button className="rounded-lg border border-line px-2 py-1 text-xs font-semibold text-paper/80" onClick={() => setShowEs((v) => !v)}>
            {showEs ? 'Ocultar' : 'Traducir'}
          </button>
        )}
      </div>

      {!picked ? (
        <>
          <div className="flex items-start gap-2">
            <p key={i} className={`anim-fade-in flex-1 text-[17px] leading-relaxed ${line.who === 'narrator' ? 'italic text-paper/80' : ''}`}>
              {line.who === 'friend' ? <Tappable text={line.text} /> : line.text}
            </p>
            {line.who === 'friend' && <SpeakButton text={line.text} size="sm" auto voice={voiceOf(friend.look)} />}
          </div>
          {showEs && line.es && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}
          {line.options && (
            <div className="mt-3 grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">{mute ? '¿Qué haces?' : '¿Qué respondes?'}</p>
              {line.options.map((o, k) => (
                <button key={k} className={`${btn} text-left text-base`} onClick={() => choose(o)}>
                  {o.text}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="anim-fade-in grid gap-2">
          <p className="rounded-xl bg-[#3b6fb6]/25 px-3 py-2 text-[15px]">
            <span className="font-semibold text-[#9cc0f0]">{state.hero.name}: </span>
            {picked.text}
          </p>
          <div className="flex items-start gap-2">
            <p className="flex-1 text-[17px] leading-relaxed">
              <span className="font-semibold text-gold">{friend.name}: </span>"{picked.reply}"
            </p>
            <SpeakButton text={picked.reply} size="sm" auto voice={voiceOf(friend.look)} />
          </div>
          {showEs && picked.es && <p className="text-sm text-paper/60">{picked.es}</p>}
          <div><EffectChip effect={picked.effect} /></div>
        </div>
      )}

      {(!line.options || picked) && (
        <div className="mt-4 flex justify-end">
          <button className={btnPrimary} onClick={next} autoFocus>
            {last ? 'Terminar' : 'Siguiente'}
          </button>
        </div>
      )}
    </Panel>
  )
}
