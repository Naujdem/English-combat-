import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { SCHOOL_ENEMIES } from './school'
import { CITY_PAST_ENEMIES } from './cityPast'

/**
 * La torre Green Valley en 2056 (A1, futuro): el final de A1. Donde estuvo el viejo cine (1996) y la oficina
 * (presente), ahora hay una torre de cristal con la misma distribución de la oficina.
 * Hoy Diana (la señora Clark) se jubila y Paula va a ser la nueva directora. Ray (el señor Stone), que toda la vida
 * quiso ser el jefe, se encerró en la dirección con el último fragmento de tu voz del futuro.
 * Gramática: want to / would like to + repaso de todo A1.
 * Leyenda nueva:  4  ascensor
 * Aquí aparecen Rick (del presente) y Tony (de 1996), traídos por la luz del reloj.
 */
const MAP = [
  '################',
  '#t..K..p#O..A.p#',
  '#.......q......#',
  '#..K....q......#',
  '####d####ii#X###',
  '#..............#',
  '#.OO.OO.q......#',
  '#.......d.KKK..#',
  '#.OO.OO.q.KKK..#',
  '#.......q......#',
  '#####.##4##.####',
  '#p............p#',
  '#..CCC.........#',
  '#.....H...H....#',
  '#p.....d......p#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x >= 9 ? 'cima-torre' : 'oficina-torre'
  if (y >= 6 && y <= 9 && x >= 9) return 'sala-torre'
  if (y >= 11) return 'lobby-torre'
  return 'oficina-torre'
}

export const TOWER_FUTURE_REQUIREMENTS: Requirement[] = [
  {
    id: 'future-speech',
    name: 'el discurso de Diana (en la sala de reuniones)',
    line: {
      text: "Stop! This is the director's office! I want be the director! Diana wants to say goodbye? Go and help her with her speech!",
      es: '¡Alto! ¡Esta es la oficina del director! ¡Quiero ser el director! ¿Diana se quiere despedir? ¡Ve a ayudarla con su discurso! (Se equivoca: dice "I want be").',
    },
  },
]

