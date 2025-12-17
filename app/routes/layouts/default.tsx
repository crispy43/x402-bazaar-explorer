import { type LoaderFunctionArgs, Outlet } from 'react-router';

import { localize } from '~/.server/lib/localization';
import type { CommonJson } from '~/.server/locales/types';

import Header from './components/header/header';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<CommonJson>(request);
  return { t };
};

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <div className="'relative t:min-h-[calc(100vh-var(--header-t-h))] d:min-h-[calc(100vh-var(--header-d-h))] flex min-h-[calc(100dvh-var(--header-m-h))] w-full">
        <main className="d:pb-0 max-w-dvw grow pb-20">
          <Outlet />
        </main>
      </div>
    </>
  );
}
