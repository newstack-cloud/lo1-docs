import Link from 'fumadocs-core/link';
import SignupForm from './signup-form';

const stages = [
    {
        name: 'lo1',
        verb: 'Run it locally',
        body: 'Every service and the infrastructure behind it, on your machine, with one command.',
        href: '/docs',
        status: 'Available now',
        current: true,
    },
    {
        name: 'Celerity',
        verb: 'Build and ship it',
        body: 'Portable backend building blocks: APIs, WebSockets, queues and more, described in blueprints and deployed to your cloud. The lo1 Celerity plugin will read the same blueprints and start the matching local infrastructure for you.',
        href: 'https://celerityframework.io',
        status: 'v0 end of February 2027',
        current: false,
    },
];

export default function Ecosystem() {
    return (
        <section id="ecosystem" className="scroll-mt-24 border-t px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base/7 font-semibold text-fd-primary">The Celerity ecosystem</h2>
                    <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
                        Start local. Grow into Celerity.
                    </p>
                    <p className="mt-6 text-pretty text-lg/8 text-fd-muted-foreground">
                        lo1 works with whatever you build today. It is also the local development layer
                        of Celerity, so when you are ready for portable, serverless-style backends,
                        the way you run them locally stays exactly the same.
                    </p>
                </div>

                <ol className="mx-auto mt-16 grid max-w-4xl gap-4 text-left md:grid-cols-2 md:gap-0">
                    {stages.map((stage, i) => (
                        <li key={stage.name} className="relative flex md:pr-8 last:md:pr-0">
                            <Link
                                href={stage.href}
                                className={`flex w-full flex-col rounded-xl border p-6 transition-colors hover:border-fd-primary/60 ${
                                    stage.current ? 'border-fd-primary/50 bg-fd-primary/5' : 'bg-fd-card'
                                }`}
                            >
                                <span className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
                                    {stage.verb}
                                </span>
                                <span className="mt-1 text-xl font-semibold text-fd-foreground">{stage.name}</span>
                                <span className="mt-3 flex-1 text-sm/6 text-fd-muted-foreground">{stage.body}</span>
                                <span
                                    className={`mt-5 self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        stage.current ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-muted text-fd-muted-foreground'
                                    }`}
                                >
                                    {stage.status}
                                </span>
                            </Link>
                            {i < stages.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className="absolute top-1/2 right-0 hidden w-8 -translate-y-1/2 text-center text-fd-muted-foreground md:block"
                                >
                                    &rarr;
                                </span>
                            )}
                        </li>
                    ))}
                </ol>

                <p className="mx-auto mt-8 max-w-2xl text-center text-sm/6 text-fd-muted-foreground">
                    Celerity deploys through{' '}
                    <Link href="https://bluelink.dev" className="font-semibold text-fd-foreground hover:text-fd-primary">
                        Bluelink
                    </Link>
                    , its infrastructure-as-code engine. Bluelink is also a standalone tool, for teams that want
                    to describe and deploy cloud resources directly.
                </p>

                <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-dashed p-6 text-left">
                    <p className="text-sm/6 text-fd-muted-foreground">
                        <span className="font-semibold text-fd-foreground">The Celerity plugin is on its way.</span>{' '}
                        Blueprint-driven queues, topics, datastores and seed data, started by lo1 up. Get an
                        email when it ships.
                    </p>
                    <SignupForm
                        source="celerity"
                        label="Email address for Celerity release announcements"
                        buttonText="Get notified"
                        className="mt-4"
                    />
                </div>
            </div>
        </section>
    );
}
