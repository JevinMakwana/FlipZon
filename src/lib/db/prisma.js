import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// import { PrismaClient } from "@prisma/client";
// const globalForPrisma ={
//   prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma