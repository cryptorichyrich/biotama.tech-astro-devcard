import type { Config } from '@/types/data';
import { enUS } from 'date-fns/locale';
import type { ReadonlyDeep } from 'type-fest';

const config = {
  i18n: {
    locale: enUS,
    dateFormat: 'MMMM yyyy',
    translations: {
      now: 'now',
    },
  },
  meta: {
    title: 'Bio Lumbantoruan — System Architect & Fintech Engineer',
    description: 'System architect specializing in fintech infrastructure. Payment gateways, marketplace platforms, and full-stack engineering.',
    faviconPath: '/src/assets/my-image.jpeg',
    ogImage: '/images/og-default.svg',
  },
  pdf: {
    footer: '',
  },
} as const satisfies ReadonlyDeep<Config>;

export default config;
