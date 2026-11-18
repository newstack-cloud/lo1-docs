import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { AuthorCard, Byline } from '@/components/blog-author';
import { getAuthor } from '@/lib/authors';
import { createMetadata } from '@/lib/metadata';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function BlogPost(props: PageProps<'/blog/[slug]'>) {
    const { slug } = await props.params;
    const post = blog.getPage([slug]);
    if (!post) notFound();

    const author = getAuthor(post.data.author);
    const MDXContent = post.data.body;

    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 text-left sm:py-24">
            <article>
                <header className="border-b pb-8">
                    {post.data.draft && (
                        <p className="mb-4 inline-block rounded-full bg-fd-muted px-2.5 py-0.5 text-xs font-medium text-fd-muted-foreground">
                            Draft: only visible in yarn dev
                        </p>
                    )}
                    <h1 className="text-balance text-3xl font-semibold tracking-tight text-fd-foreground sm:text-4xl">
                        {post.data.title}
                    </h1>
                    {post.data.description && (
                        <p className="mt-4 text-lg text-fd-muted-foreground">{post.data.description}</p>
                    )}
                    <div className="mt-6">
                        <Byline author={author} date={post.data.date} />
                    </div>
                </header>
                <div className="prose mt-10 max-w-none">
                    <MDXContent components={getMDXComponents({ a: createRelativeLink(blog, post) })} />
                </div>
                <AuthorCard author={author} />
            </article>
        </main>
    );
}

/**
 * A static export can't build a dynamic route with no params, so while there
 * are no published posts this returns one slug that renders as not found.
 */
const NO_POSTS = '_none';

export function generateStaticParams() {
    const params = blog.getPages().map((post) => ({ slug: post.slugs[0] }));
    return params.length > 0 ? params : [{ slug: NO_POSTS }];
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
    const { slug } = await props.params;
    const post = blog.getPage([slug]);
    if (!post) notFound();

    const author = getAuthor(post.data.author);
    return createMetadata({
        title: post.data.title,
        description: post.data.description,
        authors: [{ name: author.name, url: author.linkedin }],
        alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
        openGraph: {
            type: 'article',
            url: post.url,
            publishedTime: post.data.date,
            authors: [author.linkedin],
        },
    });
}
