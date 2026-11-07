import type { DiaryChapter } from './diary'
import { memoryFlag } from '../game/memory'
import { closeId } from './b1World'

/**
 * Diario de B1: un capítulo por recuerdo, que se abre al salir de él (memoryFlag(n), game/memory.ts).
 * Las misiones del presente (B1-02…) tienen su propio capítulo, sin página de L, que se abre al cerrarlas (closeId(n)).
 * Cada capítulo tiene tu página ("Mi diario": la línea que escribes en el cierre de la misión), la página del "Diario de L"
 * (kind 'L': letra a mano, tachones y firma con una mancha de tinta, nunca con nombre) y una página mezclada que junta
 * los dos puntos de vista (como la "Mezcla" de A1 y A2). En las páginas de L, ~~texto~~ se ve tachado.
 * Va aparte de DIARY para no cambiar el logro "Querido diario" de A1 y A2.
 */
export const B1_DIARY: DiaryChapter[] = [
  {
    id: 'b1-memory-1',
    title: 'Recuerdo 1: The Accident',
    unlock: memoryFlag(1),
    words: [
      { title: 'El incendio', words: [['fire', 'incendio, fuego'], ['smoke', 'humo'], ['flames', 'llamas'], ['heat', 'calor'], ['fire alarm', 'alarma de incendio'], ['fire exit', 'salida de emergencia'], ['firefighters', 'bomberos'], ['burn', 'quemar, arder']] },
      { title: 'El cuerpo después', words: [['cough', 'toser, tos'], ['breathe', 'respirar'], ['throat', 'garganta'], ['hoarse', 'ronco'], ['injured', 'herido'], ['hurt', 'lastimado; doler'], ['exhausted', 'agotado']] },
      { title: 'Pedir ayuda', words: [['call for help', 'pedir ayuda'], ['get out', 'salir'], ['trapped', 'atrapado'], ['rescue', 'rescatar, rescate'], ['shout', 'gritar']] },
    ],
    versions: [
      {
        id: 'b1-memory-1-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'What I saw',
        unlock: closeId(1),
        frame: 'Lo escribes esa noche en tu cuarto, todavía con dolor de garganta, después de hablar con Leo.',
        lines: [{ en: "The man in the memory [lost]p his voice. The friend next to him... [didn't say]p a word.", es: 'El hombre del recuerdo perdió la voz. El amigo que estaba a su lado... no dijo ni una palabra.' }],
        questions: [],
      },
      {
        id: 'b1-memory-1-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'Night',
        frame: 'Una página de un cuaderno ajeno, escrita a mano. No tiene nombre.',
        lines: [
          { en: 'I [shouted]p until I [had]p no voice.', es: 'Grité hasta quedarme sin voz.' },
          { en: '~~I can~~ And my friend... [was]p silent.', es: 'Y mi amigo... estaba en silencio.' },
        ],
        questions: [],
      },
      {
        id: 'b1-memory-1-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One night, two voices',
        unlock: closeId(1),
        frame: 'Juntas tu página y la de L: lo que viste en el recuerdo y lo que él escribió. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'The man in the memory [was cleaning]p the board when the fire alarm [rang]p.', es: 'El hombre del recuerdo estaba limpiando la pizarra cuando sonó la alarma de incendio.' },
          { en: 'He [shouted]p, so everybody [got]p out.', es: 'Él gritó, así que todos salieron.' },
          { en: "Because of the smoke, he [lost]p his voice, so he [couldn't ask]p for help.", es: 'Por el humo perdió la voz, así que no pudo pedir ayuda.' },
          { en: 'His friend [was standing]p next to him... but he [was]p silent.', es: 'Su amigo estaba a su lado... pero se quedó en silencio.' },
        ],
        questions: [
          { q: 'Why did the man lose his voice?', options: ['Because of the smoke.', 'Because of the alarm.', 'Because he was tired.'], answer: 0, tip: 'El diario dice: "Because of the smoke, he lost his voice".' },
          { q: 'What was the man doing when the alarm rang?', options: ['He was cleaning the board.', 'He was waiting at the door.', 'He was walking home.'], answer: 0, tip: 'El diario dice: "was cleaning the board when the fire alarm rang".' },
          { q: 'Did his friend help him?', options: ["No, he didn't. He was silent.", 'Yes, he did. He shouted too.', "No, he wasn't. He was silent."], answer: 0, tip: 'Pregunta con did → respuesta con did: No, he didn\'t.' },
        ],
      },
    ],
  },
  // B1-02 · A New City (presente): sin página de L. Se abre al cerrar la misión 2
  {
    id: 'b1-mission-2',
    title: 'Misión 2: A New City',
    unlock: closeId(2),
    words: [
      { title: 'Viaje', words: [['check in', 'registrarse'], ['boarding pass', 'pase de abordar'], ['departure', 'salida'], ['arrival', 'llegada'], ['delay', 'retraso'], ['luggage', 'equipaje'], ['suitcase', 'maleta'], ['baggage claim', 'recogida de equipaje']] },
      { title: 'Celular', words: [['data plan', 'plan de datos'], ['prepaid', 'prepago'], ['contract', 'contrato'], ['coverage', 'cobertura'], ['top up', 'recargar'], ['signal', 'señal'], ['SIM card', 'tarjeta SIM'], ['unlimited', 'ilimitado']] },
      { title: 'Ciudad', words: [['downtown', 'centro de la ciudad'], ['harbour', 'puerto'], ['residence', 'residencia'], ['sightseeing', 'turismo'], ['backpacking', 'viaje con mochila'], ['package holiday', 'viaje todo incluido']] },
    ],
    versions: [
      {
        id: 'b1-mission-2-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'My first day',
        unlock: closeId(2),
        frame: 'Lo escribes esa noche en la residencia.',
        lines: [
          { en: "I [have just arrived]n in Lumen Bay. I [haven't unpacked]n yet, but I [have already found]n my suitcase.", es: 'Acabo de llegar a Lumen Bay. Todavía no he desempacado, pero ya encontré mi maleta.' },
          { en: 'Tomorrow we [are meeting]f Ms. Haddad at nine.', es: 'Mañana nos reunimos con la Sra. Haddad a las nueve.' },
          { en: 'On Saturday we [are going to visit]f the old port.', es: 'El sábado vamos a visitar el puerto viejo.' },
        ],
        questions: [],
      },
      {
        id: 'b1-mission-2-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A day in Lumen Bay',
        unlock: closeId(2),
        frame: 'Tu día entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'This morning we [landed]p in Lumen Bay. We [have already found]n our suitcases, and we [have just bought]n a SIM card.', es: 'Esta mañana aterrizamos en Lumen Bay. Ya encontramos nuestras maletas y acabamos de comprar una tarjeta SIM.' },
          { en: 'Tomorrow we [are meeting]f Ms. Haddad, and on Saturday we [are going to visit]f the old port.', es: 'Mañana nos reunimos con la Sra. Haddad y el sábado vamos a visitar el puerto viejo.' },
        ],
        questions: [
          { q: 'What have they already found?', options: ['Their suitcases.', 'Their tickets.', 'Their passports.'], answer: 0, tip: 'El diario dice: "We have already found our suitcases".' },
          { q: 'What are they going to do on Saturday?', options: ['Visit the old port.', 'Start classes.', 'Buy a SIM card.'], answer: 0, tip: 'El diario dice: "on Saturday we are going to visit the old port".' },
          { q: 'When are they meeting Ms. Haddad?', options: ['Tomorrow.', 'On Saturday.', 'Next week.'], answer: 0, tip: 'El diario dice: "Tomorrow we are meeting Ms. Haddad".' },
        ],
      },
    ],
  },
  // B1-03 · Words on a Screen (recuerdo 3). Se abre al cerrar la misión (closeId(3), al salir del recuerdo)
  {
    id: 'b1-memory-3',
    title: 'Recuerdo 3: Words on a Screen',
    unlock: closeId(3),
    words: [
      { title: 'Mensajes', words: [['text', 'mensaje de texto, escribir'], ['reply', 'responder'], ['DM', 'mensaje directo'], ['voice note', 'nota de voz'], ['read receipt', 'confirmación de lectura'], ['typing', 'escribiendo'], ['ping', 'avisar con un mensaje rápido']] },
      { title: 'Salud mental', words: [['stressed', 'estresado'], ['overwhelmed', 'abrumado'], ['anxious', 'ansioso'], ['unwind', 'relajarse'], ['take a break', 'tomar un descanso'], ['recover', 'recuperarse']] },
      { title: 'Expresiones con time', words: [['take your time', 'tómate tu tiempo'], ['run out of time', 'quedarse sin tiempo'], ['have a hard time', 'pasarla mal']] },
    ],
    versions: [
      {
        id: 'b1-memory-3-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'What I saw',
        unlock: closeId(3),
        frame: 'Lo escribes al despertar, todavía con dolor de garganta.',
        lines: [{ en: "The man in the memory [couldn't speak]p. He [has been writing]n every day: to his friend, to his director, to his students.", es: 'El hombre del recuerdo no podía hablar. Ha estado escribiendo todos los días: a su amiga, a su director y a sus alumnos.' }],
        questions: [],
      },
      {
        id: 'b1-memory-3-l',
        kind: 'L',
        tense: 'n',
        tab: 'Diario de L',
        title: 'Everybody talks. I type.',
        frame: 'Una página de un cuaderno ajeno, escrita a mano. No tiene nombre.',
        lines: [
          { en: 'Everybody [talks]n. I [type]n.', es: 'Todos hablan. Yo escribo.' },
          { en: 'I [have been writing]n for fifteen days. ~~I can~~ My thumbs [are]n tired.', es: 'Llevo quince días escribiendo. Mis pulgares están cansados.' },
          { en: "My friend [has been texting]n me every day. ~~I don't~~ I [don't answer]n much.", es: 'Mi amiga me escribe todos los días. Yo no contesto mucho.' },
        ],
        questions: [],
      },
      {
        id: 'b1-memory-3-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'Three voices, one silence',
        unlock: closeId(3),
        frame: 'Juntas tu página y la de L. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: "The man [has been writing]n messages for weeks, but he [can't speak]n.", es: 'El hombre lleva semanas escribiendo mensajes, pero no puede hablar.' },
          { en: "Last night he [wrote]p to his friend: 'I've been trying to speak every day. Nothing.'", es: 'Anoche le escribió a su amiga: «Llevo intentando hablar todos los días. Nada».' },
          { en: 'He [writes]n to a friend in a casual way and to his director in a formal way.', es: 'Le escribe a una amiga de forma informal y a su director de forma formal.' },
        ],
        questions: [
          { q: 'How long has the man been writing messages?', options: ['For weeks.', 'Since Monday.', 'For one day.'], answer: 0, tip: 'El diario dice: "has been writing messages for weeks".' },
          { q: 'Who does he write to in a formal way?', options: ['His director.', 'His friend.', 'His student.'], answer: 0, tip: 'El diario dice: "to his director in a formal way".' },
          { q: 'What did he write to his friend last night?', options: ["I've been trying to speak every day. Nothing.", "I'm fine, thanks.", 'I will come tomorrow.'], answer: 0, tip: 'Anoche escribió: "I\'ve been trying to speak every day. Nothing."' },
        ],
      },
    ],
  },
]
