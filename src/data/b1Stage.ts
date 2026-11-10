import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { MusicContent } from '../components/MusicChallenge'

/**
 * B1-10 · Festival Night (presente). Bloque C: el frente del escenario principal del festival de Lumen Bay (escena b1-10-stage).
 * Se entra por la puerta del escenario de la carpa (b1-10-tent, data/b1GamingTent.ts) al terminar 'b1-10-debate'.
 *
 * Un escenario grande con pantalla y luces, la cabina del DJ al fondo (vacía por ahora), el público (decoración) y un micrófono.
 * Orden: Liceth junto al micrófono: Music Challenge "Lights Over Lumen Bay" (b1-10-music, 5 monedas) → dos espectadores corrompidos
 *   (esbirros encadenados, banco compartido b1-10-x1…x10) → la cabina del DJ: próximamente (bloque 10-D, The Headliner).
 * Ningún bloque C guarda closeId(10) (se guarda en 10-D).
 */
export const B1_10_STAGE_ID = 'b1-10-stage'
export const B1_10_LICETH_STAGE = 'b1-10-liceth-stage'
export const B1_10_MUSIC = 'b1-10-music'
export const B1_10_SPECTATOR1 = 'b1-10-spectator1'
export const B1_10_SPECTATOR2 = 'b1-10-spectator2'

/** La canción del Music Challenge (tarea b1-10-music y botón "Probar Music Challenge" del profe) */
export const B1_10_SONG: MusicContent = {
  title: 'Lights Over Lumen Bay',
  tempo: 100,
  intro: { en: 'The song lost its words. Keep the beat and choose the right ones.', es: 'La canción perdió sus palabras. Sigue el ritmo y elige las correctas.' },
  verses: [
    { line: 'If I had wings, I ___ above the stage tonight.', es: 'Si tuviera alas, volaría sobre el escenario esta noche.', options: ['will fly', 'would fly', 'flew'], answer: 1, tip: 'If + pasado simple, would + verbo base.' },
    { line: 'If the night ___ forever, we would never go home.', es: 'Si la noche durara para siempre, nunca nos iríamos a casa.', options: ['would last', 'lasts', 'lasted'], answer: 2, tip: 'If + pasado simple (lasted).' },
    { line: 'I would sing louder if you ___ with me.', es: 'Cantaría más fuerte si cantaras conmigo.', options: ['sang', 'would sing', 'sing'], answer: 0, tip: 'If + pasado simple (sang).' },
    { line: 'If I ___ a star, I would shine for you.', es: 'Si yo fuera una estrella, brillaría para ti.', options: ['am', 'were', 'would be'], answer: 1, tip: 'If + were.' },
    { line: 'What would you do if the lights ___ out?', es: '¿Qué harías si las luces se apagaran?', options: ['go', 'would go', 'went'], answer: 2, tip: 'If + pasado simple (went).' },
    { line: 'If we ___ together, we would never be alone.', es: 'Si nos quedáramos juntos, nunca estaríamos solos.', options: ['stayed', 'stay', 'would stay'], answer: 0, tip: 'If + pasado simple (stayed).' },
  ],
  finish: { en: 'The song is complete! The crowd is singing.', es: '¡La canción está completa! El público canta.', banner: '¡Canción completa!' },
}

/** Lo que dice el narrador al vencer a los dos espectadores (texto de ayuda de la escena y la cabina del DJ) */
export const B1_10_SPECTATORS_DONE = { text: '(The DJ booth lights turn grey. Something heavy is coming.)', es: '(Las luces de la cabina del DJ se vuelven grises. Algo pesado se acerca.)' }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero (luces) · v pantalla (el escenario) · s asientos (el público) · d puerta.
 * Cabina del DJ arriba (6,0, cerrada: bloque 10-D); puerta de vuelta a la carpa abajo (6,6).
 */
