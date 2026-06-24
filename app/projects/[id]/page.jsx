import { projects } from '../../../data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi'
import BackButton from '../../../components/BackButton'

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id.toString(),
  }))
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.id.toString() === params.id)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  }
}

export default function ProjectCaseStudy({ params }) {
  const project = projects.find((p) => p.id.toString() === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-body font-inter selection:bg-primary/30">
      <BackButton href="/projects" text="Back to Projects" />

      <main className="pt-32 pb-24 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            Case Study {project.id < 10 ? `0${project.id}` : project.id}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-space font-black text-heading leading-[1.1] tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-subtle leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Tech Stack */}
        <div className="mb-16 md:mb-24 flex flex-wrap gap-4">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className="px-6 py-3 bg-sidebar/5 border border-border/50 rounded-full text-sm font-space font-bold tracking-wider uppercase text-heading"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-24">
           <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-heading text-background rounded-2xl font-space font-bold hover:bg-primary transition-colors shadow-xl"
          >
            <FiGithub size={20} /> View Source Code
          </a>
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border-2 border-border/50 text-heading rounded-2xl font-space font-bold hover:border-primary hover:text-primary transition-colors"
            >
              <FiExternalLink size={20} /> Live Project
            </a>
          )}
        </div>

        {/* Dynamic Details (Case Study Content) */}
        {project.caseStudy && (
          <div className="space-y-20 border-t border-border/30 pt-20">
            
            <section>
              <h2 className="text-3xl font-space font-bold text-heading mb-6">The Challenge</h2>
              <div className="prose prose-lg prose-invert max-w-none text-subtle leading-relaxed">
                <p>{project.caseStudy.challenge}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-space font-bold text-heading mb-6">Technical Approach</h2>
              <div className="prose prose-lg prose-invert max-w-none text-subtle leading-relaxed">
                <ul className="mt-8 space-y-6 list-none pl-0">
                  {project.caseStudy.technicalApproach.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <FiCheckCircle className="text-primary mt-1 shrink-0" size={24} />
                      <div>
                        <span>{point}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-space font-bold text-heading mb-6">The Outcome</h2>
              <div className="prose prose-lg prose-invert max-w-none text-subtle leading-relaxed">
                <p>{project.caseStudy.outcome}</p>
              </div>
            </section>

          </div>
        )}


      </main>
    </div>
  )
}
