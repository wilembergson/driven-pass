import { Request, Response } from "express"
import { UserInsertData } from "../repositories/authRepository.js"
import authService from "../services/authService.js"

export async function createNewUser(req: Request, res: Response){
    const {email, password} = req.body
    const newUser: UserInsertData = {email, password}
    const result = await authService.newUser(newUser)
    return res.status(201).json(result)
}

export async function login(req: Request, res: Response){
    const {email, password} = req.body
    const loginData: UserInsertData = {email, password}
    const result = await authService.login(loginData)
    return res.status(200).json(result)
}