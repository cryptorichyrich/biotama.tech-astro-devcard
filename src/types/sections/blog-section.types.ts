import type { Section } from '../shared';

/**
 * Blog section powered by Astro Content Collections.
 * Section-specific data is fetched at build time from src/content/blog/.
 */
export interface BlogSection extends Section {}
