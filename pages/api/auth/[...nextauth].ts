import NextAuth, { Session, TokenSet } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone No", type: "string" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        try {

          return (credentials?.phone)

        } catch (err) {
          console.log(err)
          return null;
        }
      },
    })
  ],
  secret: process.env.JWT_SECRET,
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, credentials, account }) {
      if (!(credentials && credentials.phone)) return false;
      return true;
    },
    // @ts-ignore
    async jwt(jwtObject) {
      try {
        const { user, token } = jwtObject;
        if (user) {
          token.phone = String(user);
        }
        return token

      } catch (err) {
        console.log(err)
      }

    },

    //@ts-ignore
    async session({ session, token }: { session: Session, token: TokenSet }) {
      //@ts-ignore 
      session.user.phone = token.phone

      return session;
    }
  },
})
