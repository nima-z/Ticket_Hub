const express = require("express");

const router = express.Router();

router.post("/api/users/signout", (req: any, res: any) => {
  res.send("sign out");
});

export { router as signOutRouter };
