import Joi from "joi";
import { WifiInsertData } from "../repositories/wifiRepository.js";

export const wifiSchema = Joi.object<Omit<WifiInsertData, "userId">>({
    title: Joi.string().required(),
    password: Joi.string().required()
})