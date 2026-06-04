import type { Application } from './schema';

/**
 * Full Stack Developer — Anonymous Company (Canggu, Bali)
 * Source: JobStreet — https://id.jobstreet.com/id/job/92236025
 * Contract/Temporary, on-site 6 days/week
 *
 * Key fit signals:
 * - React + Next.js is Bio's primary stack
 * - Supabase + Vercel = core Srabutan infra
 * - AI-savvy (Claude) = literal daily workflow via Hermes
 * - Full-stack from frontend to backend to DevOps
 * - Strong English, independent worker
 */

const application: Application = {
  slug: 'canggu-bali-fullstack-developer',

  company: {
    name: 'Confidential (Canggu-based Company)',
    location: 'Canggu, Bali, Indonesia',
    industry: 'Technology / Digital Products',
  },

  position: {
    title: 'Full Stack Developer',
    department: 'Engineering',
    type: 'contract',
    remote: false,
    salaryRange: 'Rp15,000,000 - Rp20,000,000 / month',
  },

  source: {
    url: 'https://id.jobstreet.com/id/job/92236025',
    platform: 'JobStreet',
    dateFound: '2026-06-04',
  },

  application: {
    status: 'draft',
    notes: 'On-site in Canggu, Bali. 6 days/week, 7-hour days. Contract/temporary. Awaiting Bio approval to apply.',
  },

  jobDescription: {
    summary:
      'Join a Canggu-based team to build custom web applications and internal tools. They need someone AI-savvy who uses tools like Claude to accelerate development, comfortable across the full stack from React/Next.js frontend to API integration and back-end services.',
    responsibilities: [
      'Build and maintain custom web applications from front end to back end',
      'Develop and integrate APIs',
      'Debug, test, and optimise existing code',
      'Translate business requirements into working features',
      'Collaborate with the team to plan and ship updates',
      'Keep code clean, documented, and maintainable',
    ],
    requirements: [
      { skill: 'React / Next.js', importance: 'required' },
      { skill: 'Supabase / Vercel (or similar)', importance: 'required' },
      { skill: 'AI-assisted development (Claude, etc.)', importance: 'required' },
      { skill: 'API development & integration', importance: 'required' },
      { skill: 'Full stack experience (few years)', importance: 'required' },
      { skill: 'Fluent English (written & spoken)', importance: 'required' },
      { skill: 'Strong problem-solving & debugging', importance: 'preferred' },
      { skill: 'Independent worker with minimal supervision', importance: 'preferred' },
      { skill: 'Fast learner, picks up new tools quickly', importance: 'preferred' },
      { skill: 'UI/UX skills', importance: 'bonus' },
    ],
    niceToHave: [
      'Experience with internal tooling and business process automation',
      'Familiarity with agile/project management workflows',
    ],
  },

  tailoring: {
    emphasizeSkills: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Supabase',
      'Vercel',
      'Claude / AI-assisted development',
      'API Design',
      'Astro',
      'Tailwind CSS',
    ],
    highlightProjects: [
      'Srabutan.com — AI-powered freelance marketplace (full-stack, React, Supabase, Vercel)',
      'CITT Services — Full-stack consulting for fintech clients across 69 countries',
      'KrispiBabi — E-commerce platform with payment gateway integrations',
    ],
    customSummary:
      'Full stack developer with 10+ years of hands-on experience building production web applications across fintech, e-commerce, and SaaS domains. Currently shipping code daily using React, Next.js, Supabase, and Vercel — the exact stack this role demands. Daily user of AI-assisted development (Claude) to architect, debug, and deploy faster. Comfortable working independently across the entire stack, from pixel-perfect UI to API design to database architecture, and translating business requirements into working features without hand-holding.',
    keyAchievements: [
      'Architected and built Srabutan.com, a full-stack freelance marketplace using React, Supabase, and Vercel — AI-powered matching, real-time collaboration, and secure payments',
      'Delivered 10+ years of full-stack consulting for fintech clients including Pepperstone and TitanFX, handling payment systems across 69 countries',
      'Built KrispiBabi e-commerce platform end-to-end: Astro frontend, Cloudflare Workers backend, payment gateway integration (iPaymu, Everpro)',
      'Daily practitioner of AI-assisted development using Claude, designing agentic workflows that accelerate shipping by 3-5x',
    ],
    coverLetterHook:
      'I build web applications for a living, and I use Claude every single day to do it faster. When I saw this role asking for someone who is "AI savvy and comfortable using tools like Claude to accelerate development," it felt like it was written for me. The stack matches exactly what I ship with daily: React, Next.js, Supabase, and Vercel.',
  },
};

export default application;
