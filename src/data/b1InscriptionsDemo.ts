import type { InscriptionRoom } from '../game/inscriptions'

/**
 * DEMO de Inscriptions (B1, tarea 0-C): dos salas de prueba con frases propias y sencillas.
 * Se usan desde el modo profesor y en la tarea de prueba de la tablilla (data/tasks.ts, 'b1-demo-tablet').
 * Las misiones 9, 11 y 13 tendrán sus propias salas en sus archivos.
 */
export const INS_DEMO_DOOR: InscriptionRoom = {
  title: 'The Keeper’s Door',
  intro: {
    en: 'The old door has three lines of glyphs. Build each sentence to wake the door.',
    es: 'La puerta vieja tiene tres líneas de glifos. Arma cada frase para despertar la puerta.',
  },
  scene: 'door',
  plates: [
    {
      words: ['The door', 'was', 'opened', 'by the keeper'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'La puerta fue abierta por el guardián.',
      rule: {
        title: 'La pasiva en pasado',
        text: 'Cuando importa más la cosa que quien actúa, la cosa va primero: sujeto + was / were + participio. Quién lo hizo va al final, con by.',
        examples: ['The door was opened.', 'The door was opened by the keeper.'],
      },
      hint: 'Primero la cosa (The door). Después was y el participio (opened).',
      distractors: [{ text: 'open', role: 'participle' }],
      effect: 'La puerta se abre un poco.',
    },
    {
      words: ['The stones', 'were', 'carved', 'by the ancient people'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'Las piedras fueron talladas por el pueblo antiguo.',
      rule: {
        title: 'Was o were',
        text: 'Con un sujeto en singular va was; con uno en plural (the stones), were. El participio no cambia: carved.',
        examples: ['The stone was carved.', 'The stones were carved.'],
      },
      hint: '"The stones" es plural: va con were.',
      distractors: [{ text: 'was', role: 'aux' }],
      effect: 'La puerta se abre un poco más.',
    },
    {
      words: ['the old door', 'was', 'opened', 'by the keeper', 'at night'],
      roles: ['subject', 'aux', 'participle', 'agent', 'time'],
      es: 'La vieja puerta fue abierta por el guardián de noche.',
      rule: {
        title: 'La frase completa',
        text: 'Sujeto + was / were + participio + by (quién) + cuándo. El momento (at night) puede ir al principio o al final.',
        examples: ['The old door was opened by the keeper at night.', 'At night, the old door was opened by the keeper.'],
      },
      hint: 'Es la frase de la primera tablilla con dos piezas más: old y at night.',
      alt: [['at night', 'the old door', 'was', 'opened', 'by the keeper']],
      effect: 'La puerta se abre del todo.',
    },
  ],
  finish: { en: 'The door is open. The temple is waiting.', es: 'La puerta está abierta. El templo espera.', banner: '¡Puerta abierta!' },
}

export const INS_DEMO_BRIDGE: InscriptionRoom = {
  title: 'The Ancient Bridge',
  intro: {
    en: 'There is no bridge over the gap. Each true sentence builds one part of it.',
    es: 'No hay puente sobre el abismo. Cada frase verdadera construye un tramo.',
  },
  scene: 'bridge',
  plates: [
    {
      words: ['The clock', 'must be', 'kept', 'in the dark'],
      roles: ['subject', 'aux', 'participle', 'complement'],
      es: 'El reloj debe guardarse en la oscuridad.',
      rule: {
        title: 'La pasiva con modales',
        text: 'Modal + be + participio: must be kept, can be opened. Después del modal va be, sin to.',
        examples: ['The clock must be kept in the dark.', 'The box can be opened.'],
      },
      hint: 'Después de must va be (sin to), y luego el participio: kept.',
      distractors: [{ text: 'must to be', role: 'aux' }],
      effect: 'Aparece el primer tramo del puente.',
    },
    {
      words: ['The bridge', "can't be", 'crossed', 'by force'],
      roles: ['subject', 'aux', 'participle', 'complement'],
      es: 'El puente no se puede cruzar por la fuerza.',
      rule: {
        title: 'La negativa',
        text: "Para decir que algo no se puede hacer: can't be + participio. El participio no cambia: crossed.",
        examples: ["The bridge can't be crossed by force.", "The door can't be opened."],
      },
      hint: "El participio de cross es crossed (con -ed).",
      distractors: [{ text: 'cross', role: 'participle' }],
      effect: 'Aparece otro tramo del puente.',
    },
    {
      words: ['the bridge', 'must be', 'crossed', 'slowly', 'at night'],
      roles: ['subject', 'aux', 'participle', 'complement', 'time'],
      es: 'El puente debe cruzarse despacio de noche.',
      rule: {
        title: 'Todo junto',
        text: 'Sujeto + modal + be + participio + cómo + cuándo. El momento (at night) puede ir al principio o al final.',
        examples: ['The bridge must be crossed slowly at night.', 'At night, the bridge must be crossed slowly.'],
      },
      hint: 'Cómo (slowly) va antes de cuándo (at night). At night también puede ir al principio.',
      alt: [['at night', 'the bridge', 'must be', 'crossed', 'slowly']],
      effect: 'El último tramo une los dos lados.',
    },
  ],
  finish: { en: 'The bridge is complete. You can cross now.', es: 'El puente está completo. Ya puedes cruzar.', banner: '¡Puente completo!' },
}

export const INS_DEMOS = { door: INS_DEMO_DOOR, bridge: INS_DEMO_BRIDGE }
