import type { MainSection } from '@/types/sections/main-section.types';
import type { ReadonlyDeep } from 'type-fest';
import { facebook, githubLink, linkedin, twitter } from '../helpers/links';

const mainSectionData = {
  config: {
    icon: 'fa6-solid:user',
    title: 'Profile',
    slug: 'profile',
    visible: true,
  },
  image: import('@/assets/my-image.jpeg'),
  fullName: 'Agustinus Biotamalo Lumbantoruan',
  role: 'Web Developer',
  details: [
    { label: 'Phone', value: '62 813 9825 3186', url: 'tel:62 813 9825 3186' },
    { label: 'Email', value: 'fxwisdom1@gmail.com', url: 'mailto:fxwisdom1@gmail.com' },
    { label: 'From', value: 'Jakarta, Indonesia' },
    // { label: 'Salary range', value: '18 000 - 25 000 PLN' },
  ],
  pdfDetails: [
    { label: 'Phone', value: '62 813 9825 3186' },
    { label: 'Email', value: 'fxwisdom1@gmail.com' },
    {
      label: 'LinkedIn',
      value: '/in/agustinus-biotamalo-lumbantoruan-99126149',
      url: 'https://www.linkedin.com/in/agustinus-biotamalo-lumbantoruan-99126149/',
    },
    { label: 'GitHub', value: '/cryptorichyrich', url: 'https://github.com/cryptorichyrich' },
    { label: 'Website', value: 'https://biotama.tech', url: '/', fullRow: true },
  ],
  description: `As a passionate full-stack developer specializing in financial technology, I transform complex financial processes into intuitive digital experiences across retail banking, commercial banking, and forex trading platforms. While my expertise spans the entire development stack, my focus over the past five years has centered on mastering modern JavaScript frameworks including React, Nest.Js, Astro.Js, Vue.js, and Next.js to create dynamic, responsive interfaces. I combine technical excellence with business acumen to deliver secure, high-performance solutions that satisfy both C-level stakeholders and end-users while maintaining strict regulatory compliance.`,
  tags: [{ name: 'Open for work' }, { name: 'Open for freelance' }, { name: 'Working on side project' }],
  action: {
    label: 'Download CV',
    url: '/cv.pdf',
    downloadedFileName: 'CV-Agustinus_Biotamalo_Lumbantpruan.pdf',
  },
  links: [
    linkedin({ url: 'https://www.linkedin.com/in/agustinus-biotamalo-lumbantoruan-99126149/' }),
    githubLink({ url: 'https://github.com/cryptorichyrich' }),
    facebook({ url: 'https://www.facebook.com/Agustinus.Biotamalo.Lumbantoruan/' }),
    twitter({ url: 'https://x.com/fxwisdom1' }),
  ],
} as const satisfies ReadonlyDeep<MainSection>;

export default mainSectionData;
