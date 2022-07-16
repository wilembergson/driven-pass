import { Credentials } from "@prisma/client"
import prisma from "../config/database.js"

export type CredentialsInsertData = Omit<Credentials, "id">

async function newCredential(credential:CredentialsInsertData) {
    return await prisma.credentials.create({
        data: credential
    })
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

async function findCredentialsByTitle(title: string, userId: number){
    const credentials: Credentials[] = await prisma.credentials.findMany({
        where:{
            title,
            userId
        }
    })
    return credentials
}
const credentialsRepository = {
    newCredential,
    findCredentialsByURL,
    findCredentialsByTitle
}
export default credentialsRepository