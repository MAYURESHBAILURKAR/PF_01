/**
 * Production-grade JSON-LD generator using @graph with proper @id cross-references.
 * Each entity declares canonical @id so crawlers can deduplicate and build
 * a connected Knowledge Graph instead of isolated fragments.
 *
 * Usage:
 *   import { baseJsonLd, pageJsonLd, projectJsonLd, articleJsonLd, faqJsonLd } from '@/lib/jsonLd'
 *   useJsonLd(baseJsonLd())  // injects site-level graph once
 *   useJsonLd(pageJsonLd({...}))  // injects page-specific graph
 */

import { SITE, SITE_URL, FACTS, SITE_NAME } from '@/lib/seoConfig'

// ── Canonical @id anchors (stable, globally unique) ───────────────────
const ID = {
  website: `${SITE_URL}#website`,
  person: `${SITE_URL}#person`,
  organization: `${SITE_URL}#organization`,
  image: `${SITE_URL}/og-image.png`,
  avatar: `${SITE_URL}/favicon.svg`,
}

// ── Person schema: rich, entity-connected, AI-disambiguation ready ──
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': ID.person,
    name: SITE_NAME,
    alternateName: 'MB',
    url: SITE_URL,
    email: SITE.authorEmail,
    jobTitle: [
      'Software Developer at Firsteigen',
      'Full-Stack Developer',
      'Angular Developer',
      'Frontend Developer',
      'TypeScript Developer',
      'Backend Developer',
      'Mobile Application Developer',
    ],
    description: FACTS.whoIs,
    knowsAbout: [
      'Angular (v17-v19) with Signals',
      'React 18+ & React Native (Expo)',
      'Node.js & Express.js Microservices',
      'MongoDB Data Modeling & Indexing',
      'TypeScript & JavaScript (ES2024+)',
      'Docker Containerization',
      'JWT & OAuth 2.0 Authentication',
      'Stripe Payment Integration',
      'Google Gemini AI API Integration',
      'REST API Design & Versioning',
      'RBAC & Permission Systems',
      'Ionic & Capacitor Cross-Platform',
      'GSAP Animation',
      'Tailwind CSS & CSS Architecture',
      'Performance Optimization',
    ],
    sameAs: SITE.sameAsProfiles,
    image: ID.avatar,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.authorLocation.city,
      addressRegion: SITE.authorLocation.region,
      addressCountry: SITE.authorLocation.country,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'KLE Engineering College, Belgaum',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Belgaum',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      url: 'https://kletech.ac.in/',
      sameAs: 'https://kletech.ac.in/',
    },
    worksFor: { '@id': ID.organization },
    knowsLanguage: ['English', 'Hindi', 'Marathi'],
    gender: 'Male',
  }
}

// ── Organization (personal brand) – enables "Employer" queries ──
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID.organization,
    name: `${SITE_NAME} — Software Development`,
    alternateName: 'MB Development',
    url: SITE_URL,
    logo: ID.image,
    sameAs: SITE.sameAsProfiles,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional',
      email: SITE.authorEmail,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    founder: { '@id': ID.person },
    employee: { '@id': ID.person },
    knowsAbout: [
      'Full-Stack Web Development',
      'Mobile Application Development',
      'Microservices Architecture',
      'AI Integration',
      'Fintech Applications',
      'Logistics Software',
      'E-commerce Platforms',
      'Loyalty Management Systems',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.authorLocation.city,
      addressRegion: SITE.authorLocation.region,
      addressCountry: SITE.authorLocation.country,
    },
  }
}

// ── WebSite (root entity) – search action, publisher link ──────────
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID.website,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE_URL,
    description: SITE.description,
    publisher: { '@id': ID.organization },
    author: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── WebPage / ProfilePage – every page gets one with @id -----------
export function webPageJsonLd({ title, path, description, type = 'WebPage' }) {
  const url = `${SITE_URL}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#${type.toLowerCase()}`,
    name: title,
    url,
    description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    author: { '@id': ID.person },
    publisher: { '@id': ID.organization },
    copyrightHolder: { '@id': ID.person },
    dateCreated: '2023-02-16',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
    potentialAction: type === 'WebPage' ? undefined : {
      '@type': 'ReadAction',
      target: [{ '@type': 'EntryPoint', urlTemplate: url }],
    },
  }
}

export function profilePageJsonLd({ title, path, description }) {
  return webPageJsonLd({ title, path, description, type: 'ProfilePage' })
}

// ── BreadcrumbList with proper @id for every item ──────────────────
export function breadcrumbJsonLd(items) {
  const base = SITE_URL
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1]?.path ? `${base}${items[items.length - 1].path}` : base}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path ? `${base}${item.path}` : undefined,
      '@id': item.path ? `${base}${item.path}#breadcrumb-${i + 1}` : undefined,
    })),
  }
}

