/**
 * Lugares del mapa. Cada nivel se recorre en presente; con el reloj completo
 * se recorren los mismos lugares en el pasado y en el futuro de ese nivel.
 * Cada jefe suelta una pieza del reloj: el reloj tiene una pieza por lugar.
 * Plan completo en docs/curriculo-a1.md.
 */
export type WorldNode = {
  id: string
  name: string
  era: 'Presente' | 'Pasado' | 'Futuro'
  level: 'A1' | 'A2' | 'B1'
  /** Qué se aprende aquí (se muestra al tocar un lugar que aún no existe) */
  about: string
  /** Escena jugable; null = todavía no existe */
  sceneId: string | null
  /** Jefe que hay que vencer para viajar aquí, y desde dónde se llega */
  requires: { boss: string; from: string; how: string } | null
  x: number
  y: number
}

export const WORLD: WorldNode[] = [
  { id: 'school', name: 'Escuela', era: 'Presente', level: 'A1', about: 'to be, posesivos, preposiciones e imperativos', sceneId: 'school', requires: null, x: 64, y: 296 },
  { id: 'city', name: 'Ciudad', era: 'Presente', level: 'A1', about: 'direcciones, café y tienda: there is, this/these, some/any, precios', sceneId: 'city', requires: { boss: 'school-boss', from: 'la Escuela', how: 'en autobús' }, x: 178, y: 250 },
  { id: 'barrio', name: 'Barrio', era: 'Presente', level: 'A1', about: 'casas de amigos, parque y tu casa: presente simple, gustos, can, familia', sceneId: 'barrio', requires: { boss: 'city-boss', from: 'la Ciudad', how: 'en otro autobús' }, x: 70, y: 160 },
  { id: 'farm', name: 'Granja', era: 'Presente', level: 'A1', about: 'animales y rutinas: preguntas y negativas con do/does', sceneId: 'farm', requires: { boss: 'barrio-boss', from: 'el Barrio', how: 'en bicicleta por el camino viejo' }, x: 190, y: 72 },
  { id: 'office', name: 'Oficina', era: 'Presente', level: 'A1', about: 'la hora, citas y teléfono: at/on/in, me/him/her, Could you...?', sceneId: 'office', requires: { boss: 'farm-boss', from: 'la Granja', how: 'en autobús por la carretera' }, x: 296, y: 176 },

  // ── A1 en pasado: los mismos lugares hace 30 años. Cada jefe devuelve un fragmento de voz ──
  { id: 'school-past', name: 'Escuela', era: 'Pasado', level: 'A1', about: 'la escuela de ladrillo: was / were', sceneId: 'school-past', requires: { boss: 'office-boss', from: 'la Oficina', how: 'con el reloj del tiempo' }, x: 64, y: 296 },
  { id: 'city-past', name: 'Ciudad', era: 'Pasado', level: 'A1', about: 'la ciudad con carretera destapada: pasado de los verbos regulares (-ed)', sceneId: null, requires: { boss: 'school-past-boss', from: 'la Escuela vieja', how: 'a pie por la carretera destapada' }, x: 178, y: 250 },
  { id: 'barrio-past', name: 'Barrio', era: 'Pasado', level: 'A1', about: 'Green Street en construcción: verbos irregulares (went, had, saw...)', sceneId: null, requires: { boss: 'city-past-boss', from: 'la Ciudad vieja', how: 'a pie' }, x: 70, y: 160 },
  { id: 'farm-past', name: 'Granja', era: 'Pasado', level: 'A1', about: 'la granja con molino: did / didn\'t', sceneId: null, requires: { boss: 'barrio-past-boss', from: 'el Barrio viejo', how: 'por el camino' }, x: 190, y: 72 },
  { id: 'office-past', name: 'Cine', era: 'Pasado', level: 'A1', about: 'el viejo cine (hoy la oficina): yesterday, last week, ago', sceneId: null, requires: { boss: 'farm-past-boss', from: 'la Granja vieja', how: 'por la carretera' }, x: 296, y: 176 },
]

/** Los lugares del presente: el reloj tiene una pieza por cada uno */
export const PRESENT_NODES = WORLD.filter((n) => n.era === 'Presente')
/** Lugares de una época */
export const nodesOf = (era: WorldNode['era']) => WORLD.filter((n) => n.era === era)
