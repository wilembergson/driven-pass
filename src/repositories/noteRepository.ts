import { Note } from "@prisma/client"
import prisma from "../config/database.js"

export type NoteInsertData = Omit<Note, "id">

async function newNote(note:NoteInsertData) {
    return await prisma.note.create({
        data: note
    })
}
async function findByTitle(title: string, userId: number){
    const credentials: Note[] = await prisma.note.findMany({
        where:{
            title,
            userId
        }
    })
    return credentials
}

const noteRepository = {
    newNote,
    findByTitle
}
export default noteRepository