import type { GameState } from '../game/types'
import { allFriends } from '../game/helpers'
import { TOPICS } from '../data/questions'
import { FRIEND_REWARDS } from '../game/social'
import { SpriteIcon } from './Sprite'
import { btnGhost, Overlay, Panel } from './ui'

export function FriendsPanel({ state, onClose }: { state: GameState; onClose: () => void }) {
  return (
    <Overlay onClose={onClose}>
      <Panel className="max-h-[80vh] overflow-y-auto">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl">Amigos</h2>
          <button className={btnGhost} onClick={onClose}>Cerrar</button>
        </div>
        <ul className="grid gap-3">
          {allFriends(state).map((f) => {
            const met = f.id in state.friendship
            const level = state.friendship[f.id] ?? 0
            const total = f.conversations.length
            const next = f.conversations[level]
            const locked = next?.requires && !state.recovered.includes(next.requires) ? TOPICS[next.requires] : null
            const reward = FRIEND_REWARDS[f.id]
            return (
              <li key={f.id} className="rounded-xl border border-line bg-panel-2 p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-black/25 p-0.5">
                    <SpriteIcon look={met ? f.look : { ...f.look, shirt: '#3a352e', hair: '#2a2622', skin: '#3a352e' }} size={48} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight">{met ? f.name : '???'}</p>
                    <p className="text-xs text-paper/55">{met ? f.theme : 'Todavía no se conocen'}</p>
                    <div className="mt-1.5 flex gap-1" aria-label={`Amistad ${level} de ${total}`}>
                      {Array.from({ length: total }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 flex-1 rounded-full ${i < level ? 'bg-gold' : 'bg-black/35'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {met && locked && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-paper/70">
                    <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true" className="mt-0.5 shrink-0">
                      <rect x="1" y="6" width="10" height="7.5" rx="1.5" fill="#e0a526" />
                      <path d="M3 6 V4 a3 3 0 0 1 6 0 V6" fill="none" stroke="#e0a526" strokeWidth="1.6" />
                    </svg>
                    <span>
                      Recupera "{locked.name}" ({locked.level}) para seguir hablando con {f.name}.
                    </span>
                  </p>
                )}
                {met && !locked && next && <p className="mt-2 text-xs text-gold/90">Tiene algo que contarte.</p>}
                {met && reward && level >= 1 && <p className="mt-1 text-xs text-hp">{reward[1]}</p>}
              </li>
            )
          })}
        </ul>
      </Panel>
    </Overlay>
  )
}
