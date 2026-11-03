import { btnPrimary } from './ui'

/** B1 · Recuerdo 1 todavía no jugable: pantalla negra con un destello de estática. No guarda nada. */
export function MemoryPlaceholder({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4" role="dialog" aria-label={title}>
      <div className="b1-static pointer-events-none absolute inset-0" />
      <div className="anim-fade-in relative w-full max-w-sm text-center">
        <p className="font-display text-xl text-[#d9c7f2]">{title} — próximamente</p>
        <button className={`${btnPrimary} mt-5 w-full`} onClick={onBack}>Volver al mapa</button>
      </div>
    </div>
  )
}
