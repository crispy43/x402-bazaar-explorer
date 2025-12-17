import { useEffect } from 'react';
import { type LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router';

import { localize } from '~/.server/lib/localization';
import { validateSearchParams } from '~/.server/lib/utils';
import type { WelcomeJson } from '~/.server/locales/types';
import { type DiscoverBazaar, discoverBazaarSchema } from '~/.server/schemas/bazaar';
import { discoverBazaar } from '~/.server/services/bazaar.service';
import { Language, Theme } from '~/common/constants';
import LogoDark from '~/components/svg/logo-dark.svg?react';
import LogoLight from '~/components/svg/logo-light.svg?react';
import { Button } from '~/components/ui/button';
import { useLanguage } from '~/hooks/use-language';
import { useTheme } from '~/hooks/use-theme';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<WelcomeJson>(request, 'welcome');
  const { type, limit, offset } = validateSearchParams<DiscoverBazaar>(
    request,
    discoverBazaarSchema,
  );
  const resources = await discoverBazaar({ type, limit, offset });
  return { t, resources };
};

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  const { t } = loaderData;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Home() {
  const { t, resources } = useLoaderData<typeof loader>();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    console.log('Discovered Bazaar Resources:', resources);
  }, [resources]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      {theme === Theme.dark ? (
        <LogoDark className="mb-8 h-auto w-40" />
      ) : (
        <LogoLight className="mb-8 h-auto w-40" />
      )}
      <div className="flex w-full max-w-md flex-col rounded-2xl border p-10">
        <div>
          <h1 className="text-xl font-bold">{t.welcome}</h1>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <label className="text-lg">{t.word.theme}:</label>
              <p className="text-lg">{theme}</p>
            </div>
            <Button
              className="w-24"
              onClick={() => setTheme(theme === Theme.dark ? Theme.light : Theme.dark)}
            >
              {theme === Theme.dark ? Theme.light : Theme.dark}
            </Button>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <label className="text-lg">{t.word.language}:</label>
              <p className="text-lg">{language}</p>
            </div>
            <Button
              className="w-24"
              onClick={() =>
                setLanguage(language === Language.en ? Language.ko : Language.en)
              }
            >
              {language === Language.en ? Language.ko : Language.en}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
