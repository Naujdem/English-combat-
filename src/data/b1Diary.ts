import type { DiaryChapter } from './diary'
import { memoryFlag } from '../game/memory'

/**
 * Diario de B1: un capítulo por recuerdo, que se abre al salir de él (memoryFlag(n), game/memory.ts).
 * Cada capítulo tiene tu página ("Mi diario": la línea que escribes al despertar) y la página del "Diario de L"
 * (kind 'L': letra a mano, tachones y firma con una mancha de tinta, nunca con nombre).
 * En las páginas de L, ~~texto~~ se ve tachado. Las misiones rellenan sus capítulos; por ahora solo hay uno de prueba.
 * Va aparte de DIARY para no cambiar el logro "Querido diario" de A1 y A2.
 */
export const B1_DIARY: DiaryChapter[] = [
  {
    id: 'b1-memory-1',
    title: 'Recuerdo 1: The Accident (prueba)',
    unlock: memoryFlag(1),
    words: [],
    versions: [
      {
        id: 'b1-memory-1-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'What I saw',
        frame: 'Lo escribes al despertar, todavía con dolor de garganta. (Página de prueba: la misión 1 pondrá aquí su línea).',
        lines: [{ en: "The man in the memory [lost]p his voice. The friend next to him... [didn't say]p a word.", es: 'El hombre del recuerdo perdió la voz. El amigo que estaba a su lado... no dijo ni una palabra.' }],
        questions: [],
      },
      {
        id: 'b1-memory-1-l',
        kind: 'L',
        tense: 'p',
        tab: 'Diario de L',
        title: 'Night',
        frame: 'Una página de un cuaderno ajeno, escrita a mano. No tiene nombre. (Página de prueba).',
        lines: [
          { en: 'I [shouted]p until I [had]p no voice.', es: 'Grité hasta quedarme sin voz.' },
          { en: '~~I can~~ And my friend... [was]p silent.', es: 'Y mi amigo... estaba en silencio.' },
        ],
        questions: [],
      },
    ],
  },
]
