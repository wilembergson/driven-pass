import bcrypt from "bcrypt"

import authRepository, { UserInsertData } from "../repositories/authRepository.js";
import Error from "../utils/error.js"
import messageReturn from "../utils/returnMessage.js";

async function newUser(user:UserInsertData) {
    const {email, password} = user
    await existingUser(email)
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser: UserInsertData = {
        email: email,
        password: cryptedPassword
    }
    const result = await authRepository.newUser(newUser)
    if(!result) Error(422, "Não foi possível registrar um novo usuário.")
    return messageReturn("Novo usuário criado. Faça o login.")
}

async function existingUser(email:string) {
    const user = await authRepository.findUser(email)
    if(user) Error(401, "Já existe um usuário com o email informado.")
}

const authService = {
    newUser
}
export default authService