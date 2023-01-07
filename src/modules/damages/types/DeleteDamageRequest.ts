import { Prisma } from '@/core/prisma/generated';

const deleteDamageRequest = Prisma.validator<Prisma.DamageArgs>()({
  select: {
    damageId: true,
  },
});

type DeleteDamageRequest = {
  query: Prisma.DamageGetPayload<typeof deleteDamageRequest>;
};

export default DeleteDamageRequest;
