import db from "../../../models";
import App from "../../util/index";
import { Op } from "sequelize";

const {
  Product,
} = db;

class ProductController {

  static async createProduct(req, res) {
    try {

      console.log(req.body)
      const { ...rest } = req.body;
      const product = await Product.create({ ...rest }, { raw: true });

      return res
        .status(201)
        .send({ message: "Product created successfully", data: product });
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getProducts(req, res) {
    try {
      const products = await Product.findAll({
       
      });

      return res.status(200).send({ data: products });
    } catch (error) {
      throw new Error(error);
    }
  }


  static async getproductByID(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          [Op.or]: [{ id }, { slug: id }],
        },
        raw: true,
      });

      if (!product)
        return res.status(404).send({ message: "Product not found!" });

      const extras = [];

      return res.status(200).send({ data: { ...product} });
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default ProductController;
