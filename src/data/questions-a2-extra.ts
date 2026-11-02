import type { Question } from '../game/types'

/**
 * Refuerzo de A2 (Busuu A2): más preguntas para los temas cortos y para lo que quedó a medias.
 * - Peticiones: pedir permiso (Can I / Could I / May I) y pedir que repitan (cap. 11 y 12).
 * - Instrucciones y responsabilidades (It's my job to, responsible for, have to).
 * - Invitaciones y frecuencia: how often, once / twice a week, go out, pick up (cap. 5 y 6).
 * - Pasado: preguntas con did y palabras interrogativas (cap. 9).
 * - Direcciones: how long / how far (cap. 22 y 23).
 * - Consejos: Why don't you...? y verbos + -ing (enjoy, mind, stop) (cap. 29).
 * - Escucha real de cada misión de A2 (como en A1).
 * Las etiquetas son las de cada enemigo, para que también salgan en sus combates.
 */
type L = Omit<Question, 'kind'>
const L = (q: L): Question => ({ ...q, kind: 'listen' })

const WS = ['a2-workshop']
const WA = ['a2-workshop-apprentice']
const CT = ['a2-city']
const CTT = ['a2-city-tourist']
const LR = ['a2-library', 'a2-library-reg']
const LI = ['a2-library', 'a2-library-irr']
const LRD = ['a2-library-reader']
const FB = ['a2-future-boss', 'a2-future-boss-travel']
const FD = ['a2-future-minion', 'a2-future-minion-dir']
const RA = ['a2-return-minion', 'a2-return-minion-advice']

