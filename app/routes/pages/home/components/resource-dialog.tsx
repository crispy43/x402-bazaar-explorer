import { useLoaderData } from 'react-router';

import type { FixedDiscoveryResource } from '~/common/bazaar';
import { Badge } from '~/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { useLanguage } from '~/hooks/use-language';
import { replaceT } from '~/lib/utils';

import type { loader } from '../home';
import ResourceAccept from './resource-accept';

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  resource?: FixedDiscoveryResource;
}

export default function ResourceDialog({ open, onOpenChange, resource }: Props) {
  const { t } = useLoaderData<typeof loader>();
  const [language] = useLanguage();

  if (!resource) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-3rem)] overflow-auto px-4 t:max-h-[calc(100vh-8rem)] t:min-w-[calc(100dvw-2rem)] t:px-6 d:min-w-5xl">
        <DialogHeader>
          <DialogTitle className="break-all">{resource.resource}</DialogTitle>
          <DialogDescription>
            {replaceT(t.lastUpdated, {
              date: new Date(resource.lastUpdated).toLocaleString(language),
            })}
          </DialogDescription>
          <div className="flex justify-center gap-2 t:justify-start">
            <Badge variant="outline" className="text-foreground/70">
              V{resource.x402Version}
            </Badge>
            <Badge variant="outline" className="text-foreground/70">
              {resource.type.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="max-w-full overflow-auto">
          <div className="my-4 space-y-6">
            {resource.accepts.map((accept, i) => (
              <ResourceAccept key={i} accept={accept} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
