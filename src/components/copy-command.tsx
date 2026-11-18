'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { cn } from '@/lib/cn';
import { trackEvent } from '@/lib/analytics';

type Props = {
    command: string;
    className?: string;
};

/**
 * A one-line shell command with a copy button. Copies are the landing page's
 * main conversion, so each one is counted as a "Copy install command" event.
 */
export default function CopyCommand({ command, className }: Props) {
    const [checked, onClick] = useCopyButton(() => {
        trackEvent('Copy install command');
        return navigator.clipboard.writeText(command);
    });

    return (
        <div
            className={cn(
                'inline-flex max-w-full items-center gap-3 rounded-lg border bg-fd-card py-2 pr-2 pl-4 font-mono text-sm shadow-sm',
                className,
            )}
        >
            <span aria-hidden="true" className="select-none text-fd-primary">$</span>
            <code className="truncate text-fd-foreground">{command}</code>
            <button
                type="button"
                onClick={onClick}
                aria-label={checked ? 'Copied' : 'Copy command'}
                className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
                {checked ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
        </div>
    );
}
