import type { GameState } from '../game/types'
import { ENEMIES } from './enemies'
import { NPC_TASKS } from './tasks'
import { DIARY } from './diary'

/**
 * Coleccionables y logros: le dan una razón al jugador para hacer lo opcional
 * (los viajeros de otras épocas, las tareas con escudo, los diarios, las fichas).
 *
 * El álbum del tiempo: una carta por personaje, con un espacio por cada época en la que aparece.
 * Los espacios "Viajero" se ganan venciendo a los ecos (los que la luz del reloj arrastró a otra época).
 */
export type Era = 'Pasado' | 'Presente' | 'Futuro' | 'Viajero'
export type PortraitSrc = { enemy: string } | { npc: string } | { friend: 'leo' | 'maya' }
export type AlbumSlot = { era: Era; label: string; src: PortraitSrc; unlock: (s: GameState) => boolean; hint: string }
export type AlbumCard = { id: string; name: string; slots: AlbumSlot[] }

const beat = (id: string) => (s: GameState) => s.defeated.includes(id)
const did = (id: string) => (s: GameState) => s.opened.includes(id)

const E = (era: Era, label: string, id: string, hint: string): AlbumSlot => ({ era, label, src: { enemy: id }, unlock: beat(id), hint })
const N = (era: Era, label: string, npc: string, done: string, hint: string): AlbumSlot => ({ era, label, src: { npc }, unlock: did(done), hint })
const V = (label: string, id: string, hint: string): AlbumSlot => E('Viajero', label, id, hint)

