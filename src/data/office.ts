import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * Mapa de la oficina (A1, presente): Green Valley Company, al lado de la ciudad.
 * Arriba: la cafetería (izquierda) y la oficina de la directora (derecha, jefe).
 * En el medio: los escritorios (izquierda) y la sala de reuniones (derecha).
 * Abajo: la recepción, por donde se entra.
 */
const MAP = [
  '################',
  '#V..K..p#O..A.p#',
  '#.......#......#',
  '#..K....#......#',
  '####d#######X###',
  '#..............#',
  '#.OO.OO.#......#',
  '#.......d.KKK..#',
  '#.OO.OO.#.KKK..#',
  '#.......#......#',
  '#####.#####.####',
  '#p............p#',
  '#..CCC.........#',
  '#.....H...H....#',
  '#p.....d......p#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x >= 9 ? 'direccion' : 'oficina'
  if (y >= 6 && y <= 9 && x >= 9) return 'reuniones'
  if (y >= 11) return 'recepcion'
  return 'oficina'
}

export const OFFICE_REQUIREMENTS: Requirement[] = [
  {
    id: 'office-planner',
    name: 'la agenda de la directora (Sara, en la recepción)',
    line: {
      text: 'Who are you? Have you got an appointment? No? Then talk to Sara at reception. My agenda is a disaster!',
      es: '¿Quién eres? ¿Tienes cita? ¿No? Entonces habla con Sara en la recepción. ¡Mi agenda es un desastre!',
    },
  },
  {
    id: 'office-message',
    name: 'el mensaje del teléfono (Grace, en los escritorios)',
    line: {
      text: 'And where are my messages? Nobody answers my phone! Could you help Grace first?',
      es: '¿Y dónde están mis mensajes? ¡Nadie contesta mi teléfono! ¿Podrías ayudar primero a Grace?',
    },
  },
]

