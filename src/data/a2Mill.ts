import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_08_CLOSE } from './a2Car'

/**
 * A2-09 — The Silent Mill (el molino de la granja River, en el pasado).
 * Mapa de la granja de A2-06 con el molino junto al río ('n'), una carreta vieja ('u') y sacos de harina en el granero.
 * Contenido: recetas e imperativo (cap. 15), some/any y cantidades (cap. 17), compras (cap. 20); when/while como repaso.
 * Orden: Leo (lección recipes-some-any + práctica) → el aprendiz corrompido (esbirro, 2 fases: some/any / when-while)
 *        → Mr. Bell, el molinero (charla) → Leo (Detective: Reconstruct sobre el carro)
 *        → Mr. Bell (Wake the Mill: Command Puzzle) → La rueda rota (jefe, 3 fases, entrega el fragmento) → Leo (cierre).
 *        Opcionales: receta de pan de Mr. Bell (Sequence Master, escudo) · Eco del molino (escudo).
 * El caso de A1 (1996: los ratones se comieron la cuerda) no se repite: aquí se investiga el carro, no la rueda.
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
/** Detective: Reconstruct con testimonios sobre el carro esa noche */
export const A2_09_DETECTIVE = 'a2-09-detective'
/** Wake the Mill: órdenes para volver a poner en marcha el molino; al terminarlo aparece el jefe */
export const A2_09_WAKE = 'a2-09-wake'
/** Opcional: receta de pan del molinero (Sequence Master), da un escudo */
export const A2_09_RECIPE = 'a2-09-recipe'
/** Opcional: eco en el corral viejo, repasa recetas en imperativo y da un escudo */
export const A2_09_ECHO = 'a2-09-mill-echo'
/** Jefe: aparece junto a la rueda del molino tras despertarla (Wake the Mill) */
export const A2_09_BOSS = 'a2-09-broken-wheel'
export const A2_09_CLOSE = 'a2-09-close'

