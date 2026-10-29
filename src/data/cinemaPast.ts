import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { OFFICE_ENEMIES } from './office'
import { BARRIO_ENEMIES } from './barrio'

/**
 * El viejo cine en 1996 (A1, pasado): donde hoy está la oficina de Green Valley Company había un cine.
 * Arriba la sala (pantalla, butacas y proyector); abajo el vestíbulo (taquilla, palomitas) y la oficina del dueño.
 * Gramática: expresiones de tiempo en pasado (yesterday, last week, two days ago, in 1990, When did...?)
 * y repaso de todo el pasado de A1. Es el último lugar del pasado de A1.
 * Leyenda nueva:  v  pantalla   s  butacas   h  pared con afiche   j  máquina de palomitas   l  proyector
 * Aquí también aparecen dos esbirros del presente (Gary y Kevin), traídos por la luz del reloj.
 */
const MAP = [
  '####vvvvvvvv####',
  '#..............#',
  '#.ssss..ssss...#',
  '#..............#',
  '#.ssss..ssss...#',
  '#..............#',
  '#.ssss..ssss.l.#',
  '#..............#',
  '#hhh##d###hhh###',
  '#.........#....#',
  '#.CC....j.#....#',
  '#.........X....#',
  '#.........#..O.#',
  '#.........#....#',
  '#..p...p..######',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 7) return 'sala-cine'
  if (x >= 11 && y >= 9) return 'oficina-cine'
  return 'vestibulo'
}

export const CINEMA_PAST_REQUIREMENTS: Requirement[] = [
  {
    id: 'past-timeline',
    name: 'la historia del cine (Diana, en la taquilla)',
    line: {
      text: 'Stop! The film started ago one hour! You are late! Did you buy a ticket? Talk to Diana at the ticket office!',
      es: '¡Alto! ¡La película empezó hace una hora! ¡Llegas tarde! ¿Compraste boleta? ¡Habla con Diana en la taquilla! (Se equivoca: dice "ago one hour").',
    },
  },
]

