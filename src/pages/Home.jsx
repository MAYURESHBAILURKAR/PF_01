import HeroSection from '@/components/sections/HeroSection'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CTASection from '@/components/sections/CTASection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutPreviewSection />
      <ProjectsSection limit={4} />
      <SkillsSection />
      <BlogPreviewSection limit={3} />
      <CTASection />
    </>
  )
}
