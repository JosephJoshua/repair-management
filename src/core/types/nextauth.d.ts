import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    storeId?: string;
  }

  interface Session {
    user: {
      role?: string;
      id?: string;
      storeId?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    storeId?: string;
  }
}
