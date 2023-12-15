const express = require('express');
const router = express.Router();
const borrowerService = require('../services/borrowings.service');



router.post('/borrowings/checkout', async (req, res) => {
    console.log(req.body)
    const { bookId, borrowerId, checkoutDate, dueDate } = req.body;
    const result = await borrowerService.checkoutBook(bookId, borrowerId, checkoutDate, dueDate);
        console.log(result)
    if(result.res == 1)
        res.status(200).json('book borrowed successfully..');
    else 
        res.status(200).json('No available quantity of this book');
});


router.post('/borrowings/return', async (req, res) => {
    console.log(req.body)
    const { bookId, returnDate } = req.body;
    const result = await borrowerService.returnBook(bookId, returnDate);
        console.log(result)
    if(result.res == 1)
        res.status(200).json('book returned successfully..');
});


module.exports = router;
