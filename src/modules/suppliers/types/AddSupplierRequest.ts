import { Prisma } from '@/core/prisma/generated';

const addSupplierRequest = Prisma.validator<Prisma.SupplierArgs>()({
  select: {
    name: true,
  },
});

type AddSupplierRequest = {
  body: Prisma.SupplierGetPayload<typeof addSupplierRequest>;
};

export default AddSupplierRequest;
