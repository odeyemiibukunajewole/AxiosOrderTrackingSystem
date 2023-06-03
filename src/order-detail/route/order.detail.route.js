import express from "express";
import OrderDetailController from "../controller/order.detail.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";
import { orderDetailSchema } from "../schema/order.detail.schema"
import { validateSchema } from "../../util/validation.services"
const passport = require('passport');
const orderDetailRouter = express.Router();

orderDetailRouter
    .post("/update-order-detail/:id",
        passport.authenticate('jwt', { session: false }),
        validateSchema(orderDetailSchema),
        handleErrorAsync(OrderDetailController.UpdateOrderStatus)
    );

orderDetailRouter
    .get("/get-order-detail",
        passport.authenticate('jwt', { session: false }),
        handleErrorAsync(OrderDetailController.getOrderDetails)
    );

export default  orderDetailRouter;
