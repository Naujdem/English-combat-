import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DialogLine, Entity, GameState } from '../game/types'
import type { Update } from '../game/store'
import { SCENES, bossDoorOpen, friendById, heroLook } from '../game/helpers'
import { OUTFITS } from '../data/school'
import { ENEMIES } from '../data/enemies'
import { LESSONS } from '../data/lessons'
import { Lesson } from '../components/Lesson'
import type { TopicId } from '../game/types'
import { applyCasual, completeStory, FRIEND_REWARDS, talkTo } from '../game/social'
import { ReadingActivity, Timetable, VocabActivity } from '../components/Activities'
import { nextSession, SESSIONS, sessionFor } from '../data/schedule'
import { SPORTS_VOCAB } from '../data/activities'
import { Chest, FLOOR, T, Tile, VOCAB, walkable } from '../components/Tiles'
import { SpriteBody } from '../components/Sprite'
import { DPad } from '../components/DPad'
import { Joystick } from '../components/Joystick'
import { useDesktop } from '../game/device'
import { SpeakButton } from '../components/SpeakButton'
import { ConversationView } from '../components/Conversation'
import { FriendsPanel } from '../components/FriendsPanel'
import { Notebook } from '../components/Notebook'
import { LostAsk } from '../components/LostAsk'
import { LOST_INTRO, LOST_ITEMS } from '../data/lostFound'
import { NPCS } from '../data/npcs'
import { Registration } from '../components/Registration'
import { WhereIsIt } from '../components/WhereIsIt'
import { sfx } from '../game/sfx'
import { Tappable } from '../components/Words'
import { CoachSays } from '../components/CoachSays'
import { Directions } from '../components/Directions'
import { CafeOrder } from '../components/CafeOrder'
import { MiniTalk } from '../components/MiniTalk'
import { NPC_TASKS, PARTY_ITEMS, taskOf } from '../data/tasks'
import { PartyAsk } from '../components/PartyAsk'
import { AnimalSprite, ANIMALS } from '../components/Animals'
import { GuessAnimal } from '../components/GuessAnimal'
import { AnimalPens } from '../components/AnimalPens'
import { Planner } from '../components/Planner'
import { Attendance } from '../components/Attendance'
import { SoundSacks } from '../components/SoundSacks'
import { VerbBook } from '../components/VerbBook'
import { Mystery } from '../components/Mystery'
import { Timeline } from '../components/Timeline'
import { LessonPlan } from '../components/LessonPlan'
import { TourPlan } from '../components/TourPlan'
import { voiceOf, type Voice } from '../game/speech'
import { btn, btnGhost, Hearts, KeyIcon, Overlay, Panel } from '../components/ui'

const VIEW = 11

