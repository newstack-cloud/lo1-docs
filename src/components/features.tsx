import Link from 'fumadocs-core/link';
import {
    ArrowPathRoundedSquareIcon,
    CircleStackIcon,
    CpuChipIcon,
    FolderOpenIcon,
    LockClosedIcon,
    QueueListIcon,
} from '@heroicons/react/20/solid';

type Feature = {
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href?: string;
};

const features: Feature[] = [
    {
        name: 'Ready to use, not just running',
        description:
            'lo1 waits for your infrastructure to be healthy, runs your migration and seed scripts, then starts every service in dependency order, behind its readiness probe. No more "start the database, run the migrations, load the fixtures, then the API…" in a README.',
        icon: QueueListIcon,
    },
    {
        name: 'HTTPS on real domains',
        description:
            'Turn on TLS and every service with a port gets a URL like https://api.shop.local through a built-in Caddy proxy. Route by subdomain, path prefix or your own domain. Use the local CA for your machine, or publicly trusted certificates over ACME for a domain you own, so phones and laptops on your network can use them too.',
        icon: LockClosedIcon,
    },
    {
        name: 'Your infrastructure, as Compose',
        description:
            'Postgres, Redis, LocalStack, Kafka: keep describing them in the Docker Compose files you already have. lo1 layers them in, along with each service’s own Compose file.',
        icon: CircleStackIcon,
    },
    {
        name: 'Ready for coding agents',
        description:
            'An agent runs lo1 up --detach and gets control back only once the whole system is ready, with migrations run and data seeded. It tests its change against real services instead of mocks, and reads lo1 logs to see what broke. Same commands your team uses, nothing extra to set up.',
        icon: CpuChipIcon,
        href: '/docs/coding-agents',
    },
    {
        name: 'Hot reload or container, per service',
        description:
            'Run the service you are working on from source with your usual dev server, and everything else from its container image. Set it per service in lo1.yaml, or flip everything at once with --mode.',
        icon: ArrowPathRoundedSquareIcon,
    },
    {
        name: 'Many repos, one workspace',
        description:
            'List your repositories in lo1.yaml and lo1 init clones the lot. A new teammate goes from laptop to a running system in two commands.',
        icon: FolderOpenIcon,
    },
];

export default function Features() {
    return (
        <section id="features" className="scroll-mt-24 border-t bg-fd-card/50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base/7 font-semibold text-fd-primary">Why lo1</h2>
                    <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
                        Find integration bugs before you deploy
                    </p>
                    <p className="mt-6 text-pretty text-lg/8 text-fd-muted-foreground">
                        Most bugs in a system with several services live in the gaps between them.
                        lo1 runs all of it on your own machine, so you see how a change behaves across
                        the whole system as soon as you make it, instead of waiting on a deploy to find
                        out.
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 text-left sm:mt-20 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-fd-foreground">
                                <feature.icon aria-hidden="true" className="size-5 flex-none text-fd-primary" />
                                {feature.name}
                            </dt>
                            <dd className="mt-3 flex flex-auto flex-col text-base/7 text-fd-muted-foreground">
                                <p className="flex-auto">{feature.description}</p>
                                {feature.href && (
                                    <p className="mt-4">
                                        <Link href={feature.href} className="text-sm/6 font-semibold text-fd-primary hover:underline">
                                            Set it up <span aria-hidden="true">→</span>
                                        </Link>
                                    </p>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
