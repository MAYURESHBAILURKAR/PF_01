import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'

// Layout
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Animations
import Preloader from '@/components/animations/Preloader'
import { PageTransitionOverlay } from '@/components/animations/PageTransition'

// Pages — Home is eager (LCP), rest are lazy-split
import HomePage from '@/pages/Home'
const AboutPage = lazy(() => import('@/pages/About'))
const ProjectsPage = lazy(() => import('@/pages/Projects'))
const BlogPage = lazy(() => import('@/pages/Blog'))
const BlogPostPage = lazy(() => import('@/pages/BlogPost'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetail'))
const AdminLoginPage = lazy(() => import('@/pages/admin/Login'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))

// Scroll
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { ScrollProgressBar } from '@/hooks/useScrollEffects'
import { getLenis } from '@/hooks/useSmoothScroll'

// Reset scroll position on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

// Store
import { useAuthStore } from '@/store'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

// Layout wrapper
function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

// Minimal fallback shown while a lazy route chunk loads
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// All routes
function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <PageTransitionOverlay />
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><AboutPage /></SiteLayout>} />
          <Route path="/projects" element={<SiteLayout><ProjectsPage /></SiteLayout>} />
          <Route path="/projects/:id" element={<SiteLayout><ProjectDetailPage /></SiteLayout>} />
          <Route path="/blog" element={<SiteLayout><BlogPage /></SiteLayout>} />
          <Route path="/blog/:slug" element={<SiteLayout><BlogPostPage /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><ContactPage /></SiteLayout>} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  // Always show preloader on every fresh page load - use local state not persisted store
  const [showPreloader, setShowPreloader] = useState(true)

  // Premium smooth scroll (Lenis) — wired to GSAP ScrollTrigger
  useSmoothScroll()

  return (
    <BrowserRouter>
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Preloader — always shown on mount, hides itself when done */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Main site */}
      <AppRoutes />
    </BrowserRouter>
  )
}
