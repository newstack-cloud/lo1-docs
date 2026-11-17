'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The `lo1 up` screen recording. It plays on a silent loop like a GIF, except
 * for visitors who ask for reduced motion, who get a paused video with
 * controls instead.
 */
export default function DemoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => {
            setReducedMotion(query.matches);
            if (query.matches) ref.current?.pause();
            else void ref.current?.play().catch(() => undefined);
        };
        apply();
        query.addEventListener('change', apply);
        return () => query.removeEventListener('change', apply);
    }, []);

    return (
        <video
            ref={ref}
            className="block aspect-video w-full"
            src={src}
            poster={poster}
            aria-label={label}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={reducedMotion}
        />
    );
}
