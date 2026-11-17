'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

/**
 * Search uses Algolia, like the Celerity and Bluelink sites. Until the lo1
 * index exists the Algolia variables are unset, so search is switched off
 * rather than failing the build.
 */
const algoliaConfigured = Boolean(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY &&
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
);

const SearchDialog = dynamic(() => import('@/components/search'), { ssr: false });

export function Provider({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={algoliaConfigured ? { SearchDialog } : { enabled: false }}
        >
            {children}
        </RootProvider>
    );
}
