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
]
