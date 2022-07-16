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