import Joi from "joi";

export const loginSchema =
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });


/**
 * register schema
 */
export const signupSchema =
    Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.any().required(),
        address: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    });


/**
* password reset schema
*/
export const passwordResetSchema =
    Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string()
            .length(4)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": "otp must be an integer",
            }),
        password: Joi.string().min(5).required(),
        confirmPassword: Joi.string()
            .min(5)
            .required()
            .valid(Joi.ref("password")),
    });
