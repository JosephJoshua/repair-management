import handle from '@/core/middlewares/handle';
import prisma from '@/core/prisma';
import CheckCredentialsRequest from '@/modules/users/types/CheckCredentialsRequest';
import CheckCredentialsResponse from '@/modules/users/types/CheckCredentialsResponse';
import { verify } from 'argon2';
import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { toZod } from 'tozod';
import { z } from 'zod';

const postSchema: toZod<CheckCredentialsRequest> = z.object({
  body: z.object({
    store_slug: z.string(),
    username: z.string().max(255),
    password: z.string().min(8).max(24),
  }),
});

const INVALID_CREDENTIALS = 'invalid credentials';

export default handle({
  post: {
    schema: postSchema,
    handler: async (req, res: NextApiResponse<CheckCredentialsResponse>) => {
      const { username, password, store_slug } = req.body;

      const store = await prisma.store.findFirst({
        where: { slug: store_slug },
        select: { storeId: true },
      });

      if (store == null) {
        throw new ApiError(401, INVALID_CREDENTIALS);
      }

      const user = await prisma.user.findFirst({
        where: { username, storeId: store.storeId },
      });

      if (user == null) {
        throw new ApiError(401, INVALID_CREDENTIALS);
      }

      const isValidPassword = verify(user.password, password);
      if (!isValidPassword) {
        throw new ApiError(401, INVALID_CREDENTIALS);
      }

      const { password: _, ...userResponse } = user;

      res.status(200).send({
        result: userResponse,
        ok: true,
      });
    },
  },
});
