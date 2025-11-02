import Joi from "joi";

export const newMovieValidator = Joi.object({
    theaterId: Joi.string().uuid().required(),
    name: Joi.string().max(100).required(),
    showTime: Joi.date().required(),
    duration: Joi.number().min(1).max(600).required()
})

export const idValidator = (paramName: string) => Joi.object({
    [paramName]: Joi.string().uuid().required()
})
