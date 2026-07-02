import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, PAGE_SEO, projectSEO, blogPostSEO, makeAbsolute } from '@/lib/seoConfig'
import {
  baseJsonLd,
  webPageJsonLd,
  profilePageJsonLd,
  breadcrumbJsonLd,
  projectJsonLd,
  articleJsonLd,
  contactPageJsonLd,
  faqJsonLd,
  speakableJsonLd,
} from '@/lib/jsonLd'

let baseInjected = false

function ensureEl(tag, attrKey, attrVal) {
  let el = document.querySelector(`${tag}[${attrKey}="${attrVal}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(attrKey, attrVal)
    document.head.appendChild(el)
  }
  return el
}

function removeEl(tag, attrKey, attrVal) {
  const el = document.querySelector(`${tag}[${attrKey}="${attrVal}"]`)
  if (el) el.remove()
}

function setMeta(attrKey, attrVal, content) {
  const el = ensureEl('meta', attrKey, attrVal)
  if (content !== undefined && content !== null) el.setAttribute('content', content)
}

function setLink(rel, hrefval, extra = {}) {
  const sel = `link[rel="${rel}"]${hrefval ? `[href="${hrefval}"]` : ''}`
  let el = document.querySelector(sel)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hrefval) el.setAttribute('href', hrefval)
    document.head.appendChild(el)
  }
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
}

function injectBaseMeta() {
  if (baseInjected) return
  baseInjected = true

  // Static OG/Twitter identity (site-level)
  setMeta('property', 'og:site_name', SITE.name)
  setMeta('property', 'og:locale', SITE.locale)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:site', SITE.twitterHandle)

  // Base JSON-LD @graph (Person, Organization, WebSite)
  const baseScript = document.createElement('script')
  baseScript.type = 'application/ld+json'
  baseScript.setAttribute('data-ld', 'base-graph')
  baseScript.textContent = JSON.stringify(baseJsonLd())
  document.head.appendChild(baseScript)

  // Speakable spec for AI voice
  const speakableScript = document.createElement('script')
  speakableScript.type = 'application/ld+json'
  speakableScript.setAttribute('data-ld', 'speakable')
  speakableScript.textContent = JSON.stringify(speakableJsonLd())
  document.head.appendChild(speakableScript)
}

function applySEO(meta) {
  document.title = meta.title

  // Core meta
  setMeta('name', 'description', meta.description)
  setLink('canonical', meta.canonical)

  // Open Graph
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', meta.canonical)
  setMeta('property', 'og:type', meta.type)
  setMeta('property', 'og:image', meta.ogImage)
  setMeta('property', 'og:image:alt', meta.ogImageAlt)
  setMeta('property', 'og:image:width', '1200')
  setMeta('property', 'og:image:height', '630')

  // Twitter
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', meta.ogImage)
  setMeta('name', 'twitter:image:alt', meta.ogImageAlt)

  // Robots
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'
  setMeta('name', 'robots', robots)

  // Article meta (blog posts)
  if (meta.article) {
    setMeta('property', 'article:published_time', meta.article.publishedTime)
    setMeta('property', 'article:author', meta.article.author)
    ;(meta.article.tags || []).forEach((tag, i) => {
      removeEl('meta', 'property', `article:tag${i}`)
      setMeta('property', `article:tag${i}`, tag)
    })
  }

  // Keywords (optional, for Bing/DuckDuckGo)
  if (meta.keywords) {
    setMeta('name', 'keywords', meta.keywords.join(', '))
  }

  // ── Dynamic JSON-LD per page ──────────────────────────────
  // Remove previous page-level schemas (keep base-graph & speakable)
  document.querySelectorAll('script[data-ld="page"]').forEach(s => s.remove())
  document.querySelectorAll('script[data-ld="breadcrumb"]').forEach(s => s.remove())
  document.querySelectorAll('script[data-ld="project"]').forEach(s => s.remove())
  document.querySelectorAll('script[data-ld="article"]').forEach(s => s.remove())
  document.querySelectorAll('script[data-ld="contact"]').forEach(s => s.remove())
  document.querySelectorAll('script[data-ld="faq"]').forEach(s => s.remove())

  // WebPage / ProfilePage schema
  const pageType = meta.path === '/' ? 'WebPage' : meta.path === '/about' ? 'ProfilePage' : 'WebPage'
  const pageSchema = pageType === 'ProfilePage'
    ? profilePageJsonLd({ title: meta.title, path: meta.path, description: meta.description })
    : webPageJsonLd({ title: meta.title, path: meta.path, description: meta.description })

  const pageScript = document.createElement('script')
  pageScript.type = 'application/ld+json'
  pageScript.setAttribute('data-ld', 'page')
  pageScript.textContent = JSON.stringify(pageSchema)
  document.head.appendChild(pageScript)
}

export function useSEO(meta) {
  useEffect(() => {
    injectBaseMeta()
    applySEO(meta)
  }, [meta])
}

export function useJsonLd(data) {
  useEffect(() => {
    if (!data) return
    const key = typeof data === 'object' && data?.['@type']
      ? `ld-${Array.isArray(data['@type']) ? data['@type'][0] : data['@type']}`
      : 'ld-custom'

    document.querySelectorAll(`script[data-ld="${key}"]`).forEach(s => s.remove())

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-ld', key)
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.querySelectorAll(`script[data-ld="${key}"]`).forEach(s => s.remove())
    }
  }, [data])
}

// Convenience re-exports for pages
export { PAGE_SEO, projectSEO, blogPostSEO, breadcrumbJsonLd, projectJsonLd, articleJsonLd, contactPageJsonLd, faqJsonLd }
export { makeAbsolute }