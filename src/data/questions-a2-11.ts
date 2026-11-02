import type { Question } from '../game/types'

/**
 * A2-11 · The City of Tomorrow (ciudad de 2056). Preposiciones de lugar y de movimiento, indicaciones y transporte.
 * La práctica guiada de Leo está en data/a2Future.ts (lista fija). Aquí solo los combates:
 * Dron de Rutas (fase 1 lugar: a2-future-minion-place · fase 2 indicaciones: a2-future-minion-dir) y
 * El tranvía sin rumbo (fase 1 movimiento: a2-future-boss-move · fase 2 transporte y viajes: a2-future-boss-travel).
 */
const MP = ['a2-future-minion', 'a2-future-minion-place']
const MD = ['a2-future-minion', 'a2-future-minion-dir']
const BM = ['a2-future-boss', 'a2-future-boss-move']
const BT = ['a2-future-boss', 'a2-future-boss-travel']
const TP = 'places-directions' as const

export const A2_FUTURE_QUESTIONS: Question[] = [
  // ── Dron de Rutas · fase 1: preposiciones de lugar ──
  { id: 'a2-11-m1', topic: TP, kind: 'fix', prompt: 'The museum is next the station.', options: ['The museum is next to the station.', 'The museum is next of the station.', 'The museum is in next the station.'], answer: 0, tip: 'next to (con to).', tags: MP },
  { id: 'a2-11-m2', topic: TP, prompt: 'The tram stop is ___ the café and the bank.', options: ['between', 'next', 'opposite of'], answer: 0, tip: 'En medio de dos lugares: between … and …', tags: MP },
  { id: 'a2-11-m3', topic: TP, prompt: 'The tower is ___ the museum, on the other side of the street.', options: ['opposite', 'under', 'into'], answer: 0, tip: 'Enfrente, al otro lado de la calle: opposite.', tags: MP },
  { id: 'a2-11-m4', topic: TP, kind: 'order', prompt: 'La parada está detrás del parque.', options: ['The', 'stop', 'is', 'behind', 'the', 'park.'], answer: 0, tip: 'Detrás de: behind.', tags: MP },
  { id: 'a2-11-m5', topic: TP, kind: 'fix', prompt: 'The robot is in front the door.', options: ['The robot is in front of the door.', 'The robot is in the front the door.', 'The robot is front to the door.'], answer: 0, tip: 'in front of (con of).', tags: MP },

  // ── Dron de Rutas · fase 2: indicaciones ──
  { id: 'a2-11-m6', topic: TP, prompt: 'Go straight and ___ left at the traffic lights.', options: ['turn', 'take', 'go to'], answer: 0, tip: 'Girar: turn left / turn right.', tags: MD },
  { id: 'a2-11-m7', topic: TP, kind: 'fix', prompt: 'Turn to right at the bridge.', options: ['Turn right at the bridge.', 'Turn the right in the bridge.', 'Turn right on the bridge to.'], answer: 0, tip: 'Turn right (sin to) + at + el lugar.', tags: MD },
  { id: 'a2-11-m8', topic: TP, prompt: 'Take the second street ___ the left.', options: ['on', 'at', 'in'], answer: 0, tip: 'Take the second street on the left.', tags: MD },
  { id: 'a2-11-m9', topic: TP, kind: 'order', prompt: 'El museo está a tu derecha.', options: ['The', 'museum', 'is', 'on', 'your', 'right.'], answer: 0, tip: 'on your right / on your left.', tags: MD },
  { id: 'a2-11-m10', topic: TP, prompt: 'Excuse me, how can I ___ to the station?', options: ['get', 'arrive', 'go to'], answer: 0, tip: 'Pedir indicaciones: How can I get to…?', tags: MD },

  // ── El tranvía sin rumbo · fase 1: preposiciones de movimiento ──
  { id: 'a2-11-b1', topic: TP, kind: 'fix', prompt: 'The tram goes across the tunnel.', options: ['The tram goes through the tunnel.', 'The tram goes along the tunnel to.', 'The tram goes into across the tunnel.'], answer: 0, tip: 'Por dentro de un túnel: through.', tags: BM },
  { id: 'a2-11-b2', topic: TP, prompt: 'We walked ___ the river for ten minutes.', options: ['along', 'across', 'into'], answer: 0, tip: 'Siguiendo la orilla, a lo largo: along.', tags: BM },
  { id: 'a2-11-b3', topic: TP, prompt: 'Go ___ the park and then turn left.', options: ['past', 'between', 'under of'], answer: 0, tip: 'Pasar por delante y seguir: go past.', tags: BM },
  { id: 'a2-11-b4', topic: TP, kind: 'order', prompt: 'Cruza el puente hacia el museo.', options: ['Walk', 'across', 'the', 'bridge', 'to', 'the', 'museum.'], answer: 0, tip: 'De un lado al otro: across.', tags: BM },
  { id: 'a2-11-b5', topic: TP, prompt: 'The tram came ___ of the tunnel very fast.', options: ['out', 'off', 'through'], answer: 0, tip: 'Salir de un lugar cerrado: come out of.', tags: BM },

  // ── El tranvía sin rumbo · fase 2: transporte y viajes ──
  { id: 'a2-11-b6', topic: TP, kind: 'fix', prompt: 'Get out the tram at the next stop.', options: ['Get off the tram at the next stop.', 'Get out of tram in the next stop.', 'Get down the tram at the next stop.'], answer: 0, tip: 'Tranvía, bus, tren: get on / get off.', tags: BT },
  { id: 'a2-11-b7', topic: TP, prompt: 'I go to the museum ___ foot.', options: ['on', 'by', 'with'], answer: 0, tip: 'A pie: on foot (pero by tram, by bus).', tags: BT },
  { id: 'a2-11-b8', topic: TP, prompt: 'We usually travel ___ tram in the city.', options: ['by', 'on the', 'with'], answer: 0, tip: 'Medio de transporte sin artículo: by tram, by bus.', tags: BT },
  { id: 'a2-11-b9', topic: TP, kind: 'order', prompt: '¿A qué hora sale el próximo tranvía?', options: ['What', 'time', 'does', 'the', 'next', 'tram', 'leave?'], answer: 0, tip: 'What time does + it + leave?', tags: BT },
  { id: 'a2-11-b10', topic: TP, prompt: 'A single ticket ___ the museum, please.', options: ['to', 'for go', 'at'], answer: 0, tip: 'Un boleto a un lugar: a ticket to…', tags: BT },
]
