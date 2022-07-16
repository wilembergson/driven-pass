import { Request, Response } from "express"
import { NoteInsertData } from "../repositories/noteRepository.js"
import noteService from "../services/noteService.js"
import getInfoFromToken from "../utils/tokenInfo.js"

export async function createNewNote(req: Request, res: Response){
    const {title, annotation} = req.body
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)

    const note: NoteInsertData = {
        title,
        annotation,
        userId
    }
    const result = await noteService.newNote(note)
    return res.status(201).json(result)
}

export async function listNotes(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await noteService.listNotes(parseInt(id), userId)
    return res.status(200).json(result)
}

export async function deleteNote(req: Request, res: Response){
    const {id} = req.params
    const authorization = req.headers.authorization
    const userId:number = await getInfoFromToken(authorization)
    const result  = await noteService.deleteNote(parseInt(id), userId)
    return res.status(200).json(result)
}