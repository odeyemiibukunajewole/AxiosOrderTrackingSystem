const Sequelize = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    timezone: "+01:00",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log({
      type: "success",
      message: "****Connected To MYSQL*****",
    });
  })
  .catch((err) => {
    console.log({
      type: "danger",
      msg: "Failed to connect to MySQL:",
      err: err.toString ? err.toString() : err,
    });
    process.exit(1);
  });

const seq = sequelize;
const Op = Sequelize.Op;

module.exports = {
  seq,
  Op,
};
