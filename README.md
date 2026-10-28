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

Flujo completo: título → creación de personaje → intro (te roban la voz) → mapa → escuela → combates → jefe.

## Dónde está cada cosa

| Archivo | Qué contiene |
|---|---|
| `src/data/questions.ts` | Banco de preguntas (completar y corregir al enemigo) |
| `src/data/lessons.ts` | Lecciones paso a paso de Leo para cada tema |
| `docs/curriculo-a1.md` | Currículo A1: objetivos, gramática, vocabulario y funciones |
| `src/data/school.ts` | Mapa de la escuela, enemigos y atuendos |
| `src/data/friends.ts` | Amigos (Leo, Maya) y el interés especial, con sus charlas |
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

**Charlas de amigos.** En `friends.ts`, cada conversación tiene `requires`: el tema que hay que haber recuperado. Si el jugador no lo tiene, el amigo dice que aún no le entiendes y el menú de amigos indica qué recuperar. Las charlas con `lines: []` aparecen como "próximamente".

## Sistemas incluidos

- Selector de personaje (género, nombre, piel, cabello) y del interés especial (género, nombre, romántico o solo amistad). Las frases del narrador usan *he/she* según lo elegido.
- Lecciones paso a paso con Leo antes del primer combate de cada tema (la de *to be* va en la intro).
- Dos tipos de combate: completar la frase y corregir la frase con error que dice el enemigo.
- Llaves: cada esbirro vencido suelta una; con 3 se abre la sala de profesores.
- El jefe devuelve un tema ("fragmento de voz"), una pieza del reloj del tiempo y un atuendo.
- Si fallas, Leo te da la explicación. Si te quedas sin vida, vuelves a la entrada.
- Amistad por niveles con recompensas: Leo da una pista que elimina una opción; Maya da +1 de vida máxima.
- Objetos del mapa que muestran su nombre en inglés al chocar con ellos.
- Atuendos desbloqueables y guardado automático.

## Siguientes pasos sugeridos

- Más preguntas del verbo *to be* y el siguiente escenario (Ciudad, presente simple).
- Convertirlo en PWA para instalarlo en el celular.
- Sonidos y animación de caminar.
