import authRepository, { UserInsertData } from "../repositories/authRepository.js";
import Error from "../utils/error.js"

async function newUser(user:UserInsertData) {
    const result = await authRepository.newUser(user)
    if(!result) Error(422, "Não foi possível registrar um novo usuário.")
    return {message: "Novo usuário criado. Faça o login."}
}

const authService = {
    newUser
}

export default authService