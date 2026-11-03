/**
 * Nombres con estática (B1): dentro de los recuerdos, los nombres propios no se oyen.
 * En los textos se escribe el marcador [[?]] donde iría el nombre: "Hey [[?]], how are you feeling?".
 * En pantalla se ve "▒▒▒" con un leve temblor (componente StaticText) y suena la estática la primera vez en cada línea.
 * La voz del juego no lo lee: lo cambia por una pausa breve.
 */
export const STATIC_NAME = '[[?]]'
export const STATIC_SHOWN = '▒▒▒'

export const hasStaticName = (text: string) => text.includes(STATIC_NAME)

/** Texto plano para mostrar sin componentes (títulos, tarjetas): el marcador se ve como ▒▒▒ */
export const staticPlain = (text: string) => text.split(STATIC_NAME).join(STATIC_SHOWN)

/** Texto para la voz: el marcador (y un ▒▒▒ ya dibujado) se cambian por una pausa */
export const staticForSpeech = (text: string) => text.split(STATIC_NAME).join(' ... ').replace(/▒+/g, ' ... ')
