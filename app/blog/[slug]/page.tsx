import Link from 'next/link'
import NavBar from '../../components/NavBar'
import blogData from '../../../data/blog.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = blogData.posts.find((p) => p.slug === slug)
  return {
    title: post ? `${post.title} — Abdulrahman` : 'Post Not Found — Abdulrahman',
    description: post?.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogData.posts.find((p) => p.slug === slug)
  const postIndex = blogData.posts.findIndex((p) => p.slug === slug)
  const prevPost = postIndex > 0 ? blogData.posts[postIndex - 1] : null
  const nextPost = postIndex < blogData.posts.length - 1 ? blogData.posts[postIndex + 1] : null

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h1 className="font-display text-2xl font-light mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-xs uppercase tracking-widest border-b border-black pb-1">
          Back to Journal
        </Link>
      </div>
    )
  }

  const paragraphs = post.body.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAV */}
      <NavBar forceLight />

      {/* ARTICLE */}
      <article className="pt-40 pb-24 px-6 md:px-12">
        <header className="max-w-3xl mx-auto mb-16 pb-12 border-b border-zinc-200">
          {/* FIX: stack breadcrumb vertically on mobile, hide divider on mobile */}
          <div className="flex flex-col gap-2 mb-8 text-xs uppercase tracking-widest text-zinc-400 md:flex-row md:items-center md:gap-6">
            <Link href="/blog" className="hover:text-black transition-colors">← Journal</Link>
            <span className="hidden md:inline-block w-8 h-px bg-zinc-300" />
            <span>{post.date}</span>
          </div>
          {/* FIX: text-3xl base (was text-4xl) — post titles can be long */}
          <h1 className="font-display text-3xl md:text-6xl font-light tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="max-w-3xl mx-auto space-y-6">
          <p className="font-body text-base md:text-xl font-light leading-relaxed text-zinc-700">
            {post.excerpt}
          </p>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="font-body text-sm md:text-base font-light leading-relaxed text-zinc-600">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* PREV / NEXT */}
      <nav className="border-t border-zinc-200 px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">← Previous</span>
                <span className="font-display text-xl font-light group-hover:opacity-60 transition-opacity">{prevPost.title}</span>
              </Link>
            )}
          </div>
          <div className="md:text-right">
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Next →</span>
                <span className="font-display text-xl font-light group-hover:opacity-60 transition-opacity">{nextPost.title}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* FOOTER — FIX: stacks vertically on mobile */}
      <footer className="bg-black text-zinc-500 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <p>© 2026 Abdulrahman. All rights reserved.</p>
          <Link href="/blog" className="hover:text-white transition-colors">Back to Journal</Link>
        </div>
      </footer>

    </div>
  )
}
