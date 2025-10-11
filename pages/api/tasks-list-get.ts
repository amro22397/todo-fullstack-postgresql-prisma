// import { connectToDatabase } from "../../utils/db";
// import { getServerSession } from 'next-auth';
// import { authConfig } from './auth/[...nextauth]';
// import { NextApiRequest, NextApiResponse } from "next";
// import TasksList from "../../models/tasks-list";


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {

    
//     await connectToDatabase();
//     const session = await getServerSession(req, res, authConfig);
//     console.log(session?.user?.email);


//     if (!session) {
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false,
//         })
//     }


//     if (req.method === "GET") {
//         const tasksList = await TasksList.find({userEmail: {$in: [session?.user?.email]}})
      
//         return res.status(200).json({
//             success: true,
//             data: tasksList,
//         })
//     }

//     res.setHeader("Allow", ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`)


//   } catch (error: any) {
//     console.error('Error in handler', error);
//     res.status(500).json({
//         success: false,
//         message: "Internal Server Error", 
//         error: error.message
//     })
//   }
// }



export default async function handler() {

}