import { User } from '@/core/prisma/generated';

type CheckCredentialsResponse = {
  result: Omit<User, 'password'>;
  ok: boolean;
};

export default CheckCredentialsResponse;
