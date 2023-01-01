import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
//===========================================================
import { app } from "../app";
//===========================================================

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "nimza";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo.stop();
  await mongoose.connection.close();
});
