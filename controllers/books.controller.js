const express = require('express')
router = express.Router();
const bookService = require('../services/books.service');
const { query } = require('../db');

router.get('/books', async (req, res) => {
    const books = await bookService.getAllBooks()
    res.send(books)    
})


router.get('/books/search', async (req, res) => {
    const searchResults = await bookService.searchBooks(req.query);

    if(searchResults.length > 0)
        res.status(200).json(searchResults);
    else
        res.status(404).json({ error: 'No books found!' });
});


router.get('/books/:id', async (req, res) => { 
    const book = await bookService.getBookById(req.params.id);
    
    if (book.length === 0) {
        res.status(404).json('No book with given id: ' + req.params.id);
    } else {
        res.send(book);
    }
});

router.delete('/books/:id', async (req, res) => {
    const affectedRows = await bookService.deleteBook(req.params.id);
    
    if (affectedRows > 0) {
        res.send('Book deleted successfully');
    } else {
        res.status(404).json('No book with given id: ' + req.params.id);
    }
});


router.post('/books', async (req, res) => {
    const addedBook = await bookService.insertBook(req.body);
    
    if (addedBook) {
        res.status(200).json(addedBook);
    } else {
        res.status(500).json('Something went wrong!');
    }
});


router.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBook = await bookService.updateBook(bookId, req.body);

    if (updatedBook) {
        res.status(200).json(updatedBook);
    } else {
        res.status(500).json('Something went wrong!');
    }
});



module.exports = router;
