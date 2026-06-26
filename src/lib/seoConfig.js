const SITE_URL = 'https://mayureshbailurkar.dev'
const SITE_NAME = 'Mayuresh Bailurkar'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export const SITE = {
  url: SITE_URL,
  name: SITE_NAME,
  title: 'Mayuresh Bailurkar — Full-Stack Software Developer',
  description: 'Full-Stack Software Developer specializing in Angular, React, Node.js, and microservices. Building scalable, elegant web and mobile applications from Pune, India.',
  ogImage: DEFAULT_OG_IMAGE,
  twitterHandle: '@mayureshb_',
  locale: 'en_US',
}

function makeAbsolute(path) {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

export function buildMeta({
  title,
  description,
  path = '/',
  type = 'website',
  ogImage,
  ogImageAlt,
  article,
  noindex = false,
} = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE.title
  const fullDesc = description || SITE.description
  const fullOgImage = ogImage ? makeAbsolute(ogImage) : SITE.ogImage
  const canonical = makeAbsolute(path)
  const ogImageAltFinal = ogImageAlt || `${SITE_NAME} — Software Developer Portfolio`

  return {
    title: fullTitle,
    description: fullDesc,
    canonical,
    path,
    type,
    ogImage: fullOgImage,
    ogImageAlt: ogImageAltFinal,
    noindex,
    article,
  }
}

export const PAGE_SEO = {
  home: buildMeta({
    title: 'Full-Stack Software Developer — Angular, React, Node.js',
    description: 'Mayuresh Bailurkar is a Full-Stack Software Developer specializing in Angular, React, Node.js, MongoDB, and microservices. View projects, blog, and experience.',
    path: '/',
  }),
  about: buildMeta({
    title: 'About — Experience, Skills & Background',
    description: 'Learn about Mayuresh Bailurkar — a Full-Stack Software Developer with expertise in Angular, React, Node.js, and microservices. Based in Pune, India.',
    path: '/about',
  }),
  projects: buildMeta({
    title: 'Projects — Full-Stack & Mobile Applications',
    description: 'Explore projects by Mayuresh Bailurkar including microservices platforms, React Native logistics apps, Angular fintech applications, and MERN e-commerce sites.',
    path: '/projects',
  }),
  blog: buildMeta({
    title: 'Blog — Articles on React, Angular, Node.js & Architecture',
    description: 'Technical articles by Mayuresh Bailurkar covering React Native, Angular Signals, microservices architecture, and performance optimization.',
    path: '/blog',
  }),
  contact: buildMeta({
    title: 'Contact — Hire a Full-Stack Developer',
    description: 'Get in touch with Mayuresh Bailurkar for freelance projects, full-time opportunities, or collaboration. Available for new opportunities.',
    path: '/contact',
  }),
}

export function projectSEO(project) {
  return buildMeta({
    title: `${project.title} — ${project.tags.slice(0, 2).join(', ')} Project`,
    description: project.description,
    path: `/projects/${project.id}`,
    type: 'website',
  })
}

export function blogPostSEO(post) {
  return buildMeta({
    title: post.title,
    description: post.content.substring(0, 155).replace(/[#*`]/g, '') + '...',
    path: `/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: post.date,
      author: post.author || 'Mayuresh Bailurkar',
      tags: post.tags,
    },
  })
}
