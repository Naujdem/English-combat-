import { useState } from 'react'
import type { GameState } from '../game/types'
import { SpriteBody } from '../components/Sprite'
import { SpeakButton } from '../components/SpeakButton'
import { Tappable } from '../components/Words'
import { btn, btnGhost, btnPrimary, Panel } from '../components/ui'
import { FRIENDS, interestFriend } from '../data/friends'
import { heroLook } from '../game/helpers'
import { TimeClock } from '../components/TimeClock'
import { PRESENT_NODES } from '../data/world'
import { ENEMIES } from '../data/enemies'
import type { Voice } from '../game/speech'
import { NPCS } from '../data/npcs'
import { AnimalSprite } from '../components/Animals'

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

type Who = 'narrator' | 'leo' | 'maya' | 'interest' | 'villain' | 'hero' | 'nick' | 'mom' | 'rosie' | 'farmer' | 'clark' | 'greg' | 'principal' | 'tony' | 'bianca'
type Cast = 'leo' | 'maya' | 'interest' | 'nick' | 'mom' | 'rosie' | 'farmer' | 'clark' | 'greg' | 'principal' | 'tony' | 'bianca'
type Step = {
  who: Who
  text: string
  es?: string
  /** El jugador elige qué decir; solo una opción es correcta */
  choice?: { options: string[]; answer: number; tip: string }
  villain?: boolean
  /** Muestra el reloj del tiempo en la escena */
  clock?: boolean
  /** Quién más aparece en la escena */
  cast?: Cast[]
  /** Escena en casa del protagonista (si no, el fondo del capítulo) */
  home?: boolean
}

/**
 * Final del capítulo 1: al salir de la escuela, Leo y la persona especial esperan.
 * El protagonista habla por primera vez, presenta a sus amigos, aparece el villano
 * y todos se despiden. Practica "This is..." y las despedidas.
 */
function buildSteps(s: GameState, sceneId: string): Step[] {
  if (sceneId === 'city') return citySteps(s)
  if (sceneId === 'barrio') return barrioSteps(s)
  if (sceneId === 'farm') return farmSteps(s)
  if (sceneId === 'office') return officeSteps(s)
  if (sceneId === 'school-past') return schoolPastSteps(s)
  if (sceneId === 'city-past') return cityPastSteps(s)
  const name = s.hero.name
  const it = s.interest
  const iname = it.name
  const He = it.gender === 'female' ? 'She' : 'He'
  const romance = it.mode === 'romance'
  // Si Leo fue quien presentó a esta persona, el jugador se la presenta a Maya
  const other = it.viaLeo ? 'Maya' : 'Leo'
  const otherId = it.viaLeo ? 'maya' : 'leo'
  const cast: ('leo' | 'maya' | 'interest')[] = it.viaLeo ? ['leo', 'maya', 'interest'] : ['leo', 'interest']

  return [
    { who: 'narrator', text: `Sales de la sala de profesores. En la entrada de la escuela te esperan ${it.viaLeo ? 'Leo, Maya y ' + iname : 'Leo y ' + iname}.`, cast },
    { who: 'leo', text: `${name}! You did it! Mr. Grimm is OK now!`, es: `¡${name}! ¡Lo lograste! ¡El profesor Grimm ya está bien!`, cast },
    { who: 'narrator', text: 'Abres la boca para responder y... ¡por fin sale tu voz!', cast },
    {
      who: 'hero',
      text: '¿Qué le dices a Leo con tu nueva voz?',
      cast,
      choice: {
        options: ['Thank you, Leo! I can talk again!', 'Goodbye, Leo!', 'I is happy, Leo!'],
        answer: 0,
        tip: 'Leo te felicita, así que lo natural es agradecer: "Thank you!". Y recuerda: no es "I is", es "I am".',
      },
    },
    {
      who: otherId as Who,
      text: it.viaLeo ? "Ha ha! Your voice is back! ... And who is this? I don't know your friend." : 'Ha ha! Your voice is back! ... Wait, who is this?',
      es: it.viaLeo ? '¡Ja, ja! ¡Recuperaste la voz! ... ¿Y quién es? No conozco a tu amigo.' : '¡Ja, ja! ¡Recuperaste la voz! ... Espera, ¿quién es?',
      cast,
    },
    {
      who: 'hero',
      text: `Presenta a ${iname} y a ${other}.`,
      cast,
      choice: {
        options: [
          `${other}, this is ${iname}. ${iname}, this is my friend ${other}.`,
          `${other}, ${He.toLowerCase()} name ${iname}.`,
          `${other}, this are ${iname}.`,
        ],
        answer: 0,
        tip: `Para presentar a alguien se dice "This is...": ${other}, this is ${iname}.`,
      },
    },
    { who: 'interest', text: `Nice to meet you, ${other}!`, es: `¡Mucho gusto, ${other}!`, cast },
    { who: otherId as Who, text: `Nice to meet you too, ${iname}!`, es: `¡Mucho gusto también, ${iname}!`, cast },
    romance
      ? { who: 'interest', text: `${name}, your voice is beautiful. I am happy you can talk now.`, es: `${name}, tu voz es hermosa. Me alegra que ya puedas hablar.`, cast }
      : { who: 'interest', text: `${name}, you are very brave. I am happy you are my friend.`, es: `${name}, eres muy valiente. Me alegra que seas mi amigo.`, cast },
    { who: 'narrator', text: 'Leo se agacha a amarrarse los zapatos. Entonces, una voz ronca suena detrás de ti.', cast },
    { who: 'villain', text: 'Ha! So you have your school words back... and a piece of MY clock.', es: '¡Ja! Así que recuperaste tus palabras de la escuela... y una pieza de MI reloj.', villain: true, cast },
    { who: 'villain', text: 'Keep it... for now. There is another piece in the city, and I am going to find it first!', es: 'Quédatela... por ahora. Hay otra pieza en la ciudad, ¡y yo la voy a encontrar primero!', villain: true, cast },
    { who: 'narrator', text: 'Cuando Leo levanta la cabeza, el desconocido ya no está. Sacas la pieza del reloj que te dio Grimm.', cast, clock: true },
    { who: 'leo', text: 'Look! It is a piece of a clock. The clock has five pieces. Where are the other pieces?', es: '¡Mira! Es una pieza de un reloj. El reloj tiene cinco piezas. ¿Dónde están las otras piezas?', cast, clock: true },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      clock: true,
      choice: {
        options: ['They are in the city and in other times.', 'It are in the city.', 'They is in the city.'],
        answer: 0,
        tip: '"The other pieces" es plural, así que va "they are". "It are" y "they is" mezclan singular y plural.',
      },
    },
    { who: 'leo', text: "The city? We can go together! But now it's late. Goodbye, everyone! See you tomorrow!", es: '¿La ciudad? ¡Podemos ir juntos! Pero ya es tarde. ¡Adiós a todos! ¡Nos vemos mañana!', cast },
    {
      who: 'hero',
      text: '¿Cómo te despides de Leo?',
      cast,
      choice: {
        options: ['Bye, Leo! See you tomorrow!', 'Good morning, Leo!', 'Nice to meet you, Leo!'],
        answer: 0,
        tip: 'Para despedirse: "Bye", "Goodbye" o "See you tomorrow". "Nice to meet you" se dice cuando conoces a alguien.',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 1: La escuela. Recuperaste los saludos, el verbo to be, los posesivos, las preposiciones de lugar y los imperativos. Tu viaje continúa en la ciudad... Esa noche, en casa, escribes todo en tu diario.',
      cast,
    },
  ]
}

