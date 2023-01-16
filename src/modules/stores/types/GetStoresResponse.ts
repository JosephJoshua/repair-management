import { Store } from '@/core/prisma/generated';

type GetStoresResponse = {
  result: Store | Store[];
  ok: boolean;
};

export default GetStoresResponse;
