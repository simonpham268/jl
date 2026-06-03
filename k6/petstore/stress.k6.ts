import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { PetstoreClient } from '../lib/petstore.client';
import { isStatus } from '../lib/checks';
import { makeSummary } from '../lib/summary';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 2  },  // warm-up
    { duration: '60s', target: 5  },  // normal load
    { duration: '60s', target: 10 },  // high load
    { duration: '60s', target: 15 },  // peak
    { duration: '60s', target: 20 },  // beyond peak — expect degradation
    { duration: '30s', target: 3  },  // cool-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed:   ['rate<0.20'],
    errors:            ['rate<0.20'],
  },
};

export default function (): void {
  const res = PetstoreClient.findByStatus('available', 'findByStatus-stress');

  const ok = check(res, {
    'status 200':       isStatus(200),
    'not server error': (r) => r.status < 500,
  });

  errorRate.add(!ok);
  sleep(0.1);
}

interface MetricValues { values: Record<string, number> }
interface SummaryData  { metrics?: Record<string, MetricValues> }

export function handleSummary(data: SummaryData): Record<string, string> {
  const m    = data.metrics ?? {};
  const p95  = m['http_req_duration']?.values?.['p(95)'];
  const p99  = m['http_req_duration']?.values?.['p(99)'];
  const rps  = m['http_reqs']?.values?.['rate'];
  const errR = m['http_req_failed']?.values?.['rate'];

  const pad = (s: string) => s.padEnd(18);
  const lines = [
    '╔══════════════════════════════════════╗',
    '║   STRESS TEST — DEGRADATION REPORT   ║',
    '╠══════════════════════════════════════╣',
    ...(p95  !== undefined ? [`║  p(95) latency : ${pad(`${p95.toFixed(0)} ms`)} ║`]      : []),
    ...(p99  !== undefined ? [`║  p(99) latency : ${pad(`${p99.toFixed(0)} ms`)} ║`]      : []),
    ...(rps  !== undefined ? [`║  Throughput    : ${pad(`${rps.toFixed(2)} req/s`)} ║`]   : []),
    ...(errR !== undefined ? [`║  Error rate    : ${pad(`${(errR * 100).toFixed(2)} %`)} ║`] : []),
    '╚══════════════════════════════════════╝',
  ];

  return makeSummary('stress', data, `\n${lines.join('\n')}\n`);
}
