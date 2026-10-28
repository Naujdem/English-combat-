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
    onEnter(n.sceneId)
  }

  return (
    <div className="relative mx-auto flex h-full max-w-md flex-col gap-3 px-3 py-3">
      <header className="flex items-center justify-between">
        <button className={btnGhost} onClick={onTitle}>Menú</button>
        <Hearts hp={state.hp} max={state.maxHp} />
        <button className={btnGhost} onClick={() => setFriends(true)}>Amigos</button>
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
        <button className={btn} onClick={openDiary} disabled={!hasDiary}>Mi diario</button>
        <button className={btn} onClick={() => setCards(true)}>
          Fichas{dueCount > 0 ? ` (${dueCount})` : ''}
        </button>
      </div>

      <button className={btn} onClick={() => tap(here)}>Entrar a {here.name}</button>

      {diary && <Diary state={state} update={update} onClose={closeDiary} />}
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
              El desconocido usa este reloj para viajar entre épocas y esconder tus palabras. Cada jefe guarda una pieza.
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
