import { Prisma } from '@/core/prisma/generated';

const deleteTechnicianRequest = Prisma.validator<Prisma.TechnicianArgs>()({
  select: {
    technicianId: true,
  },
});

type DeleteTechnicianRequest = {
  query: Prisma.TechnicianGetPayload<typeof deleteTechnicianRequest>;
};

export default DeleteTechnicianRequest;
