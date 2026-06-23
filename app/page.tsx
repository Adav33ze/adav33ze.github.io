import Image from 'next/image'
import Link from 'next/link'
import portfolioData from '../data/portfolio.json'

export default function Home() {
  const projects = portfolioData.projects

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
        <div className="w-10 h-10 invert flex items-center justify-center">
          <Image 
            src="/AS LOGO water-02.png" 
            alt="adav33ze logo" 
            width={40}
            height={40}
            className="object-contain"
            priority 
          />
        </div>
        <div className="flex gap-8 text-xs uppercase tracking-widest text-white">
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full bg-black flex items-end p-6 md:p-12 overflow-hidden">
        <img 
          src="/Chalet 12.png" 
          alt="Chalet 12 Exterior Facade" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="font-display text-5xl md:text-8xl text-white font-light tracking-tight dynamic-title">
            adav33ze
          </h1>
          <p className="font-body text-xs md:text-sm text-zinc-400 uppercase tracking-widest mt-4">
            Architecture & Interior Design Studio — Abuja, Nigeria
          </p>
        </div>
      </section>

      {/* 3. THE ARCHITECTURAL PROJECT GRID */}
      <section id="work" className="py-24 px-6 md:px-12 bg-white">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">01 / Index</p>
          <h2 className="font-display text-4xl font-light">Selected Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project: any, index: number) => (
            <Link 
              href={`/work/${project.slug || project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
              key={index} 
              className="group flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/2] w-full bg-zinc-100 overflow-hidden mb-6">
                <img 
                  src={`/${project.image}`} 
                  alt={project.alt_text}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Card Meta Content */}
              <div className="flex justify-between items-start border-t border-zinc-200 pt-4">
                <div>
                  <h3 className="font-body text-lg font-normal tracking-tight text-black">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {project.location}
                  </p>
                </div>
                <span className="text-xs font-light text-zinc-400 uppercase tracking-wider bg-zinc-100 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. THE EDITORIAL ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-12 bg-zinc-50 border-t border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">02 / Profile</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8">
              Restrained spatial design tailored to complex climates.
            </h2>
            <div className="space-y-6 text-zinc-600 font-light leading-relaxed text-sm md:text-base">
              <p>
                adav33ze is an architectural practice specializing in high-end residential, 
                commercial, and interior spatial environments. Operating from Abuja, the studio 
                balances geometric discipline with environmental intelligence.
              </p>
              <p>
                By neutralizing the background palette and prioritizing raw volume, lighting, 
                and performance, our designs are built specifically to handle structural challenges 
                while remaining visually tranquil over generations.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-200 pt-8 text-xs uppercase tracking-wider">
              <div>
                <p className="text-zinc-400 mb-1">Location</p>
                <p className="text-black font-normal">Abuja, Nigeria</p>
              </div>
              <div>
                <p className="text-zinc-400 mb-1">Inquiries</p>
                <p className="text-black font-normal">studio@adav33ze.com</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-end">
            <div className="relative aspect-[1/1] w-full max-w-md bg-zinc-200 overflow-hidden filter grayscale contrast-115 shadow-2xl">
              <img
                src="/profile_pic.png"
                alt="adav33ze Lead Designer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. MINIMAL FOOTER */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center">
        <p>© 2026 adav33ze. All rights reserved.</p>
        <p>Built with Next.js</p>
      </footer>

    </div>
  )
}