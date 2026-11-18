import Link from 'fumadocs-core/link';
import { formatPostDate } from '@/components/blog-author';
import { getAuthor } from '@/lib/authors';
import { createMetadata } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/source';

export const metadata = createMetadata({
    title: 'Blog',
    description: 'Writing about running multi-service systems locally, from the people building lo1.',
    alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
});

export default function BlogIndex() {
    const posts = getBlogPosts();

    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 text-left sm:py-24">
            <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground sm:text-4xl">Blog</h1>
            <p className="mt-3 text-fd-muted-foreground">
                Posts about running multi-service systems locally.{' '}
                <Link href="/blog/rss.xml" className="font-medium text-fd-foreground underline hover:text-fd-primary">
                    RSS
                </Link>
            </p>

            {posts.length === 0 ? (
                <p className="mt-12 text-fd-muted-foreground">No posts yet.</p>
            ) : (
                <ol className="mt-12 divide-y border-y">
                    {posts.map((post) => (
                        <li key={post.url}>
                            <Link href={post.url} className="group block py-8">
                                <p className="text-sm text-fd-muted-foreground">
                                    <time dateTime={post.data.date}>{formatPostDate(post.data.date)}</time> ·{' '}
                                    {getAuthor(post.data.author).name}
                                    {post.data.draft && ' · Draft'}
                                </p>
                                <h2 className="mt-2 text-xl font-semibold text-fd-foreground group-hover:text-fd-primary">
                                    {post.data.title}
                                </h2>
                                {post.data.description && (
                                    <p className="mt-2 text-fd-muted-foreground">{post.data.description}</p>
                                )}
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
        </main>
    );
}
