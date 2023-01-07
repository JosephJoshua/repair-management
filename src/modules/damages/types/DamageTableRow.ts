import { Prisma } from '@/core/prisma/generated';

const damageTableRow = Prisma.validator<Prisma.DamageArgs>()({
  select: {
    damageId: true,
    name: true,
    createdAt: true,
  },
});

type DamageTableRow = Prisma.DamageGetPayload<typeof damageTableRow>;

export const DamageTableRowFields = {
  damageId: 'damageId',
  name: 'name',
  createdAt: 'createdAt',
};

export default DamageTableRow;
