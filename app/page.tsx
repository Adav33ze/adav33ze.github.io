import Image from 'next/image'
import Link from 'next/link'
import portfolioData from '../data/portfolio.json'
import blogData from '../data/blog.json'

export const metadata = {
  title: 'Abdulrahman — Architect & Interior Designer',
  description: 'Abdulrahman is an Architect and Interior Designer based in Abuja, Nigeria, working across residential, hospitality, and institutional projects locally and internationally.',
}

export default function Home() {
  const projects = portfolioData.projects
  const posts = blogData.posts

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
        <Link href="/" className="text-xs uppercase tracking-widest text-white font-light">
          Adav33ze
        </Link>
        <div className="flex gap-8 text-xs uppercase tracking-widest text-white">
          <Link href="/work" className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen w-full bg-black flex items-end p-6 md:p-12 overflow-hidden">
        <img
          src="/Chalet 12.png"
          alt="Architectural project by Abdulrahman"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-display text-5xl md:text-8xl text-white font-light tracking-tight">
            Abdulrahman
          </h1>
          <p className="font-body text-xs md:text-sm text-zinc-400 uppercase tracking-widest mt-4">
            Architecture, Interior Design, Project Delivery — Abuja, Nigeria
          </p>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="py-24 px-6 md:px-12 bg-white">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Selected Work</p>
            <h2 className="font-display text-4xl font-light">Projects</h2>
          </div>
          <Link
            href="/work"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-black transition-colors border-b border-zinc-200 pb-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.slice(0, 4).map((project: any, index: number) => (
            <Link
              href={`/work/${project.slug}`}
              key={index}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full bg-zinc-100 overflow-hidden mb-6">
                <img
                  src={`/${project.image}`}
                  alt={project.alt_text}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
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

        <div className="mt-20 border-t border-zinc-100 pt-10 text-center">
          <Link
            href="/work"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
          >
            See all {projects.length} projects →
          </Link>
        </div>
      </section>

      {/* ABOUT / INTRO */}
      <section id="about" className="py-32 px-6 md:px-12 bg-zinc-50 border-t border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-7 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8 leading-tight">
              A decade of shaping spaces from concept to construction.
            </h2>
            <div className="space-y-5 text-zinc-600 font-light leading-relaxed text-sm md:text-base">
              <p>
                I'm Abdulrahman — an Architect and Interior Designer with over ten years of 
                experience leading residential, hospitality, and institutional projects across 
                Nigeria and internationally.
              </p>
              <p>
                My work moves between architecture and interiors, ensuring every space is 
                structurally considered and spatially resolved down to the finish. I'm currently 
                Project Operations Manager at Fazab International Limited, overseeing projects 
                from inception to handover.
              </p>
              <p>
                Based in Abuja. Available for projects across Nigeria and beyond.
              </p>
            </div>

            <div className="mt-12 flex gap-6 flex-wrap">
              <Link
                href="/about"
                className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
              >
                Full Profile →
              </Link>
              <a
                href="mailto:hello@adav33ze.com"
                className="text-xs uppercase tracking-widest border-b border-zinc-300 pb-1 text-zinc-500 hover:text-black hover:border-black transition-colors"
              >
                Get in Touch →
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-end">
            <div className="relative aspect-square w-full max-w-md bg-zinc-200 overflow-hidden grayscale contrast-115 shadow-2xl">
              <img
                src="/profile_pic.png"
                alt="Abdulrahman, Architect and Interior Designer, Abuja Nigeria"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      {posts && posts.length > 0 && (
        <section className="py-24 px-6 md:px-12 border-t border-zinc-200">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Writing</p>
              <h2 className="font-display text-4xl font-light">Journal</h2>
            </div>
            <Link
              href="/blog"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-black transition-colors border-b border-zinc-200 pb-1"
            >
              All Posts →
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {posts.slice(0, 2).map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-start md:gap-16 py-8 hover:border-zinc-300 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-400 md:w-32 shrink-0 mb-2 md:mb-0">
                  {post.date}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-light mb-2 group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-500 font-light">{post.excerpt}</p>
                </div>
                <span className="hidden md:block text-xs uppercase tracking-widest text-zinc-300 group-hover:text-zinc-500 transition-colors self-center ml-8">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center">
        <p>© 2026 Abdulrahman. All rights reserved.</p>
        <a href="mailto:hello@adav33ze.com" className="hover:text-white transition-colors">
          hello@adav33ze.com
        </a>
      </footer>

    </div>
  )
}
