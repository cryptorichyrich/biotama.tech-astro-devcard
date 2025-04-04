import type { EducationSection } from '@/types/sections/education-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { website } from '../helpers/links';

const educationSectionData = {
  config: {
    title: 'Education',
    slug: 'education',
    icon: 'fa6-solid:graduation-cap',
    visible: true,
  },
  diplomas: [
    {
      title: 'Information System',
      institution: 'Swiss German University',
      image: import('@/assets/sgu.jpg'),
      dates: [new Date('2007.10'), new Date('2011.07')],
      description: 'Bachelor degree. Specialization in software development. GPA 3.34',
      links: [website({ url: 'http://sgu.ac.id/' })],
    },
  ],
} as const satisfies ReadonlyDeep<EducationSection>;

export default educationSectionData;
