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
  astro,
  javascript,
  seo,
  googleAnalytics,
  astrojs,
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
      role: 'Web Developer & Co-Founder',
      company: 'Vavelle Crispy Pork Belly (Remote, JABODETABEKA, Indonesia)',
      image: import('@/assets/logos/VAVELLE.png'),
      dates: [new Date('2018-02'), null],
      description: `
As a Web Developer and Co-Founder of Vavelle Crispy Pork Belly, I spearheaded the development of a dynamic e-commerce platform to showcase our premium crispy pork belly offerings across the JABODETABEKA region. Leveraging AstroJS, I designed and built a responsive, SEO-optimized website (https://crispyporkbelly.vavelleco.com/) that enhances user engagement and drives online orders. My role encompassed creating a seamless user experience, integrating secure payment gateways, and implementing marketing tools to promote our artisanal product.
<span></span>
In addition to technical development, I collaborated with the team to craft a compelling brand identity, streamline delivery logistics, and ensure a high-quality customer experience. My contributions included optimizing site performance, integrating analytics for data-driven insights, and maintaining a scalable infrastructure to support business growth. This entrepreneurial venture allowed me to blend technical expertise with business strategy, delivering a platform that reflects our commitment to culinary excellence.
    `,
      tagsList: {
        title: 'Technologies',
        tags: [astrojs(), html5(), css3(), javascript(), tailwindcss(), git(), github(), seo(), googleAnalytics()],
      },
      links: [website({ url: 'https://crispyporkbelly.vavelleco.com/' })],
    },
    {
      role: 'Web Developer & Co-Founder',
      company: 'Travel to Bali Paradise (Remote, Bali, Indonesia)',
      image: import('@/assets/logos/travel-to-bali-paradise.png'),
      dates: [new Date('2025-06'), null],
      description: `
As a Web Developer and Co-Founder of Travel to Bali Paradise, I led the creation of a vibrant, user-centric travel platform (https://traveltobaliparadise.com/) using AstroJS. This website empowers users to explore Bali’s hidden gems through curated tours and vehicle rentals, delivering a seamless booking experience. My responsibilities included architecting a responsive, SEO-optimized website, integrating booking and payment systems, and ensuring cross-device compatibility for global travelers.
<span></span>
Beyond development, I collaborated closely with local partners to align the platform with authentic Balinese experiences, incorporating features like interactive destination guides and real-time availability for rentals. My technical contributions included optimizing site speed, implementing analytics for user behavior tracking, and maintaining a secure, scalable backend. This role combined my passion for technology and travel, creating a platform that inspires and facilitates unforgettable adventures in Bali.
    `,
      tagsList: {
        title: 'Technologies',
        tags: [astro(), html5(), css3(), javascript(), tailwindcss(), git(), github(), seo(), googleAnalytics()],
      },
      links: [website({ url: 'https://traveltobaliparadise.com' })],
    },
    {
      role: 'Senior Web Developer',
      company: 'CITT Services (Remote, Dallas, USA)',
      image: import('@/assets/logos/citt-logo.png'),
      dates: [new Date('2014-01'), new Date('2025-6')],
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
