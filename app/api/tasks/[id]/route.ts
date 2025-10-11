// import Tasks from "@/models/tasks";
// import mongoose from "mongoose";

import prisma from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {

    // mongoose.connect(process.env.MONGO_URL as string)

    // const task = await Tasks.findByIdAndDelete(params.id);

    const task = await prisma.task.delete({
        where: { id: params.id }
    })

    return Response.json(task);

}