/**
 * Final del capítulo 2: al salir de la oficina de turismo. Repasa there is/are,
 * aparece el desconocido y Leo cuenta que vive en Green Street, el barrio.
 */
function citySteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: ('leo' | 'maya' | 'interest')[] = ['leo', 'interest']
  return [
    { who: 'narrator', text: `Sales de la oficina de turismo. Al lado de la fuente, Leo y ${iname} miran los peces.`, cast },
    { who: 'leo', text: `${name}! Is Mr. Rossi OK now?`, es: `¡${name}! ¿El señor Rossi ya está bien?`, cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      clock: true,
      choice: {
        options: ['Yes, he is. And look: another piece of the clock!', 'Yes, he are. Look at the clock!', "No, he isn't. He is a fish."],
        answer: 0,
        tip: 'Con "he" va "is": Yes, he is. Y muéstrales la pieza del reloj.',
      },
    },
    { who: 'interest', text: 'Wow! There are two pieces now. And there is a little light inside!', es: '¡Guau! Ahora hay dos piezas. ¡Y hay una lucecita adentro!', cast, clock: true },
    { who: 'narrator', text: 'Leo se acerca a la fuente para contar los peces. Entonces, una voz ronca suena a tu lado.', cast },
    { who: 'villain', text: 'Two pieces... You are fast. Very fast.', es: 'Dos piezas... Eres rápido. Muy rápido.', villain: true, cast },
    { who: 'villain', text: 'But the next piece is on Green Street. And this time, I am going to find it first!', es: 'Pero la siguiente pieza está en Green Street. ¡Y esta vez yo la voy a encontrar primero!', villain: true, cast },
    { who: 'narrator', text: 'Cuando Leo se da vuelta, el desconocido ya no está. Solo queda un poco de humo oscuro.', cast },
    { who: 'leo', text: 'Who was that? ... Wait. Green Street? My house is on Green Street!', es: '¿Quién era? ... Espera. ¿Green Street? ¡Mi casa está en Green Street!', cast },
    {
      who: 'hero',
      text: '¿Qué les propones?',
      cast,
      choice: {
        options: ["Let's go to Green Street tomorrow!", 'Go to Green Street yesterday!', 'Green Street are my house!'],
        answer: 0,
        tip: 'Para proponer algo se dice "Let\'s + verbo": Let\'s go! (¡Vamos!).',
      },
    },
    { who: 'interest', text: 'Can I come too?', es: '¿Puedo ir yo también?', cast },
    {
      who: 'hero',
      text: `¿Qué le respondes a ${iname}?`,
      cast,
      choice: {
        options: ['Yes, of course!', "No, I can't swim.", 'Yes, I am a bank.'],
        answer: 0,
        tip: '"Yes, of course!" significa "¡Sí, claro!". Las otras respuestas no tienen sentido aquí.',
      },
    },
    { who: 'leo', text: 'Great! Tomorrow we take the bus to Green Street. My family is very nice. See you tomorrow!', es: '¡Genial! Mañana tomamos el autobús a Green Street. Mi familia es muy amable. ¡Nos vemos mañana!', cast },
    {
      who: 'hero',
      text: '¿Cómo te despides?',
      cast,
      choice: {
        options: ['See you tomorrow, Leo!', 'Good morning, Leo!', 'Nice to meet you, Leo!'],
        answer: 0,
        tip: 'Para despedirse hasta mañana: "See you tomorrow!".',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 2: La ciudad. Recuperaste there is / there are, this / these, los precios y cómo pedir en un café. Tu viaje continúa en Green Street, el barrio de Leo... Esa noche, escribes en tu diario.',
      cast,
    },
  ]
}

/**
 * Final del capítulo 3: Nick vuelve a ser él mismo, la fiesta de Leo sigue en el parque.
 * Repasa presente simple, have got y can. El regalo misterioso de "L" y la voz ronca
 * que sabe el nombre de Leo.
 */
function barrioSteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'maya', 'interest']
  const withNick: Cast[] = ['nick', 'leo', 'interest']
  const family: Cast[] = ['nick', 'mom']
  const h = { home: true, cast: family }
  return [
    // En casa: llega mamá. Presentar la familia (have got), la casa (there is) y tu rutina (frecuencia)
    { who: 'narrator', text: 'Nick se sienta en el sofá. Entonces se abre la puerta: ¡mamá llega del trabajo!', ...h },
    { who: 'mom', text: "Hi, kids! I'm home! ... Nick, why are you on the floor? And why is the house so quiet?", es: '¡Hola, chicos! ¡Ya llegué! ... Nick, ¿por qué estás en el suelo? ¿Y por qué la casa está tan callada?', ...h },
    { who: 'nick', text: "Sorry, Mom. I don't remember this morning. But look: we have got a photo of the family!", es: 'Perdón, mamá. No recuerdo esta mañana. Pero mira: ¡tenemos una foto de la familia!', ...h },
    { who: 'mom', text: 'Oh, a photo from Grandpa Joe! Tell me about it.', es: '¡Oh, una foto del abuelo Joe! Cuéntame.', ...h },
    {
      who: 'hero',
      text: 'Describe tu familia en la foto.',
      ...h,
      choice: {
        options: ['This is our family. I have got one brother, Nick.', 'This is our family. I has got one brother, Nick.', 'This is our family. I have get one brother, Nick.'],
        answer: 0,
        tip: 'Con "I": have got. "Has got" es para he, she, it.',
      },
    },
    { who: 'mom', text: 'And Dad? He always cooks dinner, but today he works late. Has he got his glasses in the photo?', es: '¿Y papá? Siempre cocina la cena, pero hoy trabaja hasta tarde. ¿Tiene sus gafas en la foto?', ...h },
    {
      who: 'hero',
      text: '¿Qué le respondes? (Papá sí tiene gafas en la foto)',
      ...h,
      choice: {
        options: ['Yes, he have.', 'Yes, he has.', 'Yes, he is.'],
        answer: 1,
        tip: 'Respuesta corta de have got con he: Yes, he has.',
      },
    },
    { who: 'mom', text: "Ha ha! Now help me. I can't find my bag. Is there a bag on the sofa?", es: '¡Ja, ja! Ahora ayúdame. No encuentro mi bolso. ¿Hay un bolso en el sofá?', ...h },
    {
      who: 'hero',
      text: 'Tu bolso está en la cocina, al lado de la nevera. ¿Qué le dices?',
      ...h,
      choice: {
        options: ["No, there isn't. There is a bag in the kitchen, next to the fridge.", "No, there aren't. There are a bag in the kitchen.", "No, it isn't. It have a bag in the kitchen."],
        answer: 0,
        tip: 'Una cosa: there is / there isn\'t. Y di dónde está: in the kitchen, next to the fridge.',
      },
    },
    { who: 'mom', text: 'Thank you! And your bedroom? Is it clean?', es: '¡Gracias! ¿Y tu cuarto? ¿Está limpio?', ...h },
    {
      who: 'hero',
      text: 'En tu cuarto hay una cama y muchos libros en el piso. ¿Qué dices?',
      ...h,
      choice: {
        options: ['There is a bed and there is a lot of books on the floor.', 'There is a bed and there are a lot of books on the floor.', 'There are a bed and there are books on the floor.'],
        answer: 1,
        tip: 'Una cama: there is. Muchos libros: there are.',
      },
    },
    { who: 'mom', text: 'Books on the floor! OK... Tomorrow is a school day. What time do you get up?', es: '¡Libros en el piso! Bueno... Mañana hay clases. ¿A qué hora te levantas?', ...h },
    {
      who: 'hero',
      text: 'Siempre te levantas a las siete. ¿Qué respondes?',
      ...h,
      choice: {
        options: ['I get always up at seven.', 'Always I gets up at seven.', 'I always get up at seven.'],
        answer: 2,
        tip: 'La frecuencia va antes del verbo y con "I" el verbo va sin -s: I always get up.',
      },
    },
    { who: 'nick', text: 'And I never get up at seven. I usually get up at nine! Ha ha.', es: 'Y yo nunca me levanto a las siete. ¡Normalmente me levanto a las nueve! Ja, ja.', ...h },
    {
      who: 'hero',
      text: '¿Qué le dices a Nick?',
      ...h,
      choice: {
        options: ['You are always late, Nick!', 'You always are late, Nick!', 'You late always, Nick!'],
        answer: 0,
        tip: 'Con el verbo to be, la frecuencia va después: you are always late.',
      },
    },
    { who: 'mom', text: "Now go to Leo's party, both of you. Say happy birthday from me! Dinner is at eight.", es: 'Ahora vayan los dos a la fiesta de Leo. ¡Felicítenlo de mi parte! La cena es a las ocho.', ...h },
    { who: 'narrator', text: `Nick y tú salen de la casa. En el parque, la fiesta de Leo sigue: Leo, Maya y ${iname} los esperan al lado del pastel.`, cast: withNick },
    { who: 'leo', text: `${name}! Is that your brother? Is he OK now?`, es: `¡${name}! ¿Ese es tu hermano? ¿Ya está bien?`, cast: withNick },
    {
      who: 'hero',
      text: 'Presenta a Nick.',
      cast: withNick,
      choice: {
        options: ['Yes! Leo, this is my brother Nick. He likes playing basketball.', 'Yes! Leo, this is my brother Nick. He like play basketball.', 'Yes! Leo, these is my brother Nick.'],
        answer: 0,
        tip: 'This is + persona. Y con "he": likes + verbo con -ing.',
      },
    },
    { who: 'nick', text: "Hi, Leo! Happy birthday! Sorry... I don't remember this morning. My head hurts.", es: '¡Hola, Leo! ¡Feliz cumpleaños! Perdón... no recuerdo esta mañana. Me duele la cabeza.', cast: withNick },
    { who: 'maya', text: 'Look at the clock! There are three pieces now. And the light is brighter!', es: '¡Miren el reloj! Ahora hay tres piezas. ¡Y la luz brilla más!', cast, clock: true },
    { who: 'leo', text: 'Now, my gift! The gift from "L". Let\'s open it!', es: '¡Ahora, mi regalo! El regalo de "L". ¡Abrámoslo!', cast },
    { who: 'narrator', text: 'Dentro hay una tarjeta vieja. La letra es temblorosa. Leo la lee en voz alta.', cast },
    { who: 'leo', text: '"Happy birthday, Leo. Be brave. Use your voice." ... Use my voice? What does it mean?', es: '"Feliz cumpleaños, Leo. Sé valiente. Usa tu voz." ... ¿Usar mi voz? ¿Qué significa?', cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      choice: {
        options: ["I don't know. But you always help me, Leo.", "I doesn't know. But you always helps me.", "I don't know. But you help always me."],
        answer: 0,
        tip: 'Con "I" y "you" el verbo va sin -s, y always va antes del verbo: you always help.',
      },
    },
    { who: 'narrator', text: 'Leo se agacha a recoger el papel de regalo. Entonces, una voz ronca suena detrás del árbol.', cast },
    { who: 'villain', text: 'Happy birthday... Leo.', es: 'Feliz cumpleaños... Leo.', villain: true, cast },
    { who: 'villain', text: 'And you... three pieces. The next piece is at the farm. The animals are waiting for you.', es: 'Y tú... tres piezas. La siguiente pieza está en la granja. Los animales te están esperando.', villain: true, cast },
    { who: 'narrator', text: 'Leo levanta la cabeza. Detrás del árbol no hay nadie.', cast },
    { who: 'leo', text: 'Did you hear that? That voice... He knows my name! How?', es: '¿Oyeron eso? Esa voz... ¡Sabe mi nombre! ¿Cómo?', cast },
    { who: 'interest', text: 'He is going to the farm. We can take the old road tomorrow.', es: 'Va a la granja. Mañana podemos tomar el camino viejo.', cast },
    {
      who: 'hero',
      text: `¿Qué le respondes a ${iname}?`,
      cast,
      choice: {
        options: ['Yes! We can go together.', 'Yes! We can to go together.', 'Yes! We cans go together.'],
        answer: 0,
        tip: 'can + verbo, sin "to" y sin -s: we can go.',
      },
    },
    { who: 'nick', text: 'The farm? I have got a bike. You can take it. And be careful, OK?', es: '¿La granja? Tengo una bicicleta. Puedes llevártela. Y ten cuidado, ¿sí?', cast: withNick },
    {
      who: 'hero',
      text: '¿Cómo le respondes a Nick?',
      cast: withNick,
      choice: {
        options: ['Thank you, Nick! See you at home!', 'You are welcome, Nick!', 'Happy birthday, Nick!'],
        answer: 0,
        tip: 'Nick te presta su bicicleta: agradece con "Thank you!".',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 3: Green Street. Recuperaste el presente simple y las rutinas, los gustos con -ing, can, el presente continuo y have got. Tu viaje sigue en la granja... Esa noche, en tu propia casa, escribes en tu diario.',
      cast,
    },
  ]
}

