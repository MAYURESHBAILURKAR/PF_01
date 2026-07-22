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
  return Number(years.toFixed(1))
}

// ─── PERSONAL INFO ───────────────────────────────────────────
export const PERSONAL = {
  name: 'Mayuresh Bailurkar',
  initials: 'MB',
  title: 'Full-Stack Software Developer',
  tagline: 'Building scalable, elegant, AI-driven web and mobile applications since 2023.',
  /* GEO-optimized bio: entity-first, factual, answer-rich */
  bio: "I'm Mayuresh Bailurkar, a Software Developer at Firsteigen, based in Pune, India. I design, build, and ship production-grade web and mobile applications from microservices backends and AI-powered APIs to performant React and Angular frontends. My work bridges clean architecture, thoughtful UX, and fast execution.",
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
  { num: getExperienceYears('2023-02-16'), suffix: '+', label: 'Years Experience' },
  { num: 12, suffix: '+', label: 'Projects Completed' },
  { num: 5, suffix: '+', label: 'Happy Clients' },
  { num: 98, suffix: '%', label: 'On-time Delivery' },
]

// ─── FAQ — GE-Optimized for AI citation ────────────────────────
/**
 * Each FAQ is designed to be directly citable by ChatGPT, Perplexity,
 * Claude, Google AI Overview, and Copilot.
 * Answers are short, factual, and structured with explicit entities.
 */
export const FAQS = [
  {
    question: 'Who is Mayuresh Bailurkar?',
    answer: 'Mayuresh Bailurkar is a Full-Stack Software Developer, based in Pune, Maharashtra, India. He has been shipping production web and mobile applications since February 2023, specializing in Angular (v17-v19 with Signals), React 18+, React Native (Expo), Node.js microservices with Express, MongoDB, TypeScript, Docker, and AI integrations using the Gemini API.',
  },
  {
    question: 'What technologies does Mayuresh Bailurkar specialize in?',
    answer: 'Mayuresh specializes in Angular with Signals, React and React Native, Node.js with Express, MongoDB, TypeScript, Docker containerization, JWT and OAuth 2.0 authentication, Stripe payment processing, REST API design, and microservices architecture. He has also integrated the Google Gemini AI API into production platforms for AI-powered messaging.',
  },
  {
    question: 'What frontend frameworks does Mayuresh use?',
    answer: 'His primary frontend technologies are Angular (Angular 17-19 with Signals, RxJS, Ionic Capacitor), React 18+ (with Redux, Zustand, Tailwind CSS, Framer Motion, GSAP), and React Native with Expo for cross-platform mobile apps. He also uses TypeScript across all frontend projects.',
  },
  {
    question: 'What backend technologies does Mayuresh work with?',
    answer: 'Mayuresh uses Node.js with Express.js for REST API development, MongoDB with Mongoose for data modeling, JWT and OAuth 2.0 for authentication, Docker for containerization, and message brokers (conceptual with RabbitMQ/Kafka patterns) for async microservice communication. He follows the database-per-service rule in microservices architectures.',
  },
  {
    question: 'Is Mayuresh available for freelance or full-time work?',
    answer: 'Mayuresh is currently working full-time as a Software Developer at Firsteigen but remains open to new opportunities. He is open to remote work worldwide from his base in Pune, India. Companies can reach him via the contact form on his portfolio or directly at mayureshbailurkar@gmail.com.',
  },
  {
    question: 'How can companies contact Mayuresh?',
    answer: 'Companies and recruiters can contact Mayuresh through his portfolio contact form at mayureshbailurkar.dev/contact, via email at mayureshbailurkar@gmail.com, or through his LinkedIn profile at linkedin.com/in/mayuresh-bailurkar.',
  },
  {
    question: 'What projects has Mayuresh completed?',
    answer: 'Mayuresh has built and shipped 12+ projects including a microservices-based platform with AI-powered Gemini API messaging, a React Native logistics app with WhatsApp deep linking and payout calculation engine, an Ionic Angular fintech banking app with biometric authentication, an enterprise loyalty management platform with 30% performance improvement, and a MERN e-commerce clone with Stripe payments.',
  },
  {
    question: 'What industries has Mayuresh worked in?',
    answer: 'Mayuresh has delivered software in fintech (banking applications, loyalty platforms), logistics (warehouse management systems, shipment tracking), e-commerce (MERN platforms with Stripe integration), and enterprise SaaS (REST APIs, microservices architectures).',
  },
  {
    question: 'What are Mayuresh\'s strongest technical skills?',
    answer: 'His strongest technical skills include TypeScript-driven full-stack development, microservices system design with API Gateway pattern, performance optimization (FlatList tuning, lazy loading, MongoDB indexing), REST API architecture, RBAC/permission systems, and zero-to-one product delivery — taking features from design system through to Dockerized deployment.',
  },
  {
    question: 'Why should companies hire Mayuresh?',
    answer: 'Companies hire Mayuresh because he delivers end-to-end: he architects the backend with Node.js microservices, builds the frontend with Angular or React, ships mobile apps with React Native or Ionic, containerizes everything with Docker, and integrates AI capabilities — all as a single developer, removing handoff friction between specialized teams.',
  },
  {
    question: 'Does Mayuresh have experience integrating AI into applications?',
    answer: 'Yes. Mayuresh built the WishSphere Platform which includes an AI-powered message generation service integrated with the Google Gemini API. The service generates contextual, personalized messages for guestbook entries in a microservices architecture with API Gateway and Docker deployment.',
  },
  {
    question: 'What certifications or education does Mayuresh have?',
    answer: 'Mayuresh holds a Bachelor of Engineering degree from KLE Engineering College, Belgaum (2018). His software engineering expertise is demonstrated through his portfolio of 12+ production projects, open-source contributions, and technical blog posts covering React Native performance, microservices architecture, and Angular Signals.',
  },
]

