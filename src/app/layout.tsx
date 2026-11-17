import '@/app/global.css';
import { Inter } from 'next/font/google';

import { baseUrl, createMetadata } from '@/lib/metadata';
import { Body } from '@/app/layout.client';
import { Provider } from '@/provider';

export const metadata = createMetadata({
  title: {
    template: '%s | lo1',
    default: 'lo1 — your whole system, running locally',
  },
  description: 'One command to run every frontend, backend and piece of infrastructure your team builds, wired together and served over HTTPS on real local domains.',
  metadataBase: baseUrl,
});

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <Body>
        <Provider>{children}</Provider>
      </Body>
    </html>
  );
}
