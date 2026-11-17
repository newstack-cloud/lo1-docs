import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Link from 'fumadocs-core/link';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...baseOptions()}>{children}<Footer /></HomeLayout>;
}

const footerLinks = [
  { text: 'Documentation', href: '/docs' },
  { text: 'GitHub', href: 'https://github.com/newstack-cloud/lo1' },
  { text: 'npm', href: 'https://www.npmjs.com/package/@lo1/cli' },
  { text: 'Celerity', href: 'https://celerityframework.io' },
  { text: 'Bluelink', href: 'https://bluelink.dev' },
];

function Footer() {
  return (
    <footer className="mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-mono text-sm font-semibold">lo1</p>
          <p className="text-xs">
            Part of the Celerity ecosystem. Apache-2.0 licensed.
            <br />
            Copyright © {new Date().getFullYear()} The lo1 authors.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-fd-primary">
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
