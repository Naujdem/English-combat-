export type Gender = 'male' | 'female'

export type Look = {
  skin: string
  hair: string
}

export type Hero = {
  name: string
  gender: Gender
  look: Look
}

export type Interest = {
  name: string
  gender: Gender
  /** 'romance' sigue la ruta romántica; 'friendship' la convierte en una amistad más */
  mode: 'romance' | 'friendship'
}

export type Screen = 'title' | 'create' | 'intro' | 'world' | 'explore' | 'battle'

/** Un tema de gramática que el protagonista puede recuperar (fragmento de su voz) */
export type TopicId = 'to-be' | 'present-simple' | 'past-simple' | 'future'

export type Question = {
  id: string
  topic: TopicId
  /** Usa ___ para el espacio en blanco */
  prompt: string
  options: string[]
  answer: number
  /** Explicación corta en español que da un amigo cuando fallas */
  tip: string
}

export type Zone = 'aula' | 'bano' | 'cafeteria' | 'biblioteca' | 'sala'

export type EnemyDef = {
  id: string
  name: string
  kind: 'minion' | 'boss'
  hp: number
  topic: TopicId
  look: { shirt: string; hair: string; skin: string; accessory?: 'cap' | 'mortarboard' | 'glasses' }
  intro: string
}

export type Entity =
  | { type: 'enemy'; id: string; x: number; y: number }
  | { type: 'friend'; id: string; x: number; y: number }
  | { type: 'interest'; x: number; y: number }
  | { type: 'chest'; id: string; outfit: string; x: number; y: number }
  | { type: 'boss'; id: string; x: number; y: number }

export type SceneDef = {
  id: string
  name: string
  topic: TopicId
  map: string[]
  start: { x: number; y: number }
  /** Tile de la puerta del jefe, se abre con las llaves */
  bossDoor: { x: number; y: number }
  keysNeeded: number
  entities: Entity[]
  labels: { text: string; x: number; y: number }[]
  zoneAt: (x: number, y: number) => Zone
}

export type DialogLine = {
  who: 'friend' | 'hero' | 'narrator'
  text: string
  /** Traducción opcional al español, se muestra con el botón "Traducir" */
  es?: string
  /** Si existe, el jugador debe responder eligiendo una opción */
  choice?: { options: string[]; answer: number; tip: string }
}

export type Conversation = {
  /** Tema que el protagonista necesita haber recuperado para tener esta charla */
  requires: TopicId | null
  /** Nivel CEFR de la charla, para mostrarlo en el menú de amigos */
  level: 'A1' | 'A2' | 'B1'
  title: string
  lines: DialogLine[]
}

export type FriendDef = {
  id: string
  name: string
  theme: string
  look: { shirt: string; hair: string; skin: string; gender: Gender }
  conversations: Conversation[]
}

export type GameState = {
  version: 1
  screen: Screen
  hero: Hero
  interest: Interest
  outfit: string
  outfits: string[]
  hp: number
  maxHp: number
  recovered: TopicId[]
  relics: number
  sceneId: string
  pos: { x: number; y: number }
  facing: 'left' | 'right'
  keys: Record<string, number>
  defeated: string[]
  opened: string[]
  friendship: Record<string, number>
  seenLesson: string[]
  battle: { enemyId: string; enemyHp: number; returnTo: { x: number; y: number } } | null
}
