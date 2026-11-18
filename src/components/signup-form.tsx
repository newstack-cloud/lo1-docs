'use client';

import Link from 'fumadocs-core/link';
import { trackEvent } from '@/lib/analytics';

/**
 * Signup for the NewStack mailing list on Buttondown. Buttondown asks for a
 * plain form post rather than fetch, since a signup may need a CAPTCHA or a
 * correction on its own page, so the form opens Buttondown in a new tab.
 *
 * `source` records where the signup came from as subscriber metadata, and
 * names the Plausible event (`Signup lo1`) counted on submit. Tags
 * are a paid Buttondown add-on; once it's on, add a hidden `tag` input with
 * the same value so signups are segmented as they arrive.
 */
const ACTION = 'https://buttondown.com/api/emails/embed-subscribe/newstack';

export default function SignupForm({
    source,
    label,
    buttonText = 'Subscribe',
    className = '',
}: {
    source: 'lo1' | 'celerity' | 'bluelink';
    label: string;
    buttonText?: string;
    className?: string;
}) {
    const inputId = `signup-email-${source}`;
    return (
        <form
            action={ACTION}
            method="post"
            target="_blank"
            rel="noopener"
            onSubmit={() => trackEvent(`Signup ${source}`)}
            className={`w-full ${className}`}
        >
            <label htmlFor={inputId} className="sr-only">
                {label}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
                <input
                    id={inputId}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 rounded-md border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-primary focus:outline-none focus:ring-1 focus:ring-fd-primary"
                />
                <input type="hidden" name="metadata__source" value={source} />
                <button
                    type="submit"
                    className="shrink-0 rounded-md border px-3.5 py-2 text-sm font-semibold text-fd-foreground hover:border-fd-primary hover:text-fd-primary"
                >
                    {buttonText}
                </button>
            </div>
            <p className="mt-2 text-xs/5 text-fd-muted-foreground">
                Release announcements only. Unsubscribe any time.{' '}
                <Link href="/privacy" className="underline hover:text-fd-primary">
                    Privacy
                </Link>
            </p>
        </form>
    );
}
