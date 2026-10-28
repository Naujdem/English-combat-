import type { SpriteLook } from '../components/Sprite'

type Line = { text: string; es: string }

/**
 * Personajes que no pelean. Los que tienen `lines` dicen una frase distinta cada vez
 * que les hablas (estudiantes de ambiente). Otros abren una actividad.
 */
export const NPCS: Record<string, { name: string; look: SpriteLook; doneLine?: Line; lines?: Line[] }> = {
  secretary: {
    name: 'Mrs. Lopez',
    look: { shirt: '#6a8caf', hair: '#3b2a1a', skin: '#e0ac69', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'Have a nice day at Greenfield School!', es: '¡Que tengas un buen día en la escuela Greenfield!' },
  },
  coach: {
    name: 'Coach Mike',
    // Al hablarle abre el repaso de palabras de deportes
    look: { shirt: '#c0392b', hair: '#1f1f1f', skin: '#8d5524', accessory: 'cap' },
  },
  ana: {
    name: 'Ana',
    look: { shirt: '#e0a526', hair: '#a0522d', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: 'Shh! I am studying. The English test is tomorrow!', es: '¡Shh! Estoy estudiando. ¡El examen de inglés es mañana!' },
      { text: 'My favorite subject is English. Math is difficult for me.', es: 'Mi materia favorita es inglés. Las matemáticas son difíciles para mí.' },
      { text: 'This is my notebook. Your notebook is on the desk.', es: 'Este es mi cuaderno. Tu cuaderno está en el pupitre.' },
    ],
  },
  librarian: {
    name: 'Mr. Brown',
    look: { shirt: '#5a4a3a', hair: '#cfcfcf', skin: '#f1c27d', accessory: 'glasses' },
    lines: [
      { text: 'Welcome to the library. Books are our friends!', es: 'Te doy la bienvenida a la biblioteca. ¡Los libros son nuestros amigos!' },
      { text: 'This is my favorite book. It is about animals.', es: 'Este es mi libro favorito. Es sobre animales.' },
      { text: 'Please be quiet. The students are reading.', es: 'Por favor, silencio. Los estudiantes están leyendo.' },
    ],
  },
  ben: {
    name: 'Ben',
    look: { shirt: '#f4efe4', hair: '#d9b46a', skin: '#f6d3b3' },
    lines: [
      { text: 'Hello! Is this your ball? No? Ha ha, it is my ball!', es: '¡Hola! ¿Es esta tu pelota? ¿No? ¡Ja, ja, es mi pelota!' },
      { text: 'Football is my favorite sport. Max is our captain.', es: 'El fútbol es mi deporte favorito. Max es nuestro capitán.' },
      { text: 'The coach is strict, but he is very nice.', es: 'El entrenador es estricto, pero es muy amable.' },
    ],
  },
}

/** Datos inventados del papel de traslado: así no se pide información real del jugador */
export const TRANSFER = {
  address: '25 Park Street',
  phone: '555-0147',
  phoneWrong: '555-0174',
  phoneSpoken: 'five, five, five, oh, one, seven, four',
}

export function schoolEmail(name: string) {
  const user = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  return `${user || 'student'}@greenfield.edu`
}
