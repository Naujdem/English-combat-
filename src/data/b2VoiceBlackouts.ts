import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-05 · Voice Blackouts (presente). Bloque 1: el puerto de noche, el muelle de pescadores y la redacción del Herald
 * (escena b2-05-port: la redacción a la izquierda, una puerta y el puerto a la derecha). Guía: Manuel.
 * Orden: Manuel en el puerto (b2-05-arrival, script: los apagones de voz) →
 *   Manuel: lección 'reporting-to-b2' + práctica (b2-05-verbs-to): verbo + to y verbo + objeto + to →
 *   Tomás Quispe en el muelle de pescadores (b2-05-tomas, script, escucha) →
 *   la capitana Ingrid Halvorsen junto al muelle norte (b2-05-captain, script, escucha) →
 *   Manuel: lección 'reporting-ing-b2' + práctica (b2-05-verbs-ing): verbo + -ing, verbo + preposición + -ing y verbo + that →
 *   Zoe Park en el paseo (b2-05-zoe, script: "GHOST STEALS VOICES AT PORT!") →
 *   Manuel en su escritorio del Herald: lección 'tabloid-b2' + práctica (b2-05-press): prensa sensacionalista contra prensa seria.
 * Bloque 2: Fact Check completo (6 rondas), dos Rumour Gulls y el jefe The Tabloid (2 fases).
 * Bloque 3: el cierre (Zoe se disculpa, dos fragmentos completan el segundo segmento, la placa "VOCALIS"), diario y recompensa.
 */
export const B2_05_PORT_ID = 'b2-05-port'
export const B2_05_MANUEL = 'b2-05-manuel'
export const B2_05_MANUEL_DESK = 'b2-05-manuel-desk'
export const B2_05_TOMAS = 'b2-05-tomas'
export const B2_05_CAPTAIN = 'b2-05-captain'
export const B2_05_ZOE = 'b2-05-zoe'
/** Tareas (marcas en `opened`) */
export const B2_05_ARRIVAL = 'b2-05-arrival'
export const B2_05_VERBS_TO = 'b2-05-verbs-to'
export const B2_05_TOMAS_TALK = 'b2-05-tomas-talk'
export const B2_05_CAPTAIN_TALK = 'b2-05-captain-talk'
export const B2_05_VERBS_ING = 'b2-05-verbs-ing'
export const B2_05_ZOE_TALK = 'b2-05-zoe-talk'
export const B2_05_PRESS = 'b2-05-press'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h afiche · O escritorio · F archivador · p planta · . suelo · d puerta ·
 * f valla · _ suelo del paseo · H banca · w agua. A la izquierda la redacción; a la derecha el puerto con dos muelles:
 * el de pescadores (x 10-12) y el muelle norte (x 19-21, cerrado: "Keep away from the north pier").
 */
const MAP = [
  '#h###h##fhfhfhfhfhfhfhff',
  '#.OO.OO#_H______H______f',
  '#......#_______________f',
  '#......d_______________f',
  '#O....F#p_____________pf',
  '#p....p#ww___wwwwww___ww',
  '#......#ww___wwwwww___ww',
  '########ww___wwwwww___ww',
]

const zoneAt = (x: number): Zone => (x <= 7 ? 'oficina' : 'calle')

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
const WATER = { text: 'The water is black tonight. The lights of the port are flickering.', sub: 'El agua está negra esta noche. Las luces del puerto parpadean.', say: 'The water is black tonight.' }

