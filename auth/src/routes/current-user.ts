const express = require("express");
//============================================================================
const router = express.Router();

router.get("/api/users/currentuser", (req: any, res: any) => {
  res.send("Hi Nima");
});

export { router as currentUserRouter };
