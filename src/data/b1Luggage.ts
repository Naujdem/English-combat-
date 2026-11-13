import type { LuggageContent } from '../components/LostLuggage'

/**
 * B1-02 · A New City: Lost Luggage en el aeropuerto de Lumen Bay (mismos estantes y objetos que A2-11;
 * atiende un empleado). Lo abre el empleado de Objetos Perdidos (tarea b1-02-luggage en data/tasks.ts).
 */
export const B1_LUGGAGE: LuggageContent = {
  title: 'Aeropuerto de Lumen Bay · Lost Luggage',
  clerk: 'human',
  finish: { text: 'Welcome to Lumen Bay! Have a nice stay.', es: '¡{h:Bienvenido|Bienvenida} a Lumen Bay! Disfruta tu estadía.' },
  rounds: [
    {
      mode: 'choose',
      bot: 'Good morning. Lost Property. How can I help you?',
      es: 'Buenos días. Objetos Perdidos. ¿En qué puedo ayudarte?',
      options: ["Hello, I've lost my suitcase.", 'Hello, I lost my suitcase yet.', "Hello, I've lose my suitcase."],
      answer: 0,
      tip: "Present perfect: have + participio (lost): I've lost my suitcase.",
      ok: { text: "I'm sorry to hear that. Let me help you.", es: 'Siento oír eso. Déjame ayudarte.' },
    },
    {
      mode: 'choose',
      bot: 'What does your suitcase look like?',
      es: '¿Cómo es tu maleta?',
      options: ["It's a suitcase green big with a yellow tag.", "It's a big green suitcase with a yellow tag.", 'It looks a big green suitcase of a yellow tag.'],
      answer: 1,
      tip: 'Los adjetivos van antes del nombre: a big green suitcase. Con algo encima: with a yellow tag.',
      ok: { text: 'A big green suitcase with a yellow tag. Noted.', es: 'Una maleta verde grande con una etiqueta amarilla. Anotado.' },
    },
    {
      mode: 'choose',
      bot: 'Have you checked the luggage belt yet?',
      es: '¿Ya revisaste la cinta de equipaje?',
      options: ["Yes, I've checked already it yesterday.", "Yes, I've check it already.", "Yes, I've already checked it."],
      answer: 2,
      tip: "have + already + participio: I've already checked it.",
      ok: { text: 'Then your suitcase is probably on these shelves. Let me look.', es: 'Entonces tu maleta probablemente está en estos estantes. Déjame mirar.' },
    },
    {
      mode: 'tap',
      bot: 'I can see a big green suitcase with a yellow tag. It is on the top shelf, on the left. Touch it!',
      es: 'Veo una maleta verde grande con una etiqueta amarilla. Está en el estante de arriba, a la izquierda. ¡Tócala!',
      target: 'green',
      ok: { text: 'Here you are. Your suitcase has just arrived on the late flight.', es: 'Aquí tienes. Tu maleta acaba de llegar en el vuelo tardío.' },
    },
    {
      mode: 'tap',
      bot: 'Wait! Has anyone seen a blue suitcase? It belongs to your friend. It is on the top shelf, on the right. Touch it!',
      es: '¡Espera! ¿Alguien ha visto una maleta azul? Es de tu {i:amigo|amiga}. Está en el estante de arriba, a la derecha. ¡Tócala!',
      target: 'suitcase',
      ok: { text: "Perfect! Your friend's suitcase has just come out. Two lost bags found today!", es: '¡Perfecto! La maleta de tu {i:amigo|amiga} acaba de salir. ¡Dos maletas perdidas encontradas hoy!' },
    },
  ],
}
