import Link from 'next/link'
import Image from 'next/image'
import portfolioData from '../../../data/portfolio.json'

interface PageProps {
  params: Promise<{ id: string }>
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export async function generateStaticParams() {
  return portfolioData.projects.map((p: any) => ({
    id: p.slug || p.id || slugify(p.title),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const project = portfolioData.projects.find(
    (p: any) => p.id === id || p.slug === id || slugify(p.title) === id
  )
  return {
    title: project ? `${project.title} — Abdulrahman` : 'Project — Abdulrahman',
    description: project?.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params

  const projectIndex = portfolioData.projects.findIndex(
    (p: any) => p.id === id || p.slug === id || slugify(p.title) === id
  )
  const project = portfolioData.projects[projectIndex] as any

  const prevProject = projectIndex > 0 ? (portfolioData.projects[projectIndex - 1] as any) : null
  const nextProject = projectIndex < portfolioData.projects.length - 1
    ? (portfolioData.projects[projectIndex + 1] as any)
    : null

  const hasWriteUp = project?.write_up && !project.write_up.startsWith('TODO')

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <h1 className="font-display text-2xl font-light mb-4">Project Not Found</h1>
        <Link href="/work" className="text-xs uppercase tracking-widest border-b border-black pb-1">
          Return to Work
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-white hover:opacity-50 transition-opacity"
        >
          Abdulrahman
        </Link>
        <div className="flex gap-8 text-xs uppercase tracking-widest text-white">
          <Link href="/work" className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[88vh] w-full bg-zinc-900 overflow-hidden flex items-end p-6 md:p-12">
        <Image
          src={`/${project.image}`}
          alt={project.alt_text}
          fill
          className="object-cover opacity-90"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="relative z-10 max-w-4xl text-white">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">{project.location}</p>
          <h1 className="font-display text-4xl md:text-7xl font-light tracking-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* METADATA + OVERVIEW */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 border-t border-zinc-200 pt-8 space-y-6 text-xs uppercase tracking-wider">
          <div>
            <p className="text-zinc-400 mb-1">Location</p>
            <p className="text-black">{project.location}</p>
          </div>
          <div>
            <p className="text-zinc-400 mb-1">Typology</p>
            <p className="text-black">{project.category}</p>
          </div>
          {project.year && (
            <div>
              <p className="text-zinc-400 mb-1">Year</p>
              <p className="text-black">{project.year}</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-8 border-t border-zinc-200 pt-8">
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-6">Project Overview</h2>
          <p className="font-body text-base md:text-xl font-light leading-relaxed text-zinc-800 max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* WRITE-UP */}
      {hasWriteUp && (
        <section className="py-16 px-6 md:px-12 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-10">Design Narrative</h2>
            <div className="space-y-6">
              {project.write_up.split('\n\n').filter(Boolean).map((para: string, i: number) => (
                <p key={i} className="font-body text-sm md:text-base font-light leading-relaxed text-zinc-700">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-12 border-t border-zinc-200 pt-8">
            Project Images
          </h2>
          <div className="space-y-6">
            {project.gallery.map((item: any, i: number) => (
              <div
                key={i}
                className="relative w-full overflow-hidden bg-zinc-100"
                style={{ aspectRatio: i % 3 === 1 ? '16/9' : '3/2' }}
              >
                <Image
                  src={`/${item.image}`}
                  alt={item.alt_text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <nav className="border-t border-zinc-200 px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-10">More Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {prevProject && (
              <Link
                href={`/work/${prevProject.slug || prevProject.id || slugify(prevProject.title)}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">← Previous</span>
                <span className="font-display text-2xl font-light group-hover:opacity-60 transition-opacity">{prevProject.title}</span>
                <span className="text-xs text-zinc-400">{prevProject.location}</span>
              </Link>
            )}
          </div>
          <div className="md:text-right">
            {nextProject && (
              <Link
                href={`/work/${nextProject.slug || nextProject.id || slugify(nextProject.title)}`}
                className="group flex flex-col gap-2 md:items-end"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Next →</span>
                <span className="font-display text-2xl font-light group-hover:opacity-60 transition-opacity">{nextProject.title}</span>
                <span className="text-xs text-zinc-400">{nextProject.location}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center">
        <Link href="/work" className="hover:text-white transition-colors">← All Work</Link>
        <p>© 2026 Abdulrahman. All rights reserved.</p>
      </footer>

    </div>
  )
}
