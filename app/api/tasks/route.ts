// import Tasks from "@/models/tasks";
// import mongoose from "mongoose";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function POST(request: Request) {

    // mongoose.connect(process.env.MONGO_URL as string)

    const body = await request.json();

    // const task = await Tasks.create(body);

    const task = await prisma.task.create({
        data: body 
    })

    return Response.json(task);
}


export async function PUT(request: Request) {
    // mongoose.connect(process.env.MONGO_URL as string)
    
    const body = await request.json();
    const { id, ...rest } = body

    // const task = await Tasks.findByIdAndUpdate(id, rest);
    const task = await prisma.task.update({
        where: { id: id },
        data: rest,
    })

    return Response.json(task);
}

export async function DELETE(req: NextRequest) {
    // mongoose.connect(process.env.MONGO_URL as string)

    // const tasks = await Tasks.deleteMany({})

    const { searchParams } = new URL(req.url);

    const taskListId = searchParams.get("taskListId");
    const email = searchParams.get("email");

    const tasks = await prisma.task.deleteMany({
        where: {
            AND: [
                { taskListId: taskListId },
                { userEmail: email }
            ]
        }
    })

    return Response.json(tasks)
}