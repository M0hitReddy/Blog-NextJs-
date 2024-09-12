// import { type NextAuthOptions } from "next-auth";
import prisma from "@/lib/dbConnect";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { getProviders } from "next-auth/react";
// import prisma from "@/lib/dbConnect";
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // pages: {
  // signIn: "/login",
  // signOut: "/auth/signout",
  // error: "/auth/error",
  // verifyRequest: "/auth/verify-request",
  // newUser: "/auth/new-user",
  // },
  callbacks: {
    async jwt({ token, user }) {
      console.log("user", user);
      // console.log("token", token);
      // console.log("session", session);
      if (user) {
        token.id = user.id;
        //   token.name = user.name;
        //   token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("user", user);
      // console.log("session", token);
      if (session.user) {
        session.user.id = token.id;

        // session.user.name = token.name;
        // session.user.email = token.email;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: profile?.email ?? "",
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile?.email ?? "",
              name: profile?.name,
              password: user.id, // Add a placeholder value for the password property
            },
          });
        }
      }
      console.log("signIn", user);
      // console.log(user);
      // console.log(account);
      // console.log(credentials);
      // console.log(email);
      // console;
      return true;
    },
  },
  // secret: "aaa",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialProvider({
      id: "credentials",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@xyz.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // prisma.$connect();
        // try {
        //   const user = await prisma.user.findFirst({
        //     where: {
        //       email: credentials?.username,
        //       password: credentials?.password,
        //     },
        //   });
        //   if (user) {
        //     return user;
        //   } else {
        //     return null;
        //   }
        // } catch (error) {
        //   console.log(error);
        //   return null;
        // }
        console.log(credentials, "@@@@@@@@@@@@@");
        const user = { id: "1", name: "John Smith", email: "johm@gmail.com" };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
