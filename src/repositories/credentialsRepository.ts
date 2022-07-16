import { Credentials } from "@prisma/client"
import prisma from "../config/database.js"

export type CredentialsInsertData = Omit<Credentials, "id">

async function newCredential(credential:CredentialsInsertData) {
    return await prisma.credentials.create({
        data: credential
    })
}

async function listCredentials(userId:number){
    const credentials: Credentials[] = await prisma.credentials.findMany({
        where:{
            userId
        }
    })
    return credentials
}

async function findCredentialsById(id: number, userId:number){
    const credentials: Credentials[] = await prisma.credentials.findMany({
        where:{
            id,
            userId
        }
    })
    return credentials
}

async function findCredentialsByURL(url: string, userId:number){
    const credentials: Credentials[] = await prisma.credentials.findMany({
        where:{
            url,
            userId
        }
    })
    return credentials
}

async function findByTitle(title: string, userId: number){
    const credentials: Credentials[] = await prisma.credentials.findMany({
        where:{
            title,
            userId
        }
    })
    return credentials
}

async function deleteCredential(id: number, userId:number){
    const credentials = await prisma.credentials.deleteMany({
        where:{
            id,
            userId
        }
    })
    return credentials.count
}
const credentialsRepository = {
    newCredential,
    findCredentialsByURL,
    findByTitle,
    listCredentials,
    findCredentialsById,
    deleteCredential
}
export default credentialsRepository