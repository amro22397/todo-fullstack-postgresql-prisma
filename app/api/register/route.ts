// import mongoose from "mongoose"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    // mongoose.connect(process.env.MONGO_URL as string)
    
    const {email, password} = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create({ email, hashedPassword })

    const user = await prisma.user.create({
        data: {
            email, hashedPassword
        }
    })

    return Response.json(user);
}