export const TOWER_FUTURE: SceneDef = {
  id: 'office-future',
  name: 'La torre Green Valley (2056)',
  era: 'Futuro',
  topics: ['want-to'],
  map: MAP,
  start: { x: 7, y: 14 },
  bossDoor: { x: 12, y: 4 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 6, y: 1 },
    { type: 'interest', x: 7, y: 3 },
    { type: 'npc', id: 'diana-old', x: 13, y: 7 },
    { type: 'npc', id: 'grace-old', x: 2, y: 3 },
    { type: 'enemy', id: 'office-future-m1', x: 7, y: 9 },
    { type: 'enemy', id: 'office-future-m2', x: 8, y: 11 },
    { type: 'enemy', id: 'office-future-rick', x: 13, y: 13 },
    { type: 'enemy', id: 'office-future-tony', x: 14, y: 5 },
    { type: 'boss', id: 'office-future-boss', x: 12, y: 2 },
  ],
  labels: [
    { text: 'Cafetería', x: 3, y: 2 },
    { text: 'Dirección', x: 12, y: 3 },
    { text: 'Escritorios', x: 4, y: 7 },
    { text: 'Reuniones', x: 11, y: 9 },
    { text: 'Recepción', x: 4, y: 13 },
  ],
  zoneAt,
  requirements: TOWER_FUTURE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['office-future'] ?? 0}/2`, done: (s.keys['office-future'] ?? 0) >= 2 },
    { label: 'Discurso', done: s.opened.includes('future-speech') },
  ],
  intro: {
    first:
      'La torre Green Valley en 2056: donde estuvo el viejo cine y después la oficina, ahora hay una torre de cristal. Hoy Diana, la señora Clark, se jubila. El último fragmento de tu voz del futuro está aquí. Ayuda a Diana con su discurso y busca a Paula y a LIFT-9: tienen las dos mitades de la llave.',
    later: 'Para decir lo que quieres: I want to + verbo. Con más cortesía: I would like to... · Would you like to...?',
  },
  epilogue: 'office-future-epilogue',
  door: {
    text: 'La puerta de la dirección, en el último piso, está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Paula, la nueva directora, y LIFT-9, el robot del ascensor.',
  },
}

export const TOWER_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  'office-future-m1': {
    id: 'office-future-m1',
    name: 'Paula, la nueva directora',
    person: 'Paula',
    kind: 'minion',
    hp: 5,
    topics: ['want-to'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['oficina-torre'],
    // Paula, la secretaria de la oficina, treinta años después: el mismo pelo, ahora con gafas
    look: { shirt: '#d4537e', hair: '#4a4a4a', skin: '#c68642', gender: 'female', accessory: 'glasses' },
    before: [
      { text: "Director? Me? Tomorrow? I want be a good director... but I wants to run away! I would like go home!", es: '¿Directora? ¿Yo? ¿Mañana? Quiero ser una buena directora... ¡pero quiero salir corriendo! ¡Me gustaría irme a casa! (Se equivoca: want be, I wants to, would like go).' },
      { text: "Diana gave me half of the key to her office. Do you want it? Then answer me... I'm very nervous!", es: 'Diana me dio la mitad de la llave de su oficina. ¿La quieres? Entonces respóndeme... ¡Estoy muy nerviosa!' },
    ],
    after: [
      { text: "I want to be a good director. I would like to help everyone in this tower. OK... I can do it!", es: 'Quiero ser una buena directora. Me gustaría ayudar a todos en esta torre. Bueno... ¡puedo hacerlo!' },
      { text: 'Take the key. The other half is with LIFT-9, the elevator robot. It is in the lobby.', es: 'Toma la llave. La otra mitad la tiene LIFT-9, el robot del ascensor. Está en la recepción.' },
    ],
    freed: { text: "Thirty years ago I wrote emails all day. Tomorrow I'm going to be the director. Life is funny!", es: 'Hace treinta años escribía correos todo el día. Mañana voy a ser la directora. ¡La vida es curiosa!' },
    bonus: { q: 'One more! Paula is nervous. What does she say?', options: ['I want to be a good director.', 'I want be a good director.', 'I wants to be a good director.'], answer: 0, tip: 'I + want to + verbo: I want to be...' },
  },
  'office-future-m2': {
    id: 'office-future-m2',
    name: 'LIFT-9, el robot del ascensor',
    person: 'LIFT-9',
    kind: 'minion',
    animal: 'robot',
    hp: 5,
    topics: ['want-to'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['lobby-torre'],
    look: { shirt: '#9aa6b2', hair: '#e0a526', skin: '#d9e2ea' },
    before: [
      { text: 'BEEP! Welcome to Green Valley Tower! Where you would like go? Would you like going up? You want to the floor nine?', es: '¡BIP! ¡Bienvenidos a la torre Green Valley! ¿A dónde le "gustaría ir"? ¿Le gustaría subir? ¿Quiere el piso nueve? (Se equivoca: Where you would like go, Would you like going, You want to the floor).' },
      { text: 'Half of a key is in my memory box. You would like it? Answer me first. BEEP!', es: 'La mitad de una llave está en mi caja de memoria. ¿La quiere? Primero respóndame. ¡BIP!' },
    ],
    after: [
      { text: 'BEEP. Where would you like to go? Would you like to go up? Do you want to go to floor nine? System OK!', es: 'BIP. ¿A dónde le gustaría ir? ¿Le gustaría subir? ¿Quiere ir al piso nueve? ¡Sistema bien!' },
      { text: "Take the key. The director's office is on the top floor. Mr. Stone is there... and he doesn't want to leave. BEEP!", es: 'Tome la llave. La oficina de la dirección está en el último piso. El señor Stone está allá... y no quiere salir. ¡BIP!' },
    ],
    freed: { text: 'BEEP! Would you like to go up or down? I like up. Up is fun!', es: '¡BIP! ¿Le gustaría subir o bajar? A mí me gusta subir. ¡Subir es divertido!' },
    bonus: { q: 'Last question! LIFT-9 asks you politely:', options: ['Would you like to go up?', 'Would you like go up?', 'Do you would like to go up?'], answer: 0, tip: 'Would you like + to + verbo...?' },
  },

  // ── Viajeros de otras épocas: la luz del reloj los trajo a 2056. Al vencerlos vuelven a su tiempo ──
  'office-future-rick': {
    ...SCHOOL_ENEMIES['school-m2'],
    id: 'office-future-rick',
    name: 'Rick (viene del presente)',
    optional: true,
    echo: true,
    tags: ['lobby-torre'],
    before: [
      { text: 'Where am I? This is not my school! But I is the best student here too. My English are perfect!', es: '¿Dónde estoy? ¡Esta no es mi escuela! Pero aquí también "soy" el mejor estudiante. ¡Mi inglés "son" perfecto! (Otra vez se equivoca con to be).' },
      { text: 'A white light brought me here. Answer me, and maybe I can go back to my school!', es: 'Una luz blanca me trajo aquí. ¡Respóndeme, y tal vez pueda volver a mi escuela!' },
    ],
    after: [
      { text: 'I am not perfect. I am a student, and I am learning. That is OK!', es: 'No soy perfecto. Soy un estudiante y estoy aprendiendo. ¡Y está bien!' },
      { text: 'The light is here again... I am going back to my school. Bye!', es: 'La luz volvió... Me voy de vuelta a mi escuela. ¡Adiós!' },
    ],
    bonus: { q: 'Before you go! Rick and Tom ___ in the same class.', options: ['are', 'is', 'am'], answer: 0, tip: 'Rick and Tom = they: are.' },
  },
  'office-future-tony': {
    ...CITY_PAST_ENEMIES['city-past-m1'],
    id: 'office-future-tony',
    name: 'Tony (viene de 1996)',
    optional: true,
    echo: true,
    tags: ['oficina-torre'],
    before: [
      { text: 'Hey! Where is my bike? Yesterday I deliver bread in a small town, and today I walk up nine floors of a glass tower!', es: '¡Oye! ¿Dónde está mi bici? Ayer "entrego" pan en un pueblo pequeño, ¡y hoy "subo" nueve pisos de una torre de cristal! (Otra vez se equivoca con el pasado: deliver, walk).' },
      { text: 'A white light took me. Answer me fast, and maybe I can go home!', es: 'Una luz blanca me llevó. ¡Respóndeme rápido y tal vez pueda volver a casa!' },
    ],
    after: [
      { text: 'Yesterday I delivered bread. Today I walked up nine floors! Ha ha. Nobody is going to believe me.', es: 'Ayer entregué pan. ¡Hoy subí nueve pisos! Ja, ja. Nadie me va a creer.' },
      { text: 'The light! I am going home. Bye, tower!', es: '¡La luz! Me voy a casa. ¡Adiós, torre!' },
    ],
    bonus: { q: 'Before you go! Yesterday Tony ___ up nine floors.', options: ['walked', 'walk', 'walks'], answer: 0, tip: 'Yesterday = pasado: walked.' },
  },

  'office-future-boss': {
    id: 'office-future-boss',
    name: 'El señor Stone (2056)',
    person: 'Mr. Stone',
    kind: 'boss',
    reward: 'traje-2056',
    hp: 12,
    topics: ['want-to', 'past-irregular', 'going-to', 'present-simple'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['cima-torre'],
    phases: [
      { hp: 4, topics: ['want-to'], kinds: ['fill', 'fix', 'listen'], tags: ['cima-torre', 'sala-torre'] },
      {
        hp: 4,
        topics: ['was-were', 'past-irregular', 'past-did', 'past-time'],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['cima-torre'],
        line: { text: 'Sixty years ago I want... I wanted... In 1996 I fix the projector! I was want to be the boss!', es: 'Hace sesenta años quiero... quería... ¡En 1996 "arreglo" el proyector! ¡Yo "era querer" ser el jefe! (Se le mezcla el pasado).' },
      },
      {
        hp: 4,
        topics: ['want-to', 'going-to', 'present-simple', 'to-be', 'can'],
        kinds: ['fill', 'fix', 'order', 'listen', 'write'],
        tags: ['cima-torre', 'lobby-torre'],
        line: { text: 'Now I am... Tomorrow I going to... What do I want? What do I REALLY want?', es: 'Ahora soy... Mañana voy a... ¿Qué quiero? ¿Qué quiero DE VERDAD?' },
      },
    ],
    // El señor Stone (Ray, el proyeccionista de 1996), sesenta años después: la misma ropa oscura y las gafas, muy mayor
    look: { shirt: '#2b2b2b', hair: '#e8e8e8', skin: '#e0ac69', accessory: 'glasses' },
    before: [
      { text: "Stop! I'm eighty years old, and for sixty years I want be the boss! Diana's chair is MINE now!", es: '¡Alto! ¡Tengo ochenta años, y durante sesenta años "quiero ser" el jefe! ¡La silla de Diana ahora es MÍA! (Se equivoca: dice I want be).' },
      { text: 'A shiny thing fell on my desk last night. I took it, and I came up here. I would like sit in this chair... forever!', es: 'Anoche cayó una cosa brillante en mi escritorio. La tomé y subí aquí. Me "gustaría sentar" en esta silla... ¡para siempre! (Se equivoca: would like sit).' },
      { text: 'You want this piece of metal? Then answer everything. Past, present, future... EVERYTHING!', es: '¿Quieres este pedazo de metal? Entonces responde todo. Pasado, presente, futuro... ¡TODO!' },
    ],
    after: [
      { text: "Oh... I don't want this chair. I didn't want an office. I wanted my friends... and my old cinema.", es: 'Oh... No quiero esta silla. No quería una oficina. Quería a mis amigos... y mi viejo cine.' },
      { text: "Last night a man in a dark coat came up here. He looked at the city for a long time and said: 'From here you can see everything. The school, the street, the farm... I would like to say goodbye to all of them.'", es: 'Anoche un hombre con abrigo oscuro subió aquí. Miró la ciudad un largo rato y dijo: "Desde aquí se ve todo. La escuela, la calle, la granja... Me gustaría despedirme de todos".' },
      { text: 'This piece of metal is yours. And take this suit from 2056: every director needs one... Ha ha, and you are the director of your own story!', es: 'Este pedazo de metal es tuyo. Y toma este traje de 2056: todo director necesita uno... ¡Ja, ja, y tú eres el director de tu propia historia!' },
    ],
    freed: { text: 'Would you like some popcorn? Ha ha. Old habits!', es: '¿Quieres palomitas? Ja, ja. ¡Viejas costumbres!' },
    farewell: {
      q: 'Thank you, kids. Would you like to come to the cinema with me and Diana one day?',
      options: ["Yes, I'd like to! Thank you, Mr. Stone.", 'Yes, I like to come cinema!', 'Yes, I would like come!'],
      answer: 0,
      tip: "Para aceptar con cortesía: Yes, I'd like to!",
    },
  },
}
