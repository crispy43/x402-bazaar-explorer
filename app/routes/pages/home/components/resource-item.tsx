/* eslint-disable import/no-named-as-default */
import Big from 'big.js';
import { useLoaderData } from 'react-router';

import type { FixedDiscoveryResource } from '~/common/bazaar';
import { Badge } from '~/components/ui/badge';
import { useLanguage } from '~/hooks/use-language';
import { useTranslate } from '~/hooks/use-translate';
import { cn, toComma } from '~/lib/utils';

import type { loader } from '../home';

interface Props {
  item: FixedDiscoveryResource;
  className?: string;
}

export default function ResourceItem({ item, className }: Props) {
  const { t } = useLoaderData<typeof loader>();
  const mainAccept = item.accepts[0];
  const [language] = useLanguage();
  const [translatedDesc] = useTranslate(
    mainAccept.description,
    language !== 'en' && language,
  );

  return (
    <div
      className={cn(
        'flex h-47.5 flex-col gap-3 rounded border bg-accent/40 p-4 hover:bg-accent/80',
        className,
      )}
    >
      {mainAccept.description ? (
        <h3 className="line-clamp-3 text-foreground/90">
          {translatedDesc ? translatedDesc : mainAccept.description}
        </h3>
      ) : (
        <p className="text-muted-foreground/70 italic">{t.noDescription}</p>
      )}
      <div className="flex grow gap-1.5">
        <Badge variant="outline" className="text-foreground/70">
          V{item.x402Version}
        </Badge>
        <Badge variant="outline" className="text-foreground/70">
          {mainAccept.network}
        </Badge>
        <Badge variant="outline" className="text-foreground/70">
          {item.type.toUpperCase()}
        </Badge>
      </div>
      <div className="mt-4 flex w-full items-baseline justify-between">
        <p className="text-sm font-medium tracking-tight text-muted-foreground/80">
          {mainAccept.extra?.name}
        </p>
        {mainAccept.maxAmountRequired && (
          <p className="font-medium tabular-nums">
            {toComma(Big(mainAccept.maxAmountRequired).div(1e6).toNumber(), 6)}
          </p>
        )}
      </div>
    </div>
  );
}
