import { query } from "express";
import db from "../../../models";
import App from "../../util/index";
import { Op } from "sequelize";

const {
  OrderTacking,
} = db;

class OrderTackingController {

  static async createOrderTacking(req, res) {
    try {
      const { ...rest } = req.body;
      const OrderTacking = await OrderTacking.create({ ...rest }, { raw: true });

      return res
        .status(201)
        .send({ message: "OrderTacking created successfully", data: OrderTacking });
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getOrderTackings(req, res) {
    try {
      const OrderTackings = await OrderTacking.findAll({
      });

      return res.status(200).send({ data: OrderTackings });
    } catch (error) {
      throw new Error(error);
    }
  }


  static async getOrderTackingByID(req, res) {
    try {
      const { id } = req.params;
      const OrderTacking = await OrderTacking.findOne({
        where: {
          [Op.or]: [{ id }],
        },
        raw: true,
      });

      if (!OrderTacking)
        return res.status(404).send({ message: "OrderTacking not found!" });

      const extras = [];

      return res.status(200).send({ data: { ...OrderTacking } });
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getOrderTacking(req, res) {
    try {
      const { tracker_id } = req.query;
      console.log(tracker_id)
      const tracker_info = await OrderTacking.findOne({
        where: {
          [Op.or]: [{ trackerID: tracker_id }],
        },
        raw: true, 
      });

      if (!tracker_info)
        return res.status(404).send({ message: "OrderTacking not found!" });

      const extras = [];

      return res.status(200).send({ data: { ...tracker_info } });
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default OrderTackingController;
