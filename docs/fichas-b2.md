# English Combat — Fichas B2

Documento de diseño, sin código. Complementa el "English Combat - Plan B2.md".
Cada ficha se aprueba antes de implementarse. Estado: **fichas 0 a 14 y Extras en borrador (todas escritas).** Final: **opción B** (Leo conserva la voz y G se desvanece; ver Plan B2, lugar 14).

---

## FICHA 0 — Lo común de B2

### 0.1 Paso de B1 a B2
- Al terminar B1 (después del examen), el menú permite elegir A1, A2, B1 o B2, igual que en los niveles anteriores.
- **Escena de apertura** (residencia de Lumen Bay, presente, la mañana después del jefe The Grudge):
  1. El protagonista escribe en su diario: "Who didn't I help? And when?"
  2. El núcleo del reloj muestra por primera vez una **barra de 6 segmentos vacíos**. Texto: "The core is waking up."
  3. Llega un mensaje de Manuel, el periodista de B1: le ofrece prácticas en *The Lumen Bay Herald* para investigar los apagones de voz. Así se abre el lugar 2.
  4. Leo llama para desayunar. Su voz se quiebra en una palabra y él cambia de tema. Así empieza el lugar 1.

### 0.2 Mapa de B2
- Funciona igual que los mapas de A2 y B1: 14 lugares numerados, sin códigos, en 3 partes, más Extras.
  - Parte 1 "Questions": lugares 1–4.
  - Parte 2 "Traces": lugares 5–8.
  - Parte 3 "Use Your Voice": lugares 9–14.
- **Franjas de color:** dorado para el presente y azul eléctrico para las Ventanas.
- Una Ventana se abre solo cuando se junta su par de fragmentos. En el mapa aparece como un nodo azul con un candado en forma de reloj.
- **Extras:** Fusion Night (después del lugar 4), Paws Debate (después del 8) y A Year Abroad (después del 12).

### 0.3 Ventanas (mecánica nueva)
- **Qué son:** el protagonista entra físicamente al futuro. No es un recuerdo como en B1.
- **Cómo se abren:**
  - Cuando se juntan dos fragmentos, se llena **un segmento** del núcleo.
  - Hay 6 Ventanas: los lugares 3, 6, 8, 10, 12 y 13.
  - El lugar 13 (The Fire) llena el último segmento, y el núcleo completo se usa en el 14.
- **Animación de entrada:**
  1. El reloj gira y el núcleo se ilumina en azul.
  2. Un destello.
  3. Un letrero con el año (por ejemplo, "2061").
- **Reglas dentro de una Ventana:**
  - **Nadie oye al protagonista.** Si intenta hablar, su texto sale como "…" en azul tenue. Recupera la voz en el futuro solo en el lugar 13.
  - **Nadie se fija en él:** la gente del futuro lo ve como a un desconocido más y no le presta atención. Solo reaccionan a sus notas y a los objetos que mueve. G tampoco lo reconoce.
  - Se comunica de tres formas:
    - escribiendo notas y mensajes (Text Only);
    - moviendo objetos (The Moving Stone escrito);
    - leyendo lo que hay en el lugar: carteles, pantallas y documentos.
  - Los NPC del futuro **sí tienen cara**, porque es el futuro real y no un recuerdo.
  - **Excepciones:** G y Leo adulto se ven siempre de espaldas, a contraluz o en sombra, y sus nombres suenan a estática ("▒▒▒") hasta el lugar 14.
  - El protagonista adulto (lugares 3 y 13) sí se ve, con el mismo sprite del protagonista pero más mayor (barba o lentes, según el género).
  - **Filtro:** el mismo de los recuerdos de B1, pero con tono azul en lugar de morado y sin bordes oscuros.
- **Al salir de una Ventana:**
  1. Fundido azul.
  2. El protagonista vuelve al presente, al último lugar donde estaba, ya sin dolor de garganta.
  3. Escribe una línea en su diario y el segmento del núcleo queda encendido.
  4. Se abre en el mapa el siguiente lugar del presente.
- **En la Mochila:** la pestaña "Recuerdos" pasa a llamarse **"Recuerdos y Ventanas"** y agrega las Ventanas ya visitadas.

### 0.4 Regla de los fragmentos en B2
- Los jefes del presente sueltan **dos fragmentos** que se unen (la animación de B1) y abren la siguiente Ventana.
- **Excepción:** el jefe del lugar 4 y el jefe ligero del lugar 1 sueltan **uno solo**, que espera en el reloj hasta juntarse con otro (regla de B1).
- **Qué abre cada lugar:**

| Lugar del presente | Abre |
|---|---|
| 2 | Ventana 3 |
| 1 + 4 (un fragmento cada uno) | Medio segmento; el par del lugar 5 lo completa y abre la Ventana 6 |
| 7 | Ventana 8 |
| 9 | Ventana 10 |
| 11 | Ventana 12 |
| — | Ventana 13: se abre sola al salir de la 12, porque el núcleo ya está casi lleno |

- **Las Ventanas no sueltan fragmentos.** Su recompensa es la despedida del jefe y las páginas del diario. Los atuendos solo se ganan en el presente, igual que en B1.
- **Mensaje la primera vez que se llena un segmento:** "The core remembers something… but this time, you can go there."

### 0.5 Quién enseña
- **En el presente:** la guía se turna entre Leo, Maya, la persona especial y Manuel. Manuel es el guía nuevo de B2: enseña en el periódico (lugares 2, 5 y 11).
- **En las Ventanas:** lo que el protagonista lee en el lugar:
  - documentos de los científicos (6), folletos de la empresa (8) y pantallas;
  - el **cuaderno de G**, que reaparece en las Ventanas 10 y 12, con letra a mano y tachones como en B1. Firma con la mancha de tinta.
  - No tiene voz: el audio lo lee la voz neutral, con un ícono de documento o de lápiz.
- **Orden de enseñanza:** igual que en A1–B1. Explicación guiada paso a paso, práctica y después combate. En las misiones con más gramática, cada tema se enseña en un momento distinto del recorrido.

### 0.6 Minijuego nuevo: Fact Check
- **Qué es:** una mesa de redacción del *Herald*. Llega una declaración original (en texto o en audio) y abajo un borrador de noticia que la reporta.
- **Cómo se juega:**
  1. El jugador decide si el borrador es **fiel** a lo que se dijo.
  2. Si no lo es, elige el verbo declarativo correcto y su patrón. Ejemplos:
     - "I didn't take the money" → *He **denied taking** the money* (no *He admitted…*).
     - "Don't go to the port at night" → *She **warned us not to go**…*
     - "You broke the lights!" → *He **accused** them **of breaking**…*
- **Rondas:** 6 por partida.
- **Victoria:** 5 de 6 aciertos.
- **Errores:** sin pérdida de vida. Al segundo error en una ronda, aparece una pista con la regla del verbo.
- **Construcción:** sobre Reporter de B1, que ya pasa frases a estilo indirecto. Se le agrega el paso de "fiel / no fiel".
- **Dónde se usa:** lugares 2, 5 y 11.

### 0.7 Minijuego nuevo: Unheard
- **Qué es:** dentro de una Ventana, lograr un objetivo **sin voz**.
- **Cómo se juega:** cada sala tiene una meta y el jugador elige entre dos acciones:
  - **Escribir una nota** que un NPC lee. Usa el campo de texto de The Moving Stone, con revisión por palabras clave y estructura. Ejemplo: "Leave the building now" o "Don't take the stairs."
  - **Escribir un comando** para mover un objeto. Ejemplo: "Pull the fire alarm" o "Push the door open."
- **Si la nota es incorrecta,** el NPC reacciona confundido: "Who left this? It doesn't make sense."
- **Errores:** al segundo, una pista en español; al tercero, la palabra con letras ocultas (regla de B1).
- **Victoria:** cumplir las metas de la sala (3 a 5).
- **Construcción:** combina Text Only con The Moving Stone escrito. No requiere un sistema nuevo de revisión.
- **Dónde se usa:** Ventanas 3, 6, 8 y 12. En el lugar 13 se invierte: el protagonista ya tiene voz y usa Call for Help en voz alta.

