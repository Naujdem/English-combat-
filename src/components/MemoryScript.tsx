import { useEffect, useState } from 'react'
import type { ScriptLine } from '../data/b1Accident'
import type { SpriteLook } from './Sprite'
import { LIcon } from './SpriteL'
import { BlurFaceIcon } from './BlurFace'
import { SpriteIcon } from './Sprite'
import { UnheardLine } from './WindowFrame'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { withStatic } from './StaticText'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'
import { voiceOf } from '../game/speech'

/**
 * Secuencia fija de un recuerdo de B1 (sin elecciones): L narra o habla (retrato de L, sin cara) y los demás
 * hablan con la cara borrosa. Los nombres con [[?]] salen con estática. fx 'alarm': suena la alarma y la pantalla
 * destella en rojo suave (con "reducir movimiento", solo un tinte rojo quieto).
 */
export function MemoryScript({
  lines,
  friend,
  onDone,
  friendName = 'Amigo',
  hero,
  faces = false,
}: {
  lines: ScriptLine[]
  friend: SpriteLook
  onDone: () => void
  /** Nombre del otro personaje (B1-03: "The doctor") */
  friendName?: string
  /** B2: quien narra y habla es el protagonista (su nombre y su aspecto), no L */
  hero?: { name: string; look: SpriteLook }
  /** B2 (Ventanas y presente): el otro personaje se ve con cara (no es un recuerdo) */
  faces?: boolean
}) {
  const [i, setI] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const line = lines[i]
  const last = i === lines.length - 1

  useEffect(() => {
    if (line?.fx === 'alarm') sfx('alarm')
  }, [line])

  if (!line) return null
  const board = line.who === 'board'
  const portrait =
    line.who === 'friend' ? (
      faces ? <SpriteIcon look={friend} size={48} /> : <BlurFaceIcon look={friend} size={48} />
    ) : hero && !board ? (
      <SpriteIcon look={hero.look} size={48} />
    ) : board ? (
      <span className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#8a6a40] bg-[#24402f] text-xl text-paper" aria-hidden="true">✎</span>
    ) : (
      <LIcon size={48} pose="profile" />
    )
  const unheard = line.fx === 'unheard'
  const name = line.who === 'friend' ? friendName : board ? 'Pizarra' : hero ? hero.name : line.who === 'L' ? 'L' : 'L recuerda'

  return (
    <>
      {line.fx === 'alarm' && <div key={`alarm-${i}`} className="b1-alarm-flash pointer-events-none fixed inset-0 z-[55]" aria-hidden="true" />}
      <Panel className="relative z-[56]">
        <div className="flex items-center gap-3">
          {portrait}
          <p className="flex-1 font-display text-lg text-[#c9b8e8]">{withStatic(name)}</p>
          {!board && !unheard && /[a-z]/i.test(line.text) && <SpeakButton text={line.text} size="sm" auto voice={line.who === 'friend' ? voiceOf(friend) : line.fx === 'stranger' ? 'villain' : hero?.look.gender === 'female' ? 'female' : 'male'} />}
        </div>
        {unheard ? (
          <div key={i} className="anim-fade-in mt-2"><UnheardLine tried={line.text} /></div>
        ) : (
        <p key={i} className={`anim-fade-in mt-2 text-[17px] leading-relaxed ${line.who === 'narrator' ? 'italic text-paper/90' : ''} ${board ? 'rounded-lg border-2 border-[#8a6a40] bg-[#24402f] px-3 py-2 text-paper' : ''}`}>
          {withStatic(line.text, (p, k) => <Tappable key={k} text={p} />)}
        </p>
        )}
        {(showEs || unheard) && !board && <p className="mt-1 text-sm text-paper/60">{withStatic(line.es.replace(/▒+/g, '[[?]]'))}</p>}
        {line.fx === 'alarm' && <p className="mt-2 text-sm font-semibold text-[#f3b0b0]">(¡Suena la alarma de incendio!)</p>}
        <div className="mt-4 flex items-center justify-between gap-2">
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
          <button
            className={btnPrimary}
            autoFocus
            onClick={() => {
              setShowEs(false)
              if (last) onDone()
              else setI(i + 1)
            }}
          >
            {last ? 'Seguir' : 'Siguiente'}
          </button>
        </div>
      </Panel>
    </>
  )
}
