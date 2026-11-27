/**
 * The same small system drawn three times, showing which parts are real and which are
 * stand-ins at each scope of testing. It avoids naming test types on purpose: people
 * disagree on what "unit", "API" and "integration" cover, but not on what's real.
 *
 * Panels are numbered in order, so the post can refer to them as panel 1, 2 and 3.
 * Edit the wording in PANELS. The positions live in WIDE and NARROW: the narrow one is a
 * 2×3 grid for phones, where the wide one would shrink the labels too far to read.
 */

type NodeId = 'web' | 'orders' | 'payments' | 'db' | 'queue' | 'storage';

/**
 * real: runs as it would in production. focus: the component under test, or being changed.
 * stub: a stand-in. off: not part of this scope.
 */
type NodeState = { kind: 'real' | 'focus' | 'stub' | 'off'; note?: string };

type Panel = {
    title: string;
    summary: string;
    highlight?: boolean;
    nodes: Record<NodeId, NodeState>;
};

const PANELS: Panel[] = [
    {
        title: 'One component, isolated',
        summary:
            'The most tests, run in seconds. The component under test talks to stand-ins, such as a stub over the network or fixed inputs and outputs, and to local infrastructure like a database.',
        nodes: {
            web: { kind: 'off' },
            orders: { kind: 'focus', note: 'Under test' },
            payments: { kind: 'stub', note: 'Stub over HTTP' },
            db: { kind: 'real', note: 'Local container' },
            queue: { kind: 'stub', note: 'Fake' },
            storage: { kind: 'off' },
        },
    },
    {
        title: 'The whole system, on your machine',
        summary:
            'Seconds to minutes after each change. Every component, database and queue running together, with stand-ins only for what can’t run locally.',
        highlight: true,
        nodes: {
            web: { kind: 'real', note: 'From source' },
            orders: { kind: 'real', note: 'From an image' },
            payments: { kind: 'focus', note: 'Changing, from source' },
            db: { kind: 'real', note: 'Container' },
            queue: { kind: 'real', note: 'Container' },
            storage: { kind: 'stub', note: 'AWS emulator' },
        },
    },
    {
        title: 'End to end, in a cloud environment',
        summary: 'Fewer tests, slower to run, and only after a deploy to QA or staging.',
        nodes: {
            web: { kind: 'real', note: 'Deployed' },
            orders: { kind: 'real', note: 'Deployed' },
            payments: { kind: 'real', note: 'Deployed' },
            db: { kind: 'real', note: 'Managed' },
            queue: { kind: 'real', note: 'Managed' },
            storage: { kind: 'real', note: 'S3 bucket' },
        },
    },
];

const LABELS: Record<NodeId, string> = {
    web: 'Web app',
    orders: 'Orders service',
    payments: 'Payments service',
    db: 'Postgres',
    queue: 'Queue',
    storage: 'Object storage',
};

const NODE_HEIGHT = 48;

type Box = { x: number; y: number; width: number };

/** Edge ends are placed by hand on the borders of the boxes they join; move them with the boxes. */
type Edge = { from: NodeId; to: NodeId; points: [number, number, number, number] };

type Layout = { width: number; height: number; boxes: Record<NodeId, Box>; edges: Edge[] };

const WIDE: Layout = {
    width: 640,
    height: 200,
    boxes: {
        web: { x: 20, y: 20, width: 140 },
        orders: { x: 250, y: 20, width: 140 },
        payments: { x: 480, y: 20, width: 140 },
        storage: { x: 20, y: 132, width: 140 },
        db: { x: 185, y: 132, width: 125 },
        queue: { x: 330, y: 132, width: 125 },
    },
    edges: [
        { from: 'web', to: 'orders', points: [160, 44, 250, 44] },
        { from: 'orders', to: 'payments', points: [390, 44, 480, 44] },
        { from: 'web', to: 'storage', points: [90, 68, 90, 132] },
        { from: 'orders', to: 'db', points: [300, 68, 248, 132] },
        { from: 'orders', to: 'queue', points: [340, 68, 392, 132] },
        { from: 'queue', to: 'payments', points: [455, 156, 550, 68] },
    ],
};

const NARROW: Layout = {
    width: 330,
    height: 228,
    boxes: {
        web: { x: 10, y: 10, width: 140 },
        storage: { x: 180, y: 10, width: 140 },
        orders: { x: 10, y: 90, width: 140 },
        payments: { x: 180, y: 90, width: 140 },
        db: { x: 10, y: 170, width: 140 },
        queue: { x: 180, y: 170, width: 140 },
    },
    edges: [
        { from: 'web', to: 'storage', points: [150, 34, 180, 34] },
        { from: 'web', to: 'orders', points: [80, 58, 80, 90] },
        { from: 'orders', to: 'payments', points: [150, 114, 180, 114] },
        { from: 'orders', to: 'db', points: [80, 138, 80, 170] },
        { from: 'orders', to: 'queue', points: [140, 138, 200, 170] },
        { from: 'queue', to: 'payments', points: [250, 170, 250, 138] },
    ],
};

const BOX_CLASS: Record<NodeState['kind'], string> = {
    real: 'fill-fd-card stroke-fd-foreground/60',
    focus: 'fill-fd-primary/15 stroke-fd-primary',
    stub: 'fill-transparent stroke-fd-muted-foreground',
    off: 'fill-transparent stroke-fd-muted-foreground/40',
};

