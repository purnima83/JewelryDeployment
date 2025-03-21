import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// ✅ Explicitly type `authOptions` for clarity
const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: { params: { prompt: "select_account" } }, // Force account selection
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export `authOptions` separately for reuse (if needed)
export { authOptions };

// ✅ Ensure correct API route export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
