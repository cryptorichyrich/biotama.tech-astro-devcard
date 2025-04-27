import type { PortfolioSection } from '@/types/sections/portfolio-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { demo, githubLink, twitter, website } from '../helpers/links';
import {
  css3,
  TwitterSkill,
  eslint,
  facebookAds,
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
      description: `Developed Vavelle AI Chat Interface, a modern real-time chat application powered by GroqCloud's large language models. Built with React and Tailwind CSS, the application features a responsive dark-mode UI with syntax highlighting for code blocks, markdown-style formatting, and seamless conversation history management. Implemented efficient state management using React hooks and optimized API token usage to balance conversation context with cost efficiency.
      <span></span>
Architected a secure deployment strategy by creating a backend proxy server to protect API credentials, eliminating the need for client-side API key exposure. The application includes error handling, loading states, and user experience enhancements such as auto-scrolling and message timestamps. Successfully deployed the solution with comprehensive documentation for multiple platforms including Vercel, Netlify, and Docker, demonstrating full-stack development capabilities and security best practices.`,
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
      description: `This project is a full-stack sales dashboard application consisting of a FastAPI backend and a Next.js frontend. The backend, built with Python, serves sales representative data from a JSON file and integrates Google's Gemini AI model to provide intelligent responses to sales-related queries. Key backend features include endpoints for retrieving sales data, generating AI-powered insights, and calculating sales analytics. The system uses dummy sales representative data that includes information on representatives' regions, skills, deals, and clients, with appropriate CORS configuration to allow cross-origin requests from the frontend.
      <span></span>
The frontend is developed with Next.js and React, featuring a responsive interface built with Tailwind CSS. It displays sales representative information in cards that can be filtered by region, and includes an AI chat section where users can ask questions about sales data. The application architecture is well-organized with separate components for layout, sales representation, and AI chat functionality. Custom React hooks manage data fetching and chat state, while the UI components handle the presentation of sales data and formatting of AI responses. The chat interface supports markdown rendering, making the AI responses more readable with proper formatting for headings, code blocks, and other elements.`,
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
      description: `For Vavelle & Co, I developed a streamlined web application showcasing their signature Crispy Pork Belly product. As both front-end developer and designer on this solo project, I created an intuitive interface that beautifully highlights the product's quality while simplifying the ordering process. As for the gallery, I was inspired by Instagram's design, implementing a visually engaging grid layout that emphasizes the product's texture and presentation. The solution features mouth-watering product imagery, detailed descriptions, and customization options, culminating in a seamless WhatsApp integration that allows customers to finalize orders directly through messaging. This approach eliminated the need for complex payment gateways while maintaining the personal touch the client wanted in their customer interactions. The responsive design ensures accessibility across all devices, helping Vavelle expand their market reach while preserving their direct customer relationship model.`,
      tagsList: {
        title: 'Technologies',
        tags: [react(), tailwindCss(), html5(), githubActions(), javascript()],
      },
      links: [website({ url: '#' })],
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
      description: `For Vavelle & Co, I designed and developed a comprehensive car rental web application that streamlines the vehicle booking process. As the sole front-end developer and designer on this project, I created a cohesive six-page website with intuitive navigation and responsive design. The gallery page features an elegant display of the rental fleet with detailed car specifications, allowing customers to compare options easily. I implemented a user-friendly booking system that guides visitors through the rental process step by step, with clear date selection and vehicle availability indicators. The FAQ page addresses common customer questions with expandable sections for improved readability and information access. Throughout the site, I maintained Vavelle's brand identity while ensuring cross-device compatibility, resulting in a professional platform that effectively showcases their rental offerings while simplifying the reservation process for their customers.`,
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
      description: `For Damai Kasih Channel, I spearheaded the development of a comprehensive religious digital platform that serves as a spiritual resource hub for the Indonesian Christian community. Working within a team of three, I took on the dual role of front-end developer and designer to create an intuitive, accessible experience across multiple applications. The centerpiece of my contribution is a sophisticated Bible application featuring multiple translations including "Terjemahan Baru," "Terjemahan Baru 2," "Vulgata," and "Greek Interlinear," along with specialized resources like the Bible Dictionary, Catholic Catechism, and Canonical Law texts.
<span></span>
My technical implementation focused on creating a cohesive JavaScript-based ecosystem that maintains consistency across various web applications while optimizing for performance. A notable enhancement I introduced is text-to-speech functionality, allowing users to listen to content rather than read—a feature I implemented across the blog section, Bible applications, and other web resources. This accessibility improvement has significantly expanded the platform's reach to users with visual impairments and those who prefer auditory learning. Throughout the ongoing development process since January 2023, I've continuously refined the user interface and added new features based on community feedback, creating a growing digital ministry that serves believers through modern technology.`,
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
      description: `I immersed myself in the GatsbyJS framework through an Udemy course by Eric Evans, marking my first hands-on experience with this powerful technology. Working independently as both front-end and back-end developer, I built a headless CMS solution that leverages WordPress for content management while GatsbyJS extracts and transforms this data into a lightning-fast static site. This architecture allowed me to combine the user-friendly content editing capabilities of WordPress with the performance benefits of a static site generator. Throughout the two-month development process, I gained valuable insights into modern JAMstack principles, GraphQL data querying, and the benefits of decoupled architecture. The project served as an excellent learning opportunity to understand how static site generation can dramatically improve page load times and overall performance while maintaining full content management flexibility.`,
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
      description: `For my "NextJS Property" project, I applied the knowledge gained from my previous Gatsby experience but shifted to the NextJS framework to explore its unique capabilities. Working solo as both front-end and back-end developer, I created a complete property listing application that showcases real estate information with rich detail and intuitive navigation. Unlike my Gatsby project, NextJS allowed me to implement hybrid rendering strategies, using static generation for content-heavy pages while leveraging server-side rendering for dynamic search functionality. This approach provided the performance benefits of static sites with the flexibility needed for interactive features. The development process enhanced my understanding of React's ecosystem while revealing the practical differences between these two powerful frameworks. This personal project strengthened my full-stack capabilities and demonstrated how NextJS can be especially valuable for applications requiring both speed and dynamic content handling.RetryClaude can make mistakes. `,
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
      description: `For my personal project "CrosSyncOrder," I designed and built a comprehensive Software as a Service (SaaS) solution targeting the Forex trading market's need for cross-platform trade synchronization. Working independently as both front-end and back-end developer, I created a system capable of copying trades from a single source trading account to multiple destination accounts across different platforms—MetaTrader 4, MetaTrader 5, and cTrader.
<span></span>
        The development process involved tackling complex technical challenges, including creating uniform interfaces for disparate trading platforms, implementing secure authentication protocols for accessing trading accounts, and designing a resilient real-time synchronization system with minimal latency. I built a user-friendly dashboard that provides detailed monitoring of trade copying status, performance metrics, and comprehensive logging. While the project remained in the personal development phase, it significantly enhanced my understanding of financial technology integration, multi-platform compatibility issues, and the architectural considerations needed for high-reliability financial applications that must operate with precision in time-sensitive environments.`,
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
      description: `For Funded Prop Bx, I led the development of a comprehensive web application designed for proprietary trading funds management. Working with a team of three, I took on multiple roles spanning front-end development, design, and back-end implementation to create a cohesive platform that streamlines the evaluation and management of funded traders.
<span></span>
On the front-end, I designed an intuitive interface that balances aesthetic appeal with practical functionality, implementing responsive layouts using HTML5 and CSS3 that adapt seamlessly across devices. The back-end architecture leverages WordPress and PHP for content management and business logic, with custom MySQL database solutions handling complex trader performance metrics and account data. Throughout the nearly three-year development cycle, I maintained version control through GitHub, facilitating efficient collaboration and deployment processes. The resulting platform provides a robust infrastructure for trader evaluation, account management, and performance tracking, delivering a professional solution that operates at the intersection of financial technology and web development.`,
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
      description: `For BaxiaMarkets, I spearheaded the development of a sophisticated financial services platform over a five-year period, implementing a specialized architecture that separated public-facing content from secure client operations. The public website was built using WordPress for its content management capabilities, creating an informative and marketing-focused company brochure that effectively communicated BaxiaMarkets' offerings and value proposition to potential clients.
        <span></span>
        The secure client area was developed using Laravel, providing a robust foundation for critical financial operations including account management and deposit functionality. I architected a comprehensive microservices infrastructure to integrate multiple payment service providers, ensuring seamless transaction processing while maintaining system modularity. For regulatory compliance, I implemented SumSub KYC technology, creating a frictionless yet thorough identity verification workflow. The front-end implementation for both the public site and client portal utilized React and Vue.js frameworks with HTML5 and CSS3, delivering responsive interfaces optimized for different user journeys. Throughout this complex project, I maintained strict version control via GitHub and built a scalable MySQL database architecture to support growing user volumes and transaction data. This carefully separated yet cohesive system architecture successfully balanced marketing objectives with stringent financial security requirements while providing an intuitive user experience.`,
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
      description: `For the News BaxiaMarkets project, I led the development of a specialized financial news platform integrated within the broader BaxiaMarkets ecosystem. Working collaboratively with a team, I focused on creating an engaging and information-rich news experience using HubSpot CMS as the foundation. As the primary front-end developer and designer, I crafted a content delivery system that presents complex financial news and market analysis in an accessible, visually compelling format.
        <span></span>
        The implementation leveraged HubSpot Development tools and custom modules to create dynamic content templates optimized for different news categories including market updates, economic calendars, and analyst insights. I designed intuitive navigation systems and content filtering mechanisms that allow users to quickly find relevant information based on asset classes, regions, or impact levels. Throughout the nearly five-year development cycle, I continuously refined the user experience based on engagement metrics and feedback, implementing responsive designs that maintain consistency across devices. This specialized news platform became a valuable extension of BaxiaMarkets' service offerings, providing clients with timely market intelligence while simultaneously serving as a content marketing engine that established the company's thought leadership in the financial sector.`,
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
      description: `For the Traderscolo Front-end and Back-end Development project, I served as a front-end developer within a robust 11-person team during a six-year period that transformed the company's digital service offerings. Working on Traderscolo's dedicated VPS (Virtual Private Server) rental platform for traders, I developed user interfaces that streamlined the process of selecting, configuring, and managing virtual servers optimized for trading applications.
        <span></span>
        The technical implementation leveraged WordPress for the customer-facing website and product information, while WHMCS provided the critical client management, billing, and service provisioning functionality. I created custom PHP solutions to enhance the integration between these platforms, developing specialized interfaces for VPS configuration options tailored to different trading software requirements. The underlying infrastructure was built on VMware virtualization technology, which enabled the reliable hosting and management of numerous client VPS instances. My work focused on creating intuitive dashboards for server management, usage monitoring, and service upgrades, making complex technical processes accessible to traders without IT backgrounds. This specialized hosting service allowed traders to run their automated trading systems continuously with minimal latency, providing them with a competitive edge in the markets.`,
      tagsList: {
        title: 'Technologies',
        tags: [wordpress(), whmcs(), php(), vmware(), windowsServer(), ubuntu(), digitalOcean(), googleCloud()],
      },
      links: [website({ url: 'https://traderscolo.com' })],
    },
  ],
} as const satisfies ReadonlyDeep<PortfolioSection>;

export default portfolioSectionData;
