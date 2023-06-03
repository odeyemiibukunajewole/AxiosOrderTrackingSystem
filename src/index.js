/* eslint-disable no-unused-vars */
require("core-js/stable");
require("regenerator-runtime/runtime");
require("dotenv").config();
import authRouter from "../src/auth/route/auth.route";
import orderRoute from"../src/order/route/order.route";
import productRoute from "../src/product/route/product.route";
import orderTackingRouter from "../src/order-tracking/route/order.tracking.route";
import orderDetailRouter from "../src/order-detail/route/order.detail.route"

const { stream, logger } = require("./logger/winston");
const morgan = require("morgan");
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const passportConfig = require("../config/passport");
const dotenv = require("dotenv").config();
const { seq: DB } = require("../sequelize");

const path = require("path");


// Set up the app with express
const http = require("http");
app.set("views", path.resolve(__dirname, "../src/template"));
app.set("view engine", "ejs");
const server = http.createServer(app);
const prefix = "/api/v1/";
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*", }));
app.get("/test", (req, res) =>
    res.status(200).json({ message: "Server is Up and Running" })
);
app.use(express.urlencoded({ extended: false, }));
app.use(express.json());

// Use passport middleware
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(`${prefix}auth`, authRouter);
app.use(`${prefix}order`, orderRoute);
app.use(`${prefix}product`, productRoute);
app.use(`${prefix}order-tracking`, orderTackingRouter);
app.use(`${prefix}order-detail`, orderDetailRouter);




// Passport configuration
passportConfig(passport);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ data: "Select the right upload type" });
});


const customExpress = Object.create(express().response, {
    data: {
        value(data, message = "success", status = true) {
            return this.type("json").json({
                status,
                data,
                message,
            });
        },
    },
    error: {
        value(error, message = "An error occured", code) {
            return this.status(code || 500).json({
                message,
                statusCode: -3,
                status: false,
                error,
            });
        },
    },
    errorMessage: {
        value(message = "API response message", code) {
            return this.status(code || 400).json({
                message,
                statusCode: 1,
                status: false,
            });
        },
    },
});

app.response = Object.create(customExpress);

app.use((err, req, res, next) => {
    if (err.type && err.type === "entity.parse.failed") {
        res.status(400).errorMessage("Invalid JSON payload passed.");
    } else {
        logger.error(
            err.response
                ? [err.response.data.toString().split("\n")[0], req.originalUrl].join()
                : err.stack
                    ? [err.toString().split("\n")[0], req.originalUrl].join()
                    : [err.toString().split("\n")[0], req.originalUrl].join()
        );

        res.status(err?.response?.status || 500).send({
            mesage: "Internal Server Error",
            description: `Something broke!. Check application logs for helpful tips. OriginalUrl: ${req.originalUrl}  `,
        });
    }
});


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

app.use(morgan("combined", { stream: stream }));

module.exports = app;
