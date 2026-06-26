import { SITE } from '@/lib/seoConfig'

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mayuresh Bailurkar',
    url: SITE.url,
    jobTitle: 'Full-Stack Software Developer',
    description: SITE.description,
    email: 'mayureshbailurkar@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://github.com/MAYURESHBAILURKAR',
      'https://linkedin.com/in/mayuresh-bailurkar',
    ],
    knowsAbout: [
      'Angular', 'React', 'React Native', 'Node.js', 'Express.js',
      'MongoDB', 'TypeScript', 'JavaScript', 'Microservices',
      'REST APIs', 'Docker', 'Ionic', 'Redux', 'Tailwind CSS',
      'GSAP', 'Stripe', 'JWT', 'OAuth',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'KLE Engineering College, Belgaum',
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageJsonLd({ title, path, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: `${SITE.url}${path}`,
    description,
    isPartOf: { '@id': `${SITE.url}#website` },
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path ? `${SITE.url}${item.path}` : undefined,
    })),
  }
}

export function projectJsonLd(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    programmingLanguage: project.tags.join(', '),
    url: project.live && project.live !== '#' ? project.live : undefined,
    codeRepository: project.github && project.github !== '#' ? project.github : undefined,
    author: { '@id': `${SITE.url}#person` },
  }
}

export function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.content.substring(0, 155).replace(/[#*`]/g, '') + '...',
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Mayuresh Bailurkar',
      url: SITE.url,
    },
    publisher: {
      '@type': 'Person',
      name: 'Mayuresh Bailurkar',
      url: SITE.url,
    },
    keywords: post.tags?.join(', '),
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  }
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Mayuresh Bailurkar',
    url: `${SITE.url}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Mayuresh Bailurkar',
      email: 'mayureshbailurkar@gmail.com',
      telephone: undefined,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: 'mayureshbailurkar@gmail.com',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
    },
  }
}
