const express = require("express");

const router = express.Router();

router.post("/api/users/signin", (req: any, res: any) => {
  const { email, password } = req.body;
  res.send("sign in");
});

export { router as signInRouter };