export const ALBUM: AlbumCard[] = [
  { id: 'leo', name: 'Leo', slots: [
    { era: 'Presente', label: 'Leo, tu mejor amigo', src: { friend: 'leo' }, unlock: () => true, hint: '' },
    N('Futuro', 'El profesor Garcia', 'leo-adult', 'future-plan', 'Ayuda al profesor de 2056 con su clase.'),
  ] },
  { id: 'maya', name: 'Maya', slots: [
    { era: 'Presente', label: 'Maya', src: { friend: 'maya' }, unlock: did('school-epilogue'), hint: 'Termina la escuela.' },
    N('Futuro', 'Maya, la mamá de Theo', 'maya-adult', 'barrio-future-epilogue', 'Termina Green Street en 2056.'),
  ] },
  { id: 'grimm', name: 'Grimm', slots: [
    E('Pasado', 'Greg, el estudiante tímido', 'school-past-m1', 'Escuela de 1996.'),
    E('Presente', 'El profesor Grimm', 'school-boss', 'Jefe de la escuela.'),
    E('Futuro', 'GRIMM-BOT', 'school-future-boss', 'Jefe de la escuela de 2056.'),
    V('Greg, perdido en 2056', 'school-future-greg', 'Un viajero en la escuela de 2056.'),
  ] },
  { id: 'tom', name: 'Tom', slots: [
    E('Presente', 'Tom', 'school-m1', 'Escuela.'),
    V('Tom, perdido en 2056', 'school-future-tom', 'Un viajero en la escuela de 2056.'),
  ] },
  { id: 'rick', name: 'Rick', slots: [
    E('Presente', 'Rick, el presumido', 'school-m2', 'Escuela.'),
    V('Rick, perdido en 2056', 'office-future-rick', 'Un viajero en la torre de 2056.'),
  ] },
  { id: 'rossi', name: 'Tony Rossi', slots: [
    E('Pasado', 'Tony, el repartidor', 'city-past-m1', 'Ciudad de 1996.'),
    E('Presente', 'El señor Rossi, el guía', 'city-boss', 'Jefe de la ciudad.'),
    V('Tony, perdido en 2056', 'office-future-tony', 'Un viajero en la torre de 2056.'),
  ] },
  { id: 'danny', name: 'Danny', slots: [
    E('Presente', 'Danny, el despistado', 'city-m1', 'Ciudad.'),
    V('Danny, perdido en 1996', 'farm-past-danny', 'Un viajero en la granja de 1996.'),
    E('Futuro', 'El alcalde Danny', 'city-future-boss', 'Jefe de la ciudad de 2056.'),
  ] },
  { id: 'chloe', name: 'Chloe', slots: [
    E('Presente', 'Chloe, la vendedora', 'city-m2', 'Ciudad.'),
    E('Futuro', 'Chloe y su holo-tienda', 'city-future-m2', 'Ciudad de 2056.'),
  ] },
  { id: 'victor', name: 'Victor', slots: [
    E('Presente', 'Victor', 'city-m3', 'Ciudad.'),
    V('Victor, perdido en 2056', 'city-future-victor', 'Un viajero en la ciudad de 2056.'),
  ] },
  { id: 'betty', name: 'Betty', slots: [
    E('Pasado', 'Betty, la cartera', 'city-past-m2', 'Ciudad de 1996.'),
    V('Betty, perdida en 2056', 'city-future-betty', 'Una viajera en la ciudad de 2056.'),
  ] },
  { id: 'rosa', name: 'Rosa', slots: [
    N('Pasado', 'Rosa, la niña', 'rosa-kid', 'city-past-epilogue', 'Termina la ciudad de 1996.'),
    N('Presente', 'La oficial Rosa', 'rosa', 'city-epilogue', 'Termina la ciudad.'),
    N('Futuro', 'La jefa de policía', 'rosa-chief', 'city-future-epilogue', 'Termina la ciudad de 2056.'),
  ] },
  { id: 'lily', name: 'Lily', slots: [
    N('Presente', 'Lily, la mesera', 'lily', 'city-epilogue', 'Termina la ciudad.'),
    N('Futuro', 'Lily y su café robot', 'lily-adult', 'city-future-epilogue', 'Termina la ciudad de 2056.'),
  ] },
  { id: 'park', name: 'Mr. Park', slots: [
    N('Presente', 'El conductor del bus', 'driver', 'bus-city', 'Toma el bus a la ciudad.'),
    N('Futuro', 'El piloto del Sky Bus', 'park-old', 'bus-city-future', 'Toma el Sky Bus en 2056.'),
  ] },
  { id: 'joe', name: 'Joe', slots: [
    N('Pasado', 'Joe, el constructor', 'joe-young', 'past-verbbook', 'Lee el libro de verbos de Joe en 1996.'),
    N('Presente', 'El abuelo Joe', 'joe', 'barrio-photo', 'Ayuda al abuelo Joe con la fiesta.'),
  ] },
  { id: 'carmen', name: 'Carmen', slots: [
    E('Pasado', 'Carmen, la pintora', 'barrio-past-m2', 'Green Street en 1996.'),
    N('Presente', 'La señora García', 'garcia', 'barrio-invite', 'Visita la casa de Leo.'),
  ] },
  { id: 'emma', name: 'Emma', slots: [
    N('Presente', 'Emma, la hermana de Leo', 'emma', 'barrio-epilogue', 'Termina el barrio.'),
    N('Futuro', 'Emma organiza la fiesta', 'emma-adult', 'future-party', 'Ayuda a Emma con la fiesta de 2056.'),
  ] },
  { id: 'rojas', name: 'Mr. Rojas', slots: [
    N('Presente', 'El papá de Maya', 'rojas', 'barrio-likes', 'Visita la casa de Maya.'),
    N('Futuro', 'Mr. Rojas, 85 años', 'rojas-old', 'barrio-future-epilogue', 'Termina Green Street en 2056.'),
  ] },
  { id: 'hill', name: 'Frank Hill', slots: [
    E('Pasado', 'El capataz Hill', 'barrio-past-boss', 'Jefe de Green Street en 1996.'),
    E('Presente', 'El vecino gruñón', 'barrio-m3', 'Barrio.'),
  ] },
  { id: 'sam', name: 'Sam', slots: [
    E('Pasado', 'Sam, el albañil', 'barrio-past-m1', 'Green Street en 1996.'),
    V('Sam, perdido en 2056', 'barrio-future-sam', 'Un viajero en Green Street de 2056.'),
  ] },
  { id: 'kevin', name: 'Kevin', slots: [
    E('Presente', 'Kevin', 'barrio-m1', 'Barrio.'),
    V('Kevin, perdido en 1996', 'office-past-kevin', 'Un viajero en el cine de 1996.'),
  ] },
  { id: 'olivia', name: 'Olivia', slots: [
    E('Presente', 'Olivia, la reportera', 'barrio-m2', 'Barrio.'),
    V('Olivia, perdida en 2056', 'barrio-future-olivia', 'Una viajera en Green Street de 2056.'),
  ] },
  { id: 'nick', name: 'Nick', slots: [
    E('Presente', 'Nick, tu hermano', 'barrio-boss', 'Jefe del barrio.'),
    E('Futuro', 'Nick, treinta años después', 'barrio-future-boss', 'Jefe de Green Street en 2056.'),
  ] },
  { id: 'brown', name: 'Bill Brown', slots: [
    N('Pasado', 'Bill, el detective', 'bill', 'past-mystery', 'Resuelve el misterio del molino.'),
    E('Presente', 'El señor Brown', 'farm-boss', 'Jefe de la granja.'),
    E('Futuro', 'El abuelo Brown', 'farm-future-boss', 'Jefe de la granja de 2056.'),
  ] },
  { id: 'patel', name: 'Priya Patel', slots: [
    E('Pasado', 'Priya, la ayudante', 'farm-past-m2', 'Granja de 1996.'),
    N('Presente', 'La doctora Patel', 'patel', 'farm-pens', 'Ayuda a la doctora Patel con los corrales.'),
    N('Futuro', 'La doctora Patel, 80 años', 'patel-old', 'farm-future-epilogue', 'Termina la granja de 2056.'),
  ] },
  { id: 'rosie', name: 'Rosie', slots: [
    N('Presente', 'Rosie, la nieta', 'rosie', 'farm-guess', 'Juega "Adivina el animal" con Rosie.'),
    N('Futuro', 'Rosie, la granjera', 'rosie-adult', 'future-predict', 'Ayuda a Rosie en 2056.'),
  ] },
  { id: 'daisy', name: 'Daisy', slots: [
    E('Presente', 'Daisy, la vaca', 'farm-m1', 'Granja.'),
    V('Daisy, perdida en 1996', 'farm-past-daisy', 'Una viajera en la granja de 1996.'),
  ] },
  { id: 'thunder', name: 'Thunder', slots: [
    E('Presente', 'Thunder, el caballo', 'farm-m2', 'Granja.'),
    V('Thunder, perdido en 2056', 'farm-future-thunder', 'Un viajero en la granja de 2056.'),
  ] },
  { id: 'max', name: 'Max, el cachorro', slots: [
    E('Pasado', 'Max', 'farm-past-m1', 'Granja de 1996.'),
    V('Max, perdido en 2056', 'farm-future-max', 'Un viajero en la granja de 2056.'),
  ] },
  { id: 'gary', name: 'Gary', slots: [
    E('Presente', 'Gary, el del reloj loco', 'office-m1', 'Oficina.'),
    V('Gary, perdido en 1996', 'office-past-gary', 'Un viajero en el cine de 1996.'),
  ] },
  { id: 'paula', name: 'Paula', slots: [
    E('Presente', 'Paula, la de los correos', 'office-m2', 'Oficina.'),
    E('Futuro', 'Paula, la nueva directora', 'office-future-m1', 'Torre de 2056.'),
  ] },
  { id: 'stone', name: 'Ray Stone', slots: [
    E('Pasado', 'Ray, el proyeccionista', 'office-past-m1', 'Cine de 1996.'),
    E('Presente', 'El señor Stone', 'office-m3', 'Oficina.'),
    E('Futuro', 'El señor Stone, 80 años', 'office-future-boss', 'Jefe de la torre de 2056.'),
  ] },
  { id: 'diana', name: 'Diana Clark', slots: [
    N('Pasado', 'Diana, la de la taquilla', 'diana', 'past-timeline', 'Ayuda a Diana con la historia del cine.'),
    E('Presente', 'La señora Clark', 'office-boss', 'Jefa de la oficina.'),
    N('Futuro', 'Diana se despide', 'diana-old', 'future-speech', 'Ayuda a Diana con su discurso.'),
  ] },
  { id: 'grace', name: 'Grace', slots: [
    E('Pasado', 'Grace, la de las palomitas', 'office-past-m2', 'Cine de 1996.'),
    N('Presente', 'Grace, la asistente', 'grace', 'office-message', 'Contesta el teléfono por Grace.'),
    N('Futuro', 'Grace, jubilada', 'grace-old', 'office-future-epilogue', 'Termina la torre de 2056.'),
  ] },
]

