import { z } from 'zod';
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import {
  rehypeCodeDefaultOptions,
  remarkAdmonition,
  remarkSteps,
} from 'fumadocs-core/mdx-plugins';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
    async: true,
  },
  meta: {
    schema: metaSchema,
  },
});

/**
 * Blog posts in content/blog. `author` is a key in src/lib/authors.ts, and a
 * `draft` post only appears when running `yarn dev`.
 */
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string(),
    // YAML reads 2026-12-01 as a Date; keep it as a plain YYYY-MM-DD string.
    date: z.coerce.date().transform((d) => d.toISOString().slice(0, 10)),
    draft: z.boolean().default(false),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    remarkPlugins: [remarkSteps, remarkAdmonition],
    rehypeCodeOptions: rehypeCodeDefaultOptions,
  },
});
