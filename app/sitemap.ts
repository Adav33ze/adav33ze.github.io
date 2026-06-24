import type { MetadataRoute } from 'next'
import portfolioData from '../data/portfolio.json'
import blogData from '../data/blog.json'

export const dynamic = 'force-static'

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adav33ze.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = portfolioData.projects.map((p: any) => ({
    url: `${baseUrl}/work/${p.slug || p.id || slugify(p.title)}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