export const ALBUM_SLOTS = ALBUM.reduce((n, c) => n + c.slots.length, 0)
export const albumCount = (s: GameState) => ALBUM.reduce((n, c) => n + c.slots.filter((x) => x.unlock(s)).length, 0)
export const cardsComplete = (s: GameState) => ALBUM.filter((c) => c.slots.every((x) => x.unlock(s))).length

const ECHOES = Object.values(ENEMIES).filter((e) => e.echo).map((e) => e.id)
const SHIELD_TASKS = Object.values(NPC_TASKS).filter((t) => t.shield).map((t) => t.done)

function answers(s: GameState) {
  let ok = 0
  let fail = 0
  for (const v of Object.values(s.stats)) {
    ok += v?.ok ?? 0
    fail += v?.fail ?? 0
  }
  return { ok, fail, total: ok + fail }
}

export type Achievement = {
  id: string
  name: string
  desc: string
  /** Progreso: [actual, meta] */
  progress: (s: GameState) => [number, number]
  reward?: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'voz-presente', name: 'Mi voz en presente', desc: 'Recupera las cinco piezas del reloj.', progress: (s) => [Math.min(s.relics, 5), 5] },
  { id: 'voz-pasado', name: 'Recuerdos de 1996', desc: 'Recupera los cinco fragmentos de voz del pasado.', progress: (s) => [['school', 'city', 'barrio', 'farm', 'office'].filter((p) => s.defeated.includes(`${p}-past-boss`)).length, 5] },
  { id: 'voz-futuro', name: 'Mi voz completa', desc: 'Recupera los cinco fragmentos de voz del futuro y termina A1.', progress: (s) => [['school', 'city', 'barrio', 'farm', 'office'].filter((p) => s.defeated.includes(`${p}-future-boss`)).length, 5] },
  { id: 'ecos', name: 'De vuelta a casa', desc: 'Devuelve a su época a todos los viajeros que arrastró la luz del reloj.', progress: (s) => [ECHOES.filter((e) => s.defeated.includes(e)).length, ECHOES.length], reward: 'chaqueta-viajero' },
  { id: 'escudos', name: 'Escudero', desc: 'Termina todas las tareas que dan un escudo de palabras.', progress: (s) => [SHIELD_TASKS.filter((d) => s.opened.includes(d)).length, SHIELD_TASKS.length], reward: 'camiseta-dorada' },
  { id: 'album-mitad', name: 'Media colección', desc: 'Llena la mitad del álbum del tiempo.', progress: (s) => [Math.min(albumCount(s), Math.ceil(ALBUM_SLOTS / 2)), Math.ceil(ALBUM_SLOTS / 2)] },
  { id: 'album', name: 'El álbum del tiempo', desc: 'Llena todo el álbum: cada personaje en cada época.', progress: (s) => [albumCount(s), ALBUM_SLOTS], reward: 'traje-tiempo' },
  { id: 'diarios', name: 'Querido diario', desc: 'Lee todos los diarios de los capítulos.', progress: (s) => [DIARY.filter((d) => s.opened.includes(`diary-open-${d.id}`)).length, DIARY.length] },
  { id: 'fichas', name: 'Coleccionista de palabras', desc: 'Guarda 50 palabras en tus fichas (toca una palabra en una lectura).', progress: (s) => [Math.min(s.cards.length, 50), 50] },
  { id: 'aciertos', name: 'Sabelotodo', desc: 'Responde bien 300 preguntas.', progress: (s) => [Math.min(answers(s).ok, 300), 300] },
  {
    id: 'precision',
    name: 'Ojo de águila',
    desc: 'Acierta el 90 % de tus respuestas (después de responder 100).',
    progress: (s) => {
      const a = answers(s)
      if (a.total < 100) return [a.total, 100]
      return a.ok / a.total >= 0.9 ? [100, 100] : [Math.floor((a.ok / a.total) * 100), 90]
    },
  },
  { id: 'cuaderno', name: 'Cuaderno limpio', desc: 'Deja tu cuaderno de errores en cero (después de responder 50 preguntas).', progress: (s) => (answers(s).total < 50 ? [answers(s).total, 50] : s.mistakes.length === 0 ? [1, 1] : [0, 1]) },
  { id: 'escritor', name: 'Mis propias palabras', desc: 'Escribe tus frases en los tres exámenes de época (presente, pasado y futuro).', progress: (s) => [Object.keys(s.writings ?? {}).length, 3] },
  { id: 'atuendos', name: 'A la moda', desc: 'Consigue 12 atuendos.', progress: (s) => [Math.min(s.outfits.length, 12), 12] },
]

export const achieved = (a: Achievement, s: GameState) => {
  const [c, g] = a.progress(s)
  return c >= g
}
