import { Prisma } from '@/core/prisma/generated';

const editSupplierRequest = Prisma.validator<Prisma.SupplierArgs>()({
  select: {
    supplierId: true,
    name: true,
  },
});

type EditSupplierRequest = {
  body: Prisma.SupplierGetPayload<typeof editSupplierRequest>;
};

export default EditSupplierRequest;
