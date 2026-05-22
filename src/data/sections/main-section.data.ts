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
  role: 'System Architect & Fintech Engineer',
  details: [
    { label: 'Phone', value: '+62 813 9825 3186', url: 'tel:+62 813 9825 3186' },
    { label: 'Email', value: 'fxwisdom1@gmail.com', url: 'mailto:fxwisdom1@gmail.com' },
    { label: 'From', value: 'Jakarta, Indonesia' },
    // { label: 'Salary range', value: '18 000 - 25 000 PLN' },
  ],
  pdfDetails: [
    { label: 'Phone', value: '+62 813 9825 3186' },
    { label: 'Email', value: 'fxwisdom1@gmail.com' },
    {
      label: 'LinkedIn',
      value: '/in/agustinus-biotamalo-lumbantoruan-99126149',
      url: 'https://www.linkedin.com/in/agustinus-biotamalo-lumbantoruan-99126149/',
    },
    { label: 'GitHub', value: '/cryptorichyrich', url: 'https://github.com/cryptorichyrich' },
    { label: 'Website', value: 'https://biotama.cv', url: '/', fullRow: true },
  ],
  description: `I design systems that move money, connect markets, and scale under pressure. Over the past decade, I've built everything from PCI-DSS compliant payment gateways to full-stack fintech platforms for brands like Pepperstone and TitanFX. Currently architecting Srabutan, Indonesia's next freelance marketplace, from the ground up. Companies that handle real money trusted me to build what their business runs on.`,
  tags: [{ name: 'Available for select partnerships' }],
  action: {
    label: 'See my work',
    url: '/resume',
  },
  links: [
    linkedin({ url: 'https://www.linkedin.com/in/agustinus-biotamalo-lumbantoruan-99126149/' }),
    githubLink({ url: 'https://github.com/cryptorichyrich' }),
    facebook({ url: 'https://www.facebook.com/Agustinus.Biotamalo.Lumbantoruan/' }),
    twitter({ url: 'https://x.com/fxwisdom1' }),
  ],
} as const satisfies ReadonlyDeep<MainSection>;

export default mainSectionData;
