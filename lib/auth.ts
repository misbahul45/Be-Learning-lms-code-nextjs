import NextAuth, { DefaultSession, User} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { generateRandomHex } from "./utils";

enum Provider {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
  CREDENTIALS = "CREDENTIALS"
}

declare module "next-auth" {
  interface Session {
    user: {
      email?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email as string },
            include: { profile: true },
          });

          return {
            email: user?.email,
            role: user?.profile?.role,
          } as User;
        } catch (error) {
          throw error;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {    
    async signIn({ account, profile }) {
      const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

      if (account?.provider === "google") {
        const email = profile?.email as string;
        const username = (profile?.name as string).replace(/\s+/g, "").toLowerCase();
        const image = profile?.picture as string || defaultImage;
        const password = generateRandomHex(16);
        const token = generateRandomHex(16);
        const user=await prisma.user.findUnique({
          where:{email},
          select:{
            provider:true
          }
        })
        if(user?.provider!=="GOOGLE") return false;
        if(!user){
          await prisma.user.upsert({
            where: { email },
            create: {
              email,
              username,
              password,
              verification:{
                create:{
                  token,
                  isVerified:true
                }
              },
              provider: Provider.GOOGLE,
              profile: {
                create: {
                  image: {
                    create: { url: image },
                  },
                },
              },
            },
            update: { provider: Provider.GOOGLE }
          });
        }
        return true;
      }

      if (account?.provider === "github") {
        const email = profile?.email || account?.email || "unknown@github.com";
        const username = profile?.login || "unknown_user";
        const imageProfile = (profile?.avatar_url as string) || defaultImage;
        const password = generateRandomHex(16);
        const token = generateRandomHex(16);

        const user=await prisma.user.findUnique({
          where:{
            email:email as string
          },
          select:{
            provider:true
          }
        })
        if(user?.provider!=="GITHUB") return false;
        if(!user){
          await prisma.user.upsert({
              where: { 
                email:email as string
              },
              create: {
                email:email as string,
                username:username as string,
                password,
                verification:{
                  create:{
                    token,
                    isVerified:true
                  }
                },
                provider: Provider.GITHUB,
                profile: {
                  create: {
                    image: {
                      create: { url: imageProfile },
                    },
                  },
                },
              },
              update: { provider: Provider.GITHUB }
            });
          return true;
        }
        return true;
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
    error:"/error"
  },
});