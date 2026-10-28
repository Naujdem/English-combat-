import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DialogLine, Entity, GameState } from '../game/types'
import type { Update } from '../game/store'
import { SCENES, bossDoorOpen, friendById, heroLook } from '../game/helpers'
import { BOSS_REQUIREMENTS, ENEMIES, OUTFITS } from '../data/school'
import { LESSONS } from '../data/lessons'
import { Lesson } from '../components/Lesson'
import type { TopicId } from '../game/types'
import { applyCasual, completeStory, FRIEND_REWARDS, talkTo } from '../game/social'
import { ReadingActivity, VocabActivity } from '../components/Activities'
import { SPORTS_VOCAB } from '../data/activities'
import { Chest, FLOOR, T, Tile, VOCAB, walkable } from '../components/Tiles'
import { SpriteBody } from '../components/Sprite'
import { DPad } from '../components/DPad'
import { SpeakButton } from '../components/SpeakButton'
import { ConversationView } from '../components/Conversation'
import { FriendsPanel } from '../components/FriendsPanel'
import { Notebook } from '../components/Notebook'
import { LostAsk } from '../components/LostAsk'
import { LOST_INTRO, LOST_ITEMS } from '../data/lostFound'
import { NPCS } from '../data/npcs'
import { Registration } from '../components/Registration'
import { btn, btnGhost, Hearts, KeyIcon, Overlay, Panel } from '../components/ui'

const VIEW = 11

type Msg = { text: string; sub?: string; tone?: 'info' | 'good' | 'warn'; say?: string }
type Talk = {
  friendId: string
  /** Índice del momento de historia, o null si es una charla casual */
  story: number | null
  lines: DialogLine[]
  title: string
  level?: string
  note?: string
  /** Charla especial de una misión */
  quest?: 'lostIntro'
}

