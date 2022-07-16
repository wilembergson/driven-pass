import Cryptr from "cryptr"
import noteRepository, { NoteInsertData } from "../repositories/noteRepository.js"
import checkRepeatedTitle from "../utils/checkRepeatedTitle.js"
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

const noteService = {
    newNote
}
export default noteService