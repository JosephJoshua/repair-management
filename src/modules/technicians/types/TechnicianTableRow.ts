import { Prisma } from '@/core/prisma/generated';

const technicianTableRow = Prisma.validator<Prisma.TechnicianArgs>()({
  select: {
    technicianId: true,
    name: true,
    createdAt: true,
  },
});

type TechnicianTableRow = Prisma.TechnicianGetPayload<
  typeof technicianTableRow
>;

export default TechnicianTableRow;
