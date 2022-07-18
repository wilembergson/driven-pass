import { Request, Response } from "express";
import { CardInsertData } from "../repositories/cardRepository.js";
import cardService from "../services/cardService.js";
import getInfoFromToken from "../utils/tokenInfo.js";

export async function createNewCard(req: Request, res: Response){
    const {number, name, securityCode, expirationDate, password, isVirtual, type} = req.body
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const card: CardInsertData = {
        number,
        name,
        securityCode: securityCode.toString(),
        expirationDate,
        password,
        isVirtual,
        type,
        userId
    }
    const result = await cardService.newCard(card)
    return res.status(201).json(result)
}

export async function listCards(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await cardService.listCards(parseInt(id), userId)
    return res.status(200).json(result)
}

export async function deleteCard(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await cardService.deleteCard(parseInt(id), userId)
    return res.status(200).json(result)
}