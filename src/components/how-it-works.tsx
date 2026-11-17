const steps = [
    {
        title: 'Describe your system',
        body: 'Add a lo1.yaml listing your services, the repositories they live in and the Compose file for your infrastructure.',
        command: 'lo1.yaml',
    },
    {
        title: 'Clone the workspace',
        body: 'lo1 init clones every repository into place. Skip it if everything already lives in one repo.',
        command: 'lo1 init',
    },
    {
        title: 'Bring it all up',
        body: 'lo1 up starts infrastructure, then services in dependency order, and prints a URL for each service with a port.',
        command: 'lo1 up',
    },
];

export default function HowItWorks() {
    return (
        <section className="px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-center text-3xl font-semibold tracking-tight text-fd-foreground sm:text-4xl">
                    From clone to running in three steps
                </h2>
                <ol className="mt-14 grid gap-6 text-left md:grid-cols-3">
                    {steps.map((step, i) => (
                        <li key={step.title} className="rounded-xl border bg-fd-card p-6">
                            <span className="flex size-8 items-center justify-center rounded-full bg-fd-primary/10 font-mono text-sm font-semibold text-fd-primary">
                                {i + 1}
                            </span>
                            <h3 className="mt-4 font-semibold text-fd-foreground">{step.title}</h3>
                            <p className="mt-2 text-sm/6 text-fd-muted-foreground">{step.body}</p>
                            <code className="mt-4 inline-block rounded-md bg-fd-muted px-2 py-1 font-mono text-xs text-fd-foreground">
                                {step.command}
                            </code>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
