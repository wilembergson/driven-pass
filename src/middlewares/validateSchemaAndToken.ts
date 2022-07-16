import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import ErrorMessage from "../utils/errorMessage.js";

export function validateSchemaAndTokenMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if(!authorization) ErrorMessage(401, "Falha na autenticação da operação.")
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).send({ error: validation.error.message });
    }
    next();
  };
}