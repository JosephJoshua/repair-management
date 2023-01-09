import { Prisma } from '@/core/prisma/generated';

const addConditionRequest = Prisma.validator<Prisma.ConditionArgs>()({
  select: {
    name: true,
  },
});

type AddConditionRequest = {
  body: Prisma.TechnicianGetPayload<typeof addConditionRequest>;
};

export default AddConditionRequest;
