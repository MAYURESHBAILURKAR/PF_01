// Centralized site identity & SEO metadata.
// Single source of truth — used by JSON-LD, meta tags, sitemap, and noscript fallback.

export const SITE_URL = 'https://mayuresh-portfolio.pages.dev'
export const SITE_NAME = 'Mayuresh Bailurkar'
export const SITE_SHORT_NAME = 'MB Portfolio'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
export const AUTHOR_AVATAR = `${SITE_URL}/favicon.svg`

export const SITE = {
  url: SITE_URL,
  name: SITE_NAME,
  shortName: SITE_SHORT_NAME,
  title: 'Mayuresh Bailurkar — Software Developer at Firsteigen | Angular, React, Node.js',
  description:
    'Mayuresh Bailurkar is a Software Developer at Firsteigen, specializing in Angular, TypeScript, React, Node.js, MongoDB, microservices, and AI integrations. Building production web and mobile applications from Pune, India.',
  tagline: 'Building scalable, elegant, AI-driven web and mobile applications.',
  ogImage: DEFAULT_OG_IMAGE,
  twitterHandle: '@mayureshb_',
  twitterSiteId: 'mayureshb_',
  locale: 'en_US',
  authorEmail: 'mayureshbailurkar@gmail.com',
  authorLocation: {
    city: 'Pune',
    region: 'Maharashtra',
    country: 'IN',
    countryName: 'India',
    geo: { latitude: '18.5204', longitude: '73.8567' },
  },
  // Authoritative social profiles used by Person.sameAs and pass Entity Disambiguation
  social: {
    github: 'https://github.com/MAYURESHBAILURKAR',
    linkedin: 'https://linkedin.com/in/mayuresh-bailurkar',
    twitter: 'https://x.com/mayuresh_b',
  },
  // Canonical domain entities that AI engines can ground queries against
  sameAsProfiles: [
    'https://github.com/MAYURESHBAILURKAR',
    'https://linkedin.com/in/mayuresh-bailurkar',
    'https://x.com/mayuresh_b',
  ],
}

// ── Helpers ─────────────────────────────────────────────────
export function makeAbsolute(path) {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

// ── Fact snippets used by both visible copy & AI metadata ────
// These are stable, AEO-targeted facts that the Person/Organization
// schemas reference verbatim so AI engines see consistent truth.
export const FACTS = {
  whoIs:
    'Mayuresh Bailurkar is a Full-Stack Software Developer, based in Pune, India. He has shipped production web and mobile applications since 2023 using Angular, React, TypeScript, Node.js, MongoDB, and Docker, with a particular focus on microservices architecture and AI-powered features.',
  specializes:
    'Mayuresh specializes in Angular (v17–v19 with Signals), React and React Native, Node.js microservices with Express, MongoDB data modeling, JWT and OAuth authentication, Stripe payments, and integrating AI services such as the Gemini API.',
  value:
    'Mayuresh delivers production-grade full-stack applications: REST APIs with proper error handling, Docker-based deployments, role-based access control, biometric authentication, and performance-tuned UIs with measured 30% responsiveness improvements on enterprise dashboards.',
  problems:
    'He solves problems such as scaling monoliths into microservices, building offline-first mobile apps, designing RBAC for fintech and loyalty platforms, integrating AI messaging into legacy APIs, and shipping secure cross-platform applications on tight deadlines.',
  strengths:
    'Strongest technical strengths include TypeScript, system design for distributed services, clean REST API architecture, performance optimization (lazy loading, FlatList tuning, indexing, caching), and zero-to-one product engineering from design system to deploy.',
  industries:
    'Industries: fintech (banking and payment apps), logistics (warehouse management, shipment tracking), e-commerce (Stripe-checkout MERN platforms), and loyalty platforms.',
  hireWhy:
    'Companies hire Mayuresh for fast, reliable end-to-end delivery: he architects the backend, builds the frontend, ships the mobile app, containerizes with Docker, and integrates AI features — without handoff friction between teams.',
}

// ── AI-friendly page metadata ────────────────────────────────
export function buildMeta({
  title,
  description,
  path = '/',
  type = 'website',
  ogImage,
  ogImageAlt,
  article,
  noindex = false,
  keywords,
} = {}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE.title
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
    keywords,
  }
}

export const PAGE_SEO = {
  home: buildMeta({
    title: 'Software Developer at Firsteigen — Angular, React, Node.js',
    description:
      'Mayuresh Bailurkar is a Pune-based Software Developer at Firsteigen, shipping scalable Angular, React, Node.js, MongoDB, and microservices applications with AI integrations — view his projects, blog, and experience.',
    path: '/',
    keywords: [
      'Mayuresh Bailurkar',
      'Firsteigen',
      'Software Developer',
      'Angular Developer',
      'Frontend Developer',
      'TypeScript Developer',
      'React Developer',
      'Node.js Developer',
      'Full-Stack Developer',
      'Microservices',
      'Software Engineer Pune',
    ],
  }),
  about: buildMeta({
    title: 'About — Software Developer at Firsteigen | Angular Developer',
    description:
      'Learn about Mayuresh Bailurkar — a Software Developer currently at Firsteigen with 3+ years of experience delivering Angular, React, Node.js, Ionic, and microservices applications for fintech and logistics clients.',
    path: '/about',
    keywords: [
      'Mayuresh Bailurkar',
      'Firsteigen',
      'Software Developer',
      'Angular Developer',
      'Frontend Developer',
      'TypeScript Developer',
    ],
  }),
  projects: buildMeta({
    title: 'Projects — Full-Stack, Mobile & Microservices',
    description:
      'Explore projects by Mayuresh Bailurkar including microservices platforms with AI, React Native logistics apps, Angular fintech applications with biometric auth, loyalty platforms, and MERN e-commerce sites.',
    path: '/projects',
  }),
  blog: buildMeta({
    title: 'Blog — Articles on React, Angular, Node.js & Architecture',
    description:
      'Technical articles by Mayuresh Bailurkar on React Native performance, Angular Signals, microservices architecture, offline-first mobile development, and real-world engineering trade-offs.',
    path: '/blog',
  }),
  contact: buildMeta({
    title: 'Contact — Hire a Full-Stack Software Developer',
    description:
      'Get in touch with Mayuresh Bailurkar, Software Developer at Firsteigen, for freelance projects, full-time opportunities, or collaboration on web and mobile products. Based in Pune, India - remote worldwide.',
    path: '/contact',
  }),
}

// ── Project & Blog SEO builders ──────────────────────────────
export function projectSEO(project) {
  return buildMeta({
    title: `${project.title} — ${project.tags.slice(0, 2).join(', ')} Project`,
    description: project.description,
    path: `/projects/${project.id}`,
    type: 'website',
  })
}

export function blogPostSEO(post) {
  // Build a clean description by stripping markdown headings/formatting
  // from the first meaningful paragraph (often a TL;DR for AI engines).
  const cleaned = (post.content || '')
    .replace(/^#.*$/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/[*`#>_]/g, '')
    .trim()

  const summary =
    cleaned.length > 155 ? cleaned.slice(0, 152).trim() + '…' : cleaned

  return buildMeta({
    title: post.title,
    description:
      summary.length > 40
        ? summary
        : (post.excerpt || `${post.title} — a technical article by Mayuresh Bailurkar.`),
    path: `/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: post.date,
      author: post.author || SITE.name,
      tags: post.tags,
    },
  })
}
