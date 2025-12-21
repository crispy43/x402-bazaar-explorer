import { HTTPFacilitatorClient } from '@x402/core/http';
import { withBazaar } from '@x402/extensions/bazaar';

import type { FixedDiscoveryResourcesResponse } from '~/common/bazaar';
import { CDP_FACILITATOR } from '~/common/constants';

import { env } from '../lib/utils';

const facilitatorClient = withBazaar(
  new HTTPFacilitatorClient({ url: env('FACILITATOR_URL', CDP_FACILITATOR) }),
);

export type ExtendedDiscoveryResourcesResponse = FixedDiscoveryResourcesResponse & {
  ts: number;
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheMap = new Map<string, ExtendedDiscoveryResourcesResponse>();

interface DiscoverBazaarArgs {
  type?: string;
  limit?: number;
  offset?: number;
}

export const discoverBazaar = async ({
  type,
  limit = 100,
  offset = 0,
}: DiscoverBazaarArgs = {}) => {
  const cacheKey = `${type ?? 'all'}:${limit}:${offset}`;
  if (cacheMap.has(cacheKey)) {
    const cached: ExtendedDiscoveryResourcesResponse = cacheMap.get(cacheKey);
    if (Date.now() - cached.ts < CACHE_TTL) {
      return cached;
    }
  }
  const discovery = (await facilitatorClient.extensions.discovery.listResources({
    type,
    limit,
    offset,
  })) as unknown as FixedDiscoveryResourcesResponse;
  const data = { ...discovery, ts: Date.now() };
  cacheMap.set(cacheKey, data);
  return data;
};