/**
 * Final del capítulo 4: el granjero vuelve a ser él mismo. Repasa do / does y plurales.
 * El desconocido susurra algo que solo se entiende al final del juego.
 */
function farmSteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'interest', 'rosie']
  const withFarmer: Cast[] = ['farmer', 'rosie', 'leo']
  return [
    { who: 'narrator', text: `El señor Brown sale de su casa. Rosie corre a abrazarlo. Leo y ${iname} esperan al lado del corral.`, cast: withFarmer },
    { who: 'farmer', text: "Thank you, kids! My animals don't talk now. Listen: moo, baa, neigh... Perfect!", es: '¡Gracias, chicos! Mis animales ya no hablan. Escuchen: muu, bee, iiih... ¡Perfecto!', cast: withFarmer },
    { who: 'rosie', text: 'Grandpa, do you remember the morning? Do you remember the shiny metal?', es: 'Abuelo, ¿recuerdas la mañana? ¿Recuerdas el metal brillante?', cast: withFarmer },
    { who: 'farmer', text: "No, I don't. I only remember the man in the dark coat... and his strange, quiet voice.", es: 'No. Solo recuerdo al hombre del abrigo oscuro... y su voz extraña y bajita.', cast: withFarmer },
    {
      who: 'hero',
      text: 'Pregúntale a Rosie si el perro también hablaba.',
      cast,
      choice: {
        options: ['Does the dog talk too?', 'Do the dog talk too?', 'Does the dog talks too?'],
        answer: 0,
        tip: '"The dog" es "it": Does + verbo sin -s.',
      },
    },
    { who: 'rosie', text: "No, it doesn't! It only says woof. Ha ha! But the geese talk all day... and they say nothing.", es: '¡No! Solo dice guau. ¡Ja, ja! Pero los gansos hablan todo el día... y no dicen nada.', cast },
    { who: 'leo', text: 'How many pieces of the clock have we got now?', es: '¿Cuántas piezas del reloj tenemos ahora?', cast, clock: true },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      clock: true,
      choice: {
        options: ['We have got four pieces. Only one more!', 'We has got four pieces. Only one more!', 'We have got four piece. Only one more!'],
        answer: 0,
        tip: 'Con we: have got. Y cuatro piezas: pieces (con -s).',
      },
    },
    { who: 'narrator', text: 'Rosie se lleva a Leo a ver los conejos. Entonces, detrás de la cerca, una voz ronca te habla muy despacio.', cast: ['interest'] },
    { who: 'villain', text: 'You always run to help people... Good. But one day, you are going to stop. And you are going to be silent.', es: 'Siempre corres a ayudar a la gente... Bien. Pero un día te vas a detener. Y vas a quedarte callado.', villain: true, cast: ['interest'] },
    { who: 'villain', text: 'The last piece is in an office. Every office has got a phone... and a phone needs a voice.', es: 'La última pieza está en una oficina. Toda oficina tiene un teléfono... y un teléfono necesita una voz.', villain: true, cast: ['interest'] },
    { who: 'narrator', text: `Cuando ${iname} se da vuelta, solo queda la cerca y el viento. Leo vuelve corriendo con un conejo en los brazos.`, cast },
    { who: 'interest', text: `${name}, who was that? What does he mean: "one day you are going to be silent"?`, es: `${name}, ¿quién era? ¿Qué quiere decir con "un día vas a quedarte callado"?`, cast },
    {
      who: 'hero',
      text: `¿Qué le respondes a ${iname}?`,
      cast,
      choice: {
        options: ["I don't know. But I don't want to be silent again!", "I doesn't know. But I don't want silent again!", "I not know. But I want be silent!"],
        answer: 0,
        tip: "Con I: don't + verbo. I don't know (no sé).",
      },
    },
    { who: 'leo', text: 'An office... There are big offices next to the city. We can take the road tomorrow!', es: 'Una oficina... Hay oficinas grandes al lado de la ciudad. ¡Mañana podemos ir por la carretera!', cast },
    { who: 'farmer', text: 'Take some eggs for your families! The chickens give us a lot of eggs every day.', es: '¡Lleven huevos para sus familias! Las gallinas nos dan muchos huevos todos los días.', cast: withFarmer },
    {
      who: 'hero',
      text: '¿Cómo te despides del señor Brown?',
      cast: withFarmer,
      choice: {
        options: ['Thank you, Mr. Brown! Goodbye, Rosie!', 'You are welcome, Mr. Brown!', 'Good morning, Rosie!'],
        answer: 0,
        tip: 'Te regalan algo y te vas: "Thank you!" y "Goodbye!".',
      },
    },
    {
      who: 'narrator',
      text: 'Fin del capítulo 4: La granja. Recuperaste las preguntas y negativas con do / does y los plurales irregulares. Solo falta una pieza del reloj... Esa noche escribes en tu diario.',
      cast,
    },
  ]
}

/**
 * Final del capítulo 5 y de A1 en presente: el reloj queda completo y muestra otras épocas.
 * Leo decide viajar con el protagonista... y sin que nadie lo note, la luz se lleva a alguien más.
 */
