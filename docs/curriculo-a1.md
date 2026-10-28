# Currículo A1 de English Combat

Guía de contenidos para el nivel A1 y mapa de dónde va cada cosa en el juego. Todo el contenido (preguntas, charlas, escenarios) debe salir de aquí.

Estado: ✅ ya está en el juego · 🟡 está a medias · ⬜ falta

## 1. Objetivos generales (lo que el jugador debe poder hacer al terminar A1)

- Presentarse y dar información personal básica.
- Hablar de su familia, casa, escuela y rutinas diarias.
- Entender y usar frases muy simples sobre necesidades inmediatas (comer, comprar, ubicarse).
- Preguntar y responder sobre cosas concretas (dónde vive, qué tiene, qué le gusta, cuánto cuesta, qué hora es).
- Interactuar de forma sencilla si el interlocutor habla despacio.

## 2. Cómo se reparte A1 en el mapa

A1 es demasiado grande para un solo escenario después de la escuela (la escuela cubre unos 10 de los 37 capítulos de un curso A1 completo). La propuesta es dividir el resto en dos escenarios, cada uno con su jefe y su pieza del reloj:

| Nodo | Escenario | Idea central | Gramática principal |
|---|---|---|---|
| 1 ✅ | **Escuela** | Quién soy y dónde estoy | to be, posesivos, preposiciones de lugar, imperativos |
| 2 ⬜ | **Barrio** (casa de Leo, parque) | Mi vida: familia, casa, rutina, gustos | presente simple afirmativo, have got, there is/are, like + -ing, can, frecuencia |
| 3 ⬜ | **Ciudad** (calles, café, tienda, relojería) | Moverme y resolver cosas | presente simple negativo y preguntas, some/any, how much/many, this/these, can I...? |
| 4 | Granja (pasado, A2) | — | was/were y pasado simple |
| 5 | Oficina (futuro, B1) | — | futuro |

Por qué este orden:
- El **barrio** va primero porque usa lo que ya se sabe (*to be*, posesivos, preposiciones) para hablar de cosas propias: *my mother is a nurse, my room is small, the bed is next to the window*. Solo agrega una cosa difícil: el presente simple afirmativo con la -s de *he/she* (*She works*).
- La **ciudad** va después porque necesita hacer preguntas en presente simple (*Do you have...? How much does it cost? Where is the bank?*) y manejar números grandes, precios y la hora.
- Con 5 nodos, el reloj del tiempo pasa a tener 5 piezas. El código ya lo calcula solo a partir de `WORLD` en `src/data/world.ts`.

## 3. Gramática A1: qué hay y dónde va cada punto

El orden de la tabla es el orden en que aparece en el juego.

| # | Punto gramatical | Ejemplo correcto | Error típico del enemigo | Dónde va | Estado |
|---|---|---|---|---|---|
| 1 | Saludos y presentarse | Nice to meet you. I'm from Colombia. | I have 15 years. | Escuela: Leo (presentación y entrenamiento) | ✅ |
| 2 | Verb to be (am/is/are, negativo, preguntas) | She is happy. Are you OK? | She are happy. | Escuela: Tom, Rick, Grimm | ✅ |
| 3 | Posesivos (my, your...) y 's | This is her book. Maya's bag. | This is she book. | Escuela: Bella, objetos perdidos | ✅ |
| 4 | Preposiciones de lugar | The book is under the desk. | The bag is next the chair. | Escuela: Ana (útiles) | ✅ |
| 5 | Imperativos | Open the door. Don't run! | No talk! / Opens the door. | Escuela: Coach Mike, Max | ✅ |
| 6 | Palabras de pregunta (who, what, where, when, how old) | Who is your teacher? What is this? | What is she? (para preguntar quién es) | Escuela (repaso en combates) y toda la ciudad | 🟡 salen en lecturas, sin preguntas propias |
| 7 | Pronombres posesivos y *whose* | Whose bag is this? — It's mine. | It's my. / Who's bag? | Escuela: objetos perdidos | 🟡 ya dice *It isn't mine*; falta *whose* |
| 8 | Artículos a / an / the | I have a cat. It's an apple. | I have cat. / a apple | Barrio: casa (objetos) y café | ⬜ |
| 9 | Plurales (regulares e irregulares) | two children, three boxes | two childs | Barrio: familia y parque | ⬜ |
| 10 | Have got / have | I have got two brothers. | I have got a brothers. | Barrio: casa de Leo (familia) | ⬜ |
| 11 | There is / there are | There is a sofa in the living room. | There have a sofa. | Barrio: casa de Leo (se repasa en las calles de la ciudad) | ⬜ |
| 12 | Present simple afirmativo | She goes to school every day. | She go to school. | Barrio: rutinas (familia de Leo, jefe) | ⬜ |
| 13 | Adverbios de frecuencia | I always get up at 7. | I get up always at 7. | Barrio: rutinas | ⬜ |
| 14 | Like / love / hate + sustantivo o -ing | I love reading. | I like eat pizza. | Barrio: parque (aficiones) | ⬜ |
| 15 | Can / can't (habilidad) | I can swim. Can you play guitar? | I can to swim. | Barrio: parque | ⬜ |
| 16 | Present continuous (lo que pasa ahora) | Ben is playing football. | Ben playing football. | Barrio: parque (describir lo que hace la gente) | ⬜ |
| 17 | Present simple negativo y preguntas | Do you have milk? He doesn't like coffee. | Does she lives here? | Ciudad: todos los esbirros y el jefe | ⬜ |
| 18 | This / that / these / those | These shoes are nice. | This shoes are nice. | Ciudad: tienda de ropa | ⬜ |
| 19 | Contables e incontables, some / any | Some water. Any apples? | A water. Some apple. | Ciudad: café | ⬜ |
| 20 | How much / how many | How much is it? How many apples? | How many money? | Ciudad: café y tienda | ⬜ |
| 21 | Can / could para pedir | Can I have a coffee, please? | I want coffee. (descortés) | Ciudad: café | ⬜ |
| 22 | Pronombres de objeto (me, him, her, us, them) | Call me. Give it to her. | Give it to she. | Ciudad: café (*Give me...*) y teléfono | ⬜ |
| 23 | Preposiciones de tiempo (at / on / in) | at 8 o'clock, on Monday, in May | in Monday | Ciudad: relojería (jefe) | ⬜ |
| 24 | Conectores and / but / or | I like tea but I don't like coffee. | — | Lecturas de toda la ciudad | ⬜ |

