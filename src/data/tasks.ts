import type { TopicId } from '../game/types'
import type { MiniStep } from '../components/MiniTalk'
import type { RoundItem, RoundLines } from '../components/OneMoreRound'
import type { RaceLeg, SequenceStep } from '../components/SequenceMaster'
import type { FixStep } from '../components/FixRadio'
import type { ReconstructItem } from '../components/Reconstruct'
import type { DebateEndings, DebateTurn } from '../components/DebateTalk'
import type { CommandObject, CommandStep } from '../components/CommandPuzzle'
import type { TextCommandRoom } from '../components/TextCommand'
import type { MemoryPair } from '../components/MemoryChest'
import type { InscriptionRoom } from '../game/inscriptions'
import { INS_DEMO_DOOR } from './b1InscriptionsDemo'
import type { LuggageContent } from '../components/LostLuggage'
import { B1_LUGGAGE } from './b1Luggage'
import type { RouteContent } from '../components/RouteChallenge'
import { B1_ROUTE } from './b1Route'
import { canRecognize } from '../game/mic'
import type { ScriptLine } from './b1Accident'
import { B1_03_DOCTOR_SCRIPT } from './b1Words'
import { B1_03_PRACTICE1_IDS, B1_03_PRACTICE2_IDS } from './questions-b1-03'
import type { TextOnlyContent } from '../components/TextOnly'
import { B1_03_CLOSE_CHAT, B1_TEXT_ONLY } from './b1TextOnly'
import type { FinePrintContent } from '../components/FinePrint'
import { B1_04_FINE_PRINT } from './b1FinePrint'
import { B1_04_BANK_IDS, B1_04_PRACTICE1_IDS, B1_04_PRACTICE2_IDS } from './questions-b1-04'
import { B1_REPAIR } from './b1Repair'
import { B1_05_CLOSE_SCRIPT, B1_05_JOB_ADS, B1_05_LETTER_SCRIPT, B1_05_NOTICE_SCRIPT, B1_05_PACKING } from './b1Flat'
import { B1_05_BANK_IDS, B1_05_PRACTICE2_IDS, B1_05_PRACTICE_IDS } from './questions-b1-05'
import { B1_06_PRACTICE_IDS } from './questions-b1-06'
import { B1_06_JOB_ADVERT } from './b1Shelter'
import { B1_06_WHICH_DOG } from './b1Kennels'
import type { WhichDogRound } from '../components/WhichDog'
import { B1_06_PRACTICE2_IDS } from './questions-b1-06'

/**
 * Tareas de personajes que no pelean: una charla corta con elecciones (MiniTalk).
 * Al terminarla se guarda `done` en `opened`. Si tiene `lesson`, Leo enseña ese tema antes.
 * Si tiene `requires`, el personaje no abre la tarea hasta que esté en `opened`.
 */
export type NpcTask = {
  /** Personaje que da la tarea (si no se indica, el id de la tarea es el del personaje) */
  npc?: string
  done: string
  lesson?: TopicId
  requires?: { id: string; text: string; es: string; sub: string }
  steps: MiniStep[]
  reward: { text: string; es?: string; sub: string; say?: string }
  shield?: boolean
  /** Al completarla, la vida vuelve al máximo */
  heal?: boolean
  outfit?: string
  /** Monedas que da al completarse (tienda de atuendos de Market Day) */
  coins?: number
  /** Sopas de la abuela que da al completarse (A Dinner to Remember): en combate llenan la vida una vez */
  soup?: number
  /** En vez de la charla, abre un juego propio */
  activity?: 'guess' | 'pens' | 'planner' | 'vocab' | 'attendance' | 'sounds' | 'verbs' | 'mystery' | 'timeline' | 'plan' | 'tour' | 'party60' | 'predict' | 'speech' | 'clocks' | 'round' | 'practice' | 'sequence' | 'reconstruct' | 'fixradio' | 'debate' | 'command' | 'memory' | 'luggage' | 'route' | 'book' | 'futureplan' | 'exam' | 'fitting' | 'enough' | 'inscriptions' | 'callforhelp' | 'script' | 'textonly' | 'fineprint' | 'whichdog'
  /** Para activity 'whichdog' (Which Dog?, B1-06): las peticiones de Nayi, en orden */
  whichdog?: WhichDogRound[]
  /** Para activity 'fineprint' (The Fine Print, B1-04): las cláusulas del contrato que se sellan. Sin errores, escudo */
  fineprint?: FinePrintContent
  /** Para activity 'round' (One More Round!): los objetos y lo que dice el personaje; {item} = el objeto que se movió. Cada error quita una vida */
  round?: { items: RoundItem[]; lines: RoundLines; visual?: 'room' | 'none' }
  /** Para activity 'practice': práctica guiada con Leo (8 frases) del tema indicado */
  practice?: TopicId
  /** Para activity 'practice': preguntas fijas en orden (si no, se eligen al azar del tema) */
  practiceIds?: string[]
  /** Para activity 'sequence' (Sequence Master): los pasos en el orden correcto (salen desordenados) */
  sequence?: {
    title: string
    intro: SequenceStep
    steps: SequenceStep[]
    hint?: string
    /** Modo carrera (A2-07): tramos seguidos con posición. start = puesto inicial; startBy cambia el puesto si hay una marca en opened */
    race?: { runners: number; start: number; startBy?: { flag: string; position: number }[]; legs: RaceLeg[] }
  }
  /** Para activity 'fixradio' (Fix the Radio): instrucciones paso a paso; el jugador toca la pieza de cada paso */
  fixradio?: { title: string; intro: { en: string; es: string }; steps: FixStep[] }
  /** Para activity 'command' (Command Puzzle, A2-09 Wake the Mill): el jugador da la orden (verbo + objeto). Con 0-1 errores, escudo */
  /** Para activity 'memory' (The Memory Chest, A2-10): parejas que se emparejan volteando cartas */
  memory?: { title: string; intro: { en: string; es: string }; pairs: MemoryPair[] }
  command?:
    | { mode?: 'buttons'; title: string; intro: { en: string; es: string }; verbs: string[]; objects: CommandObject[]; steps: CommandStep[]; scene?: 'mill' | 'control'; finish?: { en: string; es: string; banner: string } }
    /** B1 · The Moving Stone escrito: el jugador escribe la orden (components/TextCommand.tsx, game/command.ts) */
    | TextCommandRoom
  /** Para activity 'inscriptions' (B1, templos): una sala de tablillas (game/inscriptions.ts). Sin reiniciar ninguna tablilla, escudo */
  inscriptions?: InscriptionRoom
  /** Para activity 'reconstruct' (Reconstruct the Story): contrastar pistas con una nota corrompida y elegir la frase verdadera */
  reconstruct?: { title: string; intro: { en: string; es: string }; items: ReconstructItem[] }
  /** Para activity 'debate' (Dialogue Under Pressure, versión de debate): turnos con respuesta buena / neutral / mala y tres desenlaces */
  debate?: {
    title: string
    turns: DebateTurn[]
    endings?: DebateEndings
    /** Texto de la indicación antes de las opciones (por defecto: "Defiende la tradición.") */
    ask?: string
    /** Marca que se guarda en opened según el desenlace (A2-07: la confianza de JoJo cambia la salida de la carrera) */
    results?: Partial<Record<keyof DebateEndings, string>>
  }
  /** Para activity 'practice': escudo de palabras si todas las respuestas son correctas */
  practiceShield?: boolean
  /** B1: temas que se recuperan al completar la tarea (misiones sin jefe: se recuperan al cerrar la misión) */
  recover?: TopicId[]
  /** B1: la lección de Leo se ve por mensajes en el teléfono (no en el salón). mine = tu mensaje, a la derecha */
  phoneLesson?: { mine: string }
  /** B1 (recuerdos 3, 5 y 7): la lección es una página del Cuaderno de L con ese número (components/LNotebook.tsx) */
  notebookPage?: number
  /** Para activity 'script' (B1, recuerdos): secuencia fija sin elecciones (MemoryScript); 'friend' = el personaje de la tarea */
  script?: ScriptLine[]
  /** Para activity 'textonly' (B1-03, Text Only): los chats en el teléfono de L. Los steps de la tarea los narra L antes */
  textOnly?: TextOnlyContent
  /** B1: al terminar la tarea se sale del recuerdo con ese número (game/memory.ts, exitMemory). closeMemory: además se guarda el cierre de la misión */
  exitMemory?: number
  closeMemory?: boolean
  /** Para activity 'exam': el examen escrito de una época o nivel (EraExam). Al guardar las frases se completa la tarea */
  exam?: 'a2'
  /** Dialogue Under Pressure: segundos para cada elección de la charla */
  pressure?: number
  /** Para activity 'route': otro contenido de Route Challenge (B1-02). Sin el campo, el de A2-11 */
  route?: RouteContent
  /**
   * Lo que se dice al terminar, antes del mensaje de recompensa (B1-04: Ricardo y el mensaje de Marisol).
   * npc: quién lo dice (si no, el personaje de la tarea)
   */
  outro?: { npc?: string; steps: MiniStep[] }
  /** Para activity 'practice' (o 'command'): lo que se dice antes del juego (charla corta, B1-02 tienda de celulares, B1-04 Repair Shop) */
  intro?: MiniStep[]
  /** Para activity 'luggage': otro contenido de Lost Luggage (B1-02). Sin el campo, el de A2-11 */
  luggage?: LuggageContent
  /** Para activity 'vocab': las palabras y el título del repaso (4 de 5 aciertos) */
  vocab?: { title: string; place: string; words: { en: string; es: string }[] }
}

export const NPC_TASKS: Record<string, NpcTask> = {
  // La mamá de Leo: la familia de Leo y sus rutinas (presente simple con -s)
  garcia: {
    done: 'barrio-invite',
    lesson: 'present-simple',
    steps: [
      {
        text: "Hello! You are Leo's new friend! Come in, come in. I'm Mrs. Garcia, Leo's mom.",
        es: '¡Hola! ¡Eres el nuevo amigo de Leo! Pasa, pasa. Soy la señora García, la mamá de Leo.',
        choice: { ask: '¿Qué le respondes?', options: ['Nice to meet you, Mrs. Garcia!', 'Good night, Mrs. Garcia!', 'You are welcome!'], answer: 0, tip: 'Cuando conoces a alguien: "Nice to meet you!".' },
      },
      {
        text: 'Look, this is our family photo. Leo\'s dad is a doctor. He works in a hospital.',
        es: 'Mira, esta es nuestra foto de familia. El papá de Leo es médico. Trabaja en un hospital.',
        choice: { ask: '¿Dónde trabaja el papá de Leo?', options: ['He work in a hospital.', 'He works in a hospital.', 'He working in a hospital.'], answer: 1, tip: 'Con "he" el verbo lleva -s: he works.' },
      },
      {
        text: 'This is Emma, Leo\'s sister. She plays the guitar every afternoon.',
        es: 'Esta es Emma, la hermana de Leo. Toca la guitarra todas las tardes.',
        choice: { ask: '¿Qué hace Emma todas las tardes?', options: ['She play the guitar.', 'She is guitar.', 'She plays the guitar.'], answer: 2, tip: 'Con "she" el verbo lleva -s: she plays.' },
      },
      {
        text: 'And me? I get up at six and I make breakfast for everybody. Leo usually gets up at seven...',
        es: '¿Y yo? Me levanto a las seis y hago el desayuno para todos. Leo normalmente se levanta a las siete...',
        choice: { ask: 'Completa: Mrs. Garcia ___ up at six.', options: ['get', 'gets', 'getting'], answer: 1, tip: 'Mrs. Garcia es "she": gets.' },
      },
      {
        text: '...but he is always late! He never eats breakfast. Ha ha!',
        es: '...¡pero siempre llega tarde! Nunca desayuna. ¡Ja, ja!',
        choice: { ask: '¿Qué frase es correcta?', options: ['Leo never eats breakfast.', 'Leo eats never breakfast.', 'Leo never eat breakfast.'], answer: 0, tip: 'never va antes del verbo, y con "he" el verbo lleva -s: never eats.' },
      },
      {
        text: "Oh! Today is Leo's birthday! There is a party in the park at four o'clock. Here is your invitation.",
        es: '¡Oh! ¡Hoy es el cumpleaños de Leo! Hay una fiesta en el parque a las cuatro. Aquí tienes tu invitación.',
        choice: { ask: '¿Qué le respondes?', options: ['Thank you! I love parties!', 'Thank you! I loves parties!', "You're welcome!"], answer: 0, tip: 'Te da algo, así que agradeces. Con "I" el verbo va sin -s: I love.' },
      },
    ],
    reward: {
      text: 'Mrs. Garcia: "See you at the party!"',
      es: '¡Nos vemos en la fiesta!',
      sub: 'Tienes la invitación al cumpleaños de Leo. La fiesta es en el parque.',
      say: 'See you at the party!',
    },
  },

  // El papá de Maya: gustos con like / love / hate + -ing
  rojas: {
    done: 'barrio-likes',
    lesson: 'likes',
    steps: [
      {
        text: "Hi! I'm Maya's dad. Look at Maya: she is reading again. She loves reading. She reads all day!",
        es: '¡Hola! Soy el papá de Maya. Mira a Maya: está leyendo otra vez. Le encanta leer. ¡Lee todo el día!',
        choice: { ask: '¿Qué le encanta a Maya?', options: ['She loves read.', 'She loves reading.', 'She love reading.'], answer: 1, tip: 'love + verbo con -ing, y con "she" love lleva -s: she loves reading.' },
      },
      {
        text: 'But she hates getting up early. Every morning: "Five more minutes, Dad!"',
        es: 'Pero odia levantarse temprano. Todas las mañanas: "¡Cinco minutos más, papá!"',
        choice: { ask: '¿Qué odia Maya?', options: ['She hates getting up early.', 'She hates get up early.', 'She hate getting up early.'], answer: 0, tip: 'hate + -ing: getting (con doble t).' },
      },
      {
        text: 'And you? Do you like playing football?',
        es: '¿Y tú? ¿Te gusta jugar al fútbol?',
        choice: { ask: 'Responde que sí.', options: ['Yes, I like play football.', 'Yes, I likes playing football.', 'Yes, I like playing football.'], answer: 2, tip: 'I like + playing (con -ing, y like sin -s).' },
      },
      {
        text: 'I love cooking! I cook Peruvian food every Sunday. What do you love doing?',
        es: '¡Me encanta cocinar! Cocino comida peruana todos los domingos. ¿Qué te encanta hacer?',
        choice: { ask: '¿Qué le respondes?', options: ['I love listen to music.', 'I love listening to music.', 'I loving music.'], answer: 1, tip: 'love + listening.' },
      },
      {
        text: "Great! Here, take a cookie. It's Maya's favorite. Cookies give you energy!",
        es: '¡Genial! Toma, una galleta. Es la favorita de Maya. ¡Las galletas dan energía!',
      },
    ],
    reward: {
      text: 'Mr. Rojas: "Enjoy the cookie!"',
      es: '¡Disfruta la galleta!',
      sub: 'La galleta te da un escudo de palabras: bloquea un error en combate.',
      say: 'Enjoy the cookie!',
    },
    shield: true,
  },

  // El abuelo de Leo en la fiesta: fechas, felicitar y la foto de tu familia
  // Primero: la fiesta no está lista. Hay que conseguir el pastel, los globos y la música
  'joe-start': {
    npc: 'joe',
    done: 'party-started',
    requires: {
      id: 'barrio-invite',
      text: 'Grandpa Joe: "Hello! This party is for family and friends. Have you got an invitation? Leo\'s mom has got the invitations."',
      es: '¡Hola! Esta fiesta es para familia y amigos. ¿Tienes invitación? La mamá de Leo tiene las invitaciones.',
      sub: 'Ve a la casa de Leo y habla con su mamá.',
    },
    steps: [
      {
        text: "Hello, young friend! Welcome to Leo's party! Have you got your invitation?",
        es: '¡Hola, joven amigo! ¡Bienvenido a la fiesta de Leo! ¿Tienes tu invitación?',
        choice: { ask: 'Dale la invitación.', options: ['Yes, you are here.', 'Yes, here you are.', 'No, thank you.'], answer: 1, tip: 'Al entregar algo: Here you are.' },
      },
      {
        text: "Oh no! Look at the table. We haven't got a cake. We haven't got balloons. And we haven't got any music!",
        es: '¡Oh, no! Mira la mesa. No tenemos pastel. No tenemos globos. ¡Y no tenemos música!',
        choice: { ask: '¿Qué falta para la fiesta?', options: ['A cake, balloons and music.', 'A dog, a bike and a ball.', 'Nothing. The party is ready.'], answer: 0, tip: 'El abuelo dice: "We haven\'t got a cake... balloons... any music".' },
      },
      {
        text: 'Can you help me? Ask the neighbors: "Have you got...?" The man who loves cooking has got a cake, I think.',
        es: '¿Me ayudas? Pregúntales a los vecinos: "Have you got...?" El hombre al que le encanta cocinar tiene un pastel, creo.',
      },
      {
        text: 'The girl with orange hair in the park has got a lot of balloons. And the man who loves old music has got a radio... but he is very angry today.',
        es: 'La niña de pelo naranja del parque tiene muchos globos. Y el hombre al que le encanta la música vieja tiene una radio... pero hoy está muy enojado.',
        choice: { ask: '¿Quién tiene la radio?', options: ['The girl in the park.', 'The man who loves old music.', 'Leo.'], answer: 1, tip: 'El abuelo dice: "the man who loves old music has got a radio".' },
      },
    ],
    reward: {
      text: 'Grandpa Joe: "Please hurry! Leo is coming soon!"',
      es: '¡Date prisa, por favor! ¡Leo viene pronto!',
      sub: 'Misión: prepara la fiesta. Pregunta a los vecinos "Have you got...?" y consigue el pastel, los globos y la radio.',
      say: 'Please hurry! Leo is coming soon!',
    },
  },

  // Con todo listo, la fiesta: fechas, felicitar y la foto de tu familia
  joe: {
    done: 'barrio-photo',
    requires: {
      id: 'party-ready',
      text: 'Grandpa Joe: "The party isn\'t ready! Ask the neighbors: Have you got a cake? Have you got any balloons? Have you got a radio?"',
      es: '¡La fiesta no está lista! Pregúntales a los vecinos.',
      sub: 'Mira lo que falta en "Fiesta" bajo el mapa.',
    },
    steps: [
      {
        text: 'A cake, balloons and music! Thank you! Now the party is perfect.',
        es: '¡Un pastel, globos y música! ¡Gracias! Ahora la fiesta es perfecta.',
      },
      {
        text: "Wonderful! Today is the fifth of May. Leo's birthday is on May 5th. He is fifteen today!",
        es: '¡Maravilloso! Hoy es cinco de mayo. El cumpleaños de Leo es el 5 de mayo. ¡Hoy cumple quince!',
        choice: { ask: '¿Cuándo es el cumpleaños de Leo?', options: ['On May 15th.', 'On March 5th.', 'On May 5th.'], answer: 2, tip: '"The fifth of May" = May 5th (5 de mayo).' },
      },
      {
        text: "Here is Leo! Let's sing! ... Now say something to him!",
        es: '¡Aquí está Leo! ¡Cantemos! ... ¡Ahora dile algo!',
        choice: { ask: '¿Qué le dices a Leo?', options: ['Happy new year, Leo!', 'Happy birthday, Leo!', 'Good night, Leo!'], answer: 1, tip: 'En un cumpleaños: "Happy birthday!".' },
      },
      {
        text: 'My birthday is in December. When is your birthday?',
        es: 'Mi cumpleaños es en diciembre. ¿Cuándo es tu cumpleaños?',
        choice: { ask: 'Elige la respuesta bien escrita.', options: ['My birthday are in July.', 'I have birthday July.', 'My birthday is in July.'], answer: 2, tip: 'My birthday is in + mes (con mayúscula): My birthday is in July.' },
      },
      {
        text: 'Look, there is a gift on the table. There is no name on it... only a letter: "L".',
        es: 'Mira, hay un regalo en la mesa. No tiene nombre... solo una letra: "L".',
        choice: { ask: '¿Qué preguntas?', options: ['Who is it from?', 'Who are it from?', 'Where it is from?'], answer: 0, tip: '¿De quién es? = Who is it from?' },
      },
      {
        text: 'Hmm, I don\'t know. Strange... Oh! And this is for you. I always take photos of my neighbors. This is your family!',
        es: 'Hmm, no sé. Qué raro... ¡Oh! Y esto es para ti. Siempre les tomo fotos a mis vecinos. ¡Esta es tu familia!',
        choice: { ask: '¿Qué le dices?', options: ["You're welcome!", 'Thank you so much!', 'Happy birthday!'], answer: 1, tip: 'Te regalan algo: "Thank you so much!".' },
      },
    ],
    reward: {
      text: 'Grandpa Joe: "Show the photo to your brother. He loves it!"',
      es: 'Muéstrale la foto a tu hermano. ¡Le encanta!',
      sub: 'Tienes la foto de tu familia. Nick está en tu casa, al lado del parque.',
      say: 'Show the photo to your brother. He loves it!',
    },
  },
}

// ── La granja: estas tareas abren un juego propio (activity) en vez de una charla ──
NPC_TASKS.rosie = {
  done: 'farm-guess',
  lesson: 'do-does',
  activity: 'guess',
  steps: [],
  reward: {
    text: 'Rosie: "You are very good at this game! Now you know all our animals."',
    es: '¡Eres muy bueno en este juego! Ya conoces a todos nuestros animales.',
    sub: 'Ya conoces a los animales de la granja. El granjero no podrá decir que no.',
    say: 'You are very good at this game! Now you know all our animals.',
  },
}
NPC_TASKS.patel = {
  done: 'farm-pens',
  lesson: 'plurals',
  activity: 'pens',
  steps: [],
  reward: {
    text: 'Dr. Patel: "Every animal is in the right pen. Thank you!"',
    es: 'Cada animal está en su corral. ¡Gracias!',
    sub: 'Los corrales están en orden. La doctora te da un escudo de palabras.',
    say: 'Every animal is in the right pen. Thank you!',
  },
  shield: true,
}

// ── La oficina ──
NPC_TASKS.sara = {
  done: 'office-planner',
  lesson: 'time',
  activity: 'planner',
  steps: [],
  reward: {
    text: 'Sara: "The agenda is perfect now! You have got an appointment with Ms. Clark today."',
    es: '¡La agenda ya está perfecta! Tienes una cita con la señora Clark hoy.',
    sub: 'Tienes una cita con la directora.',
    say: 'The agenda is perfect now! You have got an appointment with Ms. Clark today.',
  },
}
NPC_TASKS.grace = {
  done: 'office-message',
  lesson: 'object-pronouns',
  steps: [
    {
      text: "Ring, ring! Oh no, the phone! I'm very busy. Could you answer it, please?",
      es: '¡Ring, ring! ¡Oh, no, el teléfono! Estoy muy ocupada. ¿Podrías contestar, por favor?',
      choice: { ask: '¿Qué le dices a Grace?', options: ['Sure!', 'Sorry, I can.', 'Yes, I could to.'], answer: 0, tip: 'Para aceptar: Sure! / Of course!' },
    },
    {
      text: '(You answer the phone.) ... Hello? This is Mr. Rossi, from the tourist office. Could I speak to Ms. Clark, please?',
      es: '(Contestas el teléfono.) ... ¿Hola? Habla el señor Rossi, de la oficina de turismo. ¿Podría hablar con la señora Clark, por favor?',
      choice: { ask: 'La señora Clark no está disponible. ¿Qué le dices?', options: ["I'm sorry, she isn't here. Can I take a message?", "Sorry, her isn't here. Can I take message?", "No. Call she later."], answer: 0, tip: "Con cortesía: I'm sorry, she isn't here. Can I take a message?" },
    },
    {
      text: 'Yes, please. Could you tell her to call me? I am in my office in the afternoon, from two to five.',
      es: 'Sí, por favor. ¿Podrías decirle que me llame? Estoy en mi oficina en la tarde, de dos a cinco.',
      choice: { ask: '¿Qué le respondes?', options: ['Of course. I can tell her.', 'Of course. I can tell she.', 'Of course. I can tell to her.'], answer: 0, tip: 'Después del verbo: her (tell her).' },
    },
    {
      text: 'And could you send me the new city map? Send it to me today, please. Thank you!',
      es: 'Y ¿podrías enviarme el nuevo mapa de la ciudad? Envíamelo hoy, por favor. ¡Gracias!',
      choice: { ask: '¿Qué le respondes?', options: ['Sure! I can send it to you today.', 'Sure! I can send it to your today.', 'Sure! I can send you it to.'], answer: 0, tip: 'send it to you: después de to va you.' },
    },
    {
      text: '(You hang up.) Grace: Who is it? Could you write a note for Ms. Clark, please?',
      es: '(Cuelgas.) Grace: ¿Quién era? ¿Podrías escribir una nota para la señora Clark, por favor?',
      choice: { ask: 'Elige la nota bien escrita.', options: ['Message from Mr. Rossi: please call him in the afternoon, and send him the city map.', 'Message from Mr. Rossi: please call he in the afternoon, and send he the city map.', 'Message from Mr. Rossi: please call his at the afternoon, and send his the city map.'], answer: 0, tip: 'Después del verbo: him. Y partes del día: in the afternoon.' },
    },
    {
      text: 'Perfect note! Thank you. Now Ms. Clark can call him. You are a great assistant!',
      es: '¡Nota perfecta! Gracias. Ahora la señora Clark puede llamarlo. ¡Eres un gran asistente!',
    },
    {
      text: "Oh, and... look out of the window. Do you see that man in a dark coat? Every day he stands there and looks at our phone. He never calls. He never says anything.",
      es: 'Ah, y... mira por la ventana. ¿Ves a ese hombre de abrigo oscuro? Todos los días se para ahí y mira nuestro teléfono. Nunca llama. Nunca dice nada.',
    },
  ],
  reward: {
    text: 'Grace: "Thank you! I can give her the note now."',
    es: '¡Gracias! Ya le puedo dar la nota.',
    sub: 'Tomaste el mensaje del teléfono.',
    say: 'Thank you! I can give her the note now.',
  },
}

// ── Repaso de vocabulario suelto (cierre de A1) ──
NPC_TASKS['lucy-vocab'] = {
  npc: 'lucy',
  done: 'barrio-vocab',
  requires: {
    id: 'barrio-photo',
    text: 'Lucy: "I love animals and sunny days! After the party, can we play a word game?"',
    es: '¡Me encantan los animales y los días de sol! Después de la fiesta, ¿jugamos un juego de palabras?',
    sub: 'Lucy tiene un juego de mascotas y clima para después de la fiesta.',
  },
  activity: 'vocab',
  vocab: {
    title: 'Mascotas y clima',
    place: 'Parque · Lucy',
    words: [
      { en: 'dog', es: 'perro' }, { en: 'cat', es: 'gato' }, { en: 'bird', es: 'pájaro' }, { en: 'fish', es: 'pez' }, { en: 'hamster', es: 'hámster' },
      { en: 'sunny', es: 'soleado' }, { en: 'rainy', es: 'lluvioso' }, { en: 'cloudy', es: 'nublado' }, { en: 'windy', es: 'con viento' },
      { en: 'hot', es: 'caluroso' }, { en: 'cold', es: 'frío' }, { en: 'snow', es: 'nieve' },
    ],
  },
  steps: [],
  reward: {
    text: 'Lucy: "You know a lot of words! My dog likes you too. Woof!"',
    es: '¡Sabes muchas palabras! A mi perro también le caes bien. ¡Guau!',
    sub: 'Lucy te da un escudo de palabras.',
    say: 'You know a lot of words! My dog likes you too.',
  },
  shield: true,
}
NPC_TASKS['rosie-body'] = {
  npc: 'rosie',
  done: 'farm-body',
  requires: { id: 'farm-guess', text: '', es: '', sub: '' },
  activity: 'vocab',
  vocab: {
    title: 'Partes del cuerpo',
    place: 'Granero · Rosie',
    words: [
      { en: 'head', es: 'cabeza' }, { en: 'eyes', es: 'ojos' }, { en: 'ears', es: 'orejas' }, { en: 'nose', es: 'nariz' }, { en: 'mouth', es: 'boca' },
      { en: 'legs', es: 'patas, piernas' }, { en: 'tail', es: 'cola' }, { en: 'wings', es: 'alas' }, { en: 'feet', es: 'pies, patas' }, { en: 'teeth', es: 'dientes' },
    ],
  },
  steps: [],
  reward: {
    text: 'Rosie: "Great! A horse has got four legs and a long tail. A duck has got two feet and two wings!"',
    es: '¡Genial! Un caballo tiene cuatro patas y una cola larga. ¡Un pato tiene dos patas y dos alas!',
    sub: 'Rosie te da un escudo de palabras.',
    say: 'Great! A horse has got four legs and a long tail. A duck has got two feet and two wings!',
  },
  shield: true,
}

NPC_TASKS['ana-adjectives'] = {
  npc: 'ana',
  done: 'school-adjectives',
  requires: { id: 'school-supplies', text: '', es: '', sub: '' },
  activity: 'vocab',
  vocab: {
    title: 'Adjetivos opuestos',
    place: 'Aula · Ana',
    words: [
      { en: 'big', es: 'grande' }, { en: 'small', es: 'pequeño' }, { en: 'happy', es: 'feliz' }, { en: 'sad', es: 'triste' }, { en: 'new', es: 'nuevo' },
      { en: 'old', es: 'viejo' }, { en: 'fast', es: 'rápido' }, { en: 'slow', es: 'lento' }, { en: 'tall', es: 'alto' }, { en: 'short', es: 'bajo, corto' },
      { en: 'easy', es: 'fácil' }, { en: 'difficult', es: 'difícil' }, { en: 'clean', es: 'limpio' }, { en: 'dirty', es: 'sucio' },
    ],
  },
  steps: [],
  reward: {
    text: 'Ana: "Big and small, happy and sad... You are very smart!"',
    es: 'Grande y pequeño, feliz y triste... ¡Eres muy inteligente!',
    sub: 'Ana te da un escudo de palabras.',
    say: 'Big and small, happy and sad... You are very smart!',
  },
  shield: true,
}

// ── La escuela en 1996 ──
NPC_TASKS.higgins = {
  done: 'past-attendance',
  lesson: 'was-were',
  activity: 'attendance',
  steps: [],
  reward: {
    text: 'Mrs. Higgins: "Thank you, dear! You were a big help."',
    es: '¡Gracias, querido! Fuiste de gran ayuda.',
    sub: 'La lista de asistencia está en orden. El director ya no puede decir que no estabas en la lista.',
    say: 'Thank you, dear! You were a big help.',
  },
}

// ── La ciudad en 1996 ──
NPC_TASKS.lopez = {
  done: 'past-sounds',
  lesson: 'past-regular',
  activity: 'sounds',
  steps: [],
  reward: {
    text: 'Mr. Lopez: "Walked, played, wanted! You listened very well."',
    es: '¡Walked, played, wanted! Escuchaste muy bien.',
    sub: 'Los sacos están en orden. Ahora la señora Rossi no puede decir que nadie ayudó en el mercado.',
    say: 'Walked, played, wanted! You listened very well.',
  },
}

NPC_TASKS.nora = {
  done: 'city-past-vocab',
  activity: 'vocab',
  vocab: {
    title: 'Cosas de 1996',
    place: 'Tienda · Nora',
    words: [
      { en: 'well', es: 'pozo' }, { en: 'cart', es: 'carreta' }, { en: 'horse', es: 'caballo' }, { en: 'dirt road', es: 'carretera destapada' },
      { en: 'market', es: 'mercado' }, { en: 'stall', es: 'puesto' }, { en: 'phone box', es: 'cabina de teléfono' }, { en: 'letter', es: 'carta' },
      { en: 'stamp', es: 'estampilla' }, { en: 'mail carrier', es: 'cartero' }, { en: 'bread', es: 'pan' }, { en: 'sack', es: 'saco' },
      { en: 'apron', es: 'delantal' }, { en: 'radio', es: 'radio' },
    ],
  },
  steps: [],
  reward: {
    text: 'Nora: "Well, cart, stall, stamp... You learned all my words!"',
    es: 'Pozo, carreta, puesto, estampilla... ¡Aprendiste todas mis palabras!',
    sub: 'Nora te da un escudo de palabras.',
    say: 'Well, cart, stall, stamp... You learned all my words!',
  },
  shield: true,
}

// ── Green Street en 1996 ──
NPC_TASKS['joe-young'] = {
  done: 'past-verbbook',
  lesson: 'past-irregular',
  activity: 'verbs',
  steps: [],
  reward: {
    text: 'Joe: "Twenty-five verbs! You read my whole book!"',
    es: '¡Veinticinco verbos! ¡Leíste todo mi libro!',
    sub: 'Los 25 verbos irregulares quedaron en tus fichas. También los ves en el Cuaderno, en "Libro de verbos".',
    say: 'Twenty-five verbs! You read my whole book!',
  },
}

// ── La granja en 1996 ──
NPC_TASKS.bill = {
  done: 'past-mystery',
  lesson: 'past-did',
  activity: 'mystery',
  steps: [],
  reward: {
    text: 'Bill: "The mice ate the rope! Did you see their little teeth? Ha ha. Thank you, detective!"',
    es: '¡Los ratones se comieron la cuerda! ¿Viste sus dientecitos? Ja, ja. ¡Gracias, detective!',
    sub: 'Misterio resuelto. Ahora la señora Brown ya no puede decir que tú paraste el molino.',
    say: 'The mice ate the rope! Thank you, detective!',
  },
}

// ── El viejo cine en 1996 ──
NPC_TASKS.diana = {
  done: 'past-timeline',
  lesson: 'past-time',
  activity: 'timeline',
  steps: [],
  reward: {
    text: 'Diana: "In 1980, ten years ago, last week, yesterday... You know the story of our cinema!"',
    es: 'En 1980, hace diez años, la semana pasada, ayer... ¡Conoces la historia de nuestro cine!',
    sub: 'Diana te da una boleta. Ahora el señor Clark ya no puede decir que llegaste tarde sin boleta.',
    say: 'You know the story of our cinema!',
  },
}

// ── La escuela en 2056 ──
NPC_TASKS['leo-adult'] = {
  done: 'future-plan',
  lesson: 'going-to',
  activity: 'plan',
  steps: [],
  reward: {
    text: 'Mr. Garcia: "Hi, hi! What a great plan. Tomorrow is going to be a wonderful class. Thank you!"',
    es: '¡Hola, hola! Qué buen plan. Mañana va a ser una clase maravillosa. ¡Gracias!',
    sub: 'El plan de clase está listo. GRIMM-BOT ya no puede decir que no ayudaste al profesor.',
    say: 'Hi, hi! What a great plan. Tomorrow is going to be a wonderful class. Thank you!',
  },
}

// ── La ciudad en 2056 ──
NPC_TASKS.marco = {
  done: 'future-tour',
  lesson: 'going-to-neg',
  activity: 'tour',
  steps: [],
  reward: {
    text: 'Marco: "Perfect! The tourists aren\'t going to get lost today. My grandpa is going to be proud!"',
    es: '¡Perfecto! Los turistas no se van a perder hoy. ¡Mi abuelo va a estar orgulloso!',
    sub: 'La ruta está lista. El alcalde ya no puede decir que no ayudaste a los turistas.',
    say: "Perfect! The tourists aren't going to get lost today.",
  },
}

// ── Green Street en 2056 ──
NPC_TASKS['emma-adult'] = {
  done: 'future-party',
  lesson: 'going-to-wh',
  activity: 'party60',
  steps: [],
  reward: {
    text: 'Emma: "Basketball, photos, Theo, the big tree, five o\'clock... The party is going to be perfect!"',
    es: 'Baloncesto, fotos, Theo, el árbol grande, las cinco... ¡La fiesta va a ser perfecta!',
    sub: 'La lista de la fiesta está lista. Ahora Nick ya no puede decir que no ayudaste a los vecinos.',
    say: 'The party is going to be perfect!',
  },
}

// ── La granja en 2056 ──
NPC_TASKS['rosie-adult'] = {
  done: 'future-predict',
  lesson: 'going-to-predict',
  activity: 'predict',
  steps: [],
  reward: {
    text: 'Rosie: "You can see the future! Rain, a hungry cow, a robot in the pond... Ha ha. Thank you!"',
    es: '¡Puedes ver el futuro! Lluvia, una vaca con hambre, un robot en el estanque... Ja, ja. ¡Gracias!',
    sub: 'Rosie te da su permiso para entrar a la casa. Ahora el abuelo Brown ya no puede decir que no la conoces.',
    say: 'You can see the future! Thank you!',
  },
}

// ── La oficina: los relojes locos (después de la agenda; da un escudo, no es requisito) ──
NPC_TASKS['sara-clocks'] = {
  npc: 'sara',
  done: 'office-clocks',
  activity: 'clocks',
  steps: [],
  reward: {
    text: 'Sara: "Half past eight, quarter past nine... Every clock is OK now! Thank you!"',
    es: 'Y media, y cuarto... ¡Todos los relojes están bien ahora! ¡Gracias!',
    sub: 'Sara te da un escudo de palabras para la pelea con la directora.',
    say: 'Every clock is OK now! Thank you!',
  },
  shield: true,
}

