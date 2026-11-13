import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'
import { memoryFlag } from '../game/memory'

/**
 * B1-01 — The Accident. Recuerdo (prólogo) + epílogo en el presente.
 *
 * Tramo A · RECUERDO (escena b1-01-school; es recuerdo por el prefijo "b1-01-"): una clase nocturna, el pasillo y la escalera.
 *   El jugador maneja a L (SpriteL). El amigo (NPC b1-01-friend, cara borrosa) espera junto a la puerta: al hablarle empieza
 *   la secuencia fija (MemoryScript): la charla, la alarma, el humo → Call for Help (5 rondas) → el rescate →
 *   exitMemory(s, 1, { close: false }). Todo está en la tarea 'b1-01-friend' (data/tasks.ts, activity 'callforhelp').
 *   Puntos de control (para retomar y para el modo profe): B1_01_TALKED (ya hablaron) y B1_01_ALARM (ya sonó la alarma).
 *   El amigo es el protagonista adulto, pero nunca se dice: su nombre sale con estática ([[?]]) y no hay ninguna pista.
 * Tramo B · EPÍLOGO (b1-home, data/b1Home.ts): se activa con memoryFlag(1) y sin closeId(1). Leo escribe por el teléfono:
 *   mensaje → lección (cause-effect, por mensajes) + práctica → Smoke Echo (esbirro) → Blurry Memory (Reconstruct)
 *   → cierre (done = closeId(1), abre el nodo 2; recupera los temas cause-effect y emergencies).
 * Preguntas en data/questions-b1-01.ts. Diario en data/b1Diary.ts.
 */
export const B1_01_SCHOOL_ID = 'b1-01-school'
/** El amigo del recuerdo (cara borrosa, sin nombre) */
export const B1_01_FRIEND = 'b1-01-friend'
/** Ya hablaron con el amigo (la secuencia sigue desde la alarma) */
export const B1_01_TALKED = 'b1-01-talked'
/** Ya sonó la alarma y salió el humo (la secuencia sigue en Call for Help) */
export const B1_01_ALARM = 'b1-01-alarm'
/** Terminó el recuerdo (el rescate); se guarda justo antes de salir del recuerdo */
export const B1_01_RESCUE = 'b1-01-rescue'

// ── Epílogo (b1-home) ──
/** El teléfono de tu cuarto, ahora con Leo escribiendo (aparece al salir del recuerdo 1) */
export const B1_LEO_PHONE = 'b1-01-leo-phone'
export const B1_01_MESSAGE = 'b1-01-message'
/** Lo que le escribes a Leo al despertar (se ve en la lección por mensajes) */
export const B1_01_MESSAGE_TEXT = 'I saw a fire. A man lost his voice.'
export const B1_01_PRACTICE = 'b1-01-practice'
/** Esbirro del epílogo: aparece en el cuarto al terminar la práctica */
export const B1_01_ECHO = 'b1-01-smoke-echo'
export const B1_01_BLURRY = 'b1-01-blurry'
export const B1_01_CLOSE = closeId(1)

/** Epílogo activo: ya saliste del recuerdo 1 pero la misión no está cerrada */
export const isB1_01Epilogue = (s: GameState) => s.opened.includes(memoryFlag(1)) && !s.opened.includes(B1_01_CLOSE)

/**
 * Leyenda (como school.ts): # pared · W ventana · B pizarra · M escritorio del profesor · D pupitre · d puerta · p planta
 * Nuevas (Tiles.tsx): @ reloj de pared · 9 alarma de incendio · 0 letrero de salida de emergencia · ^ escalera (con humo).
 */
const MAP = [
  '##BBB#@##9###0##',
  '#MM.....d.....^#',
  'W.......#......#',
  'W.D.D.D.########',
  '#.......########',
  'W.D.D.D.########',
  '#.......########',
  'W.....p.########',
  '################',
]

function zoneAt(x: number): Zone {
  return x >= 8 ? 'pasillo-noche' : 'aula-noche'
}

const DESK = { text: 'A desk. A student forgot a pencil here.', sub: 'Un pupitre. Un estudiante olvidó un lápiz aquí.', say: 'A student forgot a pencil here.' }
const BOARD = { text: 'The board. There are still some words on it: "When... while... because..."', sub: 'La pizarra. Todavía tiene algunas palabras: "When... while... because..."', say: 'There are still some words on the board.' }

