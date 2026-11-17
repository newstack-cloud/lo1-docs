'use client';

import 'asciinema-player/dist/bundle/asciinema-player.css';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A click-to-play asciinema recording for the docs, coloured by the `lo1`
 * theme in global.css. It opens on its last frame, so it reads like a static
 * example until someone presses play. The children show until the recording
 * has loaded, and for good if it can't, so keep them a text version of it.
 */
export default function TerminalCast({
    src,
    label,
    children,
}: {
    src: string;
    label: string;
    children: ReactNode;
}) {
    const container = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let player: { dispose(): void } | undefined;

        async function load() {
            const [AsciinemaPlayer, res] = await Promise.all([import('asciinema-player'), fetch(src)]);
            if (!res.ok) return;
            const data = await res.text();
            if (cancelled || !container.current) return;

            player = AsciinemaPlayer.create({ data }, container.current, {
                theme: 'lo1',
                fit: 'width',
                controls: true,
                poster: 'npt:0:07',
                terminalFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            });
            setReady(true);
        }

        load().catch(() => undefined);
        return () => {
            cancelled = true;
            player?.dispose();
        };
    }, [src]);

    return (
        <>
            <div
                ref={container}
                role="img"
                aria-label={label}
                className={ready ? 'not-prose my-6 overflow-hidden rounded-xl' : 'hidden'}
            />
            {!ready && children}
        </>
    );
}