// ── Project → SoftwareSourceCode + CreativeWork (rich project card) ──
export function projectJsonLd(project) {
  const baseUrl = `${SITE_URL}/projects/${project.id}`
  const hasLive = project.live && project.live !== '#'
  const hasGithub = project.github && project.github !== '#'

  return {
    '@context': 'https://schema.org',
    '@type': ['SoftwareSourceCode', 'CreativeWork'],
    '@id': `${baseUrl}#project`,
    name: project.title,
    alternateName: `Project ${project.num}`,
    description: project.description,
    url: baseUrl,
    codeRepository: hasGithub ? project.github : undefined,
    downloadUrl: hasGithub ? project.github : undefined,
    runtimePlatform: project.tags.join(', '),
    programmingLanguage: project.tags
      .filter(t => /javascript|typescript|python|go|dart|java|kotlin|swift|c#|cpp|c\+\+|rust/i.test(t))
      .join(', ') || 'TypeScript, JavaScript',
    author: { '@id': ID.person },
    creator: { '@id': ID.person },
    publisher: { '@id': ID.organization },
    dateCreated: '2023-02-16',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
    keywords: project.tags,
    featureList: project.tags.slice(0, 5),
    workExample: hasLive ? project.live : undefined,
    screenshot: project.images?.[0] || undefined,
    softwareVersion: '1.0.0',
    license: 'https://opensource.org/licenses/MIT',
    operatingSystem: 'Cross-platform',
    category: 'Software Application',
    applicationCategory: 'DeveloperApplication',
    offers: hasLive ? {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: project.live,
    } : undefined,
  }
}

// ── Blog Post → Article + CreativeWork ───────────────────────────
export function articleJsonLd(post) {
  const baseUrl = `${SITE_URL}/blog/${post.slug}`
  const cleaned = (post.content || '')
    .replace(/^#.*$/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/[*`#>_]/g, '')
    .trim()

  return {
    '@context': 'https://schema.org',
    '@type': ['Article', 'CreativeWork', 'BlogPosting'],
    '@id': `${baseUrl}#article`,
    headline: post.title,
    alternativeHeadline: post.excerpt || undefined,
    description: cleaned.length > 155 ? cleaned.slice(0, 152) + '…' : cleaned,
    articleBody: post.content,
    url: baseUrl,
    mainEntityOfPage: { '@id': `${baseUrl}#webpage` },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@id': ID.person,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@id': ID.organization,
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}#logo`,
        url: ID.image,
        width: 600,
        height: 60,
      },
    },
    copyrightHolder: { '@id': ID.person },
    inLanguage: 'en-US',
    keywords: post.tags?.join(', ') || undefined,
    articleSection: 'Technology',
    wordCount: post.content?.split(/\s+/).length || 0,
    image: post.image ? `${SITE_URL}${post.image}` : ID.image,
    imageAlt: post.imageAlt || `${SITE_NAME} — ${post.title}`,
    timeRequired: post.readingTime ? `PT${post.readingTime.replace(' min read', 'M')}` : undefined,
    about: post.tags?.map(tag => ({
      '@type': 'Thing',
      name: tag,
    })) || [],
    mentions: post.tags?.map(tag => ({
      '@type': 'Thing',
      name: tag,
    })) || [],
    isPartOf: { '@id': ID.website },
  }
}

// ── ContactPage ───────────────────────────────────────────────────
export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#contactpage`,
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description:
      'Contact Mayuresh Bailurkar, Software Developer at Firsteigen, for freelance projects, full-time opportunities, or collaboration on web and mobile products.',
    mainEntity: {
      '@type': 'Person',
      '@id': ID.person,
      name: SITE_NAME,
      email: SITE.authorEmail,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: SITE.authorEmail,
        areaServed: 'IN',
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
          timeZone: 'Asia/Kolkata',
        },
      },
    },
    isPartOf: { '@id': ID.website },
  }
}

// ── FAQPage – top AI citation surface ─────────────────────────────
export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faqpage`,
    mainEntity: faqs.map((faq, i) => ({
      '@type': 'Question',
      '@id': `${SITE_URL}/faq#question-${i + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `${SITE_URL}/faq#answer-${i + 1}`,
        text: faq.answer,
      },
    })),
  }
}

// ── HowTo (optional – for "how to hire/engage" use cases) ────────
export function howToJsonLd({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/hire#howto`,
    name,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [],
    tool: [],
  }
}

// ── SpeakableSpecification – AI voice/read-aloud optimization ─────
export function speakableJsonLd(cssSelectors) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}#speakable`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors || [
        '.hero-desc',
        'section[aria-labelledby="skills-heading"] p',
        'article p:first-of-type',
        '.pd-meta p',
      ],
    },
  }
}

// ── ImageObject – reusable for OG & article images ───────────────
export function imageObjectJsonLd({ url, caption, alt, width, height }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${url}#image`,
    contentUrl: url,
    caption,
    description: alt,
    width: width || 1200,
    height: height || 630,
    creator: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    acquireLicensePage: `${SITE_URL}/contact`,
  }
}

// ── Master @graph builder – combine base + page into single document ──
/**
 * Call this ONCE per page (e.g., in layout) to inject the full
 * interconnected Knowledge Graph. Page-specific schemas should
 * be added separately via useJsonLd so they reference the same @ids.
 */
export function baseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteJsonLd(),
      organizationJsonLd(),
      personJsonLd(),
    ],
  }
}