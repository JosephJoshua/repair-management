import { Prisma } from '@/core/prisma/generated';

const conditionTableRow = Prisma.validator<Prisma.ConditionArgs>()({
  select: {
    conditionId: true,
    name: true,
    createdAt: true,
  },
});

type ConditionTableRow = Prisma.ConditionGetPayload<typeof conditionTableRow>;

export const ConditionTableRowFields = {
  conditionId: 'conditionId',
  name: 'name',
  createdAt: 'createdAt',
};

export default ConditionTableRow;
