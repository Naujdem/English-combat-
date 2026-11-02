import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import { A2_03_CLOSE } from './a2City'

/**
 * A2-04 — Mr. Hale's Workshop (alcance mínimo con jefe). Taller pequeño: zona de trabajo, herramientas y oficina.
 * Orden: Leo (llega) → Leo (lección + práctica) → el aprendiz corrompido (esbirro en el paso hacia el taller) → Mr. Hale (charla con presión) → Leo (Fix the Radio: arreglar la radio)
 *        → Mr. Hale corrompido (jefe en 2 fases) → Leo (cierre con el fragmento y una pista).
 * Se activa al terminar A2-03. Tareas en data/tasks.ts.
 */
const MAP = [
  '##############',
  '#666W666#WOFL#',
  '#........#...#',
  '#.77..77.d...#',
  '#........#.p.#',
  '#87787.78#####',
  '#............#',
  '#.U..77....8.#',
  '#............#',
  '##############',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 4 && x >= 10) return 'oficina'
  return 'taller'
}

export const A2_WORKSHOP_ID = 'a2-04-workshop'
export const A2_04_ARRIVE = 'a2-04-arrive'
export const A2_04_PRACTICE = 'a2-04-practice'
export const A2_04_PRESSURE = 'a2-04-pressure'
export const A2_04_SEQUENCE = 'a2-04-sequence'
export const A2_04_BOSS = 'a2-04-hale-boss'
/** Esbirro ligero: el aprendiz corrompido bloquea el paso del garaje al taller tras la práctica de Leo */
export const A2_04_APPRENTICE = 'a2-04-apprentice'
export const A2_04_CLOSE = 'a2-04-close'

/** A2-04 se abre al terminar A2-03 */
export const isA2WorkshopUnlocked = (s: GameState) => s.opened.includes(A2_03_CLOSE)

export const A2_WORKSHOP_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro ligero (1 fase): aparece tras la práctica de Leo en el único paso entre el garaje y el taller, antes de Mr. Hale.
  // Es un eco: al vencerlo vuelve a su tiempo y da un escudo; la pregunta extra puede dar otro.
  [A2_04_APPRENTICE]: {
    id: A2_04_APPRENTICE,
    name: 'El aprendiz corrompido',
    person: 'Sam',
    kind: 'minion',
    echo: true,
    hp: 4,
    topics: ['requests', 'instructions'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-workshop-apprentice'],
    onlyTags: true,
    zone: 'taller',
    look: { shirt: '#d9a441', hair: '#4a3020', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'Stop! Could you to wait here? First you gives me your tools, then you goes home!', es: '¡Alto! "¿Podrías esperar aquí?" Primero "me das" tus herramientas y luego "te vas" a casa. (Lo dice mal: could you to, you gives, you goes).' },
      { text: "Nobody passes! Mr. Hale is busy. Would you mind go away?", es: '¡Nadie pasa! El señor Hale está ocupado. "¿Te importaría irte?" (would you mind go: mal).' },
    ],
    after: [
      { text: 'Could you... give me a minute, please? Oh. Why am I standing here?', es: '¿Podrías... darme un minuto, por favor? Oh. ¿Por qué estoy parado aquí?' },
      { text: 'I was cleaning the tools, and then I saw a purple light near the old radio. Thank you!', es: 'Estaba limpiando las herramientas y luego vi una luz morada cerca de la radio vieja. ¡Gracias!' },
    ],
    freed: { text: "It's my job to clean the tools. Could you tell Mr. Hale I'm OK?", es: 'Mi trabajo es limpiar las herramientas. ¿Podrías decirle al señor Hale que estoy bien?' },
    bonus: { q: 'Before you go! Would you mind ___ this toolbox to the shelf?', options: ['taking', 'take', 'to take'], answer: 0, tip: 'Would you mind + verbo con -ing: taking.' },
  },
  [A2_04_BOSS]: {
    id: A2_04_BOSS,
    name: 'Mr. Hale, el mecánico corrompido',
    person: 'Mr. Hale',
    kind: 'boss',
    hp: 8,
    topics: ['requests', 'instructions'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-workshop'],
    // Fase 1: peticiones corteses · Fase 2: instrucciones y responsabilidades
    phases: [
      { hp: 4, title: 'Requests', topics: ['requests'], kinds: ['fill', 'fix', 'order', 'listen', 'write'], tags: ['a2-workshop'] },
      {
        hp: 4,
        title: 'Instructions',
        topics: ['instructions'],
        kinds: ['fill', 'fix', 'order', 'listen', 'write'],
        tags: ['a2-workshop'],
        line: { text: 'No more questions! Listen to my orders! First you cleans everything, then you is responsible of my tools, forever!', es: '¡Basta de preguntas! ¡Escucha mis órdenes! Primero "limpias" todo, luego "eres responsable" de mis herramientas, ¡para siempre! (Ahora mezcla instrucciones y responsabilidades, con errores).' },
      },
    ],
    onlyTags: true,
    zone: 'taller',
    look: { shirt: '#3b5a7a', hair: '#2b1d12', skin: '#c9b8d8', gender: 'male' },
    before: [
      { text: 'You! Give me the wrench! Could you to hurry? Would you mind work faster?', es: '¡Tú! ¡Dame la llave inglesa! "¿Podrías apurarte?" "¿Te importaría trabajar más rápido?" (Lo dice todo mal: could you to, would you mind work).' },
      { text: 'This purple light is MINE now. Nobody touches my workshop!', es: 'Esta luz morada ahora es MÍA. ¡Nadie toca mi taller!' },
    ],
    after: [
      { text: 'Could you... help me up, please? Oh... my head. What happened?', es: '¿Podrías... ayudarme a levantarme, por favor? Oh... mi cabeza. ¿Qué pasó?' },
      { text: 'There was a little purple stone inside the old radio. I touched it, and then... I only wanted to give orders.', es: 'Había una piedrita morada dentro de la radio vieja. La toqué y luego... solo quería dar órdenes.' },
      { text: 'A man in a dark coat brought that radio last week. He never said a word. He only left a note: "Please fix it." Take the stone. I think it is yours.', es: 'Un hombre con abrigo oscuro trajo esa radio la semana pasada. Nunca dijo una palabra. Solo dejó una nota: "Por favor, arréglela". Toma la piedra. Creo que es tuya.' },
    ],
    freed: { text: 'Would you mind passing me the screwdriver? Thank you! It is my job to fix things, not to break them.', es: '¿Te importaría pasarme el destornillador? ¡Gracias! Mi trabajo es arreglar cosas, no romperlas.' },
    farewell: {
      q: 'Thank you for your help! Could you close the door when you leave?',
      options: ['Sure, no problem!', 'Sure, no problems to!', 'Sure, not problem!'],
      answer: 0,
      tip: 'Para aceptar una petición: Sure, no problem! / Of course!',
    },
    release: {
      title: '¡Anomalía liberada!',
      text: 'De la radio sale un pequeño fragmento morado. Cuando lo tomas, el centro vacío de tu reloj vibra un segundo... y se queda quieto. Lo guardas.',
    },
  },
}