export const A2_EXTRA_QUESTIONS: Question[] = [
  // ── Peticiones: pedir permiso y pedir que repitan ──
  { id: 'a2x-rq01', topic: 'requests', prompt: '___ I use your phone, please? — Of course.', options: ['Can', 'Do', 'Am'], answer: 0, tip: 'Para pedir permiso: Can I + verbo...?', tags: WS },
  { id: 'a2x-rq02', topic: 'requests', prompt: "Could I ___ the window? It's very hot in here.", options: ['open', 'to open', 'opening'], answer: 0, tip: 'Could I + verbo tal cual: Could I open...?', tags: WS },
  { id: 'a2x-rq03', topic: 'requests', prompt: 'May I ___ in? — Yes, come in.', options: ['come', 'to come', 'coming'], answer: 0, tip: 'May I + verbo tal cual (muy formal): May I come in?', tags: WS },
  { id: 'a2x-rq04', topic: 'requests', kind: 'order', prompt: '¿Puedo sentarme aquí?', options: ['Can', 'I', 'sit', 'here?'], answer: 0, tip: 'Can + I + verbo...?', tags: WS },
  { id: 'a2x-rq05', topic: 'requests', kind: 'fix', prompt: 'Can I to borrow your pen?', options: ['Can I borrow your pen?', 'Can I borrowing your pen?', 'Can I borrows your pen?'], answer: 0, tip: 'Después de Can I no va to: Can I borrow...?', tags: WS },
  { id: 'a2x-rq06', topic: 'requests', prompt: "Can I take your ladder? — Sorry, you ___. I need it now.", options: ["can't", "aren't", "don't can"], answer: 0, tip: "Para negar un permiso con amabilidad: Sorry, you can't. + la razón.", tags: WS },
  { id: 'a2x-rq07', topic: 'requests', prompt: 'Would you mind ___ me with this box?', options: ['helping', 'help', 'to help'], answer: 0, tip: 'Would you mind + verbo con -ing: helping.', tags: WS },
  { id: 'a2x-rq08', topic: 'requests', prompt: "Could you speak more ___, please? I don't understand.", options: ['slowly', 'slow', 'slowest'], answer: 0, tip: 'Para pedir que hablen más despacio: speak more slowly.', tags: WS },
  { id: 'a2x-rq09', topic: 'requests', prompt: 'Sorry, could you ___ that again, please?', options: ['say', 'to say', 'saying'], answer: 0, tip: 'Para pedir que repitan: Could you say that again?', tags: WS },
  { id: 'a2x-rq10', topic: 'requests', kind: 'order', prompt: '¿Podrías repetir eso, por favor?', options: ['Could', 'you', 'repeat', 'that,', 'please?'], answer: 0, tip: 'Could + you + verbo + ... + please?', tags: WS },
  { id: 'a2x-rq11', topic: 'requests', kind: 'fix', prompt: 'Would you mind to close the door?', options: ['Would you mind closing the door?', 'Would you mind close the door?', 'Would you mind closes the door?'], answer: 0, tip: 'Would you mind + verbo con -ing: closing.', tags: WS },
  { id: 'a2x-rq12', topic: 'requests', prompt: 'Would you mind waiting a minute? — No, not at ___.', options: ['all', 'any', 'some'], answer: 0, tip: 'No, not at all = no me molesta (es un sí).', tags: WS },
  { id: 'a2x-rq13', topic: 'requests', prompt: 'Can you ___ me the red box, please?', options: ['pass', 'passing', 'to pass'], answer: 0, tip: 'Can you + verbo tal cual: Can you pass...?', tags: WS },
  { id: 'a2x-rq14', topic: 'requests', kind: 'order', prompt: '¿Puedo tomar prestado tu destornillador?', options: ['Can', 'I', 'borrow', 'your', 'screwdriver?'], answer: 0, tip: 'Can + I + borrow + cosa?', tags: WA },
  { id: 'a2x-rq15', topic: 'requests', prompt: '___ you mind holding the light for me?', options: ['Would', 'Are', 'Can'], answer: 0, tip: 'Would you mind + verbo con -ing...?', tags: WA },
  { id: 'a2x-rq16', topic: 'requests', kind: 'fix', prompt: 'Could you helping me, please?', options: ['Could you help me, please?', 'Could you to help me, please?', 'Could you helps me, please?'], answer: 0, tip: 'Could you + verbo tal cual: Could you help...?', tags: WA },

  // ── Instrucciones y responsabilidades ──
  { id: 'a2x-in01', topic: 'instructions', prompt: 'First, ___ your hands. Then, take the tools.', options: ['wash', 'washes', 'washing'], answer: 0, tip: 'En instrucciones el verbo va tal cual: wash.', tags: WS },
  { id: 'a2x-in02', topic: 'instructions', prompt: "It's my job ___ the machines every morning.", options: ['to check', 'check', 'checks'], answer: 0, tip: "It's my job + to + verbo: to check.", tags: WS },
  { id: 'a2x-in03', topic: 'instructions', prompt: 'Who is responsible ___ the keys? — Tom is.', options: ['for', 'of', 'to'], answer: 0, tip: 'responsible for: encargado de.', tags: WS },
  { id: 'a2x-in04', topic: 'instructions', prompt: "I'm responsible for ___ the doors at night.", options: ['locking', 'lock', 'to lock'], answer: 0, tip: 'responsible for + verbo con -ing: locking.', tags: WS },
  { id: 'a2x-in05', topic: 'instructions', prompt: 'You have ___ wear gloves in the workshop.', options: ['to', 'for', 'at'], answer: 0, tip: 'Obligación: have to + verbo.', tags: WS },
  { id: 'a2x-in06', topic: 'instructions', prompt: 'Mr. Hale ___ to clean the floor every Friday.', options: ['has', 'have', 'is'], answer: 0, tip: 'Con he / she: has to + verbo.', tags: WS },
  { id: 'a2x-in07', topic: 'instructions', kind: 'order', prompt: 'Después de eso, cierra la caja.', options: ['After', 'that,', 'close', 'the', 'box.'], answer: 0, tip: 'After that, + verbo tal cual.', tags: WS },
  { id: 'a2x-in08', topic: 'instructions', kind: 'order', prompt: 'Es mi trabajo arreglar los carros.', options: ["It's", 'my', 'job', 'to', 'fix', 'the', 'cars.'], answer: 0, tip: "It's my job + to + verbo.", tags: WS },
  { id: 'a2x-in09', topic: 'instructions', kind: 'fix', prompt: 'Then, puts the wheel on the car.', options: ['Then, put the wheel on the car.', 'Then, putting the wheel on the car.', 'Then, to puts the wheel on the car.'], answer: 0, tip: 'Instrucción: el verbo sin -s: put.', tags: WS },
  { id: 'a2x-in10', topic: 'instructions', kind: 'fix', prompt: 'She is responsible for open the shop.', options: ['She is responsible for opening the shop.', 'She is responsible for opens the shop.', 'She is responsible of open the shop.'], answer: 0, tip: 'responsible for + verbo con -ing: opening.', tags: WS },
  { id: 'a2x-in11', topic: 'instructions', kind: 'fix', prompt: "It's my job check the tires.", options: ["It's my job to check the tires.", "It's my job checks the tires.", "It's my job to checks the tires."], answer: 0, tip: "It's my job + to + verbo tal cual: to check.", tags: WS },
  { id: 'a2x-in12', topic: 'instructions', prompt: 'First, clean the tools. Then, put them away. ___, turn off the light.', options: ['Finally', 'First', 'Before'], answer: 0, tip: 'El último paso: Finally.', tags: WS },
  { id: 'a2x-in13', topic: 'instructions', prompt: 'Do I have to ___ the oil? — Yes, every month.', options: ['change', 'changing', 'changes'], answer: 0, tip: 'Do I have to + verbo tal cual?', tags: WS },
  { id: 'a2x-in14', topic: 'instructions', kind: 'order', prompt: 'No tienes que limpiar las herramientas hoy.', options: ['You', "don't", 'have', 'to', 'clean', 'the', 'tools', 'today.'], answer: 0, tip: "No es necesario: don't have to + verbo.", tags: WS },
  { id: 'a2x-in15', topic: 'instructions', prompt: 'Before you start, ___ the instructions.', options: ['read', 'reads', 'reading'], answer: 0, tip: 'Instrucción: verbo tal cual: read.', tags: WA },

  // ── Invitaciones, planes y frecuencia ──
  { id: 'a2x-iv01', topic: 'invitations', prompt: 'How ___ do you go to the café? — Twice a week.', options: ['often', 'much', 'long'], answer: 0, tip: 'Para preguntar la frecuencia: How often...?', tags: CT },
  { id: 'a2x-iv02', topic: 'invitations', prompt: 'I go to the cinema ___ a month.', options: ['once', 'one', 'first'], answer: 0, tip: 'Una vez = once · dos veces = twice · tres veces = three times.', tags: CT },
  { id: 'a2x-iv03', topic: 'invitations', kind: 'order', prompt: 'Voy al parque dos veces por semana.', options: ['I', 'go', 'to', 'the', 'park', 'twice', 'a', 'week.'], answer: 0, tip: 'La frecuencia de tiempo va al final: twice a week.', tags: CT },
  { id: 'a2x-iv04', topic: 'invitations', prompt: 'She ___ late. She is always on time.', options: ['is never', 'never is', 'never'], answer: 0, tip: 'Con el verbo be, la frecuencia va después: is never.', tags: CT },
  { id: 'a2x-iv05', topic: 'invitations', kind: 'fix', prompt: 'I go always to the café on Sundays.', options: ['I always go to the café on Sundays.', 'Always I go to the café on Sundays.', 'I go to always the café on Sundays.'], answer: 0, tip: 'La frecuencia va antes del verbo: I always go.', tags: CT },
  { id: 'a2x-iv06', topic: 'invitations', prompt: "Are you free on Saturday? — Yes, ___ go to the market!", options: ["let's", 'let', 'let us to'], answer: 0, tip: "Para proponer: Let's + verbo.", tags: CT },
  { id: 'a2x-iv07', topic: 'invitations', prompt: 'How often ___ you eat out? — Not very often.', options: ['do', 'are', 'does'], answer: 0, tip: 'How often + do + you + verbo...?', tags: CT },
  { id: 'a2x-iv08', topic: 'invitations', prompt: 'Would you like ___ coffee? — Yes, please.', options: ['a', 'to', 'any of'], answer: 0, tip: 'Para ofrecer algo: Would you like a coffee?', tags: CTT },
  { id: 'a2x-iv09', topic: 'invitations', prompt: "Why don't we ___ out tonight?", options: ['go', 'going', 'to go'], answer: 0, tip: "Para proponer: Why don't we + verbo? · go out = salir.", tags: CTT },
  { id: 'a2x-iv10', topic: 'invitations', kind: 'order', prompt: '¿Te gustaría salir a cenar el viernes?', options: ['Would', 'you', 'like', 'to', 'go', 'out', 'for', 'dinner', 'on', 'Friday?'], answer: 0, tip: 'Would you like to + go out for dinner...?', tags: CTT },
  { id: 'a2x-iv11', topic: 'invitations', prompt: "Shall we meet ___ six o'clock?", options: ['at', 'on', 'in'], answer: 0, tip: 'Con la hora: at six o’clock.', tags: CTT },
  { id: 'a2x-iv12', topic: 'invitations', prompt: "I'd love to come, but I ___ visit my grandmother.", options: ['have to', 'has to', 'having to'], answer: 0, tip: 'Para rechazar con una razón: I have to + verbo.', tags: CTT },
  { id: 'a2x-iv13', topic: 'invitations', kind: 'fix', prompt: "Let's meeting at the plaza.", options: ["Let's meet at the plaza.", "Let's to meet at the plaza.", "Let's meets at the plaza."], answer: 0, tip: "Let's + verbo tal cual: Let's meet.", tags: CTT },
  { id: 'a2x-iv14', topic: 'invitations', prompt: 'Can you pick me ___ at seven? — Sure!', options: ['up', 'on', 'in'], answer: 0, tip: 'pick someone up = recoger a alguien.', tags: CTT },

  // ── Pasado: preguntas con did y palabras interrogativas ──
  { id: 'a2x-pd01', topic: 'past-simple', prompt: 'Where ___ you go last weekend?', options: ['did', 'do', 'were'], answer: 0, tip: 'Pregunta en pasado: Where + did + sujeto + verbo?', tags: LR },
  { id: 'a2x-pd02', topic: 'past-simple', prompt: 'What did you ___ yesterday?', options: ['do', 'did', 'done'], answer: 0, tip: 'Después de did, el verbo va en base: do.', tags: LR },
  { id: 'a2x-pd03', topic: 'past-simple', kind: 'order', prompt: '¿Por qué llegaste tarde?', options: ['Why', 'did', 'you', 'arrive', 'late?'], answer: 0, tip: 'Why + did + sujeto + verbo base?', tags: LR },
  { id: 'a2x-pd04', topic: 'past-simple', prompt: 'When did she ___ the book?', options: ['find', 'found', 'finds'], answer: 0, tip: 'Después de did, el verbo va en base: find (no found).', tags: LI },
  { id: 'a2x-pd05', topic: 'past-simple', kind: 'fix', prompt: 'Where did you went?', options: ['Where did you go?', 'Where you went?', 'Where did you going?'], answer: 0, tip: 'did + verbo base: Where did you go?', tags: LI },
  { id: 'a2x-pd06', topic: 'past-simple', kind: 'order', prompt: '¿Qué libro leíste?', options: ['What', 'book', 'did', 'you', 'read?'], answer: 0, tip: 'What + cosa + did + sujeto + verbo base?', tags: LI },
  { id: 'a2x-pd07', topic: 'past-simple', prompt: 'Who ___ the old map? — Leo found it.', options: ['found', 'find', 'founded'], answer: 0, tip: 'Cuando who es el sujeto, no se usa did: Who found...?', tags: LI },
  { id: 'a2x-pd08', topic: 'past-simple', prompt: '___ you read the letter? — Yes, I did.', options: ['Did', 'Do', 'Was'], answer: 0, tip: 'Pregunta de sí o no en pasado: Did + sujeto + verbo base?', tags: LRD },
  { id: 'a2x-pd09', topic: 'past-simple', prompt: "I ___ see the man. It was too dark.", options: ["didn't", "don't", "wasn't"], answer: 0, tip: "Negativo en pasado: didn't + verbo base.", tags: LRD },
  { id: 'a2x-pd10', topic: 'past-simple', kind: 'fix', prompt: 'Did he wrote the note?', options: ['Did he write the note?', 'Did he writes the note?', 'Does he wrote the note?'], answer: 0, tip: 'did + verbo base: Did he write...?', tags: LRD },

  // ── Direcciones: cuánto tiempo y qué tan lejos ──
  { id: 'a2x-hl01', topic: 'places-directions', prompt: 'How ___ does it take to get to the museum? — About twenty minutes.', options: ['long', 'far', 'much'], answer: 0, tip: 'Tiempo: How long does it take...?', tags: FB },
  { id: 'a2x-hl02', topic: 'places-directions', prompt: "How ___ is the station from here? — It's two kilometres.", options: ['far', 'long', 'often'], answer: 0, tip: 'Distancia: How far is...?', tags: FB },
  { id: 'a2x-hl03', topic: 'places-directions', prompt: 'It ___ ten minutes to walk to the bridge.', options: ['takes', 'take', 'taking'], answer: 0, tip: 'It takes + tiempo + to + verbo.', tags: FB },
  { id: 'a2x-hl04', topic: 'places-directions', kind: 'order', prompt: '¿Cuánto tiempo se tarda en tranvía?', options: ['How', 'long', 'does', 'it', 'take', 'by', 'tram?'], answer: 0, tip: 'How long + does it take + by + transporte?', tags: FD },
  { id: 'a2x-hl05', topic: 'places-directions', kind: 'fix', prompt: 'How long it take to get to the park?', options: ['How long does it take to get to the park?', 'How long does it takes to get to the park?', 'How long it takes to get to the park?'], answer: 0, tip: 'How long + does + it + take (sin -s)?', tags: FD },

  // ── Consejos: Why don't you...? y verbos + -ing ──
  { id: 'a2x-ad01', topic: 'health-emergency', prompt: "You look tired. Why don't you ___ a break?", options: ['take', 'taking', 'to take'], answer: 0, tip: "Why don't you + verbo tal cual: take.", tags: RA },
  { id: 'a2x-ad02', topic: 'health-emergency', prompt: 'Why ___ you see a doctor?', options: ["don't", "doesn't", "aren't"], answer: 0, tip: "Para sugerir: Why don't you + verbo?", tags: RA },
  { id: 'a2x-ad03', topic: 'health-emergency', kind: 'fix', prompt: "Why don't you to drink some water?", options: ["Why don't you drink some water?", "Why don't you drinking some water?", "Why you don't drink some water?"], answer: 0, tip: "Why don't you + verbo tal cual, sin to.", tags: RA },
  { id: 'a2x-ad04', topic: 'health-emergency', prompt: 'You should stop ___ so much coffee.', options: ['drinking', 'drink', 'drinks'], answer: 0, tip: 'stop + verbo con -ing: stop drinking.', tags: RA },
  { id: 'a2x-ad05', topic: 'health-emergency', prompt: 'I enjoy ___ in the park in the morning.', options: ['walking', 'walk', 'to walk'], answer: 0, tip: 'enjoy + verbo con -ing: enjoy walking.', tags: RA },
  { id: 'a2x-ad06', topic: 'health-emergency', prompt: 'Do you mind ___ the window? I feel hot.', options: ['opening', 'open', 'to open'], answer: 0, tip: 'mind + verbo con -ing: mind opening.', tags: RA },
  { id: 'a2x-ad07', topic: 'health-emergency', kind: 'order', prompt: 'Deberías dejar de trabajar tan tarde.', options: ['You', 'should', 'stop', 'working', 'so', 'late.'], answer: 0, tip: 'should + stop + verbo con -ing.', tags: RA },
  { id: 'a2x-ad08', topic: 'health-emergency', kind: 'fix', prompt: 'I enjoy to swim in the sea.', options: ['I enjoy swimming in the sea.', 'I enjoy swim in the sea.', 'I enjoys swimming in the sea.'], answer: 0, tip: 'enjoy + verbo con -ing: enjoy swimming.', tags: RA },

  // ── Escucha real (se oye sin ver el texto) ──
  // A2-01 · Hospital
  L({ id: 'a2ls-01', topic: 'should-must', audio: "You must stay in bed today. You shouldn't walk too much.", voice: 'female', prompt: 'What must the patient do?', options: ['Stay in bed.', 'Walk a lot.', 'Go home.'], answer: 0, tip: 'Dijo: "You must stay in bed".', tags: ['a2-hospital'] }),
  L({ id: 'a2ls-02', topic: 'should-must', audio: "Visitors have to leave at eight o'clock. You don't have to bring anything.", voice: 'male', prompt: 'When do visitors have to leave?', options: ["At eight o'clock.", "At six o'clock.", "At nine o'clock."], answer: 0, tip: 'Dijo: "have to leave at eight".', tags: ['a2-hospital'] }),
  // A2-03 · Ciudad
  L({ id: 'a2ls-03', topic: 'invitations', audio: 'Hi! Would you like to come to the café with me on Saturday? We can meet at ten.', voice: 'female', prompt: 'When can they meet?', options: ['On Saturday at ten.', 'On Sunday at ten.', 'On Saturday at two.'], answer: 0, tip: 'Dijo: "on Saturday... at ten".', tags: [...CT, ...CTT] }),
  L({ id: 'a2ls-04', topic: 'invitations', audio: 'I usually go to the park on Sundays, but I never go on Mondays.', voice: 'female', prompt: 'When does she never go to the park?', options: ['On Mondays.', 'On Sundays.', 'On Saturdays.'], answer: 0, tip: 'Dijo: "I never go on Mondays".', tags: [...CT, ...CTT] }),
  // A2-04 · Taller
  L({ id: 'a2ls-05', topic: 'requests', audio: "Could you pass me the hammer, please? It's on the table, next to the box.", voice: 'male', prompt: 'Where is the hammer?', options: ['On the table.', 'In the box.', 'Under the table.'], answer: 0, tip: 'Dijo: "It\'s on the table".', tags: [...WS, ...WA] }),
  L({ id: 'a2ls-06', topic: 'instructions', audio: 'First, turn off the machine. Then, open the door. After that, clean the inside.', voice: 'male', prompt: 'What is the second step?', options: ['Open the door.', 'Turn off the machine.', 'Clean the inside.'], answer: 0, tip: 'Dijo: "Then, open the door".', tags: [...WS, ...WA] }),
  // A2-05 · Biblioteca
  L({ id: 'a2ls-07', topic: 'past-simple', audio: 'Yesterday I visited the library. I found an old book and I read it at home.', voice: 'female', prompt: 'What did the speaker find?', options: ['An old book.', 'A new map.', 'A letter.'], answer: 0, tip: 'Dijo: "I found an old book".', tags: ['a2-library', 'a2-library-reg', 'a2-library-irr', 'a2-library-reader'] }),
  L({ id: 'a2ls-08', topic: 'past-simple', audio: "We didn't go to the park last week because it rained every day.", voice: 'male', prompt: "Why didn't they go to the park?", options: ['Because it rained.', 'Because they were ill.', 'Because it was closed.'], answer: 0, tip: 'Dijo: "because it rained every day".', tags: ['a2-library', 'a2-library-reg', 'a2-library-irr', 'a2-library-reader'] }),
  // A2-06 · Granja de los River
  L({ id: 'a2ls-09', topic: 'past-simple-comparatives', audio: 'The old barn was bigger than the new one, but the new one is cleaner.', voice: 'female', prompt: 'Which barn was bigger?', options: ['The old barn.', 'The new barn.', 'They were the same.'], answer: 0, tip: 'Dijo: "The old barn was bigger".', tags: ['a2-farm-helper', 'a2-farm-echo', 'a2-farm-echo-past', 'a2-farm-echo-comp'] }),
  L({ id: 'a2ls-10', topic: 'past-simple-comparatives', audio: "Five years ago my grandfather became ill. After that, he didn't ride his horse.", voice: 'female', prompt: 'What happened five years ago?', options: ['The grandfather became ill.', 'The grandfather sold his horse.', 'The grandfather won a race.'], answer: 0, tip: 'Dijo: "my grandfather became ill".', tags: ['a2-farm-helper', 'a2-farm-echo', 'a2-farm-echo-past', 'a2-farm-echo-comp'] }),
  // A2-07 · Hipódromo
  L({ id: 'a2ls-11', topic: 'superlatives-comparatives-race', audio: 'Look! The white horse is running faster than the black one. Now it is jumping the fence!', voice: 'male', prompt: 'Which horse is faster?', options: ['The white horse.', 'The black horse.', 'The brown horse.'], answer: 0, tip: 'Dijo: "The white horse is running faster".', tags: ['a2-race-jack', 'a2-race-boss', 'a2-race-boss-comp', 'a2-race-boss-cont', 'a2-race-boss-mix'] }),
  L({ id: 'a2ls-12', topic: 'superlatives-comparatives-race', audio: 'Thunder is the fastest horse here, but Star is the most beautiful.', voice: 'male', prompt: 'Which horse is the fastest?', options: ['Thunder.', 'Star.', 'They are the same.'], answer: 0, tip: 'Dijo: "Thunder is the fastest horse".', tags: ['a2-race-jack', 'a2-race-boss', 'a2-race-boss-comp', 'a2-race-boss-cont', 'a2-race-boss-mix'] }),
  // A2-08 · El carro
  L({ id: 'a2ls-13', topic: 'past-simple-continuous', audio: 'I was driving home when the engine stopped. My sister was reading a map.', voice: 'male', prompt: 'What was the sister doing?', options: ['Reading a map.', 'Driving.', 'Sleeping.'], answer: 0, tip: 'Dijo: "My sister was reading a map".', tags: ['a2-car-minion', 'a2-car-boss', 'a2-car-boss-simple', 'a2-car-boss-cont'] }),
  L({ id: 'a2ls-14', topic: 'past-simple-continuous', audio: 'While we were looking at the wheels, we saw a purple light.', voice: 'female', prompt: 'What did they see?', options: ['A purple light.', 'A white horse.', 'A red car.'], answer: 0, tip: 'Dijo: "we saw a purple light".', tags: ['a2-car-minion', 'a2-car-boss', 'a2-car-boss-simple', 'a2-car-boss-cont'] }),
  // A2-09 · Molino
  L({ id: 'a2ls-15', topic: 'recipes-some-any', audio: "Put the flour in a bowl. Add some water and mix everything. Don't open the oven!", voice: 'female', prompt: 'What must you NOT do?', options: ['Open the oven.', 'Add water.', 'Mix everything.'], answer: 0, tip: 'Dijo: "Don\'t open the oven".', tags: ['a2-mill-minion', 'a2-mill-minion-some', 'a2-mill-minion-while', 'a2-mill-echo', 'a2-mill-boss', 'a2-mill-boss-imp', 'a2-mill-boss-some', 'a2-mill-boss-shop'] }),
  L({ id: 'a2ls-16', topic: 'recipes-some-any', audio: "There is some flour, but there isn't any salt. Can you buy some at the shop?", voice: 'male', prompt: 'What do they need to buy?', options: ['Salt.', 'Flour.', 'Water.'], answer: 0, tip: 'Dijo: "there isn\'t any salt".', tags: ['a2-mill-minion', 'a2-mill-minion-some', 'a2-mill-minion-while', 'a2-mill-echo', 'a2-mill-boss', 'a2-mill-boss-imp', 'a2-mill-boss-some', 'a2-mill-boss-shop'] }),
  // A2-10 · Casa de Leo
  L({ id: 'a2ls-17', topic: 'present-perfect', audio: 'I have never been to the sea, but I have seen the mountains many times.', voice: 'female', prompt: 'Where has the speaker never been?', options: ['To the sea.', 'To the mountains.', 'To the city.'], answer: 0, tip: 'Dijo: "I have never been to the sea".', tags: ['a2-house-minion', 'a2-house-minion-part', 'a2-house-minion-jay', 'a2-house-boss', 'a2-house-boss-ever', 'a2-house-boss-jay', 'a2-house-boss-pps'] }),
  L({ id: 'a2ls-18', topic: 'present-perfect', audio: "Leo has just opened the box. He hasn't found the key yet.", voice: 'male', prompt: 'What has Leo just done?', options: ['He has opened the box.', 'He has found the key.', 'He has cleaned the attic.'], answer: 0, tip: 'Dijo: "Leo has just opened the box".', tags: ['a2-house-minion', 'a2-house-minion-part', 'a2-house-minion-jay', 'a2-house-boss', 'a2-house-boss-ever', 'a2-house-boss-jay', 'a2-house-boss-pps'] }),
  // A2-11 · Ciudad del futuro
  L({ id: 'a2ls-19', topic: 'places-directions', audio: 'Go straight and turn left at the bridge. The museum is on your right, opposite the park.', voice: 'female', prompt: 'Where is the museum?', options: ['Opposite the park.', 'Next to the bridge.', 'Behind the station.'], answer: 0, tip: 'Dijo: "opposite the park".', tags: ['a2-future-minion', 'a2-future-minion-place', 'a2-future-minion-dir', 'a2-future-boss', 'a2-future-boss-move', 'a2-future-boss-travel'] }),
  L({ id: 'a2ls-20', topic: 'places-directions', audio: 'Take the tram to Museum Bridge and get off at the third stop. It takes ten minutes.', voice: 'male', prompt: 'How long does the trip take?', options: ['Ten minutes.', 'Three minutes.', 'Thirty minutes.'], answer: 0, tip: 'Dijo: "It takes ten minutes".', tags: ['a2-future-minion', 'a2-future-minion-place', 'a2-future-minion-dir', 'a2-future-boss', 'a2-future-boss-move', 'a2-future-boss-travel'] }),
  // A2-12 · Sala de control
  L({ id: 'a2ls-21', topic: 'future-plans', audio: 'Attention, please. The ten fifteen train to Lake Town is delayed. It will leave from platform three.', voice: 'male', prompt: 'Where will the train leave from?', options: ['Platform three.', 'Platform ten.', 'Platform fifteen.'], answer: 0, tip: 'Dijo: "from platform three".', tags: ['a2-control-minion', 'a2-control-minion-will', 'a2-control-minion-plans', 'a2-control-boss', 'a2-control-boss-plans', 'a2-control-boss-travel'] }),
  L({ id: 'a2ls-22', topic: 'future-plans', audio: "I'm meeting my sister at four, and tomorrow we're going to visit our grandparents.", voice: 'female', prompt: 'What is she doing at four?', options: ['Meeting her sister.', 'Visiting her grandparents.', 'Taking the train.'], answer: 0, tip: 'Dijo: "I\'m meeting my sister at four".', tags: ['a2-control-minion', 'a2-control-minion-will', 'a2-control-minion-plans', 'a2-control-boss', 'a2-control-boss-plans', 'a2-control-boss-travel'] }),
  // A2-13 · Regreso al hospital
  L({ id: 'a2ls-23', topic: 'health-emergency', audio: "I've got a terrible headache and my throat hurts. I think I have a fever.", voice: 'female', prompt: 'What hurts?', options: ['Her throat.', 'Her back.', 'Her ears.'], answer: 0, tip: 'Dijo: "my throat hurts".', tags: ['a2-return-minion', 'a2-return-minion-ill', 'a2-return-minion-advice', 'a2-return-boss', 'a2-return-boss-health'] }),
  L({ id: 'a2ls-24', topic: 'health-emergency', audio: 'Hello, I need an ambulance. My friend has fainted. We are on the second floor.', voice: 'male', prompt: 'Where are they?', options: ['On the second floor.', 'On the first floor.', 'In the street.'], answer: 0, tip: 'Dijo: "We are on the second floor".', tags: ['a2-return-minion', 'a2-return-minion-ill', 'a2-return-minion-advice', 'a2-return-boss', 'a2-return-boss-health'] }),
]
