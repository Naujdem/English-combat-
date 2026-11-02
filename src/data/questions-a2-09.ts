import type { Question } from '../game/types'

/**
 * A2-09 · The Silent Mill (molino). Recetas e imperativo (cap. 15), some/any y cantidades (cap. 17),
 * compras (cap. 20); when / while como repaso de A2-08.
 * La práctica guiada de Leo está en data/a2Mill.ts (lista fija). Aquí solo los combates:
 * el aprendiz corrompido (fase 1 some/any: a2-mill-minion-some · fase 2 when/while: a2-mill-minion-while),
 * Eco del molino (a2-mill-echo: recetas en imperativo) y La rueda rota
 * (fase 1 imperativo: a2-mill-boss-imp · fase 2 some/any y cantidades: a2-mill-boss-some · fase 3 compras: a2-mill-boss-shop).
 */
const MS = ['a2-mill-minion', 'a2-mill-minion-some']
const MW = ['a2-mill-minion', 'a2-mill-minion-while']
const E = ['a2-mill-echo']
const B1 = ['a2-mill-boss', 'a2-mill-boss-imp']
const B2 = ['a2-mill-boss', 'a2-mill-boss-some']
const B3 = ['a2-mill-boss', 'a2-mill-boss-shop']
const TP = 'recipes-some-any' as const

