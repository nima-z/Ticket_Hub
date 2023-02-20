import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
//===========================================================
import { errorHandler, NotFoundError, currentUser } from "@nztickethub/common";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
//===========================================================

export const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(newOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
