import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btnPrimary } from './ui'

/**
 * PUNTO DE ENGANCHE de la animación de fragmentos de B1 (ficha 0.4).
 * Por ahora es solo un destello simple con el mensaje de sistema resaltado; la animación real
 * (los dos fragmentos se acercan, se unen, brillan y suena la estática) llega en la tarea 0-B:
 * basta con reemplazar el dibujo de este componente, sin cambiar sus props.
 * onDone se llama al tocar los fragmentos (ahí se guarda el progreso).
 */
export function FragmentJoinCue({ onDone }: { onDone: () => void }) {
  const [touched, setTouched] = useState(false)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4" role="dialog" aria-label="Dos fragmentos se juntaron">
      <div key={touched ? 'b' : 'a'} className="b1-cue-flash pointer-events-none absolute inset-0" />
      <div className="anim-fade-in relative w-full max-w-sm text-center">
        <svg viewBox="0 0 120 80" className="mx-auto h-24 w-36" aria-hidden="true">
          <g className="b1-cue-left"><path d="M30 20 L58 14 L54 36 L60 52 L34 62 Z" fill="#b48be8" /></g>
          <g className="b1-cue-right"><path d="M62 14 L90 22 L86 60 L62 54 L56 36 Z" fill="#d9c7f2" /></g>
        </svg>
        {!touched ? (
          <>
            <p className="mt-3 rounded-xl border-2 border-[#9b6ad6] bg-[#9b6ad6]/20 px-3 py-3 font-display text-lg text-[#e6d6ff]">Two fragments joined. They hold a memory... but it's not yours.</p>
            <p className="mt-1 text-sm text-paper/60">Dos fragmentos se juntaron. Guardan un recuerdo... pero no es tuyo.</p>
            <div className="mt-2 flex justify-center"><SpeakButton text="Two fragments joined. They hold a memory... but it's not yours." size="sm" /></div>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={() => setTouched(true)}>Tocarlos</button>
          </>
        ) : (
          <>
            <p className="mt-3 text-[17px] text-paper/90">(You touch them.)</p>
            <p className="mt-1 text-sm text-paper/60">(Los tocas.)</p>
            <button className={`${btnPrimary} mt-4 w-full`} onClick={onDone}>Volver al mapa</button>
          </>
        )}
      </div>
    </div>
  )
}
