import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import authRepository, { SessionInsertData, UserInsertData } from "../repositories/authRepository.js";
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js";

async function newUser(user:UserInsertData) {
    const {email, password} = user
    const foundUser = await authRepository.findUser(email)
    if(foundUser) ErrorMessage(401, "Já existe um usuário com o email informado.")
    
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser: UserInsertData = {
        email: email,
        password: cryptedPassword
    }
    const result = await authRepository.newUser(newUser)
    if(!result) ErrorMessage(422, "Não foi possível registrar um novo usuário.")
    return sucessMessage("Novo usuário criado. Faça o login.")
}

async function login(loginData:UserInsertData){
    const {email, password} = loginData
    const foundUser = await authRepository.findUser(email)
    if(!foundUser) ErrorMessage(404, "Email não encontrado.")
    const checkPassword = bcrypt.compareSync(password, foundUser.password)
    if(!checkPassword) ErrorMessage(401, "Senha incorreta.")
    const token = jwt.sign(
        {
            userId: foundUser.id,
            email: email
        },
        process.env.JWT_SECRET
        ,{expiresIn: 300000}
    )
    const session: SessionInsertData = {
        email:email,
        token: token
    }
    await authRepository.newSession(session)

    return {token: token}
}

const authService = {
    newUser,
    login
}
export default authService