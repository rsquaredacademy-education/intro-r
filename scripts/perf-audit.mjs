// scripts/perf-audit.mjs
// Mobile Lighthouse audit against the roadmap §7.3 budget.
//
// Interactive webR pages ship a ~12 MB WebAssembly R runtime that initialises
// eagerly from an in-header script (see roadmap §7.3 finding), so they cannot
// meet a static-page budget. Page class therefore drives the thresholds: pass
// --class static (default) or --class webr. Mixing classes in one invocation
// applies `static` to all; run two invocations instead.
//
//   static : Perf >= 70 | LCP <= 4500ms | TBT <= 250ms | CLS <= 0.10 | WASM 0 B
//   webr   : Perf >= 25 | LCP <= 6500ms | TBT <= 6500ms | CLS <= 0.15 | WASM <= 14 MB
//
// Usage (against a local preview server; CI does not run this -- see the note
// below on why there is deliberately no Lighthouse step in ci.yml):
//   npx serve docs -l 4321 &
//   node scripts/perf-audit.mjs --base http://localhost:4321 \
//        --page index.html --page factors-in-r.html --class static --runs 3
//
// Exit code 1 if any budget is exceeded. INP is unmeasurable without
// interaction, so TBT is reported as its stand-in.
//
// --runs N (default 1) repeats each page N times and gates on the MEDIAN.
// Single samples are not trustworthy: the same unchanged page measured Perf
// 53-74 and LCP 4112-6217ms across five runs on the same machine, and the first
// run of a session is consistently the worst because npx/Lighthouse/Chrome
// caches are cold. Use --runs 3 or more for any gating decision.
//
// BUDGET CALIBRATION. These thresholds are calibrated to a GitHub Actions
// runner (median of 3), not to a workstation, and the difference is not small:
// on identical compressed bytes the runner measured index.html LCP 4378ms where
// a loaded desktop measured 4703ms. Lighthouse warns "test CPU is slower than
// expected" on the desktop and never on the runner, so the runner is the
// cleaner environment and is the one these numbers come from. Local runs on a
// busy machine will therefore report FAIL; pass --lcp-budget 5000 (or higher)
// when investigating locally. Do not "fix" a local failure by editing the
// committed budget -- that is what --lcp-budget exists for.
//
// Note that 4500ms is deliberately looser than the 4000ms Core Web Vital
// "needs improvement" threshold. It reflects what a simulated-throttled
// mid-tier phone achieves against this site's render-blocking CSS, NOT a
// performance target. Real-user LCP is expected to be far better.
//
// NOT RUN IN CI. There is deliberately no Lighthouse step in .github/workflows/
// ci.yml. Simulated mobile scores proved too noisy on shared runners to gate
// on: identical bytes produced a 4588ms sample against a 4500ms budget, and the
// same page ranged 4112-6217ms locally across five runs. A gate that reddens on
// measurement noise trains people to ignore it, so this stays a tool you run
// deliberately. Revisit only if real-user data (RUM) replaces simulation.
//
// --lcp-budget N overrides the LCP threshold for one invocation, for either
// page class. Use it to compare environments, never to relax the committed
// gate.

