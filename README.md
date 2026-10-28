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
| `src/data/friends.ts` | Amigos (Leo, Maya) y el interés especial: momentos de historia y charlas casuales |
| `src/data/activities.ts` | Repaso de vocabulario de la biblioteca |
| `src/data/schedule.ts` | Horario de clases por sesiones (pizarra → tiza → esbirro → pregunta extra) |
| `src/data/world.ts` | Nodos del mapa del mundo |
| `src/game/types.ts` | Tipos de datos del juego |
| `src/game/store.ts` | Estado y guardado automático (localStorage) |
| `src/game/social.ts` | Reglas de amistad: qué charla toca, límites por nivel, recompensas |
| `src/components/Tiles.tsx` | Dibujo de cada casilla y vocabulario de los objetos |
| `src/components/Sprite.tsx` | Personajes chibi |

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
- Requisitos del jefe (`BOSS_REQUIREMENTS` en `school.ts`): Grimm no pelea si no tienes el silbato del entrenador (repaso de deportes en el patio) y el uniforme (matrícula en la secretaría). Una barra de objetivos en el mapa muestra lo que falta.
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
- Instalable en el celular (PWA) y funciona sin internet después de abrirlo una vez. Al publicar cambios grandes, sube la versión de `CACHE` en `public/sw.js`.

## Siguientes pasos sugeridos

- Más preguntas del verbo *to be* y el siguiente escenario (Ciudad, presente simple).
- Sonidos y animación de caminar.