export const B2_05_PORT: SceneDef = {
  id: B2_05_PORT_ID,
  name: 'Voice Blackouts · El puerto de noche',
  topics: [],
  map: MAP,
  start: { x: 12, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Manuel en el puerto hasta la segunda lección; después espera en su escritorio del Herald (npcs.ts, until / after)
    { type: 'npc', id: B2_05_MANUEL, x: 10, y: 3 },
    { type: 'npc', id: B2_05_MANUEL_DESK, x: 3, y: 2 },
    { type: 'npc', id: B2_05_TOMAS, x: 11, y: 6 },
    { type: 'npc', id: B2_05_CAPTAIN, x: 18, y: 4 },
    // Zoe llega al paseo con su teléfono después de la segunda lección (npcs.ts, after: b2-05-verbs-ing)
    { type: 'npc', id: B2_05_ZOE, x: 15, y: 2 },
  ],
  labels: [
    { text: 'The Herald', x: 3, y: 4 },
    { text: 'Fishermen\'s pier', x: 11, y: 5 },
    { text: 'North pier', x: 20, y: 5 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    ...Object.fromEntries([13, 14, 15, 16, 17, 18].map((x) => [`${x},5`, WATER])),
    '5,0': { text: 'A front page on the wall: "THE HERALD — Facts first."', sub: 'Una portada en la pared: "THE HERALD — Primero los hechos".', say: 'Facts first.' },
    '23,4': { text: 'A sign: "NORTH PIER CLOSED AT NIGHT. Port Authority."', sub: 'Un letrero: "MUELLE NORTE CERRADO DE NOCHE. Autoridad Portuaria".', say: 'North pier closed at night.' },
  },
  locked: (x, y, s) => {
    if (y >= 5 && x >= 10 && x <= 12 && !s.opened.includes(B2_05_VERBS_TO)) return NOT_YET('Primero habla con Manuel: la lección de los verbos.')
    if (y >= 5 && x >= 19) return { text: '"Keep away from the north pier."', sub: 'La capitana cerró el muelle norte. Nadie pasa de noche.' }
    if (x === 7 && y === 3 && !s.opened.includes(B2_05_VERBS_ING)) return NOT_YET('Primero termina en el puerto con Manuel y los testigos.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Los apagones (Manuel)', done: s.opened.includes(B2_05_ARRIVAL) },
    { label: 'Verbo + to / verbo + objeto + to', done: s.opened.includes(B2_05_VERBS_TO) },
    { label: 'Testigo: Tomás', done: s.opened.includes(B2_05_TOMAS_TALK) },
    { label: 'Testigo: la capitana Halvorsen', done: s.opened.includes(B2_05_CAPTAIN_TALK) },
    { label: 'Verbo + -ing / preposición + -ing', done: s.opened.includes(B2_05_VERBS_ING) },
    { label: 'El blog de Zoe Park', done: s.opened.includes(B2_05_ZOE_TALK) },
    { label: 'Prensa seria contra tabloide', done: s.opened.includes(B2_05_PRESS) },
  ],
  intro: {
    first: 'Presente. El puerto de Lumen Bay, de noche. Las luces parpadean. Manuel te espera junto al muelle.',
    later: (s) =>
      s.opened.includes(B2_05_PRESS)
        ? 'El puerto de noche. Zoe sigue publicando rumores. (Fact Check, las gaviotas y el jefe llegan en el bloque 2.)'
        : 'El puerto de Lumen Bay, de noche. Alguien pierde la voz y nadie sabe por qué.',
  },
}

/** Manuel en el puerto (MemoryScript): los apagones de voz */
export const B2_05_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Midnight at the port. The street lights flicker on and off.)', es: '(Medianoche en el puerto. Las luces de la calle se encienden y se apagan.)' },
  { who: 'narrator', text: "Manuel: Thanks for coming. Something strange is happening here, and it isn't the lights.", es: 'Manuel: Gracias por venir. Aquí está pasando algo raro, y no son las luces.' },
  { who: 'narrator', text: 'Manuel: People are losing their voices. Ten minutes, sometimes more. Then the voice comes back.', es: 'Manuel: La gente está perdiendo la voz. Diez minutos, a veces más. Después la voz vuelve.' },
  { who: 'narrator', text: '(You touch your throat. You know that feeling.)', es: '(Te tocas la garganta. Conoces esa sensación.)' },
  { who: 'narrator', text: "Manuel: The witnesses are all saying different things. A good journalist doesn't just repeat words.", es: 'Manuel: Los testigos dicen cosas distintas. Un buen periodista no se limita a repetir palabras.' },
  { who: 'narrator', text: 'Manuel: We report what people did with their words: did they promise, warn, deny, admit? Let me show you.', es: 'Manuel: Contamos qué hizo la gente con sus palabras: ¿prometió, advirtió, negó, admitió? Te muestro.' },
]

