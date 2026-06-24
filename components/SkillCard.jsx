'use client'

import { FiExternalLink } from 'react-icons/fi'
import { getSkillIcon } from '../lib/skills'

export default function SkillCard({ skill, interactive = true }) {
  const meta = getSkillIcon(skill.icon)
  if (!meta) return null

  const { Icon, color } = meta
  const className =
    'flex items-center gap-4 bg-white/70 backdrop-blur-md border border-border/40 px-8 py-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-sidebar hover:bg-white shrink-0 group focus:outline-none focus:ring-2 focus:ring-primary'

  const content = (
    <>
      <Icon
        className={`text-4xl ${color} group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      />
      <span className="text-xs font-bold uppercase tracking-widest text-subtle group-hover:text-heading transition-colors">
        {skill.name}
      </span>
      {interactive && (
        <FiExternalLink
          className="w-3.5 h-3.5 text-subtle/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity shrink-0"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (!interactive) {
    return <div className={className}>{content}</div>
  }

  return (
    <a
      href={skill.docUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${skill.name} — open official documentation`}
      className={className}
    >
      {content}
    </a>
  )
}
