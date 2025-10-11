// import Tasks from "@/models/tasks";
// import mongoose from "mongoose";

import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
        // mongoose.connect(process.env.MONGO_URL as string)
        const {id, priority} = await request.json();

        // const task = await Tasks.findByIdAndUpdate(id, {priority: priority});

        const task = await prisma.task.update({
                where: { id: id },
                data: { priority: priority }
        })

        return Response.json(task);

}