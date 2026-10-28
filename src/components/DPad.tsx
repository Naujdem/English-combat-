import { useEffect, useRef } from 'react'

type Dir = [number, number]

/** Cruceta táctil. Mantener presionado repite el movimiento. */
export function DPad({ onMove, disabled }: { onMove: (dx: number, dy: number) => void; disabled?: boolean }) {
  const timer = useRef<number | null>(null)
  const moveRef = useRef(onMove)
  moveRef.current = onMove

  function stop() {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }
  function start(d: Dir) {
    if (disabled) return
    stop()
    moveRef.current(d[0], d[1])
    timer.current = window.setInterval(() => moveRef.current(d[0], d[1]), 170)
  }
  useEffect(() => stop, [])
  useEffect(() => {
    if (disabled) stop()
  }, [disabled])

  const b =
    'flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-line bg-panel-2 text-paper active:scale-95 active:border-gold select-none touch-none'
  const arrow = (rot: number) => (
    <svg width="22" height="22" viewBox="0 0 24 24" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M12 5 L19 14 H5 Z" fill="currentColor" />
    </svg>
  )
  const props = (d: Dir, label: string) => ({
    className: b,
    'aria-label': label,
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault()
      start(d)
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  })

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1.5" style={{ gridTemplateColumns: 'repeat(3, 3.5rem)' }}>
      <span />
      <button {...props([0, -1], 'Arriba')}>{arrow(0)}</button>
      <span />
      <button {...props([-1, 0], 'Izquierda')}>{arrow(-90)}</button>
      <button {...props([0, 1], 'Abajo')}>{arrow(180)}</button>
      <button {...props([1, 0], 'Derecha')}>{arrow(90)}</button>
    </div>
  )
}
