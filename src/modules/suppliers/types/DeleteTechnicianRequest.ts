import { Prisma } from '@/core/prisma/generated';

const deleteSupplierRequest = Prisma.validator<Prisma.SupplierArgs>()({
  select: {
    supplierId: true,
  },
});

type DeleteSupplierRequest = {
  query: Prisma.SupplierGetPayload<typeof deleteSupplierRequest>;
};

export default DeleteSupplierRequest;
