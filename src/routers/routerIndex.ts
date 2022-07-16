import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import noteRouter from "./noteRouter.js";

const routerIndex = Router()

routerIndex.use(authRouter)
routerIndex.use(credentialsRouter)
routerIndex.use(noteRouter)

export default routerIndex