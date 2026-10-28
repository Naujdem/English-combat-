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
  { id: 'barrio', name: 'Barrio', era: 'Presente', level: 'A1', about: 'casas de amigos, parque y tu casa: presente simple, gustos, can, familia', sceneId: null, requires: { boss: 'city-boss', from: 'la Ciudad', how: 'en otro autobús' }, x: 70, y: 160 },
  { id: 'farm', name: 'Granja', era: 'Presente', level: 'A1', about: 'animales y rutinas: preguntas y negativas con do/does', sceneId: null, requires: { boss: 'barrio-boss', from: 'el Barrio', how: 'por el camino' }, x: 190, y: 72 },
  { id: 'office', name: 'Oficina', era: 'Presente', level: 'A1', about: 'la hora, citas y teléfono: at/on/in, me/him/her, Could you...?', sceneId: null, requires: { boss: 'farm-boss', from: 'la Granja', how: 'por la carretera' }, x: 296, y: 176 },
]
