import express from 'express';
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from '../controllers/books.controller.js';

export const booksRouter = express.Router();

booksRouter.route('/').get(getAllBooks).post(addBook);
booksRouter.route('/:id').get(getBook).put(updateBook).delete(deleteBook);
