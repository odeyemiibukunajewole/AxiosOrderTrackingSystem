import express from "express";
import OrderController from "../controller/order.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";
import { orderSchema } from "../schema/order.schema"
import { validateSchema } from "../../util/validation.services"
const passport = require('passport');
const orderRouter = express.Router();

orderRouter.post("/create-order",
    passport.authenticate('jwt', { session: false }),
    validateSchema(orderSchema),
    handleErrorAsync(OrderController.CreateOrder)
);

orderRouter.get("/get-order",
    passport.authenticate('jwt', { session: false }),
    handleErrorAsync(OrderController.getUserOrder)
);

orderRouter.post("/update-order/:id",
    passport.authenticate('jwt', { session: false }),
    handleErrorAsync(OrderController.UpdateOrderStatus)
);

export default orderRouter;
