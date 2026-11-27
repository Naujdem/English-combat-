import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FactCheckContent } from '../components/FactCheck'

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
 * Bloque 2: Manuel en el Herald: Fact Check completo (b2-05-factcheck, 6 rondas, se gana con 5) → Zoe se va del paseo →
 *   dos Rumour Gulls en el puerto (esbirros) → el jefe The Tabloid (2 fases) donde estaba Zoe.
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
/** Bloque 2 */
export const B2_05_FACTCHECK = 'b2-05-factcheck'
export const B2_05_GULL1 = 'b2-05-gull1'
export const B2_05_GULL2 = 'b2-05-gull2'
export const B2_05_BOSS = 'b2-05-boss'

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
    // Bloque 2: dos Rumour Gulls en el puerto (tras Fact Check) y The Tabloid donde estaba Zoe
    { type: 'enemy', id: B2_05_GULL1, x: 13, y: 4, after: B2_05_FACTCHECK },
    { type: 'enemy', id: B2_05_GULL2, x: 17, y: 3, after: B2_05_GULL1 },
    { type: 'enemy', id: B2_05_BOSS, x: 15, y: 2, after: B2_05_GULL2 },
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
    { label: 'Fact Check (Manuel)', done: s.opened.includes(B2_05_FACTCHECK) },
    { label: 'Rumour Gulls (2)', done: s.defeated.includes(B2_05_GULL2) },
    { label: 'The Tabloid', done: s.defeated.includes(B2_05_BOSS) },
  ],
  intro: {
    first: 'Presente. El puerto de Lumen Bay, de noche. Las luces parpadean. Manuel te espera junto al muelle.',
    later: (s) =>
      s.defeated.includes(B2_05_BOSS)
        ? 'El puerto de noche. El blog de Zoe se apagó. (El cierre llega en el bloque 3.)'
        : s.opened.includes(B2_05_FACTCHECK)
        ? 'El puerto de noche. Las gaviotas gritan rumores y el blog de Zoe crece sobre el paseo.'
        : s.opened.includes(B2_05_PRESS)
        ? 'El puerto de noche. Manuel tiene borradores para revisar en el Herald.'
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

/** Fact Check, versión completa (ficha 0.6; Manuel en el Herald): declaraciones de los testigos y borradores con verbos declarativos */
export const B2_05_FACT_CHECK: FactCheckContent = {
  title: 'Fact Check · The Lumen Bay Herald',
  intro: {
    en: 'Manuel gives you six drafts about the voice blackouts. Is each draft faithful to what the person said? If not, choose the correct version.',
    es: 'Manuel te da seis borradores sobre los apagones de voz. ¿Cada borrador es fiel a lo que dijo la persona? Si no lo es, elige la versión correcta.',
  },
  rounds: [
    {
      speaker: { en: 'Tomás, a fisherman', es: 'Tomás, un pescador' },
      quote: "I didn't make it up!",
      quoteEs: '¡No me lo inventé!',
      draft: 'Tomás admitted making it up.',
      faithful: false,
      options: ['Tomás denied making it up.', 'Tomás denied to make it up.', 'Tomás refused making it up.'],
      answer: 0,
      tip: 'Dice que NO lo hizo → deny + -ing: denied making.',
    },
    {
      speaker: { en: 'Captain Halvorsen', es: 'La capitana Halvorsen' },
      quote: "Don't sail after midnight.",
      quoteEs: 'No naveguen después de medianoche.',
      draft: 'The captain warned the fishermen not to sail after midnight.',
      faithful: true,
      tip: 'Un aviso negativo → warn + persona + not to + verbo.',
    },
    {
      speaker: { en: 'A ferry passenger', es: 'Una pasajera del ferry' },
      quote: 'You broke the lights!',
      quoteEs: '¡Ustedes rompieron las luces!',
      draft: 'She blamed the port workers to break the lights.',
      faithful: false,
      options: ['She accused the port workers for breaking the lights.', 'She accused the port workers of breaking the lights.', 'She accused the port workers to break the lights.'],
      answer: 1,
      tip: 'Una acusación → accuse someone of + -ing.',
    },
    {
      speaker: { en: 'A port worker', es: 'Un trabajador del puerto' },
      quote: "OK, it's true. We turned off the cameras at night.",
      quoteEs: 'Está bien, es verdad. Apagamos las cámaras de noche.',
      draft: 'He admitted turning off the cameras at night.',
      faithful: true,
      tip: 'Reconoce algo → admit + -ing.',
    },
    {
      speaker: { en: 'Captain Halvorsen', es: 'La capitana Halvorsen' },
      quote: "I won't give you an interview.",
      quoteEs: 'No les voy a dar una entrevista.',
      draft: 'The captain promised to give us an interview.',
      faithful: false,
      options: ['The captain refused giving us an interview.', 'The captain denied to give us an interview.', 'The captain refused to give us an interview.'],
      answer: 2,
      tip: 'Dice que NO lo va a hacer → refuse + to + verbo.',
    },
    {
      speaker: { en: 'Tomás, a fisherman', es: 'Tomás, un pescador' },
      quote: "Let's tell the police about the purple light.",
      quoteEs: 'Contémosle a la policía lo de la luz morada.',
      draft: 'Tomás suggested us to tell the police about the purple light.',
      faithful: false,
      options: ['Tomás suggested telling the police about the purple light.', 'Tomás suggested to tell the police about the purple light.', 'Tomás suggested tell the police about the purple light.'],
      answer: 0,
      tip: 'suggest + -ing (o suggest that we…). Nunca suggest + persona + to.',
    },
  ],
}

const RT = 'reporting-to-b2' as const
const RI = 'reporting-ing-b2' as const
const TB = 'tabloid-b2' as const

/** Rumour Gulls, gaviotas corrompidas que repiten rumores. Preguntas: etiqueta b2-05-gull */
const GULL = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Rumour Gull',
  person: 'Rumour Gull',
  kind: 'minion',
  hp: 4,
  topics: [RT, RI],
  kinds: ['fill', 'fix'],
  tags: ['b2-05-gull'],
  onlyTags: true,
  zone: 'calle',
  animal: 'duck',
  look: { shirt: '#e8e8e8', hair: '#9aa3ad', skin: '#f2c14e' },
  before: [line],
  after: [{ text: '(The gull flaps away into the dark. Its last "Squawk!" sounds almost normal.)', es: '(La gaviota se va volando en la oscuridad. Su último "¡Cuac!" suena casi normal.)' }],
  freed: { text: '(Now it only wants your sandwich.)', es: '(Ahora solo quiere tu sándwich.)' },
})

