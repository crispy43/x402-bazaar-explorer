import { useEffect, useRef, useState } from 'react';
import { type LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router';

import { homeLoader } from '~/.server/controllers/discover.controller';
import { control } from '~/.server/lib/utils';
import type { FixedDiscoveryResource } from '~/common/bazaar';
import useEasyFetcher from '~/hooks/use-easy-fetcher';
import useObserver from '~/hooks/use-observer';
import { formatQuery, replaceT, toComma } from '~/lib/utils';
import type { loader as discoverApiLoader } from '~/routes/apis/discover';

import ResourceItem from './components/resource-item';
import ResourceSkeleton from './components/resource-skeleton';

export const loader = async (args: LoaderFunctionArgs) => {
  return control(homeLoader, args);
};

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const { t } = loaderData;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Home() {
  const { t, resources: initialResources } = useLoaderData<typeof loader>();
  const [total, setTotal] = useState<number | null>(null);
  const [resources, setResources] = useState<FixedDiscoveryResource[] | null>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const initializedResources = useRef(false);
  useEffect(() => {
    initialResources
      .then((data) => {
        if (!initializedResources.current) {
          setResources(data.items.filter((item) => item.accepts?.length > 0));
          setTotal(data.pagination.total);
          const nextOffset =
            data.items.length + data.pagination.offset < data.pagination.total
              ? data.items.length + data.pagination.offset
              : null;
          setOffset(nextOffset);
          initializedResources.current = true;
        }
      })
      .catch((error) => {
        console.error(error);
        setResources([]);
        setTotal(0);
      });
  }, [initialResources]);

  // * 무한 스크롤
  const { fetcher, isLoading } = useEasyFetcher<typeof discoverApiLoader>((data) => {
    if (data.message) return console.error(data.message);
    if (!data.items?.length) return setOffset(null);
    setResources((prev) => [
      ...prev,
      ...data.items.filter((item) => item.accepts?.length > 0),
    ]);
    const nextOffset =
      data.items.length + data.pagination.offset < data.pagination.total
        ? data.items.length + data.pagination.offset
        : null;
    setOffset(nextOffset);
  });
  const { observerTarget } = useObserver(
    resources ?? [],
    () => {
      const query = formatQuery({
        offset,
      });
      fetcher.load(`/api/discover?${query}`);
    },
    {
      threshold: 1,
      rootMargin: '50px',
    },
  );

  useEffect(() => {
    console.info('resources', resources);
  }, [resources]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-26 pb-8">
      <div className="flex flex-col items-center gap-2 t:flex-row t:gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t.welcome}</h1>
        {total !== null && (
          <p className="text-foreground/80">
            {replaceT(t.totalCount, { count: toComma(total) })}
          </p>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-4 t:grid-cols-2 d:grid-cols-4">
        {resources === null && <ResourceSkeleton />}
        {resources?.map((resource, i) => (
          <ResourceItem key={i} item={resource} />
        ))}
        {!isLoading && offset !== null && <div ref={observerTarget} />}
      </div>
    </div>
  );
}
