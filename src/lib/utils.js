import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind class merger (required by shadcn pattern)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Estimate reading time
export function readingTime(content) {
  const words = content?.trim().split(/\s+/).length ?? 0
  const mins = Math.ceil(words / 200)
  return `${mins} min read`
}

// Slugify text
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// GSAP default ease
export const EASE_OUT_EXPO = 'power4.out'
export const EASE_IN_OUT = 'power4.inOut'
