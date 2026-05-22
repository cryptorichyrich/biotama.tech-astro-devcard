import type { Application } from './schema';

/**
 * Sample Application — demonstrates the schema.
 * Delete this file or replace it when you have real job postings.
 */
const sampleApplication: Application = {
  slug: 'example-corp-senior-fullstack',

  company: {
    name: 'Example Corp',
    website: 'https://example.com',
    location: 'Singapore (Remote)',
    industry: 'Fintech',
  },

  position: {
    title: 'Senior Fullstack Developer',
    department: 'Engineering',
    type: 'full-time',
    remote: true,
    salaryRange: 'SGD 8,000 – 12,000 / month',
  },

  source: {
    url: 'https://example.com/careers/senior-fullstack',
    platform: 'LinkedIn',
    dateFound: '2026-05-22',
  },

  application: {
    status: 'draft',
    notes: 'Pending review of tailored resume',
  },

  jobDescription: {
    summary:
      'We are looking for a Senior Fullstack Developer to lead the development of our next-generation payment platform serving millions of users across Southeast Asia.',
    responsibilities: [
      'Architect and build scalable web applications using React/Next.js and Node.js',
      'Design and implement RESTful APIs and GraphQL services',
      'Lead code reviews and mentor junior developers',
      'Collaborate with product and design teams to ship features',
      'Ensure application performance, security, and reliability',
    ],
    requirements: [
      { skill: 'React/Next.js', importance: 'required' },
      { skill: 'Node.js/NestJS', importance: 'required' },
      { skill: 'TypeScript', importance: 'required' },
      { skill: 'PostgreSQL', importance: 'required' },
      { skill: 'Docker', importance: 'required' },
      { skill: 'GraphQL', importance: 'preferred' },
      { skill: 'AWS/GCP', importance: 'preferred' },
      { skill: 'Fintech experience', importance: 'bonus' },
    ],
    niceToHave: [
      'Experience with payment systems',
      'Kubernetes orchestration',
      'CI/CD pipeline design',
    ],
  },

  tailoring: {
    emphasizeSkills: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS',
      'PostgreSQL', 'Docker', 'GraphQL', 'FastAPI',
    ],
    highlightProjects: [
      'BaxiaMarkets — Financial Platform',
      'CrosSyncOrder — Forex Trade Copier SaaS',
      'AI-Powered Sales Dashboard',
    ],
    customSummary:
      'Senior fullstack architect with 10+ years building high-performance fintech and e-commerce platforms across Southeast Asia. Proven expertise in React/Next.js, Node.js/NestJS, and PostgreSQL — delivering scalable payment systems processing transactions across 69 countries. Track record of leading engineering teams, designing microservices architectures, and shipping production-grade SaaS products.',
    keyAchievements: [
      'Architected a forex trade copier SaaS with real-time WebSocket synchronization across MetaTrader 4/5 and cTrader',
      'Built a fintech client portal serving global traders with KYC compliance (SumSub) and multi-PSP payment processing',
      'Designed microservices architecture for a freelance marketplace with AI-powered matching and CI/CD pipelines',
      'Led full-stack development for 12+ years across banking, fintech, and e-commerce domains',
    ],
    coverLetterHook:
      'Having spent years building financial platforms that serve traders across 69 countries, I understand the unique challenges of building payment systems for Southeast Asian markets — from regulatory compliance to multi-currency processing at scale.',
  },

  contact: {
    name: 'Sarah Chen',
    title: 'Engineering Manager',
    email: 'careers@example.com',
  },
};

export default sampleApplication;
