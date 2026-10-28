/**
 * Horario de clases en la pizarra del aula. Se lee por sesiones:
 * cada sesión enseña una parte del horario y da una tiza. Cada esbirro pide su tiza
 * para aceptar el combate. Al vencerlo, el esbirro hace una pregunta del horario
 * y se abre la siguiente sesión en la pizarra.
 */

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
export type Hour = '8:00' | '10:00' | '12:00'

export const DAYS: { id: Day; en: string; es: string }[] = [
  { id: 'Mon', en: 'Monday', es: 'lunes' },
  { id: 'Tue', en: 'Tuesday', es: 'martes' },
  { id: 'Wed', en: 'Wednesday', es: 'miércoles' },
  { id: 'Thu', en: 'Thursday', es: 'jueves' },
  { id: 'Fri', en: 'Friday', es: 'viernes' },
]
export const HOURS: Hour[] = ['8:00', '10:00', '12:00']

type Q = { q: string; options: string[]; answer: number; tip: string }

export type Session = {
  /** Se guarda en `opened` al terminar la sesión */
  id: string
  /** Esbirro que pide la tiza de esta sesión */
  minion: string
  subject: string
  subjectEs: string
  title: string
  text: string[]
  es: string[]
  questions: Q[]
  /** Casillas del horario que se descubren con esta sesión */
  entries: { day: Day; hour: Hour; subject: string }[]
  /** Pregunta extra que hace el esbirro al ser vencido */
  bonus: Q
}