const OFF_OPACITY = 0.7;
const DASH = '5 4';

function DiagramNode({ id, box, state }: { id: NodeId; box: Box; state: NodeState }) {
    const { x, y, width } = box;
    const isOff = state.kind === 'off';
    const centre = x + width / 2;
    return (
        <g opacity={isOff ? OFF_OPACITY : 1}>
            <rect
                x={x}
                y={y}
                width={width}
                height={NODE_HEIGHT}
                rx={8}
                strokeWidth={state.kind === 'focus' ? 2 : 1.25}
                strokeDasharray={state.kind === 'stub' ? DASH : undefined}
                className={BOX_CLASS[state.kind]}
            />
            <text
                x={centre}
                y={state.note ? y + 20 : y + 29}
                textAnchor="middle"
                fontSize={13}
                fontWeight={500}
                className={isOff || state.kind === 'stub' ? 'fill-fd-muted-foreground' : 'fill-fd-foreground'}
            >
                {LABELS[id]}
            </text>
            {state.note && (
                <text
                    x={centre}
                    y={y + 37}
                    textAnchor="middle"
                    fontSize={11}
                    className={state.kind === 'focus' ? 'fill-fd-foreground' : 'fill-fd-muted-foreground'}
                >
                    {state.note}
                </text>
            )}
        </g>
    );
}

/** Faint when an end is out of scope, or when both ends are stand-ins that never meet. */
function isFaintEdge(from: NodeState['kind'], to: NodeState['kind']): boolean {
    return from === 'off' || to === 'off' || (from === 'stub' && to === 'stub');
}

function DiagramSvg({ panel, layout, className }: { panel: Panel; layout: Layout; className: string }) {
    const kindOf = (id: NodeId) => panel.nodes[id].kind;
    return (
        <svg viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true" className={className}>
            {layout.edges.map(({ from, to, points: [x1, y1, x2, y2] }) => (
                <line
                    key={`${from}-${to}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    strokeWidth={1.25}
                    strokeDasharray={kindOf(from) === 'stub' || kindOf(to) === 'stub' ? DASH : undefined}
                    opacity={isFaintEdge(kindOf(from), kindOf(to)) ? 0.3 : 1}
                    className="stroke-fd-muted-foreground"
                />
            ))}
            {(Object.keys(LABELS) as NodeId[]).map((id) => (
                <DiagramNode key={id} id={id} box={layout.boxes[id]} state={panel.nodes[id]} />
            ))}
        </svg>
    );
}

function describe(panel: Panel): string {
    const groups: Record<NodeState['kind'], string[]> = { real: [], focus: [], stub: [], off: [] };
    for (const [id, state] of Object.entries(panel.nodes) as [NodeId, NodeState][]) {
        const note = state.note ? ` (${state.note.toLowerCase()})` : '';
        groups[state.kind].push(`${LABELS[id]}${note}`);
    }
    const parts = [
        groups.focus.length > 0 && `In focus: ${groups.focus.join(', ')}.`,
        groups.real.length > 0 && `Real: ${groups.real.join(', ')}.`,
        groups.stub.length > 0 && `Stand-ins: ${groups.stub.join(', ')}.`,
        groups.off.length > 0 && `Not involved: ${groups.off.join(', ')}.`,
    ];
    return parts.filter(Boolean).join(' ');
}

function DiagramPanel({ panel, number }: { panel: Panel; number: number }) {
    return (
        <div
            className={`min-w-0 rounded-xl border p-4 ${panel.highlight ? 'border-fd-primary bg-fd-primary/5' : 'bg-fd-card/40'}`}
        >
            <p className="m-0 flex items-start gap-2 font-semibold text-fd-foreground">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-fd-foreground/40 text-xs">
                    {number}
                </span>
                <span>
                    <span className="sr-only">Panel {number}: </span>
                    {panel.title}
                </span>
            </p>
            <p className="mt-1 mb-3 text-sm text-fd-muted-foreground">{panel.summary}</p>
            <div role="img" aria-label={describe(panel)}>
                <DiagramSvg panel={panel} layout={WIDE} className="hidden h-auto w-full sm:block" />
                <DiagramSvg
                    panel={panel}
                    layout={NARROW}
                    className="mx-auto block h-auto w-full max-w-[400px] sm:hidden"
                />
            </div>
        </div>
    );
}

function LegendSwatch({ kind, label }: { kind: NodeState['kind']; label: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            <svg viewBox="0 0 22 14" className="h-3.5 w-[22px]" aria-hidden="true">
                <rect
                    x={1}
                    y={1}
                    width={20}
                    height={12}
                    rx={3}
                    strokeWidth={1.25}
                    strokeDasharray={kind === 'stub' ? '4 3' : undefined}
                    opacity={kind === 'off' ? OFF_OPACITY : 1}
                    className={BOX_CLASS[kind]}
                />
            </svg>
            {label}
        </span>
    );
}

export default function TestScopeDiagram() {
    return (
        <figure className="not-prose my-8 flex min-w-0 flex-col gap-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-fd-muted-foreground">
                <LegendSwatch kind="real" label="Real" />
                <LegendSwatch kind="focus" label="Under test or being changed" />
                <LegendSwatch kind="stub" label="Stand-in" />
                <LegendSwatch kind="off" label="Not involved" />
            </div>
            {PANELS.map((panel, index) => (
                <DiagramPanel key={panel.title} panel={panel} number={index + 1} />
            ))}
        </figure>
    );
}
