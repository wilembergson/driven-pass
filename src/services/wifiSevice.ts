import { Wifi } from "@prisma/client"
import Cryptr from "cryptr"
import wifiRepository, { WifiInsertData } from "../repositories/wifiRepository.js"
import checkRepeatedTitle from "../utils/checkRepeatedTitle.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"
import { decodePasswords } from "./credentialsService.js"

async function newWifi(wifi:WifiInsertData) {

    const cryptSecret = process.env.CRYPT_SECRET
    const CRYPT = new Cryptr(cryptSecret)
    const cryptedPassword = CRYPT.encrypt(wifi.password)

    const newWifi: WifiInsertData = {
        title: wifi.title,
        password: cryptedPassword,
        userId: wifi.userId
    }
    await wifiRepository.newWifi(newWifi)
    return sucessMessage("Nova rede wifi salva.")
}

async function listWifi(id:number, userId: number) {
    let list: Wifi[] = []
    if(!id){
        list = await wifiRepository.listWifi(userId)
    }else{
        list = await wifiRepository.findWifiById(id, userId)
    }
    if(list.length === 0) ErrorMessage(401, "Você não tem permissão para acessar esta rede wifi ou ela não existe.")

    const result = await decodePasswords(list)
    return result
}

async function deleteWifi(id:number, userId: number) {
    if(!id) ErrorMessage(404, "Insira o ID da rede wifi.")
    const result = await wifiRepository.deleteWifi(id, userId)
    if(result === 0) ErrorMessage(401, "Você está tentando deletar uma nota que não tem permissão ou não existe.")
    return sucessMessage("Nota deletada com sucesso.")
}
const wifiService = {
    newWifi,
    listWifi,
    deleteWifi
}
export default wifiService