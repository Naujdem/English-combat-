import type { Card } from './cards'
export type Gender = 'male' | 'female'

export type Look = {
  skin: string
  hair: string
}

export type Hero = {
  name: string
  gender: Gender
  look: Look
  /** Edad y país que el jugador dice al presentarse con Leo (solo se guardan en el dispositivo) */
  age?: number
  country?: string
}

export type Interest = {
  name: string
  gender: Gender
  /** 'romance' sigue la ruta romántica; 'friendship' la convierte en una amistad más */
  mode: 'romance' | 'friendship'
  /** true si el jugador no conocía a nadie y Leo le presentó a su amigo */
  viaLeo?: boolean
}

export type Screen = 'title' | 'intro' | 'world' | 'explore' | 'battle' | 'epilogue'

/** Un tema de gramática que el protagonista puede recuperar (fragmento de su voz) */
export type TopicId = 'greetings' | 'to-be' | 'possessives' | 'prepositions' | 'imperatives' | 'there-is' | 'demonstratives' | 'ordering' | 'present-simple' | 'likes' | 'can' | 'present-continuous' | 'have-got' | 'past-simple' | 'future'

/**
 * fill: completar el espacio en blanco.
 * fix: el enemigo dice una frase con error y el jugador elige la versión correcta.
 * order: ordenar palabras. `prompt` es la frase en español y `options` son las
 *        palabras en el orden correcto (el juego las desordena).
 * listen: escuchar una frase y elegir la que se oyó. Se generan solas a partir
 *        de las preguntas de completar, no hay que escribirlas.
 * write: escribir con el teclado. Se generan solas: la palabra que falta (a partir
 *        de las de completar) o la oración completa (a partir de las de ordenar).
 */
export type QuestionKind = 'fill' | 'fix' | 'order' | 'listen' | 'write' | 'speak'

export type Question = {
  id: string
  topic: TopicId
  kind?: QuestionKind
  /** fill: usa ___ para el espacio en blanco. fix: la frase con error que dice el enemigo */
  prompt: string
  options: string[]
  answer: number
  /** Explicación corta en español que da un amigo cuando fallas */
  tip: string
  /** Etiquetas de lugar o personaje, para que cada enemigo pregunte sobre lo suyo */
  tags?: string[]
  /** Solo en preguntas de escribir: falta una palabra o hay que escribir la oración entera */
  writeMode?: 'blank' | 'sentence'
  /** Pista en español bajo la frase (no se lee en voz alta), p. ej. "(debajo)" */
  hint?: string
}

export type Zone = 'aula' | 'bano' | 'cafeteria' | 'biblioteca' | 'sala' | 'secretaria' | 'patio' | 'calle' | 'cafe' | 'tienda' | 'turismo' | 'casa-leo' | 'casa-maya' | 'parque' | 'casa'

export type EnemyDef = {
  id: string
  /** Nombre con el que aparece en combate, por ejemplo "Tom, el burlón" */
  name: string
  /** Nombre propio, para cuando ya no es enemigo */
  person: string
  /** trainer: Leo en modo entrenamiento, no castiga al perder */
  kind: 'minion' | 'boss' | 'trainer'
  /** Esbirro opcional: no da llave, da la recompensa de `reward` */
  optional?: boolean
  /** Atuendo que regala al ser vencido */
  reward?: string
  hp: number
  /** Temas de los que salen sus preguntas */
  topics: TopicId[]
  /** Tipos de pregunta que usa: completar, corregir o ambos */
  kinds: QuestionKind[]
  /** Etiquetas preferidas: la mayoría de sus preguntas salen de aquí */
  tags?: string[]
  /** Fases del combate (para jefes). Cada fase tiene su vida, temas y una frase al empezar */
  phases?: { hp: number; topics: TopicId[]; kinds: QuestionKind[]; tags?: string[]; line?: StoryLine }[]
  look: { shirt: string; hair: string; skin: string; accessory?: 'cap' | 'mortarboard' | 'glasses'; gender?: Gender }
  /** Lo que dice antes del combate */
  before: StoryLine[]
  /** Lo que dice al ser vencido */
  after: StoryLine[]
  /** Lo que dice si le hablas después de vencerlo (ya no es enemigo) */
  freed: StoryLine
  /** Pregunta extra al ser vencido (esbirros): acertarla da un escudo */
  bonus?: BonusQ
  /** Despedida al ser vencido (jefes): practicar cómo despedirse */
  farewell?: BonusQ
}

