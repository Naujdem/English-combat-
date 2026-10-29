# English Combat

Juego de rol por turnos para aprender inglés (A1 → B1). Un desconocido le roba la voz al protagonista y la esparce por distintas épocas; para recuperarla hay que vencer, con gramática, a quienes guardan sus palabras.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor local
npm run build    # versión para publicar (carpeta dist/)
```

Stack: React + Vite + TypeScript + Tailwind. Todos los gráficos son SVG dibujados en código, sin imágenes.

## Cómo está organizado el juego

Tres capas, una dentro de otra:

1. **Mapa de nodos** (`src/screens/World.tsx`): las épocas y escenarios. Cada nodo se desbloquea al recuperar un tema.
2. **Exploración en cuadrícula** (`src/screens/Explore.tsx`): vista desde arriba, el personaje camina casilla por casilla.
3. **Combate 2D** (`src/screens/Battle.tsx`): vista lateral, preguntas de opción múltiple.

Flujo completo: título → intro (te roban la voz) → Leo enseña *to be* → presentación con Leo (nombre, sexo, aspecto, edad, país, persona especial) → combate de entrenamiento con Leo → mapa → escuela → combates → jefe → final del capítulo (`src/screens/Epilogue.tsx`).

## Dónde está cada cosa

| Archivo | Qué contiene |
|---|---|
| `src/data/questions.ts` | Banco de preguntas (completar y corregir al enemigo) |
| `src/data/lessons.ts` | Lecciones paso a paso de Leo para cada tema |
| `docs/curriculo-a1.md` | Currículo A1: objetivos, gramática, vocabulario y funciones |
| `src/data/school.ts` | Mapa de la escuela, enemigos y atuendos |
| `src/data/city.ts` | Mapa de la ciudad, enemigos y requisitos del jefe |
| `src/data/barrio.ts` | Mapa de Green Street (barrio), enemigos y requisitos del jefe |
| `src/data/tasks.ts` | Tareas de personajes que no pelean (charla corta con elecciones y, si hace falta, lección de Leo antes) |
| `src/data/questions-barrio.ts` | Preguntas del barrio: presente simple, gustos, can, presente continuo, have got |
| `src/data/enemies.ts` | Junta los enemigos de todos los escenarios |
| `src/data/friends.ts` | Amigos (Leo, Maya) y el interés especial: momentos de historia y charlas casuales |
| `src/data/activities.ts` | Repaso de vocabulario de la biblioteca |
| `src/data/schedule.ts` | Horario de clases por sesiones (pizarra → tiza → esbirro → pregunta extra) |
| `src/data/world.ts` | Lugares del mapa (Escuela → Ciudad → Barrio → Granja → Oficina) y qué jefe abre cada uno |
| `src/game/types.ts` | Tipos de datos del juego |
| `src/game/store.ts` | Estado y guardado automático (localStorage) |
| `src/game/social.ts` | Reglas de amistad: qué charla toca, límites por nivel, recompensas |
| `src/components/Tiles.tsx` | Dibujo de cada casilla y vocabulario de los objetos |
| `src/components/Sprite.tsx` | Personajes chibi |

## Modo profesor

Para revisar el juego sin jugarlo entero: en la pantalla de inicio, toca 5 veces el título "English Combat" y escribe la clave (`grimm`; se cambia en `TEACHER_PIN`, `src/game/teacher.ts`). Aparece un botón "Profe" abajo, en todas las pantallas, con:

- Mostrar la respuesta correcta en los combates y botón "Ganar (profe)" para saltar combates.
- Saltar lecciones, vida 20, llenar vida, 2 escudos.
- Saltar a estados preparados: escuela lista para el jefe, escuela terminada, ciudad recién llegado, ciudad lista para el jefe, barrio recién llegado, barrio listo para el jefe y barrio terminado.
- Aparecer junto a cualquier personaje del escenario.

Queda guardado en el dispositivo aparte de la partida. Es una clave dentro del código, así que sirve para que los estudiantes no lo activen por accidente, no como seguridad.

## Agregar contenido

**Preguntas.** En `src/data/questions.ts`, copia una línea y cambia el texto. `answer` es la posición de la opción correcta empezando en 0. El `tip` es la explicación que da Leo cuando fallas.

```ts
{ id: 'be-25', topic: 'to-be', prompt: 'My mother ___ a nurse.', options: ['is', 'are', 'am'], answer: 0, tip: '"My mother" equivale a "she", así que va "is".' },
```

**Preguntas de "corregir al enemigo".** Con `kind: 'fix'`, el `prompt` es la frase con error que dice el enemigo y las opciones son frases completas:

```ts
{ id: 'bf-11', topic: 'to-be', kind: 'fix', prompt: 'He are tired!', options: ['He is tired.', 'He am tired.', 'Him is tired.'], answer: 0, tip: 'Con "he" va "is".' },
```

**Lecciones.** En `src/data/lessons.ts`, cada tema tiene pasos de Leo (`who: 'leo'`) y ejercicios en la pizarra (`who: 'board'`). La lección aparece sola la primera vez que el jugador se enfrenta a un enemigo con ese tema.

**Mapas.** Cada escenario es una tabla de letras. `#` pared, `.` piso, `D` pupitre, `W` ventana, etc. (la leyenda completa está arriba del mapa en `school.ts`). Para crear un escenario nuevo: copia `school.ts`, cambia la tabla y las entidades, regístralo en `SCENES` (`src/game/helpers.ts`) y pon su `sceneId` en `world.ts`.

