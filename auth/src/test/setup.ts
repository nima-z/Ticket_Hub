import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
//===========================================================
import { app } from "../app";
//===========================================================

let mongo: any;

async function beforeAll() {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
}

async function beforeEach() {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({});
  }
}

async function afterAll() {
  mongo.stop();
  await mongoose.connection.close();
}
