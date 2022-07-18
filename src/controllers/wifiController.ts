import { Request, Response } from "express";
import { WifiInsertData } from "../repositories/wifiRepository.js";
import wifiService from "../services/wifiSevice.js";
import getInfoFromToken from "../utils/tokenInfo.js";

export async function createNewWifi(req: Request, res: Response){
    const {title, password} = req.body
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)

    const wifi: WifiInsertData = {
        title,
        password,
        userId
    }
    const result = await wifiService.newWifi(wifi)
    return res.status(201).json(result)
}

export async function listWifi(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await wifiService.listWifi(parseInt(id), userId)
    return res.status(200).json(result)
}

export async function deleteWifi(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await wifiService.deleteWifi(parseInt(id), userId)
    return res.status(200).json(result)
}