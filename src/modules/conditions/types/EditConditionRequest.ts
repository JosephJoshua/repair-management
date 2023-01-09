import { Prisma } from '@/core/prisma/generated';

const editConditionRequest = Prisma.validator<Prisma.ConditionArgs>()({
  select: {
    conditionId: true,
    name: true,
  },
});

type EditConditionRequest = {
  body: Prisma.ConditionGetPayload<typeof editConditionRequest>;
};

export default EditConditionRequest;
