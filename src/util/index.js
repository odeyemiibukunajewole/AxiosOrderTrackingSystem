import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class App {
  static hashPassword(password) {
    const hash = bcrypt.hashSync(password, 8);
    return hash;
  }
  static isEmpty(value) {
    {
      return (
        value === undefined || value.toString() === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      );
    };
  }
  static isPasswordEqual(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
  static generateUUID() {
    return uuidv4();
  }

  static assignToken(payload, expiresTime) {
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY || "axios2023@12!$%",
      {
        expiresIn: expiresTime ? expiresTime : "2h",
      }
    );
    return token;
  }
  static decodeToken(token) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_KEY || "charlesisawesome"
        );
        resolve(decoded);
      } catch (error) {
        reject(error);
      }
    });
  }

  static randomString(len) {
    var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a => a + char[~~(Math.random() * char.length)], '');

  }

}

export default App;
