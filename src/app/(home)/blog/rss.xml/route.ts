import { getAuthor } from '@/lib/authors';
import { baseUrl } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/source';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

export function GET() {
    const site = baseUrl.toString().replace(/\/$/, '');
    const items = getBlogPosts().map((post) => {
        const link = `${site}${post.url}`;
        return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${post.data.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(getAuthor(post.data.author).name)}</dc:creator>
      <description>${escapeXml(post.data.description ?? '')}</description>
    </item>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>lo1 blog</title>
    <link>${site}/blog</link>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Writing about running multi-service systems locally, from the people building lo1.</description>
    <language>en</language>
${items.join('\n')}
  </channel>
</rss>
`;

    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
