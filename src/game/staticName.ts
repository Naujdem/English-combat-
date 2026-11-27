/**
 * Nombres con estática (B1): dentro de los recuerdos, los nombres propios no se oyen.
 * En los textos se escribe el marcador [[?]] donde iría el nombre: "Hey [[?]], how are you feeling?".
 * En pantalla se ve "▒▒▒" con un leve temblor (componente StaticText) y suena la estática la primera vez en cada línea.
 * La voz del juego no lo lee: lo cambia por una pausa breve.
 */
export const STATIC_NAME = '[[?]]'
export const STATIC_SHOWN = '▒▒▒'

/**
 * B2-14 · la revelación (b2-14-reveal): la estática se limpia en todo el juego. Todos los nombres con estática son de Leo
 * adulto / G, así que desde ese momento se ven como "García". App.tsx lo activa según la partida.
 */
export const REVEALED_NAME = 'García'
let revealed = false
export const setStaticRevealed = (v: boolean) => {
  revealed = v
}
export const isStaticRevealed = () => revealed
/** Cambia la estática ya dibujada (▒▒▒) y el marcador por el nombre real, si ya hubo revelación */
export const unStatic = (text: string) => (revealed ? text.split(STATIC_NAME).join(REVEALED_NAME).split(STATIC_SHOWN).join(REVEALED_NAME) : text)

export const hasStaticName = (text: string) => text.includes(STATIC_NAME)

/** Texto plano para mostrar sin componentes (títulos, tarjetas): el marcador se ve como ▒▒▒ */
export const staticPlain = (text: string) => unStatic(text).split(STATIC_NAME).join(STATIC_SHOWN)

/** Texto para la voz: el marcador (y un ▒▒▒ ya dibujado) se cambian por una pausa */
export const staticForSpeech = (text: string) => unStatic(text).split(STATIC_NAME).join(' ... ').replace(/▒+/g, ' ... ')
