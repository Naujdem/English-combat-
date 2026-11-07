import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B1-04 · bloque B: Repair Shop (tu cuarto en la residencia de Lumen Bay). The Moving Stone escrito
 * (components/TextCommand.tsx): el jugador escribe la orden con phrasal verbs (turn on, plug in, set up).
 * Contenido promovido de la demo STONE_DEMO_ROOM (data/b1StoneDemo.ts), que sigue intacta para el panel del profe.
 * Tarea 'b1-04-repair' (la caja de herramientas) en data/tasks.ts.
 */
export const B1_REPAIR: TextCommandRoom = {
  mode: 'text',
  title: 'Repair Shop',
  intro: { en: 'Your new room needs a few fixes.', es: 'Tu cuarto nuevo necesita unos arreglos.' },
  scene: 'room',
  objects: ['heater', 'lamp', 'wifi', 'bed'],
  steps: [
    {
      problem: { en: 'It is cold. The heater is off.', es: 'Hace frío. El calentador está apagado.' },
      accept: [
        { verb: 'turn', particle: 'on', object: 'heater' },
        { verb: 'switch', particle: 'on', object: 'heater' },
      ],
      target: 'heater',
      done: { en: 'The heater is on. The room is warm now.', es: 'El calentador está prendido. El cuarto ya está caliente.' },
      tip: 'Encender = turn on (o switch on): Turn on the heater.',
      fails: { open: { en: 'You open it… but it is still cold.', es: 'Lo abres… pero sigue frío.' } },
      verbPool: ['open', 'push', 'kick', 'plug', 'fix'],
    },
    {
      problem: { en: 'The lamp is not connected.', es: 'La lámpara no está conectada.' },
      accept: [{ verb: 'plug', particle: 'in', object: 'lamp' }],
      target: 'lamp',
      done: { en: 'The lamp is plugged in. Now you can read.', es: 'La lámpara está enchufada. Ya puedes leer.' },
      tip: 'Enchufar = plug in: Plug in the lamp (o Plug it in).',
      fails: { turn: { en: "You try to turn it on, but it isn't plugged in.", es: 'Intentas prenderla, pero no está enchufada.' } },
      verbPool: ['turn', 'switch', 'open', 'fix', 'push'],
    },
    {
      problem: { en: 'There is no wifi. The router is in the box.', es: 'No hay wifi. El router está en la caja.' },
      accept: [{ verb: 'set', particle: 'up', object: 'wifi' }],
      target: 'wifi',
      done: { en: 'The wifi is set up. You have internet!', es: 'El wifi quedó instalado. ¡Tienes internet!' },
      tip: 'Instalar o configurar = set up: Set up the wifi.',
      fails: { turn: { en: 'The router turns on, but there is no network yet.', es: 'El router prende, pero todavía no hay red.' } },
      verbPool: ['turn', 'plug', 'open', 'fix', 'switch'],
    },
  ],
  finish: { en: 'Your room is ready!', es: '¡Tu cuarto está listo!', banner: '¡Cuarto arreglado!' },
}
