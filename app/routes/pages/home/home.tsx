import { useEffect, useRef, useState } from 'react';
import { type LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router';

import { homeLoader } from '~/.server/controllers/discover.controller';
import { control } from '~/.server/lib/utils';
import type { FixedDiscoveryResource } from '~/common/bazaar';

import ResourceItem from './components/resource-item';

export const loader = async (args: LoaderFunctionArgs) => {
  return control(homeLoader, args);
};

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const { t } = loaderData;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Home() {
  const { t, resources: initialResources } = useLoaderData<typeof loader>();
  const [resources, setResources] = useState<FixedDiscoveryResource[]>([]);
  const [offset, setOffset] = useState<number | null>(null);
  const initializedResources = useRef(false);
  useEffect(() => {
    initialResources
      .then((data) => {
        if (!initializedResources.current) {
          setResources(data.items.filter((item) => item.accepts?.length > 0));
          const nextOffset =
            data.items.length + data.pagination.offset < data.pagination.total
              ? data.items.length + data.pagination.offset
              : null;
          setOffset(nextOffset);
          initializedResources.current = true;
        }
      })
      .catch((error) => console.error(error));
  }, [initialResources]);

  useEffect(() => {
    console.log('resources', resources);
    console.log('offset', offset);
  }, [resources, offset]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-26 pb-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.welcome}</h1>
      <div className="grid grid-cols-4 gap-x-3 gap-y-4">
        {resources.map((resource, i) => (
          <ResourceItem key={i} item={resource} />
        ))}
      </div>
    </div>
  );
}
