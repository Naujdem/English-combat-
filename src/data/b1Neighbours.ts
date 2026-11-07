import type { EnemyDef } from '../game/types'

/**
 * B1-04 · House Rules, bloque B: el pasillo de la residencia (escena b1-04-residence, data/b1Residence.ts).
 * Cadena: The Fine Print (b1-04-fineprint) abre el pasillo → Jeison, el vecino amable (tarea b1-04-jeison)
 *   → Vecino 1 → Vecina 2 (esbirros con banco compartido, tag b1-04-neighbour) → se abre tu cuarto
 *   → la caja de herramientas (tarea b1-04-repair: Repair Shop escrito, data/b1Repair.ts).
 * Cada paso aparece cuando el anterior está hecho (entidades con `after`). Sin atuendos.
 * Preguntas en data/questions-b1-04.ts. Sus frases con error están mal en cualquier contexto.
 */
export const B1_04_JEISON = 'b1-04-jeison'
export const B1_04_NEIGHBOUR1 = 'b1-04-neighbour1'
export const B1_04_NEIGHBOUR2 = 'b1-04-neighbour2'
/** La caja de herramientas de tu cuarto (se dibuja con ToolboxIcon, components/ToolboxIcon.tsx) */
export const B1_04_TOOLBOX = 'b1-04-toolbox'
export const B1_04_REPAIR = 'b1-04-repair'

const OB = 'obligation-b1' as const
const TAGS = ['b1-04-neighbour']

export const B1_04_ENEMIES: Record<string, EnemyDef> = {
  [B1_04_NEIGHBOUR1]: {
    id: B1_04_NEIGHBOUR1,
    name: 'Noisy Neighbour',
    person: 'The neighbour',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [OB],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: TAGS,
    onlyTags: true,
    zone: 'casa',
    look: { shirt: '#c0762e', hair: '#2b2b33', skin: '#c68642', gender: 'male' },
    before: [{ text: "Party time! You must to be quiet? Never! I don't must follow your rules!", es: '¡Hora de fiesta! ¿Que debo ser silencioso? ¡Nunca! ¡No tengo que seguir tus reglas! (You must to be quiet y I don\'t must follow: mal).' }],
    after: [{ text: 'Okay, okay... I will turn it down.', es: 'Está bien, está bien... voy a bajarle el volumen.' }],
    freed: { text: 'Sorry about the noise. Good night!', es: 'Perdón por el ruido. ¡Buenas noches!' },
    bonus: { q: 'Elige la frase correcta:', options: ["You mustn't smoke here.", "You don't must smoke here.", "You mustn't to smoke here."], answer: 0, tip: "Prohibido: mustn't + verbo base." },
  },
  [B1_04_NEIGHBOUR2]: {
    id: B1_04_NEIGHBOUR2,
    name: 'Noisy Neighbour',
    person: 'The neighbour',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [OB],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: TAGS,
    onlyTags: true,
    zone: 'casa',
    look: { shirt: '#8a4fa0', hair: '#3a2a1a', skin: '#e0ac69', gender: 'female' },
    before: [{ text: "I have to sing at night! She have to listen! You mustn't to complain!", es: '¡Tengo que cantar de noche! ¡Ella tiene que escuchar! ¡No debes quejarte! (She have to listen y mustn\'t to complain: mal).' }],
    after: [{ text: "Fine... I'll sing quietly. Or in the shower.", es: 'Está bien... cantaré bajito. O en la ducha.' }],
    freed: { text: 'Thanks for understanding. Sweet dreams!', es: 'Gracias por entender. ¡Dulces sueños!' },
    bonus: { q: 'Elige la frase correcta:', options: ['She has to be quiet.', 'She have to be quiet.', 'She must to be quiet.'], answer: 0, tip: 'She = has to + verbo base.' },
  },
}