const MAP = [
  '##h#h#d#h#h##',
  '#.v.v...v.v.#',
  '#...........#',
  '#...........#',
  '#...........#',
  '#ss.......ss#',
  '######d######',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
const SOON = 'Próximamente: The Headliner (bloque 10-D)'
const bothDown = (s: GameState) => s.defeated.includes(B1_10_SPECTATOR1) && s.defeated.includes(B1_10_SPECTATOR2)

export const B1_10_STAGE: SceneDef = {
  id: B1_10_STAGE_ID,
  name: 'Lumen Bay · Main stage',
  topics: ['conditional-2', 'verb-patterns', 'prefer-b1', 'opinions-b1'],
  map: MAP,
  start: { x: 6, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_10_LICETH_STAGE, x: 6, y: 3 },
    { type: 'enemy', id: B1_10_SPECTATOR1, x: 4, y: 2, after: B1_10_MUSIC },
    { type: 'enemy', id: B1_10_SPECTATOR2, x: 8, y: 2, after: B1_10_SPECTATOR1 },
  ],
  labels: [
    { text: 'DJ booth', x: 6, y: 1 },
    { text: 'Microphone', x: 6, y: 4 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '2,1': { text: 'The big screen.', sub: 'La pantalla grande del escenario.', say: 'The big screen.' },
    '4,1': { text: 'The big screen.', sub: 'La pantalla grande del escenario.', say: 'The big screen.' },
    '8,1': { text: 'The big screen.', sub: 'La pantalla grande del escenario.', say: 'The big screen.' },
    '10,1': { text: 'The big screen.', sub: 'La pantalla grande del escenario.', say: 'The big screen.' },
    '1,5': { text: 'The crowd.', sub: 'El público.', say: 'The crowd.' },
    '2,5': { text: 'The crowd.', sub: 'El público.', say: 'The crowd.' },
    '10,5': { text: 'The crowd.', sub: 'El público.', say: 'The crowd.' },
    '11,5': { text: 'The crowd.', sub: 'El público.', say: 'The crowd.' },
    '2,0': { text: 'Stage lights.', sub: 'Las luces del escenario.', say: 'Stage lights.' },
    '4,0': { text: 'Stage lights.', sub: 'Las luces del escenario.', say: 'Stage lights.' },
    '8,0': { text: 'Stage lights.', sub: 'Las luces del escenario.', say: 'Stage lights.' },
    '10,0': { text: 'Stage lights.', sub: 'Las luces del escenario.', say: 'Stage lights.' },
  },
  // La cabina del DJ: cerrada hasta vencer a los dos espectadores; después, próximamente (bloque 10-D)
  locked: (x, y, s) => {
    if (x === 6 && y === 0) {
      if (!s.opened.includes(B1_10_MUSIC)) return NOT_YET('Primero habla con Liceth junto al micrófono.')
      if (!bothDown(s)) return NOT_YET('Primero ayuda a los espectadores corrompidos.')
      return { text: SOON + '.', sub: B1_10_SPECTATORS_DONE.es }
    }
    return null
  },
  links: { '6,6': { sceneId: 'b1-10-tent', pos: { x: 6, y: 1 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Liceth y el micrófono', done: s.opened.includes(B1_10_MUSIC) },
    { label: 'Espectadores corrompidos (2)', done: bothDown(s) },
    { label: SOON, done: false },
  ],
  intro: {
    first: 'Lights up! — ¡Luces arriba!',
    later: (s) => (bothDown(s) ? `${B1_10_SPECTATORS_DONE.text} — ${B1_10_SPECTATORS_DONE.es}` : 'Lights up! — ¡Luces arriba!'),
  },
}

// ── Bloque C · esbirros Corrupted Spectator (modelo de los Angry Fan de 8-C): banco compartido b1-10-x1…x10 ──
const SPECTATOR_TAGS = ['b1-10-spectator']
const SPECTATOR = (
  id: string,
  look: EnemyDef['look'],
  before: { text: string; es: string },
  after: { text: string; es: string },
  freed: { text: string; es: string },
): EnemyDef => ({
  id,
  name: 'Corrupted Spectator',
  person: 'Corrupted Spectator',
  kind: 'minion',
  echo: true,
  hp: 5,
  topics: ['conditional-2', 'verb-patterns', 'prefer-b1', 'opinions-b1'],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: SPECTATOR_TAGS,
  onlyTags: true,
  zone: 'recepcion',
  look,
  before: [before],
  after: [after],
  freed,
})

export const B1_10_ENEMIES: Record<string, EnemyDef> = {
  [B1_10_SPECTATOR1]: SPECTATOR(
    B1_10_SPECTATOR1,
    { shirt: '#d4488a', hair: '#2a1c14', skin: '#d9a37a' },
    { text: 'If I would have money, I would buy the stage! I enjoy to dance!', es: 'If I would have e I enjoy to dance: mal.' },
    { text: 'The music is too loud... I only wanted to dance.', es: 'La música está muy fuerte... solo quería bailar.' },
    { text: "Sorry! I'd rather dance than shout.", es: '¡Perdón! Prefiero bailar que gritar.' },
  ),
  [B1_10_SPECTATOR2]: SPECTATOR(
    B1_10_SPECTATOR2,
    { shirt: '#2d8c6a', hair: '#8a5a32', skin: '#e6b894' },
    { text: 'I prefer stay home! The best thing about is the music!', es: 'I prefer stay y The best thing about is: mal.' },
    { text: 'I feel normal again. Where are my friends?', es: 'Me siento normal otra vez. ¿Dónde están mis amigos?' },
    { text: 'Go to the main stage. The headliner is waiting.', es: 'Ve al escenario principal. El cabeza de cartel te espera.' },
  ),
}
