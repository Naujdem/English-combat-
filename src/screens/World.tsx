import { useState, type ReactNode } from 'react'
import type { GameState } from '../game/types'
import { WORLD, type WorldNode, PRESENT_NODES, nodesOf } from '../data/world'
import { useTeacher } from '../game/teacher'
import { TOPICS } from '../data/questions'
import { SpriteBody } from '../components/Sprite'
import { FriendsPanel } from '../components/FriendsPanel'
import { btn, btnGhost, btnPrimary, Hearts, Overlay, Panel } from '../components/ui'
import { ClockPieces, coreStolen, TimeClock } from '../components/TimeClock'
import { Diary } from '../components/Diary'
import { Flashcards } from '../components/Flashcards'
import { BIKE_TO_FARM, BusRide, BUS_TO_BARRIO, BUS_TO_CITY, BUS_TO_OFFICE, CLOCK_TO_1996, CLOCK_TO_2056, SKYBUS_TO_CITY_2056, SKYBUS_TO_BARRIO_2056, SKYBUS_TO_FARM_2056, SKYBUS_TO_TOWER_2056, WALK_TO_OLD_CITY, WALK_TO_GREEN_1996, WALK_TO_FARM_1996, WALK_TO_CINEMA_1996, type BusTrip } from '../components/BusRide'

/** Cómo se llega la primera vez a cada lugar */
const TRIPS: Record<string, BusTrip> = { city: BUS_TO_CITY, barrio: BUS_TO_BARRIO, farm: BIKE_TO_FARM, office: BUS_TO_OFFICE, 'school-past': CLOCK_TO_1996, 'city-past': WALK_TO_OLD_CITY, 'barrio-past': WALK_TO_GREEN_1996, 'farm-past': WALK_TO_FARM_1996, 'office-past': WALK_TO_CINEMA_1996, 'school-future': CLOCK_TO_2056, 'city-future': SKYBUS_TO_CITY_2056, 'barrio-future': SKYBUS_TO_BARRIO_2056, 'farm-future': SKYBUS_TO_FARM_2056, 'office-future': SKYBUS_TO_TOWER_2056 }
import { ProgressView, Review } from '../components/Review'
import { setSound, soundOn } from '../game/sfx'
import { autoVoiceOn, setAutoVoice } from '../game/speech'
import { ALL_DIARY as DIARY, pageNotified, pageSeen, unlockedPages } from '../data/diary'
import { dueCards } from '../game/cards'
import { B1_PREFIX, isA2Unlocked, type Update } from '../game/store'
import { B1Map } from '../components/B1Map'
import { LooseFragment } from '../components/FragmentJoin'
import { B1_HOME_ID, B1_NODES, B1_OPENING, B1_PART_NAMES, B1_ERA_COLOR, b1LockedText, b1Message, b1NodeDone, b1NodeOpen, isB1Unlocked, type B1Node, type B1Part } from '../data/b1World'
import { heroLook, SCENES } from '../game/helpers'
import { interestFriend } from '../data/friends'
import { clockCoreMissing } from '../data/a2Hospital'
import { A2_CITY_ID, A2_03_CLOSE, isA2CityUnlocked } from '../data/a2City'
import { A2_WORKSHOP_ID, A2_04_CLOSE, isA2WorkshopUnlocked } from '../data/a2Workshop'
import { A2_LIBRARY_ID, A2_05_CLOSE, isA2LibraryUnlocked } from '../data/a2Library'
import { A2_FARM_PAST_ID, A2_06_CLOSE, isA2FarmPastUnlocked } from '../data/a2FarmPast'
import { A2_RACE_ID, A2_07_CLOSE, isA2RaceUnlocked } from '../data/a2Race'
import { A2_CAR_ID, A2_08_CLOSE, isA2CarUnlocked } from '../data/a2Car'
import { A2_MILL_ID, A2_09_CLOSE, isA2MillUnlocked } from '../data/a2Mill'
import { A2_LEO_HOUSE_ID, A2_10_CLOSE, isA2LeoHouseUnlocked } from '../data/a2LeoHouse'
import { A2_PARTY_ID, A2_S3_CLOSE, isA2PartyUnlocked } from '../data/a2Party'
import { A2_MARKET_ID, A2_S4_CLOSE, isA2MarketUnlocked } from '../data/a2Market'
import { A2_DINNER_ID, A2_S5_CLOSE, isA2DinnerUnlocked } from '../data/a2Dinner'
import { A2_FUTURE_ID, A2_11_CLOSE, isA2FutureUnlocked } from '../data/a2Future'
import { A2_CONTROL_ID, A2_12_CLOSE, isA2ControlUnlocked } from '../data/a2Control'
import { A2_RETURN_ID, A2_13_CLOSE, isA2ReturnUnlocked } from '../data/a2Return'
import { useDesktop } from '../game/device'
import { Achievements } from '../components/Achievements'
import { ACHIEVEMENTS, achieved } from '../data/collection'
import { EraExam, EXAMS, type EraId } from '../components/EraExam'

