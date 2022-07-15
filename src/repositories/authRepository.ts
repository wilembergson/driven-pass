import prisma from "../config/database.js";
import { User } from "@prisma/client";

export type UserInsertData = Omit<User, "id">

async function newUser(user: UserInsertData){
   return await prisma.user.create({
        data: user
    })
}

const authRepository = {
    newUser
}

export default authRepository