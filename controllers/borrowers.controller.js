const express = require('express');
const router = express.Router();
const borrowerService = require('../services/borrowers.service');

/**
 * @swagger
 * /borrowers:
 *   get:
 *     description: Retrieve all borrowers
 *     responses:
 *       200:
 *         description: A list of all borrowers
 */

router.get('/borrowers', async (req, res) => {
    // Endpoint to retrieve all borrowers
    const borrowers = await borrowerService.getAllBorrowers();
    res.send(borrowers);
});

/**
 * @swagger
 * /borrowers/{id}:
 *   get:
 *     description: Get a borrower by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the borrower to retrieve
 *     responses:
 *       200:
 *         description: Details of the borrower
 *       404:
 *         description: Borrower with given ID not found
 */

router.get('/borrowers/:id', async (req, res) => {
    // Endpoint to retrieve a borrower by their ID
    const borrower = await borrowerService.getBorrowerById(req.params.id);

    if (borrower.length === 0) {
        res.status(404).json('No borrower with given id: ' + req.params.id);
    } else {
        res.send(borrower);
    }
});

/**
 * @swagger
 * /borrowers/{id}:
 *   delete:
 *     description: Delete a borrower by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the borrower to delete
 *     responses:
 *       200:
 *         description: Borrower deleted successfully
 *       404:
 *         description: Borrower with given ID not found
 */

router.delete('/borrowers/:id', async (req, res) => {
    // Endpoint to delete a borrower by their ID
    const affectedRows = await borrowerService.deleteBorrower(req.params.id);

    if (affectedRows > 0) {
        res.send('Borrower deleted successfully');
    } else {
        res.status(404).json('No borrower with given id: ' + req.params.id);
    }
});

/**
 * @swagger
 * /borrowers:
 *   post:
 *     description: Add a new borrower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               // Add other properties as needed for a borrower
 *     responses:
 *       200:
 *         description: The newly added borrower
 *       500:
 *         description: Something went wrong
 */

router.post('/borrowers', async (req, res) => {
    // Endpoint to add a new borrower
    const addedBorrower = await borrowerService.insertBorrower(req.body);

    if (addedBorrower) {
        res.status(200).json(addedBorrower);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

/**
 * @swagger
 * /borrowers/{id}:
 *   put:
 *     description: Update a borrower by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the borrower to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               // Add other properties as needed for updating a borrower
 *     responses:
 *       200:
 *         description: The updated borrower
 *       500:
 *         description: Something went wrong
 */

router.put('/borrowers/:id', async (req, res) => {
    // Endpoint to update a borrower by their ID
    const borrowerId = req.params.id;
    const updatedBorrower = await borrowerService.updateBorrower(borrowerId, req.body);

    if (updatedBorrower) {
        res.status(200).json(updatedBorrower);
    } else {
        res.status(500).json('Something went wrong!');
    }
});

module.exports = router;
