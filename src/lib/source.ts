import { blogPosts, docs } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
});

const showDrafts = process.env.NODE_ENV === 'development';

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts.filter((post) => showDrafts || !post.draft)),
});

/** Published posts, newest first. */
export function getBlogPosts() {
  return blog.getPages().sort((a, b) => b.data.date.localeCompare(a.data.date));
}
