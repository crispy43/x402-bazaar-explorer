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
      <div className="relative flex min-h-[calc(100dvh-var(--header-m-h))] w-full t:min-h-[calc(100vh-var(--header-t-h))] d:min-h-[calc(100vh-var(--header-d-h))]">
        <main className="max-w-dvw grow pb-20 d:pb-0">
          <Outlet />
        </main>
      </div>
    </>
  );
}
