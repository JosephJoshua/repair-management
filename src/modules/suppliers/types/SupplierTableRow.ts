import { Prisma } from '@/core/prisma/generated';

const supplierTableRow = Prisma.validator<Prisma.SupplierArgs>()({
  select: {
    supplierId: true,
    name: true,
    createdAt: true,
  },
});

type SupplierTableRow = Prisma.SupplierGetPayload<typeof supplierTableRow>;

export const SupplierTableRowFields = {
  supplierId: 'supplierId',
  name: 'name',
  createdAt: 'createdAt',
};

export default SupplierTableRow;
