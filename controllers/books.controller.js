const express = require('express');
const router = express.Router();
const bookService = require('../services/books.service');
const { query } = require('../db');

/**
 * @swagger
 * /books:
 *   get:
 *     description: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 */

router.get('/books', async (req, res) => {
    // Endpoint to retrieve all books
    const books = await bookService.getAllBooks();
    res.send(books);
});

/**
 * @swagger
 * /books/search:
 *   get:
 *     description: Search for books
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: The term to search for in books
 *     responses:
 *       200:
 *         description: A list of books matching the search term
 *       404:
 *         description: No books found
 */

router.get('/books/search', async (req, res) => {
    // Endpoint to search for books based on query parameters
    const searchResults = await bookService.searchBooks(req.query);

    if (searchResults.length > 0) {
        res.status(200).json(searchResults);
    } else {
        res.status(404).json({ error: 'No books found!' });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     description: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Details of the book
 *       404:
 *         description: Book with given ID not found
 */

router.get('/books/:id', async (req, res) => {
    // Endpoint to retrieve a book by its ID
    const book = await bookService.getBookById(req.params.id);

    if (book.length === 0) {
        res.status(404).json('No book with given id: ' + req.params.id);
    } else {
        res.send(book);
    }
});

// ... (Previous code)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     description: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book with given ID not found
 */

router.delete('/books/:id', async (req, res) => {
    // Endpoint to delete a book by its ID
    const affectedRows = await bookService.deleteBook(req.params.id);

    if (affectedRows > 0) {
        res.send('Book deleted successfully');
    } else {
        res.status(404).json('No book with given id: ' + req.params.id);
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *     description: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               // Add other properties as needed for a book
 *     responses:
 *       200:
 *         description: The newly added book
 *       500:
 *         description: Something went wrong
 */

router.post('/books', async (req, res) => {
    // Endpoint to add a new book
    const addedBook = await bookService.insertBook(req.body);

    if (addedBook) {
        res.status(200).json(addedBook);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     description: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               // Add other properties as needed for a book update
 *     responses:
 *       200:
 *         description: The updated book
 *       500:
 *         description: Something went wrong
 */

router.put('/books/:id', async (req, res) => {
    // Endpoint to update a book by its ID
    const bookId = req.params.id;
    const updatedBook = await bookService.updateBook(bookId, req.body);

    if (updatedBook) {
        res.status(200).json(updatedBook);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

module.exports = router;
