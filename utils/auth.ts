import { prisma } from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prisma) as any,
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password!))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          description: user.description,
          image: user.image,
          bannerImage: user.bannerImage,
          randomKey: "Hey cool",
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          image: token.picture,
          bannerImage: token.bannerImage,
          id: token.id,
          description: token.description,
          randomKey: token.randomKey,
          role: token.role,
        },
      };
    },
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        if (session.image) token.picture = session.image;
        if (session.name) token.name = session.name;
        if (session.description !== null)
          token.description = session.description;
        if (session.bannerImage) token.bannerImage = session.bannerImage;
      }
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          picture: u.image,
          bannerImage: u.bannerImage,
          randomKey: u.randomKey,
          description: u.description,
          role: u.role,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
