import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import AddUserRequest from '@/modules/users/types/AddUserRequest';
import AddUserResponse from '@/modules/users/types/AddUserResponse';
import { hash } from 'argon2';
import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { toZod } from 'tozod';
import { z } from 'zod';

const postSchema: toZod<AddUserRequest> = z.object({
  body: z.object({
    store_id: z.string(),
    username: z.string().max(255),
    password: z.string().min(8).max(24),
    profile_url: z.string().url().optional(),
  }),
});

export default handle({
  post: {
    schema: postSchema,
    handler: async (req, res: NextApiResponse<AddUserResponse>) => {
      const { store_id, username, password, profile_url } = req.body;

      const [exists, store] = await Promise.all([
        prisma.user.findFirst({
          include: {
            store: {
              select: { name: true },
            },
          },
          where: {
            username,
            store: { storeId: store_id },
          },
        }),
        prisma.store.findFirst({
          select: { storeId: true },
          where: { storeId: store_id },
        }),
      ]);

      if (store == null) {
        throw new ApiError(
          400,
          `no store with the id ${store_id} could be found`
        );
      }

      if (exists) {
        throw new ApiError(
          409,
          'a user with the same username already exists in this store'
        );
      }

      const hashedPassword = await hash(password);
      const user = await prisma.user.create({
        data: {
          username,
          storeId: store.storeId,
          password: hashedPassword,
          profileUrl: profile_url,
          role: 'test',
        },
      });

      res.status(201).send({
        result: user,
        ok: true,
      });
    },
  },
});