/** Primera escena de A2 (no está en el mapa del mundo para no cambiar el reloj ni los conteos de A1) */
const A2_START = 'a2-hospital'

const ERA_COLOR = { Presente: '#3b9d5d', Pasado: '#c98b4a', Futuro: '#5d8fd4' } as const

/**
 * Mapa de nodos de A2: una misión por lugar, en orden. Se abre cada uno al cerrar el anterior.
 * Se ve en tres partes (pestañas): 1 presente (1-4), 2 pasado (5-8), 3 en franjas presente/futuro/presente (9-12).
 * En el mapa se numeran del 1 al 12 (sin el código A2-xx).
 * Parte 4 (pestaña "Extras"): misiones secundarias, después de A2-13. Se marcan con una estrella en vez de número.
 */
type A2Node = { id: string; sceneId: string; name: string; mission: string; era: keyof typeof ERA_COLOR; part: 1 | 2 | 3 | 4; x: number; y: number; open: (s: GameState) => boolean; done: (s: GameState) => boolean; locked: string }
const A2_NODES: A2Node[] = [
  { id: 'hospital', sceneId: A2_START, name: 'Hospital', mission: 'A2-01', era: 'Presente', part: 1, x: 90, y: 110, open: isA2Unlocked, done: isA2CityUnlocked, locked: 'Termina A1 para llegar aquí.' },
  { id: 'city', sceneId: A2_CITY_ID, name: 'Ciudad', mission: 'A2-03', era: 'Presente', part: 1, x: 270, y: 110, open: isA2CityUnlocked, done: (s) => s.opened.includes(A2_03_CLOSE), locked: 'Se abre al salir del hospital.' },
  { id: 'workshop', sceneId: A2_WORKSHOP_ID, name: 'Taller', mission: 'A2-04', era: 'Presente', part: 1, x: 90, y: 260, open: isA2WorkshopUnlocked, done: (s) => s.opened.includes(A2_04_CLOSE), locked: 'Se abre al terminar el día en la ciudad.' },
  { id: 'library', sceneId: A2_LIBRARY_ID, name: 'Biblioteca', mission: 'A2-05', era: 'Presente', part: 1, x: 270, y: 260, open: isA2LibraryUnlocked, done: (s) => s.opened.includes(A2_05_CLOSE), locked: 'Se abre al terminar en el taller del señor Hale.' },
  { id: 'farm', sceneId: A2_FARM_PAST_ID, name: 'Granja River', mission: 'A2-06', era: 'Pasado', part: 2, x: 90, y: 110, open: isA2FarmPastUnlocked, done: (s) => s.opened.includes(A2_06_CLOSE), locked: 'Se abre al terminar en la biblioteca.' },
  { id: 'race', sceneId: A2_RACE_ID, name: 'Hipódromo', mission: 'A2-07', era: 'Pasado', part: 2, x: 270, y: 110, open: isA2RaceUnlocked, done: (s) => s.opened.includes(A2_07_CLOSE), locked: 'Se abre al terminar en la granja River.' },
  { id: 'road', sceneId: A2_CAR_ID, name: 'Camino', mission: 'A2-08', era: 'Pasado', part: 2, x: 270, y: 260, open: isA2CarUnlocked, done: (s) => s.opened.includes(A2_08_CLOSE), locked: 'Se abre al terminar en el hipódromo.' },
  { id: 'mill', sceneId: A2_MILL_ID, name: 'Molino', mission: 'A2-09', era: 'Pasado', part: 2, x: 90, y: 260, open: isA2MillUnlocked, done: (s) => s.opened.includes(A2_09_CLOSE), locked: 'Se abre al terminar en el camino.' },
  { id: 'leo-house', sceneId: A2_LEO_HOUSE_ID, name: 'Casa de Leo', mission: 'A2-10', era: 'Presente', part: 3, x: 180, y: 52, open: isA2LeoHouseUnlocked, done: (s) => s.opened.includes(A2_10_CLOSE), locked: 'Se abre al terminar en el molino.' },
  { id: 'city-2056', sceneId: A2_FUTURE_ID, name: 'Ciudad 2056', mission: 'A2-11', era: 'Futuro', part: 3, x: 90, y: 178, open: isA2FutureUnlocked, done: (s) => s.opened.includes(A2_11_CLOSE), locked: 'Se abre al terminar en la casa de Leo.' },
  { id: 'control-2056', sceneId: A2_CONTROL_ID, name: 'Centro de control', mission: 'A2-12', era: 'Futuro', part: 3, x: 270, y: 178, open: isA2ControlUnlocked, done: (s) => s.opened.includes(A2_12_CLOSE), locked: 'Se abre al terminar en la ciudad de 2056.' },
  { id: 'hospital-return', sceneId: A2_RETURN_ID, name: 'Hospital', mission: 'A2-13', era: 'Presente', part: 3, x: 180, y: 305, open: isA2ReturnUnlocked, done: (s) => s.opened.includes(A2_13_CLOSE), locked: 'Se abre al terminar en el centro de control.' },
  // Misiones secundarias (parte 4, "Extras")
  { id: 'party', sceneId: A2_PARTY_ID, name: 'Make a Wish', mission: 'Secundaria', era: 'Presente', part: 4, x: 100, y: 130, open: isA2PartyUnlocked, done: (s) => s.opened.includes(A2_S3_CLOSE), locked: 'Se abre al terminar A2.' },
  { id: 'market', sceneId: A2_MARKET_ID, name: 'Market Day', mission: 'Secundaria', era: 'Presente', part: 4, x: 260, y: 240, open: isA2MarketUnlocked, done: (s) => s.opened.includes(A2_S4_CLOSE), locked: 'Se abre al terminar A2.' },
  { id: 'dinner', sceneId: A2_DINNER_ID, name: 'A Dinner to Remember', mission: 'Secundaria', era: 'Presente', part: 4, x: 110, y: 300, open: isA2DinnerUnlocked, done: (s) => s.opened.includes(A2_S5_CLOSE), locked: 'Se abre al terminar A2.' },
]

