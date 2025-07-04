import Joi from "joi";

export const rotaFacilSchema = Joi.object({
  origem: Joi.alternatives()
    .try(
      Joi.string().trim().min(1).messages({
        "string.empty": 'O campo "origem" não pode ser vazio.',
        "string.min": 'O campo "origem" não pode ser vazio.',
        "string.base": 'O campo "origem" deve ser uma string.',
        "any.required": 'O campo "origem" é obrigatório.',
      })
    )
    .required()
    .messages({
      "alternatives.match": 'O campo "origem" deve ser uma string.',
      "any.required": 'O campo "origem" é obrigatório.',
    }),

  destino: Joi.alternatives()
    .try(
      Joi.string().trim().min(1).messages({
        "string.empty": 'O campo "destino" não pode ser vazio.',
        "string.min": 'O campo "destino" não pode ser vazio.',
        "string.base": 'O campo "destino" deve ser uma string.',
        "any.required": 'O campo "destino" é obrigatório.',
      })
    )
    .required()
    .messages({
      "alternatives.match": 'O campo "destino" deve ser uma string.',
      "any.required": 'O campo "destino" é obrigatório.',
    }),
});
