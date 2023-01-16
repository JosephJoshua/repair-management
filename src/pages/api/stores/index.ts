import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import GetStoresRequest from '@/modules/stores/types/GetStoresRequest';
import GetStoresResponse from '@/modules/stores/types/GetStoresResponse';
import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { toZod } from 'tozod';
import { z } from 'zod';

const getSchema: toZod<GetStoresRequest> = z.object({
  query: z.object({
    storeId: z.string().optional(),
  }),
});

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetStoresResponse>) => {
      const { storeId } = req.query;
      let result = null;

      if (storeId == undefined) {
        result = await prisma.store.findMany();
      } else {
        result = await prisma.store.findFirst({
          where: { storeId },
        });

        if (result == null) {
          throw new ApiError(404, `store with id ${storeId} not found`);
        }
      }

      res.status(200).send({
        result,
        ok: true,
      });
    },
  },
});
