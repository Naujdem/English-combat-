import type { FinePrintContent } from '../components/FinePrint'

/**
 * B1-04 · bloque A: The Fine Print (components/FinePrint.tsx). Maya y el jugador leen el contrato de la residencia
 * y sellan cada cláusula: MUST (obligatorio), MUSTN'T (prohibido) o NOT NECESSARY (no es obligatorio).
 * Tarea 'b1-04-fineprint' en data/tasks.ts.
 */
export const B1_04_FINE_PRINT: FinePrintContent = {
  title: 'The Fine Print',
  intro: { en: 'Read every line. What is a must? What is forbidden? What is not necessary?', es: 'Lee cada línea. ¿Qué es obligatorio? ¿Qué está prohibido? ¿Qué no es necesario?' },
  clauses: [
    { en: 'You must pay the rent by the 5th.', es: 'Debes pagar el alquiler antes del día 5.', kind: 'must', tip: 'Pagar el alquiler es una obligación: must.' },
    { en: 'You have to show your student ID at the door.', es: 'Tienes que mostrar tu carné de estudiante en la puerta.', kind: 'must', tip: 'have to = es necesario.' },
    { en: "You mustn't smoke in the rooms.", es: 'No puedes fumar en los cuartos.', kind: 'mustnt', tip: "mustn't = prohibido." },
    { en: "You don't have to clean the kitchen. Marisol does it.", es: 'No tienes que limpiar la cocina. Marisol lo hace.', kind: 'optional', tip: "don't have to = no es obligatorio." },
    { en: "You mustn't make noise after ten at night.", es: 'No puedes hacer ruido después de las diez de la noche.', kind: 'mustnt', tip: "mustn't = prohibido." },
    { en: 'You have to keep your key in a safe place.', es: 'Tienes que guardar tu llave en un lugar seguro.', kind: 'must', tip: 'have to = es necesario.' },
    { en: "You don't have to pay the bills. They are included.", es: 'No tienes que pagar las cuentas. Están incluidas.', kind: 'optional', tip: 'No es necesario: las cuentas están incluidas.' },
    { en: "You mustn't open the door to strangers.", es: 'No puedes abrirles la puerta a desconocidos.', kind: 'mustnt', tip: "mustn't = prohibido." },
    { en: "You needn't tell Marisol if you go out.", es: 'No necesitas avisarle a Marisol si sales.', kind: 'optional', tip: "needn't = no es necesario." },
    { en: 'You must take out the rubbish on Fridays.', es: 'Debes sacar la basura los viernes.', kind: 'must', tip: 'Es una obligación: must.' },
  ],
  finish: { en: 'Now you know the rules of the house.', es: 'Ahora conoces las reglas de la casa.' },
}
