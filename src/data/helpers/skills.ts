import createSkillFactory from '@/data/_internals/create-skill-factory';

/*
Place where you can define all your skills.
This way, you can ensure one skill has the same name, icon, and URL among all resume sections.

Where skills are used:
- experience-section.data.ts
- portfolio-section.data.ts
- skills-section.data.ts

Usage examples:
skill() — returns skill object without any customizations.
skill({ level: 3 }) — returns a levelled-skill. It can be used only in skills-section.data.ts.
skill({ name: '...' }) — returns skill object with a custom name.
skill({ description: '...' }) — returns skill with a description displayed when user hovers over it.
*/

export const digitalOcean = createSkillFactory({
  name: 'Digital Ocean',
  icon: 'simple-icons:digitalocean',
  iconColor: '#0080FF',
  url: 'https://www.digitalocean.com/',
  description:
    'Cloud infrastructure provider offering virtual machines, managed databases, and app deployment solutions',
  category: 'Cloud Services',
});

export const googleCloud = createSkillFactory({
  name: 'Google Cloud',
  icon: 'simple-icons:googlecloud',
  iconColor: '#4285F4',
  url: 'https://cloud.google.com/',
  description:
    'Suite of cloud computing services including compute, storage, ML, and data analytics running on Google infrastructure',
  category: 'Cloud Services',
});

export const railway = createSkillFactory({
  name: 'Railway',
  icon: 'simple-icons:railway',
  iconColor: '#0B0D0E',
  url: 'https://railway.app/',
  description:
    'Modern deployment platform that automates infrastructure, environments, and deployments for developer teams',
  category: 'Cloud Services',
});

export const eloquent = createSkillFactory({
  name: 'Eloquent ORM',
  icon: 'simple-icons:laravel',
  iconColor: '#FF2D20',
  url: 'https://laravel.com/docs/eloquent',
  description:
    'Elegant ORM included with Laravel that provides a simple ActiveRecord implementation for working with databases',
  category: 'Database Tools',
});

export const sequelize = createSkillFactory({
  name: 'Sequelize',
  icon: 'simple-icons:sequelize',
  iconColor: '#52B0E7',
  url: 'https://sequelize.org/',
  description: 'Promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite and SQL Server',
  category: 'Database Tools',
});

export const prisma = createSkillFactory({
  name: 'Prisma',
  icon: 'simple-icons:prisma',
  iconColor: '#2D3748',
  url: 'https://www.prisma.io/',
  description: 'Next-generation ORM for Node.js and TypeScript with type-safety and auto-generated queries',
  category: 'Database Tools',
});

// PYTHON ECOSYSTEM
export const python = createSkillFactory({
  name: 'Python',
  icon: 'simple-icons:python',
  iconColor: '#3776AB',
  url: 'https://www.python.org/',
  description: 'High-level, versatile programming language known for readability and extensive libraries',
  category: 'Programming Languages',
});

export const flask = createSkillFactory({
  name: 'Flask',
  icon: 'simple-icons:flask',
  iconColor: '#000000',
  url: 'https://flask.palletsprojects.com/',
  description: 'Lightweight WSGI web application framework for Python with a flexible and extensible architecture',
  category: 'Backend Development',
});

export const pinescript = createSkillFactory({
  name: 'Pine Script',
  icon: 'simple-icons:python',
  iconColor: '#2962FF', // Approximated Pine Script color
  url: 'https://www.tradingview.com/pine-script-docs/en/v5/Introduction.html',
  description: "TradingView's programming language for creating custom indicators",
  category: 'Trading & Financial Programming',
  level: 'intermediate',
});

// TRADING AND FINANCIAL PROGRAMMING
export const mql4 = createSkillFactory({
  name: 'MQL4',
  icon: 'simple-icons:c',
  iconColor: '#827FF4',
  url: 'https://www.mql4.com/',
  description:
    'Programming language for MetaTrader 4 trading platform used for developing trading robots and indicators',
  category: 'Financial Programming',
});

export const mql5 = createSkillFactory({
  name: 'MQL5',
  icon: 'simple-icons:cplusplus',
  iconColor: '#2A8CF0',
  url: 'https://www.mql5.com/',
  description:
    'Object-oriented programming language for MetaTrader 5 platform with advanced financial algorithms capabilities',
  category: 'Financial Programming',
});

