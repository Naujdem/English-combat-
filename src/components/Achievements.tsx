import { useState } from 'react'
import type { GameState } from '../game/types'
import { btnGhost, Overlay, Panel } from './ui'
import { SpriteIcon } from './Sprite'
import { AnimalIcon } from './Animals'
import { ENEMIES } from '../data/enemies'
import { NPCS } from '../data/npcs'
import { FRIENDS } from '../data/friends'
import { OUTFITS } from '../data/school'
import { ACHIEVEMENTS, ALBUM, ALBUM_SLOTS, achieved, albumCount, type AlbumSlot, type Era, type PortraitSrc } from '../data/collection'

const ERA_COLOR: Record<Era, string> = { Pasado: '#c98b4a', Presente: '#3b9d5d', Futuro: '#5d8fd4', Viajero: '#a46fd0' }
const ERA_LABEL: Record<Era, string> = { Pasado: '1996', Presente: 'Hoy', Futuro: '2056', Viajero: 'Viajero' }

function Portrait({ src, state, locked, size = 44 }: { src: PortraitSrc; state: GameState; locked: boolean; size?: number }) {
  if ('enemy' in src) {
    const e = ENEMIES[src.enemy]
    if (e.animal) return <AnimalIcon kind={e.animal} size={size} dim={locked} />
    const look = e.id === 'barrio-boss' || e.id === 'barrio-future-boss' ? { ...e.look, skin: state.hero.look.skin, hair: e.id === 'barrio-boss' ? state.hero.look.hair : e.look.hair } : e.look
    return <Look look={look} locked={locked} size={size} />
  }
  if ('npc' in src) return <Look look={NPCS[src.npc].look} locked={locked} size={size} />
  return <Look look={FRIENDS[src.friend].look} locked={locked} size={size} />
}

function Look({ look, locked, size }: { look: Parameters<typeof SpriteIcon>[0]['look']; locked: boolean; size: number }) {
  const dark = '#3a342c'
  return <SpriteIcon look={locked ? { ...look, shirt: dark, hair: dark, skin: '#4a4238', accessory: undefined } : look} size={size} />
}

/** Logros y álbum del tiempo: motivos para hacer lo opcional */
export function Achievements({ state, onClose }: { state: GameState; onClose: () => void }) {
  const [tab, setTab] = useState<'logros' | 'album'>('logros')
  const [picked, setPicked] = useState<{ card: string; slot: AlbumSlot } | null>(null)
  const done = ACHIEVEMENTS.filter((a) => achieved(a, state)).length
  const filled = albumCount(state)

  return (
    <Overlay onClose={onClose}>
      <Panel className="max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="font-display text-xl text-gold">Logros y álbum</p>
          <button className={btnGhost} onClick={onClose}>Cerrar</button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2" role="tablist">
          {(['logros', 'album'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={`rounded-xl border-2 px-3 py-2 font-display text-[15px] ${tab === t ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/75'}`}
              onClick={() => setTab(t)}
            >
              {t === 'logros' ? `Logros ${done}/${ACHIEVEMENTS.length}` : `Álbum ${filled}/${ALBUM_SLOTS}`}
            </button>
          ))}
        </div>

        {tab === 'logros' && (
          <ul className="mt-3 grid gap-2">
            {ACHIEVEMENTS.map((a) => {
              const [c, g] = a.progress(state)
              const ok = c >= g
              return (
                <li key={a.id} className={`rounded-xl border-2 px-3 py-2 ${ok ? 'border-gold/70 bg-gold/10' : 'border-line'}`}>
                  <div className="flex items-start gap-2">
                    <span className={`mt-0.5 text-lg ${ok ? 'text-gold' : 'text-paper/30'}`} aria-hidden="true">{ok ? '★' : '☆'}</span>
                    <div className="flex-1">
                      <p className={`font-display text-[16px] ${ok ? 'text-gold' : 'text-paper'}`}>{a.name}</p>
                      <p className="text-sm text-paper/65">{a.desc}</p>
                      {a.reward && <p className="mt-0.5 text-xs text-paper/55">Premio: {OUTFITS[a.reward].name}</p>}
                      {!ok && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel-2">
                            <div className="h-full rounded-full bg-gold/70" style={{ width: `${Math.round((c / g) * 100)}%` }} />
                          </div>
                          <span className="text-xs text-paper/60">{c}/{g}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {tab === 'album' && (
          <>
            <p className="mt-3 text-sm text-paper/70">
              Cada personaje en cada época. Los espacios <span style={{ color: ERA_COLOR.Viajero }}>morados</span> son los viajeros que la luz del reloj arrastró a otra época: véncelos para llenarlos. Toca un espacio para ver dónde se consigue.
            </p>
            {picked && (
              <div className="anim-fade-in sticky top-0 z-10 mt-2 rounded-xl border-2 border-line bg-panel-2 px-3 py-2 text-sm">
                {picked.slot.unlock(state) ? (
                  <p><b className="text-gold">{picked.slot.label}</b> · {ERA_LABEL[picked.slot.era]}</p>
                ) : (
                  <p><b className="text-paper/80">???</b> · {ERA_LABEL[picked.slot.era]} · <span className="text-paper/65">{picked.slot.hint}</span></p>
                )}
              </div>
            )}
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {ALBUM.map((card) => {
                const have = card.slots.filter((x) => x.unlock(state)).length
                const full = have === card.slots.length
                return (
                  <li key={card.id} className={`rounded-xl border-2 px-2.5 py-2 ${full ? 'border-gold/70' : 'border-line'}`}>
                    <p className={`font-display text-[15px] ${full ? 'text-gold' : 'text-paper'}`}>
                      {have > 0 ? card.name : '???'} <span className="text-xs text-paper/50">{have}/{card.slots.length}{full ? ' ★' : ''}</span>
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {card.slots.map((slot) => {
                        const open = slot.unlock(state)
                        return (
                          <button
                            key={slot.label}
                            className="flex flex-col items-center rounded-lg border-2 px-1 pb-0.5"
                            style={{ borderColor: open ? ERA_COLOR[slot.era] : 'rgba(255,255,255,0.12)' }}
                            onClick={() => setPicked({ card: card.id, slot })}
                            aria-label={open ? `${slot.label}, ${ERA_LABEL[slot.era]}` : `Sin descubrir, ${ERA_LABEL[slot.era]}`}
                          >
                            <Portrait src={slot.src} state={state} locked={!open} />
                            <span className="text-[10px] font-semibold" style={{ color: ERA_COLOR[slot.era] }}>{ERA_LABEL[slot.era]}</span>
                          </button>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </Panel>
    </Overlay>
  )
}
