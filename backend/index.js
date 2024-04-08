import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import BooksRoutes from "./routes/BookRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
//CORS error handling option 1
app.use(cors());
//CORS error handling option 2
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", BooksRoutes);
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("WELCOME to the MERN stack tutorial");
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
