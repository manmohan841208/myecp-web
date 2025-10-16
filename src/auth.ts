import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        console.log('USER_TOKEN', user);
        if (user?.token) return user;
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: async ({ auth }) => !!auth, // Basic check
  },
});
