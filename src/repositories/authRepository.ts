import prisma from "../config/database.js";
import { Session, User } from "@prisma/client";

export type UserInsertData = Omit<User, "id">
export type SessionInsertData = Omit<Session, "id"|"createdAt">

async function newUser(user: UserInsertData){
   return await prisma.user.create({
        data: user
    })
}

async function findUser(email:string){
    return await prisma.user.findUnique({
        where:{
            email: email
        }
    })
}

async function newSession(session: SessionInsertData){
    const result = await prisma.session.create({
         data: session
     })
     return result
 }
const authRepository = {
    newUser,
    findUser,
    newSession
}

export default authRepository