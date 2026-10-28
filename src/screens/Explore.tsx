import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Entity, GameState } from '../game/types'
import type { Update } from '../game/store'
import { SCENES, bossDoorOpen, friendById, heroLook } from '../game/helpers'
import { ENEMIES, OUTFITS } from '../data/school'
import { TOPICS } from '../data/questions'
import { completeConversation, FRIEND_REWARDS, talkTo } from '../game/social'
import { Chest, FLOOR, T, Tile, VOCAB, walkable } from '../components/Tiles'
import { SpriteBody } from '../components/Sprite'
import { DPad } from '../components/DPad'
import { ConversationView } from '../components/Conversation'
import { FriendsPanel } from '../components/FriendsPanel'
import { btn, btnGhost, btnPrimary, Hearts, KeyIcon, Overlay, Panel } from '../components/ui'

const VIEW = 11

type Msg = { text: string; sub?: string; tone?: 'info' | 'good' | 'warn' }
type Talk = { friendId: string; index: number }

export function Explore({ state, update, onBattle, onWorld }: { state: GameState; update: Update; onBattle: (enemyId: string) => void; onWorld: () => void }) {
  const scene = SCENES[state.sceneId]
  const [msg, setMsg] = useState<Msg | null>(null)
  const [talk, setTalk] = useState<Talk | null>(null)
  const [friendsOpen, setFriendsOpen] = useState(false)
  const lessonPending = !state.seenLesson.includes(scene.id)
  const doorOpen = bossDoorOpen(state, scene)
  const keys = state.keys[scene.id] ?? 0
  const blocked = !!talk || friendsOpen || lessonPending

  const rows = scene.map.length
  const cols = scene.map[0].length

  const alive = useMemo(
    () =>
      scene.entities.filter((e) => {
        if (e.type === 'enemy' || e.type === 'boss') return !state.defeated.includes(e.id)
        if (e.type === 'chest') return !state.opened.includes(e.id)
        return true
      }),
    [scene, state.defeated, state.opened],
  )

  const tiles = useMemo(
    () =>
      scene.map.flatMap((row, y) =>
        row.split('').map((c, x) => <Tile key={`${x}-${y}`} c={c} x={x} y={y} floor={FLOOR[scene.zoneAt(x, y)]} doorOpen={doorOpen} />),
      ),
    [scene, doorOpen],
  )

  const interact = useCallback(
    (e: Entity) => {
      if (e.type === 'enemy' || e.type === 'boss') {
        setMsg(null)
        onBattle(e.id)
        return
      }
      if (e.type === 'chest') {
        const outfit = OUTFITS[e.outfit]
        update((s) => ({
          ...s,
          opened: [...s.opened, e.id],
          outfits: s.outfits.includes(e.outfit) ? s.outfits : [...s.outfits, e.outfit],
          outfit: e.outfit,
        }))
        setMsg({ text: `Abriste un cofre: ${outfit.name}.`, sub: 'Ya la llevas puesta. Puedes cambiarla desde el menú de atuendos.', tone: 'good' })
        return
      }
      const id = e.type === 'friend' ? e.id : 'interest'
      const friend = friendById(state, id)
      if (!friend) return
      const res = talkTo(state, friend)
      if (res.kind === 'conv') {
        setMsg(null)
        if (!(id in state.friendship)) update((s) => ({ ...s, friendship: { ...s.friendship, [id]: 0 } }))
        setTalk({ friendId: id, index: res.index })
      } else if (res.kind === 'maxed') {
        setMsg({ text: res.line, sub: res.note, tone: 'warn' })
      } else {
        setMsg({ text: res.line })
      }
    },
    [onBattle, state, update],
  )

  const move = useCallback(
    (dx: number, dy: number) => {
      if (blocked) return
      const nx = state.pos.x + dx
      const ny = state.pos.y + dy
      const facing = dx < 0 ? 'left' : dx > 0 ? 'right' : state.facing
      if (ny < 0 || nx < 0 || ny >= rows || nx >= cols) return
      const ent = alive.find((e) => e.x === nx && e.y === ny)
      if (ent) {
        if (facing !== state.facing) update((s) => ({ ...s, facing }))
        interact(ent)
        return
      }
      const c = scene.map[ny][nx]
      if (walkable(c, doorOpen)) {
        setMsg(null)
        update((s) => ({ ...s, pos: { x: nx, y: ny }, facing }))
        return
      }
      if (facing !== state.facing) update((s) => ({ ...s, facing }))
      if (c === 'X') {
        setMsg({
          text: 'La puerta de la sala de profesores está cerrada.',
          sub: `Necesitas ${scene.keysNeeded} llaves. Los estudiantes que guardan tus palabras las tienen.`,
          tone: 'warn',
        })
        return
      }
      const v = VOCAB[c]
      if (v && c !== '#') setMsg({ text: `${v.en[0].toUpperCase()}${v.en.slice(1)}`, sub: `= ${v.es}` })
    },
    [alive, blocked, cols, doorOpen, interact, rows, scene, state.facing, state.pos.x, state.pos.y, update],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      }
      const d = k[e.key]
      if (d && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        move(d[0], d[1])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [move])

  const camX = Math.max(0, Math.min(cols - VIEW, state.pos.x - Math.floor(VIEW / 2)))
  const camY = Math.max(0, Math.min(rows - VIEW, state.pos.y - Math.floor(VIEW / 2)))
  const look = heroLook(state)
  const talkFriend = talk ? friendById(state, talk.friendId) : null

  function friendHasNews(id: string) {
    const f = friendById(state, id)
    if (!f) return false
    return talkTo(state, f).kind === 'conv'
  }

  return (
    <div className="relative mx-auto flex h-full max-w-md flex-col gap-2 px-3 py-2">
      <header className="flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={onWorld}>Mapa</button>
        <div className="flex items-center gap-3">
          <Hearts hp={state.hp} max={state.maxHp} />
          <div className="flex items-center gap-0.5" aria-label={`Llaves ${keys} de ${scene.keysNeeded}`}>
            {Array.from({ length: scene.keysNeeded }).map((_, i) => (
              <KeyIcon key={i} filled={i < keys} />
            ))}
          </div>
        </div>
        <button className={btnGhost} onClick={() => setFriendsOpen(true)}>Amigos</button>
      </header>

      <div className="overflow-hidden rounded-2xl border-2 border-line bg-ink">
        <svg viewBox={`0 0 ${VIEW * T} ${VIEW * T}`} className="block w-full" role="img" aria-label={`${scene.name}, vista desde arriba`}>
          <g style={{ transform: `translate(${-camX * T}px, ${-camY * T}px)`, transition: 'transform 180ms ease-out' }}>
            {tiles}
            {scene.labels.map((l) => (
              <text
                key={l.text}
                x={l.x * T + T / 2}
                y={l.y * T + T / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Fredoka, Nunito, system-ui, sans-serif"
                fontWeight="600"
                fill="#5a4a3a"
                fillOpacity="0.55"
                pointerEvents="none"
              >
                {l.text}
              </text>
            ))}
            {alive.map((e) => {
              const key = `${e.type}-${e.x}-${e.y}`
              if (e.type === 'chest') return <Chest key={key} x={e.x} y={e.y} />
              if (e.type === 'enemy' || e.type === 'boss') {
                const def = ENEMIES[e.id]
                return (
                  <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                    <g transform="translate(32 0) scale(-1 1)">
                      <g className="anim-bob">
                        <SpriteBody look={{ ...def.look }} />
                      </g>
                    </g>
                    <rect x="4" y="-3" width="24" height="3.5" rx="1.5" fill={e.type === 'boss' ? '#7a4fa3' : '#d64545'} />
                  </g>
                )
              }
              const id = e.type === 'friend' ? e.id : 'interest'
              const f = friendById(state, id)!
              return (
                <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                  <SpriteBody look={f.look} />
                  {friendHasNews(id) && (
                    <g className="anim-bob">
                      <circle cx="26" cy="2" r="5.5" fill="#e0a526" />
                      <text x="26" y="5.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1c1a17">!</text>
                    </g>
                  )}
                </g>
              )
            })}
            <g style={{ transform: `translate(${state.pos.x * T}px, ${state.pos.y * T}px)`, transition: 'transform 150ms linear' }}>
              <g transform={state.facing === 'left' ? 'translate(32 0) scale(-1 1)' : undefined}>
                <SpriteBody look={look} mood={state.recovered.length ? 'normal' : 'mute'} />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="min-h-[76px]">
        {msg ? (
          <Panel className={`anim-fade-in py-3 ${msg.tone === 'good' ? 'border-hp/70' : msg.tone === 'warn' ? 'border-gold/70' : ''}`}>
            <p className="text-[16px] font-semibold">{msg.text}</p>
            {msg.sub && <p className="mt-0.5 text-sm text-paper/70">{msg.sub}</p>}
          </Panel>
        ) : (
          <p className="px-1 pt-2 text-sm text-paper/55">
            {scene.name}. Choca con objetos para ver su nombre en inglés y con personas para hablar.
          </p>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between pb-2">
        <OutfitButton state={state} update={update} />
        <DPad onMove={move} disabled={blocked} />
      </div>

      {lessonPending && (
        <Overlay>
          <Panel>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{TOPICS[scene.topic].level} · Antes de entrar</p>
            <h2 className="mt-1 font-display text-2xl">{TOPICS[scene.topic].name}</h2>
            <ul className="mt-3 grid gap-2">
              {TOPICS[scene.topic].lesson.map((l, i) => (
                <li key={i} className="rounded-lg bg-panel-2 px-3 py-2 text-[15px] leading-snug">{l}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-paper/70">
              Los estudiantes de esta escuela guardan tus palabras. Vence a {scene.keysNeeded} para conseguir las llaves de la sala de profesores.
            </p>
            <button
              className={`${btnPrimary} mt-4 w-full`}
              onClick={() => update((s) => ({ ...s, seenLesson: [...s.seenLesson, scene.id] }))}
              autoFocus
            >
              Entendido
            </button>
          </Panel>
        </Overlay>
      )}

      {talk && talkFriend && (
        <Overlay>
          <ConversationView
            friend={talkFriend}
            conv={talkFriend.conversations[talk.index]}
            state={state}
            onDone={() => {
              const before = state.friendship[talk.friendId] ?? 0
              update((s) => completeConversation(s, talk.friendId, talk.index))
              const reward = FRIEND_REWARDS[talk.friendId]?.[talk.index + 1]
              setTalk(null)
              setMsg({
                text: `Tu amistad con ${talkFriend.name} subió a nivel ${Math.max(before, talk.index + 1)}.`,
                sub: reward,
                tone: 'good',
              })
            }}
          />
        </Overlay>
      )}

      {friendsOpen && <FriendsPanel state={state} onClose={() => setFriendsOpen(false)} />}
    </div>
  )
}

function OutfitButton({ state, update }: { state: GameState; update: Update }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={`${btn} px-3 text-sm`} onClick={() => setOpen(true)} disabled={state.outfits.length < 2}>
        Atuendos
      </button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <Panel>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl">Atuendos</h2>
              <button className={btnGhost} onClick={() => setOpen(false)}>Cerrar</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {state.outfits.map((o) => {
                const s2 = { ...state, outfit: o }
                return (
                  <button
                    key={o}
                    onClick={() => update((s) => ({ ...s, outfit: o }))}
                    className={`flex flex-col items-center rounded-xl border-2 p-2 ${state.outfit === o ? 'border-gold bg-gold/10' : 'border-line'}`}
                  >
                    <svg width="64" height="64" viewBox="0 0 32 32" aria-hidden="true">
                      <SpriteBody look={heroLook(s2)} />
                    </svg>
                    <span className="text-sm">{OUTFITS[o].name}</span>
                  </button>
                )
              })}
            </div>
          </Panel>
        </Overlay>
      )}
    </>
  )
}
