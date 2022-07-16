
import Cryptr from "cryptr"
import credentialsRepository, { CredentialsInsertData } from "../repositories/credentialsRepository.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

async function newCredential(credential:CredentialsInsertData) {
    await checkSite(credential.url, credential.userId)
    await checkRepeatedTitle(credential.title, credential.userId)

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

async function checkRepeatedTitle(title: string, userId: number) {
    const credenciais = await credentialsRepository.findCredentialsByTitle(title, userId)
    if(credenciais.length === 1) ErrorMessage(401, "Já existe uma credencial com este título.")
}
const credentialsService = {
    newCredential
}
export default credentialsService