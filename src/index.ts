import express from 'express';
import { booksRouter } from './routes/books.route.js';

const app = express();
const PORT: number = 5000;

app.use(express.json());
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}...`);
});
