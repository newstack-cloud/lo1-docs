import type { Metadata } from "next";

const siteUrl = "https://lo1.dev";

export function createMetadata(override: Metadata): Metadata {
    return {
        ...override,
        openGraph: {
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            images: '/banner.png',
            siteName: 'lo1',
            ...override.openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            creator: '@newstackcloud',
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            images: '/banner.png',
            ...override.twitter,
        },
    };
}

/**
 * The site is a static export served from GitHub Pages, so there is no
 * hosting platform variable to read the production URL from.
 */
export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? new URL('http://localhost:3000')
        : new URL(siteUrl);
