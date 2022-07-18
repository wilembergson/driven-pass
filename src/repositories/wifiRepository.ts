import { Wifi } from "@prisma/client"
import prisma from "../config/database.js"

export type WifiInsertData = Omit<Wifi, "id">

async function newWifi(wifi:WifiInsertData) {
    return await prisma.wifi.create({
        data: wifi
    })
}
async function findByTitle(title: string, userId: number){
    const wifi: Wifi[] = await prisma.wifi.findMany({
        where:{
            title,
            userId
        }
    })
    return wifi
}

async function listWifi(userId:number){
    const cards: Wifi[] = await prisma.wifi.findMany({
        where:{
            userId
        }
    })
    return cards
}

async function findWifiById(id:number, userId:number){
    const cards: Wifi[] = await prisma.wifi.findMany({
        where:{
            id,
            userId
        }
    })
    return cards
}

async function deleteWifi(id: number, userId:number){
    const wifi = await prisma.wifi.deleteMany({
        where:{
            id,
            userId
        }
    })
    return wifi.count
}

const wifiRepository = {
    newWifi,
    findByTitle,
    listWifi,
    findWifiById,
    deleteWifi
}
export default wifiRepository