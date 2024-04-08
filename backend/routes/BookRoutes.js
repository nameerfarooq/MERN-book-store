import express from "express";
import { Book } from "../models/bookModel.js";
//routes for saving a new book
const router = express.Router();
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});
//get book by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});
//update a book
router.put("/:id", async (request, response) => {
  try {
    console.log(
      request.body.title,
      request.body.author,
      request.body.publishYear
    );
    if (!request.body.title && !request.body.author && !request.body.publishYear) {
      return response.status(400).send({
        message:
          "Provide atleast one argument. title, author, and publishYear!",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book Not found" });
    }
    return response.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
//delete a book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
