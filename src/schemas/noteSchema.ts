import Joi from "joi";
import { NoteInsertData } from "../repositories/noteRepository";

export const noteSchema = Joi.object<Omit<NoteInsertData, "userId">>({
    title: Joi.string().max(50).required(),
    annotation: Joi.string().max(1000).required()
})