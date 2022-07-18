import { Router } from "express";
import { createNewCard, deleteCard, listCards } from "../controllers/cardController.js";
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardRouter = Router()

cardRouter.post("/newcard", validateSchemaAndTokenMiddleware(cardSchema), createNewCard)
cardRouter.get("/card", listCards)
cardRouter.get("/card/:id", listCards)
cardRouter.delete("/card/:id", deleteCard)

export default cardRouter