import { Request, Response } from 'express';
import fs from 'fs/promises';
import { Book } from 'src/models/book.model';

const DB_PATH: string = 'src/_db/db.json';

async function getParsedDB(): Promise<Book[]> {
  const db = await fs.readFile(DB_PATH);
  return JSON.parse(db.toString());
}

export async function getAllBooks(request: Request, response: Response) {
  const db = await getParsedDB();
  response.status(200).json(db);
}

export async function getBook(request: Request, response: Response) {
  const id = request.params.id;
  const db = await getParsedDB();

  const book = db.filter((book) => book.id === id)[0];

  if (!book) {
    return response.status(404).send('Book does not exist...');
  }

  response.status(200).json(book);
}

export async function addBook(request: Request, response: Response) {
  const id = Date.now().toString();
  const db = await getParsedDB();

  const newBook: Book = {
    id: id,
    ...request.body,
  };

  const newDB = [...db, newBook];

  await fs.writeFile(DB_PATH, JSON.stringify(newDB, null, 2));
  response.status(201).json(newBook);
}

export async function updateBook(request: Request, response: Response) {
  const id = request.params.id;
  const db = await getParsedDB();
  const updatedData: Book = request.body;

  const book = db.find((book) => book.id === id);

  if (!book) {
    return response.status(404).send('Book does not exist...');
  }

  const indexOfBook = db.findIndex((book) => book.id === id);

  const updatedBook: Book = {
    ...book,
    ...updatedData,
  };

  db[indexOfBook] = updatedBook;

  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  response.status(200).json(updatedBook);
}

export async function deleteBook(request: Request, response: Response) {
  const id = request.params.id;
  const db = await getParsedDB();

  const book = db.find((book) => book.id === id);

  if (!book) {
    return response.status(404).send('Book does not exist...');
  }

  const newDB = db.filter((book) => book.id !== id);

  await fs.writeFile(DB_PATH, JSON.stringify(newDB, null, 2));
  response.status(200).json(newDB);
}
