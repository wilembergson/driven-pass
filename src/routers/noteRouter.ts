import { Router } from "express";
import { createNewNote, deleteNote, listNotes } from "../controllers/noteController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { noteSchema } from "../schemas/noteSchema.js";

const noteRouter = Router()

noteRouter.post("/newnote", validateSchemaAndTokenMiddleware(noteSchema), createNewNote)
noteRouter.get("/note", listNotes)
noteRouter.get("/note/:id", listNotes)
noteRouter.delete("/note/:id", deleteNote)

export default noteRouter