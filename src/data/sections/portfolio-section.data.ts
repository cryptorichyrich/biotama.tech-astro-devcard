import type { PortfolioSection } from '@/types/sections/portfolio-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { demo, githubLink, twitter, website } from '../helpers/links';
import {
  css3,
  TwitterSkill,
  eslint,
  facebookAds,
  git,
  github,
  githubActions,
  html5,
  hubspotCms,
  hubspotDevelopment,
  fastApi,
  java,
  javascript,
  jekyll,
  mysql,
  nextJs,
  nodejs,
  php,
  react,
  tailwindCss,
  twitterAds,
  websocket,
  whmcs,
  wordpress,
  zmq,
  vmware,
  laravel,
  vue,
  gatsbyjs,
  graphql,
  mql4,
  mql5,
  csharp,
  windowsServer,
  docker,
  dockerCompose,
  ubuntu,
  kubernetes,
  digitalOcean,
  googleCloud,
  railway,
  bootstrap,
  expressjs,
  googleGeminiAi,
  groqCloudAi,
  astrojs,
  astro,
  seo,
  googleAnalytics,
} from '../helpers/skills';

const portfolioSectionData = {
  config: {
    title: 'Projects',
    slug: 'projects',
    icon: 'fa6-solid:rocket',
    visible: true,
    screenshots: {
      title: 'Screenshots',
      icon: 'fa6-solid:images',
    },
  },
  info: '',
  projects: [
    {
      name: 'TOKO VAVELLE — Vietnam Coffee E-Commerce',
      dates: [new Date('2025-03'), null],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Founder', 'Front-end Developer'] },
        { label: 'Company', value: 'TOKO VAVELLE' },
        { label: 'Category', value: ['E-commerce'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://tokovavelle.com/', url: '#' }],
      description: `Founded Indonesia's premier destination for authentic Vietnam coffee, partnering directly with Trung Nguyen to bring Vietnamese coffee culture to Indonesian consumers.

- Architected and developed a comprehensive e-commerce ecosystem spanning the flagship website and multiple marketplace platforms (Tokopedia, Shopee, Lazada)
- Built the AstroJS-powered platform with advanced SEO strategies, secure payment integrations, and inventory management systems
- Crafted brand identity, established quality control protocols, and built strategic partnerships for authentic product delivery
- Implemented data-driven marketing and customer experience optimization using Google Analytics
      `,
      tagsList: {
        title: 'Technologies',
        tags: [astrojs(), html5(), css3(), javascript(), tailwindCss(), git(), github(), seo(), googleAnalytics()],
      },
      links: [website({ url: 'https://tokovavelle.com/' })],
    },
    {
      name: 'Vavelle Crispy Pork Belly',
      dates: [new Date('2018-02'), null],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Co-Founder', 'Front-end Developer'] },
        { label: 'Company', value: 'Vavelle & Co' },
        { label: 'Category', value: ['E-commerce'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://crispyporkbelly.vavelleco.com/', url: '#' }],
      description: `Co-founded and developed a dynamic e-commerce platform showcasing premium crispy pork belly offerings across the JABODETABEKA region.

- Designed and built a responsive, SEO-optimized website using AstroJS with Instagram-inspired gallery layout
- Integrated WhatsApp ordering system that eliminated complex payment gateways while maintaining personal customer interactions
- Optimized site performance, integrated analytics for data-driven insights, and maintained scalable infrastructure
      `,
      tagsList: {
        title: 'Technologies',
        tags: [astrojs(), html5(), css3(), javascript(), tailwindCss(), git(), github(), seo(), googleAnalytics()],
      },
      links: [website({ url: 'https://crispyporkbelly.vavelleco.com/' })],
    },
    {
      name: 'Travel to Bali Paradise',
      dates: [new Date('2025-06'), null],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Co-Founder', 'Front-end Developer'] },
        { label: 'Company', value: 'Travel to Bali Paradise' },
        { label: 'Category', value: ['Travel & Booking'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://traveltobaliparadise.com/', url: '#' }],
      description: `Co-founded and built a travel platform empowering users to explore Bali's hidden gems through curated tours and vehicle rentals.

- Architected a responsive, SEO-optimized travel platform using AstroJS with cross-device compatibility for global travelers
- Integrated booking and payment systems with real-time availability for tours and vehicle rentals
- Collaborated with local partners to feature authentic Balinese experiences and interactive destination guides
- Implemented analytics for user behavior tracking and optimized site speed for seamless user experience
      `,
      tagsList: {
        title: 'Technologies',
        tags: [astro(), html5(), css3(), javascript(), tailwindCss(), git(), github(), seo(), googleAnalytics()],
      },
      links: [website({ url: 'https://traveltobaliparadise.com' })],
    },
    {
      name: 'Vavelle AI Chat Interface',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2025-04'), new Date('2025-04')],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Personal Project' },
        { label: 'Category', value: ['AI Web app'] },
      ],
      pdfDetails: [
        { label: 'Github', value: 'https://github.com/cryptorichyrich/Vavelle_AI_Chat_Interface', url: '#' },
      ],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A modern real-time chat application powered by GroqCloud's large language models with a responsive dark-mode UI.

- Built with React and Tailwind CSS featuring syntax highlighting for code blocks and markdown-style formatting
- Implemented efficient state management using React hooks with optimized API token usage for cost efficiency
- Architected a backend proxy server to protect API credentials, eliminating client-side key exposure
- Included error handling, loading states, auto-scrolling, and message timestamps for polished UX
- Documented deployment for Vercel, Netlify, and Docker platforms
      `,
      tagsList: {
        title: 'Technologies',
        tags: [react(), tailwindCss(), groqCloudAi()],
      },
      links: [website({ url: 'https://github.com/cryptorichyrich/Vavelle_AI_Chat_Interface' })],
    },
    {
      name: 'Next & FastAPI Sales Dashboard with Gemini AI Sales Chatbot',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2025-04'), new Date('2025-04')],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Personal Project' },
        { label: 'Category', value: ['AI Web app'] },
      ],
      pdfDetails: [
        { label: 'Github', value: 'https://github.com/cryptorichyrich/Sales-Dashboard-FastApi-Next', url: '#' },
      ],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A full-stack sales dashboard with a FastAPI backend and Next.js frontend, integrating Google's Gemini AI for intelligent sales insights.

- Built Python/FastAPI backend serving sales data with endpoints for retrieval, AI-powered insights, and analytics calculations
- Developed Next.js/React frontend with Tailwind CSS featuring filterable sales rep cards by region
- Integrated Gemini AI chat section for natural language queries about sales data with markdown rendering
- Organized architecture with separate components for layout, sales representation, and AI chat functionality
- Implemented custom React hooks for data fetching and chat state management
      `,
      tagsList: {
        title: 'Technologies',
        tags: [fastApi(), react(), nextJs(), googleGeminiAi(), tailwindCss(), html5(), githubActions(), javascript()],
      },
      links: [website({ url: 'https://github.com/cryptorichyrich/Sales-Dashboard-FastApi-Next' })],
    },
    {
      name: 'Vavelle Crispy Pork Belly',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2025'), null],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Self' },
        { label: 'Category', value: ['Web app, AI'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://crispyporkbelly.vavelleco.com/', url: '#' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A streamlined web application showcasing Vavelle & Co's signature Crispy Pork Belly product with an Instagram-inspired gallery and seamless ordering.

- Created an intuitive interface highlighting product quality with visually engaging grid layout inspired by Instagram's design
- Integrated WhatsApp ordering system eliminating complex payment gateways while maintaining personal customer interactions
- Built responsive design ensuring accessibility across all devices for expanded market reach
      `,
      tagsList: {
        title: 'Technologies',
        tags: [react(), tailwindCss(), html5(), githubActions(), javascript()],
      },
      links: [website({ url: 'https://crispyporkbelly.vavelleco.com/' })],
    },
    {
      name: 'Vavelle Car Rental',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2025'), null],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Vavelle & Co' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://rentalmobil.vavelleco.com/', url: '#' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A comprehensive car rental web application for Vavelle & Co with a cohesive six-page design streamlining the vehicle booking process.

- Created a cohesive six-page website with intuitive navigation, responsive design, and consistent brand identity
- Built an elegant gallery page with detailed car specifications allowing customers to compare rental options
- Implemented a step-by-step booking system with clear date selection and vehicle availability indicators
- Designed an FAQ page with expandable sections for improved readability and information access
      `,
      tagsList: {
        title: 'Technologies',
        tags: [react(), tailwindCss(), html5(), githubActions(), javascript()],
      },
      links: [website({ url: 'https://rentalmobil.vavelleco.com/' })],
    },
    {
      name: 'Damai Kasih Channel',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2023'), null],
      details: [
        { label: 'Team size', value: '3+ person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'Damaikasihchannel.com' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://damaikasihchannel.com/', url: 'https://damaikasihchannel.com/' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A comprehensive religious digital platform serving as a spiritual resource hub for the Indonesian Christian community.

- Built a sophisticated Bible application featuring multiple translations (Terjemahan Baru, Terjemahan Baru 2, Vulgata, Greek Interlinear) with Bible Dictionary, Catholic Catechism, and Canonical Law texts
- Implemented text-to-speech functionality across blog, Bible applications, and web resources for accessibility to visually impaired and auditory learners
- Created a cohesive JavaScript-based ecosystem maintaining consistency across multiple web applications with performance optimization
- Continuously refined UI and added features based on community feedback since January 2023
      `,
      tagsList: {
        title: 'Technologies',
        tags: [jekyll(), html5(), css3(), javascript()],
      },
      links: [website({ url: 'https://damaikasihchannel.com' })],
    },
    {
      name: 'Gatsby Garage',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2024-10'), new Date('2024-11')],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer', 'Back-end Developer'] },
        { label: 'Company', value: 'Personal' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [
        // { label: 'Demo', value: 'https://golden-bulls-d73jd7.netlify.app', url: '#' },
        // { label: 'Repository', value: 'https://github.com/mark-freeman/golden-bulls', url: '#' },
      ],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A headless CMS solution leveraging WordPress for content management with GatsbyJS generating a lightning-fast static site.

- Built a decoupled architecture combining WordPress content editing with GatsbyJS static site generation
- Implemented GraphQL data querying for efficient content extraction and transformation
- Gained hands-on experience with JAMstack principles including dramatic page load time improvements
- Learned decoupled architecture patterns maintaining full content management flexibility
      `,
      tagsList: {
        title: 'Technologies',
        tags: [gatsbyjs(), tailwindCss(), react(), wordpress(), graphql(), mysql(), dockerCompose()],
      },
      links: [website({ url: 'https://www.udemy.com/course/gatsby-js-react-wordpress-graphql/' })],
    },
    {
      name: 'Nextjs Property',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2024-10'), new Date('2024-11')],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer', 'Back-end Developer'] },
        { label: 'Company', value: 'Personal' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [
        // { label: 'Demo', value: 'https://golden-bulls-d73jd7.netlify.app', url: '#' },
      ],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A property listing application built with NextJS, exploring hybrid rendering strategies for real estate information display.

- Created a complete property listing application with rich detail and intuitive navigation using NextJS
- Implemented hybrid rendering: static generation for content-heavy pages, server-side rendering for dynamic search
- Combined performance benefits of static sites with flexibility needed for interactive features
- Strengthened full-stack capabilities by comparing NextJS and GatsbyJS framework approaches
      `,
      tagsList: {
        title: 'Technologies',
        tags: [nextJs(), tailwindCss(), react(), wordpress(), graphql(), mysql(), dockerCompose()],
      },
      links: [website({ url: 'https://www.udemy.com/course/next-js-wordpress/?couponCode=25BBPMXACCAGE2' })],
    },
    {
      name: 'CrosSyncOrder',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2024-07'), new Date('2024-10')],
      details: [
        { label: 'Team size', value: '1 person' },
        { label: 'My role', value: ['Front-end Developer', 'Back-end Developer'] },
        { label: 'Company', value: 'Personal' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://crossyncorders.com/', url: 'https://crossyncorders.com/' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A SaaS solution for cross-platform trade synchronization in the Forex market, copying trades across MetaTrader 4, MetaTrader 5, and cTrader.

- Designed a system copying trades from a single source account to multiple destinations across different trading platforms
- Created uniform interfaces for disparate trading platforms with secure authentication protocols
- Built a user-friendly dashboard with trade copying status monitoring, performance metrics, and comprehensive logging
- Implemented real-time synchronization system with minimal latency using WebSocket and ZeroMQ
- Containerized with Docker and Kubernetes for reliable deployment on Railway
      `,
      tagsList: {
        title: 'Technologies',
        tags: [
          nodejs(),
          expressjs(),
          javascript(),
          css3(),
          tailwindCss(),
          mysql(),
          zmq(),
          websocket(),
          mql4(),
          mql5(),
          csharp(),
          docker(),
          kubernetes(),
          railway(),
        ],
      },
      links: [website({ url: 'https://crossyncorder.com' })],
    },
    {
      name: 'Funded Prop Bx',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2022-01'), new Date('2024-10')],
      details: [
        { label: 'Team size', value: '3+ person' },
        { label: 'My role', value: ['Front-end Developer', 'Back-end Developer'] },
        { label: 'Company', value: 'Funded Prop Bx' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://fundedpropbx.com/', url: '#' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A web application for proprietary trading funds management, streamlining evaluation and management of funded traders.

- Designed an intuitive front-end interface with responsive HTML5/CSS3 layouts adapting seamlessly across devices
- Built back-end architecture using WordPress and PHP with custom MySQL database solutions for trader performance metrics
- Implemented robust infrastructure for trader evaluation, account management, and performance tracking
- Maintained version control through GitHub with Docker-based deployment on DigitalOcean and Ubuntu
      `,
      tagsList: {
        title: 'Technologies',
        tags: [
          wordpress(),
          php(),
          html5(),
          css3(),
          github(),
          mysql(),
          docker(),
          dockerCompose(),
          ubuntu(),
          digitalOcean(),
        ],
      },
      links: [website({ url: 'https://fundedpropbx.com' })],
    },
    {
      name: 'BaxiaMarkets',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2019-01'), new Date('2024-10')],
      details: [
        { label: 'Team size', value: '3+ person' },
        { label: 'My role', value: ['Front-end Developer', 'Back-end developer'] },
        { label: 'Company', value: 'Baxia Markets' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://baxiaMarkets.com', url: 'https://baxiaMarkets.com/' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A sophisticated financial services platform with separated public-facing content and secure client operations, built over a five-year period.

- Built public website using WordPress for content management and marketing-focused company brochure
- Developed secure client area with Laravel for account management and deposit functionality
- Architected microservices infrastructure integrating multiple payment service providers with seamless transaction processing
- Implemented SumSub KYC technology for regulatory compliance with frictionless identity verification
- Delivered responsive front-end interfaces using React and Vue.js with scalable MySQL database architecture
      `,
      tagsList: {
        title: 'Technologies',
        tags: [
          wordpress(),
          php(),
          laravel(),
          react(),
          vue(),
          html5(),
          css3(),
          github(),
          mysql(),
          hubspotCms(),
          docker(),
          dockerCompose(),
          ubuntu(),
          windowsServer(),
          digitalOcean(),
        ],
      },
      links: [website({ url: 'https://baxiamarkets.com' })],
    },
    {
      name: 'News BaxiaMarkets',
      //image: import('@/assets/portfolio/project-1.jpeg'),
      dates: [new Date('2020-01'), new Date('2024-10')],
      details: [
        { label: 'Team size', value: '3+ person' },
        { label: 'My role', value: ['Front-end Developer'] },
        { label: 'Company', value: 'BaxiaMarkets' },
        { label: 'Category', value: ['Web app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://news.baxiamarkets.com/', url: 'https://news.baxiamarkets.com/' }],
      // screenshots: [
      //   { src: import('@/assets/portfolio/project-1-screenshot-1.jpg'), alt: 'First screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-2.jpg'), alt: 'Second screenshot' },
      //   { src: import('@/assets/portfolio/project-1-screenshot-3.jpg'), alt: 'Third screenshot' },
      // ],
      description: `A specialized financial news platform integrated within the BaxiaMarkets ecosystem using HubSpot CMS.

- Built with HubSpot CMS creating dynamic content templates for market updates, economic calendars, and analyst insights
- Designed intuitive navigation and content filtering by asset classes, regions, or impact levels
- Continuously refined UX based on engagement metrics and feedback over a five-year development cycle
- Implemented responsive designs maintaining consistency across devices as a content marketing engine
      `,
      tagsList: {
        title: 'Technologies',
        tags: [hubspotCms(), hubspotDevelopment(), html5(), css3(), bootstrap(), javascript()],
      },
      links: [website({ url: 'https://news.baxiamarkets.com' })],
    },
    {
      name: 'Traderscolo Front-end and Back-end Development',
      //image: import('@/assets/portfolio/project-4.jpeg'),
      dates: [new Date('2014-01'), new Date('2020-01')],
      details: [
        { label: 'Team size', value: '11 people' },
        { label: 'My role', value: 'Front-end Developer' },
        { label: 'Company', value: 'Traderscolo' },
        { label: 'Category', value: ['Mobile app'] },
      ],
      pdfDetails: [{ label: 'Live', value: 'https://traderscolo.com', url: 'https://traderscolo.com' }],
      description: `A dedicated VPS rental platform for traders within an 11-person team, streamlining virtual server selection, configuration, and management.

- Built customer-facing website and product information using WordPress with WHMCS for client management, billing, and provisioning
- Created custom PHP solutions enhancing WordPress-WHMCS integration with specialized VPS configuration interfaces
- Developed intuitive dashboards for server management, usage monitoring, and service upgrades accessible to non-technical traders
- Leveraged VMware virtualization infrastructure on DigitalOcean and Google Cloud for reliable VPS hosting
      `,
      tagsList: {
        title: 'Technologies',
        tags: [wordpress(), whmcs(), php(), vmware(), windowsServer(), ubuntu(), digitalOcean(), googleCloud()],
      },
      links: [website({ url: 'https://traderscolo.com' })],
    },
  ],
} as const satisfies ReadonlyDeep;

export default portfolioSectionData;