// ── La torre Green Valley en 2056 ──
NPC_TASKS['diana-old'] = {
  done: 'future-speech',
  lesson: 'want-to',
  activity: 'speech',
  steps: [],
  reward: {
    text: 'Diana: "The past, today, tomorrow... and a big thank you. It\'s a perfect speech!"',
    es: 'El pasado, hoy, mañana... y un gran gracias. ¡Es un discurso perfecto!',
    sub: 'Diana te da su permiso para subir a la dirección. Ahora el señor Stone ya no puede decir que no la ayudaste.',
    say: "It's a perfect speech! Thank you!",
  },
}

// ── A2-01 — A New Beginning (hospital). Orden: médico → amigo (charla) → amigo (One More Round!) → recepción ──
// La persona especial te trajo al hospital y está contigo desde el principio (sus tareas empiezan en A2-02).
NPC_TASKS['a2-doctor'] = {
  done: 'a2-01-doctor',
  steps: [
    {
      text: "Oh, you're awake! Good morning. I'm your doctor. {iname} brought you here last night. How are you feeling today?",
      es: '¡Oh, ya despertaste! Buenos días. Soy tu médica. {iname} te trajo anoche. ¿Cómo te sientes hoy?',
      choice: { ask: '¿Qué le respondes?', options: ["I'm feeling a bit tired, but I'm OK.", "I feeling a bit tired, but I'm OK.", "I'm feel a bit tired, but I'm OK."], answer: 0, tip: 'Para decir cómo te sientes ahora: I am (I\'m) + verbo con -ing: I\'m feeling...' },
    },
    {
      text: "That's normal. You need to rest a little more. Do you remember anything?",
      es: 'Es normal. Necesitas descansar un poco más. ¿Recuerdas algo?',
      choice: { ask: '¿Qué le dices?', options: ['Not really. I only remember a white light.', 'Not really. I only remembers a white light.', 'Not really. I am only remember a white light.'], answer: 0, tip: 'Con "I" el verbo va sin -s y sin "am": I remember.' },
    },
    {
      text: 'This old clock was with you when you arrived. Here you are. It looks very special.',
      es: 'Este reloj viejo estaba contigo cuando llegaste. Aquí tienes. Se ve muy especial.',
      choice: { ask: 'Miras el reloj. Las cinco piezas siguen ahí... pero algo falta. ¿Qué dices?', options: ['Wait... the center of the clock is empty!', 'Wait... the center of the clock are empty!', 'Wait... the center of the clock empty!'], answer: 0, tip: '"The center" es uno solo: the center is.' },
    },
    {
      text: "Hmm, I'm sorry. I don't know anything about clocks. Oh, your friend is waiting for you in the hallway.",
      es: 'Mmm, lo siento. No sé nada de relojes. Ah, tu amigo te está esperando en el pasillo.',
      choice: { ask: '¿Qué le respondes?', options: ['Thank you, doctor. I can go and see my friend now.', 'Thank you, doctor. I can to go and see my friend now.', 'Thank you, doctor. I can going to see my friend now.'], answer: 0, tip: 'Después de "can" va el verbo tal cual, sin "to": I can go.' },
    },
  ],
  reward: {
    text: 'The doctor: "Take it easy, OK?"',
    es: 'Tómalo con calma, ¿sí?',
    sub: 'Las cinco piezas del reloj siguen en su lugar, pero el centro está vacío. Tu amigo te espera en el pasillo.',
    say: 'Take it easy, OK?',
  },
}

NPC_TASKS['a2-friend'] = {
  done: 'a2-01-friend',
  requires: {
    id: 'a2-01-doctor',
    text: 'Your friend: "Hey! Go and talk to the doctor first. I can wait!"',
    es: '¡Oye! Ve a hablar primero con la médica. ¡Yo puedo esperar!',
    sub: 'La médica está en tu habitación.',
  },
  steps: [
    {
      text: "There you are! I was so worried about you. How do you feel?",
      es: '¡Ahí estás! Estaba muy preocupado por ti. ¿Cómo te sientes?',
      choice: { ask: '¿Qué le respondes?', options: ["Much better, thanks. It's good to see you!", "Much better, thanks. It's good see you!", "Much better, thanks. Is good to see you!"], answer: 0, tip: "It's good to see you: it is + good + to + verbo." },
    },
    {
      text: 'I came this morning, but you were asleep. {iname} was with you all night.',
      es: 'Vine esta mañana, pero estabas durmiendo. {iname} estuvo contigo toda la noche.',
      choice: { ask: '¿Qué le dices?', options: ['Thanks for coming. That was really kind of you.', 'Thanks for come. That was really kind of you.', 'Thanks for coming. That were really kind of you.'], answer: 0, tip: 'Thanks for + verbo con -ing (coming). "That" va con was.' },
    },
    {
      text: "Before we get your things, let's check your memory. Do you remember our old game? I put some things on a table, and you find what moved.",
      es: 'Antes de ir por tus cosas, revisemos tu memoria. ¿Te acuerdas de nuestro viejo juego? Pongo unas cosas en una mesa y tú encuentras lo que se movió.',
      choice: { ask: '¿Qué le respondes?', options: ["OK, let's play!", "OK, let's playing!", 'OK, lets to play!'], answer: 0, tip: "Let's + verbo tal cual: let's play." },
    },
  ],
  reward: {
    text: 'Your friend: "Great! Talk to me when you are ready."',
    es: '¡Genial! Háblame cuando quieras.',
    sub: 'Habla otra vez con tu amigo para jugar One More Round! Cada error te quita una vida.',
    say: 'Great! Talk to me when you are ready.',
  },
}

NPC_TASKS['a2-friend-round'] = {
  npc: 'a2-friend',
  done: 'a2-01-round',
  activity: 'round',
  steps: [],
  round: {
    visual: 'room',
    items: [
      { id: 'water', icon: '🥛', en: 'water', es: 'agua' },
      { id: 'pills', icon: '💊', en: 'pills', es: 'pastillas' },
      { id: 'apple', icon: '🍎', en: 'apple', es: 'manzana' },
      { id: 'book', icon: '📕', en: 'book', es: 'libro' },
    ],
    lines: {
      intro: { text: "Before we get your things, let's check your memory. Look carefully at your room: the water, the pills, the apple and the book.", es: 'Antes de ir por tus cosas, revisemos tu memoria. Mira bien tu habitación: el agua, las pastillas, la manzana y el libro.' },
      ask: { text: 'OK, open your eyes! One thing moved. Which one?', es: '¡Bien, abre los ojos! Una cosa se movió. ¿Cuál?' },
      name: { text: 'Yes, that one moved! And what is it in English?', es: '¡Sí, esa se movió! ¿Y cómo se dice en inglés?' },
      win: { text: 'Yes! The {item}. Your memory is still amazing!', es: '¡Sí! {item}. ¡Tu memoria sigue siendo increíble!' },
      lose: { text: "Oh no, it was the {item}! Careful, you're still tired. One more round?", es: 'Ay, no, era: {item}. Cuidado, todavía necesitas descansar. ¿Otra ronda?' },
      nameLose: { text: "Almost! It's the {item}. Let's try one more round.", es: '¡Casi! Es: {item}. Intentemos otra ronda.' },
      tired: { text: "Hey, you look very tired. Let's stop here. Your memory is OK. Let's go and get your things.", es: 'Oye, necesitas descansar. Paremos aquí. Tu memoria está bien. Vamos por tus cosas.' },
    },
  },
  reward: {
    text: 'Your friend: "Now let\'s get your things. The reception is at the end of the hallway."',
    es: 'Ahora vamos por tus cosas. La recepción está al final del pasillo.',
    sub: 'Pide tus pertenencias en la recepción.',
    say: "Now let's get your things.",
  },
}

NPC_TASKS['a2-receptionist'] = {
  done: 'a2-01-belongings',
  requires: {
    id: 'a2-01-round',
    text: 'The receptionist: "Hello! Please wait a moment. Talk to your friend first."',
    es: '¡Hola! Espera un momento, por favor. Habla primero con tu amigo.',
    sub: 'Tu amigo está en el pasillo.',
  },
  steps: [
    {
      text: 'Good afternoon! How can I help you?',
      es: '¡Buenas tardes! ¿En qué te puedo ayudar?',
      choice: { ask: '¿Qué le pides?', options: ['Could I have my things, please?', 'Could I having my things, please?', 'I could have my things, please?'], answer: 0, tip: 'Para pedir con cortesía: Could I have... please?' },
    },
    {
      text: 'Of course. Just a moment, please... Here you are: your bag and your jacket.',
      es: 'Claro. Un momento, por favor... Aquí tienes: tu bolso y tu chaqueta.',
      choice: { ask: '¿Qué le dices?', options: ['Thank you very much!', "You're welcome!", 'Excuse me!'], answer: 0, tip: 'Te entrega algo, así que agradeces: Thank you very much!' },
    },
    {
      text: 'Please check your bag. Is everything there?',
      es: 'Por favor revisa tu bolso. ¿Está todo?',
      choice: { ask: 'Revisas el bolso. ¿Qué respondes?', options: ['Yes, everything is here.', 'Yes, everything are here.', 'Yes, all is here.'], answer: 0, tip: '"Everything" va con is: everything is here.' },
    },
  ],
  reward: {
    text: 'The receptionist: "Take care, and have a nice day!"',
    es: '¡Cuídate y que tengas un buen día!',
    sub: 'Recibiste tus pertenencias: tu bolso y tu chaqueta.',
    say: 'Take care, and have a nice day!',
  },
}

// ── A2-02 — Pieces of Yesterday (hospital, después de A2-01) ──
// Recuerdos breves (dos pasos por etapa) → la persona especial llama a Leo → Leo llega → lección → práctica → combate.
// Los recuerdos son internos: los elige el protagonista en las preguntas («¿Qué recuerdas?»); el reloj no los muestra.
// Canon: el desconocido no se revela; Leo se quedó en el ascensor y nadie lo vio después.
// Orden: amigo (Something Is Missing) → recepción (The Elevator) → médica (The Stranger) → amigo (The Missing Core)
//        → persona especial (Comparing Memories) → persona especial (Pieces of Yesterday: llama a Leo)
//        → Leo (llega) → Leo (lección + práctica) → el eco corrompido (combate, en data/a2Hospital.ts)
NPC_TASKS['a2-02-missing'] = {
  npc: 'a2-friend',
  done: 'a2-02-missing',
  requires: {
    id: 'a2-01-belongings',
    text: 'Your friend: "Let\'s get your things at the reception first!"',
    es: '¡Primero vamos por tus cosas a la recepción!',
    sub: 'La recepción está al final del pasillo.',
  },
  steps: [
    {
      text: "OK, you have your bag and your jacket. But you look worried. What's wrong?",
      es: 'Bueno, ya tienes tu bolso y tu chaqueta. Pero algo te preocupa. ¿Qué pasa?',
      choice: { ask: 'Revisas todo otra vez. Las cosas están ahí, pero algo falta... ¿Qué le dices?', options: ["Something is missing. I can't remember yesterday.", "Something is missing. I can't remembered yesterday.", "Something are missing. I can't remember yesterday."], answer: 0, tip: 'Después de "can\'t" va el verbo tal cual: I can\'t remember. "Something" va con is.' },
    },
    {
      text: "Don't worry. Walk around a little. Maybe something helps you remember.",
      es: 'No te preocupes. Camina un poco. Quizá algo te ayude a recordar.',
      choice: { ask: '¿Qué le respondes?', options: ["Good idea. I'm going to walk to the reception.", "Good idea. I going to walk to the reception.", "Good idea. I'm go to walk to the reception."], answer: 0, tip: 'Para un plan: am / is / are + going to + verbo.' },
    },
  ],
  reward: {
    text: 'Your friend: "I can wait here. Go!"',
    es: 'Yo te espero aquí. ¡Ve!',
    sub: 'Algo falta en tus recuerdos de ayer. Camina hasta la recepción.',
    say: 'I can wait here. Go!',
  },
}

NPC_TASKS['a2-02-elevator'] = {
  npc: 'a2-receptionist',
  done: 'a2-02-elevator',
  requires: {
    id: 'a2-02-missing',
    text: 'The receptionist: "Take care, and have a nice day!"',
    es: '¡Cuídate y que tengas un buen día!',
    sub: 'Tu amigo quiere hablar contigo en el pasillo.',
  },
  steps: [
    {
      text: 'Hello again! Oh, sorry, that is the elevator again. The doors open and close all the time!',
      es: '¡Hola otra vez! Ay, perdón, otra vez el ascensor. ¡Las puertas se abren y se cierran todo el tiempo!',
      choice: { ask: 'Miras el ascensor. Las puertas se abren y se cierran solas... y de pronto recuerdas otro ascensor, en la torre. ¿Qué recuerdas?', options: ['Leo was checking the elevator, and we went up the stairs.', 'Leo were checking the elevator, and we went up the stairs.', 'Leo was check the elevator, and we goed up the stairs.'], answer: 0, tip: 'Algo que estaba pasando: was + verbo con -ing (Leo was checking). Go en pasado: went.' },
    },
    {
      text: 'Are you OK? You look pale.',
      es: '¿Estás bien? Tienes mala cara.',
      choice: { ask: 'Todavía piensas en Leo y en el ascensor. ¿Qué le respondes?', options: ["I'm OK. I just remembered something.", "I'm OK. I just remembering something.", "I'm OK. I just remember something yesterday."], answer: 0, tip: 'Algo que acaba de pasar: pasado simple (remembered).' },
    },
  ],
  reward: {
    text: 'The receptionist: "Please rest a little. Oh, and the doctor wants to check your leg. She is in your room."',
    es: 'Descansa un poco, por favor. Ah, y la médica quiere revisarte la pierna. Está en tu habitación.',
    sub: 'Recordaste el ascensor: Leo se quedó revisándolo y ustedes subieron por las escaleras. La médica te espera en tu habitación.',
    say: 'The doctor wants to check your leg.',
  },
}

NPC_TASKS['a2-02-stranger'] = {
  npc: 'a2-doctor',
  done: 'a2-02-stranger',
  requires: {
    id: 'a2-02-elevator',
    text: 'The doctor: "Rest a little, and drink some water. See you later!"',
    es: 'Descansa un poco y toma algo de agua. ¡Hasta luego!',
    sub: 'Sigue los objetivos de A2-02 bajo el mapa.',
  },
  steps: [
    {
      text: "Let's look at your leg. How did it happen? Did you fall?",
      es: 'Veamos tu pierna. ¿Cómo pasó? ¿Te caíste?',
      choice: { ask: 'Cierras los ojos. Recuerdas la terraza de la torre... y a alguien al borde. ¿Qué recuerdas?', options: ['A man in a dark coat was standing on the terrace.', 'A man in a dark coat were standing on the terrace.', 'A man in a dark coat was stand on the terrace.'], answer: 0, tip: 'Para describir una escena del pasado: was + verbo con -ing (was standing).' },
    },
    {
      text: 'Hmm... Take your time.',
      es: 'Mmm... Tómate tu tiempo.',
      choice: { ask: 'El recuerdo sigue. ¿Qué pasó después?', options: ['He raised his hand, and a purple light hit me.', 'He raise his hand, and a purple light hitted me.', 'He raised his hand, and a purple light hitting me.'], answer: 0, tip: 'Pasado simple para acciones seguidas: raised, hit (hit es irregular: hit - hit).' },
    },
  ],
  reward: {
    text: 'The doctor: "Nothing is broken, but you must walk slowly for a few days. Your friend is asking about you."',
    es: 'No hay nada roto, pero debes caminar despacio unos días. Tu amigo pregunta por ti.',
    sub: 'Recordaste al desconocido en la terraza: levantó la mano y una luz morada te golpeó. Tu amigo te espera en el pasillo.',
    say: 'You must walk slowly for a few days.',
  },
}

NPC_TASKS['a2-02-core'] = {
  npc: 'a2-friend',
  done: 'a2-02-core',
  requires: {
    id: 'a2-02-stranger',
    text: 'Your friend: "Did you see the doctor? I can wait here."',
    es: '¿Ya te vio la médica? Yo te espero aquí.',
    sub: 'Sigue los objetivos de A2-02 bajo el mapa.',
  },
  steps: [
    {
      text: 'Hey, can I see your clock? Five pieces... But what was in the center? Was it always empty?',
      es: 'Oye, ¿puedo ver tu reloj? Cinco piezas... ¿Pero qué había en el centro? ¿Siempre estuvo vacío?',
      choice: { ask: 'Miras el hueco del centro y llega el recuerdo: tú en el suelo de la terraza, y el desconocido agachado junto a ti. ¿Qué recuerdas?', options: ['He opened the clock and took the center.', 'He opened the clock and taked the center.', 'He was open the clock and took the center.'], answer: 0, tip: 'Take es irregular: took. Open es regular: opened.' },
    },
    {
      text: 'Wow... {iname} was there too. Talk to {iname}. Maybe you can remember more together.',
      es: 'Vaya... {iname} también estaba ahí. Habla con {iname}. Quizá juntos recuerden más.',
      choice: { ask: '¿Qué dices?', options: ['Good idea. I need to talk to {iname}.', 'Good idea. I need talk to {iname}.', 'Good idea. I needs to talk to {iname}.'], answer: 0, tip: 'Need + to + verbo: I need to talk.' },
    },
  ],
  reward: {
    text: 'Your friend: "Go! I can wait here."',
    es: '¡Ve! Yo te espero aquí.',
    sub: 'Recordaste cómo desapareció el centro del reloj. {iname} está en tu habitación.',
    say: 'Go! I can wait here.',
  },
}

