import { Prisma } from '@/core/prisma/generated';

const deleteConditionRequest = Prisma.validator<Prisma.ConditionArgs>()({
  select: {
    conditionId: true,
  },
});

type DeleteConditionRequest = {
  query: Prisma.ConditionGetPayload<typeof deleteConditionRequest>;
};

export default DeleteConditionRequest;
