import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    finalPrice: Joi.number().required(),
    sellingPrice: Joi.number().required(),
    mainImageUrl: Joi.string().required(),
    isBlocked: Joi.boolean(),
    isActive: Joi.boolean().required(),
});