const BUDGETS = {
  static: {
    performance: 70,
    lcp: 4500,
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
const RUNS = Number(get('--runs', '1'));
if (!Number.isInteger(RUNS) || RUNS < 1) {
  console.error('--runs must be a positive integer');
  process.exit(2);
}
// Optional per-invocation LCP override. See the calibration note in the header:
// the committed budget targets a GitHub runner, and local machines can be
// slower. Never edit the committed budget to silence a local run.
if (args.includes('--lcp-budget')) {
  const override = Number(get('--lcp-budget', ''));
  if (!Number.isInteger(override) || override < 1) {
    console.error('--lcp-budget must be a positive integer (milliseconds)');
    process.exit(2);
  }
  BUDGET.lcp = override;
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

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const ms = (x) => `${Math.round(x)}ms`;
const int = (x) => `${Math.round(x)}`;
const dec = (x) => x.toFixed(3);

for (const page of pages) {
  const url = `${base}/${page}`;
  const samples = [];
  const warnings = new Set();

  for (let run = 1; run <= RUNS; run++) {
    const out = path.join(tmp, page.replace(/\W+/g, '_') + `_${run}.json`);

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
    const reqs = a['network-requests'].details.items;
    const wasm = reqs.filter(r => /\.wasm(\?|$)/.test(r.url) || /webr|wasi/i.test(r.url));
    samples.push({
      perf: lh.categories.performance.score * 100,
      lcp: a['largest-contentful-paint'].numericValue,
      tbt: a['total-blocking-time'].numericValue,
      cls: a['cumulative-layout-shift'].numericValue,
      inp: a['interaction-to-next-paint']?.numericValue ?? null,
      wasmBytes: wasm.reduce((s, r) => s + (r.transferSize || 0), 0),
      bigWasm: wasm.filter(r => r.transferSize > 50_000)
        .map(r => `${Math.round(r.transferSize / 1024)}KB  ${r.url}`),
      wasmCount: wasm.length,
      totalBytes: reqs.reduce((s, r) => s + (r.transferSize || 0), 0),
      reqCount: reqs.length
    });
    for (const w of lh.runWarnings ?? []) warnings.add(w);
    if (RUNS > 1) process.stderr.write(`  (${page} run ${run}/${RUNS})\n`);
  }

  const med = (key) => median(samples.map(s => s[key]));
  const spread = (key, fmt) => {
    if (RUNS < 2) return '';
    const xs = samples.map(s => s[key]);
    return `   [${fmt(Math.min(...xs))}-${fmt(Math.max(...xs))}]`;
  };

  console.log(`\n== ${page} (${PAGE_CLASS}, median of ${RUNS}) ==`);
  const check = (label, value, limit, unit, higherIsBetter, spreadFmt) => {
    const ok = higherIsBetter ? value >= limit : value <= limit;
    if (!ok) failed = true;
    const shown = higherIsBetter || limit < 1 ? value.toFixed(2) : Math.round(value);
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(10)} ${String(shown).padStart(8)}${unit}` +
      `   budget ${higherIsBetter ? '>=' : '<='} ${limit}${unit}` + spread(label.toLowerCase(), spreadFmt)
    );
  };

  check('Perf', med('perf'), BUDGET.performance, '', true, int);
  check('LCP', med('lcp'), BUDGET.lcp, 'ms', false, ms);
  check('TBT', med('tbt'), BUDGET.tbt, 'ms', false, ms);
  check('CLS', med('cls'), BUDGET.cls, '', false, dec);
  const inps = samples.map(s => s.inp).filter(v => v != null);
  if (inps.length) check('INP', median(inps), BUDGET.inp, 'ms', false, ms);

  const wasmBytes = med('wasmBytes');
  const wasmOk = wasmBytes <= BUDGET.initialWasmBytes;
  if (!wasmOk) failed = true;
  console.log(
    `  ${wasmOk ? 'PASS' : 'FAIL'}  WASM      ${String(Math.round(wasmBytes)).padStart(8)}B` +
    `   budget <= ${BUDGET.initialWasmBytes}B initial, ${samples[0].wasmCount} request(s)`
  );
  for (const line of samples[0].bigWasm) console.log(`          ${line}`);

  const total = med('totalBytes');
  const totalOk = total <= BUDGET.totalBytes;
  if (!totalOk) failed = true;
  console.log(
    `  ${totalOk ? 'PASS' : 'FAIL'}  Weight    ${String(Math.round(total / 1024)).padStart(8)}KB` +
    `   budget <= ${Math.round(BUDGET.totalBytes / 1024)}KB, ${samples[0].reqCount} requests`
  );

  for (const w of warnings) console.log(`  WARN  ${w}`);
}

fs.rmSync(tmp, { recursive: true, force: true });
process.exit(failed ? 1 : 0);