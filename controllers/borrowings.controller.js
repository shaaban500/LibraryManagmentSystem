const express = require('express');
const router = express.Router();
const borrowerService = require('../services/borrowings.service');

/**
 * @swagger
 * /borrowings/checkout:
 *   post:
 *     description: Checkout a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               borrowerId:
 *                 type: string
 *               checkoutDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       200:
 *         description: No available quantity of this book
 */

router.post('/borrowings/checkout', async (req, res) => {
    // Endpoint to checkout a book
    const { bookId, borrowerId, checkoutDate, dueDate } = req.body;

    try {
        const result = await borrowerService.checkoutBook(bookId, borrowerId, checkoutDate, dueDate);
        res.status(200).json('Book borrowed successfully');
    } catch (error) {
        res.status(200).json('No available quantity of this book');
    }
});

/**
 * @swagger
 * /borrowings/return:
 *   post:
 *     description: Return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               returnDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       500:
 *         description: Something went wrong
 */

router.post('/borrowings/return', async (req, res) => {
    // Endpoint to return a book
    const { bookId, returnDate } = req.body;

    try {
        const result = await borrowerService.returnBook(bookId, returnDate);
        res.status(200).json('Book returned successfully');
    } catch (error) {
        res.status(500).json('Something went wrong!!!');
    }
});

/**
 * @swagger
 * /borrowings/{id}:
 *   get:
 *     description: Get borrowed books by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the borrower
 *     responses:
 *       200:
 *         description: List of borrowed books
 *       404:
 *         description: No books found
 */

router.get('/borrowings/:id', async (req, res) => {
    // Endpoint to get borrowed books by user ID
    const books = await borrowerService.getBorrowedBooksByUserId(req.params.id);

    if (books.length > 0) {
        res.status(200).json(books);
    } else {
        res.status(404).json('No books found!!');
    }
});

/**
 * @swagger
 * /borrowings/overdue:
 *   post:
 *     description: Get overdue books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               overDueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: List of overdue books
 *       404:
 *         description: No books found
 */

router.post('/borrowings/overdue', async (req, res) => {
    // Endpoint to get overdue books
    const overDueBooks = await borrowerService.getOverDueBooks(req.body.overDueDate);

    if (overDueBooks.length > 0) {
        res.status(200).json(overDueBooks);
    } else {
        res.status(404).json('No books found!!!');
    }
});

module.exports = router;
