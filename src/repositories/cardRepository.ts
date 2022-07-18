
import { Card } from "@prisma/client"
import prisma from "../config/database.js"

export type CardInsertData = Omit<Card, "id">

async function newCard(card:CardInsertData) {
    return await prisma.card.create({
        data: card
    })
}
async function findByTitle(name: string, userId: number){
    const cards: Card[] = await prisma.card.findMany({
        where:{
            name,
            userId
        }
    })
    return cards
}

async function listCards(userId:number){
    const cards: Card[] = await prisma.card.findMany({
        where:{
            userId
        }
    })
    return cards
}

async function findCardById(id:number, userId:number){
    const cards: Card[] = await prisma.card.findMany({
        where:{
            id,
            userId
        }
    })
    return cards
}

async function deleteCard(id: number, userId:number){
    const card = await prisma.card.deleteMany({
        where:{
            id,
            userId
        }
    })
    return card.count
}

const cardRepository = {
    newCard,
    findByTitle,
    listCards,
    findCardById,
    deleteCard
}
export default cardRepository