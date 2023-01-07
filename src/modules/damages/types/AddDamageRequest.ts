import { Prisma } from '@/core/prisma/generated';

const addDamageRequest = Prisma.validator<Prisma.DamageArgs>()({
  select: {
    name: true,
  },
});

type AddDamageRequest = {
  body: Prisma.TechnicianGetPayload<typeof addDamageRequest>;
};

export default AddDamageRequest;
