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
  { n: 5, title: 'Nothing Left', summary: '(pendiente)' },
  { n: 7, title: 'The Underworld', summary: '(pendiente)' },
  { n: 9, title: 'Temples of Stones and Time', summary: '(pendiente)' },
  { n: 11, title: 'The First Journey', summary: '(pendiente)' },
  { n: 13, title: 'The Price', summary: '(pendiente)' },
]
