import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'

/**
 * B1-12 · Old Friends (presente). Bloque D (último): la plaza de Lumen Bay de noche (escena b1-12-plaza).
 * Se entra por la puerta derecha de la ciudad (b1-12-city, data/b1HostCity.ts) tras la charla con Einer.
 *
 * Una fuente en el centro, guirnaldas de luces y bancas. Los tres amigos están lejos unos de otros.
 * Orden: Leo: el guion inicial (b1-12-plaza-intro) → aparece The Rumor junto a la fuente (jefe, data/b1RumorBoss.ts; suelta
 *   el delantal de la abuela Jhoana) → aparece Jhoana y cierra la misión (b1-12-close = closeId(12); FragmentJoin abre el recuerdo 13).
 */
export const B1_12_PLAZA_ID = 'b1-12-plaza'
export const B1_12_PLAZA_LEO = 'b1-12-plaza-leo'
export const B1_12_PLAZA_MAYA = 'b1-12-plaza-maya'
export const B1_12_PLAZA_SPECIAL = 'b1-12-plaza-special'
export const B1_12_PLAZA_JHONA = 'b1-12-plaza-jhoana'
export const B1_12_PLAZA_INTRO = 'b1-12-plaza-intro'
export const B1_12_BOSS = 'b1-12-boss'
export const B1_12_CLOSE = closeId(12)
export const B1_12_FRAGMENTS = 'b1-12-fragments'
/** Texto de ayuda de las 4 escenas de la misión 12 (casa, jardín, ciudad y plaza) cuando ya está cerrada */
export const B1_12_DONE_TEXT = 'Old Friends. La misión 12 terminó: la misión 13 te espera en el mapa.'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): f cerca · h luces · _ piedra · w agua (la fuente) · H banca · p planta · d puerta.
 * Puerta a la ciudad a la izquierda (0,3).
 */
const MAP = [
  'fhfhfhfhfhff',
  'f_H______Hpf',
  'f____ww____f',
  'd____ww____f',
  'f__________f',
  'fp_H____H_pf',
  'ffffffffffff',
]

const zoneAt = (): Zone => 'parque'

export const B1_12_PLAZA: SceneDef = {
  id: B1_12_PLAZA_ID,
  name: 'Old Friends · La plaza',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_12_PLAZA_LEO, x: 2, y: 4 },
    { type: 'npc', id: B1_12_PLAZA_MAYA, x: 9, y: 2 },
    { type: 'npc', id: B1_12_PLAZA_SPECIAL, x: 7, y: 5 },
    { type: 'enemy', id: B1_12_BOSS, x: 7, y: 3, after: B1_12_PLAZA_INTRO },
    { type: 'npc', id: B1_12_PLAZA_JHONA, x: 4, y: 3 },
  ],
  labels: [{ text: 'The plaza', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {},
  locked: () => null,
  links: { '0,3': { sceneId: 'b1-12-city', pos: { x: 11, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Los amigos en la plaza', done: s.opened.includes(B1_12_PLAZA_INTRO) },
    { label: 'The Rumor', done: s.defeated.includes(B1_12_BOSS) },
    { label: 'El cierre', done: s.opened.includes(B1_12_CLOSE) },
  ],
  intro: {
    first: 'The plaza, at night. Something is wrong. — La plaza, de noche. Algo anda mal.',
    later: (s: GameState) => (s.opened.includes(B1_12_CLOSE) ? B1_12_DONE_TEXT : 'The plaza, at night. Something is wrong. — La plaza, de noche. Algo anda mal.'),
  },
}

/** El guion inicial en la plaza (Leo, secuencia fija). 'narrator' con el nombre de quien habla */
export const B1_12_PLAZA_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(In the plaza, your friends are standing far from each other. Nobody is talking.)', es: '(En la plaza, tus amigos están lejos unos de otros. Nadie habla.)' },
  { who: 'narrator', text: 'Leo: Somebody said that Maya was laughing at me.', es: 'Leo: Alguien dijo que Maya se estaba riendo de mí.' },
  { who: 'narrator', text: "Maya: Somebody said that Leo doesn't want to study with us.", es: 'Maya: Alguien dijo que Leo no quiere estudiar con nosotros.' },
  { who: 'narrator', text: 'Special person: Somebody said that I was going home without telling you.', es: 'La persona especial: Alguien dijo que yo me iba a casa sin avisarles.' },
  { who: 'narrator', text: '(A grey whisper rises from the fountain. It has a mouth made of letters.)', es: '(Un susurro gris se eleva de la fuente. Tiene una boca hecha de letras.)' },
]

/** El cierre con Jhoana (closeId(12)) */
export const B1_12_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "Leo: What a night! I'm so glad we're friends.", es: 'Leo: ¡Qué noche! Me alegra tanto que seamos amigos.' },
  { who: 'narrator', text: "Maya: Next time, let's ask each other before we believe a rumor.", es: 'Maya: La próxima vez, preguntémonos antes de creer un rumor.' },
  { who: 'narrator', text: 'Jhoana: You were so brave tonight. This apron is yours now.', es: 'Jhoana: Fuiste muy valiente esta noche. Este delantal ya es tuyo.' },
  { who: 'narrator', text: '(The Rumor drops two fragments. They float in the air, slowly.)', es: '(The Rumor suelta dos fragmentos. Flotan en el aire, despacio.)' },
  { who: 'narrator', text: '(You close your hand around the keychain. The fragments move toward it.)', es: '(Cierras la mano alrededor del llavero. Los fragmentos se mueven hacia él.)' },
  { who: 'narrator', text: '(The keychain and the fragments shine together.)', es: '(El llavero y los fragmentos brillan juntos.)' },
]
