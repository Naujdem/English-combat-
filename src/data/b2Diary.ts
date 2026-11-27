import type { DiaryChapter } from './diary'

/**
 * Diario de B2: un capítulo por misión. Las del presente no tienen página de G; las Ventanas 10 y 12 sí (cuaderno de G).
 * Se abren al cerrar cada misión (b2CloseId(n), data/b2World.ts). Formato igual que data/b1Diary.ts.
 */
export const B2_DIARY: DiaryChapter[] = [
  // B2-01 · Catching Up (presente): sin página de G. Se abre al cerrar la misión 1
  {
    id: 'b2-mission-1',
    title: 'B2 · Misión 1: Catching Up',
    unlock: 'b2-01-close',
    words: [
      { title: 'Ponerse al día', words: [['catch up', 'ponerse al día'], ['keep in touch', 'mantenerse en contacto'], ['lose touch', 'perder el contacto'], ['be up to', 'andar haciendo'], ['run into', 'encontrarse por casualidad'], ['settle in', 'adaptarse, instalarse']] },
      { title: 'Reacciones', words: [['thrilled', 'feliz, emocionado'], ['gutted', 'muy decepcionado'], ['relieved', 'aliviado'], ['no way', '¡no puede ser!'], ['fair enough', 'vale, tiene sentido'], ['I bet', 'me imagino']] },
      { title: 'Phrasal verbs', words: [['catch up', 'ponerse al día'], ['run into', 'toparse con'], ['keep up with', 'seguir el ritmo de'], ['hang out', 'pasar el rato']] },
    ],
    versions: [
      {
        id: 'b2-mission-1-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'Catching up',
        unlock: 'b2-01-close',
        frame: 'Lo escribes esa noche en la residencia.',
        lines: [
          { en: 'Everyone [has been moving]n on. Marisol [has been working]n on the garden, and Jeison [has finished]n two exams.', es: 'Todos han seguido adelante. Marisol ha estado trabajando en el jardín y Jeison ya terminó dos exámenes.' },
          { en: 'And Leo [has been hiding]n something.', es: 'Y Leo ha estado escondiendo algo.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-1-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A morning at the port',
        unlock: 'b2-01-close',
        frame: 'Tu mañana entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'This morning Leo\'s voice [broke]p at breakfast. He [said]p it [was]p the coffee.', es: 'Esta mañana a Leo se le quebró la voz en el desayuno. Dijo que era el café.' },
          { en: 'Nayi [has been running]n with the dogs since seven. She [has walked]n five dogs today.', es: 'Nayi lleva corriendo con los perros desde las siete. Hoy ya paseó cinco perros.' },
          { en: 'Tomorrow I [am starting]f at the Herald with Manuel.', es: 'Mañana empiezo en el Herald con Manuel.' },
        ],
        questions: [
          { q: 'What happened to Leo at breakfast?', options: ['He fell asleep.', 'His voice broke.', 'He lost his phone.'], answer: 1, tip: 'El diario dice: "Leo\'s voice broke at breakfast".' },
          { q: 'How many dogs has Nayi walked today?', options: ['Five.', 'Two.', 'Seven.'], answer: 0, tip: 'El diario dice: "She has walked five dogs today".' },
          { q: 'Where are you starting tomorrow?', options: ['At the café.', 'At Lumen Paws.', 'At the Herald.'], answer: 2, tip: 'El diario dice: "Tomorrow I am starting at the Herald".' },
        ],
      },
    ],
  },
  // B2-02 · The Herald (presente): sin página de G. Se abre al cerrar la misión 2
  {
    id: 'b2-mission-2',
    title: 'B2 · Misión 2: The Herald',
    unlock: 'b2-02-close',
    words: [
      { title: 'Redacción', words: [['editor', 'editor, editora'], ['deadline', 'hora de cierre, plazo'], ['draft', 'borrador'], ['source', 'fuente'], ['headline', 'titular'], ['byline', 'firma del autor'], ['scoop', 'primicia'], ['fact-check', 'verificar datos']] },
      { title: 'Competencias', words: [['reliable', 'confiable'], ['adaptable', 'adaptable'], ['attention to detail', 'atención al detalle'], ['cope with', 'lidiar con'], ['overcome', 'superar'], ['under pressure', 'bajo presión']] },
      { title: 'Reuniones', words: [['agenda', 'orden del día'], ['minutes', 'acta'], ['chair', 'quien preside'], ['item', 'punto (de la agenda)'], ['follow up', 'hacer seguimiento'], ['bring up', 'sacar un tema']] },
      { title: 'Lenguaje inclusivo', words: [['chairperson', 'quien preside'], ['firefighter', 'bombero, bombera'], ['singular they', 'they en singular'], ['stereotype', 'estereotipo']] },
      { title: 'Phrasal verbs', words: [['follow up', 'hacer seguimiento'], ['bring up', 'sacar un tema'], ['run by', 'consultar, explicar a alguien'], ['come up with', 'ocurrírsele (una idea)']] },
    ],
    versions: [
      {
        id: 'b2-mission-2-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'My first day at the Herald',
        unlock: 'b2-02-close',
        frame: 'Lo escribes esa noche en la residencia.',
        lines: [
          { en: 'Today I [started]p at the Herald. Amara [asked]p me about the time I [had been volunteering]p at Lumen Paws.', es: 'Hoy empecé en el Herald. Amara me preguntó por el tiempo que llevaba de voluntariado en Lumen Paws.' },
          { en: 'Viktor [had been working]p for days without a break. A fragment [had made]p him the Deadline.', es: 'Viktor llevaba días trabajando sin descanso. Un fragmento lo había convertido en The Deadline.' },
          { en: 'Manuel [asked]p me to write about the voice blackouts.', es: 'Manuel me pidió escribir sobre los apagones de voz.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-2-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A day in the newsroom',
        unlock: 'b2-02-close',
        frame: 'Tu día entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Priya [showed]p me the style guide: we [write]n "firefighter", not "fireman".', es: 'Priya me mostró la guía de estilo: escribimos "firefighter", no "fireman".' },
          { en: 'The core of the clock [has filled]n its first part.', es: 'El núcleo del reloj ha llenado su primera parte.' },
          { en: 'Tomorrow I [am going to call]f the harbour office.', es: 'Mañana voy a llamar a la oficina del puerto.' },
        ],
        questions: [
          { q: 'What had Viktor been doing for days?', options: ['Sleeping at the port.', 'Working without a break.', 'Writing a book.'], answer: 1, tip: 'El diario dice: "Viktor had been working for days without a break".' },
          { q: 'What does the style guide say?', options: ['Write "firefighter", not "fireman".', 'Write "fireman", not "firefighter".', 'Never write about fires.'], answer: 0, tip: 'El diario dice: we write "firefighter", not "fireman".' },
          { q: 'What is your first story about?', options: ['The new café.', 'Lumen Paws.', 'The voice blackouts.'], answer: 2, tip: 'El diario dice: "Manuel asked me to write about the voice blackouts".' },
        ],
      },
    ],
  },
]
