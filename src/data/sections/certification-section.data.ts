import type { CertificationSection } from '@/types/sections/certification-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { website } from '../helpers/links';

const certificationSectionData = {
  config: {
    title: 'Certifications',
    slug: 'certification',
    icon: 'fa6-solid:certificate',
    visible: true,
  },
  certificates: [
    {
      title:
        'Master Functional Programming techniques with Elixir and Phoenix while learning to build compelling web applications!',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2025.04')],
      description:
        "This course teaches Elixir and Phoenix, covering functional programming fundamentals, building fast web applications, and integrating Postgres and OAuth. You'll learn to think with a functional programming mindset, master Elixir syntax, and build compelling web apps with Phoenix.",
      links: [website({ url: 'https://www.udemy.com/course/the-complete-elixir-and-phoenix-bootcamp-and-tutorial/' })],
    },
    // 2024 Certifications (Udemy)
    {
      title: 'Next JS & WordPress: Build Rapid NextJS Sites',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.12')],
      description:
        'Advanced course on building high-performance websites using Next.js and WordPress as a headless CMS.',
      links: [website({ url: 'https://www.udemy.com/course/nextjs-wordpress/' })],
    },
    {
      title: 'Gatsby JS v5 & Headless WordPress',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.11')],
      description:
        'Comprehensive course on building modern web applications using Gatsby JS and WordPress as a headless CMS.',
      links: [website({ url: 'https://www.udemy.com/course/gatsby-wordpress/' })],
    },
    {
      title: 'React, NodeJS, Express & MongoDB - MERN Fullstack Guide',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.11')],
      description:
        'Comprehensive full-stack web development course covering React, Node.js, Express, and MongoDB ecosystem.',
      links: [website({ url: 'https://www.udemy.com/course/react-nodejs-express-mongodb-bootcamp/' })],
    },
    {
      title: 'The DevOps Essentials - The Handbook',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.11')],
      description: 'Comprehensive guide to DevOps principles, practices, and essential tools.',
      links: [website({ url: 'https://www.udemy.com/course/devops-essentials/' })],
    },
    {
      title: 'Docker & Kubernetes: The Practical Guide',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.08')],
      description: 'In-depth practical course on containerization and orchestration using Docker and Kubernetes.',
      links: [website({ url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/' })],
    },
    {
      title: 'Dive Into Kubernetes - Containers, Docker and Kubernetes',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2024.06')],
      description: 'Detailed exploration of Kubernetes, containerization, and Docker technologies.',
      links: [website({ url: 'https://www.udemy.com/course/dive-into-kubernetes/' })],
    },

    // Cloud and DevOps Certifications
    {
      title: 'AWS for Beginners',
      institution: 'Great Learning Support',
      image: import('@/assets/great-learning-support.png'),
      dates: [new Date('2024.10')],
      description: 'Introductory course covering fundamental Amazon Web Services cloud computing concepts.',
      links: [website({ url: 'https://www.greatlearning.com/aws-certification' })],
    },
    {
      title: 'Cloud Computing Architecture',
      institution: 'Great Learning Support',
      image: import('@/assets/great-learning-support.png'),
      dates: [new Date('2024.10')],
      description: 'Comprehensive overview of cloud computing architectural principles and design.',
      links: [website({ url: 'https://www.greatlearning.com/cloud-computing' })],
    },
    {
      title: 'Introduction to DevOps',
      institution: 'Great Learning Support',
      image: import('@/assets/great-learning-support.png'),
      dates: [new Date('2024.10')],
      description: 'Foundational course introducing DevOps principles, practices, and tools.',
      links: [website({ url: 'https://www.greatlearning.com/devops-certification' })],
    },
    {
      title: 'SEO II',
      institution: 'HubSpot Academy',
      image: import('@/assets/hubspot-academy.png'),
      dates: [new Date('2024.11')],
      description: 'Advanced Search Engine Optimization strategies and techniques.',
      links: [website({ url: 'https://academy.hubspot.com/courses/seo' })],
    },

    // 2022-2020 Certifications
    {
      title: 'Beginners Guide to Google Tag Manager',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2022.12')],
      description: 'Introductory course on using Google Tag Manager for web analytics and tracking.',
      links: [website({ url: 'https://www.udemy.com/course/google-tag-manager-beginners/' })],
    },
    {
      title: 'Flutter iOS and Android Development',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2020.11')],
      description: 'Comprehensive mobile app development course using Flutter for iOS and Android platforms.',
      links: [website({ url: 'https://www.udemy.com/course/flutter-mobile-development/' })],
    },
    {
      title: 'Machine Learning A-Z',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2020.09')],
      description: 'Comprehensive course on Machine Learning using Python and R in Data Science.',
      links: [website({ url: 'https://www.udemy.com/course/machinelearning/' })],
    },
    {
      title: 'Project Management Practical Guide',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2020.09')],
      description: 'Practical project management course applicable across various industries.',
      links: [website({ url: 'https://www.udemy.com/course/project-management-practical-guide/' })],
    },
    {
      title: 'Complete Machine Learning Course',
      institution: 'Udemy',
      image: import('@/assets/udemy-logo.png'),
      dates: [new Date('2020.08')],
      description: 'Extensive machine learning course covering advanced data science techniques.',
      links: [website({ url: 'https://www.udemy.com/course/complete-machine-learning-course/' })],
    },
  ],
} as const satisfies ReadonlyDeep<CertificationSection>;

export default certificationSectionData;
