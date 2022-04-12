import { getRepository } from "typeorm";
import { User } from "../entity/User";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class UserController {
  repository = getRepository(User);

  register = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const entity = this.repository.create({
      email: req.body.email,
      password: hash,
    });

    try {
      entity.id = null;
      await this.repository.save(entity);
      res.json({ message: "user created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await this.repository.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({ message: "auth failed" });
      }

      const authResult = await bcrypt.compare(password, user.password);

      if (!authResult) {
        return res.status(401).json({ message: "invalid password" });
      }

      const token = jwt.sign(
        { email: user.email, userId: user.id },
        "THIS_SHOULD_BE_LONGER",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token, expiresIn: "3600" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
