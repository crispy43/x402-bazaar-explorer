import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

export default function ResourceSkeleton({ className }: Props) {
  return (
    <div className={cn('flex h-47.5 flex-col gap-3 rounded border p-4', className)}>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  );
}
