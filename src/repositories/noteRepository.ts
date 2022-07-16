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

async function listNotes(userId:number){
    const notes: Note[] = await prisma.note.findMany({
        where:{
            userId
        }
    })
    return notes
}

async function findNoteById(id:number, userId:number){
    const notes: Note[] = await prisma.note.findMany({
        where:{
            id,
            userId
        }
    })
    return notes
}

async function deleteNote(id: number, userId:number){
    const note = await prisma.note.deleteMany({
        where:{
            id,
            userId
        }
    })
    return note.count
}

const noteRepository = {
    newNote,
    findByTitle,
    listNotes,
    findNoteById,
    deleteNote
}
export default noteRepository