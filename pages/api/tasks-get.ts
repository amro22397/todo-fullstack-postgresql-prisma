// // import { connectToDatabase } from "../../utils/db";
// // import { getSession } from "@/app/actions/getUser";
// import { getServerSession } from 'next-auth';
// import { authConfig } from './auth/[...nextauth]';
// import { NextApiRequest, NextApiResponse } from "next";
// // import Tasks from "@/models/tasks";
// import prisma from '@/lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {


//     // await connectToDatabase();
//     const session = await getServerSession(req, res, authConfig);
//     console.log(session?.user?.email);


//     const { taskListId } = await req.query;
//     console.log(taskListId);

//     if (!session) {
//       return res.status(401).json({
//         message: "Unauthorized",
//         success: false,
//       })
//     }

//     // let searchString = searchTerm; 

//     // if (!searchTerm) {
//     //     searchString = "";
//     // }


//     if (req.method === "GET") {
//       // const tasks = await Tasks.find({
//       //     userEmail: {$in: [session?.user?.email]},
//       //     taskListId: {$in: [taskListId]},
//       //   }, {}, {sort: {createdAt: 1}});

//       const tasks = await prisma.task.findMany({
//         where: {
//           AND: [
//             { userEmail: session?.user?.email },
//             { taskListId: taskListId }
//           ]
//         },
//         orderBy: {
//           createdAt: 'asc'
//         }
//       })

//       return res.status(200).json({
//         success: true,
//         data: tasks,
//       })
//     }

//     res.setHeader("Allow", ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`)


//   } catch (error: any) {
//     console.error('Error in handler', error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     })
//   }
// }


export default async function handler() {

}