import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { RaceLeg } from '../components/SequenceMaster'

/**
 * B1 · Extras: Charity Run (misión secundaria, presente; se abre al cerrar la misión 8). Escena b1-s1-park.
 * Una carrera benéfica de 5 km para el refugio Lumen Paws, en el parque del puerto. La entrenadora Ilva corre con el
 * jugador y Lupe, la perra del refugio, corre al lado.
 * Orden: Ilva: lección 'charity-b1' (colocaciones de logros y past continuous + past simple) + práctica (b1-s1-coach) →
 *   Julian, en la línea de salida: la carrera (b1-s1-run, Sequence Master en modo carrera) →
 *   Ilva: el cierre (b1-s1-close): medalla, camiseta de corredor y el tema recuperado. Sin combates.
 */
export const B1_S1_PARK_ID = 'b1-s1-park'
export const B1_S1_ILVA = 'b1-s1-ilva'
export const B1_S1_LUPE = 'b1-s1-lupe'
export const B1_S1_JULIAN = 'b1-s1-julian'
export const B1_S1_COACH = 'b1-s1-coach'
export const B1_S1_RUN = 'b1-s1-run'
export const B1_S1_CLOSE = 'b1-s1-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): f cerca · , pasto · _ piedra (la pista) · Y árbol · H banca · p planta */
const MAP = [
  'ffffffffffff',
  'f,Y,,,,,Y,,f',
  'f,,,,,,,,,,f',
  'f__________f',
  'f,,,,,,,,,,f',
  'fp,,H,,H,,pf',
  'ffffffffffff',
]

const zoneAt = (): Zone => 'parque'
const TEXT = 'A sunny morning in the park. — Una mañana soleada en el parque.'

export const B1_S1_PARK: SceneDef = {
  id: B1_S1_PARK_ID,
  name: 'Charity Run · El parque del puerto',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_S1_ILVA, x: 3, y: 2 },
    { type: 'npc', id: B1_S1_LUPE, x: 4, y: 4 },
    { type: 'npc', id: B1_S1_JULIAN, x: 8, y: 2 },
  ],
  labels: [{ text: 'Start', x: 8, y: 3 }],
  zoneAt: () => zoneAt(),
  examine: {},
  locked: () => null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Ilva: logros y la carrera', done: s.opened.includes(B1_S1_COACH) },
    { label: 'La carrera', done: s.opened.includes(B1_S1_RUN) },
    { label: 'La medalla', done: s.opened.includes(B1_S1_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B1_S1_CLOSE) ? 'Charity Run. Extra completado.' : TEXT),
  },
}

/** La carrera (Sequence Master en modo carrera): 4 tramos, cada uno con un desafío */
export const B1_S1_LEGS: RaceLeg[] = [
  {
    title: 'Calentamiento',
    steps: [
      { en: 'Stretch your legs', es: 'Estira las piernas' },
      { en: 'Tie your shoes', es: 'Amárrate los zapatos' },
      { en: 'Go to the start line', es: 'Ve a la línea de salida' },
    ],
    challenge: { q: 'I ___ my shoes when the race started.', es: 'Me estaba amarrando los zapatos cuando empezó la carrera.', options: ['was tying', 'were tying', 'am tying'], answer: 0, tip: 'Acción larga en el pasado: was + verbo con -ing.' },
  },
  {
    title: 'Primer kilómetro',
    steps: [
      { en: 'Start slowly', es: 'Empieza despacio' },
      { en: 'Find your rhythm', es: 'Encuentra tu ritmo' },
      { en: 'Pass another runner', es: 'Pasa a otro corredor' },
    ],
    challenge: { q: 'I was running fast when I ___ Lupe next to me.', es: 'Iba corriendo rápido cuando vi a Lupe a mi lado.', options: ['was seeing', 'saw', 'see'], answer: 1, tip: 'La acción corta que interrumpe: pasado simple (saw).' },
  },
  {
    title: 'La subida',
    steps: [
      { en: 'Breathe deeply', es: 'Respira profundo' },
      { en: 'Climb the hill', es: 'Sube la colina' },
      { en: 'Drink some water', es: 'Toma un poco de agua' },
    ],
    challenge: { q: 'We are running to ___ money for the shelter.', es: 'Corremos para recaudar dinero para el refugio.', options: ['rise', 'grow', 'raise'], answer: 2, tip: 'Recaudar dinero: raise money.' },
  },
  {
    title: 'La meta',
    steps: [
      { en: 'See the finish line', es: 'Mira la meta' },
      { en: 'Run faster', es: 'Corre más rápido' },
      { en: 'Cross the finish line', es: 'Cruza la meta' },
    ],
    challenge: { q: 'I ran five kilometres in 28 minutes. I ___ my record!', es: 'Corrí cinco kilómetros en 28 minutos. ¡Superé mi marca!', options: ['beat', 'won', 'earned'], answer: 0, tip: 'Superar una marca: beat my record.' },
  },
]

/** El cierre con Ilva (b1-s1-close) */
export const B1_S1_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Ilva: You made it! I was watching you when you crossed the finish line.', es: 'Ilva: ¡Lo lograste! Te estaba mirando cuando cruzaste la meta.' },
  { who: 'narrator', text: '(Lupe is jumping around you. She ran the whole race.)', es: '(Lupe salta a tu alrededor. Corrió toda la carrera.)' },
  { who: 'narrator', text: 'Julian: Together we raised a lot of money for Lumen Paws. We achieved our goal!', es: 'Julian: Entre todos recaudamos mucho dinero para Lumen Paws. ¡Logramos nuestra meta!' },
  { who: 'narrator', text: 'Ilva: This medal is yours. And keep the running shirt. You earned it.', es: 'Ilva: Esta medalla es tuya. Y quédate con la camiseta de corredor. Te la ganaste.' },
]
