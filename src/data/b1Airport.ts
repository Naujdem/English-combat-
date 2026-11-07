import type { EnemyDef } from '../game/types'

/**
 * B1-02 · A New City, bloque B: el lado del aeropuerto (escena b1-02-lumen, data/b1NewCity.ts).
 * Cadena: práctica de Leo (b1-02-practice) → Viajero 1 (junto a la cinta) → Viajera 2 (junto al check-in)
 *   → el empleado de Objetos Perdidos (tarea b1-02-luggage: Lost Luggage con data/b1Luggage.ts) → Jack the Rival (junto a las puertas de la derecha).
 * Cada paso aparece cuando el anterior está hecho (entidades con `after`). La viajera 2 da el atuendo 'almohada-de-viaje'.
 * Preguntas en data/questions-b1-02.ts (tags b1-02-trav1, b1-02-trav2, b1-02-jack). Sus frases con error están mal en cualquier contexto.
 */
export const B1_02_TRAV1 = 'b1-02-trav1'
export const B1_02_TRAV2 = 'b1-02-trav2'
export const B1_02_CLERK = 'b1-02-clerk'
export const B1_02_LUGGAGE = 'b1-02-luggage'
export const B1_02_JACK = 'b1-02-jack'

const PP = 'pp-yet-already' as const

export const B1_02_ENEMIES: Record<string, EnemyDef> = {
  [B1_02_TRAV1]: {
    id: B1_02_TRAV1,
    name: 'El viajero perdido',
    person: 'The traveler',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [PP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B1_02_TRAV1],
    onlyTags: true,
    zone: 'estacion',
    look: { shirt: '#6b8e8a', hair: '#3a2a1a', skin: '#c68642' },
    before: [{ text: "Where is my suitcase? Have you seen it yesterday? I haven't find it yet!", es: '¿Dónde está mi maleta? ¿La viste ayer? ¡Todavía no la encuentro! (Have you seen it yesterday y haven\'t find: mal).' }],
    after: [{ text: "Oh! I've found it. It was under my own coat!", es: '¡Oh! La encontré. ¡Estaba debajo de mi propio abrigo!' }],
    freed: { text: 'Thank you! Enjoy Lumen Bay.', es: '¡Gracias! Disfruta Lumen Bay.' },
    bonus: { q: 'Elige la frase correcta:', options: ["I've already found my bag.", "I've already find my bag.", 'I have already founded my bag.'], answer: 0, tip: 'have + already + participio: found.' },
  },
  [B1_02_TRAV2]: {
    id: B1_02_TRAV2,
    name: 'La viajera perdida',
    person: 'The traveler',
    kind: 'minion',
    echo: true,
    reward: 'almohada-de-viaje',
    hp: 5,
    topics: [PP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B1_02_TRAV2],
    onlyTags: true,
    zone: 'estacion',
    look: { shirt: '#a05a7a', hair: '#2a1a2a', skin: '#e0ac69', gender: 'female' },
    before: [{ text: "I already haven't checked in! The plane has just left yesterday!", es: '¡Todavía no me registré! ¡El avión acaba de irse ayer! (already haven\'t y has just left yesterday: mal).' }],
    after: [{ text: "I see. My flight hasn't left. I'm early!", es: 'Ya veo. Mi vuelo no ha salido. ¡Estoy temprano!' }],
    freed: { text: 'Have a good flight, and thank you!', es: '¡Buen vuelo, y gracias!' },
    bonus: { q: 'Elige la frase correcta:', options: ['She has just arrived.', 'She has just arrive.', 'She just has arrived.'], answer: 0, tip: 'just va entre has y el participio: has just arrived.' },
  },
  // Esbirro invitado: Jack the Rival (mismo aspecto que en A2-07, data/a2Race.ts). No da atuendo
  [B1_02_JACK]: {
    id: B1_02_JACK,
    name: 'Jack the Rival',
    person: 'Jack',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [PP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B1_02_JACK],
    onlyTags: true,
    zone: 'estacion',
    look: { shirt: '#b03a2e', hair: '#2b1d12', skin: '#e0ac69', accessory: 'cap', gender: 'male' },
    before: [{ text: "Look who's here! I have arrived yesterday and I have already see the whole city. Have you seen Lumen Bay yet? No? Ha!", es: '¡Mira quién llegó! Llegué ayer y ya vi toda la ciudad. ¿Ya viste Lumen Bay? ¿No? ¡Ja! (have arrived yesterday y have already see: mal).' }],
    after: [{ text: "Fine... you win this time. I haven't seen the harbour yet, to be honest.", es: 'Está bien... ganas esta vez. No he visto el puerto todavía, para ser sincero.' }],
    freed: { text: 'See you around. Maybe we can visit the harbour together... maybe.', es: 'Nos vemos. Quizá podamos visitar el puerto juntos... quizá.' },
    bonus: { q: 'Before you go! The plane has ___ landed. Look!', options: ['just', 'yet', 'ago'], answer: 0, tip: 'Hace muy poco: has just landed.' },
  },
}
