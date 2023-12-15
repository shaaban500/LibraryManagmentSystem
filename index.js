const express = require('express');
const app = express();
require('express-async-errors');

app.use(express.json()); // Parse JSON in the request body

const booksController = require('./controllers/books.controller');
const borrowersController = require('./controllers/borrowers.controller');
const borrowingsController = require('./controllers/borrowings.controller');

app.use('/', booksController);
app.use('/', borrowersController);
app.use('/', borrowingsController);

// Global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("Something went wrong!");
});

app.listen(3000, () => console.log("Server is running..."));
