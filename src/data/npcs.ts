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
  driver: {
    name: 'Mr. Park',
    look: { shirt: '#2f6fd0', hair: '#1f1f1f', skin: '#f1c27d', accessory: 'cap' },
    lines: [
      { text: 'This is the city bus stop. The next bus is at five o\'clock.', es: 'Esta es la parada de autobús de la ciudad. El próximo autobús es a las cinco.' },
      { text: 'Cross the street at the crosswalk, please. Be careful!', es: 'Cruza la calle por la cebra, por favor. ¡Ten cuidado!' },
      { text: 'There is a great café next to the clothes shop.', es: 'Hay un café muy bueno al lado de la tienda de ropa.' },
    ],
  },
  rosa: {
    name: 'Officer Rosa',
    // Al hablarle abre la actividad de direcciones y da el mapa
    look: { shirt: '#1f3c88', hair: '#2b1d14', skin: '#c68642', gender: 'female', accessory: 'cap' },
    doneLine: { text: 'Do you need help? There is a map in your bag!', es: '¿Necesitas ayuda? ¡Hay un mapa en tu mochila!' },
  },
  lily: {
    name: 'Lily',
    // Cajera del café: abre la actividad de pedir
    look: { shirt: '#8b5a2b', hair: '#d9822b', skin: '#f6d3b3', gender: 'female' },
    doneLine: { text: 'Hi again! Can I get you anything?', es: '¡Hola otra vez! ¿Te traigo algo?' },
  },
  mia: {
    name: 'Mia',
    // Corre con audífonos y choca contigo: practicar disculpas y dar indicaciones
    look: { shirt: '#3b9d5d', hair: '#1f1f1f', skin: '#c68642', gender: 'female' },
    lines: [
      { text: 'Hi again! I run in the park every morning.', es: '¡Hola otra vez! Corro en el parque todas las mañanas.' },
      { text: 'Thank you for your help! The bank is next to the park, right?', es: '¡Gracias por tu ayuda! El banco está al lado del parque, ¿cierto?' },
    ],
  },
  sam: {
    name: 'Sam',
    look: { shirt: '#e0a526', hair: '#5a3a1a', skin: '#8d5524' },
    lines: [
      { text: 'Look! There are fish in the fountain! One, two, three... ten fish!', es: '¡Mira! ¡Hay peces en la fuente! Uno, dos, tres... ¡diez peces!' },
      { text: 'Is this your first time in the city? There are many shops here.', es: '¿Es tu primera vez en la ciudad? Aquí hay muchas tiendas.' },
      { text: 'Those tourists are lost. Mr. Rossi always sends them to the wrong place!', es: 'Esos turistas están perdidos. ¡El señor Rossi siempre los manda al lugar equivocado!' },
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
