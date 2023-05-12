import NextAuth, { NextAuthOptions, Session, TokenSet } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { shopifyInit } from "../../../lib/shopify/shopifyInit";
import { initDB } from "../../../lib/firebase/intiDB";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const authOptions: NextAuthOptions = {
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
      try {

        if (!(credentials && credentials.phone)) return false;
        const { shopify, session } = await shopifyInit();
        const db = await initDB();

        const response = await shopify.rest.Customer.search({
          session: session,
          query: `phone:${credentials.phone}`
        })
        {/*@ts-ignore*/ }
        if (response?.customers?.length !== 1) {
          const customer = new shopify.rest.Customer({ session: session });
          customer.phone = String(credentials.phone);
          await customer.save({
            update: true
          })

          const customerData = {
            customer_id: String(customer.id),
            fname: "",
            lname: "",
          }

          const customerRef = doc(db, "users", `${credentials.phone}`)
          await updateDoc(customerRef, customerData)
        }

        return true;

      } catch (err) {
        console.log(err)
        return false;
      }
    },
    // @ts-ignore
    async jwt(jwtObject) {
      try {
        const { user, token } = jwtObject;
        const db = await initDB();

        if (user) {
          token.phone = String(user);
          const custRef = doc(db, "users", `${user}`)

          const customer = (await getDoc(custRef)).data()
          //@ts-ignore 
          token.customer_id = customer?.customer_id

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
      //@ts-ignore 
      session.user.customer_id = token.customer_id

      return session;
    }
  },
}
export default NextAuth(authOptions)
