const express = require("express");

const router = express.Router();

router.post("/api/users/signup", (req: any, res: any) => {
  const { email, password } = req.body;
  res.send("sign up");
});

export { router as signUpRouter };
