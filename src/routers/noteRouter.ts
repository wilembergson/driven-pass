import { Router } from "express";
import { createNewNote } from "../controllers/noteController.js"
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { noteSchema } from "../schemas/noteSchema.js";

const noteRouter = Router()

noteRouter.post("/newnote", validateSchemaAndTokenMiddleware(noteSchema), createNewNote)

export default noteRouter