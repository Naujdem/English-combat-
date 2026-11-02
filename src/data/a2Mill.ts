import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_08_CLOSE } from './a2Car'

/**
 * A2-09 — The Silent Mill (el molino de la granja River, en el pasado).
 * Mapa de la granja de A2-06 con el molino junto al río ('n'), una carreta vieja ('u') y sacos de harina en el granero.
 * Orden: Leo (lección used-to-imperative + práctica) → el aprendiz corrompido (esbirro, 2 fases: used to / when-while)
 *        → Mr. Bell, el molinero (charla) → [opcional: receta de pan con Sequence Master (escudo) · Eco del molino (escudo)]
 *        → La rueda rota (jefe, 3 fases, entrega el fragmento) → Leo (cierre).
 * "cart" = la carreta de la carrera (A2-07/08): se detuvo junto al molino esa noche. No se explica más (queda para A2-10).
 * Se activa al terminar A2-08. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-09.ts.
 */
const MAP = [
  '################',
  '#yy..y.#K..A..p#',
  '#......#.......#',
  '#y.....#J......#',
  '###d#######d####',
  '#,,,,,,,,,,,,,,#',
  '#,fffff,,,,Y,,,#',
  '#,f,,,f,,wwn,,,#',
  '#,f,,,f,,ww,,Y,#',
  '#,ff,ff,,,,,,u,#',
  '#,,,,,,,,,,,,,,#',
  '#,Y,......,,Y,,#',
  '#,,,......,,,,,#',
  '#,,,......,,Y,,#',
  '#,,,,,,,,,,,,,,#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'granero-viejo' : x >= 8 ? 'casa-vieja' : 'campo-viejo'
  return 'campo-viejo'
}

export const A2_MILL_ID = 'a2-mill'
export const A2_09_PRACTICE = 'a2-09-practice'
/** Esbirro: el aprendiz corrompido aparece en el campo tras la práctica de Leo */
export const A2_09_MINION = 'a2-09-apprentice'
export const A2_09_MILLER = 'a2-09-miller-talk'
/** Opcional: receta de pan del molinero (Sequence Master), da un escudo */
export const A2_09_RECIPE = 'a2-09-recipe'
/** Opcional: eco en el corral viejo, repasa used to y da un escudo */
export const A2_09_ECHO = 'a2-09-mill-echo'
/** Jefe: aparece junto a la rueda del molino tras hablar con el molinero */
export const A2_09_BOSS = 'a2-09-broken-wheel'
export const A2_09_CLOSE = 'a2-09-close'

/** A2-09 se abre al terminar A2-08 */
export const isA2MillUnlocked = (s: GameState) => s.opened.includes(A2_08_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-mill']
const TP = 'used-to-imperative' as const
export const A2_MILL_PRACTICE: Question[] = [
  { id: 'a2-09-p1', topic: TP, prompt: 'The mill ___ every day. Now it is silent.', options: ['used to work', 'used to worked', 'use to work'], answer: 0, tip: 'used to + verbo en forma base (work, no worked).', tags: T },
  { id: 'a2-09-p2', topic: TP, prompt: 'The mill ___ be so quiet.', options: ["didn't use to", "didn't used to", 'not use to'], answer: 0, tip: "Negativo: didn't use to (sin -d después de didn't).", tags: T },
  { id: 'a2-09-p3', topic: TP, prompt: '___ the miller use to grind wheat here?', options: ['Did', 'Was', 'Does'], answer: 0, tip: 'Pregunta: Did + sujeto + use to + verbo.', tags: T },
  { id: 'a2-09-p4', topic: TP, kind: 'order', prompt: 'La gente solía comprar harina aquí.', options: ['People', 'used', 'to', 'buy', 'flour', 'here.'], answer: 0, tip: 'Sujeto + used to + verbo base.', tags: T },
  { id: 'a2-09-p5', topic: TP, prompt: '___ the gate slowly.', options: ['Open', 'Opens', 'Opening'], answer: 0, tip: 'Imperativo: el verbo en forma base al principio, sin sujeto.', tags: T },
  { id: 'a2-09-p6', topic: TP, kind: 'fix', prompt: "Don't to touch the wheel.", options: ["Don't touch the wheel.", 'Not touch the wheel.', "Don't touching the wheel."], answer: 0, tip: "Prohibir: Don't + verbo base.", tags: T },
  { id: 'a2-09-p7', topic: TP, prompt: 'The wheel stopped ___ there was no water.', options: ['because', 'so', 'although'], answer: 0, tip: 'because = la razón (no había agua).', tags: T },
]

export const A2_MILL_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (2 fases): aparece en el campo tras la práctica de Leo.
  [A2_09_MINION]: {
    id: A2_09_MINION,
    name: 'El aprendiz corrompido',
    person: 'Sam',
    kind: 'minion',
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-mill-minion'],
    // Fase 1: used to · Fase 2: when / while (repaso de A2-08)
    phases: [
      {
        hp: 3,
        title: 'Used to',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-mill-minion-used'],
        line: { text: 'The miller use to sing here! The water use to dance!', es: '¡El molinero solía cantar aquí! ¡El agua solía bailar! (use to: mal).' },
      },
      {
        hp: 3,
        title: 'When / While',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-mill-minion-while'],
        line: { text: 'I was carry the sacks while the wheel stop!', es: '¡Yo estaba cargando los sacos mientras la rueda se detuvo! (was carry, stop: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#b8a888', hair: '#3a2a1a', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'This mill use to worked every day! Now it is silent. Go away!', es: '¡Este molino solía funcionar todos los días! Ahora está silencioso. ¡Vete! (use to worked: mal).' },
      { text: 'I was sleep when the wheel stop. I didn’t saw nothing!', es: 'Yo estaba durmiendo cuando la rueda se detuvo. ¡No vi nada! (was sleep, stop, didn’t saw nothing: mal).' },
    ],
    after: [
      { text: 'The mill used to work… I was sleeping when the wheel stopped. Oh. My words are back.', es: 'El molino solía funcionar… Yo estaba durmiendo cuando la rueda se detuvo. Oh. Mis palabras volvieron.' },
      { text: 'The cart stopped here that night… I heard its wheels on the stones.', es: 'El carro se detuvo aquí esa noche… Oí sus ruedas sobre las piedras.' },
    ],
    freed: { text: 'Talk to Mr. Bell, the miller. He is near the wheel.', es: 'Habla con el señor Bell, el molinero. Está cerca de la rueda.' },
    bonus: { q: 'Before you go! The mill ___ make flour for the whole town.', options: ['used to', 'use to', 'was use to'], answer: 0, tip: 'used to + verbo base (afirmativo con -d).' },
  },
  // Eco opcional (1 fase): aparece en el corral viejo tras hablar con el molinero. Repasa used to y da un escudo.
  [A2_09_ECHO]: {
    id: A2_09_ECHO,
    name: 'Eco del molino',
    person: 'Echo of the Mill',
    kind: 'minion',
    echo: true,
    hp: 4,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-mill-echo'],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#d8cfb8', hair: '#8a8070', skin: '#c9b8d8', gender: 'female' },
    before: [
      { text: 'Long ago, people use to come here every day…', es: 'Hace mucho, la gente solía venir aquí todos los días… (use to: mal).' },
      { text: 'They use to brought wheat. Did you used to come?', es: 'Solían traer trigo. ¿Tú solías venir? (use to brought, did… used to: mal).' },
    ],
    after: [
      { text: 'People used to come here every day… Thank you. I can rest now.', es: 'La gente solía venir aquí todos los días… Gracias. Ya puedo descansar.' },
    ],
    freed: { text: 'People used to come here every day.', es: 'La gente solía venir aquí todos los días.' },
    bonus: { q: 'Before I go! ___ you use to eat fresh bread?', options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta con used to: Did + sujeto + use to.' },
  },
  // Jefe (3 fases): aparece junto a la rueda tras hablar con el molinero. Entrega el fragmento.
  [A2_09_BOSS]: {
    id: A2_09_BOSS,
    name: 'La rueda rota',
    person: 'The Broken Wheel',
    kind: 'boss',
    hp: 9,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-mill-boss'],
    // Fase 1: used to · Fase 2: imperativo · Fase 3: because / so / although
    phases: [
      {
        hp: 3,
        title: 'Used to',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-mill-boss-used'],
        line: { text: 'The water use to love me! The miller use to sang for me!', es: '¡El agua solía quererme! ¡El molinero solía cantarme! (use to, use to sang: mal).' },
      },
      {
        hp: 3,
        title: 'Imperativo',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-mill-boss-imp'],
        line: { text: 'Not touch me! Opens the gate! Closes the gate!', es: '¡No me toques! ¡Abre la compuerta! ¡Cierra la compuerta! (Not touch, Opens, Closes: mal).' },
      },
      {
        hp: 3,
        title: 'Because / so / although',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-mill-boss-link'],
        line: { text: 'I stopped so the night was dark… although I was angry!', es: 'Me detuve porque la noche estaba oscura… ¡porque estaba enojada! (so y although mal usados).' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#5a4a3a', hair: '#2a2016', skin: '#c9b8d8', gender: 'male' },
    before: [
      { text: 'I use to turn every day! Now I don’t turn for nobody!', es: '¡Yo solía girar todos los días! ¡Ahora no giro para nadie! (use to, don’t… nobody: mal).' },
      { text: 'Not come closer! I took the words of this mill, because the light was mine!', es: '¡No te acerques! Me llevé las palabras de este molino, ¡porque la luz era mía! (Not come: mal).' },
    ],
    after: [
      { text: 'I used to turn every day… The water is moving again.', es: 'Yo solía girar todos los días… El agua se mueve otra vez.' },
      { text: 'The cart… it stopped by the mill that night. I saw it. But I cannot say more.', es: 'El carro… se detuvo junto al molino esa noche. Lo vi. Pero no puedo decir más.' },
    ],
    freed: { text: 'The cart stopped by the mill. I cannot say more.', es: 'El carro se detuvo junto al molino. No puedo decir más.' },
    release: {
      title: '¡Fragmento recuperado!',
      text: 'Entre las piedras del molino brilla un pequeño fragmento morado. Al tomarlo, el centro vacío de tu reloj vibra… y oyes, muy lejos, unas ruedas sobre las piedras. Lo guardas con los otros.',
    },
  },
}

export const A2_MILL: SceneDef = {
  id: A2_MILL_ID,
  name: 'El molino · A2',
  topics: [],
  map: MAP,
  start: { x: 5, y: 12 },
  // Sin puerta ni llaves: el esbirro, el eco y el jefe aparecen en el mapa según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-09-leo', x: 4, y: 12 },
    // Mr. Bell, el molinero, junto a la rueda
    { type: 'npc', id: 'a2-09-miller', x: 12, y: 7 },
    // El aprendiz corrompido aparece en el campo tras la práctica de Leo
    { type: 'enemy', id: A2_09_MINION, x: 8, y: 10, after: A2_09_PRACTICE },
    // Eco opcional en el corral viejo tras hablar con el molinero
    { type: 'enemy', id: A2_09_ECHO, x: 4, y: 7, after: A2_09_MILLER },
    // La rueda rota aparece junto al molino tras hablar con el molinero
    { type: 'enemy', id: A2_09_BOSS, x: 11, y: 8, after: A2_09_MILLER },
  ],
  labels: [
    { text: 'Mill', x: 11, y: 6 },
    { text: 'River', x: 8, y: 9 },
    { text: 'Barn', x: 2, y: 2 },
  ],
  zoneAt,
  examine: {
    '11,7': { text: 'The mill wheel. The water used to turn it. Now it is silent.', sub: 'La rueda del molino. El agua solía girarla. Ahora está en silencio.', say: 'The water used to turn it.', tone: 'warn' },
    '1,1': { text: 'Sacks of flour. They are almost empty.', sub: 'Sacos de harina. Están casi vacíos.', say: 'Sacks of flour.' },
    '2,1': { text: 'Sacks of flour. They are almost empty.', sub: 'Sacos de harina. Están casi vacíos.', say: 'Sacks of flour.' },
    '13,9': { text: 'An old cart. Its wheels are full of flour.', sub: 'Una carreta vieja. Sus ruedas están llenas de harina.', say: 'An old cart.' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-09 · The Silent Mill', done: s.opened.includes(A2_09_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_09_PRACTICE) },
    { label: 'Esbirro: el aprendiz corrompido', done: s.defeated.includes(A2_09_MINION) },
    { label: 'Hablar con el molinero', done: s.opened.includes(A2_09_MILLER) },
    { label: 'Opcional: receta de pan', done: s.opened.includes(A2_09_RECIPE) },
    { label: 'Opcional: Eco del molino', done: s.defeated.includes(A2_09_ECHO) },
    { label: 'Jefe: La rueda rota', done: s.defeated.includes(A2_09_BOSS) },
    { label: 'Cierre con Leo', done: s.opened.includes(A2_09_CLOSE) },
  ],
  intro: {
    first: 'Vuelves a la granja de los River, en el pasado. Junto al río hay un molino viejo… y está en silencio. Habla con Leo.',
    later: 'El molino en A2. Sigue los objetivos bajo el mapa.',
  },
}
