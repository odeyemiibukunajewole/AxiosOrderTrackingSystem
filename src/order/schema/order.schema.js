import Joi from "joi";

export const orderSchema =
    Joi.object({
        products: Joi.array()
            .items(
                Joi.object({
                    id: Joi.number().required(),
                    quantity: Joi.number().required(),
                })
            )
            .min(1),
        totalQuantity: Joi.number().required(),
        totalPrice: Joi.number().required(),
        customerEmail: Joi.any(),
        customerLastName: Joi.any(),
        customerFirstName: Joi.any(),
        deliveryAddress: Joi.string(),
        customerAddress: Joi.any(),
        customerPhoneNumber: Joi.any(),
        customerDeliveryAddress: Joi.any(),
    });


