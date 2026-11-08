import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-08 · Game Day (presente). Bloque C: el pasillo bajo las gradas en el medio tiempo (escena b1-08-concourse).
 * Se entra por el portón de las gradas (b1-08-stands, data/b1Stands.ts) al terminar 'b1-08-emphasis'.
 *
 * Un puesto de snacks, banderines, un televisor con el marcador y la puerta del túnel de jugadores al fondo.
 * Orden: la persona especial: lección 'question-tags' + práctica (b1-08-tags) → los 2 hinchas corrompidos
 *   (esbirros encadenados, banco compartido b1-08-f1…f10) → la puerta del túnel: "Próximamente: The Champion (bloque 8-D)".
 * Ningún bloque C guarda closeId(8) (se guarda en 8-D). La bufanda del equipo se entrega en 8-D.
 */
export const B1_08_CONCOURSE_ID = 'b1-08-concourse'
export const B1_08_SPECIAL_HALF = 'b1-08-special-half'
export const B1_08_TAGS = 'b1-08-tags'
export const B1_08_FAN1 = 'b1-08-fan1'
export const B1_08_FAN2 = 'b1-08-fan2'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero (banderines) · v pantalla (el televisor con el marcador)
 * C mostrador (el puesto de snacks) · d puerta.
 * Puerta del túnel de jugadores arriba (5,0); puerta de vuelta a las gradas a la izquierda (0,3).
 */
const MAP = [
  '#####d#####',
  '#h.h...h.v#',
  '#.........#',
  'd.........#',
  '#CC.......#',
  '###########',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_08_CONCOURSE: SceneDef = {
  id: B1_08_CONCOURSE_ID,
  name: 'Lumen Bay · Half time',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_08_SPECIAL_HALF, x: 3, y: 2 },
    // Al terminar la lección de question tags, los hinchas corrompidos, uno tras otro
    { type: 'enemy', id: B1_08_FAN1, x: 6, y: 2, after: B1_08_TAGS },
    { type: 'enemy', id: B1_08_FAN2, x: 7, y: 3, after: B1_08_FAN1 },
  ],
  labels: [
    { text: 'Túnel', x: 5, y: 1 },
    { text: 'Snacks', x: 1, y: 3 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '1,4': { text: 'Snacks.', sub: 'El puesto de snacks.', say: 'Snacks.' },
    '2,4': { text: 'Snacks.', sub: 'El puesto de snacks.', say: 'Snacks.' },
    '9,1': { text: "It's half time.", sub: 'El televisor con el marcador.', say: "It's half time." },
  },
  // La puerta del túnel: cerrada hasta vencer a los 2 hinchas; después, "Próximamente: The Champion (bloque 8-D)".
  // La puerta de la izquierda vuelve a las gradas
  locked: (x, y, s) => {
    if (x !== 5 || y !== 0) return null
    if (!s.opened.includes(B1_08_TAGS)) return NOT_YET('Primero habla con la persona especial.')
    if (!s.defeated.includes(B1_08_FAN1) || !s.defeated.includes(B1_08_FAN2)) return NOT_YET('Primero ayuda a los hinchas corrompidos.')
    return {
      text: '(The tunnel is open. The second half is about to begin.)',
      sub: '(El túnel está abierto. El segundo tiempo está por empezar.) Próximamente: The Champion (bloque 8-D).',
    }
  },
  links: { '0,3': { sceneId: 'b1-08-stands', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La persona especial', done: s.opened.includes(B1_08_TAGS) },
    { label: 'Hinchas corrompidos (2)', done: s.defeated.includes(B1_08_FAN1) && s.defeated.includes(B1_08_FAN2) },
    { label: 'Próximamente: The Champion (bloque 8-D)', done: false },
  ],
  intro: {
    first: 'Half time! — ¡Medio tiempo!',
    later: 'Half time! — ¡Medio tiempo!',
  },
}

// ── Bloque C · esbirros Angry Fan (modelo de los Tired Volunteer de 6-C): banco compartido b1-08-f1…f10 ──
const FAN_TAGS = ['b1-08-fan']
const FAN = (
  id: string,
  look: EnemyDef['look'],
  before: { text: string; es: string },
  after: { text: string; es: string },
  freed: { text: string; es: string },
): EnemyDef => ({
  id,
  name: 'Angry Fan',
  person: 'Angry Fan',
  kind: 'minion',
  echo: true,
  hp: 5,
  topics: ['superlatives-b1', 'emphasis-b1', 'question-tags', 'football-results'],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: FAN_TAGS,
  onlyTags: true,
  zone: 'recepcion',
  look,
  before: [before],
  after: [after],
  freed,
})

export const B1_08_ENEMIES: Record<string, EnemyDef> = {
  [B1_08_FAN1]: FAN(
    B1_08_FAN1,
    { shirt: '#c0392b', hair: '#3a2a1a', skin: '#d9a37a' },
    { text: 'Julian is the most fast player! Such good game!', es: 'The most fast player y Such good game: mal.' },
    { text: 'My voice... I was shouting for no reason.', es: 'Mi voz... estaba gritando sin motivo.' },
    { text: "Sorry! It's a great match, isn't it?", es: '¡Perdón! Es un gran partido, ¿no?' },
  ),
  [B1_08_FAN2]: FAN(
    B1_08_FAN2,
    { shirt: '#1f5fa8', hair: '#555555', skin: '#e6b894' },
    { text: 'The most good team! What goal!', es: 'The most good team y What goal: mal.' },
    { text: 'The noise is gone. I can hear the match again.', es: 'El ruido se fue. Puedo oír el partido otra vez.' },
    { text: "Go and see the second half. It's going to be great!", es: 'Ve a ver el segundo tiempo. ¡Va a ser genial!' },
  ),
}
