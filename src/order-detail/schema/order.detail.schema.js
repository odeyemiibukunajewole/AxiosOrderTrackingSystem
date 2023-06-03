import Joi from "joi";

export const orderDetailSchema =
    Joi.object({
        deliveryStatus: Joi.string()
    });

