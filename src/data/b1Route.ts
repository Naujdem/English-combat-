import type { RouteContent } from '../components/RouteChallenge'

/**
 * B1-02 · A New City, bloque C: Route Challenge en Lumen Bay, de la oficina del intercambio a la residencia.
 * Mismo mapa que A2-11 (la geometría no cambia); solo se renombran los lugares. Sin barrera.
 * Lo abre Leo en la calle (tarea b1-02-route en data/tasks.ts).
 */
export const B1_ROUTE: RouteContent = {
  title: 'Lumen Bay · Route Challenge',
  barrierFromRound: null,
  places: {
    park: { en: 'market', es: 'el mercado' },
    cafe: { en: 'bakery', es: 'la panadería' },
    library: { en: 'post office', es: 'el correo' },
    stop: { en: 'bus stop', es: 'la parada del bus' },
    museum: { en: 'harbour', es: 'el puerto' },
    tower: { en: 'residence', es: 'la residencia' },
  },
  intro: { text: "Ms. Haddad gave us an agenda and a map. Let's get to the residence together.", es: 'La Sra. Haddad nos dio una agenda y un mapa. Lleguemos juntos a la residencia.' },
  finish: { text: "Perfect! We're at the residence, and our rooms are ready.", es: '¡Perfecto! Estamos en la residencia y nuestros cuartos están listos.' },
  rounds: [
    {
      mode: 'follow',
      say: "Today we're going to the residence by bus. The bus stop is on your right, next to the bakery. Touch it!",
      es: 'Hoy vamos a la residencia en bus. La parada está a tu derecha, junto a la panadería. ¡Tócala!',
      target: 'stop',
      path: '160,232 160,163 180,163',
    },
    {
      mode: 'choose',
      say: "Ms. Haddad's note says: 'Meet the group at the bus stop at four.' What do you tell Leo?",
      es: 'La nota de la Sra. Haddad dice: «Encuéntrense con el grupo en la parada a las cuatro». ¿Qué le dices a Leo?',
      options: ["We're meeting the group at the bus stop at four.", 'We will meeting the group at the bus stop at four.', 'We meet to the group at the bus stop at four.'],
      answer: 0,
      tip: "Cita fija con hora: presente continuo (We're meeting).",
    },
    {
      mode: 'choose',
      say: 'Oh no! The bus is full. What can we do?',
      es: '¡Oh, no! El bus está lleno. ¿Qué hacemos?',
      options: ["Don't worry. I'm going to calling a taxi.", "Don't worry. I'll call a taxi.", "Don't worry. I call will a taxi."],
      answer: 1,
      tip: "Decisión en el momento: will + verbo base: I'll call a taxi.",
      path: '160,232 160,206 262,206',
    },
    {
      mode: 'follow',
      say: "We're going to take Harbour Road and pass the market. The residence is at the end, on your right. Touch it!",
      es: 'Vamos a tomar Harbour Road y pasar el mercado. La residencia está al final, a tu derecha. ¡Tócala!',
      target: 'tower',
      path: '160,232 160,206 262,206 262,182 274,182',
    },
    {
      mode: 'choose',
      say: "We made it! What's the plan for Saturday?",
      es: '¡Llegamos! ¿Cuál es el plan del sábado?',
      options: ['We going to visit the old port.', 'We will to visit the old port.', "We're going to visit the old port."],
      answer: 2,
      tip: 'Plan decidido: are going to + verbo base.',
    },
    {
      mode: 'choose',
      say: "Leo asks: 'Do you think the residence will be nice?' What do you say?",
      es: 'Leo pregunta: «¿Crees que la residencia será bonita?» ¿Qué dices?',
      options: ['I think it will to be great!', 'I think it will be great!', 'I think it wills be great!'],
      answer: 1,
      tip: 'Predicción: will + verbo base (will be).',
    },
  ],
}
