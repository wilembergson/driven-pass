import { Router } from "express";
import { createNewCredential, listCredentials } from "../controllers/credentialsController.js";
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { credentialsSchema } from "../schemas/credentialsSchema.js";

const credentialsRouter = Router()

credentialsRouter.post("/newcredential", validateSchemaAndTokenMiddleware(credentialsSchema), createNewCredential)
credentialsRouter.get("/credentials", listCredentials)
credentialsRouter.get("/credentials/:id", listCredentials)

export default credentialsRouter