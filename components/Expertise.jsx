'use client'
import { motion } from 'framer-motion'
import { SKILL_TRACKS } from '../lib/skills'
import SkillCard from './SkillCard'
import SectionWrapper from './SectionWrapper'

function SkillMarqueeRow({ track, duplicate = false }) {
  return (
    <div className="flex gap-6 shrink-0" aria-hidden={duplicate || undefined}>
      {track.skills.map((skill, index) => (
        <SkillCard
          key={`${track.id}-${duplicate ? 'dup' : 'orig'}-${index}`}
          skill={skill}
          interactive={!duplicate}
        />
      ))}
    </div>
  )
}

export default function Expertise() {
  return (
    <SectionWrapper id="expertise" sectionIndex={2}>
      <div className="py-24">
        <div className="w-full">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-space font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              My expertise
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-8xl font-space font-bold text-heading tracking-tight"
            >
              Professional <span className="text-subtle">Skills.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-subtle text-sm font-inter max-w-md mx-auto"
            >
              Click any skill to open its official documentation.
            </motion.p>
          </div>

          <div className="flex flex-col gap-6 relative w-full select-none overflow-hidden py-4">
            {SKILL_TRACKS.map((track) => (
              <div key={track.id} className="marquee-mask w-full overflow-hidden relative">
                <div
                  className={`${track.marqueeClass} flex gap-6 hover:[animation-play-state:paused] transition-all`}
                >
                  <SkillMarqueeRow track={track} />
                  <SkillMarqueeRow track={track} duplicate />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
