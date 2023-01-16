import CheckCredentialsResponse from '@/modules/users/types/CheckCredentialsResponse';
import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        storeSlug: {
          label: 'ID Toko',
          type: 'text',
        },
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        if (credentials == null) return null;

        const response = await axios
          .post<CheckCredentialsResponse>(
            `${process.env.NEXTAUTH_URL}/api/users/check-credentials`,
            {
              ...credentials,
              store_slug: credentials.storeSlug,
            }
          )
          .catch(() => null);

        if (response == null || !response.data.ok) return null;
        const { data } = response;

        return {
          id: data.result.userId,
          name: data.result.username,
          image: data.result.profileUrl,
          role: data.result.role,
          storeId: data.result.storeId,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
        token.name = user.name;
        token.role = user.role;
        token.storeId = user.storeId;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.sub,
          name: token.name,
          image: token.picture,
          role: token.role,
          storeId: token.storeId,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
