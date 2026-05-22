import type { BlogSection } from '@/types/sections/blog-section.types';
import type { ReadonlyDeep } from 'type-fest';

const blogSectionData = {
  config: {
    title: 'Blog',
    slug: 'blog',
    icon: 'fa6-solid:pen-nib',
    visible: true,
  },
} as const satisfies ReadonlyDeep<BlogSection>;

export default blogSectionData;
