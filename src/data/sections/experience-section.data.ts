import type { ExperienceSection } from '@/types/sections/experience-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { facebook, githubLink, instagram, linkedin, website } from '../helpers/links';
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
      role: 'Senior Web Developer',
      company: 'CITT Services (Remote, Dallas, USA)',
      image: import('@/assets/logos/citt-logo.png'),
      dates: [new Date('2014-01'), new Date('2024-10')],
      description: `
At CITT Services, I contributed to comprehensive technology consulting services that enabled client firms to expand their technical capabilities without the burden of hiring specialized staff. Working with financial sector clients including Pepperstone, TitanFX, BaxiaMarkets, Funded Prop BX, Traderscolo, and Liquidity Connect, I delivered expertise in web development, SEO optimization, backend infrastructure, and automated data synchronization systems.
<span></span>
My technical accomplishments included developing responsive and user-friendly web applications, implementing SEO strategies to improve online visibility, architecting robust backend systems, and creating automated data workflows that enhanced operational efficiency. These projects required close collaboration with stakeholders to understand their technical requirements and business objectives, resulting in scalable solutions that modernized their digital infrastructure while maintaining security and performance standards.
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
At PT. Aprisma Indonesia (a Wirecard A.G. subsidiary), I served as a host integrator specializing in payment gateway implementations. I engineered robust payment processing solutions by integrating Aprisma's proprietary Prisma Gateway technology with clients' banking systems. My technical contributions included developing custom API connections, implementing secure transaction protocols, and configuring end-to-end payment flows across multiple channels.
<span></span>
Daily responsibilities encompassed writing integration code, troubleshooting complex payment scenarios, optimizing transaction processing efficiency, and ensuring PCI-DSS compliance. I designed automated testing frameworks to validate payment workflows and created technical documentation for system administrators. This role demanded advanced knowledge of web services, encryption methods, financial transaction protocols, and cross-platform integration techniques while working within an enterprise environment serving Wirecard's global network of 14,000+ corporate clients across 69 countries.
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
} as const satisfies ReadonlyDeep<ExperienceSection>;

export default experienceSectionData;
