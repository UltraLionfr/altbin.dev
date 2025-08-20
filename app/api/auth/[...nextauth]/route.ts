import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async session({ session, token }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
    } else {
      session.user.id = '';
    }
    return session;
  },
}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
