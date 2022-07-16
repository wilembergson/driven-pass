import jwt from "jsonwebtoken"
import ErrorMessage from "./errorMessage.js"

export default async function getInfoFromToken(token:string){
    if(!token) ErrorMessage(404, "Token não encontrado.")
    const dataToken: any = jwt.verify(token, process.env.JWT_SECRET)
    const userId:number = dataToken.userId  
    return userId
}