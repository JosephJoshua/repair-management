import { Prisma } from '@/core/prisma/generated';

const editDamageRequest = Prisma.validator<Prisma.DamageArgs>()({
  select: {
    damageId: true,
    name: true,
  },
});

type EditDamageRequest = {
  body: Prisma.DamageGetPayload<typeof editDamageRequest>;
};

export default EditDamageRequest;
