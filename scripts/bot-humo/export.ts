import { QUESTIONS } from '../../src/data/questions'
import { SESSIONS } from '../../src/data/schedule'
import { SCHOOL, SCHOOL_ENEMIES } from '../../src/data/school'
import * as ACT from '../../src/data/activities'
import { writeFileSync } from 'node:fs'
const vocab: any[] = []
for (const v of Object.values(ACT)) if (Array.isArray(v)) for (const w of v as any[]) if (w && w.en && w.es) vocab.push([w.en, w.es])
const extra: any[] = []
for (const s of SESSIONS) { for (const q of s.questions) extra.push({ prompt: q.q, options: q.options, answer: q.answer, kind: 'fill' }); extra.push({ prompt: s.bonus.q, options: s.bonus.options, answer: s.bonus.answer, kind: 'fill' }) }
for (const e of Object.values(SCHOOL_ENEMIES)) if (e.farewell) extra.push({ prompt: e.farewell.q, options: e.farewell.options, answer: e.farewell.answer, kind: 'fill' })
writeFileSync(process.env.BOT_DATA!, JSON.stringify({ questions: QUESTIONS, extra, vocab, map: SCHOOL.map, entities: SCHOOL.entities }))
console.log('q', QUESTIONS.length, 'extra', extra.length, 'vocab', vocab.length)