export const A2_MILL_QUESTIONS: Question[] = [
  // ── El aprendiz corrompido · fase 1: some / any ──
  { id: 'a2-09-m1', topic: TP, prompt: "There isn't ___ flour in the sacks.", options: ['any', 'some', 'a'], answer: 0, tip: 'Negativo: any (There isn’t any…).', tags: MS },
  { id: 'a2-09-m2', topic: TP, kind: 'fix', prompt: 'There is any wheat in the barn.', options: ['There is some wheat in the barn.', 'There is any wheats in the barn.', 'There are some wheat in the barn.'], answer: 0, tip: 'Afirmativo: some. wheat no se cuenta: There is some wheat.', tags: MS },
  { id: 'a2-09-m3', topic: TP, prompt: 'Are there ___ sacks near the door?', options: ['any', 'some', 'much'], answer: 0, tip: 'Pregunta: any (Are there any…?).', tags: MS },
  { id: 'a2-09-m4', topic: TP, kind: 'order', prompt: 'Tenemos algo de trigo, pero no tenemos harina.', options: ['We', 'have', 'some', 'wheat,', 'but', 'we', "don't", 'have', 'any', 'flour.'], answer: 0, tip: 'some en afirmativo · any en negativo.', tags: MS },

  // ── El aprendiz corrompido · fase 2: when / while (repaso de A2-08) ──
  { id: 'a2-09-m5', topic: TP, prompt: 'The miller was filling the sacks ___ the wheel stopped.', options: ['when', 'while', 'so'], answer: 0, tip: 'when + Past Simple: la acción corta que interrumpe.', tags: MW },
  { id: 'a2-09-m6', topic: TP, prompt: 'While the stones ___ the wheat, a cart stopped outside.', options: ['were grinding', 'was grinding', 'grinded'], answer: 0, tip: 'while + Past Continuous: the stones (they) + were + -ing.', tags: MW },
  { id: 'a2-09-m7', topic: TP, kind: 'fix', prompt: 'I was carry a sack when I hear a noise.', options: ['I was carrying a sack when I heard a noise.', 'I was carrying a sack when I hear a noise.', 'I carried a sack when I was hear a noise.'], answer: 0, tip: 'was + carrying (en progreso) · hear → heard (interrumpe).', tags: MW },
  { id: 'a2-09-m8', topic: TP, kind: 'order', prompt: 'La rueda estaba girando cuando el río se detuvo.', options: ['The', 'wheel', 'was', 'turning', 'when', 'the', 'river', 'stopped.'], answer: 0, tip: 'was + -ing … when + Past Simple.', tags: MW },
  { id: 'a2-09-m9', topic: TP, prompt: 'What ___ you doing when the wheel stopped?', options: ['were', 'was', 'did'], answer: 0, tip: 'you + were + -ing.', tags: MW },

  // ── Eco del molino (opcional): recetas en imperativo ──
  { id: 'a2-09-e1', topic: TP, prompt: '___ the flour and the water in a big bowl.', options: ['Mix', 'Mixes', 'Mixing'], answer: 0, tip: 'Receta: verbo base al principio (Mix).', tags: E },
  { id: 'a2-09-e2', topic: TP, kind: 'fix', prompt: 'Not open the oven. The bread is not ready.', options: ["Don't open the oven. The bread is not ready.", "Doesn't open the oven. The bread is not ready.", "Don't opening the oven. The bread is not ready."], answer: 0, tip: "Prohibir: Don't + verbo base.", tags: E },
  { id: 'a2-09-e3', topic: TP, prompt: 'First, ___ some salt. Then, mix everything.', options: ['add', 'adds', 'to adding'], answer: 0, tip: 'Imperativo: add (verbo base).', tags: E },
  { id: 'a2-09-e4', topic: TP, kind: 'order', prompt: 'Hornea el pan durante cuarenta minutos.', options: ['Bake', 'the', 'bread', 'for', 'forty', 'minutes.'], answer: 0, tip: 'Empieza con el verbo: Bake.', tags: E },
  { id: 'a2-09-e5', topic: TP, prompt: 'After that, ___ for one hour.', options: ['wait', 'waits', 'waiting'], answer: 0, tip: 'Imperativo: wait (verbo base).', tags: E },

  // ── La rueda rota · fase 1: imperativo (instrucciones del molino) ──
  { id: 'a2-09-b1', topic: TP, prompt: '___ the gate before you start the wheel.', options: ['Open', 'Opens', 'To open'], answer: 0, tip: 'Imperativo: verbo base al principio, sin sujeto.', tags: B1 },
  { id: 'a2-09-b2', topic: TP, kind: 'fix', prompt: 'Not touch the stones when they are moving!', options: ["Don't touch the stones when they are moving!", "Doesn't touch the stones when they are moving!", 'No touch the stones when they are moving!'], answer: 0, tip: "Prohibir: Don't + verbo base.", tags: B1 },
  { id: 'a2-09-b3', topic: TP, prompt: '___ near the wheel. It is dangerous.', options: ["Don't stand", 'Not stand', "Don't standing"], answer: 0, tip: "Don't + verbo base (stand, no standing).", tags: B1 },
  { id: 'a2-09-b4', topic: TP, kind: 'order', prompt: 'Llena los sacos con harina.', options: ['Fill', 'the', 'sacks', 'with', 'flour.'], answer: 0, tip: 'Imperativo: empieza con el verbo (Fill).', tags: B1 },

  // ── La rueda rota · fase 2: some / any · how much / how many ──
  { id: 'a2-09-b5', topic: TP, prompt: 'How ___ flour do you need for the bread?', options: ['much', 'many', 'any'], answer: 0, tip: 'flour no se cuenta: How much…?', tags: B2 },
  { id: 'a2-09-b6', topic: TP, prompt: 'How ___ sacks are in the barn?', options: ['many', 'much', 'some'], answer: 0, tip: 'sacks se cuentan: How many…?', tags: B2 },
  { id: 'a2-09-b7', topic: TP, kind: 'fix', prompt: "We don't have some water. The river is too low.", options: ["We don't have any water. The river is too low.", "We don't have many water. The river is too low.", "We doesn't have any water. The river is too low."], answer: 0, tip: 'Negativo: any · water no se cuenta (no many).', tags: B2 },
  { id: 'a2-09-b8', topic: TP, prompt: 'There is ___ bread on the table. Do you want it?', options: ['some', 'any', 'many'], answer: 0, tip: 'Afirmativo: some.', tags: B2 },

  // ── La rueda rota · fase 3: compras (precios, pagar, devolver) ──
  { id: 'a2-09-b9', topic: TP, prompt: 'How much ___ this sack of flour?', options: ['is', 'are', 'does'], answer: 0, tip: 'Precio de una cosa: How much is…?', tags: B3 },
  { id: 'a2-09-b10', topic: TP, kind: 'fix', prompt: 'How much cost the bread?', options: ['How much does the bread cost?', 'How much does the bread costs?', 'How much the bread cost?'], answer: 0, tip: 'How much + does + sujeto + cost (sin -s).', tags: B3 },
  { id: 'a2-09-b11', topic: TP, prompt: 'Thank you. Here ___ your change.', options: ['is', 'are', 'have'], answer: 0, tip: 'change (el cambio) es singular: Here is your change.', tags: B3 },
  { id: 'a2-09-b12', topic: TP, kind: 'order', prompt: 'Quisiera dos sacos de harina, por favor.', options: ["I'd", 'like', 'two', 'sacks', 'of', 'flour,', 'please.'], answer: 0, tip: "Pedir con cortesía: I'd like + cosa.", tags: B3 },
  { id: 'a2-09-b13', topic: TP, prompt: 'This sack has a hole. Can I ___ it, please?', options: ['return', 'returning', 'returned'], answer: 0, tip: 'Can I + verbo base: return (devolver).', tags: B3 },
]
