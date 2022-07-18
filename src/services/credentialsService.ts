
import { Credentials } from "@prisma/client"
import Cryptr from "cryptr"
import credentialsRepository, { CredentialsInsertData } from "../repositories/credentialsRepository.js"
import checkRepeatedTitle from "../utils/checkRepeatedTitle.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

async function newCredential(credential:CredentialsInsertData) {
    await checkSite(credential.url, credential.userId)
    await checkRepeatedTitle(credentialsRepository, credential.title, credential.userId)

    const cryptSecret = process.env.CRYPT_SECRET
    const CRYPT = new Cryptr(cryptSecret)
    const cryptedPassword = CRYPT.encrypt(credential.password)

    const newCredential: CredentialsInsertData = {
        title: credential.title,
        url: credential.url,
        credentialUser: credential.credentialUser,
        password: cryptedPassword,
        userId: credential.userId
    }
    await credentialsRepository.newCredential(newCredential)
    return sucessMessage("Nova credencial salva.")
}

async function checkSite(url:string, userId:number) {
    const credentials = await credentialsRepository.findCredentialsByURL(url, userId)
    if(credentials.length === 2 ) ErrorMessage(401, "Já existem duas credenciais para este site.")
}

async function listCredentials(id:number, userId: number) {
    let list: Credentials[] = []
    if(!id){
        list = await credentialsRepository.listCredentials(userId)
    }else{
        list = await credentialsRepository.findCredentialsById(id, userId)
    }
    if(list.length === 0) ErrorMessage(401, "Você não tem permissão para acessar esta credencial ou ela não existe.")
    
    const result = await decodePasswords(list)
    return result
}

export async function decodePasswords(list:any[]) {
    const cryptr = new Cryptr(process.env.CRYPT_SECRET)
    const decodedList = []  
    list.forEach(el => {
        const decodedPassword = cryptr.decrypt(el.password)
        el.password = decodedPassword
        decodedList.push(el)
    })
    return decodedList
}

async function deleteCredential(id:number, userId: number) {
    if(!id) ErrorMessage(404, "Insira o ID da credencial.")
    const result = await credentialsRepository.deleteCredential(id, userId)
    if(result === 0) ErrorMessage(401, "Você está tentando deletar uma credencial que não tem permissão ou não existe.")
    return sucessMessage("Credencial deletada com sucesso.")
}

const credentialsService = {
    newCredential,
    listCredentials,
    deleteCredential
}
export default credentialsService