import express from "express";
import ProductController from "../controller/product.controller";
import { handleErrorAsync } from "../../util/ErrorHandler";
import  {productSchema}  from "../schema/product.schema"
import { validateSchema} from "../../util/validation.services"
const passport = require('passport');
const productRouter = express.Router();

console.log("heddddre")
productRouter.post("/create-product",
    passport.authenticate('jwt', { session: false }),
    validateSchema(productSchema),
    handleErrorAsync(ProductController.createProduct)
);

productRouter.get("/get-product",
    handleErrorAsync(ProductController.getProducts)
);

productRouter.get("/get-product/:id",
    handleErrorAsync(ProductController.getproductByID)
);

export default productRouter;