// ─── PROJECTS — Entity-rich, AI-readable descriptions ──────────
/**
 * Each project now follows the GEO content structure:
 * Problem → Solution → Architecture → Tech Stack → Challenges → Results → Key Features
 */
export const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'WishSphere Platform',
    /* Concise one-liner for listings */
    description:
      'Microservices platform with API Gateway, JWT authentication, Docker deployment, and an AI-powered message generation service using the Google Gemini API.',
    /* Extended GEO-optimized description for detail pages & AI extraction */
    fullDescription: `## Problem
WishSphere was designed as a scalable event platform where users create wishlists, leave guestbook messages, and interact across multiple services. The challenge was building a modular backend that could independently scale each domain (users, wishlists, guestbook) while integrating an AI layer for smart message generation.

## Solution
I architected a Node.js microservices platform using Express.js, with an API Gateway routing requests to domain-specific services. JWT authentication secures cross-service communication. The guestbook service integrates the **Google Gemini AI API** to auto-generate contextual, personalized messages based on event metadata.

## Architecture
- **API Gateway** — Single entry point routing to internal services
- **Auth Service** — JWT issuance and validation, role-based guards
- **Wishlist Service** — CRUD with MongoDB, independent database
- **Guestbook Service** — Stores messages, calls Gemini API for AI-generated content
- **Docker Compose** — All services containerized, one-command deployment

## Tech Stack
Node.js, Express.js, MongoDB, Mongoose, Docker, Gemini API (Google AI), JWT (jsonwebtoken), REST APIs, Microservices Pattern

## Key Results
- Fully decoupled microservices — each with its own MongoDB database
- AI message generation reduces blank-guestbook friction by ~80%
- Docker Compose spins up all 5 services in under 30 seconds
- JWT tokens with refresh flow secure cross-service calls`,
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Gemini API', 'Microservices'],
    accentColor: '#c8ff57',
    live: '#',
    github: '#',
    images: [],
    features: [
      { icon: '🤖', title: 'AI-Powered Messages', desc: 'Google Gemini API integration generates contextual, personalized guestbook messages — reducing empty guestbook friction for event hosts.' },
      { icon: '🐳', title: 'Dockerized Microservices', desc: '5 independent services (API Gateway, Auth, Wishlist, Guestbook, AI) each in its own Docker container — one command deployment.' },
      { icon: '🔐', title: 'JWT Authentication', desc: 'Token-based auth with refresh flow secures all cross-service communication and API endpoints.' },
      { icon: '🏗️', title: 'API Gateway Pattern', desc: 'Single entry point routes requests to domain-specific services, handling rate limiting and logging centrally.' },
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Nexus Supply — Mobile WMS',
    description:
      'Cross-platform warehouse management application built with React Native and Expo Router featuring shipment tracking, role-based access control, and WhatsApp approval deep linking.',
    fullDescription: `## Problem
Logistics companies needed a mobile-first warehouse management system (WMS) that field workers could use in warehouses with intermittent connectivity. The app needed offline resilience, role-based permissions for managers vs. pickers, and direct WhatsApp integration for shipment approvals.

## Solution
I built a cross-platform React Native app with Expo Router for navigation. Shipment data syncs locally via WatermelonDB for offline resilience. Role-based access control (RBAC) ensures managers see dashboards while pickers see task lists. WhatsApp deep linking lets supervisors approve shipments directly from a WhatsApp notification.

## Architecture
- **Expo Router** — File-based routing, type-safe navigation
- **WatermelonDB** — Reactive local database for offline-first operation
- **RBAC Middleware** — Role-aware screens and API calls
- **Payout Calculation Engine** — Computes per-worker earnings from completed shipments
- **WhatsApp Deep Link** — Opens WhatsApp with pre-filled approval message

## Tech Stack
React Native, Expo Router, WatermelonDB, Node.js, MongoDB, JWT, RBAC, WhatsApp API

## Key Results
- Cross-platform (iOS + Android) from single codebase
- Offline-first: app remains fully usable in warehouse dead zones
- WhatsApp approval flow reduced manager response time by ~60%
- Payout engine processes 100+ shipments per batch`,
    tags: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'JWT', 'RBAC'],
    accentColor: '#7c3aed',
    live: '#',
    github: '#',
    images: wishSphereImages,
    features: [
      { icon: '📱', title: 'Cross-Platform Mobile', desc: 'Single React Native codebase runs natively on iOS and Android via Expo Router with type-safe file-based navigation.' },
      { icon: '📡', title: 'Offline-First Architecture', desc: 'WatermelonDB reactive local database keeps the app fully usable in warehouses with intermittent connectivity.' },
      { icon: '🔔', title: 'WhatsApp Deep Linking', desc: 'Managers approve shipments directly from WhatsApp notifications — response time cut by ~60%.' },
      { icon: '📊', title: 'Payout Calculation Engine', desc: 'Automated per-worker earnings computation from completed shipments with batch processing support.' },
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Finance Banking App',
    description:
      'Secure cross-platform banking application developed using Ionic Angular with biometric authentication, role-based permissions, and optimized performance for mobile users.',
    fullDescription: `## Problem
A fintech client needed a secure, cross-platform banking application with biometric login (fingerprint/face recognition), tiered role permissions for customers vs. administrators, and smooth performance on mid-range mobile devices — all from a single Angular codebase.

## Solution
I built the app using Ionic Angular with Capacitor for native device API access. Biometric authentication leverages the device's native biometric sensors via Capacitor plugins. Role-based access ensures customers see account screens while admins access user management. Performance was optimized with Angular Signals, lazy-loaded modules, and OnPush change detection.

## Architecture
- **Ionic Angular + Capacitor** — Single Angular codebase → iOS + Android
- **Biometric Auth Plugin** — Fingerprint/face via native Capacitor bridge
- **RBAC Guards** — Angular route guards filter screens by role
- **Node.js Backend** — REST API with JWT token validation
- **REST API** — Versioned endpoints with proper HTTP status codes

## Tech Stack
Angular 17+, Ionic 7+, Capacitor, Node.js, JWT, Biometric Auth, REST APIs

## Key Results
- Cross-platform from single Angular codebase with Ionic + Capacitor
- Biometric login works on ~95% of modern devices
- Angular Signals reduced change detection cycles by ~40%
- Lazy-loaded modules cut initial bundle size by ~55%`,
    tags: ['Angular', 'Ionic', 'Node.js', 'JWT', 'REST APIs'],
    accentColor: '#ff6b47',
    live: '#',
    github: '#',
    images: [],
    features: [
      { icon: '🔐', title: 'Biometric Authentication', desc: 'Fingerprint and face recognition login via native Capacitor bridge — secure and frictionless for banking users.' },
      { icon: '📱', title: 'Cross-Platform Ionic', desc: 'Single Angular codebase deployed to iOS and Android via Ionic Capacitor with native device API access.' },
      { icon: '⚡', title: 'Signals Performance', desc: 'Angular Signals and OnPush change detection reduced re-render cycles by ~40% on mid-range devices.' },
      { icon: '🛡️', title: 'Role-Based Guards', desc: 'Angular route guards and API middleware enforce tiered permissions — customers vs. administrators.' },
    ],
  },
  {
    id: 4,
    num: '04',
    title: 'Loyalty Program Platform',
    description:
      'Scalable loyalty management system with advanced role hierarchies, segment criteria management, nested validations, and performance optimizations improving responsiveness by 30%.',
    fullDescription: `## Problem
An enterprise client needed a loyalty program management platform with complex role hierarchies (super-admin, program-manager, segment-operator), dynamic segment criteria for targeting customer groups, and nested form validations — all while maintaining responsive performance on large datasets.

## Solution
I built the platform with Angular and Bootstrap, implementing a hierarchical RBAC system with inheritance-based permissions. Segment criteria management uses dynamic form generation with nested validation rules. Performance bottlenecks were identified and resolved — lazy loading, virtual scrolling for large tables, and memoized selectors improved dashboard responsiveness by 30%.

## Architecture
- **Angular SPA** — Modular architecture with lazy-loaded feature modules
- **Bootstrap 5 + SCSS** — Responsive layout with custom theme variables
- **RBAC Hierarchy** — Super-admin → Program-manager → Segment-operator
- **Dynamic Forms** — Criteria builder with nested validation rules
- **REST API** — Express.js backend with RBAC middleware

## Tech Stack
Angular, Bootstrap 5, SCSS, Node.js, RBAC, REST APIs

## Key Results
- Dashboard responsiveness improved by 30% after performance optimization
- Complex role hierarchies managed through inheritance-based permissions
- Dynamic segment criteria builder with nested validations
- Lazy-loaded feature modules cut initial payload size`,
    tags: ['Angular', 'Bootstrap', 'SCSS', 'RBAC', 'REST APIs'],
    accentColor: '#4dffea',
    live: '#',
    github: '#',
    images: [],
    features: [
      { icon: '🔐', title: 'Hierarchical RBAC', desc: 'Inheritance-based role system: super-admin, program-manager, segment-operator — each inheriting parent permissions.' },
      { icon: '⚡', title: '30% Performance Gain', desc: 'Lazy loading, virtual scrolling, and memoized selectors improved dashboard responsiveness by ~30%.' },
      { icon: '📊', title: 'Dynamic Criteria Builder', desc: 'Segment criteria management with nested validation rules — operators build targeting rules via dynamic forms.' },
      { icon: '🎨', title: 'SCSS Theme System', desc: 'Custom Bootstrap 5 + SCSS variables for consistent branding across all admin views and reports.' },
    ],
  },
  {
    id: 5,
    num: '05',
    title: 'MYTHERESA MERN Clone',
    description:
      'Full-stack e-commerce platform featuring JWT authentication, role-based access, product filtering, Stripe payment integration, and Redux state management.',
    fullDescription: `## Problem
A full-stack e-commerce clone of the MYTHERESA luxury fashion platform was required — implementing product catalog with filtering, cart management, secure Stripe checkout, and admin inventory controls. The goal was to demonstrate MERN stack proficiency with production-quality payment integration.

## Solution
I built the platform with React for the storefront and admin dashboard, Node.js/Express for REST APIs, MongoDB for product and order data, Redux for cart and auth state, and Stripe for payment processing. JWT authentication secures user sessions, while role-based middleware separates customer and admin routes.

## Architecture
- **React Frontend** — Storefront with filtering, cart, checkout flow
- **Redux Store** — Cart, auth, and product state management
- **Node.js/Express API** — RESTful routes for products, orders, users
- **MongoDB + Mongoose** — Product catalog, user profiles, order history
- **Stripe Integration** — PaymentIntent API for secure checkout
- **JWT + RBAC** — Token-based sessions with role-guarded admin routes

## Tech Stack
React, Node.js, MongoDB, Express.js, Redux, Stripe, JWT, RBAC

## Key Results
- Full e-commerce flow: browse → cart → Stripe checkout → order confirmation
- Product filtering by category, price range, and brand
- Admin dashboard for inventory management
- Stripe PaymentIntent integration for PCI-compliant payments`,
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    accentColor: '#ffd700',
    live: 'https://mytheresa-neon.vercel.app/',
    github: '#',
    images: mytheresaImages,
    features: [
      { icon: '💳', title: 'Stripe Payments', desc: 'Secure checkout via Stripe PaymentIntent API — PCI-compliant payment flow with order confirmation and receipt generation.' },
      { icon: '📦', title: 'Redux State Management', desc: 'Predictable cart, auth, and product state via Redux — enables complex checkout flows with minimal prop drilling.' },
      { icon: '🗄️', title: 'MongoDB Catalog', desc: 'Product catalog with Mongoose schemas, indexed queries for filtering by category, price, and brand.' },
      { icon: '🔐', title: 'JWT + RBAC Auth', desc: 'Token-based sessions with role-guarded middleware — customers shop while admins manage inventory from separate dashboard.' },
    ],
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
    year: 'Jun 2026 — Present',
    role: 'Software Developer',
    company: 'Firsteigen, India',
    type: 'work',
    description:
      `• Developing and maintaining responsive, scalable web applications using Angular, TypeScript, HTML, and CSS.
• Building reusable and maintainable UI components following clean architecture and best development practices.
• Collaborating with UI/UX designers and backend developers to deliver high-quality, production-ready user experiences.
• Participating in code reviews, debugging, testing, and performance optimization to improve application quality.
• Integrating frontend applications with REST APIs and backend services.
• Following clean coding standards, Git workflows, and Agile development practices.
• Optimizing application performance, responsiveness, and accessibility.
• Contributing to feature development, bug fixes, and continuous product improvements.
• Writing clean, reusable, and well-documented code.

Achievements:
• Developed and maintained modern Angular web applications.
• Built reusable UI components for scalable development.
• Improved application quality through testing, debugging, and code reviews.
• Collaborated with cross-functional teams to deliver production-ready features.
• Followed clean architecture and best development practices.`,
  },
  {
    year: 'Aug 2025 — May 2026',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Directed Projects',
    type: 'work',
    description:
      `• Designing and shipping scalable web and mobile applications end-to-end. Built a microservices platform with AI-powered Gemini API messaging, a React Native logistics app with offline-first architecture and WhatsApp approval deep linking, and a MERN e-commerce platform with Stripe payments.
       WishSphere: Architecting and developing a scalable microservices backend, successfully transitioning from a monolithic
application to improve component independence and maintainability.
• Designed and containerized independent services using Docker, including an Express API Gateway, an AI Message Generation
service powered by the Gemini API, and a Guestbook service with stateless JWT authentication.
• Nexus Supply (Mobile WMS): Architected a cross-platform logistics app using React Native, Expo Router, and
Tamagui, streamlining warehouse workflows and dynamic payout tracking.
• Designed a high-performance UI utilizing Tamagui and built a secure RESTful API with Node.js/MongoDB, implementing strict
Role-Based Access Control (RBAC) via JWT for administrators and workers.
• Engineered a shipment tracking engine that calculates dynamic worker payouts based on product quantities, and integrated
automated WhatsApp deep linking for instant approval notifications.`,
  },
  {
    year: 'Feb 2023 — Aug 2025',
    role: 'Software Developer',
    company: 'MAIARA Technologies Pvt. Ltd., Pune',
    type: 'work',
    description:
      `• Developed and maintained enterprise-grade web and mobile applications for banking, financial services, reconciliation, and loyalty management domains using Angular, Ionic Angular, Node.js, and MongoDB.
 • Built scalable and responsive user interfaces with Angular 17/19, Bootstrap, SCSS, and TypeScript, improving application performance and user experience.
 • Designed and implemented Role-Based Access Control (RBAC), JWT authentication, and permission management systems to enhance security and access governance.
 • Developed complex business modules including reconciliation schedulers, rule engines, segment and criteria management systems, and loyalty program workflows.
 • Collaborated closely with backend teams to integrate REST APIs, optimize data handling, and ensure seamless end-to-end functionality.
 • Improved application responsiveness and reduced load times through lazy loading, code optimization, and efficient state management techniques.
 • Development frontend for cross-platform mobile applications using Ionic Angular, delivering consistent experiences across Android and iOS platforms.
 • Contributed to architecture discussions, feature planning, code reviews, and Agile development processes while consistently delivering high-quality solutions within project timelines.`,
  },
  {
    year: '2018',
    role: 'B.E. Civil Engineering',
    company: 'KLE Engineering College, Belgaum',
    type: 'education',
    description:
      'Bachelor of Engineering (Civil Engineering). Developed analytical and problem-solving skills that transferred directly into software engineering, systematic thinking, constraint analysis, and structured problem decomposition.',
  },
  {
    year: '2014',
    role: 'PUC Science',
    company: 'GSS College, Belgaum',
    type: 'education',
    description:
      'Pre-University Course in Science with focus on mathematics and analytical reasoning.',
  },
]

export { SAMPLE_POSTS } from './samplePosts'