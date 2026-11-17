import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '../components/logo';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/newstack-cloud/lo1',
    nav: {
      title: <Logo height={22} />,
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        secondary: false,
        active: 'nested-url',
      },
    ],
  };
}
