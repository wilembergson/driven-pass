import { Router } from "express";
import { createNewWifi, deleteWifi, listWifi } from "../controllers/wifiController.js";
import { validateSchemaAndTokenMiddleware } from "../middlewares/validateSchemaAndToken.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router()

wifiRouter.post("/newwifi", validateSchemaAndTokenMiddleware(wifiSchema), createNewWifi)
wifiRouter.get("/wifi", listWifi)
wifiRouter.get("/wifi/:id", listWifi)
wifiRouter.delete("/wifi/:id", deleteWifi)

export default wifiRouter