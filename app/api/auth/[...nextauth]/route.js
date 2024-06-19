import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// server side operations is going to go in the API routes
