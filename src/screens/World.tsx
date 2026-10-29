import { useState } from 'react'
import type { GameState } from '../game/types'
import { WORLD, type WorldNode } from '../data/world'
import { TOPICS } from '../data/questions'
import { SpriteBody } from '../components/Sprite'
import { FriendsPanel } from '../components/FriendsPanel'
import { btn, btnGhost, Hearts, Overlay, Panel } from '../components/ui'
import { ClockPieces, TimeClock } from '../components/TimeClock'
import { Diary } from '../components/Diary'
import { Flashcards } from '../components/Flashcards'
import { BusRide, BUS_TO_CITY } from '../components/BusRide'
import { ProgressView, Review } from '../components/Review'
import { setSound, soundOn } from '../game/sfx'
import { autoVoiceOn, setAutoVoice } from '../game/speech'
import { DIARY } from '../data/diary'
import { dueCards } from '../game/cards'
import type { Update } from '../game/store'
import { heroLook } from '../game/helpers'

const ERA_COLOR = { Presente: '#3b9d5d', Pasado: '#c98b4a', Futuro: '#5d8fd4' } as const

export function World({ state, update, onEnter, onTitle }: { state: GameState; update: Update; onEnter: (sceneId: string) => void; onTitle: () => void }) {
  const [msg, setMsg] = useState<string>('Toca un lugar del mapa para viajar.')
  const [friends, setFriends] = useState(false)
  const [clock, setClock] = useState(false)
  // Al terminar un capítulo, el diario se abre solo la primera vez
  const newDiary = DIARY.find((c) => state.opened.includes(c.unlock) && !state.opened.includes(`diary-open-${c.id}`))
  const [diary, setDiary] = useState(!!newDiary)
  const [cards, setCards] = useState(false)
  const [bus, setBus] = useState(false)
  const [review, setReview] = useState(false)
  const [progress, setProgress] = useState(false)
  const [sound, setSoundState] = useState(soundOn())
  const [voice, setVoiceState] = useState(autoVoiceOn())
  const [settings, setSettings] = useState(false)
  const hasDiary = DIARY.some((c) => state.opened.includes(c.unlock))
  const dueCount = dueCards(state.cards).length

  function openDiary() {
    setDiary(true)
  }
  function closeDiary() {
    setDiary(false)
    if (newDiary) update((s) => ({ ...s, opened: [...s.opened, `diary-open-${newDiary.id}`] }))
  }
  const here = WORLD.find((n) => n.sceneId === state.sceneId) ?? WORLD[0]

  function unlocked(n: WorldNode) {
    return !n.requires || state.defeated.includes(n.requires.boss)
  }

  function tap(n: WorldNode) {
    if (!unlocked(n)) {
      const r = n.requires!
      return setMsg(`${n.name} está cerrado. Se llega ${r.how} desde ${r.from}, después de vencer a su jefe.`)
    }
    if (!n.sceneId) return setMsg(`${n.name} (${n.level}): ${n.about}. Este lugar se construirá pronto.`)
    // La primera vez que se va a la ciudad, se llega en autobús
    if (n.id === 'city' && !state.opened.includes('bus-city')) return setBus(true)
    onEnter(n.sceneId)
  }

  return (
    <div className="relative mx-auto flex h-full max-w-md flex-col [@media(min-width:900px)_and_(pointer:fine)]:max-w-2xl gap-3 px-3 py-3">
      <header className="flex items-center justify-between">
        <button className={btnGhost} onClick={onTitle}>Menú</button>
        <Hearts hp={state.hp} max={state.maxHp} />
        <div className="flex items-center">
          <button className={`${btnGhost} px-2 text-sm`} onClick={() => setSettings(true)}>Ajustes</button>
          <button className={btnGhost} onClick={() => setFriends(true)}>Amigos</button>
        </div>
      </header>

      <svg viewBox="0 0 360 380" className="w-full rounded-2xl border-2 border-line bg-[#24301f]" role="img" aria-label="Mapa del mundo">
        <path d="M0 0 H360 V380 H0Z" fill="#2a3a24" />
        {[...Array(18)].map((_, k) => (
          <circle key={k} cx={(k * 73) % 360} cy={(k * 131) % 380} r={10 + (k % 4) * 4} fill="#324a2a" />
        ))}
        <polyline
          points={WORLD.map((n) => `${n.x},${n.y}`).join(' ')}
          fill="none"
          stroke="#e8dcc8"
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        {WORLD.map((n) => {
          const open = unlocked(n)
          return (
            <g key={n.id} onClick={() => tap(n)} className="cursor-pointer" role="button" aria-label={`${n.name}, ${n.era}, ${n.level}`}>
              <circle cx={n.x} cy={n.y} r="24" fill={open ? ERA_COLOR[n.era] : '#4a4238'} stroke="#f4efe4" strokeWidth="3" />
              {open ? (
                <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontFamily="Fredoka, Nunito, system-ui, sans-serif" fontWeight="600" fill="#f4efe4">{n.level}</text>
              ) : (
                <g transform={`translate(${n.x - 7} ${n.y - 9})`}>
                  <rect x="0" y="7" width="14" height="11" rx="2" fill="#f4efe4" />
                  <path d="M3 7 V4.5 a4 4 0 0 1 8 0 V7" fill="none" stroke="#f4efe4" strokeWidth="2.2" />
                </g>
              )}
              <rect x={n.x - 40} y={n.y + 30} width="80" height="34" rx="8" fill="rgba(0,0,0,0.45)" />
              <text x={n.x} y={n.y + 45} textAnchor="middle" fontSize="13" fontFamily="Fredoka, Nunito, system-ui, sans-serif" fontWeight="600" fill="#f4efe4">{n.name}</text>
              <text x={n.x} y={n.y + 58} textAnchor="middle" fontSize="10" fontFamily="Nunito, system-ui, sans-serif" fill={ERA_COLOR[n.era]}>{n.era}</text>
            </g>
          )
        })}
        <g transform={`translate(${here.x - 18} ${here.y - 66}) scale(1.15)`} pointerEvents="none">
          <g className="anim-bob">
            <SpriteBody look={heroLook(state)} mood={state.recovered.length ? 'normal' : 'mute'} />
          </g>
        </g>
      </svg>

      <Panel className="py-3">
        <p className="text-[15px] text-paper/85">{msg}</p>
      </Panel>

      <div className="flex flex-wrap gap-2 text-xs text-paper/70">
        <span className="rounded-full bg-panel-2 px-3 py-1">Palabras recuperadas: {state.recovered.length ? state.recovered.map((t) => TOPICS[t].name).join(', ') : 'ninguna'}</span>
      </div>

      <button className={`${btn} flex items-center gap-3 text-left`} onClick={() => setClock(true)}>
        <TimeClock pieces={state.relics} size={52} />
        <span>
          <span className="block">Reloj del tiempo</span>
          <span className="block text-sm text-paper/65">Piezas: {Math.min(state.relics, WORLD.length)} de {WORLD.length}</span>
        </span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button className={btn} onClick={() => setReview(true)}>Repasar</button>
        <button className={btn} onClick={() => setProgress(true)}>Mi progreso</button>
        <button className={btn} onClick={openDiary} disabled={!hasDiary}>Mi diario</button>
        <button className={btn} onClick={() => setCards(true)}>
          Fichas{dueCount > 0 ? ` (${dueCount})` : ''}
        </button>
      </div>

      <button className={btn} onClick={() => tap(here)}>Entrar a {here.name}</button>

      {diary && <Diary state={state} update={update} onClose={closeDiary} />}
      {bus && (
        <BusRide
          trip={BUS_TO_CITY}
          hero={heroLook(state)}
          onDone={() => {
            setBus(false)
            update((s) => ({ ...s, opened: [...s.opened, 'bus-city'] }))
            onEnter('city')
          }}
        />
      )}
      {settings && (
        <Overlay onClose={() => setSettings(false)}>
          <Panel>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xl text-gold">Ajustes</p>
              <button className={btnGhost} onClick={() => setSettings(false)}>Cerrar</button>
            </div>
            <div className="grid gap-2">
              <label className="flex items-center justify-between rounded-xl border-2 border-line px-3 py-2.5 text-[15px]">
                <span>
                  Voz automática
                  <span className="block text-xs text-paper/55">Las frases en inglés se leen solas al aparecer</span>
                </span>
                <input type="checkbox" className="h-5 w-5 accent-[#e0a526]" checked={voice} onChange={(e) => { setAutoVoice(e.target.checked); setVoiceState(e.target.checked) }} />
              </label>
              <label className="flex items-center justify-between rounded-xl border-2 border-line px-3 py-2.5 text-[15px]">
                <span>
                  Sonidos
                  <span className="block text-xs text-paper/55">Aciertos, errores, golpes y premios</span>
                </span>
                <input type="checkbox" className="h-5 w-5 accent-[#e0a526]" checked={sound} onChange={(e) => { setSound(e.target.checked); setSoundState(e.target.checked) }} />
              </label>
              <p className="text-xs text-paper/50">Las flechas o el joystick se eligen en la exploración, encima de los controles.</p>
            </div>
          </Panel>
        </Overlay>
      )}
      {review && <Review state={state} update={update} onClose={() => setReview(false)} />}
      {progress && (
        <ProgressView
          state={state}
          onClose={() => setProgress(false)}
          onReview={() => {
            setProgress(false)
            setReview(true)
          }}
        />
      )}
      {cards && <Flashcards state={state} update={update} onClose={() => setCards(false)} />}

      {clock && (
        <Overlay onClose={() => setClock(false)}>
          <Panel>
            <div className="flex items-center justify-between">
              <p className="font-display text-xl text-gold">Reloj del tiempo</p>
              <button className={btnGhost} onClick={() => setClock(false)}>Cerrar</button>
            </div>
            <div className="my-3 flex justify-center"><TimeClock pieces={state.relics} size={150} /></div>
            <p className="text-[15px] text-paper/85">
              El reloj del desconocido explotó y sus piezas se llevaron pedazos de tu voz. Quien toca una pieza se corrompe; tú no, porque es tu voz. Cada jefe tiene una.
              {state.relics >= WORLD.length ? ' ¡Lo tienes completo! Ya puedes ir tras el desconocido.' : ' Con el reloj completo podrás alcanzar al desconocido y recuperar toda tu voz.'}
            </p>
            <div className="mt-3"><ClockPieces pieces={state.relics} /></div>
          </Panel>
        </Overlay>
      )}

      {friends && <FriendsPanel state={state} onClose={() => setFriends(false)} />}
    </div>
  )
}
