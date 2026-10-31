import type { Question } from '../game/types'

/**
 * Preguntas de la granja (A1, presente): preguntas y negativas con do / does,
 * y plurales irregulares. Etiquetas: granero, corral, campo, casa-granja.
 */
export const FARM_QUESTIONS: Question[] = [
  // ── Do / does: preguntas y negativas ────────────────────
  { id: 'dd-01', topic: 'do-does', prompt: '___ the cow eat grass?', options: ['Do', 'Does', 'Is'], answer: 1, tip: '"The cow" es "it": la pregunta empieza con Does.', tags: ['corral'] },
  { id: 'dd-02', topic: 'do-does', prompt: '___ you like horses?', options: ['Does', 'Are', 'Do'], answer: 2, tip: 'Con I, you, we, they la pregunta empieza con Do.', tags: ['campo'] },
  { id: 'dd-03', topic: 'do-does', prompt: 'Chickens ___ swim.', options: ["don't", "doesn't", 'not'], answer: 0, tip: '"Chickens" son varios (they): don\'t.', tags: ['corral'] },
  { id: 'dd-04', topic: 'do-does', prompt: 'The horse ___ eat meat.', options: ["don't", "doesn't", "isn't"], answer: 1, tip: '"The horse" es "it": doesn\'t.', tags: ['campo'] },
  { id: 'dd-05', topic: 'do-does', prompt: 'Does the farmer ___ early?', options: ['gets up', 'get up', 'getting up'], answer: 1, tip: 'Después de does el verbo va sin -s: Does he get up...?', tags: ['casa-granja'] },
  { id: 'dd-06', topic: 'do-does', prompt: 'Does a duck swim? — Yes, it ___.', options: ['does', 'do', 'is'], answer: 0, tip: 'Respuesta corta con it: Yes, it does.', tags: ['campo'] },
  { id: 'dd-07', topic: 'do-does', prompt: 'Do pigs fly? — No, they ___.', options: ["doesn't", "don't", "aren't"], answer: 1, tip: 'Respuesta corta con they: No, they don\'t.', tags: ['corral'] },
  { id: 'dd-08', topic: 'do-does', prompt: 'Where ___ the sheep sleep?', hint: '(todas las ovejas)', options: ['do', 'does', 'is'], answer: 0, tip: '"The sheep" aquí son varias ovejas (they): Where do...?', tags: ['granero'] },
  { id: 'dd-09', topic: 'do-does', prompt: 'What ___ Rosie do after school?', options: ['do', 'is', 'does'], answer: 2, tip: 'Rosie es "she": What does...?', tags: ['granero'] },
  { id: 'dd-10', topic: 'do-does', prompt: 'I ___ like milk. I prefer juice.', options: ["doesn't", "don't", 'no'], answer: 1, tip: 'Con I: don\'t + verbo.', tags: ['casa-granja'] },
  { id: 'dd-11', topic: 'do-does', prompt: "The cat doesn't ___ water.", options: ['likes', 'like', 'liking'], answer: 1, tip: 'Después de doesn\'t el verbo va sin -s: doesn\'t like.', tags: ['granero'] },
  { id: 'dd-12', topic: 'do-does', prompt: '___ your dog sleep in the house?', options: ['Do', 'Does', 'Is'], answer: 1, tip: '"Your dog" es "it": Does...?', tags: ['casa-granja'] },
  { id: 'dd-13', topic: 'do-does', prompt: 'We ___ work on Sundays.', options: ["don't", "doesn't", 'not'], answer: 0, tip: 'Con we: don\'t.', tags: ['casa-granja'] },
  { id: 'dd-14', topic: 'do-does', prompt: 'When ___ the cows go to the field?', options: ['does', 'do', 'are'], answer: 1, tip: '"The cows" son varias (they): When do...?', tags: ['campo'] },

  { id: 'ddf-01', topic: 'do-does', kind: 'fix', prompt: 'Do the cow eat grass?', options: ['Does the cow eat grass?', 'Does the cow eats grass?', 'Do the cow eats grass?'], answer: 0, tip: 'Con it (the cow): Does + verbo sin -s.', tags: ['corral'] },
  { id: 'ddf-02', topic: 'do-does', kind: 'fix', prompt: 'I doesn\'t eat pizza!', options: ["I don't eat pizza.", "I not eat pizza.", "I doesn't eats pizza."], answer: 0, tip: 'Con I: don\'t + verbo.', tags: ['corral'] },
  { id: 'ddf-03', topic: 'do-does', kind: 'fix', prompt: 'Does you ride horses?', options: ['Do you ride horses?', 'Do you rides horses?', 'Are you ride horses?'], answer: 0, tip: 'Con you: Do + verbo.', tags: ['campo'] },
  { id: 'ddf-04', topic: 'do-does', kind: 'fix', prompt: 'The horse don\'t run!', options: ["The horse doesn't run.", "The horse doesn't runs.", 'The horse not run.'], answer: 0, tip: 'Con it (the horse): doesn\'t + verbo sin -s.', tags: ['campo'] },
  { id: 'ddf-05', topic: 'do-does', kind: 'fix', prompt: 'Does the chickens give eggs?', options: ['Do the chickens give eggs?', 'Do the chickens gives eggs?', 'Does the chickens gives eggs?'], answer: 0, tip: '"The chickens" son varias (they): Do + verbo.', tags: ['corral'] },
  { id: 'ddf-06', topic: 'do-does', kind: 'fix', prompt: 'He not works on the farm!', options: ["He doesn't work on the farm.", "He don't work on the farm.", "He doesn't works on the farm."], answer: 0, tip: 'Negativo con he: doesn\'t + verbo sin -s.', tags: ['casa-granja'] },
  { id: 'ddf-07', topic: 'do-does', kind: 'fix', prompt: 'What do the farmer want?', options: ['What does the farmer want?', 'What does the farmer wants?', 'What the farmer wants?'], answer: 0, tip: 'Con he (the farmer): What does + verbo sin -s?', tags: ['casa-granja'] },
  { id: 'ddf-08', topic: 'do-does', kind: 'fix', prompt: 'Does it has wings?', options: ['Does it have wings?', 'Do it have wings?', 'Does it haves wings?'], answer: 0, tip: 'Después de does el verbo va en su forma base: have.', tags: ['granero'] },

  { id: 'ddo-01', topic: 'do-does', kind: 'order', prompt: '¿La vaca come pasto?', options: ['Does', 'the', 'cow', 'eat', 'grass?'], answer: 0, tip: 'Does + the cow + eat + grass?', tags: ['corral'] },
  { id: 'ddo-02', topic: 'do-does', kind: 'order', prompt: 'Los cerdos no vuelan.', options: ['Pigs', "don't", 'fly.'], answer: 0, tip: "Pigs + don't + fly.", tags: ['corral'] },
  { id: 'ddo-03', topic: 'do-does', kind: 'order', prompt: 'El caballo no come carne.', options: ['The', 'horse', "doesn't", 'eat', 'meat.'], answer: 0, tip: "The horse + doesn't + eat...", tags: ['campo'] },
  { id: 'ddo-04', topic: 'do-does', kind: 'order', prompt: '¿Te gustan los animales?', options: ['Do', 'you', 'like', 'animals?'], answer: 0, tip: 'Do + you + like...?', tags: ['granero'] },
  { id: 'ddo-05', topic: 'do-does', kind: 'order', prompt: '¿Dónde vive el granjero?', options: ['Where', 'does', 'the', 'farmer', 'live?'], answer: 0, tip: 'Where + does + the farmer + live?', tags: ['casa-granja'] },

  // ── Have / has con do / does (Bloque 4) ─────────────────
  { id: 'dd-15', topic: 'do-does', prompt: '___ the farmer have a tractor?', options: ['Do', 'Does', 'Has'], answer: 1, tip: '"The farmer" es "he": Does the farmer have...?', tags: ['casa-granja'] },
  { id: 'dd-16', topic: 'do-does', prompt: 'Do you have a horse? — No, I ___.', options: ["don't", "doesn't", 'am not'], answer: 0, tip: "Si la pregunta es con do, se responde con do: No, I don't.", tags: ['campo'] },
  { id: 'dd-17', topic: 'do-does', prompt: 'A chicken ___ have teeth.', options: ["don't", "doesn't", "isn't"], answer: 1, tip: "\"A chicken\" es \"it\": doesn't have.", tags: ['corral'] },
  { id: 'ddf-09', topic: 'do-does', kind: 'fix', prompt: 'Do she have a dog?', options: ['Does she has a dog?', 'Does she have a dog?', 'Do she has a dog?'], answer: 1, tip: 'Con she: Does + have (nunca "has" después de does).', tags: ['casa-granja'] },
  { id: 'ddf-10', topic: 'do-does', kind: 'fix', prompt: "The farmer doesn't has a car!", options: ["The farmer don't have a car.", "The farmer not has a car.", "The farmer doesn't have a car."], answer: 2, tip: "Después de doesn't va have, no has.", tags: ['campo'] },
  { id: 'ddo-06', topic: 'do-does', kind: 'order', prompt: '¿Tienes un perro?', options: ['Do', 'you', 'have', 'a', 'dog?'], answer: 0, tip: 'Do + you + have + ...?', tags: ['casa-granja'] },

  // ── Plurales (regulares e irregulares) ──────────────────
  { id: 'pl-01', topic: 'plurals', prompt: 'One sheep, two ___.', options: ['sheeps', 'sheep', 'sheepes'], answer: 1, tip: '"Sheep" no cambia en plural: one sheep, two sheep.', tags: ['corral'] },
  { id: 'pl-02', topic: 'plurals', prompt: 'One goose, three ___.', options: ['gooses', 'geese', 'goose'], answer: 1, tip: 'Plural irregular: goose → geese.', tags: ['campo'] },
  { id: 'pl-03', topic: 'plurals', prompt: 'There are five ___ in the barn.', options: ['mouses', 'mice', 'mousees'], answer: 1, tip: 'Plural irregular: mouse → mice.', tags: ['granero'] },
  { id: 'pl-04', topic: 'plurals', prompt: 'The farmer has got two ___.', options: ['childs', 'childrens', 'children'], answer: 2, tip: 'Plural irregular: child → children.', tags: ['casa-granja'] },
  { id: 'pl-05', topic: 'plurals', prompt: 'Look at the ___! They are on the tree.', options: ['leafs', 'leaves', 'leafes'], answer: 1, tip: 'Algunas palabras con -f cambian a -ves: leaf → leaves.', tags: ['campo'] },
  { id: 'pl-06', topic: 'plurals', prompt: 'The cows have got four ___ each.', options: ['foots', 'feet', 'feets'], answer: 1, tip: 'Plural irregular: foot → feet.', tags: ['corral'] },
  { id: 'pl-07', topic: 'plurals', prompt: 'There are three ___ in the field.', options: ['horses', 'horse', 'horsies'], answer: 0, tip: 'Plural normal: horse → horses (se agrega -s).', tags: ['campo'] },
  { id: 'pl-08', topic: 'plurals', prompt: 'Those ___ are very tall.', options: ['mans', 'men', 'mens'], answer: 1, tip: 'Plural irregular: man → men.', tags: ['campo'] },
  { id: 'pl-09', topic: 'plurals', prompt: 'My grandma has got ten ___.', options: ['tooths', 'teeth', 'teeths'], answer: 1, tip: 'Plural irregular: tooth → teeth.', tags: ['casa-granja'] },
  { id: 'pl-10', topic: 'plurals', prompt: 'The farmer has got two big ___.', options: ['boxs', 'boxes', 'boxies'], answer: 1, tip: 'Después de -x se agrega -es: box → boxes.', tags: ['granero'] },
  { id: 'pl-11', topic: 'plurals', prompt: 'The chickens give us a lot of ___.', options: ['eggs', 'egg', 'egges'], answer: 0, tip: 'Plural normal: egg → eggs.', tags: ['corral'] },
  { id: 'pl-12', topic: 'plurals', prompt: 'Three ___ are playing in the field.', options: ['womans', 'women', 'womens'], answer: 1, tip: 'Plural irregular: woman → women.', tags: ['campo'] },

  { id: 'plf-01', topic: 'plurals', kind: 'fix', prompt: 'Look at the sheeps!', options: ['Look at the sheep!', 'Look at the sheepes!', 'Look at the sheepies!'], answer: 0, tip: '"Sheep" es igual en singular y en plural.', tags: ['corral'] },
  { id: 'plf-02', topic: 'plurals', kind: 'fix', prompt: 'There are two gooses in the pond!', options: ['There are two geese in the pond.', 'There are two goose in the pond.', 'There is two geese in the pond.'], answer: 0, tip: 'goose → geese, y para varias cosas: there are.', tags: ['campo'] },
  { id: 'plf-03', topic: 'plurals', kind: 'fix', prompt: 'The mouses eat the cheese!', options: ['The mice eat the cheese.', 'The mices eat the cheese.', 'The mouse eat the cheese.'], answer: 0, tip: 'mouse → mice.', tags: ['granero'] },
  { id: 'plf-04', topic: 'plurals', kind: 'fix', prompt: 'The childs play with the dog!', options: ['The children play with the dog.', 'The childrens play with the dog.', 'The child play with the dog.'], answer: 0, tip: 'child → children (sin -s).', tags: ['casa-granja'] },
  { id: 'plf-05', topic: 'plurals', kind: 'fix', prompt: 'My foots are cold!', options: ['My feet are cold.', 'My feets are cold.', 'My foot are cold.'], answer: 0, tip: 'foot → feet.', tags: ['campo'] },
  { id: 'plf-06', topic: 'plurals', kind: 'fix', prompt: 'I have got two horse!', options: ['I have got two horses.', 'I have got two horsies.', 'I have got two horseses.'], answer: 0, tip: 'Dos o más: se agrega -s: horses.', tags: ['campo'] },

  { id: 'plo-01', topic: 'plurals', kind: 'order', prompt: 'Hay tres ovejas en el corral.', options: ['There', 'are', 'three', 'sheep', 'in', 'the', 'pen.'], answer: 0, tip: 'There are + three sheep (sheep no cambia).', tags: ['corral'] },
  { id: 'plo-02', topic: 'plurals', kind: 'order', prompt: 'Los ratones viven en el granero.', options: ['The', 'mice', 'live', 'in', 'the', 'barn.'], answer: 0, tip: 'The mice + live + in the barn.', tags: ['granero'] },
  { id: 'plo-03', topic: 'plurals', kind: 'order', prompt: 'Los niños tienen dos gansos.', options: ['The', 'children', 'have', 'got', 'two', 'geese.'], answer: 0, tip: 'The children + have got + two geese.', tags: ['campo'] },
  // Estaciones en la granja (presente simple)
  { id: 'fs-01', topic: 'present-simple', tags: ['campo'], prompt: "It's very cold, and the trees haven't got leaves. It's ___.", options: ['winter', 'summer', 'spring'], answer: 0, tip: 'Winter = invierno: hace frío.' },
  { id: 'fs-02', topic: 'present-simple', tags: ['campo'], prompt: 'Flowers grow and baby animals are born in ___.', options: ['spring', 'winter', 'autumn'], answer: 0, tip: 'Spring = primavera.' },
  { id: 'fs-03', topic: 'present-simple', tags: ['campo'], prompt: 'In ___, the leaves fall from the trees.', options: ['autumn', 'spring', 'summer'], answer: 0, tip: 'Autumn = otoño: las hojas caen.' },
  { id: 'fs-04', topic: 'present-simple', tags: ['campo'], prompt: "It's very hot in ___. The cows sleep under the trees.", options: ['summer', 'winter', 'autumn'], answer: 0, tip: 'Summer = verano: hace calor.' },
]
