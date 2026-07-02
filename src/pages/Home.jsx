import HeroSection from '@/components/sections/HeroSection'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CTASection from '@/components/sections/CTASection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'
import FAQSection from '@/components/sections/FAQSection'
import { useSEO, useJsonLd, PAGE_SEO, faqJsonLd } from '@/components/SEOHead'
import { FAQS } from '@/lib/data'

export default function HomePage() {
  useSEO(PAGE_SEO.home)
  useJsonLd(faqJsonLd(FAQS))

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutPreviewSection />
      <ProjectsSection limit={4} />
      <SkillsSection />
      <BlogPreviewSection limit={3} />
      <FAQSection faqs={FAQS} limit={6} />
      <CTASection />
    </>
  )
}
