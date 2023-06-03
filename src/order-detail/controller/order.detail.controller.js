import db from "../../../models";
import App from "../../util/index";
import { Op } from "sequelize";

const {
  OrderDetail,
} = db;

class OrderDetailController {

  static async createOrderDetail(req, res) {
    try {
      const { ...rest } = req.body;
      const OrderDetail = await OrderDetail.create({ ...rest }, { raw: true });

      return res
        .status(201)
        .send({ message: "OrderDetail created successfully", data: OrderDetail });
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getOrderDetails(req, res) {
    try {
      const OrderDetails = await OrderDetail.findAll({
      });

      return res.status(200).send({ data: OrderDetails });
    } catch (error) {
      throw new Error(error);
    }
  }


  static async getOrderDetailByID(req, res) {
    try {
      const { id } = req.params;
      const OrderDetail = await OrderDetail.findOne({
        where: {
          [Op.or]: [{ id }],
        },
        raw: true,
      });

      if (!OrderDetail)
        return res.status(404).send({ message: "OrderDetail not found!" });

      const extras = [];

      return res.status(200).send({ data: { ...OrderDetail } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async UpdateOrderStatus(req, res) {
    try {
      const id = req.params.orderId;
      const order = await OrderDetail.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(400).send({ message: "ReferencedResourceNotFoundd" });
      }


      const confirmOderDelivery = await OrderDetail.update(
        { deliveryStatus: req.body.deliveryStatus },
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



export default OrderDetailController;