export const CINEMA_PAST: SceneDef = {
  id: 'office-past',
  name: 'El viejo cine (1996)',
  era: 'Pasado',
  topics: ['past-time'],
  map: MAP,
  start: { x: 5, y: 13 },
  bossDoor: { x: 10, y: 11 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 3, y: 12 },
    { type: 'interest', x: 7, y: 12 },
    { type: 'npc', id: 'diana', x: 4, y: 10 },
    { type: 'enemy', id: 'office-past-m1', x: 13, y: 7 },
    { type: 'enemy', id: 'office-past-m2', x: 8, y: 11 },
    { type: 'enemy', id: 'office-past-gary', x: 1, y: 3 },
    { type: 'enemy', id: 'office-past-kevin', x: 7, y: 5 },
    { type: 'boss', id: 'office-past-boss', x: 13, y: 11 },
  ],
  labels: [
    { text: 'Sala', x: 7, y: 1 },
    { text: 'Taquilla', x: 2, y: 9 },
    { text: 'Palomitas', x: 8, y: 9 },
    { text: 'Oficina', x: 12, y: 9 },
  ],
  zoneAt,
  requirements: CINEMA_PAST_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['office-past'] ?? 0}/2`, done: (s.keys['office-past'] ?? 0) >= 2 },
    { label: 'Historia del cine', done: s.opened.includes('past-timeline') },
  ],
  intro: {
    first:
      'Green Valley Cinema, 1996: donde hoy está la oficina, había un cine. Aquí está el último fragmento de tu voz del pasado. Ayuda a Diana con la historia del cine y busca a Ray, el proyeccionista, y a Grace, la de las palomitas: tienen las dos mitades de la llave.',
    later: 'Palabras de tiempo en pasado: yesterday, last night, last week, two days ago, in 1990. Ago va después: two days ago.',
  },
  epilogue: 'office-past-epilogue',
  door: {
    text: 'La puerta de la oficina del dueño está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Ray, el proyeccionista, y Grace, la de las palomitas.',
  },
}

export const CINEMA_PAST_ENEMIES: Record<string, EnemyDef> = {
  'office-past-m1': {
    id: 'office-past-m1',
    name: 'Ray, el proyeccionista',
    person: 'Ray',
    kind: 'minion',
    hp: 5,
    topics: ['past-time'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['sala-cine'],
    // El señor Stone de joven: la misma ropa oscura
    look: { shirt: '#2b2b2b', hair: '#3b2a1a', skin: '#e0ac69', accessory: 'glasses' },
    before: [
      { text: 'Shh! The film is on! I fixed this projector ago two days, and yesterday night it broke again. In last week it broke three times!', es: '¡Shh! ¡Están dando la película! Arreglé este proyector hace dos días, y anoche se volvió a dañar. ¡La semana pasada se dañó tres veces! (Se equivoca: dice ago two days, yesterday night, in last week).' },
      { text: 'Mr. Clark gave me half of a key. You want it? Then tell me WHEN things happened, correctly!', es: 'El señor Clark me dio la mitad de una llave. ¿La quieres? ¡Entonces dime CUÁNDO pasaron las cosas, bien dicho!' },
    ],
    after: [
      { text: 'I fixed it two days ago, and last night it broke again. Last week it broke three times. Ha! Now I can say it.', es: 'Lo arreglé hace dos días, y anoche se volvió a dañar. La semana pasada se dañó tres veces. ¡Ja! Ahora sí lo puedo decir.' },
      { text: 'Take the key. You know, I want to be a manager one day. A big boss, in a big office. Ha ha!', es: 'Toma la llave. ¿Sabes? Un día quiero ser gerente. Un gran jefe, en una gran oficina. ¡Ja, ja!' },
    ],
    freed: { text: 'The projector works now. I fixed it ten minutes ago!', es: 'El proyector ya funciona. ¡Lo arreglé hace diez minutos!' },
    bonus: { q: 'One more! Today is Friday. When was Wednesday?', options: ['Two days ago.', 'Ago two days.', 'Last two days.'], answer: 0, tip: 'Ago va después del tiempo: two days ago.' },
  },
  'office-past-m2': {
    id: 'office-past-m2',
    name: 'Grace, la de las palomitas',
    person: 'Grace',
    kind: 'minion',
    hp: 5,
    topics: ['past-time'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['vestibulo'],
    // Grace, la asistente de la oficina, de joven
    look: { shirt: '#e07b39', hair: '#2b1d14', skin: '#8d5524', gender: 'female' },
    before: [
      { text: 'Popcorn? I sold two hundred bags the last week! And in yesterday I sold fifty. Before three days I sold one hundred!', es: '¿Palomitas? ¡La semana pasada vendí doscientas bolsas! Y ayer vendí cincuenta. ¡Hace tres días vendí cien! (Se equivoca: dice the last week, in yesterday, before three days).' },
      { text: 'Half of a key fell into my popcorn machine. Fix my words, and it is yours!', es: 'La mitad de una llave cayó en mi máquina de palomitas. ¡Arregla mis palabras y es tuya!' },
    ],
    after: [
      { text: 'Last week I sold two hundred bags. Yesterday I sold fifty, and three days ago one hundred. Perfect!', es: 'La semana pasada vendí doscientas bolsas. Ayer vendí cincuenta, y hace tres días cien. ¡Perfecto!' },
      { text: 'Here is the other half of the key. Mr. Clark is in his office. One day I want to work in an office too, with a phone and a big desk!', es: 'Aquí está la otra mitad de la llave. El señor Clark está en su oficina. ¡Un día yo también quiero trabajar en una oficina, con teléfono y un escritorio grande!' },
    ],
    freed: { text: 'I made fresh popcorn five minutes ago. Do you want some?', es: 'Hice palomitas frescas hace cinco minutos. ¿Quieres?' },
    bonus: { q: 'Last question! ___ week I sold two hundred bags.', options: ['Last', 'The last', 'In last'], answer: 0, tip: 'Sin "the" ni "in": last week.' },
  },

  // ── Esbirros del presente: la luz del reloj los trajo a 1996. Al vencerlos vuelven a su tiempo ──
  'office-past-gary': {
    ...OFFICE_ENEMIES['office-m1'],
    id: 'office-past-gary',
    name: 'Gary (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: "Good night! I mean... good morning! Is it nine and half? Where is my office? This is a CINEMA!", es: '¡Buenas noches! Digo... ¡buenos días! ¿Son las "nueve y media"? ¿Dónde está mi oficina? ¡Esto es un CINE! (Otra vez se equivoca con la hora).' },
      { text: 'I touched the clock piece on my desk, and then... a white light! The film starts in Monday at the night! Tell me the time, correctly!', es: 'Toqué la pieza del reloj de mi escritorio, y luego... ¡una luz blanca! ¡La película empieza "en" lunes "a" la noche! ¡Dime la hora, bien dicha!' },
    ],
    after: [
      { text: "It's half past nine, and the film starts on Monday at night. Oh! The white light again!", es: 'Son las nueve y media, y la película empieza el lunes en la noche. ¡Oh! ¡Otra vez la luz blanca!' },
      { text: 'I am going back to my office. Thank you! See you at Green Valley Company!', es: 'Vuelvo a mi oficina. ¡Gracias! ¡Nos vemos en Green Valley Company!' },
    ],
    bonus: { q: 'Before you go! The film starts at 7:30. What time is it?', options: ["It's half past seven.", "It's seven and half.", "It's half to seven."], answer: 0, tip: '7:30 = half past seven.' },
  },
  'office-past-kevin': {
    ...BARRIO_ENEMIES['barrio-m1'],
    id: 'office-past-kevin',
    name: 'Kevin (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: 'Hey! I can to see a film! I cans eat all the popcorn! Wait... where is the park? Where is Green Street?', es: '¡Oye! ¡Sé "a" ver una película! ¡"Puedos" comer todas las palomitas! Espera... ¿dónde está el parque? ¿Dónde está Green Street? (Otra vez se equivoca con can).' },
      { text: 'I touched the piece of the key under the tree, and a white light brought me here. Can you help me? Show me what you can do!', es: 'Toqué el pedazo de la llave bajo el árbol, y una luz blanca me trajo aquí. ¿Me ayudas? ¡Muéstrame lo que sabes hacer!' },
    ],
    after: [
      { text: "OK, OK... I can watch a film. I can't eat ALL the popcorn. And look, the white light!", es: 'Bueno, bueno... Puedo ver una película. No puedo comerme TODAS las palomitas. ¡Y mira, la luz blanca!' },
      { text: 'I can go home now! Thank you! See you on Green Street!', es: '¡Ya puedo volver a casa! ¡Gracias! ¡Nos vemos en Green Street!' },
    ],
    bonus: { q: 'Before you go! Can you see a film in a cinema?', options: ['Yes, you can.', 'Yes, you can to.', 'Yes, you cans.'], answer: 0, tip: 'Respuesta corta: Yes, you can.' },
  },

  'office-past-boss': {
    id: 'office-past-boss',
    name: 'El señor Clark, dueño del cine',
    person: 'Mr. Clark',
    kind: 'boss',
    reward: 'boina',
    hp: 12,
    topics: ['past-time', 'past-did', 'past-irregular', 'past-regular', 'was-were'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['oficina-cine'],
    phases: [
      { hp: 4, topics: ['past-time'], kinds: ['fill', 'fix', 'listen'], tags: ['oficina-cine', 'vestibulo'] },
      {
        hp: 4,
        topics: ['past-did', 'past-irregular'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['oficina-cine', 'campo-viejo', 'obra'],
        line: { text: "I opened this cinema in the 1980! Did you came for my film? Nobody watched it... ago years!", es: '¡Abrí este cine "en el" 1980! ¿Viniste por mi película? Nadie la vio... ¡hace años! (Se equivoca: in the 1980, did you came, ago years).' },
      },
      {
        hp: 4,
        topics: ['past-time', 'past-did', 'past-irregular', 'past-regular', 'was-were'],
        kinds: ['fill', 'fix', 'order', 'listen', 'write'],
        tags: ['oficina-cine', 'sala-cine', 'calle-vieja', 'aula-vieja'],
        line: { text: 'Yesterday... last week... thirty years ago... When was it? I... I remember my films!', es: 'Ayer... la semana pasada... hace treinta años... ¿Cuándo fue? Yo... ¡recuerdo mis películas!' },
      },
    ],
    // El papá de la señora Clark: las mismas gafas y la misma camisa morada
    look: { shirt: '#7a4fa3', hair: '#9a9a9a', skin: '#f1c27d', accessory: 'glasses' },
    before: [
      { text: 'Who are you? The film started ago twenty minutes! In yesterday nobody came, and the last week nobody came!', es: '¿Quiénes son? ¡La película empezó hace veinte minutos! ¡Ayer no vino nadie, y la semana pasada no vino nadie! (Se equivoca: ago twenty minutes, in yesterday, the last week).' },
      { text: 'Two nights ago this shiny thing fell on my film. Now the cinema is MINE. Every seat, every ticket, every film!', es: 'Hace dos noches esta cosa brillante cayó sobre mi película. Ahora el cine es MÍO. ¡Cada butaca, cada boleta, cada película!' },
    ],
    after: [
      { text: 'Oh... Two nights ago I picked it up, and I changed. I was angry with Diana, with Ray, with Grace... I am sorry.', es: 'Oh... Hace dos noches la recogí y cambié. Me enojé con Diana, con Ray, con Grace... Lo siento.' },
      { text: 'Last night a man in a dark coat bought one ticket. He watched the same film three times: a film about two best friends. At the end, he cried. Then he said: "I know how this story ends." And he left.', es: 'Anoche un hombre con abrigo oscuro compró una boleta. Vio la misma película tres veces: una película sobre dos mejores amigos. Al final lloró. Luego dijo: "Sé cómo termina esta historia". Y se fue.' },
      { text: 'This piece of metal is yours. And take this old cap from the cinema. My daughter Diana loved it!', es: 'Este pedazo de metal es tuyo. Y toma esta boina vieja del cine. ¡A mi hija Diana le encantaba!' },
    ],
    freed: { text: 'Two days ago my cinema was empty. Today it is full! Do you want to watch a film?', es: 'Hace dos días mi cine estaba vacío. ¡Hoy está lleno! ¿Quieres ver una película?' },
    farewell: {
      q: 'Goodbye, children! When did you come to my cinema?',
      options: ['We came an hour ago!', 'We came ago an hour!', 'We come an hour ago!'],
      answer: 0,
      tip: 'Pasado (came) y ago después del tiempo: an hour ago.',
    },
  },
}
