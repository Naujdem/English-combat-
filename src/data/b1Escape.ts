import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B1-07 · The Underworld, bloque D: la Escape Room (The Moving Stone escrito, components/TextCommand.tsx).
 * Mismo formato que STONE_DEMO_TUNNEL (data/b1StoneDemo.ts). La tarea 'b1-07-escape' (data/tasks.ts) la usa como command.
 * Al terminar, L vuelve al cuarto (NpcTask.goto).
 */
export const B1_07_ESCAPE_ROOM: TextCommandRoom = {
  mode: 'text',
  title: 'Escape Room',
  intro: { en: 'The alarm is ringing. Read the clues and find the way out.', es: 'La alarma está sonando. Lee las pistas y busca la salida.' },
  scene: 'tunnel',
  objects: ['lever', 'shelf', 'door', 'ladder'],
  steps: [
    {
      problem: { en: 'The alarm is ringing. A note on the wall says: "The lever must be pulled to stop it."', es: 'La alarma está sonando. Una nota en la pared dice: "La palanca debe ser jalada para pararla".' },
      // Se acepta con y sin 'down' (Pull the lever · Pull the lever down · Pull down the lever)
      accept: [
        { verb: 'pull', object: 'lever', optional: ['down'] },
        { verb: 'pull', particle: 'down', object: 'lever' },
      ],
      target: 'lever',
      done: { en: 'Click! The alarm stops. The red lights turn off.', es: '¡Clic! La alarma se detiene. Las luces rojas se apagan.' },
      tip: 'La pasiva dice qué hay que hacer: "must be pulled" → Pull the lever.',
      fails: { push: { en: "The lever doesn't move.", es: 'La palanca no se mueve.' } },
      verbPool: ['push', 'kick', 'lift', 'break', 'open'],
    },
    {
      problem: { en: 'The exit is behind the shelf. There are marks on the floor: somebody must have pushed it to the side before.', es: 'La salida está detrás del estante. Hay marcas en el piso: alguien debe de haberlo empujado a un lado antes.' },
      accept: [{ verb: 'push', particle: 'aside', object: 'shelf', optional: ['slowly'] }],
      target: 'shelf',
      done: { en: 'The shelf moves aside. There is a hole in the ceiling.', es: 'El estante se corre a un lado. Hay un hueco en el techo.' },
      tip: 'Las marcas muestran cómo se movió: Push the shelf aside.',
      fails: { pull: { en: 'The shelf comes towards you. It still blocks the way.', es: 'El estante viene hacia ti. Sigue tapando el paso.' } },
      verbPool: ['pull', 'lift', 'break', 'kick', 'open'],
    },
    {
      problem: { en: "The way out can't be the door: it has no handle. It must be the hole in the ceiling. There is a ladder under it.", es: 'La salida no puede ser la puerta: no tiene manija. Debe de ser el hueco del techo. Hay una escalera debajo.' },
      accept: [{ verb: 'climb', particle: 'up', object: 'ladder' }],
      target: 'ladder',
      done: { en: 'You climb up the ladder and see the night sky. You are out, with the device!', es: 'Subes por la escalera y ves el cielo de la noche. ¡Saliste, con el aparato!' },
      tip: 'Subir trepando = climb up: Climb up the ladder.',
      fails: { open: { en: "The door doesn't have a handle.", es: 'La puerta no tiene manija.' } },
      verbPool: ['open', 'push', 'pull', 'break', 'kick'],
    },
  ],
  finish: { en: 'You escaped from the Underworld.', es: 'Escapaste del bajo mundo.', banner: '¡Escapaste!' },
}
