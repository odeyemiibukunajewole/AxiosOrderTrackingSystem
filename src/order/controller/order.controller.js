import db from "../../../models";
import App from "../../util/index";
import OrderService from "../service/order.service"
const { Order } = db

class OrderController {
  static async CreateOrder(req, res) {
    try {
      return OrderService.makeOrder(req, res);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserOrder(req, res) {
    try {
      const order = await Order.findOne({
        where: {
          userId: req.query.id,
        },
        include: [{ model: OrderDetail }],
        raw: false,
      });

      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      order.productIds = order?.OrderDetails?.dataValues?.map(
        (item) => item.productId
      );
      return res
        .status(200)
        .send({ message: "Operation successful", data: order });
    } catch (error) {
      throw error;
    }
  }

  static async UpdateOrderStatus(req, res) {
    try {
      const id = req.params.orderId;
      const order = await Order.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(400).send({ message: "ReferencedResourceNotFoundd" });
      }


      const confirmOderDelivery = await Order.update(
        { orderStatus: req.body.orderStatus },
        {
          where: { id },
        }
      );

      return res.status(200).send({ message: "Operation successful" });
    } catch (error) {
      throw error;
    }
  }

}




export default OrderController;
