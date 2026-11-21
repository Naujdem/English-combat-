import { useState } from 'react'
import { CoreBar } from './B2Map'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/**
 * Escena de apertura de B2 (ficha 0.1): la residencia de Lumen Bay, la mañana después de The Grudge.
 * El diario, el núcleo con su barra de 6 segmentos, el mensaje de Manuel (prácticas en el Herald) y la llamada de Leo.
 * Al terminar se guarda B2_OPENING (lo hace quien la muestra) y se abre el lugar 1.
 */
const LINES: { who: string; en: string; es: string; core?: boolean }[] = [
  { who: 'Tu diario', en: "Who didn't I help? And when?", es: '¿A quién no ayudé? ¿Y cuándo?' },
  { who: 'El reloj', en: 'The core shows six empty segments for the first time. "The core is waking up."', es: 'El núcleo muestra por primera vez seis segmentos vacíos. "El núcleo está despertando".', core: true },
  {
    who: 'Manuel (mensaje)',
    en: "Hi! It's Manuel from The Lumen Bay Herald. Would you like an internship with us? We're looking into the voice blackouts at the port.",
    es: '¡Hola! Soy Manuel, del Lumen Bay Herald. ¿Te gustaría hacer prácticas con nosotros? Estamos investigando los apagones de voz del puerto.',
  },
  { who: 'Leo (llamada)', en: 'Morning! Breakfast at the port café? I… sorry. Too much coffee already!', es: '¡Buenos días! ¿Desayunamos en el café del puerto? Yo… perdón. ¡Ya tomé demasiado café!' },
]

export function B2Opening({ onDone, onExit }: { onDone: () => void; onExit: () => void }) {
  const [i, setI] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const line = LINES[i]
  const last = i === LINES.length - 1
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/95 p-3">
      <div className="w-full max-w-md">
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">B2 · Apertura · Lumen Bay</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="font-display text-lg text-paper/90">{line.who}</p>
            <SpeakButton text={line.en} size="sm" />
          </div>
          <p className="anim-fade-in mt-2 text-[17px] leading-relaxed" key={i}><Tappable text={line.en} /></p>
          {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}
          {line.core && <div className="mt-3"><CoreBar filled={0} /></div>}
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex gap-1">
              <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
              <button className={btnGhost} onClick={onExit}>Salir</button>
            </div>
            <button
              className={btnPrimary}
              autoFocus
              onClick={() => {
                if (last) return onDone()
                setI(i + 1)
                setShowEs(false)
              }}
            >
              {last ? 'Ir al café' : 'Siguiente'}
            </button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
