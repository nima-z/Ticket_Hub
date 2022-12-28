import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
//===========================================================
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
//===========================================================

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

async function startServer() {
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
