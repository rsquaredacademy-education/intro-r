// scripts/perf-audit.mjs
// Mobile Lighthouse audit against the roadmap §7.3 budget.
//
// Interactive webR pages ship a ~12 MB WebAssembly R runtime that initialises
// eagerly from an in-header script (see roadmap §7.3 finding), so they cannot
// meet a static-page budget. Page class therefore drives the thresholds: pass
// --class static (default) or --class webr. Mixing classes in one invocation
// applies `static` to all; run two invocations instead.
//
//   static : Perf >= 70 | LCP <= 4000ms | TBT <= 250ms | CLS <= 0.10 | WASM 0 B
//   webr   : Perf >= 25 | LCP <= 6500ms | TBT <= 6500ms | CLS <= 0.15 | WASM <= 14 MB
//
// Usage (against a local preview server, which is what CI should use):
//   npx serve docs -l 4321 &
//   node scripts/perf-audit.mjs --base http://localhost:4321 \
//        --page factors-in-r.html --page vectors-in-r.html --class webr
//
// Exit code 1 if any budget is exceeded. INP is unmeasurable without
// interaction, so TBT is reported as its stand-in.

const BUDGETS = {
  static: {
    performance: 70,
    lcp: 4000,
    inp: 200,
    tbt: 250,
    cls: 0.1,
    initialWasmBytes: 0,
    totalBytes: 800 * 1024
  },
  webr: {
    performance: 25,
    lcp: 6500,
    inp: 200,
    tbt: 6500,
    cls: 0.15,
    initialWasmBytes: 14 * 1024 * 1024,
    totalBytes: 15 * 1024 * 1024
  }
};

const args = process.argv.slice(2);
const get = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
};

const base = get('--base', 'http://localhost:4321').replace(/\/$/, '');
const PAGE_CLASS = get('--class', 'static');
const BUDGET = BUDGETS[PAGE_CLASS];
if (!BUDGET) {
  console.error('unknown --class; use static or webr');
  process.exit(2);
}
const pages = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--page') pages.push(args[i + 1]);
}
if (pages.length === 0) {
  console.error('no --page given');
  process.exit(2);
}

const { execFileSync } = await import('node:child_process');
const fs = await import('node:fs');
const os = await import('node:os');
const path = await import('node:path');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lh-'));
let failed = false;

for (const page of pages) {
  const url = `${base}/${page}`;
  const out = path.join(tmp, page.replace(/\W+/g, '_') + '.json');

  // On Windows the npm launcher is npx.cmd, so spawn through the shell.
  execFileSync(
    'npx',
    ['--yes', 'lighthouse', url,
     '--output=json', `--output-path=${out}`,
     '--chrome-flags=--headless=new --no-sandbox',
     '--quiet'],
    { stdio: ['ignore', 'ignore', 'inherit'], shell: true }
  );

  const lh = JSON.parse(fs.readFileSync(out, 'utf8'));
  const a = lh.audits;
  const perf = lh.categories.performance.score * 100;
  const lcp = a['largest-contentful-paint'].numericValue;
  const tbt = a['total-blocking-time'].numericValue;
  const cls = a['cumulative-layout-shift'].numericValue;
  const inp = a['interaction-to-next-paint']?.numericValue ?? null;

  console.log(`\n== ${page} (${PAGE_CLASS}) ==`);
  const check = (label, value, limit, unit, higherIsBetter) => {
    const ok = higherIsBetter ? value >= limit : value <= limit;
    if (!ok) failed = true;
    const shown = higherIsBetter || limit < 1 ? value.toFixed(2) : Math.round(value);
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(10)} ${String(shown).padStart(8)}${unit}` +
      `   budget ${higherIsBetter ? '>=' : '<='} ${limit}${unit}`
    );
  };

  check('Perf', perf, BUDGET.performance, '', true);
  check('LCP', lcp, BUDGET.lcp, 'ms');
  check('TBT', tbt, BUDGET.tbt, 'ms');
  check('CLS', cls, BUDGET.cls, '');
  if (inp != null) check('INP', inp, BUDGET.inp, 'ms');

  const reqs = a['network-requests'].details.items;
  const wasm = reqs.filter(r => /\.wasm(\?|$)/.test(r.url) || /webr|wasi/i.test(r.url));
  const wasmBytes = wasm.reduce((s, r) => s + (r.transferSize || 0), 0);
  const wasmOk = wasmBytes <= BUDGET.initialWasmBytes;
  if (!wasmOk) failed = true;
  console.log(
    `  ${wasmOk ? 'PASS' : 'FAIL'}  WASM      ${String(wasmBytes).padStart(8)}B` +
    `   budget <= ${BUDGET.initialWasmBytes}B initial, ${wasm.length} request(s)`
  );
  for (const r of wasm.filter(r => r.transferSize > 50_000)) {
    console.log(`          ${Math.round(r.transferSize / 1024)}KB  ${r.url}`);
  }

  const total = reqs.reduce((s, r) => s + (r.transferSize || 0), 0);
  const totalOk = total <= BUDGET.totalBytes;
  if (!totalOk) failed = true;
  console.log(
    `  ${totalOk ? 'PASS' : 'FAIL'}  Weight    ${String(Math.round(total / 1024)).padStart(8)}KB` +
    `   budget <= ${Math.round(BUDGET.totalBytes / 1024)}KB, ${reqs.length} requests`
  );

  if (lh.runWarnings?.length) {
    for (const w of lh.runWarnings) console.log(`  WARN  ${w}`);
  }
}

fs.rmSync(tmp, { recursive: true, force: true });
process.exit(failed ? 1 : 0);