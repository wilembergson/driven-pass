import { Request, Response } from "express";
import { CredentialsInsertData } from "../repositories/credentialsRepository.js";
import credentialsService from "../services/credentialsService.js";
import getInfoFromToken from "../utils/tokenInfo.js";

export async function createNewCredential(req: Request, res: Response){
    const {title, url, credentialUser, password} = req.body
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)

    const credential: CredentialsInsertData = {
        title,
        url,
        credentialUser,
        password,
        userId
    }
    const result = await credentialsService.newCredential(credential)
    return res.status(201).json(result)
}

export async function listCredentials(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await credentialsService.listCredentials(parseInt(id), userId)
    return res.status(200).json(result)
}

export async function deleteCredential(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await credentialsService.deleteCredential(parseInt(id), userId)
    return res.status(200).json(result)
}