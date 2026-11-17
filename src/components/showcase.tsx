/**
 * Side-by-side lo1.yaml and the `lo1 up` output it produces.
 *
 * Both come from the shop example in the lo1 repo (examples/shop). The config
 * leaves out the example's `env` blocks (DATABASE_URL, PORT) and npm install's
 * quiet flags to fit the panel.
 * The terminal text is a real run of that example, in the lo1 repo:
 * - `[lo1]` phase and service lines: packages/cli/src/orchestrator/start.ts,
 *   formatted by packages/cli/src/output/format.ts
 * - `[migrate]`, `[seed]`, `[api]` lines: what the example's scripts print
 * - the closing summary: packages/cli/src/cli/commands/up.ts
 * `…` stands for lines left out (config loading, Docker Compose progress,
 * Postgres's first-boot output, plugin phases).
 * Keep this in step with the CLI: a landing page that shows output the CLI
 * never prints is the fastest way to lose a first-time visitor's trust.
 */

const config = `version: "1"
name: shop

# Postgres, as plain Docker Compose
extraCompose: ./infra.compose.yaml

services:
  # Init tasks run once, in order, and must
  # exit 0 before anything depending on them starts
  migrate:
    type: service
    path: ./api
    command: npm install && node src/migrate.js
    initTask: true

  seed:
    type: service
    path: ./api
    command: node src/seed.js
    initTask: true
    dependsOn: [migrate]

  api:
    type: service
    path: ./api
    port: 4100
    command: node src/server.js
    readinessProbe: http://localhost:4100/health
    dependsOn: [seed]

  web:
    type: app
    path: ./web
    port: 4200
    command: node src/server.js
    dependsOn: [api]

proxy:
  tld: local
  tls:
    enabled: true`;

const terminal = [
    { text: '$ lo1 up', tone: 'command' },
    { text: '…', tone: 'muted' },
    { text: '[lo1] Starting infrastructure', tone: 'phase' },
    { text: '…', tone: 'muted' },
    { text: '[lo1] Trusting Caddy CA', tone: 'phase' },
    { text: '…', tone: 'muted' },
    { text: '[lo1] Starting services', tone: 'phase' },
    { text: '[lo1] migrate: starting', tone: 'phase' },
    { text: '[migrate] added 14 packages in 229ms', tone: 'output' },
    { text: '[migrate] migrations applied', tone: 'output' },
    { text: '[lo1] migrate: completed', tone: 'phase' },
    { text: '[lo1] seed: starting', tone: 'phase' },
    { text: '[seed] seeded 3 products', tone: 'output' },
    { text: '[lo1] seed: completed', tone: 'phase' },
    { text: '[lo1] api: starting', tone: 'phase' },
    { text: '[api] api listening on 4100', tone: 'output' },
    { text: '[lo1] api: started', tone: 'phase' },
    { text: '[lo1] web: starting', tone: 'phase' },
    { text: '[lo1] web: started', tone: 'phase' },
    { text: '[lo1] Ready', tone: 'phase' },
    { text: '', tone: 'plain' },
    { text: '  Workspace shop is ready in 3.8s', tone: 'success' },
    { text: '    infrastructure 2.4s · services 1.4s', tone: 'muted' },
    { text: '', tone: 'plain' },
    { text: '  Services:', tone: 'plain' },
    { text: '    api  https://api.shop.local', tone: 'url' },
    { text: '    web  https://web.shop.local', tone: 'url' },
    { text: '', tone: 'plain' },
    { text: '  Logs:  /Users/you/shop/.lo1/logs', tone: 'muted' },
    { text: '         Run lo1 logs [service] to tail, lo1 logs --list to see available', tone: 'muted' },
    { text: '', tone: 'plain' },
    { text: '  Press Ctrl+C to stop', tone: 'muted' },
] as const;

const toneClass: Record<(typeof terminal)[number]['tone'], string> = {
    command: 'text-white',
    phase: 'text-teal-300/80',
    output: 'text-amber-300/90',
    plain: 'text-slate-300',
    success: 'text-teal-300 font-semibold',
    url: 'text-slate-200',
    muted: 'text-slate-500',
};

export default function Showcase() {
    return (
        <section className="px-6 pb-24 sm:pb-32 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-6 text-left lg:grid-cols-2">
                <Panel title="lo1.yaml">
                    <pre className="overflow-x-auto p-5 font-mono text-[13px]/6 text-fd-foreground">
                        <code>{config}</code>
                    </pre>
                </Panel>
                <Panel title="Terminal" dark>
                    <pre className="overflow-x-auto p-5 font-mono text-[13px]/6">
                        <code>
                            {terminal.map((line, i) => (
                                <span key={i} className={`block ${toneClass[line.tone]}`}>
                                    {line.text || ' '}
                                </span>
                            ))}
                        </code>
                    </pre>
                </Panel>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-fd-muted-foreground">
                Postgres comes up and passes its health check, the migration runs, seed data loads,
                and only then does the API start. Once it answers on /health, the frontend follows.
                Every <code>lo1 up</code> starts from a working system with data in it, and{' '}
                <code>lo1 restart seed</code> puts the data back whenever you need it.
            </p>
        </section>
    );
}

function Panel({ title, dark, children }: { title: string; dark?: boolean; children: React.ReactNode }) {
    return (
        <div
            className={`min-w-0 overflow-hidden rounded-xl border shadow-lg ${dark ? 'border-slate-800' : 'bg-fd-card'}`}
            style={dark ? { backgroundColor: 'var(--terminal-bg)' } : undefined}
        >
            <div className={`flex items-center gap-2 border-b px-4 py-2.5 ${dark ? 'border-slate-800' : ''}`}>
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
                <span className={`ml-2 font-mono text-xs ${dark ? 'text-slate-400' : 'text-fd-muted-foreground'}`}>
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}
