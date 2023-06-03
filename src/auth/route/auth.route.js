import express from "express";
import AuthController from "../controller/auth.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";
import { loginSchema, signupSchema } from "../schema/auth.schema"
import { validateSchema } from "../../util/validation.services"

const authRouter = express.Router();

authRouter.post("/login",
    handleErrorAsync(validateSchema(loginSchema)),
    handleErrorAsync(AuthController.login)
);

authRouter.post("/register",
    validateSchema(signupSchema),
    handleErrorAsync(AuthController.signUp)
);

export default authRouter;