### 0.8 Contenidos y pruebas
- Los bancos de preguntas van en archivos separados por misión y siempre pasan por el validador y por LanguageTool.
- **Errores de los enemigos:** solo frases que estén mal en cualquier contexto.
- **Temas de repaso de B2** en la pantalla de progreso, en el orden del plan:
  - Present perfect simple y continuo (contraste avanzado); pasado perfecto continuo; verbo + *-ing/to* con cambio de significado; lenguaje inclusivo.
  - Verbos de sentidos y *as if*; modales en pasado (*could/should/needn't have*).
  - Verbos declarativos con patrón; pasiva de reporte (*it is said that*); causativo.
  - Alternativas a *if*; incontables y comparaciones precisas.
  - Relativas explicativas y orden de adjetivos; adjetivos graduables.
  - Contraste (*despite, whereas*); preposición + *-ing*, *it's worth*.
  - Futuro perfecto y *be about to*; *had better / it's time*.
  - Condicionales mixtos, *wish / if only*, *would rather*.
- **Diario de cada capítulo:**
  - Página del protagonista.
  - En las Ventanas 10 y 12, página del cuaderno de G.
  - Página mezclada.
- **Lecturas largas opcionales** después de los lugares 4, 8 y 12, como capítulos del Diario (sistema de B1).
- **Examen escrito de B2:** obligatorio después del jefe final. Se diseña en la ficha 14.

### 0.9 Phrasal verbs de B2
- **Acumulación:** cada misión suma de 3 a 4 al tema de repaso "Phrasal verbs", que se agrupa por partícula.
- **Partículas nuevas** (Murphy 142–145):
  - up/down: *come up with, let down, turn down*;
  - away/back: *give away, hold back, get back*.
- **Familia de get** (lugar 7): *get over, get through, get away with, get along*.
- **Los de la historia:**
  - *speak up* y *hold back* (lugares 3 y 13);
  - *stand up for* (14);
  - *look up to* (10);
  - *put up with* y *carry on* (repartidos).
- **The Moving Stone escrito** sigue aceptando las dos posiciones de los separables y rechazando "pick up it".

### 0.10 Reglas para todas las misiones
- Cada misión del presente tiene: guía, al menos un esbirro, jefe de 2 fases, cierre con fragmentos, diario, recompensa (atuendo o despedida) y monedas.
- Cada Ventana tiene: lectura que enseña, Unheard o un minijuego reutilizado, jefe de 2 fases, diario y despedida del jefe.
- **Amistad de B2:** se registra en los lugares 1, 4, 9 y 11. Los quintos momentos de amistad (Leo, Maya y la persona especial) van en el lugar 11.
- **Criterios de aceptación de cada misión:**
  - Se juega de principio a fin.
  - Abre lo siguiente en el mapa.
  - Las preguntas pasan por el validador y por LanguageTool.
  - El diario, las recompensas y la amistad quedan guardados.

### 0.11 Criterios de aceptación de lo común
- Se puede elegir B2 desde el menú, y la escena de apertura lleva al lugar 1.
- Existen, cada uno con una demo mínima:
  - el mapa de B2 con sus franjas;
  - la barra de 6 segmentos del núcleo;
  - la entrada y salida de una Ventana con su filtro azul;
  - la regla de "nadie te oye" ("…" en azul tenue);
  - Fact Check y Unheard;
  - la pestaña "Recuerdos y Ventanas".
- **Reutiliza:** el filtro y la estática de B1, Reporter, Text Only, The Moving Stone escrito y la animación de fragmentos.
- **Lo nuevo de verdad:** la barra del núcleo, el tono azul y los dos minijuegos.

---

## FICHA 1 — Catching Up (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** el café del puerto, la residencia y el refugio Lumen Paws (de paso).
- **Guía:** la persona especial.
- **Busuu:** 1 (novedades en la vida), 2 (reacciones y experiencias).
- **Murphy:** 10–12 (contraste avanzado entre present perfect simple y continuo), 51 (*So do I / Neither have I / I think so / I hope not*).

### Qué pasa
1. **Desayuno en el café del puerto.** Están el grupo y la persona especial. Leo pide un café y en "Good morning" se le quiebra la voz. Dice "Too much coffee", se ríe y cambia de tema. La persona especial lo nota, pero no dice nada.
2. **La persona especial explica paso a paso cómo ponerse al día:**
   - Preguntas clave: "What have you been up to?", "How's it going with…?", "It's been ages!"
   - Registro informal y frases cortas: "Been busy.", "Sounds great.", "Not much, you?"
3. **Ponerse al día con NPC de B1** (no hacen falta nombres nuevos):
   - **Marisol** en la residencia (con la gata Moscú).
   - **Jeison**, el vecino.
   - **Nayi** en Lumen Paws.
   - Cada uno cuenta qué ha estado haciendo. Así se presenta la gramática en contexto.
4. **Gramática a mitad del recorrido:** present perfect simple contra continuo, en nivel avanzado (Murphy 10–12):
   - **Actividad contra resultado:** "I've been painting the kitchen" frente a "I've painted two walls."
   - **Cantidad → simple:** "I've walked five dogs today."
   - **Evidencia visible → continuo:** "You're wet. Have you been running?"
   - *How long* + continuo frente a *how many* + simple.
5. **Reacciones** (Busuu 2), en la vuelta al café:
   - Expresiones: "No way!", "That's amazing!", "You must be thrilled!", "I bet.", "Fair enough."
   - Respuestas cortas con auxiliares (Murphy 51): "So do I.", "Neither have I.", "I think so.", "I hope not."
6. **Minijuego: Text Only, versión "Group Chat"** (reutilizado). El grupo del intercambio escribe novedades y el jugador elige la reacción natural y la respuesta corta correcta. No hay opciones absurdamente formales.
7. **Esbirros:** Awkward Silences (2), silencios incómodos corrompidos que cortan las conversaciones.
   - Error típico: "I've been read three books this month", "So I do" (por "So do I") y "Neither I have."
8. **Jefe ligero: Echo of the Grudge**, un resto de The Grudge de B1 que se forma en el muelle. Dos fases:
   - **Fase 1:** present perfect simple contra continuo. Error típico: "I've been finishing the report, here it is" y "How long are you living here?"
   - **Fase 2:** reacciones y respuestas cortas. Error típico: "So am I" como respuesta a "I love this café", y "I think not so."
9. **Cierre:** el eco suelta **un solo fragmento**, que espera en el reloj (ficha 0.4). Se enciende el borde del primer segmento, sin llenarlo. El protagonista anota: "Everyone has been moving on. And Leo has been hiding something."

### Vocabulario
- **Ponerse al día:** catch up, keep in touch, lose touch, be up to, run into, settle in.
- **Reacciones:** thrilled, gutted, relieved, no way, fair enough, I bet.
- **Phrasal verbs:** catch up, run into, keep up with, hang out.

### Amistad, diario, recompensas y banco de preguntas
- **Amistad:** charla con la persona especial sobre qué ha cambiado en cada uno desde que llegaron a Lumen Bay. No hay respuestas malas, y cada opción tiene su reacción.
- **Diario:** página del protagonista y página mezclada. No hay página de G.
- **Recompensas:**
  - Atuendo "sudadera del café del puerto".
  - Despedida del eco.
  - Monedas ligeras.
- **Banco de preguntas** (unas 30): contraste entre present perfect simple y continuo, *how long* / *how many*, preguntas para ponerse al día, reacciones, respuestas cortas con auxiliares, phrasal verbs, y escucha (Marisol, Jeison y Nayi contando novedades).

### Criterios de aceptación
- Se juega de principio a fin.
- El fragmento queda guardado en el reloj y se abre el lugar 2 en el mapa.
- Las preguntas pasan por el validador y por LanguageTool.
- La amistad con la persona especial queda registrada.

---

## FICHA 2 — The Herald (presente)

- **Época:** presente, Lumen Bay.
- **Lugar:** la redacción de *The Lumen Bay Herald*: recepción, sala de reuniones y mesa de redacción.
- **Guía:** Manuel.
- **Busuu:** 6 (reuniones de trabajo), 9 (entrevistas y competencias), 14 (lenguaje inclusivo y estereotipos; sin la parte de partes íntimas del cuerpo).
- **Murphy:** 16 (past perfect continuous), 55–58 (verbo + objeto + *to*; *-ing* o *to* con cambio de significado).
- **NPC nuevos** (nombres propuestos, se pueden cambiar):
  - **Amara Okafor**, la editora jefe.
  - **Viktor Novak**, el editor de mesa.
  - **Priya Raman**, otra practicante.

### Qué pasa
1. **Llegada al Herald.** Manuel recibe al protagonista y le explica paso a paso el past perfect continuous, para contar experiencia antes de la entrevista:
   - "I had been volunteering at Lumen Paws for months when I got the job."
   - Contraste con el past perfect simple: duración frente a resultado.
2. **Entrevista con Amara Okafor** (Busuu 9).
   - Competencias clave: reliable, adaptable, attention to detail, work under pressure.
   - Verbos para experiencias difíciles: cope with, deal with, overcome, struggle to.
   - **Minijuego: DebateTalk como entrevista** (reutilizado). Esta vez las preguntas son de B2: "Tell me about a time you had to deal with pressure."
3. **La guía de estilo** (Busuu 14). Priya le muestra al protagonista las reglas del periódico:
   - *they* en singular cuando no se sabe el género.
   - Palabras neutras: firefighter, chairperson, police officer.
   - Evitar estereotipos.
   - Esto conecta con el sistema de género del juego.
   - **Minijuego: The Fine Print, versión "Style Guide"** (reutilizado). Marcar qué frases cumplen la guía y cuáles no.
4. **Reunión editorial** (Busuu 6). Viktor la modera. Manuel explica paso a paso:
   - **Animar a otros a hablar:** "What do you think, Priya?", "Would you like to add anything?"
   - **Pedir aclaraciones:** "Could you run that by me again?", "What exactly do you mean by…?"
   - **Sugerir:** "How about…?", "It might be worth…"
5. **Gramática a mitad del recorrido** (Murphy 55–58), dentro de las tareas de la reunión:
   - **Verbo + objeto + *to*:** "She asked me to check the sources", "He wants us to finish today".
   - ***-ing* o *to* con cambio de significado:**
     - "Remember to check the date" (antes) frente a "I remember checking it" (recuerdo).
     - "He stopped to answer the phone" frente a "He stopped answering emails".
     - "Try calling her" (prueba) frente a "I tried to call her" (intento).
6. **Minijuego nuevo: Fact Check** (primera vez, versión fácil; ficha 0.6). Borradores sobre los apagones de voz en el puerto, solo con *say*, *tell* y *ask* + objeto + *to*. Por ejemplo, "Call the police" → *She told us to call the police*. Los verbos declarativos con patrón quedan para el lugar 5.
7. **Esbirros:** practicantes agotados corrompidos (2).
   - Error típico: "I had been work here for a year", "She suggested me to call him" y "I want that you check it."
8. **Jefe: The Deadline.** Es Viktor, corrompido por un fragmento: su cabeza es un reloj de pared que acelera. Dos fases:
   - **Fase 1:** past perfect continuous y lenguaje de entrevista. Error típico: "By the time I arrived, they had been finish the article."
   - **Fase 2:** verbo + objeto + *to*, cambio de significado y frases de reunión. Error típico: "He made me to rewrite it" y "Could you repeat me that?"
9. **Cierre:**
   - Viktor vuelve a la normalidad. The Deadline suelta **dos fragmentos** que se unen y **llenan el primer segmento del núcleo** (mensaje de la ficha 0.4).
   - Manuel le asigna al protagonista su primer tema: los apagones de voz del puerto. Esto prepara el lugar 5.
   - Se abre la Ventana 3.

### Vocabulario
- **Redacción:** editor, deadline, draft, source, headline, byline, scoop, fact-check.
- **Competencias:** reliable, adaptable, attention to detail, cope with, overcome, under pressure.
- **Reuniones:** agenda, minutes, chair, item, follow up, bring up.
- **Lenguaje inclusivo:** chairperson, firefighter, singular they, stereotype.
- **Phrasal verbs:** follow up, bring up, run by, come up with.

### Diario, recompensas y banco de preguntas
- **Diario:** página del protagonista sobre su primer día en el periódico, y página mezclada. No hay página de G.
- **Amistad:** ninguna. Esta misión presenta a los NPC nuevos.
- **Recompensas:**
  - Atuendo "credencial de prensa".
  - Despedida de The Deadline.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - past perfect continuous y su contraste con el simple;
  - verbo + objeto + *to*;
  - *-ing* o *to* con cambio de significado;
  - frases de reunión y de entrevista;
  - lenguaje inclusivo;
  - phrasal verbs;
  - escucha (la reunión moderada por Viktor).

### Criterios de aceptación
- Se juega de principio a fin.
- Se llena el primer segmento del núcleo y se abre la Ventana 3 en el mapa.
- Fact Check funciona en su versión fácil.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 3 — Frozen (Ventana, 2061)

- **Época:** Ventana, hacia 2061. Es la noche del incendio.
- **Lugar:** la escuela nocturna donde enseña Leo adulto: aula, pasillo y escaleras. Es el mismo edificio que el protagonista visita abandonado en el lugar 7.
- **Guía:** lo que hay en el lugar: la pizarra de la clase de Leo adulto, un cartel de bienestar y el cuaderno del protagonista adulto.
- **Busuu:** 10 (salud mental: abrirse, sentimientos complejos, varios tiempos verbales), 13 (el cuerpo: lesiones y verbos de sentidos).
- **Murphy:** 67 (*see/hear somebody do / doing*), 98 (adjetivos -ed / -ing), 118 (*like / as if*).
- **Tono:** la parálisis se trata con respeto, como una reacción humana común ante el miedo, sin diagnósticos y sin culpar. El juego nunca llama "cobarde" al protagonista.

### Qué pasa
1. **Entrada a la Ventana** (animación de la ficha 0.3). Letrero "2061". Es de noche en la escuela. El protagonista intenta saludar y su texto sale "…" en azul: nadie lo oye.
2. **El aula.** Leo adulto (de espaldas y con el nombre en estática) termina su clase de inglés. En la pizarra quedó la lección del día, que se lee paso a paso con la voz neutral:
   - **Verbos de percepción + objeto + forma base** (acción completa): "I heard someone scream."
   - **Verbos de percepción + objeto + *-ing*** (acción en curso): "I heard someone screaming."
   - ***like / as if*:** "You look as if you haven't slept", "It sounds like rain."
   - Es un guiño: el jugador aprende de una clase de Leo adulto sin saber que es él.
3. **El pasillo.** El protagonista adulto espera en la puerta del aula. Al lado hay un cartel de bienestar de la escuela: "How are you *really* feeling?". Se lee paso a paso:
   - Sentimientos complejos: overwhelmed, anxious, ashamed, numb, relieved.
   - Pares de adjetivo y sustantivo: anxious / anxiety, ashamed / shame, relieved / relief, guilty / guilt.
   - Adjetivos -ed / -ing (Murphy 98): "I'm exhausted" frente a "It's exhausting".
4. **El cuaderno del protagonista adulto,** olvidado en una banca. Es su propio diario del futuro y se lee con varios tiempos verbales (Busuu 10):
   - "I've been feeling tired lately."
   - "I used to speak up more."
   - "Sometimes I feel as if I'm always holding back."
   - Sirve para entender, no para culpar.
5. **Suena la alarma.** Humo en las escaleras, como en el recuerdo 1 de B1, pero ahora visto desde fuera.
6. **Minijuego nuevo: Unheard** (primera vez; ficha 0.7). El protagonista ayuda sin voz con comandos escritos. Tiene 3 metas:
   - "Prop the fire door open."
   - "Turn on the emergency lights."
   - Dejar una nota en la puerta del aula: "Use the back stairs."
   - Ayuda a otros, pero el incendio sigue: es un hecho fijo.
7. **La parálisis.** El protagonista ve a su yo adulto quieto en el pasillo. La narración usa lo que acaba de aprender:
   - "He could hear Leo shouting. He could feel the heat on his face. He watched people running past him… but he didn't move."
   - "He looked as if he were made of stone."
   - Una estudiante se tuerce el tobillo en las escaleras (Busuu 13: sprain an ankle, burn your hand, bruise, bleed).
8. **Esbirros:** Smoke Shadows (2), sombras del humo.
   - Error típico: "I saw him to run", "We heard her to call for help" y "I'm boring in this class" (por "bored").
9. **Jefe: Panic**, la parálisis hecha monstruo: una figura de escarcha que sujeta al protagonista adulto de los hombros. Dos fases:
   - **Fase 1:** verbos de sentidos y *like / as if*. Error típico: "I could smell the smoke to come" y "He looked as if he is a statue" (en una narración en pasado, se pide la forma correcta "as if he were / was").
   - **Fase 2:** sentimientos complejos, pares adjetivo-sustantivo y lesiones. Error típico: "I felt a lot of anxious" y "She sprained her ankle's."
   - Al vencerlo, Panic se deshace, pero la escena no cambia: el protagonista adulto sigue quieto. Esto prepara el lugar 13.
10. **Cierre:**
    - Llegan los bomberos y todos salen.
    - Afuera, el protagonista adulto mira el suelo. Leo adulto, en sombra, se lleva la mano a la garganta.
    - Fundido azul. El protagonista vuelve al presente.
    - Anota: "I saw myself freeze. It wasn't that I didn't care. I couldn't move."

### Vocabulario
- **Sentimientos:** overwhelmed, anxious / anxiety, ashamed / shame, guilty / guilt, numb, relieved / relief, frozen.
- **Sentidos:** hear, see, watch, feel, smell, notice + objeto.
- **Cuerpo y lesiones:** sprain, burn, bruise, bleed, twist, injury.
- **Phrasal verbs:** hold back, freeze up, calm down, speak up.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista: lo que vio.
  - Página mezclada.
  - No hay página de G (G aún no existe en esta escena).
- **Recompensas:** despedida de Panic. Las Ventanas no dan atuendos.
- **Banco de preguntas** (unas 30):
  - verbos de sentidos con forma base y con *-ing*;
  - *like / as if*;
  - adjetivos -ed / -ing;
  - sentimientos complejos y pares adjetivo-sustantivo;
  - lesiones;
  - phrasal verbs;
  - escucha (anuncios de evacuación de la escuela).

### Criterios de aceptación
- Se juega de principio a fin.
- Funcionan la entrada y la salida de la Ventana, el filtro azul y la regla de "nadie te oye".
- Unheard cumple sus 3 metas.
- Las preguntas pasan por el validador y por LanguageTool.
- Al salir, se abre el lugar 4 en el mapa.

---

## FICHA 4 — Fake Profile (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** la residencia, el banco (reutilizado de B1) y la redacción del Herald.
- **Guía:** Maya.
- **Busuu:** 4 (seguridad en internet: términos técnicos, deducción, amenazas, perfiles falsos, la *dark web*, privacidad y fraude en un pago).
- **Murphy:**
  - 27 (*could have*);
  - 30 (*may/might have*);
  - 32 (*needn't have* / *didn't need to*);
  - 33–34 (*should / shouldn't have*).
  - Repaso breve de *must have / can't have* de B1.

### Qué pasa
1. **El perfil "G".** Maya recibe una solicitud de amistad de una cuenta llamada **"G"**, con una foto robada del protagonista. El primer mensaje dice: "Ask your friend what he didn't do."
   - Ese perfil lo creó un fragmento corrompido que se metió en la red, no G en persona.
   - Maya explica paso a paso los términos técnicos: account, password, two-factor authentication, phishing, hacked, privacy settings.
2. **Maya explica la deducción en pasado, nivel B2:**
   - **Posibilidad:** "Someone might / may / could have stolen your photo."
   - **Crítica:** "You should have used a stronger password." / "You shouldn't have clicked that link."
   - ***needn't have* contra *didn't need to*:**
     - "You needn't have paid. It was free." (Lo hiciste, pero no hacía falta.)
     - "I didn't need to pay." (No hacía falta, y en general no lo hiciste.)
3. **Minijuego: Reconstruct (Detective),** reutilizado. Se analiza el perfil falso con pistas: la cuenta se creó ayer, la foto aparece en otra página, el texto tiene errores. Se deduce con modales: "It must have been created yesterday", "Someone could have copied the photo from the Herald".
4. **El fraude a Jeison.** El vecino perdió dinero con un pago falso a nombre de "G". El protagonista lo acompaña al banco, donde atiende **Ricardo**, el empleado de B1.
   - Se practica cómo expresar preocupación con educación (Busuu 4): "I'm concerned that…", "I'd like to report a payment I didn't make", "Could you look into it?"
   - Jeison dice: "I should have checked the account first."
5. **Lectura en el Herald** (Busuu 4). Priya comparte un artículo corto sobre la *dark web*. Así se presenta el **Echo Market**, un mercado oculto donde alguien anuncia "lost voices". Es un eco del mercado negro de B1. La pista lleva a los científicos del lugar 6, sin decirlo todavía.
6. **Esbirros:** Phishing Bots (2), bots corrompidos de mensajes falsos.
   - Error típico: "You should have check the link", "He must has deleted it" y "She needn't to have paid."
7. **Jefe: The Catfish**, el avatar corrompido del perfil, que cambia de cara en cada turno. Dos fases:
   - **Fase 1:** *could / might / should have*. Error típico: "You should of changed your password" (error real muy común) y "It might have be him."
   - **Fase 2:** *needn't have* contra *didn't need to*, y vocabulario de seguridad. Error típico: "I needn't have to pay" y "Turn on your two-factor password."
8. **Amistad con Leo.** Charla sobre la vida en internet y las cosas que la gente esconde. Cuando el protagonista menciona su voz, Leo cambia de tema. Si el jugador elige "You should have told me something", Leo contesta: "Maybe. Not yet." No hay respuestas malas.
9. **Cierre:**
   - The Catfish suelta **un fragmento**, que se une con el del lugar 1.
   - El segundo segmento del núcleo se enciende **a la mitad**. Se completa con el par del lugar 5 y entonces se abre la Ventana 6 (ver ficha 0.4).
   - El perfil "G" desaparece. El protagonista anota: "Someone wants me to remember. But who?"
   - Se abren el lugar 5 y el Extra Fusion Night.

### Lectura larga opcional (capítulo del Diario)
- "Inside the Echo Market": artículo de Priya para el Herald, de unas 250 palabras, con 5 preguntas.

### Vocabulario
- **Seguridad:** password, two-factor authentication, phishing, scam, hacked, privacy settings, fake profile, data.
- **Fraude:** report, refund, unauthorised payment, look into, suspicious.
- **Phrasal verbs:** log in, hack into, take down, give away (datos personales).

### Diario, recompensas y banco de preguntas
- **Diario:** página del protagonista y página mezclada.
- **Recompensas:**
  - Atuendo "hoodie de hacker".
  - Despedida de The Catfish.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - modales en pasado (*could / might / may / should / shouldn't have*);
  - *needn't have* contra *didn't need to*;
  - repaso de *must / can't have*;
  - vocabulario de seguridad y fraude;
  - phrasal verbs;
  - escucha (Ricardo en el banco).

### Criterios de aceptación
- Se juega de principio a fin.
- El fragmento se une con el del lugar 1 y el segundo segmento queda a la mitad.
- Se abren el lugar 5 y el Extra Fusion Night.
- La amistad con Leo queda registrada.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 5 — Voice Blackouts (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** el puerto de noche, el muelle de pescadores y la redacción del Herald.
- **Guía:** Manuel.
- **Busuu:** 19 (medios de comunicación y noticias: reported speech, prensa sensacionalista, verbos declarativos, rumores).
- **Murphy:** 55 (verbo + objeto + *to*), 62 (verbo + preposición + *-ing*). Repaso de 47–48.
- **NPC nuevos** (nombres propuestos, se pueden cambiar):
  - **Tomás Quispe**, un pescador.
  - **Captain Ingrid Halvorsen**, capitana del ferry.
  - **Zoe Park**, bloguera de chismes.

### Qué pasa
1. **El puerto de noche.** Manuel y el protagonista investigan los apagones: hay gente que pierde la voz unos minutos sin explicación.
2. **Llegada: Manuel explica los verbos declarativos, grupos 1 y 2:**
   - **Verbo + *to*:** agree, refuse, promise, threaten, offer, claim. "Don't worry, I'll help" → *He promised to help.*
   - **Verbo + objeto + *to*** (Murphy 55): warn, advise, persuade, remind, urge. "Don't sail after midnight" → *She warned us not to sail…*
3. **Testigos** (escucha). Tomás dice: "I didn't make it up! I couldn't speak for ten minutes." La capitana Halvorsen dice: "Keep away from the north pier."
4. **A mitad del recorrido: grupos 3 y 4:**
   - **Verbo + *-ing*:** deny, admit, suggest, recommend. "I didn't make it up" → *He denied making it up.*
   - **Verbo + preposición + *-ing*** (Murphy 62): accuse someone of, blame someone for, apologise for, insist on. "You broke the lights!" → *She accused them of breaking…*
   - **Verbo + *that*:** explain, insist, claim, admit.
5. **Minijuego: Fact Check**, versión completa con 6 rondas (ficha 0.6). Borradores de noticia con las declaraciones de los testigos. El jugador decide si el verbo es fiel y lo corrige.
6. **El blog de Zoe Park** (Busuu 19). Sus titulares sensacionalistas, como "GHOST STEALS VOICES AT PORT!", se comparan con la noticia real del Herald.
   - Vocabulario de prensa: tabloid, gossip, rumour, allegedly, exclusive, sources claim.
7. **Esbirros:** Rumour Gulls (2), gaviotas corrompidas que repiten rumores.
   - Error típico: "He denied to take it", "She suggested us to leave" y "They accused him for stealing."
8. **Jefe: The Tabloid.** Es el blog de Zoe, corrompido: un periódico gigante con titulares que parpadean. Dos fases:
   - **Fase 1:** verbo + *to* y verbo + objeto + *to*. Error típico: "He refused helping us" y "She warned us to not go."
   - **Fase 2:** verbo + *-ing* y verbo + preposición + *-ing*. Error típico: "She insisted to pay", "He admitted to steal it" y "I apologise for be late."
9. **Cierre:**
   - Zoe vuelve a la normalidad: "I apologise for exaggerating."
   - The Tabloid suelta **dos fragmentos**. Con ellos se completa el segundo segmento del núcleo y se abre la Ventana 6.
   - **Pista:** en el agua del muelle norte flota una placa de metal con el logo **"VOCALIS"**. Manuel le dice al protagonista: "Find out who Vocalis is."
   - Vocalis es la empresa de los científicos de las Ventanas 6 y 8.

### Vocabulario
- **Prensa:** tabloid, broadsheet, headline, gossip, rumour, allegedly, exclusive, eyewitness, sources.
- **Verbos declarativos:** agree, refuse, promise, threaten, claim, warn, advise, persuade, remind, urge, deny, admit, suggest, recommend, accuse of, blame for, apologise for, insist on.
- **Phrasal verbs:** make up (inventar), turn out, look into, play down.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista escrita como una nota de prensa (reported speech).
  - Página mezclada.
- **Amistad:** ninguna.
- **Recompensas:**
  - Atuendo "chaqueta de pescador" (de Tomás).
  - Despedida de The Tabloid.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - los cuatro grupos de verbos declarativos;
  - repaso de los cambios de tiempo del reported speech de B1;
  - prensa sensacionalista contra prensa seria;
  - phrasal verbs;
  - escucha (testigos y anuncios del puerto).

### Criterios de aceptación
- Se juega de principio a fin.
- Fact Check funciona en su versión completa.
- Se completa el segundo segmento y se abre la Ventana 6.
- La palabra "Vocalis" queda registrada en el diario como pista.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 6 — The Lab (Ventana, 2062)

- **Época:** Ventana, hacia 2062, un año después del incendio. Es antes de que G robe el aparato en el recuerdo 7 de B1.
- **Lugar:** el laboratorio de Vocalis: recepción, sala de datos, archivo y sala de pruebas.
- **Guía:** lo que hay en el lugar: el lema en la pared, recortes de prensa, gráficas en pantallas y un memo interno.
- **Busuu:** 11 (bienestar: formación de palabras, pasiva en todos los tiempos), 16 (tendencias, estadísticas, causativo).
- **Murphy:** 45 (*it is said that…*, *he is said to…*, *be supposed to*), 46 (*have / get something done*). Repaso breve de la pasiva de B1 (42–44).
- **NPC nuevos** (nombres propuestos, se pueden cambiar; aquí sí tienen cara):
  - **Dr. Hana Sato**, la científica jefe.
  - **Dr. Kwame Mensah**, su asistente.

### Qué pasa
1. **Entrada a la Ventana.** Letrero "2062". Recepción de Vocalis. En la pared está el lema de la empresa: *"Restoring human abilities. Wellbeing for everyone."*
2. **Llegada: formación de palabras** (Busuu 11), leída en folletos de la recepción:
   - able → ability, restore → restoration, improve → improvement, effective → effectiveness, well → wellbeing.
   - Prefijos y sufijos: un-, -ness, -ment, -ity, -tion.
3. **Recortes de prensa en la pared: pasiva de reporte** (Murphy 45), explicada paso a paso:
   - "**It is believed that** the writings are 3,000 years old."
   - "Dr. Sato **is said to have found** the key in a temple."
   - "The device **is supposed to** restore lost voices."
4. **Minijuego: Unheard.** El protagonista entra sin que lo oigan. Tiene 3 metas:
   - "Open the archive drawer."
   - "Turn on the data screen."
   - "Hide behind the shelf" (cuando entra un guardia).
5. **La sala de datos: tendencias** (Busuu 16). Gráficas de las pruebas del aparato:
   - Verbos: rise, fall, peak, level off, fluctuate.
   - Adverbios: sharply, steadily, slightly.
   - "The success rate rose sharply from 12% to 40%, then levelled off."
6. **El memo interno: causativo** (Murphy 46, Busuu 16):
   - "We **had** the prototype **tested** by an outside team."
   - "Dr. Sato **is having** the lab **rebuilt**."
   - Uso de "le pasó algo malo": "Last year we **had** our files **stolen**." Es una pista de lo que hará G.
7. **El hallazgo.** En el archivo, el informe de la prueba 7:
   - "Trial 7: voice restored. **The donor lost theirs.**"
   - El jugador ya conoce el precio desde B1, pero ahora ve que **Vocalis lo sabe y lo esconde**. Esto prepara el lugar 8.
   - Dr. Mensah duda en voz alta: "We're supposed to help people…". Dr. Sato le responde: "The results are too good to stop now."
8. **Esbirros:** Lab Drones (2), drones de seguridad.
   - Error típico: "They had the prototype test", "He is said to has found it" y "It is believed that be old."
9. **Jefe: The Prototype**, la primera versión del aparato, que se activa sola e intenta quitarle al protagonista una voz que ahí no tiene. Dos fases:
   - **Fase 1:** pasiva de reporte y *be supposed to*. Error típico: "She is said to discovering it" y "It is supposed that works."
   - **Fase 2:** causativo y vocabulario de tendencias. Error típico: "The success rate rose with 30%" (por "rose by") y "I got repaired my phone."
10. **Cierre:**
    - En la pantalla final aparece un mapa con tres templos marcados: Stones, Time y Echoes, los de B1.
    - Fundido azul y vuelta al presente.
    - El protagonista anota: "Vocalis knew. They knew someone had to lose a voice."
    - Se abre el lugar 7 en el mapa.

### Vocabulario
- **Laboratorio:** trial, prototype, results, data, donor, side effect, breakthrough.
- **Tendencias:** rise, fall, peak, level off, fluctuate, sharply, steadily, slightly, by / from / to.
- **Bienestar y formación de palabras:** wellbeing, ability, restoration, improvement, effectiveness.
- **Phrasal verbs:** carry out (experimentos), set up, rule out, point out.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista.
  - Página mezclada.
  - No hay página de G: él todavía no ha llegado a Vocalis en esta escena.
- **Recompensas:** despedida de The Prototype.
- **Banco de preguntas** (unas 35):
  - pasiva de reporte y *be supposed to*;
  - causativo, incluido el uso de "le pasó algo malo";
  - repaso de la pasiva de B1;
  - formación de palabras;
  - tendencias y estadísticas;
  - phrasal verbs;
  - escucha (Dr. Sato y Dr. Mensah).

### Criterios de aceptación
- Se juega de principio a fin.
- Unheard cumple sus 3 metas.
- La salida de la Ventana abre el lugar 7 en el mapa.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 7 — The Old Building (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** el barrio antiguo, un edificio abandonado y la reunión vecinal del ayuntamiento.
- **Guía:** Leo.
- **Busuu:** 7 (desarrollo urbano: describir una ciudad, tiempos para hablar del cambio, edificios abandonados, gentrificación, debatir mejoras), 8 (turistas y lugareños: sobreturismo, phrasal verbs con *get*, alternativas a *if*).
- **Murphy:** 115 (*unless*, *as long as*, *provided*), 106 (*the more… the more*), phrasal verbs con *get*.
- **NPC nuevos** (nombres propuestos, se pueden cambiar):
  - **Rosa Benítez**, vecina de toda la vida.
  - **Sam Achebe**, explorador urbano.
  - **Oliver Grant**, el constructor.

### Qué pasa
1. **El barrio antiguo.** Leo lleva al grupo a conocerlo. Está lleno de turistas y los arriendos están subiendo. Leo explica paso a paso cómo hablar del cambio (Busuu 7):
   - "The area **has changed** a lot." / "It **used to be** quiet."
   - "Rents **have been rising** for years." / "It's **getting** busier **and** busier."
   - "**The more** tourists come, **the higher** the rents get."
2. **Opiniones de los lugareños** (Busuu 8, escucha). Rosa Benítez habla del sobreturismo: "I can't get around my own street anymore."
3. **El edificio abandonado.** Sam Achebe tiene permiso del ayuntamiento para explorarlo y lleva al grupo.
   - **Minijuego: The Moving Stone escrito** (reutilizado). Se explora con comandos: "Push the door open", "Clear away the boxes", "Climb up the stairs".
   - En una pared hay un cartel viejo: "Lumen Bay Night School — coming soon?". Leo se queda mirándolo: "I've always wanted to teach in a place like this." **Ironía dramática:** el jugador ya vio este edificio en 2061.
4. **A mitad del recorrido: alternativas a *if*** (Busuu 8, Murphy 115), explicadas por Leo:
   - ***unless*** = if… not: "Unless we do something, it'll become luxury flats."
   - ***as long as / provided (that)***: condición necesaria. "We'll support it as long as it stays public."
   - ***otherwise***: "We need to speak up, otherwise nobody will listen."
   - ***suppose / supposing***: "Suppose they build a school here…"
   - **Regla clave:** después de estas palabras va presente, no *will*.
5. **Phrasal verbs con *get*** (Busuu 8): get by, get around, get along with, get over, get through, get away with.
6. **La reunión vecinal** (Busuu 7: debatir mejoras).
   - **Minijuego: DebateTalk** (reutilizado). ¿Pisos de lujo o escuela comunitaria? El jugador argumenta con alternativas a *if*.
   - **Momento clave:** el protagonista pide una condición: "We'll support the school **as long as** it has two fire exits." Gracias a eso existen las escaleras traseras que, en 2061, salvan a la gente (la nota "Use the back stairs" de la Ventana 3). Nadie lo comenta, pero el jugador puede notarlo.
7. **Esbirros:** Rent Raisers (2), agentes inmobiliarios corrompidos.
   - Error típico: "Unless you don't pay, you'll lose the flat" (doble negación), "As long as you will sign…" y "It's getting more and more expensiver."
8. **Jefe: The Developer.** Es Oliver Grant, corrompido: un brazo de grúa con bola de demolición. Dos fases:
   - **Fase 1:** tiempos para el cambio y *the more… the more*. Error típico: "Rents are rising since 2020" y "The more it is busy, the more…"
   - **Fase 2:** alternativas a *if* y phrasal verbs con *get*. Error típico: "Provided that it will have exits…" y "You won't get away from it" (en lugar de "get away with").
9. **Cierre:**
   - Oliver vuelve a la normalidad. El ayuntamiento vota por la escuela comunitaria, con la condición de las dos salidas de emergencia.
   - The Developer suelta **dos fragmentos** que llenan el **tercer segmento** del núcleo. Se abre la Ventana 8.
   - Leo dice, con la voz quebrada: "Maybe I'll teach here one day."

### Vocabulario
- **Ciudad y cambio:** neighbourhood, rent, gentrification, run-down, renovate, abandoned, community, council.
- **Turismo:** overtourism, locals, crowded, souvenir shops, short-term rentals.
- **Phrasal verbs:** get by, get around, get along with, get over, get through, get away with.

### Diario, recompensas y banco de preguntas
- **Diario:** página del protagonista y página mezclada.
- **Amistad:** ninguna. Este lugar tiene un momento fuerte con Leo, pero no cuenta como momento de amistad.
- **Recompensas:**
  - Atuendo "casco de explorador urbano" (de Sam).
  - Despedida de The Developer.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - tiempos para hablar del cambio;
  - *the more… the more*;
  - alternativas a *if* (*unless*, *as long as*, *provided*, *otherwise*, *suppose*);
  - phrasal verbs con *get*;
  - vocabulario urbano y de turismo;
  - escucha (Rosa y la reunión vecinal).

### Criterios de aceptación
- Se juega de principio a fin.
- Se llena el tercer segmento del núcleo y se abre la Ventana 8.
- La condición de las dos salidas de emergencia queda guardada como dato de historia, para usarla en el lugar 13.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 8 — Pitch (Ventana, 2064)

- **Época:** Ventana, hacia 2064. G ya robó el prototipo (recuerdo 7 de B1), y Vocalis lanza la versión comercial, **"Vocalis Restore"**.
- **Lugares:** las oficinas de marketing de Vocalis, la sala de reuniones y el escenario del lanzamiento.
- **Guía:** lo que hay en el lugar: la propuesta de campaña, una encuesta de mercado, el manual del empleado y correos internos.
- **Busuu:** 15 (marketing: comparaciones precisas, tipos de marketing, incontables, encuesta de mercado), 17 (beneficios laborales y permisos), 18 (acrónimos de trabajo y de correo).
- **Murphy:** 69–70 (contables e incontables), 106–107 (*far / much / slightly* + comparativo, *nowhere near as… as*, *twice as… as*).
- **NPC:**
  - **Dr. Kwame Mensah** (de la ficha 6), que ahora trabaja en Vocalis con muchas dudas.
  - **Chloe Martin**, la jefa de marketing (nombre propuesto).

### Qué pasa
1. **Entrada a la Ventana.** Letrero "2064". En las pantallas de la oficina se lee el eslogan: *"Get your voice back. Far easier than you think."*
2. **La propuesta de campaña: comparaciones precisas** (Busuu 15, Murphy 106–107):
   - "Restore is **far / much** more effective **than** therapy."
   - "It's **slightly / a bit** cheaper than the competition."
   - "Other treatments are **nowhere near as** fast **as** Restore."
   - "It works **twice as** fast."
   - Tipos de marketing: influencer marketing, word of mouth, targeted ads.
3. **La encuesta de mercado: incontables** (Busuu 15, Murphy 69–70):
   - advice, information, research, equipment, feedback, news.
   - "**a piece of** advice", "**some** information" (nunca *an information* ni *advices*).
4. **Minijuego: Unheard** en la oficina. Tiene 3 metas:
   - "Open the campaign folder."
   - "Print the fine print."
   - Dejarle una nota a Mensah: "Read the small print aloud."
5. **El manual del empleado y los correos** (Busuu 17 y 18):
   - **Beneficios:** health insurance, flexible hours, parental leave, sick leave, bonus.
   - **Acrónimos:** ASAP, ETA, FYI, EOD, TBC, RSVP; y en correos informales, BTW e IMO.
   - Un correo de Chloe: "FYI, the donor issue is TBC. Keep it off the ads. Launch ASAP."
6. **Minijuego: The Fine Print** (reutilizado, ficha 0.5 de B1). Se lee la letra pequeña del contrato de Restore y se marca lo que esconde la publicidad: *"A compatible donor voice is required."*
7. **El lanzamiento.** En el escenario, el anuncio del producto. Al fondo del público hay una figura con capucha, en sombra, que se lleva la mano a la garganta: es G. No se dice nada.
8. **Esbirros:** Promo Bots (2), robots promocionales.
   - Error típico: "It's much more better", "Can you give me an information?" y "I need some advices."
9. **Jefe: The Salesman**, el portavoz holográfico de la campaña, corrompido. Dos fases:
   - **Fase 1:** comparaciones precisas. Error típico: "It's nowhere near good as the old one" y "twice faster than".
   - **Fase 2:** incontables, beneficios y acrónimos. Error típico: "The equipments are new" y "We need the report until EOD" (por "by EOD").
10. **Cierre:**
    - Mensah lee la nota del protagonista, la mira un buen rato y le escribe a Chloe: "I'm handing in my notice."
    - Fundido azul. El protagonista anota: "They sell it as wellbeing. Somebody always pays the price."
    - Se abren el lugar 9 y el Extra Paws Debate.

### Lectura larga opcional (capítulo del Diario)
- "Restore: the small print": un artículo de una revista de 2064 sobre las dudas de la comunidad médica. Unas 250 palabras y 5 preguntas.

### Vocabulario
- **Marketing:** campaign, target audience, brand, slogan, launch, influencer, word of mouth, market research, survey.
- **Trabajo:** perks, health insurance, flexible hours, parental leave, sick leave, notice period, resign.
- **Acrónimos:** ASAP, ETA, FYI, EOD, TBC, RSVP, BTW, IMO.
- **Phrasal verbs:** hand in (la renuncia), roll out, cover up, sign up for.

### Diario, recompensas y banco de preguntas
- **Diario:** página del protagonista y página mezclada.
- **Recompensas:** despedida de The Salesman.
- **Banco de preguntas** (unas 35):
  - comparaciones precisas;
  - contables e incontables;
  - vocabulario de marketing y de trabajo;
  - acrónimos;
  - phrasal verbs;
  - escucha (la presentación del lanzamiento).

### Criterios de aceptación
- Se juega de principio a fin.
- Unheard cumple sus 3 metas.
- La salida de la Ventana abre el lugar 9 y el Extra Paws Debate.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 9 — The Gallery (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** el museo de arte de Lumen Bay: la exposición "Voices of Stone", la sala de arte digital y la librería del museo.
- **Guía:** la persona especial.
- **Busuu:** 20 (literatura: personajes, locuciones adverbiales, orden de adjetivos, leer un cuento), 21 (arte: pintura, visita guiada, adjetivos graduables y no graduables, arte digital, reseña de un concierto).
- **Murphy:** 95–96 (relativas explicativas), 99 (orden de adjetivos), 104 (*quite / pretty / rather / fairly*).
- **NPC nuevo** (nombre propuesto, se puede cambiar): **Arturo Silva**, el curador.

### Qué pasa
1. **Llegada al museo.** Hay una exposición nueva: "Voices of Stone", con tablillas de los templos de B1 (Stones, Time, Roads y Echoes). La persona especial explica paso a paso cómo hablar de arte:
   - **Graduables y no graduables:** *very good* pero *absolutely amazing*. Nunca *very amazing* ni *absolutely good*.
   - **Matizar** (Murphy 104): quite, pretty, rather, fairly. "It's quite impressive." / "It's rather strange."
2. **Orden de adjetivos** (Murphy 99, Busuu 20). Al describir las piezas:
   - Orden: opinión – tamaño – edad – forma – color – origen – material – propósito.
   - Ejemplo: "a beautiful small ancient grey stone tablet".
3. **Visita guiada con Arturo Silva** (Busuu 21, escucha). A mitad del recorrido, la persona especial explica las **relativas explicativas** (Murphy 95–96):
   - Información extra entre comas: "This tablet, **which** was found in 1998, comes from the Temple of Echoes."
   - Con personas: "Dr. Ruiz, **who** led the excavation, never published her notes."
   - ***which* que se refiere a toda la oración:** "Nobody could read it, **which** made it famous."
   - **Regla:** en estas oraciones nunca se usa *that*.
4. **Minijuego: Inscriptions, versión museo** (reutilizado). Se arman las traducciones de las tablillas con relativas explicativas. La última tablilla dice:
   - *"A voice that is taken returns only when two voices rise together."*
   - Esto prepara el final (opción B). El protagonista lo anota sin entenderlo.
   - Leo, al leerla, se toca la garganta y se va a otra sala.
5. **La sala de arte digital.** Una instalación de luz y sonido. Se practica cómo opinar y hacer una reseña corta de una actuación (Busuu 21).
6. **La librería: locuciones adverbiales** (Busuu 20). Un cuento corto que se vende en la tienda, "The Man Who Lost His Voice":
   - without a word, in silence, all of a sudden, at long last, by no means.
   - Se lee con preguntas sobre los rasgos de los personajes.
7. **Esbirros:** Living Statues (2), estatuas corrompidas de la sala.
   - Error típico: "It's very fantastic", "a wooden old small box" y "My brother, that lives in Lima, is an artist."
8. **Jefe: The Curator.** Es Arturo, corrompido: un marco dorado que encierra todo lo que toca. Dos fases:
   - **Fase 1:** relativas explicativas y *which* que se refiere a la oración. Error típico: "The tablet, that is very old, …" y "He didn't come which was strange" (le falta la coma).
   - **Fase 2:** graduables y no graduables, orden de adjetivos, *quite / rather* y locuciones adverbiales. Error típico: "absolutely interesting", "a red big ancient vase" y "in a silence".
9. **Amistad con Maya.** Charla sobre un personaje de ficción con el que cada uno se identifica (Busuu 20). No hay respuestas malas.
10. **Cierre:**
    - Arturo vuelve a la normalidad. The Curator suelta **dos fragmentos** que llenan el **cuarto segmento** del núcleo.
    - Se abre la Ventana 10.
    - El protagonista anota: "Two voices together… what does that mean?"

### Vocabulario
- **Arte:** exhibition, gallery, curator, sculpture, installation, masterpiece, abstract, portrait.
- **Literatura:** character, plot, narrator, chapter, relatable, complex.
- **Adjetivos fuertes:** amazing, stunning, awful, tiny, huge, fascinating.
- **Phrasal verbs:** look up to, stand out, pick out, take in (observar con calma).

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista, que copia la inscripción de las dos voces.
  - Página mezclada.
- **Recompensas:**
  - Atuendo "boina de artista".
  - Despedida de The Curator.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - relativas explicativas;
  - adjetivos graduables y no graduables;
  - orden de adjetivos;
  - *quite / pretty / rather / fairly*;
  - locuciones adverbiales;
  - vocabulario de arte y literatura;
  - phrasal verbs;
  - escucha (la visita guiada de Arturo).

### Criterios de aceptación
- Se juega de principio a fin.
- La inscripción de las dos voces queda guardada en el diario como pista, para usarla en los lugares 13 y 14.
- Se llena el cuarto segmento del núcleo y se abre la Ventana 10.
- La amistad con Maya queda registrada.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 10 — The Card (Ventana, 2056)

- **Época:** Ventana, 2056. Es la misma tarde que la escena de la ventana del recuerdo 13 de B1, pero vista desde fuera y un poco después.
- **Lugares:** el pasillo exterior del salón de un profesor y una banca del patio de la escuela.
- **Guía:** lo que hay en el lugar: la pizarra que se ve por la ventana y el **cuaderno de G** (primera vez en B2).
- **Busuu:** 22 (contraste e ideas opuestas, comparar opiniones).
- **Murphy:** 60 (preposición + *-ing*), 62–63 (*there's no point in*, *it's worth*, *have difficulty*), 66 (*afraid of -ing*), 113 (*despite / in spite of*).
- **Canon de B1 que se respeta:** en la ventana de 2056, G no escribe nada. La tarjeta la escribe **después**, en el patio. Así se responde lo que quedó pendiente en la ficha 13 de B1.

### Qué pasa
1. **Entrada a la Ventana.** Letrero "2056". Una escuela por la tarde. El protagonista ve a una figura con capucha, de espaldas, mirando por la ventana de un salón: es G, ya muy viejo.
2. **La clase por la ventana** (escucha). El profesor, de espaldas y con el nombre "Mr. ▒▒▒" en estática, dirige un debate: "Should we always speak up?". En la pizarra está la lección de contraste, que se lee paso a paso:
   - *whereas / while*: "Some people speak up, **whereas** others stay quiet."
   - *however / nevertheless / on the other hand*.
   - *despite / in spite of* + sustantivo o *-ing*: "**Despite being** scared, she spoke."
   - Al final, el profesor les dice a sus alumnos: *"Be brave. Use your voice."* G se queda quieto.
3. **El patio.** G se sienta en una banca y abre su cuaderno. El protagonista se acerca sin que nadie le preste atención (ficha 0.3) y lee por encima de su hombro.
4. **El cuaderno de G**, con letra a mano, tachones y la mancha de tinta. Enseña preposición + *-ing* y otras expresiones con *-ing* a través de sus sentimientos encontrados:
   - "**Despite hating** him, I can't stop thinking about our friendship."
   - "**Whereas** he lived a full life, I lost everything."
   - "There's **no point in forgiving** him." / "It's **worth trying** one last time."
   - "I'm tired **of waiting**." / "I'm afraid **of failing**."
   - "I had difficulty **writing** this."
5. **Minijuego: Reconstruct** (reutilizado). G arruga varios borradores de una tarjeta. El jugador une los pedazos útiles y descarta los tachados hasta formar el mensaje final:
   - *"Happy birthday, Leo. Be brave. Use your voice."* Es el texto exacto de la tarjeta del cumpleaños 15 de Leo en A1 (`diary.ts`).
   - Firma: una **G** con la mancha de tinta.
   - G envuelve un regalo pequeño con papel y le pega la tarjeta. Es el mismo regalo que Leo abre en el parque en A1, mientras un hombre con abrigo oscuro dice detrás de un árbol: "Happy birthday… Leo."
   - Es la pista más fuerte hasta ahora, pero no revela nada: solo muestra que G conoce a Leo desde hace mucho.
6. **Esbirros:** Ink Blots (2), manchas de tinta del cuaderno de G que cobran vida.
   - Error típico: "Despite of the rain…", "There's no point to forgive him" y "I'm tired to wait."
7. **Jefe: Second Thoughts**, las dudas de G hechas sombra, que intentan romper la tarjeta. Dos fases:
   - **Fase 1:** conectores de contraste. Error típico: "Whereas he was happy, but I was sad" (sobra el *but*) y "In spite he was tired…"
   - **Fase 2:** preposición + *-ing*, *it's worth*, *there's no point in*, *have difficulty*. Error típico: "It's worth to try" y "I have difficulty to write."
   - Al vencerlo, la tarjeta queda entera.
8. **Cierre:**
   - G guarda el regalo bajo el abrigo y se va caminando hacia el puerto viejo. Esa misma noche vuelve a su cuarto (Ventana 12).
   - Fundido azul y vuelta al presente.
   - El protagonista anota: "The man in the park on Leo's birthday… it was G. Why would he know Leo?"
   - Se abre el lugar 11 en el mapa.

### Vocabulario
- **Contraste:** whereas, while, however, nevertheless, on the other hand, despite, in spite of.
- **Sentimientos encontrados:** resentment, forgive, grudge, miss, mixed feelings, torn.
- **Phrasal verbs:** look up to, let go of, hold on to, give in.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista.
  - **Página del cuaderno de G:** "Despite everything… he was a good teacher. I hope he still is."
  - Página mezclada.
- **Recompensas:** despedida de Second Thoughts.
- **Banco de preguntas** (unas 30):
  - conectores de contraste;
  - preposición + *-ing*;
  - *it's worth / there's no point in / have difficulty*;
  - vocabulario de sentimientos encontrados;
  - phrasal verbs;
  - escucha (el debate de la clase).

### Criterios de aceptación
- Se juega de principio a fin.
- Respeta el canon de B1: G no escribe nada en la escena de la ventana, solo después, en el patio.
- La tarjeta queda guardada como pista en la pestaña Recuerdos y Ventanas, con el mismo texto que la de A1.
- La salida de la Ventana abre el lugar 11.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 11 — Who Is G? (presente)

- **Época:** presente, Lumen Bay.
- **Lugares:** el archivo del Herald y la sala común de la residencia, en una noche de cine.
- **Guía:** Manuel en el archivo, y luego el grupo.
- **Busuu:** 5 (películas y series: recomendar, tiempos narrativos, vocabulario de suspenso y terror, reseñas).
- **Murphy:** 15–16 (tiempos narrativos combinados), 49–50 (preguntas indirectas y preguntas en estilo indirecto). Repaso de 47–48.

### Qué pasa
1. **El archivo del Herald.** El protagonista le cuenta a Manuel todo lo que ha visto (sin mencionar los viajes en el tiempo, solo "pistas"). Manuel le explica paso a paso las **preguntas indirectas** (Murphy 50):
   - "Where is G?" → "**Do you know where G is?**"
   - "When did it start?" → "**Can you tell me when it started?**"
   - En estilo indirecto: "He asked me **where I was going**." / "She asked **if** I had seen it."
   - Regla: en la pregunta indirecta no va el auxiliar *do / does / did*, y el verbo va después del sujeto.
2. **Minijuego: Fact Check** (tercera y última vez). Se revisan noticias viejas del Herald sobre los apagones (las de B1 y las del lugar 5) y las versiones de cada testigo.
3. **Noche de cine en la residencia** (Busuu 5). Marisol propone ver una película de suspenso para despejarse: un hombre que viaja al pasado para cambiar un accidente. Se aprende:
   - Cómo recomendar: "It's well worth watching", "It's a bit slow at first, but…"
   - Vocabulario de suspenso: plot twist, cliffhanger, gripping, predictable, spine-chilling.
   - El protagonista se queda callado: la película se parece demasiado a lo que está viviendo.
4. **El tablero de pistas: tiempos narrativos combinados** (Murphy 15–16, Busuu 5). La persona especial explica cómo contar una historia con todos los pasados a la vez:
   - "G **was watching** from behind a tree when Leo **opened** the gift."
   - "By the time Leo turned fifteen, G **had** already **written** the card."
   - "G **had been planning** it for years."
5. **Minijuego: Reconstruct (Detective), versión "tablero"** (reutilizado). Se ordenan en un corcho todas las pistas de B2 con hilos rojos y se arma la línea de tiempo con tiempos narrativos: el incendio, Vocalis, el aparato, la tarjeta y el cumpleaños.
6. **Leo confiesa** (escucha). El grupo le pregunta con preguntas indirectas: "Can you tell us why your voice keeps breaking?"
   - Leo admite que desde el hospital de A2 su voz desaparece cuando los fragmentos brillan.
   - También que sueña con humo y con un pasillo en llamas: "I didn't want to worry you."
   - El protagonista piensa: "What if G is connected to Leo?" No se dice nada más.
7. **Los quintos momentos de amistad de B2.** No hay respuestas malas y tienen la complejidad más alta:
   - **Leo:** qué haría cada uno si perdiera la voz. Leo admite que tiene miedo.
   - **Maya:** películas y series que cada uno recomienda (Busuu 5).
   - **La persona especial:** confianza. "Whatever happens, I'm here." Si el jugador elige ser sincero, la persona especial responde: "Then we'll face it together."
8. **Esbirros:** Plot Holes (2), huecos de guion corrompidos.
   - Error típico: "Do you know where is G?", "He asked me where was I going" y "By the time we arrived, the film already started."
9. **Jefe: The Spoiler**, un crítico de cine corrompido que intenta contar el final de todo. Dos fases:
   - **Fase 1:** tiempos narrativos combinados. Error típico: "She had been knowing him for years" y "When I arrived, they already left."
   - **Fase 2:** preguntas indirectas y en estilo indirecto. Error típico: "Can you tell me what time does it start?" y "He asked me did I like it."
10. **Cierre:**
    - The Spoiler suelta **dos fragmentos** que llenan el **quinto segmento** del núcleo. Se abre la Ventana 12.
    - Leo, con la voz quebrada, le dice al protagonista: "If I ever lose my voice… promise you'll speak for me."

### Escritura opcional
- Una reseña corta de la película, de 60 a 90 palabras. Se revisa con patrones, igual que en Movie Night de B1.

### Vocabulario
- **Cine y series:** plot, plot twist, cliffhanger, cast, sequel, episode, binge-watch, review.
- **Adjetivos:** gripping, predictable, spine-chilling, overrated, thought-provoking.
- **Phrasal verbs:** figure out, turn out, piece together, give away (revelar un final).

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista con la línea de tiempo.
  - Página mezclada.
- **Recompensas:**
  - Atuendo "pijama de cine" mejorado (variante de color del de B1).
  - Despedida de The Spoiler.
  - Monedas.
- **Banco de preguntas** (unas 35):
  - tiempos narrativos combinados;
  - preguntas indirectas;
  - preguntas en estilo indirecto;
  - repaso del reported speech;
  - vocabulario de cine;
  - phrasal verbs;
  - escucha (la confesión de Leo).

### Criterios de aceptación
- Se juega de principio a fin.
- Los tres quintos momentos de amistad quedan registrados.
- Se llena el quinto segmento del núcleo y se abre la Ventana 12.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 12 — Countdown (Ventana, 2056)

- **Época:** Ventana, 2056. Es la noche en que G escribe la tarjeta, horas antes de viajar al primer día del protagonista en A1.
- **Lugar:** el cuarto que G alquila cerca del puerto viejo.
- **Guía:** lo que hay en el lugar: el plan clavado en la pared, una lista vieja de metas y el cuaderno de G.
- **Busuu:** 12 (objetivos de vida: crecimiento personal, futuro perfecto simple y continuo, el "yo" del futuro, aspiraciones).
- **Murphy:** 24–25 (*will have done*, *will have been doing*, *when / if* con presente), 120 (*by the time*, *by / until*) y *be about to*.
- **Canon de B1 que se respeta:** el Future Planner de la ficha 13 de B1 ya mostró el plan del día siguiente ("Tomorrow I'm going to wait at the school"). Esta Ventana no lo repite: muestra el **plan grande** de G y su historia.

### Qué pasa
1. **Entrada a la Ventana.** Letrero "2056". Un cuarto pequeño y oscuro. G no está: salió a la escuela (la Ventana 10).
2. **La pared del plan: futuro perfecto** (Murphy 24, Busuu 12), leído paso a paso:
   - "By tomorrow morning, I **will have arrived** at his school."
   - "By the time he turns fifteen, I **will have taken** his voice."
   - "They **will** never **have become** friends."
   - Un mapa con los lugares de A1 (escuela, ciudad, barrio, granja, oficina) marcados con alfileres.
3. **La lista vieja de metas** (Busuu 12). Es una hoja amarillenta con letra de adolescente, sin nombre:
   - "By the time I'm 30, I **will have become** a teacher."
   - "I'll have been teaching for ten years by 40."
   - Las metas están cumplidas hasta "teacher". Después, G tachó el resto con tinta.
   - Es una pista fuerte, pero la cara y el nombre siguen ocultos.
4. **Minijuego: Unheard.** Es el primer intento del protagonista de hablarle a G. Tiene 3 metas:
   - "Open the drawer" (adentro está el reloj, brillando).
   - "Take down the plan." La pared no deja quitarlo: es un hecho fijo y el plan sí ocurrió.
   - Dejar una nota para G: **"Don't do it."**
5. **G vuelve** y lee la nota. Mira alrededor: "Who's there?". No ve a nadie. Habla solo, y así se enseña ***be about to*** y el **futuro perfecto continuo**:
   - "No one can stop me now. I'**m about to** change everything."
   - "By tomorrow, I'**ll have been waiting** for this for thirty years."
6. **El cuaderno de G:** *by the time*, *by* y *until* (Murphy 120), y *when / if* + presente para el futuro (Murphy 25):
   - "**By the time** he sees me, it will be too late."
   - "I'll wait **until** he's alone."
   - "**When** I take his voice, I'll speak again."
7. **Minijuego: Future Planner, versión G** (reutilizado). Completar la línea de tiempo de G con el futuro perfecto: "By 8 a.m. he **will have left** the room."
8. **Esbirros:** Ticking Shadows (2), sombras que hacen tic-tac.
   - Error típico: "By tomorrow I will have finish", "I will have been wait for years" y "I'm about leaving."
9. **Jefe: The Countdown**, la obsesión de G hecha reloj gigante. Dos fases:
   - **Fase 1:** futuro perfecto simple y continuo. Error típico: "By 2060 I will have been became…" y "By next year she will finish" (cuando el contexto pide "will have finished").
   - **Fase 2:** *by the time* / *until* / *when* + presente y *be about to*. Error típico: "By the time he will arrive, I'll have left" y "Wait here until I will come back."
10. **Cierre:**
    - G guarda el reloj y la tarjeta, mira la nota "Don't do it." un momento… y la arruga. Desaparece en la luz.
    - Fundido azul y vuelta al presente.
    - **El núcleo tiembla, con 5 de 6 segmentos encendidos.** En ese momento Leo pierde la voz por completo durante varios segundos.
    - El protagonista entiende lo que tiene que hacer y anota: "I know where I have to go. The night of the fire."
    - La Ventana 13 se abre sola en el mapa (ficha 0.4).

### Vocabulario
- **Metas y futuro:** goal, ambition, achieve, fulfil, milestone, look back on, turn out.
- **Tiempo:** deadline, countdown, by then, in time, too late.
- **Phrasal verbs:** carry out (un plan), look back on, give up on, follow through.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista.
  - **Página del cuaderno de G:** "Tomorrow I'll have my voice back. And he'll have lost his."
  - Página mezclada.
- **Recompensas:** despedida de The Countdown.
- **Banco de preguntas** (unas 35):
  - futuro perfecto simple y continuo;
  - *by the time / by / until*;
  - *when / if* + presente para el futuro;
  - *be about to*;
  - vocabulario de metas;
  - phrasal verbs;
  - escucha (G hablando solo).

### Lectura larga opcional (capítulo del Diario)
- "Letters to my future self" (Busuu 12): cartas de estudiantes de Lumen Bay a su yo de dentro de 20 años, con futuro perfecto. Unas 250 palabras y 5 preguntas.

### Criterios de aceptación
- Se juega de principio a fin.
- Respeta el canon de B1: no repite el Future Planner del recuerdo 13, que mostraba el plan del día siguiente.
- La nota "Don't do it." queda guardada como pista.
- Al salir, el núcleo queda con 5 de 6 segmentos y se abre sola la Ventana 13.
- Las preguntas pasan por el validador y por LanguageTool.

---

## FICHA 13 — The Fire (Ventana, 2061)

- **Época:** Ventana, 2061, la noche del incendio (la misma de la Ventana 3 y del recuerdo 1 de B1).
- **Lugar:** la escuela nocturna: pasillo del tercer piso, escaleras principales y escaleras traseras.
- **Guía:** el cartel de evacuación del pasillo y, por primera vez en una Ventana, **la voz del propio protagonista**.
- **Busuu:** repaso de la Parte 3 (20, 21, 22, 5, 12). Speaking como en los combates.
- **Murphy:** 35 (*had better*, *it's time to / it's time + pasado*). Repaso de la Parte 3: relativas explicativas, contraste, preposición + *-ing*, tiempos narrativos y futuro perfecto.
- **Regla que se cumple:** el incendio es un hecho fijo (Temple of Roads, B1). El silencio no lo es. Ver también la inscripción de las dos voces (ficha 9).

### Qué pasa
1. **Entrada a la Ventana.** Al entrar se enciende el **sexto segmento**: el núcleo está completo. Letrero "2061". El protagonista intenta hablar… y esta vez **se oye su voz**. Texto: "My voice… it works here now."
2. **Antes de la alarma.** El protagonista ve la misma escena de la Ventana 3: Leo adulto (de espaldas) termina su clase y el protagonista adulto espera en la puerta. Ya sabe lo que va a pasar.
3. **El cartel de evacuación: *had better* e *it's time*** (Murphy 35), leído paso a paso:
   - "In case of fire, you**'d better** use the back stairs." / "You**'d better not** use the lift."
   - "**It's time to** leave." / "**It's time** everyone **left**." (*it's time* + pasado, para algo que ya debería estar pasando).
   - Las escaleras traseras existen gracias a la condición de las dos salidas que el protagonista pidió en el lugar 7.
4. **Suena la alarma.** Humo en las escaleras principales. El protagonista adulto se paraliza, igual que en la Ventana 3.
5. **Esbirros:** Smoke Shadows (2), los mismos de la Ventana 3, más fuertes.
   - Error típico: "You'd better to go", "It's time we leave" (lo correcto es "left") y "You had better not to stay."
6. **Jefe: Panic, segunda forma**, más grande, que vuelve a sujetar al protagonista adulto. Tres fases:
   - **Fase 1:** *had better* e *it's time*.
   - **Fase 2:** repaso mezclado de la Parte 3: relativas explicativas, contraste, preposición + *-ing*, tiempos narrativos y futuro perfecto.
   - **Fase 3: habla** (reconocimiento de voz, como el final de B1). El protagonista le habla en voz alta a su yo adulto: *"You're not alone. It's time you spoke up."* Si el navegador no tiene reconocimiento de voz, se escribe.
   - Al vencer, la escarcha se rompe y el protagonista adulto respira hondo y se mueve.
7. **Minijuego: Call for Help a dos voces** (reutilizado de B1, recuerdo 1, en modo de voz). Son 5 rondas en el pasillo:
   - Leo adulto y el protagonista adulto gritan juntos: "Fire! Get out!", "Is anybody there?", "Use the back stairs!", "Call the firefighters!"
   - En cada ronda el jugador elige o dice la frase correcta para la situación (escucha: alguien atrapado detrás de una puerta, alguien que no encuentra la salida).
   - **La barra de voz de Leo ya no baja hasta el final,** porque esta vez no grita solo. Es la inscripción de las dos voces hecha mecánica.
8. **El rescate.** Llegan los bomberos y todos salen por las escaleras traseras.
   - Narración (eco que corrige el recuerdo 1 de B1): "Everyone got out because **we** shouted."
   - Leo adulto tose, pero habla con voz clara: "Thank you… for not staying silent." El protagonista adulto asiente. Ninguno de los dos ve ya al protagonista joven.
9. **Cierre:**
   - Fundido azul. El protagonista despierta en el presente. Su voz suena distinta, más fuerte.
   - Leo lo llama por teléfono: su voz está perfecta, sin quebrarse. "Weird… my throat feels fine. Like something just healed."
   - Pero el reloj sigue temblando. En el puerto de Lumen Bay aparece una figura con capucha que se ve **transparente, como si se estuviera borrando**.
   - Se abre el lugar 14 en el mapa.

### Vocabulario
- **Emergencia y ánimo:** take a deep breath, stay calm, you can do it, I've got you, speak up, back stairs, fire exit, evacuate.
- **Phrasal verbs:** speak up, hold back, calm down, get out.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista: "I didn't change the fire. I changed the silence."
  - Página mezclada.
  - No hay página de G: en esta línea de tiempo G está dejando de existir.
- **Recompensas:**
  - Despedida de Panic.
  - **Insignia especial "Two Voices".** Es la única recompensa de una Ventana que no es una despedida.
- **Banco de preguntas** (unas 30):
  - *had better / had better not*;
  - *it's time to* / *it's time* + pasado;
  - repaso mezclado de la Parte 3;
  - frases de emergencia y de ánimo;
  - escucha (anuncios de evacuación).

### Criterios de aceptación
- Se juega de principio a fin.
- El sexto segmento se enciende al entrar y el núcleo queda completo.
- Dentro de esta Ventana la regla de "nadie te oye" queda desactivada.
- Call for Help funciona a dos voces y la barra de Leo no baja.
- La fase 3 de habla funciona, con la opción de escribir.
- Las preguntas pasan por el validador y por LanguageTool.
- Al salir se abre el lugar 14.

---

## FICHA 14 — Use Your Voice (presente, final de B2 y del juego)

- **Época:** presente, Lumen Bay.
- **Lugar:** el puerto al atardecer, el mismo de The Grudge en B1.
- **Guía:** Leo (como en A1, cierra el círculo).
- **Busuu:** 24 (reflexiones sobre el pasado: verbos para recordar, deseos e hipótesis, condicionales mixtos, gratitud y arrepentimiento).
- **Murphy:** 38–41 (*if I did*, *if I had done*, *wish*, *if only*), condicionales mixtos, *wish + would*, 59 (*would rather* + sujeto + pasado).
- **Por qué "G":** es la inicial de **García**, el apellido de Leo (en el repo, su mamá es "Mrs. Garcia" y el profesor de 2056 es "Mr. Garcia"). Por eso el cambio de "L" a "G" esconde a Leo sin romper la lógica.

### Qué pasa
1. **El puerto.** El grupo (protagonista, Leo, Maya y la persona especial) encuentra a la figura con capucha. Se ve transparente y su voz suena débil, pero se oye. G habla: "You weren't supposed to be there. That night was mine."
2. **Leo explica paso a paso los condicionales mixtos y los deseos** (Murphy 38–41, Busuu 24). Lo hace mientras G habla, y el jugador entiende cada frase de G:
   - **Pasado → presente:** "If you **hadn't been** there tonight, I **wouldn't be** disappearing now."
   - **Presente → pasado:** "If I **weren't** so angry, I **wouldn't have come** back."
   - ***wish / if only* + past perfect** (arrepentimiento): "I **wish** I **had trusted** you." / "**If only** I **had known**."
   - ***wish + would*** (molestia por algo que otro hace): "I wish you **would stop** blaming him."
   - ***would rather* + pasado:** "I'**d rather** you **didn't** fight."
   - Se repasan los tres condicionales de B1 como base antes de mezclarlos.
3. **La revelación.** Se cae la capucha. La estática del nombre se limpia letra por letra: **"G… García."** Es Leo, muy viejo.
   - Leo joven se ve a sí mismo y se queda sin palabras.
   - El protagonista lo entiende todo: el incendio, la tarjeta, el cumpleaños, la voz.
   - G: "I blamed you for everything. But tonight… you didn't stay silent."
4. **Esbirros:** ecos de los jefes de B2 (repaso rápido, uno por parte del mapa).
5. **Jefe final: G**, el último resto de su rencor. Ya no es malvado, solo está dolido. Tres fases:
   - **Fase 1:** condicionales mixtos. Error típico: "If I would have known, I would be here" y "If you had helped me, I wouldn't lost my voice."
   - **Fase 2:** repaso mezclado de todo B2 (modales en pasado, verbos declarativos, pasiva de reporte, futuro perfecto, relativas explicativas y contraste).
   - **Fase 3: habla, a dos voces.** El protagonista y Leo joven hablan juntos, en voz alta: *"We're friends. Not because of you — in spite of you."* y *"Thank you for the card."* Si el navegador no tiene reconocimiento de voz, se escribe.
6. **El desenlace** (final B).
   - G sonríe por primera vez y devuelve el centro del reloj, el que le quitó al protagonista en el final de A1.
   - Les dice a los dos: *"Be brave. Use your voice."* y se desvanece en paz.
   - Leo joven sigue teniendo la tarjeta de su cumpleaños 15 (A1). Es lo único que queda de G.
   - La voz del protagonista vuelve completa.
7. **La paradoja (resuelta).** Si G nunca llega a existir, ¿quién robó la voz en A1? El núcleo del reloj, ya completo, muestra una última inscripción: *"What happened, still happened. The clock keeps every echo."*
   - Todo lo vivido desde A1 sigue siendo real para el protagonista y sus amigos, porque el reloj guarda los ecos.
   - El futuro, en cambio, ya no lleva a G.
8. **Reflexión final** (Busuu 24). En el muelle, cada amigo recuerda un momento de A1 a B2. Se practican:
   - Verbos para recordar: recall, look back on, remind, reminisce.
   - Gratitud y arrepentimiento: "I'm grateful that…", "I regret not…", "If it hadn't been for you…"
   - No hay respuestas malas.
9. **Examen de B2** (obligatorio). Tiene cuatro partes, con los sistemas del examen de B1:
   1. **Reading:** el artículo de Manuel "The Night the Port Spoke", de unas 250 palabras, con 6 preguntas.
   2. **Listening:** un boletín del Herald y una conversación, con 6 preguntas.
   3. **Writing:** un texto de opinión de 120 a 150 palabras: "Is it always right to speak up?"
      - **Revisión automática** con una lista de requisitos: la longitud, al menos 4 conectores (uno de contraste), un condicional mixto, un verbo declarativo con su patrón y una relativa explicativa o una pasiva de reporte.
      - **Al terminar,** el juego muestra un texto modelo.
      - **Límite honesto:** la revisión comprueba los requisitos, no la calidad del texto.
   4. **Speaking:** responder en voz alta 3 preguntas (describir, opinar e imaginar: "What would you have done if…?"), con revisión por palabras clave. Si el navegador no tiene reconocimiento de voz, se escribe.
   - **Aprobado:** con el mismo criterio que el examen de B1.
10. **Epílogo y fin del juego.**
    - Despedida en el puerto de Lumen Bay. Leo dice: "Maybe I'll be a teacher one day." El protagonista responde: "You will. And you'll be a good one."
    - Créditos.
    - El menú permite volver a jugar cualquier nivel (A1 a B2).

### Vocabulario
- **Recordar:** recall, look back on, remind, reminisce, memory, unforgettable.
- **Gratitud y arrepentimiento:** grateful, thankful, regret, forgive, closure, let go.
- **Phrasal verbs:** stand up for, let go of, look back on, move on.

### Diario, recompensas y banco de preguntas
- **Diario:**
  - Página del protagonista: "I used my voice. And I'll keep using it."
  - **Última página del cuaderno de G,** que aparece sola en el diario: "Thank you for not staying silent. — G."
  - Página mezclada.
- **Recompensas:**
  - Atuendo final "chaqueta de las dos voces".
  - Despedida de G.
  - Insignias "B2 completado" y "Juego completado".
- **Banco de preguntas** (unas 40):
  - condicionales mixtos;
  - *wish / if only* (pasado y *would*);
  - *would rather* + pasado;
  - repaso de los tres condicionales de B1;
  - verbos para recordar;
  - gratitud y arrepentimiento;
  - repaso de todo B2;
  - escucha (las palabras de G).

### Criterios de aceptación
- Se juega de principio a fin.
- La revelación limpia la estática del nombre en el diario, en la pestaña Recuerdos y Ventanas, y en los textos de B1 y B2 ya vistos.
- La fase 3 de habla funciona a dos voces, con la opción de escribir.
- El examen de B2 funciona, con sus cuatro partes.
- Las insignias quedan guardadas y el menú permite elegir cualquier nivel.
- Las preguntas pasan por el validador y por LanguageTool.

---

## MISIONES SECUNDARIAS (Extras)

Son opcionales. No sueltan fragmentos ni cambian la historia principal. Siguen el orden de siempre: explicación guiada, práctica y un duelo o jefe ligero. Cada una tiene un banco de unas 20 preguntas que pasa por el validador y por LanguageTool.

### Fusion Night (después del lugar 4)
- **Busuu:** 3 (gastronomía: describir comida, un restaurante de comida fusión, platos típicos de distintos países, los mejores y peores platos que has probado).
- **NPC nuevo** (nombre propuesto, se puede cambiar): **Chef Mei Lin**, que abre un restaurante de fusión china y colombiana en el puerto. Los abuelos **Einer y Jhoana** (B1) son invitados de honor.
- **Gramática y vocabulario:**
  - **Adjetivos compuestos** (formación de palabras de B2): mouth-watering, home-made, deep-fried, well-done, sugar-free, slow-cooked.
  - **Describir sabor y textura:** bland, spicy, tangy, crunchy, chewy, rich.
  - **Repaso de *it's worth* + *-ing*:** "It's worth trying the arepa dumplings."
- **Qué pasa:**
  1. La publicación del restaurante en redes (lectura). Se aprende a describir platos.
  2. La chef explica el menú (escucha).
  3. **Minijuego: PartyPlan, versión menú** (reutilizado). Armar un menú de fusión equilibrado para la noche de apertura.
  4. **Charla sin respuestas malas** con Jhoana: el mejor y el peor plato que cada uno ha probado.
  5. **Duelo amistoso:** un crítico gastronómico exigente. Error típico: "a home-make soup" y "It's worth to try."
- **Recompensa:** atuendo "delantal de fusión" y monedas.

### Paws Debate (después del lugar 8)
- **Busuu:** 22 (bienestar animal: naturaleza, expresiones de contraste, documentales, distintas perspectivas, zoológicos y mascotas exóticas).
- **Lugar:** Lumen Paws, con **Nayi**, los perros **Zirius, Laica, Kitay, Fresas y Lupe** y los gatos **Moscú y Minus**.
- **Gramática:**
  - **Primera presentación de los conectores de contraste:** *whereas*, *while*, *however*, *on the other hand*. La Ventana 10 los profundiza.
  - ***both / neither / either*** (Murphy 89): "Both zoos and shelters…", "Neither option is perfect."
- **Qué pasa:**
  1. Un video corto de un documentalista de fauna (escucha).
  2. **Minijuego: Which Dog?** (reutilizado). Ahora las descripciones usan contraste: "Laica is calm, whereas Kitay never stops running."
  3. **Minijuego: DebateTalk.** ¿Los zoológicos protegen o encierran? ¿Se deberían tener animales exóticos como mascotas? Hay que reconocer la postura contraria antes de responder.
  4. **Duelo amistoso:** un vendedor de mascotas exóticas. Error típico: "Whereas zoos protect animals, but…" y "Neither of them are…" en un examen formal (se enseña "neither of them is" como la forma segura).
- **Recompensa:** atuendo "pañoleta de Lumen Paws" y monedas.

### A Year Abroad (después del lugar 12)
- **Busuu:** 23 (el inglés en el mundo: el inglés de Irlanda, servicios públicos, facturas, *rate* contra *fee*, pedir información, elegir un plan de pago).
- **Qué pasa:**
  1. Ms. Noor Haddad (B1) ofrece al grupo un semestre opcional de intercambio en **Galway, Irlanda**. Hay que preparar el viaje.
  2. **El inglés de Irlanda** (escucha). Un estudiante irlandés por videollamada: "grand" (bien), "the craic" (el ambiente, la diversión), "your man" (ese tipo), "giving out" (regañar).
  3. **Servicios públicos.** Contratar internet y luz para el piso de Galway:
     - *rate* (tarifa por unidad) contra *fee* (cobro fijo); bill, meter, direct debit, contract.
     - **Repaso de preguntas indirectas** (ficha 11): "Could you tell me what the monthly fee is?"
  4. **Minijuego: The Fine Print, versión factura** (reutilizado). Encontrar en la factura los cobros escondidos.
  5. **Minijuego: Text Only** (reutilizado). Chat con el proveedor para elegir un plan de pago.
  6. **Duelo amistoso:** un contador de luz corrompido. Error típico: "Can you tell me how much is the fee?" y "The fee per kilowatt" (ahí va *rate*).
- **Final:** el grupo decide dejar el viaje "para después de todo esto". Es un guiño a que la vida sigue después del final.
- **Recompensa:** atuendo "gorra de lana irlandesa" y monedas.

---

## Pendiente
1. Aprobar las fichas 0 a 14 y los tres Extras.
2. Al implementar, revisar que en A1 y A2 la firma "L" ya esté cambiada a "G" (rama feat/nombre-g).
