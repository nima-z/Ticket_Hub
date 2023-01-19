import mongoose from "mongoose";
//===========================================================
import { app } from "./app";
//===========================================================

async function startServer() {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI most be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000!!");
  });
}

startServer();
