import type { ReactNode } from 'react'

/**
 * Los 7 recuerdos de L en B1 (nodos 1, 3, 5, 7, 9, 11 y 13 del mapa) para la pestaña Mochila › Recuerdos.
 * summary: resumen de 4–6 líneas en español. art: ilustración SVG propia (si no hay, sale L de espaldas).
 * Cada misión de recuerdo rellena su resumen y, si quiere, su ilustración.
 */
export type B1Memory = { n: number; title: string; summary: string; art?: () => ReactNode }

export const B1_MEMORIES: B1Memory[] = [
  {
    n: 1,
    title: 'The Accident',
    summary: 'Un incendio en el edificio donde L daba clases de noche. L gritó para sacar a todos hasta quedarse sin voz. Un amigo, a su lado, no dijo nada.',
  },
  { n: 3, title: 'Words on a Screen', summary: 'L perdió la voz y los médicos dijeron que pasaría mucho tiempo sin hablar. Empezó a escribir mensajes a su amiga, a su director y a sus alumnos, y un cuaderno le ayudó a seguir enseñando sin voz.' },
  { n: 5, title: 'Nothing Left', summary: 'L perdió el trabajo y no pudo pagar su apartamento. Entre avisos de desalojo y cuentas del banco, recordó cómo era su vida antes de perder la voz. Al final, un mensaje de su amiga le pidió que no se rindiera, y L se quedó sin casa y sin dinero.' },
  { n: 7, title: 'The Underworld', summary: 'Sin trabajo ni dinero, L leyó en las noticias sobre unos científicos y su aparato. Entró al mercado negro del bajo mundo, siguió las pistas y, tras vencer a The Broker, robó el aparato.' },
  { n: 9, title: 'Temples of Stones and Time', summary: 'L viajó por valles y templos buscando respuestas. En el Temple of Stones y el Temple of Time despertó inscripciones antiguas y venció al Keeper of Hours. Con el reloj y el aparato, supo que podía volver al pasado.' },
  { n: 11, title: 'The First Journey', summary: 'L usó el reloj por primera vez para volver a la noche del incendio. Lo intentó todo —la alarma, la puerta, los bomberos—, pero el fuego empezó siempre. En el Temple of Roads, las piedras le dijeron que un hecho fijo no puede cambiarse, y que una voz sí puede quitarse.' },
  { n: 13, title: 'The Price', summary: 'En el Temple of Echoes, L descubrió el precio del aparato: no crea una voz, la toma de alguien. La rabia lo consumió y decidió culpar a su {h:amigo|amiga}. Viajó a 2056, miró por la ventana la clase de un profesor y escribió su plan; a la mañana siguiente se acercó a {h:un estudiante nuevo|una estudiante nueva} en su primer día de escuela.' },
]
