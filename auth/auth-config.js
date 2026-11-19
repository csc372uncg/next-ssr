import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { upsertUser } from "@/model/usersModel";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "github" || !profile?.id) {
        return false;
      }

      await upsertUser({
        githubId: String(profile.id),
        email: profile.email,
        name: profile.name ?? profile.login,
        avatarUrl: profile.avatar_url,
      });

      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === "github") {
        token.githubId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.githubId) {
        session.user.githubId = token.githubId;
      }
      return session;
    },
  },
});

