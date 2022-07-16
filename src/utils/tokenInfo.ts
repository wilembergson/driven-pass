import jwt from "jsonwebtoken"

export default async function getInfoFromToken(token:string){
    const dataToken: any = jwt.verify(token, process.env.JWT_SECRET)
    const userId:number = dataToken.userId  
    return userId
}