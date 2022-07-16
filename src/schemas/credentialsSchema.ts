import Joi from "joi";
import { CredentialsInsertData } from "../repositories/credentialsRepository.js";

export const credentialsSchema = Joi.object<Omit<CredentialsInsertData, "userId">>({
    title: Joi.string().required(),
    url: Joi.string().required(),
    credentialUser: Joi.string().required(),
    password: Joi.string().required()
})