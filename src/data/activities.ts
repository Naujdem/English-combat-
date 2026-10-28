/** Vocabulario de la escuela para el repaso de la biblioteca (A1: escuela, aula e información personal) */
export const SCHOOL_VOCAB: { en: string; es: string }[] = [
  { en: 'teacher', es: 'profesor' },
  { en: 'student', es: 'estudiante' },
  { en: 'classroom', es: 'salón de clase' },
  { en: 'book', es: 'libro' },
  { en: 'pen', es: 'bolígrafo' },
  { en: 'pencil', es: 'lápiz' },
  { en: 'desk', es: 'pupitre' },
  { en: 'chair', es: 'silla' },
  { en: 'board', es: 'pizarra' },
  { en: 'bag', es: 'mochila' },
  { en: 'homework', es: 'tarea' },
  { en: 'window', es: 'ventana' },
  { en: 'door', es: 'puerta' },
  { en: 'library', es: 'biblioteca' },
  { en: 'name', es: 'nombre' },
  { en: 'friend', es: 'amigo' },
]

/** Lectura del tablón del aula. Da pistas de la historia y practica to be y posesivos. */
export const SCHOOL_READING = {
  title: 'Welcome to Greenfield School!',
  text: [
    'Our school is big and beautiful. The classrooms are on the first floor. The cafeteria is next to the bathrooms, and the library is near the cafeteria.',
    'Mr. Grimm is our English teacher. He is very kind, and his classes are fun.',
    "Today, Mr. Grimm is not in his classroom. He is in the teachers' room. The door is closed. Please do not go in!",
  ],
  es: [
    'Nuestra escuela es grande y bonita. Los salones están en el primer piso. La cafetería está al lado de los baños, y la biblioteca está cerca de la cafetería.',
    'El profesor Grimm es nuestro profesor de inglés. Es muy amable, y sus clases son divertidas.',
    'Hoy, el profesor Grimm no está en su salón. Está en la sala de profesores. La puerta está cerrada. ¡Por favor no entres!',
  ],
  questions: [
    { q: 'Who is Mr. Grimm?', options: ['The English teacher.', 'A student.', 'The cook.'], answer: 0, tip: 'El texto dice: "Mr. Grimm is our English teacher."' },
    { q: 'Where is the library?', options: ['On the second floor.', 'Near the cafeteria.', "In the teachers' room."], answer: 1, tip: 'El texto dice: "the library is near the cafeteria."' },
    { q: 'Is Mr. Grimm in his classroom today?', options: ['Yes, he is.', 'Yes, they are.', "No, he isn't."], answer: 2, tip: 'El texto dice: "Today, Mr. Grimm is not in his classroom."' },
  ],
}
