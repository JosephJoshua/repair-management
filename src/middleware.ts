import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      if (path.includes('check-credentials')) return true;

      return token != null;
    },
  },
});