export function Explore({ state, update, onBattle, onWorld }: { state: GameState; update: Update; onBattle: (enemyId: string) => void; onWorld: () => void }) {
  const scene = SCENES[state.sceneId]
  const [msg, setMsg] = useState<Msg | null>(null)
  const [talk, setTalk] = useState<Talk | null>(null)
  const [friendsOpen, setFriendsOpen] = useState(false)
  // Lección de Leo que se muestra antes de un combate con un tema nuevo
  const [lesson, setLesson] = useState<{ topic: TopicId; enemyId: string } | null>(null)
  const firstVisit = !state.seenLesson.includes(scene.id)
  const doorOpen = bossDoorOpen(state, scene)
  const keys = state.keys[scene.id] ?? 0
  const [activity, setActivity] = useState<'vocab' | 'reading' | 'registration' | 'sports' | null>(null)
  const npcTurn = useRef<Record<string, number>>({})
  const [notebook, setNotebook] = useState(false)
  // Preguntar "Is this your...?" mientras llevas un objeto perdido
  const [ask, setAsk] = useState<{ itemId: string; npcId: string; npcName: string } | null>(null)
  const lf = state.lostFound
  const lostOnMap = lf.started ? LOST_ITEMS.filter((it) => !lf.picked.includes(it.id)) : []
  const blocked = !!talk || friendsOpen || !!lesson || !!activity || notebook || !!ask

  const rows = scene.map.length
  const cols = scene.map[0].length

  const alive = useMemo(
    () =>
      scene.entities.filter((e) => {
        // Los enemigos vencidos se quedan en el mapa como estudiantes normales
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
      if (e.type === 'npc') {
        const npc = NPCS[e.id]
        if (e.id === 'secretary' && !state.opened.includes('school-registration')) {
          setMsg(null)
          setActivity('registration')
        } else if (e.id === 'coach') {
          setMsg(null)
          setActivity('sports')
        } else if (npc.lines) {
          // Los estudiantes de ambiente dicen una frase distinta cada vez
          const k = npcTurn.current[e.id] ?? 0
          npcTurn.current[e.id] = k + 1
          const line = npc.lines[k % npc.lines.length]
          setMsg({ text: `${npc.name}: "${line.text}"`, sub: line.es, say: line.text })
        } else if (npc.doneLine) {
          setMsg({ text: `${npc.name}: "${npc.doneLine.text}"`, sub: npc.doneLine.es, say: npc.doneLine.text })
        }
        return
      }
      // Si llevas un objeto perdido, le preguntas a quien sea si es suyo
      const talkable = e.type === 'friend' || e.type === 'interest' || ((e.type === 'enemy' || e.type === 'boss') && state.defeated.includes(e.id))
      if (lf.carrying && talkable) {
        const npcId = e.type === 'friend' ? e.id : e.type === 'interest' ? 'interest' : e.id
        const npcName = e.type === 'friend' || e.type === 'interest' ? friendById(state, npcId)!.name : ENEMIES[e.id].person
        setMsg(null)
        setAsk({ itemId: lf.carrying, npcId, npcName })
        return
      }
      if ((e.type === 'enemy' || e.type === 'boss') && state.defeated.includes(e.id)) {
        const def = ENEMIES[e.id]
        setMsg({ text: `${def.person}: "${def.freed.text}"`, sub: def.freed.es, say: def.freed.text })
        return
      }
      // El profesor Grimm no pelea si te falta el silbato o el uniforme
      if (e.type === 'boss') {
        const missing = BOSS_REQUIREMENTS.filter((r) => !state.opened.includes(r.id))
        if (missing.length > 0) {
          const first = missing[0]
          setMsg({
            text: `${ENEMIES[e.id].person}: "${first.line.text}"`,
            sub: `${first.line.es} Te falta: ${missing.map((m) => m.name).join(' y ')}.`,
            tone: 'warn',
            say: first.line.text,
          })
          return
        }
      }
      if (e.type === 'enemy' || e.type === 'boss') {
        setMsg(null)
        const unseen = ENEMIES[e.id].topics.find((t) => !state.seenLesson.includes(t) && LESSONS[t])
        if (unseen) setLesson({ topic: unseen, enemyId: e.id })
        else onBattle(e.id)
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
      // Después de conocerla, Maya pide ayuda con los objetos perdidos
      if (id === 'maya' && !lf.started && (state.talks.maya ?? 0) >= 1) {
        if (!(id in state.friendship)) update((s) => ({ ...s, friendship: { ...s.friendship, [id]: 0 } }))
        setMsg(null)
        setTalk({ friendId: id, story: null, lines: LOST_INTRO, title: 'Misión: objetos perdidos', quest: 'lostIntro' })
        return
      }
      const res = talkTo(state, friend)
      if (!(id in state.friendship)) update((s) => ({ ...s, friendship: { ...s.friendship, [id]: 0 } }))
      setMsg(null)
      if (res.kind === 'story') {
        setTalk({ friendId: id, story: res.index, lines: res.conv.lines, title: res.conv.title, level: res.conv.level })
      } else if (res.kind === 'casual') {
        setTalk({
          friendId: id,
          story: null,
          lines: [{ who: 'friend', text: res.chat.text, es: res.chat.es, options: res.chat.options }],
          title: 'Charla casual',
          note: res.note,
        })
      } else {
        setMsg({ text: res.line, sub: res.note, tone: res.note ? 'warn' : 'info' })
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
      const item = lostOnMap.find((it) => it.x === nx && it.y === ny)
      if (item) {
        if (lf.carrying) {
          const holding = LOST_ITEMS.find((it) => it.id === lf.carrying)!
          setMsg({ text: `Ya llevas ${holding.es}.`, sub: 'Devuélvela a su dueño antes de recoger otra cosa.', tone: 'warn' })
          return
        }
        update((s) => ({ ...s, lostFound: { ...s.lostFound, carrying: item.id, picked: [...s.lostFound.picked, item.id] } }))
        setMsg({ text: `Encontraste ${item.es}. ¿De quién será?`, sub: `Pregúntale a la gente: "Is this your ${item.en}?"`, tone: 'good', say: `Is this your ${item.en}?` })
        return
      }
      const ent = alive.find((e) => e.x === nx && e.y === ny)
      if (ent) {
        if (facing !== state.facing) update((s) => ({ ...s, facing }))
        interact(ent)
        return
      }
      const c = scene.map[ny][nx]
      if (walkable(c, doorOpen)) {
        setMsg(null)
        update((s) => ({
          ...s,
          pos: { x: nx, y: ny },
          facing,
          seenLesson: s.seenLesson.includes(scene.id) ? s.seenLesson : [...s.seenLesson, scene.id],
        }))
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
      if (c === 'L') {
        setMsg(null)
        setActivity('vocab')
        return
      }
      if (c === 'B' && !state.opened.includes('school-reading')) {
        setMsg(null)
        setActivity('reading')
        return
      }
      const v = VOCAB[c]
      if (v && c !== '#') setMsg({ text: `${v.en[0].toUpperCase()}${v.en.slice(1)}`, sub: `= ${v.es}`, say: v.en })
    },
    [alive, blocked, cols, doorOpen, interact, lf.carrying, lostOnMap, rows, scene, state.facing, state.opened, state.pos.x, state.pos.y, update],
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
    if (id === 'maya' && !lf.started && (state.talks.maya ?? 0) >= 1) return true
    return talkTo(state, f).kind === 'story'
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
                if (state.defeated.includes(e.id)) {
                  return (
                    <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                      <SpriteBody look={{ ...def.look }} />
                    </g>
                  )
                }
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
              if (e.type === 'npc') {
                const pending =
                  (e.id === 'secretary' && !state.opened.includes('school-registration')) ||
                  (e.id === 'coach' && !state.opened.includes('school-whistle'))
                return (
                  <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                    <SpriteBody look={NPCS[e.id].look} />
                    {pending && (
                      <g className="anim-bob">
                        <circle cx="26" cy="2" r="5.5" fill="#e0a526" />
                        <text x="26" y="5.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1c1a17">!</text>
                      </g>
                    )}
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
            {lostOnMap.map((it) => (
              <g key={it.id} transform={`translate(${it.x * T} ${it.y * T})`}>
                <g className="anim-bob">
                  <ellipse cx="16" cy="27" rx="9" ry="2.5" fill="rgba(0,0,0,0.15)" />
                  {it.id === 'bag' ? (
                    <>
                      <path d="M11 12 Q16 5 21 12" fill="none" stroke={it.color} strokeWidth="2" />
                      <rect x="8" y="11" width="16" height="15" rx="4" fill={it.color} />
                      <rect x="11" y="17" width="10" height="5" rx="1.5" fill="rgba(0,0,0,0.18)" />
                    </>
                  ) : (
                    <>
                      <rect x="8" y="12" width="16" height="13" rx="1.5" fill={it.color} />
                      <rect x="10" y="12" width="2" height="13" fill="rgba(0,0,0,0.25)" />
                      <rect x="14" y="16" width="8" height="2" fill="#f4efe4" />
                    </>
                  )}
                  <circle cx="26" cy="7" r="5" fill="#e0a526" />
                  <text x="26" y="10.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1c1a17">?</text>
                </g>
              </g>
            ))}
            <g style={{ transform: `translate(${state.pos.x * T}px, ${state.pos.y * T}px)`, transition: 'transform 150ms linear' }}>
              <g transform={state.facing === 'left' ? 'translate(32 0) scale(-1 1)' : undefined}>
                <SpriteBody look={look} mood={state.recovered.length ? 'normal' : 'mute'} />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px]" aria-label="Objetivos para el jefe">
        <span className="font-semibold uppercase tracking-wide text-paper/50">Para el jefe:</span>
        <span className={`rounded-full px-2 py-0.5 ${keys >= scene.keysNeeded ? 'bg-hp/20 text-hp' : 'bg-panel-2 text-paper/70'}`}>
          Llaves {keys}/{scene.keysNeeded}
        </span>
        <span className={`rounded-full px-2 py-0.5 ${state.opened.includes('school-whistle') ? 'bg-hp/20 text-hp' : 'bg-panel-2 text-paper/70'}`}>
          {state.opened.includes('school-whistle') ? '✓ ' : ''}Silbato
        </span>
        <span className={`rounded-full px-2 py-0.5 ${state.opened.includes('school-registration') ? 'bg-hp/20 text-hp' : 'bg-panel-2 text-paper/70'}`}>
          {state.opened.includes('school-registration') ? '✓ ' : ''}Uniforme
        </span>
      </div>

      {lf.started && lf.returned.length < LOST_ITEMS.length && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs">
          <span className="font-semibold text-gold">Misión: objetos perdidos ({lf.returned.length}/{LOST_ITEMS.length})</span>
          <span className="text-paper/70">
            {lf.carrying ? `Llevas: ${LOST_ITEMS.find((it) => it.id === lf.carrying)!.noun}` : 'Busca la mochila y el libro'}
          </span>
        </div>
      )}

      <div className="min-h-[76px]">
        {msg ? (
          <Panel className={`anim-fade-in py-3 ${msg.tone === 'good' ? 'border-hp/70' : msg.tone === 'warn' ? 'border-gold/70' : ''}`}>
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[16px] font-semibold">{msg.text}</p>
              {msg.say && <SpeakButton text={msg.say} size="sm" />}
            </div>
            {msg.sub && <p className="mt-0.5 text-sm text-paper/70">{msg.sub}</p>}
          </Panel>
        ) : (
          <p className="px-1 pt-2 text-sm text-paper/55">
            {firstVisit
              ? `Los estudiantes de ${scene.name.toLowerCase()} guardan tus palabras. Vence a los ${scene.keysNeeded} que tienen las llaves de la sala de profesores, consigue el silbato del entrenador y matricúlate en la secretaría.`
              : 'Choca con personas para hablar y con objetos para ver su nombre en inglés. Lee el tablón del aula y repasa vocabulario en la biblioteca.'}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between pb-2">
        <div className="flex flex-col gap-2">
          <button className={`${btn} relative px-3 text-sm`} onClick={() => setNotebook(true)}>
            Cuaderno
            {state.mistakes.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white">
                {state.mistakes.length}
              </span>
            )}
          </button>
          <OutfitButton state={state} update={update} />
        </div>
        <DPad onMove={move} disabled={blocked} />
      </div>

      {talk && talkFriend && (
        <Overlay>
          <ConversationView
            friend={talkFriend}
            lines={talk.lines}
            title={talk.title}
            level={talk.level}
            state={state}
            onDone={(delta) => {
              const t = talk
              setTalk(null)
              if (t.quest === 'lostIntro') {
                update((s) => ({ ...s, lostFound: { ...s.lostFound, started: true } }))
                setMsg({ text: 'Nueva misión: objetos perdidos.', sub: 'Busca la mochila de Maya y el libro de Leo por la escuela.', tone: 'good' })
                return
              }
              if (t.story !== null) {
                const index = t.story
                update((s) => completeStory(s, t.friendId, index, delta))
                const reward = FRIEND_REWARDS[t.friendId]?.[index + 1]
                setMsg({
                  text: delta < 0 ? `${talkFriend.name} se quedó un poco confundido, pero la historia sigue.` : `Tu amistad con ${talkFriend.name} creció.`,
                  sub: reward,
                  tone: delta < 0 ? 'warn' : 'good',
                })
              } else {
                update((s) => applyCasual(s, t.friendId, delta))
                if (t.note) setMsg({ text: `${talkFriend.name} quiere contarte algo, pero aún no le entiendes.`, sub: t.note, tone: 'warn' })
                else if (delta < 0) setMsg({ text: `${talkFriend.name} no te entendió. La amistad bajó un poco.`, tone: 'warn' })
              }
            }}
          />
        </Overlay>
      )}

      {activity === 'vocab' && (
        <Overlay>
          <VocabActivity
            state={state}
            onClose={(passed) => {
              setActivity(null)
              if (passed && state.items.shield < 2) {
                update((s) => ({ ...s, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
                setMsg({ text: 'Ganaste un escudo de palabras.', sub: 'En el próximo combate bloqueará un error sin perder vida.', tone: 'good' })
              }
            }}
          />
        </Overlay>
      )}

      {activity === 'sports' && (
        <Overlay>
          <VocabActivity
            state={state}
            words={SPORTS_VOCAB}
            place="Patio · Coach Mike"
            title="Palabras de deportes"
            rewardText="El entrenador te da un escudo de palabras: bloquea un error en combate."
            onClose={(passed) => {
              setActivity(null)
              if (!passed) {
                setMsg({ text: 'Coach Mike: "Try again! You can do it!"', sub: '¡Inténtalo otra vez! Necesitas 4 aciertos.', say: 'Try again! You can do it!' })
                return
              }
              if (!state.opened.includes('school-whistle')) {
                update((s) => ({ ...s, opened: [...s.opened, 'school-whistle'] }))
                setMsg({
                  text: 'Coach Mike: "Great job! Take my whistle. Show it to Mr. Grimm."',
                  sub: '¡Buen trabajo! Toma mi silbato y muéstraselo al profesor Grimm. Conseguiste el silbato.',
                  tone: 'good',
                  say: 'Great job! Take my whistle. Show it to Mr. Grimm.',
                })
              } else if (state.items.shield < 2) {
                update((s) => ({ ...s, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
                setMsg({ text: 'Coach Mike: "Great job! You are a good player!"', sub: 'Ganaste un escudo de palabras.', tone: 'good', say: 'Great job! You are a good player!' })
              }
            }}
          />
        </Overlay>
      )}

      {activity === 'registration' && (
        <Overlay>
          <Registration
            state={state}
            onClose={(finished) => {
              setActivity(null)
              if (finished) {
                update((s) => ({
                  ...s,
                  opened: [...s.opened, 'school-registration'],
                  outfits: s.outfits.includes('uniforme') ? s.outfits : [...s.outfits, 'uniforme'],
                  outfit: 'uniforme',
                }))
                setMsg({ text: 'Recibiste tu carnet y el uniforme escolar.', sub: 'Ya lo llevas puesto. Puedes cambiarlo en Atuendos.', tone: 'good' })
              }
            }}
          />
        </Overlay>
      )}

      {activity === 'reading' && (
        <Overlay>
          <ReadingActivity
            state={state}
            onClose={(finished) => {
              setActivity(null)
              if (finished) {
                update((s) => ({
                  ...s,
                  opened: [...s.opened, 'school-reading'],
                  outfits: s.outfits.includes('gafas') ? s.outfits : [...s.outfits, 'gafas'],
                }))
                setMsg({ text: 'Desbloqueaste: Gafas de lectura.', sub: 'Póntelas desde el menú de atuendos.', tone: 'good' })
              }
            }}
          />
        </Overlay>
      )}

      {friendsOpen && <FriendsPanel state={state} onClose={() => setFriendsOpen(false)} />}

      {notebook && <Notebook state={state} update={update} onClose={() => setNotebook(false)} />}

      {ask && (
        <Overlay>
          <LostAsk
            item={LOST_ITEMS.find((it) => it.id === ask.itemId)!}
            npcId={ask.npcId}
            npcName={ask.npcName}
            onDone={(returned) => {
              const a = ask
              setAsk(null)
              if (!returned) return
              const item = LOST_ITEMS.find((it) => it.id === a.itemId)!
              const allDone = lf.returned.length + 1 >= LOST_ITEMS.length
              update((s) => {
                let next = {
                  ...s,
                  lostFound: { ...s.lostFound, carrying: null, returned: [...s.lostFound.returned, item.id] },
                  friendship: { ...s.friendship, [item.owner]: Math.min(30, (s.friendship[item.owner] ?? 0) + 2) },
                }
                if (allDone) {
                  next = {
                    ...next,
                    outfits: next.outfits.includes('rosada') ? next.outfits : [...next.outfits, 'rosada'],
                    items: { ...next.items, shield: Math.min(2, next.items.shield + 1) },
                  }
                }
                return next
              })
              setMsg(
                allDone
                  ? { text: '¡Misión completa! Devolviste todo.', sub: 'Maya te regala una camiseta rosada y ganas un escudo de palabras. Tu amistad con Maya y Leo creció.', tone: 'good' }
                  : { text: `Devolviste ${item.es}.`, sub: 'La amistad subió. Sigue buscando el otro objeto.', tone: 'good' },
              )
            }}
          />
        </Overlay>
      )}

      {lesson && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-ink">
          <Lesson
            state={state}
            steps={LESSONS[lesson.topic] ?? []}
            title="Leo te alcanza antes del combate"
            onDone={() => {
              const { topic, enemyId } = lesson
              update((s) => ({ ...s, seenLesson: s.seenLesson.includes(topic) ? s.seenLesson : [...s.seenLesson, topic] }))
              setLesson(null)
              onBattle(enemyId)
            }}
          />
        </div>
      )}
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
