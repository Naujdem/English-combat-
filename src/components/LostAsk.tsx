import { useState } from 'react'
import type { LostItem } from '../data/lostFound'
import { lostReply } from '../data/lostFound'
import { SpeakButton } from './SpeakButton'
import type { Voice } from '../game/speech'
import { btn, btnPrimary, Panel } from './ui'

/** Preguntarle a alguien si el objeto que llevas es suyo */
export function LostAsk({
  item,
  npcId,
  npcName,
  voice = 'neutral',
  onDone,
}: {
  item: LostItem
  npcId: string
  npcName: string
  voice?: Voice
  onDone: (returned: boolean) => void
}) {
  const [asked, setAsked] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const reply = lostReply(item, npcId)

  return (
    <Panel>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">Misión: objetos perdidos</p>
      <p className="mt-1 text-[15px] text-paper/80">
        Le muestras {item.es} a <b>{npcName}</b> y escribes en una nota:
      </p>

      {!asked ? (
        <>
          <div className="mt-3 grid gap-2">
            {item.ask.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} text-left text-base`}
                onClick={() => (k === item.ask.answer ? (setAsked(true), setTip(null)) : setTip(item.ask.tip))}
              >
                {o}
              </button>
            ))}
          </div>
          {tip && (
            <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">
              {npcName}: "Sorry? I don't understand." {tip}
            </p>
          )}
        </>
      ) : (
        <div className="anim-fade-in mt-3 grid gap-2">
          <p className="rounded-xl bg-[#3b6fb6]/25 px-3 py-2 text-[15px]">{item.ask.options[item.ask.answer]}</p>
          <div className="flex items-start gap-2">
            <p className="flex-1 text-[17px] leading-relaxed">
              <span className="font-semibold text-gold">{npcName}: </span>"{reply.text}"
            </p>
            <SpeakButton text={reply.text} size="sm" auto voice={voice} />
          </div>
          {es && <p className="text-sm text-paper/60">{reply.es}</p>}
          <div className="mt-2 flex items-center justify-between">
            <button className="rounded-lg px-3 py-1.5 text-sm font-semibold text-paper/80" onClick={() => setEs((v) => !v)}>
              {es ? 'Ocultar' : 'Traducir'}
            </button>
            <button className={btnPrimary} onClick={() => onDone(reply.owner)} autoFocus>
              {reply.owner ? 'Entregar' : 'Seguir buscando'}
            </button>
          </div>
        </div>
      )}
    </Panel>
  )
}
