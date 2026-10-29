import type { Question } from '../game/types'

/**
 * Preguntas de la oficina (A1, presente): la hora y at / on / in, pronombres de objeto
 * y pedir con cortesía (Could you...?). Etiquetas: recepcion, oficina, reuniones, direccion.
 */
export const OFFICE_QUESTIONS: Question[] = [
  // ── La hora y at / on / in ──────────────────────────────
  { id: 'tm-01', topic: 'time', prompt: "It's 8:30. It's half ___ eight.", options: ['past', 'to', 'and'], answer: 0, tip: 'Las y media: half past + hora. 8:30 = half past eight.', tags: ['recepcion'] },
  { id: 'tm-02', topic: 'time', prompt: "It's 9:15. It's quarter ___ nine.", options: ['to', 'past', 'of'], answer: 1, tip: 'Y cuarto: quarter past. 9:15 = quarter past nine.', tags: ['recepcion'] },
  { id: 'tm-03', topic: 'time', prompt: "It's 2:45. It's quarter ___ three.", options: ['past', 'to', 'at'], answer: 1, tip: 'Menos cuarto: quarter to + la hora siguiente. 2:45 = quarter to three.', tags: ['oficina'] },
  { id: 'tm-04', topic: 'time', prompt: "It's 7:00. It's seven ___.", options: ["o'clock", 'hours', 'clock'], answer: 0, tip: "Hora en punto: o'clock. 7:00 = seven o'clock.", tags: ['recepcion'] },
  { id: 'tm-05', topic: 'time', prompt: 'The meeting is ___ ten o\'clock.', options: ['on', 'in', 'at'], answer: 2, tip: 'Con la hora: at. At ten o\'clock.', tags: ['reuniones'] },
  { id: 'tm-06', topic: 'time', prompt: 'I work ___ Monday.', options: ['in', 'on', 'at'], answer: 1, tip: 'Con los días: on. On Monday.', tags: ['oficina'] },
  { id: 'tm-07', topic: 'time', prompt: 'My birthday is ___ July.', options: ['on', 'at', 'in'], answer: 2, tip: 'Con los meses: in. In July.', tags: ['oficina'] },
  { id: 'tm-08', topic: 'time', prompt: 'I drink coffee ___ the morning.', options: ['in', 'on', 'at'], answer: 0, tip: 'Partes del día: in the morning, in the afternoon, in the evening.', tags: ['oficina'] },
  { id: 'tm-09', topic: 'time', prompt: 'The office is quiet ___ night.', options: ['in', 'at', 'on'], answer: 1, tip: 'Excepción: at night (en la noche).', tags: ['direccion'] },
  { id: 'tm-10', topic: 'time', prompt: 'We go to the beach ___ summer.', options: ['on', 'at', 'in'], answer: 2, tip: 'Con las estaciones: in. In summer, in winter.', tags: ['oficina'] },
  { id: 'tm-11', topic: 'time', prompt: '___ time is it? — It\'s ten past four.', options: ['What', 'Which', 'How'], answer: 0, tip: 'Para preguntar la hora: What time is it?', tags: ['recepcion'] },
  { id: 'tm-12', topic: 'time', prompt: "It's 4:10. It's ten ___ four.", options: ['to', 'past', 'after of'], answer: 1, tip: 'Minutos después de la hora: past. 4:10 = ten past four.', tags: ['recepcion'] },
  { id: 'tm-13', topic: 'time', prompt: "It's 5:50. It's ten ___ six.", options: ['to', 'past', 'before'], answer: 0, tip: 'Minutos antes de la hora siguiente: to. 5:50 = ten to six.', tags: ['reuniones'] },
  { id: 'tm-14', topic: 'time', prompt: 'What time ___ you start work?', options: ['does', 'do', 'are'], answer: 1, tip: 'Con you: What time do you...?', tags: ['oficina'] },
  { id: 'tm-15', topic: 'time', prompt: 'The director has lunch ___ half past one.', options: ['at', 'on', 'in'], answer: 0, tip: 'Con la hora: at.', tags: ['direccion'] },
  { id: 'tm-16', topic: 'time', prompt: 'See you ___ Friday!', options: ['in', 'at', 'on'], answer: 2, tip: 'Con los días: on Friday.', tags: ['reuniones'] },

  { id: 'tmf-01', topic: 'time', kind: 'fix', prompt: "It's eight and half!", options: ["It's half past eight.", "It's eight and a half.", "It's half to eight."], answer: 0, tip: 'En inglés no se dice "eight and half": half past eight.', tags: ['recepcion'] },
  { id: 'tmf-02', topic: 'time', kind: 'fix', prompt: 'The meeting is in Monday!', options: ['The meeting is on Monday.', 'The meeting is at Monday.', 'The meeting is Monday in.'], answer: 0, tip: 'Con los días: on Monday.', tags: ['reuniones'] },
  { id: 'tmf-03', topic: 'time', kind: 'fix', prompt: 'Come at the morning!', options: ['Come in the morning.', 'Come on the morning.', 'Come at morning.'], answer: 0, tip: 'Partes del día: in the morning.', tags: ['recepcion'] },
  { id: 'tmf-04', topic: 'time', kind: 'fix', prompt: 'I start work on nine o\'clock!', options: ["I start work at nine o'clock.", "I start work in nine o'clock.", 'I start work nine at.'], answer: 0, tip: 'Con la hora: at.', tags: ['oficina'] },
  { id: 'tmf-05', topic: 'time', kind: 'fix', prompt: 'What hour is it?', options: ['What time is it?', 'What time it is?', 'How hour is it?'], answer: 0, tip: '"¿Qué hora es?" se dice What time is it?', tags: ['recepcion'] },
  { id: 'tmf-06', topic: 'time', kind: 'fix', prompt: "It's 3:45. It's quarter past three!", options: ["It's quarter to four.", "It's quarter past four.", "It's half past three."], answer: 0, tip: '3:45 = quarter to four (falta un cuarto para las cuatro).', tags: ['direccion'] },

  { id: 'tmo-01', topic: 'time', kind: 'order', prompt: '¿Qué hora es?', options: ['What', 'time', 'is', 'it?'], answer: 0, tip: 'What time + is it?', tags: ['recepcion'] },
  { id: 'tmo-02', topic: 'time', kind: 'order', prompt: 'La reunión es el lunes a las diez.', options: ['The', 'meeting', 'is', 'on', 'Monday', 'at', 'ten.'], answer: 0, tip: 'on + día, at + hora.', tags: ['reuniones'] },
  { id: 'tmo-03', topic: 'time', kind: 'order', prompt: 'Son las ocho y media.', options: ["It's", 'half', 'past', 'eight.'], answer: 0, tip: "It's + half past + hora.", tags: ['recepcion'] },
  { id: 'tmo-04', topic: 'time', kind: 'order', prompt: 'Tomo café en la mañana.', options: ['I', 'drink', 'coffee', 'in', 'the', 'morning.'], answer: 0, tip: 'in the morning.', tags: ['oficina'] },

  // ── Pronombres de objeto ────────────────────────────────
  { id: 'op-01', topic: 'object-pronouns', prompt: 'Ms. Clark is busy. Call ___ later.', options: ['she', 'her', 'hers'], answer: 1, tip: 'Después del verbo, "ella" es her: call her.', tags: ['direccion'] },
  { id: 'op-02', topic: 'object-pronouns', prompt: 'Mr. Stone has got a question. Help ___, please.', options: ['him', 'he', 'his'], answer: 0, tip: 'Después del verbo, "él" es him: help him.', tags: ['reuniones'] },
  { id: 'op-03', topic: 'object-pronouns', prompt: 'I have got your email. I can answer ___ now.', options: ['it', 'its', 'them'], answer: 0, tip: 'Una cosa (the email): it.', tags: ['oficina'] },
  { id: 'op-04', topic: 'object-pronouns', prompt: 'These are the reports. Send ___ to the director.', options: ['they', 'them', 'their'], answer: 1, tip: 'Varias cosas después del verbo: them.', tags: ['oficina'] },
  { id: 'op-05', topic: 'object-pronouns', prompt: 'Could you help ___? I am lost.', options: ['I', 'my', 'me'], answer: 2, tip: 'Después del verbo, "yo" es me: help me.', tags: ['recepcion'] },
  { id: 'op-06', topic: 'object-pronouns', prompt: 'We are here! Look at ___!', options: ['us', 'we', 'our'], answer: 0, tip: 'Después de at (o de un verbo), "nosotros" es us.', tags: ['recepcion'] },
  { id: 'op-07', topic: 'object-pronouns', prompt: 'Paula is my friend. I work with ___.', options: ['she', 'her', 'hers'], answer: 1, tip: 'Después de with: her.', tags: ['oficina'] },
  { id: 'op-08', topic: 'object-pronouns', prompt: 'Leo, this coffee is for ___.', options: ['you', 'your', 'yours'], answer: 0, tip: 'Después de for: you.', tags: ['oficina'] },
  { id: 'op-09', topic: 'object-pronouns', prompt: 'The designers are in the meeting room. Tell ___ to come.', options: ['they', 'them', 'their'], answer: 1, tip: 'Varias personas después del verbo: them.', tags: ['reuniones'] },
  { id: 'op-10', topic: 'object-pronouns', prompt: 'Where is my phone? I can\'t find ___.', options: ['it', 'him', 'her'], answer: 0, tip: 'Una cosa: it.', tags: ['direccion'] },

  { id: 'opf-01', topic: 'object-pronouns', kind: 'fix', prompt: 'Call she now!', options: ['Call her now.', 'Call hers now.', "Call she's now."], answer: 0, tip: 'Después del verbo va her, no she.', tags: ['oficina'] },
  { id: 'opf-02', topic: 'object-pronouns', kind: 'fix', prompt: 'Give it to I!', options: ['Give it to me.', 'Give it to my.', 'Give I it.'], answer: 0, tip: 'Después de to: me.', tags: ['oficina'] },
  { id: 'opf-03', topic: 'object-pronouns', kind: 'fix', prompt: 'Send the email to he!', options: ['Send the email to him.', 'Send the email to his.', 'Send he the email.'], answer: 0, tip: 'Después de to: him.', tags: ['oficina'] },
  { id: 'opf-04', topic: 'object-pronouns', kind: 'fix', prompt: 'Them are my reports!', options: ['They are my reports.', 'Their are my reports.', 'Them is my reports.'], answer: 0, tip: 'Antes del verbo (sujeto) va they; them va después del verbo.', tags: ['oficina'] },
  { id: 'opf-05', topic: 'object-pronouns', kind: 'fix', prompt: 'Look at they!', options: ['Look at them.', 'Look at their.', 'Look they.'], answer: 0, tip: 'Después de at: them.', tags: ['reuniones'] },
  { id: 'opf-06', topic: 'object-pronouns', kind: 'fix', prompt: 'Could you help we?', options: ['Could you help us?', 'Could you help our?', 'Could you we help?'], answer: 0, tip: 'Después del verbo: us.', tags: ['recepcion'] },

  { id: 'opo-01', topic: 'object-pronouns', kind: 'order', prompt: 'Llámame mañana.', options: ['Call', 'me', 'tomorrow.'], answer: 0, tip: 'Call + me + tomorrow.', tags: ['oficina'] },
  { id: 'opo-02', topic: 'object-pronouns', kind: 'order', prompt: 'Envíaselo a ella.', options: ['Send', 'it', 'to', 'her.'], answer: 0, tip: 'Send + it + to her.', tags: ['oficina'] },
  { id: 'opo-03', topic: 'object-pronouns', kind: 'order', prompt: 'Trabajo con ellos.', options: ['I', 'work', 'with', 'them.'], answer: 0, tip: 'with + them.', tags: ['reuniones'] },

  // ── Could you...? (pedir con cortesía) ──────────────────
  { id: 'cy-01', topic: 'could-you', prompt: '___ you open the window, please?', options: ['Could', 'Do', 'Are'], answer: 0, tip: 'Para pedir algo con cortesía: Could you...?', tags: ['reuniones'] },
  { id: 'cy-02', topic: 'could-you', prompt: 'Could you ___ me, please?', options: ['to help', 'help', 'helps'], answer: 1, tip: 'Después de could va el verbo solo: could you help...?', tags: ['recepcion'] },
  { id: 'cy-03', topic: 'could-you', prompt: 'Could you spell your name? — ___! It\'s L-E-O.', options: ['Sure', 'Sorry', 'No'], answer: 0, tip: 'Para aceptar: Sure! / Of course!', tags: ['recepcion'] },
  { id: 'cy-04', topic: 'could-you', prompt: "Could you call me at nine? — ___, I can't. I'm busy.", options: ['Of course', 'Sorry', 'Thank you'], answer: 1, tip: "Para decir que no con cortesía: Sorry, I can't.", tags: ['oficina'] },
  { id: 'cy-05', topic: 'could-you', prompt: 'Could you repeat that, ___?', options: ['please', 'sorry', 'thanks you'], answer: 0, tip: 'Se agrega please para ser amable.', tags: ['oficina'] },
  { id: 'cy-06', topic: 'could-you', prompt: 'Could you ___ more slowly, please?', options: ['speaking', 'speak', 'to speak'], answer: 1, tip: 'could + verbo base: speak.', tags: ['recepcion'] },
  { id: 'cy-07', topic: 'could-you', prompt: '___ I speak to Ms. Clark, please?', options: ['Could', 'Do', 'Am'], answer: 0, tip: 'Por teléfono: Could I speak to...? (¿Podría hablar con...?)', tags: ['direccion'] },
  { id: 'cy-08', topic: 'could-you', prompt: 'Could you bring ___ a coffee, please?', options: ['I', 'me', 'my'], answer: 1, tip: 'Después del verbo: me.', tags: ['reuniones'] },

  { id: 'cyf-01', topic: 'could-you', kind: 'fix', prompt: 'You! Bring me coffee! Now!', options: ['Could you bring me a coffee, please?', 'Could you to bring me a coffee?', 'You could bring me coffee now!'], answer: 0, tip: 'Con cortesía: Could you + verbo + ..., please?', tags: ['reuniones'] },
  { id: 'cyf-02', topic: 'could-you', kind: 'fix', prompt: 'Could you to help me?', options: ['Could you help me?', 'Could you helps me?', 'Could you helping me?'], answer: 0, tip: 'Después de could no va "to".', tags: ['reuniones'] },
  { id: 'cyf-03', topic: 'could-you', kind: 'fix', prompt: 'Open window!', options: ['Could you open the window, please?', 'Could you opens the window?', 'You open window, please.'], answer: 0, tip: 'Pide con Could you... please?, y no olvides "the".', tags: ['reuniones'] },
  { id: 'cyf-04', topic: 'could-you', kind: 'fix', prompt: 'Could you sends the email?', options: ['Could you send the email?', 'Could you to send the email?', 'Could you sending the email?'], answer: 0, tip: 'could + verbo sin -s.', tags: ['oficina'] },
  { id: 'cyf-05', topic: 'could-you', kind: 'fix', prompt: 'I want speak with the director!', options: ['Could I speak to the director, please?', 'Could I to speak the director?', 'I could speaking with director.'], answer: 0, tip: 'Para pedir hablar con alguien: Could I speak to..., please?', tags: ['direccion'] },

  { id: 'cyo-01', topic: 'could-you', kind: 'order', prompt: '¿Podrías ayudarme, por favor?', options: ['Could', 'you', 'help', 'me,', 'please?'], answer: 0, tip: 'Could + you + help + me + please?', tags: ['recepcion'] },
  { id: 'cyo-02', topic: 'could-you', kind: 'order', prompt: '¿Podría hablar con la señora Clark?', options: ['Could', 'I', 'speak', 'to', 'Ms.', 'Clark?'], answer: 0, tip: 'Could I speak to + persona?', tags: ['direccion'] },
  { id: 'cyo-03', topic: 'could-you', kind: 'order', prompt: '¿Podrías repetir eso?', options: ['Could', 'you', 'repeat', 'that?'], answer: 0, tip: 'Could you + repeat + that?', tags: ['oficina'] },
]
