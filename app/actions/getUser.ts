// import { User } from "@/models/user";
// import { authConfig } from "@/pages/api/auth/[...nextauth]";
// import mongoose from "mongoose";
// import mongoose from "mongoose";



import { getServerSession } from "next-auth"

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import prisma from "@/lib/prisma"


export const config = {
    providers: [], // rest of your config
  } satisfies NextAuthOptions

export function getSession(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, config)
  }


/* export async function getSession() {
  return await getServerSession(authConfig);
} */


  
  export async function getUser() {
    try {
      const session = await getSession();

      console.log(session?.user?.email)

      if (!session?.user?.email) {
        return null;
      }

      // mongoose.connect(process.env.MONGO_URL as string);
      // const currentUser = await User.findOne({email: session?.user?.email})

      const currentUser = await prisma.user.findUnique({
        where: { email: session?.user?.email }
      })

    if (!currentUser) {
        // mongoose.connect(process.env.MONGO_URL as string)
        // const user = await User.create({ email: session?.user?.email  })

        const user = await prisma.user.create({
          data: {
            email: session?.user?.email
          }
        })
        return {
          ...user,
              createdAt: currentUser.createdAt.toString(),
              updateAt: currentUser.updatedAt.toString(),
        };

    } else {
      return {
        ...currentUser,
            createdAt: currentUser.createdAt.toString(),
            updateAt: currentUser.updatedAt.toString(),
      };
    }

    } catch (error) {
      
      console.log(error);
      

    }
  }

  