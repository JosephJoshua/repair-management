import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import DefaultResponse from '@/core/types/DefaultResponse';
import { SortDirectionObjectEnum } from '@/core/types/SortDirection';
import AddConditionRequest from '@/modules/conditions/types/AddConditionRequest';
import AddConditionResponse from '@/modules/conditions/types/AddConditionResponse';
import { ConditionTableRowFields } from '@/modules/conditions/types/ConditionTableRow';
import DeleteConditionRequest from '@/modules/conditions/types/DeleteConditionRequest';
import EditConditionRequest from '@/modules/conditions/types/EditConditionRequest';
import GetConditionsResponse from '@/modules/conditions/types/GetConditionsResponse';
import { NextApiResponse } from 'next';
import { toZod } from 'tozod';
import { z } from 'zod';

const getSchema = z.object({
  query: z.object({
    query: z.string().max(255).optional().default(''),
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
    sortBy: z
      .nativeEnum(ConditionTableRowFields)
      .optional()
      .default('conditionId'),
    sortDirection: z
      .nativeEnum(SortDirectionObjectEnum)
      .optional()
      .default('asc'),
  }),
});

const postSchema: toZod<AddConditionRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
  }),
});

const putSchema: toZod<EditConditionRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
    conditionId: z.string(),
  }),
});

const deleteSchema: toZod<DeleteConditionRequest> = z.object({
  query: z.object({
    conditionId: z.string(),
  }),
});

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetConditionsResponse>) => {
      const { limit, offset, query, sortBy, sortDirection } = req.query;

      const [conditions, count] = await Promise.all([
        prisma.condition.findMany({
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
        prisma.condition.count({
          where: { name: { contains: query, mode: 'insensitive' } },
        }),
      ]);

      res.status(200).send({
        result: conditions,
        metadata: {
          total_count: count,
          offset,
          limit,
        },
        ok: true,
      });
    },
  },
  post: {
    schema: postSchema,
    handler: async (req, res: NextApiResponse<AddConditionResponse>) => {
      const { name } = req.body;

      const condition = await prisma.condition.create({
        data: {
          name,
          // TODO:
          storeId: 'clcm1tfjy0000uqy0mwvulwsm',
        },
      });

      res.status(201).send({
        result: condition,
        ok: true,
      });
    },
  },
  put: {
    schema: putSchema,
    handler: async (req, res: NextApiResponse<DefaultResponse>) => {
      const { conditionId, name } = req.body;

      await prisma.condition.update({
        data: {
          name,
        },
        where: {
          conditionId,
        },
      });

      res.status(200).send({ ok: true });
    },
  },
  delete: {
    schema: deleteSchema,
    handler: async (req, res: NextApiResponse<DefaultResponse>) => {
      const { conditionId } = req.query;

      await prisma.condition.delete({
        where: { conditionId },
      });

      res.status(200).send({ ok: true });
    },
  },
});
