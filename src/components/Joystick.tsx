import { useEffect, useRef, useState } from 'react'

/**
 * Joystick táctil: se arrastra el botón central hacia una dirección.
 * Mientras se mantiene, el personaje sigue caminando hacia allá.
 */
export function Joystick({ onMove, disabled }: { onMove: (dx: number, dy: number) => void; disabled?: boolean }) {
  const SIZE = 120
  const R = 36
  const base = useRef<HTMLDivElement>(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const dir = useRef<[number, number] | null>(null)
  const timer = useRef<number | null>(null)
  const moveRef = useRef(onMove)
  moveRef.current = onMove

  function stopRepeat() {
    if (timer.current !== null) window.clearInterval(timer.current)
    timer.current = null
  }
  function release() {
    stopRepeat()
    dir.current = null
    setKnob({ x: 0, y: 0 })
  }
  useEffect(() => release, [])
  useEffect(() => {
    if (disabled) release()
  }, [disabled])

  function track(e: React.PointerEvent) {
    if (disabled || !base.current) return
    const r = base.current.getBoundingClientRect()
    let dx = e.clientX - (r.left + r.width / 2)
    let dy = e.clientY - (r.top + r.height / 2)
    const dist = Math.hypot(dx, dy)
    if (dist > R) {
      dx = (dx / dist) * R
      dy = (dy / dist) * R
    }
    setKnob({ x: dx, y: dy })
    // Zona muerta en el centro; fuera de ella gana el eje más fuerte
    const next: [number, number] | null = dist < 16 ? null : Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]
    const same = next && dir.current && next[0] === dir.current[0] && next[1] === dir.current[1]
    if (same) return
    stopRepeat()
    dir.current = next
    if (next) {
      moveRef.current(next[0], next[1])
      timer.current = window.setInterval(() => dir.current && moveRef.current(dir.current[0], dir.current[1]), 170)
    }
  }

  return (
    <div
      ref={base}
      role="application"
      aria-label="Joystick: arrastra para caminar"
      className="relative touch-none select-none rounded-full border-2 border-line bg-panel-2"
      style={{ width: SIZE, height: SIZE }}
      onPointerDown={(e) => {
        e.preventDefault()
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
        track(e)
      }}
      onPointerMove={(e) => e.buttons && track(e)}
      onPointerUp={release}
      onPointerCancel={release}
      onContextMenu={(e) => e.preventDefault()}
    >
      {[0, 90, 180, 270].map((rot) => (
        <svg key={rot} width="14" height="14" viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 text-paper/40" style={{ transform: `translate(-50%, -50%) rotate(${rot}deg) translateY(-${SIZE / 2 - 14}px)` }} aria-hidden="true">
          <path d="M12 5 L19 14 H5 Z" fill="currentColor" />
        </svg>
      ))}
      <div
        className="absolute left-1/2 top-1/2 h-14 w-14 rounded-full border-2 border-gold bg-gold/30 shadow-lg"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))`, transition: knob.x || knob.y ? 'none' : 'transform 120ms ease-out' }}
      />
    </div>
  )
}
