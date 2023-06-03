import express from "express";
import OrderTackingController from "../controller/order.tracking.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";

const orderTackingRouter = express.Router();

orderTackingRouter.get("/get-product",
    handleErrorAsync(OrderTackingController.getOrderTackings)
);

orderTackingRouter.get("/get-product/:id",
    handleErrorAsync(OrderTackingController.getOrderTackingByID)
);

export default  orderTackingRouter