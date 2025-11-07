// import { connectToDatabase } from "../../utils/db";
import { getServerSession } from 'next-auth';
import { authConfig } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from "next";
import Tasks from "@/models/tasks";
import prisma from '@/lib/prisma';
// model import 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const { taskId } = await req.query;
    
    // await connectToDatabase();
    const session = await getServerSession(req, res, authConfig);
    console.log(session?.user?.email);


    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
        })
    }


    if (req.method === "GET") {
        // const task = await Tasks.findOne({_id: taskId});

        const task = await prisma.task.findUnique({
            where: { id: taskId }
        })

      console.log(task);
      
        return res.status(200).json({
            success: true,
            data: task,
        })
    }

    res.setHeader("Allow", ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`)


  } catch (error: any) {
    console.error(`Server error getting task by id: ${error}`);
    res.status(500).json({
        success: false,
        message: `Server error getting task by id: ${error}`, 
        error: error.message
    })
  }
}


// export default async function handler() {

// }