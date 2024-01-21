// "use client";
// export { SessionProvider } from "next-auth/react"

//2
// "use server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// export { getServerSession, authOptions }

//3
// "use server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// export async function getServerSessionWrapper() {
//     const session = await getServerSession(authOptions);
//     return session;
// }
// export { authOptions };

"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function getServerSessionWrapper() {
    const session = await getServerSession(authOptions);
    return session;
}

//1
// export default async function Credebtials() {
//     console.log("CredebtialsInvoked")
//     const session = await getServerSession(authOptions)
//     if(!session){
//         // redirect("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadd-product")
//         return "true";
//     }
//     return "false";
// }