// PROGRAMMING LANGUAGES
export const csharp = createSkillFactory({
  name: 'C#',
  icon: 'simple-icons:csharp',
  iconColor: '#239120',
  url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
  description: 'Modern object-oriented programming language developed by Microsoft for the .NET platform',
  category: 'Programming Languages',
});
// VIRTUALIZATION AND CLOUD TECHNOLOGIES
export const vmware = createSkillFactory({
  name: 'VMware',
  icon: 'simple-icons:vmware',
  iconColor: '#607078',
  url: 'https://www.vmware.com/',
  description: 'Enterprise virtualization platform for servers, desktops, and application management',
  category: 'Virtualization',
});

// SOCIAL MEDIA AND ADVERTISING PLATFORMS
export const TwitterSkill = createSkillFactory({
  name: 'Twitter',
  icon: 'simple-icons:twitter',
  iconColor: '#1DA1F2',
  url: 'https://twitter.com/',
  description: 'Social media platform for news, entertainment, and network building',
  category: 'Social Media',
});

export const twitterAds = createSkillFactory({
  name: 'Twitter Ads',
  icon: 'simple-icons:twitter',
  iconColor: '#1DA1F2',
  url: 'https://ads.twitter.com/',
  description: 'Advertising platform for promoting tweets, accounts, and trends to targeted audiences',
  category: 'Digital Advertising',
});

export const facebookAds = createSkillFactory({
  name: 'Facebook Ads',
  icon: 'simple-icons:facebook',
  iconColor: '#1877F2',
  url: 'https://www.facebook.com/business/ads',
  description:
    'Comprehensive advertising platform for reaching audiences across Facebook, Instagram, and Audience Network',
  category: 'Digital Advertising',
});

export const redis = createSkillFactory({
  name: 'Redis',
  icon: 'simple-icons:redis',
  iconColor: '#DC382D',
  url: 'https://redis.io/',
  description: 'In-memory data structure store used as database, cache, and message broker',
  category: 'Databases',
});

// MESSAGING AND REAL-TIME TECHNOLOGIES
export const zmq = createSkillFactory({
  name: 'ZeroMQ',
  icon: 'simple-icons:zeromq',
  iconColor: '#DF0000',
  url: 'https://zeromq.org/',
  description: 'High-performance asynchronous messaging library for distributed systems',
  category: 'Messaging',
});

export const websocket = createSkillFactory({
  name: 'WebSocket',
  icon: 'mdi:websocket',
  iconColor: '#2962FF',
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
  description: 'Communication protocol providing full-duplex real-time communication channels over TCP',
  category: 'Web Technologies',
});

// SERVER AND INFRASTRUCTURE
export const ubuntu = createSkillFactory({
  name: 'Ubuntu',
  icon: 'simple-icons:ubuntu',
  iconColor: '#E95420',
  url: 'https://ubuntu.com/',
  description: 'Linux distribution based on Debian, widely used for servers and cloud infrastructure',
  category: 'Operating Systems',
});

export const windowsServer = createSkillFactory({
  name: 'Windows Server',
  icon: 'simple-icons:windows',
  iconColor: '#0078D6',
  url: 'https://www.microsoft.com/en-us/windows-server',
  description: 'Microsoft server operating system for enterprise-level management, applications, and infrastructure',
  category: 'Operating Systems',
});

export const jenkins = createSkillFactory({
  name: 'Jenkins',
  icon: 'simple-icons:jenkins',
  iconColor: '#D24939',
  url: 'https://www.jenkins.io/',
  description: 'Open-source automation server for CI/CD pipelines',
  category: 'DevOps',
});

// CUSTOMER SUPPORT AND ENGAGEMENT PLATFORMS
export const zendesk = createSkillFactory({
  name: 'Zendesk',
  icon: 'simple-icons:zendesk',
  iconColor: '#03363D',
  url: 'https://www.zendesk.com/',
  description: 'Customer service software and support ticket system for managing customer interactions',
  category: 'Customer Support',
});

export const intercom = createSkillFactory({
  name: 'Intercom',
  icon: 'simple-icons:intercom',
  iconColor: '#6EDCFF',
  url: 'https://www.intercom.com/',
  description: 'Customer messaging platform for sales, marketing, and support communications',
  category: 'Customer Support',
});