function officeSteps(s: GameState): Step[] {
  const name = s.hero.name
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'interest']
  const withClark: Cast[] = ['clark', 'leo', 'interest']
  return [
    { who: 'narrator', text: 'La señora Clark abre las ventanas de su oficina. Todos los relojes del edificio marcan la misma hora por fin.', cast: withClark },
    { who: 'clark', text: "It's twelve o'clock. Lunch time! Could you stay for lunch? The café is on the first floor.", es: 'Son las doce. ¡Hora del almuerzo! ¿Podrían quedarse a almorzar? La cafetería está en el primer piso.', cast: withClark },
    {
      who: 'hero',
      text: '¿Qué le respondes con amabilidad?',
      cast: withClark,
      choice: {
        options: ["Sorry, we can't. But thank you!", "Sorry, we can't to. But thank you!", "No. We don't could."],
        answer: 0,
        tip: "Para decir que no con amabilidad: Sorry, we can't. But thank you!",
      },
    },
    { who: 'narrator', text: 'Sacas el reloj del tiempo y pones la última pieza. Encaja con un clic.', cast, clock: true },
    { who: 'leo', text: 'Five pieces! The clock is complete! ... Wait. Look at the hands. They are moving!', es: '¡Cinco piezas! ¡El reloj está completo! ... Espera. Mira las agujas. ¡Se están moviendo!', cast, clock: true },
    { who: 'narrator', text: 'Las agujas giran hacia atrás y luego hacia adelante. En el cristal aparecen imágenes: la escuela, pero vieja... y una ciudad con edificios que nunca has visto.', cast, clock: true },
    { who: 'interest', text: 'The school... but old! And that city... is it the future? There are more pieces in other times!', es: 'La escuela... ¡pero vieja! Y esa ciudad... ¿es el futuro? ¡Hay más piezas en otros tiempos!', cast, clock: true },
    {
      who: 'hero',
      text: `¿Qué le dices a ${iname}?`,
      cast,
      clock: true,
      choice: {
        options: ['Yes! My other words are in the past and in the future.', 'Yes! My other words is in the past and in the future.', 'Yes! My others words are in past and in future.'],
        answer: 0,
        tip: '"My other words" es plural: are. Y se dice "in the past" y "in the future".',
      },
    },
    { who: 'narrator', text: 'Leo va a buscar agua a la máquina del pasillo. Entonces, desde la puerta, una voz ronca habla muy bajito.', cast: ['interest'] },
    { who: 'villain', text: 'Five pieces... Thank you. You are doing my work for me.', es: 'Cinco piezas... Gracias. Estás haciendo mi trabajo por mí.', villain: true, cast: ['interest'] },
    { who: 'villain', text: 'Now the clock can travel. To the past... and to the future. Go. I am always behind you.', es: 'Ahora el reloj puede viajar. Al pasado... y al futuro. Ve. Siempre estoy detrás de ti.', villain: true, cast: ['interest'] },
    { who: 'narrator', text: 'Cuando Leo vuelve con el agua, en la puerta no hay nadie.', cast },
    { who: 'leo', text: `${name}, you look strange. Are you OK? ... The clock is very bright now. What do we do?`, es: `${name}, ¿te pasa algo? ¿Estás bien? ... El reloj brilla mucho ahora. ¿Qué hacemos?`, cast, clock: true },
    {
      who: 'hero',
      text: 'Pregúntale a Leo si quiere viajar contigo.',
      cast,
      clock: true,
      choice: {
        options: ['Could you come with me, Leo? I need your help.', 'Could you to come with me, Leo?', 'You come with I, Leo!'],
        answer: 0,
        tip: 'Con cortesía: Could you + verbo...? Y después de with: me.',
      },
    },
    { who: 'leo', text: 'Of course! You are my best friend. I always help you. Always.', es: '¡Claro! Eres mi mejor amigo. Siempre te ayudo. Siempre.', cast, clock: true },
    { who: 'narrator', text: `Leo, ${iname} y tú ponen la mano sobre el reloj. Una luz blanca lo llena todo. Nadie lo nota, pero detrás de ustedes, la luz también se lleva a alguien más.`, cast, clock: true },
    {
      who: 'narrator',
      text: 'Fin del capítulo 5: La oficina. Recuperaste la hora, at / on / in, los pronombres de objeto y cómo pedir con cortesía. ¡Terminaste A1 en presente! El reloj está completo... y el próximo viaje es al pasado.',
      cast,
    },
  ]
}

/**
 * Final de la escuela en 1996: el director vuelve a ser amable y Greg resulta ser el profesor Grimm de joven.
 * Primer fragmento de voz del pasado. El desconocido recuerda la escuela.
 */
function schoolPastSteps(s: GameState): Step[] {
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'interest']
  const withGrimms: Cast[] = ['principal', 'greg', 'leo']
  return [
    { who: 'narrator', text: 'El director abre la puerta de su oficina. Greg corre hacia él.', cast: withGrimms },
    { who: 'principal', text: 'Greg, my son... I was very angry today. I am sorry.', es: 'Greg, hijo... Hoy estaba muy enojado. Lo siento.', cast: withGrimms },
    { who: 'greg', text: "It's OK, Dad. These kids were very kind to me. They were my friends today.", es: 'No pasa nada, papá. Estos chicos fueron muy amables conmigo. Hoy fueron mis amigos.', cast: withGrimms },
    { who: 'principal', text: 'Thank you, children. Greg, say goodbye. Mr. Greg Grimm... ha ha, one day you are going to be a teacher!', es: 'Gracias, niños. Greg, despídete. El señor Greg Grimm... ja, ja, ¡un día vas a ser profesor!', cast: withGrimms },
    { who: 'leo', text: 'Wait... Greg GRIMM? Mr. Grimm, our teacher? He was a student here?', es: 'Espera... ¿Greg GRIMM? ¿El profesor Grimm, nuestro profesor? ¿Él era estudiante aquí?', cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      choice: {
        options: ['Yes! Mr. Grimm was a shy student, and his dad was the principal.', 'Yes! Mr. Grimm were a shy student, and his dad were the principal.', 'Yes! Mr. Grimm is a shy student yesterday.'],
        answer: 0,
        tip: 'Con he (Mr. Grimm, his dad): was.',
      },
    },
    { who: 'interest', text: 'He was so nervous! And now he is a strict teacher. People change...', es: '¡Estaba tan nervioso! Y ahora es un profesor estricto. La gente cambia...', cast },
    { who: 'narrator', text: 'Sientes algo cálido en la garganta: un fragmento de tu voz vuelve a ti. Ahora puedes hablar del pasado: I was, you were...', cast },
    { who: 'narrator', text: 'Leo va a tocar la campana del patio. Entonces, detrás de la pared de ladrillo, una voz ronca habla muy bajito.', cast: ['interest'] },
    { who: 'villain', text: 'This school... I remember it. It was small... and it was full of voices.', es: 'Esta escuela... La recuerdo. Era pequeña... y estaba llena de voces.', villain: true, cast: ['interest'] },
    { who: 'villain', text: 'Your next words are in the old city. The road was dirt, and the people were kind. Go.', es: 'Tus siguientes palabras están en la ciudad vieja. La carretera era de tierra, y la gente era amable. Ve.', villain: true, cast: ['interest'] },
    { who: 'narrator', text: `La campana suena: ¡DING, DONG! Cuando ${iname} mira detrás de la pared, no hay nadie.`, cast },
    {
      who: 'hero',
      text: `¿Qué le dices a ${iname}?`,
      cast,
      choice: {
        options: ['He was here! The stranger was here!', 'He were here! The stranger were here!', 'He is here yesterday!'],
        answer: 0,
        tip: 'Con he: was.',
      },
    },
    {
      who: 'narrator',
      text: 'Fin: La escuela de 1996. Recuperaste was / were y there was / there were. Ahora tu diario también se puede leer en pasado. Tu viaje por el pasado sigue en la ciudad vieja...',
      cast,
    },
  ]
}

