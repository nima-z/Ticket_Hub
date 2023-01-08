import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
//============================================================================
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@nztickethub/common";
import { comparePassword } from "../services/password";
//============================================================================

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const matchPassword = await comparePassword(
      existingUser.password,
      password
    );

    if (!matchPassword) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userJWT = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send({ user: existingUser });
  }
);

export { router as signInRouter };
