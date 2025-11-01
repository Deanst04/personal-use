import Joi from "joi";

export const newBookValidator = Joi.object({
    genreId: Joi.string().uuid().required(),
    name: Joi.string().min(10).max(40).uppercase().required(),
    description: Joi.string().min(20).max(100).required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
})

// export const updatePostValidator = newPostValidator

export const booksByAudienceIdValidator = Joi.object({
    id: Joi.string().uuid().required()
})