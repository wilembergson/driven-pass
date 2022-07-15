import express, { json } from "express"
import "express-async-errors"

import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(json())

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on port ${PORT}...`))