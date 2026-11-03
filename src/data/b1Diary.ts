import type { DiaryChapter } from './diary'
import { memoryFlag } from '../game/memory'
import { closeId } from './b1World'

/**
 * Diario de B1: un capítulo por recuerdo, que se abre al salir de él (memoryFlag(n), game/memory.ts).
 * Cada capítulo tiene tu página ("Mi diario": la línea que escribes en el cierre de la misión), la página del "Diario de L"
 * (kind 'L': letra a mano, tachones y firma con una mancha de tinta, nunca con nombre) y una página mezclada que junta
 * los dos puntos de vista (como la "Mezcla" de A1 y A2). En las páginas de L, ~~texto~~ se ve tachado.
 * Va aparte de DIARY para no cambiar el logro "Querido diario" de A1 y A2.
 */
export const B1_DIARY: DiaryChapter[] = [
  {
    id: 'b1-memory-1',
    title: 'Recuerdo 1: The Accident',
    unlock: memoryFlag(1),
    words: [
      { title: 'El incendio', words: [['fire', 'incendio, fuego'], ['smoke', 'humo'], ['flames', 'llamas'], ['heat', 'calor'], ['fire alarm', 'alarma de incendio'], ['fire exit', 'salida de emergencia'], ['firefighters', 'bomberos'], ['burn', 'quemar, arder']] },
      { title: 'El cuerpo después', words: [['cough', 'toser, tos'], ['breathe', 'respirar'], ['throat', 'garganta'], ['hoarse', 'ronco'], ['injured', 'herido'], ['hurt', 'lastimado; doler'], ['exhausted', 'agotado']] },
      { title: 'Pedir ayuda', words: [['call for help', 'pedir ayuda'], ['get out', 'salir'], ['trapped', 'atrapado'], ['rescue', 'rescatar, rescate'], ['shout', 'gritar']] },
    ],
    versions: [
      {
        id: 'b1-memory-1-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'What I saw',
        unlock: closeId(1),
        frame: 'Lo escribes esa noche en tu cuarto, todavía con dolor de garganta, después de hablar con Leo.',
        lines: [{ en: "The man in the memory [lost]p his voice. The friend next to him... [didn't say]p a word.", es: 'El hombre del recuerdo perdió la voz. El amigo que estaba a su lado... no dijo ni una palabra.' }],
        questions: [],
      },
      {
        id: 'b1-memory-1-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'Night',
        frame: 'Una página de un cuaderno ajeno, escrita a mano. No tiene nombre.',
        lines: [
          { en: 'I [shouted]p until I [had]p no voice.', es: 'Grité hasta quedarme sin voz.' },
          { en: '~~I can~~ And my friend... [was]p silent.', es: 'Y mi amigo... estaba en silencio.' },
        ],
        questions: [],
      },
      {
        id: 'b1-memory-1-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One night, two voices',
        unlock: closeId(1),
        frame: 'Juntas tu página y la de L: lo que viste en el recuerdo y lo que él escribió. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'The man in the memory [was cleaning]p the board when the fire alarm [rang]p.', es: 'El hombre del recuerdo estaba limpiando la pizarra cuando sonó la alarma de incendio.' },
          { en: 'He [shouted]p, so everybody [got]p out.', es: 'Él gritó, así que todos salieron.' },
          { en: "Because of the smoke, he [lost]p his voice, so he [couldn't ask]p for help.", es: 'Por el humo perdió la voz, así que no pudo pedir ayuda.' },
          { en: 'His friend [was standing]p next to him... but he [was]p silent.', es: 'Su amigo estaba a su lado... pero se quedó en silencio.' },
        ],
        questions: [
          { q: 'Why did the man lose his voice?', options: ['Because of the smoke.', 'Because of the alarm.', 'Because he was tired.'], answer: 0, tip: 'El diario dice: "Because of the smoke, he lost his voice".' },
          { q: 'What was the man doing when the alarm rang?', options: ['He was cleaning the board.', 'He was waiting at the door.', 'He was walking home.'], answer: 0, tip: 'El diario dice: "was cleaning the board when the fire alarm rang".' },
          { q: 'Did his friend help him?', options: ["No, he didn't. He was silent.", 'Yes, he did. He shouted too.', "No, he wasn't. He was silent."], answer: 0, tip: 'Pregunta con did → respuesta con did: No, he didn\'t.' },
        ],
      },
    ],
  },
]