export const tawkto = createSkillFactory({
  name: 'Tawk.to',
  icon: 'bi:chat-dots-fill',
  iconColor: '#03A84E',
  url: 'https://www.tawk.to/',
  description: 'Free live chat software for website visitor monitoring and engagement',
  category: 'Customer Support',
});

// BUSINESS AND HOSTING MANAGEMENT TOOLS
export const whmcs = createSkillFactory({
  name: 'WHMCS',
  icon: 'simple-icons:whmcs',
  iconColor: '#007FFF',
  url: 'https://www.whmcs.com/',
  description: 'Web hosting automation and client management platform for billing, support, and domain provisioning',
  category: 'Business Tools',
});

// FRONTEND FRAMEWORKS AND LIBRARIES
export const react = createSkillFactory({
  name: 'React',
  icon: 'simple-icons:react',
  iconColor: '#61DAFB',
  url: 'https://reactjs.org/',
  description: 'JavaScript library for building user interfaces',
  category: 'Frontend Development',
});

export const bootstrap = createSkillFactory({
  name: 'Bootstrap',
  icon: 'simple-icons:bootstrap',
  iconColor: '#7952B3',
  url: 'https://getbootstrap.com/',
  description: 'Popular CSS framework for responsive, mobile-first web development',
  category: 'Frontend Development',
});

export const vue = createSkillFactory({
  name: 'Vue.js',
  icon: 'simple-icons:vuedotjs',
  iconColor: '#4FC08D',
  url: 'https://vuejs.org/',
  description: 'Progressive JavaScript framework for building user interfaces',
  category: 'Frontend Development',
});

export const astro = createSkillFactory({
  name: 'Astro',
  icon: 'simple-icons:astro',
  iconColor: '#FF5D01',
  url: 'https://astro.build/',
  description: 'All-in-one web framework for building fast, content-focused websites',
  category: 'Frontend Development',
});

export const nextJs = createSkillFactory({
  name: 'Next.js',
  icon: 'simple-icons:nextdotjs',
  iconColor: '#000000',
  url: 'https://nextjs.org/',
  description: 'React framework for production with server-side rendering',
  category: 'Full-Stack Development',
});

export const gatsbyjs = createSkillFactory({
  name: 'Gatsby',
  icon: 'simple-icons:gatsby',
  iconColor: '#663399',
  url: 'https://www.gatsbyjs.com/',
  description: 'React-based open source framework for creating websites and apps',
  category: 'Frontend Development',
});

// STYLING AND UI LIBRARIES
export const tailwindCss = createSkillFactory({
  name: 'Tailwind CSS',
  icon: 'simple-icons:tailwindcss',
  iconColor: '#06B6D4',
  url: 'https://tailwindcss.com/',
  description: 'Utility-first CSS framework for rapid UI development',
  category: 'Frontend Development',
});

export const chakraUi = createSkillFactory({
  name: 'Chakra UI',
  icon: 'simple-icons:chakraui',
  iconColor: '#319795',
  url: 'https://chakra-ui.com/',
  description: 'Accessible component library for React applications',
  category: 'Frontend Development',
});

export const sass = createSkillFactory({
  name: 'SASS',
  icon: 'simple-icons:sass',
  iconColor: '#CC6699',
  url: 'https://sass-lang.com/',
  description: 'CSS preprocessor scripting language',
  category: 'Frontend Development',
});

export const css3 = createSkillFactory({
  name: 'CSS3',
  icon: 'simple-icons:css3',
  iconColor: '#1572B6',
  url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  description: 'Style sheet language for designing document presentation',
  category: 'Frontend Development',
});

export const html5 = createSkillFactory({
  name: 'HTML5',
  icon: 'simple-icons:html5',
  iconColor: '#E34F26',
  url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  description: 'Markup language for documents designed to be displayed in a web browser',
  category: 'Frontend Development',
});

// JAVASCRIPT AND TYPESCRIPT
export const javascript = createSkillFactory({
  name: 'JavaScript',
  icon: 'simple-icons:javascript',
  iconColor: '#F7DF1E',
  url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  description: 'High-level programming language for web development',
  category: 'Programming Languages',
});

export const typescript = createSkillFactory({
  name: 'TypeScript',
  icon: 'simple-icons:typescript',
  iconColor: '#3178C6',
  url: 'https://www.typescriptlang.org/',
  description: 'Strongly typed programming language that builds on JavaScript',
  category: 'Programming Languages',
});

