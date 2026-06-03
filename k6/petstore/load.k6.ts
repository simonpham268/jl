import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { PetstoreClient } from '../lib/petstore.client';
import { isStatus, isArray, isObject } from '../lib/checks';
import { makeSummary } from '../lib/summary';

const errorRate         = new Rate('errors');
const findPetsDuration  = new Trend('find_pets_duration_ms', true);
const inventoryDuration = new Trend('inventory_duration_ms', true);

export const options = {
  scenarios: {
    find_pets: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 5 },
        { duration: '90s', target: 5 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      exec: 'findPets',
    },
    get_inventory: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 1 },
        { duration: '90s', target: 2 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '10s',
      exec: 'getInventory',
    },
  },
  thresholds: {
    http_req_failed:                        ['rate<0.05'],
    errors:                                 ['rate<0.05'],
    'http_req_duration{name:findByStatus}': ['p(95)<1500', 'p(99)<3000'],
    'http_req_duration{name:getInventory}': ['p(95)<1000', 'p(99)<2000'],
    find_pets_duration_ms:                  ['p(95)<1500'],
    inventory_duration_ms:                  ['p(95)<1000'],
  },
};

export function findPets(): void {
  const res = PetstoreClient.findByStatus();

  const ok = check(res, {
    'findByStatus — status 200':    isStatus(200),
    'findByStatus — body is array': isArray,
  });

  errorRate.add(!ok);
  findPetsDuration.add(res.timings.duration);
  sleep(0.5);
}

export function getInventory(): void {
  const res = PetstoreClient.getInventory();

  const ok = check(res, {
    'getInventory — status 200':     isStatus(200),
    'getInventory — body is object': isObject,
  });

  errorRate.add(!ok);
  inventoryDuration.add(res.timings.duration);
  sleep(1);
}

export const handleSummary = (data: unknown) => makeSummary('load', data);
