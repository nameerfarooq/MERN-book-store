import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("WELCOME to the MERN stack tutorial");
});

//routes for saving a new book

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, publishYear please   asdasdas",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("APP CONNECTED TO DATABASE");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
