import Joi from "joi";
import { UserInsertData } from "../repositories/authRepository.js";

export const userSchema = Joi.object<UserInsertData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})