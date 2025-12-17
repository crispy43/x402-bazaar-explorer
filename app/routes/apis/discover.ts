import type { LoaderFunctionArgs } from 'react-router';

import { discoverResources } from '~/.server/controllers/discover.controller';
import { control } from '~/.server/lib/utils';

export const loader = async (args: LoaderFunctionArgs) => {
  return control(discoverResources, args);
};