export const SESSIONS: Session[] = [
  {
    id: 'board-1',
    minion: 'school-m1',
    subject: 'Maths',
    subjectEs: 'Matemáticas',
    title: 'Class schedule: Maths',
    text: [
      'Welcome to Greenfield School! Here is your class schedule.',
      "Maths is on Monday and Wednesday. On Monday, it is at eight o'clock. On Wednesday, it is at ten o'clock.",
      'Our Maths teacher is Mrs. Green. Her classroom is Room 1.',
    ],
    es: [
      '¡Bienvenidos a la escuela Greenfield! Aquí está tu horario de clases.',
      'Matemáticas es el lunes y el miércoles. El lunes es a las ocho. El miércoles es a las diez.',
      'Nuestra profesora de matemáticas es la señora Green. Su salón es el salón 1.',
    ],
    questions: [
      { q: 'When is Maths?', options: ['On Monday and Wednesday.', 'On Tuesday and Friday.', 'Every day.'], answer: 0, tip: 'El texto dice: "Maths is on Monday and Wednesday."' },
      { q: 'What time is Maths on Monday?', options: ["At ten o'clock.", "At eight o'clock.", "At twelve o'clock."], answer: 1, tip: 'El texto dice: "On Monday, it is at eight o\'clock."' },
      { q: 'Who is the Maths teacher?', options: ['Mr. Grimm.', 'Mrs. Green.', 'Coach Mike.'], answer: 1, tip: 'El texto dice: "Our Maths teacher is Mrs. Green."' },
    ],
    entries: [
      { day: 'Mon', hour: '8:00', subject: 'Maths' },
      { day: 'Wed', hour: '10:00', subject: 'Maths' },
    ],
    bonus: {
      q: 'Hey... I always forget. What time is Maths on Monday?',
      options: ["At eight o'clock.", "At ten o'clock.", 'On Friday.'],
      answer: 0,
      tip: 'En el horario, Maths el lunes es a las ocho: at eight o\'clock.',
    },
  },
  {
    id: 'board-2',
    minion: 'school-m2',
    subject: 'Science',
    subjectEs: 'Ciencias',
    title: 'Class schedule: Science and English',
    text: [
      "Science is on Tuesday at eight o'clock. Our Science teacher is Mr. Black. His lab is next to the bathrooms.",
      "English is on Monday at ten o'clock and on Thursday at eight o'clock. Our English teacher is Mr. Grimm.",
    ],
    es: [
      'Ciencias es el martes a las ocho. Nuestro profesor de ciencias es el señor Black. Su laboratorio está al lado de los baños.',
      'Inglés es el lunes a las diez y el jueves a las ocho. Nuestro profesor de inglés es el señor Grimm.',
    ],
    questions: [
      { q: 'When is Science?', options: ["On Tuesday at eight o'clock.", "On Monday at ten o'clock.", "On Friday at eight o'clock."], answer: 0, tip: 'El texto dice: "Science is on Tuesday at eight o\'clock."' },
      { q: 'Where is the Science lab?', options: ['In the library.', 'Next to the bathrooms.', 'In the patio.'], answer: 1, tip: 'El texto dice: "His lab is next to the bathrooms."' },
      { q: 'Who is the English teacher?', options: ['Mr. Black.', 'Mrs. Lopez.', 'Mr. Grimm.'], answer: 2, tip: 'El texto dice: "Our English teacher is Mr. Grimm."' },
    ],
    entries: [
      { day: 'Tue', hour: '8:00', subject: 'Science' },
      { day: 'Mon', hour: '10:00', subject: 'English' },
      { day: 'Thu', hour: '8:00', subject: 'English' },
    ],
    bonus: {
      q: 'I am perfect, so I know everything. English is on Tuesday, right?',
      options: ["Yes, it is.", "No, it isn't. It's on Monday and Thursday.", "No, it isn't. It's on Sunday."],
      answer: 1,
      tip: 'En el horario, English es el lunes y el jueves, no el martes.',
    },
  },
  {
    id: 'board-3',
    minion: 'school-m3',
    subject: 'Lunch',
    subjectEs: 'Almuerzo',
    title: 'Class schedule: Lunch and History',
    text: [
      "Lunch is at twelve o'clock, from Monday to Friday. The cafeteria is open from twelve to one o'clock.",
      'On Friday, lunch is pizza!',
      "History is on Tuesday and Friday at ten o'clock. Our History teacher is Ms. White.",
    ],
    es: [
      'El almuerzo es a las doce, de lunes a viernes. La cafetería está abierta de doce a una.',
      '¡El viernes el almuerzo es pizza!',
      'Historia es el martes y el viernes a las diez. Nuestra profesora de historia es la señora White.',
    ],
    questions: [
      { q: 'What time is lunch?', options: ["At eight o'clock.", "At twelve o'clock.", "At one o'clock."], answer: 1, tip: 'El texto dice: "Lunch is at twelve o\'clock."' },
      { q: 'When is pizza day?', options: ['On Monday.', 'On Wednesday.', 'On Friday.'], answer: 2, tip: 'El texto dice: "On Friday, lunch is pizza!"' },
      { q: 'Who is the History teacher?', options: ['Ms. White.', 'Mrs. Green.', 'Mr. Black.'], answer: 0, tip: 'El texto dice: "Our History teacher is Ms. White."' },
    ],
    entries: [
      { day: 'Mon', hour: '12:00', subject: 'Lunch' },
      { day: 'Tue', hour: '12:00', subject: 'Lunch' },
      { day: 'Wed', hour: '12:00', subject: 'Lunch' },
      { day: 'Thu', hour: '12:00', subject: 'Lunch' },
      { day: 'Fri', hour: '12:00', subject: 'Lunch' },
      { day: 'Tue', hour: '10:00', subject: 'History' },
      { day: 'Fri', hour: '10:00', subject: 'History' },
    ],
    bonus: {
      q: 'Is pizza day on Monday? I want MY pizza!',
      options: ['Yes, it is.', "No, it isn't. It's on Friday.", "No, it's at eight o'clock."],
      answer: 1,
      tip: 'En el horario, la pizza es el viernes: on Friday.',
    },
  },
  {
    id: 'board-4',
    minion: 'school-patio',
    subject: 'P.E.',
    subjectEs: 'Educación física',
    title: 'Class schedule: P.E., Art and Music',
    text: [
      "P.E. is on Thursday at ten o'clock. P.E. means Physical Education: sports!",
      'Our P.E. teacher is Coach Mike. His class is in the patio. Bring your sports shoes and a water bottle.',
      "Art is on Wednesday at eight o'clock, and Music is on Friday at eight o'clock.",
    ],
    es: [
      'Educación física es el jueves a las diez. P.E. significa Physical Education: ¡deportes!',
      'Nuestro profesor de educación física es el entrenador Mike. Su clase es en el patio. Trae tus zapatos deportivos y una botella de agua.',
      'Arte es el miércoles a las ocho, y Música es el viernes a las ocho.',
    ],
    questions: [
      { q: 'When is P.E.?', options: ["On Monday at eight o'clock.", "On Thursday at ten o'clock.", "On Friday at twelve o'clock."], answer: 1, tip: 'El texto dice: "P.E. is on Thursday at ten o\'clock."' },
      { q: 'Who is the P.E. teacher?', options: ['Coach Mike.', 'Mr. Grimm.', 'Ms. White.'], answer: 0, tip: 'El texto dice: "Our P.E. teacher is Coach Mike."' },
      { q: 'What do you need for P.E.?', options: ['Your pencil and your book.', 'Your sports shoes and a water bottle.', 'A pizza.'], answer: 1, tip: 'El texto dice: "Bring your sports shoes and a water bottle."' },
    ],
    entries: [
      { day: 'Thu', hour: '10:00', subject: 'P.E.' },
      { day: 'Wed', hour: '8:00', subject: 'Art' },
      { day: 'Fri', hour: '8:00', subject: 'Music' },
    ],
    bonus: {
      q: 'What time is P.E. on Thursday? I am always ready!',
      options: ["At eight o'clock.", "At ten o'clock.", "At twelve o'clock."],
      answer: 1,
      tip: 'En el horario, P.E. el jueves es a las diez: at ten o\'clock.',
    },
  },
]

export function sessionFor(minionId: string) {
  return SESSIONS.find((s) => s.minion === minionId)
}

/**
 * La siguiente sesión que se puede leer. La primera está libre; las demás se abren
 * al vencer al esbirro de la sesión anterior.
 */
export function nextSession(opened: string[], defeated: string[]): { session: Session | null; blockedBy: string | null } {
  for (let i = 0; i < SESSIONS.length; i++) {
    const s = SESSIONS[i]
    if (opened.includes(s.id)) continue
    const prev = SESSIONS[i - 1]
    if (prev && !defeated.includes(prev.minion)) return { session: null, blockedBy: prev.minion }
    return { session: s, blockedBy: null }
  }
  return { session: null, blockedBy: null }
}