export const A2_WORKSHOP: SceneDef = {
  id: A2_WORKSHOP_ID,
  name: 'El taller del señor Hale · A2',
  topics: [],
  map: MAP,
  start: { x: 6, y: 8 },
  // El jefe aparece en el mapa como enemigo (tras Fix the Radio): no hay puerta ni llaves
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-04-leo', x: 4, y: 6 },
    // La persona especial te acompaña (solo una frase, sin tarea)
    { type: 'npc', id: 'a2-04-interest', x: 9, y: 8 },
    // Mr. Hale trabaja en la mesa (charla con presión) y, tras arreglar la radio, se corrompe en el mismo sitio
    { type: 'npc', id: 'a2-04-hale', x: 4, y: 3 },
    // El aprendiz corrompido bloquea el único paso entre el garaje y el taller tras la práctica de Leo
    { type: 'enemy', id: A2_04_APPRENTICE, x: 6, y: 5, after: A2_04_PRACTICE },
    { type: 'enemy', id: A2_04_BOSS, x: 4, y: 3, after: A2_04_SEQUENCE },
  ],
  labels: [
    { text: 'Workshop', x: 4, y: 4 },
    { text: 'Office', x: 11, y: 4 },
    { text: 'Garage', x: 3, y: 8 },
  ],
  zoneAt,
  examine: {
    '6,3': { text: 'An old radio on the workbench. A little purple light is blinking inside...', sub: 'Una radio vieja en la mesa de trabajo. Adentro parpadea una lucecita morada...', say: 'An old radio on the workbench.', tone: 'warn' },
    '10,1': { text: "Mr. Hale's desk. A note: \"Please fix it.\" There is no name.", sub: 'El escritorio del señor Hale. Una nota: "Por favor, arréglela". No tiene nombre.', say: 'Please fix it.' },
  },
  requirements: [],
  chips: (s) => [
    { label: "A2-04 · Mr. Hale's Workshop", done: s.opened.includes(A2_04_CLOSE) },
    { label: 'Leo', done: s.opened.includes(A2_04_ARRIVE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes('requests') },
    { label: 'Práctica', done: s.opened.includes(A2_04_PRACTICE) },
    { label: 'El aprendiz', done: s.defeated.includes(A2_04_APPRENTICE) },
    { label: 'Mr. Hale', done: s.opened.includes(A2_04_PRESSURE) },
    { label: 'Arreglar la radio', done: s.opened.includes(A2_04_SEQUENCE) },
    { label: 'Jefe: Mr. Hale', done: s.defeated.includes(A2_04_BOSS) },
    { label: 'Cierre', done: s.opened.includes(A2_04_CLOSE) },
  ],
  intro: {
    first: 'Después del reloj extraño de la plaza, Leo te trae al taller del señor Hale: él arregla relojes, radios y bicicletas.',
    later: 'El taller del señor Hale en A2. Sigue los objetivos bajo el mapa.',
  },
}
