import type { Question } from '../game/types'

/**
 * Tareas de la casa (Busuu A2 cap. 14) y vacaciones (cap. 25).
 * - housework: práctica de Leo al recoger la fiesta de Make a Wish (a2-hw-p1 a p7, lista fija en data/tasks.ts) y repaso.
 * - holidays: repaso; el tema se abre con la postal de Maya (momento de amistad A2).
 */
const HW = ['a2-housework']
const HO = ['a2-holidays']

export const A2_HOME_QUESTIONS: Question[] = [
  // ── Tareas de la casa: práctica de Leo ──
  { id: 'a2-hw-p1', topic: 'housework', prompt: 'Can you ___ the dishes, please?', options: ['do', 'make', 'put'], answer: 0, tip: 'Lavar los platos es una tarea: do the dishes.', tags: HW },
  { id: 'a2-hw-p2', topic: 'housework', prompt: "Don't forget to ___ your bed in the morning.", options: ['make', 'do', 'clean'], answer: 0, tip: 'Tender la cama: make the bed.', tags: HW },
  { id: 'a2-hw-p3', topic: 'housework', kind: 'fix', prompt: 'Have you made the dishes yet?', options: ['Have you done the dishes yet?', 'Have you did the dishes yet?', 'Have you do the dishes yet?'], answer: 0, tip: 'do the dishes · participio de do: done.', tags: HW },
  { id: 'a2-hw-p4', topic: 'housework', prompt: "I've already ___ out the trash.", options: ['taken', 'took', 'take'], answer: 0, tip: 'have + participio: take → taken.', tags: HW },
  { id: 'a2-hw-p5', topic: 'housework', kind: 'order', prompt: 'Te toca barrer el jardín.', options: ["It's", 'your', 'turn', 'to', 'sweep', 'the', 'garden.'], answer: 0, tip: "It's your turn to + verbo.", tags: HW },
  { id: 'a2-hw-p6', topic: 'housework', prompt: 'Oh no! I ___ a mistake. I put the cups in the fridge!', options: ['made', 'did', 'took'], answer: 0, tip: 'Cometer un error: make a mistake → made.', tags: HW },
  { id: 'a2-hw-p7', topic: 'housework', kind: 'order', prompt: '¿Me das una mano con las sillas?', options: ['Can', 'you', 'give', 'me', 'a', 'hand', 'with', 'the', 'chairs?'], answer: 0, tip: 'Pedir ayuda: Can you give me a hand with...?', tags: HW },

  // ── Tareas de la casa: repaso ──
  { id: 'a2-hw-r1', topic: 'housework', prompt: 'My mom ___ the shopping every Saturday.', options: ['does', 'makes', 'takes'], answer: 0, tip: 'Hacer las compras: do the shopping (she → does).', tags: HW },
  { id: 'a2-hw-r2', topic: 'housework', prompt: 'Can you help me ___ a cake for the party?', options: ['make', 'do', 'cook to'], answer: 0, tip: 'Crear algo: make a cake.', tags: HW },
  { id: 'a2-hw-r3', topic: 'housework', prompt: "I haven't done my homework ___.", options: ['yet', 'already', 'ever'], answer: 0, tip: 'Negativo: ...yet al final.', tags: HW },
  { id: 'a2-hw-r4', topic: 'housework', kind: 'fix', prompt: 'The dog did a big mess in the kitchen.', options: ['The dog made a big mess in the kitchen.', 'The dog maked a big mess in the kitchen.', 'The dog done a big mess in the kitchen.'], answer: 0, tip: 'Hacer un desorden: make a mess → made.', tags: HW },
  { id: 'a2-hw-r5', topic: 'housework', kind: 'fix', prompt: 'I have already sweeped the floor.', options: ['I have already swept the floor.', 'I have already sweep the floor.', 'I have swept already the floor.'], answer: 0, tip: 'sweep es irregular: swept · already va entre have y el participio.', tags: HW },
  { id: 'a2-hw-r6', topic: 'housework', prompt: 'Whose ___ is it to wash the car? — Yours!', options: ['turn', 'time', 'job to'], answer: 0, tip: '¿A quién le toca? Whose turn is it?', tags: HW },
  { id: 'a2-hw-r7', topic: 'housework', kind: 'order', prompt: 'Ya lavé la ropa.', options: ["I've", 'already', 'done', 'the', 'laundry.'], answer: 0, tip: "I've + already + participio: done.", tags: HW },
  { id: 'a2-hw-r8', topic: 'housework', prompt: 'Please ___ up your room. There are clothes everywhere!', options: ['tidy', 'get', 'go'], answer: 0, tip: 'Ordenar: tidy up.', tags: HW },
  { id: 'a2-hw-r9', topic: 'housework', prompt: 'Has Leo ___ the plants yet?', options: ['watered', 'water', 'waters'], answer: 0, tip: 'has + participio: water → watered.', tags: HW },
  { id: 'a2-hw-r10', topic: 'housework', kind: 'order', prompt: '¿Ya sacaste la basura?', options: ['Have', 'you', 'taken', 'out', 'the', 'trash', 'yet?'], answer: 0, tip: 'Have + you + participio + ... + yet?', tags: HW },
  { id: 'a2-hw-r11', topic: 'housework', prompt: 'I always ___ the laundry on Sundays.', options: ['do', 'make', 'put'], answer: 0, tip: 'Lavar la ropa es una tarea: do the laundry.', tags: HW },
  { id: 'a2-hw-r12', topic: 'housework', kind: 'fix', prompt: "It's your turn to washing the dishes.", options: ["It's your turn to wash the dishes.", "It's your turn wash the dishes.", "It's your turn to washes the dishes."], answer: 0, tip: "It's your turn to + verbo tal cual: to wash.", tags: HW },

  // ── Vacaciones y alojamiento: repaso ──
  { id: 'a2-ho-r1', topic: 'holidays', prompt: "I'd like to ___ a double room for three nights.", options: ['book', 'make', 'do'], answer: 0, tip: 'Reservar: book a room.', tags: HO },
  { id: 'a2-ho-r2', topic: 'holidays', prompt: "We're staying ___ a small hotel near the beach.", options: ['at', 'on', 'to'], answer: 0, tip: 'stay at + lugar: at a hotel.', tags: HO },
  { id: 'a2-ho-r3', topic: 'holidays', prompt: 'A room for one person is a ___ room.', options: ['single', 'double', 'only'], answer: 0, tip: 'Para una persona: single · para dos: double.', tags: HO },
  { id: 'a2-ho-r4', topic: 'holidays', prompt: 'You can ___ in at the hotel after two o’clock.', options: ['check', 'book', 'go'], answer: 0, tip: 'Registrarse al llegar: check in.', tags: HO },
  { id: 'a2-ho-r5', topic: 'holidays', prompt: 'We have to ___ out of the room before eleven.', options: ['check', 'make', 'take'], answer: 0, tip: 'Dejar la habitación al irse: check out.', tags: HO },
  { id: 'a2-ho-r6', topic: 'holidays', prompt: 'We sleep in a tent at a ___.', options: ['campsite', 'hotel', 'hostel'], answer: 0, tip: 'Dormir en carpa: at a campsite.', tags: HO },
  { id: 'a2-ho-r7', topic: 'holidays', prompt: 'Yesterday we ___ sightseeing in the old town.', options: ['went', 'go', 'made'], answer: 0, tip: 'go sightseeing · pasado: went.', tags: HO },
  { id: 'a2-ho-r8', topic: 'holidays', prompt: "Would you rather go to the beach or to the mountains? — I'd rather ___ to the mountains.", options: ['go', 'to go', 'going'], answer: 0, tip: "I'd rather + verbo tal cual: go.", tags: HO },
  { id: 'a2-ho-r9', topic: 'holidays', kind: 'order', prompt: 'Nos estamos quedando en un camping junto al lago.', options: ["We're", 'staying', 'at', 'a', 'campsite', 'near', 'the', 'lake.'], answer: 0, tip: "We're staying at + lugar.", tags: HO },
  { id: 'a2-ho-r10', topic: 'holidays', kind: 'order', prompt: '¡Ojalá estuvieras aquí!', options: ['Wish', 'you', 'were', 'here!'], answer: 0, tip: 'La despedida típica de una postal: Wish you were here!', tags: HO },
  { id: 'a2-ho-r11', topic: 'holidays', kind: 'fix', prompt: "I'd like to book a room double, please.", options: ["I'd like to book a double room, please.", "I'd like book a double room, please.", "I'd like to booking a double room, please."], answer: 0, tip: 'El adjetivo va antes del sustantivo: a double room.', tags: HO },
  { id: 'a2-ho-r12', topic: 'holidays', kind: 'fix', prompt: 'Last summer we stay at a hostel in Bogotá.', options: ['Last summer we stayed at a hostel in Bogotá.', 'Last summer we staying at a hostel in Bogotá.', 'Last summer we have stay at a hostel in Bogotá.'], answer: 0, tip: 'Con last summer: pasado simple → stayed.', tags: HO },
  { id: 'a2-ho-r13', topic: 'holidays', prompt: 'Do you have a room with a sea ___?', options: ['view', 'look', 'see'], answer: 0, tip: 'Con vista al mar: a sea view.', tags: HO },
  { id: 'a2-ho-r14', topic: 'holidays', kind: 'order', prompt: '¿Preferirías quedarte en un hotel o ir de camping?', options: ['Would', 'you', 'rather', 'stay', 'at', 'a', 'hotel', 'or', 'go', 'camping?'], answer: 0, tip: 'Would you rather + verbo + or + verbo?', tags: HO },
  { id: 'a2-ho-r15', topic: 'holidays', prompt: 'A cheap place with shared rooms for young travelers is a ___.', options: ['hostel', 'hotel', 'campsite'], answer: 0, tip: 'Barato y con habitaciones compartidas: a hostel.', tags: HO },
]
