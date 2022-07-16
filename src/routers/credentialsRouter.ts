import { Router } from "express";
import { createNewCredential } from "../controllers/credentialsController.js";
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { credentialsSchema } from "../schemas/credentialsSchema.js";

const credentialsRouter = Router()

credentialsRouter.post("/newcredential", validateSchemaAndTokenMiddleware(credentialsSchema), createNewCredential)

export default credentialsRouter