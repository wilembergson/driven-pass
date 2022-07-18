import Joi from "joi";
import { CardInsertData } from "../repositories/cardRepository.js";

export const cardSchema = Joi.object<Omit<CardInsertData, "userId">>({
    number: Joi.number().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().max(3).required(),
    expirationDate: Joi.string().required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().required()
})