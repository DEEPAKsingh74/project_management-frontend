import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { log } from 'console';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if the user object is available
      if (user) {
        token.id = user.id;

        // Call the API route to create the user on the second server
        try {

          log("Creating user data", user);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.email?.split('@')[0] || user.name,
              profilePictureUrl: user.image,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create user on server 2');
          }
        } catch (error) {
          console.error('Error creating user on server 2:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom id to session from token
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
