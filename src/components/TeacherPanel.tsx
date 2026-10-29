import { useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { PRESETS, setTeacher, skipLessons, useTeacher } from '../game/teacher'
import { SCENES } from '../game/helpers'
import { walkable } from './Tiles'
import { ENEMIES } from '../data/enemies'
import { NPCS } from '../data/npcs'
import { btn, btnGhost, Overlay, Panel } from './ui'

/** Botón flotante y panel del modo profesor */
export function TeacherPanel({ state, update }: { state: GameState; update: Update }) {
  const t = useTeacher()
  const [open, setOpen] = useState(false)
  if (!t.on) return null

  const scene = SCENES[state.sceneId]
  const go = (fn: (s: GameState) => GameState) => {
    update(fn)
    setOpen(false)
  }

  /** Casilla libre al lado de un personaje, para aparecer junto a él */
  function beside(x: number, y: number) {
    for (const [dx, dy] of [[0, 1], [-1, 0], [1, 0], [0, -1]]) {
      const c = scene.map[y + dy]?.[x + dx]
      const taken = scene.entities.some((e) => e.x === x + dx && e.y === y + dy)
      if (c && walkable(c, true) && !taken) return { x: x + dx, y: y + dy }
    }
    return null
  }

  const people = scene.entities
    .filter((e) => e.type !== 'chest' && e.type !== 'animal')
    .map((e) => {
      const name =
        e.type === 'enemy' || e.type === 'boss' ? ENEMIES[e.id].person : e.type === 'npc' ? NPCS[e.id].name : e.type === 'friend' ? e.id[0].toUpperCase() + e.id.slice(1) : state.interest.name
      return { name, pos: beside(e.x, e.y) }
    })
    .filter((p) => p.pos)

  return (
    <>
      <button
        className="absolute bottom-1 left-1/2 z-50 -translate-x-1/2 rounded-full border border-gold/60 bg-ink/90 px-3 py-0.5 text-[11px] font-semibold text-gold"
        onClick={() => setOpen(true)}
      >
        Profe
      </button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <Panel className="max-h-[85vh] overflow-y-auto">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xl text-gold">Modo profesor</p>
              <button className={btnGhost} onClick={() => setOpen(false)}>Cerrar</button>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-paper/55">Ayudas</p>
            <div className="mt-1 grid gap-2">
              <label className="flex items-center justify-between rounded-xl border-2 border-line px-3 py-2 text-[15px]">
                Mostrar la respuesta correcta en los combates
                <input type="checkbox" checked={t.answers} onChange={(e) => setTeacher({ answers: e.target.checked })} className="h-5 w-5 accent-[#e0a526]" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => go(skipLessons)}>Saltar lecciones</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, maxHp: 20, hp: 20 }))}>Vida 20</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, hp: s.maxHp }))}>Llenar vida</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, items: { ...s.items, shield: 2 } }))}>2 escudos</button>
              </div>
              <p className="text-xs text-paper/55">En combate aparece un botón "Ganar (profe)" para saltar el combate.</p>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">Saltar a</p>
            <div className="mt-1 grid gap-2">
              {PRESETS.map((p) => (
                <button key={p.id} className={`${btn} text-left text-sm`} onClick={() => go(p.apply)}>{p.label}</button>
              ))}
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, battle: null, screen: 'world' }))}>Mapa del mundo</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, battle: null, screen: 'title' }))}>Pantalla de inicio</button>
              </div>
            </div>

            {state.screen === 'explore' && people.length > 0 && (
              <>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">Aparecer junto a</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {people.map((p) => (
                    <button key={p.name} className="rounded-full border border-line bg-panel-2 px-3 py-1 text-sm" onClick={() => go((s) => ({ ...s, pos: p.pos! }))}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button className={`${btnGhost} mt-5 w-full text-sm text-[#f3b0b0]`} onClick={() => { setTeacher({ on: false, answers: false }); setOpen(false) }}>
              Desactivar modo profesor
            </button>
          </Panel>
        </Overlay>
      )}
    </>
  )
}