export const OFFICE: SceneDef = {
  id: 'office',
  name: 'La oficina',
  topics: ['time', 'object-pronouns', 'could-you'],
  map: MAP,
  start: { x: 7, y: 14 },
  bossDoor: { x: 12, y: 4 },
  keysNeeded: 3,
  entities: [
    { type: 'friend', id: 'leo', x: 6, y: 1 },
    { type: 'interest', x: 7, y: 3 },
    { type: 'npc', id: 'sara', x: 4, y: 11 },
    { type: 'npc', id: 'grace', x: 1, y: 7 },
    { type: 'npc', id: 'diaz', x: 13, y: 12 },
    { type: 'npc', id: 'amy', x: 6, y: 5 },
    { type: 'enemy', id: 'office-m1', x: 11, y: 13 },
    { type: 'enemy', id: 'office-m2', x: 7, y: 9 },
    { type: 'enemy', id: 'office-m3', x: 13, y: 8 },
    { type: 'boss', id: 'office-boss', x: 12, y: 2 },
  ],
  labels: [
    { text: 'Cafetería', x: 3, y: 2 },
    { text: 'Dirección', x: 12, y: 3 },
    { text: 'Escritorios', x: 4, y: 7 },
    { text: 'Reuniones', x: 11, y: 9 },
    { text: 'Recepción', x: 8, y: 12 },
  ],
  zoneAt,
  requirements: OFFICE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys.office ?? 0}/3`, done: (s.keys.office ?? 0) >= 3 },
    { label: 'Agenda', done: s.opened.includes('office-planner') },
    { label: 'Mensaje', done: s.opened.includes('office-message') },
  ],
  intro: {
    first:
      'Green Valley Company. La última pieza del reloj está aquí, y la directora, la señora Clark, la tiene. Todo pasa a la hora equivocada. Ayuda a Sara con la agenda, a Grace con el teléfono y consigue la llave de la dirección.',
    later: 'Habla con amabilidad: Could you...? Y fíjate en la hora: at nine, on Monday, in the morning.',
  },
  epilogue: 'office-epilogue',
  door: {
    text: 'La puerta de la dirección está cerrada con llave.',
    sub: 'Necesitas 3 pedazos de la llave: los tienen Gary, Paula y el señor Stone.',
  },
}

export const OFFICE_ENEMIES: Record<string, EnemyDef> = {
  'office-m1': {
    id: 'office-m1',
    name: 'Gary, el del reloj loco',
    person: 'Gary',
    kind: 'minion',
    hp: 4,
    topics: ['time'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['recepcion'],
    look: { shirt: '#5b7a99', hair: '#6b3b1f', skin: '#f1c27d', accessory: 'glasses' },
    before: [
      { text: "Good night! I mean... good morning! It's eight and half! No, it's nine and quarter! The meeting is in Monday at the morning!", es: '¡Buenas noches! Digo... ¡buenos días! ¡Son las "ocho y media"! ¡No, las "nueve y cuarto"! ¡La reunión es "en" lunes "a" la mañana!' },
      { text: 'This shiny clock piece is on my desk, and now every clock is crazy! I have got a piece of a key too. Tell me the time... correctly!', es: '¡Esta pieza brillante de reloj está en mi escritorio, y ahora todos los relojes están locos! También tengo un pedazo de llave. Dime la hora... ¡bien dicha!' },
    ],
    after: [
      { text: "It's half past nine. The meeting is on Monday at ten, in the morning. Ah, my head is OK now!", es: 'Son las nueve y media. La reunión es el lunes a las diez, en la mañana. ¡Ah, mi cabeza ya está bien!' },
      { text: 'Take the piece of the key. And be careful with Ms. Clark: she is very angry today.', es: 'Toma el pedazo de la llave. Y cuidado con la señora Clark: hoy está muy enojada.' },
    ],
    freed: { text: "It's quarter past ten. I'm a receptionist, and I'm never late!", es: 'Son las diez y cuarto. Soy recepcionista, ¡y nunca llego tarde!' },
    bonus: { q: 'One more! The clock says 7:45. What time is it?', options: ["It's quarter to eight.", "It's quarter past seven.", "It's seven and forty-five past."], answer: 0, tip: '7:45 = quarter to eight (falta un cuarto para las ocho).' },
  },
  'office-m2': {
    id: 'office-m2',
    name: 'Paula, la de los correos',
    person: 'Paula',
    kind: 'minion',
    hp: 4,
    topics: ['object-pronouns'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['oficina'],
    look: { shirt: '#d4537e', hair: '#1f1f1f', skin: '#c68642', gender: 'female' },
    before: [
      { text: 'Emails, emails! Send it to he! Call she! Them are my emails, give they to I!', es: '¡Correos, correos! ¡Envíaselo a "él" (he)! ¡Llama a "ella" (she)! ¡"Ellos" son mis correos, dáselos a "yo"!' },
      { text: 'Ms. Clark gives me a piece of a key. Do you want it? Answer me, and maybe I give it to... you!', es: 'La señora Clark me da un pedazo de llave. ¿Lo quieres? Respóndeme, y quizás te lo doy... ¡a ti!' },
    ],
    after: [
      { text: 'Send it to him. Call her. Give them to me. Oh! Now my emails make sense!', es: 'Envíaselo a él. Llámala. Dámelos. ¡Oh! ¡Ahora mis correos tienen sentido!' },
      { text: 'Here is the piece of the key. Take it, it is for you.', es: 'Aquí está el pedazo de la llave. Tómalo, es para ti.' },
    ],
    freed: { text: "I'm a secretary. I write a lot of emails, and I answer them all!", es: 'Soy secretaria. Escribo muchos correos, ¡y los respondo todos!' },
    bonus: { q: 'Last one! Leo needs the report. What do you say?', options: ['Give it to him, please.', 'Give it to he, please.', 'Give it to his, please.'], answer: 0, tip: 'Después de to: him.' },
  },
  'office-m3': {
    id: 'office-m3',
    name: 'El señor Stone, el gerente mandón',
    person: 'Mr. Stone',
    kind: 'minion',
    hp: 4,
    topics: ['could-you'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['reuniones'],
    look: { shirt: '#2b2b2b', hair: '#3b2a1a', skin: '#e0ac69' },
    before: [
      { text: 'You! Bring me coffee! Open window! Close door! Now! Could you to hurry?', es: '¡Tú! ¡Tráeme café! ¡Abre ventana! ¡Cierra puerta! ¡Ya! ¿"Podrías a" apurarte?' },
      { text: 'I am the manager. I have got a piece of the key. Nobody says please in this office!', es: 'Soy el gerente. Tengo un pedazo de la llave. ¡En esta oficina nadie dice por favor!' },
    ],
    after: [
      { text: 'Could you bring me a coffee, please? ... Oh. That is much better. Thank you.', es: '¿Podrías traerme un café, por favor? ... Oh. Eso suena mucho mejor. Gracias.' },
      { text: 'Here is the piece of the key. Could you say sorry to my team for me? I am very rude today.', es: 'Aquí está el pedazo de la llave. ¿Podrías pedirle perdón a mi equipo de mi parte? Hoy estoy muy grosero.' },
    ],
    freed: { text: "I'm the manager. Could you close the door, please? Thank you!", es: 'Soy el gerente. ¿Podrías cerrar la puerta, por favor? ¡Gracias!' },
    bonus: { q: 'One more! It is hot in the meeting room. What do you say?', options: ['Could you open the window, please?', 'Open window!', 'Could you to open the window?'], answer: 0, tip: 'Con cortesía: Could you open the window, please?' },
  },
  'office-boss': {
    id: 'office-boss',
    name: 'La señora Clark, la directora',
    person: 'Ms. Clark',
    kind: 'boss',
    reward: 'traje',
    hp: 10,
    topics: ['time', 'object-pronouns', 'could-you', 'do-does'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['direccion'],
    phases: [
      { hp: 4, topics: ['time'], kinds: ['fill', 'fix', 'listen'], tags: ['direccion', 'reuniones'] },
      {
        hp: 3,
        topics: ['object-pronouns', 'could-you'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['direccion', 'oficina'],
        line: { text: 'Call I! Send they to she! You! Give me the clock! NOW!', es: '¡Llama a "yo"! ¡Envíaselos a "ella" (she)! ¡Tú! ¡Dame el reloj! ¡YA!' },
      },
      {
        hp: 3,
        topics: ['time', 'object-pronouns', 'could-you', 'do-does'],
        kinds: ['fill', 'order', 'listen', 'fix', 'write'],
        tags: ['direccion', 'recepcion'],
        line: { text: 'What time does... When do I... Could you... Could you help me?', es: '¿A qué hora... Cuándo... ¿Podrías... ¿Podrías ayudarme?' },
      },
    ],
    look: { shirt: '#7a4fa3', hair: '#2b1d14', skin: '#f1c27d', gender: 'female', accessory: 'glasses' },
    before: [
      { text: 'Who are you? Do you have an appointment? The meeting is in Monday at the night! Every meeting is MINE!', es: '¿Quién eres? ¿Tienes cita? ¡La reunión es "en" lunes "a" la noche! ¡Todas las reuniones son MÍAS!' },
      { text: 'This shiny piece is in my drawer this morning. Now all my clocks are crazy, but this piece is perfect. It is MINE!', es: 'Esta pieza brillante está en mi cajón esta mañana. Ahora todos mis relojes están locos, pero esta pieza es perfecta. ¡Es MÍA!' },
      { text: 'You want it? Then answer me. And be quick: I have got a meeting at eight and half!', es: '¿La quieres? Entonces respóndeme. Y rápido: ¡tengo una reunión a las "ocho y media"!' },
    ],
    after: [
      { text: "Oh... It's half past eleven. My meeting is at twelve. Everything is OK. Thank you.", es: 'Oh... Son las once y media. Mi reunión es a las doce. Todo está bien. Gracias.' },
      { text: 'This morning a man in a dark coat comes to my office. He looks at the phone on my desk for a long time. Then he says: "I can\'t use it." And he goes.', es: 'Esta mañana un hombre con abrigo oscuro viene a mi oficina. Mira el teléfono de mi escritorio un largo rato. Luego dice: "No puedo usarlo". Y se va.' },
      { text: 'Take this piece. It is yours, not mine. And take this jacket: every good worker needs one!', es: 'Toma esta pieza. Es tuya, no mía. Y toma esta chaqueta: ¡todo buen trabajador necesita una!' },
    ],
    freed: { text: 'Could you close the door when you go, please? And come back on Monday at nine!', es: '¿Podrías cerrar la puerta cuando te vayas, por favor? ¡Y vuelve el lunes a las nueve!' },
    farewell: {
      q: 'Thank you for your help. Could I give you my card? Call me if you need a job one day!',
      options: ['Sure! Thank you, Ms. Clark.', 'Sure! Thank you, Ms. Clark. I call she.', 'No, thanks you.'],
      answer: 0,
      tip: 'Para aceptar con amabilidad: "Sure! Thank you."',
    },
  },
}
