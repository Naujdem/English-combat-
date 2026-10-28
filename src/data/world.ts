import type { TopicId } from '../game/types'

export type WorldNode = {
  id: string
  name: string
  era: 'Presente' | 'Pasado' | 'Futuro'
  level: 'A1' | 'A2' | 'B1'
  topic: TopicId
  /** Escena jugable; null = todavía no existe */
  sceneId: string | null
  /** Tema que hay que haber recuperado para entrar */
  requires: TopicId | null
  x: number
  y: number
}

export const WORLD: WorldNode[] = [
  { id: 'school', name: 'Escuela', era: 'Presente', level: 'A1', topic: 'to-be', sceneId: 'school', requires: null, x: 60, y: 300 },
  { id: 'city', name: 'Ciudad', era: 'Presente', level: 'A1', topic: 'present-simple', sceneId: null, requires: 'to-be', x: 150, y: 220 },
  { id: 'farm', name: 'Granja', era: 'Pasado', level: 'A2', topic: 'past-simple', sceneId: null, requires: 'present-simple', x: 260, y: 260 },
  { id: 'office', name: 'Oficina', era: 'Futuro', level: 'B1', topic: 'future', sceneId: null, requires: 'past-simple', x: 300, y: 120 },
]
