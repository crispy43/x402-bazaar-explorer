import type { LoaderFunctionArgs } from 'react-router';

import { localize } from '~/.server/lib/localization';
import { validateSearchParams } from '~/.server/lib/utils';
import type { HomeJson } from '~/.server/locales/types';
import { type DiscoverBazaar, discoverBazaarSchema } from '~/.server/schemas/bazaar';
import { discoverBazaar } from '~/.server/services/bazaar.service';

const DEFAULT_LIMIT = 400;

export const homeLoader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<HomeJson>(request, 'home');
  const { type, offset } = validateSearchParams<DiscoverBazaar>(
    request,
    discoverBazaarSchema,
  );
  const resources = discoverBazaar({
    type,
    limit: DEFAULT_LIMIT,
    offset,
  });
  return { t, resources };
};

export const discoverResources = async ({ request }: LoaderFunctionArgs) => {
  const { type, offset } = validateSearchParams<DiscoverBazaar>(
    request,
    discoverBazaarSchema,
  );
  const resources = await discoverBazaar({
    type,
    limit: DEFAULT_LIMIT,
    offset,
  });
  return resources;
};
