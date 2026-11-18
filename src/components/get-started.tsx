import Link from 'fumadocs-core/link';
import CopyCommand from './copy-command';
import SignupForm from './signup-form';

export default function GetStarted() {
    return (
        <section className="border-t bg-fd-card/50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-fd-foreground sm:text-4xl">
                    Get your stack running in five minutes
                </h2>
                <p className="mt-4 text-pretty text-lg/8 text-fd-muted-foreground">
                    You need Node.js 24+ and Docker. lo1 runs on macOS, Linux and Windows.
                </p>
                <div className="mt-8 flex flex-col items-center gap-6">
                    <CopyCommand command="npm install -g @lo1/cli" />
                    <Link
                        href="/docs/quick-start"
                        className="rounded-md bg-fd-primary px-3.5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm hover:bg-fd-primary/85"
                    >
                        Read the quick start
                    </Link>
                </div>
                <div className="mx-auto mt-16 max-w-md border-t pt-10 text-left">
                    <h3 className="text-center text-base font-semibold text-fd-foreground">Hear about new releases</h3>
                    <SignupForm
                        source="lo1"
                        label="Email address for lo1 release announcements"
                        className="mt-4"
                    />
                </div>
            </div>
        </section>
    );
}
