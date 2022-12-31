import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import { Prisma, Technician } from '@/core/prisma/generated';
import { NextApiResponse } from 'next';
import { z } from 'zod';

const getSchema = z.object({
  query: z.object({
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
    sortBy: z
      .nativeEnum(Prisma.TechnicianScalarFieldEnum)
      .optional()
      .default('technicianId'),
    sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
  }),
});

type GetResponse = {
  result: Technician[];
  metadata: {
    total_count: number;
    limit: number;
    offset: number;
  };
};

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetResponse>) => {
      const { limit, offset, sortBy, sortDirection } = req.query;

      const [technicians, count] = await Promise.all([
        prisma.technician.findMany({
          take: limit,
          skip: offset,
          orderBy: {
            [sortBy]: sortDirection,
          },
        }),
        prisma.technician.count(),
      ]);

      res.status(200).send({
        result: technicians,
        metadata: {
          total_count: count,
          offset,
          limit,
        },
      });
    },
  },
});
