import Link from 'next/link'
import NavBar from './components/NavBar'
import ContactButton from './components/ContactButton'
import portfolioData from '../data/portfolio.json'
import blogData from '../data/blog.json'
import heroData from '../data/hero.json'
import profileData from '../data/profile.json'
import testimonialsData from '../data/testimonials.json'

export const metadata = {
  title: 'Abdulrahman — Architect & Interior Designer',
  description: 'Abdulrahman is an Architect and Interior Designer based in Abuja, Nigeria, working across residential, hospitality, and institutional projects locally and internationally.',
}

// Shape of hero.json as managed through the CMS (data/hero.json).
// Fields are optional here because the CMS does not guarantee every
// field will be present on every save — treat this as untrusted input.
interface HeroData {
  mode: 'single' | 'slideshow' | 'video'
  image: string
  video?: string
  alt: string
  slides: { image: string; alt: string }[]
  headline?: string
  subheadline?: string
  body?: string
  location?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export default function Home() {
  const projects = portfolioData.projects
  const posts = [...blogData.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const testimonials = testimonialsData.testimonials

  // Defensive hero parsing: if the CMS ever saves hero.json without a
  // `mode` (or with any other field missing), fall back to sane
  // defaults instead of failing the production build or crashing at
  // runtime. Never trust CMS-managed JSON to fully match the interface.
  const rawHero = heroData as Partial<HeroData>
  const hero: HeroData = {
    mode: rawHero.mode ?? 'single',
    image: rawHero.image ?? '',
    alt: rawHero.alt ?? '',
    slides: rawHero.slides ?? [],
    video: rawHero.video,
    headline: rawHero.headline,
    subheadline: rawHero.subheadline,
    body: rawHero.body,
    location: rawHero.location,
  }

  const isSlideshow = hero.mode === 'slideshow' && hero.slides.length > 1
  const isVideo = hero.mode === 'video' && Boolean(hero.video)

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">

      {/* NAV */}
      <NavBar heroGradient />

      {/* HERO */}
      <section data-motion-hero className="relative h-screen w-full bg-black flex items-end p-6 md:p-12 overflow-hidden">

        {isVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.image.startsWith('/') ? hero.image : `/${hero.image}`}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          >
            <source src={hero.video!.startsWith('/') ? hero.video! : `/${hero.video!}`} />
          </video>
        ) : isSlideshow ? (
          /* SLIDESHOW HERO */
          <>
            {hero.slides.map((slide, i) => (
              <img
                key={i}
                src={slide.image.startsWith('/') ? slide.image : `/${slide.image}`}
                alt={slide.alt}
                data-slide={i}
                className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-1000 hero-slide ${i === 0 ? 'hero-slide--active' : 'opacity-0'}`}
              />
            ))}
            {/* Slideshow dots */}
            <div className="absolute bottom-8 right-6 md:right-12 z-10 flex gap-2">
              {hero.slides.map((_, i) => (
                <button
                  key={i}
                  data-dot={i}
                  aria-label={`Slide ${i + 1}`}
                  className={`hero-dot w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
            <script dangerouslySetInnerHTML={{ __html: `
              (function() {
                var slides = document.querySelectorAll('.hero-slide');
                var dots = document.querySelectorAll('.hero-dot');
                var current = 0;
                function goTo(n) {
                  slides[current].style.opacity = '0';
                  dots[current].style.background = 'rgba(255,255,255,0.3)';
                  current = n;
                  slides[current].style.opacity = '0.8';
                  dots[current].style.background = 'white';
                }
                dots.forEach(function(dot, i) {
                  dot.addEventListener('click', function() { goTo(i); });
                });
                setInterval(function() {
                  goTo((current + 1) % slides.length);
                }, 5000);
              })();
            `}} />
          </>
        ) : (
          /* SINGLE IMAGE HERO */
          <img
            src={hero.image.startsWith('/') ? hero.image : `/${hero.image}`}
            alt={hero.alt}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div data-hero-content className="relative z-10 max-w-3xl">
          {/* Dictionary definition hero */}
          <h1 className="font-display text-5xl md:text-8xl text-white font-light tracking-tight leading-none drop-shadow-md">
            adavize
          </h1>
          <p className="font-body text-base md:text-2xl text-zinc-300 tracking-wide font-light mt-3 mb-6">
            /ˌɑːdɑːˈviːzeɪ/ &nbsp; n.
          </p>
          <p className="font-display text-2xl md:text-4xl text-zinc-200 font-light italic leading-snug">
            {hero.subheadline ?? 'bringer of fortune.'}
          </p>
          {hero.body && (
            <p className="font-body text-sm md:text-base text-zinc-200 font-light mt-3 max-w-lg leading-relaxed">
              {hero.body}
            </p>
          )}
          {hero.location && (
            <p className="font-body text-sm text-zinc-400 uppercase tracking-widest mt-4">
              {hero.location}
            </p>
          )}
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/work"
              className="text-xs uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-zinc-200 transition-colors"
            >
              View Projects →
            </Link>
            <ContactButton variant="hero" />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" data-motion-section className="py-24 px-6 md:px-12 bg-white">
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
              data-motion-card
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full bg-zinc-100 overflow-hidden mb-6 transition-shadow duration-700 ease-out group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                  src={`/${project.image}`}
                  alt={project.alt_text}
                  data-motion-image
                  data-motion-zoom="strong"
                  className="folio-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col border-t border-zinc-200 pt-4 gap-3 md:flex-row md:justify-between md:items-start md:gap-0">
                <div>
                  <h3 className="font-body text-lg font-normal tracking-tight text-black">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{project.location}</p>
                  {project.description && (
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed max-w-xs">
                      {project.description}
                    </p>
                  )}
                </div>
                <span className="self-start text-xs font-light text-zinc-400 uppercase tracking-wider bg-zinc-100 px-3 py-1 rounded-full md:ml-4 md:shrink-0">
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

      {/* ABOUT */}
      <section id="about" data-motion-section className="py-32 px-6 md:px-12 bg-zinc-50 border-t border-zinc-200">
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
              <p>Based in Abuja. Available for projects across Nigeria and beyond.</p>
            </div>
            <div className="mt-12 flex gap-6 flex-wrap">
              <Link
                href="/about"
                className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
              >
                Full Profile →
              </Link>
              <ContactButton variant="about" />
            </div>
          </div>
          <div className="lg:col-span-5 w-full flex justify-end">
            <div data-motion-slide className="relative aspect-square w-full max-w-md bg-zinc-200 overflow-hidden grayscale contrast-115 shadow-2xl border border-zinc-300">
              <img
                src={profileData.image.startsWith('/') ? profileData.image : `/${profileData.image}`}
                alt={profileData.alt}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section data-motion-section className="py-24 px-6 md:px-12 bg-white border-t border-zinc-200">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Clients</p>
            <h2 className="font-display text-4xl font-light">What they say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {testimonials.map((t: any, i: number) => (
              <div key={i} data-motion-card className="flex flex-col justify-between border-t border-zinc-200 pt-8">
                <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed text-zinc-800 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-normal text-black">{t.name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{t.title}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-zinc-300">{t.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* JOURNAL PREVIEW */}
      {posts && posts.length > 0 && (
        <section data-motion-section className="py-24 px-6 md:px-12 border-t border-zinc-200">
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
                data-motion-card
                className="group flex flex-col md:flex-row md:items-start md:gap-16 py-8 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-400 md:w-32 shrink-0 mb-2 md:mb-0">
                  {formatDate(post.date)}
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

      {/* FOOTER — FIX: stacks vertically on mobile */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <p>© 2026 Abdulrahman. All rights reserved.</p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-6 md:items-center">
            <span className="text-zinc-600">Available for projects across Nigeria and beyond</span>
            <a href="mailto:hello@adav33ze.com" className="hover:text-white transition-colors">
              hello@adav33ze.com
            </a>
            <a
              href="https://wa.me/2348065506222"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp →
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}