import { useEffect, useRef, useState } from 'react';
import { type LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router';

import { localize } from '~/.server/lib/localization';
import { validateSearchParams } from '~/.server/lib/utils';
import type { HomeJson } from '~/.server/locales/types';
import { type DiscoverBazaar, discoverBazaarSchema } from '~/.server/schemas/bazaar';
import { discoverBazaar } from '~/.server/services/bazaar.service';
import type { FixedDiscoveryResource } from '~/common/bazaar';

const DEFAULT_LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<HomeJson>(request, 'home');
  const { type, offset } = validateSearchParams<DiscoverBazaar>(
    request,
    discoverBazaarSchema,
  );
  const resources = discoverBazaar({ type, limit: DEFAULT_LIMIT, offset });
  return { t, resources };
};

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const { t } = loaderData;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Home() {
  const { t, resources: initialResources } = useLoaderData<typeof loader>();
  const [resources, setResources] = useState<FixedDiscoveryResource[]>([]);
  const initializedResources = useRef(false);
  useEffect(() => {
    initialResources
      .then((data) => {
        if (!initializedResources.current) {
          setResources(data.items);
          initializedResources.current = true;
        }
      })
      .catch((error) => console.error(error));
  }, [initialResources]);

  useEffect(() => {
    console.log('Discovered Bazaar Resources:', resources);
  }, [resources]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-8">
      <h1 className="mb-4 text-2xl font-bold">{t.welcome}</h1>
      <div className="grid grid-cols-4 gap-x-3 gap-y-4">
        {resources.map((resource, i) => (
          <div key={i} className="mb-2 rounded border p-4">
            <p className="">{resource.resource}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
