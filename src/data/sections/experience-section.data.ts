import type { ExperienceSection } from '@/types/sections/experience-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { facebook, instagram, linkedin, website } from '../helpers/links';
import {
  bootstrap,
  css3,
  digitalOcean,
  docker,
  dockerCompose,
  elementor,
  flask,
  git,
  github,
  githubActions,
  googleCloud,
  hibernate,
  html5,
  hubspotCms,
  hubspotMarketing,
  java,
  jekyll,
  jquery,
  laravel,
  n8n,
  php,
  python,
  react,
  sass,
  spring,
  springBoot,
  ubuntu,
  vue,
  windowsServer,
  wordpress,
  javascript,
  tailwindcss,
} from '../helpers/skills';

const experienceSectionData = {
  config: {
    title: 'Work experience',
    slug: 'experience',
    icon: 'fa6-solid:suitcase',
    visible: true,
  },
  jobs: [
    {
      role: 'System Design & Architect',
      company: 'Srabutan.com (Remote, Indonesia)',
      image: import('@/assets/logos/srabutan-logo.png'),
      dates: [new Date('2026-01'), null],
      description: `
Designed and architected the full technical infrastructure for Srabutan.com, Indonesia's premier freelance marketplace connecting businesses with talented freelancers.

- Architected an AI-powered matching system that intelligently pairs clients with professionals based on skills, experience, and project requirements
- Designed a scalable microservices architecture supporting portfolio management, real-time collaboration, secure payment processing, and project tracking
- Implemented robust security measures and optimized performance for high-traffic scenarios
- Led full-stack development, infrastructure scaling, and CI/CD pipelines using GitHub Actions, Docker, and DigitalOcean
- Collaborated with the business team to align product development with market needs and drive strategic technical decisions
      `,
      tagsList: {
        title: 'Technologies',
        tags: [
          react(),
          vue(),
          javascript(),
          html5(),
          css3(),
          tailwindcss(),
          git(),
          github(),
          githubActions(),
          docker(),
          dockerCompose(),
          python(),
          digitalOcean(),
        ],
      },
      links: [website({ url: 'https://srabutan.com/' }), linkedin({ url: 'https://linkedin.com/company/srabutan' })],
    },
    {
      role: 'Senior Web Developer',
      company: 'CITT Services (Remote, Dallas, USA)',
      image: import('@/assets/logos/citt-logo.png'),
      dates: [new Date('2014-01'), new Date('2025-12')],
      description: `
Delivered comprehensive technology consulting services for financial sector clients including Pepperstone, TitanFX, BaxiaMarkets, Funded Prop BX, Traderscolo, and Liquidity Connect.

- Developed responsive, user-friendly web applications using React, Vue, WordPress, Laravel, and HubSpot CMS
- Implemented SEO strategies that significantly improved online visibility and organic traffic for client platforms
- Architected robust backend systems and automated data synchronization workflows using n8n, Python, and Flask
- Built and maintained Docker-based deployment pipelines on DigitalOcean and Google Cloud infrastructure
- Collaborated closely with stakeholders to deliver scalable solutions modernizing digital infrastructure while meeting security and performance standards
      `,
      tagsList: {
        title: 'Technologies',
        tags: [
          ubuntu(),
          windowsServer(),
          react(),
          html5(),
          css3(),
          bootstrap(),
          php(),
          wordpress(),
          elementor(),
          laravel(),
          vue(),
          jquery(),
          hubspotCms(),
          hubspotMarketing(),
          jekyll(),
          docker(),
          dockerCompose(),
          n8n(),
          sass(),
          git(),
          github(),
          githubActions(),
          python(),
          flask(),
          digitalOcean(),
          googleCloud(),
        ],
      },
      links: [
        website({ url: 'https://cittservices.com/' }),
        facebook({ url: '' }),
        linkedin({ url: 'https://www.linkedin.com/company/cittservices?originalSubdomain=id' }),
      ],
    },
    {
      role: 'Host Integrator',
      company: 'Wirecard (Jakarta, Indonesia)',
      image: import('@/assets/logos/wirecard.png'),
      dates: [new Date('2011-08'), new Date('2013-12')],
      description: `
Engineered payment gateway integrations at PT. Aprisma Indonesia (a Wirecard A.G. subsidiary), connecting Prisma Gateway technology with clients' banking systems serving 14,000+ corporate clients across 69 countries.

- Developed custom API connections and secure transaction protocols for end-to-end payment flows across multiple channels
- Wrote integration code and troubleshot complex payment scenarios to optimize transaction processing efficiency
- Ensured PCI-DSS compliance across all payment processing implementations
- Designed automated testing frameworks to validate payment workflows
- Created technical documentation for system administrators covering web services, encryption, and financial transaction protocols
      `,
      tagsList: {
        title: 'Technologies',
        tags: [java(), html5(), css3(), spring(), springBoot(), hibernate()],
      },
      links: [
        website({ url: 'https://www.widetechnologies.co.id/' }),
        instagram({ url: 'https://www.instagram.com/explore/locations/278349940/pt-aprisma-indonesia/' }),
      ],
    },
  ],
} as const satisfies ReadonlyDeep;

export default experienceSectionData;
