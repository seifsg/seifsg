// One place to edit everything. Then run: node scripts/build.mjs
export const theme = {
  bg: ['#05071a', '#0b1035'], brand: '#1e22aa', accent: '#4f6bff', cyan: '#38bdf8',
  text: '#e6edf3', muted: '#8b949e', green: '#3fb950', panel: '#0d1117', edge: 'rgba(255,255,255,.09)',
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace",
};

export const banner = {
  name: 'Seif Sgayer',
  pill: 'open for new builds',
  lines: ['10yrs+ software engineer.', 'Building cool stuff with AI.'],
  meta: 'Founder @ HorizonLux  ·  Tunisia, working worldwide',
  host: 'seif@horizonlux: ~',
  intro: ['whoami', 'seif, software engineer ( 10yrs+ )'],
  cmds: [
    ['ai-factory build --mvp', 'PoC to launch, End to End'],
    ['automate --boring-stuff', 'manual work, solved'],
    ['hire --ai-native-engineers', '10hrs, 20hrs or full time'],
    ['ship --prod', 'live as we speak'],
  ],
};

export const stack = [
  ['AI', [['Claude Code', '#d97757'], ['Claude Skills', '#d97757'], ['AI Agents', '#a78bfa'], ['n8n', '#ea4b71'], ['Python', '#ffd43b'], ['OpenAI', '#10a37f']]],
  ['Build', [['TypeScript', '#3178c6'], ['Node.js', '#5fa04e'], ['NestJS', '#e0234e'], ['React', '#61dafb'],
    ['Next.js', '#ffffff'], ['React Native', '#61dafb'], ['C# .NET', '#9b4f96']]],
  ['Ship', [['PostgreSQL', '#4169e1'], ['Supabase', '#3fcf8e'], ['Stripe', '#635bff'], ['MongoDB', '#47a248'],
    ['Redis', '#ff4438'], ['Docker', '#2496ed'], ['AWS', '#ff9900']]],
];

export const buttons = {
  talk: { label: "Let's talk ↗", primary: true },
  linkedin: { label: 'LinkedIn ↗' },
  upwork: { label: 'Upwork ↗' },
  fiverr: { label: 'Fiverr ↗' },
  youtube: { label: 'YouTube ↗' },
  x: { label: 'X ↗' },
};

export const stats = [
  { value: '10yrs+', label: 'proven experience' },
  { value: '70+', label: 'jobs · Top Rated Plus', sub: 'on Upwork' },
  { value: '5.0 ★', label: '70+ reviews', sub: 'on Fiverr' },
  { value: '4+', label: 'countries shipped to', sub: 'DE · US · UK · UAE' },
];

export const work = [
  { tag: 'Insurance · DE', color: '#38bdf8', title: 'Claims platform', lines: ['Handles their entire workflow.', 'AI reads every claim document.'] },
  { tag: 'Aviation · US', color: '#a78bfa', title: 'Flight school portal', lines: ['Stripe subscriptions + billing.', '129 endpoints, in production.'] },
  { tag: 'Wholesale · UK', color: '#3fcf8e', title: 'B2B purchasing platform', lines: ['Portal, payments, orders.', 'Their ordering runs through it.'] },
  { tag: 'Automotive', color: '#f59e0b', title: 'Car damage inspection', lines: ['Mobile capture, cloud sync.', 'Admin dashboard for experts.'] },
  { tag: 'Health · UAE', color: '#f472b6', title: 'Doctor booking platform', lines: ['Patients book online.', 'Live now.'] },
  { tag: 'Next up', color: '#4f6bff', title: 'Your project?', lines: ['Tell me what eats your time.', 'Let me know what you think!'], cta: true },
];