/**
 * Final de la ciudad en 1996: la señora Rossi vuelve a ser amable y Tony resulta ser el guía Rossi de joven.
 * Segundo fragmento de voz. El desconocido estuvo en la cabina de teléfono y quiso llamar.
 */
function cityPastSteps(s: GameState): Step[] {
  const iname = s.interest.name
  const cast: Cast[] = ['leo', 'interest']
  const rossis: Cast[] = ['bianca', 'tony', 'leo']
  return [
    { who: 'narrator', text: 'La señora Rossi sale de su oficina. Tony llega corriendo con su bicicleta.', cast: rossis },
    { who: 'bianca', text: 'Tony, my boy... I shouted at you this morning. I am so sorry.', es: 'Tony, hijo... Esta mañana te grité. Lo siento mucho.', cast: rossis },
    { who: 'tony', text: "It's OK, Mom. These kids helped me. Look, I delivered all the bread!", es: 'No pasa nada, mamá. Estos chicos me ayudaron. ¡Mira, entregué todo el pan!', cast: rossis },
    { who: 'bianca', text: 'Thank you, children. Tony loves this city. He talks about every street, every shop... One day he wants to be a tourist guide!', es: 'Gracias, niños. Tony ama esta ciudad. Habla de cada calle, de cada tienda... ¡Un día quiere ser guía turístico!', cast: rossis },
    { who: 'leo', text: 'A tourist guide? Tony... ROSSI? Mr. Rossi, the guide in our city? He was a delivery boy here?', es: '¿Guía turístico? ¿Tony... ROSSI? ¿El señor Rossi, el guía de nuestra ciudad? ¿Él era repartidor aquí?', cast },
    {
      who: 'hero',
      text: '¿Qué le respondes a Leo?',
      cast,
      choice: {
        options: ['Yes! He delivered bread, and he walked everywhere.', 'Yes! He deliverred bread, and he walkd everywhere.', 'Yes! He deliver bread yesterday.'],
        answer: 0,
        tip: 'Pasado regular: deliver → delivered, walk → walked.',
      },
    },
    { who: 'interest', text: 'And look at his cap! Thirty years later, he has the same cap!', es: '¡Y mira su gorra! ¡Treinta años después tiene la misma gorra!', cast },
    { who: 'narrator', text: 'Sientes algo cálido en la garganta: otro fragmento de tu voz vuelve a ti. Ahora puedes contar lo que pasó: I walked, I played, I wanted...', cast },
    { who: 'narrator', text: 'Leo va a mirar el pozo. Junto a la cabina de teléfono, alguien cuelga el teléfono muy despacio.', cast: ['interest'] },
    { who: 'villain', text: 'I picked up this phone. I wanted to call... I wanted to shout... but there was no voice.', es: 'Levanté este teléfono. Quería llamar... quería gritar... pero no había voz.', villain: true, cast: ['interest'] },
    { who: 'villain', text: 'Your next words are in Green Street. They are building it now. The houses... are not there yet. Go.', es: 'Tus siguientes palabras están en Green Street. La están construyendo ahora. Las casas... todavía no están. Ve.', villain: true, cast: ['interest'] },
    { who: 'narrator', text: `Cuando Leo vuelve del pozo, la cabina está vacía. El teléfono todavía se balancea. ${iname} te mira, preocupado.`, cast },
    {
      who: 'hero',
      text: '¿Qué le cuentas a Leo?',
      cast,
      choice: {
        options: ['The stranger was here! He talked to me!', 'The stranger were here! He talk to me!', 'The stranger is here yesterday!'],
        answer: 0,
        tip: 'El desconocido (he): was. Y el verbo regular en pasado: talked.',
      },
    },
    { who: 'leo', text: 'He wanted to call someone? Who...? Come on, Green Street is my street. Let\'s go!', es: '¿Quería llamar a alguien? ¿A quién...? Vamos, Green Street es mi calle. ¡Vamos!', cast },
    {
      who: 'narrator',
      text: 'Fin: La ciudad de 1996. Recuperaste el pasado de los verbos regulares (-ed) y sus tres sonidos. Tu viaje por el pasado sigue en Green Street...',
      cast,
    },
  ]
}

