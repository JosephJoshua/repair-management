import { User } from '@/core/prisma/generated';

type AddUserResponse = {
  result: User;
  ok: boolean;
};

export default AddUserResponse;
