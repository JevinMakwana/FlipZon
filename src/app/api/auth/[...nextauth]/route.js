// import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma  from "@/lib/db/prisma";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            issuer: process.env.NEXTAUTH_URL,
        })
    ],
    callbacks:{
        session({session,user}){
            session.user.id = user.id;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }