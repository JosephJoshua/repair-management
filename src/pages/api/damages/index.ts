import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import { SortDirectionObjectEnum } from '@/core/types/SortDirection';
import AddDamageRequest from '@/modules/damages/types/AddDamageRequest';
import AddDamageResponse from '@/modules/damages/types/AddDamageResponse';
import { DamageTableRowFields } from '@/modules/damages/types/DamageTableRow';
import DeleteDamageRequest from '@/modules/damages/types/DeleteDamageRequest';
import EditDamageRequest from '@/modules/damages/types/EditDamageRequest';
import GetDamagesResponse from '@/modules/damages/types/GetDamagesResponse';
import { NextApiResponse } from 'next';
import { toZod } from 'tozod';
import { z } from 'zod';

const getSchema = z.object({
  query: z.object({
    query: z.string().max(255).optional().default(''),
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
    sortBy: z.nativeEnum(DamageTableRowFields).optional().default('damageId'),
    sortDirection: z
      .nativeEnum(SortDirectionObjectEnum)
      .optional()
      .default('asc'),
  }),
});

const postSchema: toZod<AddDamageRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
  }),
});

const putSchema: toZod<EditDamageRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
    damageId: z.string(),
  }),
});

const deleteSchema: toZod<DeleteDamageRequest> = z.object({
  query: z.object({
    damageId: z.string(),
  }),
});

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetDamagesResponse>) => {
      const { limit, offset, query, sortBy, sortDirection } = req.query;

      const [damages, count] = await Promise.all([
        prisma.damage.findMany({
          take: limit,
          skip: offset,
          orderBy: {
            [sortBy]: sortDirection,
          },
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        }),
        prisma.damage.count({
          where: { name: { contains: query, mode: 'insensitive' } },
        }),
      ]);

      res.status(200).send({
        result: damages,
        metadata: {
          total_count: count,
          offset,
          limit,
        },
      });
    },
  },
  post: {
    schema: postSchema,
    handler: async (req, res: NextApiResponse<AddDamageResponse>) => {
      const { name } = req.body;

      const damage = await prisma.damage.create({
        data: {
          name,
          // TODO:
          storeId: 'clcm1tfjy0000uqy0mwvulwsm',
        },
      });

      res.status(201).send({
        result: damage,
      });
    },
  },
  put: {
    schema: putSchema,
    handler: async (req, res: NextApiResponse) => {
      const { damageId, name } = req.body;

      await prisma.damage.update({
        data: {
          name,
        },
        where: {
          damageId,
        },
      });

      res.status(204).end();
    },
  },
  delete: {
    schema: deleteSchema,
    handler: async (req, res: NextApiResponse) => {
      const { damageId } = req.query;

      await prisma.damage.delete({
        where: { damageId },
      });

      res.status(204).end();
    },
  },
});
