import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import { Prisma } from '@/core/prisma/generated';
import { SortDirectionObjectEnum } from '@/core/types/SortDirection';
import AddTechnicianRequest from '@/modules/technicians/types/AddTechnicianRequest';
import AddTechnicianResponse from '@/modules/technicians/types/AddTechnicianResponse';
import DeleteTechnicianRequest from '@/modules/technicians/types/DeleteTechnicianRequest';
import EditTechnicianRequest from '@/modules/technicians/types/EditTechnicianRequest';
import GetTechniciansResponse from '@/modules/technicians/types/GetTechniciansResponse';
import { NextApiResponse } from 'next';
import { toZod } from 'tozod';
import { z } from 'zod';

const getSchema = z.object({
  query: z.object({
    query: z.string().max(255).optional().default(''),
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
    sortBy: z
      .nativeEnum(Prisma.TechnicianScalarFieldEnum)
      .optional()
      .default('technicianId'),
    sortDirection: z
      .nativeEnum(SortDirectionObjectEnum)
      .optional()
      .default('asc'),
  }),
});

const postSchema: toZod<{ body: AddTechnicianRequest }> = z.object({
  body: z.object({
    name: z.string().max(255),
  }),
});

const putSchema: toZod<{ body: EditTechnicianRequest }> = z.object({
  body: z.object({
    technicianId: z.string(),
    name: z.string().max(255),
  }),
});

const deleteSchema: toZod<{ query: DeleteTechnicianRequest }> = z.object({
  query: z.object({
    technicianId: z.string(),
  }),
});

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetTechniciansResponse>) => {
      const { limit, offset, sortBy, sortDirection, query } = req.query;

      const [technicians, count] = await Promise.all([
        prisma.technician.findMany({
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
        prisma.technician.count({
          where: { name: { contains: query, mode: 'insensitive' } },
        }),
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
  post: {
    schema: postSchema,
    handler: async (req, res: NextApiResponse<AddTechnicianResponse>) => {
      const { name } = req.body;

      const technician = await prisma.technician.create({
        data: {
          name,
          // TODO:
          storeId: 'clchmfdk50000jym3y5b32qi6',
        },
      });

      res.status(201).send({
        result: technician,
      });
    },
  },
  put: {
    schema: putSchema,
    handler: async (req, res: NextApiResponse) => {
      const { technicianId, name } = req.body;

      await prisma.technician.update({
        data: {
          name,
        },

        where: {
          technicianId,
        },
      });

      res.status(204).end();
    },
  },
  delete: {
    schema: deleteSchema,
    handler: async (req, res: NextApiResponse) => {
      const { technicianId } = req.query;

      await prisma.technician.delete({
        where: { technicianId },
      });

      res.status(204).end();
    },
  },
});