export const jquery = createSkillFactory({
  name: 'jQuery',
  icon: 'simple-icons:jquery',
  iconColor: '#0769AD',
  url: 'https://jquery.com/',
  description: 'Fast, small, and feature-rich JavaScript library',
  category: 'Frontend Development',
});

// BACKEND AND SERVER FRAMEWORKS
export const nodejs = createSkillFactory({
  name: 'Node.js',
  icon: 'simple-icons:nodedotjs',
  iconColor: '#339933',
  url: 'https://nodejs.org/',
  description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
  category: 'Backend Development',
});

export const nestJs = createSkillFactory({
  name: 'NestJS',
  icon: 'simple-icons:nestjs',
  iconColor: '#E0234E',
  url: 'https://nestjs.com/',
  description: 'Progressive Node.js framework for building server-side applications',
  category: 'Backend Development',
});

export const expressjs = createSkillFactory({
  name: 'Express.js',
  icon: 'simple-icons:express',
  iconColor: '#000000',
  url: 'https://expressjs.com/',
  description: 'Fast, unopinionated, minimalist web framework for Node.js',
  category: 'Backend Development',
});

export const laravel = createSkillFactory({
  name: 'Laravel',
  icon: 'simple-icons:laravel',
  iconColor: '#FF2D20',
  url: 'https://laravel.com/',
  description: 'PHP web application framework with elegant syntax',
  category: 'Full-Stack Development',
});

export const rubyOnRails = createSkillFactory({
  name: 'Ruby on Rails',
  icon: 'simple-icons:rubyonrails',
  iconColor: '#CC0000',
  url: 'https://rubyonrails.org/',
  description: 'Server-side web application framework written in Ruby',
  category: 'Full-Stack Development',
});

export const php = createSkillFactory({
  name: 'PHP',
  icon: 'simple-icons:php',
  iconColor: '#777BB4',
  url: 'https://www.php.net/',
  description: 'General-purpose scripting language for web development',
  category: 'Programming Languages',
});

// DATABASES
export const mongoDb = createSkillFactory({
  name: 'MongoDB',
  icon: 'simple-icons:mongodb',
  iconColor: '#47A248',
  url: 'https://www.mongodb.com/',
  description: 'NoSQL document database with scalability and flexibility',
  category: 'Databases',
});

export const postgreSql = createSkillFactory({
  name: 'PostgreSQL',
  icon: 'simple-icons:postgresql',
  iconColor: '#4169E1',
  url: 'https://www.postgresql.org/',
  description: 'Advanced open source relational database',
  category: 'Databases',
});

export const mysql = createSkillFactory({
  name: 'MySQL',
  icon: 'simple-icons:mysql',
  iconColor: '#4479A1',
  url: 'https://www.mysql.com/',
  description: 'Open-source relational database management system',
  category: 'Databases',
});

export const oracle = createSkillFactory({
  name: 'Oracle Database',
  icon: 'simple-icons:oracle',
  iconColor: '#F80000',
  url: 'https://www.oracle.com/database/',
  description: 'Enterprise-grade relational database management system',
  category: 'Databases',
});

// API AND DATA FETCHING
export const apolloGraphql = createSkillFactory({
  name: 'Apollo GraphQL',
  icon: 'simple-icons:apollographql',
  iconColor: '#311C87',
  url: 'https://www.apollographql.com/',
  description: 'Implementation of GraphQL for client and server',
  category: 'API Development',
});

export const graphql = createSkillFactory({
  name: 'GraphQL',
  icon: 'simple-icons:graphql',
  iconColor: '#E10098',
  url: 'https://graphql.org/',
  description: 'Query language for APIs and runtime for executing queries',
  category: 'API Development',
});

export const reactQuery = createSkillFactory({
  name: 'React Query',
  icon: 'simple-icons:reactquery',
  iconColor: '#FF4154',
  url: 'https://tanstack.com/query',
  description: 'Data fetching and state management library for React',
  category: 'Frontend Development',
});

// BACKEND AS A SERVICE
export const firebase = createSkillFactory({
  name: 'Firebase',
  icon: 'simple-icons:firebase',
  iconColor: '#FFCA28',
  url: 'https://firebase.google.com/',
  description: 'App development platform that helps you build apps',
  category: 'Backend Services',
});

