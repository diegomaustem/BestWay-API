import Joi from "joi";
import { Request, Response, NextFunction } from "express";

type JoiSchema = Joi.ObjectSchema | Joi.ArraySchema;

export const validate = (
  schema: JoiSchema,
  property: "body" | "params" | "query"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validateAsync(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      req[property] = value;

      next();
    } catch (error: any) {
      if (error.isJoi) {
        const errors = error.details.map((detail: Joi.ValidationErrorItem) => ({
          message: detail.message.replace(/['"]/g, ""),
          field: detail.path.join("."),
        }));

        res.status(400).json({
          code: 400,
          status: "error",
          message: "Dados de entrada inválidos.",
          errors: errors,
        });
        return;
      } else {
        console.error("Erro inesperado no middleware de validação:", error);
        res.status(500).json({
          code: 500,
          status: "error",
          message: "Erro interno no servidor durante a validação.",
        });
        return;
      }
    }
  };
};