/** Quién habla en un mensaje 'Nombre: "..."', para leerlo con voz de hombre o de mujer */
function voiceFor(text: string, state: GameState): Voice {
  const m = /^([^:"]{2,40}): "/.exec(text)
  if (!m) return 'neutral'
  const name = m[1].trim()
  const npc = Object.values(NPCS).find((n) => n.name === name)
  if (npc) return voiceOf(npc.look)
  const enemy = Object.values(ENEMIES).find((e) => e.person === name)
  if (enemy) return voiceOf(enemy.look)
  if (name === state.interest.name) return state.interest.gender === 'female' ? 'female' : 'male'
  if (name === 'Maya') return 'female'
  return 'male'
}

/** sub = nota en español que siempre se ve · es = traducción de lo que se dice, se ve al tocar Traducir */
type Msg = { text: string; sub?: string; es?: string; tone?: 'info' | 'good' | 'warn'; say?: string }
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
  // (o antes de una actividad que enseña un tema nuevo)
  const [lesson, setLesson] = useState<{ topics: TopicId[]; enemyId?: string; then?: 'where' | 'coach' | 'directions' | 'cafe'; task?: string } | null>(null)
  // Tarea de un personaje (charla corta con elecciones), ver data/tasks.ts
  const [task, setTask] = useState<string | null>(null)
  // Misión de la fiesta de Leo (barrio): lo que falta y a quién se le está preguntando
  const [party, setParty] = useState<{ id: string; name: string; voice: Voice } | null>(null)
  // La mesa de la fiesta se llena cuando ya está todo
  const partyReady = scene.id !== 'barrio' || state.opened.includes('party-ready')
  const partyMissing = useMemo(
    () => (scene.id === 'barrio' && state.opened.includes('party-started') && !state.opened.includes('party-ready') ? PARTY_ITEMS.filter((it) => !state.opened.includes(`party-${it.id}`)).map((it) => it.id) : []),
    [scene.id, state.opened],
  )
  const firstVisit = !state.seenLesson.includes(scene.id)
  const doorOpen = bossDoorOpen(state, scene)
  const keys = state.keys[scene.id] ?? 0
  const [activity, setActivity] = useState<'vocab' | 'reading' | 'registration' | 'sports' | 'timetable' | 'where' | 'coach' | 'directions' | 'cafe' | 'sorry' | null>(null)
  const boardNext = nextSession(state.opened, state.defeated)
  const npcTurn = useRef<Record<string, number>>({})
  // La traducción de lo que dicen los personajes se ve solo si se pide
  const [showEs, setShowEs] = useState(false)
  // Controles: flechas o joystick, a elección (se recuerda en este dispositivo)
  const desktop = useDesktop()
  const [controls, setControls] = useState<'dpad' | 'joystick'>(() => {
    try {
      return localStorage.getItem('english-combat-controls') === 'joystick' ? 'joystick' : 'dpad'
    } catch {
      return 'dpad'
    }
  })
  const [notebook, setNotebook] = useState(false)
  // Preguntar "Is this your...?" mientras llevas un objeto perdido
  const [ask, setAsk] = useState<{ itemId: string; npcId: string; npcName: string } | null>(null)
  const lf = state.lostFound
  const lostOnMap = lf.started && scene.id === 'school' ? LOST_ITEMS.filter((it) => !lf.picked.includes(it.id)) : []
  const blocked = !!talk || friendsOpen || !!lesson || !!activity || notebook || !!ask || !!task || !!party

  // Sonido al conseguir algo (llave, objeto, recompensa)
  useEffect(() => {
    if (msg?.tone === 'good') sfx('item')
  }, [msg])

  const rows = scene.map.length
  const cols = scene.map[0].length

  const alive = useMemo(
    () =>
      scene.entities.filter((e) => {
        // Los enemigos vencidos se quedan en el mapa como estudiantes normales
        if (e.type === 'chest') return !state.opened.includes(e.id)
        // Los esbirros que vinieron del presente vuelven a su tiempo al ser vencidos
        if (e.type === 'enemy' && ENEMIES[e.id]?.echo && state.defeated.includes(e.id)) return false
        return true
      }),
    [scene, state.defeated, state.opened],
  )

  // En la granja de 1996 el molino está quieto hasta resolver el misterio
  const windmillStill = scene.id === 'farm-past' && !state.opened.includes('past-mystery')
  const tiles = useMemo(
    () =>
      scene.map.flatMap((row, y) =>
        row.split('').map((c, x) => <Tile key={`${x}-${y}`} c={c} x={x} y={y} floor={FLOOR[scene.zoneAt(x, y)]} doorOpen={doorOpen} party={partyReady} still={windmillStill} />),
      ),
    [scene, doorOpen, partyReady, windmillStill],
  )

  const interact = useCallback(
    (e: Entity) => {
      if (e.type === 'npc') {
        const npc = NPCS[e.id]
        const pend = taskOf(e.id, state.opened)
        if (pend && !pend.blocked) {
          const t = pend.task
          setMsg(null)
          if (t.lesson && !state.seenLesson.includes(t.lesson)) setLesson({ topics: [t.lesson], task: pend.id })
          else setTask(pend.id)
          return
        }
        if (partyMissing.length && e.id !== 'joe') {
          setMsg(null)
          setParty({ id: e.id, name: npc.name, voice: voiceOf(npc.look) })
          return
        }
        if (pend?.blocked && pend.task.requires?.text) {
          const req = pend.task.requires
          setMsg({ text: req.text, es: req.es, sub: req.sub, tone: 'warn' })
          return
        }
        if (e.id === 'secretary' && !state.opened.includes('school-registration')) {
          setMsg(null)
          setActivity('registration')
        } else if (e.id === 'ana' && !state.opened.includes('school-supplies')) {
          // Ana ayuda a encontrar los útiles: preposiciones de lugar
          setMsg(null)
          if (!state.seenLesson.includes('prepositions')) setLesson({ topics: ['prepositions'], then: 'where' })
          else setActivity('where')
        } else if (e.id === 'rosa' && !state.opened.includes('city-map')) {
          // La oficial Rosa: there is / there are y direcciones
          setMsg(null)
          if (!state.seenLesson.includes('there-is')) setLesson({ topics: ['there-is'], then: 'directions' })
          else setActivity('directions')
        } else if (e.id === 'lily' && !state.opened.includes('city-coffee')) {
          // Lily, la cajera del café: pedir con Can I have...?
          setMsg(null)
          if (!state.seenLesson.includes('ordering')) setLesson({ topics: ['ordering'], then: 'cafe' })
          else setActivity('cafe')
        } else if (e.id === 'mia' && !state.opened.includes('city-sorry')) {
          // Mia choca contigo: pedir disculpas y responder
          setMsg(null)
          setActivity('sorry')
        } else if (e.id === 'coach') {
          setMsg(null)
          // La primera vez, el entrenador da órdenes (imperativos) antes del repaso de deportes
          if (!state.opened.includes('school-commands')) {
            if (!state.seenLesson.includes('imperatives')) setLesson({ topics: ['imperatives'], then: 'coach' })
            else setActivity('coach')
          } else setActivity('sports')
        } else if (npc.lines) {
          // Los estudiantes de ambiente dicen una frase distinta cada vez
          const k = npcTurn.current[e.id] ?? 0
          npcTurn.current[e.id] = k + 1
          const line = npc.lines[k % npc.lines.length]
          setMsg({ text: `${npc.name}: "${line.text}"`, es: line.es, say: line.text })
        } else if (npc.doneLine) {
          setMsg({ text: `${npc.name}: "${npc.doneLine.text}"`, es: npc.doneLine.es, say: npc.doneLine.text })
        }
        return
      }
      // Si llevas un objeto perdido, le preguntas a quien sea si es suyo
      const talkable = e.type === 'friend' || e.type === 'interest' || ((e.type === 'enemy' || e.type === 'boss') && state.defeated.includes(e.id))
      if (lf.carrying && talkable && scene.id === 'school') {
        const npcId = e.type === 'friend' ? e.id : e.type === 'interest' ? 'interest' : e.id
        const npcName = e.type === 'friend' || e.type === 'interest' ? friendById(state, npcId)!.name : ENEMIES[e.id].person
        setMsg(null)
        setAsk({ itemId: lf.carrying, npcId, npcName })
        return
      }
      // Preparando la fiesta de Leo: a cualquiera se le puede preguntar "Have you got...?"
      if (talkable && partyMissing.length) {
        const pid = e.type === 'friend' ? e.id : e.type === 'interest' ? 'interest' : e.id
        const f = e.type === 'friend' || e.type === 'interest' ? friendById(state, pid)! : null
        const name = f ? f.name : ENEMIES[pid].person
        setMsg(null)
        setParty({ id: pid, name, voice: f ? voiceOf(f.look) : voiceOf(ENEMIES[pid].look) })
        return
      }
      if ((e.type === 'enemy' || e.type === 'boss') && state.defeated.includes(e.id)) {
        const def = ENEMIES[e.id]
        setMsg({ text: `${def.person}: "${def.freed.text}"`, es: def.freed.es, say: def.freed.text })
        return
      }
      // El profesor Grimm no pelea si te falta el silbato o el uniforme
      if (e.type === 'boss') {
        const missing = scene.requirements.filter((r) => !state.opened.includes(r.id))
        if (missing.length > 0) {
          const first = missing[0]
          setMsg({
            text: `${ENEMIES[e.id].person}: "${first.line.text}"`,
            es: first.line.es,
            sub: `Te falta: ${missing.map((m) => m.name).join(', ')}.`,
            tone: 'warn',
            say: first.line.text,
          })
          return
        }
      }
      // Cada esbirro pide la tiza de su sesión del horario para aceptar el combate
      if (e.type === 'enemy') {
        const ses = sessionFor(e.id)
        if (ses && !state.opened.includes(ses.id)) {
          const person = ENEMIES[e.id].person
          setMsg({
            text: `${person}: "You need a piece of chalk to challenge me! Read the class schedule on the board."`,
            sub: `¡Necesitas una tiza para retarme! Lee el horario de ${ses.subjectEs.toLowerCase()} en la pizarra del aula.`,
            tone: 'warn',
            say: 'You need a piece of chalk to challenge me! Read the class schedule on the board.',
          })
          return
        }
      }
      if (e.type === 'enemy' || e.type === 'boss') {
        setMsg(null)
        const unseen = ENEMIES[e.id].topics.filter((t) => !state.seenLesson.includes(t) && LESSONS[t])
        if (unseen.length) setLesson({ topics: unseen, enemyId: e.id })
        else onBattle(e.id)
        return
      }
      if (e.type === 'animal') {
        const a = ANIMALS[e.kind]
        setMsg({ text: `${a.en[0].toUpperCase()}${a.en.slice(1)}: "${a.sound}"`, sub: `${a.en} = ${a.es} · plural: ${a.plural}`, say: a.en })
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
      if (id === 'maya' && scene.id === 'school' && !lf.started && (state.talks.maya ?? 0) >= 1) {
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
    [lf.carrying, onBattle, state, update, partyMissing],
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
        const q = item.whose ? `Whose ${item.en} is this?` : `Is this your ${item.en}?`
        setMsg({ text: `Encontraste ${item.es}. ¿De quién será?`, sub: `Pregúntale a la gente: "${q}"`, tone: 'good', say: q })
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
          text: scene.door?.text ?? 'La puerta de la sala de profesores está cerrada.',
          sub: scene.door?.sub ?? `Necesitas ${scene.keysNeeded} llaves. Los estudiantes que guardan tus palabras las tienen.`,
          tone: 'warn',
        })
        return
      }
      if (c === 'L' && scene.id === 'school') {
        setMsg(null)
        setActivity('vocab')
        return
      }
      if (c === 'B' && scene.id === 'school-past') {
        // En 1996, alguien escribió algo en la pizarra
        setMsg({
          text: 'En la pizarra, con letra temblorosa, alguien escribió: "Be brave. Use your voice."',
          sub: 'Sé valiente. Usa tu voz. Es la misma frase de la tarjeta del cumpleaños de Leo...',
          say: 'Be brave. Use your voice.',
          tone: 'warn',
        })
        return
      }
      if (c === 'e' && scene.id === 'city-past') {
        // La cabina donde el desconocido quiso llamar
        setMsg({
          text: 'Una cabina de teléfono vieja. El teléfono cuelga del cable y todavía se balancea.',
          sub: 'Alguien levantó el teléfono hace poco... y no dijo nada.',
          say: 'phone box',
          tone: 'warn',
        })
        return
      }
      if (c === 'Z' && scene.id === 'city-future') {
        setMsg({
          text: 'Una estatua junto a la fuente vieja. Dice: "Tony Rossi, the best guide in town. Thank you, Tony!".',
          sub: 'Tony, el repartidor de 1996... y el señor Rossi del presente.',
          say: 'Tony Rossi, the best guide in town.',
        })
        return
      }
      if (c === 'B' && scene.id === 'school') {
        // La pizarra del aula tiene el horario de clases por sesiones
        setMsg(null)
        if (boardNext.session) {
          setActivity('reading')
        } else if (boardNext.blockedBy) {
          const who = ENEMIES[boardNext.blockedBy].person
          setMsg({
            text: 'La pizarra: la siguiente parte del horario está borrosa.',
            sub: `Vence a ${who} para que aparezca la siguiente clase. Toca otra vez la pizarra para ver tu horario.`,
            tone: 'warn',
          })
          setActivity(msg?.text.startsWith('La pizarra') ? 'timetable' : null)
        } else {
          setActivity('timetable')
        }
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
    if (id === 'maya' && scene.id === 'school' && !lf.started && (state.talks.maya ?? 0) >= 1) return true
    return talkTo(state, f).kind === 'story'
  }

  return (
    <div className={`relative mx-auto flex h-full flex-col gap-2 overflow-y-auto px-3 py-2 ${desktop ? 'max-w-5xl' : 'max-w-md'}`}>
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

      {/* En PC: mapa grande a la izquierda y panel a la derecha. En el celular: una columna */}
      <div className={desktop ? 'flex min-h-0 flex-1 items-start justify-center gap-5' : 'contents'}>
      {/* El mapa se achica en pantallas bajas para que no tape los controles */}
      <div
        className="mx-auto w-full shrink-0 overflow-hidden rounded-2xl border-2 border-line bg-ink"
        style={{ maxWidth: desktop ? 'min(100%, calc(100svh - 110px))' : 'min(100%, 44svh)', ...(desktop ? { flex: '1 1 auto', margin: 0 } : {}) }}
      >
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
            {scene.id === 'school' && boardNext.session && (
              <g transform={`translate(${3 * T + 22} 2)`} className="anim-bob">
                <circle cx="5" cy="5" r="5.5" fill="#e0a526" />
                <text x="5" y="8.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1c1a17">!</text>
              </g>
            )}
            {alive.map((e) => {
              const key = `${e.type}-${e.x}-${e.y}`
              if (e.type === 'chest') return <Chest key={key} x={e.x} y={e.y} />
              if (e.type === 'animal') {
                return (
                  <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                    <g transform={(e.x + e.y) % 2 ? 'translate(32 0) scale(-1 1)' : undefined}>
                      <AnimalSprite kind={e.kind} />
                    </g>
                  </g>
                )
              }
              if (e.type === 'enemy' || e.type === 'boss') {
                const def = ENEMIES[e.id]
                if (state.defeated.includes(e.id)) {
                  return (
                    <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                      {def.animal ? <AnimalSprite kind={def.animal} /> : <SpriteBody look={{ ...def.look, ...(def.id === 'barrio-boss' ? { skin: state.hero.look.skin, hair: state.hero.look.hair } : {}) }} />}
                    </g>
                  )
                }
                return (
                  <g key={key} transform={`translate(${e.x * T} ${e.y * T})`}>
                    <g transform="translate(32 0) scale(-1 1)">
                      <g className="anim-bob">
                        {def.animal ? <AnimalSprite kind={def.animal} /> : <SpriteBody look={{ ...def.look, ...(def.id === 'barrio-boss' ? { skin: state.hero.look.skin, hair: state.hero.look.hair } : {}) }} />}
                      </g>
                    </g>
                    <rect x="4" y="-3" width="24" height="3.5" rx="1.5" fill={e.type === 'boss' ? '#7a4fa3' : '#d64545'} />
                  </g>
                )
              }
              if (e.type === 'npc') {
                const pending =
                  (e.id === 'secretary' && !state.opened.includes('school-registration')) ||
                  (e.id === 'coach' && !state.opened.includes('school-whistle')) ||
                  (e.id === 'ana' && !state.opened.includes('school-supplies')) ||
                  (e.id === 'rosa' && !state.opened.includes('city-map')) ||
                  (e.id === 'lily' && !state.opened.includes('city-coffee')) ||
                  (e.id === 'mia' && !state.opened.includes('city-sorry')) ||
                  (() => {
                    const p = taskOf(e.id, state.opened)
                    return !!p && !p.blocked
                  })()
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

      <div className={desktop ? 'flex h-full w-80 shrink-0 flex-col gap-3' : 'contents'}>
      <div className={`flex flex-wrap items-center gap-1.5 ${desktop ? 'text-xs' : 'text-[11px]'}`} aria-label="Objetivos para el jefe">
        <span className="font-semibold uppercase tracking-wide text-paper/50">Para el jefe:</span>
        {scene.chips(state).map((c) => (
          <span key={c.label} className={`rounded-full px-2 py-0.5 ${c.done ? 'bg-hp/20 text-hp' : 'bg-panel-2 text-paper/70'}`}>
            {c.done && !/\d/.test(c.label) ? '✓ ' : ''}{c.label}
          </span>
        ))}
      </div>

      {scene.id === 'school' && lf.started && lf.returned.length < LOST_ITEMS.length && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs">
          <span className="font-semibold text-gold">Misión: objetos perdidos ({lf.returned.length}/{LOST_ITEMS.length})</span>
          <span className="text-paper/70">
            {lf.carrying ? `Llevas: ${LOST_ITEMS.find((it) => it.id === lf.carrying)!.noun}` : 'Busca la mochila y el libro'}
          </span>
        </div>
      )}

      <div className="min-h-[76px] shrink-0">
        {msg ? (
          <Panel className={`anim-fade-in py-3 ${msg.tone === 'good' ? 'border-hp/70' : msg.tone === 'warn' ? 'border-gold/70' : ''}`}>
            <div className="flex items-start gap-2">
              <p className="flex-1 text-[16px] font-semibold">
                {msg.say && msg.text.includes(msg.say) ? (
                  <>
                    {msg.text.slice(0, msg.text.indexOf(msg.say))}
                    <Tappable text={msg.say} />
                    {msg.text.slice(msg.text.indexOf(msg.say) + msg.say.length)}
                  </>
                ) : (
                  msg.text
                )}
              </p>
              {msg.say && <SpeakButton text={msg.say} size="sm" auto voice={voiceFor(msg.text, state)} />}
            </div>
            {msg.es && showEs && <p className="mt-0.5 text-sm text-paper/60">{msg.es}</p>}
            {msg.sub && <p className="mt-0.5 text-sm text-paper/70">{msg.sub}</p>}
            {msg.es && (
              <button className="mt-1 text-xs font-semibold text-paper/55 underline underline-offset-4" onClick={() => setShowEs((v) => !v)}>
                {showEs ? 'Ocultar traducción' : 'Traducir'}
              </button>
            )}
          </Panel>
        ) : (
          <p className="px-1 pt-2 text-sm text-paper/55">
            {firstVisit ? scene.intro.first : scene.intro.later}
          </p>
        )}
      </div>

      <div className="mt-auto flex shrink-0 items-end justify-between pb-2">
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
        {desktop ? (
          <p className="max-w-[10rem] text-right text-xs leading-snug text-paper/55">
            Muévete con las flechas del teclado o <b>W A S D</b>. Camina hacia alguien para hablar.
          </p>
        ) : (
        <div className="flex flex-col items-end gap-1">
          <button
            className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold text-paper/65"
            onClick={() => {
              const next = controls === 'dpad' ? 'joystick' : 'dpad'
              setControls(next)
              try {
                localStorage.setItem('english-combat-controls', next)
              } catch {
                /* sin almacenamiento */
              }
            }}
          >
            {controls === 'dpad' ? 'Usar joystick' : 'Usar flechas'}
          </button>
          {controls === 'dpad' ? <DPad onMove={move} disabled={blocked} /> : <Joystick onMove={move} disabled={blocked} />}
        </div>
        )}
      </div>
      </div>
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

      {activity === 'where' && (
        <Overlay>
          <WhereIsIt
            onClose={(done) => {
              setActivity(null)
              if (!done) return
              update((s) => ({ ...s, opened: s.opened.includes('school-supplies') ? s.opened : [...s.opened, 'school-supplies'] }))
              setMsg({
                text: 'Ana: "Now you have your pencil, your book and your notebook. See you in class!"',
                sub: 'Ahora tienes tu lápiz, tu libro y tu cuaderno. ¡Nos vemos en clase! Conseguiste tus útiles escolares.',
                tone: 'good',
                say: 'Now you have your pencil, your book and your notebook. See you in class!',
              })
            }}
          />
        </Overlay>
      )}

      {activity === 'directions' && (
        <Overlay>
          <Directions
            onClose={(done) => {
              setActivity(null)
              if (!done) return
              update((s) => ({ ...s, opened: s.opened.includes('city-map') ? s.opened : [...s.opened, 'city-map'] }))
              setMsg({
                text: 'Officer Rosa: "The tourist office is next to the fountain. Good luck!"',
                sub: 'La oficina de turismo está al lado de la fuente. ¡Suerte! Conseguiste el mapa de la ciudad.',
                tone: 'good',
                say: 'The tourist office is next to the fountain. Good luck!',
              })
            }}
          />
        </Overlay>
      )}

      {activity === 'sorry' && (
        <Overlay>
          <MiniTalk
            name="Mia"
            look={NPCS.mia.look}
            steps={[
              { text: 'Oh! Sorry! I am in a hurry!', es: '¡Oh! ¡Perdón! ¡Tengo prisa!', choice: { ask: 'Mia chocó contigo. ¿Qué le dices?', options: ["That's OK!", "You're welcome!", 'Nice to meet you!'], answer: 0, tip: 'Cuando alguien pide perdón, se responde "That\'s OK!" (no pasa nada).' } },
              { text: 'Excuse me... Is there a bank near here?', es: 'Disculpa... ¿Hay un banco cerca de aquí?', choice: { ask: 'Hay un banco en Main Street. ¿Qué le respondes?', options: ['Yes, there are a bank.', "Yes, there is. It's on Main Street.", 'No, there have.'], answer: 1, tip: 'Una cosa: Yes, there is. Y dile dónde: It\'s on Main Street.' } },
              { text: 'Thank you so much! Have a nice day!', es: '¡Muchas gracias! ¡Que tengas un buen día!', choice: { ask: '¿Qué le respondes?', options: ['You too! Bye!', 'Sorry!', 'How much is it?'], answer: 0, tip: 'Cuando te desean un buen día: "You too!" (igualmente).' } },
            ]}
            onClose={(done) => {
              setActivity(null)
              if (!done) return
              update((s) => ({ ...s, opened: s.opened.includes('city-sorry') ? s.opened : [...s.opened, 'city-sorry'], items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
              setMsg({ text: 'Mia: "Bye!"', es: '¡Adiós!', sub: 'Ayudaste a Mia. Ganaste un escudo de palabras.', tone: 'good', say: 'Bye!' })
            }}
          />
        </Overlay>
      )}

      {activity === 'cafe' && (
        <Overlay>
          <CafeOrder
            name={state.hero.name}
            onClose={(done) => {
              setActivity(null)
              if (!done) return
              update((s) => ({ ...s, opened: s.opened.includes('city-coffee') ? s.opened : [...s.opened, 'city-coffee'] }))
              setMsg({ text: 'Tienes el café negro del señor Rossi.', sub: 'Llévaselo a la oficina de turismo, al lado de la fuente.', tone: 'good' })
            }}
          />
        </Overlay>
      )}

      {activity === 'coach' && (
        <Overlay>
          <CoachSays
            look={heroLook(state)}
            onClose={(done) => {
              if (!done) {
                setActivity(null)
                setMsg({ text: 'Coach Mike: "Come back when you are ready!"', sub: '¡Vuelve cuando estés listo!', say: 'Come back when you are ready!' })
                return
              }
              update((s) => ({ ...s, opened: s.opened.includes('school-commands') ? s.opened : [...s.opened, 'school-commands'] }))
              setActivity('sports')
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

      {activity === 'reading' && boardNext.session && (
        <Overlay>
          <ReadingActivity
            state={state}
            session={boardNext.session}
            minionName={ENEMIES[boardNext.session.minion].person}
            onClose={(finished) => {
              const ses = boardNext.session!
              setActivity(null)
              if (!finished) return
              const last = ses.id === SESSIONS[SESSIONS.length - 1].id
              update((s) => ({
                ...s,
                opened: [...s.opened, ses.id],
                outfits: last && !s.outfits.includes('gafas') ? [...s.outfits, 'gafas'] : s.outfits,
              }))
              setMsg({
                text: `Conseguiste una tiza para retar a ${ENEMIES[ses.minion].person}.`,
                sub: last ? 'Completaste el horario. También encontraste unas gafas de lectura: póntelas en Atuendos.' : 'Cuando lo venzas, aparecerá la siguiente clase en la pizarra.',
                tone: 'good',
              })
            }}
          />
        </Overlay>
      )}

      {activity === 'timetable' && (
        <Overlay onClose={() => setActivity(null)}>
          <Panel>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-xl">Tu horario</h2>
              <button className={btnGhost} onClick={() => setActivity(null)}>Cerrar</button>
            </div>
            <Timetable opened={state.opened} />
            <p className="mt-2 text-xs text-paper/60">
              {SESSIONS.every((x) => state.opened.includes(x.id)) ? 'Horario completo.' : 'Las clases con ? aparecen al leer las siguientes sesiones.'}
            </p>
          </Panel>
        </Overlay>
      )}

      {party && (
        <Overlay>
          <PartyAsk
            name={party.name}
            personId={party.id}
            voice={party.voice}
            missing={partyMissing}
            onClose={() => setParty(null)}
            onGot={(itemId) => {
              const done = partyMissing.length === 1 && partyMissing[0] === itemId
              update((s) => ({ ...s, opened: [...s.opened, `party-${itemId}`, ...(done ? ['party-ready'] : [])] }))
              setMsg(
                done
                  ? { text: '¡Tienes todo para la fiesta!', sub: 'El pastel, los globos y la radio. Vuelve con el abuelo Joe, al lado de la mesa del parque.', tone: 'good' }
                  : { text: `Conseguiste ${PARTY_ITEMS.find((it) => it.id === itemId)!.es}.`, sub: 'Sigue preguntando a los vecinos: Have you got...?', tone: 'good' },
              )
            }}
          />
        </Overlay>
      )}

      {task && NPC_TASKS[task] && (
        <Overlay>
          {(() => {
            const t = NPC_TASKS[task]
            const finish = (done: boolean) => {
              setTask(null)
              if (!done) return
              update((s) => ({
                ...s,
                opened: s.opened.includes(t.done) ? s.opened : [...s.opened, t.done],
                items: t.shield ? { ...s.items, shield: Math.min(2, s.items.shield + 1) } : s.items,
                outfits: t.outfit && !s.outfits.includes(t.outfit) ? [...s.outfits, t.outfit] : s.outfits,
              }))
              setMsg({ text: t.reward.text, es: t.reward.es, sub: t.reward.sub, say: t.reward.say, tone: 'good' })
            }
            if (t.activity === 'guess') return <GuessAnimal onClose={finish} />
            if (t.activity === 'pens') return <AnimalPens onClose={finish} />
            if (t.activity === 'planner') return <Planner onClose={finish} />
            if (t.activity === 'attendance') return <Attendance onClose={finish} />
            if (t.activity === 'sounds') return <SoundSacks onClose={finish} />
            if (t.activity === 'tour') return <TourPlan onClose={finish} />
            if (t.activity === 'plan') return <LessonPlan onClose={finish} />
            if (t.activity === 'timeline') return <Timeline onClose={finish} />
            if (t.activity === 'mystery') return <Mystery onClose={finish} />
            if (t.activity === 'verbs') return <VerbBook state={state} update={update} onClose={finish} />
            if (t.activity === 'vocab' && t.vocab)
              return <VocabActivity state={state} words={t.vocab.words} place={t.vocab.place} title={t.vocab.title} rewardText={t.reward.sub} onClose={finish} />
            const who = NPCS[t.npc ?? task]
            return <MiniTalk name={who.name} look={who.look} steps={t.steps} onClose={finish} />
          })()}
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
            voice={voiceFor(`${ask.npcName}: "`, state)}
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
            steps={lesson.topics.flatMap((t) => (LESSONS[t] ?? []).map((st) => ({ ...st, topic: t })))}
            title={lesson.enemyId ? 'Leo te alcanza antes del combate' : 'Leo te ayuda'}
            onDone={() => {
              const { topics, enemyId, then, task: taskId } = lesson
              update((s) => ({ ...s, seenLesson: [...s.seenLesson, ...topics.filter((t) => !s.seenLesson.includes(t))] }))
              setLesson(null)
              if (enemyId) onBattle(enemyId)
              else if (then) setActivity(then)
              else if (taskId) setTask(taskId)
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