/** A2-09 se abre al terminar A2-08 */
export const isA2MillUnlocked = (s: GameState) => s.opened.includes(A2_08_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-mill']
const TP = 'recipes-some-any' as const
export const A2_MILL_PRACTICE: Question[] = [
  { id: 'a2-09-p1', topic: TP, prompt: '___ the flour in a big bowl.', options: ['Put', 'Puts', 'Putting'], answer: 0, tip: 'Receta: verbo base al principio (Put).', tags: T },
  { id: 'a2-09-p2', topic: TP, kind: 'fix', prompt: "Don't to open the oven.", options: ["Don't open the oven.", 'Not open the oven.', "Don't opening the oven."], answer: 0, tip: "Prohibir: Don't + verbo base.", tags: T },
  { id: 'a2-09-p3', topic: TP, prompt: 'There is ___ flour in this sack.', options: ['some', 'any', 'a'], answer: 0, tip: 'Afirmativo: some.', tags: T },
  { id: 'a2-09-p4', topic: TP, prompt: "There isn't ___ salt in the kitchen.", options: ['any', 'some', 'many'], answer: 0, tip: 'Negativo: any.', tags: T },
  { id: 'a2-09-p5', topic: TP, kind: 'order', prompt: '¿Hay sacos en el granero?', options: ['Are', 'there', 'any', 'sacks', 'in', 'the', 'barn?'], answer: 0, tip: 'Pregunta: Are there any + plural?', tags: T },
  { id: 'a2-09-p6', topic: TP, prompt: 'How ___ water do we need?', options: ['much', 'many', 'some'], answer: 0, tip: 'water no se cuenta: How much…?', tags: T },
  { id: 'a2-09-p7', topic: TP, prompt: 'How much ___ a loaf of bread?', options: ['is', 'are', 'do'], answer: 0, tip: 'Precio: How much is…?', tags: T },
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
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-mill-minion'],
    // Fase 1: some / any · Fase 2: when / while (repaso de A2-08)
    phases: [
      {
        hp: 3,
        title: 'Some / any',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-mill-minion-some'],
        line: { text: "There is any flour! There aren't some sacks!", es: '¡Hay harina! ¡No hay sacos! (any y some al revés: mal).' },
      },
      {
        hp: 3,
        title: 'When / While',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-mill-minion-while'],
        line: { text: 'I was carry the sacks while the wheel stop!', es: '¡Yo estaba cargando los sacos mientras la rueda se detuvo! (was carry, stop: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#b8a888', hair: '#3a2a1a', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: "The mill is silent and there isn't some flour. Go away!", es: 'El molino está en silencio y no hay harina. ¡Vete! (isn’t some: mal).' },
      { text: 'I was sleep when the wheel stop. I didn’t saw nothing!', es: 'Yo estaba durmiendo cuando la rueda se detuvo. ¡No vi nada! (was sleep, stop, didn’t saw nothing: mal).' },
    ],
    after: [
      { text: "There isn't any flour… I was sleeping when the wheel stopped. Oh. My words are back.", es: 'No hay harina… Yo estaba durmiendo cuando la rueda se detuvo. Oh. Mis palabras volvieron.' },
      { text: 'The cart stopped here that night… I heard its wheels on the stones.', es: 'El carro se detuvo aquí esa noche… Oí sus ruedas sobre las piedras.' },
    ],
    freed: { text: 'Talk to Mr. Bell, the miller. He is near the wheel.', es: 'Habla con el señor Bell, el molinero. Está cerca de la rueda.' },
    bonus: { q: 'Before you go! Is there ___ bread for the miller?', options: ['any', 'some', 'many'], answer: 0, tip: 'Pregunta: any (Is there any…?).' },
  },
  // Eco opcional (1 fase): aparece en el corral viejo tras hablar con el molinero. Repasa recetas en imperativo y da un escudo.
  [A2_09_ECHO]: {
    id: A2_09_ECHO,
    name: 'Eco del molino',
    person: 'Echo of the Mill',
    kind: 'minion',
    echo: true,
    hp: 4,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-mill-echo'],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#d8cfb8', hair: '#8a8070', skin: '#c9b8d8', gender: 'female' },
    before: [
      { text: 'Mixes the flour… Adds the water… I forget my old recipe…', es: 'Mezcla la harina… Añade el agua… Olvido mi vieja receta… (Mixes, Adds: mal en una receta).' },
      { text: 'Not open the oven! Bakes the bread!', es: '¡No abras el horno! ¡Hornea el pan! (Not open, Bakes: mal).' },
    ],
    after: [
      { text: "Mix the flour… add the water… don't open the oven. My recipe is back. Thank you.", es: 'Mezcla la harina… añade el agua… no abras el horno. Mi receta volvió. Gracias.' },
    ],
    freed: { text: 'Bake the bread for forty minutes.', es: 'Hornea el pan durante cuarenta minutos.' },
    bonus: { q: 'Before I go! ___ the bread cool before you eat it.', options: ['Let', 'Lets', 'Letting'], answer: 0, tip: 'Imperativo: verbo base (Let).' },
  },
  // Jefe (3 fases): aparece junto a la rueda tras hablar con el molinero. Entrega el fragmento.
  [A2_09_BOSS]: {
    id: A2_09_BOSS,
    name: 'La rueda rota',
    person: 'The Broken Wheel',
    kind: 'boss',
    hp: 9,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-mill-boss'],
    // Fase 1: imperativo · Fase 2: some / any y cantidades · Fase 3: compras
    phases: [
      {
        hp: 3,
        title: 'Imperativo',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-mill-boss-imp'],
        line: { text: 'Not touch me! Opens the gate! Closes the gate!', es: '¡No me toques! ¡Abre la compuerta! ¡Cierra la compuerta! (Not touch, Opens, Closes: mal).' },
      },
      {
        hp: 3,
        title: 'Some / any',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-mill-boss-some'],
        line: { text: "There isn't some water! How many flour do you want?", es: '¡No hay agua! ¿Cuánta harina quieres? (isn’t some, many flour: mal).' },
      },
      {
        hp: 3,
        title: 'Compras',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-mill-boss-shop'],
        line: { text: 'How much cost my flour? It are very expensive!', es: '¿Cuánto cuesta mi harina? ¡Es muy cara! (How much cost, It are: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#5a4a3a', hair: '#2a2016', skin: '#c9b8d8', gender: 'male' },
    before: [
      { text: 'You woke me up! Now I don’t turn for nobody!', es: '¡Me despertaste! ¡Ahora no giro para nadie! (don’t… nobody: mal).' },
      { text: 'Not come closer! I took the words of this mill, because the light was mine!', es: '¡No te acerques! Me llevé las palabras de este molino, ¡porque la luz era mía! (Not come: mal).' },
    ],
    after: [
      { text: 'I turned every day… The water is moving again.', es: 'Yo giraba todos los días… El agua se mueve otra vez.' },
      { text: 'The cart… it stopped by the mill that night. I saw it. But I cannot say more.', es: 'El carro… se detuvo junto al molino esa noche. Lo vi. Pero no puedo decir más.' },
    ],
    freed: { text: 'The cart stopped by the mill. I cannot say more.', es: 'El carro se detuvo junto al molino. No puedo decir más.' },
    farewell: {
      q: 'The miller: Thank you! Is there any flour for the bread now?',
      options: ['Yes, there is some flour in the sacks.', 'Yes, there is any flour in the sacks.', 'Yes, there are some flour in the sacks.'],
      answer: 0,
      tip: 'Afirmación: some · flour es incontable: there is.',
    },
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
    // La rueda rota aparece junto al molino tras despertarla (Wake the Mill)
    { type: 'enemy', id: A2_09_BOSS, x: 11, y: 8, after: A2_09_WAKE },
  ],
  labels: [
    { text: 'Mill', x: 11, y: 6 },
    { text: 'River', x: 8, y: 9 },
    { text: 'Barn', x: 2, y: 2 },
  ],
  zoneAt,
  examine: {
    '11,7': { text: 'The mill wheel. The water turned it every day. Now it is silent.', sub: 'La rueda del molino. El agua la giraba todos los días. Ahora está en silencio.', say: 'The mill wheel is silent.', tone: 'warn' },
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
    { label: 'Detective: ¿qué pasó esa noche?', done: s.opened.includes(A2_09_DETECTIVE) },
    { label: 'Wake the Mill', done: s.opened.includes(A2_09_WAKE) },
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
