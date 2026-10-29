import { useMemo, useState } from 'react'
import { PARTY_ITEMS, type PartyItem } from '../data/tasks'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import type { Voice } from '../game/speech'

/** Dibujo pequeño de cada cosa de la fiesta */
export function PartyIcon({ id, size = 36 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {id === 'cake' && (
        <>
          <rect x="6" y="14" width="20" height="12" rx="2" fill="#e88aa8" />
          <rect x="6" y="14" width="20" height="4" rx="1.5" fill="#f4efe4" />
          <rect x="15" y="7" width="2" height="7" fill="#e0a526" />
          <path d="M16 3 q2 2 0 4 q-2 -2 0 -4z" fill="#f2a33a" />
        </>
      )}
      {id === 'balloons' && (
        <>
          <path d="M11 17 L15 29 M21 15 L16 29" stroke="#8d7c68" strokeWidth="1" />
          <ellipse cx="11" cy="11" rx="6" ry="7" fill="#d64545" />
          <ellipse cx="21" cy="9" rx="6" ry="7" fill="#2f6fd0" />
          <ellipse cx="17" cy="17" rx="5" ry="6" fill="#e0a526" />
        </>
      )}
      {id === 'radio' && (
        <>
          <rect x="4" y="11" width="24" height="15" rx="3" fill="#a8743f" />
          <circle cx="12" cy="18.5" r="4.5" fill="#5a4a3a" />
          <rect x="19" y="15" width="6" height="2" fill="#f4efe4" />
          <rect x="19" y="19" width="6" height="2" fill="#f4efe4" />
          <path d="M8 11 L22 4" stroke="#6b6b6b" strokeWidth="1.5" />
        </>
      )}
    </svg>
  )
}

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

/**
 * Preguntarle a alguien del barrio si tiene algo para la fiesta: "Have you got...?"
 * Primero eliges qué preguntar y luego la pregunta bien dicha.
 */
export function PartyAsk({
  name,
  personId,
  voice,
  missing,
  onGot,
  onClose,
}: {
  name: string
  personId: string
  voice: Voice
  missing: string[]
  onGot: (itemId: string) => void
  onClose: () => void
}) {
  const [item, setItem] = useState<PartyItem | null>(null)
  const [asked, setAsked] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [es, setEs] = useState(false)
  const options = useMemo(() => (item ? shuffle([item.question, ...item.wrong]) : []), [item])
  const owner = item?.owner === personId
  const reply = item ? (owner ? item.yes : item.no) : null

  return (
    <Panel>
      <p className="font-display text-lg text-gold">Preparar la fiesta · {name}</p>
      {!item && (
        <>
          <p className="mt-1 text-[15px] text-paper/80">¿Qué le preguntas a {name}?</p>
          <div className="mt-3 grid gap-2">
            {PARTY_ITEMS.filter((it) => missing.includes(it.id)).map((it) => (
              <button key={it.id} className={`${btn} flex items-center gap-3 text-left text-base`} onClick={() => setItem(it)}>
                <PartyIcon id={it.id} />
                <span>Si tiene {it.es}</span>
              </button>
            ))}
          </div>
          <button className={`${btnGhost} mt-3`} onClick={onClose}>Ahora no</button>
        </>
      )}
      {item && !asked && (
        <>
          <div className="mt-2 flex items-center gap-2">
            <PartyIcon id={item.id} />
            <p className="text-[15px] text-paper/80">Elige la pregunta bien dicha:</p>
          </div>
          <div className="mt-2 grid gap-2">
            {options.map((o) => (
              <button
                key={o}
                className={`${btn} text-left text-base`}
                onClick={() => {
                  if (o === item.question) {
                    setAsked(true)
                    setTip(null)
                  } else setTip('Para preguntar si alguien tiene algo: Have you got + a / any + cosa? Con "you" va "have", no "has".')
                }}
              >
                {o}
              </button>
            ))}
          </div>
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
        </>
      )}
      {item && asked && reply && (
        <div className="anim-fade-in mt-2">
          <p className="text-sm text-hp">Preguntaste: "{item.question}"</p>
          <div className="mt-2 flex items-start gap-2">
            <p className="flex-1 text-[17px] leading-relaxed">
              <span className="font-semibold text-gold">{name}: </span>
              <Tappable text={reply.text} />
            </p>
            <SpeakButton text={reply.text} size="sm" auto voice={voice} />
          </div>
          {es && <p className="mt-1 text-sm text-paper/60">{reply.es}</p>}
          {owner && <p className="mt-2 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Conseguiste {item.es}!</p>}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button className={btnGhost} onClick={() => setEs((v) => !v)}>{es ? 'Ocultar' : 'Traducir'}</button>
            <button
              className={btnPrimary}
              autoFocus
              onClick={() => {
                if (owner) onGot(item.id)
                onClose()
              }}
            >
              Listo
            </button>
          </div>
        </div>
      )}
    </Panel>
  )
}