NPC_TASKS['a2-interest'] = {
  done: 'a2-02-compare',
  // Antes de su momento, la persona especial está a tu lado y te anima a seguir
  requires: {
    id: 'a2-02-core',
    text: '{iname}: "{name}, I\'m so happy you\'re awake! I brought you here last night. I\'m right here, OK?"',
    es: '{name}, ¡qué alegría que despertaste! Te traje anoche. Aquí estoy, ¿sí?',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  steps: [
    {
      text: '{name}, are you OK? Do you remember last night now?',
      es: '{name}, ¿estás bien? ¿Ya recuerdas lo de anoche?',
      choice: { ask: 'Comparas tus recuerdos con los suyos. ¿Qué le cuentas?', options: ['Yes. The stranger hit me with a purple light and took the center of the clock.', 'Yes. The stranger hitted me with a purple light and taked the center of the clock.', 'Yes. The stranger hit me with a purple light and take the center of the clock.'], answer: 0, tip: 'Pasado simple: hit (hit - hit) y took (take - took).' },
    },
    {
      text: 'Yes. I was standing next to you, but everything happened so fast. Then we were back in the present, and I brought you here, step by step.',
      es: 'Sí. Estaba a tu lado, pero todo pasó muy rápido. Luego estábamos de vuelta en el presente y te traje aquí, paso a paso.',
      choice: { ask: '¿Qué le dices?', options: ['Thank you for staying with me.', 'Thank you for stay with me.', 'Thank you to stay with me.'], answer: 0, tip: 'Thank you for + verbo con -ing (staying).' },
    },
    {
      text: 'There is one more thing...',
      es: 'Hay una cosa más...',
      choice: { ask: '¿Qué le preguntas sobre Leo?', options: ['Did you see Leo after the elevator?', 'Did you saw Leo after the elevator?', 'You did see Leo after the elevator?'], answer: 0, tip: 'Pregunta en pasado: Did + you + verbo tal cual (see).' },
    },
  ],
  reward: {
    text: '{iname}: "No, I didn\'t. Let\'s put the pieces of yesterday together, and then I\'m going to call him."',
    es: 'No. Juntemos las piezas de ayer y luego lo llamo.',
    sub: 'Compararon sus recuerdos. Habla otra vez con {iname} para ordenar lo que pasó ayer.',
    say: "Let's put the pieces of yesterday together.",
  },
}

NPC_TASKS['a2-02-pieces'] = {
  npc: 'a2-interest',
  done: 'a2-02-pieces',
  steps: [
    {
      text: "OK. Let's start at the beginning. What happened first?",
      es: 'Bien. Empecemos por el principio. ¿Qué pasó primero?',
      choice: { ask: 'Ordena lo que pasó ayer. ¿Qué pasó primero?', options: ['Leo stayed to check the elevator, and we went up the stairs.', 'The stranger took the center of the clock.', 'We walked to the hospital.'], answer: 0, tip: 'Primero fue el ascensor: Leo se quedó revisándolo y ustedes subieron por las escaleras.' },
    },
    {
      text: 'And on the terrace?',
      es: '¿Y en la terraza?',
      choice: { ask: '¿Qué pasó en la terraza?', options: ['A purple light hit me, and the stranger took the center of the clock.', 'Leo was waiting for us on the terrace.', 'The doctor was standing on the terrace.'], answer: 0, tip: 'La luz morada te golpeó y el desconocido se llevó el centro. Leo se había quedado en el ascensor.' },
    },
    {
      text: 'And in the end?',
      es: '¿Y al final?',
      choice: { ask: '¿Cómo terminó todo?', options: ['We were back in the present, and we walked to the hospital.', 'We went to the elevator.', 'Leo took us to the hospital.'], answer: 0, tip: 'Volvieron al presente y caminaron despacio hasta el hospital.' },
    },
    {
      text: "Now we have all the pieces of yesterday. Write them in your diary, OK? And now... I'm going to call Leo.",
      es: 'Ahora tenemos todas las piezas de ayer. Escríbelas en tu diario, ¿sí? Y ahora... voy a llamar a Leo.',
    },
  ],
  reward: {
    text: '{iname}: "Leo answered! He is OK, and he is coming to the hospital."',
    es: '¡Leo contestó! Está bien y viene al hospital.',
    sub: 'Tu diario tiene un capítulo nuevo: Pieces of Yesterday. {iname} llamó a Leo: búscalo en el pasillo.',
    say: 'Leo is coming to the hospital.',
  },
}

// Leo llega al hospital (punto de progresión: a2-02-leo). No cuenta qué le pasó: eso queda para después
NPC_TASKS['a2-leo'] = {
  done: 'a2-02-leo',
  // Leo llega: el protagonista se recupera (la vida vuelve al máximo antes de la lección y el combate)
  heal: true,
  steps: [
    {
      text: '{name}! There you are! I came as fast as I could.',
      es: '¡{name}! ¡Ahí estás! Vine lo más rápido que pude.',
      choice: { ask: '¿Qué le dices?', options: ['Leo! Are you OK? Where were you?', 'Leo! Are you OK? Where was you?', 'Leo! Are you OK? Where you were?'], answer: 0, tip: 'Pregunta en pasado con you: Where + were + you?' },
    },
    {
      text: "I'm OK. It's a long story... I'm here now, and that's what matters. The doctor told me about your leg.",
      es: 'Estoy bien. Es una historia larga... Ya estoy aquí, y eso es lo importante. La médica me contó lo de tu pierna.',
      choice: { ask: '¿Qué le respondes?', options: ["I'm so happy you're here.", "I'm so happy you here.", "I so happy you're here."], answer: 0, tip: "I'm happy + you're (you are) here." },
    },
    {
      text: "Doctors give a lot of advice and a lot of rules. You have to understand them! Let me teach you, like old times.",
      es: 'Los médicos dan muchos consejos y muchas reglas. ¡Tienes que entenderlos! Déjame enseñarte, como en los viejos tiempos.',
      choice: { ask: '¿Qué le respondes?', options: ['OK, teach me!', 'OK, teach to me!', 'OK, teaches me!'], answer: 0, tip: 'Una orden o petición: el verbo tal cual (teach) + me.' },
    },
  ],
  reward: {
    text: 'Leo: "Lesson time! Talk to me when you are ready."',
    es: '¡Hora de la lección! Háblame cuando quieras.',
    sub: 'Habla otra vez con Leo: te enseña should, must y have to, y luego practican.',
    say: 'Lesson time!',
  },
}

// La lección de Leo (sistema de lecciones, tema should-must) y después la práctica guiada (8 frases)
NPC_TASKS['a2-02-practice'] = {
  npc: 'a2-leo',
  done: 'a2-02-practice',
  lesson: 'should-must',
  activity: 'practice',
  practice: 'should-must',
  steps: [],
  reward: {
    text: 'Leo: "Great job! Hey... look at that man in the hallway. Something is wrong with him."',
    es: '¡Muy bien! Oye... mira a ese hombre del pasillo. Algo le pasa.',
    sub: 'Un eco corrompido apareció al final del pasillo: da consejos con errores. Corrígelo con should, must y have to.',
    say: 'Something is wrong with him.',
  },
}

// ── A2-03 — Day in the City (alcance mínimo, escena en data/a2City.ts) ──
// Orden: Leo (llega) → Leo (lección + práctica) → tu amigo (invitación) → el mesero (charla con presión)
//        → el eco del café (combate en 2 fases) → tu amigo (Sequence Master) → tu amigo (cierre con anomalía).
NPC_TASKS['a2-03-leo'] = {
  done: 'a2-03-arrive',
  steps: [
    {
      text: "{name}! You're out of the hospital! The doctor says you can walk now. How about spending the day in the city?",
      es: '¡{name}! ¡Saliste del hospital! La médica dice que ya puedes caminar. ¿Qué tal si pasamos el día en la ciudad?',
      choice: { ask: '¿Qué le respondes?', options: ["Good idea! Let's go!", "Good idea! Let's going!", "Good idea! Let's to go!"], answer: 0, tip: "Let's + verbo tal cual: let's go." },
    },
    {
      text: "Great! But first, a quick lesson. In the city you make plans with friends. Let me show you how.",
      es: '¡Genial! Pero primero, una lección rápida. En la ciudad haces planes con amigos. Te enseño cómo.',
      choice: { ask: '¿Qué le dices?', options: ['OK, teach me!', 'OK, teach to me!', 'OK, teaches me!'], answer: 0, tip: 'Petición: el verbo tal cual (teach) + me.' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: "Habla otra vez con Leo: te enseña let's, how about, would you like y la frecuencia.",
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema invitations) y la práctica guiada (7 frases)
NPC_TASKS['a2-03-practice'] = {
  npc: 'a2-03-leo',
  done: 'a2-03-practice',
  lesson: 'invitations',
  activity: 'practice',
  practice: 'invitations',
  // 4 frases de antes + 2 de ordenar + 1 de escribir una invitación
  practiceIds: ['a2-03-o1', 'a2-03-f1', 'a2-03-o2', 'a2-03-x1', 'a2-03-o3', 'a2-03-o4', 'T-a2-03-o5'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Look, your friend is on the street. Go and say hi!"',
    es: '¡Bien hecho! Mira, tu amigo está en la calle. ¡Ve a saludarlo!',
    sub: 'Tu amigo te espera en la calle, junto a la cebra.',
    say: 'Go and say hi!',
  },
}

NPC_TASKS['a2-03-friend'] = {
  done: 'a2-03-invite',
  requires: {
    id: 'a2-03-practice',
    text: 'Your friend: "Hey! Leo is looking for you. Talk to him first!"',
    es: '¡Oye! Leo te está buscando. ¡Habla primero con él!',
    sub: 'Leo está en la calle, cerca de la parada.',
  },
  steps: [
    {
      text: "Hi! You look much better! Would you like to have a coffee with me at the café?",
      es: '¡Hola! ¡Te ves mucho mejor! ¿Te gustaría tomar un café conmigo en el café?',
      choice: { ask: 'Aceptas la invitación. ¿Qué le dices?', options: ["Sure! I'd love to.", "Sure! I'd love.", "Sure! I love to."], answer: 0, tip: "Para aceptar: I'd love to (I would love to)." },
    },
    {
      text: 'Great! I go there a lot. And you? How often do you drink coffee?',
      es: '¡Genial! Yo voy mucho. ¿Y tú? ¿Con qué frecuencia tomas café?',
      choice: { ask: '¿Qué le respondes?', options: ['I sometimes drink coffee in the morning.', 'I drink sometimes coffee in the morning.', 'I sometimes drinks coffee in the morning.'], answer: 0, tip: 'La frecuencia va antes del verbo, y con I sin -s: I sometimes drink.' },
    },
    {
      text: "Me too! Oh... look at the waiter. He usually smiles, but today he looks strange.",
      es: '¡Yo también! Oh... mira al mesero. Normalmente sonríe, pero hoy se ve raro.',
      choice: { ask: '¿Qué le dices?', options: ["How about going and talking to him?", "How about go and talk to him?", "How about to go and talk to him?"], answer: 0, tip: 'How about + verbo con -ing: going, talking.' },
    },
  ],
  reward: {
    text: 'Your friend: "Let\'s go in. Be careful with the waiter..."',
    es: 'Entremos. Cuidado con el mesero...',
    sub: 'Ve al café: alguien raro bloquea la puerta. Choca con ella para el combate y luego habla con el mesero.',
    say: 'Be careful!',
  },
}

// Dialogue Under Pressure: el mesero habla rápido y espera tu respuesta (aceptar, rechazar, aclarar)
NPC_TASKS['a2-03-waiter'] = {
  done: 'a2-03-pressure',
  pressure: 12,
  steps: [
    {
      text: 'Good morning! Quick, quick! Would you like a table by the window?',
      es: '¡Buenos días! ¡Rápido, rápido! ¿Quieren una mesa junto a la ventana?',
      choice: { ask: 'Acepta la mesa.', options: ['Yes, please. That would be great.', 'Yes, please. That would being great.', 'Yes, please. That will great.'], answer: 0, tip: 'Para aceptar con cortesía: Yes, please. That would be great.' },
    },
    {
      text: 'How about our special purple coffee? You must try it! Everybody drinks it today!',
      es: '¿Qué tal nuestro café morado especial? ¡Tienes que probarlo! ¡Hoy todos lo toman!',
      choice: { ask: 'Ese café no te gusta nada. Recházalo con amabilidad.', options: ["No, thank you. I'd like a black coffee, please.", "No, thank you. I like a black coffee, please.", "No, thanks you. I'd like a black coffee, please."], answer: 0, tip: "Rechaza y pide otra cosa: No, thank you. I'd like... please." },
    },
    {
      text: 'Blackcoffeeforyouandpurplecoffeeforyourfriendandyoumustpaynowandstayforever!',
      es: '(Habla tan rápido que no se entiende nada.)',
      choice: { ask: 'No entendiste nada. Pide que lo repita.', options: ['Sorry, can you say that again, please?', 'Sorry, can you say again that, please?', 'Sorry, you can say that again, please?'], answer: 0, tip: 'Para aclarar: Sorry, can you say that again, please?' },
    },
    {
      text: 'Stay... forever... You MUST stay!',
      es: 'Quédense... para siempre... ¡DEBEN quedarse!',
    },
  ],
  reward: {
    text: 'The waiter\'s eyes are purple now!',
    es: '¡Los ojos del mesero ahora son morados!',
    sub: 'El mesero se corrompió. Choca con él para el combate: primero reglas, luego invitaciones.',
    say: 'You must stay!',
  },
}

// Sequence Master: ordenar el plan del día (los pasos salen desordenados)
NPC_TASKS['a2-03-plan'] = {
  npc: 'a2-03-friend',
  done: 'a2-03-plan',
  activity: 'sequence',
  requires: {
    id: 'a2-03-echo',
    text: 'Your friend: "The waiter looks strange. Go to the café and help him!"',
    es: 'El mesero se ve raro. ¡Ve al café y ayúdalo!',
    sub: 'El mesero está en el café.',
  },
  sequence: {
    title: 'Plan del día',
    intro: { en: "You helped the waiter! Let's plan the rest of the day. At twelve we have lunch, at two we walk in the park, at four we visit the shop, and at six we go home.", es: '¡Ayudaste al mesero! Planeemos el resto del día. A las doce almorzamos, a las dos caminamos por el parque, a las cuatro vamos a la tienda y a las seis volvemos a casa.' },
    steps: [
      { en: 'First, we have lunch at twelve.', es: 'Primero, almorzamos a las doce.' },
      { en: 'Then, we walk in the park at two.', es: 'Luego, caminamos por el parque a las dos.' },
      { en: 'After that, we visit the shop at four.', es: 'Después, vamos a la tienda a las cuatro.' },
      { en: 'Finally, we go home at six.', es: 'Por último, volvemos a casa a las seis.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Your friend: "Perfect plan! Wait... do you hear that?"',
    es: '¡Plan perfecto! Espera... ¿oyes eso?',
    sub: 'Habla otra vez con tu amigo.',
    say: 'Perfect plan!',
  },
}

// Cierre: una pequeña anomalía (sin revelar nada de B1/B2)
NPC_TASKS['a2-03-close'] = {
  npc: 'a2-03-friend',
  done: 'a2-03-close',
  steps: [
    {
      text: 'Look at the clock in the plaza! It stopped... and now its hands are moving backwards!',
      es: '¡Mira el reloj de la plaza! Se detuvo... ¡y ahora sus manecillas van hacia atrás!',
      choice: { ask: 'Miras tu reloj: el centro vacío brilla un segundo. ¿Qué dices?', options: ['That is strange. My clock is shining too!', 'That is strange. My clock shining too!', 'That are strange. My clock is shining too!'], answer: 0, tip: 'Algo que pasa ahora: is + verbo con -ing (is shining).' },
    },
    {
      text: "Now it's normal again. Maybe it was nothing... Come on, let's enjoy the day!",
      es: 'Ya está normal otra vez. Quizá no fue nada... Vamos, ¡disfrutemos el día!',
    },
  ],
  reward: {
    text: 'Your friend: "Let\'s enjoy the day!"',
    es: '¡Disfrutemos el día!',
    sub: 'A2-03 completada. Por un segundo, el centro vacío de tu reloj brilló con una luz morada... y luego nada.',
    say: "Let's enjoy the day!",
  },
}

// ── A2-04 — Mr. Hale's Workshop (alcance mínimo con jefe, escena en data/a2Workshop.ts) ──
// Orden: Leo (llega) → Leo (lección + práctica) → Mr. Hale (charla con presión) → Leo (Fix the Radio: arreglar la radio)
//        → Mr. Hale corrompido (jefe en 2 fases) → Leo (cierre con el fragmento y una pista).
NPC_TASKS['a2-04-leo'] = {
  done: 'a2-04-arrive',
  steps: [
    {
      text: '{name}, the clock in the plaza moved backwards... So I called Mr. Hale. He repairs clocks, radios, bikes... everything! This is his workshop.',
      es: '{name}, el reloj de la plaza fue hacia atrás... Así que llamé al señor Hale. Arregla relojes, radios, bicicletas... ¡todo! Este es su taller.',
      choice: { ask: 'Quieres que el señor Hale mire tu reloj. ¿Qué le pides a Leo?', options: ['Great! Could you introduce me to him?', 'Great! Could you introducing me to him?', 'Great! Could you to introduce me to him?'], answer: 0, tip: 'Could you + verbo tal cual: Could you introduce...?' },
    },
    {
      text: 'Sure! But Mr. Hale is very busy, and he talks fast. In a workshop you ask for things politely. Let me teach you first.',
      es: '¡Claro! Pero el señor Hale está muy ocupado y habla rápido. En un taller las cosas se piden con cortesía. Déjame enseñarte primero.',
      choice: { ask: '¿Qué le dices?', options: ['OK. Can you teach me now?', 'OK. Can you teaching me now?', 'OK. Can you teaches me now?'], answer: 0, tip: 'Can you + verbo tal cual: Can you teach...?' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: 'Habla otra vez con Leo: te enseña peticiones corteses, instrucciones y palabras del taller.',
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema requests: peticiones, instrucciones, responsabilidades y herramientas) y la práctica guiada (5 frases)
NPC_TASKS['a2-04-practice'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-practice',
  lesson: 'requests',
  activity: 'practice',
  practice: 'requests',
  // completar, ordenar, completar instrucción, corregir y escribir una petición
  practiceIds: ['a2-04-r1', 'a2-04-r3', 'a2-04-i2', 'a2-04-r5', 'T-a2-04-r7'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Mr. Hale is at the workbench. Go and talk to him... and be quick!"',
    es: '¡Bien hecho! El señor Hale está en la mesa de trabajo. Ve a hablar con él... ¡y sé rápido!',
    sub: 'Un aprendiz raro bloquea el paso al taller: choca con él para el combate. Luego habla rápido con el señor Hale.',
    say: 'Be quick!',
  },
}

// Dialogue Under Pressure: Mr. Hale tiene prisa; pides que mire tu reloj, pides ayuda y que repita más despacio
NPC_TASKS['a2-04-hale'] = {
  done: 'a2-04-pressure',
  pressure: 12,
  requires: {
    id: 'a2-04-practice',
    text: 'Mr. Hale: "Sorry, I\'m very busy right now! Talk to Leo first."',
    es: 'Perdón, ¡ahora estoy muy ocupado! Habla primero con Leo.',
    sub: 'Leo está en el taller, cerca de las cajas de herramientas.',
  },
  steps: [
    {
      text: "Hi! Leo's friend, right? Sorry, I'm in a hurry! Quick, what do you need?",
      es: '¡Hola! Eres el amigo de Leo, ¿verdad? Perdón, ¡tengo prisa! Rápido, ¿qué necesitas?',
      choice: { ask: 'Pídele con cortesía que mire tu reloj.', options: ['Could you look at my clock, please?', 'Could you looking at my clock, please?', 'Could you to look at my clock, please?'], answer: 0, tip: 'Could you + verbo tal cual + please?' },
    },
    {
      text: 'Your clock? Hmm, the center is empty... Strange! OK, but first help me. My hands are busy!',
      es: '¿Tu reloj? Mmm, el centro está vacío... ¡Qué raro! Bueno, pero primero ayúdame. ¡Tengo las manos ocupadas!',
      choice: { ask: 'Necesitas que sostenga la escalera un momento. Pídelo con mucha cortesía.', options: ['Would you mind holding the ladder for me?', 'Would you mind hold the ladder for me?', 'Would you mind to hold the ladder for me?'], answer: 0, tip: 'Would you mind + verbo con -ing: holding.' },
    },
    {
      text: 'Firstturnofftheradiothenopentheboxafterthatchangethebatteryandfinally...',
      es: '(Habla tan rápido que no se entiende nada.)',
      choice: { ask: 'No entendiste nada. Pide que lo diga más despacio.', options: ['Sorry, could you say that more slowly, please?', 'Sorry, could you saying that more slowly, please?', 'Sorry, you could say that more slowly, please?'], answer: 0, tip: 'Para aclarar: Sorry, could you say that more slowly, please?' },
    },
    {
      text: 'Oh no... my notes! The steps are all on the floor. Leo, could you help?',
      es: 'Oh, no... ¡mis notas! Los pasos están todos en el piso. Leo, ¿podrías ayudar?',
    },
  ],
  reward: {
    text: 'Mr. Hale: "I have to fix this old radio today!"',
    es: '¡Tengo que arreglar esta radio vieja hoy!',
    sub: 'Las notas del señor Hale se cayeron. Habla con Leo: él lee las notas y tú arreglas la radio paso a paso.',
    say: 'I have to fix this old radio today!',
  },
}

// Fix the Radio: seguir las instrucciones del señor Hale y tocar la pieza de cada paso
NPC_TASKS['a2-04-sequence'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-sequence',
  activity: 'fixradio',
  requires: {
    id: 'a2-04-pressure',
    text: 'Leo: "Go and talk to Mr. Hale. He is at the workbench."',
    es: 'Ve a hablar con el señor Hale. Está en la mesa de trabajo.',
    sub: 'El señor Hale está junto a las mesas de trabajo.',
  },
  fixradio: {
    title: 'Arreglar la radio',
    intro: { en: "Mr. Hale's radio is in pieces. I can read his notes. Listen and do it step by step.", es: 'La radio del señor Hale está en pedazos. Puedo leer sus notas. Escucha y hazlo paso a paso.' },
    steps: [
      { en: 'First, please put the new battery in the radio.', es: 'Primero, por favor, pon la batería nueva en la radio.', piece: 'battery', tip: 'Battery = batería (la pieza verde con +).' },
      { en: 'Then, put in the two screws to close the battery box.', es: 'Luego, pon los dos tornillos para cerrar la caja de la batería.', piece: 'screws', tip: 'Screws = tornillos (las dos piezas pequeñas de metal).' },
      { en: 'Next, could you put the dial on the front?', es: 'Después, ¿podrías poner la perilla del dial al frente?', piece: 'dial', tip: 'Dial = la perilla redonda para cambiar la emisora.' },
      { en: 'After that, put the antenna on top.', es: 'Luego de eso, pon la antena arriba.', piece: 'antenna', tip: 'Antenna = antena (la varilla larga).' },
      { en: 'Finally, turn on the radio!', es: '¡Por último, enciende la radio!', piece: 'switch', tip: 'Turn on = encender: toca el interruptor OFF de la radio.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The radio is on! But... look at Mr. Hale. That purple light is in his hands!"',
    es: '¡La radio funciona! Pero... mira al señor Hale. ¡Esa luz morada está en sus manos!',
    sub: 'El señor Hale se corrompió. Choca con él para el combate: primero peticiones, luego instrucciones.',
    say: 'Look at Mr. Hale!',
  },
}

// Cierre: el fragmento liberado y una pista breve (sin revelar nada de B1/B2)
NPC_TASKS['a2-04-close'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-close',
  requires: {
    id: 'a2-04-hale-boss',
    text: 'Leo: "Mr. Hale needs help! Could you stop him? Be careful!"',
    es: '¡El señor Hale necesita ayuda! ¿Podrías detenerlo? ¡Ten cuidado!',
    sub: 'El señor Hale está corrompido junto a las mesas de trabajo.',
  },
  steps: [
    {
      text: 'A man in a dark coat, and he never said a word... Do you remember the stranger on the terrace?',
      es: 'Un hombre con abrigo oscuro que nunca dijo una palabra... ¿Recuerdas al desconocido de la terraza?',
      choice: { ask: 'Miras la piedrita morada. ¿Qué le dices a Leo?', options: ['Yes. Could you help me find him?', 'Yes. Could you helping me find him?', 'Yes. Could you to help me find him?'], answer: 0, tip: 'Could you + verbo tal cual: Could you help...?' },
    },
    {
      text: "Of course! First, we keep the stone safe. Then, we look for more purple lights. It's our job now!",
      es: '¡Por supuesto! Primero, guardamos bien la piedra. Luego, buscamos más luces moradas. ¡Ahora ese es nuestro trabajo!',
    },
  ],
  reward: {
    text: 'Leo: "It\'s our job now!"',
    es: '¡Ahora es nuestro trabajo!',
    sub: 'A2-04 completada. Guardaste el fragmento morado: cerca de él, el centro vacío de tu reloj vibra un poco.',
    say: "It's our job now!",
  },
}

// ── A2-05 — Words That Don't Belong (biblioteca, presente; escena en data/a2Library.ts) ──
// Orden: Leo (llega) → Leo (lección de Past Simple + práctica) → Mrs. Okafor (testimonio) → Mrs. Okafor (Reconstruct the Story:
//        contrastar pistas) → Mrs. Okafor (Sequence Master: ordenar la nota) → el eco de tinta (jefe ligero en 2 fases) → Leo (cierre con el fragmento y una pista).
NPC_TASKS['a2-05-leo'] = {
  done: 'a2-05-arrive',
  steps: [
    {
      text: "{name}, Mr. Hale's note had no name. So yesterday I called the library. Mrs. Okafor said strange things happened here!",
      es: '{name}, la nota del señor Hale no tenía nombre. Así que ayer llamé a la biblioteca. ¡La señora Okafor dijo que aquí pasaron cosas raras!',
      choice: { ask: 'Quieres saber qué pasó. ¿Qué le preguntas a Leo?', options: ['Really? What happened yesterday?', 'Really? What happen yesterday?', 'Really? What did happened yesterday?'], answer: 0, tip: 'Pregunta por el sujeto: What happened...? (sin did).' },
    },
    {
      text: 'Some words in the books changed. People here talk about the past all day, so first... a little lesson!',
      es: 'Algunas palabras de los libros cambiaron. Aquí la gente habla del pasado todo el día, así que primero... ¡una pequeña lección!',
      choice: { ask: '¿Qué le dices?', options: ['OK! I studied a lot last week.', 'OK! I studyed a lot last week.', 'OK! I study a lot last week.'], answer: 0, tip: 'study → studied (y cambia a i).' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: 'Habla otra vez con Leo: te enseña el pasado simple, los conectores de tiempo y a comparar.',
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema past-simple) y la práctica guiada: completar, ordenar, corregir, escribir y conectar
NPC_TASKS['a2-05-practice'] = {
  npc: 'a2-05-leo',
  done: 'a2-05-practice',
  lesson: 'past-simple',
  activity: 'practice',
  practice: 'past-simple',
  practiceIds: ['a2-05-r1', 'a2-05-i5', 'a2-05-i3', 'W-a2-05-i1', 'a2-05-c1'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Mrs. Okafor is at the front desk. Ask her what happened."',
    es: '¡Bien hecho! La señora Okafor está en el mostrador. Pregúntale qué pasó.',
    sub: 'Un lector raro bloquea el paso al mostrador: choca con él para el combate. Luego habla con Mrs. Okafor.',
    say: 'Ask her what happened.',
  },
}

// El testimonio de la bibliotecaria, en pasado
NPC_TASKS['a2-05-librarian'] = {
  done: 'a2-05-testimony',
  requires: {
    id: 'a2-05-practice',
    text: 'Mrs. Okafor: "Welcome! Please talk to your friend Leo first. He is by the shelves."',
    es: '¡Bienvenido! Por favor habla primero con tu amigo Leo. Está junto a las estanterías.',
    sub: 'Leo está cerca de las estanterías.',
  },
  steps: [
    {
      text: "Hello! You are Leo's friend. I'm Mrs. Okafor. Thank you for coming. Yesterday was a very strange day here.",
      es: '¡Hola! Eres el amigo de Leo. Soy la señora Okafor. Gracias por venir. Ayer fue un día muy raro aquí.',
      choice: { ask: 'Pídele que te cuente.', options: ['What did you see?', 'What did you saw?', 'What you saw?'], answer: 0, tip: 'Pregunta en pasado: did + verbo simple (see, no saw).' },
    },
    {
      text: 'A reader opened an old book about clocks. Then the words started to change: "goed", "buyed", "eated"... Words that don\'t belong!',
      es: 'Un lector abrió un libro viejo sobre relojes. Luego las palabras empezaron a cambiar: "goed", "buyed", "eated"... ¡Palabras que no pertenecen!',
      choice: { ask: 'Miras el libro desde lejos. ¿Qué dices?', options: ['That book is older than the library!', 'That book is more old than the library!', 'That book is oldest than the library!'], answer: 0, tip: 'Comparar: old → older than.' },
    },
    {
      text: 'The reader wrote everything in a note. But the ink changed it... Some facts are wrong now, and the lines are mixed up!',
      es: 'El lector escribió todo en una nota. Pero la tinta la cambió... Ahora algunos datos están mal y las líneas están revueltas.',
    },
  ],
  reward: {
    text: 'Mrs. Okafor: "Here are my notes, the library record and the returns card. Could you find the truth?"',
    es: 'Aquí están mis apuntes, el registro de la biblioteca y la tarjeta de devoluciones. ¿Podrías encontrar la verdad?',
    sub: 'Habla otra vez con Mrs. Okafor: compara las pistas con la nota del lector (Reconstruct the Story).',
    say: 'Could you find the truth?',
  },
}

// Reconstruct the Story: contrastar cada línea de la nota corrompida con una pista y elegir la frase verdadera
NPC_TASKS['a2-05-reconstruct'] = {
  npc: 'a2-05-librarian',
  done: 'a2-05-reconstruct',
  activity: 'reconstruct',
  requires: {
    id: 'a2-05-testimony',
    text: 'Mrs. Okafor: "Please, talk to me first."',
    es: 'Por favor, habla conmigo primero.',
    sub: 'Mrs. Okafor está frente al mostrador.',
  },
  reconstruct: {
    title: 'What really happened?',
    intro: { en: "The ink changed the reader's note. Read each clue and choose what really happened.", es: 'La tinta cambió la nota del lector. Lee cada pista y elige lo que pasó de verdad.' },
    items: [
      {
        source: 'Mrs. Okafor',
        clue: { en: 'The reader came in at nine. I opened the door for him.', es: 'El lector entró a las nueve. Yo le abrí la puerta.' },
        claim: { en: 'The reader arrive at ten.', es: 'El lector "llega" a las diez.' },
        options: ['The reader arrived at nine.', 'The reader arrived at ten.', 'The reader arrive at nine.'],
        answer: 0,
        tip: 'Llegó a las nueve, y arrive → arrived.',
      },
      {
        source: 'Library record',
        clue: { en: 'Book: "Old Clocks". Shelf 3. Taken at 9:15.', es: 'Libro: "Relojes viejos". Estante 3. Tomado a las 9:15.' },
        claim: { en: 'He taked a book about clocks.', es: '"Tomó" un libro sobre relojes.' },
        options: ['He took a book about clocks.', 'He took a book about cars.', 'He taked a book about clocks.'],
        answer: 0,
        tip: 'El dato está bien (relojes), pero take es irregular: take → took. Toca "taked".',
        mode: 'tap',
        wrongWord: 'taked',
      },
      {
        source: 'Mrs. Okafor',
        clue: { en: 'He told me: "The light was small and purple."', es: 'Él me dijo: "La luz era pequeña y morada".' },
        claim: { en: 'He seed a big green light.', es: '"Vio" una luz verde y grande.' },
        options: ['He saw a small purple light.', 'He saw a big green light.', 'He seed a small purple light.'],
        answer: 0,
        tip: 'La luz era pequeña y morada, y see → saw (irregular).',
      },
      {
        source: 'The old book',
        clue: { en: 'Page 12: "Yesterday I goed to the shop and buyed a clock."', es: 'Página 12: "Ayer *fui a la tienda y *compré un reloj" (con errores).' },
        claim: { en: 'The pictures in the book changed.', es: 'Los dibujos del libro cambiaron.' },
        options: ['The words in the book changed.', 'The pictures in the book changed.', 'The words in the book changeed.'],
        answer: 0,
        tip: 'Cambiaron las palabras, y change → changed (solo -d).',
      },
      {
        source: 'Returns card',
        clue: { en: 'Returned last week. No name.', es: 'Devuelto la semana pasada. Sin nombre.' },
        claim: { en: 'Someone returned the book yesterday.', es: 'Alguien devolvió el libro ayer.' },
        options: ['Someone returned the book last week.', 'Someone returned the book yesterday.', 'Someone return the book last week.'],
        answer: 0,
        tip: 'El verbo está bien (returned), pero la pista dice last week, no ayer. Toca "yesterday".',
        mode: 'tap',
        wrongWord: 'yesterday',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Mrs. Okafor: "Now we know the truth. But the lines of the note are still mixed up..."',
    es: 'Ahora sabemos la verdad. Pero las líneas de la nota siguen revueltas...',
    sub: 'Habla otra vez con Mrs. Okafor para poner la nota en orden (Sequence Master).',
    say: 'Now we know the truth.',
  },
}

// Sequence Master: poner en orden la nota ya corregida
NPC_TASKS['a2-05-sequence'] = {
  npc: 'a2-05-librarian',
  done: 'a2-05-sequence',
  activity: 'sequence',
  requires: {
    id: 'a2-05-reconstruct',
    text: 'Mrs. Okafor: "First, let\'s find the truth. Talk to me."',
    es: 'Primero, encontremos la verdad. Habla conmigo.',
    sub: 'Mrs. Okafor está frente al mostrador.',
  },
  sequence: {
    title: "Put the reader's note in order",
    hint: 'Mira las palabras de orden: Yesterday morning, First, Then, After that, Finally.',
    intro: { en: "The facts are right now, but the lines are mixed up. Let's put what happened yesterday in order.", es: 'Los datos ya están bien, pero las líneas están revueltas. Ordenemos lo que pasó ayer.' },
    steps: [
      { en: 'Yesterday morning, I arrived at the library at nine.', es: 'Ayer en la mañana llegué a la biblioteca a las nueve.' },
      { en: 'First, I took an old book about clocks from the shelf.', es: 'Primero, tomé un libro viejo sobre relojes de la estantería.' },
      { en: 'Then, I saw a little purple light between the pages.', es: 'Luego, vi una lucecita morada entre las páginas.' },
      { en: 'After that, the words changed: "goed", "buyed", "eated"!', es: 'Después, las palabras cambiaron: "goed", "buyed", "eated".' },
      { en: 'Finally, I closed the book and called Mrs. Okafor.', es: 'Por último, cerré el libro y llamé a la señora Okafor.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The story is complete! But... look at the reading table. The ink is moving!"',
    es: '¡La historia está completa! Pero... mira la mesa de lectura. ¡La tinta se mueve!',
    sub: 'Un eco de tinta salió del libro viejo junto a la mesa de lectura. Choca con él: primero pasados regulares, luego irregulares.',
    say: 'The ink is moving!',
  },
}

// Cierre: el fragmento liberado y una pista breve (sin revelar nada de B1/B2)
NPC_TASKS['a2-05-close'] = {
  npc: 'a2-05-leo',
  done: 'a2-05-close',
  requires: {
    id: 'a2-05-ink-echo',
    text: 'Leo: "The ink is everywhere! Could you stop it? Be careful!"',
    es: '¡La tinta está por todas partes! ¿Podrías detenerla? ¡Ten cuidado!',
    sub: 'El eco de tinta está junto a la mesa de lectura.',
  },
  steps: [
    {
      text: 'Look, there was a bookmark in the old book. Someone returned it last week... and there is a drawing of a clock on it. It looks like yours!',
      es: 'Mira, había un separador en el libro viejo. Alguien lo devolvió la semana pasada... y tiene el dibujo de un reloj. ¡Se parece al tuyo!',
      choice: { ask: 'Comparas el dibujo con tu reloj. ¿Qué dices?', options: ['Yes! But the drawing was bigger than my clock.', 'Yes! But the drawing was more big than my clock.', 'Yes! But the drawing were bigger than my clock.'], answer: 0, tip: 'big → bigger than · the drawing → was.' },
    },
    {
      text: 'An old radio, an old book... The purple lights hide in old things. We found two. Let\'s keep looking!',
      es: 'Una radio vieja, un libro viejo... Las luces moradas se esconden en cosas viejas. Encontramos dos. ¡Sigamos buscando!',
    },
  ],
  reward: {
    text: 'Leo: "We found two. Let\'s keep looking!"',
    es: 'Encontramos dos. ¡Sigamos buscando!',
    sub: 'A2-05 completada. Guardaste otro fragmento morado y el separador con el dibujo del reloj.',
    say: "Let's keep looking!",
  },
}

// ── A2-06 — A Tradition at Risk (granja de los River; escena, esbirro y eco en data/a2FarmPast.ts) ──
// Orden: Leo (lección past-simple-comparatives + práctica mixta) → el ayudante corrompido (puerta de la casa) → el abuelo → el vecino joven → el vecino (Dialogue Under Pressure)
//        → Elena (Reconstruct the Story: descartar eventos falsos + ordenar los verdaderos) → Elena (diálogo final)
//        → el eco de la carrera (junto al río) → Elena (cierre).
NPC_TASKS['a2-06-leo'] = {
  done: 'a2-06-practice',
  lesson: 'past-simple-comparatives',
  activity: 'practice',
  practice: 'past-simple-comparatives',
  practiceIds: ['a2-06-p1', 'a2-06-p2', 'a2-06-p3'],
  steps: [],
  reward: {
    text: "Leo: \"Now you can listen to Elena's family. Use the Past Simple to tell what happened and comparatives when they compare ideas.\"",
    es: 'Ahora puedes escuchar a la familia de Elena. Usa el pasado simple para contar lo que pasó y los comparativos cuando comparen ideas.',
    sub: 'Alguien bloquea la puerta de la casa familiar: libera el paso y habla con el abuelo; luego con el vecino joven en el establo.',
    say: "Now you can listen to Elena's family.",
  },
}

NPC_TASKS['a2-06-grandfather'] = {
  done: 'a2-06-grandfather-talk',
  requires: {
    id: 'a2-06-practice',
    text: 'Grandfather: "Hello, young friend. Your friend Leo is waiting for you in the square."',
    es: 'Hola, joven amigo. Tu amigo Leo te espera en la plaza.',
    sub: 'Leo está en la plaza.',
  },
  steps: [
    {
      text: 'Every year we organized the River Race. The winner kept our family banner for one year.',
      es: 'Cada año organizábamos la River Race. El ganador se quedaba con el estandarte de la familia durante un año.',
      choice: { ask: '¿Qué hacía el ganador?', options: ['The winner kept the banner for one year.', 'The winner keeped the banner for one year.', 'The winner sold the banner.'], answer: 0, tip: 'keep es irregular: kept. Y el ganador lo guardaba, no lo vendía.' },
    },
    {
      text: "Five years ago I became ill. I couldn't prepare the race. After the last race, someone lost the banner. Then the race stopped.",
      es: 'Hace cinco años me enfermé. No pude preparar la carrera. Después de la última carrera, alguien perdió el estandarte. Entonces la carrera se detuvo.',
      choice: { ask: '¿Qué pasó con el estandarte?', options: ['Someone lost the banner after the last race.', 'Someone losed the banner after the last race.', 'The grandfather sold the banner.'], answer: 0, tip: 'lose es irregular: lost. Y nadie lo vendió: alguien lo perdió.' },
    },
    {
      text: 'Elena wants to bring it back. But the young neighbor says it was more expensive than before.',
      es: 'Elena quiere recuperarla. Pero el vecino joven dice que era más cara que antes.',
    },
  ],
  reward: {
    text: 'Grandfather: "Talk to our young neighbor. He is in the stable."',
    es: 'Habla con nuestro vecino joven. Está en el establo.',
    sub: 'El vecino joven está en el establo.',
    say: 'He is in the stable.',
  },
}

NPC_TASKS['a2-06-neighbor'] = {
  done: 'a2-06-neighbor-talk',
  requires: {
    id: 'a2-06-grandfather-talk',
    text: 'Neighbor: "Hi. Did you talk to the grandfather? Talk to him first."',
    es: 'Hola. ¿Hablaste con el abuelo? Habla primero con él.',
    sub: 'El abuelo está en la casa familiar.',
  },
  steps: [
    {
      text: 'The race was old and expensive. It was more expensive than the other farms wanted.',
      es: 'La carrera era vieja y cara. Era más cara de lo que querían las otras granjas.',
      choice: { ask: '¿Qué piensa el vecino de la carrera?', options: ['It was more expensive than the other farms wanted.', 'It was expensiver than the other farms wanted.', 'It was more cheap than before.'], answer: 0, tip: 'expensive es largo: more expensive than.' },
    },
    {
      text: "No, the grandfather didn't sell the horses. But after he became ill, nobody organized the race. The banner disappeared.",
      es: 'No, el abuelo no vendió los caballos. Pero después de que se enfermó, nadie organizó la carrera. El estandarte desapareció.',
      choice: { ask: '¿El abuelo vendió los caballos?', options: ["No, he didn't sell the horses.", "No, he didn't sold the horses.", 'Yes, he selled the horses.'], answer: 0, tip: "Negativa en pasado: didn't + verbo base (sell)." },
    },
    {
      text: "I think it's better to stop. Elena is kind, but the tradition is not the most important thing now.",
      es: 'Creo que es mejor dejarla. Elena es amable, pero la tradición no es lo más importante ahora.',
    },
  ],
  reward: {
    text: 'Neighbor: "Do you want to bring the race back too? Then convince me."',
    es: '¿Tú también quieres recuperar la carrera? Entonces convénceme.',
    sub: 'Habla otra vez con el vecino: defiende la tradición (Dialogue Under Pressure).',
    say: 'Then convince me.',
  },
}

// Dialogue Under Pressure: defender la tradición ante el vecino. 5 turnos, sin respuestas incorrectas; el desenlace depende de las buenas
NPC_TASKS['a2-06-debate'] = {
  npc: 'a2-06-neighbor',
  done: 'a2-06-debate',
  activity: 'debate',
  requires: {
    id: 'a2-06-neighbor-talk',
    text: 'Neighbor: "Did you talk to the grandfather? Talk to him first."',
    es: '¿Hablaste con el abuelo? Habla primero con él.',
    sub: 'El abuelo está en la casa familiar.',
  },
  debate: {
    title: 'Defend the tradition',
    turns: [
      {
        text: 'The race was more expensive than it was useful. We should forget it.',
        es: 'La carrera era más cara que útil. Deberíamos olvidarla.',
        options: [
          { en: 'It was more important for the family than the money.', es: 'Era más importante para la familia que el dinero.', value: 'good', reply: { text: 'More important than the money? Hmm... maybe for the family, yes.', es: '¿Más importante que el dinero? Mmm... quizá para la familia, sí.' } },
          { en: 'It was expensive, yes.', es: 'Era cara, sí.', value: 'neutral', reply: { text: 'You see? Even you think so.', es: '¿Ves? Hasta tú lo piensas.' } },
          { en: 'You only think about money.', es: 'Solo piensas en el dinero.', value: 'bad', reply: { text: "That's not fair. Somebody has to think about it!", es: 'Eso no es justo. ¡Alguien tiene que pensar en eso!' } },
        ],
      },
      {
        text: "Five years ago the grandfather became ill. After that, everything stopped. It's better this way.",
        es: 'Hace cinco años el abuelo se enfermó. Después de eso, todo se detuvo. Es mejor así.',
        options: [
          { en: 'The race stopped because someone lost the banner, not only because he was ill.', es: 'La carrera se detuvo porque alguien perdió el estandarte, no solo porque él se enfermó.', value: 'good', reply: { text: "The banner... You're right. That was a big problem too.", es: 'El estandarte... Tienes razón. Ese también fue un gran problema.' } },
          { en: 'Yes, he became ill.', es: 'Sí, se enfermó.', value: 'neutral', reply: { text: 'Yes. And nobody organized it after that.', es: 'Sí. Y nadie la organizó después de eso.' } },
          { en: "That's a bad excuse.", es: 'Esa es una mala excusa.', value: 'bad', reply: { text: 'An excuse? He was very ill! Be careful with your words.', es: '¿Una excusa? ¡Estuvo muy enfermo! Cuidado con tus palabras.' } },
        ],
      },
      {
        text: 'The banner disappeared. Nobody knows where it is. Why bring the race back?',
        es: 'El estandarte desapareció. Nadie sabe dónde está. ¿Para qué recuperar la carrera?',
        options: [
          { en: 'The banner is lost, but the tradition is not completely dead.', es: 'El estandarte está perdido, pero la tradición no está completamente muerta.', value: 'good', reply: { text: 'Maybe... but a tradition without the banner is not the same.', es: 'Quizá... pero una tradición sin el estandarte no es lo mismo.' } },
          { en: 'Maybe we can look for it.', es: 'Quizá podemos buscarlo.', value: 'neutral', reply: { text: 'Look for it? Where? Many people looked for it before.', es: '¿Buscarlo? ¿Dónde? Mucha gente lo buscó antes.' } },
          { en: 'You probably hid it.', es: 'Seguro tú lo escondiste.', value: 'bad', reply: { text: "Me? I didn't hide anything! I helped with the horses every year.", es: '¿Yo? ¡No escondí nada! Ayudé con los caballos cada año.' } },
        ],
      },
      {
        text: "Elena wants to bring it back, but the other farms don't care anymore.",
        es: 'Elena quiere recuperarla, pero a las otras granjas ya no les importa.',
        options: [
          { en: 'Some people still remember. The race was bigger than you think.', es: 'Algunas personas todavía la recuerdan. La carrera era más grande de lo que crees.', value: 'good', reply: { text: 'Bigger than I think? Well... my father talked about it a lot.', es: '¿Más grande de lo que creo? Bueno... mi papá hablaba mucho de ella.' } },
          { en: 'We can ask them.', es: 'Podemos preguntarles.', value: 'neutral', reply: { text: 'You can ask. But I think they will say no.', es: 'Puedes preguntar. Pero creo que dirán que no.' } },
          { en: "You don't know what they think.", es: 'No sabes lo que piensan.', value: 'bad', reply: { text: 'And you do? You are not from here.', es: '¿Y tú sí? Tú no eres de aquí.' } },
        ],
      },
      {
        text: 'Fine. Tell me why the tradition should continue.',
        es: 'Está bien. Dime por qué la tradición debería continuar.',
        options: [
          { en: 'Because it kept the families together. It was more than a race.', es: 'Porque mantenía unidas a las familias. Era más que una carrera.', value: 'good', reply: { text: 'More than a race... Yes. Everybody came to the square that day.', es: 'Más que una carrera... Sí. Ese día todos venían a la plaza.' } },
          { en: 'Because Elena wants it.', es: 'Porque Elena la quiere.', value: 'neutral', reply: { text: 'Elena wants a lot of things.', es: 'Elena quiere muchas cosas.' } },
          { en: 'Because I say so.', es: 'Porque yo lo digo.', value: 'bad', reply: { text: "Because you say so? That's not a reason.", es: '¿Porque tú lo dices? Esa no es una razón.' } },
        ],
      },
    ],
    endings: {
      high: { text: "Hmm... maybe the race was more important than I thought. Talk to Elena. I won't stop you.", es: 'Mmm... quizá la carrera era más importante de lo que pensaba. Habla con Elena. No te voy a detener.' },
      mid: { text: "I still think it's better to stop, but... do what you want. Just don't make it expensive again.", es: 'Sigo pensando que es mejor dejarla, pero... haz lo que quieras. Solo no la hagas cara otra vez.' },
      low: { text: "I don't want to talk about this anymore. Go talk to Elena if you want, but I won't help.", es: 'Ya no quiero hablar de esto. Ve a hablar con Elena si quieres, pero no voy a ayudar.' },
    },
  },
  steps: [],
  reward: {
    text: 'Neighbor: "Elena is in the square."',
    es: 'Elena está en la plaza.',
    sub: 'Habla con Elena en la plaza: reconstruye la historia.',
    say: 'Elena is in the square.',
  },
}

// Reconstruct the Story (1/2): cada evento falso contra lo que dijeron; se elige el evento verdadero
NPC_TASKS['a2-06-reconstruct'] = {
  npc: 'a2-06-elena',
  done: 'a2-06-reconstruct',
  activity: 'reconstruct',
  requires: {
    id: 'a2-06-debate',
    text: 'Elena: "Hi! Please, talk to my grandfather and our young neighbor first."',
    es: '¡Hola! Por favor, habla primero con mi abuelo y con nuestro vecino joven.',
    sub: 'El abuelo está en la casa familiar; el vecino, en el establo.',
  },
  reconstruct: {
    title: 'Reconstruct the Story',
    intro: { en: 'People in the village tell different stories. Some are false. Compare each one with what you heard and choose what really happened.', es: 'En el pueblo cuentan historias distintas y algunas son falsas. Compara cada una con lo que escuchaste y elige lo que pasó de verdad.' },
    items: [
      {
        source: 'The grandfather',
        clue: { en: 'Every year we organized the River Race.', es: 'Cada año organizábamos la River Race.' },
        claim: { en: 'Elena started the race last year.', es: 'Elena empezó la carrera el año pasado.' },
        options: ['Every year the River family organized the River Race.', 'Elena organized the River Race last year.', 'Every year the River family organize the River Race.'],
        answer: 0,
        tip: 'Elena no la empezó: la familia la organizaba cada año (organize → organized).',
      },
      {
        source: 'The young neighbor',
        clue: { en: "No, the grandfather didn't sell the horses.", es: 'No, el abuelo no vendió los caballos.' },
        claim: { en: 'The grandfather sold the horses five years ago.', es: 'El abuelo vendió los caballos hace cinco años.' },
        options: ['Five years ago the grandfather became ill.', 'Five years ago the grandfather sold the horses.', 'Five years ago the grandfather becomed ill.'],
        answer: 0,
        tip: 'Nunca vendió los caballos: hace cinco años se enfermó (become → became).',
      },
      {
        source: 'The young neighbor',
        clue: { en: 'After he became ill, nobody organized the race.', es: 'Después de que se enfermó, nadie organizó la carrera.' },
        claim: { en: 'The neighbor organized the race better than the family.', es: 'El vecino organizó la carrera mejor que la familia.' },
        options: ['The race stopped.', 'The neighbor organized the race.', 'The race stoped.'],
        answer: 0,
        tip: 'Nadie la organizó: la carrera se detuvo (stop → stopped, doble p).',
      },
      {
        source: 'The grandfather',
        clue: { en: 'After the last race, someone lost the banner.', es: 'Después de la última carrera, alguien perdió el estandarte.' },
        claim: { en: 'The banner is still in the stable.', es: 'El estandarte sigue en el establo.' },
        options: ['Someone lost the banner after the last race.', 'The banner is in the stable.', 'Someone losed the banner after the last race.'],
        answer: 0,
        tip: 'El estandarte no está: alguien lo perdió (lose → lost).',
      },
      {
        source: 'The grandfather',
        clue: { en: 'The young neighbor says it was more expensive than before.', es: 'El vecino joven dice que era más cara que antes.' },
        claim: { en: 'The race was always the biggest in the country.', es: 'La carrera siempre fue la más grande del país.' },
        options: ['The young neighbor said the race was more expensive than before.', 'The race was the biggest in the country.', 'The young neighbor said the race was expensiver than before.'],
        answer: 0,
        tip: 'Nadie habló del país: el vecino dijo que era más cara que antes (more expensive than).',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Elena: "Good! Now we know the true events. But in what order did they happen?"',
    es: '¡Bien! Ya sabemos los eventos verdaderos. Pero ¿en qué orden pasaron?',
    sub: 'Habla otra vez con Elena para ordenar la historia.',
    say: 'In what order did they happen?',
  },
}

// Reconstruct the Story (2/2): ordenar los eventos verdaderos
NPC_TASKS['a2-06-order'] = {
  npc: 'a2-06-elena',
  done: 'a2-06-order',
  activity: 'sequence',
  requires: {
    id: 'a2-06-reconstruct',
    text: 'Elena: "First, let\'s find the true events. Talk to me."',
    es: 'Primero, encontremos los eventos verdaderos. Habla conmigo.',
    sub: 'Elena está en la plaza.',
  },
  sequence: {
    title: 'Reconstruct the Story',
    hint: 'Piensa en el tiempo: Every year → Five years ago → after the last race → Now.',
    intro: { en: 'Put the true events in order, from the oldest to now.', es: 'Ordena los eventos verdaderos, del más antiguo a hoy.' },
    steps: [
      { en: 'Every year the River family organized the River Race.', es: 'Cada año la familia River organizaba la River Race.' },
      { en: 'The winner kept the family banner for one year.', es: 'El ganador se quedaba con el estandarte de la familia durante un año.' },
      { en: 'Five years ago the grandfather became ill.', es: 'Hace cinco años el abuelo se enfermó.' },
      { en: 'The young neighbor said the race was more expensive than before.', es: 'El vecino joven dijo que la carrera era más cara que antes.' },
      { en: 'Someone lost the banner after the last race.', es: 'Alguien perdió el estandarte después de la última carrera.' },
      { en: 'The race stopped.', es: 'La carrera se detuvo.' },
      { en: 'Now Elena wants to bring the tradition back.', es: 'Ahora Elena quiere recuperar la tradición.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Elena: "The story is complete. Now tell me: what do you think happened?"',
    es: 'La historia está completa. Ahora dime: ¿qué crees que pasó?',
    sub: 'Habla otra vez con Elena.',
    say: 'What do you think happened?',
  },
}

// Diálogo final con Elena: cada respuesta equivocada tiene su propia reacción y se puede reintentar
NPC_TASKS['a2-06-elena'] = {
  done: 'a2-06-elena-talk',
  requires: {
    id: 'a2-06-order',
    text: 'Elena: "Let\'s put the story in order first."',
    es: 'Primero pongamos la historia en orden.',
    sub: 'Habla con Elena.',
  },
  steps: [
    {
      text: 'You talked to my grandfather and the neighbor. What do you think happened?',
      es: 'Hablaste con mi abuelo y con el vecino. ¿Qué crees que pasó?',
      choice: {
        ask: '¿Qué le dices a Elena?',
        options: ['The race stopped because your grandfather became ill and someone lost the banner.', 'The neighbor says it was too expensive.', 'Your grandfather sold the horses.'],
        answer: 0,
        tip: 'Recuerda lo que contaron el abuelo y el vecino.',
        tips: [
          '',
          'Elena: "The neighbor thinks that, but the real problem was different. Try again." (El vecino piensa eso, pero el problema real fue otro. Inténtalo otra vez).',
          'Elena: "No, my grandfather never sold the horses. Listen again to what they said." (No, mi abuelo nunca vendió los caballos. Escucha otra vez lo que dijeron).',
        ],
      },
    },
    {
      text: 'Yes. That is what really happened. Thank you.',
      es: 'Sí. Eso es lo que pasó de verdad. Gracias.',
    },
  ],
  reward: {
    text: 'Elena: "Wait... look at the river! Something strange is there. Be careful!"',
    es: 'Espera... ¡mira el río! Ahí hay algo extraño. ¡Ten cuidado!',
    sub: 'Un eco apareció junto al río. Enfréntalo y luego vuelve con Elena.',
    say: 'Look at the river!',
  },
}

// Cierre: Elena entrega el trozo del estandarte (tras vencer al eco de la carrera; taskOf mira opened + defeated)
NPC_TASKS['a2-06-close'] = {
  npc: 'a2-06-elena',
  done: 'a2-06-close',
  requires: {
    id: 'a2-06-race-echo',
    text: 'Elena: "The echo is still by the river! Please, stop it first."',
    es: '¡El eco sigue junto al río! Por favor, detenlo primero.',
    sub: 'El eco de la carrera está junto al río.',
  },
  steps: [
    {
      text: 'Maybe one day we can have the race again. Take this old piece of the banner. It is not complete, but it is a start.',
      es: 'Quizá algún día podamos tener la carrera otra vez. Toma este trozo viejo del estandarte. No está completo, pero es un comienzo.',
    },
  ],
  reward: {
    text: 'Elena: "It is not complete, but it is a start."',
    es: 'No está completo, pero es un comienzo.',
    sub: 'A2-06 completada. Guardaste el trozo viejo del estandarte de la familia River.',
    say: 'It is a start.',
  },
}

// ── A2-07 — The Great Race (hipódromo del pasado; escena, Jack y el Master Jockey en data/a2Race.ts) ──
// Orden: Leo (lección superlatives-comparatives-race + práctica) → Jack the Rival (puerta de la pista)
//        → JoJo (DebateTalk: el desenlace cambia la posición de salida) → JoJo (la carrera: Sequence Master por tramos + desafíos)
//        → JoJo (Reconstruct the Story: ordenar) → The Master Jockey (en la meta) → Leo (cierre: fragmento) → Leo (despedida opcional con JoJo).
NPC_TASKS['a2-07-leo'] = {
  done: 'a2-07-practice',
  lesson: 'superlatives-comparatives-race',
  activity: 'practice',
  practice: 'superlatives-comparatives-race',
  practiceIds: ['a2-07-p1', 'a2-07-p2', 'a2-07-p3', 'a2-07-p4', 'a2-07-p5'],
  steps: [],
  reward: {
    text: 'Leo: "Let\'s go to the track. Someone there remembers an old accident."',
    es: 'Vamos a la pista. Alguien allí recuerda un viejo accidente.',
    sub: 'Un jinete rival bloquea la puerta de la pista. Véncelo y busca a JoJo junto a los establos.',
    say: "Let's go to the track.",
  },
}

// DebateTalk con JoJo (antes de la carrera): 4 turnos sin respuestas incorrectas.
// Mayoría buena → salida en mejor posición (a2-07-jojo-trust); mixto → posición media (a2-07-jojo-mixed); si no, la última.
NPC_TASKS['a2-07-debate'] = {
  npc: 'a2-07-jojo',
  done: 'a2-07-debate',
  activity: 'debate',
  requires: {
    id: 'a2-07-jack',
    text: 'JoJo: "Talk to Leo first."',
    es: 'Habla primero con Leo.',
    sub: 'Leo está en la tribuna.',
  },
  debate: {
    title: 'Talk to JoJo',
    ask: 'Escucha a JoJo y respóndele.',
    results: { high: 'a2-07-jojo-trust', mid: 'a2-07-jojo-mixed' },
    turns: [
      {
        text: 'Last year a cart crossed the track. My horse fell. I still hear the noise. What do you think happened?',
        es: 'El año pasado un carro cruzó la pista. Mi caballo se cayó. Todavía oigo el ruido. ¿Qué crees que pasó?',
        options: [
          { en: 'The cart was dangerous. You did your best.', es: 'El carro era peligroso. Hiciste lo mejor que pudiste.', value: 'good' },
          { en: 'Accidents happen in races.', es: 'Los accidentes pasan en las carreras.', value: 'neutral' },
          { en: 'You were too slow. It was your fault.', es: 'Fuiste demasiado lento. Fue tu culpa.', value: 'bad' },
        ],
      },
      {
        text: 'After the fall, the words felt wrong. ‘Faster’ didn’t sound right anymore. Do you feel that too?',
        es: 'Después de la caída, las palabras se sentían mal. "Faster" ya no sonaba bien. ¿Tú también lo sientes?',
        options: [
          { en: 'Yes. But we can make the words right again.', es: 'Sí. Pero podemos arreglar las palabras otra vez.', value: 'good' },
          { en: 'Maybe. Let’s just race.', es: 'Quizá. Solo corramos.', value: 'neutral' },
          { en: 'That’s not important. Just ride.', es: 'Eso no es importante. Solo monta.', value: 'bad' },
        ],
      },
      {
        text: 'Today the track still remembers the cart. Are you going to be careful?',
        es: 'Hoy la pista todavía recuerda el carro. ¿Vas a tener cuidado?',
        options: [
          { en: 'Yes. I’ll jump higher and ride carefully.', es: 'Sí. Saltaré más alto y montaré con cuidado.', value: 'good' },
          { en: 'I’ll try.', es: 'Lo intentaré.', value: 'neutral' },
          { en: 'I don’t care about the cart.', es: 'No me importa el carro.', value: 'bad' },
        ],
      },
      {
        text: 'If you finish well, maybe the word comes back. What will you do at the finish line?',
        es: 'Si terminas bien, quizá la palabra vuelve. ¿Qué harás en la meta?',
        options: [
          { en: 'I’ll speak clearly and help you.', es: 'Hablaré con claridad y te ayudaré.', value: 'good' },
          { en: 'I’ll just cross the line.', es: 'Solo cruzaré la línea.', value: 'neutral' },
          { en: 'I’ll win and leave.', es: 'Ganaré y me iré.', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'Thank you. I trust you. Ride well.', es: 'Gracias. Confío en ti. Monta bien. (Saldrás en mejor posición).' },
      mid: { text: 'Okay. Be careful out there.', es: 'Está bien. Ten cuidado allá afuera.' },
      low: { text: 'Fine. Do what you want.', es: 'Bien. Haz lo que quieras.' },
    },
  },
  steps: [],
  reward: {
    text: 'JoJo: "Ride well."',
    es: 'Monta bien.',
    sub: 'Habla otra vez con JoJo para empezar la carrera.',
    say: 'Ride well.',
  },
}

// La carrera: Sequence Master en 4 tramos + un desafío por tramo. La posición sube o baja según el acierto; siempre se llega a la meta.
NPC_TASKS['a2-07-race'] = {
  npc: 'a2-07-jojo',
  done: 'a2-07-race',
  activity: 'sequence',
  requires: {
    id: 'a2-07-debate',
    text: 'JoJo: "Talk to me before the race."',
    es: 'Habla conmigo antes de la carrera.',
    sub: 'JoJo está junto a los establos.',
  },
  sequence: {
    title: 'The Great Race',
    intro: { en: 'Ride well. Put each part of the race in order.', es: 'Monta bien. Ordena cada parte de la carrera.' },
    hint: 'Piensa qué pasa primero en este tramo.',
    steps: [],
    race: {
      runners: 5,
      start: 4,
      startBy: [
        { flag: 'a2-07-jojo-trust', position: 2 },
        { flag: 'a2-07-jojo-mixed', position: 3 },
      ],
      legs: [
        {
          title: 'Salida',
          steps: [
            { en: 'Get ready', es: 'Prepárate' },
            { en: 'Leave the gate', es: 'Sal del cajón de salida' },
            { en: 'Ride faster', es: 'Monta más rápido' },
          ],
          challenge: { q: 'Look! Your horse ___ faster now.', es: '¡Mira! Tu caballo está corriendo más rápido ahora.', options: ['is running', 'are running', 'running'], answer: 0, tip: 'Un caballo: is + verbo con -ing.' },
        },
        {
          title: 'Primer salto',
          steps: [
            { en: 'See the jump', es: 'Mira el salto' },
            { en: 'Jump higher', es: 'Salta más alto' },
            { en: 'Land safely', es: 'Aterriza con seguridad' },
          ],
          challenge: { q: 'This jump is ___ than the first one.', es: 'Este salto es más alto que el primero.', options: ['higher', 'more high', 'highest'], answer: 0, tip: 'Adjetivo corto: high → higher than.' },
        },
        {
          title: 'El carro',
          steps: [
            { en: 'See the cart', es: 'Mira el carro' },
            { en: 'Jump higher over the cart', es: 'Salta más alto por encima del carro' },
            { en: 'Keep going', es: 'Sigue adelante' },
          ],
          challenge: { q: 'This is ___ part of the track.', es: 'Esta es la parte más peligrosa de la pista.', options: ['the most dangerous', 'the more dangerous', 'most dangerous'], answer: 0, tip: 'Superlativo de adjetivo largo: the most dangerous.' },
        },
        {
          title: 'Meta',
          steps: [
            { en: 'Ride faster', es: 'Monta más rápido' },
            { en: 'Cross the finish line', es: 'Cruza la meta' },
            { en: 'Celebrate', es: 'Celebra' },
          ],
          challenge: { q: 'You are ___ rider today!', es: '¡Eres el jinete más rápido hoy!', options: ['the fastest', 'the faster', 'fastest'], answer: 0, tip: 'El más rápido de todos: the fastest.' },
        },
      ],
    },
  },
  steps: [],
  reward: {
    text: 'JoJo: "You finished the race!"',
    es: '¡Terminaste la carrera!',
    sub: 'Habla otra vez con JoJo: reconstruyan juntos lo que pasó.',
    say: 'You finished the race!',
  },
}

// Reconstruct the Story (después de la carrera): ordenar los fragmentos (mismo formato que el orden de A2-06)
NPC_TASKS['a2-07-story'] = {
  npc: 'a2-07-jojo',
  done: 'a2-07-story',
  activity: 'sequence',
  requires: {
    id: 'a2-07-race',
    text: 'JoJo: "The race is starting. Talk to me."',
    es: 'La carrera va a empezar. Habla conmigo.',
    sub: 'JoJo está junto a los establos.',
  },
  sequence: {
    title: 'Reconstruct the Story',
    hint: 'Piensa en el tiempo: last year → after that → today.',
    intro: { en: 'Put the story in order, from last year to today.', es: 'Ordena la historia, del año pasado a hoy.' },
    steps: [
      { en: 'A cart crossed the track last year.', es: 'Un carro cruzó la pista el año pasado.' },
      { en: 'JoJo’s horse fell.', es: 'El caballo de JoJo se cayó.' },
      { en: 'The words felt wrong after that.', es: 'Después de eso, las palabras se sentían mal.' },
      { en: 'Today you saw the cart again.', es: 'Hoy viste el carro otra vez.' },
      { en: 'You jumped higher over the cart.', es: 'Saltaste más alto por encima del carro.' },
      { en: 'You finished the race.', es: 'Terminaste la carrera.' },
      { en: 'The word “fastest” feels almost right again.', es: 'La palabra "fastest" se siente casi bien otra vez.' },
    ],
  },
  steps: [],
  reward: {
    text: 'JoJo: "Yes. That’s what happened. The cart is gone now, and the word is almost back. Thank you."',
    es: 'Sí. Eso es lo que pasó. El carro ya no está, y la palabra casi volvió. Gracias.',
    sub: 'Alguien te espera en la meta: The Master Jockey.',
    say: 'The cart is gone now, and the word is almost back.',
  },
}

// Cierre: Leo (y JoJo) tras vencer al Master Jockey (taskOf mira opened + defeated)
NPC_TASKS['a2-07-close'] = {
  npc: 'a2-07-leo',
  done: 'a2-07-close',
  requires: {
    id: 'a2-07-master-jockey',
    text: 'Leo: "The race isn’t over. Talk to JoJo."',
    es: 'La carrera no ha terminado. Habla con JoJo.',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  steps: [
    { text: 'You rode well and you spoke well. The fragment is yours.', es: 'Montaste bien y hablaste bien. El fragmento es tuyo.' },
    { text: 'JoJo: "The cart crossed the track and the word disappeared. Now you have it back."', es: 'JoJo: "El carro cruzó la pista y la palabra desapareció. Ahora la recuperaste."' },
    { text: 'Yes. And now we have one more fragment for the clock. The core is still empty… but we are getting closer.', es: 'Sí. Y ahora tenemos un fragmento más para el reloj. El núcleo todavía está vacío… pero nos estamos acercando.' },
  ],
  reward: {
    text: 'Leo: "We are getting closer."',
    es: 'Nos estamos acercando.',
    sub: 'A2-07 completada. Recuperaste un fragmento de la voz del ganador. (Opcional: habla otra vez con Leo para despedirte de JoJo).',
    say: 'We are getting closer.',
  },
}

// Despedida opcional (DebateTalk corto, 1 turno): no cuenta para cerrar la unidad
NPC_TASKS['a2-07-farewell'] = {
  npc: 'a2-07-leo',
  done: 'a2-07-farewell',
  activity: 'debate',
  requires: {
    id: 'a2-07-close',
    text: 'Leo: "The race isn’t over. Talk to JoJo."',
    es: 'La carrera no ha terminado. Habla con JoJo.',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  debate: {
    title: 'Talk to JoJo',
    ask: 'Elige qué le dices a JoJo.',
    turns: [
      {
        text: 'You have the fragment. What do you say to JoJo?',
        es: 'Tienes el fragmento. ¿Qué le dices a JoJo?',
        options: [
          { en: 'The cart is gone. The word is yours again.', es: 'El carro ya no está. La palabra es tuya otra vez.', value: 'good', reply: { text: 'JoJo: "Thank you. Now I can ride without fear."', es: 'JoJo: "Gracias. Ahora puedo montar sin miedo."' } },
          { en: 'We finished the race.', es: 'Terminamos la carrera.', value: 'neutral', reply: { text: 'JoJo: "Yes. We finished."', es: 'JoJo: "Sí. Terminamos."' } },
          { en: 'I won. That’s all.', es: 'Gané. Eso es todo.', value: 'bad', reply: { text: 'JoJo: "Okay… goodbye."', es: 'JoJo: "Está bien… adiós."' } },
        ],
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "We are getting closer."',
    es: 'Nos estamos acercando.',
    sub: 'Te despediste de JoJo.',
    say: 'We are getting closer.',
  },
}

// ── A2-08 — El Carro que se Detuvo (camino del pasado; escena, esbirro y jefe en data/a2Car.ts) ──
// Canon: manejaba el jugador; JoJo se bajó y revisó las ruedas; Leo revisa el motor. "cart" (carrera) ≠ "car" (hoy).
// Orden: Leo (lección past-simple-continuous + práctica) → Eco de la carretera → JoJo (DebateTalk)
//        → Leo (Reconstruct the Story) → Leo (ordenar la historia) → El Motor Silencioso → Leo (cierre).
NPC_TASKS['a2-08-leo'] = {
  done: 'a2-08-practice',
  lesson: 'past-simple-continuous',
  activity: 'practice',
  practice: 'past-simple-continuous',
  practiceIds: ['a2-08-p1', 'a2-08-p2', 'a2-08-p3', 'a2-08-p4', 'a2-08-p5', 'a2-08-p6', 'a2-08-p7'],
  steps: [],
  reward: {
    text: 'Leo: "Something is moving on the road. Be careful."',
    es: 'Algo se mueve en el camino. Ten cuidado.',
    sub: 'Un eco bloquea el camino. Véncelo y habla con JoJo junto al carro.',
    say: 'Something is moving on the road.',
  },
}

// DebateTalk con JoJo: 4 turnos sin respuestas incorrectas. No bloquea; el buen desenlace da una pista.
NPC_TASKS['a2-08-debate'] = {
  npc: 'a2-08-jojo',
  done: 'a2-08-debate',
  activity: 'debate',
  requires: {
    id: 'a2-08-road-echo',
    text: 'JoJo: "I got out to check the wheels… but something is on the road. Careful!"',
    es: 'Me bajé a revisar las ruedas… pero algo hay en el camino. ¡Cuidado!',
    sub: 'Habla primero con Leo y vence al eco del camino.',
  },
  debate: {
    title: 'Talk to JoJo',
    ask: 'Escucha a JoJo y respóndele.',
    turns: [
      {
        text: 'Last year a cart crossed the track during the race. Today your car stopped, and the same purple light appeared. Is it the same light?',
        es: 'El año pasado una carreta cruzó la pista durante la carrera. Hoy tu carro se detuvo y apareció la misma luz morada. ¿Es la misma luz?',
        options: [
          { en: 'Yes. The purple light was the same.', es: 'Sí. La luz morada era la misma.', value: 'good' },
          { en: 'Maybe. We should check more.', es: 'Quizá. Deberíamos revisar más.', value: 'neutral' },
          { en: 'I don’t know. The car just stopped.', es: 'No sé. El carro simplemente se detuvo.', value: 'bad' },
        ],
      },
      {
        text: 'I was watching the race when the cart appeared. What were you doing when the car stopped today?',
        es: 'Yo estaba viendo la carrera cuando apareció la carreta. ¿Qué estabas haciendo tú cuando el carro se detuvo hoy?',
        options: [
          { en: 'I was driving when the car stopped.', es: 'Estaba manejando cuando el carro se detuvo.', value: 'good' },
          { en: 'We were on the road.', es: 'Estábamos en el camino.', value: 'neutral' },
          { en: 'I was drive and the car stop.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'People at the race said the light took something from the cart. Do you believe it?',
        es: 'En la carrera la gente dijo que la luz le quitó algo a la carreta. ¿Lo crees?',
        options: [
          { en: 'Yes. The light took something. We have to be careful.', es: 'Sí. La luz se llevó algo. Tenemos que tener cuidado.', value: 'good' },
          { en: 'I’m not sure. Let’s see the evidence.', es: 'No estoy seguro. Veamos las pruebas.', value: 'neutral' },
          { en: 'No. It was just an old cart.', es: 'No. Era solo una carreta vieja.', value: 'bad' },
        ],
      },
      {
        text: 'We should tell Leo what we saw. Are you ready?',
        es: 'Deberíamos contarle a Leo lo que vimos. ¿Estás listo?',
        options: [
          { en: 'Yes. Let’s reconstruct what happened.', es: 'Sí. Reconstruyamos lo que pasó.', value: 'good' },
          { en: 'OK, let’s go.', es: 'Vale, vamos.', value: 'neutral' },
          { en: 'Later. I’m tired.', es: 'Después. Estoy cansado.', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'One more thing: the light appeared near the wheels while the engine was making noise. Tell Leo.', es: 'Una cosa más: la luz apareció cerca de las ruedas mientras el motor hacía ruido. Díselo a Leo.' },
      mid: { text: 'OK. Talk to Leo.', es: 'Vale. Habla con Leo.' },
      low: { text: '… OK. If you say so. Talk to Leo.', es: '… Vale. Si tú lo dices. Habla con Leo.' },
    },
  },
  steps: [],
  reward: {
    text: 'JoJo: "Talk to Leo."',
    es: 'Habla con Leo.',
    sub: 'Leo quiere reconstruir lo que pasó.',
    say: 'Talk to Leo.',
  },
}

// Reconstruct the Story (1/2): contrastar lo que se recuerda con las versiones corrompidas del eco
NPC_TASKS['a2-08-reconstruct'] = {
  npc: 'a2-08-leo',
  done: 'a2-08-reconstruct',
  activity: 'reconstruct',
  requires: {
    id: 'a2-08-debate',
    text: 'Leo: "Talk to JoJo first. He was near the wheels."',
    es: 'Habla primero con JoJo. Él estaba cerca de las ruedas.',
    sub: 'JoJo está junto al carro.',
  },
  reconstruct: {
    title: 'Reconstruct the Story',
    intro: { en: 'The echo told a false story. Compare each part with what you remember and choose what really happened.', es: 'El eco contó una historia falsa. Compara cada parte con lo que recuerdas y elige lo que pasó de verdad.' },
    items: [
      {
        source: 'You',
        clue: { en: 'I was driving. Nobody else was driving.', es: 'Yo estaba manejando. Nadie más manejaba.' },
        claim: { en: 'JoJo was driving when the car stopped.', es: 'JoJo estaba manejando cuando el carro se detuvo.' },
        options: ['I was driving when the car stopped.', 'JoJo was driving when the car stopped.', 'I was drive when the car stopped.'],
        answer: 0,
        tip: 'Manejabas tú: I was driving (was + -ing).',
      },
      {
        source: 'Leo',
        clue: { en: 'The engine was making a strange noise.', es: 'El motor estaba haciendo un ruido extraño.' },
        claim: { en: 'The engine was silent all the time.', es: 'El motor estuvo en silencio todo el tiempo.' },
        options: ['The engine was making a strange noise.', 'The engine was silent all the time.', 'The engine was make a strange noise.'],
        answer: 0,
        tip: 'Hacía ruido: was making (make → making).',
      },
      {
        source: 'JoJo',
        clue: { en: 'I got out and checked the wheels.', es: 'Me bajé y revisé las ruedas.' },
        claim: { en: 'JoJo stayed in the car.', es: 'JoJo se quedó en el carro.' },
        options: ['JoJo got out and checked the wheels.', 'JoJo stayed in the car.', 'JoJo get out and checked the wheels.'],
        answer: 0,
        tip: 'Se bajó: get → got (irregular).',
      },
      {
        source: 'JoJo',
        clue: { en: 'The light was near the wheels, not in the sky.', es: 'La luz estaba cerca de las ruedas, no en el cielo.' },
        claim: { en: 'We saw a purple light in the sky.', es: 'Vimos una luz morada en el cielo.' },
        options: ['We saw a purple light near the wheels.', 'We saw a purple light in the sky.', 'We seed a purple light near the wheels.'],
        answer: 0,
        tip: 'Cerca de las ruedas: see → saw.',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "Good. Now we know what really happened. But in what order?"',
    es: 'Bien. Ya sabemos lo que pasó de verdad. Pero ¿en qué orden?',
    sub: 'Habla otra vez con Leo para ordenar la historia.',
    say: 'But in what order?',
  },
}

// Reconstruct the Story (2/2): Sequence Master con los eventos verdaderos
NPC_TASKS['a2-08-story'] = {
  npc: 'a2-08-leo',
  done: 'a2-08-story',
  activity: 'sequence',
  requires: {
    id: 'a2-08-reconstruct',
    text: 'Leo: "First, let\'s find what really happened. Talk to me."',
    es: 'Primero, encontremos lo que pasó de verdad. Habla conmigo.',
    sub: 'Leo está en el camino.',
  },
  sequence: {
    title: 'Reconstruct the Story',
    hint: 'Piensa qué estaba pasando y qué lo interrumpió.',
    intro: { en: 'Put the events in order.', es: 'Ordena los eventos.' },
    steps: [
      { en: 'I was driving on the road.', es: 'Yo estaba manejando por el camino.' },
      { en: 'The engine was making a strange noise.', es: 'El motor estaba haciendo un ruido extraño.' },
      { en: 'Suddenly, the car stopped.', es: 'De repente, el carro se detuvo.' },
      { en: 'JoJo got out and checked the wheels.', es: 'JoJo se bajó y revisó las ruedas.' },
      { en: 'We saw a small purple light near the wheels.', es: 'Vimos una pequeña luz morada cerca de las ruedas.' },
      { en: 'Then the noise stopped and everything was quiet.', es: 'Luego el ruido se detuvo y todo quedó en silencio.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The story is clear. But the engine is still… listening."',
    es: 'La historia está clara. Pero el motor sigue… escuchando.',
    sub: 'Algo despertó junto al carro: El Motor Silencioso.',
    say: 'The story is clear.',
  },
}

// Cierre con Leo tras vencer al Motor Silencioso (el fragmento ya lo entregó el jefe)
NPC_TASKS['a2-08-close'] = {
  npc: 'a2-08-leo',
  done: 'a2-08-close',
  requires: {
    id: 'a2-08-silent-engine',
    text: 'Leo: "The engine is still listening. Go to the car."',
    es: 'El motor sigue escuchando. Ve al carro.',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  steps: [
    { text: 'Good. The car stopped, but we understood what happened.', es: 'Bien. El carro se detuvo, pero entendimos qué pasó.' },
    { text: 'You used the Past Simple for finished actions, and the Past Continuous for what was happening.', es: 'Usaste el pasado simple para las acciones terminadas y el pasado continuo para lo que estaba pasando.' },
    { text: 'You have the fragment. The clock is still incomplete… but one more piece of your voice is back.', es: 'Tienes el fragmento. El reloj sigue incompleto… pero un pedazo más de tu voz volvió.' },
    { text: 'JoJo: "It was the same light from the race. I am sure."', es: 'JoJo: "Era la misma luz de la carrera. Estoy seguro."' },
  ],
  reward: {
    text: 'Leo: "We should keep going."',
    es: 'Debemos seguir.',
    sub: 'A2-08 completada. Recuperaste otro fragmento. La luz morada sigue apareciendo.',
    say: 'We should keep going.',
  },
}

// ── A2-09 — The Silent Mill (molino de la granja River en el pasado; escena, esbirro, eco y jefe en data/a2Mill.ts) ──
// Orden: Leo (lección recipes-some-any + práctica) → el aprendiz corrompido → Mr. Bell (charla)
//        → Leo (Detective: Reconstruct sobre el carro) → Mr. Bell (Wake the Mill) → La rueda rota → Leo (cierre).
//        Opcionales: receta de pan de Mr. Bell (Sequence Master, escudo) · Eco del molino.
NPC_TASKS['a2-09-leo'] = {
  done: 'a2-09-practice',
  lesson: 'recipes-some-any',
  activity: 'practice',
  practice: 'recipes-some-any',
  practiceIds: ['a2-09-p1', 'a2-09-p2', 'a2-09-p3', 'a2-09-p4', 'a2-09-p5', 'a2-09-p6', 'a2-09-p7'],
  steps: [],
  reward: {
    text: 'Leo: "Someone is in the field. Be careful."',
    es: 'Hay alguien en el campo. Ten cuidado.',
    sub: 'Un aprendiz corrompido bloquea el campo. Véncelo y habla con el molinero junto a la rueda.',
    say: 'Someone is in the field.',
  },
}

// Charla con el molinero (some/any): presenta el problema y abre el eco opcional
NPC_TASKS['a2-09-miller-talk'] = {
  npc: 'a2-09-miller',
  done: 'a2-09-miller-talk',
  requires: {
    id: 'a2-09-apprentice',
    text: 'Mr. Bell: "My apprentice is not himself. Please, help him first."',
    es: 'Mi aprendiz no es él mismo. Por favor, ayúdalo primero.',
    sub: 'Habla primero con Leo y vence al aprendiz corrompido.',
  },
  steps: [
    { text: 'Welcome to the River mill. I am Mr. Bell, the miller.', es: 'Bienvenido al molino de los River. Soy el señor Bell, el molinero.' },
    {
      text: 'This mill makes flour for the whole valley. But one night the wheel stopped. Now my sacks are empty.',
      es: 'Este molino hace harina para todo el valle. Pero una noche la rueda se detuvo. Ahora mis sacos están vacíos.',
      choice: { ask: 'What can you say about the sacks?', options: ["There isn't any flour in the sacks.", "There isn't some flour in the sacks.", "There aren't any flour in the sacks."], answer: 0, tip: "Negativo: isn't any (flour no se cuenta)." },
    },
    {
      text: 'And that night, something strange happened outside. My apprentice heard wheels on the stones.',
      es: 'Y esa noche pasó algo extraño afuera. Mi aprendiz oyó ruedas sobre las piedras.',
      choice: { ask: 'Ask Mr. Bell a question.', options: ['Were there any people outside?', 'Were there some people outside?', 'Was there any people outside?'], answer: 0, tip: 'Pregunta: any · people es plural: Were there…?' },
    },
    { text: "I don't know. Talk to your friend Leo. Then come back: we need to wake the mill.", es: 'No lo sé. Habla con tu amigo Leo. Luego vuelve: tenemos que despertar el molino.' },
  ],
  reward: {
    text: 'Mr. Bell: "Talk to Leo. Then come back."',
    es: 'Habla con Leo. Luego vuelve.',
    sub: 'Leo quiere averiguar qué pasó esa noche. Hay un eco en el corral viejo (opcional).',
    say: 'Talk to Leo. Then come back.',
  },
}

// Detective: contrastar testimonios sobre esa noche (no explica por qué se detuvo el carro: eso queda para A2-10)
NPC_TASKS['a2-09-detective'] = {
  npc: 'a2-09-leo',
  done: 'a2-09-detective',
  activity: 'reconstruct',
  requires: {
    id: 'a2-09-miller-talk',
    text: 'Leo: "Talk to the miller first. He is near the wheel."',
    es: 'Habla primero con el molinero. Está cerca de la rueda.',
    sub: 'El molinero está junto a la rueda.',
  },
  reconstruct: {
    title: 'Detective: That Night',
    intro: { en: 'The corrupted words changed the story of that night. Compare each clue and choose what really happened.', es: 'Las palabras corrompidas cambiaron la historia de esa noche. Compara cada pista y elige lo que pasó de verdad.' },
    items: [
      {
        source: 'Sam',
        clue: { en: 'I was sleeping when I heard the wheels of a cart on the stones.', es: 'Estaba durmiendo cuando oí las ruedas de un carro sobre las piedras.' },
        claim: { en: 'Nobody came to the mill that night.', es: 'Nadie vino al molino esa noche.' },
        options: ['A cart came to the mill that night.', 'Nobody came to the mill that night.', 'A cart come to the mill that night.'],
        answer: 0,
        tip: 'Sam oyó ruedas: llegó un carro (come → came).',
      },
      {
        source: 'Mr. Bell',
        clue: { en: "I closed the mill early. There wasn't any flour left.", es: 'Cerré el molino temprano. No quedaba harina.' },
        claim: { en: 'There was a lot of flour in the mill that night.', es: 'Había mucha harina en el molino esa noche.' },
        options: ["There wasn't any flour in the mill that night.", 'There was a lot of flour in the mill that night.', "There wasn't some flour in the mill that night."],
        answer: 0,
        tip: "Negativo: wasn't any.",
      },
      {
        source: 'Old note',
        clue: { en: 'Race day. Sold: three sacks of flour. Paid: twelve coins.', es: 'Día de la carrera. Vendidos: tres sacos de harina. Pagado: doce monedas.' },
        claim: { en: "The miller didn't sell any flour that week.", es: 'El molinero no vendió harina esa semana.' },
        options: ['The miller sold some flour on race day.', "The miller didn't sell any flour that week.", 'The miller sold any flour on race day.'],
        answer: 0,
        tip: 'La nota dice que vendió tres sacos: sold some flour (afirmativo: some).',
      },
      {
        source: 'The cart',
        clue: { en: 'The wheels of the old cart are white with flour.', es: 'Las ruedas de la carreta vieja están blancas de harina.' },
        claim: { en: 'The cart was never near the mill.', es: 'La carreta nunca estuvo cerca del molino.' },
        options: ['The cart was near the mill.', 'The cart was never near the mill.', 'The cart were near the mill.'],
        answer: 0,
        tip: 'Harina en las ruedas: estuvo cerca del molino (the cart → was).',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "A cart came here that night. But why? First, let\'s wake the mill."',
    es: 'Un carro vino aquí esa noche. Pero ¿por qué? Primero, despertemos el molino.',
    sub: 'Habla con Mr. Bell para despertar el molino.',
    say: 'A cart came here that night.',
  },
}

// Wake the Mill (Command Puzzle): el jugador da las órdenes. Al terminarlo aparece el jefe. Con 0-1 errores, escudo.
NPC_TASKS['a2-09-wake'] = {
  npc: 'a2-09-miller',
  done: 'a2-09-wake',
  activity: 'command',
  requires: {
    id: 'a2-09-detective',
    text: 'Mr. Bell: "Talk to Leo first. Then we can wake the mill."',
    es: 'Habla primero con Leo. Luego podemos despertar el molino.',
    sub: 'Leo está en el campo.',
  },
  command: {
    title: 'Wake the Mill',
    intro: { en: 'Tell me what to do. Choose a verb, then touch the thing.', es: 'Dime qué hacer. Elige un verbo y luego toca la cosa.' },
    verbs: ['lift', 'push', 'pull', 'open', 'close', 'turn', 'touch'],
    objects: [
      { id: 'stone', en: 'stone', es: 'piedra' },
      { id: 'gate', en: 'gate', es: 'compuerta' },
      { id: 'wheel', en: 'wheel', es: 'rueda' },
      { id: 'millstones', en: 'millstones', es: 'piedras de moler' },
      { id: 'rope', en: 'rope', es: 'cuerda' },
    ],
    steps: [
      { problem: { en: 'A stone is stuck in the gate.', es: 'Una piedra está atascada en la compuerta.' }, verb: 'lift', object: 'stone', done: { en: 'The stone is out!', es: '¡La piedra salió!' }, tip: 'La piedra está atascada: hay que levantarla (lift).', fails: { push: { en: 'You push the stone, but it goes deeper into the gate.', es: 'Empujas la piedra, pero se mete más en la compuerta.' } } },
      { problem: { en: "The gate is closed. The water can't pass.", es: 'La compuerta está cerrada. El agua no puede pasar.' }, verb: 'open', object: 'gate', done: { en: 'The water is coming!', es: '¡Viene el agua!' }, tip: 'Lo contrario de closed: open.' },
      { problem: { en: 'The water is here, but the wheel is stuck.', es: 'El agua ya llegó, pero la rueda está atascada.' }, verb: 'turn', object: 'wheel', done: { en: 'The wheel is turning!', es: '¡La rueda está girando!' }, tip: 'Una rueda se gira: turn.' },
      { problem: { en: 'The millstones are moving! Mr. Bell puts his hand near them. Warn him!', es: '¡Las piedras de moler se mueven! El señor Bell acerca la mano. ¡Avísale!' }, verb: 'touch', negative: true, object: 'millstones', done: { en: 'Thank you! That was dangerous.', es: '¡Gracias! Eso era peligroso.' }, tip: "Es una advertencia: usa DON'T + touch.", fails: { touch: { en: "No! Never say 'touch' here. It's dangerous!", es: '¡No! Aquí nunca digas "toca". ¡Es peligroso!' } } },
      { problem: { en: 'The mill is working! Tell everyone with the bell.', es: '¡El molino funciona! Avísales a todos con la campana.' }, verb: 'pull', object: 'rope', done: { en: 'Ding, ding! The mill is awake!', es: '¡Din, don! ¡El molino despertó!' }, tip: 'La cuerda de la campana se jala: pull.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Mr. Bell: "The mill is awake… but the wheel looks angry!"',
    es: 'El molino despertó… ¡pero la rueda parece enojada!',
    sub: 'La rueda rota despertó junto al molino. Opcional: Mr. Bell también te enseña su receta de pan.',
    say: 'The mill is awake!',
  },
}

// Opcional: receta de pan del molinero (Sequence Master en imperativo). No bloquea; da un escudo.
NPC_TASKS['a2-09-recipe'] = {
  npc: 'a2-09-miller',
  done: 'a2-09-recipe',
  activity: 'sequence',
  shield: true,
  requires: {
    id: 'a2-09-wake',
    text: 'Mr. Bell: "First, let\'s wake the mill."',
    es: 'Primero, despertemos el molino.',
    sub: 'El molinero está junto a la rueda.',
  },
  sequence: {
    title: 'My Bread Recipe',
    hint: 'Piensa qué se hace primero en la cocina: los ingredientes, la masa, la espera y el horno.',
    intro: { en: 'Put the recipe in order.', es: 'Ordena la receta.' },
    steps: [
      { en: 'First, put some flour, water and salt in a big bowl.', es: 'Primero, pon harina, agua y sal en un tazón grande.' },
      { en: 'Then, mix everything and make the dough.', es: 'Luego, mezcla todo y haz la masa.' },
      { en: 'After that, wait for one hour.', es: 'Después, espera una hora.' },
      { en: 'Finally, bake the bread for forty minutes.', es: 'Por último, hornea el pan durante cuarenta minutos.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Mr. Bell: "Good! Now there is some bread for everybody."',
    es: '¡Bien! Ahora hay pan para todos.',
    sub: 'Mr. Bell te da un escudo de palabras: bloquea un error en combate.',
    say: 'Now there is some bread for everybody.',
  },
}

// Cierre con Leo tras vencer a la rueda rota (el fragmento ya lo entregó el jefe). Toca el carro sin explicarlo (A2-10).
NPC_TASKS['a2-09-close'] = {
  npc: 'a2-09-leo',
  done: 'a2-09-close',
  requires: {
    id: 'a2-09-broken-wheel',
    text: 'Leo: "The wheel is still angry. Go to the mill."',
    es: 'La rueda sigue enojada. Ve al molino.',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  steps: [
    { text: 'Listen. The wheel is turning again. The mill is not silent anymore.', es: 'Escucha. La rueda gira otra vez. El molino ya no está en silencio.' },
    { text: 'You gave instructions, you used some and any, and you asked about prices.', es: 'Diste instrucciones, usaste some y any, y preguntaste precios.' },
    { text: 'You have another fragment. And now we know something: the cart stopped by this mill that night.', es: 'Tienes otro fragmento. Y ahora sabemos algo: el carro se detuvo junto a este molino esa noche.' },
    { text: 'But why did it stop here? We need to find out.', es: 'Pero ¿por qué se detuvo aquí? Tenemos que averiguarlo.' },
  ],
  reward: {
    text: 'Leo: "We need to find out."',
    es: 'Tenemos que averiguarlo.',
    sub: 'A2-09 completada. Recuperaste otro fragmento. El carro se detuvo junto al molino… pero ¿por qué?',
    say: 'We need to find out.',
  },
}

// ── A2-10 — Echoes Across Time (casa de Leo, presente; escena, esbirro y jefe en data/a2LeoHouse.ts) ──
// Canon aprobado (A + C): la luz detiene lo que toca; el fragmento siguió en la carga de la carreta; la carreta pasó a la
// colección de la ciudad y en 2056 está en el museo del transporte. Sin fragmento en esta misión.
// Orden: Leo abajo (lección present-perfect + práctica) → Eco del ático → Leo arriba (The Memory Chest)
//        → Leo (Detective: el tablero) → Leo (el periódico) → persona especial (reunión) → El devorador de recuerdos → Leo (cierre).
NPC_TASKS['a2-10-leo'] = {
  done: 'a2-10-practice',
  lesson: 'present-perfect',
  activity: 'practice',
  practice: 'present-perfect',
  practiceIds: ['a2-10-p1', 'a2-10-p2', 'a2-10-p3', 'a2-10-p4', 'a2-10-p5', 'a2-10-p6', 'a2-10-p7'],
  steps: [],
  reward: {
    text: 'Leo: "I\'ll go up first. Wait… something is on the stairs!"',
    es: 'Yo subo primero. Espera… ¡hay algo en la escalera!',
    sub: 'Un eco bloquea la escalera del ático. Véncelo y sube con Leo.',
    say: 'Something is on the stairs!',
  },
}

// The Memory Chest: emparejar verbo y participio para abrir los seis candados del baúl de pistas
NPC_TASKS['a2-10-chest'] = {
  npc: 'a2-10-leo-up',
  done: 'a2-10-chest',
  activity: 'memory',
  requires: {
    id: 'a2-10-attic-echo',
    text: 'Leo: "Come up! But be careful on the stairs."',
    es: '¡Sube! Pero ten cuidado en la escalera.',
    sub: 'Vence al eco que bloquea la escalera.',
  },
  memory: {
    title: 'Six Locks',
    intro: { en: 'Our clues are in this chest, but the light has closed it with six locks. Match each verb with its participle.', es: 'Nuestras pistas están en este baúl, pero la luz lo cerró con seis candados. Une cada verbo con su participio.' },
    pairs: [
      { a: 'go', b: 'gone', example: { en: 'We have gone back to the past three times.', es: 'Hemos vuelto al pasado tres veces.' } },
      { a: 'see', b: 'seen', example: { en: 'We have seen the purple light again and again.', es: 'Hemos visto la luz morada una y otra vez.' } },
      { a: 'find', b: 'found', example: { en: 'I have found an old newspaper in the library.', es: 'He encontrado un periódico viejo en la biblioteca.' } },
      { a: 'take', b: 'taken', example: { en: 'The light has taken words from many people.', es: 'La luz les ha quitado palabras a muchas personas.' } },
      { a: 'be', b: 'been', example: { en: 'Leo has been my friend for a long time.', es: 'Leo ha sido mi amigo por mucho tiempo.' } },
      { a: 'write', b: 'written', example: { en: 'I have written every clue on the board.', es: 'He escrito cada pista en el tablero.' } },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "It\'s open! Look: the piece of the River banner, a horseshoe, flour from the cart… and my old newspaper."',
    es: '¡Está abierto! Mira: el trozo del estandarte de los River, una herradura, harina de la carreta… y mi periódico viejo.',
    sub: 'Habla otra vez con Leo para armar el tablero de pistas.',
    say: "It's open!",
  },
}

// Detective: el tablero. Descubrir el patrón: la luz detiene lo que toca
NPC_TASKS['a2-10-detective'] = {
  npc: 'a2-10-leo-up',
  done: 'a2-10-detective',
  activity: 'reconstruct',
  requires: {
    id: 'a2-10-chest',
    text: 'Leo: "First, let\'s open the chest."',
    es: 'Primero, abramos el baúl.',
    sub: 'El baúl está en el ático.',
  },
  reconstruct: {
    title: 'Detective: The Clue Board',
    intro: { en: 'The corrupted words have changed our memories. Compare each clue and choose what is true now.', es: 'Las palabras corrompidas han cambiado nuestros recuerdos. Compara cada pista y elige lo que es verdad ahora.' },
    items: [
      {
        source: 'The race',
        clue: { en: 'The cart stopped on the track when the purple light touched it.', es: 'La carreta se detuvo en la pista cuando la luz morada la tocó.' },
        claim: { en: 'The light has never touched anything.', es: 'La luz nunca ha tocado nada.' },
        options: ['The light has touched the cart.', 'The light has touch the cart.', 'The light have touched the cart.'],
        answer: 0,
        tip: 'the light (it) + has + participio: touched.',
      },
      {
        source: 'The road',
        clue: { en: 'Our car stopped on the road. The engine was silent.', es: 'Nuestro carro se detuvo en el camino. El motor estaba en silencio.' },
        claim: { en: 'Our car has never stopped.', es: 'Nuestro carro nunca se ha detenido.' },
        options: ['Our car has stopped too.', 'Our car has stop too.', 'Our car have stopped too.'],
        answer: 0,
        tip: 'our car (it) + has + stopped.',
      },
      {
        source: 'The mill',
        clue: { en: 'The mill wheel stopped. There was purple light between the stones.', es: 'La rueda del molino se detuvo. Había luz morada entre las piedras.' },
        claim: { en: 'The mill wheel has worked every night.', es: 'La rueda del molino ha funcionado todas las noches.' },
        options: ['The mill wheel has stopped too.', 'The mill wheel has stoped too.', 'The mill wheel stopped has too.'],
        answer: 0,
        tip: 'stop → stopped (doble p).',
      },
      {
        source: 'Leo',
        clue: { en: 'A cart, a car and a wheel… the light touched all of them, and all of them stopped.', es: 'Una carreta, un carro y una rueda… la luz los tocó a todos, y todos se detuvieron.' },
        claim: { en: 'The light has made everything faster.', es: 'La luz ha hecho todo más rápido.' },
        options: ['The light has stopped everything it touched.', 'The light has stop everything it touched.', 'The light stopped has everything it touched.'],
        answer: 0,
        tip: 'has + stopped: el patrón de todas las pistas.',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "That\'s it! The light stops what it touches. And the cart carried something with that light… Now, look at this newspaper."',
    es: '¡Eso es! La luz detiene lo que toca. Y la carreta llevaba algo con esa luz… Ahora, mira este periódico.',
    sub: 'Habla otra vez con Leo para leer el periódico viejo.',
    say: 'The light stops what it touches.',
  },
}

// El periódico viejo (lectura con preguntas, Present Perfect vs Past Simple): la carreta pasó a la colección de la ciudad
NPC_TASKS['a2-10-news'] = {
  npc: 'a2-10-leo-up',
  done: 'a2-10-news',
  requires: {
    id: 'a2-10-detective',
    text: 'Leo: "First, let\'s finish the clue board."',
    es: 'Primero, terminemos el tablero de pistas.',
    sub: 'Leo está junto al baúl.',
  },
  steps: [
    { text: 'Leo: "I found this newspaper in the library. Read it with me."', es: 'Encontré este periódico en la biblioteca. Léelo conmigo.' },
    {
      text: '"OLD RACE CART GOES TO THE CITY. The River family has given its old race cart to the city history collection. The cart has been in the family barn for many years."',
      es: '"LA VIEJA CARRETA DE CARRERAS VA A LA CIUDAD. La familia River ha donado su vieja carreta de carreras a la colección de historia de la ciudad. La carreta ha estado en el granero de la familia por muchos años."',
      choice: { ask: 'Where is the cart now?', options: ['It is in the city history collection.', 'It is in the family barn.', 'It is at the race track.'], answer: 0, tip: 'Dice: has given its old race cart to the city history collection.' },
    },
    {
      text: '"The cart stopped in the middle of a famous race many years ago. Since then, nobody has driven it. Workers cleaned it last week and found purple dust in the wheels."',
      es: '"La carreta se detuvo en mitad de una carrera famosa hace muchos años. Desde entonces, nadie la ha conducido. La semana pasada unos trabajadores la limpiaron y encontraron polvo morado en las ruedas."',
      choice: { ask: 'Which sentence is correct?', options: ['Nobody has driven the cart since the race.', 'Nobody drove the cart last week… and they found nothing.', 'Somebody has driven the cart every day.'], answer: 0, tip: 'Dice: Since then, nobody has driven it.' },
    },
    {
      text: '"A museum worker said: We have never seen dust like this. We will keep the cart for the future."',
      es: '"Un trabajador del museo dijo: Nunca hemos visto un polvo así. Guardaremos la carreta para el futuro."',
      choice: { ask: 'When did the workers clean the cart?', options: ['They cleaned it last week.', 'They have cleaned it last week.', 'They never cleaned it.'], answer: 0, tip: 'Con last week (momento terminado): Past Simple → cleaned.' },
    },
    { text: 'Leo: "Purple dust… The fragment has stayed in that cart all these years. If the city keeps it for the future…"', es: 'Polvo morado… El fragmento se ha quedado en esa carreta todos estos años. Si la ciudad la guarda para el futuro…' },
  ],
  reward: {
    text: 'Leo: "Talk to {iname}. We have to decide what to do."',
    es: 'Habla con {iname}. Tenemos que decidir qué hacer.',
    sub: 'Habla con {iname} junto al tablero.',
    say: 'We have to decide what to do.',
  },
}

// Reunión con la persona especial (cap. 12: aclarar y opinar). No hay respuestas incorrectas; al terminar aparece el jefe.
NPC_TASKS['a2-10-meeting'] = {
  npc: 'a2-10-interest',
  done: 'a2-10-meeting',
  activity: 'debate',
  requires: {
    id: 'a2-10-news',
    text: '"Leo has found something in the chest. Go and see!"',
    es: 'Leo ha encontrado algo en el baúl. ¡Ve a ver!',
    sub: 'Leo está junto al baúl.',
  },
  debate: {
    title: 'Our Meeting',
    ask: 'Responde en la reunión: aclara lo que no entiendas y da tu opinión.',
    turns: [
      {
        text: 'So the city has kept the cart for years. Do you think the cart is still there in the future?',
        es: 'Entonces la ciudad ha guardado la carreta por años. ¿Crees que la carreta sigue allí en el futuro?',
        options: [
          { en: 'I think so. The city has kept it for a long time.', es: 'Creo que sí. La ciudad la ha guardado por mucho tiempo.', value: 'good' },
          { en: "Maybe. I'm not sure.", es: 'Quizá. No estoy seguro.', value: 'neutral' },
          { en: "I don't care about the cart.", es: 'No me importa la carreta.', value: 'bad' },
        ],
      },
      {
        text: 'If-the-fragment-is-still-in-the-cart-we-have-to-find-it-before-somebody-touches-it!',
        es: '¡Si el fragmento sigue en la carreta, tenemos que encontrarlo antes de que alguien lo toque! (lo dijo muy rápido).',
        options: [
          { en: 'Sorry, could you say that again more slowly?', es: 'Perdón, ¿puedes repetirlo más despacio?', value: 'good', reply: { text: 'Sorry! If the fragment is still in the cart, we have to find it before somebody touches it.', es: '¡Perdón! Si el fragmento sigue en la carreta, tenemos que encontrarlo antes de que alguien lo toque.' } },
          { en: 'What?', es: '¿Qué?', value: 'neutral', reply: { text: 'The fragment! We have to find it first!', es: '¡El fragmento! ¡Tenemos que encontrarlo primero!' } },
          { en: 'OK.', es: 'Vale.', value: 'bad', reply: { text: 'Did you understand me?', es: '¿Me entendiste?' } },
        ],
      },
      {
        text: 'What do you think we should do now?',
        es: '¿Qué crees que deberíamos hacer ahora?',
        options: [
          { en: 'In my opinion, we should follow the signal of the clock.', es: 'En mi opinión, deberíamos seguir la señal del reloj.', value: 'good' },
          { en: "Let's ask Leo.", es: 'Preguntémosle a Leo.', value: 'neutral' },
          { en: "Let's do nothing.", es: 'No hagamos nada.', value: 'bad' },
        ],
      },
      {
        text: 'Have you ever been to the city of the future?',
        es: '¿Alguna vez has estado en la ciudad del futuro?',
        options: [
          { en: 'Yes, I have. I have been there before.', es: 'Sí. He estado allí antes.', value: 'good' },
          { en: 'I think so.', es: 'Creo que sí.', value: 'neutral' },
          { en: 'Yes, I have went there.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: "Then it's decided. Wait… do you feel that? Something is eating the clues!", es: 'Entonces está decidido. Espera… ¿sientes eso? ¡Algo se está comiendo las pistas!' },
      mid: { text: 'OK, we agree. Wait… something is moving near the board!', es: 'Vale, estamos de acuerdo. Espera… ¡algo se mueve cerca del tablero!' },
      low: { text: '… OK. Wait. Something is moving near the board!', es: '… Vale. Espera. ¡Algo se mueve cerca del tablero!' },
    },
  },
  steps: [],
  reward: {
    text: '"Look out! The clues!"',
    es: '¡Cuidado! ¡Las pistas!',
    sub: 'El devorador de recuerdos apareció en el ático.',
    say: 'Look out!',
  },
}

// Cierre con Leo: la señal de 2056 abre A2-11. Recompensa: chaqueta de detective (sin fragmento en esta misión)
NPC_TASKS['a2-10-close'] = {
  npc: 'a2-10-leo-up',
  done: 'a2-10-close',
  outfit: 'chaqueta-detective',
  requires: {
    id: 'a2-10-memory-eater',
    text: 'Leo: "It\'s eating our clues! Stop it!"',
    es: '¡Se está comiendo nuestras pistas! ¡Detenlo!',
    sub: 'Vence al devorador de recuerdos.',
  },
  steps: [
    { text: 'Our clues are safe. You have done great work today.', es: 'Nuestras pistas están a salvo. Has hecho un gran trabajo hoy.' },
    { text: 'You have used the Present Perfect: for experiences, for recent things, and to say what has changed.', es: 'Has usado el Present Perfect: para experiencias, para cosas recientes y para decir lo que ha cambiado.' },
    { text: 'Look at your clock. It has never vibrated like this. The signal is in 2056.', es: 'Mira tu reloj. Nunca había vibrado así. La señal está en 2056.' },
    { text: 'The cart is still there… in the future. And the fragment is waiting for us.', es: 'La carreta sigue allí… en el futuro. Y el fragmento nos está esperando.' },
  ],
  reward: {
    text: 'Leo: "Next stop: the city of tomorrow."',
    es: 'Próxima parada: la ciudad del mañana.',
    sub: 'A2-10 completada. Ganaste la chaqueta de detective. El reloj marca una señal en 2056.',
    say: 'Next stop: the city of tomorrow.',
  },
}

// ── A2-11 — The City of Tomorrow (ciudad de 2056; escena, esbirro y jefe en data/a2Future.ts) ──
// La carreta River está en el museo del transporte, pero la carga está vacía: Adrián supervisó el traslado y tocó el fragmento.
// Orden: robot (Lost Luggage) → Leo (lección places-directions + práctica) → Dron de Rutas → persona especial (Route Challenge)
//        → Leo en el museo (Magic Book) → Leo (Detective: la carreta) → Adrián (reunión) → El tranvía sin rumbo → persona especial (cierre).
NPC_TASKS['a2-11-luggage'] = {
  npc: 'a2-11-robot',
  done: 'a2-11-luggage',
  activity: 'luggage',
  steps: [],
  reward: {
    text: 'Leo: "There you are! You have your bag… and an old paper map? Come here, I have something to teach you."',
    es: '¡Ahí estás! Tienes tu mochila… ¿y un mapa de papel viejo? Ven, tengo algo que enseñarte.',
    sub: 'Habla con Leo en la estación.',
    say: 'There you are!',
  },
}

NPC_TASKS['a2-11-leo'] = {
  done: 'a2-11-practice',
  lesson: 'places-directions',
  activity: 'practice',
  practice: 'places-directions',
  practiceIds: ['a2-11-p1', 'a2-11-p2', 'a2-11-p3', 'a2-11-p4', 'a2-11-p5', 'a2-11-p6', 'a2-11-p7'],
  requires: {
    id: 'a2-11-luggage',
    text: 'Leo: "Where is your bag? Ask the robot at Lost and Found."',
    es: '¿Dónde está tu mochila? Pregúntale al robot de objetos perdidos.',
    sub: 'El robot está junto al mostrador de la estación.',
  },
  steps: [],
  reward: {
    text: 'Leo: "Now we can find the museum. Wait… that drone at the door is giving strange directions!"',
    es: 'Ahora podemos encontrar el museo. Espera… ¡ese dron de la puerta está dando indicaciones raras!',
    sub: 'Un dron guía corrompido bloquea la salida de la estación. Véncelo.',
    say: 'That drone is giving strange directions!',
  },
}

// Route Challenge: con el viejo mapa de la oficial Rosa; el puente se cierra solo y hay que recalcular la ruta
NPC_TASKS['a2-11-route'] = {
  npc: 'a2-11-interest',
  done: 'a2-11-route',
  activity: 'route',
  requires: {
    id: 'a2-11-route-drone',
    text: '"The drone is blocking the station door! We can\'t go out."',
    es: '¡El dron bloquea la puerta de la estación! No podemos salir.',
    sub: 'Vence al Dron de Rutas, a la salida de la estación.',
  },
  steps: [],
  reward: {
    text: '"We made it! Leo is waiting for us inside the museum."',
    es: '¡Llegamos! Leo nos espera dentro del museo.',
    sub: 'Entra al museo del transporte (arriba a la derecha) y habla con Leo.',
    say: 'We made it!',
  },
}

// The Magic Book: el catálogo del museo alterado (leer y tocar / corregir con la preposición). Escudo con 0-1 errores
NPC_TASKS['a2-11-book'] = {
  npc: 'a2-11-leo-museum',
  done: 'a2-11-book',
  activity: 'book',
  steps: [],
  reward: {
    text: 'Leo: "Room 3… there it is. The River cart."',
    es: 'Sala 3… ahí está. La carreta River.',
    sub: 'Habla otra vez con Leo para revisar la carreta.',
    say: 'There it is. The River cart.',
  },
}

// Detective: la carreta (placa, ruedas, carga vacía, registro de traslado firmado por A., Mobility Coordination)
NPC_TASKS['a2-11-detective'] = {
  npc: 'a2-11-leo-museum',
  done: 'a2-11-detective',
  activity: 'reconstruct',
  requires: {
    id: 'a2-11-book',
    text: 'Leo: "First, let\'s read the museum book. It says where everything is."',
    es: 'Primero, leamos el libro del museo. Dice dónde está cada cosa.',
    sub: 'Habla con Leo para abrir el libro.',
  },
  reconstruct: {
    title: 'Detective: The River Cart',
    intro: { en: 'The museum guide has wrong information about the cart. Look at each clue and choose what is true.', es: 'La guía del museo tiene información equivocada sobre la carreta. Mira cada pista y elige lo que es verdad.' },
    items: [
      {
        source: 'The plaque',
        clue: { en: 'Gift from the River family. The cart came to this museum from the old city collection.', es: 'Donación de la familia River. La carreta llegó a este museo desde la antigua colección de la ciudad.' },
        claim: { en: 'The cart has always been in this museum.', es: 'La carreta siempre ha estado en este museo.' },
        options: ['The cart came to the museum from the city collection.', 'The cart came at the museum from the city collection.', 'The cart came to the museum of the city collection to.'],
        answer: 0,
        tip: 'Llegar a un lugar: came to. Desde dónde: from.',
      },
      {
        source: 'The wheels',
        clue: { en: 'There is purple dust on the wheels and under the cart.', es: 'Hay polvo morado en las ruedas y debajo de la carreta.' },
        claim: { en: 'The cart is completely clean.', es: 'La carreta está completamente limpia.' },
        options: ['There is purple dust on the wheels.', 'There is purple dust in on the wheels.', 'There is purple dust at the wheels of.'],
        answer: 0,
        tip: 'Sobre una superficie: on the wheels.',
      },
      {
        source: 'The cargo box',
        clue: { en: 'The cargo box is open. There is nothing in it. Somebody has opened it.', es: 'La caja de carga está abierta. No hay nada adentro. Alguien la ha abierto.' },
        claim: { en: 'The fragment is still in the cargo box.', es: 'El fragmento sigue en la caja de carga.' },
        options: ['The fragment is not in the cargo box.', 'The fragment is not on the cargo box inside.', 'The fragment is not at the cargo box in.'],
        answer: 0,
        tip: 'Dentro de una caja: in the box.',
      },
      {
        source: 'The transfer record',
        clue: { en: 'The cart traveled by truck from the old collection to the museum. Signed: A. — Mobility Coordination.', es: 'La carreta viajó en camión desde la antigua colección hasta el museo. Firma: A. — Coordinación de Movilidad.' },
        claim: { en: 'Nobody moved the cart. It came on foot.', es: 'Nadie movió la carreta. Llegó a pie.' },
        options: ['Somebody from Mobility Coordination moved the cart by truck.', 'Somebody from Mobility Coordination moved the cart with truck.', 'Somebody from Mobility Coordination moved the cart on the truck by.'],
        answer: 0,
        tip: 'Medio de transporte: by truck (sin artículo).',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "A. — Mobility Coordination… This person opened the cargo box. Let\'s find the Mobility Office."',
    es: 'A. — Coordinación de Movilidad… Esta persona abrió la caja de carga. Busquemos la oficina de movilidad.',
    sub: 'La oficina de movilidad está abajo a la derecha, cruzando Sky Street.',
    say: "Let's find the Mobility Office.",
  },
}

// Reunión con Adrián (pedir y dar indicaciones, hablar de viajes). No hay respuestas incorrectas; al terminar aparece el jefe.
NPC_TASKS['a2-11-meeting'] = {
  npc: 'a2-11-adrian',
  done: 'a2-11-meeting',
  activity: 'debate',
  requires: {
    id: 'a2-11-detective',
    text: '"Welcome to the Mobility Office."',
    es: 'Bienvenido a la oficina de movilidad.',
    sub: 'Primero revisa la carreta con Leo en el museo.',
  },
  debate: {
    title: 'The Mobility Office',
    ask: 'Habla con Adrián: pide información, aclara lo que no entiendas y cuenta cómo llegaste.',
    turns: [
      {
        text: "Hello! I'm Adrián, the mobility coordinator of the city. Are you lost?",
        es: '¡Hola! Soy Adrián, el coordinador de movilidad de la ciudad. ¿Están perdidos?',
        options: [
          { en: 'Hello! Could you help us? We are looking for information about the River cart.', es: '¡Hola! ¿Nos puedes ayudar? Buscamos información sobre la carreta River.', value: 'good' },
          { en: 'Yes.', es: 'Sí.', value: 'neutral' },
          { en: 'Give me information.', es: 'Dame información.', value: 'bad' },
        ],
      },
      {
        text: 'Ah-the-River-cart-I-moved-it-myself-by-truck-from-the-old-collection-to-the-museum.',
        es: 'Ah, la carreta River. Yo mismo la llevé en camión desde la antigua colección hasta el museo. (lo dijo muy rápido).',
        options: [
          { en: 'Sorry, could you say that again more slowly?', es: 'Perdón, ¿puedes repetirlo más despacio?', value: 'good', reply: { text: 'Of course. I moved the cart myself, by truck, from the old collection to the museum.', es: 'Claro. Yo mismo llevé la carreta, en camión, desde la antigua colección hasta el museo.' } },
          { en: 'What?', es: '¿Qué?', value: 'neutral', reply: { text: 'I moved it. Myself.', es: 'Yo la llevé. Yo mismo.' } },
          { en: 'OK.', es: 'Vale.', value: 'bad', reply: { text: 'Did you understand me?', es: '¿Me entendiste?' } },
        ],
      },
      {
        text: 'How did you get here from the station?',
        es: '¿Cómo llegaron aquí desde la estación?',
        options: [
          { en: 'We took the tram, but the bridge was closed, so we walked through the tunnel.', es: 'Tomamos el tranvía, pero el puente estaba cerrado, así que atravesamos el túnel.', value: 'good' },
          { en: 'On foot.', es: 'A pie.', value: 'neutral' },
          { en: 'We came across the tunnel with foot.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'In my city, every route is perfect. I decide all the routes now. Do you like my city?',
        es: 'En mi ciudad, cada ruta es perfecta. Ahora yo decido todas las rutas. ¿Te gusta mi ciudad?',
        options: [
          { en: 'It is amazing, but some routes are changing by themselves. Why?', es: 'Es increíble, pero algunas rutas cambian solas. ¿Por qué?', value: 'good' },
          { en: 'It is OK.', es: 'Está bien.', value: 'neutral' },
          { en: 'No.', es: 'No.', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'By themselves? No… that is impossible. Every route is mine. Excuse me, I have work to do.', es: '¿Solas? No… eso es imposible. Cada ruta es mía. Disculpen, tengo trabajo.' },
      mid: { text: 'Every route is perfect. Excuse me, I have work to do.', es: 'Cada ruta es perfecta. Disculpen, tengo trabajo.' },
      low: { text: '… Excuse me. I have work to do.', es: '… Disculpen. Tengo trabajo.' },
    },
  },
  steps: [],
  reward: {
    text: 'Leo: "Did you see his eyes? They were purple for a second… Look out! A tram with no driver!"',
    es: '¿Viste sus ojos? Por un segundo fueron morados… ¡Cuidado! ¡Un tranvía sin conductor!',
    sub: 'El tranvía sin rumbo apareció en Sky Street.',
    say: 'Look out!',
  },
}

// Cierre con la persona especial: todas las rutas se cierran. Adrián, de espaldas: "Nobody leaves the city." Abre A2-12.
NPC_TASKS['a2-11-close'] = {
  npc: 'a2-11-interest',
  done: 'a2-11-close',
  outfit: 'pase-2056',
  requires: {
    id: 'a2-11-runaway-tram',
    text: '"The tram! It is going to crash! Stop it!"',
    es: '¡El tranvía! ¡Va a chocar! ¡Detenlo!',
    sub: 'Vence al tranvía sin rumbo en Sky Street.',
  },
  steps: [
    { text: 'The tram has stopped. Are you OK?', es: 'El tranvía se ha detenido. ¿Estás bien?' },
    { text: 'You used the city like a local: next to, between, across, through, along… and you took the tram.', es: 'Usaste la ciudad como alguien de aquí: next to, between, across, through, along… y tomaste el tranvía.' },
    { text: 'Look at the screens! Every screen in the street says the same thing: ALL ROUTES CLOSED.', es: '¡Mira las pantallas! Todas las pantallas de la calle dicen lo mismo: TODAS LAS RUTAS CERRADAS.' },
    { text: 'And there… at the door of the Mobility Office. It is Adrián. He is not looking at us.', es: 'Y allí… en la puerta de la oficina de movilidad. Es Adrián. No nos está mirando.' },
    { text: 'Adrián: "Nobody leaves the city."', es: 'Adrián: "Nadie sale de la ciudad."' },
  ],
  reward: {
    text: '"The fragment… Adrián has it. I am sure."',
    es: 'El fragmento… lo tiene Adrián. No hay duda.',
    sub: 'A2-11 completada. Ganaste la chaqueta con pase de transporte (2056). Todas las rutas de la ciudad están cerradas.',
    say: 'Adrián has it.',
  },
}

// ── A2-12 — Out of Control (centro de control de 2056; escena, esbirro y jefe en data/a2Control.ts) ──
// Adrián, corrompido por el fragmento de la carga de la carreta, cerró todas las rutas. Al vencerlo entrega el fragmento y queda como aliado.
// Orden: Leo (lección future-plans + práctica) → El Anunciador → persona especial (Future Planner) → Leo (el registro del sistema)
//        → robot de control (Command Puzzle) → Adrián (jefe) → Leo (cierre: el reloj señala el hospital).
NPC_TASKS['a2-12-leo'] = {
  done: 'a2-12-practice',
  lesson: 'future-plans',
  activity: 'practice',
  practice: 'future-plans',
  practiceIds: ['a2-12-p1', 'a2-12-p2', 'a2-12-p3', 'a2-12-p4', 'a2-12-p5', 'a2-12-p6', 'a2-12-p7', 'a2-12-p8'],
  steps: [],
  reward: {
    text: 'Leo: "Good. Now let\'s go to the platforms… Wait. Do you hear that announcement? Something is wrong with it."',
    es: 'Bien. Ahora vamos a los andenes… Espera. ¿Oyes ese anuncio? Algo le pasa.',
    sub: 'El Anunciador corrompido bloquea la salida de la sala de boletos. Véncelo.',
    say: 'Something is wrong with it.',
  },
}

// Future Planner: los planes de los viajeros en el tablero (BOOKED → presente continuo · PLAN → going to · CANCELLED → will). Escudo con 0-1 errores
NPC_TASKS['a2-12-planner'] = {
  npc: 'a2-12-interest',
  done: 'a2-12-planner',
  activity: 'futureplan',
  requires: {
    id: 'a2-12-announcer',
    text: '"The announcer is blocking the door! We can\'t get to the platforms."',
    es: '¡El anunciador bloquea la puerta! No podemos llegar a los andenes.',
    sub: 'Vence al Anunciador, a la salida de la sala de boletos.',
  },
  steps: [],
  reward: {
    text: '"Everybody has a plan now. But the trains still aren\'t moving. Leo is reading something in the hall."',
    es: 'Ahora todos tienen un plan. Pero los trenes siguen sin moverse. Leo está leyendo algo en el pasillo.',
    sub: 'Habla con Leo en el pasillo.',
    say: 'Everybody has a plan now.',
  },
}

// Lectura: el registro del sistema (Reconstruct). Qué hizo y qué va a hacer Adrián.
NPC_TASKS['a2-12-log'] = {
  npc: 'a2-12-leo-hall',
  done: 'a2-12-log',
  activity: 'reconstruct',
  requires: {
    id: 'a2-12-planner',
    text: 'Leo: "First, help the travelers on the platforms. They are very confused."',
    es: 'Primero ayuda a los viajeros de los andenes. Están muy confundidos.',
    sub: 'La persona especial está en los andenes (abajo).',
  },
  reconstruct: {
    title: 'The Control Log',
    intro: { en: 'This is the system log of the Control Room. The screen shows wrong information. Read each entry and choose what is true.', es: 'Este es el registro del sistema de la sala de control. La pantalla muestra información equivocada. Lee cada entrada y elige lo que es verdad.' },
    items: [
      {
        source: 'Log · 08:00',
        clue: { en: 'Fragment moved from the River cart to the Control Room. — A.', es: 'Fragmento trasladado de la carreta River a la sala de control. — A.' },
        claim: { en: 'The fragment is still in the museum.', es: 'El fragmento sigue en el museo.' },
        options: ['The fragment is in the Control Room now.', 'The fragment are in the Control Room now.', 'The fragment is on the Control Room now in.'],
        answer: 0,
        tip: 'Mira la entrada: se trasladó a la sala de control (is in the Control Room).',
      },
      {
        source: "Adrián's calendar",
        clue: { en: 'Today, 15:00: meeting with the city council (confirmed).', es: 'Hoy, 15:00: reunión con el concejo de la ciudad (confirmada).' },
        claim: { en: 'Adrián has no plans today.', es: 'Adrián no tiene planes hoy.' },
        options: ['Adrián is meeting the city council at three.', 'Adrián meets going to the city council at three.', 'Adrián will meeting the city council at three.'],
        answer: 0,
        tip: 'Una reunión confirmada es un plan acordado: presente continuo (is meeting).',
      },
      {
        source: 'A note on the desk',
        clue: { en: 'I am going to close every route. Nobody leaves my city.', es: 'Voy a cerrar cada ruta. Nadie sale de mi ciudad.' },
        claim: { en: 'Adrián wants to open the routes.', es: 'Adrián quiere abrir las rutas.' },
        options: ['Adrián is going to close every route.', 'Adrián going to close every route.', 'Adrián is going close every route.'],
        answer: 0,
        tip: 'Su intención: is going to + verbo.',
      },
      {
        source: 'System alert',
        clue: { en: 'Train 4 is on its way to Platform 2. Workers are on the tracks.', es: 'El tren 4 va camino del andén 2. Hay obreros en la vía.' },
        claim: { en: 'Platform 2 is safe.', es: 'El andén 2 es seguro.' },
        options: ['Train 4 is going to arrive at Platform 2.', 'Train 4 will arriving at Platform 2.', 'Train 4 is go to arrive at Platform 2.'],
        answer: 0,
        tip: 'Ya va en camino (evidencia): is going to arrive.',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "Workers on the tracks! We need to stop that train. The Control Bot can give orders to the system. Hurry!"',
    es: '¡Obreros en la vía! Tenemos que detener ese tren. El robot de control puede dar órdenes al sistema. ¡Rápido!',
    sub: 'Habla con el robot de control, junto a la puerta de la sala de control.',
    say: 'Hurry!',
  },
}

// Command Puzzle (reutilizado de A2-09): órdenes al transporte. Los errores no quitan vida; escudo con 0-1 errores. Al terminar aparece Adrián.
NPC_TASKS['a2-12-command'] = {
  npc: 'a2-12-bot',
  done: 'a2-12-command',
  activity: 'command',
  requires: {
    id: 'a2-12-log',
    text: 'Control Bot: "Access denied. Talk to your friend first."',
    es: 'Acceso denegado. Habla primero con tu amigo.',
    sub: 'Leo está en el pasillo.',
  },
  command: {
    title: 'The Control Room',
    scene: 'control',
    intro: { en: 'Give orders to the system. Choose a verb, then touch the thing.', es: 'Da órdenes al sistema. Elige un verbo y luego toca la cosa.' },
    verbs: ['unlock', 'stop', 'cancel', 'send', 'open', 'close', 'start'],
    objects: [
      { id: 'doors', en: 'doors', es: 'puertas' },
      { id: 'tram', en: 'tram', es: 'tranvía' },
      { id: 'route', en: 'route', es: 'ruta' },
      { id: 'train', en: 'train', es: 'tren' },
      { id: 'gates', en: 'gates', es: 'compuertas del andén' },
    ],
    steps: [
      { problem: { en: 'The doors of the Control Room are locked.', es: 'Las puertas de la sala de control están cerradas con llave.' }, verb: 'unlock', object: 'doors', done: { en: 'Access granted. The doors are open.', es: 'Acceso permitido. Las puertas están abiertas.' }, tip: 'Están cerradas con llave (locked): hay que quitar el seguro → unlock.', fails: { open: { en: 'The doors are locked. You cannot open them yet.', es: 'Las puertas tienen seguro. Todavía no puedes abrirlas.' } } },
      { problem: { en: 'Tram 7 is going too fast to the closed bridge!', es: '¡El tranvía 7 va demasiado rápido hacia el puente cerrado!' }, verb: 'stop', object: 'tram', done: { en: 'Tram 7 has stopped. Everybody is safe.', es: 'El tranvía 7 se ha detenido. Todos están a salvo.' }, tip: 'Va demasiado rápido: hay que detenerlo → stop.' },
      { problem: { en: 'Route B goes to the closed bridge. It is dangerous.', es: 'La ruta B va al puente cerrado. Es peligroso.' }, verb: 'cancel', object: 'route', done: { en: 'Route B is cancelled.', es: 'La ruta B está cancelada.' }, tip: 'Una ruta peligrosa se anula: cancel.' },
      { problem: { en: 'The system wants to send Train 4 to Platform 2, but there are workers on the tracks. Warn the system!', es: 'El sistema quiere enviar el tren 4 al andén 2, pero hay obreros en la vía. ¡Avisa al sistema!' }, verb: 'send', negative: true, object: 'train', done: { en: 'Train 4 is waiting. The workers are safe.', es: 'El tren 4 está esperando. Los obreros están a salvo.' }, tip: "Es una advertencia: usa DON'T + send.", fails: { send: { en: "No! Never say 'send' here. There are workers on the tracks!", es: '¡No! Aquí nunca digas "envía". ¡Hay obreros en la vía!' }, stop: { en: 'The train is not moving yet. Tell the system what NOT to do.', es: 'El tren todavía no se mueve. Dile al sistema qué NO hacer.' } } },
      { problem: { en: 'The new routes are safe. The passengers are waiting behind the gates.', es: 'Las nuevas rutas son seguras. Los pasajeros esperan detrás de las compuertas.' }, verb: 'open', object: 'gates', done: { en: 'The gates are open. The passengers are getting on the trains.', es: 'Las compuertas están abiertas. Los pasajeros se suben a los trenes.' }, tip: 'Para que pasen: open.' },
    ],
    finish: { en: 'System restored. Thank you! … Warning: somebody is entering the Control Room.', es: 'Sistema restaurado. ¡Gracias! … Aviso: alguien está entrando a la sala de control.', banner: '¡Sistema restaurado!' },
  },
  steps: [],
  reward: {
    text: 'Leo: "The routes are opening… but look! Adrián is in the Control Room. And his eyes are purple."',
    es: 'Las rutas se están abriendo… ¡pero mira! Adrián está en la sala de control. Y sus ojos son morados.',
    sub: 'Adrián apareció en la sala de control (arriba a la derecha). Véncelo para recuperar el fragmento.',
    say: 'His eyes are purple.',
  },
}

// Cierre con Leo tras vencer a Adrián (el fragmento ya lo entregó el jefe). El reloj señala el hospital (A2-13). Sin voces ni spoilers.
NPC_TASKS['a2-12-close'] = {
  npc: 'a2-12-leo-hall',
  done: 'a2-12-close',
  outfit: 'uniforme-control',
  requires: {
    id: 'a2-12-adrian',
    text: 'Leo: "Adrián still has the fragment. Go to the Control Room!"',
    es: 'Adrián todavía tiene el fragmento. ¡Ve a la sala de control!',
    sub: 'Vence a Adrián en la sala de control.',
  },
  steps: [
    { text: 'Listen! The trains are running again. Adrián is opening every route.', es: '¡Escucha! Los trenes funcionan otra vez. Adrián está abriendo cada ruta.' },
    { text: "You talked about plans like an expert: I'm leaving at ten, we're going to visit, I'll take the next one… and you booked tickets.", es: 'Hablaste de planes como un experto: I\'m leaving at ten, we\'re going to visit, I\'ll take the next one… y reservaste boletos.' },
    { text: 'And the fragment from the cart is with you now. Look at your clock. It is shining.', es: 'Y el fragmento de la carreta ya está contigo. Mira tu reloj. Está brillando.' },
    { text: 'The clock is showing a place… in the present. It is the hospital. The place where everything started.', es: 'El reloj muestra un lugar… en el presente. Es el hospital. El lugar donde empezó todo.' },
    { text: "We're going back. I don't know what is waiting for us there… but we're going together.", es: 'Vamos a volver. No sé qué nos espera allí… pero vamos juntos.' },
  ],
  reward: {
    text: 'Leo: "We\'re going back."',
    es: 'Vamos a volver.',
    sub: 'A2-12 completada. Recuperaste el fragmento de la carreta y ganaste el uniforme del centro de control (2056). Adrián ahora es tu aliado. El reloj señala el hospital.',
    say: "We're going back.",
  },
}

// ── A2-13 — The Missing Voice (de vuelta al hospital, presente; escena, esbirro y jefe en data/a2Return.ts) ──
// La luz morada les quita la voz a todos; Leo se queda ronco y se desmaya. Jefe final de A2 (The Silence, 4 fases) y examen escrito de A2.
// Orden: Leo (lección health-emergency + práctica) → la paciente silenciada → la recepcionista (notas escritas) → la médica (DebateTalk)
//        → la persona especial (llamada de emergencia, Dialogue Under Pressure) → Leo (Detective: el tablero de A2) → The Silence
//        → Leo (examen de A2) → Leo (cierre: el núcleo se ilumina; "Be brave. Use your voice."; Who is L?).
NPC_TASKS['a2-13-leo'] = {
  done: 'a2-13-practice',
  lesson: 'health-emergency',
  activity: 'practice',
  practice: 'health-emergency',
  practiceIds: ['a2-13-p1', 'a2-13-p2', 'a2-13-p3', 'a2-13-p4', 'a2-13-p5', 'a2-13-p6', 'a2-13-p7', 'a2-13-p8'],
  steps: [],
  reward: {
    text: 'Leo: "(cough) Good… Now go to the reception. Wait… that patient. Her eyes are purple."',
    es: '(tose) Bien… Ahora ve a la recepción. Espera… esa paciente. Sus ojos son morados.',
    sub: 'La paciente silenciada bloquea la entrada de la recepción. Véncela.',
    say: 'Her eyes are purple.',
  },
}

// Lectura: la recepcionista no puede hablar y escribe notas. Hay que entenderlas (y contestar bien).
NPC_TASKS['a2-13-notes'] = {
  npc: 'a2-13-receptionist',
  done: 'a2-13-notes',
  requires: {
    id: 'a2-13-silenced',
    text: '(The receptionist points at the door. Somebody is blocking it.)',
    es: '(La recepcionista señala la puerta. Alguien la está bloqueando).',
    sub: 'Vence a la paciente silenciada, a la entrada de la recepción.',
  },
  steps: [
    {
      text: '(She opens her mouth, but no sound comes out. She takes a notebook and writes:) "I can\'t speak. Can you read?"',
      es: '(Abre la boca, pero no le sale ningún sonido. Toma una libreta y escribe:) "No puedo hablar. ¿Sabes leer?".',
      choice: { ask: 'Contéstale con amabilidad.', options: ["Yes, I can. What's the matter?", "Yes, I can. What's the matters?", 'Yes, I do. What matter?'], answer: 0, tip: "Para preguntar qué le pasa: What's the matter?" },
    },
    {
      text: '(She writes:) "At 3 o\'clock a purple light came from the hallway. Since then, nobody has spoken. My throat hurts."',
      es: '(Escribe:) "A las 3 una luz morada vino del pasillo. Desde entonces, nadie ha hablado. Me duele la garganta".',
      choice: { ask: '¿Qué pasó, según la nota?', options: ['A purple light came, and now nobody can speak.', 'A purple light is going to come at 3.', 'Nobody came to the hospital at 3.'], answer: 0, tip: 'La nota dice: came (pasado) y nobody has spoken (desde entonces, nadie ha hablado).' },
    },
    {
      text: '(She writes:) "Your friend is very pale. He has got a sore throat too. The doctor is in your old room."',
      es: '(Escribe:) "Tu amigo está muy pálido. Él también tiene dolor de garganta. La médica está en tu antigua habitación".',
      choice: { ask: 'Dale un consejo antes de irte.', options: ["You should drink some water. Don't try to speak.", 'You should to drink some water. Not try to speak.', "You shoulds drink some water. Don't trying to speak."], answer: 0, tip: "Consejo: should + verbo base. Una orden negativa: Don't + verbo." },
    },
    {
      text: '(She smiles and writes:) "Thank you. Please hurry."',
      es: '(Sonríe y escribe:) "Gracias. Por favor, apúrate".',
    },
  ],
  reward: {
    text: '"Thank you. Please hurry."',
    es: 'Gracias. Por favor, apúrate.',
    sub: 'La médica está en tu antigua habitación (a la izquierda). Cuéntale qué le pasa a Leo.',
    say: 'Please hurry.',
  },
}

// Reunión con la médica de A2-01: describir los síntomas de Leo y dar tu opinión. No hay respuestas incorrectas.
NPC_TASKS['a2-13-doctor'] = {
  npc: 'a2-13-doctor',
  done: 'a2-13-doctor',
  activity: 'debate',
  requires: {
    id: 'a2-13-notes',
    text: '(The doctor writes quickly in her notebook. She looks very busy.)',
    es: '(La médica escribe rápido en su libreta. Se ve muy ocupada).',
    sub: 'Primero habla con la recepcionista.',
  },
  debate: {
    title: 'The Doctor',
    ask: 'Cuéntale a la médica qué le pasa a Leo: los síntomas, desde cuándo y lo que tú piensas.',
    turns: [
      {
        text: '(in a very weak voice) You came back… Good. Tell me. What\'s the matter with your friend?',
        es: '(con una voz muy débil) Volviste… Bien. Dime. ¿Qué le pasa a tu amigo?',
        options: [
          { en: "He's got a sore throat, and his voice is getting weaker and weaker.", es: 'Tiene dolor de garganta, y su voz es cada vez más débil.', value: 'good' },
          { en: 'He is sick.', es: 'Está enfermo.', value: 'neutral' },
          { en: 'He have got a voice.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'Has he got a fever? Does his head hurt?',
        es: '¿Tiene fiebre? ¿Le duele la cabeza?',
        options: [
          { en: "No, he hasn't got a fever. But he feels dizzy and very tired.", es: 'No, no tiene fiebre. Pero se siente mareado y muy cansado.', value: 'good' },
          { en: 'No fever.', es: 'Sin fiebre.', value: 'neutral' },
          { en: 'His head hurt him yesterday tomorrow.', es: '(Frase sin sentido).', value: 'bad', reply: { text: "Sorry, I don't understand.", es: 'Perdón, no te entiendo.' } },
        ],
      },
      {
        text: 'When did it start?',
        es: '¿Cuándo empezó?',
        options: [
          { en: 'It started when we arrived. The purple light was shining in the windows.', es: 'Empezó cuando llegamos. La luz morada brillaba en las ventanas.', value: 'good' },
          { en: 'Today.', es: 'Hoy.', value: 'neutral' },
          { en: 'It is start when we are arrive.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'What do you think? Is it a normal illness?',
        es: '¿Tú qué piensas? ¿Es una enfermedad normal?',
        options: [
          { en: "I don't think so. I think the purple light is taking everybody's voice.", es: 'No lo creo. Creo que la luz morada se está llevando la voz de todos.', value: 'good' },
          { en: 'I don\'t know.', es: 'No sé.', value: 'neutral' },
          { en: 'Yes, he should to eat more.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: "You're right. I've checked every patient. It is not an illness: it is that light. You must find where it comes from.", es: 'Tienes razón. He revisado a todos los pacientes. No es una enfermedad: es esa luz. Tienes que encontrar de dónde viene.' },
      mid: { text: "It is not a normal illness. I'm sure. You must find where that light comes from.", es: 'No es una enfermedad normal. Estoy segura. Tienes que encontrar de dónde viene esa luz.' },
      low: { text: '… I think it is that light. Please, be careful.', es: '… Creo que es esa luz. Por favor, ten cuidado.' },
    },
  },
  steps: [],
  reward: {
    text: '"Help! Leo has fainted in the hallway!"',
    es: '¡Ayuda! ¡Leo se desmayó en el pasillo!',
    sub: 'La persona especial grita desde la habitación. Habla con ella: hay que pedir ayuda por teléfono.',
    say: 'Leo has fainted!',
  },
}

// Dialogue Under Pressure (MiniTalk con temporizador, ya existe): la llamada de emergencia. Adrián manda un mensaje al final.
NPC_TASKS['a2-13-call'] = {
  npc: 'a2-13-interest',
  done: 'a2-13-call',
  pressure: 14,
  requires: {
    id: 'a2-13-doctor',
    text: '"Leo looks very pale. Talk to the doctor first."',
    es: 'Leo se ve muy pálido. Habla primero con la médica.',
    sub: 'La médica está en tu antigua habitación.',
  },
  steps: [
    {
      text: '"Leo has fainted! The doctor can\'t speak, she has lost her voice too. Here, take my phone. Call for help! Quick!"',
      es: '¡Leo se desmayó! La médica no puede hablar, también perdió la voz. Toma mi teléfono. ¡Pide ayuda! ¡Rápido!',
    },
    {
      text: "Operator: \"Emergency services. What's your emergency?\"",
      es: 'Operador: "Servicio de emergencias. ¿Cuál es su emergencia?".',
      choice: { ask: 'Di qué pasó.', options: ["My friend has fainted. He can't speak.", "My friend has faint. He can't to speak.", "My friend is fainted. He don't speak."], answer: 0, tip: 'Acaba de pasar: has fainted. Después de can\'t, el verbo va sin to.' },
    },
    {
      text: 'Operator: "OK. Is he breathing?"',
      es: 'Operador: "Está bien. ¿Está respirando?".',
      choice: { ask: 'Sí, respira. Y tiene los ojos abiertos.', options: ['Yes, he is. His eyes are open.', 'Yes, he does. His eyes is open.', 'Yes, he breathing. His eyes are open.'], answer: 0, tip: 'Pregunta con is → respuesta corta: Yes, he is.' },
    },
    {
      text: 'Operator: "Where are you now?"',
      es: 'Operador: "¿Dónde están ahora?".',
      choice: { ask: 'Estás en el hospital de la ciudad, en el segundo piso.', options: ["We're in the city hospital, on the second floor.", "We're on the city hospital, in the second floor.", "We're at the city hospital, at the second floor."], answer: 0, tip: 'in the hospital (dentro de un edificio) · on the second floor (pisos).' },
    },
    {
      text: 'Operator: "Has he got any other symptoms?"',
      es: 'Operador: "¿Tiene algún otro síntoma?".',
      choice: { ask: 'Le duele la garganta y está muy pálido.', options: ['His throat hurts, and he is very pale.', 'His throat hurt him, and he is very pale.', 'His throat hurts, and he has very pale.'], answer: 0, tip: 'Una parte del cuerpo: hurts. Para cómo está: he is pale.' },
    },
    {
      text: 'Operator: "OK. Help is coming. What should you do now? Listen carefully."',
      es: 'Operador: "Bien. La ayuda va en camino. ¿Qué deben hacer ahora? Escuche con atención".',
      choice: { ask: '¿Qué consejo tiene sentido?', options: ["We shouldn't move him. We should stay with him.", 'We should to move him. We shouldn\'t stay with him.', 'We must running. We mustn\'t stay with him.'], answer: 0, tip: "Con alguien desmayado: no moverlo (shouldn't move) y quedarse con él (should stay)." },
    },
    {
      text: '(A message appears on the phone:) Adrián: "I\'ve seen the alert from 2056. I\'m coming. I\'ll help you."',
      es: '(Aparece un mensaje en el teléfono:) Adrián: "He visto la alerta desde 2056. Voy para allá. Te ayudaré".',
    },
  ],
  reward: {
    text: 'Leo opens his eyes. He tries to speak… but nothing comes out.',
    es: 'Leo abre los ojos. Intenta hablar… pero no le sale nada.',
    sub: 'Leo está despierto en el pasillo, pero sin voz. Habla con él: tiene algo que mostrarte.',
    say: 'Leo opens his eyes.',
  },
}

// Detective: el tablero de A2 (Reconstruct). Leo no puede hablar: escribe en la libreta. Se juntan las pistas de toda la campaña.
NPC_TASKS['a2-13-board'] = {
  npc: 'a2-13-leo-hall',
  done: 'a2-13-board',
  activity: 'reconstruct',
  reconstruct: {
    title: 'The A2 Board',
    intro: { en: "Leo can't speak, so he writes in his notebook: \"Let's put everything together.\" Read each clue and choose what is true.", es: 'Leo no puede hablar, así que escribe en su libreta: "Juntemos todo". Lee cada pista y elige lo que es verdad.' },
    items: [
      {
        source: 'The workshop and the library',
        clue: { en: 'Mr. Hale and the echo in the library touched a fragment. Their words changed, and their eyes turned purple.', es: 'Mr. Hale y el eco de la biblioteca tocaron un fragmento. Sus palabras cambiaron y sus ojos se volvieron morados.' },
        claim: { en: 'The fragments help people speak better.', es: 'Los fragmentos ayudan a hablar mejor.' },
        options: ['People who touched a fragment changed their words.', 'People who touch a fragment changes their words.', 'People who touched a fragment has changed his words.'],
        answer: 0,
        tip: 'Lo que pasó: touched y changed (Past Simple).',
      },
      {
        source: 'The race, the road and the mill',
        clue: { en: 'The purple light stopped the cart in the race, the car on the road and the wheel of the mill.', es: 'La luz morada detuvo la carreta en la carrera, el carro en el camino y la rueda del molino.' },
        claim: { en: 'The purple light makes things go faster.', es: 'La luz morada hace que las cosas vayan más rápido.' },
        options: ['The purple light stops everything it touches.', 'The purple light stop everything it touch.', 'The purple light is stopping everything it touched tomorrow.'],
        answer: 0,
        tip: 'Algo que siempre pasa: stops, touches (presente con -s).',
      },
      {
        source: 'The museum of 2056',
        clue: { en: 'The fragment was in the cargo of the River cart for many years. Adrián took it, and he closed every route.', es: 'El fragmento estuvo en la carga de la carreta River muchos años. Adrián lo tomó y cerró todas las rutas.' },
        claim: { en: 'Somebody traveled in time with the cart.', es: 'Alguien viajó en el tiempo con la carreta.' },
        options: ['Nobody traveled in time: the years passed.', 'Nobody travels in time: the years pass tomorrow.', 'Nobody has travel in time: the years passed.'],
        answer: 0,
        tip: 'Nadie viajó: solo pasaron los años (traveled, passed).',
      },
      {
        source: 'The hospital, today',
        clue: { en: 'Since 3 o\'clock, nobody in the hospital has spoken. Leo has lost his voice too.', es: 'Desde las 3, nadie en el hospital ha hablado. Leo también ha perdido la voz.' },
        claim: { en: 'The light has stopped the trains.', es: 'La luz ha detenido los trenes.' },
        options: ["Now the light has stopped people's voices.", "Now the light has stop people's voices.", "Now the light stopped people's voices tomorrow."],
        answer: 0,
        tip: 'Algo que pasó y se nota ahora: has stopped (Present Perfect).',
      },
    ],
  },
  steps: [],
  reward: {
    text: '(Leo writes:) "The light stops what it touches. Now it has stopped our voices." — The hallway goes dark. Something is coming.',
    es: '(Leo escribe:) "La luz detiene lo que toca. Ahora ha detenido nuestras voces". — El pasillo se oscurece. Algo viene.',
    sub: 'The Silence apareció al fondo del pasillo (a la derecha). Es el jefe final de A2.',
    say: 'Something is coming.',
  },
}

// Examen escrito de A2 (EraExam, entrada 'a2'). Al guardar las frases se completa la tarea.
NPC_TASKS['a2-13-exam'] = {
  npc: 'a2-13-leo-hall',
  done: 'a2-13-exam',
  activity: 'exam',
  exam: 'a2',
  requires: {
    id: 'a2-13-stranger',
    text: '(Leo points at the end of the hallway. He can\'t speak.)',
    es: '(Leo señala el fondo del pasillo. No puede hablar).',
    sub: 'Vence a The Silence y haz retroceder al hombre del abrigo oscuro, al fondo del pasillo.',
  },
  steps: [],
  reward: {
    text: 'Leo: "(cough)… Wow. You wrote that… all by yourself."',
    es: '(tose)… Guau. Escribiste eso… tú solo.',
    sub: 'Examen de A2 guardado (también está en el Menú). Habla otra vez con Leo.',
    say: 'All by yourself.',
  },
}

// Cierre de A2: Leo recupera la voz, el núcleo brilla sin llenarse, el susurro "Be brave. Use your voice." y la pregunta para B1.
NPC_TASKS['a2-13-close'] = {
  npc: 'a2-13-leo-hall',
  done: 'a2-13-close',
  outfit: 'voluntario-hospital',
  heal: true,
  steps: [
    { text: 'Can you hear me? My voice… it is back. Everybody is talking again.', es: '¿Me oyes? Mi voz… volvió. Todos están hablando otra vez.' },
    { text: 'You did it. The past, the present, the future… you remembered every word.', es: 'Lo lograste. El pasado, el presente, el futuro… recordaste cada palabra.' },
    { text: 'And that man said: "You had a voice… and you said nothing." What does that mean?', es: 'Y ese hombre dijo: "Tenías voz… y no dijiste nada". ¿Qué significa eso?' },
    { text: 'Look at your clock. The empty core is shining for the first time… but it is not full yet.', es: 'Mira tu reloj. El centro vacío brilla por primera vez… pero todavía no está lleno.' },
    {
      text: '(Suddenly, a very quiet, sad voice comes from the clock:) "Be brave. Use your voice."',
      es: '(De repente, una voz muy baja y triste sale del reloj:) "Sé valiente. Usa tu voz".',
      choice: { ask: 'Leo se queda pálido. ¿Qué le preguntas?', options: ["What's wrong, Leo? Have you heard that before?", "What's wrong, Leo? Did you heard that before?", "What wrong, Leo? Have you hear that before?"], answer: 0, tip: '¿Alguna vez antes? Have you heard…? (have + participio).' },
    },
    { text: 'Those words… they were on my birthday card. The card from "L".', es: 'Esas palabras… estaban en mi tarjeta de cumpleaños. La tarjeta de "L".' },
    { text: 'And that voice… it was sad. Very sad. Like the voice of the stranger.', es: 'Y esa voz… era triste. Muy triste. Como la voz del desconocido.' },
    { text: 'Who is L? And why does my throat hurt when the clock shines?', es: '¿Quién es L? ¿Y por qué me duele la garganta cuando brilla el reloj?' },
  ],
  reward: {
    text: 'Leo: "Who is L?"',
    es: '¿Quién es L?',
    sub: '¡A2 completado! Ganaste el chaleco de voluntario del hospital. El núcleo del reloj brilla, pero no está lleno. Las respuestas, en B1.',
    say: 'Who is L?',
  },
}

// ── Misión secundaria de A2 · Make a Wish (casa de Leo y jardín; escena y duelo en data/a2Party.ts) ──
// Cumpleaños sorpresa de la persona especial. Sin fragmento ni pistas nuevas de "L".
// Orden: Leo (lección wishes-conditional + práctica) → Maya (elegir con los invitados) → Leo en el jardín (plan B)
//        → señora García (¿cómo se conocieron?) → duelo con Maya → Leo (tarjeta) → la persona especial (¡sorpresa!).
NPC_TASKS['a2-s3-leo'] = {
  done: 'a2-s3-practice',
  lesson: 'wishes-conditional',
  activity: 'practice',
  practice: 'wishes-conditional',
  practiceIds: ['a2-s3-p1', 'a2-s3-p2', 'a2-s3-p3', 'a2-s3-p4', 'a2-s3-p5', 'a2-s3-p6', 'a2-s3-p7'],
  steps: [],
  reward: {
    text: 'Leo: "Perfect! The guests are in the garden. Ask Maya what everybody wants."',
    es: '¡Perfecto! Los invitados están en el jardín. Pregúntale a Maya qué quieren todos.',
    sub: 'Sal al jardín y habla con Maya.',
    say: 'Ask Maya what everybody wants.',
  },
}

// Elegir con los invitados (DebateTalk): would rather / would like / would prefer. No hay respuestas incorrectas.
NPC_TASKS['a2-s3-choices'] = {
  npc: 'a2-s3-maya',
  done: 'a2-s3-choices',
  activity: 'debate',
  requires: {
    id: 'a2-s3-practice',
    text: 'Maya: "Hi! Leo has the plan. Talk to him first."',
    es: '¡Hola! Leo tiene el plan. Habla primero con él.',
    sub: 'Leo está en la sala.',
  },
  debate: {
    title: 'Party Choices',
    ask: 'Ayuda a Maya a elegir: di qué prefieres y por qué.',
    turns: [
      {
        text: 'OK, party planner! Would you rather have the party in the garden or in the living room?',
        es: '¡Bien, organizador de fiestas! ¿Prefieres hacer la fiesta en el jardín o en la sala?',
        options: [
          { en: "I'd rather have it in the garden. It's a sunny day!", es: 'Prefiero hacerla en el jardín. ¡Es un día soleado!', value: 'good' },
          { en: 'The garden, I think.', es: 'El jardín, creo.', value: 'neutral' },
          { en: "I'd rather to have it in the garden.", es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'And what would you like to eat? Cake, pizza... or both?',
        es: '¿Y qué te gustaría comer? ¿Pastel, pizza... o las dos cosas?',
        options: [
          { en: "I'd like both! A birthday needs cake, and everybody likes pizza.", es: '¡Me gustarían las dos! Un cumpleaños necesita pastel, y a todos les gusta la pizza.', value: 'good' },
          { en: 'Anything is OK.', es: 'Cualquier cosa está bien.', value: 'neutral' },
          { en: 'I would like eat cake.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
      {
        text: 'Music or games? Leo wants to dance... but Leo dances very badly.',
        es: '¿Música o juegos? Leo quiere bailar... pero Leo baila muy mal.',
        options: [
          { en: "I'd prefer games. Everybody can play, even Leo!", es: 'Prefiero juegos. ¡Todos pueden jugar, hasta Leo!', value: 'good', reply: { text: 'Ha ha, yes! Games it is.', es: 'Ja, ja, ¡sí! Entonces, juegos.' } },
          { en: 'Both, maybe.', es: 'Las dos, quizás.', value: 'neutral', reply: { text: 'OK, a little music and some games.', es: 'Bueno, un poco de música y algunos juegos.' } },
          { en: 'I prefer would games.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'Sorry? Games? OK...', es: '¿Perdón? ¿Juegos? Bueno...' } },
        ],
      },
      {
        text: 'I really hope the surprise works. Do you think our friend will be happy?',
        es: 'De verdad espero que la sorpresa funcione. ¿Crees que la persona del cumpleaños estará feliz?',
        options: [
          { en: 'I hope so! I think it will be a great surprise.', es: '¡Eso espero! Creo que será una gran sorpresa.', value: 'good' },
          { en: 'Maybe.', es: 'Quizás.', value: 'neutral' },
          { en: 'I hope it will to be fun.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'Great choices! Now go and help Leo. He looks worried about the weather.', es: '¡Buenas elecciones! Ahora ve a ayudar a Leo. Se ve preocupado por el clima.' },
      mid: { text: 'OK, good. Go and help Leo now. He is looking at the sky.', es: 'Bien. Ve a ayudar a Leo ahora. Está mirando el cielo.' },
      low: { text: "Hmm... OK. Leo needs help. He's looking at the clouds.", es: 'Mmm... bueno. Leo necesita ayuda. Está mirando las nubes.' },
    },
  },
  steps: [],
  reward: {
    text: 'Maya: "Go and help Leo in the garden."',
    es: 'Ve a ayudar a Leo en el jardín.',
    sub: 'Leo está junto a la mesa del pastel.',
    say: 'Go and help Leo.',
  },
}

// Plan B (Sequence Master): una cadena de condiciones por si llueve
NPC_TASKS['a2-s3-plan-b'] = {
  npc: 'a2-s3-leo-garden',
  done: 'a2-s3-plan-b',
  activity: 'sequence',
  requires: {
    id: 'a2-s3-choices',
    text: 'Leo: "First, ask Maya what everybody wants."',
    es: 'Primero, pregúntale a Maya qué quieren todos.',
    sub: 'Maya está en el jardín.',
  },
  sequence: {
    title: 'Plan B: If it rains...',
    hint: 'Cada paso empieza con lo que dice el paso anterior: If it rains → we move inside → if we move inside...',
    intro: { en: "Look at those clouds! We need a plan B. Put the plan in order: each step starts where the last one ends.", es: '¡Mira esas nubes! Necesitamos un plan B. Ordena el plan: cada paso empieza donde termina el anterior.' },
    steps: [
      { en: "If it rains, we'll move the party inside.", es: 'Si llueve, pasaremos la fiesta adentro.' },
      { en: "If we move inside, we'll need more chairs.", es: 'Si pasamos adentro, necesitaremos más sillas.' },
      { en: "If we need more chairs, I'll bring them from the attic.", es: 'Si necesitamos más sillas, las traeré del ático.' },
      { en: "If I bring the chairs, you'll have time to decorate.", es: 'Si traigo las sillas, tendrás tiempo para decorar.' },
      { en: 'If you decorate, the living room will look great!', es: 'Si decoras, ¡la sala se verá genial!' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "Perfect plan! Now say hello to my mom. She wants to meet you."',
    es: '¡Plan perfecto! Ahora saluda a mi mamá. Quiere conocerte.',
    sub: 'Habla con la señora García en el jardín.',
    say: 'Say hello to my mom.',
  },
}

// ¿Cómo se conocieron? (DebateTalk, Busuu cap. 4): la señora García pregunta por la amistad con la persona especial
NPC_TASKS['a2-s3-meet'] = {
  npc: 'a2-s3-garcia',
  done: 'a2-s3-meet',
  activity: 'debate',
  requires: {
    id: 'a2-s3-plan-b',
    text: 'Mrs. Garcia: "Hello, dear! Leo needs help with the clouds. Talk to him first."',
    es: '¡Hola! Leo necesita ayuda con las nubes. Habla primero con él.',
    sub: 'Leo está junto a la mesa del pastel.',
  },
  debate: {
    title: 'How Did You Meet?',
    ask: 'Charla con la mamá de Leo: cuenta cómo conociste a la persona del cumpleaños.',
    turns: [
      {
        text: 'Thank you for helping Leo, dear. So, how did you and our birthday friend meet?',
        es: 'Gracias por ayudar a Leo. Entonces, ¿cómo se conocieron tú y la persona del cumpleaños?',
        options: [
          { en: 'We met at school. Then we became good friends.', es: 'Nos conocimos en la escuela. Luego nos hicimos muy buenos amigos.', value: 'good' },
          { en: 'At school.', es: 'En la escuela.', value: 'neutral' },
          { en: 'We meet at school.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'You MET at school? How nice!', es: '¿Se conocieron en la escuela? ¡Qué lindo!' } },
        ],
      },
      {
        text: 'How lovely! And did you get on well from the start?',
        es: '¡Qué bonito! ¿Y se llevaron bien desde el principio?',
        options: [
          { en: 'Yes, we did. We got on well from the first day.', es: 'Sí. Nos llevamos bien desde el primer día.', value: 'good' },
          { en: 'I think so.', es: 'Creo que sí.', value: 'neutral' },
          { en: 'Yes, we getted on well.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'You GOT on well? Good!', es: '¿Se llevaron bien? ¡Qué bueno!' } },
        ],
      },
      {
        text: "You know, Leo's father and I met at university. We got married five years later. Isn't that romantic?",
        es: 'Sabes, el papá de Leo y yo nos conocimos en la universidad. Nos casamos cinco años después. ¿No es romántico?',
        options: [
          { en: "Yes! That's a lovely story. Where did you meet at university?", es: '¡Sí! Es una historia preciosa. ¿Dónde se conocieron en la universidad?', value: 'good', reply: { text: 'In the library, of course! Like many good stories.', es: '¡En la biblioteca, claro! Como muchas buenas historias.' } },
          { en: "Yes, it's nice.", es: 'Sí, es lindo.', value: 'neutral' },
          { en: 'Where you met?', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'Where DID we meet? In the library.', es: '¿Dónde nos conocimos? En la biblioteca.' } },
        ],
      },
      {
        text: 'And what will you write on the birthday card?',
        es: '¿Y qué vas a escribir en la tarjeta de cumpleaños?',
        options: [
          { en: "I'll write: I hope you have a wonderful year.", es: 'Escribiré: Espero que tengas un año maravilloso.', value: 'good' },
          { en: 'Something nice.', es: 'Algo bonito.', value: 'neutral' },
          { en: 'I will to write a nice card.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'What a nice friendship. Oh! Maya wants to play a game with you.', es: 'Qué bonita amistad. ¡Oh! Maya quiere jugar contigo.' },
      mid: { text: 'Lovely. Oh, look, Maya is calling you.', es: 'Qué lindo. Oh, mira, Maya te está llamando.' },
      low: { text: 'Hmm, OK, dear. Maya is calling you.', es: 'Mmm, bueno. Maya te está llamando.' },
    },
  },
  steps: [],
  reward: {
    text: 'Mrs. Garcia: "Go on, play with Maya. The party isn\'t ready yet."',
    es: 'Anda, juega con Maya. La fiesta todavía no está lista.',
    sub: 'Maya te reta a un juego de preguntas en el jardín.',
    say: 'Go on, play with Maya.',
  },
}

// Tarjeta de deseos: escribir los deseos enteros (T-) en la tarjeta para la persona especial
NPC_TASKS['a2-s3-card'] = {
  npc: 'a2-s3-leo-garden',
  done: 'a2-s3-card',
  activity: 'practice',
  practice: 'wishes-conditional',
  practiceIds: ['a2-s3-w3', 'T-a2-s3-w1', 'T-a2-s3-w2'],
  requires: {
    id: 'a2-s3-maya-duel',
    text: 'Leo: "Maya wants to play a game with you. Go on, it\'s fun!"',
    es: 'Maya quiere jugar contigo. ¡Anda, es divertido!',
    sub: 'Gana el juego de preguntas de Maya.',
  },
  steps: [],
  reward: {
    text: 'Leo: "Beautiful card! Quick, hide! I can hear {iname} at the door!"',
    es: '¡Qué linda tarjeta! ¡Rápido, escóndete! ¡Oigo a {iname} en la puerta!',
    sub: '{iname} acaba de llegar al jardín. Ve a saludar.',
    say: 'Quick, hide!',
  },
}

// ¡Sorpresa! La persona especial llega: tarjeta, velas y deseos. Recompensa: ropa de fiesta (sin fragmento)
NPC_TASKS['a2-s3-close'] = {
  npc: 'a2-s3-interest',
  done: 'a2-s3-close',
  outfit: 'ropa-fiesta',
  steps: [
    { text: '(Everybody jumps out:) "SURPRISE! Happy birthday, {iname}!"', es: '(Todos salen de sus escondites:) "¡SORPRESA! ¡Feliz cumpleaños, {iname}!"' },
    {
      text: '{iname}: "A party? For me? I thought everybody forgot!"',
      es: '{iname}: "¿Una fiesta? ¿Para mí? ¡Creí que todos lo habían olvidado!"',
      choice: { ask: 'Le das la tarjeta. ¿Qué le dices?', options: ['Happy birthday! I hope you like the card.', 'Happy birthday! I hope you liking the card.', 'Happy birthday! I hope you to like the card.'], answer: 0, tip: 'I hope + you + verbo: you like.' },
    },
    { text: '{iname}: "\'I hope all your wishes come true. If you smile, the day will be perfect.\' This is so nice. Thank you!"', es: '{iname}: "\'Espero que se cumplan todos tus deseos. Si sonríes, el día será perfecto.\' Esto es muy lindo. ¡Gracias!"' },
    {
      text: 'Leo: "Now the candles! Close your eyes and make a wish!"',
      es: 'Leo: "¡Ahora las velas! ¡Cierra los ojos y pide un deseo!"',
      choice: { ask: '{iname} te pregunta: "What will happen if I tell you my wish?"', options: ["If you tell me, it won't come true!", "If you will tell me, it won't come true!", "If you tell me, it doesn't come true will!"], answer: 0, tip: "If + presente (tell), won't + verbo (won't come true)." },
    },
    { text: '{iname}: "OK, then it\'s a secret. But I can tell you one thing: I\'m very happy you are here."', es: '{iname}: "Bueno, entonces es un secreto. Pero te puedo decir una cosa: estoy muy feliz de que estés aquí."' },
  ],
  reward: {
    text: '{iname}: "This is the best birthday ever!"',
    es: '¡Este es el mejor cumpleaños de todos!',
    sub: 'Misión secundaria completada: Make a Wish. Ganaste la ropa de fiesta. Habla otra vez con {iname} en el jardín. Leo necesita ayuda para recoger la fiesta.',
    say: 'This is the best birthday ever!',
  },
}

// Después de la fiesta (opcional, Busuu cap. 14): Leo enseña las tareas de la casa, do / make y Present Perfect con tareas
NPC_TASKS['a2-s3-cleanup'] = {
  npc: 'a2-s3-leo-garden',
  done: 'a2-s3-cleanup',
  lesson: 'housework',
  activity: 'practice',
  practice: 'housework',
  practiceIds: ['a2-hw-p1', 'a2-hw-p2', 'a2-hw-p3', 'a2-hw-p4', 'a2-hw-p5', 'a2-hw-p6', 'a2-hw-p7'],
  requires: {
    id: 'a2-s3-close',
    text: 'Leo: "Shh! Not yet. The party isn\'t over!"',
    es: '¡Shh! Todavía no. ¡La fiesta no ha terminado!',
    sub: 'Termina la fiesta sorpresa.',
  },
  steps: [],
  reward: {
    text: 'Leo: "Great! Now ask my mom. She always knows whose turn it is."',
    es: '¡Genial! Ahora pregúntale a mi mamá. Ella siempre sabe a quién le toca.',
    sub: 'Habla con la señora García en el jardín.',
    say: 'Ask my mom.',
  },
}

// ¿A quién le toca? (DebateTalk): la señora García reparte las tareas. Recompensa: escudo
NPC_TASKS['a2-s3-chores'] = {
  npc: 'a2-s3-garcia',
  done: 'a2-s3-chores',
  activity: 'debate',
  shield: true,
  requires: {
    id: 'a2-s3-cleanup',
    text: 'Mrs. Garcia: "What a lovely party! Leo wants to tell you something."',
    es: '¡Qué fiesta tan bonita! Leo quiere decirte algo.',
    sub: 'Leo está junto a la mesa del pastel.',
  },
  debate: {
    title: 'Whose Turn Is It?',
    ask: 'Ayuda a la mamá de Leo a repartir las tareas: di qué has hecho y qué vas a hacer.',
    turns: [
      {
        text: "Thank you for helping, dear. Let's see... Have you done the dishes yet?",
        es: 'Gracias por ayudar. A ver... ¿Ya lavaste los platos?',
        options: [
          { en: "Yes, I've already done them. They're in the cupboard.", es: 'Sí, ya los lavé. Están en el armario.', value: 'good' },
          { en: 'Not yet, sorry.', es: 'Todavía no, perdón.', value: 'neutral', reply: { text: "That's OK. Do them after the garden.", es: 'Está bien. Lávalos después del jardín.' } },
          { en: "Yes, I've already made them.", es: '(Frase mal dicha).', value: 'bad', reply: { text: 'You MADE the dishes? Ha ha, you DID the dishes!', es: '¿Hiciste los platos? Ja, ja, ¡los lavaste! (do the dishes).' } },
        ],
      },
      {
        text: 'Leo has swept the garden, but the trash can is full. Whose turn is it to take out the trash?',
        es: 'Leo barrió el jardín, pero la caneca está llena. ¿A quién le toca sacar la basura?',
        options: [
          { en: "It's my turn. I'll take it out now.", es: 'Me toca a mí. La saco ahora.', value: 'good' },
          { en: "It's Leo's turn!", es: '¡Le toca a Leo!', value: 'neutral', reply: { text: 'Ha ha, poor Leo. OK, Leo, the trash!', es: 'Ja, ja, pobre Leo. ¡Bueno, Leo, la basura!' } },
          { en: "It's my turn to taking it out.", es: '(Frase mal dicha).', value: 'bad', reply: { text: 'Your turn TO TAKE it out. Thank you!', es: 'Te toca SACARLA (to take). ¡Gracias!' } },
        ],
      },
      {
        text: 'Oh no, Maya made a mess in the living room with the balloons. Can you give me a hand?',
        es: 'Ay no, Maya hizo un desorden en la sala con los globos. ¿Me das una mano?',
        options: [
          { en: "Of course! I'll tidy up the living room.", es: '¡Claro! Yo ordeno la sala.', value: 'good' },
          { en: 'OK, give me a minute.', es: 'Bueno, dame un minuto.', value: 'neutral' },
          { en: "Of course! I'll do up the living room.", es: '(Frase mal dicha).', value: 'bad', reply: { text: "You'll TIDY UP the living room? Thank you!", es: '¿Vas a ordenar (tidy up) la sala? ¡Gracias!' } },
        ],
      },
      {
        text: 'And what about you? What chores do you do at home?',
        es: '¿Y tú? ¿Qué tareas haces en tu casa?',
        options: [
          { en: 'I make my bed every day and I do the dishes after dinner.', es: 'Tiendo mi cama todos los días y lavo los platos después de la cena.', value: 'good' },
          { en: 'Not many, ha ha.', es: 'No muchas, ja, ja.', value: 'neutral', reply: { text: 'Ha ha, like Leo!', es: 'Ja, ja, ¡como Leo!' } },
          { en: 'I do my bed every day.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'You MAKE your bed. Very good!', es: 'Tiendes (make) tu cama. ¡Muy bien!' } },
        ],
      },
    ],
    endings: {
      high: { text: 'What a helpful friend! Here, take this. You deserve it.', es: '¡Qué gran ayuda! Toma esto. Te lo mereces.' },
      mid: { text: 'Thank you! Everything is clean now.', es: '¡Gracias! Ya todo está limpio.' },
      low: { text: 'OK... thank you anyway.', es: 'Bueno... gracias de todas formas.' },
    },
  },
  steps: [],
  reward: {
    text: 'Mrs. Garcia: "The house is clean, and the party was perfect. Thank you!"',
    es: 'La casa está limpia y la fiesta fue perfecta. ¡Gracias!',
    sub: 'Extra completado: recogiste la fiesta. Ganaste un escudo. En el repaso ya está el tema Tareas de la casa.',
    say: 'Thank you!',
  },
}

// ── Misión secundaria de A2 · Market Day (tienda de ropa y mercado; escena y duelo en data/a2Market.ts) ──
// Ropa, probarse ropa, precios, descuentos y devoluciones (Busuu caps. 19 y 20). Sin fragmento ni pistas nuevas de "L".
// Orden: Leo (lección clothes-shopping + práctica) → la persona especial (Fitting Room) → Nadia (devolución)
//        → duelo con Rita → la persona especial (cierre: monedas y tienda de atuendos).
NPC_TASKS['a2-s4-leo'] = {
  done: 'a2-s4-practice',
  lesson: 'clothes-shopping',
  activity: 'practice',
  practice: 'clothes-shopping',
  practiceIds: ['a2-s4-p1', 'a2-s4-p2', 'a2-s4-p3', 'a2-s4-p4', 'a2-s4-p5', 'a2-s4-p6', 'a2-s4-p7'],
  steps: [],
  reward: {
    text: 'Leo: "You\'re ready! Your friend is in the clothes shop. Good luck!"',
    es: '¡Estás listo! Tu acompañante está en la tienda de ropa. ¡Buena suerte!',
    sub: 'Entra a la tienda y habla con {iname}, junto a los percheros.',
    say: "You're ready!",
  },
}

// Fitting Room (Shopping Challenge + Smart Inventory): la lista de {iname} con 100 dólares. Con 0-1 errores, escudo
NPC_TASKS['a2-s4-fitting'] = {
  npc: 'a2-s4-interest',
  done: 'a2-s4-fitting',
  activity: 'fitting',
  coins: 20,
  requires: {
    id: 'a2-s4-practice',
    text: '{iname}: "Hi! Talk to Leo first. He knows all about sales!"',
    es: '¡Hola! Habla primero con Leo. ¡Sabe todo sobre rebajas!',
    sub: 'Leo está en la calle del mercado.',
  },
  steps: [],
  reward: {
    text: '{iname}: "A jacket, sneakers and jeans for exactly $100. Perfect!"',
    es: 'Una chaqueta, tenis y jeans por exactamente 100 dólares. ¡Perfecto!',
    sub: 'Ganaste 20 monedas. Ahora devuelve la camisa vieja: habla con Nadia en el mostrador.',
    say: 'Perfect!',
  },
}

// Devolución (DebateTalk): la camisa de la semana pasada es muy pequeña. No hay respuestas incorrectas
NPC_TASKS['a2-s4-return'] = {
  npc: 'a2-s4-nadia',
  done: 'a2-s4-return',
  activity: 'debate',
  coins: 10,
  requires: {
    id: 'a2-s4-fitting',
    text: 'Nadia: "Hello! Welcome to the sale. Your friend is waiting for you by the racks."',
    es: '¡Hola! Bienvenido a las rebajas. Tu acompañante te espera junto a los percheros.',
    sub: 'Habla con {iname} en la tienda.',
  },
  debate: {
    title: 'Returns',
    ask: 'Devuelve la camisa: explica el problema y pide lo que quieres.',
    turns: [
      {
        text: 'Hello again! How can I help you?',
        es: '¡Hola otra vez! ¿En qué puedo ayudarte?',
        options: [
          { en: "I bought this shirt here last week, but it's too small. I'd like to return it.", es: 'Compré esta camisa aquí la semana pasada, pero me queda muy pequeña. Quisiera devolverla.', value: 'good' },
          { en: 'This shirt. Small.', es: 'Esta camisa. Pequeña.', value: 'neutral' },
          { en: "I buyed this shirt and it's too much small.", es: '(Frase mal dicha).', value: 'bad', reply: { text: "Sorry? Oh, you bought this shirt... and it's too small?", es: '¿Perdón? Ah, compraste esta camisa... ¿y te queda pequeña?' } },
        ],
      },
      {
        text: 'No problem. Have you got the receipt?',
        es: 'No hay problema. ¿Tienes el recibo?',
        options: [
          { en: 'Yes, here it is.', es: 'Sí, aquí está.', value: 'good' },
          { en: 'Receipt... yes.', es: 'Recibo... sí.', value: 'neutral' },
          { en: 'Yes, here is it the recipe.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'The recipe? Ha ha, you mean the receipt. Thanks.', es: '¿La receta? Ja, ja, quieres decir el recibo. Gracias.' } },
        ],
      },
      {
        text: 'Would you like a refund or an exchange?',
        es: '¿Quieres que te devolvamos el dinero o prefieres cambiarla?',
        options: [
          { en: 'Can I exchange it for a bigger size, please? I really like the color.', es: '¿Puedo cambiarla por una talla más grande, por favor? Me gusta mucho el color.', value: 'good' },
          { en: 'Exchange, I think.', es: 'Cambio, creo.', value: 'neutral' },
          { en: 'Can I change it for a more big size?', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'A bigger size? OK, let me check.', es: '¿Una talla más grande? Bueno, déjame revisar.' } },
        ],
      },
      {
        text: "Here's a size L. Do you want to try it on?",
        es: 'Aquí tienes una talla L. ¿Quieres probártela?',
        options: [
          { en: 'Yes, please. ... It fits perfectly! Thank you for your help.', es: 'Sí, por favor. ... ¡Me queda perfecta! Gracias por tu ayuda.', value: 'good' },
          { en: "OK. It's good.", es: 'Bueno. Está bien.', value: 'neutral' },
          { en: 'Yes, I want try on it.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: "You're a great customer! Careful, here comes Rita. She loves sales.", es: '¡Eres un gran cliente! Cuidado, ahí viene Rita. Le encantan las rebajas.' },
      mid: { text: 'OK, all done. Oh... here comes Rita. Good luck!', es: 'Bueno, listo. Ah... ahí viene Rita. ¡Buena suerte!' },
      low: { text: 'Hmm... OK, here is your new shirt. Oh no, here comes Rita.', es: 'Mmm... bueno, aquí está tu camisa nueva. Ay no, ahí viene Rita.' },
    },
  },
  steps: [],
  reward: {
    text: 'Nadia: "Watch out! Rita wants the last red scarf on sale."',
    es: '¡Cuidado! Rita quiere la última bufanda roja en rebaja.',
    sub: 'Ganaste 10 monedas. Rita te espera junto al mostrador.',
    say: 'Watch out!',
  },
}

// Cierre: la persona especial y la bufanda de Rita. Recompensa: monedas y la tienda de atuendos (sin fragmento)
NPC_TASKS['a2-s4-close'] = {
  npc: 'a2-s4-interest',
  done: 'a2-s4-close',
  coins: 30,
  requires: {
    id: 'a2-s4-rita-duel',
    text: '{iname}: "Is that Rita? She wants the red scarf. Go and win it!"',
    es: '¿Esa es Rita? Quiere la bufanda roja. ¡Ve y gánala!',
    sub: 'Gana el duelo de Rita, junto al mostrador.',
  },
  steps: [
    { text: '{iname}: "You won the scarf! Rita is really funny."', es: '{iname}: "¡Ganaste la bufanda! Rita es muy divertida."' },
    {
      text: '{iname}: "Well? Show me your new clothes!"',
      es: '{iname}: "¿Y bien? ¡Muéstrame tu ropa nueva!"',
      choice: { ask: 'Te pones la chaqueta nueva. ¿Qué dices?', options: ["I'm wearing my new jacket. Does it suit me?", "I'm wear my new jacket. Does it suits me?", 'I wearing my new jacket. It suit me?'], answer: 0, tip: "Ahora mismo: I'm wearing. Pregunta: Does it suit me? (sin -s después de does)." },
    },
    { text: '{iname}: "Yes, it really suits you! And the scarf... is it for me? Oh, thank you!"', es: '{iname}: "¡Sí, te queda muy bien! Y la bufanda... ¿es para mí? ¡Ay, gracias!"' },
    {
      text: '{iname}: "Look, Nadia gives points to good customers. You can use them in the shop next time."',
      es: '{iname}: "Mira, Nadia da puntos a los buenos clientes. Puedes usarlos en la tienda la próxima vez."',
      choice: { ask: 'Nadia te da una tarjeta de puntos. ¿Qué le dices?', options: ['Thank you! How much is the black jacket with the points?', 'Thank you! How many is the black jacket with the points?', 'Thank you! How much are the black jacket with the points?'], answer: 0, tip: 'Una cosa: How much is…?' },
    },
    { text: 'Nadia: "Thirty-five points. Come back soon!"', es: 'Nadia: "Treinta y cinco puntos. ¡Vuelve pronto!"' },
  ],
  reward: {
    text: '{iname}: "Best shopping day ever!"',
    es: '¡El mejor día de compras de todos!',
    sub: 'Misión secundaria completada: Market Day. Ganaste 30 monedas. Se abrió la tienda: Mochila › Atuendos.',
    say: 'Best shopping day ever!',
  },
}

// ── Misión secundaria de A2 · A Dinner to Remember (casa de Leo; escena y duelo en data/a2Dinner.ts) ──
// Platos y sabores (cap. 18), much / many y cantidades, y conversación en la mesa con preguntas con how (cap. 27).
// Sin fragmento ni pistas nuevas de "L".
// Orden: Leo (lección food-dinner + práctica) → la señora García (The Memory Chest) → la persona especial (Enough for Everyone)
//        → el abuelo Joe (charla en la mesa) → duelo con Chef Bruno → la persona especial (cierre: delantal, sopa y monedas).
// Opcional: la Navidad colombiana con la señora García (The Memory Chest, escudo).
NPC_TASKS['a2-s5-leo'] = {
  done: 'a2-s5-practice',
  lesson: 'food-dinner',
  activity: 'practice',
  practice: 'food-dinner',
  practiceIds: ['a2-s5-p1', 'a2-s5-p2', 'a2-s5-p3', 'a2-s5-p4', 'a2-s5-p5', 'a2-s5-p6', 'a2-s5-p7'],
  steps: [],
  reward: {
    text: 'Leo: "Great! Now go to the kitchen. My mom is cooking a lot of food!"',
    es: '¡Genial! Ahora ve a la cocina. ¡Mi mamá está cocinando mucha comida!',
    sub: 'Habla con la señora García en la cocina.',
    say: 'Great!',
  },
}

// The Memory Chest · versión comida: cada plato con su sabor o su forma de cocinarlo
NPC_TASKS['a2-s5-taste'] = {
  npc: 'a2-s5-garcia',
  done: 'a2-s5-taste',
  activity: 'memory',
  requires: {
    id: 'a2-s5-practice',
    text: 'Mrs. Garcia: "Hello, dear! Talk to Leo first. He wants to teach you something."',
    es: '¡Hola, querido! Habla primero con Leo. Quiere enseñarte algo.',
    sub: 'Leo está en el comedor.',
  },
  memory: {
    title: 'Taste and Tell',
    intro: { en: "Help me with the menu! Match each dish with its description. Don't look at the recipes!", es: '¡Ayúdame con el menú! Une cada plato con su descripción. ¡No mires las recetas!' },
    pairs: [
      { a: 'lemonade', b: 'sour and cold', example: { en: 'The lemonade is sour and cold. Perfect for a hot night!', es: 'La limonada es ácida y fría. ¡Perfecta para una noche calurosa!' } },
      { a: 'chocolate cake', b: 'very sweet', example: { en: 'The chocolate cake is very sweet. Leo loves it.', es: 'El pastel de chocolate es muy dulce. A Leo le encanta.' } },
      { a: 'chicken', b: 'roasted in the oven', example: { en: 'The chicken is roasted in the oven for an hour.', es: 'El pollo se asa en el horno durante una hora.' } },
      { a: 'plantain', b: 'fried in oil', example: { en: 'The plantain is fried in oil. It is a little sweet.', es: 'El plátano se fríe en aceite. Es un poco dulce.' } },
      { a: 'hot sauce', b: 'too spicy for Leo', example: { en: 'The hot sauce is too spicy for Leo. He needs a lot of water!', es: 'La salsa picante es demasiado picante para Leo. ¡Necesita mucha agua!' } },
      { a: 'soup', b: 'a little salty', example: { en: 'The soup is a little salty. Grandpa Joe likes it that way.', es: 'La sopa está un poco salada. Al abuelo Joe le gusta así.' } },
    ],
  },
  steps: [],
  reward: {
    text: 'Mrs. Garcia: "The menu is perfect! Now, how many people are coming? Ask your friend."',
    es: '¡El menú está perfecto! Ahora, ¿cuántas personas vienen? Pregúntale a tu acompañante.',
    sub: 'Habla con {iname}, junto a la nevera de la cocina.',
    say: 'The menu is perfect!',
  },
}

// Opcional · Navidad colombiana: The Memory Chest con platos de diciembre. Da un escudo
NPC_TASKS['a2-s5-christmas'] = {
  npc: 'a2-s5-garcia',
  done: 'a2-s5-christmas',
  activity: 'memory',
  shield: true,
  requires: {
    id: 'a2-s5-taste',
    text: 'Mrs. Garcia: "First the menu, dear. Then I have a surprise."',
    es: 'Primero el menú, querido. Luego tengo una sorpresa.',
    sub: 'Termina el menú con la señora García.',
  },
  memory: {
    title: 'A Colombian Christmas',
    intro: { en: 'My friend from Colombia sent me her Christmas recipes! Match each dish with its description.', es: '¡Mi amiga de Colombia me envió sus recetas de Navidad! Une cada plato con su descripción.' },
    pairs: [
      { a: 'natilla', b: 'a sweet milk dessert', example: { en: 'Natilla is a sweet milk dessert with cinnamon.', es: 'La natilla es un postre dulce de leche con canela.' } },
      { a: 'buñuelos', b: 'fried cheese balls', example: { en: 'Buñuelos are fried cheese balls. People eat a lot of them in December.', es: 'Los buñuelos son bolitas de queso fritas. La gente come muchos en diciembre.' } },
      { a: 'tamales', b: 'cooked in banana leaves', example: { en: 'Tamales are cooked in banana leaves for many hours.', es: 'Los tamales se cocinan en hojas de plátano durante muchas horas.' } },
      { a: 'hot chocolate', b: 'with cheese inside', example: { en: 'In Colombia, people drink hot chocolate with a little cheese inside!', es: '¡En Colombia la gente toma chocolate caliente con un poco de queso adentro!' } },
      { a: 'ajiaco', b: 'a soup with three potatoes', example: { en: 'Ajiaco is a chicken soup with three kinds of potatoes.', es: 'El ajiaco es una sopa de pollo con tres clases de papa.' } },
    ],
  },
  steps: [],
  reward: {
    text: 'Mrs. Garcia: "Natilla and buñuelos... Next December, we\'ll make them together!"',
    es: 'Natilla y buñuelos... ¡El próximo diciembre los haremos juntos!',
    sub: 'Ganaste un escudo de palabras.',
    say: "Next December, we'll make them together!",
  },
}

// Enough for Everyone: cantidades para 6 invitados con How much / How many. Con 0-1 errores, escudo
NPC_TASKS['a2-s5-enough'] = {
  npc: 'a2-s5-interest',
  done: 'a2-s5-enough',
  activity: 'enough',
  coins: 20,
  requires: {
    id: 'a2-s5-taste',
    text: '{iname}: "Hi! Mrs. Garcia needs help with the menu first."',
    es: '¡Hola! Primero la señora García necesita ayuda con el menú.',
    sub: 'Habla con la señora García en la cocina.',
  },
  steps: [],
  reward: {
    text: '{iname}: "Six plates, enough rice and a lot of juice. We\'re ready!"',
    es: 'Seis platos, suficiente arroz y mucho jugo. ¡Estamos listos!',
    sub: 'Ganaste 20 monedas. Siéntate a la mesa: el abuelo Joe quiere conversar.',
    say: "We're ready!",
  },
}

// En la mesa (DebateTalk): preguntas con how del abuelo Joe. No hay respuestas incorrectas
NPC_TASKS['a2-s5-table'] = {
  npc: 'a2-s5-joe',
  done: 'a2-s5-table',
  activity: 'debate',
  coins: 10,
  requires: {
    id: 'a2-s5-enough',
    text: 'Grandpa Joe: "Is dinner ready? I\'m very hungry!"',
    es: '¿Ya está la cena? ¡Tengo mucha hambre!',
    sub: 'Ayuda a {iname} a preparar la mesa, en la cocina.',
  },
  debate: {
    title: 'At the table',
    ask: 'Conversa en la mesa: responde con educación y pregunta tú también.',
    turns: [
      {
        text: 'So, how was the soup?',
        es: 'Bueno, ¿qué tal estuvo la sopa?',
        options: [
          { en: "It was delicious, thank you! It was a little salty, but I like it that way.", es: '¡Estuvo deliciosa, gracias! Estaba un poco salada, pero así me gusta.', value: 'good' },
          { en: 'Good soup.', es: 'Buena sopa.', value: 'neutral' },
          { en: 'It is very delicious salty.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'Ha ha! Delicious and a bit salty? I agree.', es: '¡Ja, ja! ¿Deliciosa y un poco salada? Estoy de acuerdo.' } },
        ],
      },
      {
        text: 'Could you pass me the bread, please?',
        es: '¿Me pasas el pan, por favor?',
        options: [
          { en: 'Of course. Here you are. Would you like some butter too?', es: 'Claro. Aquí tienes. ¿Quieres mantequilla también?', value: 'good' },
          { en: 'Bread. Here.', es: 'Pan. Aquí.', value: 'neutral' },
          { en: 'Yes, take it the bread you.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'Er... thank you, I think.', es: 'Eh... gracias, creo.' } },
        ],
      },
      {
        text: 'Tell me, how often do you cook at home?',
        es: 'Cuéntame, ¿con qué frecuencia cocinas en casa?',
        options: [
          { en: 'Not very often. I cook on weekends. How often do you cook, Grandpa Joe?', es: 'No muy seguido. Cocino los fines de semana. ¿Y usted, abuelo Joe, con qué frecuencia cocina?', value: 'good' },
          { en: 'Sometimes.', es: 'A veces.', value: 'neutral' },
          { en: 'I cook how often weekends.', es: '(Frase mal dicha).', value: 'bad', reply: { text: 'On weekends? Good for you!', es: '¿Los fines de semana? ¡Bien por ti!' } },
        ],
      },
      {
        text: 'Me? Never! But I make the best arepas. Would you like some more chicken?',
        es: '¿Yo? ¡Nunca! Pero hago las mejores arepas. ¿Quieres un poco más de pollo?',
        options: [
          { en: "No, thank you. I'm full. But how do you make your arepas?", es: 'No, gracias. Estoy lleno. Pero ¿cómo prepara sus arepas?', value: 'good' },
          { en: 'No more.', es: 'No más.', value: 'neutral' },
          { en: 'No, I am very much full.', es: '(Frase mal dicha).', value: 'bad' },
        ],
      },
    ],
    endings: {
      high: { text: 'What a nice guest! Oh... someone is knocking at the door. It smells like trouble!', es: '¡Qué invitado tan amable! Ay... alguien toca la puerta. ¡Huele a problemas!' },
      mid: { text: 'Good, good. Oh... who is at the door?', es: 'Bien, bien. Ah... ¿quién está en la puerta?' },
      low: { text: 'Hmm... OK. Oh, look, someone is at the door.', es: 'Mmm... bueno. Ah, mira, alguien está en la puerta.' },
    },
  },
  steps: [],
  reward: {
    text: 'Grandpa Joe: "That\'s Chef Bruno, our neighbor. He always comes when he smells food!"',
    es: 'Es Chef Bruno, nuestro vecino. ¡Siempre viene cuando huele comida!',
    sub: 'Ganaste 10 monedas. Chef Bruno te espera en el comedor, junto al sofá.',
    say: 'He always comes when he smells food!',
  },
}

// Cierre: el postre de Chef Bruno y la sopa de la señora García. Recompensa: delantal, sopa de la abuela y monedas (sin fragmento)
NPC_TASKS['a2-s5-close'] = {
  npc: 'a2-s5-interest',
  done: 'a2-s5-close',
  coins: 30,
  soup: 1,
  outfit: 'delantal-chef',
  requires: {
    id: 'a2-s5-bruno-duel',
    text: '{iname}: "Chef Bruno wants to play a game. Go! I want dessert!"',
    es: 'Chef Bruno quiere jugar. ¡Ve! ¡Quiero postre!',
    sub: 'Gana el duelo de Chef Bruno, en el comedor.',
  },
  steps: [
    { text: '{iname}: "You won! And Chef Bruno made dessert for everybody."', es: '{iname}: "¡Ganaste! Y Chef Bruno hizo el postre para todos."' },
    {
      text: '{iname}: "Look! What is it?"',
      es: '{iname}: "¡Mira! ¿Qué es?"',
      choice: { ask: 'Chef Bruno trae un postre. ¿Cómo lo describes?', options: ["It's a chocolate cake. It's sweet, and there's a little cream on top.", "It's a cake of chocolate. It's sweet, and there's a few cream on top.", "It's chocolate cake. It sweet, and there are a little cream on top."], answer: 0, tip: 'a chocolate cake (el sabor antes) · cream es incontable: a little cream · there is.' },
    },
    { text: '{iname}: "Mmm! Thank you for bringing me. I love dinners with good friends."', es: '{iname}: "¡Mmm! Gracias por traerme. Me encantan las cenas con buenos amigos."' },
    {
      text: 'Mrs. Garcia: "Here, take some soup home. It\'s my mother\'s recipe."',
      es: 'Señora García: "Toma, llévate un poco de sopa a casa. Es la receta de mi mamá."',
      choice: { ask: 'La señora García te da sopa. ¿Qué le dices?', options: ['Thank you so much! How do you make it?', 'Thank you so much! How do you do it make?', 'Thank you so much! How you make it?'], answer: 0, tip: 'Preguntar la receta: How do you make it?' },
    },
    { text: 'Mrs. Garcia: "With a lot of love and a little salt. Come back soon!"', es: 'Señora García: "Con mucho amor y un poco de sal. ¡Vuelve pronto!"' },
  ],
  reward: {
    text: '{iname}: "A dinner to remember!"',
    es: '¡Una cena para recordar!',
    sub: 'Misión secundaria completada: A Dinner to Remember. Ganaste 30 monedas, el delantal de chef (Mochila › Atuendos) y una sopa de la abuela: en un combate, te llena la vida una vez.',
    say: 'A dinner to remember!',
  },
}

// ── B1 · Apertura (tu cuarto, la noche antes del viaje; escena en data/b1Home.ts) ──
// Ms. Haddad llama: te aceptaron en el intercambio de Lumen Bay. Al colgar, dos piezas del reloj se tocan.
// Al terminar se guarda B1_CALL; luego Explore muestra la animación FragmentJoin, que guarda B1_OPENING.
NPC_TASKS['b1-phone'] = {
  done: 'b1-00-call',
  steps: [
    { text: '(It is evening. Your phone is ringing. Unknown number.)', es: '(Es de noche. Suena tu teléfono. Número desconocido.)' },
    { text: 'Hello! Is that you? This is Noor Haddad, from the Lumen Bay Exchange Programme.', es: '¡Hola! ¿Eres tú? Habla Noor Haddad, del Programa de Intercambio de Lumen Bay.' },
    { text: 'I have great news. You have been accepted! Leo, Maya and {iname} have been accepted too.', es: 'Tengo muy buenas noticias. ¡Te aceptaron! A Leo, a Maya y a {iname} también.' },
    { text: 'Lumen Bay is a harbour city. People from all over the world live and study there. You will stay in a student residence.', es: 'Lumen Bay es una ciudad portuaria. Gente de todo el mundo vive y estudia allí. Te quedarás en una residencia de estudiantes.' },
    {
      text: "Your flight leaves tomorrow at nine. I'll meet you at the airport.",
      es: 'Tu vuelo sale mañana a las nueve. Te veré en el aeropuerto.',
      choice: { ask: '¿Qué le respondes?', options: ["That's wonderful! Thank you very much.", "That's wonderful! Thanks you very much.", 'That wonderful! Thank very much.'], answer: 0, tip: 'Para agradecer: Thank you (very much).' },
    },
    { text: 'See you tomorrow, then. Have a good night!', es: 'Entonces, hasta mañana. ¡Buenas noches!' },
    { text: '(You hang up. On your desk, the clock is glowing. The empty core shines... and your throat hurts.)', es: '(Cuelgas. En tu escritorio, el reloj brilla. El centro vacío resplandece... y te duele la garganta.)' },
    { text: '(Two pieces of the clock move by themselves... and touch each other.)', es: '(Dos piezas del reloj se mueven solas... y se tocan.)' },
  ],
  reward: {
    text: '(Two pieces of the clock are shining.)',
    es: '(Dos piezas del reloj brillan.)',
    sub: 'Dos fragmentos se juntaron.',
  },
}

// ── B1-01 · The Accident (recuerdo 1; escena y textos en data/b1Accident.ts) ──
// El amigo espera junto a la puerta. Al hablarle empieza la secuencia fija (components/CallForHelp.tsx, TheAccident):
// charla → alarma → Call for Help (5 rondas) → rescate. Al terminar se sale del recuerdo SIN cerrar la misión:
// el cierre (closeId(1)) llega al final del epílogo, en tu cuarto.
NPC_TASKS['b1-01-friend'] = {
  done: 'b1-01-rescue',
  activity: 'callforhelp',
  exitMemory: 1,
  steps: [],
  reward: { text: '(The memory fades.)', es: '(El recuerdo se desvanece.)', sub: 'Recuerdo 1 terminado.' },
}

// ── B1-01 · epílogo (tu cuarto, b1-home): despiertas con dolor de garganta y Leo te escribe (el teléfono, b1-01-leo-phone) ──
// Orden: mensaje a Leo → lección por mensajes (cause-effect) + práctica → Smoke Echo (esbirro, en el cuarto)
//        → Blurry Memory (Reconstruct) → cierre: done = closeId(1) (abre el nodo 2) y recupera cause-effect y emergencies.
NPC_TASKS['b1-01-message'] = {
  npc: 'b1-01-leo-phone',
  done: 'b1-01-message',
  steps: [
    {
      text: '(You grab your phone and write to Leo.)',
      es: '(Agarras tu teléfono y le escribes a Leo.)',
      choice: { ask: '¿Qué le escribes?', options: ['I saw a fire. A man lost his voice.', 'I seen a fire. A man lose his voice.', 'I was see a fire. A man lost voice.'], answer: 0, tip: 'Pasado de see: saw. Pasado de lose: lost.' },
    },
  ],
  reward: {
    text: '(Leo is typing...)',
    es: '(Leo está escribiendo...)',
    sub: 'Leo te está respondiendo. Toca otra vez el teléfono.',
  },
}

// Lección de Leo por mensajes (data/lessons.ts, 'cause-effect') y práctica guiada. Si todas están bien, escudo
NPC_TASKS['b1-01-practice'] = {
  npc: 'b1-01-leo-phone',
  done: 'b1-01-practice',
  lesson: 'cause-effect',
  phoneLesson: { mine: 'I saw a fire. A man lost his voice.' },
  activity: 'practice',
  practice: 'cause-effect',
  practiceIds: ['b1-01-p1', 'b1-01-p2', 'b1-01-p3', 'b1-01-p4', 'b1-01-p5', 'b1-01-p6', 'b1-01-p7', 'b1-01-p8'],
  practiceShield: true,
  steps: [],
  reward: {
    text: 'Leo: "Great job. Now try to sleep... Wait. Is that smoke in your room?"',
    es: 'Muy bien. Ahora intenta dormir... Espera. ¿Eso es humo en tu cuarto?',
    sub: 'Un eco de humo apareció en tu cuarto, junto al sofá. Véncelo. (Si acertaste todas, ganaste un escudo).',
    say: 'Is that smoke in your room?',
  },
}

// Blurry Memory (Reconstruct): Leo presenta el minijuego. Se abre al vencer al Smoke Echo
NPC_TASKS['b1-01-blurry'] = {
  npc: 'b1-01-leo-phone',
  done: 'b1-01-blurry',
  activity: 'reconstruct',
  requires: {
    id: 'b1-01-smoke-echo',
    text: 'Leo: "There\'s smoke in your room! Be careful!"',
    es: '¡Hay humo en tu cuarto! ¡Ten cuidado!',
    sub: 'Vence al Smoke Echo, junto al sofá.',
  },
  reconstruct: {
    title: 'Blurry Memory',
    intro: { en: "Your memory is blurry. Let's put the pieces together.", es: 'Tu recuerdo está borroso. Juntemos las piezas.' },
    items: [
      {
        source: 'Page 1 · The stairs',
        clue: { en: 'Fact: the stairs were full of smoke. Result: we used the fire exit.', es: 'Hecho: las escaleras estaban llenas de humo. Resultado: usamos la salida de emergencia.' },
        claim: { en: 'The stairs were full of smoke because we used the fire exit.', es: 'Las escaleras estaban llenas de humo porque usamos la salida de emergencia.' },
        options: ['The stairs were full of smoke, so we used the fire exit.', 'The stairs were full of smoke, so of we used the fire exit.', 'The stairs were full of smoke because of we used the fire exit.'],
        answer: 0,
        tip: 'El humo es la causa y usar la salida es el resultado: so.',
      },
      {
        source: 'Page 1 · The man',
        clue: { en: 'Fact: he lost his voice. Cause: the smoke.', es: 'Hecho: perdió la voz. Causa: el humo.' },
        claim: { en: 'He lost his voice so the smoke.', es: 'Perdió la voz así que el humo.' },
        options: ['He lost his voice because of the smoke.', 'He lost his voice because the smoke.', 'He lost his voice so of the smoke.'],
        answer: 0,
        tip: 'Causa + sustantivo: because of.',
      },
      {
        source: 'Page 2 · The teacher',
        clue: { en: "Fact: she couldn't speak. Cause: she shouted for an hour.", es: 'Hecho: no podía hablar. Causa: gritó durante una hora.' },
        claim: { en: "She couldn't speak because of she shouted for an hour.", es: 'No podía hablar a causa de gritó durante una hora.' },
        options: ["She couldn't speak because she shouted for an hour.", "She couldn't speak as a result of she shouted for an hour.", "She couldn't speak because of shouted for an hour."],
        answer: 0,
        tip: 'Después de la causa hay una oración completa (she shouted…): because.',
      },
      {
        mode: 'tap',
        wrongWord: 'arrive',
        source: 'Page 2 · The firefighters',
        clue: { en: 'Fact: the firefighters arrived while we were waiting outside.', es: 'Hecho: los bomberos llegaron mientras esperábamos afuera.' },
        claim: { en: 'The firefighters were arrive while we were waiting outside.', es: 'Los bomberos estaban llegar mientras esperábamos afuera.' },
        options: ['The firefighters arrived while we were waiting outside.', 'The firefighters arrived while we waiting outside.', 'The firefighters arrive while we were waiting outside.'],
        answer: 0,
        tip: 'El hecho corto va en past simple: arrived.',
      },
      {
        source: 'Page 3 · The end',
        clue: { en: 'Fact: the smoke was thick. Result: he lost his voice.', es: 'Hecho: el humo era espeso. Resultado: perdió la voz.' },
        claim: { en: 'The smoke was thick. As a result of, he lost his voice.', es: 'El humo era espeso. Como resultado de, perdió la voz.' },
        options: ['The smoke was thick. As a result, he lost his voice.', 'The smoke was thick. As a result of, he lost his voice.', 'The smoke was thick. As a result he lost of his voice.'],
        answer: 0,
        tip: "As a result, + oración nueva (con coma, sin 'of').",
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The pieces fit together now."',
    es: 'Ahora las piezas encajan.',
    sub: 'Recuerdo reconstruido. Toca otra vez el teléfono.',
    say: 'The pieces fit together now.',
  },
}

// Cierre de B1-01: tu línea del diario y Leo se despide. done = closeId(1): abre el nodo 2 (A New City).
// Misión sin jefe: los temas cause-effect y emergencies se recuperan aquí (recover)
NPC_TASKS['b1-01-close'] = {
  npc: 'b1-01-leo-phone',
  done: 'b1-01-close',
  recover: ['cause-effect', 'emergencies'],
  coins: 10,
  steps: [
    {
      text: '(You write in your diary:) "The man in the memory lost his voice. The friend next to him... didn\'t say a word."',
      es: '(Escribes en tu diario:) "El hombre del recuerdo perdió la voz. El amigo que estaba a su lado... no dijo ni una palabra."',
    },
    { text: "That's a lot to carry. Get some sleep. We have a plane to catch.", es: 'Es mucho para cargar. Duerme un poco. Tenemos un avión que tomar.' },
  ],
  reward: {
    text: 'Memory 1: The Accident',
    es: 'Recuerdo 1: El accidente',
    sub: "Ganaste el atuendo 'impermeable' y 10 monedas. Dos fragmentos se juntaron y te mostraron un recuerdo que no es tuyo. Mañana viajas a Lumen Bay.",
    say: 'Memory 1: The Accident',
  },
}

// ── B1-02 · A New City, bloque A (aeropuerto de Lumen Bay; escena en data/b1NewCity.ts) ──
// La charla del avión no es una tarea (Explore.tsx, quest 'b1-02-plane'). Leo, junto a la cinta (aparece al aterrizar):
// lección 'pp-yet-already' (data/lessons.ts) + práctica guiada. Si todas están bien, escudo. Aún NO cierra la misión (closeId(2)).
NPC_TASKS['b1-02-practice'] = {
  npc: 'b1-02-leo',
  done: 'b1-02-practice',
  lesson: 'pp-yet-already',
  activity: 'practice',
  practice: 'pp-yet-already',
  practiceIds: ['b1-02-p1', 'b1-02-p2', 'b1-02-p3', 'b1-02-p4', 'b1-02-p5', 'b1-02-p6', 'b1-02-p7', 'b1-02-p8'],
  practiceShield: true,
  steps: [],
  reward: {
    text: 'Leo: "Good! Now, let\'s see what\'s going on at the baggage claim..."',
    es: '¡Bien! Ahora veamos qué pasa en la zona de equipaje...',
    sub: 'Lección y práctica hechas. (Si acertaste todas, ganaste un escudo).',
    say: "Good! Now, let's see what's going on at the baggage claim...",
  },
}

// B1-02 · bloque B (data/b1Airport.ts): el empleado de Objetos Perdidos (aparece al vencer a la viajera 2) → Lost Luggage.
// Al terminar aparece Jack the Rival junto a las puertas de la derecha
NPC_TASKS['b1-02-luggage'] = {
  npc: 'b1-02-clerk',
  done: 'b1-02-luggage',
  activity: 'luggage',
  luggage: B1_LUGGAGE,
  steps: [],
  reward: {
    text: 'The clerk: "Welcome to Lumen Bay! Have a nice stay."',
    es: '¡Bienvenido a Lumen Bay! Disfruta tu estadía.',
    sub: 'Recuperaste tu maleta y la de tu amigo. Alguien te espera junto a las puertas de la derecha.',
    say: 'Welcome to Lumen Bay! Have a nice stay.',
  },
}

// ── B1-02 · bloque C (data/b1Office.ts): tienda de celulares → oficina (Ms. Haddad + Leo) → calle (Route Challenge) ──
// La tienda: el empleado presenta los planes (intro) y luego la práctica. s8 se dice en voz alta (S-) o, sin micrófono, se escribe (T-)
NPC_TASKS['b1-02-shop'] = {
  npc: 'b1-02-assistant',
  done: 'b1-02-shop',
  activity: 'practice',
  practice: 'travel-phones',
  practiceIds: ['b1-02-s1', 'b1-02-s2', 'b1-02-s3', 'b1-02-s4', 'b1-02-s5', 'b1-02-s6', 'b1-02-s7', canRecognize ? 'S-b1-02-s8' : 'T-b1-02-s8'],
  intro: [
    { text: 'Welcome! Are you looking for a phone plan?', es: '¡Bienvenidos! ¿Buscan un plan de celular?' },
    { text: "Listen carefully. I'll explain our two plans.", es: 'Escuchen con atención. Les voy a explicar nuestros dos planes.' },
  ],
  steps: [],
  reward: {
    text: 'The shop assistant: "Here is your SIM card. Welcome to Lumen Bay!"',
    es: 'Aquí tienes tu tarjeta SIM. ¡Bienvenido a Lumen Bay!',
    sub: 'La puerta de la oficina del intercambio ya está abierta.',
    say: 'Here is your SIM card. Welcome to Lumen Bay!',
  },
}

// La oficina: Ms. Haddad entrega la agenda (solo narrativa + una elección). Luego aparece Leo en la oficina
NPC_TASKS['b1-02-agenda'] = {
  npc: 'b1-02-haddad',
  done: 'b1-02-agenda',
  steps: [
    { text: "Welcome to the Lumen Bay Exchange Office! I'm Noor Haddad. We've been waiting for you.", es: '¡Bienvenidos a la Oficina de Intercambio de Lumen Bay! Soy Noor Haddad. Los estábamos esperando.' },
    { text: "Here is your agenda. Tomorrow at nine we're meeting here for the welcome talk.", es: 'Aquí está su agenda. Mañana a las nueve nos reunimos aquí para la charla de bienvenida.' },
    { text: "On Saturday we're going to visit the old port. And next week, you're going to start your classes.", es: 'El sábado vamos a visitar el puerto viejo. Y la próxima semana van a empezar sus clases.' },
    {
      text: "Your residence is across the city. Take the bus, or I'll call you a taxi if you prefer.",
      es: 'Su residencia está al otro lado de la ciudad. Tomen el bus, o les pido un taxi si prefieren.',
      choice: { ask: '¿Qué le respondes?', options: ["Thank you, Ms. Haddad. We'll take the bus.", 'Thank you, Ms. Haddad. We take will the bus.', "Thank you, Ms. Haddad. We're going bus."], answer: 0, tip: "Decisión en el momento: will + verbo base: We'll take the bus." },
    },
  ],
  reward: {
    text: 'Ms. Haddad: "Here is your agenda."',
    es: 'Aquí está su agenda.',
    sub: 'Tienes la agenda del intercambio. Leo te espera en la oficina.',
    say: 'Here is your agenda.',
  },
}

// Leo en la oficina: lección 'futures-b1' + práctica guiada. Si todas están bien, escudo. Abre la puerta de la calle
NPC_TASKS['b1-02-futures'] = {
  npc: 'b1-02-leo-office',
  done: 'b1-02-futures',
  lesson: 'futures-b1',
  activity: 'practice',
  practice: 'futures-b1',
  practiceIds: ['b1-02-f1', 'b1-02-f2', 'b1-02-f3', 'b1-02-f4', 'b1-02-f5', 'b1-02-f6', 'b1-02-f7', 'b1-02-f8'],
  practiceShield: true,
  steps: [],
  reward: {
    text: 'Leo: "Great! Now let\'s get to the residence. Ms. Haddad gave us a map."',
    es: '¡Muy bien! Ahora vamos a la residencia. La Sra. Haddad nos dio un mapa.',
    sub: 'La puerta de la calle ya está abierta. Leo te espera afuera. (Si acertaste todas, ganaste un escudo).',
    say: "Great! Now let's get to the residence. Ms. Haddad gave us a map.",
  },
}

// La calle: Leo abre Route Challenge con el contenido de Lumen Bay (data/b1Route.ts). Captain Delay llega en el bloque 2-D
NPC_TASKS['b1-02-route'] = {
  npc: 'b1-02-leo-street',
  done: 'b1-02-route',
  activity: 'route',
  route: B1_ROUTE,
  steps: [],
  reward: {
    text: 'Leo: "We\'re home! Well... almost. Did you hear that? The airport speakers are making a strange noise."',
    es: '¡Ya estamos! Bueno... casi. ¿Oíste eso? Los altavoces del aeropuerto hacen un ruido raro.',
    sub: 'Llegaste a la residencia.',
    say: "We're home! Well... almost. Did you hear that? The airport speakers are making a strange noise.",
  },
}

// ── B1-02 · bloque D: cierre (Leo en la calle, después de vencer a Captain Delay). done = closeId(2) = 'b1-02-close':
// abre el nodo 3 (recuerdo 3). Misión sin cierre del jefe: los tres temas se recuperan aquí (recover).
// Al guardarse, Explore muestra FragmentJoin (memoryNumber 3), como en la apertura de B1
NPC_TASKS['b1-02-close'] = {
  npc: 'b1-02-leo-street',
  done: 'b1-02-close',
  recover: ['pp-yet-already', 'futures-b1', 'travel-phones'],
  coins: 15,
  requires: {
    id: 'b1-02-boss',
    text: 'Leo: "We\'re home! Well... almost. Did you hear that? The airport speakers are making a strange noise."',
    es: '¡Ya estamos! Bueno... casi. ¿Oíste eso? Los altavoces del aeropuerto hacen un ruido raro.',
    sub: 'Vence a Captain Delay, al final de la calle.',
  },
  steps: [
    {
      text: "(You write in your diary:) 'Today I have arrived in Lumen Bay. I have already found my suitcase, and tomorrow we're meeting Ms. Haddad.'",
      es: '(Escribes en tu diario:) «Hoy he llegado a Lumen Bay. Ya encontré mi maleta, y mañana nos reunimos con la Sra. Haddad».',
    },
    { text: 'The announcements are normal again. What a day!', es: 'Los anuncios están normales otra vez. ¡Qué día!' },
    { text: "I... *cough* ... sorry. My throat feels strange. It's nothing. Maybe I'm allergic to airports. Ha!", es: 'Yo... *tos* ... perdón. Siento la garganta rara. No es nada. Quizá soy alérgico a los aeropuertos. ¡Ja!' },
    { text: '(Your clock is shining in your pocket. Two fragments move... and touch each other.)', es: '(Tu reloj brilla en el bolsillo. Dos fragmentos se mueven... y se tocan.)' },
  ],
  reward: {
    text: 'Mission 2: A New City',
    es: 'Misión 2: Una ciudad nueva',
    sub: 'Ganaste la gorra de capitán. Dos fragmentos se juntaron: se abrió el recuerdo 3.',
    say: 'A new city.',
  },
}

// ── B1 · DEMO de Inscriptions como tarea (tablilla en la sala de prueba de data/b1TabletDemo.ts, solo modo profesor) ──
// Las misiones 9, 11 y 13 declaran sus salas igual.
NPC_TASKS['b1-demo-tablet'] = {
  done: 'b1-demo-inscriptions',
  activity: 'inscriptions',
  inscriptions: INS_DEMO_DOOR,
  steps: [],
  reward: { text: '(The door is open.)', es: '(La puerta está abierta.)', sub: 'Sala de prueba de Inscriptions completada.' },
}

/** La tarea pendiente de un personaje: la primera que no ha terminado. blocked = le falta su requisito */
// ── B1-03 · Words on a Screen, bloque A (recuerdo 3; escena en data/b1Words.ts) ──
// La médica, junto a la cama: secuencia fija (L no habla, solo "…"). Al terminar se abre el camino al apartamento
NPC_TASKS['b1-03-doctor'] = {
  done: 'b1-03-doctor',
  activity: 'script',
  script: B1_03_DOCTOR_SCRIPT,
  steps: [],
  reward: {
    text: '(I go home. On the desk there is a notebook.)',
    es: '(Vuelvo a mi apartamento. En el escritorio hay un cuaderno.)',
    sub: 'El camino a tu apartamento está abierto. Lee el cuaderno del escritorio.',
  },
}

// El cuaderno del escritorio: página 1 del Cuaderno de L (lección 'informal-messages') + práctica. Si todas están bien, escudo.
// Al terminar, el teléfono del apartamento ya tiene mensajes (Text Only)
NPC_TASKS['b1-03-notebook'] = {
  npc: 'b1-03-notebook',
  done: 'b1-03-notebook',
  lesson: 'informal-messages',
  notebookPage: 1,
  activity: 'practice',
  practice: 'informal-messages',
  practiceIds: B1_03_PRACTICE1_IDS,
  practiceShield: true,
  requires: { id: 'b1-03-doctor', text: 'A notebook. The first page is empty.', es: 'Un cuaderno. La primera página está vacía.', sub: 'Primero habla con la médica.' },
  steps: [],
  reward: {
    text: '(Tomorrow, the messages begin.)',
    es: '(Mañana empiezan los mensajes.)',
    sub: 'Página 1 del cuaderno terminada. (Si acertaste todas, ganaste un escudo).',
    say: 'Tomorrow, the messages begin.',
  },
}

// ── B1-03 · bloque B: Text Only (el teléfono del apartamento) y la página 2 del cuaderno ──
// El teléfono: L narra y empieza Text Only (3 chats: la amiga, el director y un alumno; data/b1TextOnly.ts)
NPC_TASKS['b1-03-texts'] = {
  npc: 'b1-03-phone',
  done: 'b1-03-texts',
  activity: 'textonly',
  textOnly: B1_TEXT_ONLY,
  requires: { id: 'b1-03-notebook', text: 'My phone. No messages yet.', es: 'Mi teléfono. Todavía no hay mensajes.', sub: 'Primero lee el cuaderno del escritorio.' },
  steps: [{ text: '(My phone buzzes. A message from a friend.)', es: '(Mi teléfono vibra. Un mensaje de una amiga.)' }],
  reward: {
    text: 'Three conversations, three different voices. And I never said a word.',
    es: 'Tres conversaciones, tres voces distintas. Y nunca dije una palabra.',
    sub: 'Text Only terminado. El cuaderno del escritorio tiene una página nueva.',
  },
}

// El mismo cuaderno del escritorio, al terminar Text Only: página 2 (lección 'present-perfect-cont') + práctica.
// Si todas están bien, escudo. Al terminar aparece el primer Unread Message, junto al teléfono (data/b1Words.ts)
NPC_TASKS['b1-03-notebook2'] = {
  npc: 'b1-03-notebook',
  done: 'b1-03-notebook2',
  lesson: 'present-perfect-cont',
  notebookPage: 2,
  activity: 'practice',
  practice: 'present-perfect-cont',
  practiceIds: B1_03_PRACTICE2_IDS,
  practiceShield: true,
  requires: { id: 'b1-03-texts', text: '(Tomorrow, the messages begin.)', es: '(Mañana empiezan los mensajes.)', sub: 'Primero responde los mensajes del teléfono.' },
  steps: [],
  reward: {
    text: '(The messages keep coming. Something is wrong with them.)',
    es: '(Los mensajes siguen llegando. Algo anda mal con ellos.)',
    sub: 'Página 2 del cuaderno terminada. Un mensaje sin leer apareció junto al teléfono. (Si acertaste todas, ganaste un escudo).',
    say: 'The messages keep coming.',
  },
}

// ── B1-03 · bloque C: cierre (el mismo teléfono de Text Only vuelve a vibrar al vencer a The Static). L le responde a su amiga por mensaje.
// Recupera los dos temas y sale del recuerdo con el cierre: exitMemory 3 + closeMemory → closeId(3) (abre el nodo 4)
NPC_TASKS['b1-03-close'] = {
  npc: 'b1-03-phone',
  done: 'b1-03-close',
  requires: { id: 'b1-03-static', text: 'Three conversations, three different voices. And I never said a word.', es: 'Tres conversaciones, tres voces distintas. Y nunca dije una palabra.', sub: 'Primero calla el ruido: vence a The Static.' },
  activity: 'textonly',
  textOnly: B1_03_CLOSE_CHAT,
  recover: ['informal-messages', 'present-perfect-cont'],
  exitMemory: 3,
  closeMemory: true,
  steps: [{ text: "(The noise stops. My phone buzzes. It's her.)", es: '(El ruido se detiene. Mi teléfono vibra. Es ella.)' }],
  reward: {
    text: 'Memory 3: Words on a Screen',
    es: 'Recuerdo 3: Palabras en una pantalla',
    sub: 'Todos hablan. Él escribe. Despiertas en el presente con dolor de garganta.',
    say: 'Words on a screen.',
  },
}

// ── B1-04 · House Rules, bloque A (residencia de Lumen Bay; escena en data/b1Residence.ts) ──
// Marisol da la bienvenida (narrativa + una elección). Después aparece Maya en el vestíbulo
NPC_TASKS['b1-04-welcome'] = {
  npc: 'b1-04-marisol',
  done: 'b1-04-welcome',
  steps: [
    { text: "Welcome to the residence! I'm Marisol, the landlady. This is Moscú. She lives here, too.", es: '¡Bienvenidos a la residencia! Soy Marisol, la dueña. Ella es Moscú. También vive aquí.' },
    {
      text: 'Here are your keys and your contract. Please read the rules carefully.',
      es: 'Aquí están sus llaves y su contrato. Por favor, lean las reglas con atención.',
      choice: { ask: '¿Qué le respondes?', options: ["Thank you, Marisol. We'll read it now.", 'Thank you, Marisol. We read will it now.', "Thanks, Marisol. We reading it."], answer: 0, tip: "Decisión en el momento: will + verbo base: We'll read it now." },
    },
  ],
  reward: {
    text: 'Marisol: "Go and read the rules with your friend. I\'m here if you have questions."',
    es: 'Vayan a leer las reglas con su amiga. Estoy aquí si tienen preguntas.',
    sub: 'Tienes las llaves y el contrato. Maya te espera en el vestíbulo.',
    say: "Go and read the rules with your friend. I'm here if you have questions.",
  },
}

// Maya en el vestíbulo: lección 'obligation-b1' (Maya la guía) + práctica guiada. Si todas están bien, escudo
NPC_TASKS['b1-04-rules'] = {
  npc: 'b1-04-maya',
  done: 'b1-04-rules',
  lesson: 'obligation-b1',
  requires: { id: 'b1-04-welcome', text: 'Maya is waiting for you.', es: 'Maya te está esperando.', sub: 'Primero habla con Marisol.' },
  activity: 'practice',
  practice: 'obligation-b1',
  practiceIds: B1_04_PRACTICE1_IDS,
  practiceShield: true,
  steps: [],
  reward: {
    text: 'Maya: "Good! Now let\'s look at the contract. Look for the rules."',
    es: '¡Bien! Ahora miremos el contrato. Busquemos las reglas.',
    sub: 'Lección y práctica hechas. (Si acertaste todas, ganaste un escudo). Habla otra vez con Maya para leer el contrato.',
    say: "Good! Now let's look at the contract. Look for the rules.",
  },
}

// Maya: The Fine Print (components/FinePrint.tsx). Sin errores, escudo. Este bloque NO guarda closeId(4)
NPC_TASKS['b1-04-fineprint'] = {
  npc: 'b1-04-maya',
  done: 'b1-04-fineprint',
  requires: { id: 'b1-04-rules', text: 'Maya is waiting for you.', es: 'Maya te está esperando.', sub: 'Primero haz la lección de Maya.' },
  activity: 'fineprint',
  fineprint: B1_04_FINE_PRINT,
  steps: [],
  reward: {
    text: 'Maya: "That\'s a long contract! OK, let\'s meet the neighbours."',
    es: '¡Qué contrato tan largo! Bueno, conozcamos a los vecinos.',
    sub: 'Ya conoces las reglas de la casa. El pasillo se abre en el siguiente bloque. (Sin errores, ganaste un escudo).',
    say: "That's a long contract! OK, let's meet the neighbours.",
  },
}

// ── B1-04 · bloque B (data/b1Neighbours.ts): el pasillo se abre tras The Fine Print ──
// Jeison, el vecino amable (narrativa + una elección). Después aparecen los vecinos ruidosos en cadena
NPC_TASKS['b1-04-jeison'] = {
  npc: 'b1-04-jeison',
  done: 'b1-04-jeison',
  requires: { id: 'b1-04-fineprint', text: 'Jeison is busy.', es: 'Jeison está ocupado.', sub: 'Primero lee el contrato con Maya.' },
  steps: [
    { text: "Hi! I'm Jeison, your neighbour. Welcome to the corridor!", es: '¡Hola! Soy Jeison, su vecino. ¡Bienvenidos al pasillo!' },
    { text: "A little advice: Marisol is kind, but you mustn't make noise after ten. Some of our neighbours forget the rules.", es: 'Un consejo: Marisol es amable, pero no deben hacer ruido después de las diez. Algunos vecinos olvidan las reglas.' },
    {
      text: 'Oh, listen... that noise again. Please, talk to them.',
      es: 'Oh, escuchen... ese ruido otra vez. Por favor, hablen con ellos.',
      choice: { ask: '¿Qué le dices a Jeison?', options: ['Thanks! We must follow the rules, too.', 'Thanks! We must to follow the rules, too.', 'Thanks! We musts follow the rules too.'], answer: 0, tip: 'must + verbo base, sin to.' },
    },
  ],
  reward: {
    text: 'Jeison: "Good luck! My room is the first door, if you need anything."',
    es: '¡Suerte! Mi cuarto es la primera puerta, si necesitan algo.',
    sub: 'Los vecinos ruidosos están en el pasillo.',
    say: 'Good luck! My room is the first door, if you need anything.',
  },
}

// Tu cuarto (se abre al vencer a los dos vecinos): la caja de herramientas → Repair Shop escrito (data/b1Repair.ts).
// Antes del juego, dos líneas del narrador (intro). Con 0 o 1 errores, escudo. Este bloque NO guarda closeId(4)
NPC_TASKS['b1-04-repair'] = {
  npc: 'b1-04-toolbox',
  done: 'b1-04-repair',
  requires: { id: 'b1-04-neighbour2', text: 'Your room. It is too noisy to work.', es: 'Tu cuarto. Hay demasiado ruido para trabajar.', sub: 'Primero habla con los vecinos ruidosos.' },
  activity: 'command',
  command: B1_REPAIR,
  intro: [
    { text: "(Your room. It's cold and dark, and there's no wifi. There's a toolbox on the floor.)", es: '(Tu cuarto. Hace frío, está oscuro y no hay wifi. Hay una caja de herramientas en el piso.)' },
    { text: "(A note from Jeison is on the door: 'In English, small words change verbs: turn on, plug in, set up. Type the order!')", es: '(Hay una nota de Jeison en la puerta: «En inglés, las palabras pequeñas cambian los verbos: turn on, plug in, set up. ¡Escribe la orden!»)' },
  ],
  steps: [],
  reward: {
    text: '(Warm, bright and online. Now you need to open a bank account.)',
    es: '(Cálido, iluminado y con internet. Ahora toca abrir una cuenta en el banco.)',
    sub: 'Tu cuarto está listo. (Con 0 o 1 errores, ganaste un escudo). El banco se abre en el siguiente bloque.',
    say: 'Warm, bright and online. Now you need to open a bank account.',
  },
}

// ── B1-04 · bloque C: el banco (se abre al terminar el Repair Shop) ──
// Ricardo presenta la cuenta (intro con una elección) y luego la práctica de escucha. Si todas están bien, escudo
NPC_TASKS['b1-04-ricardo'] = {
  npc: 'b1-04-ricardo',
  done: 'b1-04-ricardo',
  requires: { id: 'b1-04-repair', text: 'The bank is closed.', es: 'El banco está cerrado.', sub: 'Primero arregla tu cuarto.' },
  activity: 'practice',
  practice: 'bank-phrasal',
  practiceIds: B1_04_BANK_IDS,
  practiceShield: true,
  intro: [
    {
      text: 'Good morning! Welcome to the bank. Are you here to open an account?',
      es: '¡Buenos días! Bienvenidos al banco. ¿Vienen a abrir una cuenta?',
      choice: { ask: '¿Qué le respondes?', options: ["Yes, please. We'd like to open a bank account.", "Yes, please. We'd like open a bank account.", 'Yes, please. We like to opening a bank account.'], answer: 0, tip: "We'd like to + verbo base." },
    },
    { text: 'Great. Listen carefully, because there are some documents you need.', es: 'Perfecto. Escuchen con atención, porque necesitan algunos documentos.' },
  ],
  steps: [],
  reward: {
    text: 'Ricardo: "Good. Now talk to your friend. She will explain a few words we use at the bank."',
    es: 'Bien. Ahora hablen con su amiga. Ella les explicará unas palabras que usamos en el banco.',
    sub: 'Práctica de escucha hecha. (Si acertaste todas, ganaste un escudo). Maya te espera en el banco.',
    say: 'Good. Now talk to your friend. She will explain a few words we use at the bank.',
  },
}

// Maya en el banco: lección 'bank-phrasal' (Maya la guía) + práctica. Al terminar, Ricardo entrega la tarjeta (outro)
// y llega el mensaje de Marisol: el gancho del jefe (bloque 4-D). Este bloque NO guarda closeId(4)
NPC_TASKS['b1-04-phrasal'] = {
  npc: 'b1-04-maya-bank',
  done: 'b1-04-phrasal',
  lesson: 'bank-phrasal',
  requires: { id: 'b1-04-ricardo', text: 'Maya is waiting for you.', es: 'Maya te está esperando.', sub: 'Primero habla con Ricardo.' },
  activity: 'practice',
  practice: 'bank-phrasal',
  practiceIds: B1_04_PRACTICE2_IDS,
  practiceShield: true,
  steps: [],
  outro: {
    npc: 'b1-04-ricardo',
    steps: [{ text: 'Perfect! Your account is open. Here is your debit card. Welcome to Lumen Bay!', es: '¡Perfecto! Su cuenta está abierta. Aquí tienen su tarjeta de débito. ¡Bienvenidos a Lumen Bay!' }],
  },
  reward: {
    text: "(Your phone buzzes. A message from Marisol: 'Please come to the residence. Something strange is happening with the contracts!')",
    es: '(Tu teléfono vibra. Un mensaje de Marisol: «Por favor vengan a la residencia. ¡Algo extraño pasa con los contratos!»)',
    sub: 'Tienes tu cuenta y tu tarjeta de débito. (Si acertaste todas, ganaste un escudo).',
    say: "Your phone buzzes. A message from Marisol: 'Please come to the residence. Something strange is happening with the contracts!'",
  },
}

// ── B1-04 · bloque D: cierre (Marisol en el vestíbulo, después de vencer a Mr. Fine Print y de la charla con Maya).
// done = closeId(4) = 'b1-04-close': abre el nodo 5 (recuerdo 5). Al guardarse, Explore muestra FragmentJoin (memoryNumber 5)
NPC_TASKS['b1-04-close'] = {
  npc: 'b1-04-marisol',
  done: 'b1-04-close',
  recover: ['obligation-b1', 'bank-phrasal'],
  coins: 20,
  requires: {
    id: 'b1-04-friend',
    text: 'Marisol: "Go and read the rules with your friend. I\'m here if you have questions."',
    es: 'Vayan a leer las reglas con su amiga. Estoy aquí si tienen preguntas.',
    sub: 'Antes, vence a Mr. Fine Print y habla con Maya en el vestíbulo.',
  },
  steps: [
    { text: "Thank you so much! I don't know what happened to that contract.", es: '¡Muchas gracias! No sé qué le pasó a ese contrato.' },
    { text: '(Moscú hides under the sofa. The clock in your pocket is shining.)', es: '(Moscú se esconde bajo el sofá. El reloj en tu bolsillo brilla.)' },
    { text: '(Two fragments move... and touch each other.)', es: '(Dos fragmentos se mueven... y se tocan.)' },
  ],
  reward: {
    text: 'Mission 4: House Rules',
    es: 'Misión 4: Reglas de la casa',
    sub: 'Ganaste el llavero de la residencia. Dos fragmentos se juntaron: se abrió el recuerdo 5.',
    say: 'House rules.',
  },
}

export function taskOf(npcId: string, opened: string[]): { id: string; task: NpcTask; blocked: boolean } | null {
  for (const [id, t] of Object.entries(NPC_TASKS)) {
    if ((t.npc ?? id) !== npcId || opened.includes(t.done)) continue
    return { id, task: t, blocked: !!t.requires && !opened.includes(t.requires.id) }
  }
  return null
}

/**
 * Misión del barrio: preparar la fiesta de Leo. Se pregunta "Have you got...?" a los vecinos.
 * owner = quién lo tiene (un personaje o un esbirro que hay que liberar antes).
 */
export type PartyItem = {
  id: string
  es: string
  question: string
  wrong: [string, string]
  owner: string
  yes: { text: string; es: string }
  no: { text: string; es: string }
}

export const PARTY_ITEMS: PartyItem[] = [
  {
    id: 'cake',
    es: 'el pastel',
    question: 'Have you got a cake?',
    wrong: ['Has you got a cake?', 'Do you have got a cake?'],
    owner: 'rojas',
    yes: { text: 'Yes, I have! I always make a cake on Sundays. Take it, and say happy birthday to Leo!', es: '¡Sí! Siempre hago un pastel los domingos. ¡Llévatelo y felicita a Leo!' },
    no: { text: "No, I haven't. Ask Maya's dad. He loves cooking!", es: 'No, no tengo. Pregúntale al papá de Maya. ¡Le encanta cocinar!' },
  },
  {
    id: 'balloons',
    es: 'los globos',
    question: 'Have you got any balloons?',
    wrong: ['Have you got a balloons?', 'Have you get any balloons?'],
    owner: 'lucy',
    yes: { text: 'Yes, I have! I have got ten balloons. Here you are!', es: '¡Sí! Tengo diez globos. ¡Aquí tienes!' },
    no: { text: "No, I haven't. The girl with orange hair in the park has got a lot of balloons.", es: 'No, no tengo. La niña de pelo naranja del parque tiene muchos globos.' },
  },
  {
    id: 'radio',
    es: 'la radio',
    question: 'Have you got a radio?',
    wrong: ['Has you got a radio?', 'Have you a radio got?'],
    owner: 'barrio-m3',
    yes: { text: 'A radio? Yes, I have. I love old music! Take it. Leo is a good boy.', es: '¿Una radio? Sí, tengo. ¡Me encanta la música vieja! Llévatela. Leo es un buen chico.' },
    no: { text: "No, I haven't. Mr. Hill has got an old radio... but he is very angry today.", es: 'No, no tengo. El señor Hill tiene una radio vieja... pero hoy está muy enojado.' },
  },
]

// ── B1-05 · Nothing Left, bloque A (recuerdo 5; escena en data/b1Flat.ts). Sin monedas. Este bloque NO guarda closeId(5) ──
// El director en la puerta: secuencia fija (L no habla). Al terminar se abre el cuaderno de la mesa
NPC_TASKS['b1-05-letter'] = {
  npc: 'b1-05-director',
  done: 'b1-05-letter',
  activity: 'script',
  script: B1_05_LETTER_SCRIPT,
  steps: [],
  reward: { text: '(You have lost your job.)', es: '(Perdiste tu trabajo.)', sub: 'Lee el cuaderno de la mesa.' },
}

// El cuaderno de la mesa: página 12 del Cuaderno de L (lección 'used-to') + práctica. Si todas están bien, escudo.
// Al terminar se abren el periódico y el computador
NPC_TASKS['b1-05-used-to'] = {
  npc: 'b1-05-notebook',
  done: 'b1-05-used-to',
  lesson: 'used-to',
  notebookPage: 12,
  activity: 'practice',
  practice: 'used-to',
  practiceIds: B1_05_PRACTICE_IDS,
  practiceShield: true,
  requires: { id: 'b1-05-letter', text: 'My notebook.', es: 'Mi cuaderno.', sub: 'Primero habla con el director.' },
  steps: [],
  reward: { text: 'I used to have a different life.', es: 'Yo solía tener otra vida.', sub: 'Página 12 del cuaderno terminada. Mira el periódico y el computador. (Si acertaste todas, ganaste un escudo).', say: 'I used to have a different life.' },
}

// El periódico y el computador: anuncios de empleo (components/FinePrint.tsx en modo anuncios). Sin errores, escudo.
// Al terminar, la puerta a la calle muestra "Próximamente: el banco (bloque 5-B)"
NPC_TASKS['b1-05-jobs'] = {
  npc: 'b1-05-papers',
  done: 'b1-05-jobs',
  activity: 'fineprint',
  fineprint: B1_05_JOB_ADS,
  requires: { id: 'b1-05-used-to', text: 'A newspaper and a computer.', es: 'Un periódico y un computador.', sub: 'Primero lee el cuaderno de la mesa.' },
  steps: [],
  reward: {
    text: "(Every ad asks for the same thing: 'excellent spoken communication'.)",
    es: "(Todos los anuncios piden lo mismo: 'excelente comunicación oral'.)",
    sub: 'Anuncios leídos. La puerta a la calle: próximamente, el banco (bloque 5-B).',
  },
}

// ── B1-05 · Nothing Left, bloque B (banco en data/b1Bank.ts; cuaderno y cajas en data/b1Flat.ts). Sin monedas. NO guarda closeId(5) ──
// El banquero: charla (L no habla) + práctica b1-05-k1…k4. Si todas están bien, escudo. Al terminar se abre la página 13
NPC_TASKS['b1-05-bank'] = {
  npc: 'b1-05-banker',
  done: 'b1-05-bank',
  activity: 'practice',
  practice: 'bank-phrasal',
  practiceIds: B1_05_BANK_IDS,
  practiceShield: true,
  intro: [
    { text: 'Good morning. How can I help you?', es: 'Buenos días. ¿En qué puedo ayudarle?' },
    { text: "(You show him the papers. You can't say a word.)", es: '(Le muestras los papeles. No puedes decir ni una palabra.)' },
    { text: "I'm sorry. We can't give you a loan. You don't have a job, and you have debts.", es: 'Lo siento. No podemos darle un préstamo. No tiene trabajo y tiene deudas.' },
    { text: '(You leave the bank. Nobody sees you cry.)', es: '(Sales del banco. Nadie te ve llorar.)' },
  ],
  steps: [],
  reward: {
    text: '(You leave the bank. Nobody sees you cry.)',
    es: '(Sales del banco. Nadie te ve llorar.)',
    sub: 'Práctica del banco hecha. (Si acertaste todas, ganaste un escudo). Vuelve al apartamento: el cuaderno tiene una página nueva.',
  },
}

// El mismo cuaderno de la mesa: página 13 (lección 'get-used-to') + práctica. Si todas están bien, escudo. Al terminar aparecen las cajas
NPC_TASKS['b1-05-get-used-to'] = {
  npc: 'b1-05-notebook',
  done: 'b1-05-get-used-to',
  lesson: 'get-used-to',
  notebookPage: 13,
  activity: 'practice',
  practice: 'get-used-to',
  practiceIds: B1_05_PRACTICE2_IDS,
  practiceShield: true,
  requires: { id: 'b1-05-bank', text: 'Page 12. I used to have a different life.', es: 'Página 12. Yo solía tener otra vida.', sub: 'Primero ve al banco.' },
  steps: [],
  reward: { text: "I'm getting used to it.", es: 'Me estoy acostumbrando.', sub: 'Página 13 del cuaderno terminada. Aparecieron las cajas. (Si acertaste todas, ganaste un escudo).', say: "I'm getting used to it." },
}

// Las cajas: Memory Chest (empacar el apartamento). Al terminar, la puerta muestra "Próximamente: el aviso de desalojo (bloque 5-C)"
NPC_TASKS['b1-05-chest'] = {
  npc: 'b1-05-boxes',
  done: 'b1-05-chest',
  activity: 'memory',
  memory: B1_05_PACKING,
  steps: [],
  reward: {
    text: '(The apartment is empty. Everything you used to do is in these boxes.)',
    es: '(El apartamento está vacío. Todo lo que solías hacer está en estas cajas.)',
    sub: 'Memory Chest terminado. Próximamente: el aviso de desalojo (bloque 5-C).',
  },
}

// ── B1-05 · Nothing Left, bloque C (data/b1Flat.ts). La carta bajo la puerta: secuencia fija con el vocabulario de dinero.
// Sin monedas ni práctica. Al terminar aparecen los 2 Eviction Notice. NO guarda closeId(5) ──
NPC_TASKS['b1-05-notice-letter'] = {
  npc: 'b1-05-envelope',
  done: 'b1-05-notice-letter',
  activity: 'script',
  script: B1_05_NOTICE_SCRIPT,
  steps: [],
  reward: { text: '(The paper moves. The ink is running. Two letters stand up.)', es: '(El papel se mueve. La tinta corre. Dos cartas se ponen de pie.)', sub: 'Vence a los dos avisos de desalojo.' },
}

// ── B1-05 · Nothing Left, bloque D: cierre (tu caja, aparece al vencer a The Collector). L sale a la calle y lee el mensaje de su amiga.
// Recupera los temas y sale del recuerdo con el cierre: exitMemory 5 + closeMemory → closeId(5) (abre el nodo 6, sin FragmentJoin) ──
NPC_TASKS['b1-05-close'] = {
  npc: 'b1-05-box',
  done: 'b1-05-close',
  activity: 'script',
  script: B1_05_CLOSE_SCRIPT,
  recover: ['used-to', 'get-used-to', 'jobs-b1'],
  coins: 20,
  exitMemory: 5,
  closeMemory: true,
  steps: [],
  reward: { text: 'Memory 5: Nothing Left', es: 'Recuerdo 5: Sin nada', sub: 'Recuperaste los temas de la misión. Se abrió la misión 6.', say: 'Stay with me.' },
}

// ── B1-06 · First Job, bloque A (refugio Lumen Paws; escena en data/b1Shelter.ts). NO guarda closeId(6) ──
// Ms. Haddad: lección 'work-english' (ella la guía) + práctica b1-06-w1…w8
NPC_TASKS['b1-06-advert'] = {
  npc: 'b1-06-haddad',
  done: 'b1-06-advert',
  lesson: 'work-english',
  activity: 'practice',
  practice: 'work-english',
  practiceIds: B1_06_PRACTICE_IDS,
  steps: [],
  reward: {
    text: 'Ms. Haddad: "Read the advert on the notice board. Then you can apply at the desk."',
    es: 'Lee el anuncio del tablón. Después puedes postularte en la mesa.',
    sub: 'Lección y práctica hechas. Ve al tablón de anuncios.',
    say: 'Read the advert on the notice board. Then you can apply at the desk.',
  },
}

// El tablón: el anuncio de empleo (components/FinePrint.tsx en modo anuncios) + preguntas b1-06-r1…r3
NPC_TASKS['b1-06-read'] = {
  npc: 'b1-06-board',
  done: 'b1-06-read',
  activity: 'fineprint',
  fineprint: B1_06_JOB_ADVERT,
  requires: { id: 'b1-06-advert', text: 'The notice board.', es: 'El tablón de anuncios.', sub: 'Primero habla con Ms. Haddad.' },
  steps: [],
  reward: {
    text: 'Now you know the job. Time to apply!',
    es: 'Ya conoces el trabajo. ¡Hora de postularte!',
    sub: 'Anuncio leído. Ve a la mesa de postulación.',
  },
}

// La mesa: Sequence Master "How to apply". Al terminar, Ms. Haddad habla y se dan 5 monedas.
// Después, la puerta de las jaulas lleva a Nayi y los perros (bloque 6-B, data/b1Kennels.ts)
NPC_TASKS['b1-06-apply'] = {
  npc: 'b1-06-desk',
  done: 'b1-06-apply',
  activity: 'sequence',
  requires: { id: 'b1-06-read', text: 'The application desk.', es: 'La mesa de postulación.', sub: 'Primero lee el anuncio del tablón.' },
  sequence: {
    title: 'How to apply',
    intro: { en: 'Put the steps in order.', es: 'Pon los pasos en orden.' },
    steps: [
      { en: 'Read the job advert.', es: 'Lee el anuncio de empleo.' },
      { en: 'Write your CV.', es: 'Escribe tu CV.' },
      { en: 'Send your application.', es: 'Envía tu postulación.' },
      { en: 'Go to the interview.', es: 'Ve a la entrevista.' },
      { en: 'Wait for the answer.', es: 'Espera la respuesta.' },
    ],
  },
  coins: 5,
  steps: [],
  reward: {
    text: 'Ms. Haddad: "Perfect! Now come and meet Nayi and the dogs."',
    es: '¡Perfecto! Ahora ven a conocer a Nayi y a los perros.',
    sub: 'Ganaste 5 monedas. La puerta del fondo lleva a las jaulas: Nayi te espera.',
    say: 'Perfect! Now come and meet Nayi and the dogs.',
  },
}

// ── B1-06 · First Job, bloque B (las jaulas; escena en data/b1Kennels.ts). NO guarda closeId(6) ──
// Nayi: lección 'relative-clauses' (ella la guía) + práctica b1-06-d1…d8
NPC_TASKS['b1-06-nayi'] = {
  npc: 'b1-06-nayi',
  done: 'b1-06-nayi',
  lesson: 'relative-clauses',
  activity: 'practice',
  practice: 'relative-clauses',
  practiceIds: B1_06_PRACTICE2_IDS,
  steps: [],
  reward: {
    text: 'Nayi: "Look at the order board. Can you find the right dogs?"',
    es: 'Mira el tablero de pedidos. ¿Puedes encontrar los perros correctos?',
    sub: 'Lección y práctica hechas. Ve al tablero de pedidos.',
    say: 'Look at the order board. Can you find the right dogs?',
  },
}

// El tablero de pedidos: Which Dog? (components/WhichDog.tsx). Al terminar, 5 monedas y Nayi habla.
// La puerta de la oficina muestra "Próximamente: la oficina de Esteban (bloque 6-C)"
NPC_TASKS['b1-06-dogs'] = {
  npc: 'b1-06-orders',
  done: 'b1-06-dogs',
  activity: 'whichdog',
  whichdog: B1_06_WHICH_DOG,
  requires: { id: 'b1-06-nayi', text: 'The order board.', es: 'El tablero de pedidos.', sub: 'Primero habla con Nayi.' },
  coins: 5,
  steps: [],
  reward: {
    text: 'Nayi: "Perfect! You know all the dogs now."',
    es: '¡Perfecto! Ya conoces a todos los perros.',
    sub: 'Ganaste 5 monedas. Próximamente: la oficina de Esteban (bloque 6-C).',
    say: 'Perfect! You know all the dogs now.',
  },
}
