import type { FactCheckContent } from '../components/FactCheck'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2 · ficha 0: contenido de las demos mínimas (modo profesor › B2). Las misiones tendrán sus propios bancos.
 */

/** Fact Check de prueba: las declaraciones de los testigos del puerto (ficha 5), versión completa de 6 rondas */
export const B2_FACT_CHECK_DEMO: FactCheckContent = {
  title: 'Fact Check · The Lumen Bay Herald',
  intro: {
    en: 'Read what each witness said. Is the draft faithful? If not, choose the correct version.',
    es: 'Lee lo que dijo cada testigo. ¿El borrador es fiel? Si no lo es, elige la versión correcta.',
  },
  rounds: [
    {
      speaker: { en: 'Tomás, a fisherman', es: 'Tomás, un pescador' },
      quote: "I didn't make it up!",
      quoteEs: '¡No me lo inventé!',
      draft: 'Tomás admitted making it up.',
      faithful: false,
      options: ['Tomás denied making it up.', 'Tomás denied to make it up.', 'Tomás refused making it up.'],
      answer: 0,
      tip: 'Decir "no lo hice" es negar: deny + -ing.',
    },
    {
      speaker: { en: 'Captain Halvorsen', es: 'La capitana Halvorsen' },
      quote: "Don't sail after midnight.",
      quoteEs: 'No naveguen después de medianoche.',
      draft: 'Captain Halvorsen warned us not to sail after midnight.',
      faithful: true,
      tip: 'Un consejo de "no hagas algo" es warn + objeto + not to.',
    },
    {
      speaker: { en: 'A shop owner', es: 'Una comerciante' },
      quote: 'You broke the lights!',
      quoteEs: '¡Ustedes rompieron las luces!',
      draft: 'She suggested breaking the lights.',
      faithful: false,
      options: ['She accused them of breaking the lights.', 'She accused them for breaking the lights.', 'She accused them to break the lights.'],
      answer: 0,
      tip: 'Culpar a alguien es accuse + objeto + of + -ing.',
    },
    {
      speaker: { en: 'Manuel', es: 'Manuel' },
      quote: "I'll help you with the article.",
      quoteEs: 'Te ayudaré con el artículo.',
      draft: 'Manuel promised to help me with the article.',
      faithful: true,
      tip: 'Decir "lo haré" es prometer: promise + to.',
    },
    {
      speaker: { en: 'Zoe, a blogger', es: 'Zoe, una bloguera' },
      quote: "I'm sorry I exaggerated.",
      quoteEs: 'Perdón por exagerar.',
      draft: 'Zoe refused to exaggerate.',
      faithful: false,
      options: ['Zoe apologised for exaggerating.', 'Zoe apologised to exaggerate.', 'Zoe apologised for exaggerate.'],
      answer: 0,
      tip: 'Pedir perdón es apologise for + -ing.',
    },
    {
      speaker: { en: 'A ferry passenger', es: 'Un pasajero del ferry' },
      quote: "Let's check the north pier.",
      quoteEs: 'Revisemos el muelle norte.',
      draft: 'He suggested us to check the north pier.',
      faithful: false,
      options: ['He suggested checking the north pier.', 'He suggested to check the north pier.', 'He insisted to check the north pier.'],
      answer: 0,
      tip: '"Let\'s…" es sugerir: suggest + -ing (nunca suggest + objeto + to).',
    },
  ],
}

/** Unheard de prueba: la escuela nocturna en 2061 (ficha 3), con las 3 metas */
export const B2_UNHEARD_DEMO: TextCommandRoom = {
  mode: 'text',
  title: 'Unheard · The Night School',
  intro: {
    en: 'The alarm is ringing. Nobody can hear you. Write what you do, or write a note.',
    es: 'Suena la alarma. Nadie te oye. Escribe lo que haces, o escribe una nota.',
  },
  scene: 'room',
  objects: ['door', 'light', 'stairs'],
  steps: [
    {
      problem: { en: 'The fire door is closed. People will need it.', es: 'La puerta de emergencia está cerrada. La gente la va a necesitar.' },
      accept: [{ verb: 'open', object: 'door', optional: ['fire'] }],
      target: 'door',
      done: { en: 'The fire door opens. Cold air comes in.', es: 'La puerta de emergencia se abre. Entra aire frío.' },
      tip: 'Hay que abrir la puerta: Open the fire door.',
      fails: { push: { en: "The door doesn't move. It's locked from this side.", es: 'La puerta no se mueve. Está cerrada por este lado.' } },
      verbPool: ['push', 'pull', 'kick', 'close', 'break'],
    },
    {
      problem: { en: 'The corridor is dark and full of smoke. There is an emergency switch.', es: 'El pasillo está oscuro y lleno de humo. Hay un interruptor de emergencia.' },
      accept: [
        { verb: 'turn', particle: 'on', object: 'light', optional: ['emergency'] },
        { verb: 'switch', particle: 'on', object: 'light', optional: ['emergency'] },
      ],
      target: 'light',
      done: { en: 'The emergency lights turn on. Now people can see the way.', es: 'Se encienden las luces de emergencia. Ahora la gente ve el camino.' },
      tip: 'Encender es un phrasal verb: Turn on the emergency lights.',
      fails: { open: { en: "You can't open a light.", es: 'No se puede abrir una luz.' } },
      verbPool: ['open', 'push', 'break', 'close'],
    },
    {
      problem: {
        en: 'Write a note for the classroom door: the main stairs are full of smoke, but the back stairs are clear.',
        es: 'Escribe una nota para la puerta del aula: las escaleras principales están llenas de humo, pero las traseras están libres.',
      },
      accept: [
        { verb: 'use', object: 'stairs', optional: ['back'] },
        { verb: 'take', object: 'stairs', optional: ['back'] },
      ],
      target: 'stairs',
      done: { en: 'You stick the note on the door. A student reads it: "The back stairs! Come on!"', es: 'Pegas la nota en la puerta. Una estudiante la lee: "¡Las escaleras traseras! ¡Vamos!".' },
      tip: 'La nota dice qué usar: Use the back stairs.',
      verbPool: ['climb', 'open', 'close', 'push'],
    },
  ],
  finish: { en: 'Nobody heard you… but they read you.', es: 'Nadie te oyó… pero te leyeron.', banner: 'Unheard completado' },
}
