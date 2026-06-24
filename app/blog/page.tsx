import Link from 'next/link'
import NavBar from '../components/NavBar'
import blogData from '../../data/blog.json'

export const metadata = {
  title: 'Journal — Abdulrahman',
  description: 'Notes on architecture, interior design, and the built environment from Abdulrahman, based in Abuja, Nigeria.',
}

export default function BlogPage() {
  const posts = blogData.posts

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAV */}
      <NavBar forceLight />

      {/* HEADER */}
      <header className="pt-40 pb-16 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4">Journal</p>
          {/* FIX: text-4xl base (was text-5xl) */}
          <h1 className="font-display text-4xl md:text-7xl font-light tracking-tight max-w-2xl">
            Writing on Space & Construction
          </h1>
        </div>
      </header>

      {/* POSTS LIST */}
      <main className="px-6 md:px-12 max-w-7xl mx-auto">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col md:flex-row md:items-start md:gap-16 py-12 border-b border-zinc-100 hover:border-zinc-300 transition-colors"
          >
            <div className="flex md:flex-col gap-6 md:gap-2 mb-4 md:mb-0 md:w-40 shrink-0">
              <span className="text-xs text-zinc-300 font-light tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                {post.date}
              </span>
            </div>
            <div className="flex-1 max-w-2xl">
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-black mb-3 group-hover:opacity-60 transition-opacity duration-300">
                {post.title}
              </h2>
              <p className="font-body text-sm font-light text-zinc-500 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="hidden md:flex items-center self-center ml-auto pl-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs uppercase tracking-widest text-zinc-400">Read →</span>
            </div>
          </Link>
        ))}
      </main>

      {/* FOOTER — FIX: stacks vertically on mobile */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 mt-24">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <p>© 2026 Abdulrahman. All rights reserved.</p>
          <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
        </div>
      </footer>

    </div>
  )
}
