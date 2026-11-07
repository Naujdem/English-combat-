import { useState } from 'react'
import { btnGhost, btnPrimary, Panel } from './ui'

const KEY = 'english-combat-tutorial-explore'

/** ¿Ya se vio el tutorial de exploración en este dispositivo? */
export function tutorialSeen() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return true
  }
}

function markSeen() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    /* sin almacenamiento */
  }
}

/** Tutorial corto de exploración: aparece una sola vez, se puede saltar */
export function ExploreTutorial({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const steps = [
    {
      title: 'Muévete',
      text: desktop
        ? 'Usa las flechas del teclado o W A S D para caminar.'
        : 'Usa las flechas de abajo para caminar. Si prefieres, cambia a joystick con el botón de arriba.',
    },
    { title: 'Habla con la gente', text: 'Camina hacia una persona para hablar con ella. Si tiene un ! encima, tiene algo para ti.' },
    { title: 'Aprende palabras', text: 'Choca con los objetos (mesas, libros, plantas...) para ver su nombre en inglés.' },
    { title: 'Esbirros y llaves', text: 'Algunos personajes son esbirros: al vencerlos en combate ganas llaves. Con todas las llaves (arriba) se abre la puerta del jefe.' },
    { title: 'Tu mochila', text: 'En la Mochila están tus objetivos, el cuaderno con tus errores y tus atuendos. Si no sabes qué hacer, mira ahí.' },
  ]
  const [i, setI] = useState(0)
  const close = () => {
    markSeen()
    onClose()
  }
  const last = i === steps.length - 1
  return (
    <div className="absolute inset-x-0 bottom-[190px] z-30 flex justify-center px-3">
      <Panel className="anim-fade-in w-full max-w-md border-gold/70 shadow-xl">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">
            Cómo jugar · {i + 1}/{steps.length}
          </p>
          <button className={btnGhost} onClick={close}>Saltar</button>
        </div>
        <p className="font-display text-lg">{steps[i].title}</p>
        <p className="mt-1 text-sm text-paper/80">{steps[i].text}</p>
        <div className="mt-3 flex justify-end gap-2">
          {i > 0 && <button className={btnGhost} onClick={() => setI(i - 1)}>Atrás</button>}
          <button className={btnPrimary} onClick={() => (last ? close() : setI(i + 1))}>{last ? '¡Listo!' : 'Siguiente'}</button>
        </div>
      </Panel>
    </div>
  )
}
