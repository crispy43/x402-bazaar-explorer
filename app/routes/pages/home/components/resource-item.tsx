import type { FixedDiscoveryResource } from '~/common/bazaar';

interface Props {
  item: FixedDiscoveryResource;
  className?: string;
}

export default function ResourceItem({ item, className }: Props) {
  const mainAccept = item.accepts[0];

  return (
    <div
      className={`flex flex-col rounded border p-4 hover:shadow-md ${className ?? ''}`}
    >
      <p className="font-mono text-sm break-all">{mainAccept.description}</p>
      <p className="mt-2 text-xs text-gray-500">Type: {item.type}</p>
    </div>
  );
}