export const supabase = createSkillFactory({
  name: 'Supabase',
  icon: 'simple-icons:supabase',
  iconColor: '#3ECF8E',
  url: 'https://supabase.io/',
  description: 'Open source Firebase alternative with PostgreSQL',
  category: 'Backend Services',
});

// CMS
export const wordpress = createSkillFactory({
  name: 'WordPress',
  icon: 'simple-icons:wordpress',
  iconColor: '#21759B',
  url: 'https://wordpress.org/',
  description: 'Open-source content management system',
  category: 'Content Management',
});

export const elementor = createSkillFactory({
  name: 'Elementor',
  icon: 'simple-icons:elementor',
  iconColor: '#92003B',
  url: 'https://elementor.com/',
  description: 'Leading WordPress page builder for professional web design',
  category: 'Content Management',
});

// DEVELOPMENT TOOLS
export const git = createSkillFactory({
  name: 'Git',
  icon: 'simple-icons:git',
  iconColor: '#F05032',
  url: 'https://git-scm.com/',
  description: 'Distributed version control system',
  category: 'Development Tools',
});

export const github = createSkillFactory({
  name: 'GitHub',
  icon: 'simple-icons:github',
  iconColor: '#181717',
  url: 'https://github.com/',
  description: 'Platform for hosting and collaborating on Git repositories',
  category: 'Development Tools',
});

export const githubActions = createSkillFactory({
  name: 'GitHub Actions',
  icon: 'simple-icons:githubactions',
  iconColor: '#2088FF',
  url: 'https://github.com/features/actions',
  description: 'CI/CD platform integrated with GitHub repositories',
  category: 'DevOps',
});

export const n8n = createSkillFactory({
  name: 'n8n',
  icon: 'simple-icons:githubactions',
  iconColor: 'orange',
  url: 'https://n8n.io/',
  description: 'Workflow automation tool with a focus on freedom and privacy',
  category: 'Automation',
});

export const docker = createSkillFactory({
  name: 'Docker',
  icon: 'simple-icons:docker',
  iconColor: '#2496ED',
  url: 'https://www.docker.com/',
  description: 'Platform for developing, shipping, and running applications',
  category: 'DevOps',
});

export const dockerCompose = createSkillFactory({
  name: 'Docker Compose',
  icon: 'simple-icons:docker',
  iconColor: '#2496ED',
  url: 'https://docs.docker.com/compose/',
  description: 'Tool for defining and running multi-container Docker applications',
  category: 'DevOps',
});

export const kubernetes = createSkillFactory({
  name: 'Kubernetes',
  icon: 'simple-icons:kubernetes',
  iconColor: '#326CE5',
  url: 'https://kubernetes.io/',
  description: 'Open-source container orchestration platform',
  category: 'DevOps',
});

export const nx = createSkillFactory({
  name: 'Nx',
  icon: 'simple-icons:nx',
  iconColor: '#143055',
  url: 'https://nx.dev/',
  description: 'Smart, fast and extensible build system',
  category: 'Development Tools',
});

export const pnpm = createSkillFactory({
  name: 'pnpm',
  icon: 'simple-icons:pnpm',
  iconColor: '#F69220',
  url: 'https://pnpm.io/',
  description: 'Fast, disk space efficient package manager',
  category: 'Development Tools',
});

// CODE QUALITY AND TESTING
export const eslint = createSkillFactory({
  name: 'ESLint',
  icon: 'simple-icons:eslint',
  iconColor: '#4B32C3',
  url: 'https://eslint.org/',
  description: 'Static code analysis tool for identifying problematic patterns',
  category: 'Development Tools',
});

export const prettier = createSkillFactory({
  name: 'Prettier',
  icon: 'simple-icons:prettier',
  iconColor: '#F7B93E',
  url: 'https://prettier.io/',
  description: 'Opinionated code formatter',
  category: 'Development Tools',
});

export const jest = createSkillFactory({
  name: 'Jest',
  icon: 'simple-icons:jest',
  iconColor: '#C21325',
  url: 'https://jestjs.io/',
  description: 'JavaScript testing framework',
  category: 'Testing',
});

