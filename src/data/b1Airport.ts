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
/** Bloque D: el jefe de la misión 2, en la calle tras Route Challenge (b1-02-route) */
export const B1_02_BOSS = 'b1-02-boss'

const PP = 'pp-yet-already' as const
const FB = 'futures-b1' as const

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
  // Bloque D · jefe (2 fases): Captain Delay, la voz corrompida de los altavoces del aeropuerto. Da la gorra de capitán
  [B1_02_BOSS]: {
    id: B1_02_BOSS,
    name: 'Captain Delay',
    person: 'Captain Delay',
    kind: 'boss',
    reward: 'gorra-de-capitan',
    hp: 8,
    topics: [PP, FB],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['b1-02-boss'],
    // Fase 1: present perfect con yet / already / just · Fase 2: los tres futuros
    phases: [
      {
        hp: 4,
        title: 'Present perfect: yet, already, just',
        topics: [PP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['b1-02-boss-pp'],
        line: { text: "The flight hasn't leave yet! I haven't finish my announcement yet!", es: "¡El vuelo todavía no sale! ¡Todavía no termino mi anuncio! (hasn't leave y haven't finish: mal)." },
      },
      {
        hp: 4,
        title: 'Los tres futuros',
        topics: [FB],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['b1-02-boss-fut'],
        line: { text: 'The plane will leaving at six! Tomorrow I going to cancel every flight!', es: '¡El avión va a salir a las seis! ¡Mañana voy a cancelar todos los vuelos! (will leaving y I going to: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'estacion',
    look: { shirt: '#1f3c58', hair: '#7a7a85', skin: '#d8c7b0', accessory: 'cap', gender: 'male' },
    before: [{ text: "Attention, please! Flight 404 hasn't leave yet! Flight 12 has already left tomorrow! All passengers will to wait forever!", es: '¡Atención, por favor! ¡El vuelo 404 todavía no sale! ¡El vuelo 12 ya salió mañana! ¡Todos los pasajeros van a esperar para siempre! (hasn\'t leave, has already left tomorrow y will to wait: mal).' }],
    after: [{ text: 'Departing... arriving... the board is clear. Every flight is on time again.', es: 'Saliendo... llegando... el tablero está limpio. Todos los vuelos salen a tiempo otra vez.' }],
    freed: { text: 'Have a pleasant journey!', es: '¡Buen viaje!' },
    farewell: { q: "Captain Delay says: 'Have a pleasant journey!' What do you answer?", options: ['Thank you! Goodbye!', 'Thanks you! Goodbyes!', 'Thank! Good bye you!'], answer: 0, tip: 'Para agradecer y despedirte: Thank you! Goodbye!' },
  },
}
