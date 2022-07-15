import { Router } from "express";

import { createNewUser } from "../controllers/authController.js"

const authRouter = Router()

authRouter.post("/newuser", createNewUser)

export default authRouter