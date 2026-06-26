import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Framer Motion
            if (id.includes('framer-motion')) {
              return 'motion'
            }
            // GSAP + ScrollTrigger
            if (id.includes('gsap')) {
              return 'gsap'
            }
            // React + React DOM + Router
            if (id.includes('react-dom') ||
                id.includes('react-router') ||
                id.includes('@remix-run')) {
              return 'react'
            }
            // Lenis smooth scroll
            if (id.includes('@studio-freight/lenis') || id.includes('lenis')) {
              return 'scroll'
            }
            // React Hook Form — only used on /contact
            if (id.includes('react-hook-form')) {
              return 'form'
            }
            // NOTE: react-syntax-highlighter, react-markdown, remark-gfm, prismjs
            // are intentionally NOT split into a shared "blog-libs" chunk.
            // Manual chunking here caused a circular reference through vendor
            // (TDZ error: "Cannot access 'Oe' before initialization").
            // Letting them bundle into the lazy BlogPost page chunk keeps
            // everything self-contained and avoids the cross-chunk race.
            // Everything else (zustand, axios, etc.)
            return 'vendor'
          }
          // Blog post content — large markdown, only needed on /blog routes
          if (id.includes('samplePosts')) {
            return 'blog-data'
          }
        },
      },
    },
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})