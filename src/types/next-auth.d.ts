import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id?: string; // Add custom `id` field to Session
    user: {
      /** The user's postal address. */
      id: string; // This can be any custom field you want to add
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id?: string; // Add custom `id` field to JWT
  }
}
