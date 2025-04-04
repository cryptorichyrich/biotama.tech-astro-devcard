import type { TestimonialsSection } from '@/types/sections/testimonials-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { githubLink, linkedin, website } from '../helpers/links';

const testimonialsSectionData = {
  config: {
    title: 'Testimonials',
    slug: 'testimonials',
    icon: 'fa6-solid:comment',
    visible: true,
  },
  testimonials: [
    {
      image: import('@/assets/nash-wadud.jpg'),
      author: 'Nash Wadud',
      relation: 'CEO at CITT Services',
      content:
        "Bio consistently delivers exceptional technical solutions that drive our company's digital transformation. His innovative approach and strategic thinking have been crucial in solving complex technological challenges, demonstrating a remarkable blend of technical expertise and business insight.",
      links: [linkedin({ url: 'https://www.linkedin.com/in/nashwadud/' })],
    },
    {
      image: import('@/assets/hannah.jpg'),
      author: 'Hannah Rivera',
      relation: 'COO at CITT Services',
      content:
        "I've worked closely with Bio and have been consistently impressed by his ability to tackle intricate technical problems with precision and creativity. His problem-solving skills and deep understanding of emerging technologies have significantly enhanced our operational efficiency and strategic capabilities.",
      links: [linkedin({ url: 'https://www.linkedin.com/in/hannah-g-rivera/' })],
    },
    {
      image: import('@/assets/nadiya-alistika.jpg'),
      author: 'Nadiya Alistika',
      relation: 'Colleague at CITT Services',
      content:
        'Working alongside Bio has been an incredible professional experience. His technical proficiency is exceptional, and he has a unique talent for breaking down complex technical concepts and collaborating effectively across different teams. He consistently brings innovative solutions to our most challenging projects.',
      links: [linkedin({ url: 'https://www.linkedin.com/in/nadiya-alistika/' })],
    },
    {
      image: import('@/assets/dhruv.jpg'),
      author: 'Dhruv Sangvikar',
      relation: 'Colleague at CITT Services',
      content:
        "Bio's commitment to technological excellence and continuous learning is truly outstanding. He constantly pushes the boundaries of innovation, bringing cutting-edge solutions and a forward-thinking approach to our team. His contributions have been instrumental in advancing our technological capabilities.",
      links: [website({ url: 'https://dhruvsangvikar.info/' })],
    },
  ],
} as const satisfies ReadonlyDeep<TestimonialsSection>;

export default testimonialsSectionData;