/**
 * The Tabloid: el blog de Zoe, corrompido. Un periódico gigante con titulares que parpadean. Jefe de 2 fases.
 * Fase 1: verbo + to y verbo + objeto + to (b2-05-boss-to) · Fase 2: verbo + -ing y verbo + preposición + -ing,
 * con prensa y anuncios del puerto en escucha (b2-05-boss-ing). Los fragmentos y el cierre llegan en el bloque 3.
 */
export const B2_05_BOSS_DEF: EnemyDef = {
  id: B2_05_BOSS,
  name: 'The Tabloid',
  person: 'The Tabloid',
  kind: 'boss',
  hp: 10,
  topics: [RT, RI, TB],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-05-boss-to'],
  phases: [
    { hp: 5, title: 'Primera plana: lo que prometieron', topics: [RT], kinds: ['fill', 'fix', 'order'], tags: ['b2-05-boss-to'], line: { text: 'EXCLUSIVE! The captain refused helping us! She warned us to not go!', es: 'refused helping y warned us to not go: mal.' } },
    { hp: 5, title: 'Edición especial: lo que negaron', topics: [RI, TB], kinds: ['fill', 'fix', 'listen'], tags: ['b2-05-boss-ing'], line: { text: 'She insisted to pay! He admitted to steal it! I apologise for be late!', es: 'insisted to pay, admitted to steal y for be late: mal.' } },
  ],
  onlyTags: true,
  zone: 'calle',
  look: { shirt: '#f4f1e6', hair: '#d4373a', skin: '#e6e0cf' },
  before: [
    { text: "(Zoe's phone falls on the ground. The screen grows into a giant newspaper. Headlines flash in red.)", es: '(El teléfono de Zoe cae al suelo. La pantalla crece hasta volverse un periódico gigante. Los titulares parpadean en rojo.)' },
    { text: 'GHOST STEALS VOICES! SOURCES CLAIM YOU ARE NEXT!', es: '¡FANTASMA ROBA VOCES! ¡FUENTES ASEGURAN QUE TÚ ERES EL SIGUIENTE!' },
  ],
  after: [{ text: '(The pages tear and fly away over the water like white birds.)', es: '(Las páginas se rasgan y salen volando sobre el agua como pájaros blancos.)' }],
  freed: { text: '(Where the newspaper stood, two small lights are shining.)', es: '(Donde estaba el periódico brillan dos lucecitas.)' },
  farewell: {
    q: 'The Tabloid (fading): "Nobody wants the truth… They want a good story."',
    options: ['You should apologise for lying.', 'You should apologise to lie.', 'You should apologise for lie.'],
    answer: 0,
    tip: 'apologise for + -ing: for lying.',
  },
}

export const B2_05_ENEMIES: Record<string, EnemyDef> = {
  [B2_05_GULL1]: GULL(B2_05_GULL1, { text: 'SQUAWK! He denied to take it! Take it! Take it!', es: 'denied to take: mal (denied taking).' }),
  [B2_05_GULL2]: GULL(B2_05_GULL2, { text: 'SQUAWK! She suggested us to leave! They accused him for stealing!', es: 'suggested us to leave y accused him for: mal.' }),
  [B2_05_BOSS]: B2_05_BOSS_DEF,
}
