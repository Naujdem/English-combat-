import type { Question } from '../game/types'

/**
 * A2-09 · The Silent Mill (molino). Used to + imperativo + because / so / although; when / while como repaso.
 * La práctica guiada de Leo está en data/a2Mill.ts (lista fija). Aquí solo los combates:
 * el aprendiz corrompido (fase 1 used to: a2-mill-minion-used · fase 2 when/while: a2-mill-minion-while),
 * Eco del molino (a2-mill-echo) y La rueda rota
 * (fase 1 used to: a2-mill-boss-used · fase 2 imperativo: a2-mill-boss-imp · fase 3 conectores: a2-mill-boss-link).
 */
const MU = ['a2-mill-minion', 'a2-mill-minion-used']
const MW = ['a2-mill-minion', 'a2-mill-minion-while']
const E = ['a2-mill-echo']
const B1 = ['a2-mill-boss', 'a2-mill-boss-used']
const B2 = ['a2-mill-boss', 'a2-mill-boss-imp']
const B3 = ['a2-mill-boss', 'a2-mill-boss-link']
const TP = 'used-to-imperative' as const

export const A2_MILL_QUESTIONS: Question[] = [
  // ── El aprendiz corrompido · fase 1: used to ──
  { id: 'a2-09-m1', topic: TP, prompt: 'The water ___ the wheel every day.', options: ['used to turn', 'used to turned', 'use to turn'], answer: 0, tip: 'used to + verbo base: used to turn.', tags: MU },
  { id: 'a2-09-m2', topic: TP, kind: 'fix', prompt: 'The miller use to grind the wheat here.', options: ['The miller used to grind the wheat here.', 'The miller used to ground the wheat here.', 'The miller uses to grind the wheat here.'], answer: 0, tip: 'Afirmativo: used to (con -d) + grind (forma base).', tags: MU },
  { id: 'a2-09-m3', topic: TP, prompt: 'The mill ___ be silent. It was always busy.', options: ["didn't use to", "didn't used to", 'not used to'], answer: 0, tip: "Negativo: didn't use to (sin -d).", tags: MU },
  { id: 'a2-09-m4', topic: TP, kind: 'order', prompt: '¿El molino solía funcionar de noche?', options: ['Did', 'the', 'mill', 'use', 'to', 'work', 'at', 'night?'], answer: 0, tip: 'Did + sujeto + use to + verbo base.', tags: MU },

  // ── El aprendiz corrompido · fase 2: when / while (repaso de A2-08) ──
  { id: 'a2-09-m5', topic: TP, prompt: 'The miller was filling the sacks ___ the wheel stopped.', options: ['when', 'while', 'so'], answer: 0, tip: 'when + Past Simple: la acción corta que interrumpe.', tags: MW },
  { id: 'a2-09-m6', topic: TP, prompt: 'While the stones ___ the wheat, a cart stopped outside.', options: ['were grinding', 'was grinding', 'grinded'], answer: 0, tip: 'while + Past Continuous: the stones (they) + were + -ing.', tags: MW },
  { id: 'a2-09-m7', topic: TP, kind: 'fix', prompt: 'I was carry a sack when I hear a noise.', options: ['I was carrying a sack when I heard a noise.', 'I was carrying a sack when I hear a noise.', 'I carried a sack when I was hear a noise.'], answer: 0, tip: 'was + carrying (en progreso) · hear → heard (interrumpe).', tags: MW },
  { id: 'a2-09-m8', topic: TP, kind: 'order', prompt: 'La rueda estaba girando cuando el río se detuvo.', options: ['The', 'wheel', 'was', 'turning', 'when', 'the', 'river', 'stopped.'], answer: 0, tip: 'was + -ing … when + Past Simple.', tags: MW },
  { id: 'a2-09-m9', topic: TP, prompt: 'What ___ you doing when the wheel stopped?', options: ['were', 'was', 'did'], answer: 0, tip: 'you + were + -ing.', tags: MW },

  // ── Eco del molino (opcional): used to ──
  { id: 'a2-09-e1', topic: TP, prompt: 'People ___ buy flour at this mill.', options: ['used to', 'use to', 'were use to'], answer: 0, tip: 'Afirmativo: used to + verbo base.', tags: E },
  { id: 'a2-09-e2', topic: TP, kind: 'fix', prompt: 'Did you used to eat bread every day?', options: ['Did you use to eat bread every day?', 'Did you used to eat bread every day?', 'Do you used to eat bread every day?'], answer: 0, tip: 'Con did, el verbo va sin -d: Did you use to…?', tags: E },
  { id: 'a2-09-e3', topic: TP, prompt: 'I ___ like brown bread, but now I love it.', options: ["didn't use to", "didn't used to", "don't use to"], answer: 0, tip: "Negativo en pasado: didn't use to.", tags: E },
  { id: 'a2-09-e4', topic: TP, kind: 'order', prompt: 'Mi abuela solía hacer pan con esta harina.', options: ['My', 'grandmother', 'used', 'to', 'make', 'bread', 'with', 'this', 'flour.'], answer: 0, tip: 'Sujeto + used to + verbo base.', tags: E },
  { id: 'a2-09-e5', topic: TP, prompt: "The wheel ___ every morning. Now it doesn't move.", options: ['used to turn', 'uses to turn', 'used to turning'], answer: 0, tip: 'used to + verbo base (turn, no turning).', tags: E },

  // ── La rueda rota · fase 1: used to ──
  { id: 'a2-09-b1', topic: TP, kind: 'fix', prompt: 'The mill use to make flour for the town.', options: ['The mill used to make flour for the town.', 'The mill used to made flour for the town.', 'The mill uses to make flour for the town.'], answer: 0, tip: 'used to (con -d) + make (forma base).', tags: B1 },
  { id: 'a2-09-b2', topic: TP, prompt: 'Where ___ the miller use to sell his bread?', options: ['did', 'was', 'used'], answer: 0, tip: 'Pregunta: Wh- + did + sujeto + use to + verbo.', tags: B1 },
  { id: 'a2-09-b3', topic: TP, prompt: 'The river ___ be so quiet.', options: ["didn't use to", "didn't used to", "wasn't use to"], answer: 0, tip: "Negativo: didn't use to + verbo base.", tags: B1 },
  { id: 'a2-09-b4', topic: TP, kind: 'order', prompt: 'Solíamos llevar el trigo al molino.', options: ['We', 'used', 'to', 'take', 'the', 'wheat', 'to', 'the', 'mill.'], answer: 0, tip: 'We + used to + take.', tags: B1 },

  // ── La rueda rota · fase 2: imperativo (instrucciones de seguridad del molino) ──
  { id: 'a2-09-b5', topic: TP, prompt: '___ the gate before you start the wheel.', options: ['Open', 'Opens', 'To open'], answer: 0, tip: 'Imperativo: verbo base al principio, sin sujeto.', tags: B2 },
  { id: 'a2-09-b6', topic: TP, kind: 'fix', prompt: 'Not touch the stones when they are moving!', options: ["Don't touch the stones when they are moving!", "Doesn't touch the stones when they are moving!", 'No touch the stones when they are moving!'], answer: 0, tip: "Prohibir: Don't + verbo base.", tags: B2 },
  { id: 'a2-09-b7', topic: TP, prompt: '___ near the wheel. It is dangerous.', options: ["Don't stand", 'Not stand', "Don't standing"], answer: 0, tip: "Don't + verbo base (stand, no standing).", tags: B2 },
  { id: 'a2-09-b8', topic: TP, kind: 'order', prompt: 'Llena los sacos con harina.', options: ['Fill', 'the', 'sacks', 'with', 'flour.'], answer: 0, tip: 'Imperativo: empieza con el verbo (Fill).', tags: B2 },

  // ── La rueda rota · fase 3: because / so / although ──
  { id: 'a2-09-b9', topic: TP, prompt: 'The mill stopped ___ the river was too low.', options: ['because', 'so', 'although'], answer: 0, tip: 'because = la razón.', tags: B3 },
  { id: 'a2-09-b10', topic: TP, prompt: 'There was no flour, ___ nobody made bread.', options: ['so', 'because', 'although'], answer: 0, tip: 'so = el resultado.', tags: B3 },
  { id: 'a2-09-b11', topic: TP, prompt: '___ the wheel was old, it worked every day.', options: ['Although', 'Because', 'So'], answer: 0, tip: 'although = contraste (vieja, pero funcionaba).', tags: B3 },
  { id: 'a2-09-b12', topic: TP, kind: 'fix', prompt: 'The miller was tired, because he went to bed early.', options: ['The miller was tired, so he went to bed early.', 'The miller was tired, although he went to bed early.', 'The miller was tired, so he goed to bed early.'], answer: 0, tip: 'Se fue a dormir temprano como resultado: so · go → went.', tags: B3 },
]