**Ordenar palabras.** Con `kind: 'order'`, el `prompt` es la frase en español y `options` son las palabras en el orden correcto; el juego las desordena.

**Charlas de amigos.** En `friends.ts` no hay respuestas incorrectas: cada opción tiene una reacción (`reply`) y un `effect` (2 muy buena, 1 buena, 0 rara, -1 sin sentido: el amigo no te entiende y baja la amistad). Hay dos tipos:
- `conversations`: momentos de historia en orden. Cada uno pide puntos de amistad (`STORY_POINTS` en `social.ts`) y la gramática de `requires`. Los que tienen `lines: []` aún no están escritos.
- `casual`: charlas cortas y repetibles para subir la amistad entre momentos de historia.

**Preguntas por lugar.** Con `tags: ['aula']` (o `bano`, `cafeteria`, `sala`) una pregunta queda ligada a un lugar. Cada enemigo tiene sus `tags` y la mayoría de sus preguntas salen de ahí.

**Enemigos.** En `school.ts` cada enemigo tiene `before` (lo que dice antes del combate), `after` (al ser vencido) y `freed` (lo que dice si le hablas después, ya sin hechizo).

## Sistemas incluidos

- Presentación con Leo en inglés (`src/screens/Presentation.tsx`): el jugador escribe en la pizarra su nombre, dice si es chico o chica, elige su aspecto, su edad (*I am 15 years old*), su país y nacionalidad, y le cuenta a Leo si conoce a alguien especial (romántico, amistad o Leo le presenta a alguien). Las frases usan *he/she* según lo elegido.
- Primer combate: entrenamiento con Leo sobre saludos y presentación. Si pierdes, vuelves a intentarlo sin castigo.
- Lecciones paso a paso con Leo antes del primer combate de cada tema (la de *to be* va en la intro).
- Tipos de combate: completar la frase, corregir la frase con error que dice el enemigo, ordenar palabras, escuchar y escribir.
- Escribir (`write`): se generan solas. "Escribe la palabra que falta" sale de las preguntas de completar de *to be* y saludos (solo donde la respuesta es única), y "Escribe la oración en inglés" sale de las de ordenar (frase en español → oración en inglés). La revisión ignora mayúsculas y puntos y acepta contracciones (`src/game/text.ts`).
- Cada enemigo tiene historia antes y después del combate; al vencerlo se queda en el mapa como estudiante normal.
- Biblioteca: repaso de vocabulario que da un escudo de palabras (bloquea un error en combate).
- Horario de clases en la pizarra (`src/data/schedule.ts`), por sesiones: cada sesión es una lectura (materias, días, horas, profesores) con preguntas, y da una tiza. Cada esbirro pide su tiza para pelear (Tom → Maths, Rick → Science/English, Bella → Lunch/History, Max → P.E./Art/Music). Al vencerlo, hace una pregunta extra del horario (acertar da un escudo) y se abre la siguiente sesión. Tocar la pizarra cuando no hay sesión nueva muestra el horario descubierto. La última sesión da las gafas de lectura.
- Llaves: cada esbirro vencido (Tom, Rick, Bella y Max) suelta una; con 4 se abre la sala de profesores.
- Requisitos del jefe (`BOSS_REQUIREMENTS` en `school.ts`): Grimm no pelea si no tienes tus útiles escolares (Ana, en el aula), el silbato del entrenador (patio) y el uniforme (matrícula en la secretaría). Una barra de objetivos en el mapa muestra lo que falta.
- Preposiciones de lugar (`src/components/WhereIsIt.tsx`): Ana te ayuda a encontrar tus útiles, que el desconocido tiró por el aula. Unas rondas son de elegir la frase (*Where is your pencil? → It's on the desk*) y otras de tocar el objeto que Ana describe (*Your book is under the desk*). Practica in, on, under, next to, between e in front of. Antes, Leo da la lección.
- Imperativos (`src/components/CoachSays.tsx`): la primera vez, Coach Mike grita órdenes (*Run! Jump! Don't stop! Sit down!*) que hay que entender, y luego el jugador da órdenes en situaciones (*Pass me the ball! Don't run! Be careful!*). Después sigue el repaso de deportes y el silbato. Antes, Leo da la lección.
- Max pelea también con imperativos y la fase 3 de Grimm mezcla preposiciones, imperativos, to be y posesivos.
- Pistas en español (`hint` en las preguntas): las de preposiciones muestran "Pista: debajo de" cuando sin dibujo podría valer más de una.
- Al vencer a Grimm, él se despide ("Goodbye, my student. See you tomorrow!") y hay que responder con una despedida.
- Final del capítulo 1: Leo y la persona especial esperan a la salida. El protagonista habla por primera vez, presenta a sus amigos con "This is..." (si fue Leo quien presentó a esa persona, se la presentas a Maya), aparece el villano anunciando la ciudad y todos se despiden.
- El jefe devuelve un tema ("fragmento de voz"), una pieza del reloj del tiempo y un atuendo.
- Reloj del tiempo (`src/components/TimeClock.tsx`): tiene una pieza por cada escenario del mapa (`WORLD` en `world.ts`) y cada jefe suelta la suya. Se ve en el mapa (al tocarlo explica dónde está cada pieza), en la victoria contra el jefe (la pieza nueva aparece animada) y en el final del capítulo, donde Leo pregunta *"Where are the other pieces?"*.
- Si fallas, Leo te da la explicación. Si te quedas sin vida, vuelves a la entrada.
- Amistad por puntos, sin respuestas incorrectas: las respuestas sin sentido bajan la amistad. Recompensas: Leo da una pista en combate; Maya da +1 de vida máxima.
- Objetos del mapa que muestran su nombre en inglés al chocar con ellos.
- Atuendos desbloqueables y guardado automático.
- El Profesor Grimm pelea en 3 fases (to be → posesivos → mezcla con ordenar y escuchar), con diálogo entre fases (`phases` en `school.ts`).
- Secretaría (`src/components/Registration.tsx`): la señora López llena contigo la ficha de matrícula (nombre, edad, país, nacionalidad, dirección, teléfono y email). La dirección y el teléfono son inventados (papel de traslado), así no se pide información real. Practica números de teléfono escuchando y cómo se dice un email (at, dot). Da el uniforme escolar.
- Patio: césped, portería, árbol y banca. Coach Mike repasa palabras de deportes y la primera vez da su silbato. Max pelea con preguntas de deportes, da un pedazo de llave y regala la camiseta deportiva.
- Estudiantes de ambiente (`src/data/npcs.ts`): Ana en el aula, Mr. Brown en la biblioteca y Ben en el patio dicen una frase distinta cada vez que les hablas.
- Misión de objetos perdidos (`src/data/lostFound.ts`): Maya perdió su mochila y Leo su libro. Al encontrarlos hay que preguntar "Is this your...?" y la gente responde con posesivos ("No, it isn't mine. It's Maya's").
- Audio: botones para escuchar en inglés en diálogos, lecciones, combates, lecturas y vocabulario (voz del dispositivo, sin internet). Dos toques seguidos leen más lento.
- Combate de escucha: se oye una frase y hay que elegir la correcta. Se generan solas a partir de las preguntas de completar.
- Cuaderno de errores: las preguntas falladas se anotan, los enemigos las repiten más seguido y se pueden repasar en el cuaderno de Leo (acertar 3 da un escudo).
- Diario al final del capítulo (`src/components/Diary.tsx`, textos en `src/data/diary.ts`): la historia en pasado, presente, futuro (el plan del desconocido) y una mezcla, con preguntas. "Ver verbos" colorea cada tiempo. Al tocar una palabra se ve su traducción y se puede guardar en las fichas.
- Fichas tipo Anki (`src/components/Flashcards.tsx`, `src/game/cards.ts`): repaso espaciado con Otra vez / Difícil / Bien / Fácil y exportación a CSV (frente,reverso) para SimulaPro o Anki. Para agregar palabras al diccionario del diario, edita `DICT` en `diary.ts`.
- Estructura con colores (`src/components/Grammar.tsx`): el sujeto en azul, el verbo en verde y la palabra clave del tema en morado, como "Sujeto + am/is/are + ...". Aparece en los ejercicios de las lecciones de Leo, en la pista cuando fallas y en la práctica. La estructura de cada tema está en `patternFor`.
- Práctica con Leo (`src/components/Practice.tsx`): si pierdes contra un esbirro o jefe, Leo dice qué te costó y te propone 6 frases de ese tema (primero las que fallaste) sin perder vida, con las fichas de ordenar coloreadas.
- Hablar (`src/game/mic.ts`): esbirros y jefes piden decir frases en voz alta con el reconocimiento de voz del navegador (Chrome; necesita internet y permiso del micrófono). Se acepta si se reconoce al menos el 75% de las palabras en orden; hay 3 intentos y un botón para cambiar de pregunta sin castigo. Si el navegador no puede escuchar, estas preguntas no aparecen.
- Sonidos (`src/game/sfx.ts`): acierto, error, golpe, victoria, derrota y objetos, hechos con el sintetizador del navegador (sin archivos). Se apagan con "Sonido: sí/no" en el mapa.
- Mi progreso y Repasar (`src/components/Review.tsx`): aciertos por tema con barra y nivel (Sin practicar, Empezando, Practicando, Bien, Dominado), resumen del avance, y repaso fuera de la historia por tema: la estructura, la explicación de Leo y 8 ejercicios (primero armar frases, luego completar y corregir). Cada tema aparece solo después de que Leo da su lección en la historia (en modo profesor, todos).
- Diccionario al tocar (`src/components/Words.tsx`, palabras en `src/data/glossary.ts`): en las lecciones de Leo, los diálogos de enemigos y amigos, los mensajes del mapa, las lecturas de la pizarra y el final, cada palabra en inglés se puede tocar para ver su traducción y guardarla en las fichas. En las preguntas de combate no, para no regalar la respuesta. Para agregar palabras, edita `RAW` en `glossary.ts`.
- Palabras del capítulo: en el diario, todo el vocabulario del lugar por temas (aula, útiles, materias, días, deportes, preposiciones, órdenes, saludos) con audio y botón para guardar en fichas (`words` en `diary.ts`).
- Controles: flechas o joystick, a elección (botón "Usar joystick / Usar flechas" en la exploración; se recuerda en el dispositivo).
- Instalable en el celular (PWA) y funciona sin internet después de abrirlo una vez. Al publicar cambios grandes, sube la versión de `CACHE` en `public/sw.js`.

## La ciudad

- Se llega en autobús la primera vez (`src/components/BusRide.tsx`): comprar boletos (*To the city, please. Two tickets. Here you are.*).
- Main Street solo se cruza por la cebra.
- Oficial Rosa (`src/components/Directions.tsx`): mapa con *there is / there are* y direcciones (*Go straight, turn left, it's on your right*); se tocan los lugares en el mapa. Da el mapa de la ciudad.
- Lily en el café (`src/components/CafeOrder.tsx`): pedir con *Can I have..., please?*, *a/an*, *any*, preguntar el precio, sumar con el menú, deletrear tu nombre para el vaso y pedir el café del guía.
- Esbirros: Danny (calle, *there is/are*), Chloe (tienda, *this/these*, plurales y precios) y Víctor (café, *a/an, some/any*). Jefe: el señor Rossi, el guía, en 3 fases. Pide el mapa y su café. Suelta la pieza 2 del reloj y la gorra de turista.

- Ciudad, añadido después: pregunta extra al vencer a cada esbirro (da escudo, campo `bonus`), despedida del jefe (`farewell`), Mia en la plaza para practicar disculpas (*Sorry! — That's OK!*) y dar indicaciones, final del capítulo 2 (Leo vive en Green Street) y diario de la ciudad con sus palabras.
- Voz automática: las frases en inglés se leen solas al aparecer (`auto` en `SpeakButton`). Se apaga en Ajustes, en el mapa del mundo, junto con los sonidos.

## Siguientes pasos sugeridos

## El barrio (Green Street)

- Se llega en otro autobús desde el mapa del mundo (boleto de *three dollars*). El protagonista vive aquí, en 25 Park Street, al lado del parque.
- Casa de Leo: la señora García enseña la rutina de su familia (presente simple con -s y frecuencia) y da la invitación al cumpleaños.
- Casa de Maya: el señor Rojas, gustos con *like / love / hate + -ing*; regala una galleta que da un escudo.
- Parque: la fiesta de Leo. El abuelo Joe (pide la invitación) practica fechas y *Happy birthday!* y da la foto de tu familia. Hay un regalo misterioso firmado "L".
- Esbirros: Kevin (*can*), Olivia la reportera (presente continuo) y el señor Hill (gustos). Jefe: Nick, el hermano mayor, que habla sin la -s; antes del combate Leo enseña *have got*.
- Misión de la fiesta: el abuelo Joe pide el pastel, los globos y la radio; se consiguen preguntando *Have you got...?* (`src/components/PartyAsk.tsx`).
- Las tareas de personajes nuevos se definen como datos en `src/data/tasks.ts`, sin tocar la pantalla de exploración.
- Voces por personaje (`src/game/speech.ts`): mujeres con voz femenina, hombres con voz masculina y el desconocido grave y lento. Usa las voces en inglés del dispositivo; si solo hay una, cambia el tono.
- En PC (pantalla ancha con ratón) el mapa es grande con un panel al lado, no hay flechas en pantalla y se juega con el teclado.

## La granja

- Se llega en bicicleta (`BIKE_TO_FARM` en `src/components/BusRide.tsx`). Mapa y enemigos en `src/data/farm.ts`, preguntas en `src/data/questions-farm.ts`.
- Animales dibujados en `src/components/Animals.tsx`: esbirros animales (campo `animal` en el enemigo) y animales de adorno (entidad `animal`).
- Juegos: "Adivina el animal" con Rosie (`src/components/GuessAnimal.tsx`) y los corrales de la doctora Patel (`src/components/AnimalPens.tsx`). Se abren desde `src/data/tasks.ts` con el campo `activity`.

## La oficina (final de A1 en presente)

- Se llega en autobús (`BUS_TO_OFFICE`). Mapa y enemigos en `src/data/office.ts`, preguntas en `src/data/questions-office.ts`.
- La agenda de Sara (`src/components/Planner.tsx`): correos, días, relojes de agujas (`AnalogClock`) y *at / on / in*.
- El teléfono de Grace: tarea con charla en `src/data/tasks.ts`.
- Al vencer a la señora Clark el reloj queda con sus 5 piezas y termina A1 en presente.

## El pasado: la escuela de 1996

- Se abre al vencer a la señora Clark: el mapa muestra pestañas Presente / Pasado y el viaje `CLOCK_TO_1996` (`src/components/BusRide.tsx`).
- Mapa y enemigos en `src/data/schoolPast.ts`, preguntas de *was / were* en `src/data/questions-past.ts`.
- La lista de asistencia de la señora Higgins (`src/components/Attendance.tsx`). Greg resulta ser el señor Grimm de niño.
- Los jefes del pasado dan fragmentos de voz (no cuentan como piezas del reloj).

## Explicaciones y repaso de cierre de A1

- Las lecciones de Leo pueden llevar una tabla (`table` en `src/data/lessons.ts`): cada forma en su fila y con colores (`<sujeto>` azul, `[verbo]` verde, `{clave}` morado), en vez de listas con comas.
- Huecos de A1 cubiertos: *whose* y *mine / his / hers* en objetos perdidos, deletrear el nombre en la secretaría, palabras de pregunta y *and / but / or* (`src/data/questions-extra.ts`), y repasos de vocabulario: adjetivos opuestos (Ana), mascotas y clima (Lucy, después de la fiesta) y partes del cuerpo (Rosie, después de su juego).

- El plan completo está en `docs/curriculo-a1.md`: primera vuelta A1 en presente (Escuela → Ciudad → Barrio con la casa del protagonista → Granja → Oficina), y luego los mismos lugares en pasado y futuro, todavía en A1, con el reloj completo. A2 y B1 repiten el esquema presente → pasado → futuro.
- Pendientes pequeños de la escuela: deletrear en la secretaría, *whose* en objetos perdidos y preguntas con *who/what/where/when*.
- Sonidos y animación de caminar.
