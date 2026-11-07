import { useState } from 'react'
import { MiniTalk, type MiniStep } from './MiniTalk'
import { LIcon } from './SpriteL'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/** Contenido de Text Only (B1-03, data/b1TextOnly.ts): varios chats seguidos en el teléfono de L */
export type TextOnlyContent = {
  title: string
  /** Sin intro (el cierre de B1-03): se pasa directo al chat */
  intro?: { text: string; es: string }
  chats: { contact: string; steps: MiniStep[] }[]
  finish: { text: string; es: string }
}

/** Una línea que narra L (no habla: no suena sola) */
function LLine({ line, title, onNext, onExit, button }: { line: { text: string; es: string }; title: string; onNext: () => void; onExit?: () => void; button: string }) {
  const [showEs, setShowEs] = useState(false)
  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">{title}</p>
      <div className="mt-2 flex items-center gap-3">
        <LIcon size={48} pose="profile" />
        <p className="flex-1 font-display text-lg text-[#c9b8e8]">L recuerda</p>
        <SpeakButton text={line.text} size="sm" />
      </div>
      <p className="anim-fade-in mt-2 text-[17px] italic leading-relaxed">
        <Tappable text={line.text} />
      </p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
          {onExit && <button className={btnGhost} onClick={onExit}>Salir</button>}
        </div>
        <button className={btnPrimary} onClick={onNext} autoFocus>{button}</button>
      </div>
    </Panel>
  )
}

/**
 * Text Only (B1-03): L no puede hablar, solo escribir. Pantallas: lo que narra L antes (before) → intro → cada chat
 * (MiniTalk con skin 'phone', "Chat n/total") → pantalla final → onClose(true). Salir antes: onClose(false). Sin pérdida de vida.
 */
export function TextOnly({ content, before = [], onClose }: { content: TextOnlyContent; before?: { text: string; es: string }[]; onClose: (done: boolean) => void }) {
  // Pasos: los de "before", la intro, los chats y el final
  const [k, setK] = useState(0)
  const nBefore = before.length
  // Sin intro (el cierre de B1-03) se pasa directo al primer chat
  const nIntro = content.intro ? 1 : 0
  const total = content.chats.length
  const exit = () => onClose(false)

  if (k < nBefore) return <LLine key={`b${k}`} line={before[k]} title={content.title} onNext={() => setK(k + 1)} onExit={exit} button="Siguiente" />
  if (k === nBefore && content.intro) return <LLine key="intro" line={content.intro} title={content.title} onNext={() => setK(k + 1)} onExit={exit} button="Empezar" />
  const c = k - nBefore - nIntro
  if (c < total) {
    const chat = content.chats[c]
    return (
      <div className="flex w-full flex-col gap-2">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">
          {content.title}
          {total > 1 && ` · Chat ${c + 1}/${total}`}
        </p>
        <MiniTalk
          key={c}
          name={chat.contact}
          contact={chat.contact}
          look={{ shirt: '#5a6a7e', hair: '#2b2b33', skin: '#c9a888' }}
          steps={chat.steps}
          skin="phone"
          onClose={(done) => (done ? setK(k + 1) : exit())}
        />
        <button className={`${btnGhost} self-center`} onClick={exit}>Salir</button>
      </div>
    )
  }
  return <LLine key="finish" line={content.finish} title={content.title} onNext={() => onClose(true)} button="Listo" />
}