/** Tomás Quispe, en el muelle de pescadores (MemoryScript, escucha): perdió la voz diez minutos */
export const B2_05_TOMAS_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(An old fisherman is sitting on a box, holding a net. His hands are shaking.)', es: '(Un pescador mayor está sentado en una caja, con una red en las manos. Le tiemblan las manos.)' },
  { who: 'narrator', text: "Tomás: People say I'm crazy. I didn't make it up! I couldn't speak for ten minutes.", es: 'Tomás: La gente dice que estoy loco. ¡No me lo inventé! No pude hablar durante diez minutos.' },
  { who: 'narrator', text: 'Tomás: I tried to shout to my friend on the boat. Nothing came out. Only air.', es: 'Tomás: Intenté gritarle a mi amigo en el bote. No salió nada. Solo aire.' },
  { who: 'narrator', text: 'Tomás: There was a purple light under the water. Near the north pier.', es: 'Tomás: Había una luz morada debajo del agua. Cerca del muelle norte.' },
  { who: 'narrator', text: '(A purple light. You have seen that light before.)', es: '(Una luz morada. Ya has visto esa luz.)' },
  { who: 'narrator', text: 'Manuel (writing): So: he denied making it up, and he claimed that he had seen a purple light.', es: 'Manuel (escribiendo): Entonces: negó habérselo inventado y afirmó que había visto una luz morada.' },
]

/** La capitana Ingrid Halvorsen, junto al muelle norte (MemoryScript, escucha) */
export const B2_05_CAPTAIN_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A tall woman in a ferry uniform is standing in front of the north pier.)', es: '(Una mujer alta con uniforme de ferry está de pie frente al muelle norte.)' },
  { who: 'narrator', text: "Captain Halvorsen: I'm the captain of the night ferry. Keep away from the north pier.", es: 'Capitana Halvorsen: Soy la capitana del ferry nocturno. Manténganse lejos del muelle norte.' },
  { who: 'narrator', text: "Captain Halvorsen: Two of my sailors lost their voices there last week. Don't sail after midnight.", es: 'Capitana Halvorsen: Dos de mis marineros perdieron la voz allí la semana pasada. No naveguen después de medianoche.' },
  { who: 'narrator', text: "Captain Halvorsen: And no, I won't give you an interview. I'll call the police if you go near that pier.", es: 'Capitana Halvorsen: Y no, no les voy a dar una entrevista. Llamo a la policía si se acercan a ese muelle.' },
  { who: 'narrator', text: 'Manuel (quietly): She warned us to keep away, she refused to give an interview… and she threatened to call the police.', es: 'Manuel (en voz baja): Nos advirtió que nos alejáramos, se negó a dar una entrevista… y amenazó con llamar a la policía.' },
  { who: 'narrator', text: 'Manuel: Now the harder verbs. People also deny, admit, accuse and apologise.', es: 'Manuel: Ahora los verbos más difíciles. La gente también niega, admite, acusa y se disculpa.' },
]

/** Zoe Park, la bloguera de chismes (MemoryScript): su titular sensacionalista */
export const B2_05_ZOE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A young woman is filming the water with her phone. She is talking very fast.)', es: '(Una joven graba el agua con su teléfono. Habla muy rápido.)' },
  { who: 'narrator', text: "Zoe: Hi, followers! Zoe Park here, live from the port. EXCLUSIVE: a ghost is stealing voices!", es: 'Zoe: ¡Hola, seguidores! Aquí Zoe Park, en vivo desde el puerto. EXCLUSIVA: ¡un fantasma está robando voces!' },
  { who: 'narrator', text: '(She shows you her blog. The headline says: "GHOST STEALS VOICES AT PORT!")', es: '(Te muestra su blog. El titular dice: "¡FANTASMA ROBA VOCES EN EL PUERTO!")' },
  { who: 'narrator', text: 'Zoe: Sources claim that hundreds of people have lost their voices. Allegedly, the ghost is a drowned sailor.', es: 'Zoe: Fuentes aseguran que cientos de personas han perdido la voz. Supuestamente, el fantasma es un marinero ahogado.' },
  { who: 'narrator', text: "Manuel: Hundreds? Tomás and two sailors. Zoe, that's a rumour, not a fact.", es: 'Manuel: ¿Cientos? Tomás y dos marineros. Zoe, eso es un rumor, no un hecho.' },
  { who: 'narrator', text: "Zoe: Rumours get clicks, Manuel. Facts don't. Bye!", es: 'Zoe: Los rumores dan clics, Manuel. Los hechos no. ¡Chao!' },
  { who: 'narrator', text: "Manuel: Come to the office. I'll show you the difference between her blog and a real newspaper.", es: 'Manuel: Ven a la oficina. Te muestro la diferencia entre su blog y un periódico de verdad.' },
]
