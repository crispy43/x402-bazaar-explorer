/* eslint-disable import/no-named-as-default */
import Big from 'big.js';
import { Check, Copy } from 'lucide-react';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router';

import type { FixedDiscoveryResource } from '~/common/bazaar';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import useClipboard from '~/hooks/use-clipboard';
import { useLanguage } from '~/hooks/use-language';
import { useTranslate } from '~/hooks/use-translate';
import { toComma } from '~/lib/utils';

import type { loader } from '../home';

interface Props {
  accept: FixedDiscoveryResource['accepts'][number];
}

export default function ResourceAccept({ accept }: Props) {
  const { t } = useLoaderData<typeof loader>();
  const [language] = useLanguage();
  const [translatedDesc] = useTranslate(
    accept.description,
    language !== 'en' && language,
  );
  const acceptUrl = useMemo(() => {
    if (accept.outputSchema?.input?.pathParams) {
      let url = accept.resource;
      for (const key of Object.keys(accept.outputSchema.input.pathParams)) {
        url += `/:${key}`;
      }
      return url;
    }
    return accept.resource;
  }, [accept]);
  const { isCopied, copy } = useClipboard(2000);

  return (
    <Card className="mx-px">
      <CardHeader>
        <CardTitle className="flex gap-2">
          {accept.outputSchema?.input?.method && (
            <Badge className="mt-0.5">
              {accept.outputSchema?.input?.method?.toUpperCase()}
            </Badge>
          )}
          <span>{acceptUrl}</span>
        </CardTitle>
        {accept.description && (
          <CardDescription className="mt-1 text-base">{translatedDesc}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="mt-2 space-y-8">
        <div className="grid grid-cols-1 gap-x-1 gap-y-3 t:grid-cols-4">
          <div>
            <p className="text-sm font-medium tracking-tight text-muted-foreground/70">
              {accept.extra?.name}
            </p>
            {(accept.extra?.name === 'USD Coin' || accept.extra?.name === 'USDC') &&
              accept.maxAmountRequired && (
                <p className="text-lg font-medium tabular-nums">
                  {toComma(Big(accept.maxAmountRequired).div(1e6).toNumber(), 6)}
                </p>
              )}
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight text-muted-foreground/70">
              {t.network}
            </p>
            <p className="text-lg font-medium">{accept.network}</p>
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight text-muted-foreground/70">
              {t.payTo}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-lg font-medium">{accept.payTo.substring(0, 10)}</p>
              <Button variant="ghost" size="icon-xs" onClick={() => copy(accept.payTo)}>
                {isCopied ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight text-muted-foreground/70">
              {t.mimeType}
            </p>
            <p className="text-lg font-medium">{accept.mimeType}</p>
          </div>
        </div>
        {/* Input */}
        {accept.outputSchema?.input &&
          (accept.outputSchema.input.pathParams ||
            accept.outputSchema.input.queryParams ||
            accept.outputSchema.input.body ||
            accept.outputSchema.input.bodyFields) && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Input</h3>
              {accept.outputSchema.input.pathParams && (
                <div>
                  <h4 className="font-medium">Path Parameters</h4>
                  <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-sm">
                    {JSON.stringify(accept.outputSchema?.input?.pathParams, null, 2)}
                  </pre>
                </div>
              )}
              {accept.outputSchema?.input?.queryParams && (
                <div>
                  <h4 className="font-medium">Query Parameters</h4>
                  <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-sm">
                    {JSON.stringify(accept.outputSchema?.input?.queryParams, null, 2)}
                  </pre>
                </div>
              )}
              {accept.outputSchema?.input?.body ??
                (accept.outputSchema?.input?.bodyFields && (
                  <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-sm">
                    {JSON.stringify(
                      accept.outputSchema?.input?.body ??
                        accept.outputSchema?.input?.bodyFields,
                      null,
                      2,
                    )}
                  </pre>
                ))}
            </div>
          )}
        {/* Output */}
        {accept.outputSchema?.output && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Output</h3>
            <pre className="mt-1 overflow-x-auto rounded bg-muted p-2 text-sm">
              {JSON.stringify(accept.outputSchema?.output, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