export type BonusQ = { q: string; options: string[]; answer: number; tip: string }

/** Una línea de historia en inglés con su traducción */
export type StoryLine = { text: string; es?: string }

export type Entity =
  | { type: 'enemy'; id: string; x: number; y: number }
  | { type: 'friend'; id: string; x: number; y: number }
  | { type: 'interest'; x: number; y: number }
  | { type: 'chest'; id: string; outfit: string; x: number; y: number }
  | { type: 'boss'; id: string; x: number; y: number }
  /** Personaje que no pelea, con su propia actividad */
  | { type: 'npc'; id: string; x: number; y: number }

export type SceneDef = {
  id: string
  name: string
  /** Temas que se recuperan al vencer al jefe de este escenario */
  topics: TopicId[]
  map: string[]
  start: { x: number; y: number }
  /** Tile de la puerta del jefe, se abre con las llaves */
  bossDoor: { x: number; y: number }
  keysNeeded: number
  entities: Entity[]
  labels: { text: string; x: number; y: number }[]
  zoneAt: (x: number, y: number) => Zone
  /** Lo que el jefe exige además de las llaves */
  requirements: Requirement[]
  /** Objetivos que se muestran bajo el mapa */
  chips: (s: GameState) => { label: string; done: boolean }[]
  /** Texto de ayuda bajo el mapa: la primera visita y las siguientes */
  intro: { first: string; later: string }
  /** Si existe, al vencer al jefe se muestra el final del capítulo hasta que este id esté en `opened` */
  epilogue?: string
  /** Lo que se dice al chocar con la puerta cerrada del jefe */
  door?: { text: string; sub: string }
}

export type Requirement = { id: string; name: string; line: StoryLine }

/** Un paso de una lección guiada por Leo */
export type LessonStep = {
  who: 'leo' | 'board' | 'narrator'
  text: string
  es?: string
  /** Lo que aparece escrito en la pizarra */
  board?: [string, string?]
  choice?: { options: string[]; answer: number; tip: string }
  /** Tema de la lección, para mostrar la estructura de la frase con colores */
  topic?: TopicId
}

/**
 * Una respuesta posible en una charla con amigos. No hay respuestas "malas":
 * cada opción tiene una reacción del amigo y sube o baja la amistad.
 *  effect  2 = respuesta muy buena, 1 = buena, 0 = rara pero aceptable, -1 = sin sentido
 */
export type ChatOption = { text: string; reply: string; es?: string; effect: -1 | 0 | 1 | 2 }

export type DialogLine = {
  who: 'friend' | 'hero' | 'narrator'
  text: string
  /** Traducción opcional al español, se muestra con el botón "Traducir" */
  es?: string
  /** Si existe, el jugador elige qué responder */
  options?: ChatOption[]
}

/** Charla corta y repetible: el amigo pregunta algo y tú respondes */
export type CasualChat = {
  requires: TopicId | null
  text: string
  es?: string
  options: ChatOption[]
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
  /** Momentos de historia, en orden. Cada uno pide un mínimo de amistad y de gramática */
  conversations: Conversation[]
  /** Charlas casuales para subir la amistad entre momentos de historia */
  casual: CasualChat[]
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
  /** Puntos de amistad con cada amigo */
  friendship: Record<string, number>
  /** Cuántos momentos de historia se han tenido con cada amigo */
  talks: Record<string, number>
  /** Objetos de apoyo, como el escudo de palabras */
  items: { shield: number }
  /** Preguntas falladas que siguen pendientes en el cuaderno de errores */
  mistakes: string[]
  /** Fichas de vocabulario guardadas desde las lecturas */
  cards: Card[]
  /** Aciertos y errores por tema, para la pantalla de progreso */
  stats: Partial<Record<TopicId, { ok: number; fail: number }>>
  /** Misión de objetos perdidos de la escuela */
  lostFound: { started: boolean; carrying: string | null; picked: string[]; returned: string[] }
  seenLesson: string[]
  battle: { enemyId: string; enemyHp: number; returnTo: { x: number; y: number } } | null
}