## 4. Vocabulario por temas y dónde va

| Tema | Palabras | Dónde va | Estado |
|---|---|---|---|
| Información personal | name, age, country, nationality, address, phone number, email | Escuela: presentación y secretaría | ✅ |
| Escuela y aula | teacher, student, classroom, book, pen, desk, board, bag | Escuela: biblioteca, Ana, pizarra | ✅ |
| Materias y horario | Maths, Science, History, P.E., days of the week, o'clock | Escuela: pizarra (sesiones) | ✅ |
| Deportes | football, ball, team, run, jump, win | Escuela: patio | ✅ |
| Útiles escolares | pencil, ruler, notebook, scissors | Escuela: Ana | ✅ |
| Alfabeto y deletrear | A–Z, How do you spell...? | Escuela: secretaría (deletrear el apellido) | ⬜ pendiente pequeño |
| Familia | mother, father, brother, sister, grandparents, son, daughter | Barrio: casa de Leo | ⬜ |
| Casa y muebles | kitchen, bedroom, bathroom, living room, bed, sofa, table | Barrio: casa de Leo (recorrido) | ⬜ |
| Rutinas diarias | get up, have breakfast, go to school, have lunch, go to bed | Barrio: rutinas | ⬜ |
| Partes del día | morning, afternoon, evening, night | Barrio: rutinas | ⬜ |
| Gustos y tiempo libre | play football, listen to music, watch films, read books | Barrio: parque | ⬜ |
| Animales y mascotas | dog, cat, bird, fish | Barrio: parque y mascota de Leo | ⬜ |
| Cuerpo | head, eyes, nose, arms, legs | Barrio: parque (*my leg hurts*) | ⬜ |
| Clima básico | sunny, rainy, hot, cold | Barrio: parque | ⬜ |
| Meses, fechas y ordinales | January…, first, second, my birthday is on... | Barrio: cumpleaños de Leo | ⬜ |
| Celebraciones e invitaciones | Happy birthday! Do you want to come? gift, party | Barrio: cumpleaños de Leo | ⬜ |
| Lugares de la ciudad | bank, supermarket, café, hospital, street, park | Ciudad: calles | ⬜ |
| Direcciones | go straight, turn left, near, far from, opposite | Ciudad: calles | ⬜ |
| Comida y bebida | breakfast, coffee, tea, bread, sandwich, apple | Ciudad: café | ⬜ |
| Números 13–100 y precios | fifteen, fifty, ten dollars, How much is it? | Ciudad: café y tienda | ⬜ |
| Ropa y colores | T-shirt, shoes, jacket, dress, red, blue | Ciudad: tienda de ropa | ⬜ |
| La hora completa | half past, quarter past, quarter to | Ciudad: relojería | ⬜ |
| Teléfono | Hello, it's..., Can I speak to...?, call me | Ciudad: llamada de la mamá de Leo | ⬜ |
| Profesiones | doctor, nurse, waiter, driver, shop assistant | Ciudad: cada esbirro tiene un oficio | ⬜ |
| Adjetivos básicos | big, small, happy, sad, new, old, hot, cold | Todas partes | 🟡 |

## 5. Funciones comunicativas y dónde va cada una

