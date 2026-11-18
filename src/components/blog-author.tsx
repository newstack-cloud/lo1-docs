import Link from 'fumadocs-core/link';
import type { Author } from '@/lib/authors';

export function formatPostDate(date: string): string {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

/** Name, photo and date under a post's title. */
export function Byline({ author, date }: { author: Author; date: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimisation */}
            <img src={author.image} alt="" width={40} height={40} className="size-10 rounded-full" />
            <div>
                <Link href={author.linkedin} className="font-medium text-fd-foreground hover:text-fd-primary">
                    {author.name}
                </Link>
                <div>
                    <time dateTime={date}>{formatPostDate(date)}</time>
                </div>
            </div>
        </div>
    );
}

/** The author's bio and LinkedIn link at the end of a post. */
export function AuthorCard({ author }: { author: Author }) {
    return (
        <aside className="mt-16 flex items-start gap-4 rounded-xl border bg-fd-card p-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimisation */}
            <img src={author.image} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full" />
            <div className="text-sm/6">
                <p className="font-semibold text-fd-foreground">{author.name}</p>
                <p className="mt-1 text-fd-muted-foreground">{author.bio}</p>
                <Link
                    href={author.linkedin}
                    className="mt-2 inline-block font-medium text-fd-primary hover:underline"
                >
                    Connect on LinkedIn
                </Link>
            </div>
        </aside>
    );
}
