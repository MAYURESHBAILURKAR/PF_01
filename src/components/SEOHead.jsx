import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, PAGE_SEO, projectSEO, blogPostSEO } from '@/lib/seoConfig'
import {
  personJsonLd, websiteJsonLd, webPageJsonLd, breadcrumbJsonLd,
  projectJsonLd, articleJsonLd, contactPageJsonLd,
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

  setMeta('property', 'og:site_name', SITE.name)
  setMeta('property', 'og:locale', SITE.locale)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:site', SITE.twitterHandle)

  const personScript = document.createElement('script')
  personScript.type = 'application/ld+json'
  personScript.setAttribute('data-ld', 'person')
  personScript.textContent = JSON.stringify(personJsonLd())
  document.head.appendChild(personScript)

  const siteScript = document.createElement('script')
  siteScript.type = 'application/ld+json'
  siteScript.setAttribute('data-ld', 'website')
  siteScript.textContent = JSON.stringify(websiteJsonLd())
  document.head.appendChild(siteScript)
}

function applySEO(meta) {
  document.title = meta.title

  setMeta('name', 'description', meta.description)
  setLink('canonical', meta.canonical)

  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', meta.canonical)
  setMeta('property', 'og:type', meta.type)
  setMeta('property', 'og:image', meta.ogImage)
  setMeta('property', 'og:image:alt', meta.ogImageAlt)

  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', meta.ogImage)
  setMeta('name', 'twitter:image:alt', meta.ogImageAlt)

  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow'
  setMeta('name', 'robots', robots)

  if (meta.article) {
    setMeta('property', 'article:published_time', meta.article.publishedTime)
    setMeta('property', 'article:author', meta.article.author)
    ;(meta.article.tags || []).forEach((tag, i) => {
      removeEl('meta', 'property', `article:tag${i}`)
      setMeta('property', `article:tag${i}`, tag)
    })
  }

  // Dynamic JSON-LD per page
  document.querySelectorAll('script[data-ld="page"]').forEach(s => s.remove())

  const pageScript = document.createElement('script')
  pageScript.type = 'application/ld+json'
  pageScript.setAttribute('data-ld', 'page')
  pageScript.textContent = JSON.stringify(webPageJsonLd({
    title: meta.title,
    path: meta.path,
    description: meta.description,
  }))
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
    const key = typeof data === 'object' && data['@type'] ? `ld-${data['@type']}` : 'ld-custom'
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

export { PAGE_SEO, projectSEO, blogPostSEO, breadcrumbJsonLd, projectJsonLd, articleJsonLd, contactPageJsonLd }
