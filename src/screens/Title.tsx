import { useEffect, useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { btn, btnPrimary } from '../components/ui'
import { heroLook } from '../game/helpers'
import { setTeacher, TEACHER_PIN, useTeacher } from '../game/teacher'

export function Title({ state, onContinue, onNew }: { state: GameState; onContinue: () => void; onNew: () => void }) {
  const hasSave = !!state.hero.name
  const [confirm, setConfirm] = useState(false)
  // Modo profesor: 5 toques en el título y la clave
  const teacher = useTeacher()
  const [taps, setTaps] = useState(0)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  // Android/Chrome ofrece instalar la app; guardamos el aviso para mostrar nuestro propio botón
  const [installEvt, setInstallEvt] = useState<(Event & { prompt: () => Promise<void> }) | null>(null)
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setInstallEvt(e as Event & { prompt: () => Promise<void> })
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])
  const look = hasSave ? heroLook(state, { book: true }) : { shirt: '#3b6fb6', hair: '#4a2c17', skin: '#f1c27d', cape: '#c0392b', book: true }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      <svg width="180" height="150" viewBox="0 0 120 100" aria-hidden="true">
        <rect x="10" y="8" width="100" height="44" rx="4" fill="#7a5230" />
        <rect x="14" y="12" width="92" height="36" fill="#2f5d50" />
        <text x="60" y="27" textAnchor="middle" fill="#f4efe4" fontSize="9" fontFamily="Fredoka, Nunito, system-ui, sans-serif">I ___ ready!</text>
        <text x="60" y="40" textAnchor="middle" fill="#e0a526" fontSize="7" fontFamily="Fredoka, Nunito, system-ui, sans-serif">am · is · are</text>
        <g transform="translate(39 55) scale(1.3)">
          <g className="anim-bob">
            <SpriteBody look={look} />
          </g>
        </g>
      </svg>
      <div>
        <h1 className="select-none font-display text-4xl font-semibold tracking-tight text-gold" onClick={() => setTaps((n) => n + 1)}>English Combat</h1>
        <p className="mt-1 text-paper/70">Recupera tu voz, palabra por palabra.</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        {hasSave && (
          <button className={btnPrimary} onClick={onContinue}>
            Continuar con {state.hero.name}
          </button>
        )}
        {!confirm ? (
          <button className={hasSave ? btn : btnPrimary} onClick={() => (hasSave ? setConfirm(true) : onNew())}>
            Nueva partida
          </button>
        ) : (
          <div className="anim-fade-in rounded-xl border-2 border-danger/60 p-3 text-sm">
            <p className="mb-2">Se borrará la partida guardada. ¿Seguro?</p>
            <div className="flex gap-2">
              <button className={`${btn} flex-1 text-base`} onClick={() => setConfirm(false)}>Cancelar</button>
              <button className={`${btn} flex-1 border-danger text-base`} onClick={onNew}>Borrar y empezar</button>
            </div>
          </div>
        )}
        {taps >= 5 && !teacher.on && (
          <form
            className="anim-fade-in rounded-xl border-2 border-gold/60 p-3 text-left text-sm"
            onSubmit={(e) => {
              e.preventDefault()
              if (pin.trim().toLowerCase() === TEACHER_PIN) {
                setTeacher({ on: true })
                setTaps(0)
              } else setPinError(true)
            }}
          >
            <p className="mb-2 font-semibold text-gold">Modo profesor</p>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false) }}
              placeholder="Clave"
              className="w-full rounded-lg border-2 border-line bg-panel-2 px-3 py-2 text-base text-paper outline-none focus:border-gold"
              autoFocus
            />
            {pinError && <p className="mt-1 text-[#f3b0b0]">Clave incorrecta.</p>}
            <button className={`${btnPrimary} mt-2 w-full`} type="submit">Activar</button>
          </form>
        )}
        {teacher.on && <p className="text-sm text-gold">Modo profesor activo: usa el botón "Profe" de arriba.</p>}
        {installEvt && (
          <button
            className="mt-1 text-sm font-semibold text-paper/70 underline underline-offset-4"
            onClick={() => installEvt.prompt().finally(() => setInstallEvt(null))}
          >
            Instalar en el celular para jugar sin internet
          </button>
        )}
      </div>
    </div>
  )
}
