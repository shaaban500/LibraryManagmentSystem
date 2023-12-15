const express = require('express');
const router = express.Router();
const borrowerService = require('../services/borrowings.service');



router.post('/borrowings/checkout', async (req, res) => {
    const { bookId, borrowerId, checkoutDate, dueDate } = req.body;
    
    try {
        const result = await borrowerService.checkoutBook(bookId, borrowerId, checkoutDate, dueDate);
        res.status(200).json('Book borrowed successfully');
    } 
    catch (error) {
        res.status(200).json('No available quantity of this book');
    }
});


router.post('/borrowings/return', async (req, res) => {
    const { bookId, returnDate } = req.body;
    
    try {
        const result = await borrowerService.returnBook(bookId, returnDate);
        res.status(200).json('book returned successfully..');
    } 
    catch (error) {
        res.status(500).json('Somthing went wrong!!');
    }
});


router.get('/borrowings/:id', async (req, res) => {
    const books = await borrowerService.getBorrowedBooksByUserId(req.params.id);
    
    if (books.length > 0) 
        res.status(200).json(books);
    else
        res.status(404).json('No books found!!');
});

module.exports = router;
