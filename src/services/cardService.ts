import { Card } from "@prisma/client"
import Cryptr from "cryptr"
import cardRepository, { CardInsertData } from "../repositories/cardRepository.js"
import checkRepeatedTitle from "../utils/checkRepeatedTitle.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"
import { decodePasswords } from "./credentialsService.js"

async function newCard(card:CardInsertData) {
    await checkRepeatedTitle(cardRepository, card.name, card.userId)

    const cryptSecret = process.env.CRYPT_SECRET
    const CRYPT = new Cryptr(cryptSecret)
    const cryptedPassword = CRYPT.encrypt(card.password)
    const securityCode = CRYPT.encrypt(card.securityCode)

    if(card.type !== "credito" && card.type !== "debito" && card.type !== "ambos"){
        return ErrorMessage(401, "O tipo do cartão só pode ser credito, debito ou ambos.")
    }

    const newCard: CardInsertData = {
        number: card.number,
        name: card.name,
        securityCode: securityCode,
        expirationDate: card.expirationDate,
        password: cryptedPassword,
        isVirtual: card.isVirtual,
        type: card.type,
        userId: card.userId
    }
    await cardRepository.newCard(newCard)
    return sucessMessage("Novo cartão salvo.")
}

async function listCards(id:number, userId: number) {
    let list: Card[] = []
    if(!id){
        list = await cardRepository.listCards(userId)
    }else{
        list = await cardRepository.findCardById(id, userId)
    }
    if(list.length === 0) ErrorMessage(401, "Você não tem permissão para acessar este cartão ou ele não existe.")
    
    const result = await decodePasswords(list)
    return result
}

async function deleteCard(id:number, userId: number) {
    if(!id) ErrorMessage(404, "Insira o ID do cartão.")
    const result = await cardRepository.deleteCard(id, userId)
    if(result === 0) ErrorMessage(401, "Você está tentando deletar um cartão que não tem permissão ou não existe.")
    return sucessMessage("Cartão deletado com sucesso.")
}

const cardService = {
    newCard,
    listCards,
    deleteCard
}
export default cardService