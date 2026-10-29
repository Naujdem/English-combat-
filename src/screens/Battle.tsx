import { useMemo, useState } from 'react'
import { mixed } from '../game/mix'
import { voiceOf } from '../game/speech'
import type { GameState, Question, TopicId, Zone } from '../game/types'
import type { Update } from '../game/store'
import { OUTFITS } from '../data/school'
import { ENEMIES } from '../data/enemies'
import { pickQuestion, questionById, TOPICS } from '../data/questions'
import { QuestionCard, correctSentence } from '../components/QuestionCard'
import { GrammarPattern, RoleSentence } from '../components/Grammar'
import { Practice } from '../components/Practice'
import { Tappable } from '../components/Words'
import { sessionFor } from '../data/schedule'
import { SpeakButton } from '../components/SpeakButton'
import { SCENES, heroLook, perks, recordAnswer } from '../game/helpers'
import { sfx } from '../game/sfx'
import { SpriteBody } from '../components/Sprite'
import { Bar, btnGhost, btnPrimary, Hearts, Panel } from '../components/ui'
import { TimeClock } from '../components/TimeClock'
import { PRESENT_NODES } from '../data/world'
import { useTeacher } from '../game/teacher'
import { AnimalSprite } from '../components/Animals'


function Backdrop({ zone }: { zone: Zone }) {
  const wall =
    zone === 'cima-torre' ? '#9fd3f0' : zone === 'lobby-torre' ? '#dce9f4' : zone === 'oficina-torre' ? '#e4eef5' : zone === 'sala-torre' ? '#e6e3f2' : zone === 'calle-futuro' ? '#cfe9f5' : zone === 'turismo-futuro' ? '#dce9f4' : zone === 'aula-futuro' || zone === 'direccion-futuro' ? '#e4eef5' : zone === 'patio-futuro' ? '#cfe9f5' : zone === 'sala-cine' ? '#2b1d24' : zone === 'vestibulo' ? '#8a2830' : zone === 'oficina-cine' ? '#d8c2a0' : zone === 'campo-viejo' ? '#cfe6f2' : zone === 'granero-viejo' ? '#b5523b' : zone === 'casa-vieja' ? '#e6d0a8' : zone === 'obra' ? '#cfe6f2' : zone === 'casa-nueva' ? '#e8d3b0' : zone === 'caseta' ? '#b89a70' : zone === 'calle-vieja' || zone === 'mercado' ? '#cfe6f2' : zone === 'tienda-vieja' ? '#c9a46a' : zone === 'correo' ? '#d9cdb4' : zone === 'aula-vieja' || zone === 'direccion-vieja' ? '#a4553a' : zone === 'patio-viejo' ? '#d9c9a0' : zone === 'recepcion' || zone === 'oficina' ? '#e8ecf0' : zone === 'reuniones' ? '#ece6f4' : zone === 'direccion' ? '#f1e6d2' : zone === 'patio' || zone === 'calle' || zone === 'parque' || zone === 'campo' || zone === 'corral' ? '#bfe3f5' : zone === 'granero' ? '#b5523b' : zone === 'casa-granja' ? '#efd9b8' : zone === 'casa-leo' ? '#f3e2c4' : zone === 'casa-maya' ? '#dde6f4' : zone === 'casa' ? '#f1d9c0' : zone === 'bano' ? '#dfeef2' : zone === 'sala' ? '#e6dcef' : zone === 'tienda' ? '#f1e6f4' : zone === 'turismo' ? '#dfeaf3' : '#efe5d3'
  const ground = zone === 'cima-torre' ? '#5a6672' : zone === 'lobby-torre' ? '#b8c8d6' : zone === 'oficina-torre' ? '#9aa6b2' : zone === 'sala-torre' ? '#a99cc0' : zone === 'calle-futuro' ? '#9aa6b2' : zone === 'turismo-futuro' ? '#b8c8d6' : zone === 'aula-futuro' || zone === 'direccion-futuro' ? '#b8c8d6' : zone === 'patio-futuro' ? '#9fcf8a' : zone === 'sala-cine' ? '#5a3a4a' : zone === 'vestibulo' ? '#c9a77a' : zone === 'oficina-cine' ? '#8b6a46' : zone === 'campo-viejo' ? '#a9c47e' : zone === 'granero-viejo' ? '#d9bd85' : zone === 'casa-vieja' ? '#a8743f' : zone === 'obra' ? '#c9b48a' : zone === 'casa-nueva' ? '#a8743f' : zone === 'caseta' ? '#8b6a46' : zone === 'calle-vieja' || zone === 'mercado' ? '#b8946a' : zone === 'tienda-vieja' ? '#8b5a2b' : zone === 'correo' ? '#9c7a52' : zone === 'aula-vieja' || zone === 'direccion-vieja' ? '#8b5a2b' : zone === 'patio-viejo' ? '#c2a878' : zone === 'recepcion' || zone === 'oficina' ? '#9aa6b2' : zone === 'reuniones' ? '#a99cc0' : zone === 'direccion' ? '#8b5a2b' : zone === 'campo' ? '#9cc46e' : zone === 'corral' ? '#c9a46a' : zone === 'granero' ? '#dcc08a' : zone === 'casa-granja' ? '#b98c5a' : zone === 'patio' || zone === 'parque' ? '#8fbf6a' : zone === 'casa-leo' || zone === 'casa' ? '#b98c5a' : zone === 'casa-maya' ? '#a7b4c8' : zone === 'calle' ? '#b9b4ab' : zone === 'bano' ? '#b8d3dc' : zone === 'sala' ? '#b8a7c6' : zone === 'tienda' ? '#cdb8d6' : zone === 'turismo' ? '#9fb3c6' : '#b98c5a'
  return (
    <g>
      <rect width="360" height="150" fill={wall} />
      <rect y="150" width="360" height="70" fill={ground} />
      <line x1="0" y1="172" x2="360" y2="172" stroke="rgba(0,0,0,0.1)" />
      <line x1="0" y1="198" x2="360" y2="198" stroke="rgba(0,0,0,0.1)" />
      {zone === 'patio' && (
        <>
          <circle cx="310" cy="38" r="20" fill="#f6d36b" />
          <ellipse cx="90" cy="40" rx="34" ry="12" fill="#ffffff" opacity="0.85" />
          <ellipse cx="200" cy="28" rx="26" ry="9" fill="#ffffff" opacity="0.8" />
          <rect x="0" y="118" width="360" height="32" fill="#7aa95a" />
          <rect x="140" y="80" width="90" height="70" fill="none" stroke="#f4efe4" strokeWidth="5" />
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1="143" y1={92 + k * 14} x2="227" y2={92 + k * 14} stroke="#f4efe4" strokeOpacity="0.5" />
          ))}
          <rect x="22" y="92" width="10" height="40" fill="#7a5230" />
          <circle cx="27" cy="80" r="26" fill="#3b8a3e" />
          <circle cx="250" cy="196" r="9" fill="#ffffff" stroke="#2d2d3a" strokeWidth="1.5" />
        </>
      )}
      {zone === 'calle' && (
        <>
          {[[0, 40, '#c98b4a'], [70, 20, '#8a9bb0'], [150, 50, '#d4a373'], [230, 30, '#9b7fb0'], [300, 45, '#c0504d']].map(([x, y, c]) => (
            <g key={x as number}>
              <rect x={x as number} y={y as number} width="62" height={150 - (y as number)} fill={c as string} />
              {[0, 1, 2].map((r) => [0, 1].map((k) => (
                <rect key={`${r}-${k}`} x={(x as number) + 10 + k * 26} y={(y as number) + 12 + r * 26} width="16" height="16" fill="#e8f2f8" opacity="0.85" />
              )))}
            </g>
          ))}
          <rect y="140" width="360" height="12" fill="#8d8d8d" />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={10 + k * 62} y="182" width="34" height="5" fill="#f2d16b" opacity="0.8" />)}
        </>
      )}
      {zone === 'parque' && (
        <>
          <ellipse cx="90" cy="40" rx="34" ry="12" fill="#ffffff" opacity="0.85" />
          <circle cx="310" cy="38" r="18" fill="#f6d36b" />
          {[30, 250].map((x) => (
            <g key={x}>
              <rect x={x + 26} y="90" width="12" height="62" fill="#7a5230" />
              <circle cx={x + 32} cy="80" r="34" fill="#3b8a3e" />
            </g>
          ))}
          <rect x="140" y="112" width="80" height="10" rx="2" fill="#f4efe4" />
          <rect x="146" y="100" width="22" height="14" rx="2" fill="#e88aa8" />
          <rect x="180" y="102" width="14" height="12" fill="#2f6fd0" />
          <rect x="146" y="122" width="4" height="28" fill="#8d7c68" />
          <rect x="210" y="122" width="4" height="28" fill="#8d7c68" />
          {['#d64545', '#e0a526', '#3b9d5d'].map((c, k) => (
            <path key={c} d={`M${150 + k * 22} 30 l10 0 l-5 9 z`} fill={c} />
          ))}
          <line x1="140" y1="30" x2="216" y2="30" stroke="#8d7c68" />
        </>
      )}
      {(zone === 'casa-leo' || zone === 'casa-maya' || zone === 'casa') && (
        <>
          <rect x="30" y="24" width="60" height="56" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <rect x="150" y="30" width="56" height="42" rx="3" fill={zone === 'casa' ? '#f4efe4' : '#e8dcc8'} stroke="#7a5230" strokeWidth="4" />
          <circle cx="170" cy="48" r="7" fill="#e0ac69" />
          <circle cx="188" cy="50" r="6" fill="#f1c27d" />
          <rect x="160" y="56" width="36" height="12" rx="3" fill={zone === 'casa' ? '#3a3a5a' : '#d4537e'} />
          <rect x="240" y="96" width="100" height="46" rx="8" fill={zone === 'casa-maya' ? '#5b7a99' : '#b5523b'} />
          <rect x="240" y="86" width="100" height="18" rx="6" fill={zone === 'casa-maya' ? '#6f8fae' : '#c8664e'} />
          {zone === 'casa-maya' && [0, 1, 2, 3].map((k) => <rect key={k} x={40 + k * 14} y="98" width="10" height="44" fill={['#d64545', '#2f6fd0', '#e0a526', '#3b9d5d'][k]} />)}
        </>
      )}
      {(zone === 'campo' || zone === 'corral') && (
        <>
          <circle cx="300" cy="36" r="18" fill="#f6d36b" />
          <ellipse cx="90" cy="38" rx="32" ry="11" fill="#ffffff" opacity="0.85" />
          <path d="M0 150 Q90 112 180 140 T360 128 V150 Z" fill="#7fae5a" />
          <rect x="230" y="70" width="80" height="62" fill="#b5523b" />
          <polygon points="222,72 270,40 318,72" fill="#8b3a2b" />
          <rect x="258" y="96" width="24" height="36" fill="#f4efe4" />
          <path d="M258 96 l24 36 M282 96 l-24 36" stroke="#b5523b" strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} x={10 + k * 28} y="122" width="5" height="30" fill="#a8743f" />)}
          <rect x="8" y="128" width="190" height="4" fill="#a8743f" />
          <rect x="8" y="140" width="190" height="4" fill="#a8743f" />
        </>
      )}
      {zone === 'granero' && (
        <>
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={k * 60} y="0" width="4" height="150" fill="#8b3a2b" />)}
          <rect x="30" y="96" width="90" height="40" rx="4" fill="#e8c95a" />
          <rect x="60" y="66" width="70" height="34" rx="4" fill="#e8c95a" />
          <line x1="30" y1="116" x2="120" y2="116" stroke="#c9a83a" strokeWidth="2" />
          <rect x="240" y="40" width="70" height="50" fill="#5a3a1a" />
          <circle cx="275" cy="65" r="14" fill="#f6d36b" opacity="0.6" />
        </>
      )}
      {zone === 'casa-granja' && (
        <>
          <rect x="30" y="24" width="56" height="50" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <rect x="140" y="30" width="60" height="44" rx="3" fill="#f4efe4" stroke="#7a5230" strokeWidth="4" />
          <ellipse cx="170" cy="56" rx="16" ry="10" fill="#f4efe4" stroke="#2d2d3a" strokeWidth="1.5" />
          <ellipse cx="164" cy="54" rx="4" ry="3" fill="#2d2d3a" />
          <rect x="240" y="80" width="90" height="62" rx="4" fill="#8b5a2b" />
          <rect x="250" y="66" width="20" height="16" rx="2" fill="#f4efe4" />
          <rect x="280" y="70" width="16" height="12" rx="2" fill="#e8c95a" />
        </>
      )}
      {zone === 'calle-futuro' && (
        <>
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={6 + k * 60} y={20 + (k % 3) * 18} width="44" height={130 - (k % 3) * 18} fill="#8fb8cf" opacity="0.75" />)}
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={14 + k * 60} y={40 + (k % 3) * 18} width="10" height="14" fill="#e4f4fb" />)}
          <g className="anim-bob"><rect x="230" y="34" width="60" height="18" rx="9" fill="#5d8fd4" /><rect x="244" y="28" width="30" height="10" rx="5" fill="#cfe9f5" /></g>
          <rect x="150" y="104" width="50" height="46" rx="4" fill="#a9c4d6" />
          <path d="M160 104 q15 -20 30 0" fill="#7fe0ff" opacity="0.6" />
        </>
      )}
      {zone === 'turismo-futuro' && (
        <>
          <rect x="40" y="18" width="180" height="96" rx="6" fill="#1f3c58" />
          <rect x="46" y="24" width="168" height="84" fill="#2f7fbf" opacity="0.6" />
          <path d="M60 90 L110 50 L150 80 L200 40" stroke="#7fe0ff" strokeWidth="3" fill="none" />
          {[[60, 90], [110, 50], [150, 80], [200, 40]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill="#e0a526" />)}
          <rect x="250" y="96" width="90" height="54" fill="#5a6672" />
        </>
      )}
      {(zone === 'aula-futuro' || zone === 'direccion-futuro') && (
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} x={k * 52} y="0" width="48" height="150" fill="#cfe9f5" opacity="0.6" />)}
          <rect x="100" y="18" width="160" height="76" rx="4" fill="#1f3c58" />
          <rect x="106" y="24" width="148" height="64" fill="#2f7fbf" opacity="0.7" />
          <text x="180" y="52" textAnchor="middle" fontSize="12" fill="#7fe0ff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">{zone === 'direccion-futuro' ? 'GRIMM-BOT' : 'I am going to...'}</text>
          <text x="180" y="72" textAnchor="middle" fontSize="11" fill="#d9f3ff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">2056</text>
        </>
      )}
      {(zone === 'lobby-torre' || zone === 'oficina-torre' || zone === 'sala-torre' || zone === 'cima-torre') && (
        <>
          {[[10, 70, 30], [50, 50, 26], [90, 84, 22], [214, 60, 30], [252, 36, 24], [292, 76, 30]].map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height={150 - y} fill="#8fb8cf" opacity="0.55" />)}
          {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} x={k * 52} y="0" width="3" height="150" fill="#9aa6b2" opacity="0.7" />)}
          {zone === 'cima-torre' && (
            <>
              <ellipse cx="70" cy="30" rx="30" ry="10" fill="#ffffff" opacity="0.85" />
              <ellipse cx="250" cy="22" rx="36" ry="10" fill="#ffffff" opacity="0.85" />
              <rect x="60" y="92" width="110" height="16" rx="3" fill="#2d2d3a" />
              <rect x="85" y="80" width="60" height="12" rx="2" fill="#e0a526" />
              <text x="115" y="89.5" textAnchor="middle" fontSize="8" fill="#2d2d3a" fontFamily="Fredoka, Nunito, system-ui, sans-serif">DIRECTOR</text>
            </>
          )}
          {zone === 'lobby-torre' && (
            <>
              <rect x="150" y="40" width="60" height="110" fill="#9aa6b2" />
              <rect x="154" y="50" width="25" height="100" fill="#c9d3dc" />
              <rect x="181" y="50" width="25" height="100" fill="#c9d3dc" />
              <rect x="164" y="26" width="32" height="16" rx="3" fill="#1f3c58" />
              <text x="180" y="38" textAnchor="middle" fontSize="11" fill="#7fe0ff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">90 ▲</text>
            </>
          )}
          {zone === 'sala-torre' && (
            <>
              <rect x="80" y="18" width="200" height="70" rx="4" fill="#1f3c58" />
              <rect x="86" y="24" width="188" height="58" fill="#2f7fbf" opacity="0.7" />
              <text x="180" y="50" textAnchor="middle" fontSize="13" fill="#7fe0ff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">GOODBYE, DIANA!</text>
              <text x="180" y="70" textAnchor="middle" fontSize="10" fill="#d9f3ff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">Thank you for everything</text>
            </>
          )}
          {zone === 'oficina-torre' && (
            <>
              {[40, 200].map((x) => (
                <g key={x}>
                  <rect x={x} y="100" width="90" height="12" fill="#5b7a99" />
                  <rect x={x + 30} y="76" width="30" height="22" rx="2" fill="#1f3c58" />
                  <rect x={x + 33} y="79" width="24" height="16" fill="#7fe0ff" opacity="0.6" />
                </g>
              ))}
            </>
          )}
        </>
      )}
      {zone === 'patio-futuro' && (
        <>
          <rect x="0" y="40" width="200" height="110" fill="#8fb8cf" />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={6 + k * 32} y="48" width="28" height="96" fill="#e4f4fb" opacity="0.8" />)}
          <rect x="250" y="70" width="6" height="80" fill="#6b4423" />
          <rect x="290" y="70" width="6" height="80" fill="#6b4423" />
          <rect x="248" y="68" width="50" height="6" fill="#6b4423" />
          <path d="M262 102 q11 -26 22 0 z" fill="#c9a83a" stroke="#8a6210" strokeWidth="1.5" />
          <g className="anim-bob"><ellipse cx="300" cy="24" rx="12" ry="3.5" fill="#5a6672" /><circle cx="300" cy="21" r="3.5" fill="#7fe0ff" /></g>
        </>
      )}
      {zone === 'sala-cine' && (
        <>
          <rect x="40" y="14" width="280" height="100" fill="#f4efe4" opacity="0.92" />
          <rect x="40" y="14" width="280" height="100" fill="#cfe6f2" opacity="0.4" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => <rect key={k} x={6 + k * 36} y="128" width="30" height="20" rx="5" fill="#a8323a" />)}
        </>
      )}
      {zone === 'vestibulo' && (
        <>
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={24 + k * 70} y="22" width="50" height="70" fill={['#d64545', '#3b6fb6', '#e0a526'][k]} stroke="#f4efe4" strokeWidth="3" />
              <circle cx={49 + k * 70} cy="48" r="10" fill="#f4efe4" opacity="0.8" />
            </g>
          ))}
          <rect x="256" y="70" width="50" height="80" rx="4" fill="#d64545" />
          <rect x="262" y="78" width="38" height="34" fill="#fbe9a8" />
          <rect x="230" y="110" width="110" height="40" fill="#6b4423" />
        </>
      )}
      {zone === 'oficina-cine' && (
        <>
          <rect x="30" y="20" width="60" height="84" fill="#3b6fb6" stroke="#f4efe4" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">TWO BEST</text>
          <text x="60" y="78" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">FRIENDS</text>
          {[0, 1, 2].map((k) => <circle key={k} cx={170 + k * 26} cy="60" r="11" fill="none" stroke="#3a3a3a" strokeWidth="3" />)}
          <rect x="230" y="100" width="110" height="50" fill="#6b4423" />
        </>
      )}
      {zone === 'campo-viejo' && (
        <>
          <path d="M0 150 Q90 120 180 138 T360 130 V150 Z" fill="#8fb35e" />
          <path d="M226 150 L234 50 H254 L262 150 Z" fill="#c98b4a" stroke="#8b5a2b" strokeWidth="2" />
          <g transform="rotate(20 244 50)">
            {[0, 90, 180, 270].map((a) => <rect key={a} x="240" y="6" width="8" height="44" fill="#f4efe4" stroke="#8b5a2b" strokeWidth="1.5" transform={`rotate(${a} 244 50)`} />)}
          </g>
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={10 + k * 22} y="118" width="4" height="32" fill="#e8c95a" />)}
        </>
      )}
      {zone === 'granero-viejo' && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <line key={k} x1={k * 48} y1="0" x2={k * 48} y2="150" stroke="#8b3a2b" strokeWidth="3" />)}
          <path d="M20 150 Q60 100 100 150 Z" fill="#e8c95a" />
          <path d="M270 150 Q300 110 340 150 Z" fill="#e8c95a" />
          <rect x="150" y="30" width="70" height="8" fill="#6b4423" />
          <ellipse cx="170" cy="28" rx="6" ry="4" fill="#8d8d8d" />
          <ellipse cx="190" cy="27" rx="5" ry="3.5" fill="#8d8d8d" />
        </>
      )}
      {zone === 'casa-vieja' && (
        <>
          <rect x="30" y="30" width="70" height="56" fill="#9fd3f0" stroke="#8b5a2b" strokeWidth="5" />
          <line x1="65" y1="30" x2="65" y2="86" stroke="#8b5a2b" strokeWidth="3" />
          <rect x="150" y="24" width="60" height="40" rx="3" fill="#f4efe4" stroke="#6b4423" strokeWidth="3" />
          <circle cx="180" cy="44" r="10" fill="#e8c95a" />
          <rect x="240" y="100" width="100" height="50" fill="#6b4423" />
          <ellipse cx="270" cy="96" rx="14" ry="6" fill="#f4efe4" />
        </>
      )}
      {zone === 'obra' && (
        <>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={150 + k * 50} y="30" width="5" height="120" fill="#8d8d8d" />)}
          {[0, 1, 2].map((k) => <rect key={k} x="146" y={50 + k * 34} width="164" height="5" fill="#a8743f" />)}
          <rect x="160" y="110" width="140" height="40" fill="#a4553a" />
          {[0, 1, 2, 3].map((r) => <line key={r} x1="160" y1={110 + r * 10} x2="300" y2={110 + r * 10} stroke="#7d3f2a" />)}
          <path d="M10 150 Q50 90 90 150 Z" fill="#e3c98a" />
          <ellipse cx="120" cy="128" rx="18" ry="16" fill="#e07b39" />
          <rect x="104" y="142" width="32" height="6" fill="#5a5a5a" />
        </>
      )}
      {zone === 'casa-nueva' && (
        <>
          <rect x="30" y="30" width="70" height="60" fill="#9fd3f0" stroke="#8b5a2b" strokeWidth="5" />
          <line x1="65" y1="30" x2="65" y2="90" stroke="#8b5a2b" strokeWidth="3" />
          <rect x="140" y="40" width="80" height="54" rx="3" fill="#f4efe4" stroke="#6b4423" strokeWidth="3" />
          <text x="180" y="62" textAnchor="middle" fontSize="11" fill="#6b3fb0" fontFamily="Fredoka, Nunito, system-ui, sans-serif">go → went</text>
          <text x="180" y="80" textAnchor="middle" fontSize="11" fill="#6b3fb0" fontFamily="Fredoka, Nunito, system-ui, sans-serif">see → saw</text>
          <rect x="250" y="96" width="90" height="54" fill="#6b4423" />
        </>
      )}
      {zone === 'caseta' && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <line key={k} x1={k * 48} y1="0" x2={k * 48} y2="150" stroke="#a4855c" strokeWidth="2" />)}
          <rect x="40" y="26" width="110" height="70" fill="#f4efe4" stroke="#6b4423" strokeWidth="3" />
          <rect x="52" y="38" width="40" height="30" fill="none" stroke="#3b6fb6" strokeWidth="2" />
          <rect x="100" y="46" width="36" height="22" fill="none" stroke="#3b6fb6" strokeWidth="2" />
          <text x="95" y="86" textAnchor="middle" fontSize="9" fill="#3b6fb6" fontFamily="Fredoka, Nunito, system-ui, sans-serif">GREEN ST. PLAN</text>
          <path d="M250 110 Q270 84 290 110 Z" fill="#e0a526" />
          <rect x="246" y="108" width="48" height="6" rx="2" fill="#c98b1a" />
          <rect x="220" y="114" width="120" height="36" fill="#6b4423" />
        </>
      )}
      {(zone === 'calle-vieja' || zone === 'mercado') && (
        <>
          <rect x="10" y="50" width="90" height="100" fill="#a4553a" />
          <polygon points="4,52 55,22 106,52" fill="#6b3a2a" />
          <rect x="30" y="70" width="20" height="24" fill="#cfe4ec" />
          <rect x="62" y="96" width="24" height="54" fill="#5a3a1a" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={150 + k * 64} y="104" width="54" height="46" fill="#a8743f" />
              <path d={`M${144 + k * 64} 104 L${150 + k * 64} 86 H${204 + k * 64} L${210 + k * 64} 104 Z`} fill={zone === 'mercado' ? ['#d64545', '#e0a526', '#3b9d5d'][k] : '#d64545'} />
              <circle cx={164 + k * 64} cy="100" r="5" fill="#d64545" />
              <circle cx={178 + k * 64} cy="100" r="5" fill="#e8c95a" />
              <circle cx={192 + k * 64} cy="100" r="5" fill="#5f9a3c" />
            </g>
          ))}
          <path d="M0 166 H360 M0 188 H360" stroke="#9c7a52" strokeWidth="2" strokeDasharray="12 9" />
        </>
      )}
      {zone === 'tienda-vieja' && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <line key={k} x1={k * 48} y1="0" x2={k * 48} y2="150" stroke="#a8743f" strokeWidth="2" />)}
          <rect x="30" y="30" width="130" height="8" fill="#6b4423" />
          <rect x="30" y="70" width="130" height="8" fill="#6b4423" />
          {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={36 + k * 25} y="14" width="16" height="16" rx="2" fill={['#d64545', '#e8c95a', '#3b6fb6', '#3b9d5d', '#c98b4a'][k]} />)}
          {[0, 1, 2, 3].map((k) => <rect key={k} x={40 + k * 30} y="52" width="20" height="18" rx="3" fill="#f4efe4" />)}
          <rect x="220" y="96" width="120" height="54" fill="#6b4423" />
          <rect x="250" y="76" width="36" height="22" rx="3" fill="#3a3a3a" />
          <circle cx="262" cy="87" r="5" fill="#8d8d8d" />
          <rect x="270" y="82" width="12" height="3" fill="#e0a526" />
        </>
      )}
      {zone === 'correo' && (
        <>
          <rect x="90" y="16" width="180" height="22" rx="3" fill="#2f5d50" />
          <text x="180" y="32" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">POST OFFICE · 1996</text>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <rect key={k} x={40 + (k % 3) * 34} y={56 + Math.floor(k / 3) * 30} width="28" height="24" fill="#b89a70" stroke="#6b4423" strokeWidth="2" />
          ))}
          <rect x="190" y="70" width="34" height="80" rx="6" fill="#c0392b" />
          <rect x="196" y="84" width="22" height="4" fill="#2d2d3a" />
          <rect x="300" y="110" width="40" height="40" fill="#8b5a2b" />
          <rect x="306" y="100" width="28" height="12" fill="#f4efe4" />
        </>
      )}
      {(zone === 'aula-vieja' || zone === 'direccion-vieja') && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((r) => (
            <line key={r} x1="0" y1={r * 9} x2="360" y2={r * 9} stroke="#7d3f2a" strokeWidth="1.2" />
          ))}
          <rect x="110" y="20" width="140" height="66" rx="3" fill="#5a3a1a" />
          <rect x="116" y="26" width="128" height="54" fill="#2b3a2e" />
          <text x="180" y="50" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">I was · You were</text>
          <text x="180" y="68" textAnchor="middle" fontSize="11" fill="#e0a526" fontFamily="Fredoka, Nunito, system-ui, sans-serif">1996</text>
          <rect x="22" y="28" width="44" height="58" fill="#cfe4ec" stroke="#5a3a1a" strokeWidth="4" />
          <rect x="294" y="28" width="44" height="58" fill="#cfe4ec" stroke="#5a3a1a" strokeWidth="4" />
        </>
      )}
      {zone === 'patio-viejo' && (
        <>
          <rect x="0" y="40" width="200" height="110" fill="#a4553a" />
          <polygon points="0,42 100,8 200,42" fill="#6b3a2a" />
          <rect x="80" y="90" width="36" height="60" fill="#5a3a1a" />
          <rect x="250" y="70" width="6" height="80" fill="#6b4423" />
          <rect x="290" y="70" width="6" height="80" fill="#6b4423" />
          <rect x="248" y="68" width="50" height="6" fill="#6b4423" />
          <path d="M262 102 q11 -26 22 0 z" fill="#c9a83a" stroke="#8a6210" strokeWidth="1.5" />
        </>
      )}
      {(zone === 'recepcion' || zone === 'oficina') && (
        <>
          <rect x="20" y="24" width="90" height="56" fill="#9fd3f0" stroke="#8d9aa3" strokeWidth="4" />
          <line x1="65" y1="24" x2="65" y2="80" stroke="#8d9aa3" strokeWidth="3" />
          <circle cx="180" cy="46" r="20" fill="#f4efe4" stroke="#5a4a3a" strokeWidth="3" />
          <line x1="180" y1="46" x2="180" y2="32" stroke="#d64545" strokeWidth="2" />
          <line x1="180" y1="46" x2="190" y2="50" stroke="#2d2d3a" strokeWidth="3" />
          <rect x="230" y="96" width="110" height="20" fill="#5b7a99" />
          <rect x="250" y="76" width="30" height="22" rx="2" fill="#2d2d3a" />
          <rect x="253" y="79" width="24" height="15" fill="#9fd3f0" />
          <rect x="300" y="84" width="16" height="12" rx="2" fill="#d64545" />
        </>
      )}
      {zone === 'reuniones' && (
        <>
          <rect x="40" y="20" width="140" height="80" rx="3" fill="#f4efe4" stroke="#8d9aa3" strokeWidth="4" />
          <path d="M55 85 L80 60 L105 70 L135 40 L160 50" fill="none" stroke="#2f6fd0" strokeWidth="4" />
          <rect x="60" y="74" width="12" height="16" fill="#3b9d5d" />
          <rect x="90" y="64" width="12" height="26" fill="#e0a526" />
          <rect x="120" y="50" width="12" height="40" fill="#d64545" />
          <rect x="220" y="104" width="130" height="14" rx="3" fill="#8b5a2b" />
        </>
      )}
      {zone === 'direccion' && (
        <>
          <rect x="24" y="24" width="70" height="60" fill="#9fd3f0" stroke="#7a5230" strokeWidth="4" />
          <rect x="150" y="18" width="70" height="44" rx="3" fill="#2f5d50" />
          <text x="185" y="45" textAnchor="middle" fontSize="10" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">DIRECTOR</text>
          <rect x="220" y="92" width="130" height="26" rx="3" fill="#6b4423" />
          <rect x="300" y="78" width="20" height="16" rx="3" fill="#2d2d3a" />
          <circle cx="270" cy="40" r="16" fill="#f4efe4" stroke="#5a4a3a" strokeWidth="3" />
        </>
      )}
      {zone === 'cafe' && (
        <>
          <rect x="20" y="78" width="210" height="58" fill="#8b5a2b" />
          <rect x="20" y="70" width="210" height="10" fill="#a8743f" />
          <rect x="40" y="46" width="22" height="26" rx="3" fill="#6b6b6b" />
          <circle cx="110" cy="62" r="9" fill="#f4efe4" />
          <circle cx="140" cy="62" r="9" fill="#e0a526" />
          <rect x="250" y="20" width="96" height="74" rx="4" fill="#2b241c" />
          <text x="298" y="40" textAnchor="middle" fontSize="11" fill="#f6d36b" fontFamily="Fredoka, Nunito, system-ui, sans-serif">MENU</text>
          <text x="298" y="58" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">coffee $2 · juice $2</text>
          <text x="298" y="74" textAnchor="middle" fontSize="9" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">sandwich $4 · cake $3</text>
        </>
      )}
      {zone === 'tienda' && (
        <>
          {[30, 140].map((x) => (
            <g key={x}>
              <rect x={x} y="40" width="90" height="4" fill="#6b6b6b" />
              {['#d64545', '#2f6fd0', '#e0a526', '#3b9d5d', '#d4537e'].map((c, k) => (
                <path key={k} d={`M${x + 6 + k * 17} 44 h13 l3 44 h-19 z`} fill={c} />
              ))}
            </g>
          ))}
          <rect x="270" y="20" width="50" height="110" rx="6" fill="#b9dff0" stroke="#a8743f" strokeWidth="5" />
        </>
      )}
      {zone === 'turismo' && (
        <>
          <rect x="30" y="22" width="150" height="96" rx="4" fill="#f4efe4" stroke="#5b7a99" strokeWidth="5" />
          <path d="M45 100 L80 60 L110 85 L140 45 L165 70" fill="none" stroke="#3b9d5d" strokeWidth="4" />
          <circle cx="140" cy="45" r="6" fill="#d64545" />
          <text x="105" y="38" textAnchor="middle" fontSize="11" fill="#2b241c" fontFamily="Fredoka, Nunito, system-ui, sans-serif">CITY MAP</text>
          <rect x="230" y="30" width="100" height="40" rx="4" fill="#2f5d50" />
          <text x="280" y="55" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">TOURS $10</text>
        </>
      )}
      {zone === 'aula' && (
        <>
          <rect x="110" y="22" width="140" height="66" rx="3" fill="#7a5230" />
          <rect x="116" y="28" width="128" height="54" fill="#2f5d50" />
          <text x="180" y="52" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">I am · You are</text>
          <text x="180" y="70" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">He / She / It is</text>
          <rect x="18" y="24" width="50" height="70" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <rect x="292" y="24" width="50" height="70" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
        </>
      )}
      {zone === 'bano' && (
        <>
          {[40, 150, 260].map((x) => (
            <g key={x}>
              <rect x={x} y="26" width="60" height="50" rx="4" fill="#cfe9f2" stroke="#9fb7c0" strokeWidth="3" />
              <rect x={x + 8} y="108" width="44" height="22" rx="4" fill="#fff" stroke="#9fb7c0" strokeWidth="2" />
            </g>
          ))}
        </>
      )}
      {zone === 'cafeteria' && (
        <>
          <rect x="20" y="70" width="200" height="60" fill="#b0b0b0" />
          <rect x="20" y="62" width="200" height="10" fill="#8d8d8d" />
          {['#d64545', '#e0a526', '#3b9d5d', '#5d8fd4'].map((c, k) => (
            <circle key={c} cx={50 + k * 45} cy="56" r="9" fill={c} />
          ))}
          <rect x="250" y="22" width="90" height="40" rx="4" fill="#2f5d50" />
          <text x="295" y="47" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">MENU</text>
        </>
      )}
      {zone === 'biblioteca' && (
        <>
          {[20, 130, 240].map((x) => (
            <g key={x}>
              <rect x={x} y="18" width="100" height="120" fill="#6b4423" />
              {[0, 1, 2].map((r) =>
                ['#c0504d', '#3b6fb6', '#e0a526', '#3b9d5d', '#7a4fa3', '#d9822b'].map((c, k) => (
                  <rect key={`${r}-${k}`} x={x + 8 + k * 14} y={26 + r * 38} width="10" height={30 - (k % 3) * 4} fill={c} />
                )),
              )}
            </g>
          ))}
        </>
      )}
      {zone === 'sala' && (
        <>
          <rect x="30" y="24" width="110" height="80" rx="4" fill="#2f5d50" stroke="#7a5230" strokeWidth="5" />
          <rect x="282" y="14" width="56" height="48" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <circle cx="190" cy="44" r="18" fill="#fff" stroke="#5a4a7a" strokeWidth="4" />
          <path d="M190 44 V33 M190 44 L198 49" stroke="#2d2d3a" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}


type Phase = 'story' | 'ask' | 'feedback' | 'after' | 'bonus' | 'won' | 'lost'


export function Battle({ state, update, onExit }: { state: GameState; update: Update; onExit: () => void }) {
  const battle = state.battle!
  const enemy = ENEMIES[battle.enemyId]
  const scene = SCENES[state.sceneId]
  const ent = scene.entities.find((e) => 'id' in e && e.id === enemy.id)
  const zone = ent ? scene.zoneAt(ent.x, ent.y) : 'aula'
  const leoHint = perks(state).leoHint
  const metLeo = 'leo' in state.talks || 'leo' in state.friendship

  const [phase, setPhase] = useState<Phase>('story')
  const teacher = useTeacher()
  const [line, setLine] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [used, setUsed] = useState<string[]>([])
  // Fases del jefe: según la vida que le queda, cambia el tipo de preguntas
  function phaseAt(hpLeft: number) {
    if (!enemy.phases) return -1
    const damage = enemy.hp - hpLeft
    let acc = 0
    for (let i = 0; i < enemy.phases.length; i++) {
      acc += enemy.phases[i].hp
      if (damage < acc) return i
    }
    return enemy.phases.length - 1
  }
  function poolAt(hpLeft: number) {
    const ph = enemy.phases?.[phaseAt(hpLeft)]
    return ph ?? { topics: enemy.topics, kinds: enemy.kinds, tags: enemy.tags }
  }
  function pick(hpLeft: number, usedIds: string[]) {
    const p = poolAt(hpLeft)
    // La segunda pregunta busca una escucha real; una de cada tres pide escribir u ordenar
    const n = usedIds.length
    const focus = n === 1 ? 'hear' : n % 3 === 2 ? 'produce' : undefined
    return pickQuestion(p.topics, p.kinds, usedIds, state.mistakes, p.tags ?? [], focus)
  }
  const [interlude, setInterlude] = useState<{ text: string; es?: string } | null>(null)
  const [q, setQ] = useState<Question>(() => pick(battle.enemyHp, []))
  const [correct, setCorrect] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [heroAnim, setHeroAnim] = useState('')
  const [enemyAnim, setEnemyAnim] = useState('')
  const [hitText, setHitText] = useState<{ who: 'hero' | 'enemy'; n: number; text: string } | null>(null)
  const [hint, setHint] = useState(false)
  // Preguntas falladas en este combate: Leo propone practicarlas si pierdes
  const [failed, setFailed] = useState<string[]>([])
  const [practice, setPractice] = useState(false)

  function animate(setter: (v: string) => void, cls: string) {
    setter('')
    requestAnimationFrame(() => setter(cls))
  }

  function resolve(ok: boolean) {
    setCorrect(ok)
    // Cuaderno de errores: se anota lo que fallas y se borra cuando lo aciertas
    update((s) =>
      recordAnswer(
        { ...s, mistakes: ok ? s.mistakes.filter((id) => id !== q.id) : s.mistakes.includes(q.id) ? s.mistakes : [...s.mistakes, q.id] },
        q,
        ok,
      ),
    )
    window.setTimeout(() => sfx(ok ? 'hit' : 'hurt'), 180)
    if (!ok) setFailed((f) => [...f, q.id])
    if (ok) {
      const left = battle.enemyHp - 1
      animate(setHeroAnim, 'anim-lunge-r')
      animate(setEnemyAnim, 'anim-shake')
      setHitText({ who: 'enemy', n: Date.now(), text: '-1' })
      update((s) => ({ ...s, battle: s.battle ? { ...s.battle, enemyHp: left } : null }))
      setPhase('feedback')
      if (left <= 0) window.setTimeout(() => win(), 700)
      else if (enemy.phases && phaseAt(left) !== phaseAt(battle.enemyHp)) {
        const line = enemy.phases[phaseAt(left)].line
        if (line) setInterlude(line)
      }
      return
    }
    animate(setEnemyAnim, 'anim-lunge-r')
    if (state.items.shield > 0) {
      setBlocked(true)
      setHitText({ who: 'hero', n: Date.now(), text: '¡Escudo!' })
      update((s) => ({ ...s, items: { ...s.items, shield: s.items.shield - 1 } }))
      setPhase('feedback')
      return
    }
    const hp = state.hp - 1
    animate(setHeroAnim, 'anim-shake')
    setHitText({ who: 'hero', n: Date.now(), text: '-1' })
    update((s) => ({ ...s, hp: Math.max(0, hp) }))
    setPhase(hp <= 0 ? 'lost' : 'feedback')
    if (hp <= 0) window.setTimeout(() => sfx('defeat'), 500)
  }

  /** Cambiar una pregunta de hablar por otra, sin castigo (no hay micrófono o no se puede hablar) */
  function skipSpeak() {
    const p = poolAt(battle.enemyHp)
    const kinds = p.kinds.filter((k) => k !== 'speak')
    setQ(pickQuestion(p.topics, kinds.length ? kinds : ['fill'], [...used, q.id], state.mistakes, p.tags ?? []))
    setHint(false)
  }

  function nextQuestion() {
    const nextUsed = [...used, q.id]
    setUsed(nextUsed)
    setQ(pick(state.battle?.enemyHp ?? battle.enemyHp, nextUsed))
    setInterlude(null)
    setCorrect(false)
    setBlocked(false)
    setHint(false)
    setPhase('ask')
  }

  function win() {
    sfx('victory')
    setLine(0)
    setShowEs(false)
    setPhase('after')
    update((s) => {
      if (enemy.kind === 'trainer') {
        // Al terminar el entrenamiento Leo queda como amigo y da pistas en combate
        return {
          ...s,
          hp: s.maxHp,
          talks: { ...s.talks, leo: Math.max(1, s.talks.leo ?? 0) },
          friendship: { ...s.friendship, leo: Math.max(3, s.friendship.leo ?? 0) },
          seenLesson: s.seenLesson.includes('greetings') ? s.seenLesson : [...s.seenLesson, 'greetings'],
        }
      }
      const base = { ...s, defeated: [...s.defeated, enemy.id], hp: s.maxHp }
      if (enemy.echo) return { ...base, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }
      if (enemy.optional) {
        const r = enemy.reward
        return r && !s.outfits.includes(r) ? { ...base, outfits: [...s.outfits, r] } : base
      }
      if (enemy.kind === 'minion') {
        const r = enemy.reward
        return {
          ...base,
          keys: { ...s.keys, [s.sceneId]: (s.keys[s.sceneId] ?? 0) + 1 },
          outfits: r && !s.outfits.includes(r) ? [...s.outfits, r] : s.outfits,
        }
      }
      return {
        ...base,
        recovered: [...s.recovered, ...enemy.topics.filter((t) => !s.recovered.includes(t))],
        // En otras épocas el jefe no da una pieza del reloj: devuelve un fragmento de voz
        relics: SCENES[s.sceneId]?.era ? s.relics : s.relics + 1,
        outfits: s.outfits.includes(enemy.reward ?? 'capa') ? s.outfits : [...s.outfits, enemy.reward ?? 'capa'],
      }
    })
  }

  function leave() {
    if (enemy.kind === 'trainer') {
      if (phase === 'lost') {
        // Con Leo no se pierde nada: se vuelve a intentar con la vida llena
        update((s) => ({ ...s, hp: s.maxHp, battle: s.battle ? { ...s.battle, enemyHp: enemy.hp } : null }))
        nextQuestion()
        return
      }
      update((s) => ({ ...s, battle: null, screen: 'world' }))
      onExit()
      return
    }
    if (phase === 'lost') {
      update((s) => ({ ...s, hp: s.maxHp, pos: { ...scene.start }, battle: null, screen: 'explore' }))
    } else if (enemy.kind === 'boss') {
      // Al vencer al jefe viene el final del capítulo
      update((s) => ({ ...s, battle: null, screen: scene.epilogue && !s.opened.includes(scene.epilogue) ? 'epilogue' : 'explore' }))
    } else {
      update((s) => ({ ...s, battle: null, screen: 'explore' }))
    }
    onExit()
  }

  const hero = useMemo(() => heroLook(state, { book: true }), [state])
  const keysNow = state.keys[state.sceneId] ?? 0
  const storyLines = phase === 'after' ? enemy.after : enemy.before
  // Pregunta extra al ser vencido: los esbirros preguntan por el horario y Grimm se despide
  const session = enemy.kind === 'minion' ? sessionFor(enemy.id) : undefined
  const bonusSession = session
    ? { id: session.id, title: 'Pregunta extra del horario', bonus: session.bonus, shield: true }
    : enemy.bonus
      ? { id: 'bonus', title: 'Pregunta extra', bonus: enemy.bonus, shield: true }
      : enemy.farewell
        ? { id: 'farewell', title: 'Despedida', bonus: enemy.farewell, shield: false }
        : undefined
  const [bonusPick, setBonusPick] = useState<number | null>(null)
  const story = storyLines[line]
  const wasMistake = state.mistakes.includes(q.id)

  function nextStory() {
    setShowEs(false)
    if (line < storyLines.length - 1) setLine(line + 1)
    else if (phase === 'story') setPhase('ask')
    else if (bonusSession) setPhase('bonus')
    else setPhase('won')
  }

  const showQuestion = phase === 'ask' || phase === 'feedback' || phase === 'lost'

  return (
    <div className="mx-auto flex h-full max-w-md flex-col [@media(min-width:900px)_and_(pointer:fine)]:max-w-2xl gap-3 overflow-y-auto px-3 py-3">
      <div className="grid grid-cols-2 gap-2">
        <Panel className="px-3 py-2">
          <p className="truncate font-display text-[15px]">{state.hero.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <Hearts hp={state.hp} max={state.maxHp} />
            {state.items.shield > 0 && (
              <span className="whitespace-nowrap rounded-full bg-[#5d8fd4]/25 px-1.5 text-xs font-semibold text-[#9cc0f0]" title="Escudos de palabras">
                Escudo ×{state.items.shield}
              </span>
            )}
          </div>
        </Panel>
        <Panel className="px-3 py-2">
          <p className="truncate font-display text-[15px]">{enemy.name}</p>
          <div className="mt-2"><Bar value={battle.enemyHp} max={enemy.hp} color={enemy.kind === 'boss' ? '#a07cd0' : enemy.kind === 'trainer' ? '#3b9d5d' : '#d64545'} label="Vida del enemigo" /></div>
          {enemy.phases && <p className="mt-1 text-[11px] text-paper/50">Fase {phaseAt(battle.enemyHp) + 1} de {enemy.phases.length}</p>}
        </Panel>
      </div>

      <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-line">
        <svg viewBox="0 0 360 220" className="block w-full" role="img" aria-label={`Combate contra ${enemy.name}`}>
          <Backdrop zone={zone} />
          <g transform="translate(26 92) scale(3.8)">
            <g className={heroAnim} onAnimationEnd={() => setHeroAnim('')}>
              <SpriteBody look={hero} mood={(phase === 'feedback' && !correct && !blocked) || phase === 'lost' ? 'hurt' : state.recovered.length ? 'normal' : 'mute'} />
            </g>
          </g>
          {blocked && phase === 'feedback' && (
            <circle cx="88" cy="150" r="70" fill="none" stroke="#9cc0f0" strokeWidth="5" opacity="0.8" className="anim-pop" />
          )}
          <g transform={`translate(${enemy.kind === 'boss' ? 342 : 334} ${enemy.kind === 'boss' ? 68 : 92}) scale(${enemy.kind === 'boss' ? -4.6 : -3.8} ${enemy.kind === 'boss' ? 4.6 : 3.8})`}>
            <g className={enemyAnim} onAnimationEnd={() => setEnemyAnim('')}>
              {enemy.animal ? (
                <AnimalSprite kind={enemy.animal} hurt={(phase === 'feedback' && correct) || phase === 'after'} />
              ) : (
                <SpriteBody look={{ ...enemy.look, ...(enemy.id === 'barrio-boss' ? { skin: state.hero.look.skin, hair: state.hero.look.hair } : {}) }} mood={(phase === 'feedback' && correct) || phase === 'after' ? 'hurt' : 'normal'} />
              )}
            </g>
          </g>
          {hitText && (
            <text
              key={hitText.n}
              x={hitText.who === 'enemy' ? 270 : 90}
              y="80"
              textAnchor="middle"
              fontSize="22"
              fontFamily="Fredoka, Nunito, system-ui, sans-serif"
              fontWeight="600"
              fill={hitText.who === 'enemy' ? '#d64545' : hitText.text === '-1' ? '#e0a526' : '#9cc0f0'}
              stroke="#1c1a17"
              strokeWidth="3"
              paintOrder="stroke"
              className="anim-float-up"
            >
              {hitText.text}
            </text>
          )}
        </svg>
        {phase === 'story' && line === 0 && <div className="anim-wipe pointer-events-none absolute inset-0 bg-paper" />}
      </div>

      {(phase === 'story' || phase === 'after') && story && (
        <Panel className="anim-fade-in">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-lg text-gold">{enemy.kind !== 'minion' || phase === 'after' ? enemy.person : enemy.name}</p>
            <SpeakButton text={story.text} size="sm" auto voice={voiceOf(enemy.look)} />
          </div>
          <p key={`${phase}-${line}`} className="anim-fade-in text-[17px] leading-relaxed">"<Tappable text={story.text} />"</p>
          {showEs && story.es && <p className="mt-1 text-sm text-paper/60">{story.es}</p>}
          <div className="mt-3 flex items-center justify-between">
            {story.es ? (
              <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
            ) : <span />}
            <button className={btnPrimary} onClick={nextStory} autoFocus>
              {phase === 'story' && line === storyLines.length - 1 ? '¡A pelear!' : 'Siguiente'}
            </button>
          </div>
        </Panel>
      )}

      {teacher.on && (phase === 'ask' || phase === 'feedback') && (
        <button
          className="self-end rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-gold"
          onClick={() => {
            update((s) => ({ ...s, battle: s.battle ? { ...s.battle, enemyHp: 0 } : null }))
            win()
          }}
        >
          Ganar (profe)
        </button>
      )}

      {showQuestion && (
        <Panel className="anim-fade-in">
          {wasMistake && phase === 'ask' && (
            <p className="mb-2 rounded-lg bg-gold/10 px-2 py-1 text-xs font-semibold text-gold">Esta pregunta está en tu cuaderno de errores</p>
          )}
          <QuestionCard
            key={`${q.id}-${used.length}`}
            q={q}
            speaker={enemy.person}
            hint={hint}
            onSkip={phase === 'ask' ? skipSpeak : undefined}
            onAnswer={(ok) => phase === 'ask' && resolve(ok)}
            headerRight={
              leoHint && phase === 'ask' && q.kind !== 'speak' ? (
                <button className="rounded-lg border border-hp/60 px-2 py-1 text-xs font-semibold text-hp disabled:opacity-40" onClick={() => setHint(true)} disabled={hint}>
                  Pista de Leo
                </button>
              ) : undefined
            }
          />

          {phase === 'feedback' && correct && battle.enemyHp > 0 && interlude && (
            <div className="anim-fade-in mt-3 rounded-xl border-2 border-[#a07cd0]/60 bg-[#a07cd0]/10 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg text-[#c9b3ee]">{enemy.person} cambia...</p>
                <SpeakButton text={interlude.text} size="sm" auto voice={voiceOf(enemy.look)} />
              </div>
              <p className="text-[16px] leading-snug">"<Tappable text={interlude.text} />"</p>
              {interlude.es && showEs && <p className="mt-1 text-sm text-paper/60">{interlude.es}</p>}
              <div className="mt-3 flex items-center justify-between">
                {interlude.es ? <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button> : <span />}
                <button className={btnPrimary} onClick={nextQuestion} autoFocus>Siguiente fase</button>
              </div>
            </div>
          )}
          {phase === 'feedback' && correct && battle.enemyHp > 0 && !interlude && (
            <div className="anim-fade-in mt-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-hp">
                {q.kind === 'fix' ? '¡Lo corregiste! El golpe acertó.' : '¡Correcto! El golpe acertó.'}
              </p>
              <button className={btnPrimary} onClick={nextQuestion} autoFocus>Seguir</button>
            </div>
          )}
          {(phase === 'feedback' || phase === 'lost') && !correct && (
            <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 p-3">
              {blocked && <p className="mb-1 text-sm font-semibold text-[#9cc0f0]">Tu escudo de palabras bloqueó el golpe.</p>}
              <p className="text-sm font-semibold text-gold">{metLeo ? 'Pista de Leo' : 'Pista'}</p>
              <p className="mt-0.5 text-[15px] leading-snug">{q.tip}</p>
              <div className="mt-2">
                <GrammarPattern topic={q.topic} sentence={correctSentence(q)} compact />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-paper/60">Así es:</span>
                <RoleSentence text={correctSentence(q)} topic={q.topic} size="sm" />
              </div>
              <p className="mt-1 text-xs text-paper/50">Se anotó en tu cuaderno de errores.</p>
              <div className="mt-3 flex justify-end">
                {phase === 'lost' ? (
                  <button className={btnPrimary} onClick={leave} autoFocus>{enemy.kind === 'trainer' ? 'Intentar otra vez' : 'Volver a intentarlo'}</button>
                ) : (
                  <button className={btnPrimary} onClick={nextQuestion} autoFocus>Seguir</button>
                )}
              </div>
              {phase === 'lost' && (
                <p className="mt-2 text-xs text-paper/60">
                  {enemy.kind === 'trainer'
                    ? 'Leo: "Don\'t worry, it\'s just practice!" Vuelves a empezar con la vida llena.'
                    : 'Te quedaste sin energía. Volverás a la entrada con la vida llena.'}
                </p>
              )}
              {phase === 'lost' && failed.length > 0 && (
                <div className="mt-3 rounded-xl border-2 border-hp/50 bg-hp/10 p-3">
                  <p className="text-sm font-semibold text-hp">Sugerencia de Leo</p>
                  <p className="mt-0.5 text-[15px] leading-snug">
                    "Let's practice first!" Te costó{' '}
                    <b>{listTopics(failed)}</b>. Practica conmigo sin perder vida y luego vuelve a intentarlo.
                  </p>
                  <button className={`${btnPrimary} mt-2 w-full`} onClick={() => setPractice(true)}>Practicar con Leo</button>
                </div>
              )}
            </div>
          )}
        </Panel>
      )}

      {phase === 'bonus' && bonusSession && (
        <Panel className="anim-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{bonusSession.title}</p>
          <div className="mt-1 flex items-start gap-2">
            <p className="flex-1 text-[17px] leading-relaxed">
              <span className="font-semibold text-gold">{enemy.person}: </span>"{bonusSession.bonus.q}"
            </p>
            <SpeakButton text={bonusSession.bonus.q} size="sm" auto voice={voiceOf(enemy.look)} />
          </div>
          <div className="mt-3 grid gap-2">
            {mixed(bonusSession.bonus.options).map(([o, k]) => {
              const right = k === bonusSession.bonus.answer
              const look =
                bonusPick === null ? 'border-line bg-panel-2' : right ? 'border-hp bg-hp/25' : bonusPick === k ? 'border-danger bg-danger/25' : 'border-line bg-panel-2 opacity-40'
              return (
                <button
                  key={k}
                  className={`rounded-xl border-2 px-3 py-2.5 text-left font-display text-[16px] text-paper transition ${look}`}
                  disabled={bonusPick !== null}
                  onClick={() => {
                    setBonusPick(k)
                    if (right && bonusSession.shield) update((s) => ({ ...s, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
                  }}
                >
                  {o}
                </button>
              )
            })}
          </div>
          {bonusPick !== null && (
            <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 p-3">
              {bonusPick === bonusSession.bonus.answer ? (
                <p className="text-sm font-semibold text-hp">
                  {bonusSession.shield ? (session ? '¡Correcto! Leíste bien el horario. ' : '¡Correcto! ') + 'Ganaste un escudo de palabras (máximo 2).' : '¡Muy bien! Así se responde en inglés.'}
                </p>
              ) : (
                <p className="text-[15px] leading-snug"><span className="font-semibold text-gold">Pista: </span>{bonusSession.bonus.tip}</p>
              )}
              <div className="mt-3 flex justify-end">
                <button className={btnPrimary} onClick={() => setPhase('won')} autoFocus>Continuar</button>
              </div>
            </div>
          )}
        </Panel>
      )}

      {phase === 'won' && (
        <Panel className="anim-pop border-gold">
          <p className="font-display text-2xl text-gold">{enemy.kind === 'trainer' ? '¡Entrenamiento completo!' : '¡Victoria!'}</p>
          {enemy.kind === 'trainer' ? (
            <p className="mt-1 text-[16px]">
              Leo ahora es tu amigo. Si fallas en un combate, te dará una pista. Tu aventura empieza en la escuela.
            </p>
          ) : enemy.optional ? (
            <p className="mt-1 text-[16px]">{enemy.person} te regaló un atuendo nuevo. Póntelo desde Atuendos.</p>
          ) : enemy.kind === 'minion' ? (
            <p className="mt-1 text-[16px]">
              {enemy.person} te dio un pedazo de llave. Llevas {keysNow} de {scene.keysNeeded}.
              {enemy.reward && ` También te regaló: ${OUTFITS[enemy.reward].name}.`}
              {keysNow >= scene.keysNeeded && ' ¡La sala de profesores ya está abierta!'}
              {session && session.id !== 'board-4' && ' Mira la pizarra del aula: apareció una clase nueva en el horario.'}
            </p>
          ) : (
            <div className="mt-1 grid gap-1.5 text-[16px]">
              <p>Recuperaste una parte de tu voz: <b>{listEs(enemy.topics.map((t) => TOPICS[t].name.toLowerCase()))}</b>.</p>
              {SCENES[state.sceneId]?.era ? (
                <div className="my-1 rounded-xl bg-panel-2 p-3 text-[15px]">
                  <b className="text-gold">¡Fragmento de voz!</b> {enemy.person} tenía un fragmento de tu voz {SCENES[state.sceneId]?.era === 'Futuro' ? 'del futuro' : 'del pasado'}. Al tocarlo se corrompió; tú no, porque es tu voz. Ahora puedes hablar también {SCENES[state.sceneId]?.era === 'Futuro' ? 'del futuro' : 'del pasado'}.
                </div>
              ) : (
              <div className="my-1 flex items-center gap-3 rounded-xl bg-panel-2 p-2">
                <TimeClock pieces={state.relics} size={72} highlight={state.relics - 1} />
                <p className="text-[15px]">
                  <b className="text-gold">¡Pieza del reloj!</b> Tienes {Math.min(state.relics, PRESENT_NODES.length)} de {PRESENT_NODES.length}. {enemy.person} tenía esta pieza, y al tocarla se corrompió. Tú no te corrompes: es tu voz.
                </p>
              </div>
              )}
              <p className="text-paper/75">También ganaste: {OUTFITS[enemy.reward ?? 'capa'].name}. Tus amigos tienen cosas nuevas que contarte.</p>
            </div>
          )}
          <button className={`${btnPrimary} mt-4 w-full`} onClick={leave} autoFocus>{enemy.kind === 'trainer' ? 'Ir al mapa' : 'Continuar'}</button>
        </Panel>
      )}

      {practice && (
        <Practice
          state={state}
          update={update}
          failed={failed}
          onClose={() => {
            setPractice(false)
            leave()
          }}
        />
      )}
    </div>
  )
}

/** Los temas de las preguntas falladas, en palabras */
function listTopics(ids: string[]) {
  const topics = [...new Set(ids.map((id) => questionById(id)?.topic).filter(Boolean))] as TopicId[]
  return listEs(topics.map((t) => TOPICS[t].name.toLowerCase()))
}

/** "a, b y c" */
function listEs(items: string[]) {
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}
