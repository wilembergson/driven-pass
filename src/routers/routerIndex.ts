import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";

const routerIndex = Router()

routerIndex.use(authRouter)
routerIndex.use(credentialsRouter)

export default routerIndex