export function World({ state, update, onEnter, onTitle }: { state: GameState; update: Update; onEnter: (sceneId: string) => void; onTitle: () => void }) {
  const desktop = useDesktop()
  // Modo profesor: abre las épocas de A1 y todas las misiones de A2 para revisarlas sin jugar lo anterior
  const teacher = useTeacher().on
  const [msg, setMsg] = useState<string>(
    state.sceneId.startsWith(B1_PREFIX) && (isB1Unlocked(state) || teacher)
      ? b1Message(state)
      : state.opened.includes(A2_13_CLOSE) && !(state.opened.includes(A2_S3_CLOSE) && state.opened.includes(A2_S4_CLOSE) && state.opened.includes(A2_S5_CLOSE))
      ? '¡A2 completado! El núcleo del reloj brilla, pero no está lleno. En la pestaña Extras hay misiones secundarias: una fiesta sorpresa, un día de rebajas en la tienda de ropa y una cena en casa de Leo. B1 ya está disponible en la pestaña B1.'
      : state.opened.includes(A2_13_CLOSE)
      ? '¡A2 completado! El núcleo del reloj brilla, pero no está lleno. B1 ya está disponible en la pestaña B1.'
      : isA2ReturnUnlocked(state)
      ? 'A2-13 · The Missing Voice: el reloj te lleva de vuelta al hospital donde empezó A2. Leo te espera en el pasillo.'
      : isA2ControlUnlocked(state) && !state.opened.includes(A2_12_CLOSE)
      ? 'A2-12 · Out of Control: Adrián cerró todas las rutas de 2056. Leo te espera en la sala de boletos del centro de control.'
      : isA2FutureUnlocked(state) && !state.opened.includes(A2_11_CLOSE)
      ? 'A2-11 · The City of Tomorrow: sigues la señal del reloj hasta la ciudad de 2056. La carreta River debería estar en el museo del transporte.'
      : isA2LeoHouseUnlocked(state) && !state.opened.includes(A2_10_CLOSE)
      ? 'A2-10 · Echoes Across Time: de vuelta en el presente, Leo te espera en su casa para juntar todas las pistas.'
      : isA2MillUnlocked(state) && !state.opened.includes(A2_09_CLOSE)
      ? 'A2-09 · The Silent Mill: vuelves a la granja de los River, en el pasado. El molino junto al río está en silencio. Leo te espera allí.'
      : isA2CarUnlocked(state) && !state.opened.includes(A2_08_CLOSE)
      ? 'A2-08 · El Carro que se Detuvo: después de la carrera, el carro se detiene en un camino viejo. Leo y JoJo están contigo.'
      : isA2RaceUnlocked(state) && !state.opened.includes(A2_07_CLOSE)
      ? 'A2-07 · The Great Race: el trozo del estandarte de los River te recuerda otra carrera. Leo te espera en un viejo hipódromo del pasado.'
      : isA2FarmPastUnlocked(state) && !state.opened.includes(A2_06_CLOSE)
      ? 'A2-06 · A Tradition at Risk: Leo te espera en la granja de la familia River. Elena quiere recuperar una vieja tradición.'
      : isA2LibraryUnlocked(state) && !state.opened.includes(A2_05_CLOSE)
      ? "A2-05 · Words That Don't Belong: Leo te espera en la biblioteca de la ciudad. Ayer pasaron cosas raras con las palabras de los libros."
      : isA2WorkshopUnlocked(state) && !state.opened.includes(A2_04_CLOSE)
      ? "A2-04 · Mr. Hale's Workshop: después del reloj extraño de la plaza, Leo te espera en el taller del señor Hale."
      : isA2CityUnlocked(state) && !state.opened.includes(A2_03_CLOSE)
      ? 'A2-03 · Day in the City: saliste del hospital. Leo te espera en la ciudad.'
      : state.defeated.includes('office-future-boss')
      ? coreStolen(state.defeated)
        ? '¡Terminaste A1! Tus cinco piezas y tus fragmentos de voz siguen contigo, pero el desconocido se llevó el núcleo del reloj. Tu historia sigue en A2, en el hospital; también puedes repasar y visitar cualquier lugar de A1.'
        : '¡Terminaste A1! Tu voz está completa: presente, pasado y futuro. A2 empieza en el hospital; también puedes repasar y visitar cualquier lugar de A1.'
      : state.defeated.includes('farm-future-boss')
      ? 'Recuperaste cuatro fragmentos de voz del futuro. Toma el Sky Bus hasta la torre Green Valley: el último lugar de A1.'
      : state.defeated.includes('barrio-future-boss')
      ? 'Recuperaste tres fragmentos de voz del futuro. Toma el Sky Bus hasta la granja de 2056.'
      : state.defeated.includes('city-future-boss')
      ? 'Recuperaste dos fragmentos de voz del futuro. Toma el Sky Bus hasta Green Street: cumple 60 años.'
      : state.defeated.includes('school-future-boss')
      ? 'Recuperaste el primer fragmento de voz del futuro. Toma el Sky Bus hasta la ciudad de 2056.'
      : state.defeated.includes('office-past-boss')
      ? '¡Terminaste A1 en pasado! Ahora el reloj puede llevarte al futuro: abre la pestaña Futuro y viaja a la escuela de 2056.'
      : state.defeated.includes('farm-past-boss')
      ? 'Recuperaste cuatro fragmentos de voz del pasado. Sigue por la carretera hasta el viejo cine: el último lugar del pasado.'
      : state.defeated.includes('barrio-past-boss')
      ? 'Recuperaste tres fragmentos de voz del pasado. Sigue por el camino viejo hasta la granja de 1996.'
      : state.defeated.includes('city-past-boss')
      ? 'Recuperaste dos fragmentos de voz del pasado. Sigue a pie hasta Green Street: en 1996 la están construyendo.'
      : state.defeated.includes('school-past-boss')
      ? 'Recuperaste el primer fragmento de voz. Sigue por la carretera destapada hasta la ciudad de 1996.'
      : state.defeated.includes('office-boss')
      ? '¡Terminaste A1 en presente! El reloj está completo y puede llevarte al pasado: abre la pestaña Pasado y viaja a la escuela de 1996.'
      :'Toca un lugar del mapa para viajar.',
  )
  const [friends, setFriends] = useState(false)
  const [clock, setClock] = useState(false)
  // Cuando se abre una página del diario (al terminar un lugar en cualquier época), el diario se abre solo una vez
  const pages = unlockedPages(state.opened)
  const freshPage = pages.some((p) => !pageNotified(state.opened, p.chapter, p.version))
  const newPages = pages.filter((p) => !pageSeen(state.opened, p.chapter, p.version)).length
  const [diary, setDiary] = useState(freshPage)
  const [cards, setCards] = useState(false)
  const [logros, setLogros] = useState(false)
  const [exam, setExam] = useState<EraId | null>(null)
  const [menu, setMenu] = useState(false)
  const a2NodeOpen = (n: A2Node) => (teacher || n.open(state)) && !!SCENES[n.sceneId]
  // Nivel del mapa: al terminar A1 se puede elegir entre A1 y A2
  const a2Open = teacher || isA2Unlocked(state)
  // B1: la pestaña aparece al terminar A2-13 (o en modo profesor). No se cambia de pestaña sola al terminar A2.
  const b1Open = teacher || isB1Unlocked(state)
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1'>(
    b1Open && state.sceneId.startsWith(B1_PREFIX) ? 'B1' : a2Open && A2_NODES.some((n) => n.sceneId === state.sceneId) ? 'A2' : 'A1',
  )
  // Partes de B1: una parte aparece cuando alguno de sus lugares está abierto (antes de la apertura se ve la parte 1 cerrada)
  const b1PartsOpen = ([1, 2, 3, 4] as const).filter((p) => B1_NODES.some((n) => n.part === p && b1NodeOpen(n, state)))
  const b1Parts: B1Part[] = b1PartsOpen.length ? [...b1PartsOpen] : [1]
  const b1Next = B1_NODES.find((n) => n.num && b1NodeOpen(n, state) && !b1NodeDone(n, state)) ?? [...B1_NODES].reverse().find((n) => n.num && b1NodeOpen(n, state))
  const [b1Part, setB1Part] = useState<B1Part>(b1Next?.part ?? 1)
  function tapB1(n: B1Node) {
    const label = n.num ? `${n.num}. ${n.name}` : `★ ${n.name}`
    if (!b1NodeOpen(n, state)) return setMsg(`${label} está cerrado. ${b1LockedText(n)}`)
    setMsg(`${n.name}: este lugar se construirá pronto.`)
  }
  const a2Here = A2_NODES.find((n) => n.sceneId === state.sceneId) ?? [...A2_NODES].reverse().find((n) => n.open(state) && SCENES[n.sceneId]) ?? A2_NODES[0]
  // Épocas de A2: se ve una a la vez (pestañas), como en A1. Solo aparecen las épocas que ya tienen una misión abierta.
  const a2Parts = ([1, 2, 3, 4] as const).filter((p) => A2_NODES.some((n) => n.part === p && a2NodeOpen(n)))
  const [a2Part, setA2Part] = useState<A2Node['part']>(a2Here.part)
  const a2Shown = A2_NODES.filter((n) => n.part === a2Part)
  /** Número del lugar en el mapa (1 a 12); las misiones secundarias llevan una estrella */
  const a2Num = (n: A2Node) => (n.part === 4 ? '★' : String(A2_NODES.indexOf(n) + 1))
  /** Franjas de fondo: la parte 3 tiene presente, futuro y presente; las otras, un solo color */
  const A2_BG = { Presente: '#2a3a24', Pasado: '#4a3a24', Futuro: '#1f2c40' } as const
  const a2Bands: { era: A2Node['era']; y: number; h: number }[] =
    a2Part === 3 ? [{ era: 'Presente', y: 0, h: 126 }, { era: 'Futuro', y: 126, h: 128 }, { era: 'Presente', y: 254, h: 126 }] : [{ era: a2Part === 2 ? 'Pasado' : 'Presente', y: 0, h: 380 }]
  function tapA2(n: A2Node) {
    if (!a2NodeOpen(n)) return setMsg(`${a2Num(n)}. ${n.name} está cerrado. ${n.locked}`)
    onEnter(n.sceneId)
  }
  const exams = (Object.keys(EXAMS) as EraId[]).filter((e) => state.opened.includes(EXAMS[e].unlock))
  const pendingExam = exams.find((e) => !state.writings?.[e])
  // Viaje en autobús la primera vez que se va a un lugar (ciudad o barrio)
  const [bus, setBus] = useState<string | null>(null)
  const [review, setReview] = useState(false)
  const [progress, setProgress] = useState(false)
  const [sound, setSoundState] = useState(soundOn())
  const [voice, setVoiceState] = useState(autoVoiceOn())
  const [settings, setSettings] = useState(false)
  const coreMissing = clockCoreMissing(state) || coreStolen(state.defeated)
  const hasDiary = DIARY.some((c) => state.opened.includes(c.unlock))
  const dueCount = dueCards(state.cards).length

  const menuAlert = dueCount > 0 || !!pendingExam || newPages > 0
  /** Cierra el menú y abre lo elegido */
  function go(open: () => void) {
    setMenu(false)
    open()
  }

  function openDiary() {
    setDiary(true)
  }
  function closeDiary() {
    setDiary(false)
    // Ya se avisó de todas las páginas abiertas; las que no se leyeron siguen marcadas como nuevas
    update((s) => {
      const add = [
        ...unlockedPages(s.opened).map((p) => `diary-notified-${p.version.id}`),
        ...DIARY.filter((c) => s.opened.includes(c.unlock)).map((c) => `diary-open-${c.id}`),
      ].filter((x) => !s.opened.includes(x))
      return add.length ? { ...s, opened: [...s.opened, ...add] } : s
    })
  }
  const here = WORLD.find((n) => n.sceneId === state.sceneId) ?? WORLD[0]
  // Épocas: el pasado aparece cuando el reloj está completo (o en modo profesor)
  const pastOpen = teacher || state.defeated.includes('office-boss')
  const [era, setEra] = useState<WorldNode['era']>(here.era)
  const shownNodes = nodesOf(era)
  const pastFragments = nodesOf('Pasado').filter((n) => state.defeated.includes(`${n.id}-boss`)).length
  const futureOpen = teacher || state.defeated.includes('office-past-boss')
  const futureFragments = nodesOf('Futuro').filter((n) => state.defeated.includes(`${n.id}-boss`)).length

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
    if (TRIPS[n.id] && !state.opened.includes(`bus-${n.id}`)) return setBus(n.id)
    onEnter(n.sceneId)
  }

  return (
    <div className={`relative mx-auto flex h-full flex-col gap-3 overflow-y-auto px-3 py-3 ${desktop ? 'max-w-5xl' : 'max-w-md'}`}>
      <header className="flex items-center justify-between">
        <button className={`${btnGhost} relative flex items-center gap-1.5`} onClick={() => setMenu(true)} aria-label={`Menú${menuAlert ? ' (hay cosas nuevas)' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
          Menú
          {menuAlert && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-gold" />}
        </button>
        <Hearts hp={state.hp} max={state.maxHp} />
        <button className={btnGhost} onClick={() => setFriends(true)}>Amigos</button>
      </header>

      {a2Open && (
        <div className="flex gap-1.5" role="tablist" aria-label="Nivel">
          {(b1Open ? (['A1', 'A2', 'B1'] as const) : (['A1', 'A2'] as const)).map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={level === l}
              className={`flex-1 rounded-xl border-2 px-3 py-1.5 font-display text-[16px] ${level === l ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/70'}`}
              onClick={() => {
                setLevel(l)
                if (l === 'B1') setMsg(b1Message(state))
              }}
            >
              Nivel {l}
            </button>
          ))}
        </div>
      )}

      {level === 'A2' && a2Parts.length > 1 && (
        <div className="flex gap-1.5" role="tablist" aria-label="Partes de A2">
          {a2Parts.map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={a2Part === p}
              className={`rounded-full border-2 px-3 py-1 text-sm font-semibold ${a2Part === p ? 'border-transparent text-ink' : 'border-line text-paper/70'}`}
              style={a2Part === p ? { background: p === 2 ? ERA_COLOR.Pasado : p === 3 ? ERA_COLOR.Futuro : ERA_COLOR.Presente } : undefined}
              onClick={() => setA2Part(p)}
            >
              {p === 4 ? 'Extras' : `Parte ${p}`}
            </button>
          ))}
        </div>
      )}

      {level === 'B1' && b1Parts.length > 1 && (
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Partes de B1">
          {b1Parts.map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={b1Part === p}
              className={`rounded-full border-2 px-3 py-1 text-sm font-semibold ${b1Part === p ? 'border-transparent text-ink' : 'border-line text-paper/70'}`}
              style={b1Part === p ? { background: p === 4 ? B1_ERA_COLOR.Presente : B1_ERA_COLOR.Recuerdo } : undefined}
              onClick={() => setB1Part(p)}
            >
              {B1_PART_NAMES[p]}
            </button>
          ))}
        </div>
      )}
      {level === 'B1' && b1Parts.length === 1 && <p className="text-center text-sm font-semibold text-paper/70">{B1_PART_NAMES[b1Parts[0]]}</p>}

      {level === 'A1' && pastOpen && (
        <div className="flex gap-1.5" role="tablist" aria-label="Épocas">
          {(futureOpen ? (['Presente', 'Pasado', 'Futuro'] as const) : (['Presente', 'Pasado'] as const)).map((e) => (
            <button
              key={e}
              role="tab"
              aria-selected={era === e}
              className={`rounded-full border-2 px-3 py-1 text-sm font-semibold ${era === e ? 'border-transparent text-ink' : 'border-line text-paper/70'}`}
              style={era === e ? { background: ERA_COLOR[e] } : undefined}
              onClick={() => setEra(e)}
            >
              {e}
            </button>
          ))}
        </div>
      )}

      <div className={desktop ? 'grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_21rem] items-start gap-5' : 'contents'}>
      {level === 'B1' ? (
        <B1Map state={state} part={b1Parts.includes(b1Part) ? b1Part : b1Parts[0]} onTap={tapB1} style={desktop ? { height: 'calc(100svh - 96px)' } : { aspectRatio: '360 / 380' }} />
      ) : level === 'A2' ? (
      <svg
        viewBox="0 0 360 380"
        className="w-full shrink-0 rounded-2xl border-2 border-line bg-[#2a2236]"
        style={desktop ? { height: 'calc(100svh - 96px)' } : { aspectRatio: '360 / 380' }}
        role="img"
        aria-label="Mapa de A2"
      >
        {a2Bands.map((b, i) => (
          <g key={i}>
            <rect x="0" y={b.y} width="360" height={b.h} fill={A2_BG[b.era]} />
            <text x="12" y={b.y + 18} fontSize="11" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700" fill={ERA_COLOR[b.era]}>{b.era}</text>
          </g>
        ))}
        {a2Bands.length > 1 && <path d="M0 126 H360 M0 254 H360" stroke="#f4efe4" strokeOpacity="0.25" strokeWidth="2" />}
        <polyline points={a2Shown.map((n) => `${n.x},${n.y}`).join(' ')} fill="none" stroke="#e8dcc8" strokeOpacity="0.55" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
        {a2Shown.map((n) => {
          const open = a2NodeOpen(n)
          const done = n.done(state)
          return (
            <g key={n.id} onClick={() => tapA2(n)} className="cursor-pointer" role="button" aria-label={`${a2Num(n)}. ${n.name}, ${n.era}${done ? ', terminado' : ''}`}>
              <circle cx={n.x} cy={n.y} r="24" fill={open ? ERA_COLOR[n.era] : '#4a4238'} stroke={done ? '#e0a526' : '#f4efe4'} strokeWidth="3" />
              {open ? (
                <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontFamily="Fredoka, Nunito, system-ui, sans-serif" fontWeight="600" fill="#f4efe4">{a2Num(n)}</text>
              ) : (
                <g transform={`translate(${n.x - 7} ${n.y - 9})`}>
                  <rect x="0" y="7" width="14" height="11" rx="2" fill="#f4efe4" />
                  <path d="M3 7 V4.5 a4 4 0 0 1 8 0 V7" fill="none" stroke="#f4efe4" strokeWidth="2.2" />
                </g>
              )}
              <rect x={n.x - 58} y={n.y + 30} width="116" height="22" rx="8" fill="rgba(0,0,0,0.45)" />
              <text x={n.x} y={n.y + 46} textAnchor="middle" fontSize="13" fontFamily="Fredoka, Nunito, system-ui, sans-serif" fontWeight="600" fill="#f4efe4">{n.name}</text>
            </g>
          )
        })}
        {a2Here.part === a2Part && (
        <g transform={a2Part === 3 ? `translate(${a2Here.x - 74} ${a2Here.y - 30}) scale(1.15)` : `translate(${a2Here.x - 18} ${a2Here.y - 66}) scale(1.15)`} pointerEvents="none">
          <g className="anim-bob">
            <SpriteBody look={heroLook(state)} mood={state.recovered.length ? 'normal' : 'mute'} />
          </g>
        </g>
        )}
      </svg>
      ) : (
      <svg
        viewBox="0 0 360 380"
        className="w-full shrink-0 rounded-2xl border-2 border-line bg-[#24301f]"
        style={desktop ? { height: 'calc(100svh - 96px)' } : { aspectRatio: '360 / 380' }}
        role="img"
        aria-label="Mapa del mundo"
      >
        <path d="M0 0 H360 V380 H0Z" fill={era === 'Pasado' ? '#4a3a24' : era === 'Futuro' ? '#1f2c40' : '#2a3a24'} />
        {[...Array(18)].map((_, k) => (
          <circle key={k} cx={(k * 73) % 360} cy={(k * 131) % 380} r={10 + (k % 4) * 4} fill={era === 'Pasado' ? '#5a4a2e' : era === 'Futuro' ? '#2a3c58' : '#324a2a'} />
        ))}
        <polyline
          points={shownNodes.map((n) => `${n.x},${n.y}`).join(' ')}
          fill="none"
          stroke="#e8dcc8"
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        {shownNodes.map((n) => {
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
        {here.era === era && (
        <g transform={`translate(${here.x - 18} ${here.y - 66}) scale(1.15)`} pointerEvents="none">
          <g className="anim-bob">
            <SpriteBody look={heroLook(state)} mood={state.recovered.length ? 'normal' : 'mute'} />
          </g>
        </g>
        )}
      </svg>
      )}

      <div className={desktop ? 'flex flex-col gap-3' : 'contents'}>
      <Panel className="py-3">
        <p className="text-[15px] text-paper/85">{msg}</p>
      </Panel>

      {level === 'B1' ? (
        !state.opened.includes(B1_OPENING) ? (
          <button className={btnPrimary} onClick={() => onEnter(B1_HOME_ID)}>Contestar el teléfono</button>
        ) : (
          b1Next && <button className={btnPrimary} onClick={() => tapB1(b1Next)}>Entrar a {b1Next.num}. {b1Next.name}</button>
        )
      ) : level === 'A2' ? (
        <button className={btnPrimary} onClick={() => tapA2(a2Here)}>
          {state.sceneId === a2Here.sceneId ? 'Volver a' : 'Entrar a'} {a2Here.name}
        </button>
      ) : (
        <button className={btnPrimary} onClick={() => tap(here)}>Entrar a {here.name}</button>
      )}
      </div>
      </div>

      {diary && <Diary state={state} update={update} onClose={closeDiary} />}
      {bus && (
        <BusRide
          trip={TRIPS[bus]}
          hero={heroLook(state)}
          friend={interestFriend(state.interest, state.hero.name).look}
          friendName={state.interest.name}
          onDone={() => {
            const to = bus
            setBus(null)
            update((s) => ({ ...s, opened: [...s.opened, `bus-${to}`] }))
            onEnter(to)
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
      {logros && <Achievements state={state} onClose={() => setLogros(false)} />}
      {exam && (
        <EraExam
          era={exam}
          saved={state.writings?.[exam]}
          onClose={() => setExam(null)}
          onSave={(lines) => {
            update((s) => ({ ...s, writings: { ...(s.writings ?? {}), [exam]: lines } }))
            setExam(null)
          }}
        />
      )}

      {clock && (
        <Overlay onClose={() => setClock(false)}>
          <Panel>
            <div className="flex items-center justify-between">
              <p className="font-display text-xl text-gold">Reloj del tiempo</p>
              <button className={btnGhost} onClick={() => setClock(false)}>Cerrar</button>
            </div>
            <div className="my-3 flex items-center justify-center gap-3">
              <TimeClock pieces={state.relics} size={150} coreMissing={coreMissing} />
              {/* B1: un fragmento suelto espera en el reloj hasta juntarse con otro */}
              <LooseFragment count={state.looseFragments ?? 0} />
            </div>
            <p className="text-[15px] text-paper/85">
              El reloj del desconocido explotó y sus piezas se llevaron pedazos de tu voz. Quien toca una pieza se corrompe; tú no, porque es tu voz. Cada jefe tiene una.
              {coreMissing ? ' Las cinco piezas siguen en su lugar... pero el centro del reloj está vacío.' : state.relics >= PRESENT_NODES.length ? ' ¡Lo tienes completo! Ya puedes ir tras el desconocido.' : ' Con el reloj completo podrás alcanzar al desconocido y recuperar toda tu voz.'}
            </p>
            <div className="mt-3"><ClockPieces pieces={state.relics} /></div>
          </Panel>
        </Overlay>
      )}

      {friends && <FriendsPanel state={state} onClose={() => setFriends(false)} />}

      {menu && (
        <Overlay onClose={() => setMenu(false)}>
          <Panel className="max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl text-gold">Menú</p>
              <button className={btnGhost} onClick={() => setMenu(false)}>Volver al juego</button>
            </div>
            <p className="mt-1 text-xs text-paper/60">
              Palabras recuperadas: {state.recovered.length ? `${state.recovered.length} temas · la última: ${TOPICS[state.recovered[state.recovered.length - 1]].name}` : 'ninguna'}
            </p>
            <div className="mt-3 grid gap-2">
              <MenuRow icon={<TimeClock pieces={state.relics} size={34} coreMissing={coreMissing} />} title="Reloj del tiempo" sub={`Piezas ${Math.min(state.relics, PRESENT_NODES.length)}/${PRESENT_NODES.length}${pastOpen ? ` · Pasado ${pastFragments}/${nodesOf('Pasado').length}` : ''}${futureOpen ? ` · Futuro ${futureFragments}/${nodesOf('Futuro').length}` : ''}`} onClick={() => go(() => setClock(true))} />
              {exams.length > 0 && (
                <div className={`rounded-xl border-2 px-3 py-2 ${pendingExam ? 'border-gold bg-gold/10' : 'border-line'}`}>
                  <p className="font-display text-[16px]">✍ Exámenes de época {pendingExam && <span className="ml-1 rounded-full bg-gold px-2 text-xs text-ink">nuevo</span>}</p>
                  <p className="text-xs text-paper/60">Escribe 4 frases tuyas sobre lo que pasó.</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {exams.map((e) => (
                      <button key={e} className={`${btn} px-3 py-1 text-[14px]`} onClick={() => go(() => setExam(e))}>
                        {state.writings?.[e] ? '✓ ' : ''}{EXAMS[e].title.replace('Examen del ', '').replace(/^./, (c) => c.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <MenuRow icon="🗂" stack title="Fichas" sub={dueCount > 0 ? `${dueCount} para repasar` : `${state.cards.length} guardadas`} badge={dueCount > 0} onClick={() => go(() => setCards(true))} />
                <MenuRow icon="📖" stack title="Mi diario" sub={newPages > 1 ? `${newPages} páginas nuevas` : newPages === 1 ? 'Página nueva' : hasDiary ? 'Releer capítulos' : 'Aún vacío'} badge={newPages > 0} disabled={!hasDiary} onClick={() => go(openDiary)} />
                <MenuRow icon="🔁" stack title="Repasar" sub="Temas y errores" onClick={() => go(() => setReview(true))} />
                <MenuRow icon="📊" stack title="Mi progreso" sub="Aciertos por tema" onClick={() => go(() => setProgress(true))} />
              </div>
              <MenuRow icon="★" title="Logros y álbum" sub={`${ACHIEVEMENTS.filter((a) => achieved(a, state)).length} de ${ACHIEVEMENTS.length} logros`} onClick={() => go(() => setLogros(true))} />
              <div className="grid grid-cols-2 gap-2">
                <MenuRow icon="⚙" stack title="Ajustes" sub="Voz y sonidos" onClick={() => go(() => setSettings(true))} />
                <MenuRow icon="⏏" stack title="Salir" sub="Pantalla de título" onClick={() => go(onTitle)} />
              </div>
            </div>
          </Panel>
        </Overlay>
      )}
    </div>
  )
}

function MenuRow({ icon, title, sub, onClick, badge, disabled, stack }: { icon: ReactNode; title: string; sub?: string; onClick: () => void; badge?: boolean; disabled?: boolean; stack?: boolean }) {
  return (
    <button
      className={`${btn} relative flex gap-2.5 px-3 py-2 text-left ${stack ? 'flex-col items-start gap-1' : 'items-center'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`flex shrink-0 text-[22px] leading-none ${stack ? '' : 'w-9 justify-center'}`} aria-hidden="true">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[16px] leading-tight">{title}</span>
        {sub && <span className="block text-xs leading-snug text-paper/60">{sub}</span>}
      </span>
      {badge && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-gold" />}
    </button>
  )
}
