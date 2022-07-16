import { Note } from "@prisma/client"
import noteRepository, { NoteInsertData } from "../repositories/noteRepository.js"
import checkRepeatedTitle from "../utils/checkRepeatedTitle.js"
import ErrorMessage from "../utils/errorMessage.js"
import sucessMessage from "../utils/sucessMessage.js"

async function newNote(note:NoteInsertData) {
    await checkRepeatedTitle(noteRepository, note.title, note.userId)

    const newNote: NoteInsertData = {
        title: note.title,
        annotation: note.annotation,
        userId: note.userId
    }
    await noteRepository.newNote(newNote)
    return sucessMessage("Nova nota salva.")
}

async function listNotes(id:number, userId: number) {
    let list: Note[] = []
    if(!id){
        list = await noteRepository.listNotes(userId)
    }else{
        list = await noteRepository.findNoteById(id, userId)
    }
    if(list.length === 0) ErrorMessage(401, "Você não tem permissão para acessar esta nota ou ela não existe.")  
    return list
}

async function deleteNote(id:number, userId: number) {
    if(!id) ErrorMessage(404, "Insira o ID da credencial.")
    const result = await noteRepository.deleteNote(id, userId)
    if(result === 0) ErrorMessage(401, "Você está tentando deletar uma nota que não tem permissão ou não existe.")
    return sucessMessage("Nota deletada com sucesso.")
}
const noteService = {
    newNote,
    listNotes,
    deleteNote
}
export default noteService