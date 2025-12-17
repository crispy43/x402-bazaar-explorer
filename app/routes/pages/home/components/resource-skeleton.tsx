import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

export default function ResourceSkeleton({ className }: Props) {
  return (
    <div className={cn('h-47.5 w-full', className)}>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
