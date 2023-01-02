import mongoose from "mongoose";
//===========================================================
import { app } from "./app";
//===========================================================

async function startServer() {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000!!");
  });
}

startServer();
