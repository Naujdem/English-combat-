import type { TextCommandRoom } from '../components/TextCommand'

/**
 * DEMO de The Moving Stone escrito (B1, tarea 0-D): tres salas pequeñas con frases propias.
 * Se prueban desde el modo profesor. Las misiones 4 (Repair Shop), 7 (Escape Room) y los templos tendrán las suyas.
 */
export const STONE_DEMO_TEMPLE: TextCommandRoom = {
  mode: 'text',
  title: 'The Silent Temple',
  intro: { en: 'The temple writes in the passive. You answer with an order.', es: 'El templo escribe en pasiva. Tú respondes con una orden.' },
  scene: 'temple',
  objects: ['stone', 'lid', 'key', 'door'],
  steps: [
    {
      problem: { en: 'The wall says: "The stone must be pushed to the right."', es: 'El muro dice: "La piedra debe ser empujada a la derecha".' },
      accept: [{ verb: 'push', object: 'stone', optional: ['to the right', 'right', 'slowly'] }],
      target: 'stone',
      done: { en: 'The stone moves to the right. Something clicks.', es: 'La piedra se mueve a la derecha. Algo hace clic.' },
      tip: 'La pasiva dice qué hay que hacer: "must be pushed" → escribe la orden con push: Push the stone…',
      fails: { break: { en: "The stone doesn't move.", es: 'La piedra no se mueve.' }, kick: { en: 'Ouch! The stone is too heavy.', es: '¡Ay! La piedra es muy pesada.' } },
      verbPool: ['break', 'kick', 'pull', 'lift', 'open', 'move'],
    },
    {
      problem: { en: 'Under the stone there is a box. The wall says: "The lid must be lifted up."', es: 'Debajo de la piedra hay una caja. El muro dice: "La tapa debe ser levantada".' },
      accept: [{ verb: 'lift', particle: 'up', object: 'lid', optional: ['slowly'] }],
      target: 'lid',
      done: { en: 'The lid goes up. There is a gold key inside!', es: 'La tapa sube. ¡Adentro hay una llave dorada!' },
      tip: '"must be lifted up" → Lift up the lid (o Lift the lid up).',
      fails: { open: { en: 'The lid is too heavy to open. Try lifting it up.', es: 'La tapa pesa mucho. Prueba a levantarla.' }, push: { en: 'The lid slides a little, but it falls back.', es: 'La tapa se desliza un poco, pero vuelve a caer.' } },
      verbPool: ['open', 'push', 'pull', 'break', 'take'],
    },
    {
      problem: { en: 'The last line says: "The door must be opened with the gold key."', es: 'La última línea dice: "La puerta debe abrirse con la llave dorada".' },
      accept: [{ verb: 'open', object: 'door', complement: ['with the gold key', 'with the key', 'with the golden key'] }],
      target: 'door',
      done: { en: 'The key turns, and the door opens slowly.', es: 'La llave gira y la puerta se abre despacio.' },
      tip: 'Di la acción y con qué: Open the door with the gold key.',
      fails: { push: { en: "The door doesn't move. It needs a key.", es: 'La puerta no se mueve. Necesita una llave.' }, break: { en: 'The door is made of stone. It does not break.', es: 'La puerta es de piedra. No se rompe.' } },
      verbPool: ['push', 'break', 'pull', 'kick', 'lift'],
    },
  ],
  finish: { en: 'The temple door is open.', es: 'La puerta del templo está abierta.', banner: '¡Templo abierto!' },
}

export const STONE_DEMO_ROOM: TextCommandRoom = {
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

export const STONE_DEMO_TUNNEL: TextCommandRoom = {
  mode: 'text',
  title: 'Escape Room',
  intro: { en: 'You are in a dark tunnel. Find the way out.', es: 'Estás en un túnel oscuro. Busca la salida.' },
  scene: 'tunnel',
  objects: ['lever', 'shelf', 'door', 'ladder'],
  steps: [
    {
      problem: { en: 'The lever is up, and the lights are off.', es: 'La palanca está arriba y las luces están apagadas.' },
      accept: [{ verb: 'pull', particle: 'down', object: 'lever' }],
      target: 'lever',
      done: { en: 'Click! The lever is down, and a small light turns on.', es: '¡Clic! La palanca está abajo y se prende una luz pequeña.' },
      tip: 'Bajar tirando = pull down: Pull the lever down (o Pull down the lever).',
      fails: { push: { en: "The lever doesn't go up any more.", es: 'La palanca ya no sube más.' } },
      verbPool: ['push', 'turn', 'lift', 'break'],
    },
    {
      problem: { en: 'Now you can see a door. The shelf blocks the door.', es: 'Ahora ves una puerta. El estante tapa la puerta.' },
      accept: [{ verb: 'push', particle: 'aside', object: 'shelf', optional: ['slowly'] }],
      target: 'shelf',
      done: { en: 'The shelf moves aside. But the door is locked…', es: 'El estante se corre a un lado. Pero la puerta está cerrada con llave…' },
      tip: 'Apartar = push aside: Push the shelf aside.',
      fails: { pull: { en: 'The shelf comes towards you. It still blocks the door.', es: 'El estante viene hacia ti. Sigue tapando la puerta.' } },
      verbPool: ['pull', 'lift', 'break', 'open', 'kick', 'move'],
    },
    {
      problem: { en: 'The door is locked, but the exit is above you.', es: 'La puerta está cerrada, pero la salida está encima de ti.' },
      accept: [{ verb: 'climb', particle: 'up', object: 'ladder' }],
      target: 'ladder',
      done: { en: 'You climb up the ladder and see the sky. You are out!', es: 'Subes por la escalera y ves el cielo. ¡Saliste!' },
      tip: 'Subir trepando = climb up: Climb up the ladder.',
      fails: { open: { en: 'The door is locked. Look up!', es: 'La puerta está cerrada. ¡Mira arriba!' } },
      verbPool: ['open', 'push', 'pull', 'kick', 'go'],
    },
  ],
  finish: { en: 'You escaped from the tunnel!', es: '¡Escapaste del túnel!', banner: '¡Salida encontrada!' },
}

export const STONE_DEMOS = { temple: STONE_DEMO_TEMPLE, room: STONE_DEMO_ROOM, tunnel: STONE_DEMO_TUNNEL }
