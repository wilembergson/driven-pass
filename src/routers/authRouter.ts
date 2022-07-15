import { Router } from "express";

import { createNewUser, login } from "../controllers/authController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";


const authRouter = Router()

authRouter.post("/newuser", validateSchemaMiddleware(userSchema), createNewUser)
authRouter.post("/login", validateSchemaMiddleware(userSchema), login)

export default authRouter