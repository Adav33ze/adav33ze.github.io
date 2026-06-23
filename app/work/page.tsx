import Link from 'next/link'
import NavBar from '../components/NavBar'
import portfolioData from '../../data/portfolio.json'

export const metadata = {
  title: 'Work — Abdulrahman | Architect & Interior Designer',
  description: 'Selected architecture and interior design projects by Abdulrahman, based in Abuja and working across Nigeria and internationally.',
}

export default function WorkPage() {
  const projects = portfolioData.projects

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAV */}
      <NavBar forceLight />

      {/* HEADER */}
      <header className="pt-40 pb-16 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4">Work</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight max-w-2xl">
            Selected work, 2013 — present.
          </h1>
          <p className="mt-6 text-sm font-light text-zinc-500 max-w-xl">
            Residential, hospitality, and institutional projects across Abuja and beyond — from early concept through to completed construction.
          </p>
        </div>
      </header>

      {/* GRID */}
      <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project: any, index: number) => (
            <Link
              href={`/work/${project.slug}`}
              key={index}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full bg-zinc-100 overflow-hidden mb-6 transition-shadow duration-700 ease-out group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                  src={`/${project.image}`}
                  alt={project.alt_text}
                  className="folio-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start border-t border-zinc-200 pt-4">
                <div>
                  <h3 className="font-body text-lg font-normal tracking-tight text-black">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{project.location}</p>
                </div>
                <span className="text-xs font-light text-zinc-400 uppercase tracking-wider bg-zinc-100 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center">
        <p>© 2026 Abdulrahman. All rights reserved.</p>
        <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
      </footer>



    </div>
  )
}
