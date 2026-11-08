import type { FinePrintContent } from '../components/FinePrint'
import type { SpriteLook } from '../components/Sprite'
import type { GameState, SceneDef, Zone } from '../game/types'
import { B1_06_AD_IDS, B1_06_QUESTIONS } from './questions-b1-06'

/**
 * B1-06 · First Job (presente). Bloque A: el refugio de animales "Lumen Paws" (escena b1-06-shelter).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Un recibidor luminoso: mostrador con Ms. Noor Haddad (la coordinadora), el tablón con el anuncio,
 * la mesa de postulación, la puerta del fondo a las jaulas (cerrada: bloque 6-B) y la puerta de salida.
 * Orden: Ms. Haddad: lección 'work-english' + práctica (b1-06-advert) → el tablón: el anuncio con FinePrint
 *   en modo anuncios (b1-06-read) → la mesa: Sequence Master "How to apply" (b1-06-apply, 5 monedas).
 * Ningún bloque A guarda closeId(6) (se guarda en 6-D). La camiseta del refugio se entrega en 6-D.
 */
export const B1_06_SHELTER_ID = 'b1-06-shelter'
export const B1_06_HADDAD = 'b1-06-haddad'
export const B1_06_BOARD = 'b1-06-board'
export const B1_06_DESK = 'b1-06-desk'
export const B1_06_ADVERT = 'b1-06-advert'
export const B1_06_READ = 'b1-06-read'
export const B1_06_APPLY = 'b1-06-apply'

/** Ms. Noor Haddad: su sprite (npcs.ts) y su retrato cuando guía la lección (Lesson.tsx, who 'haddad') */
export const B1_06_HADDAD_LOOK: SpriteLook = { shirt: '#2f7f7a', hair: '#2a1c14', skin: '#c68e6a', gender: 'female' }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero · C mostrador · p planta · d puerta.
 * Puerta a las jaulas arriba (5,0); puerta de salida abajo (5,6). Mostrador en y 3 (x 2-4), Ms. Haddad a su lado.
 */
const MAP = [
  '##h##d#####',
  '#.........#',
  '#.........#',
  '#.CCC.....#',
  '#.........#',
  '#p.......p#',
  '#####d#####',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
export const B1_06_SOON = 'Próximamente: Nayi y los perros (bloque 6-B)'

/** El anuncio del tablón (FinePrint en modo anuncios). Las preguntas salen de data/questions-b1-06.ts (b1-06-r1…r3) */
export const B1_06_JOB_ADVERT: FinePrintContent = {
  title: 'Job advert',
  intro: { en: 'Read the job advert.', es: 'Lee el anuncio de empleo.' },
  paper: { heading: 'Volunteer helper wanted — Lumen Paws Shelter', sub: 'Lumen Paws · Notice board' },
  clauses: [],
  adverts: [
    {
      sections: [
        { label: 'About us', en: 'We look after dogs and cats without a home.', es: 'Cuidamos perros y gatos sin hogar.' },
        { label: 'Duties', en: 'Feed the animals. Walk the dogs. Clean the kennels.', es: 'Dar de comer a los animales. Pasear a los perros. Limpiar las jaulas.' },
        { label: 'Requirements', en: 'Experience in animal care. Reliable and friendly. Good English.', es: 'Experiencia en el cuidado de animales. Confiable y amable. Buen inglés.' },
        { label: 'Hours', en: 'Part-time, 15 hours a week.', es: 'Medio tiempo, 15 horas a la semana.' },
        { label: 'How to apply', en: 'Send your CV and a short letter to Ms. Haddad.', es: 'Envía tu hoja de vida y una carta corta a la señora Haddad.' },
      ],
    },
  ],
  questions: B1_06_AD_IDS.map((id) => B1_06_QUESTIONS.find((q) => q.id === id)!).map((q) => ({ prompt: q.prompt, options: q.options, answer: q.answer, tip: q.tip })),
  finish: { en: 'Now you know the job. Time to apply!', es: 'Ya conoces el trabajo. ¡Hora de postularte!' },
}

export const B1_06_SHELTER: SceneDef = {
  id: B1_06_SHELTER_ID,
  name: 'Lumen Bay · Lumen Paws',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_06_HADDAD, x: 5, y: 3 },
    { type: 'npc', id: B1_06_BOARD, x: 8, y: 1 },
    { type: 'npc', id: B1_06_DESK, x: 8, y: 4 },
  ],
  labels: [
    { text: 'Lumen Paws', x: 5, y: 4 },
    { text: 'Jaulas', x: 5, y: 1 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '2,3': { text: 'The reception desk.', sub: 'El mostrador de recepción.', say: 'The reception desk.' },
    '3,3': { text: 'The reception desk.', sub: 'El mostrador de recepción.', say: 'The reception desk.' },
    '4,3': { text: 'The reception desk.', sub: 'El mostrador de recepción.', say: 'The reception desk.' },
    '2,0': { text: 'LUMEN PAWS. Animal shelter.', sub: 'LUMEN PAWS. Refugio de animales.', say: 'Lumen Paws. Animal shelter.' },
  },
  // La puerta del fondo (jaulas): cerrada hasta postularse; después, el aviso del bloque 6-B. La salida: con el botón Mapa
  locked: (x, y, s) => {
    if (x === 5 && y === 0) {
      if (!s.opened.includes(B1_06_APPLY)) return NOT_YET('Primero postúlate en la mesa de postulación.')
      return { text: 'You can hear the dogs.', sub: B1_06_SOON }
    }
    if (x === 5 && y === 6) return { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' }
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con Ms. Haddad', done: s.opened.includes(B1_06_ADVERT) },
    { label: 'El tablón de anuncios', done: s.opened.includes(B1_06_READ) },
    { label: 'La mesa de postulación', done: s.opened.includes(B1_06_APPLY) },
    { label: B1_06_SOON, done: false },
  ],
  intro: {
    first: 'My first real job. — Mi primer trabajo de verdad.',
    later: 'My first real job. — Mi primer trabajo de verdad.',
  },
}