export const B1_01_SCHOOL: SceneDef = {
  id: B1_01_SCHOOL_ID,
  name: 'Recuerdo 1 · Clase nocturna',
  topics: [],
  map: MAP,
  start: { x: 3, y: 4 },
  // Sin jefe: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [{ type: 'npc', id: B1_01_FRIEND, x: 7, y: 1 }],
  labels: [
    { text: 'Aula', x: 3, y: 6 },
    { text: 'Pasillo', x: 11, y: 2 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '2,0': BOARD,
    '3,0': BOARD,
    '4,0': BOARD,
    '1,1': { text: 'A marker on the desk. It is almost dry.', sub: 'Un marcador sobre el escritorio. Está casi seco.', say: 'A marker on the desk.' },
    '2,1': { text: "The teacher's desk. Papers, a marker and an old cup of coffee.", sub: 'El escritorio del profesor. Papeles, un marcador y una taza vieja de café.', say: "The teacher's desk." },
    '2,3': DESK,
    '4,3': DESK,
    '6,3': DESK,
    '2,5': DESK,
    '4,5': DESK,
    '6,5': DESK,
    '6,0': { text: "The clock. It's ten forty.", sub: 'El reloj. Son las diez y cuarenta.', say: "It's ten forty." },
    '9,0': { text: 'The fire alarm. "In case of fire, push here."', sub: 'La alarma de incendio. "En caso de incendio, empuje aquí".', say: 'The fire alarm.', tone: 'warn' },
    '13,0': { text: 'The fire exit sign. The fire exit is at the end of the hallway.', sub: 'El letrero de la salida de emergencia. La salida está al final del pasillo.', say: 'The fire exit sign.' },
    '14,1': { text: 'The stairs go down to the floor below.', sub: 'La escalera baja al piso de abajo.', say: 'The stairs go down to the floor below.' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'Recuerdo 1 · Una noche normal', done: s.opened.includes(B1_01_RESCUE) },
    { label: 'Habla con tu amigo, junto a la puerta', done: s.opened.includes(B1_01_TALKED) },
  ],
  intro: {
    first: 'Un recuerdo que no es tuyo. Una clase nocturna acaba de terminar. Tu amigo espera junto a la puerta del aula.',
    later: 'Un recuerdo que no es tuyo. Tu amigo espera junto a la puerta.',
  },
}

/** Una línea de la secuencia fija del recuerdo. who 'L' = L (narrador o hablando) · fx 'alarm' = suena la alarma */
/** 'board' (B1-05): una nota de pizarra dentro de la secuencia (vocabulario), sin voz */
export type ScriptLine = { who: 'L' | 'friend' | 'narrator' | 'board'; text: string; es: string; fx?: 'alarm' | 'stranger' }

/** 1–4: antes de la alarma (L habla con su voz normal) */
export const ACCIDENT_TALK: ScriptLine[] = [
  { who: 'narrator', text: 'It was a normal night. I was cleaning the board. My friend was waiting at the door.', es: 'Era una noche normal. Yo estaba limpiando la pizarra. Mi amigo esperaba en la puerta.' },
  { who: 'friend', text: 'Good class tonight, [[?]]. The students were really listening.', es: 'Buena clase esta noche, ▒▒▒. Los estudiantes de verdad estaban escuchando.' },
  { who: 'L', text: "Thanks. I'm tired, but happy. Let's get some food.", es: 'Gracias. Estoy cansado, pero feliz. Vamos a comer algo.' },
  { who: 'friend', text: "Good idea. I'm starving.", es: 'Buena idea. Me muero de hambre.' },
]

/** 5–7: la alarma y el humo. Después empieza Call for Help */
export const ACCIDENT_ALARM: ScriptLine[] = [
  { who: 'narrator', text: 'We were walking to the stairs when the fire alarm rang.', es: 'Caminábamos hacia las escaleras cuando sonó la alarma de incendio.', fx: 'alarm' },
  { who: 'narrator', text: 'Smoke was coming up the stairs. The fire started on the floor below.', es: 'Subía humo por las escaleras. El fuego empezó en el piso de abajo.' },
  { who: 'narrator', text: "My friend stopped. He stood there, looking at the smoke. He didn't say anything.", es: 'Mi amigo se detuvo. Se quedó ahí, mirando el humo. No dijo nada.' },
]

/** El rescate (después de Call for Help). Luego: fundido a negro y exitMemory(s, 1, { close: false }) */
export const ACCIDENT_RESCUE: ScriptLine[] = [
  { who: 'narrator', text: 'The firefighters arrived. Everyone got out because I shouted. But the smoke took my voice.', es: 'Llegaron los bomberos. Todos salieron porque yo grité. Pero el humo me quitó la voz.' },
  { who: 'narrator', text: "And my friend... didn't say a word.", es: 'Y mi {h:amigo|amiga}... no dijo ni una palabra.' },
]

/**
 * Smoke Echo (esbirro del epílogo): un eco de humo que el reloj trajo a tu cuarto. Aparece al terminar la práctica.
 * Es un eco: al vencerlo vuelve a su tiempo y da un escudo y el impermeable. Sus frases con error están mal en cualquier contexto.
 */
export const B1_01_ENEMIES: Record<string, EnemyDef> = {
  [B1_01_ECHO]: {
    id: B1_01_ECHO,
    name: 'Smoke Echo',
    person: 'Smoke Echo',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: ['past-simple-continuous', 'cause-effect'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['b1-01-minion'],
    onlyTags: true,
    reward: 'impermeable',
    look: { shirt: '#8a8f99', hair: '#5c616b', skin: '#b7bcc4' },
    before: [
      { text: "Whoosh... I was burning when the alarm rang. Because the smoke, you can't breathe!", es: 'Fuuum... Yo estaba ardiendo cuando sonó la alarma. ¡Por el humo, no puedes respirar! (Because the smoke: mal).' },
      { text: 'While the alarm rang, I was clean the board. Because the smoke, he couldn\'t breathe!', es: 'Mientras sonaba la alarma, yo limpiaba la pizarra. ¡Por el humo, él no podía respirar! (I was clean, Because the smoke: mal).' },
    ],
    after: [{ text: "The smoke is going away... I'm just air now.", es: 'El humo se va... Ahora solo soy aire.' }],
    freed: { text: 'Thank you. Be careful with fire, OK?', es: 'Gracias. Ten cuidado con el fuego, ¿sí?' },
    bonus: { q: 'Elige la frase correcta:', options: ['He was tired because of the smoke.', 'He was tired because the smoke.', 'He was tired so of the smoke.'], answer: 0, tip: 'because of + sustantivo (the smoke).' },
  },
}
