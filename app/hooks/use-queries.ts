import { useMemo } from 'react';
import { type URLSearchParamsInit, useSearchParams } from 'react-router';

export default function useQueries<T>(defaultInit?: URLSearchParamsInit) {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);
  const params = useMemo<T>(() => {
    const result: Record<string, string | string[]> = {};
    const keys = Array.from(searchParams.keys());
    const uniqueKeys = [...new Set(keys)];
    for (const key of uniqueKeys) {
      const values = searchParams.getAll(key);
      result[key] = values.length === 1 ? values[0] : values;
    }
    return result as T;
  }, [searchParams]);
  return [params, setSearchParams] as const;
}
