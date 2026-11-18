export type Author = {
    name: string;
    bio: string;
    linkedin: string;
    /** A square photo in public/, at least 96px. */
    image: string;
};

/** Keyed by the `author` field in a blog post's frontmatter. */
export const authors = {
    'andre-sutherland': {
        name: 'Andre Sutherland',
        bio: 'Andre founded NewStack to build a new generation of developer tools centred on portable building blocks.',
        linkedin: 'https://www.linkedin.com/in/andre-sutherland-679b9070/',
        image: '/assets/authors/andre-sutherland.jpg',
    },
} satisfies Record<string, Author>;

export function getAuthor(key: string): Author {
    const author = (authors as Record<string, Author>)[key];
    if (!author) throw new Error(`Unknown blog author "${key}". Add it to src/lib/authors.ts.`);
    return author;
}
