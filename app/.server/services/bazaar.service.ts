import { HTTPFacilitatorClient } from '@x402/core/http';
import { type DiscoveryResourcesResponse, withBazaar } from '@x402/extensions/bazaar';

import { CDP_BASE_URL } from '~/common/constants';

const facilitatorClient = withBazaar(
  new HTTPFacilitatorClient({ url: `${CDP_BASE_URL}/platform/v2/x402` }),
);

type ExtendedDiscoveryResourcesResponse = DiscoveryResourcesResponse & { ts: number };

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
  const discovery = await facilitatorClient.extensions.discovery.listResources({
    type,
    limit,
    offset,
  });
  cacheMap.set(cacheKey, { ...discovery, ts: Date.now() });
  return discovery;
};
