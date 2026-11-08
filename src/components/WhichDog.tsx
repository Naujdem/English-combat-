import { useState } from 'react'
import { ShelterDog, type ShelterDogId } from './ShelterDog'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/** Una petición de Nayi: en inglés, su traducción y el perro correcto */
export type WhichDogRound = { en: string; es: string; dog: ShelterDogId }

const DOGS: { id: ShelterDogId; name: string }[] = [
  { id: 'zirius', name: 'Zirius' },
  { id: 'laica', name: 'Laica' },
  { id: 'kitay', name: 'Kitay' },
  { id: 'fresas', name: 'Fresas' },
  { id: 'lupe', name: 'Lupe' },
]

/**
 * Which Dog? (B1-06, bloque B; adaptado de GuessAnimal): Nayi pide un perro con una oración de relativo y el jugador
 * lo toca. Acierto: marca verde y siguiente ronda. Error: marca roja suave y "Look again!" (sin perder; se puede
 * intentar otra vez). Al terminar las rondas: onClose(true).
 */
export function WhichDog({ rounds, onClose }: { rounds: WhichDogRound[]; onClose: (done: boolean) => void }) {
  const [round, setRound] = useState(0)
  const [wrong, setWrong] = useState<ShelterDogId[]>([])
  const [right, setRight] = useState(false)
  const [over, setOver] = useState(false)
  const r = rounds[round]

  function pick(id: ShelterDogId) {
    if (right) return
    if (id === r.dog) {
      sfx('correct')
      setRight(true)
    } else {
      sfx('wrong')
      setWrong((w) => (w.includes(id) ? w : [...w, id]))
    }
  }

  function next() {
    if (round === rounds.length - 1) return setOver(true)
    setRound(round + 1)
    setWrong([])
    setRight(false)
  }

  if (over) {
    return (
      <Panel>
        <p className="font-display text-xl text-gold">¡Encontraste los {rounds.length} perros!</p>
        <button className={`${btnPrimary} mt-4 w-full`} onClick={() => onClose(true)} autoFocus>Listo</button>
      </Panel>
    )
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Which Dog? · {round + 1} de {rounds.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-xl bg-panel-2 px-3 py-2">
        <div className="flex-1">
          <p className="text-[15px] text-paper">Nayi: "{r.en}"</p>
          <p className="text-xs text-paper/60">{r.es}</p>
        </div>
        <SpeakButton key={round} text={r.en} voice="female" size="sm" auto />
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {DOGS.map((d) => {
          const isRight = right && d.id === r.dog
          const isWrong = wrong.includes(d.id) && !isRight
          return (
            <button
              key={d.id}
              className={`flex flex-col items-center rounded-xl border-2 p-1 ${isRight ? 'border-hp bg-hp/15' : isWrong ? 'border-danger/60 bg-danger/10' : 'border-line'}`}
              onClick={() => pick(d.id)}
              aria-label={d.name}
            >
              <svg viewBox="0 0 32 32" width={44} height={44}>
                <ShelterDog who={d.id} />
              </svg>
              <span className="text-[11px] text-paper/80">{d.name}</span>
            </button>
          )
        })}
      </div>

      {wrong.length > 0 && !right && (
        <p className="anim-fade-in mt-3 text-sm text-paper/80">
          Look again! <span className="text-paper/55">— ¡Mira otra vez!</span>
        </p>
      )}
      {right && (
        <button className={`${btnPrimary} anim-fade-in mt-3 w-full`} onClick={next} autoFocus>
          {round === rounds.length - 1 ? 'Terminar' : 'Siguiente'}
        </button>
      )}
    </Panel>
  )
}