export function Epilogue({ state, onDone }: { state: GameState; onDone: () => void }) {
  const city = state.sceneId === 'city'
  const barrio = state.sceneId === 'barrio'
  const farm = state.sceneId === 'farm'
  const office = state.sceneId === 'office'
  const schoolPast = state.sceneId === 'school-past'
  const cityPast = state.sceneId === 'city-past'
  const steps = buildSteps(state, state.sceneId)
  const [i, setI] = useState(0)
  const [hideEs, setHideEs] = useState(true)
  const [solved, setSolved] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const s = steps[i]
  const last = i === steps.length - 1
  const waiting = !!s.choice && !solved
  const interest = interestFriend(state.interest, state.hero.name)

  const names: Record<Who, string> = {
    narrator: '',
    leo: 'Leo',
    maya: 'Maya',
    interest: state.interest.name,
    villain: '???',
    hero: state.hero.name,
    nick: 'Nick',
    mom: 'Mom',
    rosie: 'Rosie',
    farmer: 'Mr. Brown',
    clark: 'Ms. Clark',
    greg: 'Greg',
    principal: 'Principal Grimm',
    tony: 'Tony',
    bianca: 'Mrs. Rossi',
  }

  const voices: Record<Who, Voice> = {
    narrator: 'neutral',
    hero: state.hero.gender === 'female' ? 'female' : 'male',
    leo: 'male',
    nick: 'male',
    mom: 'female',
    maya: 'female',
    interest: state.interest.gender === 'female' ? 'female' : 'male',
    villain: 'villain',
    rosie: 'female',
    farmer: 'male',
    clark: 'female',
    greg: 'male',
    principal: 'male',
    tony: 'male',
    bianca: 'female',
  }

  function next() {
    setSolved(false)
    setTip(null)
    if (last) onDone()
    else setI(i + 1)
  }

  const shown = s.cast ?? []
  const spots = shown.length === 3 ? [88, 150, 212] : [110, 190]

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-4 overflow-y-auto px-4 py-6">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">{cityPast ? 'Pasado · La ciudad de 1996' : schoolPast ? 'Pasado · La escuela de 1996' : office ? 'Capítulo 5 · Final de A1' : farm ? 'Capítulo 4 · Final' : barrio ? 'Capítulo 3 · Final' : city ? 'Capítulo 2 · Final' : 'Capítulo 1 · Final'}</p>
      <svg viewBox="0 0 320 200" className="w-full rounded-2xl border-2 border-line" role="img" aria-label={s.home ? 'Tu casa' : cityPast ? 'El mercado de la ciudad en 1996' : schoolPast ? 'La escuela de ladrillo en 1996' : office ? 'La oficina' : farm ? 'La granja' : barrio ? 'Fiesta en el parque de Green Street' : city ? 'Plaza de la ciudad' : 'Entrada de la escuela'}>
        {s.home ? (
          <g>
            <rect width="320" height="200" fill="#f1d9c0" />
            <rect y="140" width="320" height="60" fill="#b98c5a" />
            <rect x="24" y="30" width="56" height="50" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
            <rect x="122" y="26" width="64" height="46" rx="3" fill="#f4efe4" stroke="#7a5230" strokeWidth="4" />
            <circle cx="140" cy="44" r="7" fill={state.hero.look.skin} />
            <circle cx="158" cy="46" r="6" fill={state.hero.look.skin} />
            <circle cx="172" cy="48" r="5" fill={state.hero.look.skin} />
            <rect x="132" y="54" width="46" height="12" rx="3" fill="#3b6fb6" />
            <rect x="214" y="96" width="92" height="46" rx="8" fill="#b5523b" />
            <rect x="214" y="86" width="92" height="18" rx="6" fill="#c8664e" />
            <rect x="250" y="20" width="44" height="58" rx="2" fill="#e8eef2" stroke="#b8c4cc" strokeWidth="2" />
            <line x1="250" y1="40" x2="294" y2="40" stroke="#b8c4cc" strokeWidth="2" />
          </g>
        ) : cityPast ? (
          <g>
            <rect width="320" height="200" fill="#cfe6f2" />
            <rect x="14" y="40" width="96" height="96" fill="#a4553a" />
            <polygon points="8,42 62,12 116,42" fill="#6b3a2a" />
            <rect x="34" y="60" width="20" height="22" fill="#cfe4ec" />
            <rect x="70" y="60" width="20" height="22" fill="#cfe4ec" />
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={128 + k * 62} y="96" width="52" height="40" fill="#a8743f" />
                <path d={`M${122 + k * 62} 96 L${128 + k * 62} 78 H${180 + k * 62} L${186 + k * 62} 96 Z`} fill={k ? '#e0a526' : '#d64545'} />
              </g>
            ))}
            <rect x="272" y="62" width="30" height="74" rx="3" fill="#c0392b" />
            <rect x="277" y="74" width="20" height="30" fill="#d9eef8" />
            <rect y="136" width="320" height="64" fill="#b8946a" />
            <path d="M0 150 H320 M0 176 H320" stroke="#9c7a52" strokeWidth="2" strokeDasharray="12 9" />
          </g>
        ) : schoolPast ? (
          <g>
            <rect width="320" height="200" fill="#e9dcc0" />
            <rect x="40" y="40" width="200" height="90" fill="#a4553a" />
            <polygon points="30,42 140,10 250,42" fill="#6b3a2a" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => <line key={k} x1="40" y1={48 + k * 9} x2="240" y2={48 + k * 9} stroke="#7d3f2a" />)}
            <rect x="90" y="50" width="100" height="14" rx="2" fill="#f4efe4" />
            <text x="140" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2b241c" fontFamily={FONT}>GREENFIELD SCHOOL · 1996</text>
            <rect x="126" y="86" width="28" height="44" fill="#5a3a1a" />
            <rect y="130" width="320" height="70" fill="#c2a878" />
            <rect x="262" y="70" width="5" height="62" fill="#6b4423" />
            <rect x="296" y="70" width="5" height="62" fill="#6b4423" />
            <rect x="260" y="68" width="43" height="5" fill="#6b4423" />
            <path d="M272 98 q10 -24 20 0 z" fill="#c9a83a" stroke="#8a6210" strokeWidth="1.5" />
          </g>
        ) : office ? (
          <g>
            <rect width="320" height="200" fill="#e8ecf0" />
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <rect x={20 + k * 100} y="20" width="80" height="70" fill="#9fd3f0" stroke="#8d9aa3" strokeWidth="4" />
                <line x1={60 + k * 100} y1="20" x2={60 + k * 100} y2="90" stroke="#8d9aa3" strokeWidth="3" />
              </g>
            ))}
            <rect x="0" y="120" width="320" height="80" fill="#9aa6b2" />
            <rect x="200" y="108" width="110" height="18" rx="3" fill="#6b4423" />
            <rect x="240" y="92" width="22" height="16" rx="2" fill="#2d2d3a" />
          </g>
        ) : farm ? (
          <g>
            <rect width="320" height="200" fill="#bfe3f5" />
            <circle cx="40" cy="34" r="18" fill="#f6d36b" />
            <path d="M0 120 Q80 92 160 110 T320 100 V120 Z" fill="#7fae5a" />
            <rect x="200" y="50" width="90" height="70" fill="#b5523b" />
            <polygon points="192,52 245,18 298,52" fill="#8b3a2b" />
            <rect x="232" y="82" width="26" height="38" fill="#f4efe4" />
            <path d="M232 82 l26 38 M258 82 l-26 38" stroke="#b5523b" strokeWidth="3" />
            <rect y="120" width="320" height="80" fill="#9cc46e" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => <rect key={k} x={4 + k * 32} y="128" width="4" height="22" fill="#a8743f" />)}
            <rect x="0" y="133" width="320" height="3" fill="#a8743f" />
            <g transform="translate(150 96) scale(1.2)"><AnimalSprite kind="cow" /></g>
            <g transform="translate(110 104) scale(0.9)"><AnimalSprite kind="sheep" /></g>
            <g transform="translate(186 108) scale(0.8)"><AnimalSprite kind="goose" /></g>
          </g>
        ) : barrio ? (
          <g>
            <rect width="320" height="200" fill="#bfe3f5" />
            <circle cx="280" cy="34" r="18" fill="#f6d36b" />
            <rect x="20" y="44" width="80" height="76" fill="#f0d27a" />
            <polygon points="12,46 60,16 108,46" fill="#b5523b" />
            <rect x="50" y="84" width="20" height="36" fill="#7a5230" />
            <rect x="120" y="54" width="70" height="66" fill="#d6e0ee" />
            <polygon points="112,56 155,28 198,56" fill="#5b7a99" />
            <rect x="145" y="88" width="18" height="32" fill="#5b7a99" />
            <rect x="216" y="82" width="10" height="40" fill="#7a5230" />
            <circle cx="221" cy="72" r="26" fill="#3b8a3e" />
            <line x1="0" y1="22" x2="200" y2="30" stroke="#8d7c68" />
            {['#d64545', '#e0a526', '#3b9d5d', '#2f6fd0', '#d4537e', '#e0a526', '#3b9d5d'].map((c, k) => (
              <path key={k} d={`M${12 + k * 28} ${22.5 + k * 1.1} l10 0.4 l-5.5 9 z`} fill={c} />
            ))}
            <rect y="120" width="320" height="80" fill="#8fbf6a" />
            <rect x="230" y="126" width="76" height="8" rx="2" fill="#f4efe4" />
            <rect x="240" y="112" width="22" height="15" rx="2" fill="#e88aa8" />
            <rect x="250" y="106" width="2" height="7" fill="#e0a526" />
            <rect x="272" y="116" width="14" height="11" fill="#2f6fd0" />
            <rect x="234" y="134" width="4" height="20" fill="#8d7c68" />
            <rect x="298" y="134" width="4" height="20" fill="#8d7c68" />
          </g>
        ) : city ? (
          <g>
            <rect width="320" height="200" fill="#f0c48c" />
            <rect width="320" height="120" fill="#e5a37a" />
            <circle cx="40" cy="36" r="18" fill="#f6d36b" />
            <rect x="80" y="30" width="70" height="90" fill="#c98b4a" />
            <rect x="150" y="50" width="60" height="70" fill="#8a9bb0" />
            <rect x="210" y="24" width="90" height="96" fill="#2f5d50" />
            <rect x="222" y="34" width="66" height="16" rx="3" fill="#f4efe4" />
            <text x="255" y="46" textAnchor="middle" fontSize="8" fill="#2f5d50" fontFamily={FONT}>TOURIST OFFICE</text>
            {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={90 + c * 28} y={44 + r * 30} width="18" height="18" fill="#e8f2f8" />))}
            <rect y="120" width="320" height="80" fill="#d6d1c7" />
            <ellipse cx="160" cy="150" rx="46" ry="14" fill="#9aa3ad" />
            <ellipse cx="160" cy="147" rx="40" ry="10" fill="#7cc4e6" />
            <rect x="156" y="122" width="8" height="24" fill="#9aa3ad" />
            <circle cx="160" cy="120" r="6" fill="#7cc4e6" />
          </g>
        ) : (
          <g>
        <rect width="320" height="200" fill="#f2c79a" />
        <rect width="320" height="120" fill="#e9a77a" />
        <circle cx="270" cy="40" r="22" fill="#f6d36b" />
        <rect x="40" y="40" width="200" height="100" fill="#d8c8b0" />
        <polygon points="30,42 140,10 250,42" fill="#9c5a3c" />
        <rect x="88" y="22" width="104" height="16" rx="3" fill="#2f5d50" />
        <text x="140" y="34" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily={FONT}>GREENFIELD SCHOOL</text>
        <rect x="120" y="90" width="40" height="50" fill="#7a5230" />
        <rect x="55" y="60" width="30" height="28" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="3" />
        <rect x="195" y="60" width="30" height="28" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="3" />
        <rect y="140" width="320" height="60" fill="#8fbf6a" />
        <rect x="118" y="140" width="44" height="60" fill="#cdb79a" />
          </g>
        )}

        <g transform="translate(10 128) scale(2)">
          <SpriteBody look={heroLook(state)} />
        </g>
        {shown.map((who, k) => {
          const look =
            who === 'leo' ? FRIENDS.leo.look
            : who === 'maya' ? FRIENDS.maya.look
            : who === 'nick' ? { ...ENEMIES['barrio-boss'].look, skin: state.hero.look.skin, hair: state.hero.look.hair }
            : who === 'mom' ? { shirt: '#2f6fd0', hair: state.hero.look.hair, skin: state.hero.look.skin, gender: 'female' as const }
            : who === 'rosie' ? NPCS.rosie.look
            : who === 'farmer' ? ENEMIES['farm-boss'].look
            : who === 'clark' ? ENEMIES['office-boss'].look
            : who === 'greg' ? ENEMIES['school-past-m1'].look
            : who === 'principal' ? ENEMIES['school-past-boss'].look
            : who === 'tony' ? ENEMIES['city-past-m1'].look
            : who === 'bianca' ? ENEMIES['city-past-boss'].look
            : interest.look
          return (
            <g key={who} transform={`translate(${spots[k] + 64} 128) scale(-2 2)`}>
              <SpriteBody look={look} />
            </g>
          )
        })}
        {s.villain && (
          <g className="anim-appear">
            <path d="M282 196 L288 136 Q300 118 312 136 L318 196 Z" fill="#2d2440" />
            <ellipse cx="300" cy="143" rx="10" ry="11" fill="#15111f" />
            <circle cx="296" cy="143" r="1.8" fill="#e0a526" />
            <circle cx="304" cy="143" r="1.8" fill="#e0a526" />
          </g>
        )}
      </svg>
      {s.clock && (
        <div className="anim-pop -mt-2 flex items-center justify-center gap-3">
          <TimeClock pieces={Math.max(1, state.relics)} size={84} />
          <p className="text-sm text-paper/75">Reloj del tiempo: {Math.max(1, state.relics)} de {PRESENT_NODES.length} piezas</p>
        </div>
      )}

      <Panel>
        {names[s.who] && (
          <div className="flex items-center justify-between">
            <p className={`font-display text-lg ${s.who === 'villain' ? 'text-[#b9a3e8]' : 'text-gold'}`}>{names[s.who]}</p>
            {s.who !== 'hero' && <SpeakButton text={s.text} size="sm" auto voice={voices[s.who]} />}
          </div>
        )}
        <p key={i} className={`anim-fade-in text-[17px] leading-relaxed ${s.who === 'narrator' ? 'italic text-paper/85' : ''}`}>
          {s.who === 'hero' && solved ? `"${s.choice!.options[s.choice!.answer]}"` : s.who === 'narrator' || s.who === 'hero' ? s.text : <Tappable text={s.text} />}
        </p>
        {!hideEs && s.es && <p className="mt-1 text-sm text-paper/60">{s.es}</p>}

        {waiting && (
          <div className="mt-3 grid gap-2">
            {s.choice!.options.map((o, k) => (
              <button
                key={k}
                className={`${btn} text-left text-base`}
                onClick={() => (k === s.choice!.answer ? (setSolved(true), setTip(null)) : setTip(s.choice!.tip))}
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
        {s.choice && solved && (
          <div className="anim-fade-in mt-2 flex items-center gap-2">
            <p className="text-sm font-semibold text-hp">¡Muy bien!</p>
            <SpeakButton text={s.choice.options[s.choice.answer]} size="sm" />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          {s.es ? (
            <button className={btnGhost} onClick={() => setHideEs((v) => !v)}>{hideEs ? 'Traducir' : 'Ocultar'}</button>
          ) : <span />}
          {!waiting && (
            <button className={btnPrimary} onClick={next} autoFocus>
              {last ? 'Ir al mapa' : 'Siguiente'}
            </button>
          )}
        </div>
      </Panel>
    </div>
  )
}