| Función | Dónde va | Estado |
|---|---|---|
| Saludar y despedirse | Escuela: Leo, Grimm, final | ✅ |
| Presentarse y presentar a otros | Escuela: presentación con Leo y final | ✅ |
| Dar y pedir información personal | Escuela: secretaría | ✅ |
| Decir dónde están las cosas | Escuela: Ana | ✅ |
| Dar y entender órdenes | Escuela: Coach Mike | ✅ |
| Preguntar de quién es algo | Escuela: objetos perdidos | 🟡 falta *whose* |
| Deletrear el nombre | Escuela: secretaría | ⬜ |
| Hablar de la familia | Barrio: casa de Leo | ⬜ |
| Describir la casa | Barrio: casa de Leo | ⬜ |
| Hablar de la rutina | Barrio: rutinas | ⬜ |
| Expresar gustos | Barrio: parque | ⬜ |
| Hablar de habilidades (can) | Barrio: parque | ⬜ |
| Invitar, aceptar y felicitar | Barrio: cumpleaños de Leo | ⬜ |
| Pedir disculpas y hablar con cortesía | Ciudad: calles (alguien choca contigo) y café | ⬜ |
| Pedir comida y bebida | Ciudad: café | ⬜ |
| Comprar y preguntar precios | Ciudad: tienda | ⬜ |
| Pedir y dar direcciones | Ciudad: calles | ⬜ |
| Preguntar y decir la hora | Ciudad: relojería | ⬜ |
| Hablar por teléfono | Ciudad: llamada | ⬜ |
| Describir personas | Barrio (familia) y Ciudad (encontrar a alguien) | ⬜ |

## 6. Plan detallado de los escenarios nuevos

Se sigue el mismo patrón que la escuela: esbirros que guardan llaves, personajes que enseñan con una actividad y un jefe con requisitos.

### Barrio (A1, nodo 2): la casa de Leo y el parque

Historia: Leo te invita a su casa. El desconocido pasó por el barrio y hechizó a la gente: nadie recuerda su rutina.

- **Casa de Leo** (personajes que enseñan, sin combate):
  - Recorrido por la casa con Leo: habitaciones, muebles, *there's a sofa in the living room* (repite preposiciones).
  - La familia de Leo: *This is my mother. I have got two sisters.* (have got, plurales, artículos).
  - Cumpleaños de Leo (final del barrio): invitación, meses y fechas (*My birthday is on May 3rd*), *Happy birthday!*
- **Parque** (esbirros):
  - Esbirro de aficiones: *like / love / hate + -ing* (*I like eat* ✗).
  - Esbirro de habilidades: *can / can't* (*I can to swim* ✗).
  - Esbirro que narra lo que pasa: present continuous (*Ben playing* ✗), clima y cuerpo.
- **Jefe:** alguien del barrio con la rutina hechizada que dice todo sin la -s (*She go to school*). Pelea de presente simple afirmativo y adverbios de frecuencia en 3 fases.

### Ciudad (A1, nodo 3): calles, café, tienda y relojería

Historia: el desconocido esconde la siguiente pieza del reloj en la relojería.

- **Calles** (actividad con mapa): pedir y dar direcciones, repaso de *there is / there are*, *near / far from / opposite*. Alguien choca contigo: *Sorry! — That's OK.*
- **Café** (actividad y esbirro):
  - Pedir con *Can I have..., please?*, *some / any*, contables e incontables.
  - La mesera pregunta tu nombre para el vaso: *How do you spell it?* (repaso del alfabeto).
  - Esbirro que pide mal (*I want a water* ✗) y confunde *how much / how many*.
- **Tienda de ropa** (esbirro): *this / that / these / those*, ropa, colores, números hasta 100 y precios.
- **Llamada de la mamá de Leo** (actividad): teléfono, pronombres de objeto (*Call me later. Tell him...*).
- **Jefe, el relojero:** la hora completa (*half past, quarter to*), preposiciones de tiempo (*at 8, on Monday, in May*) y preguntas y negativas del presente simple (*Does he...? He doesn't...*). Suelta la pieza del reloj.

## 7. Temas que se dejan para A2 (granja)

Algunos cursos (por ejemplo Busuu) los ponen al final de A1, pero en el juego van mejor como puente hacia el pasado:

- Pasado de *to be* (*was / were*): abre la granja, antes del pasado simple.
- Comparativos (*bigger than, more interesting*): granja (comparar animales y lugares).
- Planes con presente continuo (*I'm meeting Leo tomorrow*): oficina, junto al futuro.

## 8. Pendientes pequeños en la escuela

Cosas de A1 que caben en lo que ya existe, sin escenario nuevo:

1. Secretaría: la señora López pide deletrear el apellido (*How do you spell your surname?*). Alfabeto con audio.
2. Objetos perdidos: preguntar *Whose bag is this?* y responder *It's mine / It's hers*.
3. Preguntas propias con *who / what / where / when* en los combates (hoy solo aparecen en lecturas y charlas).

## 9. Material de referencia

- *Cuadernillo de Inglés Básico* (Telebachillerato de Veracruz, 2021): se usa solo como guía de temas y nivel. Su reproducción está prohibida y tiene algunos errores, así que no se copian sus ejercicios.
- Índice del curso A1 de Busuu (37 capítulos): se usó solo para revisar qué temas cubre un A1 completo. No se copian sus diálogos ni ejercicios.
- Listas de vocabulario de Cambridge (A1 Movers, A2 Key).
