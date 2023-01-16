import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import DefaultResponse from '@/core/types/DefaultResponse';
import { SortDirectionObjectEnum } from '@/core/types/SortDirection';
import AddSupplierRequest from '@/modules/suppliers/types/AddSupplierRequest';
import AddSupplierResponse from '@/modules/suppliers/types/AddSupplierResponse';
import DeleteSupplierRequest from '@/modules/suppliers/types/DeleteTechnicianRequest';
import EditSupplierRequest from '@/modules/suppliers/types/EditSupplierRequest';
import GetSuppliersResponse from '@/modules/suppliers/types/GetSuppliersResponse';
import { SupplierTableRowFields } from '@/modules/suppliers/types/SupplierTableRow';
import { NextApiResponse } from 'next';
import { toZod } from 'tozod';
import { z } from 'zod';

const getSchema = z.object({
  query: z.object({
    query: z.string().max(255).optional().default(''),
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
    sortBy: z
      .nativeEnum(SupplierTableRowFields)
      .optional()
      .default('supplierId'),
    sortDirection: z
      .nativeEnum(SortDirectionObjectEnum)
      .optional()
      .default('asc'),
  }),
});

const postSchema: toZod<AddSupplierRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
  }),
});

const putSchema: toZod<EditSupplierRequest> = z.object({
  body: z.object({
    name: z.string().max(255),
    supplierId: z.string(),
  }),
});

const deleteSchema: toZod<DeleteSupplierRequest> = z.object({
  query: z.object({
    supplierId: z.string(),
  }),
});

export default handle({
  get: {
    schema: getSchema,
    handler: async (req, res: NextApiResponse<GetSuppliersResponse>) => {
      const { limit, offset, query, sortBy, sortDirection } = req.query;

      const [suppliers, count] = await Promise.all([
        prisma.supplier.findMany({
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
        prisma.supplier.count({
          where: { name: { contains: query, mode: 'insensitive' } },
        }),
      ]);

      res.status(200).send({
        result: suppliers,
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
    handler: async (req, res: NextApiResponse<AddSupplierResponse>) => {
      const { name } = req.body;

      const supplier = await prisma.supplier.create({
        data: {
          name,
          // TODO:
          storeId: 'clcm1tfjy0000uqy0mwvulwsm',
        },
      });

      res.status(201).send({
        result: supplier,
        ok: true,
      });
    },
  },
  put: {
    schema: putSchema,
    handler: async (req, res: NextApiResponse<DefaultResponse>) => {
      const { supplierId, name } = req.body;

      await prisma.supplier.update({
        data: {
          name,
        },
        where: {
          supplierId,
        },
      });

      res.status(200).send({ ok: true });
    },
  },
  delete: {
    schema: deleteSchema,
    handler: async (req, res: NextApiResponse<DefaultResponse>) => {
      const { supplierId } = req.query;

      await prisma.supplier.delete({
        where: { supplierId },
      });

      res.status(200).send({ ok: true });
    },
  },
});
