/**
 * Plausible custom events. Each needs a matching custom event goal in the
 * Plausible dashboard to show up there. Event names carry the variant
 * (`Signup lo1`) because custom properties need a higher Plausible plan.
 */
export type AnalyticsEvent = 'Copy install command' | `Signup ${'lo1' | 'celerity' | 'bluelink'}`;

declare global {
    interface Window {
        plausible?: (event: string) => void;
    }
}

export function trackEvent(event: AnalyticsEvent): void {
    window.plausible?.(event);
}
