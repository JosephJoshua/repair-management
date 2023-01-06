import { Prisma } from '@/core/prisma/generated';

const addTechnicianRequest = Prisma.validator<Prisma.TechnicianArgs>()({
  select: {
    name: true,
  },
});

type AddTechnicianRequest = {
  body: Prisma.TechnicianGetPayload<typeof addTechnicianRequest>;
};

export default AddTechnicianRequest;
