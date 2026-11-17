import Link from 'fumadocs-core/link';
import CopyCommand from './copy-command';

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden px-6 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#5eead4] to-[#0d9488] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-3xl pt-24 pb-16 sm:pt-36 sm:pb-24">
                <div className="mb-8 flex justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-fd-muted-foreground ring-1 ring-fd-border hover:ring-fd-primary/40">
                        Open source. Works with any stack.{' '}
                        <Link href="https://github.com/newstack-cloud/lo1" className="font-semibold text-fd-primary">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Star on GitHub <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-fd-foreground sm:text-7xl">
                    Your whole system, running locally.
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg font-medium text-fd-muted-foreground sm:text-xl/8">
                    lo1 brings up your infrastructure, runs your migrations and seed data, then starts
                    every frontend and backend in the right order, wired together and served over
                    HTTPS on real domain names. One config file. One command.
                </p>
                <div className="mt-10 flex flex-col items-center gap-6">
                    <CopyCommand command="npm install -g @lo1/cli" />
                    <div className="flex items-center gap-x-6">
                        <Link
                            href="/docs/quick-start"
                            className="rounded-md bg-fd-primary px-3.5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm hover:bg-fd-primary/85"
                        >
                            Get started
                        </Link>
                        <Link
                            href="https://github.com/newstack-cloud/lo1"
                            className="text-sm/6 font-semibold text-fd-foreground hover:text-fd-primary"
                        >
                            View on GitHub <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
