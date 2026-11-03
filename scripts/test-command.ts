/**
 * Pruebas de The Moving Stone escrito (matchCommand) y de los phrasal verbs de tres palabras (phrasalAt).
 * Uso: npm run test:command  · Sale con error si alguna prueba falla.
 */
import { matchCommand, maskedCommand, type ObjectNames, type TextStep } from '../src/game/command'
import { phrasalAt } from '../src/data/glossary'

const OBJECTS: ObjectNames[] = [
  { id: 'stone', names: ['stone', 'rock'] },
  { id: 'lid', names: ['lid'] },
  { id: 'light', names: ['light'] },
  { id: 'lever', names: ['lever'] },
  { id: 'lamp', names: ['lamp'] },
  { id: 'door', names: ['door'] },
  { id: 'key', names: ['gold key', 'key'] },
  { id: 'box', names: ['box'] },
]
const step = (accept: TextStep['accept'], extra: Partial<TextStep> = {}): TextStep => ({
  problem: { en: '', es: '' }, accept, target: accept[0].object, done: { en: '', es: '' }, tip: 'x', ...extra,
})
const STEPS = {
  stone: step([{ verb: 'push', object: 'stone', optional: ['slowly', 'to the left', 'to the right'] }], {
    verbPool: ['break', 'kick', 'open', 'lift', 'pull'],
    fails: { break: { en: "The stone doesn't move.", es: 'La piedra no se mueve.' } },
  }),
  lid: step([{ verb: 'lift', particle: 'up', object: 'lid' }], { verbPool: ['open', 'push', 'break'] }),
  light: step([{ verb: 'turn', particle: 'on', object: 'light' }, { verb: 'switch', particle: 'on', object: 'light' }]),
  lever: step([{ verb: 'pull', particle: 'down', object: 'lever' }], { verbPool: ['push'] }),
  lamp: step([{ verb: 'plug', particle: 'in', object: 'lamp' }]),
  door: step([{ verb: 'open', object: 'door', complement: ['with the gold key', 'with the key'] }], { verbPool: ['push', 'break'] }),
  box: step([{ verb: 'pick', particle: 'up', object: 'box' }]),
}

let fail = 0
function expect(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (!ok) fail++
  console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : `  → esperaba ${JSON.stringify(want)}, salió ${JSON.stringify(got)}`}`)
}
const kind = (input: string, s: TextStep) => {
  const r = matchCommand(input, s, OBJECTS)
  return r.ok ? 'ok' : r.kind
}

console.log('— Deben pasar —')
for (const [input, s] of [
  ['push the stone', STEPS.stone], ['Push the stone.', STEPS.stone], ['PUSH THE STONE', STEPS.stone],
  ['lift up the lid', STEPS.lid], ['lift the lid up', STEPS.lid],
  ['turn on the light', STEPS.light], ['turn it on', STEPS.light],
  ['pull the lever down', STEPS.lever], ['pull down the lever', STEPS.lever],
  ['plug in the lamp', STEPS.lamp], ['plug it in', STEPS.lamp],
  ['Open the door with the gold key', STEPS.door],
  ['Push the stone slowly to the left', STEPS.stone],
  ['pick it up', STEPS.box], ['pick the box up', STEPS.box], ['please pick up the box', STEPS.box],
] as const) expect(input, kind(input, s), 'ok')

console.log('— Deben fallar —')
expect('pick up it → pronoun', kind('pick up it', STEPS.box), 'pronoun')
const br = matchCommand('break the stone', STEPS.stone, OBJECTS)
expect('break the stone → wrongVerb', br.ok ? 'ok' : br.kind, 'wrongVerb')
expect("break the stone → reacción \"The stone doesn't move.\"", !br.ok && br.kind === 'wrongVerb' ? STEPS.stone.fails?.[br.verb]?.en : null, "The stone doesn't move.")
const ty = matchCommand('lifft the lid', STEPS.lid, OBJECTS)
expect('lifft the lid → typo (lift)', ty.ok ? 'ok' : ty.kind === 'typo' ? ty.suggestion : ty.kind, 'lift')
expect('lifft the lid, sin aviso de typo → se evalúa', kind2('lifft the lid', STEPS.lid), 'unknown')
expect('the lid → malformed', kind('the lid', STEPS.lid), 'malformed')
expect('open the stone → wrongVerb', kind('open the stone', STEPS.stone), 'wrongVerb')
expect('open the lid (paso de la puerta) → wrongObject', kind('open the lid', STEPS.door), 'wrongObject')
expect('open the door (sin la llave) → incomplete', kind('open the door', STEPS.door), 'incomplete')
expect('dance the stone → unknown', kind('dance the stone', STEPS.stone), 'unknown')
expect('pick the box (sin up) → incomplete', kind('pick the box', STEPS.box), 'incomplete')
expect('pushes the stone (no es imperativo) → no pasa', kind('pushes the stone', STEPS.stone) !== 'ok', true)
function kind2(input: string, s: TextStep) {
  const r = matchCommand(input, s, OBJECTS, { allowTypo: false })
  return r.ok ? 'ok' : r.kind
}

console.log('— Ayuda del 3.er error —')
expect('lift up the lid → "l_ft u_ the lid"', maskedCommand(STEPS.lid.accept[0], OBJECTS), 'l_ft u_ the lid')

console.log('— Phrasal verbs al tocar una palabra —')
const at = (sentence: string, word: string) => {
  const w = sentence.split(/\s+/)
  return phrasalAt(w, w.findIndex((x) => x.replace(/[^A-Za-z]/g, '').toLowerCase() === word))?.phrase ?? null
}
expect('"on" en "I get on well with Leo" → get on with', at('I get on well with Leo.', 'on'), 'get on with')
expect('"get" en "I get on well with Leo" → get on with', at('I get on well with Leo.', 'get'), 'get on with')
expect('"on" en "I get on the bus" → get on', at('I get on the bus.', 'on'), 'get on')
expect('"of" en "We ran out of water" → run out of', at('We ran out of water.', 'of'), 'run out of')
expect('"out" en "The water ran out" → run out', at('The water ran out.', 'out'), 'run out')
expect('"forward" en "I look forward to the trip" → look forward to', at('I look forward to the trip.', 'forward'), 'look forward to')
expect('"up" en "Pick the box up" → pick up', at('Pick the box up.', 'up'), 'pick up')
expect('"on" en "Turn it on" → turn on', at('Turn it on.', 'on'), 'turn on')
expect('"down" en "The car broke down" → break down', at('The car broke down.', 'down'), 'break down')
expect('"up" en "Never give up" → give up', at('Never give up!', 'up'), 'give up')
expect('"on" en "I go to school on the bus" → nada', at('I go to school on the bus.', 'on'), null)

console.log(fail ? `\n${fail} prueba(s) fallaron` : '\nTodas las pruebas pasaron')
if (fail) process.exitCode = 1
