import { TextCommand, type TextCommandRoom } from './TextCommand'

/**
 * Unheard (B2, ficha 0.7): dentro de una Ventana, lograr metas SIN voz.
 * Cada paso se resuelve escribiendo una orden para mover un objeto ("Turn on the emergency lights")
 * o una nota que alguien lee ("Use the back stairs"). La revisión es la de The Moving Stone escrito
 * (components/TextCommand.tsx, game/command.ts): mismas ayudas (pista al 2.º error, letras ocultas al 3.º).
 */
export function Unheard({ place, room, onClose }: { place: string; room: TextCommandRoom; onClose: (done: boolean, perfect: boolean) => void }) {
  return (
    <div>
      <div className="mb-2 rounded-xl border border-[#3fa9ff]/50 bg-[#0e1d30] px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8fcbff]">Unheard · nadie te oye</p>
        <p className="mt-1 text-sm text-paper/75">
          Aquí no tienes voz. Escribe una <b>orden</b> para mover algo o una <b>nota</b> que alguien pueda leer.
        </p>
      </div>
      <TextCommand name={place} room={room} onClose={onClose} />
    </div>
  )
}
