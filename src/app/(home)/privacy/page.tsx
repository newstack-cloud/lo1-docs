import Link from 'fumadocs-core/link';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Privacy',
    description: 'What lo1.dev and the NewStack mailing list collect, and why.',
    openGraph: { url: '/privacy/' },
});

/** Keep in step with the site: update it when analytics or another service is added. */
const UPDATED = '18 November 2026';

export default function PrivacyPage() {
    return (
        <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 text-left sm:py-24">
            <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground">Privacy</h1>
            <p className="mt-2 text-sm text-fd-muted-foreground">Last updated {UPDATED}</p>

            <div className="mt-10 space-y-8 text-base/7 text-fd-muted-foreground">
                <section>
                    <h2 className="text-lg font-semibold text-fd-foreground">This site</h2>
                    <p className="mt-2">
                        lo1.dev is run by{' '}
                        <Link
                            href="https://newstack.cloud"
                            className="font-medium text-fd-foreground underline hover:text-fd-primary"
                        >
                            NewStack
                        </Link>
                        . It sets no cookies. To see which pages are read and where visitors come from, it
                        uses{' '}
                        <Link
                            href="https://plausible.io/data-policy"
                            className="font-medium text-fd-foreground underline hover:text-fd-primary"
                        >
                            Plausible Analytics
                        </Link>
                        , which counts visits without cookies and without storing personal data. It records
                        the page, the referring site, the browser, the operating system and the country, and
                        can&apos;t identify you or follow you across sites. It also counts when someone copies
                        the install command or submits a signup form, without recording who.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-fd-foreground">The mailing list</h2>
                    <p className="mt-2">
                        If you sign up, we store your email address, the date you signed up and which form you
                        used, so we know whether you came for lo1 or Celerity. We use it only to send release
                        announcements for lo1, Celerity and Bluelink. We don&apos;t share
                        or sell it, and the emails have no open or click tracking.
                    </p>
                    <p className="mt-4">
                        The list is hosted by{' '}
                        <Link
                            href="https://buttondown.com/legal/privacy"
                            className="font-medium text-fd-foreground underline hover:text-fd-primary"
                        >
                            Buttondown
                        </Link>
                        , which stores the addresses and sends the emails for us. You confirm your address
                        before you get anything, and every email has an unsubscribe link. Unsubscribing
                        stops the emails straight away.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-fd-foreground">Your data</h2>
                    <p className="mt-2">
                        To see, correct or delete what we hold about you, reply to any email from the list.
                    </p>
                </section>
            </div>
        </main>
    );
}
