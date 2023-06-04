import express from "express";
import OrderTackingController from "../controller/order.tracking.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";

const orderTackingRouter = express.Router();

orderTackingRouter.get("/get-products",
    handleErrorAsync(OrderTackingController.getOrderTackings)
);

orderTackingRouter.get("/get-product/:id",
    handleErrorAsync(OrderTackingController.getOrderTackingByID)
);

orderTackingRouter.get("/track",
    handleErrorAsync(OrderTackingController.getOrderTacking)
);

export default  orderTackingRouter