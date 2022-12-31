import { PrismaClient } from './generated';

const globalWithPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalWithPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn', 'info'],
  });

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prisma = prisma;

export default prisma;
