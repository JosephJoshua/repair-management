import { Prisma } from '@/core/prisma/generated';

const editTechnicianRequest = Prisma.validator<Prisma.TechnicianArgs>()({
  select: {
    technicianId: true,
    name: true,
  },
});

type EditTechnicianRequest = {
  body: Prisma.TechnicianGetPayload<typeof editTechnicianRequest>;
};

export default EditTechnicianRequest;
