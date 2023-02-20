import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
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
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID most be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLLUSTER_ID most be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL most be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection is closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

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
