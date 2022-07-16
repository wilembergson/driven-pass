import ErrorMessage from "./errorMessage.js"

export default async function checkRepeatedTitle(repository:any, title: string, userId: number) {
    const credenciais = await repository.findByTitle(title, userId)
    if(credenciais.length === 1) ErrorMessage(401, "Este título já existe. Escolha outro.")
}