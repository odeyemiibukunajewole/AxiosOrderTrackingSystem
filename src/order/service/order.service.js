import db from "../../../models";
import App from "../../util/index";
const { Order, OrderDetail, OrderTacking } = db;

class OrderService {
  static async makeOrder(req, res) {
    try {
      let email = null;
      let id = null;

      if (req.user) {
        email = req.user.email;
        id = req.user.id;
      } else if (
        !req.body.customerEmail ||
        req.body.customerEmail.trim() === ""
      ) {
        return res.status(400).send({
          message: "Customer Email is required",
        });
      } else if (
        !req.body.customerFirstName ||
        req.body.customerFirstName.trim() === ""
      ) {
        return res.status(400).send({
          message: "Customer Firstname is required",
        });
      } else if (
        !req.body.customerLastName ||
        req.body.customerLastName.trim() === ""
      ) {
        return res.status(400).send({
          message: "Customer Lastname is required",
        });
      } else if (
        !req.body.customerAddress ||
        req.body.customerAddress.trim() === ""
      ) {
        return res.status(400).send({
          message: "Customer Delivery Address is required",
        });
      }

      const {
        products,
        totalQuantity,
        totalPrice,
        actualPrice,
        deliveryAddress,
        ...rest
      } = req.body;

      const order = await Order.create(
        {
          orderStatus: "IN_PROGRESS",
          totalPrice,
          totalQuantity,
          actualPrice,
          deliveryAddress,
          userId: id,
          ...rest,
        },
        {
          raw: true,
        }
      );

      const productOrdered = products.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        orderId: order.id,
      }));

      const OrderDetailList = await OrderDetail.bulkCreate(productOrdered);
      console.log("OrderDetail====>", OrderDetailList)


      // await OrderTacking.create({
      //   orderId: order.id,
      //   status: CREATED
      // },
      //   {
      //     raw: true,
      //   }
      // )

      return res
        .status(200)
        .send({ "message": "order created please check your email" });
    } catch (error) {
      throw error;
    }
  }


}

export default OrderService;