export const cypress = createSkillFactory({
  name: 'Cypress',
  icon: 'simple-icons:cypress',
  iconColor: '#17202C',
  url: 'https://www.cypress.io/',
  description: 'JavaScript end-to-end testing framework',
  category: 'Testing',
});
// JAVA ECOSYSTEM
export const java = createSkillFactory({
  name: 'Java',
  icon: 'simple-icons:java',
  iconColor: '#007396',
  url: 'https://www.java.com/',
  description: 'General-purpose programming language designed for reliability and portability',
  category: 'Programming Languages',
});

export const spring = createSkillFactory({
  name: 'Spring',
  icon: 'simple-icons:spring',
  iconColor: '#6DB33F',
  url: 'https://spring.io/',
  description: 'Application framework and inversion of control container for Java',
  category: 'Backend Development',
});

export const springBoot = createSkillFactory({
  name: 'Spring Boot',
  icon: 'simple-icons:springboot',
  iconColor: '#6DB33F',
  url: 'https://spring.io/projects/spring-boot',
  description: 'Java-based framework used to create microservices with minimal configuration',
  category: 'Backend Development',
});

export const hibernate = createSkillFactory({
  name: 'Hibernate',
  icon: 'simple-icons:hibernate',
  iconColor: '#59666C',
  url: 'https://hibernate.org/',
  description: 'Object-relational mapping framework for Java',
  category: 'Backend Development',
});

export const junit = createSkillFactory({
  name: 'JUnit',
  icon: 'simple-icons:junit5',
  iconColor: '#25A162',
  url: 'https://junit.org/',
  description: 'Unit testing framework for Java applications',
  category: 'Testing',
});

export const maven = createSkillFactory({
  name: 'Maven',
  icon: 'simple-icons:apachemaven',
  iconColor: '#C71A36',
  url: 'https://maven.apache.org/',
  description: 'Build automation and dependency management tool for Java projects',
  category: 'Development Tools',
});

export const gradle = createSkillFactory({
  name: 'Gradle',
  icon: 'simple-icons:gradle',
  iconColor: '#02303A',
  url: 'https://gradle.org/',
  description: 'Build automation tool focused on flexibility and performance',
  category: 'Development Tools',
});

export const tomcat = createSkillFactory({
  name: 'Apache Tomcat',
  icon: 'simple-icons:apachetomcat',
  iconColor: '#F8DC75',
  url: 'https://tomcat.apache.org/',
  description: 'Open-source implementation of Java Servlet, JavaServer Pages and WebSocket technologies',
  category: 'Backend Development',
});

export const jsf = createSkillFactory({
  name: 'JavaServer Faces',
  icon: 'ri:fire-line',
  iconColor: '#E76F00',
  url: 'https://www.oracle.com/java/technologies/javaserverfaces.html',
  description: 'Java specification for building component-based user interfaces for web applications',
  category: 'Frontend Development',
});

export const jekyll = createSkillFactory({
  name: 'Jekyll',
  icon: 'simple-icons:jekyll',
  iconColor: '#CC0000',
  url: 'https://jekyllrb.com/',
  description: 'Simple, blog-aware static site generator for personal, project, or organization sites',
  category: 'Frontend Development',
});

// MARKETING AND CRM TOOLS
export const hubspot = createSkillFactory({
  name: 'HubSpot',
  icon: 'simple-icons:hubspot',
  iconColor: '#FF7A59',
  url: 'https://www.hubspot.com/',
  description: 'CRM platform with marketing, sales, and service automation',
  category: 'Marketing & CRM',
});

export const hubspotCms = createSkillFactory({
  name: 'HubSpot CMS',
  icon: 'simple-icons:hubspot',
  iconColor: '#FF7A59',
  url: 'https://www.hubspot.com/products/cms',
  description: 'Content management system for creating websites and landing pages',
  category: 'Content Management',
});

export const hubspotMarketing = createSkillFactory({
  name: 'HubSpot Marketing Hub',
  icon: 'simple-icons:hubspot',
  iconColor: '#FF7A59',
  url: 'https://www.hubspot.com/products/marketing',
  description: 'Marketing automation and lead generation platform',
  category: 'Marketing & CRM',
});

export const hubspotDevelopment = createSkillFactory({
  name: 'HubSpot Development',
  icon: 'simple-icons:hubspot',
  iconColor: '#FF7A59',
  url: 'https://developers.hubspot.com/',
  description: 'Custom module development and API integration for HubSpot',
  category: 'Development',
});
