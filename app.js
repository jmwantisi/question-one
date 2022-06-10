import express from 'express';
import cors from 'cors'
import authorsRoute from './routes/authors_route';
import booksRoute from './routes/books_route';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json({
	limit: 1000000000000
}));

app.use('/authors', authorsRoute);
app.use('/books', booksRoute);

module.exports = app;

