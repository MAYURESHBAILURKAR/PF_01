const wishSphereImages = Object.values(
  import.meta.glob('@/assets/nexus/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  })
)

const mytheresaImages = Object.values(
  import.meta.glob('@/assets/mytheresa/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  })
)

const getExperienceYears = (startDate) => {
  const start = new Date(startDate)
  const now = new Date()

  const diffMs = now - start
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)

  return Number(years.toFixed(1)) // 1 decimal place
}

// ─── PERSONAL INFO ───────────────────────────────────────────
export const PERSONAL = {
  name: 'Mayuresh Bailurkar',
  initials: 'MB',
  title: 'Software Developer',
  tagline: 'Building scalable, elegant, AI-driven web and mobile applications',
  bio: "I'm Mayuresh Bailurkar, a full-stack software developer with a passion for building fast, beautiful, and functional web applications. I bridge the gap between design, engineering and writing clean code that scales.",
  email: 'mayureshbailurkar@gmail.com',
  location: 'Pune, Maharashtra, India',
  available: true,
  social: {
    github: 'https://github.com/MAYURESHBAILURKAR',
    linkedin: 'https://linkedin.com/in/mayuresh-bailurkar',
    twitter: 'https://x.com/mayuresh_b',
  },
}

// ─── STATS ────────────────────────────────────────────────────
export const STATS = [
    {
    num: getExperienceYears('2023-02-16'),
    suffix: '+',
    label: 'Years Experience',
  },
  { num: 12, suffix: '+', label: 'Projects Completed' },
  { num: 5, suffix: '+', label: 'Happy Clients' },
  { num: 98, suffix: '%', label: 'On-time Delivery' },
]

// ─── PROJECTS ─────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'WishSphere Platform',
    description:
      'Microservices-based platform with an AI message generation service powered by Gemini API. Includes API Gateway, Guestbook service, JWT authentication, and Docker containerization.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Gemini API', 'Microservices'],
    accentColor: '#c8ff57',
    live: '#',
    github: '#',
    images: [],
  },
  {
    id: 2,
    num: '02',
    title: 'Nexus Supply — Mobile WMS',
    description:
      'Cross-platform logistics application built with React Native and Expo Router featuring shipment tracking, role-based access control, payout calculation engine, and WhatsApp approval deep linking.',
    tags: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'JWT', 'RBAC'],
    accentColor: '#7c3aed',
    live: '#',
    github: '#',
    images: wishSphereImages,
  },
  {
    id: 3,
    num: '03',
    title: 'Finance Banking App',
    description:
      'Secure cross-platform banking application developed using Ionic Angular with biometric authentication, role-based permissions, and optimized performance for mobile users.',
    tags: ['Angular', 'Ionic', 'Node.js', 'JWT', 'REST APIs'],
    accentColor: '#ff6b47',
    live: '#',
    github: '#',
    images: [],
  },
  {
    id: 4,
    num: '04',
    title: 'Loyalty Program Platform',
    description:
      'Scalable loyalty management system with advanced role hierarchies, segment criteria management, nested validations, and performance optimizations improving responsiveness by 30%.',
    tags: ['Angular', 'Bootstrap', 'SCSS', 'RBAC', 'REST APIs'],
    accentColor: '#4dffea',
    live: '#',
    github: '#',
    images: [],
  },
  {
    id: 5,
    num: '05',
    title: 'MYTHERESA MERN Clone',
    description:
      'Full-stack e-commerce platform featuring JWT authentication, role-based access, product filtering, and secure payments using Stripe.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    accentColor: '#ffd700',
    live: 'https://mytheresa-neon.vercel.app/',
    github: '#',
    images: mytheresaImages,
  },
]

// ─── SKILLS ───────────────────────────────────────────────────
export const SKILLS_ROW_1 = [
  { icon: '🅰️', name: 'Angular (v17/19)' },
  { icon: '⚛️', name: 'React.js' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '📘', name: 'TypeScript' },
  { icon: '📱', name: 'Ionic' },
  { icon: '☁️', name: 'Python' },
  { icon: '🔥', name: 'Redux' },
  { icon: '🔥', name: 'JavaScript' },
]

export const SKILLS_ROW_2 = [
  { icon: '🐙', name: 'Git & GitHub' },
  { icon: '🎭', name: 'Bootstrap 5' },
  { icon: '🎨', name: 'Tailwind CSS' },
  { icon: '🔷', name: 'Postman' },
  { icon: '🛠️', name: 'JIRA' },
  { icon: '🌐', name: 'REST APIs' },
  { icon: '🔐', name: 'JWT / OAuth' },
  { icon: '🎨', name: 'Chakra UI / SCSS' },
]

export const TECH_MARQUEE = [
  'React.js', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js',
  'Express.js', 'GSAP', 'Tailwind CSS', 'Angular', 'JavaScript',
]

// ─── EXPERIENCE TIMELINE ──────────────────────────────────────
export const TIMELINE = [
  {
    year: 'Aug 2025 — Present',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Directed Projects',
    type: 'work',
    description:
      'Developing scalable web and mobile applications including microservices platforms and logistics solutions with AI integrations.',
  },
  {
    year: 'Feb 2023 — Aug 2025',
    role: 'Software Developer',
    company: 'MAIARA Technologies Pvt. Ltd., Pune',
    type: 'work',
    description:
      'Delivered enterprise fintech and loyalty applications using Angular, Node.js, and Ionic. Improved performance, security, and user experience across multiple large-scale systems.',
  },
  {
    year: '2018',
    role: 'B.E. Civil Engineering',
    company: 'KLE Engineering College, Belgaum',
    type: 'education',
    description: 'Bachelor of Engineering (Civil Engineering).',
  },
  {
    year: '2014',
    role: 'PUC Science',
    company: 'GSS College, Belgaum',
    type: 'education',
    description: 'Pre-University Course in Science.',
  },
]


export { SAMPLE_POSTS } from './samplePosts'