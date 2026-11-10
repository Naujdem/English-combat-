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
          { q: 'What was the man doing when the alarm rang?', options: ['He was waiting at the door.', 'He was cleaning the board.', 'He was walking home.'], answer: 1, tip: 'El diario dice: "was cleaning the board when the fire alarm rang".' },
          { q: 'Did his friend help him?', options: ['Yes, he did. He shouted too.', "No, he wasn't. He was silent.", "No, he didn't. He was silent."], answer: 2, tip: 'Pregunta con did → respuesta con did: No, he didn\'t.' },
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
          { q: 'What have they already found?', options: ['Their tickets.', 'Their suitcases.', 'Their passports.'], answer: 1, tip: 'El diario dice: "We have already found our suitcases".' },
          { q: 'What are they going to do on Saturday?', options: ['Visit the old port.', 'Start classes.', 'Buy a SIM card.'], answer: 0, tip: 'El diario dice: "on Saturday we are going to visit the old port".' },
          { q: 'When are they meeting Ms. Haddad?', options: ['On Saturday.', 'Next week.', 'Tomorrow.'], answer: 2, tip: 'El diario dice: "Tomorrow we are meeting Ms. Haddad".' },
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
          { q: 'Who does he write to in a formal way?', options: ['His friend.', 'His director.', 'His student.'], answer: 1, tip: 'El diario dice: "to his director in a formal way".' },
          { q: 'What did he write to his friend last night?', options: ["I'm fine, thanks.", 'I will come tomorrow.', "I've been trying to speak every day. Nothing."], answer: 2, tip: 'Anoche escribió: "I\'ve been trying to speak every day. Nothing."' },
        ],
      },
    ],
  },
  // B1-04 · House Rules (presente). Se abre al cerrar la misión (closeId(4)). Sin página del Diario de L
  {
    id: 'b1-mission-4',
    title: 'Misión 4: House Rules',
    unlock: closeId(4),
    words: [
      // 'contract' ya está en la misión 2 (Celular)
      { title: 'Alquiler', words: [['rent', 'alquiler'], ['deposit', 'depósito'], ['landlord / landlady', 'dueño / dueña'], ['tenant', 'inquilino'], ['bills included', 'cuentas incluidas']] },
      { title: 'Banco', words: [['bank account', 'cuenta bancaria'], ['debit card', 'tarjeta de débito'], ['PIN', 'clave'], ['withdraw', 'retirar'], ['transfer', 'transferir'], ['statement', 'extracto']] },
      { title: 'Phrasal verbs', words: [['fill in', 'llenar (un formulario)'], ['set up', 'instalar, configurar'], ['sign up', 'inscribirse'], ['pay in', 'ingresar dinero'], ['take out', 'sacar'], ['turn on', 'encender'], ['plug in', 'enchufar']] },
    ],
    versions: [
      {
        id: 'b1-mission-4-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'My first week',
        unlock: closeId(4),
        frame: 'Lo escribes el domingo, en tu cuarto ya arreglado.',
        lines: [
          { en: 'This week I [have signed]n my first contract and I [have opened]n a bank account.', es: 'Esta semana firmé mi primer contrato y abrí una cuenta bancaria.' },
          { en: "I [have to]n pay the rent by the 5th, and I [mustn't]n make noise after ten.", es: 'Tengo que pagar el alquiler antes del 5 y no debo hacer ruido después de las diez.' },
          { en: "I [don't have to]n clean the kitchen. Marisol does it!", es: 'No tengo que limpiar la cocina. ¡Marisol lo hace!' },
        ],
        questions: [],
      },
      {
        id: 'b1-mission-4-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The rules of the house',
        unlock: closeId(4),
        frame: 'Tu semana entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Marisol [gave]p us the contract on Monday, and we [read]p it together.', es: 'Marisol nos dio el contrato el lunes y lo leímos juntos.' },
          { en: "We [have to]n pay by the 5th. We [mustn't]n smoke in the rooms.", es: 'Tenemos que pagar antes del 5. No debemos fumar en los cuartos.' },
          { en: "Marisol [cleans]n the kitchen, so we [don't have to]n do it.", es: 'Marisol limpia la cocina, así que no tenemos que hacerlo.' },
        ],
        questions: [
          { q: 'What do they have to do by the 5th?', options: ['Clean the kitchen.', 'Pay the rent.', 'Open a bank account.'], answer: 1, tip: 'El diario dice: "We have to pay by the 5th".' },
          { q: "What mustn't they do in the rooms?", options: ['Smoke.', 'Sleep.', 'Read.'], answer: 0, tip: 'El diario dice: "We mustn\'t smoke in the rooms".' },
          { q: 'Who cleans the kitchen?', options: ['Maya.', 'The neighbours.', 'Marisol.'], answer: 2, tip: 'El diario dice: "Marisol cleans the kitchen".' },
        ],
      },
    ],
  },
  // B1-05 · Nothing Left (recuerdo). Se abre al cerrar la misión (closeId(5)). Con página del Diario de L
  {
    id: 'b1-mission-5',
    title: 'Misión 5: Nothing Left',
    unlock: closeId(5),
    words: [
      { title: 'Dinero y desalojo', words: [['evict', 'desalojar'], ['owe', 'deber (dinero)'], ['debt', 'deuda'], ['loan', 'préstamo'], ['savings', 'ahorros'], ['pay back', 'devolver (dinero)']] },
      { title: 'Empleo', words: [['job advert', 'anuncio de empleo'], ['requirements', 'requisitos'], ['apply', 'postularse'], ['unemployed', 'desempleado'], ['fired', 'despedido']] },
    ],
    versions: [
      {
        id: 'b1-mission-5-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'What I used to have',
        unlock: closeId(5),
        frame: 'Una página de L, escrita en la calle, con su caja al lado.',
        lines: [
          { en: 'I [used to have]p a voice, a job and a home.', es: 'Yo solía tener una voz, un trabajo y un hogar.' },
          { en: 'I [used to sing]p in the car. I [used to teach]p five classes a day.', es: 'Yo solía cantar en el carro. Yo solía dar cinco clases al día.' },
          { en: 'Now I [am not used]n to the silence, but I [am getting used]n to it.', es: 'Ahora no estoy acostumbrado al silencio, pero me estoy acostumbrando.' },
          { en: "A friend [wrote]p to me: 'Stay with me, L.' I [did not answer]p.", es: "Una amiga me escribió: 'Quédate conmigo, L'. No contesté." },
        ],
        questions: [
          { q: 'What did L use to do in the car?', options: ['Sing.', 'Sleep.', 'Read.'], answer: 0, tip: 'La página dice: "I used to sing in the car".' },
          { q: 'Who wrote to L?', options: ['The director.', 'A friend.', 'The bank.'], answer: 1, tip: 'La página dice: "A friend wrote to me".' },
        ],
      },
      {
        id: 'b1-mission-5-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'Then and now',
        unlock: closeId(5),
        frame: 'Antes y ahora, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'L [used to teach]p five classes a day. Now he [has]n no job.', es: 'L solía dar cinco clases al día. Ahora no tiene trabajo.' },
          { en: 'He [is getting used]n to the silence, but it [is]n not easy.', es: 'Se está acostumbrando al silencio, pero no es fácil.' },
          { en: 'Tomorrow he [will look]f for a new job.', es: 'Mañana buscará un nuevo trabajo.' },
        ],
        questions: [
          { q: 'What did L use to do?', options: ['Sell books.', 'Work at a bank.', 'Teach five classes a day.'], answer: 2, tip: 'El diario dice: "used to teach five classes a day".' },
          { q: 'What will he do tomorrow?', options: ['Sing in the car.', 'Look for a new job.', 'Pay back the loan.'], answer: 1, tip: 'El diario dice: "will look for a new job".' },
        ],
      },
    ],
  },
  // B1-06 · First Job (presente). Se abre al cerrar la misión (closeId(6)). Sin página del Diario de L
  // ('job advert' y 'apply' ya están en la misión 5)
  {
    id: 'b1-mission-6',
    title: 'Misión 6: First Job',
    unlock: closeId(6),
    words: [
      { title: 'Trabajo', words: [['application', 'postulación'], ['CV', 'hoja de vida'], ['interview', 'entrevista'], ['part-time', 'medio tiempo'], ['skills', 'habilidades'], ['strengths', 'fortalezas'], ['reliable', 'confiable']] },
      { title: 'Refugio', words: [['collar', 'collar'], ['leash', 'correa'], ['feed', 'dar de comer'], ['walk the dogs', 'pasear a los perros'], ['shelter', 'refugio'], ['adopt', 'adoptar']] },
    ],
    versions: [
      {
        id: 'b1-mission-6-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'My first job',
        unlock: closeId(6),
        frame: 'Lo escribes el domingo por la noche, con la camiseta nueva sobre la silla.',
        lines: [
          { en: 'Today I [have got]n my first job at Lumen Paws!', es: '¡Hoy conseguí mi primer trabajo en Lumen Paws!' },
          { en: 'I [work]n with Nayi, who [loves]n dogs.', es: 'Trabajo con Nayi, que ama a los perros.' },
          { en: 'Laica is the dog that [sleeps]n all day.', es: 'Laica es el perro que duerme todo el día.' },
          { en: 'I [start]n on Monday.', es: 'Empiezo el lunes.' },
        ],
        questions: [],
      },
      {
        id: 'b1-mission-6-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The interview',
        unlock: closeId(6),
        frame: 'Tu entrevista, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Esteban [asked]p me about my experience.', es: 'Esteban me preguntó sobre mi experiencia.' },
          { en: 'I [volunteered]p at a shelter last year, and I [have learned]n a lot.', es: 'Fui voluntario en un refugio el año pasado y he aprendido mucho.' },
          { en: 'Next week I [will feed]f the dogs.', es: 'La próxima semana les daré de comer a los perros.' },
        ],
        questions: [
          { q: 'Who asked about the experience?', options: ['Esteban.', 'Nayi.', 'Leo.'], answer: 0, tip: 'El diario dice: "Esteban asked me about my experience".' },
          { q: 'Where did the writer volunteer?', options: ['At a bank.', 'At a school.', 'At a shelter.'], answer: 2, tip: 'El diario dice: "I volunteered at a shelter last year".' },
          { q: 'What will the writer do next week?', options: ['Feed the dogs.', 'Fill in a form.', 'Sing in the car.'], answer: 0, tip: 'El diario dice: "Next week I will feed the dogs".' },
        ],
      },
    ],
  },
  // B1-07 · The Underworld (recuerdo). Se abre al cerrar la misión (closeId(7)). Con página del Diario de L
  {
    id: 'b1-mission-7',
    title: 'Misión 7: The Underworld',
    unlock: closeId(7),
    words: [
      { title: 'Noticias y tecnología', words: [['device', 'aparato'], ['scientists', 'científicos'], ['restore', 'restaurar'], ['ability', 'habilidad'], ['invent', 'inventar'], ['develop', 'desarrollar'], ['design', 'diseñar']] },
      { title: 'Mercado negro', words: [['black market', 'mercado negro'], ['vendor', 'vendedor'], ['thief', 'ladrón'], ['guard', 'guardia'], ['informant', 'informante'], ['escape', 'escapar']] },
    ],
    versions: [
      {
        id: 'b1-mission-7-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'The device',
        unlock: closeId(7),
        frame: 'Una página de L, escrita de noche, con el aparato sobre la mesa.',
        lines: [
          { en: 'I [saw]p it on the news: a device that restores lost abilities.', es: 'Lo vi en las noticias: un aparato que restaura habilidades perdidas.' },
          { en: 'It [must be]n in the black market, I [thought]p.', es: 'Debe de estar en el mercado negro, pensé.' },
          { en: 'I [went]p down to the Underworld, and I [took]p it.', es: 'Bajé al bajo mundo y lo tomé.' },
          { en: 'The symbols on it [are]n older than English.', es: 'Los símbolos que tiene son más antiguos que el inglés.' },
        ],
        questions: [
          { q: 'What did L see on the news?', options: ['A fire.', 'A device.', 'A school.'], answer: 1, tip: 'La página dice: "I saw it on the news: a device".' },
          { q: 'Where did L think the device was?', options: ['At the school.', 'In a shop.', 'In the black market.'], answer: 2, tip: 'La página dice: "It must be in the black market".' },
        ],
      },
      {
        id: 'b1-mission-7-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'News and clues',
        unlock: closeId(7),
        frame: 'Las noticias y las pistas, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'The device [was designed]p using ancient writings.', es: 'El aparato fue diseñado usando escritos antiguos.' },
          { en: "The thief [can't have been]p a scientist.", es: 'El ladrón no puede haber sido un científico.' },
          { en: 'Tomorrow L [will read]f the symbols.', es: 'Mañana L leerá los símbolos.' },
        ],
        questions: [
          { q: 'What was designed using ancient writings?', options: ['The device.', 'The market.', 'The shelf.'], answer: 0, tip: 'El diario dice: "The device was designed using ancient writings".' },
          { q: "What can't the thief have been?", options: ['A guard.', 'A scientist.', 'A teacher.'], answer: 1, tip: 'El diario dice: "The thief can\'t have been a scientist".' },
          { q: 'What will L do tomorrow?', options: ['Sell the device.', 'Go to school.', 'Read the symbols.'], answer: 2, tip: 'El diario dice: "Tomorrow L will read the symbols".' },
        ],
      },
    ],
  },
  // B1-08 · Game Day (presente). Se abre al cerrar la misión (closeId(8)). Sin página del Diario de L
  {
    id: 'b1-mission-8',
    title: 'Misión 8: Game Day',
    unlock: closeId(8),
    words: [
      { title: 'Fútbol y resultados', words: [['match', 'partido'], ['final', 'final'], ['score', 'marcador'], ['draw', 'empate'], ['beat', 'ganarle a'], ['lose', 'perder'], ['goal', 'gol'], ['fans', 'hinchas'], ['referee', 'árbitro'], ['penalty', 'penal']] },
      { title: 'Ambiente', words: [['atmosphere', 'ambiente'], ['crowd', 'multitud'], ['cheer', 'animar'], ['thrilling', 'emocionante'], ['disappointing', 'decepcionante']] },
    ],
    versions: [
      {
        id: 'b1-mission-8-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'Game day',
        unlock: closeId(8),
        frame: 'Lo escribes esa noche, con la bufanda todavía puesta.',
        lines: [
          { en: 'Today I [am]n at the final of the tournament!', es: '¡Hoy estoy en la final del torneo!' },
          { en: 'Julian [is]n the fastest player on the field.', es: 'Julian es el jugador más rápido de la cancha.' },
          { en: "What a goal! It [is]n such a great match, isn't it?", es: '¡Qué gol! Es un partido genial, ¿no?' },
          { en: 'Lumen Bay [has won]n 2–1!', es: '¡Lumen Bay ganó 2 a 1!' },
        ],
        questions: [],
      },
      {
        id: 'b1-mission-8-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The final',
        unlock: closeId(8),
        frame: 'La final entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Lumen Bay [was]p one goal down at half time.', es: 'Lumen Bay iba perdiendo por un gol en el medio tiempo.' },
          { en: 'In the last minute Julian [scored]p, and Lumen Bay [beat]p the Red Lions 2–1.', es: 'En el último minuto Julian anotó y Lumen Bay le ganó 2 a 1 a los Leones Rojos.' },
          { en: 'Next year we [will come]f again!', es: '¡El próximo año vendremos otra vez!' },
        ],
        questions: [
          { q: 'What was the score at half time?', options: ['Lumen Bay was two goals up.', 'Lumen Bay was one goal down.', 'It was a draw.'], answer: 1, tip: 'El diario dice: "Lumen Bay was one goal down at half time".' },
          { q: 'Who scored in the last minute?', options: ['The Champion.', 'Ilva.', 'Julian.'], answer: 2, tip: 'El diario dice: "In the last minute Julian scored".' },
          { q: 'What will they do next year?', options: ['Come again.', 'Stay at home.', 'Play in the final.'], answer: 0, tip: 'El diario dice: "Next year we will come again".' },
        ],
      },
    ],
  },
  // B1-09 · Temples of Stones and Time (recuerdo 9). Se abre al cerrar la misión (closeId(9)). Con página del Diario de L
  {
    id: 'b1-mission-9',
    title: 'Misión 9: Temples of Stones and Time',
    unlock: closeId(9),
    words: [
      { title: 'Viajes', words: [['journey', 'viaje (recorrido)'], ['trip', 'viaje (con ida y vuelta)'], ['breathtaking', 'impresionante'], ['overcrowded', 'abarrotado'], ['exhausting', 'agotador'], ['unforgettable', 'inolvidable']] },
      { title: 'Naturaleza', words: [['valley', 'valle'], ['waterfall', 'cascada'], ['jungle', 'selva'], ['cliff', 'acantilado'], ['cave', 'cueva']] },
      { title: 'Historia', words: [['ancient', 'antiguo'], ['carved', 'tallado'], ['ruins', 'ruinas'], ['inscription', 'inscripción'], ['sacred', 'sagrado']] },
    ],
    versions: [
      {
        id: 'b1-mission-9-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'The temple speaks',
        unlock: closeId(9),
        frame: 'Una página de L, escrita en el valle, con el reloj junto al aparato.',
        lines: [
          { en: 'The temple [was built]p a thousand years ago.', es: 'El templo fue construido hace mil años.' },
          { en: 'And now it [speaks]n to me.', es: 'Y ahora me habla.' },
          { en: 'The clock [was kept]p in the dark for centuries.', es: 'El reloj fue guardado en la oscuridad durante siglos.' },
          { en: 'With the clock and the device, I [can go]n back.', es: 'Con el reloj y el aparato, puedo volver.' },
        ],
        questions: [
          { q: 'When was the temple built?', options: ['Last year.', 'Ten years ago.', 'A thousand years ago.'], answer: 2, tip: 'La página dice: "The temple was built a thousand years ago".' },
          { q: 'Where was the clock kept?', options: ['In the dark.', 'In a shop.', 'In the valley.'], answer: 0, tip: 'La página dice: "The clock was kept in the dark for centuries".' },
        ],
      },
      {
        id: 'b1-mission-9-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The journey and the temples',
        unlock: closeId(9),
        frame: 'El viaje y los templos, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'The journey [was]p exhausting, but the valley [is]n breathtaking.', es: 'El viaje fue agotador, pero el valle es impresionante.' },
          { en: 'The temple [was built]p by the ancient people, and the clock [must be kept]n in the dark.', es: 'El templo fue construido por el pueblo antiguo y el reloj debe mantenerse en la oscuridad.' },
          { en: 'Tomorrow L [will leave]f the valley.', es: 'Mañana L dejará el valle.' },
        ],
        questions: [
          { q: 'How was the journey?', options: ['Breathtaking.', 'Exhausting.', 'Overcrowded.'], answer: 1, tip: 'El diario dice: "The journey was exhausting".' },
          { q: 'Who built the temple?', options: ['The scientists.', 'The guide.', 'The ancient people.'], answer: 2, tip: 'El diario dice: "The temple was built by the ancient people".' },
          { q: 'What will L do tomorrow?', options: ['Leave the valley.', 'Visit the guide.', 'Go to school.'], answer: 0, tip: 'El diario dice: "Tomorrow L will leave the valley".' },
        ],
      },
    ],
  },
  // B1-10 · Festival Night (presente). Se abre al cerrar la misión (closeId(10)). Sin página del Diario de L
  {
    id: 'b1-mission-10',
    title: 'Misión 10: Festival Night',
    unlock: closeId(10),
    words: [
      { title: 'Festival', words: [['stage', 'escenario'], ['line-up', 'cartel de artistas'], ['headliner', 'artista principal'], ['tickets', 'entradas'], ['sold out', 'agotado']] },
      { title: 'Videojuegos', words: [['gameplay', 'jugabilidad'], ['graphics', 'gráficos'], ['level', 'nivel'], ['console', 'consola'], ['multiplayer', 'multijugador'], ['streamer', 'creador de contenido en vivo']] },
      { title: 'Énfasis', words: [['really', 'muy'], ['absolutely', 'absolutamente'], ['incredibly', 'increíblemente']] },
    ],
    versions: [
      {
        id: 'b1-mission-10-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'Festival night',
        unlock: closeId(10),
        frame: 'Lo escribes tarde, con la pulsera todavía en la muñeca.',
        lines: [
          { en: 'Tonight I [am]n at the Lumen Bay Festival!', es: '¡Esta noche estoy en el Festival de Lumen Bay!' },
          { en: 'I [enjoy]n dancing, and I [prefer]n watching the band to playing games.', es: 'Disfruto bailar y prefiero ver a la banda que jugar.' },
          { en: 'The best thing about it [is]n the music.', es: 'Lo mejor es la música.' },
          { en: 'If I [had]p a ticket for every show, I [would see]f them all.', es: 'Si tuviera una entrada para cada show, los vería todos.' },
        ],
        questions: [],
      },
      {
        id: 'b1-mission-10-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The festival',
        unlock: closeId(10),
        frame: 'El festival entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Liceth [welcomed]p us at the gate, and Jorge [streamed]p a new game.', es: 'Liceth nos recibió en la entrada y Jorge transmitió un juego nuevo.' },
          { en: 'The headliner [stopped]p the music, but we [sang]p the song together.', es: 'El artista principal detuvo la música, pero cantamos la canción juntos.' },
          { en: 'Next year I [will buy]f my ticket early!', es: '¡El próximo año compraré mi entrada temprano!' },
        ],
        questions: [
          { q: 'Who welcomed them at the gate?', options: ['Jorge.', 'Liceth.', 'Rutneri.'], answer: 1, tip: 'El diario dice: "Liceth welcomed us at the gate".' },
          { q: 'What did Jorge do?', options: ['He streamed a new game.', 'He sang a song.', 'He sold tickets.'], answer: 0, tip: 'El diario dice: "Jorge streamed a new game".' },
          { q: 'When will the writer buy the ticket?', options: ['Tomorrow.', 'Tonight.', 'Next year.'], answer: 2, tip: 'El diario dice: "Next year I will buy my ticket early".' },
        ],
      },
    ],
  },
  // B1-11 · The First Journey (recuerdo 11). Se abre al cerrar la misión (closeId(11)). Con página del Diario de L
  {
    id: 'b1-mission-11',
    title: 'Misión 11: The First Journey',
    unlock: closeId(11),
    words: [
      { title: 'Arrepentimiento', words: [['regret', 'arrepentimiento'], ['if only', 'si tan solo'], ['change', 'cambiar'], ['fate', 'destino'], ['unavoidable', 'inevitable']] },
      { title: 'Narración', words: [['suddenly', 'de repente'], ['eventually', 'finalmente'], ['meanwhile', 'mientras tanto'], ['by the time', 'para cuando']] },
      { title: 'El templo', words: [['bridge', 'puente'], ['road', 'camino'], ['crossroads', 'cruce de caminos'], ['fixed point', 'hecho fijo']] },
    ],
    versions: [
      {
        id: 'b1-mission-11-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'I tried everything',
        unlock: closeId(11),
        frame: 'Una página de L, escrita en el Temple of Roads, con la tinta todavía húmeda.',
        lines: [
          { en: 'I tried everything. The fire [started]p again every time.', es: 'Lo intenté todo. El fuego empezó otra vez cada vez.' },
          { en: "If I [had known]p it was a fixed point, I [wouldn't have tried]p.", es: 'Si hubiera sabido que era un hecho fijo, no lo habría intentado.' },
          { en: 'I wish I [had listened]p to the stones sooner.', es: 'Ojalá hubiera escuchado antes a las piedras.' },
          { en: 'Some roads always [meet]n.', es: 'Algunos caminos siempre se encuentran.' },
        ],
        questions: [
          { q: 'What happened every time L tried?', options: ['The fire started again.', 'The fire stopped.', 'The friend left.'], answer: 0, tip: 'La página dice: "The fire started again every time".' },
          { q: 'What does L wish?', options: ['To have more money.', 'To have listened to the stones sooner.', 'To go home.'], answer: 1, tip: 'La página dice: "I wish I had listened to the stones sooner".' },
        ],
      },
      {
        id: 'b1-mission-11-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The first journey',
        unlock: closeId(11),
        frame: 'El viaje completo, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'By the time L [arrived]p, the fire [had started]p.', es: 'Para cuando L llegó, el fuego ya había empezado.' },
          { en: 'If L [had closed]p the door, nothing [would have changed]p.', es: 'Si L hubiera cerrado la puerta, nada habría cambiado.' },
          { en: "At the temple, the stones [said]p that a fixed point [can't be changed]n.", es: 'En el templo, las piedras dijeron que un hecho fijo no puede cambiarse.' },
        ],
        questions: [
          { q: 'What had started when L arrived?', options: ['The fire.', 'The class.', 'The rain.'], answer: 0, tip: 'El diario dice: "the fire had started".' },
          { q: "What can't be changed?", options: ['A broken door.', 'A voice.', 'A fixed point.'], answer: 2, tip: 'El diario dice: "a fixed point can\'t be changed".' },
          { q: 'Where did the stones speak?', options: ['At the school.', 'At the temple.', 'At the market.'], answer: 1, tip: 'El diario dice: "At the temple, the stones said…".' },
        ],
      },
    ],
  },
]
