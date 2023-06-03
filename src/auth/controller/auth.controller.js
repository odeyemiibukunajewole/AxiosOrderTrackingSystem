import db from "../../../models";
import App from "../../util/index";
import { Op } from "sequelize";

const User = db.User;
const AdminUser = db.AdminUser;

class AuthController {
  static async signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        password,
        phoneNumber,
        address,
        email,
      } = req.body;

      if (!email || !phoneNumber)
        return res.status(400).send({
          message: "Missing Email{email}|Phonenumber{phoneNumber}",
        });

      let newPhoneNumber = "";
      if (phoneNumber[0] === "0") {
        newPhoneNumber = phoneNumber.substring(1, phoneNumber.length);
      } else {
        newPhoneNumber = phoneNumber;
      }

      const userExits = await User.findOne({
        where: {
          [Op.and]: [{ email }, { role }]
        },
        raw: true,
      });
      if (userExits)
        return res.status(400).send({ message: "Email/Phonenumber exists" });

      const hashPassword = App.hashPassword(password);

      const user = await User.create(
        {
          email,
          firstName,
          lastName,
          password: hashPassword,
          phoneNumber: newPhoneNumber,
          address,
        },
        { raw: true }
      );

      const token = App.assignToken({ id: user.id, email: user.email });

      res.status(201).send({ message: "Successful", user: { ...user, token } });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
        raw: true,
      });
      if (!user)
        return res
          .status(404)
          .send({ message: "Wrong email/password combination" });

      if (!App.isPasswordEqual(password, user.password))
        return res
          .status(404)
          .send({ message: "Wrong email/password combination" });

      const token = App.assignToken({ id: user.id, email: user.email });

      return res.status(200).send({ user: { ...user, token } });
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default AuthController;
